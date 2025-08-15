import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {todos.map((todo) => (
        <View key={todo._id} style={styles.todoItem}>
          <TouchableOpacity
            style={styles.todoContent}
            onPress={() => onToggle(todo._id, todo.completed)}
          >
            <View style={styles.checkbox}>
              {todo.completed && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <View style={styles.textContainer}>
              <Text style={[
                styles.todoText,
                todo.completed && styles.completedText
              ]}>
                {todo.text}
              </Text>
              <Text style={styles.dateText}>
                {formatDate(todo.createdAt)} • {formatTime(todo.createdAt)}
              </Text>
            </View>
            <View style={[
              styles.statusBadge,
              todo.completed ? styles.completedBadge : styles.pendingBadge
            ]}>
              <Text style={[
                styles.statusText,
                todo.completed ? styles.completedStatusText : styles.pendingStatusText
              ]}>
                {todo.completed ? "Erledigt" : "Offen"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(todo._id)}
          >
            <Text style={styles.deleteButtonText}>🗑</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Platform.OS === 'web' ? 16 : 14,
    paddingLeft: Platform.OS === 'web' ? 16 : 14,
    paddingRight: Platform.OS === 'web' ? 12 : 10,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#4F46E5",
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    }),
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: Platform.OS === 'web' ? 24 : 28,
    height: Platform.OS === 'web' ? 24 : 28,
    borderRadius: Platform.OS === 'web' ? 12 : 14,
    borderWidth: 2,
    borderColor: "#4F46E5",
    marginRight: Platform.OS === 'web' ? 12 : 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  checkmark: {
    color: "#4F46E5",
    fontSize: Platform.OS === 'web' ? 16 : 18,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
    marginRight: Platform.OS === 'web' ? 12 : 10,
  },
  todoText: {
    fontSize: Platform.OS === 'web' ? 16 : 16,
    fontWeight: "500",
    color: "#2D3748",
    marginBottom: 4,
    lineHeight: Platform.OS === 'web' ? 22 : 24,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#A0AEC0",
  },
  dateText: {
    fontSize: Platform.OS === 'web' ? 12 : 13,
    color: "#718096",
    fontWeight: "400",
  },
  statusBadge: {
    paddingHorizontal: Platform.OS === 'web' ? 8 : 10,
    paddingVertical: Platform.OS === 'web' ? 4 : 6,
    borderRadius: 12,
    minWidth: Platform.OS === 'web' ? 60 : 70,
    alignItems: "center",
  },
  completedBadge: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#22C55E",
  },
  pendingBadge: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#F59E0B",
  },
  statusText: {
    fontSize: Platform.OS === 'web' ? 11 : 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  completedStatusText: {
    color: "#16A34A",
  },
  pendingStatusText: {
    color: "#D97706",
  },
  deleteButton: {
    marginLeft: Platform.OS === 'web' ? 8 : 10,
    width: Platform.OS === 'web' ? 36 : 40,
    height: Platform.OS === 'web' ? 36 : 40,
    borderRadius: Platform.OS === 'web' ? 18 : 20,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F87171",
  },
  deleteButtonText: {
    fontSize: Platform.OS === 'web' ? 16 : 18,
  },
});

export default TodoList;