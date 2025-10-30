import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";

/**
 * Mockup Component with Real Image
 *
 * INSTRUÇÕES:
 * 1. Faça upload da imagem do mockup via aba IMAGES do Vibecode
 * 2. Salve como: command-click-mockup.png em assets/images/
 * 3. No HomeScreen.tsx, troque a importação:
 *    De: import MockupImage from "../components/MockupImage"
 *    Para: import MockupImage from "../components/MockupImageReal"
 */

export default function MockupImageReal() {
  const mockupSource = require("../../assets/images/command-click-mockup.png");

  return (
    <View className="mt-12 rounded-2xl overflow-hidden">
      <Image
        source={mockupSource}
        style={{
          width: "100%",
          height: 280,
        }}
        contentFit="contain"
        priority="high"
      />
    </View>
  );
}
