import React, { useState, useEffect, createContext } from "react";
import { Slot, useRouter } from "expo-router";
import Navbar from "../components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext<{
  user: any;
  setUser: (user: any) => void;
}>({ user: null, setUser: () => {} });

export default function RootLayout() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Check Auth-Status beim Start
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) setUser({ token });
    });
  }, []);

  // Navigation Handler für Navbar
  const handleNavigate = (page: string) => {
    router.replace("/" + page);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    router.replace("/home");
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Navbar
        isLoggedIn={!!user}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <Slot />
    </AuthContext.Provider>
  );
}