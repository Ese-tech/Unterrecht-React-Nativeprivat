import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => (
  <View className="flex-row justify-around items-center bg-gray-800 p-4 shadow-xl">
    <Link href="/home">
      <Text className="text-lg text-indigo-400 font-bold">Home</Text>
    </Link>
    <Link href="/about">
      <Text className="text-lg text-indigo-400 font-bold">About</Text>
    </Link>
    <Link href="/contact">
      <Text className="text-lg text-indigo-400 font-bold">Contact</Text>
    </Link>
    {isLoggedIn && (
      <Link href="/todos">
        <Text className="text-lg text-indigo-400 font-bold">Todos</Text>
      </Link>
    )}
    <Text
      className={`text-lg font-bold ${isLoggedIn ? "text-red-400" : "text-green-400"}`}
      onPress={isLoggedIn ? onLogout : undefined}
    >
      {isLoggedIn ? "Logout" : ""}
    </Text>
  </View>
);
export default Navbar;