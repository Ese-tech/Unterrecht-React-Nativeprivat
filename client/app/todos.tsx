import React, { useContext, useEffect, useState } from "react";
// ❗ RN vs WEB: React Native verwendet eigene Komponenten statt HTML
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "./_layout";
import TodoList from "../components/TodoList";
import axios from "axios";
// ❗ RN vs WEB: AsyncStorage statt localStorage (und asynchron!)
import AsyncStorage from "@react-native-async-storage/async-storage";
// ❗ RN vs WEB: NativeWind für Tailwind CSS in React Native

// ===== KONSTANTEN =====
// Backend-URL - hier läuft unser Express Server
const API_URL = "http://localhost:5000/api";

// ===== HAUPTKOMPONENTE =====
export default function TodosPage() {
  // ===== STATE MANAGEMENT =====
  // AuthContext: Holen wir den aktuellen Benutzer (gleich wie React Web)
  const { user } = useContext(AuthContext);
  
  // State für die Todo-Liste (Array von Todo-Objekten)
  const [todos, setTodos] = useState<any[]>([]);
  
  // State für das neue Todo im Input-Feld
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (!user) {
      // TODO: Navigation zu /home implementieren
      return;
    }
    fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    try {
      // ❗ RN vs WEB: AsyncStorage.getItem() ist async, localStorage.getItem() ist sync
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (e) {
      // ❗ RN vs WEB: Alert.alert() statt window.alert()
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
    // ❗ RN vs WEB: <View> statt <div>
    <View className="flex-1 bg-gray-900 p-6">
      
      {/* ❗ RN vs WEB: <Text> statt <h1>, <h2>, <p> */}
      <Text className="text-3xl font-bold text-indigo-400 mb-6 text-center">
        Deine Todos
      </Text>
      
      <View className="flex-row mb-6">
        
        {/* ❗ RN vs WEB: <TextInput> statt <input> */}
        <TextInput
          className="flex-1 h-12 bg-gray-800 text-white p-3 rounded-l-xl"
          placeholder="Neues To-Do hinzufügen"
          placeholderTextColor="#A0AEC0" // RN braucht explizite Placeholder-Farbe
          value={newTodo}
          onChangeText={setNewTodo} // ❗ RN vs WEB: onChangeText statt onChange
        />
        
        {/* ❗ RN vs WEB: <TouchableOpacity> statt <button> */}
        <TouchableOpacity
          className="w-12 h-12 bg-indigo-600 rounded-r-xl justify-center items-center shadow-lg"
          onPress={addTodo} // ❗ RN vs WEB: onPress statt onClick
        >
          <Text className="text-white text-2xl">+</Text>
        </TouchableOpacity>
        
      </View>
      
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      
    </View>
  );
}