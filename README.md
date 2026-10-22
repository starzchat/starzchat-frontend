# StarzChat Frontend

A Telegram-like chat web application built with React, Vite, Tailwind CSS, and PWA support.

## Features

- 🔐 JWT Authentication
- 💬 Real-time messaging with Socket.IO
- 👥 Group chats and direct messages
- ⏱️ Self-destructing messages (TTL)
- 💾 Saved messages
- 📱 Progressive Web App (PWA)
- 🎨 Modern UI with Tailwind CSS
- ✍️ Typing indicators
- ✅ Read receipts
- 🟢 Online presence

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Socket.IO Client** - Real-time communication
- **Vite PWA Plugin** - Progressive Web App support

## Prerequisites

- Node.js 18+ and npm
- Backend server running (see [starzchat-backend](https://github.com/starzchat/starzchat-backend))

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/starzchat/starzchat-frontend.git
cd starzchat-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env.development`:

```bash
cp .env.example .env.development
```

Update the backend URL if needed:

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
VITE_SOCKET_URL=http://localhost:5000
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint
- `npm run typecheck` - Type-check with TypeScript

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Deployment

### Environment Variables for Production

Set these environment variables in your hosting platform:

```env
VITE_API_BASE_URL=https://your-backend-domain.com
VITE_SOCKET_URL=https://your-backend-domain.com
```

### Deployment Platforms

This app can be deployed to:

- **Vercel** (recommended for Vite apps)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**
- Any static hosting service

### Example: Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Backend Integration

This frontend connects to the [StarzChat Backend](https://github.com/starzchat/starzchat-backend) API.

### API Documentation

When the backend is running, visit:
- API Docs: `http://localhost:5000/api/docs`
- Health Check: `http://localhost:5000/health`

### CORS Configuration

Make sure the backend has CORS configured to allow requests from your frontend domain.

## Project Structure

```
starzchat-frontend/
├── public/              # Static assets
│   ├── favicon.svg
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/      # Reusable React components
│   │   ├── ChatItem.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── MessageInput.tsx
│   │   └── SavedMessage.tsx
│   ├── pages/           # Page components
│   │   ├── AppView.tsx
│   │   ├── AuthView.tsx
│   │   ├── ChatDetail.tsx
│   │   ├── ChatListSidebar.tsx
│   │   └── SavedMessagesPanel.tsx
│   ├── lib/             # Utilities and API client
│   │   ├── api.ts       # REST API client
│   │   ├── socket.ts    # Socket.IO client
│   │   └── types.ts     # TypeScript types
│   ├── styles/          # Global styles
│   │   ├── components.css
│   │   └── global.css
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the StarzChat application.

## Related Repositories

- [StarzChat Backend](https://github.com/starzchat/starzchat-backend) - Flask backend API
