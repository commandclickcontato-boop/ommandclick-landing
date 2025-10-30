import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export default function CommandClickLogo({ size = "medium" }: LogoProps) {
  // Styled text logo with icon
  // When you add the actual logo image to assets/images/command-click-logo.png,
  // you can update this component to use expo-image

  const iconSize = size === "small" ? 24 : size === "medium" ? 36 : 48;
  const fontSize = size === "small" ? 16 : size === "medium" ? 24 : 32;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: iconSize + 8,
          height: iconSize + 8,
          borderRadius: (iconSize + 8) / 4,
          backgroundColor: "#2563eb",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        <Ionicons name="checkmark-done" size={iconSize} color="white" />
      </View>
      <Text
        style={{
          color: "white",
          fontSize: fontSize,
          fontWeight: "bold",
          letterSpacing: 0.5,
        }}
      >
        COMMAND CLICK
      </Text>
    </View>
  );
}
