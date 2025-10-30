import React from "react";
import { Image } from "expo-image";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LogoProps {
  size?: "small" | "medium" | "large";
  fallback?: boolean;
}

const sizeConfig = {
  small: { width: 150, height: 50 },
  medium: { width: 240, height: 80 },
  large: { width: 320, height: 107 },
};

export default function CommandClickLogo({
  size = "medium",
  fallback = true,
}: LogoProps) {
  const dimensions = sizeConfig[size];

  // Try to load the actual logo image
  // If it doesn't exist, show a styled text version
  try {
    const logoSource = require("../../assets/images/command-click-logo.png");
    return (
      <View style={{ width: dimensions.width, height: dimensions.height }}>
        <Image
          source={logoSource}
          style={{ width: "100%", height: "100%" }}
          contentFit="contain"
          priority="high"
        />
      </View>
    );
  } catch (error) {
    // Fallback: styled text logo
    if (!fallback) return null;

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
}
