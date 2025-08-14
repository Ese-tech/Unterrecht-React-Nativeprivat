# 🎓 **React Native Fullstack Tutorial - Schritt für Schritt**

## 📱 **Was bauen wir?**
Eine **moderne Todo-App** mit:
- **Backend:** Bun + TypeScript + MongoDB + JWT Auth
- **Frontend:** React Native + Expo Router + NativeWind (Tailwind)
- **Features:** Login/Register, CRUD Todos, Protected Routes

---

## 🚀 **Installation & Setup**

### **1. Backend starten:**
```bash
cd server
bun install
bun run src/server.ts
```

### **2. Frontend starten:**
```bash
cd client
bun install
bun start
```

### **3. Testen:**
- Web: http://localhost:8081
- Handy: Expo Go App + QR Code scannen

---

## 📊 **React vs React Native - Hauptunterschiede**

| **Aspekt** | **React (Web)** | **React Native** |
|------------|-----------------|------------------|
| **Komponenten** | `<div>`, `<h1>`, `<button>` | `<View>`, `<Text>`, `<TouchableOpacity>` |
| **Styling** | CSS, className | StyleSheet, style prop |
| **Events** | `onClick`, `onChange` | `onPress`, `onChangeText` |
| **Navigation** | React Router | Expo Router (file-based) |
| **Storage** | localStorage | AsyncStorage (async!) |
| **Listen** | `.map()` mit `<ul><li>` | `<FlatList>` (virtualisiert) |
| **Forms** | `<form>`, `<input>` | `<TextInput>`, keine Forms |
| **Platform** | Browser only | iOS + Android + Web |

---

## 🎯 **Commit-Reihenfolge für Unterricht**

### **Backend (Commits 1-7):**
1. **Project Setup** - package.json, tsconfig, .env
2. **Database & Config** - MongoDB Connection, Environment
3. **User Model** - Mongoose Schema, Password Hashing
4. **Auth Controller** - Login/Register Logic
5. **Middleware** - JWT Verification, Role Checks
6. **Todo Model & Controller** - CRUD Operations
7. **Routes & Server** - REST API, CORS, Error Handling

### **Frontend (Commits 8-14):**
8. **React vs RN Basics** - Komponenten-Unterschiede
9. **Expo Router** - Navigation, Auth Context
10. **Login Form** - Forms, Animations, Input Handling
11. **Todo List** - FlatList, TouchableOpacity, State
12. **API Integration** - Axios, AsyncStorage, Error Handling
13. **Styling** - NativeWind, Dark Theme, Typography
14. **Navigation & Protection** - Conditional Routes, Auth Guards

---

## 🔍 **Wichtige Konzepte für Schüler**

### **1. Komponenten-Mapping:**
```jsx
// Web React
<div className="container">
  <h1>Title</h1>
  <button onClick={handleClick}>Click</button>
  <input onChange={handleChange} />
</div>

// React Native
<View style={styles.container}>
  <Text style={styles.title}>Title</Text>
  <TouchableOpacity onPress={handlePress}>
    <Text>Press</Text>
  </TouchableOpacity>
  <TextInput onChangeText={handleChange} />
</View>
```

### **2. Styling-Ansätze:**
```jsx
// CSS Klassen (Web)
<div className="bg-blue-500 p-4 rounded-lg">

// StyleSheet (React Native)
<View style={styles.container}>
const styles = StyleSheet.create({
  container: { backgroundColor: 'blue', padding: 16, borderRadius: 8 }
});

// NativeWind (Tailwind für RN)
<View style={tailwind("bg-blue-500 p-4 rounded-lg")}>
```

### **3. Navigation:**
```jsx
// React Router (Web)
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/todos');

// Expo Router (React Native)
import { useRouter } from 'expo-router';
const router = useRouter();
router.push('/todos');
```

### **4. Data Persistence:**
```jsx
// Web
localStorage.setItem('token', token);
const token = localStorage.getItem('token');

// React Native
await AsyncStorage.setItem('token', token);
const token = await AsyncStorage.getItem('token');
```

---

## 🎨 **Design Pattern**

### **1. Komponentenstruktur:**
```
app/
├── _layout.tsx      (Root Layout + Auth Context)
├── home.tsx         (Login/Register Screen)
├── todos.tsx        (Todo CRUD - Protected)
├── about.tsx        (Static Content)
└── contact.tsx      (Static Content)

components/
├── Navbar.tsx       (Navigation + Auth Status)
├── LoginForm.tsx    (Form mit Animation)
└── TodoList.tsx     (FlatList + CRUD Actions)
```

### **2. State Management:**
```jsx
// Global Auth State (Context)
const AuthContext = createContext();

// Local Component State
const [todos, setTodos] = useState([]);
const [newTodo, setNewTodo] = useState('');

// Persistent Storage
AsyncStorage.setItem('token', token);
```

### **3. API Integration:**
```jsx
// Axios Setup
const API_URL = "http://localhost:5000/api";

// Auth Headers
headers: { Authorization: `Bearer ${token}` }

// Error Handling
try {
  const res = await axios.post('/api/auth/login', data);
} catch (e) {
  Alert.alert('Fehler', e.response?.data?.message);
}
```

---

## 🚨 **Häufige Fehler & Lösungen**

### **1. AsyncStorage vergessen:**
```jsx
❌ const token = AsyncStorage.getItem('token'); // Sync!
✅ const token = await AsyncStorage.getItem('token'); // Async!
```

### **2. Falsche Komponenten:**
```jsx
❌ <div><h1>Title</h1></div>
✅ <View><Text>Title</Text></View>
```

### **3. Style-Props:**
```jsx
❌ <View className="bg-blue-500">
✅ <View style={tailwind("bg-blue-500")}>
```

### **4. Event Handler:**
```jsx
❌ <TouchableOpacity onClick={handleClick}>
✅ <TouchableOpacity onPress={handlePress}>
```

---

## 📝 **Übungsaufgaben**

### **Level 1 (Basics):**
1. Ändere die Farben der Navbar
2. Füge ein neues Feld "Beschreibung" zu Todos hinzu
3. Erstelle eine neue "Settings" Seite

### **Level 2 (Intermediate):**
1. Implementiere "Todo bearbeiten" Funktionalität
2. Füge Todo-Kategorien hinzu
3. Erstiere eine Such-/Filter-Funktion

### **Level 3 (Advanced):**
1. Implementiere Offline-Sync
2. Füge Push Notifications hinzu
3. Erstelle eine "Freunde hinzufügen" Funktion

---

## 🎯 **Projekt-Erweiterungen**

### **Backend:**
- [ ] Email-Verifikation
- [ ] Password Reset
- [ ] File Upload (Profilbilder)
- [ ] Real-time Updates (WebSockets)

### **Frontend:**
- [ ] Dark/Light Mode Toggle
- [ ] Splash Screen Animation
- [ ] Pull-to-Refresh
- [ ] Infinite Scrolling
- [ ] Camera Integration
- [ ] Biometric Authentication

---

## 📚 **Weiterführende Resources**

- **React Native Docs:** https://reactnative.dev
- **Expo Docs:** https://docs.expo.dev
- **NativeWind:** https://www.nativewind.dev
- **React Native Elements:** https://reactnativeelements.com
- **Expo Router:** https://docs.expo.dev/routing/introduction

---

**Viel Erfolg beim Unterrichten! 🚀📱**
