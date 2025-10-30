import React from "react";
import { Image } from "expo-image";
import { View } from "react-native";

interface LogoImageProps {
  size?: "small" | "medium" | "large";
}

const sizeConfig = {
  small: { width: 150, height: 50 },
  medium: { width: 240, height: 80 },
  large: { width: 320, height: 107 },
};

/**
 * INSTRUÇÕES PARA USAR A LOGO REAL:
 *
 * 1. Adicione a imagem da logo em: assets/images/command-click-logo.png
 * 2. Substitua a importação em HomeScreen.tsx:
 *    - De: import CommandClickLogo from "../components/CommandClickLogo"
 *    - Para: import CommandClickLogo from "../components/CommandClickLogoImage"
 * 3. A logo será exibida automaticamente!
 */

export default function CommandClickLogoImage({
  size = "medium",
}: LogoImageProps) {
  const dimensions = sizeConfig[size];
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
}
