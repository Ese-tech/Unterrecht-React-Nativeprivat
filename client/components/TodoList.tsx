import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

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
      <View style={styles.todoItem}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => onToggle(item._id, item.completed)}
        >
          {item.completed && <View style={styles.checkboxChecked} />}
        </TouchableOpacity>
        <Text style={[styles.todoText, item.completed && styles.completedText]}>
          {item.text}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item._id)}
        >
          <Text style={styles.deleteButtonText}>x</Text>
        </TouchableOpacity>
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#818cf8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 16,
    height: 16,
    backgroundColor: '#818cf8',
    borderRadius: 8,
  },
  todoText: {
    flex: 1,
    marginHorizontal: 16,
    fontSize: 18,
    color: '#ffffff',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6b7280',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dc2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default TodoList;