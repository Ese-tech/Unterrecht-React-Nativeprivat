// client/config/api.ts
import { Platform } from 'react-native';

/**
 * Get the API URL based on the platform and environment
 * This function handles different environments for deployment
 */
export const getApiUrl = (): string => {
  // Check if we're in production (deployed)
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (Platform.OS === 'web') {
    if (isProduction) {
      // For production deployment, use environment variable or relative URL
      return process.env.EXPO_PUBLIC_API_URL || '/api';
    } else {
      // For local development
      return "http://localhost:5000/api";
    }
  } else {
    // For mobile platforms (Android/iOS)
    if (isProduction) {
      // For production, mobile apps should point to the deployed backend
      return process.env.EXPO_PUBLIC_API_URL || 'https://your-backend-domain.com/api';
    } else {
      // For local development with mobile devices
      return "http://192.168.0.120:5000/api";
    }
  }
};

export const API_URL = getApiUrl();
