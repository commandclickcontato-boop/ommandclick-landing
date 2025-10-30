import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

/**
 * Mockup Component - Shows Command Click app on multiple devices
 *
 * To use the real mockup image:
 * 1. Upload the mockup image via Vibecode IMAGES tab
 * 2. Save as: assets/images/command-click-mockup.png
 * 3. The image will automatically appear here
 */

export default function MockupImage() {
  // Try to load the mockup image
  // If it doesn't exist, show a styled placeholder

  try {
    const mockupSource = require("../../assets/images/command-click-mockup.png");

    return (
      <View className="mt-12 rounded-2xl overflow-hidden">
        <Image
          source={mockupSource}
          style={{
            width: "100%",
            height: 300,
          }}
          contentFit="contain"
          priority="high"
        />
      </View>
    );
  } catch {
    // Fallback: Placeholder
    return (
      <View className="mt-12 bg-slate-800 rounded-2xl p-8 items-center justify-center border-2 border-slate-700">
        <Ionicons name="phone-portrait" size={80} color="#475569" />
        <Text className="text-slate-500 text-center mt-4 text-sm">
          App em celular, tablet e notebook
        </Text>
        <Text className="text-slate-600 text-center mt-2 text-xs">
          Faça upload da imagem: command-click-mockup.png
        </Text>
      </View>
    );
  }
}
