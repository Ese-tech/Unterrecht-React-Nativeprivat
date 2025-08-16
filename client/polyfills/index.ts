// Global polyfills for React Native
import { Platform } from 'react-native';

// Only apply polyfills on mobile platforms
if (Platform.OS !== 'web') {
  // URL polyfill for React Native
  try {
    require('react-native-url-polyfill/auto');
  } catch (error) {
    console.warn('URL polyfill not available:', error);
  }
}

export {};
