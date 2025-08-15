// hooks/useNavigation.ts
import { Platform } from 'react-native';

export const useAppNavigation = () => {
  const navigate = (path: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      // For web, use simple location.href
      window.location.href = path;
    } else {
      // For mobile, we'll handle this differently
      // Since expo-router should handle the navigation automatically
      // through the file-based routing system
      console.log('Navigation request for mobile:', path);
      
      // For now, we'll let the app's state management handle navigation
      // The file-based routing in expo-router should handle this
    }
  };

  return { navigate };
};
