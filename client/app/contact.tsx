import React from "react";
import { View, Text } from "react-native";
import tailwind from "nativewind";

export default function ContactPage() {
  return (
    <View style={tailwind("flex-1 justify-center items-center bg-gray-900 p-8")}>
      <Text style={tailwind("text-4xl font-bold text-indigo-400 mb-4")}>Kontakt</Text>
      <Text style={tailwind("text-lg text-white text-center")}>
        Fragen oder Feedback? Schreib uns an:
      </Text>
      <Text style={tailwind("text-lg text-indigo-400 underline mt-2")}>
        support@todoapp.com
      </Text>
    </View>
  );
}