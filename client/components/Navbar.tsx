import React from "react";
import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        // For web, try expo-router first, fallback to window.location
        router.push(path);
      } else {
        // For mobile platforms, use expo-router's push method
        router.push(path);
      }
    } catch (error) {
      console.log('Navigation error:', error);
      // Fallback for web only
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.location.href = path;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.navButton}
        onPress={() => handleNavigation('/home')}
      >
        <Text style={styles.linkText}>Home</Text>
      </Pressable>
      <Pressable 
        style={styles.navButton}
        onPress={() => handleNavigation('/about')}
      >
        <Text style={styles.linkText}>About</Text>
      </Pressable>
      <Pressable 
        style={styles.navButton}
        onPress={() => handleNavigation('/contact')}
      >
        <Text style={styles.linkText}>Contact</Text>
      </Pressable>
      {isLoggedIn && (
        <Pressable 
          style={styles.navButton}
          onPress={() => handleNavigation('/todos')}
        >
          <Text style={styles.linkText}>Todos</Text>
        </Pressable>
      )}
      {isLoggedIn && (
        <Pressable 
          style={styles.navButton}
          onPress={onLogout}
        >
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
    flexDirection: Platform.OS === 'web' ? 'row' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background
    padding: Platform.OS === 'web' ? 16 : 12,
    elevation: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexWrap: Platform.OS === 'web' ? 'nowrap' : 'wrap',
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
  navButton: {
    paddingHorizontal: Platform.OS === 'web' ? 12 : 8,
    paddingVertical: Platform.OS === 'web' ? 8 : 10,
    marginHorizontal: Platform.OS === 'web' ? 4 : 2,
    borderRadius: 8,
    minHeight: Platform.OS === 'web' ? 40 : 44, // Minimum touch target for mobile
  },
  linkText: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    color: '#4F46E5', // Purple
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Navbar;