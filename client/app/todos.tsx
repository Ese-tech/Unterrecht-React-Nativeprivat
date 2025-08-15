// client/app/todos.tsx
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, Platform } from "react-native";
import { AuthContext } from "./_layout";
import TodoList from "../components/TodoList";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../config/api";

export default function TodosPage() {
  const { user, isLoading } = useContext(AuthContext);
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isFetchingTodos, setIsFetchingTodos] = useState(true);

  useEffect(() => {
    if (!isLoading) {
        if (!user) {
            // Redirect to home for web
            if (typeof window !== 'undefined') {
              window.history.pushState({}, '', '/home');
              window.location.reload();
            }
        } else {
            fetchTodos();
        }
    }
  }, [user, isLoading]);

  const fetchTodos = async () => {
    try {
      if (typeof window !== 'undefined') {
        // Web: Use cookies (HTTP-only cookies are sent automatically)
        const res = await axios.get(`${API_URL}/todos`, {
          withCredentials: true, // Include cookies
        });
        setTodos(res.data);
      } else {
        // Mobile: Use AsyncStorage as fallback
        const userData = await AsyncStorage.getItem("userToken");
        if (userData) {
          const parsedData = JSON.parse(userData);
          const res = await axios.get(`${API_URL}/todos`, {
            headers: { Authorization: `Bearer ${parsedData.token}` },
          });
          setTodos(res.data);
        }
      }
    } catch (e) {
      Alert.alert("Fehler", "Todos konnten nicht geladen werden.");
    } finally {
        setIsFetchingTodos(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      Alert.alert("Fehler", "Bitte geben Sie einen Todo-Text ein.");
      return;
    }
    try {
      if (typeof window !== 'undefined') {
        // Web: Use cookies (HTTP-only cookies are sent automatically)
        const res = await axios.post(
          `${API_URL}/todos`,
          { text: newTodo.trim() },
          { withCredentials: true } // Include cookies
        );
        setTodos((prev) => [...prev, res.data]);
      } else {
        // Mobile: Use AsyncStorage as fallback
        const userData = await AsyncStorage.getItem("userToken");
        if (userData) {
          const parsedData = JSON.parse(userData);
          const res = await axios.post(
            `${API_URL}/todos`,
            { text: newTodo.trim() },
            { headers: { Authorization: `Bearer ${parsedData.token}` } }
          );
          setTodos((prev) => [...prev, res.data]);
        }
      }
      setNewTodo("");
      Alert.alert("Erfolg", "Todo wurde erfolgreich hinzugefügt!");
    } catch (e) {
      Alert.alert("Fehler", "Todo konnte nicht hinzugefügt werden.");
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      if (typeof window !== 'undefined') {
        // Web: Use cookies (HTTP-only cookies are sent automatically)
        const res = await axios.put(
          `${API_URL}/todos/${id}`,
          { completed: !completed },
          { withCredentials: true } // Include cookies
        );
        setTodos((prev) =>
          prev.map((todo) => (todo._id === id ? res.data : todo))
        );
      } else {
        // Mobile: Use AsyncStorage as fallback
        const userData = await AsyncStorage.getItem("userToken");
        if (userData) {
          const parsedData = JSON.parse(userData);
          const res = await axios.put(
            `${API_URL}/todos/${id}`,
            { completed: !completed },
            { headers: { Authorization: `Bearer ${parsedData.token}` } }
          );
          setTodos((prev) =>
            prev.map((todo) => (todo._id === id ? res.data : todo))
          );
        }
      }
    } catch (e) {
      Alert.alert("Fehler", "Todo konnte nicht aktualisiert werden.");
    }
  };

  const deleteTodo = async (id: string) => {
    Alert.alert(
      "Todo löschen",
      "Sind Sie sicher, dass Sie dieses Todo löschen möchten?",
      [
        { text: "Abbrechen", style: "cancel" },
        { 
          text: "Löschen", 
          style: "destructive",
          onPress: async () => {
            try {
              if (typeof window !== 'undefined') {
                // Web: Use cookies (HTTP-only cookies are sent automatically)
                await axios.delete(`${API_URL}/todos/${id}`, {
                  withCredentials: true, // Include cookies
                });
              } else {
                // Mobile: Use AsyncStorage as fallback
                const userData = await AsyncStorage.getItem("userToken");
                if (userData) {
                  const parsedData = JSON.parse(userData);
                  await axios.delete(`${API_URL}/todos/${id}`, {
                    headers: { Authorization: `Bearer ${parsedData.token}` },
                  });
                }
              }
              setTodos((prev) => prev.filter((todo) => todo._id !== id));
              Alert.alert("Erfolg", "Todo wurde gelöscht.");
            } catch (e) {
              Alert.alert("Fehler", "Todo konnte nicht gelöscht werden.");
            }
          }
        }
      ]
    );
  };

  if (isLoading || isFetchingTodos) {
      return (
          <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4F46E5" />
              <Text style={styles.loadingText}>Todos werden geladen...</Text>
          </View>
      );
  }

  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meine Aufgaben</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{pendingTodos.length}</Text>
            <Text style={styles.statLabel}>Offen</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{completedTodos.length}</Text>
            <Text style={styles.statLabel}>Erledigt</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{todos.length}</Text>
            <Text style={styles.statLabel}>Gesamt</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.inputSection}>
        <TextInput
          style={styles.textInput}
          placeholder="Neue Aufgabe hinzufügen..."
          placeholderTextColor="#A0AEC0"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addTodo}
        >
          <Text style={styles.addButtonText}>
            {Platform.OS === 'web' ? '+' : 'Hinzufügen'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {todos.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>🎯</Text>
          <Text style={styles.emptyStateTitle}>Keine Aufgaben vorhanden</Text>
          <Text style={styles.emptyStateSubtitle}>
            Fügen Sie Ihre erste Aufgabe hinzu, um loszulegen!
          </Text>
        </View>
      ) : (
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
    padding: Platform.OS === 'web' ? 20 : 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
  },
  loadingText: {
    marginTop: 10,
    fontSize: Platform.OS === 'web' ? 16 : 17,
    color: "#718096",
    fontWeight: "500",
  },
  header: {
    marginBottom: Platform.OS === 'web' ? 24 : 20,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 28 : 26,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: Platform.OS === 'web' ? 16 : 14,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: Platform.OS === 'web' ? 16 : 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: Platform.OS === 'web' ? 24 : 22,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: Platform.OS === 'web' ? 12 : 13,
    color: "#718096",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  inputSection: {
    flexDirection: Platform.OS === 'web' ? "row" : "column",
    marginBottom: Platform.OS === 'web' ? 24 : 20,
    gap: Platform.OS === 'web' ? 12 : 8,
  },
  textInput: {
    flex: Platform.OS === 'web' ? 1 : undefined,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'web' ? 14 : 16,
    fontSize: Platform.OS === 'web' ? 16 : 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minHeight: Platform.OS === 'web' ? 48 : 50,
  },
  addButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    width: Platform.OS === 'web' ? 48 : '100%',
    height: Platform.OS === 'web' ? 48 : 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: Platform.OS === 'web' ? 24 : 18,
    fontWeight: "bold",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Platform.OS === 'web' ? 48 : 32,
    paddingHorizontal: Platform.OS === 'web' ? 0 : 20,
  },
  emptyStateText: {
    fontSize: Platform.OS === 'web' ? 64 : 56,
    marginBottom: Platform.OS === 'web' ? 16 : 12,
  },
  emptyStateTitle: {
    fontSize: Platform.OS === 'web' ? 20 : 19,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateSubtitle: {
    fontSize: Platform.OS === 'web' ? 16 : 16,
    color: "#718096",
    textAlign: "center",
    paddingHorizontal: Platform.OS === 'web' ? 32 : 16,
    lineHeight: Platform.OS === 'web' ? 24 : 22,
  },
});