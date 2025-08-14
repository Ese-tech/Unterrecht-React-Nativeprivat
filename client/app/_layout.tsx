// client/app/_layout.tsx
import 'nativewind';
import '../global.css';
import React, { useState, useEffect, createContext } from "react";
import { Stack } from "expo-router";
import Navbar from "../components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

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
  // const navigation = useNavigation();

  useEffect(() => {
    // Überprüfe beim Start, ob ein Token im AsyncStorage vorhanden ist
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        setUser({ token });
      }
      setIsLoading(false);
    });
  }, []);

  const handleNavigate = (page: string) => {
    // navigation.navigate(page); // <-- Actually navigate!
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
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

if (typeof window !== "undefined") {
  require("../dist/output.css");
}
