#!/bin/bash

# Thailand Visa AI - Deploy to Digital Ocean Droplet
# For: ubuntu-s-1vcpu-1gb-sfo3-01

set -e

echo "🚀 Deploying Thailand Visa AI to Digital Ocean Droplet..."

# Configuration
APP_NAME="thailand-visa-ai"
DOMAIN=${1:-"your-droplet-ip"}
EMAIL=${2:-"admin@thaivisa.ai"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Update system
log_info "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
log_info "Installing required packages..."
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install Docker
if ! command -v docker &> /dev/null; then
    log_info "Installing Docker..."
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo usermod -aG docker $USER
    sudo systemctl enable docker
    sudo systemctl start docker
else
    log_info "Docker already installed"
fi

# Install Docker Compose (standalone)
if ! command -v docker-compose &> /dev/null; then
    log_info "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    log_info "Docker Compose already installed"
fi

# Install Nginx
if ! command -v nginx &> /dev/null; then
    log_info "Installing Nginx..."
    sudo apt install -y nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
else
    log_info "Nginx already installed"
fi

# Create application directory
APP_DIR="/opt/$APP_NAME"
log_info "Creating application directory: $APP_DIR"
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR

# Clone the repository
log_info "Cloning repository..."
if [ -d "$APP_DIR/.git" ]; then
    cd $APP_DIR
    git pull origin main
else
    git clone https://github.com/sedinagroup/thaivisa.git $APP_DIR
    cd $APP_DIR
fi

# Create optimized docker-compose for 1GB RAM
log_info "Creating optimized docker-compose for 1GB RAM..."
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  # Web Application
  web:
    build: .
    container_name: thailand-visa-web
    restart: unless-stopped
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    networks:
      - thailand-visa-network
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M

  # Lightweight PostgreSQL
  db:
    image: postgres:15-alpine
    container_name: thailand-visa-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: thailand_visa
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secure_password_123
      POSTGRES_INITDB_ARGS: "--auth-host=scram-sha-256"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-db.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - thailand-visa-network
    deploy:
      resources:
        limits:
          memory: 256M
        reservations:
          memory: 128M
    command: >
      postgres
      -c shared_buffers=64MB
      -c effective_cache_size=128MB
      -c maintenance_work_mem=32MB
      -c checkpoint_completion_target=0.9
      -c wal_buffers=4MB
      -c default_statistics_target=100
      -c random_page_cost=1.1
      -c effective_io_concurrency=200

  # Redis (lightweight config)
  redis:
    image: redis:7-alpine
    container_name: thailand-visa-redis
    restart: unless-stopped
    command: >
      redis-server
      --maxmemory 64mb
      --maxmemory-policy allkeys-lru
      --save 900 1
      --save 300 10
      --save 60 10000
    volumes:
      - redis_data:/data
    networks:
      - thailand-visa-network
    deploy:
      resources:
        limits:
          memory: 128M
        reservations:
          memory: 64M

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local

networks:
  thailand-visa-network:
    driver: bridge
EOF

# Create environment file
log_info "Creating environment file..."
cat > .env << 'EOF'
NODE_ENV=production
VITE_APP_NAME=Thailand Visa AI
VITE_API_URL=http://localhost:3000/api

# Database
DB_HOST=db
DB_PORT=5432
DB_NAME=thailand_visa
DB_USER=postgres
DB_PASSWORD=secure_password_123

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Security
JWT_SECRET=your_jwt_secret_key_change_this
ENCRYPTION_KEY=your_encryption_key_change_this

# File Upload
UPLOAD_MAX_SIZE=10485760
ALLOWED_FILE_TYPES=jpg,jpeg,png,pdf
EOF

# Build and start services
log_info "Building and starting services..."
docker-compose down --remove-orphans 2>/dev/null || true
docker-compose build --no-cache
docker-compose up -d

# Wait for services
log_info "Waiting for services to start..."
sleep 45

# Configure Nginx reverse proxy
log_info "Configuring Nginx..."
sudo tee /etc/nginx/sites-available/$APP_NAME > /dev/null << EOF
server {
    listen 80;
    server_name _;
    
    client_max_body_size 20M;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Health check
    location /health {
        access_log off;
        return 200 "healthy\\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Enable site and remove default
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Configure firewall
log_info "Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Create management scripts
log_info "Creating management scripts..."

# Update script
cat > update.sh << 'EOF'
#!/bin/bash
cd /opt/thailand-visa-ai
git pull origin main
docker-compose build --no-cache
docker-compose up -d
echo "✅ Application updated successfully!"
EOF
chmod +x update.sh

# Backup script
sudo tee /usr/local/bin/backup-thailand-visa.sh > /dev/null << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/thailand-visa"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
cd /opt/thailand-visa-ai
docker-compose exec -T db pg_dump -U postgres thailand_visa > $BACKUP_DIR/db_backup_$DATE.sql

# Backup app files
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz -C /opt/thailand-visa-ai --exclude=node_modules --exclude=.git .

# Keep only last 3 backups (save space)
find $BACKUP_DIR -name "*.sql" | sort -r | tail -n +4 | xargs rm -f
find $BACKUP_DIR -name "*.tar.gz" | sort -r | tail -n +4 | xargs rm -f

echo "✅ Backup completed: $DATE"
EOF
sudo chmod +x /usr/local/bin/backup-thailand-visa.sh

# Setup daily backup cron
(crontab -l 2>/dev/null; echo "0 3 * * * /usr/local/bin/backup-thailand-visa.sh") | crontab -

# Check service status
log_info "Checking service status..."
sleep 10

if docker-compose ps | grep -q "Up"; then
    log_info "✅ Services are running!"
    
    # Get droplet IP
    DROPLET_IP=$(curl -s http://checkip.amazonaws.com/ || echo "your-droplet-ip")
    
    echo ""
    echo "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!"
    echo ""
    echo "📋 Access Information:"
    echo "   • Application URL: http://$DROPLET_IP"
    echo "   • Application Directory: $APP_DIR"
    echo "   • Server: ubuntu-s-1vcpu-1gb-sfo3-01"
    echo ""
    echo "🔧 Management Commands:"
    echo "   • View logs: cd $APP_DIR && docker-compose logs -f"
    echo "   • Restart: cd $APP_DIR && docker-compose restart"
    echo "   • Update: cd $APP_DIR && ./update.sh"
    echo "   • Backup: /usr/local/bin/backup-thailand-visa.sh"
    echo ""
    echo "📊 Resource Usage (optimized for 1GB RAM):"
    echo "   • Web App: ~256-512MB"
    echo "   • PostgreSQL: ~128-256MB"
    echo "   • Redis: ~64-128MB"
    echo "   • System: ~256MB"
    echo ""
    echo "⚠️  IMPORTANT NEXT STEPS:"
    echo "   1. Point your domain to: $DROPLET_IP"
    echo "   2. Update .env with your API keys"
    echo "   3. Test the application thoroughly"
    echo "   4. Set up SSL when you have a domain"
    echo ""
    log_info "🚀 Thailand Visa AI is now live!"
    
else
    log_error "❌ Some services failed to start"
    echo "Check logs with: docker-compose logs"
    exit 1
fi
EOF