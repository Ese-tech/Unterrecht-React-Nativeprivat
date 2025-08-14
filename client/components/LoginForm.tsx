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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
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
    <Text className="text-4xl font-bold text-indigo-400 mb-8 text-center">
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
      <Text className="text-lg font-bold text-white">
        {isLogin ? "Anmelden" : "Registrieren"}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity className="mt-4" onPress={toggleMode}>
      <Text className="text-sm text-indigo-400 underline text-center">
        {isLogin ? "Noch kein Konto? Registrieren" : "Schon ein Konto? Anmelden"}
      </Text>
    </TouchableOpacity>
  </Animated.View>
);
export default LoginForm;