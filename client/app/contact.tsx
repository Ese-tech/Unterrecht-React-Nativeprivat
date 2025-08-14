import React from "react";
import { View, Text } from "react-native";
// ❗ RN vs WEB: NativeWind für Tailwind CSS in React Native

export default function ContactPage() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-900 p-8">
      <Text className="text-4xl font-bold text-indigo-400 mb-4">Kontakt</Text>
      <Text className="text-lg text-white text-center">
        Fragen oder Feedback? Schreib uns an:
      </Text>
      <Text className="text-lg text-indigo-400 underline mt-2">
        support@todoapp.com
      </Text>
    </View>
  );
}