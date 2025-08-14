import React, { useState, useEffect, createContext } from "react";
// ❗ RN vs WEB: Expo Router statt React Router  
import { Stack } from "expo-router";
import Navbar from "../components/Navbar";
// ❗ RN vs WEB: AsyncStorage statt localStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext<{
  user: any;
  setUser: (user: any) => void;
}>({ user: null, setUser: () => {} });

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
    // ❗ RN vs WEB: Expo Router Navigation wird über Links/Href gemacht
    // TODO: Navigation implementieren mit expo-router Links
    console.log("Navigate to:", page);
  };

  const handleLogout = async () => {
    // ❗ RN vs WEB: AsyncStorage.removeItem() statt localStorage.removeItem()
    await AsyncStorage.removeItem("token");
    setUser(null);
    // TODO: Navigation implementieren mit expo-router
    console.log("Logout complete");
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Navbar
        isLoggedIn={!!user}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      {/* ❗ RN vs WEB: <Stack> für Screen-Navigation (statt React Router Outlet) */}
      <Stack screenOptions={{ headerShown: false }} />
    </AuthContext.Provider>
  );
}