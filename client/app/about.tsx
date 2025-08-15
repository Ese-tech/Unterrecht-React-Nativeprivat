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
    backgroundColor: '#F1F5F9', // Light background
    padding: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4F46E5', // Purple
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#475569', // Dark gray
    textAlign: 'center',
    lineHeight: 26,
  },
});