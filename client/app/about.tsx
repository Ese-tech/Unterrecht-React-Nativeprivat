import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

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
    backgroundColor: '#F1F5F9', // Light background
    padding: Platform.OS === 'web' ? 32 : 24,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 36 : 32,
    fontWeight: 'bold',
    color: '#4F46E5', // Purple
    marginBottom: Platform.OS === 'web' ? 16 : 12,
    textAlign: 'center',
  },
  description: {
    fontSize: Platform.OS === 'web' ? 18 : 17,
    color: '#475569', // Dark gray
    textAlign: 'center',
    lineHeight: Platform.OS === 'web' ? 26 : 24,
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
  },
});