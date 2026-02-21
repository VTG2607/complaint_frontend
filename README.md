# Complaint Management System - Frontend

React-based frontend application for the Complaint Management System built with Vite.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will run at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page-level components
├── context/        # React Context providers
├── services/       # API service functions
├── assets/         # Static assets
├── App.jsx         # Main application component
└── main.jsx        # Application entry point
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Deploy to GitHub Pages |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in this directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME=Complaint Management System
```

### API Configuration

Backend API base URL is configured in `src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
```

## 📦 Key Technologies

- **React 19.1.1** - UI library
- **Vite 5.x** - Build tool and dev server
- **React Router 7.8.2** - Client-side routing
- **Axios 1.12.2** - HTTP client
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **Material-UI 7.3.6** - React component library
- **React Icons** - Icon library

## 🏗️ Building for Production

```bash
# Create optimized production build
npm run build

# Output will be in the `dist` folder
```

The build is minified and optimized for best performance.

## 🌐 Deployment

### GitHub Pages

```bash
npm run deploy
```

### Vercel/Netlify

Simply connect your repository and deploy the `frontend/complaint_frontend` directory.

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure server to serve `index.html` for all routes (SPA requirement)

## 🔌 Connecting to Backend

Ensure the backend API is running at the URL specified in `VITE_API_BASE_URL`.

The frontend expects the following API endpoints:
- `/dj-rest-auth/login/` - User login
- `/dj-rest-auth/registration/` - User registration
- `/complaint/` - Complaint operations
- `/categories/` - Category listing
- `/me/` - Current user info

See [API Documentation](../../API_DOCUMENTATION.md) for complete API reference.

## 🎨 Styling

This project uses **Tailwind CSS** for styling. Configuration is in `tailwind.config.cjs`.

### Adding Custom Styles

```javascript
// tailwind.config.cjs
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      }
    }
  }
}
```

## 🧪 Testing

```bash
# Run tests (if configured)
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📚 Documentation

- [Main README](../../README.md)
- [Installation Guide](../../INSTALLATION.md)
- [API Documentation](../../API_DOCUMENTATION.md)
- [User Guide](../../USER_GUIDE.md)
- [Architecture](../../ARCHITECTURE.md)

## 🐛 Troubleshooting

### Common Issues

**Port 5173 already in use:**
```bash
# Kill the process or change port in vite.config.js
```

**API connection error:**
- Check if backend is running at `http://localhost:8000`
- Verify CORS configuration in backend
- Check `VITE_API_BASE_URL` in `.env`

**Module not found errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](../../LICENSE) file.

---

**Version:** 1.0.0  
**Last Updated:** February 2026
