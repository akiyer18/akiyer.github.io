# Akshaye Iyer - Portfolio

> **Engineer of Ideas | Explorer of AI, LLMs, Linguistics, Football & Singing**

A modern, responsive portfolio website built with React and Tailwind CSS, showcasing innovative projects across AI, productivity tools, and creative applications.

## 🚀 Live Demo

Visit the portfolio at: **[https://akiyer18.github.io](https://akiyer18.github.io)**

## ✨ Features

### 🏠 **Modern Design**
- **Gradient Hero Section** with animated elements and smooth scroll
- **Glass Morphism UI** with backdrop blur effects
- **Dark Mode Support** with system preference detection
- **Responsive Design** optimized for all devices
- **Smooth Animations** powered by Framer Motion

### 🧭 **Navigation & Sections**
- **Three Main Categories:**
  - 📈 **Growth Mindset Tools** - Productivity applications
  - 🎵 **Music Projects** - Creative audio tools
  - 🤖 **AI Tools** - LLM and NLP applications
- **Interactive Cards** with hover effects and smooth transitions
- **Scroll-triggered Animations** for engaging user experience

### 🔐 **Privacy-First Approach**
- **Privacy Badges** highlighting data protection measures
- **Security Notes** explaining how user data is handled
- **Local Processing** emphasis for sensitive applications
- **Transparent Data Practices** across all projects

### 🛠️ **Project Showcase**
- **Live Demo Links** to working applications
- **GitHub Repository** access for each project
- **One-Click Clone Commands** with copy functionality
- **Tech Stack Tags** showing technologies used
- **Status Indicators** (Live, Beta, Development, Coming Soon)

## 🏗️ **Tech Stack**

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS, Custom CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **Deployment:** GitHub Pages
- **Build Tool:** Vite

## 📦 **Installation & Setup**

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akiyer18/akiyer18.github.io.git
   cd akiyer18.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 📁 **Project Structure**

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.jsx   # Header navigation with dark mode
│   ├── ProjectCard.jsx  # Project showcase cards
│   └── Footer.jsx       # Footer with links and info
├── pages/              # Route-based page components
│   ├── HomePage.jsx    # Landing page with hero section
│   ├── GrowthPage.jsx  # Growth tools showcase
│   ├── MusicPage.jsx   # Music projects showcase
│   └── AIPage.jsx      # AI tools showcase
├── hooks/              # Custom React hooks
│   └── useTheme.jsx    # Dark mode theme management
├── data/               # Static data and content
│   └── projects.js     # Project information and metadata
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎨 **Design System**

### Color Palette
- **Primary:** Purple gradient (`#8B7CF6` to `#06B6D4`)
- **Accent:** Purple (`#9333EA`) and Cyan (`#06B6D4`)
- **Neutral:** Gray scale with dark mode support

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Monospace:** JetBrains Mono for code blocks

### Components
- **Buttons:** Primary, Secondary, and Outline variants
- **Cards:** Hover effects with shadow and transform
- **Badges:** Status and privacy indicators
- **Animations:** Fade-in, slide-up, and scale effects

## 🚀 **Featured Projects**

### 📈 Growth Mindset Tools
- **Money Mastery Tool** - Privacy-first expense tracking
- **Meal Decider Pro** - Smart meal planning with glass morphism UI
- **Grocery List Generator** - Advanced grocery management system
- **Growth Mindset Game** - Gamified productivity platform

### 🎵 Music Projects *(Coming Soon)*
- **Beat Maker Studio** - Professional beat creation tool
- **Song Analyzer** - AI-powered music analysis
- **Smart Playlist Generator** - Intelligent playlist creation

### 🤖 AI Tools *(In Development)*
- **Smart LLM Assistant** - Personal AI assistant
- **AI Content Creator** - Intelligent content generation
- **Linguistic Analyzer** - Advanced text analysis tool

## 🔧 **Customization**

### Adding New Projects

1. **Update project data** in `src/data/projects.js`:
   ```javascript
   {
     id: 'project-id',
     title: 'Project Name',
     emoji: '🚀',
     description: 'Project description...',
     tech: ['React', 'TypeScript'],
     privacy: 'Privacy-First',
     liveDemo: 'https://demo-url.com',
     github: 'https://github.com/username/repo',
     status: 'live'
   }
   ```

2. **Project will automatically appear** in the appropriate section

### Modifying Sections

- Edit `sectionInfo` in `src/data/projects.js`
- Update colors, descriptions, and metadata
- Add new sections by creating new page components

## 📱 **Responsive Design**

- **Mobile-First** approach with Tailwind CSS
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-Friendly** interactions and navigation
- **Optimized Performance** for all device types

## 🌙 **Dark Mode**

- **System Preference Detection** on first visit
- **Manual Toggle** in navigation
- **Persistent Storage** using localStorage
- **Smooth Transitions** between themes

## 📈 **Performance**

- **Vite Build Optimization** for fast loading
- **Code Splitting** with React Router
- **Optimized Images** and assets
- **Minimal Bundle Size** with tree shaking

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Contact**

- **GitHub:** [@akiyer18](https://github.com/akiyer18)
- **LinkedIn:** [akshaye-iyer](https://www.linkedin.com/in/akshaye-iyer/)
- **Email:** [akshaye.iyer@outlook.com](mailto:akshaye.iyer@outlook.com)

---

**Built with ❤️ and modern web technologies**
