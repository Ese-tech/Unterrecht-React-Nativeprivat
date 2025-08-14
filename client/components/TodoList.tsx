import React from "react";
// ❗ RN vs WEB: FlatList statt map() für bessere Performance bei langen Listen
import { View, Text, TouchableOpacity, FlatList } from "react-native";
// ❗ RN vs WEB: NativeWind für Tailwind CSS in React Native

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}
interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}
const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => (
  // ❗ RN vs WEB: <FlatList> statt todos.map() - optimiert für Mobile
  <FlatList
    data={todos}
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => (
      <View className="flex-row items-center bg-gray-800 rounded-xl p-4 mb-3 shadow-md">
        <TouchableOpacity
          className="w-8 h-8 rounded-full border-2 border-indigo-400 justify-center items-center"
          onPress={() => onToggle(item._id, item.completed)}
        >
          {item.completed && <View className="w-4 h-4 bg-indigo-400 rounded-full" />}
        </TouchableOpacity>
        <Text className={`flex-1 mx-4 text-lg text-white ${item.completed ? "line-through text-gray-500" : ""}`}>
          {item.text}
        </Text>
        <TouchableOpacity
          className="w-8 h-8 rounded-full bg-red-600 justify-center items-center"
          onPress={() => onDelete(item._id)}
        >
          <Text className="text-white font-bold">x</Text>
        </TouchableOpacity>
      </View>
    )}
  />
);
export default TodoList;