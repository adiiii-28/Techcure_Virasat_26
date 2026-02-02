// Centralized API configuration
// Updated for Vercel deployment
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://techcure-virasat-26.vercel.app' 
    : 'http://localhost:5000');

export const API_ENDPOINTS = {
  REPORTS: `${API_BASE_URL}/reports`,
  COMPLAINTS: `${API_BASE_URL}/complaints`,
  REPORT: `${API_BASE_URL}/report`,
  COMPLAINT: `${API_BASE_URL}/complaint`,
  HEALTH: `${API_BASE_URL}/health`,
  DATA: `${API_BASE_URL}/data`
};

export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Vercel deployment ready
console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', process.env.NODE_ENV);
