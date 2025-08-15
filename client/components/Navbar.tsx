import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const handleNavigation = (path: string) => {
    // For web navigation, use window.location properly
    if (typeof window !== 'undefined') {
      // Remove the current hash and navigate to the new route
      window.history.pushState({}, '', path);
      // Trigger a page reload to ensure the route change takes effect
      window.location.reload();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => handleNavigation('/home')}>
        <Text style={styles.linkText}>Home</Text>
      </Pressable>
      <Pressable onPress={() => handleNavigation('/about')}>
        <Text style={styles.linkText}>About</Text>
      </Pressable>
      <Pressable onPress={() => handleNavigation('/contact')}>
        <Text style={styles.linkText}>Contact</Text>
      </Pressable>
      {isLoggedIn && (
        <Pressable onPress={() => handleNavigation('/todos')}>
          <Text style={styles.linkText}>Todos</Text>
        </Pressable>
      )}
      {isLoggedIn && (
        <Pressable onPress={onLogout}>
          <Text style={[styles.linkText, { color: '#EF4444' }]}>
            Logout
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  linkText: {
    fontSize: 18,
    color: '#4F46E5', // Purple
    fontWeight: 'bold',
    paddingHorizontal: 12,
  },
});

export default Navbar;