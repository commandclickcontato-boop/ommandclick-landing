import React, { useEffect } from "react";
import { View, Text, Pressable, ScrollView, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import MechanicBackground from "../components/MechanicBackground";
import CommandClickLogo from "../components/CommandClickLogo";
import MockupImage from "../components/MockupImage";
import ResponsiveContainer from "../components/ResponsiveContainer";
import { trackPageView, trackButtonClick, trackContact } from "../utils/metaPixel";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  // Track page view when component mounts
  useEffect(() => {
    trackPageView("Home - Landing Page");
  }, []);

  const scrollToForm = () => {
    trackButtonClick("Solicitar Demonstração", "Hero Section");
    navigation.navigate("Form");
  };

  const handleWhatsAppSupport = () => {
    trackContact("whatsapp");
    trackButtonClick("WhatsApp Support", "Footer");
    Linking.openURL("https://wa.me/5513982111925");
  };

  return (
    <MechanicBackground>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      >
        <ResponsiveContainer>
        {/* Hero Section */}
        <View
          className="px-6"
          style={{ paddingTop: insets.top + 60, paddingBottom: 60 }}
        >
          {/* Logo Area */}
          <View className="items-center mb-8">
            <CommandClickLogo size="large" />
          </View>

          {/* Hero Title */}
          <Text className="text-white text-4xl font-bold text-center mb-4 leading-tight">
            Acabe com a papelada da sua oficina — vá de Checklist Digital
          </Text>

          {/* Subtitle */}
          <Text className="text-slate-300 text-lg text-center mb-8 leading-relaxed">
            Organize o trabalho, padronize o atendimento e acelere orçamentos
            com o sistema Command Click.
          </Text>

          {/* CTA Button */}
          <Pressable
            onPress={scrollToForm}
            className="bg-blue-600 py-5 px-8 rounded-xl mb-6 active:bg-blue-700"
          >
            <Text className="text-white text-lg font-bold text-center">
              Quero conhecer o sistema
            </Text>
          </Pressable>

          {/* Trust Seals */}
          <View className="flex-row items-center justify-center flex-wrap gap-3">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={16} color="#10b981" />
              <Text className="text-slate-400 text-sm ml-1">
                Demonstração gratuita
              </Text>
            </View>
            <Text className="text-slate-600">•</Text>
            <View className="flex-row items-center">
              <Ionicons name="flash" size={16} color="#10b981" />
              <Text className="text-slate-400 text-sm ml-1">
                Implementação rápida
              </Text>
            </View>
            <Text className="text-slate-600">•</Text>
            <View className="flex-row items-center">
              <Ionicons name="headset" size={16} color="#10b981" />
              <Text className="text-slate-400 text-sm ml-1">
                Suporte incluso
              </Text>
            </View>
          </View>

          {/* Mockup Image */}
          <MockupImage />
        </View>

        {/* Main Benefits Section */}
        <View className="px-6 py-12 bg-slate-800">
          <Text className="text-white text-3xl font-bold text-center mb-12">
            Transforme sua oficina em 3 passos
          </Text>

          {/* Benefit 1 */}
          <View className="bg-slate-900 rounded-2xl p-6 mb-6 border border-slate-700">
            <View className="bg-blue-600 w-14 h-14 rounded-xl items-center justify-center mb-4">
              <Ionicons name="create" size={28} color="white" />
            </View>
            <Text className="text-white text-xl font-bold mb-3">
              Crie checklists direto no celular, tablet ou computador
            </Text>
            <Text className="text-slate-400 text-base leading-relaxed">
              Padronize serviços e elimine erros de leitura.
            </Text>
          </View>

          {/* Benefit 2 */}
          <View className="bg-slate-900 rounded-2xl p-6 mb-6 border border-slate-700">
            <View className="bg-green-600 w-14 h-14 rounded-xl items-center justify-center mb-4">
              <Ionicons name="time" size={28} color="white" />
            </View>
            <Text className="text-white text-xl font-bold mb-3">
              Consultor recebe tudo na hora
            </Text>
            <Text className="text-slate-400 text-base leading-relaxed">
              Agilidade para montar orçamentos e solicitar peças.
            </Text>
          </View>

          {/* Benefit 3 */}
          <View className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
            <View className="bg-purple-600 w-14 h-14 rounded-xl items-center justify-center mb-4">
              <Ionicons name="folder-open" size={28} color="white" />
            </View>
            <Text className="text-white text-xl font-bold mb-3">
              Histórico completo e equipe identificada
            </Text>
            <Text className="text-slate-400 text-base leading-relaxed">
              Saiba quem fez, quando e o que foi trocado.
            </Text>
          </View>
        </View>

        {/* Additional Advantages */}
        <View className="px-6 py-12">
          <Text className="text-white text-3xl font-bold text-center mb-10">
            Mais vantagens
          </Text>

          <View className="space-y-4">
            {[
              "Fim da bagunça de papéis e escrita ilegível",
              "Comunicação em tempo real entre mecânicos e consultores",
              "Campos personalizados por tipo de serviço",
              "Busca rápida por cliente, placa ou modelo",
              "Aumento real na produtividade e organização da equipe",
            ].map((advantage, index) => (
              <View key={index} className="flex-row items-start mb-4">
                <View className="bg-blue-600 w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                  <Ionicons name="checkmark" size={16} color="white" />
                </View>
                <Text className="text-slate-300 text-base flex-1 leading-relaxed">
                  {advantage}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Social Proof */}
        <View className="px-6 py-12 bg-slate-800">
          <View className="bg-slate-900 rounded-2xl p-6 border-l-4 border-blue-600">
            <View className="flex-row mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name="star" size={20} color="#fbbf24" />
              ))}
            </View>
            <Text className="text-slate-300 text-lg leading-relaxed mb-4 italic">
              &ldquo;Depois que implantamos o Command Click, o orçamento sai muito
              mais rápido e nada se perde.&rdquo;
            </Text>
            <Text className="text-white font-bold">
              Ricardo, AutoCenter RS
            </Text>
          </View>
        </View>

        {/* Pricing Section */}
        <View className="px-6 py-12">
          <Text className="text-white text-3xl font-bold text-center mb-10">
            Invista na organização da sua oficina
          </Text>

          <View className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 mb-6">
            <View className="mb-6">
              <Text className="text-blue-200 text-sm font-semibold mb-2">
                IMPLEMENTAÇÃO ÚNICA
              </Text>
              <View className="flex-row items-end">
                <Text className="text-white text-5xl font-bold">R$ 750</Text>
              </View>
              <Text className="text-blue-200 mt-2">para começar</Text>
            </View>

            <View className="h-px bg-blue-400 my-6" />

            <View>
              <Text className="text-blue-200 text-sm font-semibold mb-2">
                MENSALIDADE
              </Text>
              <View className="flex-row items-end">
                <Text className="text-white text-5xl font-bold">R$ 350</Text>
                <Text className="text-blue-200 text-xl ml-2 mb-2">/mês</Text>
              </View>
            </View>

            <View className="mt-8 space-y-3">
              {[
                "Treinamento completo incluso",
                "Suporte técnico dedicado",
                "Sem fidelidade ou multa",
                "Atualizações gratuitas",
              ].map((item, index) => (
                <View key={index} className="flex-row items-center">
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color="#93c5fd"
                  />
                  <Text className="text-white ml-2">{item}</Text>
                </View>
              ))}
            </View>
          </View>

          <Pressable
            onPress={scrollToForm}
            className="bg-white py-5 px-8 rounded-xl active:bg-slate-100"
          >
            <Text className="text-slate-900 text-lg font-bold text-center">
              Solicitar demonstração gratuita
            </Text>
          </Pressable>
        </View>

        {/* FAQ Section */}
        <View className="px-6 py-12 bg-slate-800">
          <Text className="text-white text-3xl font-bold text-center mb-10">
            Perguntas frequentes
          </Text>

          {[
            {
              question: "É preciso mudar todo o processo da oficina?",
              answer:
                "Não. A implementação é feita sem interromper o seu fluxo atual.",
            },
            {
              question: "Funciona sem internet?",
              answer:
                "Sim, com sincronização automática assim que a rede volta.",
            },
            {
              question: "Quanto tempo para começar a usar?",
              answer:
                "Em média, 1 a 3 dias — com treinamento incluso.",
            },
            {
              question: "Há custos extras?",
              answer:
                "Só a implementação inicial (R$750) e o plano mensal (R$350).",
            },
          ].map((faq, index) => (
            <View
              key={index}
              className="bg-slate-900 rounded-xl p-6 mb-4 border border-slate-700"
            >
              <View className="flex-row items-start mb-3">
                <Ionicons
                  name="help-circle"
                  size={24}
                  color="#3b82f6"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-white text-lg font-bold flex-1">
                  {faq.question}
                </Text>
              </View>
              <Text className="text-slate-400 text-base leading-relaxed ml-8">
                {faq.answer}
              </Text>
            </View>
          ))}
        </View>

        {/* Final CTA */}
        <View className="px-6 py-12">
          <Text className="text-white text-2xl font-bold text-center mb-6">
            Pronto para modernizar sua oficina?
          </Text>
          <Pressable
            onPress={scrollToForm}
            className="bg-blue-600 py-5 px-8 rounded-xl active:bg-blue-700"
          >
            <Text className="text-white text-lg font-bold text-center">
              Preencher formulário agora
            </Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View className="px-6 py-12 bg-slate-950 border-t border-slate-800">
          <View className="items-center mb-6">
            <CommandClickLogo size="medium" />
            <Text className="text-slate-500 text-sm mt-4">
              Checklist Digital para Oficinas Mecânicas
            </Text>
          </View>

          <Pressable
            onPress={handleWhatsAppSupport}
            className="bg-green-600 py-4 px-6 rounded-xl flex-row items-center justify-center mb-6 active:bg-green-700"
          >
            <Ionicons name="logo-whatsapp" size={24} color="white" />
            <Text className="text-white font-bold ml-2">
              Falar com Suporte
            </Text>
          </Pressable>

          <Text className="text-slate-600 text-center text-sm">
            © 2025 Command Click. Todos os direitos reservados.
          </Text>
        </View>
        </ResponsiveContainer>
      </ScrollView>
    </MechanicBackground>
  );
}
