import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { useFormStore } from "../state/formStore";
import type { FormErrors } from "../types/form";
import { sendLeadEmail } from "../utils/sendLeadEmail";
import { trackPageView, trackFormStart, trackLeadDual } from "../utils/metaPixel";

type Props = NativeStackScreenProps<RootStackParamList, "Form">;

export default function FormScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { formData, setFormData, submitForm } = useFormStore();
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasStartedForm, setHasStartedForm] = useState(false);

  // Track page view when component mounts
  useEffect(() => {
    trackPageView("Form - Lead Capture");
  }, []);

  // Track when user starts filling form (on first input)
  const handleFormStart = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackFormStart();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório";
    }

    if (!formData.workshopName.trim()) {
      newErrors.workshopName = "Nome da oficina é obrigatório";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Cidade é obrigatória";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Estado é obrigatório";
    }

    if (!formData.numberOfMechanics) {
      newErrors.numberOfMechanics = "Selecione a quantidade de mecânicos";
    }

    const whatsappRegex = /^\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/;
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (!whatsappRegex.test(formData.whatsapp.replace(/\s/g, ""))) {
      newErrors.whatsapp = "WhatsApp inválido (ex: 11999999999)";
    }

    if (!formData.preferredContactTime) {
      newErrors.preferredContactTime = "Selecione o melhor horário";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      // Track lead conversion with Meta Pixel (browser + API)
      await trackLeadDual({
        fullName: formData.fullName,
        workshopName: formData.workshopName,
        city: formData.city,
        state: formData.state,
        whatsapp: formData.whatsapp,
      });

      // Send email with lead data
      const emailSent = await sendLeadEmail(formData);

      // Save form data locally
      submitForm();

      // Navigate to thank you page
      navigation.navigate("ThankYou");

      // Show confirmation (optional, since we navigate away)
      if (!emailSent) {
        console.log("Email composer opened or data logged");
      }
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-slate-900"
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View className="flex-1">
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View
              className="px-6 bg-slate-800 border-b border-slate-700"
              style={{ paddingTop: insets.top + 20, paddingBottom: 20 }}
            >
              <Pressable
                onPress={() => navigation.goBack()}
                className="mb-4 active:opacity-70"
              >
                <Ionicons name="arrow-back" size={28} color="white" />
              </Pressable>
              <Text className="text-white text-3xl font-bold mb-2">
                Solicitar demonstração
              </Text>
              <Text className="text-slate-400 text-base">
                Preencha os dados abaixo e nossa equipe entrará em contato
              </Text>
            </View>

            <View className="px-6 py-8">
              {/* Nome Completo */}
              <View className="mb-6">
                <Text className="text-white text-base font-semibold mb-2">
                  Nome completo *
                </Text>
                <TextInput
                  value={formData.fullName}
                  onChangeText={(text) => setFormData({ fullName: text })}
                  onFocus={handleFormStart}
                  placeholder="Seu nome completo"
                  placeholderTextColor="#64748b"
                  className="bg-slate-800 text-white px-4 py-4 rounded-xl border border-slate-700"
                  autoCapitalize="words"
                />
                {errors.fullName && (
                  <Text className="text-red-400 text-sm mt-1">
                    {errors.fullName}
                  </Text>
                )}
              </View>

              {/* Nome da Oficina */}
              <View className="mb-6">
                <Text className="text-white text-base font-semibold mb-2">
                  Nome da oficina *
                </Text>
                <TextInput
                  value={formData.workshopName}
                  onChangeText={(text) => setFormData({ workshopName: text })}
                  placeholder="Nome da sua oficina"
                  placeholderTextColor="#64748b"
                  className="bg-slate-800 text-white px-4 py-4 rounded-xl border border-slate-700"
                  autoCapitalize="words"
                />
                {errors.workshopName && (
                  <Text className="text-red-400 text-sm mt-1">
                    {errors.workshopName}
                  </Text>
                )}
              </View>

              {/* Cidade */}
              <View className="mb-6">
                <Text className="text-white text-base font-semibold mb-2">
                  Cidade *
                </Text>
                <TextInput
                  value={formData.city}
                  onChangeText={(text) => setFormData({ city: text })}
                  placeholder="Sua cidade"
                  placeholderTextColor="#64748b"
                  className="bg-slate-800 text-white px-4 py-4 rounded-xl border border-slate-700"
                  autoCapitalize="words"
                />
                {errors.city && (
                  <Text className="text-red-400 text-sm mt-1">
                    {errors.city}
                  </Text>
                )}
              </View>

              {/* Estado */}
              <View className="mb-6">
                <Text className="text-white text-base font-semibold mb-2">
                  Estado *
                </Text>
                <TextInput
                  value={formData.state}
                  onChangeText={(text) => setFormData({ state: text })}
                  placeholder="UF (ex: SP, RJ, MG)"
                  placeholderTextColor="#64748b"
                  className="bg-slate-800 text-white px-4 py-4 rounded-xl border border-slate-700"
                  autoCapitalize="characters"
                  maxLength={2}
                />
                {errors.state && (
                  <Text className="text-red-400 text-sm mt-1">
                    {errors.state}
                  </Text>
                )}
              </View>

              {/* Número de Mecânicos */}
              <View className="mb-6">
                <Text className="text-white text-base font-semibold mb-2">
                  Quantos mecânicos trabalham na oficina? *
                </Text>
                <View className="space-y-3">
                  {[
                    { value: "3-4", label: "3 a 4 mecânicos" },
                    { value: "5-8", label: "5 a 8 mecânicos" },
                    { value: "9+", label: "9 ou mais mecânicos" },
                  ].map((option) => (
                    <Pressable
                      key={option.value}
                      onPress={() =>
                        setFormData({
                          numberOfMechanics: option.value as
                            | "3-4"
                            | "5-8"
                            | "9+",
                        })
                      }
                      className={`flex-row items-center p-4 rounded-xl border ${
                        formData.numberOfMechanics === option.value
                          ? "bg-blue-600 border-blue-500"
                          : "bg-slate-800 border-slate-700"
                      }`}
                    >
                      <View
                        className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                          formData.numberOfMechanics === option.value
                            ? "border-white"
                            : "border-slate-500"
                        }`}
                      >
                        {formData.numberOfMechanics === option.value && (
                          <View className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </View>
                      <Text className="text-white text-base">
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                {errors.numberOfMechanics && (
                  <Text className="text-red-400 text-sm mt-1">
                    {errors.numberOfMechanics}
                  </Text>
                )}
              </View>

              {/* WhatsApp */}
              <View className="mb-6">
                <Text className="text-white text-base font-semibold mb-2">
                  WhatsApp *
                </Text>
                <TextInput
                  value={formData.whatsapp}
                  onChangeText={(text) => setFormData({ whatsapp: text })}
                  placeholder="(11) 99999-9999"
                  placeholderTextColor="#64748b"
                  className="bg-slate-800 text-white px-4 py-4 rounded-xl border border-slate-700"
                  keyboardType="phone-pad"
                />
                {errors.whatsapp && (
                  <Text className="text-red-400 text-sm mt-1">
                    {errors.whatsapp}
                  </Text>
                )}
              </View>

              {/* Melhor Horário */}
              <View className="mb-6">
                <Text className="text-white text-base font-semibold mb-2">
                  Melhor horário para contato *
                </Text>
                <View className="flex-row gap-3">
                  {[
                    { value: "morning", label: "Manhã" },
                    { value: "afternoon", label: "Tarde" },
                  ].map((option) => (
                    <Pressable
                      key={option.value}
                      onPress={() =>
                        setFormData({
                          preferredContactTime: option.value as
                            | "morning"
                            | "afternoon",
                        })
                      }
                      className={`flex-1 p-4 rounded-xl border ${
                        formData.preferredContactTime === option.value
                          ? "bg-blue-600 border-blue-500"
                          : "bg-slate-800 border-slate-700"
                      }`}
                    >
                      <Text className="text-white text-base text-center font-semibold">
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                {errors.preferredContactTime && (
                  <Text className="text-red-400 text-sm mt-1">
                    {errors.preferredContactTime}
                  </Text>
                )}
              </View>

              {/* Marketing Checkbox */}
              <Pressable
                onPress={() =>
                  setFormData({ acceptsMarketing: !formData.acceptsMarketing })
                }
                className="flex-row items-start mb-8"
              >
                <View
                  className={`w-6 h-6 rounded border-2 items-center justify-center mr-3 mt-1 ${
                    formData.acceptsMarketing
                      ? "bg-blue-600 border-blue-600"
                      : "border-slate-600"
                  }`}
                >
                  {formData.acceptsMarketing && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
                <Text className="text-slate-300 text-base flex-1 leading-relaxed">
                  Quero receber novidades e materiais úteis por WhatsApp.
                </Text>
              </Pressable>

              {/* LGPD Notice */}
              <View className="bg-slate-800 p-4 rounded-xl mb-6 border border-slate-700">
                <View className="flex-row items-start">
                  <Ionicons
                    name="shield-checkmark"
                    size={20}
                    color="#3b82f6"
                    style={{ marginRight: 8, marginTop: 2 }}
                  />
                  <Text className="text-slate-400 text-sm flex-1 leading-relaxed">
                    Seus dados estão protegidos. Não compartilhamos com
                    terceiros.
                  </Text>
                </View>
              </View>

              {/* Submit Button */}
              <Pressable
                onPress={handleSubmit}
                className="bg-blue-600 py-5 px-8 rounded-xl active:bg-blue-700"
              >
                <Text className="text-white text-lg font-bold text-center">
                  Quero aplicar o sistema na minha oficina
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
