import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Über Uns</Text>
      <Text style={styles.description}>
        Diese App hilft dir, deine täglichen Aufgaben effizient zu verwalten.
        Minimalistisch, produktiv und modern – für deinen Alltag!
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
});