import React from "react";
import { View, useWindowDimensions } from "react-native";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: number;
}

/**
 * Container responsivo que centraliza o conteúdo em telas grandes (desktop)
 * e mantém full width em mobile
 */
export default function ResponsiveContainer({
  children,
  maxWidth = 1200,
}: ResponsiveContainerProps) {
  const { width } = useWindowDimensions();

  const isDesktop = width >= 768;

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignSelf: "center",
        maxWidth: isDesktop ? maxWidth : "100%",
      }}
    >
      {children}
    </View>
  );
}
