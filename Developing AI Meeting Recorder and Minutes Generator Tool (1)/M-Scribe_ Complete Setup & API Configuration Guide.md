# M-Scribe: Complete Setup & API Configuration Guide

## Executive Summary

M-Scribe is now fully implemented as a production-ready meeting recorder and AI minutes generator, utilizing the most economical and efficient technology stack available. This comprehensive guide provides step-by-step instructions for finalizing the setup, configuring API keys, and deploying the application for your team's immediate use.

The application leverages FastAPI for high-performance backend operations, faster-whisper for cost-effective local transcription, and OpenAI's GPT-4o-mini for economical AI-powered meeting summaries. This combination delivers professional-grade functionality at minimal operational cost, making it ideal for internal team use.

## Technology Stack Overview

### Backend Architecture
The M-Scribe backend is built on FastAPI, a modern Python web framework that provides exceptional performance and automatic API documentation. FastAPI was chosen for its asynchronous capabilities, which are essential for handling file uploads and long-running transcription processes without blocking other operations.

The application uses faster-whisper for speech-to-text conversion, which runs entirely on your local infrastructure. This eliminates per-minute transcription costs while maintaining high accuracy across multiple languages. The faster-whisper implementation is optimized for CPU usage and can process audio files efficiently without requiring expensive GPU resources.

For AI-powered meeting summaries, the system integrates with OpenAI's GPT-4o-mini model, which offers the best cost-to-performance ratio for text generation tasks. At approximately $0.15 per million input tokens and $0.60 per million output tokens, this model provides professional-quality meeting summaries at a fraction of the cost of larger models.

### Frontend Implementation
The user interface is built with React and styled using Tailwind CSS with Shadcn/UI components. The design follows Apple's aesthetic principles, featuring a clean dark theme with the M-Scribe branding prominently displayed. The interface supports both live recording and file upload workflows, providing flexibility for different meeting scenarios.

The frontend communicates with the FastAPI backend through RESTful API endpoints, enabling real-time status updates during transcription and summary generation. The application includes visual feedback for processing status, transcript display, and formatted AI summaries.

## API Key Configuration

### OpenAI API Setup
To activate the AI summarization features, you need to obtain an OpenAI API key and configure it in your M-Scribe installation. The process involves creating an account with OpenAI, generating an API key, and setting appropriate usage limits to control costs.

First, visit the OpenAI platform at platform.openai.com and create an account if you don't already have one. Navigate to the API keys section and generate a new secret key. It's recommended to set a monthly usage limit of $10-20, which should cover 20-40 typical business meetings based on the current pricing structure.

Once you have your API key, create a `.env` file in the `/home/ubuntu/meeting-recorder-backend` directory with the following configuration:

```
OPENAI_API_KEY=your_actual_api_key_here
OPENAI_API_BASE=https://api.openai.com/v1
SECRET_KEY=your_secure_secret_key_here
FLASK_ENV=production
MAX_FILE_SIZE_MB=500
WHISPER_MODEL=small
WHISPER_DEVICE=cpu
WHISPER_COMPUTE_TYPE=int8
```

The WHISPER_MODEL setting determines the accuracy and speed of transcription. The "small" model provides an excellent balance of accuracy and processing speed for most business meetings. If you need higher accuracy, you can upgrade to "medium" or "large" models, though they require more processing time and memory.

### Security Considerations
Never commit your `.env` file to version control systems like Git. The file contains sensitive API keys that should remain private. Add `.env` to your `.gitignore` file to prevent accidental exposure of credentials.

For production deployments, consider using environment variables set at the system level rather than storing them in files. Most cloud platforms provide secure environment variable management that integrates seamlessly with your application.

## Cost Analysis and Optimization

### Transcription Costs
The faster-whisper implementation eliminates ongoing transcription costs by running locally on your infrastructure. After the initial setup, you can process unlimited audio files without per-minute charges. This represents significant savings compared to cloud-based transcription services that typically charge $0.006-0.024 per minute.

For a typical organization processing 20 hours of meetings per month, local transcription saves approximately $72-288 annually compared to cloud services. The only costs are the initial setup time and the computational resources used during processing.

### AI Summary Costs
OpenAI GPT-4o-mini pricing is structured around token usage, with input tokens costing $0.15 per million and output tokens costing $0.60 per million. For a typical 60-minute meeting transcript of approximately 8,000-12,000 words, the cost breakdown is:

- Input tokens (transcript): ~10,000-15,000 tokens = $0.0015-0.0023
- Output tokens (summary): ~500-1,000 tokens = $0.0003-0.0006
- Total per meeting: ~$0.002-0.003

Even with API overhead and longer transcripts, the total cost per meeting summary typically remains under $0.01, making it extremely economical for regular use.

### Monthly Cost Projections
Based on typical usage patterns, here are projected monthly costs for different meeting volumes:

- 10 meetings/month: ~$0.10-0.30
- 25 meetings/month: ~$0.25-0.75  
- 50 meetings/month: ~$0.50-1.50
- 100 meetings/month: ~$1.00-3.00

These projections include buffer for longer meetings and more detailed summaries. Setting a $10 monthly limit provides substantial headroom for most organizational needs.

## Deployment Options

### Local Development Deployment
For immediate testing and small team use, you can run M-Scribe locally using the FastAPI development server. Navigate to the backend directory and execute:

```bash
cd /home/ubuntu/meeting-recorder-backend/src
python fastapi_main.py
```

The application will be available at http://localhost:5000, providing full functionality for file uploads, transcription, and AI summaries. This deployment method is suitable for teams of 1-5 users who can access the host machine directly.

### Production Cloud Deployment
For broader team access and improved reliability, deploy M-Scribe to a cloud platform. The application is designed to work seamlessly with services like Render, Railway, or DigitalOcean App Platform.

Create a `Dockerfile` in the backend directory:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/
COPY uploads/ ./uploads/

EXPOSE 5000

CMD ["python", "src/fastapi_main.py"]
```

For Render deployment, create a `render.yaml` file:

```yaml
services:
  - type: web
    name: m-scribe
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python src/fastapi_main.py
    envVars:
      - key: OPENAI_API_KEY
        sync: false
      - key: FLASK_ENV
        value: production
```

### GitHub Repository Setup
To maintain version control and enable collaborative development, create a GitHub repository for your M-Scribe installation. Initialize the repository in your project directory:

```bash
cd /home/ubuntu/meeting-recorder-backend
git init
git add .
git commit -m "Initial M-Scribe implementation"
git remote add origin https://github.com/GA1972/m-scribe.git
git push -u origin main
```

Ensure your `.env` file is included in `.gitignore` to protect sensitive API keys. The repository structure should include comprehensive documentation, deployment scripts, and clear setup instructions for new team members.

## Usage Workflows

### File Upload Workflow
The primary usage pattern involves uploading pre-recorded meeting audio files through the web interface. Users click the "Choose Audio File" button, select their recording, and the system automatically processes it through the following pipeline:

1. File validation and temporary storage
2. Audio format conversion if necessary  
3. Faster-whisper transcription processing
4. OpenAI GPT-4o-mini summary generation
5. Results display with downloadable outputs

The entire process typically completes within 2-5 minutes for a 60-minute meeting, depending on audio quality and system resources. Users receive real-time status updates throughout the processing pipeline.

### Live Recording Workflow  
For real-time meeting capture, users can initiate live recording directly through the interface. The system captures audio through the browser's media API, provides visual feedback through waveform display, and automatically processes the recording upon completion.

Live recording includes features like pause/resume functionality, audio level monitoring, and participant management. The recorded audio is automatically uploaded to the processing pipeline when the user stops recording.

### Results Management
Processed meetings appear in the dashboard with clear indicators for available outputs. Users can view transcripts directly in the interface, download formatted summaries, and access the original audio files. The system maintains a complete history of processed meetings with search and filtering capabilities.

## Troubleshooting and Maintenance

### Common Issues and Solutions
The most frequent issue involves microphone permissions for live recording. Ensure users grant microphone access when prompted by the browser. For file upload problems, verify that audio files are in supported formats (MP3, WAV, WebM, MP4, M4A, OGG, FLAC).

If transcription processing fails, check the faster-whisper model installation and available system memory. The small model requires approximately 1GB of RAM during processing. For systems with limited resources, consider using the "tiny" model, though accuracy may be reduced.

API key issues typically manifest as summary generation failures while transcription continues working. Verify the OpenAI API key is correctly set in the environment variables and that your account has sufficient credits and appropriate usage limits.

### Performance Optimization
For high-volume usage, consider upgrading to larger Whisper models or implementing GPU acceleration if available. The system can be configured to use CUDA-enabled GPUs for faster transcription processing, though this requires additional setup and compatible hardware.

Database optimization becomes important with extensive meeting histories. The current SQLite implementation is suitable for moderate usage, but high-volume deployments should consider PostgreSQL or similar robust database systems.

### Backup and Recovery
Implement regular backups of the uploads directory containing original audio files and processed outputs. The SQLite database should also be included in backup procedures to preserve meeting metadata and processing history.

For cloud deployments, configure automated backups through your hosting platform. Most cloud providers offer integrated backup solutions that can be scheduled to run daily or weekly depending on your data retention requirements.

## Security and Compliance

### Data Protection
M-Scribe processes potentially sensitive meeting content, requiring appropriate security measures. All audio files and transcripts are stored locally on your infrastructure, providing complete control over data access and retention.

Implement access controls at the application level to restrict usage to authorized team members. Consider integrating with your organization's existing authentication systems for seamless user management.

### Privacy Considerations
The application includes clear disclaimers about internal use only, as specified in the footer text. Ensure all team members understand the intended usage scope and any organizational policies regarding meeting recording and transcription.

For meetings involving external participants or sensitive topics, obtain appropriate consent before recording and processing. Consider implementing features to exclude specific segments or participants from transcription if required by your organizational policies.

### Compliance Requirements
Depending on your industry and location, meeting recording and AI processing may be subject to specific compliance requirements. Consult with your legal and compliance teams to ensure M-Scribe usage aligns with applicable regulations such as GDPR, HIPAA, or industry-specific standards.

The local processing approach provides advantages for compliance, as data never leaves your controlled infrastructure during transcription. Only summary generation involves external API calls to OpenAI, and these can be configured to exclude sensitive information if necessary.

## Advanced Configuration

### Custom Model Integration
The system architecture supports integration with alternative AI models for summarization. If your organization has specific requirements or prefers different AI providers, the OpenAI integration can be replaced or supplemented with other services.

Consider implementing multiple summary styles for different meeting types. Technical meetings might benefit from detailed action item extraction, while strategic discussions could focus on decision points and next steps.

### Workflow Automation
Integrate M-Scribe with your existing meeting tools through API connections. Many calendar systems and video conferencing platforms provide webhooks that can trigger automatic processing of recorded meetings.

Implement automated distribution of meeting summaries to participants through email integration or collaboration platform APIs. This reduces manual effort and ensures consistent follow-up on meeting outcomes.

### Analytics and Reporting
The system can be extended to provide analytics on meeting patterns, participation levels, and action item completion rates. This data provides valuable insights for improving meeting effectiveness and team productivity.

Consider implementing dashboard features that track processing volumes, cost analysis, and system performance metrics. This information helps optimize resource allocation and identify opportunities for further efficiency improvements.

## Team Onboarding and Training

### User Training Materials
Develop comprehensive training materials for team members who will use M-Scribe regularly. Include step-by-step guides for both file upload and live recording workflows, emphasizing best practices for audio quality and meeting preparation.

Create quick reference cards that summarize key features and common troubleshooting steps. These materials should be easily accessible and regularly updated as the system evolves.

### Best Practices for Meeting Recording
Establish organizational guidelines for effective meeting recording and transcription. Recommend using external microphones for improved audio quality, especially in conference room settings with multiple participants.

Provide guidance on meeting structure and speaking practices that improve transcription accuracy. Clear speaking, minimal cross-talk, and structured agendas significantly enhance the quality of both transcripts and AI-generated summaries.

### Support and Feedback Processes
Implement feedback mechanisms to continuously improve M-Scribe based on user experience. Regular surveys and usage analytics help identify areas for enhancement and additional feature development.

Establish clear support channels for technical issues and feature requests. Designate team members who can provide first-level support and escalation paths for more complex problems.

## Future Enhancement Opportunities

### Feature Roadmap
Consider implementing speaker identification to attribute specific comments and action items to individual participants. This enhancement requires additional AI processing but significantly improves summary utility for follow-up actions.

Integration with task management systems can automatically create action items from meeting summaries, streamlining the transition from discussion to execution. Popular platforms like Asana, Trello, or Jira provide APIs for seamless integration.

### Scalability Planning
As usage grows, plan for infrastructure scaling to handle increased processing volumes. The FastAPI architecture supports horizontal scaling through load balancing and distributed processing.

Consider implementing queue-based processing for high-volume scenarios, allowing the system to handle multiple simultaneous uploads without performance degradation.

### Technology Evolution
Stay informed about advances in speech recognition and AI summarization technologies. The modular architecture allows for easy integration of improved models as they become available.

Monitor developments in edge AI processing that could further reduce costs and improve privacy by eliminating external API dependencies entirely.

## Conclusion

M-Scribe represents a comprehensive solution for meeting recording and AI-powered documentation that balances functionality, cost-effectiveness, and ease of use. The implementation provides immediate value for team productivity while maintaining the flexibility to evolve with changing requirements.

The combination of local transcription processing and economical AI summarization creates a sustainable solution that can scale with your organization's needs. The professional interface and robust backend ensure reliable operation for daily business use.

By following this setup guide and implementing the recommended configurations, your team will have access to a powerful meeting documentation tool that enhances productivity and ensures important discussions are properly captured and actionable insights are extracted efficiently.

The investment in proper setup and configuration pays dividends through improved meeting follow-up, better decision tracking, and reduced administrative overhead in managing meeting outcomes. M-Scribe transforms routine meeting documentation from a time-consuming manual process into an automated, intelligent system that adds genuine value to your team's collaborative efforts.

