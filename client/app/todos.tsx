// client/app/todos.tsx
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "./_layout";
import TodoList from "../components/TodoList";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "@react-navigation/native";


const API_URL = "http://localhost:5000/api";

export default function TodosPage() {
  const { user, isLoading } = useContext(AuthContext);
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isFetchingTodos, setIsFetchingTodos] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoading) {
        if (!user) {
            router.replace("/"); // Use router instance
        } else {
            fetchTodos();
        }
    }
  }, [user, isLoading]);

  const fetchTodos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
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
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/todos`,
        { text: newTodo.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos((prev) => [...prev, res.data]);
      setNewTodo("");
      Alert.alert("Erfolg", "Todo wurde erfolgreich hinzugefügt!");
    } catch (e) {
      Alert.alert("Fehler", "Todo konnte nicht hinzugefügt werden.");
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.put(
        `${API_URL}/todos/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? res.data : todo))
      );
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
              const token = await AsyncStorage.getItem("token");
              await axios.delete(`${API_URL}/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
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
          <Text style={styles.addButtonText}>+</Text>
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
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#718096",
    fontWeight: "500",
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 16,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#718096",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  inputSection: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  addButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 2px 8px rgba(79, 70, 229, 0.3)",
    elevation: 4,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    paddingHorizontal: 32,
    lineHeight: 24,
  },
});