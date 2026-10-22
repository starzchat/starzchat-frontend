/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        panel: '#1e293b',
        panelHover: '#334155',
        border: '#334155',
        accent: '#3b82f6',
        accentHover: '#2563eb',
        text: '#f8fafc',
        muted: '#94a3b8',
        danger: '#ef4444',
        success: '#22c55e'
      }
    }
  },
  plugins: []
};
