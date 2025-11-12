import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Tailwind CSS is now loaded via CDN in index.html

import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
