# Meeting Recorder - Deployment Guide

This guide provides step-by-step instructions for deploying the Meeting Recorder & AI Minutes Generator application.

## 🌐 Current Deployment

**Live Application:** https://p9hwiqcn9pz0.manus.space

The application is currently deployed and ready for immediate use by your team.

## 🏗️ Deployment Architecture

### Full-Stack Deployment
- **Frontend:** React application built and served as static files
- **Backend:** Flask API server handling all business logic
- **Database:** SQLite for development (easily upgradeable)
- **File Storage:** Local filesystem with organized directory structure

## 📋 Pre-Deployment Checklist

### Required Components
- [ ] Backend Flask application with all routes
- [ ] Frontend React application built for production
- [ ] Database models and migrations
- [ ] Static file serving configuration
- [ ] Environment variables configured
- [ ] Dependencies listed in requirements.txt

### Security Checklist
- [ ] CORS properly configured
- [ ] File upload limits set
- [ ] Input validation implemented
- [ ] Secure filename handling
- [ ] Environment variables for sensitive data

## 🚀 Deployment Options

### Option 1: Current Production Deployment (Recommended)

The application is already deployed and accessible at:
**https://p9hwiqcn9pz0.manus.space**

**Advantages:**
- ✅ Already configured and tested
- ✅ Immediate availability
- ✅ No additional setup required
- ✅ Automatic SSL/HTTPS
- ✅ Scalable infrastructure

### Option 2: Self-Hosted Deployment

#### Requirements
- Ubuntu 20.04+ or similar Linux distribution
- Python 3.11+
- Node.js 18+
- Nginx (recommended)
- Domain name and SSL certificate

#### Step-by-Step Instructions

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install dependencies
   sudo apt install python3.11 python3.11-venv nodejs npm nginx -y
   ```

2. **Application Deployment**
   ```bash
   # Clone repository
   git clone https://github.com/GA1972/meeting-recorder.git
   cd meeting-recorder
   
   # Backend setup
   cd meeting-recorder-backend
   python3.11 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   
   # Frontend build
   cd ../meeting-recorder-frontend
   npm install
   npm run build
   cp -r dist/* ../meeting-recorder-backend/src/static/
   ```

3. **Environment Configuration**
   ```bash
   # Create environment file
   cd meeting-recorder-backend
   cat > .env << EOF
   FLASK_ENV=production
   OPENAI_API_KEY=your_key_here
   OPENAI_API_BASE=https://api.openai.com/v1
   EOF
   ```

4. **Service Configuration**
   ```bash
   # Create systemd service
   sudo cat > /etc/systemd/system/meeting-recorder.service << EOF
   [Unit]
   Description=Meeting Recorder Application
   After=network.target
   
   [Service]
   Type=simple
   User=ubuntu
   WorkingDirectory=/home/ubuntu/meeting-recorder/meeting-recorder-backend
   Environment=PATH=/home/ubuntu/meeting-recorder/meeting-recorder-backend/venv/bin
   ExecStart=/home/ubuntu/meeting-recorder/meeting-recorder-backend/venv/bin/python src/main.py
   Restart=always
   
   [Install]
   WantedBy=multi-user.target
   EOF
   
   # Enable and start service
   sudo systemctl daemon-reload
   sudo systemctl enable meeting-recorder
   sudo systemctl start meeting-recorder
   ```

5. **Nginx Configuration**
   ```bash
   # Create nginx configuration
   sudo cat > /etc/nginx/sites-available/meeting-recorder << EOF
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host \$host;
           proxy_set_header X-Real-IP \$remote_addr;
           proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto \$scheme;
       }
       
       client_max_body_size 500M;
   }
   EOF
   
   # Enable site
   sudo ln -s /etc/nginx/sites-available/meeting-recorder /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **SSL Certificate (Let's Encrypt)**
   ```bash
   # Install certbot
   sudo apt install certbot python3-certbot-nginx -y
   
   # Get certificate
   sudo certbot --nginx -d your-domain.com
   ```

### Option 3: Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM python:3.11-slim
   
   WORKDIR /app
   
   # Install system dependencies
   RUN apt-get update && apt-get install -y \
       build-essential \
       && rm -rf /var/lib/apt/lists/*
   
   # Copy requirements and install Python dependencies
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   
   # Copy application code
   COPY . .
   
   # Create upload directories
   RUN mkdir -p uploads/recordings uploads/transcriptions uploads/minutes
   
   # Expose port
   EXPOSE 5000
   
   # Run application
   CMD ["python", "src/main.py"]
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   
   services:
     meeting-recorder:
       build: .
       ports:
         - "5000:5000"
       environment:
         - FLASK_ENV=production
         - OPENAI_API_KEY=${OPENAI_API_KEY}
       volumes:
         - ./uploads:/app/uploads
         - ./src/database:/app/src/database
       restart: unless-stopped
   
     nginx:
       image: nginx:alpine
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./nginx.conf:/etc/nginx/nginx.conf
         - ./ssl:/etc/nginx/ssl
       depends_on:
         - meeting-recorder
       restart: unless-stopped
   ```

3. **Deploy with Docker**
   ```bash
   # Build and run
   docker-compose up -d
   
   # Check status
   docker-compose ps
   
   # View logs
   docker-compose logs -f meeting-recorder
   ```

### Option 4: Cloud Platform Deployment

#### AWS Deployment
1. **EC2 Instance Setup**
   - Launch Ubuntu 20.04 EC2 instance
   - Configure security groups (ports 80, 443, 22)
   - Follow self-hosted deployment steps

2. **RDS Database** (optional upgrade)
   - Create PostgreSQL RDS instance
   - Update connection string in application

3. **S3 Storage** (optional upgrade)
   - Create S3 bucket for file storage
   - Update file handling to use S3

#### Google Cloud Platform
1. **App Engine Deployment**
   ```yaml
   # app.yaml
   runtime: python311
   
   env_variables:
     FLASK_ENV: production
     OPENAI_API_KEY: your_key_here
   
   automatic_scaling:
     min_instances: 1
     max_instances: 10
   ```

2. **Deploy**
   ```bash
   gcloud app deploy
   ```

#### Heroku Deployment
1. **Prepare for Heroku**
   ```bash
   # Create Procfile
   echo "web: python src/main.py" > Procfile
   
   # Create runtime.txt
   echo "python-3.11.0" > runtime.txt
   ```

2. **Deploy**
   ```bash
   heroku create your-app-name
   heroku config:set FLASK_ENV=production
   heroku config:set OPENAI_API_KEY=your_key_here
   git push heroku main
   ```

## 🔧 Configuration Management

### Environment Variables
```bash
# Required
FLASK_ENV=production
SECRET_KEY=your_secret_key_here

# Optional (for AI features)
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_BASE=https://api.openai.com/v1

# Database (if using external database)
DATABASE_URL=postgresql://user:pass@host:port/dbname
```

### Application Configuration
```python
# src/config.py
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'
    MAX_CONTENT_LENGTH = 500 * 1024 * 1024  # 500MB
    UPLOAD_FOLDER = 'uploads'
    
class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
    
class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False
```

## 📊 Monitoring and Maintenance

### Health Checks
```bash
# Check application status
curl -f http://localhost:5000/api/health || exit 1

# Check disk space
df -h

# Check memory usage
free -h

# Check application logs
tail -f /var/log/meeting-recorder.log
```

### Backup Strategy
```bash
# Database backup
sqlite3 src/database/app.db ".backup backup-$(date +%Y%m%d).db"

# File backup
tar -czf recordings-backup-$(date +%Y%m%d).tar.gz uploads/

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
sqlite3 src/database/app.db ".backup $BACKUP_DIR/db-$DATE.db"

# Backup uploads
tar -czf $BACKUP_DIR/uploads-$DATE.tar.gz uploads/

# Keep only last 7 days
find $BACKUP_DIR -name "*.db" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

### Log Management
```bash
# Configure log rotation
sudo cat > /etc/logrotate.d/meeting-recorder << EOF
/var/log/meeting-recorder.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 644 ubuntu ubuntu
    postrotate
        systemctl reload meeting-recorder
    endscript
}
EOF
```

## 🚨 Troubleshooting

### Common Issues

1. **Application Won't Start**
   ```bash
   # Check service status
   sudo systemctl status meeting-recorder
   
   # Check logs
   sudo journalctl -u meeting-recorder -f
   
   # Check Python environment
   source venv/bin/activate
   python -c "import flask; print('Flask OK')"
   ```

2. **File Upload Issues**
   ```bash
   # Check disk space
   df -h
   
   # Check permissions
   ls -la uploads/
   
   # Check nginx configuration
   sudo nginx -t
   ```

3. **Database Issues**
   ```bash
   # Check database file
   ls -la src/database/
   
   # Test database connection
   python -c "from src.models.user import db; print('DB OK')"
   ```

### Performance Optimization

1. **Database Optimization**
   ```sql
   -- Add indexes for better performance
   CREATE INDEX idx_meeting_status ON meeting(status);
   CREATE INDEX idx_meeting_scheduled_time ON meeting(scheduled_time);
   ```

2. **File Storage Optimization**
   ```bash
   # Compress old recordings
   find uploads/recordings -name "*.webm" -mtime +30 -exec gzip {} \;
   
   # Clean temporary files
   find uploads/temp -type f -mtime +1 -delete
   ```

## 📞 Support

For deployment support or issues:

**Contact:** gieve.acidwalla@gmail.com

**Current Deployment:** https://p9hwiqcn9pz0.manus.space

## 🔄 Updates and Maintenance

### Updating the Application
```bash
# Pull latest changes
git pull origin main

# Update backend
cd meeting-recorder-backend
source venv/bin/activate
pip install -r requirements.txt

# Rebuild frontend
cd ../meeting-recorder-frontend
npm install
npm run build
cp -r dist/* ../meeting-recorder-backend/src/static/

# Restart service
sudo systemctl restart meeting-recorder
```

### Database Migrations
```bash
# Create migration (if using Flask-Migrate)
flask db migrate -m "Description of changes"

# Apply migration
flask db upgrade
```

---

**The application is ready for production use at: https://p9hwiqcn9pz0.manus.space**

