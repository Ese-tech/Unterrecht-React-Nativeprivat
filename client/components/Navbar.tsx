import React from "react";
import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => (
  <View className="flex flex-row gap-x-4 justify-center items-center bg-gray-800 p-4 shadow-xl">
    <Link href="/home" asChild>
      <Pressable>
        <Text className="text-lg text-indigo-400 font-bold px-2">Home</Text>
      </Pressable>
    </Link>
    <Link href="/about" asChild>
      <Pressable>
        <Text className="text-lg text-indigo-400 font-bold px-2">About</Text>
      </Pressable>
    </Link>
    <Link href="/contact" asChild>
      <Pressable>
        <Text className="text-lg text-indigo-400 font-bold px-2">Contact</Text>
      </Pressable>
    </Link>
    {isLoggedIn && (
      <Link href="/todos" asChild>
        <Pressable>
          <Text className="text-lg text-indigo-400 font-bold px-2">Todos</Text>
        </Pressable>
      </Link>
    )}
    <Pressable onPress={isLoggedIn ? onLogout : undefined}>
      <Text className={`text-lg font-bold px-2 ${isLoggedIn ? "text-red-400" : "text-green-400"}`}>
        {isLoggedIn ? "Logout" : ""}
      </Text>
    </Pressable>
  </View>
);
export default Navbar;