import React, { useState, useContext, useRef } from "react";
import { View, ImageBackground, Animated, Alert, StyleSheet, Platform, Text } from "react-native";
import { AuthContext } from "./_layout";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// Use IP address for Android/iOS, localhost for web
const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return "http://localhost:5000/api";
  } else {
    // For Android/iOS, use your computer's IP address
    return "http://192.168.0.120:5000/api";
  }
};

const API_URL = getApiUrl();

export default function HomePage() {
  const { user, setUser } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const formOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  React.useEffect(() => {
    Animated.timing(formOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: Platform.OS !== 'web', // Disable native driver for web
    }).start();
  }, [formOpacity]);

  const showMessage = (msg: string, type: "success" | "error") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  const handleAuth = async () => {
    try {
      if (!isLogin && (!username || !email || !password)) {
        showMessage("Bitte füllen Sie alle Felder aus.", "error");
        return;
      }
      if (isLogin && (!email || !password)) {
        showMessage("Bitte geben Sie E-Mail und Passwort ein.", "error");
        return;
      }

      const endpoint = isLogin ? "login" : "register";
      const body = isLogin ? { email, password } : { username, email, password };
      
      // Only log endpoint for debugging (never log sensitive data)
      console.log('Authentication request to:', endpoint);
      
      // Configure axios to include cookies for web
      const config = {
        withCredentials: true, // Important: Include cookies in requests
      };
      
      const res = await axios.post(`${API_URL}/auth/${endpoint}`, body, config);
      
      // For mobile apps, we still need to store token in AsyncStorage
      // since cookies don't work the same way in mobile apps
      if (typeof window === 'undefined') {
        // Mobile: use AsyncStorage (fallback)
        await AsyncStorage.setItem("userToken", JSON.stringify(res.data));
      }
      
      setUser(res.data);
      
      showMessage(
        isLogin ? "Erfolgreich angemeldet!" : "Konto erfolgreich erstellt!",
        "success"
      );
      
      // Clear form
      setUsername("");
      setEmail("");
      setPassword("");
     
    } catch (e: any) {
      console.error('Auth error (safe):', e.response?.status || 'Unknown error');
      
      let errorMessage = "Ein Fehler ist aufgetreten.";
      
      if (e.response?.data?.message) {
        const serverMessage = e.response.data.message;
        if (serverMessage.includes("email") && serverMessage.includes("already")) {
          errorMessage = "Diese E-Mail-Adresse ist bereits registriert.";
        } else if (serverMessage.includes("username") && serverMessage.includes("already")) {
          errorMessage = "Dieser Benutzername ist bereits vergeben.";
        } else if (serverMessage.includes("password")) {
          errorMessage = "Ungültiges Passwort.";
        } else if (serverMessage.includes("user not found") || serverMessage.includes("Invalid")) {
          errorMessage = "Ungültige Anmeldedaten.";
        } else {
          errorMessage = serverMessage;
        }
      }
      
      showMessage(errorMessage, "error");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/splash-icon.png")}
      style={styles.background}
      resizeMode="contain"
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      
      {message && (
        <View style={[
          styles.messageContainer, 
          messageType === "success" ? styles.successMessage : styles.errorMessage
        ]}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
      
      {user ? (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Willkommen{user.username ? `, ${user.username}` : ''}!</Text>
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
    backgroundColor: '#F1F5F9', // Much lighter background
  },
  backgroundImage: {
    opacity: 0.1, // Make background image more subtle
    bottom: 50,
    right: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 41, 59, 0.1)', // Much lighter overlay
  },
  messageContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 1000,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
  },
  successMessage: {
    backgroundColor: '#10B981',
    borderColor: '#059669',
    borderWidth: 1,
  },
  errorMessage: {
    backgroundColor: '#EF4444',
    borderColor: '#DC2626',
    borderWidth: 1,
  },
  messageText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  welcomeContainer: {
    maxWidth: 400,
    padding: 32,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5', // Changed to purple
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#475569', // Darker gray for better readability
    textAlign: 'center',
    marginBottom: 32,
  },
  featureList: {
    alignSelf: 'stretch',
  },
  featureItem: {
    fontSize: 16,
    color: '#64748B', // Medium gray
    marginBottom: 12,
    textAlign: 'center',
  },
});
