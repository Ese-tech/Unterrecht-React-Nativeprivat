import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
// ❗ RN vs WEB: NativeWind für Tailwind CSS in React Native
interface NavbarProps {
  isLoggedIn: boolean;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onNavigate, onLogout }) => (
  <View className="flex-row justify-around items-center bg-gray-800 p-4 shadow-xl">
    <TouchableOpacity onPress={() => onNavigate("home")}>
      <Text className="text-lg text-indigo-400 font-bold">Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onNavigate("about")}>
      <Text className="text-lg text-indigo-400 font-bold">About</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onNavigate("contact")}>
      <Text className="text-lg text-indigo-400 font-bold">Contact</Text>
    </TouchableOpacity>
    {isLoggedIn && (
      <TouchableOpacity onPress={() => onNavigate("todos")}>
        <Text className="text-lg text-indigo-400 font-bold">Todos</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity onPress={isLoggedIn ? onLogout : () => onNavigate("home")}>
      <Text className={`text-lg font-bold ${isLoggedIn ? "text-red-400" : "text-green-400"}`}>
        {isLoggedIn ? "Logout" : "Login"}
      </Text>
    </TouchableOpacity>
  </View>
);
export default Navbar;