# M-Scribe Security & Authentication Setup Guide

## 🔐 Overview

M-Scribe now includes a robust authentication system to protect your meeting recordings and ensure only authorized users can access the application. This guide covers setup, configuration, and security best practices.

## 🚀 Quick Security Setup

### Default Configuration
- **Default Password:** `MScribe2024!`
- **Session Duration:** 8 hours
- **Security Level:** Production-ready with JWT tokens

### Immediate Access
1. **Visit Application:** https://5000-ih5blm071aw6771wyztfj-07ff6f35.manusvm.computer
2. **Enter Password:** `MScribe2024!`
3. **Click Sign In:** Access granted for 8 hours

## 🔧 Customizing Authentication

### Change the Universal Password

1. **Create Environment File:**
```bash
cd /home/ubuntu/meeting-recorder-backend
cp .env.example .env
```

2. **Edit Configuration:**
```bash
# Edit .env file
MSCRIBE_PASSWORD=YourCustomPassword123!
SECRET_KEY=your_unique_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

3. **Restart Application:**
```bash
cd src && python fastapi_main.py
```

### Security Configuration Options

| Setting | Default | Description |
|---------|---------|-------------|
| `MSCRIBE_PASSWORD` | `MScribe2024!` | Universal access password |
| `SECRET_KEY` | Auto-generated | JWT signing key |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | 480 (8 hours) | Session duration |

## 🛡️ Security Features

### Authentication Flow
1. **Login Required:** All users must authenticate before access
2. **JWT Tokens:** Secure session management with expiration
3. **HTTP-Only Cookies:** Prevents XSS attacks
4. **Session Validation:** All API endpoints verify authentication
5. **Automatic Logout:** Sessions expire after 8 hours

### Protected Endpoints
- `/api/upload` - File upload and processing
- `/api/transcript/{id}` - Transcript retrieval
- `/api/meetings` - Meeting management
- `/api/transcribe/{id}` - Transcription processing
- `/api/summarize/{id}` - AI summary generation

### Public Endpoints
- `/api/auth/login` - Authentication
- `/api/auth/status` - Authentication status check
- `/` - Login page (redirects if not authenticated)

## 🔑 Password Management

### Choosing a Strong Password
- **Minimum 12 characters**
- **Mix of letters, numbers, symbols**
- **Avoid common words or patterns**
- **Example:** `M$cribe2024!Secure#`

### Password Distribution
- **Share securely** with authorized team members
- **Use encrypted communication** (Signal, encrypted email)
- **Document access** in secure location
- **Regular rotation** recommended (quarterly)

## 👥 User Management

### Current Setup
- **Single Universal Password:** All authorized users share one password
- **Session-Based:** Each user gets individual 8-hour sessions
- **No User Registration:** Controlled access via password sharing

### Access Control
- **Grant Access:** Share password with new team members
- **Revoke Access:** Change password and restart application
- **Monitor Usage:** Check server logs for access patterns

## 🚀 Deployment Security

### Local Development
```bash
# Start with default settings
cd /home/ubuntu/meeting-recorder-backend/src
python fastapi_main.py
```

### Production Deployment
```bash
# Set secure environment variables
export MSCRIBE_PASSWORD="YourSecurePassword123!"
export SECRET_KEY="your-256-bit-secret-key"
export FLASK_ENV="production"

# Start application
python fastapi_main.py
```

### Cloud Deployment
1. **Set Environment Variables** in your hosting platform
2. **Enable HTTPS** for secure cookie transmission
3. **Configure Firewall** to restrict access if needed
4. **Regular Backups** of meeting data and configurations

## 🔍 Security Monitoring

### Access Logs
- **Login Attempts:** Monitor for failed authentication
- **Session Activity:** Track user sessions and duration
- **API Usage:** Monitor endpoint access patterns

### Security Checklist
- [ ] Changed default password
- [ ] Set unique SECRET_KEY
- [ ] Enabled HTTPS in production
- [ ] Configured secure cookie settings
- [ ] Regular password rotation schedule
- [ ] Backup and recovery plan

## 🆘 Troubleshooting

### Common Issues

**Cannot Login:**
- Verify password is correct
- Check if session expired
- Clear browser cookies
- Restart application

**Session Expires Too Quickly:**
- Increase `ACCESS_TOKEN_EXPIRE_MINUTES` in auth.py
- Check system clock synchronization

**Authentication Errors:**
- Verify SECRET_KEY is set consistently
- Check environment variables
- Review server logs for errors

### Reset Authentication
```bash
# Clear all active sessions
rm -f /tmp/mscribe_sessions.db  # If using file-based sessions
# Restart application
python fastapi_main.py
```

## 📞 Support & Access Requests

### Getting Access
- **Contact:** Gieve.acidwalla@gmail.com
- **Include:** Your name, role, and reason for access
- **Response Time:** Typically within 24 hours

### Security Questions
- **Technical Issues:** Check logs and configuration
- **Access Problems:** Contact administrator
- **Security Concerns:** Report immediately to admin

## 🎯 Best Practices

### For Administrators
1. **Regular Password Updates:** Change quarterly
2. **Monitor Access Logs:** Review weekly
3. **Backup Configurations:** Store securely
4. **Document Changes:** Keep security changelog

### For Users
1. **Secure Password Storage:** Use password manager
2. **Logout When Done:** Don't leave sessions open
3. **Report Issues:** Contact admin for problems
4. **Follow Guidelines:** Adhere to usage policies

## 📋 Security Compliance

### Internal Use Policy
- **Purpose:** Internal meeting documentation only
- **Restrictions:** No commercial use or external sharing
- **Data Handling:** Follow company data protection policies
- **Access Control:** Administrator manages user access

### Data Protection
- **Encryption:** JWT tokens and secure cookies
- **Storage:** Local file system (upgrade to encrypted storage recommended)
- **Transmission:** HTTPS in production
- **Retention:** Configure based on company policy

---

**M-Scribe Security System - Protecting Your Meeting Data**

*This is for internal use only. This is not for commercial use. Need access? Email: Gieve.acidwalla@gmail.com*

