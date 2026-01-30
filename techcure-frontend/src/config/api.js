// Centralized API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  REPORTS: `${API_BASE_URL}/reports`,
  COMPLAINTS: `${API_BASE_URL}/complaints`,
  REPORT: `${API_BASE_URL}/report`,
  COMPLAINT: `${API_BASE_URL}/complaint`
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
