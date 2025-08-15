import React, { useState, useContext, useRef } from "react";
import { View, ImageBackground, Animated, Alert, StyleSheet, Platform, Text } from "react-native";
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
    
    // Only log endpoint for debugging (never log sensitive data)
    console.log('Authentication request to:', endpoint);
    
    const res = await axios.post(`${API_URL}/auth/${endpoint}`, body);
      await AsyncStorage.setItem("token", res.data.token);
      setUser(res.data);
     
    } catch (e: any) {
      console.error('Auth error (safe):', e.response?.status || 'Unknown error');
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
      
      {user ? (
        // Show welcome content when logged in
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Willkommen, {user.username}!</Text>
          <Text style={styles.welcomeSubtitle}>
            Verwalte deine Aufgaben effizient und bleibe produktiv.
          </Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>✅ Todos erstellen und verwalten</Text>
            <Text style={styles.featureItem}>📊 Fortschritt verfolgen</Text>
            <Text style={styles.featureItem}>🚀 Produktivität steigern</Text>
          </View>
        </View>
      ) : (
        // Show login form when not logged in
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
      )}
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
  welcomeContainer: {
    maxWidth: 400,
    padding: 32,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#818cf8',
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 32,
  },
  featureList: {
    alignSelf: 'stretch',
  },
  featureItem: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
});
