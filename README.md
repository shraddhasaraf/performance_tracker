# AI Performance Check-in Assistant

A modern, responsive web application for managing employee performance check-ins with AI-powered feedback assistance. Built with React, this multi-role dashboard supports HR personnel, managers, and employees with tailored interfaces and real-time AI integration.

## 📋 Overview

The AI Performance Check-in Assistant is a comprehensive performance management tool that streamlines the feedback process between employees, managers, and HR teams. The application features:

- **Multi-role dashboards** with role-based access control
- **Real AI integration** for feedback improvement and reframing
- **Responsive design** that works seamlessly across devices
- **Interactive feedback system** with collapsible history and current status tracking
- **Smart analytics** for HR teams to monitor team performance trends

### User Roles

**👥 HR Dashboard**
- View organization-wide performance analytics
- Search and filter employees by teams
- Monitor feedback completion rates and team performance metrics
- Access comprehensive feedback history with AI summaries

**🏢 Manager Dashboard** 
- Provide feedback to team members
- Track team goal progress and completion rates
- Use AI assistance for constructive feedback writing
- View team performance analytics and trends

**👤 Employee Dashboard**
- Submit monthly performance check-ins
- Update goal statuses and progress
- Answer health check questionnaires
- Use AI tools to improve feedback quality before submission

## 🚀 Quick Start

### Prerequisites

Before running this project, make sure you have:
- **Node.js** (version 14.0.0 or higher)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser

### Installation & Setup

#### Windows

1. **Install Node.js**
   - Download Node.js from [nodejs.org](https://nodejs.org/)
   - Run the installer and follow the setup wizard
   - Verify installation by opening Command Prompt and running:
     ```cmd
     node --version
     npm --version
     ```

2. **Clone/Download the Project**
   ```cmd
   cd "performance tracker"
   ```

3. **Install Dependencies**
   ```cmd
   npm install
   ```

4. **Start the Development Server**
   ```cmd
   npm start
   ```

5. **Open the Application**
   - Your browser should automatically open `http://localhost:3000`
   - If not, manually navigate to this address

#### Linux/macOS

1. **Install Node.js**
   
   **Option A: Using Node Version Manager (Recommended)**
   ```bash
   # Install nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   
   # Restart terminal or run:
   source ~/.bashrc
   
   # Install and use latest Node.js
   nvm install node
   nvm use node
   ```
   
   **Option B: Using Package Manager**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nodejs npm
   
   # macOS with Homebrew
   brew install node
   
   # CentOS/RHEL/Fedora
   sudo dnf install nodejs npm
   ```

2. **Navigate to Project Directory**
   ```bash
   cd "performance tracker"
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start the Development Server**
   ```bash
   npm start
   ```

5. **Open the Application**
   - Your browser should automatically open `http://localhost:3000`
   - If not, manually navigate to this address

### Demo Accounts

Test the application using these demo credentials:

| Role | Email | Password |
|------|-------|----------|
| HR | hr@company.com | password |
| Manager | manager@company.com | password |
| Employee | employee@company.com | password |

## 🛠️ Available Scripts

In the project directory, you can run:

- **`npm start`** - Runs the app in development mode (http://localhost:3000)
- **`npm test`** - Launches the test runner in interactive watch mode
- **`npm run build`** - Builds the app for production to the `build` folder
- **`npm run eject`** - Ejects from Create React App (one-way operation, not recommended)

## 🤖 AI Features

### Real AI Integration
- **Live API Integration**: Connected to real AI service for feedback reframing
- **Smart Suggestions**: AI analyzes and improves feedback quality
- **Loading States**: Visual feedback during AI processing
- **Error Handling**: Graceful handling of network issues

### How to Test AI Features
1. Login with any role (HR/Manager/Employee)
2. Navigate to a feedback form
3. Enter text in any feedback textarea
4. Click "Reframe with AI" button
5. View AI suggestions in the modal
6. Choose to accept or keep original text

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout.js        # Main layout with navigation
│   ├── Modal.js         # Modal dialogs
│   ├── AISummaryPanel.js        # AI feedback summaries
│   ├── CollapsibleFeedbackHistory.js # Feedback timeline
│   └── Tooltip.js       # Information tooltips
├── context/             # React Context providers
│   ├── AuthContext.js   # User authentication
│   └── FeedbackContext.js # Feedback state management
├── data/                # Mock data
│   └── mockData.js      # Sample employees, teams, feedback
├── pages/               # Main dashboard pages
│   ├── LoginPage.js     # Authentication
│   ├── HRDashboard.js   # HR analytics dashboard
│   ├── ManagerLanding.js # Manager role selection
│   ├── ManagerDashboard.js # Manager feedback interface
│   └── EmployeeDashboard.js # Employee check-in form
├── utils/               # Utility functions
│   └── aiApi.js         # AI service integration
├── App.js               # Main app component with routing
├── index.js            # React app entry point
└── index.css           # Global styles and variables
```

## 🎨 Features & Functionality

### Design System
- **Modern UI**: Clean, professional interface with consistent styling
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG-compliant color contrasts and keyboard navigation
- **Consistent Typography**: Standardized font hierarchy throughout

### Interactive Elements
- **Smart Tooltips**: Auto-positioning information tooltips
- **Collapsible Sections**: Organized feedback history by month
- **Real-time Updates**: Immediate feedback display across dashboards
- **Progress Tracking**: Visual indicators for goals and completion rates

### Data Management
- **Context API**: Centralized state management for authentication and feedback
- **Local Storage**: Persistent current feedback across browser sessions
- **Mock Data**: Comprehensive sample data for realistic testing
- **Search & Filter**: Real-time employee and team filtering

## 🔧 Customization

### Adding New Data
Edit `src/data/mockData.js` to modify:
- Employee information
- Team structures
- Goal definitions
- Historical feedback data

### Styling Changes
- **Global styles**: `src/index.css`
- **Component styles**: Individual CSS files
- **CSS variables**: Consistent theming in `index.css`

### AI Configuration
The AI service endpoint is configured in `src/utils/aiApi.js`. Update the URL to integrate with different AI services.

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Mobile Experience

The application is fully responsive and provides an optimized experience on:
- iOS devices (iPhone/iPad)
- Android phones and tablets
- Touch-friendly interface with appropriate sizing

## 🔍 Troubleshooting

### Common Issues

**Port 3000 already in use**
```bash
# Kill process using port 3000
npx kill-port 3000

# Or start on different port
PORT=3001 npm start
```

**Installation fails on Windows**
- Ensure you have administrator privileges
- Try clearing npm cache: `npm cache clean --force`
- Delete `node_modules` and run `npm install` again

**Installation fails on Linux/macOS**
- Check Node.js version: `node --version` (should be 14+)
- Try with sudo if permission issues: `sudo npm install`
- On macOS, you might need Xcode command line tools: `xcode-select --install`

**AI features not working**
- Check network connection
- Verify the AI service endpoint is accessible
- Check browser console for error messages

## 📄 License

This project is for demonstration purposes. Feel free to use and modify as needed for your own projects.

## 🤝 Support

For questions or issues:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure all dependencies are properly installed
4. Verify Node.js version compatibility