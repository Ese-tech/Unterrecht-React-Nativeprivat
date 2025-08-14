import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tailwind from "nativewind";
interface NavbarProps {
  isLoggedIn: boolean;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onNavigate, onLogout }) => (
  <View style={tailwind("flex-row justify-around items-center bg-gray-800 p-4 shadow-xl")}>
    <TouchableOpacity onPress={() => onNavigate("home")}>
      <Text style={tailwind("text-lg text-indigo-400 font-bold")}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onNavigate("about")}>
      <Text style={tailwind("text-lg text-indigo-400 font-bold")}>About</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onNavigate("contact")}>
      <Text style={tailwind("text-lg text-indigo-400 font-bold")}>Contact</Text>
    </TouchableOpacity>
    {isLoggedIn && (
      <TouchableOpacity onPress={() => onNavigate("todos")}>
        <Text style={tailwind("text-lg text-indigo-400 font-bold")}>Todos</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity onPress={isLoggedIn ? onLogout : () => onNavigate("home")}>
      <Text style={tailwind(`text-lg font-bold ${isLoggedIn ? "text-red-400" : "text-green-400"}`)}>
        {isLoggedIn ? "Logout" : "Login"}
      </Text>
    </TouchableOpacity>
  </View>
);
export default Navbar;