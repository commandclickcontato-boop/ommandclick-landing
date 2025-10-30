import React, { useEffect } from "react";
import { View, Text, Pressable, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { useFormStore } from "../state/formStore";

type Props = NativeStackScreenProps<RootStackParamList, "ThankYou">;

export default function ThankYouScreen({ navigation }: Props) {
  const { formData } = useFormStore();

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Olá! Acabei de solicitar uma demonstração do Command Click. Meu nome é ${formData.fullName} da ${formData.workshopName}.`
    );
    Linking.openURL(`https://wa.me/5513982111925?text=${message}`);
  };

  useEffect(() => {
    // Log form submission for tracking
    console.log("Form submitted:", formData);
  }, [formData]);

  return (
    <SafeAreaView className="flex-1 bg-slate-900" edges={["top", "bottom"]}>
      <View className="flex-1 px-6 justify-center items-center">
        {/* Success Icon */}
        <View className="bg-green-600 w-24 h-24 rounded-full items-center justify-center mb-8">
          <Ionicons name="checkmark" size={60} color="white" />
        </View>

        {/* Title */}
        <Text className="text-white text-4xl font-bold text-center mb-4">
          Recebemos seu pedido!
        </Text>

        {/* Description */}
        <Text className="text-slate-300 text-lg text-center mb-12 leading-relaxed px-4">
          Em breve nossa equipe vai te chamar no WhatsApp para mostrar o
          Command Click em ação.
        </Text>

        {/* WhatsApp Button */}
        <Pressable
          onPress={handleWhatsAppContact}
          className="bg-green-600 py-5 px-8 rounded-xl flex-row items-center mb-4 active:bg-green-700 w-full"
        >
          <Ionicons name="logo-whatsapp" size={24} color="white" />
          <Text className="text-white text-lg font-bold ml-2 flex-1 text-center">
            Falar agora no WhatsApp
          </Text>
        </Pressable>

        {/* Back to Home */}
        <Pressable
          onPress={() => navigation.navigate("Home")}
          className="py-4 px-8 active:opacity-70"
        >
          <Text className="text-slate-400 text-base">
            Voltar para página inicial
          </Text>
        </Pressable>

        {/* Additional Info */}
        <View className="mt-12 px-2">
          <Text className="text-white text-xl font-bold text-center mb-6">
            O que acontece agora?
          </Text>

          <View className="bg-slate-800 px-6 pt-10 pb-14 rounded-2xl border border-slate-700 min-h-[280px]">
            <View className="flex-row items-center mb-10">
              <View className="bg-blue-600 w-14 h-14 rounded-2xl items-center justify-center mr-5 flex-shrink-0">
                <Ionicons name="time" size={26} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-lg mb-2">
                  Resposta rápida
                </Text>
                <Text className="text-slate-300 text-sm leading-relaxed">
                  Nosso time responde em até 2 horas úteis
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="bg-green-600 w-14 h-14 rounded-2xl items-center justify-center mr-5 flex-shrink-0">
                <Ionicons name="shield-checkmark" size={26} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-lg mb-2">
                  Teste sem custo
                </Text>
                <Text className="text-slate-300 text-sm leading-relaxed">
                  Demonstração 100% gratuita
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
