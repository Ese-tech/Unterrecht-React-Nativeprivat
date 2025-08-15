import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ContactPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kontakt</Text>
      <Text style={styles.description}>
        Fragen oder Feedback? Schreib uns an:
      </Text>
      <Text style={styles.email}>
        support@todoapp.com
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#818cf8',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  email: {
    fontSize: 18,
    color: '#818cf8',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});