import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated } from "react-native";
import tailwind from "nativewind";

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
      tailwind("w-full max-w-sm bg-gray-900 rounded-2xl p-8 shadow-2xl"),
      { opacity: formOpacity },
    ]}
  >
    <Text style={tailwind("text-4xl font-bold text-indigo-400 mb-8 text-center")}>
      {isLogin ? "Login" : "Registrieren"}
    </Text>
    {!isLogin && (
      <TextInput
        style={tailwind("w-full h-12 bg-gray-800 text-white p-3 rounded-xl mb-4")}
        placeholder="Benutzername"
        placeholderTextColor="#A0AEC0"
        value={username}
        onChangeText={setUsername}
      />
    )}
    <TextInput
      style={tailwind("w-full h-12 bg-gray-800 text-white p-3 rounded-xl mb-4")}
      placeholder="E-Mail"
      placeholderTextColor="#A0AEC0"
      keyboardType="email-address"
      autoCapitalize="none"
      value={email}
      onChangeText={setEmail}
    />
    <TextInput
      style={tailwind("w-full h-12 bg-gray-800 text-white p-3 rounded-xl mb-6")}
      placeholder="Passwort"
      placeholderTextColor="#A0AEC0"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <TouchableOpacity
      style={tailwind("w-full h-12 bg-indigo-600 rounded-xl justify-center items-center shadow-lg")}
      onPress={onSubmit}
    >
      <Text style={tailwind("text-lg font-bold text-white")}>
        {isLogin ? "Anmelden" : "Registrieren"}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={tailwind("mt-4")} onPress={toggleMode}>
      <Text style={tailwind("text-sm text-indigo-400 underline text-center")}>
        {isLogin ? "Noch kein Konto? Registrieren" : "Schon ein Konto? Anmelden"}
      </Text>
    </TouchableOpacity>
  </Animated.View>
);
export default LoginForm;