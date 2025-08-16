# M-Scribe Quick Start Instructions

## 🔐 Secure Access Required

**Live Application:** https://5000-ih5blm071aw6771wyztfj-07ff6f35.manusvm.computer  
**Default Password:** `MScribe2024!`

## 🚀 Get Started in 2 Minutes

### Step 1: Access M-Scribe
1. Visit: **https://5000-ih5blm071aw6771wyztfj-07ff6f35.manusvm.computer**
2. Enter password: **`MScribe2024!`**
3. Click **Sign In**

### Step 2: Start Using M-Scribe
- **Upload Audio Files:** Click "Choose Audio File"
- **Live Recording:** Click on upcoming meetings
- **View Results:** Automatic transcription and AI summaries

## 🔑 Authentication Details

| Feature | Details |
|---------|---------|
| **Password** | `MScribe2024!` (customizable) |
| **Session Duration** | 8 hours |
| **Security** | JWT tokens + HTTP-only cookies |
| **Access Control** | Universal password for team |

## 💰 Cost Breakdown (Most Economical Setup)

| Feature | Technology | Cost |
|---------|------------|------|
| **Transcription** | faster-whisper (local) | **FREE** |
| **AI Summaries** | OpenAI GPT-4o-mini | **~$0.01 per meeting** |
| **Total per meeting** | | **~$0.01** |

**Monthly estimate for 20 meetings: ~$0.20**

## 🎯 How to Use

### Upload Audio Files
1. Click "Choose Audio File" 
2. Select your meeting recording (MP3, WAV, WebM, MP4, etc.)
3. Wait 2-5 minutes for processing
4. View transcript and AI summary

### Live Recording
1. Click on an upcoming meeting
2. Click the record button
3. Grant microphone permission
4. Stop when meeting ends
5. Automatic processing begins

## 🔧 API Endpoints (for developers)

- `POST /api/upload` - Upload audio file
- `GET /api/transcript/{id}` - Get results
- `GET /api/meetings` - List all meetings
- `GET /api/health` - System status

## 📁 File Structure
```
meeting-recorder-backend/
├── src/
│   ├── fastapi_main.py     # Main application
│   ├── static/             # Frontend files
│   └── uploads/            # Processed files
├── .env                    # API keys (create this)
└── requirements.txt        # Dependencies
```

## 🛠️ Troubleshooting

**Transcription not working?**
- Check if faster-whisper installed: `pip list | grep faster-whisper`

**Summaries not generating?**
- Verify OpenAI API key in `.env` file
- Check API key has credits at platform.openai.com

**File upload fails?**
- Ensure file is under 500MB
- Use supported formats: MP3, WAV, WebM, MP4, M4A, OGG, FLAC

## 🚀 Deploy to Production

### Option 1: Simple Cloud Deployment
1. Push code to GitHub: `https://github.com/GA1972/m-scribe`
2. Deploy to Render/Railway/DigitalOcean
3. Set environment variables in platform dashboard

### Option 2: Docker Deployment
```bash
# Create Dockerfile (already provided in full guide)
docker build -t m-scribe .
docker run -p 5000:5000 -e OPENAI_API_KEY=your_key m-scribe
```

## 📞 Support
- **Technical Issues**: Check the comprehensive setup guide
- **Access Requests**: Gieve.acidwalla@gmail.com
- **GitHub**: https://github.com/GA1972/m-scribe

---

**🎉 You're ready to go! M-Scribe will transform your meeting documentation process.**



## 🔧 Customization (Optional)

### Change Password
1. **Create .env file:** `cp .env.example .env`
2. **Edit password:** `MSCRIBE_PASSWORD=YourNewPassword123!`
3. **Restart application**

### Add OpenAI API Key (for AI summaries)
1. **Edit .env file:** `OPENAI_API_KEY=your_key_here`
2. **Restart application**
3. **AI summaries now available**

## 🛡️ Security Features

- **Protected Access:** All features require authentication
- **Secure Sessions:** 8-hour JWT token expiration
- **Professional Interface:** Clean login with M-Scribe branding
- **Contact for Access:** Gieve.acidwalla@gmail.com

## 📞 Need Help?

- **Access Issues:** Check password and contact admin
- **Technical Problems:** Review security setup guide
- **New User Access:** Email Gieve.acidwalla@gmail.com

---

**🎉 M-Scribe is ready for secure team use!**

