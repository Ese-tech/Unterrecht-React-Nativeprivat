// client/app/home.tsx

import React, { useState, useContext, useRef } from "react";
import { View, ImageBackground, Animated, Alert } from "react-native";
import { AuthContext } from "./_layout";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://localhost:5000/api";

export default function HomePage() {
  const { user, setUser } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  React.useEffect(() => {
    Animated.timing(formOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [formOpacity]);

  const handleAuth = async () => {
    try {
      const endpoint = isLogin ? "signin" : "signup";
      const body = isLogin ? { email, password } : { username, email, password };
      const res = await axios.post(`${API_URL}/auth/${endpoint}`, body);
      await AsyncStorage.setItem("token", res.data.token);
      setUser(res.data);
      navigation.replace("todos");
    } catch (e: any) {
      Alert.alert("Fehler", e.response?.data?.message || "Ein Fehler ist aufgetreten.");
    }
  };

  // if (user) {
  //   navigation.replace("todos");
  //   return null;
  // }

  return (
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
