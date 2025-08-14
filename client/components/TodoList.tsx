import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import tailwind from "nativewind";

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
  <FlatList
    data={todos}
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => (
      <View style={tailwind("flex-row items-center bg-gray-800 rounded-xl p-4 mb-3 shadow-md")}>
        <TouchableOpacity
          style={tailwind("w-8 h-8 rounded-full border-2 border-indigo-400 justify-center items-center")}
          onPress={() => onToggle(item._id, item.completed)}
        >
          {item.completed && <View style={tailwind("w-4 h-4 bg-indigo-400 rounded-full")} />}
        </TouchableOpacity>
        <Text style={tailwind(`flex-1 mx-4 text-lg text-white ${item.completed ? "line-through text-gray-500" : ""}`)}>
          {item.text}
        </Text>
        <TouchableOpacity
          style={tailwind("w-8 h-8 rounded-full bg-red-600 justify-center items-center")}
          onPress={() => onDelete(item._id)}
        >
          <Text style={tailwind("text-white font-bold")}>x</Text>
        </TouchableOpacity>
      </View>
    )}
  />
);
export default TodoList;