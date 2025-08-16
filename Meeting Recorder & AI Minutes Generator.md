# Meeting Recorder & AI Minutes Generator

A professional meeting recording and management tool with AI-powered transcription and minutes generation capabilities. Built with React and Flask, featuring a clean Apple-inspired design.

## 🚀 Live Demo

**[Try the Application](https://p9hwiqcn9pz0.manus.space)**

## ✨ Features

- **Real-time Audio Recording** - Browser-based recording with visual feedback
- **Meeting Management** - Schedule, organize, and track meetings
- **Clean UI Design** - Apple-inspired interface with black and white theme
- **Responsive Design** - Works on desktop and mobile devices
- **File Upload Support** - Alternative audio input method
- **AI-Ready Framework** - Prepared for OpenAI Whisper transcription and GPT-4 minutes generation

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- Shadcn/UI Components
- Lucide React Icons
- Web Audio API

### Backend
- Flask with SQLAlchemy
- SQLite Database
- RESTful API Design
- File Upload Handling
- CORS Enabled

## 📦 Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/GA1972/meeting-recorder.git
   cd meeting-recorder
   ```

2. **Backend Setup**
   ```bash
   cd meeting-recorder-backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python src/main.py
   ```

3. **Frontend Development** (optional)
   ```bash
   cd meeting-recorder-frontend
   npm install
   npm run dev
   ```

4. **Production Build**
   ```bash
   cd meeting-recorder-frontend
   npm run build
   cp -r dist/* ../meeting-recorder-backend/src/static/
   ```

## 🔧 Configuration

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_BASE=https://api.openai.com/v1
FLASK_ENV=production
```

## 📱 Usage

1. **Access the Application** - Open the deployed URL or run locally
2. **View Meetings** - Browse upcoming and recent meetings
3. **Start Recording** - Click "Start Recording" on any meeting
4. **Record Audio** - Use the microphone button to capture audio
5. **Upload Files** - Alternative option for pre-recorded audio

## 🤖 AI Features (Optional)

The application includes a complete AI integration framework:

- **Speech-to-Text** using OpenAI Whisper
- **Automated Minutes** using GPT-4
- **Real-time Processing** status tracking

To activate AI features, uncomment the AI routes in `src/main.py` and configure OpenAI credentials.

## 📊 API Endpoints

### Meetings
- `GET /api/meetings` - List all meetings
- `POST /api/meetings` - Create new meeting
- `GET /api/meetings/{id}` - Get meeting details
- `PUT /api/meetings/{id}` - Update meeting

### Recording
- `POST /api/meetings/{id}/start-recording` - Start recording
- `POST /api/meetings/{id}/stop-recording` - Stop recording
- `POST /api/meetings/{id}/upload-recording` - Upload audio file

### AI Processing (when enabled)
- `POST /api/transcribe/{id}` - Transcribe audio
- `POST /api/generate-minutes/{id}` - Generate minutes
- `GET /api/meetings/{id}/transcription` - Get transcription
- `GET /api/meetings/{id}/minutes` - Get minutes

## 🏗️ Project Structure

```
meeting-recorder/
├── meeting-recorder-frontend/     # React application
│   ├── src/
│   │   ├── components/ui/         # UI components
│   │   ├── App.jsx               # Main component
│   │   └── App.css               # Styles
│   └── dist/                     # Built files
├── meeting-recorder-backend/      # Flask API
│   ├── src/
│   │   ├── models/               # Database models
│   │   ├── routes/               # API routes
│   │   └── main.py               # Flask app
│   └── uploads/                  # File storage
└── docs/                         # Documentation
```

## 🔒 Security

- File upload size limits (500MB)
- Input validation on all endpoints
- Secure filename handling
- CORS configuration for development

**Production Recommendations:**
- Implement user authentication
- Add rate limiting
- Use HTTPS
- Add audit logging

## 🚀 Deployment

The application is production-ready and can be deployed to:

- **Current:** Production deployment service
- **Docker:** Containerized deployment
- **Cloud:** AWS, Google Cloud, Azure
- **Self-hosted:** Traditional server setup

## 🧪 Testing

Manual testing completed for:
- Audio recording functionality
- Meeting management
- File uploads
- Responsive design
- API endpoints

## 📈 Performance

- Efficient audio recording with chunked data
- Lazy loading for meeting lists
- Optimized database queries
- Compressed frontend assets

## 🤝 Contributing

This project is for internal use. For questions or support:

**Contact:** gieve.acidwalla@gmail.com

## 📄 License

Internal use only. Not for commercial distribution.

## 🔮 Roadmap

- [ ] Activate AI transcription and minutes generation
- [ ] Calendar integration
- [ ] Mobile application
- [ ] Advanced analytics
- [ ] Real-time collaboration features

---

**Built with ❤️ for efficient meeting management**

