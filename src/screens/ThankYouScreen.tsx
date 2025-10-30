import React, { useEffect } from "react";
import { View, Text, Pressable, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { useFormStore } from "../state/formStore";
import { trackPageView, trackContact, trackButtonClick } from "../utils/metaPixel";

type Props = NativeStackScreenProps<RootStackParamList, "ThankYou">;

export default function ThankYouScreen({ navigation }: Props) {
  const { formData } = useFormStore();

  const handleWhatsAppContact = () => {
    trackContact("whatsapp");
    trackButtonClick("Falar agora no WhatsApp", "Thank You Page");
    const message = encodeURIComponent(
      `Olá! Acabei de solicitar uma demonstração do Command Click. Meu nome é ${formData.fullName} da ${formData.workshopName}.`
    );
    Linking.openURL(`https://wa.me/5513982111925?text=${message}`);
  };

  useEffect(() => {
    // Track thank you page view
    trackPageView("Thank You - Conversion Complete");

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
        <View className="mt-12 px-5">
          <Text className="text-white text-lg font-bold text-center mb-5">
            O que acontece agora?
          </Text>

          <View className="bg-slate-800 px-5 pt-6 pb-[45px] rounded-xl border border-slate-700">
            <View className="flex-row items-start mb-6">
              <View className="bg-blue-600 w-10 h-10 rounded-lg items-center justify-center mr-3 flex-shrink-0">
                <Ionicons name="time" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-sm mb-1">
                  Resposta rápida
                </Text>
                <Text className="text-slate-400 text-xs leading-relaxed">
                  Resposta em até 2 horas
                </Text>
              </View>
            </View>

            <View className="flex-row items-start mb-0">
              <View className="bg-green-600 w-10 h-10 rounded-lg items-center justify-center mr-3 flex-shrink-0">
                <Ionicons name="shield-checkmark" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-sm mb-1">
                  100% gratuito
                </Text>
                <Text className="text-slate-400 text-xs leading-relaxed">
                  Demonstração sem custo
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
