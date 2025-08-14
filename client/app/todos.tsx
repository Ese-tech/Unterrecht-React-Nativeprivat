import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "./_layout";
import TodoList from "../components/TodoList";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tailwind from "nativewind";
import { useRouter } from "expo-router";

const API_URL = "http://localhost:5000/api";

export default function TodosPage() {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/home");
      return;
    }
    fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (e) {
      Alert.alert("Fehler", "Todos konnten nicht geladen werden.");
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

  if (!user) return null;

  return (
    <View style={tailwind("flex-1 bg-gray-900 p-6")}>
      <Text style={tailwind("text-3xl font-bold text-indigo-400 mb-6 text-center")}>Deine Todos</Text>
      <View style={tailwind("flex-row mb-6")}>
        <TextInput
          style={tailwind("flex-1 h-12 bg-gray-800 text-white p-3 rounded-l-xl")}
          placeholder="Neues To-Do hinzufügen"
          placeholderTextColor="#A0AEC0"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity
          style={tailwind("w-12 h-12 bg-indigo-600 rounded-r-xl justify-center items-center shadow-lg")}
          onPress={addTodo}
        >
          <Text style={tailwind("text-white text-2xl")}>+</Text>
        </TouchableOpacity>
      </View>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </View>
  );
}