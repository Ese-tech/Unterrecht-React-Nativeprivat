import React from "react";
import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
// Let's try importing the router imperative API
let router: any;
try {
  const expoRouter = require('expo-router');
  router = expoRouter.router;
} catch (e) {
  console.log('Could not import expo-router:', e);
}

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const handleNavigation = (path: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = path;
    } else {
      // Try using the router imperative API if available
      if (router && typeof router.push === 'function') {
        try {
          router.push(path);
        } catch (e) {
          console.log('Router navigation failed:', e);
          // Fallback to console log
          console.log('Mobile navigation to:', path);
        }
      } else {
        console.log('No router available, logging navigation to:', path);
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