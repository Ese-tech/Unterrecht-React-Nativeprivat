//client/components/LoginForm.tsx

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, StyleSheet, Platform } from "react-native";
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
    maxWidth: Platform.OS === 'web' ? 400 : '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: Platform.OS === 'web' ? 32 : 24,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: Platform.OS === 'web' ? 0 : 20,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.1,
      shadowRadius: 30,
    }),
  },
  title: {
    fontSize: Platform.OS === 'web' ? 32 : 28,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: Platform.OS === 'web' ? 32 : 24,
    textAlign: 'center',
  },
  inputStyle: {
    width: '100%',
    height: Platform.OS === 'web' ? 52 : 48,
    backgroundColor: '#F8FAFC',
    color: '#1E293B',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: Platform.OS === 'web' ? 16 : 16,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 24,
  },
  passwordInput: {
    width: '100%',
    height: Platform.OS === 'web' ? 52 : 48,
    backgroundColor: '#F8FAFC',
    color: '#1E293B',
    padding: 16,
    paddingRight: 50, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: Platform.OS === 'web' ? 16 : 16,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: Platform.OS === 'web' ? 16 : 14,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    fontSize: Platform.OS === 'web' ? 18 : 20,
    color: '#64748B',
  },
  buttonStyle: {
    width: '100%',
    height: Platform.OS === 'web' ? 52 : 48,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
    } : {
      shadowColor: '#4F46E5',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 12,
    }),
  },
  buttonText: {
    fontSize: Platform.OS === 'web' ? 18 : 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  toggleButton: {
    marginTop: Platform.OS === 'web' ? 20 : 16,
    paddingVertical: 8,
  },
  toggleText: {
    fontSize: Platform.OS === 'web' ? 15 : 16,
    color: '#4F46E5',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontWeight: '500',
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
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
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
          placeholderTextColor="#64748B"
          value={username}
          onChangeText={setUsername}
        />
      )}
      <TextInput
        style={styles.inputStyle}
        placeholder="E-Mail"
        placeholderTextColor="#64748B"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Passwort"
          placeholderTextColor="#64748B"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={togglePasswordVisibility}
        >
          <Text style={styles.eyeIcon}>
            {showPassword ? "🙈" : "👁️"}
          </Text>
        </TouchableOpacity>
      </View>
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
};
export default LoginForm;