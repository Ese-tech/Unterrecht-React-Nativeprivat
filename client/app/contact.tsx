import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Platform } from "react-native";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert("Fehler", "Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    
    // In a real app, you would send this to your backend
    Alert.alert(
      "Nachricht gesendet!", 
      "Vielen Dank für Ihre Nachricht. Wir werden uns so schnell wie möglich bei Ihnen melden.",
      [{ text: "OK", onPress: () => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }}]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Kontaktieren Sie uns</Text>
        <Text style={styles.subtitle}>
          Haben Sie Fragen oder Feedback? Wir freuen uns auf Ihre Nachricht!
        </Text>
        
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Ihr Name *"
            placeholderTextColor="#A0AEC0"
            value={name}
            onChangeText={setName}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Ihre E-Mail *"
            placeholderTextColor="#A0AEC0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Betreff"
            placeholderTextColor="#A0AEC0"
            value={subject}
            onChangeText={setSubject}
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ihre Nachricht *"
            placeholderTextColor="#A0AEC0"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Nachricht senden</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Weitere Kontaktmöglichkeiten</Text>
          <Text style={styles.contactItem}>📧 support@todoapp.com</Text>
          <Text style={styles.contactItem}>📱 +49 123 456 789</Text>
          <Text style={styles.contactItem}>🏢 Berlin, Deutschland</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9', // Light background
  },
  content: {
    padding: Platform.OS === 'web' ? 24 : 20,
    paddingTop: Platform.OS === 'web' ? 40 : 32,
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 32 : 28,
    fontWeight: 'bold',
    color: '#4F46E5', // Purple
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 16 : 16,
    color: '#475569', // Dark gray
    textAlign: 'center',
    marginBottom: Platform.OS === 'web' ? 32 : 28,
    lineHeight: Platform.OS === 'web' ? 24 : 22,
  },
  form: {
    marginBottom: Platform.OS === 'web' ? 40 : 32,
  },
  input: {
    backgroundColor: '#FFFFFF',
    color: '#1E293B',
    padding: Platform.OS === 'web' ? 16 : 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: Platform.OS === 'web' ? 16 : 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: Platform.OS === 'web' ? 52 : 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textArea: {
    height: Platform.OS === 'web' ? 120 : 110,
    paddingTop: Platform.OS === 'web' ? 16 : 14,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    padding: Platform.OS === 'web' ? 16 : 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    minHeight: Platform.OS === 'web' ? 52 : 48,
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 18 : 17,
    fontWeight: 'bold',
  },
  contactInfo: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Platform.OS === 'web' ? 24 : 20,
    marginHorizontal: Platform.OS === 'web' ? 24 : 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contactTitle: {
    fontSize: Platform.OS === 'web' ? 20 : 19,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: Platform.OS === 'web' ? 16 : 14,
    textAlign: 'center',
  },
  contactItem: {
    fontSize: Platform.OS === 'web' ? 16 : 16,
    color: '#475569',
    marginBottom: Platform.OS === 'web' ? 8 : 6,
    textAlign: 'center',
  },
});