import React, { useState, useContext, useRef } from "react";
// ❗ RN vs WEB: ImageBackground & Animated für native Animationen
import { View, ImageBackground, Animated, Alert } from "react-native";
import { AuthContext } from "./_layout";
import LoginForm from "../components/LoginForm";
import axios from "axios";
// ❗ RN vs WEB: AsyncStorage statt localStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
// ❗ RN vs WEB: NativeWind für Tailwind CSS in React Native

const API_URL = "http://localhost:5000/api";

export default function HomePage() {
  const { user, setUser } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ❗ RN vs WEB: Animated.Value für native Animationen (statt CSS transitions)
  const formOpacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // ❗ RN vs WEB: Animated.timing() statt CSS transitions/keyframes
    Animated.timing(formOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true, // Bessere Performance
    }).start();
  }, []);

  const handleAuth = async () => {
    try {
      const endpoint = isLogin ? "login" : "register";
      const body = isLogin ? { email, password } : { username, email, password };
      const res = await axios.post(`${API_URL}/auth/${endpoint}`, body);
      // ❗ RN vs WEB: AsyncStorage.setItem() statt localStorage.setItem()
      await AsyncStorage.setItem("token", res.data.token);
      setUser(res.data);
      // TODO: Navigation zu /todos implementieren
    } catch (e: any) {
      // ❗ RN vs WEB: Alert.alert() statt alert() oder toast
      Alert.alert("Fehler", e.response?.data?.message || "Ein Fehler ist aufgetreten.");
    }
  };

  if (user) {
    // TODO: Navigation zu /todos implementieren
    return null;
  }

  return (
    // ❗ RN vs WEB: <ImageBackground> für Hintergrundbilder (statt CSS background-image)
    <ImageBackground
      source={require("../assets/images/splash-icon.png")}
      className="flex-1 justify-center items-center bg-gray-900"
      resizeMode="cover"
    >
      <View className="absolute inset-0 bg-black opacity-50" />
      <LoginForm
        isLogin={isLogin}
        username={username}
        email={email}
        password={password}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        onSubmit={handleAuth}
        toggleMode={() => setIsLogin((v) => !v)}
        formOpacity={formOpacity}
      />
    </ImageBackground>
  );
}