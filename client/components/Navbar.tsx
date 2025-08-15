import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => (
  <View style={styles.container}>
    <Link href="/home" asChild>
      <Pressable>
        <Text style={styles.linkText}>Home</Text>
      </Pressable>
    </Link>
    <Link href="/about" asChild>
      <Pressable>
        <Text style={styles.linkText}>About</Text>
      </Pressable>
    </Link>
    <Link href="/contact" asChild>
      <Pressable>
        <Text style={styles.linkText}>Contact</Text>
      </Pressable>
    </Link>
    {isLoggedIn && (
      <Link href="/todos" asChild>
        <Pressable>
          <Text style={styles.linkText}>Todos</Text>
        </Pressable>
      </Link>
    )}
    <Pressable onPress={isLoggedIn ? onLogout : undefined}>
      <Text style={[styles.linkText, { color: isLoggedIn ? '#f87171' : '#10b981' }]}>
        {isLoggedIn ? "Logout" : ""}
      </Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    padding: 16,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
  linkText: {
    fontSize: 18,
    color: '#818cf8',
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
});

export default Navbar;