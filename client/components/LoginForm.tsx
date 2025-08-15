import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, StyleSheet } from "react-native";
// ❗ RN vs WEB: NativeWind für Tailwind CSS in React Native

interface LoginFormProps {
  isLogin: boolean;
  username: string;
  email: string;
  password: string;
  setUsername: (v: string) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  onSubmit: () => void;
  toggleMode: () => void;
  formOpacity: Animated.Value;
}

// ❗ RN vs WEB: StyleSheet für komplexe Styles mit Animationen
const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1f2937', // bg-gray-900
    borderRadius: 16,
    padding: 32,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)',
    elevation: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#818cf8',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputStyle: {
    width: '100%',
    height: 48,
    backgroundColor: '#374151', // bg-gray-800
    color: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonStyle: {
    width: '100%',
    height: 48,
    backgroundColor: '#4f46e5', // bg-indigo-600
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  toggleButton: {
    marginTop: 16,
  },
  toggleText: {
    fontSize: 14,
    color: '#818cf8',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

const LoginForm: React.FC<LoginFormProps> = ({
  isLogin,
  username,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
  onSubmit,
  toggleMode,
  formOpacity,
}) => (
  <Animated.View
    style={[
      styles.formContainer,
      { opacity: formOpacity },
    ]}
  >
    <Text style={styles.title}>
      {isLogin ? "Login" : "Registrieren"}
    </Text>
    {!isLogin && (
      <TextInput
        style={styles.inputStyle}
        placeholder="Benutzername"
        placeholderTextColor="#A0AEC0"
        value={username}
        onChangeText={setUsername}
      />
    )}
    <TextInput
      style={styles.inputStyle}
      placeholder="E-Mail"
      placeholderTextColor="#A0AEC0"
      keyboardType="email-address"
      autoCapitalize="none"
      value={email}
      onChangeText={setEmail}
    />
    <TextInput
      style={[styles.inputStyle, { marginBottom: 24 }]}
      placeholder="Passwort"
      placeholderTextColor="#A0AEC0"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={onSubmit}
    >
      <Text style={styles.buttonText}>
        {isLogin ? "Anmelden" : "Registrieren"}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.toggleButton} onPress={toggleMode}>
      <Text style={styles.toggleText}>
        {isLogin ? "Noch kein Konto? Registrieren" : "Schon ein Konto? Anmelden"}
      </Text>
    </TouchableOpacity>
  </Animated.View>
);
export default LoginForm;