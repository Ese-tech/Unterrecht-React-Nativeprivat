import React, { useState, useContext, useRef } from "react";
import { View, ImageBackground, Animated, Alert, StyleSheet, Platform } from "react-native";
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
      useNativeDriver: Platform.OS !== 'web', // Disable native driver for web
    }).start();
  }, [formOpacity]);

  const handleAuth = async () => {
    try {
    const endpoint = isLogin ? "login" : "register";
    const body = isLogin ? { email, password } : { username, email, password };
    
    console.log('Sending request to:', `${API_URL}/auth/${endpoint}`);
    console.log('Request body:', body);
    
    const res = await axios.post(`${API_URL}/auth/${endpoint}`, body);
      await AsyncStorage.setItem("token", res.data.token);
      setUser(res.data);
     
    } catch (e: any) {
      console.error('Auth error:', e.response?.data || e.message);
      Alert.alert("Fehler", e.response?.data?.message || "Ein Fehler ist aufgetreten.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/splash-icon.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
