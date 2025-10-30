import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * Mockup Component - Shows Command Click app on multiple devices
 *
 * Currently shows a placeholder.
 * To use the real mockup image, create MockupImageReal.tsx and import the image there.
 */

export default function MockupImage() {
  // Styled placeholder for mockup
  return (
    <View className="mt-12 bg-slate-800 rounded-2xl p-8 items-center justify-center border-2 border-slate-700 min-h-[280px]">
      <View className="flex-row items-center justify-center mb-4 gap-4">
        <Ionicons name="phone-portrait" size={60} color="#3b82f6" />
        <Ionicons name="tablet-portrait" size={70} color="#3b82f6" />
        <Ionicons name="laptop" size={80} color="#3b82f6" />
      </View>
      <Text className="text-white text-center text-lg font-semibold mb-2">
        Command Click em Ação
      </Text>
      <Text className="text-slate-400 text-center text-sm leading-relaxed">
        Sistema completo para celular, tablet e computador
      </Text>
    </View>
  );
}
