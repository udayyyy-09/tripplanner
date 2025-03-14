import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/ui/custom/Header';
import { Toaster } from './components/ui/toaster';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_API_KEY}>
      <BrowserRouter>
        <div>
          <Header />
          <Toaster />
          <App />
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

