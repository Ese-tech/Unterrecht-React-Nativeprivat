// client/app/todos.tsx
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
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
          <View className="flex-1 justify-center items-center bg-gray-900">
              <ActivityIndicator size="large" color="#4F46E5" />
          </View>
      );
  }

  return (
    <View className="flex-1 bg-gray-900 p-6">
      <Text className="text-3xl font-bold text-indigo-400 mb-6 text-center">
        Deine Todos
      </Text>
      <View className="flex-row mb-6">
        <TextInput
          className="flex-1 h-12 bg-gray-800 text-white p-3 rounded-l-xl"
          placeholder="Neues To-Do hinzufügen"
          placeholderTextColor="#A0AEC0"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity
          className="w-12 h-12 bg-indigo-600 rounded-r-xl justify-center items-center shadow-lg"
          onPress={addTodo}
        >
          <Text className="text-white text-2xl">+</Text>
        </TouchableOpacity>
      </View>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </View>
  );
}