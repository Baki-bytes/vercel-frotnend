/**
 * API Configuration File
 * Centralized configuration for all API endpoints and base URLs
 */

const DEFAULT_BACKEND_URL = "https://vercel-backend-five-eta.vercel.app";

const resolveBaseUrl = (value) => {
  const cleanedValue = (value || "").trim();

  if (!cleanedValue) return DEFAULT_BACKEND_URL;

  // Prevent accidental placeholder deployments from breaking production.
  if (cleanedValue.includes("your-backend-project.vercel.app")) {
    return DEFAULT_BACKEND_URL;
  }

  return cleanedValue;
};

const API_CONFIG = {
  // Base URLs
  API_BASE_URL: resolveBaseUrl(import.meta.env.VITE_API_BASE_URL),
  SOCKET_URL: resolveBaseUrl(import.meta.env.VITE_SOCKET_URL),

  // API Endpoints
  ENDPOINTS: {
    // Authentication Endpoints
    AUTH: {
      LOGIN: import.meta.env.VITE_AUTH_LOGIN_ENDPOINT || '/user/login',
      SIGNUP: import.meta.env.VITE_AUTH_SIGNUP_ENDPOINT || '/user',
    },

    // User Endpoints
    USER: {
      SEARCH: import.meta.env.VITE_USER_SEARCH_ENDPOINT || '/user',
    },

    // Chat Endpoints
    CHAT: {
      GET_ALL: import.meta.env.VITE_CHAT_ENDPOINT || '/chat',
      CREATE: import.meta.env.VITE_CHAT_ENDPOINT || '/chat',
    },

    // Message Endpoints
    MESSAGE: {
      GET: import.meta.env.VITE_MESSAGE_ENDPOINT || '/message',
      SEND: import.meta.env.VITE_MESSAGE_ENDPOINT || '/message',
    },
  },

  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'MsTeams',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  NODE_ENV: import.meta.env.VITE_NODE_ENV || 'development',
  
  // Get full URL helper
  getFullUrl: (endpoint) => {
    const baseUrl = API_CONFIG.API_BASE_URL.replace(/\/$/, ''); // Remove trailing slash
    return `${baseUrl}${endpoint}`;
  },
};

export default API_CONFIG;
