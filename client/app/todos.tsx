// client/app/todos.tsx
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "./_layout";
import TodoList from "../components/TodoList";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "expo-router";


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
    if (!newTodo.trim()) return;
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/todos`,
        { text: newTodo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos((prev) => [...prev, res.data]);
      setNewTodo("");
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
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.delete(`${API_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (e) {
      Alert.alert("Fehler", "Todo konnte nicht gelöscht werden.");
    }
  };

  if (isLoading || isFetchingTodos) {
      return (
          <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4F46E5" />
          </View>
      );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deine Todos
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Neues To-Do hinzufügen"
          placeholderTextColor="#A0AEC0"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addTodo}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#818cf8',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  textInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#1f2937',
    color: '#ffffff',
    padding: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#4f46e5',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 24,
  },
});