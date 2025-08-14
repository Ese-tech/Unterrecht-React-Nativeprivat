# 🆚 React Web vs React Native - Die wichtigsten Unterschiede

> **Für den Unterricht:** Diese Datei zeigt genau die Stellen, wo React Native sich von React Web unterscheidet.

---

## 📱 **1. Komponenten (UI-Elemente)**

| React Web | React Native | Warum anders? |
|-----------|--------------|---------------|
| `<div>` | `<View>` | Mobile hat keine HTML-Elemente |
| `<h1>`, `<p>`, `<span>` | `<Text>` | Alle Texte brauchen Text-Container |
| `<input>` | `<TextInput>` | Mobile Input-Verhalten ist anders |
| `<button>` | `<TouchableOpacity>` | Touch-Interaktionen statt Klicks |
| `<img>` | `<Image>` | Native Bildverarbeitung |

```tsx
// ❌ React Web
<div className="container">
  <h1>Titel</h1>
  <input onChange={handleChange} />
  <button onClick={handleClick}>Klick</button>
</div>

// ✅ React Native
<View style={styles.container}>
  <Text>Titel</Text>
  <TextInput onChangeText={handleChange} />
  <TouchableOpacity onPress={handleClick}>
    <Text>Klick</Text>
  </TouchableOpacity>
</View>
```

---

## 🎯 **2. Event-Handler**

| React Web | React Native | Unterschied |
|-----------|--------------|-------------|
| `onClick` | `onPress` | Touch statt Maus |
| `onChange` | `onChangeText` | Direkter Text-Zugriff |
| `onSubmit` | - | Kein Form-Submit |

```tsx
// ❌ React Web
<input 
  onChange={(e) => setValue(e.target.value)}
  onClick={() => console.log('clicked')} 
/>

// ✅ React Native  
<TextInput 
  onChangeText={setValue}
  onPress={() => console.log('pressed')}
/>
```

---

## 💾 **3. Storage (Speicherung)**

| React Web | React Native | Unterschied |
|-----------|--------------|-------------|
| `localStorage.getItem()` | `AsyncStorage.getItem()` | Sync vs Async |
| `localStorage.setItem()` | `AsyncStorage.setItem()` | Sync vs Async |

```tsx
// ❌ React Web (synchron)
const token = localStorage.getItem('token');
localStorage.setItem('token', newToken);

// ✅ React Native (asynchron!)
const token = await AsyncStorage.getItem('token');
await AsyncStorage.setItem('token', newToken);
```

---

## 🚨 **4. Alerts & Notifications**

| React Web | React Native | Unterschied |
|-----------|--------------|-------------|
| `alert()` | `Alert.alert()` | Native Mobile Alert |
| Toast-Libraries | `Alert.alert()` | Integrierte Lösung |

```tsx
// ❌ React Web
alert('Fehler aufgetreten!');

// ✅ React Native
Alert.alert('Fehler', 'Ein Fehler ist aufgetreten!');
```

---

## 🎨 **5. Styling**

| React Web | React Native | Unterschied |
|-----------|--------------|-------------|
| CSS Classes | StyleSheet | JavaScript-Objekte |
| `className` | `style` | Direkte Style-Props |
| CSS Units | Flexbox + Numbers | Keine px, em, rem |

```tsx
// ❌ React Web
<div className="container bg-blue-500">

// ✅ React Native  
<View style={styles.container}>
// oder mit NativeWind:
<View style={tailwind("bg-blue-500")}>
```

---

## 🧭 **6. Navigation**

| React Web | React Native | Unterschied |
|-----------|--------------|-------------|
| React Router | Expo Router | File-based Routing |
| `<Link>` | `router.push()` | Programmatische Navigation |
| `useNavigate()` | `useRouter()` | Andere Hook-Namen |

```tsx
// ❌ React Web
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/todos');

// ✅ React Native
import { useRouter } from 'expo-router';
const router = useRouter();
router.push('/todos');
```

---

## 📋 **7. Listen & Performance**

| React Web | React Native | Warum anders? |
|-----------|--------------|---------------|
| `todos.map()` | `<FlatList>` | Optimiert für Mobile |
| Infinite Scroll | `onEndReached` | Native Performance |

```tsx
// ❌ React Web
{todos.map(todo => (
  <div key={todo.id}>{todo.text}</div>
))}

// ✅ React Native
<FlatList
  data={todos}
  keyExtractor={item => item.id}
  renderItem={({item}) => <Text>{item.text}</Text>}
/>
```

---

## 🎬 **8. Animationen**

| React Web | React Native | Unterschied |
|-----------|--------------|-------------|
| CSS Transitions | `Animated.timing()` | JavaScript-basiert |
| CSS Keyframes | `Animated.Value` | Native Performance |

```tsx
// ❌ React Web
.fade-in {
  transition: opacity 0.8s ease;
}

// ✅ React Native
const opacity = useRef(new Animated.Value(0)).current;
Animated.timing(opacity, {
  toValue: 1,
  duration: 800,
  useNativeDriver: true
}).start();
```

---

## 🏗️ **9. Projektstruktur**

```
React Web:                  React Native (Expo):
├── src/                   ├── app/              (File-based Routes)
│   ├── components/        │   ├── _layout.tsx   (Root Layout)
│   ├── pages/             │   ├── index.tsx     (Home Screen)
│   └── App.tsx            │   └── todos.tsx     (Todos Screen)
├── public/                ├── assets/           (Bilder, Fonts)
└── package.json           ├── components/       (Komponenten)
                          └── package.json
```

---

## ⚡ **Warum diese Unterschiede?**

1. **Mobile Performance** - FlatList ist für 1000+ Items optimiert
2. **Touch Interface** - onPress statt onClick für Finger-Bedienung  
3. **Native Features** - Alert.alert nutzt das Betriebssystem
4. **Security** - AsyncStorage ist sicherer als localStorage
5. **Plattform-Integration** - ImageBackground nutzt native Bild-Rendering

---

## 🎯 **Teaching-Tipp für morgen:**

**Zeigen Sie Ihren Studenten parallel:**
1. ✅ **React Native Code** (was sie schreiben)
2. ❌ **React Web Equivalent** (was sie NICHT schreiben sollen)
3. 🤔 **Warum** der Unterschied existiert

**Beispiel-Satz:** *"In React Web würden wir `<div>` schreiben, aber in React Native brauchen wir `<View>`, weil mobile Apps keine HTML-Elemente haben."*
