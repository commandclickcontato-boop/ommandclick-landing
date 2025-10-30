import React from "react";
import { Image } from "expo-image";
import { View } from "react-native";

interface LogoImageProps {
  size?: "small" | "medium" | "large";
}

const sizeConfig = {
  small: { width: 180, height: 60 },
  medium: { width: 260, height: 87 },
  large: { width: 340, height: 113 },
};

/**
 * Logo Component - Uses the full Command Click logo
 */

export default function CommandClickLogoImage({
  size = "medium",
}: LogoImageProps) {
  const dimensions = sizeConfig[size];
  const logoSource = require("../../assets/images/command-click-logo-full.png");

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
}
