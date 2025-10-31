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
    <View style={{ flex: 1, backgroundColor: "#0f172a", minHeight: '100%' }}>
      {/* Base gradient background */}
      <LinearGradient
        colors={["#1e293b", "#0f172a", "#020617"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />

      {/* Subtle pattern overlay - simulates workshop environment */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundColor: "transparent",
        }}
      >
        {/* Diagonal lines pattern */}
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            style={{
              position: "absolute",
              left: -100,
              right: -100,
              top: i * 100,
              height: 1,
              backgroundColor: "#3b82f6",
              transform: [{ rotate: "45deg" }],
            }}
          />
        ))}
      </View>

      {/* Content */}
      {children}
    </View>
  );
}
