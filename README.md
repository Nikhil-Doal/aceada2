# 🚀 AceFlow - Premium Workflow Builder

A beautiful, modern workflow builder powered by React Flow and Google's Gemini AI. Create powerful automation workflows with an intuitive drag-and-drop interface.

## 🌟 Live Demo

**Try it now**: [[https://ace-flow.vercel.app/](https://ace-flow.vercel.app/)]

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🎨 **Premium UI** - Beautiful gradient themes with smooth animations and glassmorphism effects
- 🤖 **AI Integration** - Powered by Google's Gemini AI (free tier available)
- 🔗 **Visual Workflow Builder** - Drag-and-drop nodes to create complex workflows
- 📊 **Multiple Node Types** - Input, API, AI Agent, and Output nodes
- 💾 **Local Storage** - Save and load workflows directly in your browser
- 🎯 **Real-time Execution** - Watch your workflows execute in real-time
- 📋 **JSON Support** - Automatic JSON formatting with syntax highlighting
- ⌨️ **Keyboard Shortcuts** - Efficient workflow management with keyboard controls

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## 🔑 Getting a Free Gemini API Key

The AI Agent node requires a Google Gemini API key. Here's how to get one for **FREE**:

### Step 1: Go to Google AI Studio
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account

### Step 2: Create an API Key
1. Click on **"Get API Key"** or **"Create API Key"**
2. Select **"Create API key in new project"** (or choose an existing project)
3. Your API key will be generated instantly

### Step 3: Copy Your API Key
1. Click the **copy icon** next to your API key
2. Store it somewhere safe (you'll need it later)

### Important Notes:
- ✅ The API key is **completely FREE** to use
- ✅ Free tier includes **60 requests per minute**
- ✅ No credit card required
- ⚠️ **Never share your API key publicly**
- 📍 Each API key is tied to your Google account

## 🚀 Installation

### 1. Clone or Download the Project

```bash
# If you have the project as a zip, extract it
# Or if using git:
git clone <repository-url>
cd aceada2
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Open in Browser

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the workflow builder interface.

## 📖 How to Use

### Creating Your First Workflow

1. **Add Nodes to Canvas**
   - Drag any node from the left sidebar onto the canvas
   - Available nodes: Input, API, AI Agent, Output

2. **Connect Nodes**
   - Click and drag from the **right circle** (output) of one node
   - Connect to the **left circle** (input) of another node
   - Data flows from left to right

3. **Configure Nodes**
   - Click on a node to configure its settings
   - Each node type has different configuration options

4. **Run Workflow**
   - Click the **"Run Workflow"** button in the top bar
   - Watch as data flows through your workflow in real-time

### Node Types

#### 🔵 Input Node (Blue)
- **Purpose**: Provide initial data to your workflow
- **Configuration**: Enter text or JSON data
- **Use Case**: Starting point for any workflow

#### 🟢 API Node (Green)
- **Purpose**: Fetch data from external APIs
- **Configuration**: Enter the API endpoint URL
- **Example URL**: `https://catfact.ninja/fact`
- **Use Case**: Get data from REST APIs

#### 🟣 AI Agent Node (Purple/Pink)
- **Purpose**: Process data using Google's Gemini AI
- **Configuration**:
  - **API Key**: Paste your Gemini API key
  - **Model**: Choose between:
    - `gemini-2.5-flash` (Recommended - Stable)
    - `gemini-flash-latest` (Latest features)
- **Use Case**: Natural language processing, text generation, data analysis

#### 🟠 Output Node (Orange)
- **Purpose**: Display workflow results
- **Features**:
  - **View Modes**: Toggle between Text and JSON view
  - **Copy**: Copy output to clipboard
  - **Download**: Save output as .txt or .json file
  - **Syntax Highlighting**: Color-coded JSON with line numbers
- **Use Case**: View and export final results

### Example Workflows

#### 1. Simple API Data Display
```
Input → API → Output
```
1. Input: Leave empty (API doesn't need input)
2. API: `https://catfact.ninja/fact`
3. Output: Shows the cat fact

#### 2. AI-Powered Text Processing
```
Input → AI Agent → Output
```
1. Input: "Explain quantum computing in simple terms"
2. AI Agent: Enter your API key, select model
3. Output: AI-generated explanation

#### 3. API Data + AI Analysis
```
API → AI Agent → Output
```
1. API: Fetch data from an API
2. AI Agent: "Summarize this data in 3 bullet points"
3. Output: AI-processed summary

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Delete` | Remove selected nodes or connections |
| `Shift` + Click | Multi-select nodes |
| `Drag` | Connect nodes or move canvas |
| `Scroll` | Zoom in/out on canvas |

## 💾 Save & Load Workflows

### Saving Workflows
1. Click the **Save** button (💾 icon) in the sidebar
2. Workflow is saved to your browser's local storage
3. A success notification will appear

### Loading Workflows
1. Click the **Load** button (📤 icon) in the sidebar
2. Your previously saved workflow will be restored
3. All nodes and connections will reappear

### Clear Canvas
1. Click the **Clear** button (🗑️ icon) in the sidebar
2. Confirm the action
3. All nodes will be removed

**Note**: Workflows are saved locally in your browser. Clearing browser data will delete saved workflows.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Workflow Engine**: ReactFlow
- **State Management**: Zustand
- **AI**: Google Generative AI (@google/generative-ai)
- **Notifications**: Sonner
- **Icons**: Lucide React

## 🎨 UI Features

- **Gradient Themes**: Each node type has a unique gradient color scheme
- **Glassmorphism**: Frosted glass effects throughout the UI
- **Animations**: Smooth transitions and hover effects
- **Dark Mode**: Premium dark theme optimized for long sessions
- **Responsive**: Works on desktop browsers

## 🐛 Troubleshooting

### "No saved workflow found" Error
- **Cause**: No workflow has been saved yet
- **Solution**: Create a workflow and click Save before trying to Load

### AI Agent Not Working
- **Cause**: Invalid or missing API key
- **Solutions**:
  1. Verify your API key is correct
  2. Check API key hasn't expired
  3. Ensure you copied the entire key
  4. Try generating a new API key

### "Workflow failed" Error
- **Causes**:
  - AI Agent: Invalid API key or rate limit exceeded
  - API Node: Invalid URL or API is down
  - Network issues
- **Solutions**:
  1. Check your internet connection
  2. Verify all node configurations
  3. Check browser console for detailed errors

### Nodes Won't Connect
- **Cause**: Trying to connect incompatible directions
- **Solution**: Always drag from RIGHT circle to LEFT circle

### Output Not Showing
- **Cause**: Workflow hasn't been executed
- **Solution**: Click the "Run Workflow" button

### Scrolling Issues in Output
- **Cause**: Browser compatibility
- **Solution**: Use latest version of Chrome, Firefox, or Edge

## 🌐 Deploying to Vercel

Vercel is the recommended platform for deploying Next.js applications. It's **completely free** for personal projects!

### Prerequisites for Deployment

1. **GitHub Account** - [Sign up free](https://github.com/signup)
2. **Vercel Account** - [Sign up free](https://vercel.com/signup)
3. Your project code pushed to GitHub

### Step 1: Push Your Code to GitHub

If you haven't already pushed your code to GitHub:

#### Option A: Using GitHub Desktop (Easiest)
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in with your GitHub account
3. Click **"Add"** → **"Add Existing Repository"**
4. Navigate to `C:\Users\nikhi\Desktop\aceada2`
5. Click **"Create Repository"** on GitHub.com
6. Name it (e.g., `aceflow`)
7. Click **"Publish repository"**

#### Option B: Using Command Line
```bash
# Navigate to your project
cd C:\Users\nikhi\Desktop\aceada2

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit"

# Create a new repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Quick Deploy (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click **"Sign Up"** or **"Log In"**
   - Choose **"Continue with GitHub"**

2. **Import Your Project**
   - Click **"Add New..."** → **"Project"**
   - Authorize Vercel to access your GitHub repositories
   - Find your `aceflow` repository
   - Click **"Import"**

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes for the build to complete
   - 🎉 Your app is live!

### Step 3: Access Your Live App

After deployment:
1. Vercel will show you a **live URL** (e.g., `aceflow.vercel.app`)
2. Click the URL to open your deployed app
3. Share this URL with anyone!

**Example Live Demo**: [https://aceflowdeploy.vercel.app/](https://aceflowdeploy.vercel.app/)

### Auto-Deployments

Once connected, Vercel will automatically:
- ✅ Deploy when you push to the `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Show build logs and errors
- ✅ Provide free SSL/HTTPS
- ✅ Offer global CDN distribution

### Custom Domain (Optional)

To use your own domain:
1. Go to your project on Vercel
2. Click **"Settings"** → **"Domains"**
3. Enter your domain name
4. Follow the DNS configuration instructions

### Environment Variables (If Needed in Future)

If you ever need to add environment variables:
1. Go to **"Settings"** → **"Environment Variables"**
2. Add your variables
3. Redeploy the application

**Note**: Currently, API keys are entered directly in the UI, so no environment variables are needed for this project.

### Troubleshooting Deployment

#### Build Fails
- **Check Build Logs**: Vercel shows detailed error messages
- **Common Issues**:
  - Missing dependencies: Run `npm install` locally first
  - TypeScript errors: Fix any errors shown in logs
  - Build timeout: Usually resolves on retry

#### App Doesn't Load
- **Clear browser cache** and hard refresh (Ctrl + Shift + R)
- **Check Vercel deployment logs** for runtime errors
- **Verify all dependencies** are in `package.json`

#### "Function Too Large" Error
- Next.js apps are under 50MB by default
- This app is well under the limit
- If it happens, check for large files in your repository

### Vercel Dashboard Features

After deployment, you can:
- 📊 **View Analytics** - See visitor stats
- 🔍 **Monitor Performance** - Check load times
- 📝 **View Logs** - Real-time function logs
- 🔄 **Rollback** - Revert to previous deployments
- 🌍 **Multiple Environments** - Production, preview, development

## 📝 Development

### Build for Production

```bash
npm run build
npm run start
```

### Lint Code

```bash
npm run lint
```

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available for personal and educational use.

## 🙏 Acknowledgments

- **Google Gemini AI** - For providing free AI capabilities
- **ReactFlow** - For the excellent workflow visualization library
- **shadcn/ui** - For beautiful UI components
- **Vercel** - For Next.js framework and free hosting

---

**Built with ❤️ using Next.js and Gemini AI**

**Live Demo**: [https://aceflowdeploy.vercel.app/](https://aceflowdeploy.vercel.app/)

For questions or issues, please check the troubleshooting section above.
