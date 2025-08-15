import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";

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
    backgroundColor: '#111827',
  },
  content: {
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#818cf8',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  textArea: {
    height: 120,
    paddingTop: 16,
  },
  submitButton: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#818cf8',
    marginBottom: 16,
  },
  contactItem: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
  },
});