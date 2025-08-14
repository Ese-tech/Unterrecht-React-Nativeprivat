import React from "react";
import { View, Text } from "react-native";
import tailwind from "nativewind";

export default function AboutPage() {
  return (
    <View style={tailwind("flex-1 justify-center items-center bg-gray-900 p-8")}>
      <Text style={tailwind("text-4xl font-bold text-indigo-400 mb-4")}>Über Uns</Text>
      <Text style={tailwind("text-lg text-white text-center")}>
        Diese App hilft dir, deine täglichen Aufgaben effizient zu verwalten.
        Minimalistisch, produktiv und modern – für deinen Alltag!
      </Text>
    </View>
  );
}