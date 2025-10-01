#!/bin/bash

# Thailand Visa AI - Digital Ocean Deployment Script
# Usage: ./deploy.sh [environment] [domain]
# Example: ./deploy.sh production thaivisa.ai

set -e

# Configuration
ENVIRONMENT=${1:-production}
DOMAIN=${2:-localhost}
PROJECT_NAME="thailand-visa-ai"
COMPOSE_FILE="docker-compose.yml"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        error "This script should not be run as root for security reasons"
    fi
}

# Check system requirements
check_requirements() {
    log "Checking system requirements..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed. Please install Docker first."
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed. Please install Docker Compose first."
    fi
    
    # Check if user is in docker group
    if ! groups $USER | grep &>/dev/null '\bdocker\b'; then
        error "User $USER is not in docker group. Run: sudo usermod -aG docker $USER"
    fi
    
    log "System requirements check passed ✓"
}

# Setup environment
setup_environment() {
    log "Setting up environment for $ENVIRONMENT..."
    
    # Create necessary directories
    mkdir -p logs/nginx
    mkdir -p ssl
    mkdir -p backups
    
    # Copy environment file
    if [[ ! -f .env ]]; then
        if [[ -f .env.$ENVIRONMENT ]]; then
            cp .env.$ENVIRONMENT .env
            log "Environment file .env.$ENVIRONMENT copied to .env"
        else
            warn "Environment file .env.$ENVIRONMENT not found. Using .env.production template."
            cp .env.production .env
        fi
    fi
    
    # Update domain in environment file
    if [[ "$DOMAIN" != "localhost" ]]; then
        sed -i "s/your-domain.com/$DOMAIN/g" .env
        log "Domain updated to $DOMAIN"
    fi
    
    # Generate secure passwords if not set
    if grep -q "your_secure_password" .env; then
        POSTGRES_PASSWORD=$(openssl rand -base64 32)
        REDIS_PASSWORD=$(openssl rand -base64 32)
        JWT_SECRET=$(openssl rand -base64 64)
        
        sed -i "s/your_secure_password_here/$POSTGRES_PASSWORD/g" .env
        sed -i "s/your_redis_password_here/$REDIS_PASSWORD/g" .env
        sed -i "s/your_jwt_secret_key_here/$JWT_SECRET/g" .env
        
        log "Secure passwords generated and updated in .env file"
    fi
}

# Setup SSL certificates
setup_ssl() {
    if [[ "$DOMAIN" != "localhost" && "$ENVIRONMENT" == "production" ]]; then
        log "Setting up SSL certificates for $DOMAIN..."
        
        # Install certbot if not present
        if ! command -v certbot &> /dev/null; then
            log "Installing certbot..."
            sudo apt-get update
            sudo apt-get install -y certbot python3-certbot-nginx
        fi
        
        # Generate SSL certificate
        if [[ ! -f ssl/cert.pem ]]; then
            log "Generating SSL certificate..."
            sudo certbot certonly --standalone -d $DOMAIN --email admin@$DOMAIN --agree-tos --non-interactive
            
            # Copy certificates to ssl directory
            sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/cert.pem
            sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/key.pem
            sudo chown $USER:$USER ssl/*.pem
            
            log "SSL certificate generated for $DOMAIN ✓"
        else
            log "SSL certificate already exists ✓"
        fi
    fi
}

# Build and deploy application
deploy_application() {
    log "Building and deploying application..."
    
    # Pull latest images
    docker-compose pull
    
    # Build application
    log "Building application image..."
    docker-compose build --no-cache web
    
    # Stop existing containers
    log "Stopping existing containers..."
    docker-compose down
    
    # Start services
    log "Starting services..."
    if [[ "$ENVIRONMENT" == "production" ]]; then
        docker-compose --profile production up -d
    else
        docker-compose up -d
    fi
    
    # Wait for services to be healthy
    log "Waiting for services to be healthy..."
    sleep 30
    
    # Check service health
    check_health
}

# Check service health
check_health() {
    log "Checking service health..."
    
    # Check web service
    if curl -f http://localhost/health > /dev/null 2>&1; then
        log "Web service is healthy ✓"
    else
        error "Web service health check failed"
    fi
    
    # Check database
    if docker-compose exec -T db pg_isready -U postgres > /dev/null 2>&1; then
        log "Database is healthy ✓"
    else
        error "Database health check failed"
    fi
    
    # Check Redis
    if docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
        log "Redis is healthy ✓"
    else
        error "Redis health check failed"
    fi
}

# Setup monitoring
setup_monitoring() {
    log "Setting up monitoring..."
    
    # Create monitoring script
    cat > monitor.sh << 'EOF'
#!/bin/bash
# Simple monitoring script
docker-compose ps
docker-compose logs --tail=50
EOF
    
    chmod +x monitor.sh
    
    # Setup log rotation
    sudo tee /etc/logrotate.d/thailand-visa-ai > /dev/null << EOF
/home/$USER/$PROJECT_NAME/logs/nginx/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 644 nginx nginx
    postrotate
        docker-compose exec web nginx -s reload
    endscript
}
EOF
    
    log "Monitoring setup completed ✓"
}

# Setup backup
setup_backup() {
    log "Setting up backup system..."
    
    # Create backup script
    cat > backup.sh << 'EOF'
#!/bin/bash
# Backup script for Thailand Visa AI
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Database backup
docker-compose exec -T db pg_dump -U postgres thailand_visa > "$BACKUP_DIR/db_backup_$DATE.sql"

# Redis backup
docker-compose exec -T redis redis-cli --rdb - > "$BACKUP_DIR/redis_backup_$DATE.rdb"

# Compress backups older than 1 day
find $BACKUP_DIR -name "*.sql" -mtime +1 -exec gzip {} \;
find $BACKUP_DIR -name "*.rdb" -mtime +1 -exec gzip {} \;

# Remove backups older than 30 days
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
EOF
    
    chmod +x backup.sh
    
    # Setup cron job for daily backups
    (crontab -l 2>/dev/null; echo "0 2 * * * cd $(pwd) && ./backup.sh >> logs/backup.log 2>&1") | crontab -
    
    log "Backup system setup completed ✓"
}

# Main deployment function
main() {
    log "Starting deployment of Thailand Visa AI to Digital Ocean..."
    log "Environment: $ENVIRONMENT"
    log "Domain: $DOMAIN"
    
    check_root
    check_requirements
    setup_environment
    setup_ssl
    deploy_application
    setup_monitoring
    setup_backup
    
    log "🎉 Deployment completed successfully!"
    log ""
    log "Your Thailand Visa AI application is now running:"
    if [[ "$DOMAIN" != "localhost" ]]; then
        log "🌐 Website: https://$DOMAIN"
        log "🔒 SSL: Enabled"
    else
        log "🌐 Website: http://localhost"
        log "🔒 SSL: Disabled (development)"
    fi
    log ""
    log "Useful commands:"
    log "  View logs: docker-compose logs -f"
    log "  Check status: docker-compose ps"
    log "  Monitor: ./monitor.sh"
    log "  Backup: ./backup.sh"
    log "  Stop: docker-compose down"
    log "  Restart: docker-compose restart"
    log ""
    log "Don't forget to:"
    log "  1. Update DNS records to point to this server"
    log "  2. Configure firewall (ports 80, 443)"
    log "  3. Set up monitoring alerts"
    log "  4. Test backup and restore procedures"
}

# Run main function
main "$@"