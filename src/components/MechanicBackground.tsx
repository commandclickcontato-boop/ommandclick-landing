import React from "react";
import { View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface MechanicBackgroundProps {
  children: React.ReactNode;
}

export default function MechanicBackground({
  children,
}: MechanicBackgroundProps) {
  // Pattern overlay that simulates a mechanic workshop feel
  // without needing an actual image - uses gradients and opacity
  return (
    <View style={{ flex: 1, backgroundColor: "#020617" }}>
      {/* Content with gradient background */}
      <LinearGradient
        colors={["#1e293b", "#0f172a", "#020617"]}
        style={{ flex: 1 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
