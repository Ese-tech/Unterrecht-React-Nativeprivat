import React, { useState, useEffect, createContext } from "react";
// ❗ RN vs WEB: Expo Router statt React Router
import { Stack } from "expo-router";
import Navbar from "../components/Navbar";
// ❗ RN vs WEB: AsyncStorage statt localStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types separately to avoid parsing issues
interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  setUser: () => {} 
});

export default function RootLayout() {
  const [user, setUser] = useState<any>(null);

  // Check Auth-Status beim Start
  useEffect(() => {
    // ❗ RN vs WEB: AsyncStorage.getItem() ist async, localStorage.getItem() ist sync
    AsyncStorage.getItem("token").then((token) => {
      if (token) setUser({ token });
    });
  }, []);

  // Navigation Handler für Navbar
  const handleNavigate = (page: string) => {
    // Navigation wird über Expo Router file-based routing gemacht
    console.log("Navigate to:", page);
  };

  const handleLogout = async () => {
    // ❗ RN vs WEB: AsyncStorage.removeItem() statt localStorage.removeItem()
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Navbar
        isLoggedIn={!!user}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      {/* ❗ RN vs WEB: <Stack> für File-based Routing */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="about" />
        <Stack.Screen name="contact" />
        <Stack.Screen name="todos" />
      </Stack>
    </AuthContext.Provider>
  );
}