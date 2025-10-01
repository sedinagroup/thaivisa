# Thailand Visa AI - Digital Ocean Deployment Guide

This guide provides step-by-step instructions for deploying the Thailand Visa AI application to Digital Ocean.

## 🚀 Quick Start

### Option 1: Digital Ocean App Platform (Recommended for beginners)

1. **Fork the repository** to your GitHub account
2. **Create a Digital Ocean account** and connect your GitHub
3. **Create a new App** in Digital Ocean App Platform
4. **Upload app.yaml** configuration file
5. **Deploy** with one click

### Option 2: Digital Ocean Droplet with Docker (More control)

1. **Create a Droplet** (Ubuntu 22.04, minimum 2GB RAM)
2. **Clone this repository** to your droplet
3. **Run the deployment script**: `./deploy.sh production your-domain.com`
4. **Configure DNS** to point to your droplet IP

## 📋 Prerequisites

### System Requirements
- Ubuntu 22.04 LTS or later
- Minimum 2GB RAM, 2 CPU cores
- 25GB SSD storage
- Root or sudo access

### Required Software
- Docker 20.10+
- Docker Compose 2.0+
- Git
- Curl
- OpenSSL

## 🔧 Detailed Setup Instructions

### Step 1: Create Digital Ocean Droplet

1. **Log in to Digital Ocean**
   - Go to [digitalocean.com](https://digitalocean.com)
   - Create an account or log in

2. **Create a new Droplet**
   - Click "Create" → "Droplets"
   - Choose Ubuntu 22.04 LTS
   - Select plan: Basic ($12/month, 2GB RAM, 1 CPU)
   - Choose datacenter region closest to your users
   - Add SSH key or use password authentication
   - Name your droplet: "thailand-visa-ai"

3. **Configure Firewall**
   ```bash
   # Allow HTTP, HTTPS, and SSH
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   ```

### Step 2: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install additional tools
sudo apt install -y git curl openssl certbot python3-certbot-nginx

# Logout and login again to apply docker group changes
exit
```

### Step 3: Clone and Deploy

```bash
# Clone repository
git clone https://github.com/your-username/thailand-visa-ai.git
cd thailand-visa-ai

# Make deployment script executable
chmod +x deploy.sh

# Deploy application
./deploy.sh production your-domain.com
```

### Step 4: Configure Domain and SSL

1. **Point your domain to the droplet IP**
   - Update DNS A record: `your-domain.com` → `your-droplet-ip`
   - Update DNS A record: `www.your-domain.com` → `your-droplet-ip`

2. **SSL certificate will be automatically generated** by the deployment script

### Step 5: Verify Deployment

```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f web

# Test health endpoint
curl https://your-domain.com/health
```

## 🎛️ Configuration

### Environment Variables

Edit `.env` file to configure:

```bash
# Database
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=thailand_visa

# Redis
REDIS_PASSWORD=your_redis_password

# Security
JWT_SECRET=your_jwt_secret_key

# External Services
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Database Configuration

The database is automatically initialized with:
- User management tables
- Credit system tables
- Visa application tables
- Audit logging tables

### SSL/TLS Configuration

SSL certificates are automatically generated using Let's Encrypt:
- Automatic renewal via cron job
- Strong cipher suites
- HSTS headers enabled

## 📊 Monitoring and Maintenance

### Health Checks

```bash
# Application health
curl https://your-domain.com/health

# Database health
docker-compose exec db pg_isready -U postgres

# Redis health
docker-compose exec redis redis-cli ping
```

### Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f web
docker-compose logs -f db
docker-compose logs -f redis
```

### Backups

```bash
# Manual backup
./backup.sh

# Automated daily backups are configured via cron
crontab -l
```

### Updates

```bash
# Pull latest code
git pull origin main

# Rebuild and deploy
./deploy.sh production your-domain.com
```

## 🔒 Security Best Practices

### Server Security

1. **Keep system updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Configure SSH key authentication**
   ```bash
   # Disable password authentication
   sudo nano /etc/ssh/sshd_config
   # Set: PasswordAuthentication no
   sudo systemctl restart ssh
   ```

3. **Setup fail2ban**
   ```bash
   sudo apt install fail2ban
   sudo systemctl enable fail2ban
   ```

### Application Security

1. **Use strong passwords** in `.env` file
2. **Enable HTTPS only** in production
3. **Regular security updates**
4. **Monitor access logs**

## 🚨 Troubleshooting

### Common Issues

1. **Port 80/443 already in use**
   ```bash
   sudo netstat -tulpn | grep :80
   sudo systemctl stop apache2  # if Apache is running
   ```

2. **SSL certificate issues**
   ```bash
   # Check certificate status
   sudo certbot certificates
   
   # Renew certificate
   sudo certbot renew
   ```

3. **Database connection issues**
   ```bash
   # Check database logs
   docker-compose logs db
   
   # Reset database
   docker-compose down
   docker volume rm thailand-visa-ai_postgres_data
   docker-compose up -d
   ```

4. **Out of disk space**
   ```bash
   # Clean Docker images
   docker system prune -a
   
   # Check disk usage
   df -h
   du -sh /var/lib/docker/
   ```

### Performance Optimization

1. **Enable Redis caching**
2. **Configure CDN** for static assets
3. **Database query optimization**
4. **Enable Gzip compression**

## 📞 Support

### Getting Help

1. **Check logs first**: `docker-compose logs -f`
2. **Verify health endpoints**: `curl https://your-domain.com/health`
3. **Check system resources**: `htop`, `df -h`
4. **Review configuration**: `.env` file settings

### Useful Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart specific service
docker-compose restart web

# View service status
docker-compose ps

# Execute command in container
docker-compose exec web sh
docker-compose exec db psql -U postgres thailand_visa

# View resource usage
docker stats

# Clean up unused resources
docker system prune
```

## 🔄 Scaling and High Availability

### Horizontal Scaling

1. **Load Balancer**: Use Digital Ocean Load Balancer
2. **Multiple Droplets**: Deploy to multiple regions
3. **Database Clustering**: PostgreSQL read replicas
4. **Redis Cluster**: For session management

### Monitoring

1. **Digital Ocean Monitoring**: Enable built-in monitoring
2. **Custom Alerts**: Set up email/SMS alerts
3. **Log Aggregation**: Use Digital Ocean Logs
4. **Performance Monitoring**: APM tools integration

## 📈 Cost Optimization

### Digital Ocean Pricing

- **Basic Droplet**: $12/month (2GB RAM, 1 CPU)
- **Database**: $15/month (managed PostgreSQL)
- **Load Balancer**: $12/month
- **Spaces CDN**: $5/month + usage

### Cost Saving Tips

1. **Use reserved instances** for predictable workloads
2. **Enable monitoring** to right-size resources
3. **Use managed databases** only if needed
4. **Implement caching** to reduce database load

---

## 🎉 Congratulations!

Your Thailand Visa AI application is now deployed and running on Digital Ocean!

**Next Steps:**
1. Test all functionality thoroughly
2. Set up monitoring and alerts
3. Configure backup procedures
4. Plan for scaling as users grow

For additional support, refer to the [Digital Ocean documentation](https://docs.digitalocean.com/) or contact our support team.