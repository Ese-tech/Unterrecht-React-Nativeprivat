// client/app/_layout.tsx
// import '../dist/output.css';
// import '../global.css';
import React, { useState, useEffect, createContext } from "react";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import Navbar from "../components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config/api";
// import { useNavigation } from "@react-navigation/native";

// if (typeof window !== "undefined") {
//   require("../dist/output.css");
// }

// Definiere den Typ für den Auth Context
interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export default function RootLayout() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Storage helper that works for both web and mobile
  const getStoredToken = async () => {
    try {
      if (typeof window !== 'undefined') {
        // Web: use localStorage
        return localStorage.getItem("token");
      } else {
        // Mobile: use AsyncStorage
        return await AsyncStorage.getItem("token");
      }
    } catch (error) {
      console.error("Error getting stored token:", error);
      return null;
    }
  };

  const removeStoredToken = async () => {
    try {
      if (typeof window !== 'undefined') {
        // Web: use localStorage
        localStorage.removeItem("token");
      } else {
        // Mobile: use AsyncStorage
        await AsyncStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error removing stored token:", error);
    }
  };

  useEffect(() => {
    // Check if there's authentication status when the app loads
    const checkAuthStatus = async () => {
      try {
        if (typeof window !== 'undefined') {
          // Web: Try to get user info from server using HTTP-only cookies
          const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'GET',
            credentials: 'include', // Important: Include cookies
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // If token validation fails, clear any stored data
            setUser(null);
          }
        } else {
          // Mobile: Check AsyncStorage for fallback auth
          const storedUser = await AsyncStorage.getItem("userToken");
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      if (typeof window !== 'undefined') {
        // Web: Call logout endpoint to clear HTTP-only cookie
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          credentials: 'include', // Include cookies
        });
      } else {
        // Mobile: Clear AsyncStorage
        await AsyncStorage.removeItem("userToken");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(null);
      // Redirect to home after logout - platform specific
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.location.href = '/home';
      }
      // For mobile, the navigation will be handled by the auth context state change
    }
  };

  if (isLoading) {
    // Ladezustand anzeigen, während der Token überprüft wird
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      <Navbar
        isLoggedIn={!!user}
        // onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Die Seiten, die über die Navigation erreichbar sind */}
        <Stack.Screen name="home" />
        <Stack.Screen name="todos" />
        <Stack.Screen name="about" />
        <Stack.Screen name="contact" />
      </Stack>
    </AuthContext.Provider>
  );
}
