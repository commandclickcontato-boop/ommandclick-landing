# Command Click - Landing Page

Landing page de alta conversão para o Command Click, um Checklist Digital para Oficinas Mecânicas.

## ✅ Atualizações Recentes

- **Logo oficial**: ✅ Logo completa do Command Click implementada!
- **WhatsApp**: ✅ Atualizado para +55 13 98211-1925
- **Background**: ✅ Padrão sutil de oficina mecânica com transparência implementado
- **Design**: Fundo azul escuro profissional com overlays suaves

## Objetivo

Gerar leads qualificados de donos de oficinas com 3+ mecânicos interessados em implementar o sistema Command Click.

## Funcionalidades Principais

### 1. Hero Section
- Título principal com proposta de valor clara
- Subtítulo explicativo
- CTA primário para conhecer o sistema
- Selos de confiança (sem compromisso, implementação rápida, suporte incluso)
- Mockup visual do app

### 2. Benefícios Principais (3 blocos)
- ✅ Criação de checklists em qualquer dispositivo
- ✅ Comunicação instantânea com consultores
- ✅ Histórico completo e rastreabilidade da equipe

### 3. Vantagens Adicionais
Lista completa de benefícios do sistema:
- Eliminação de papelada
- Comunicação em tempo real
- Campos personalizáveis
- Busca rápida por cliente/placa
- Aumento de produtividade

### 4. Prova Social
Testemunho autêntico de cliente (Ricardo, AutoCenter RS)

### 5. Seção Comercial
- Implementação: R$ 750 (pagamento único)
- Mensalidade: R$ 350/mês
- Treinamento incluso
- Sem fidelidade

### 6. Formulário de Captura de Leads
Campos obrigatórios com validação:
- Nome completo
- Nome da oficina
- Cidade / Estado
- Quantidade de mecânicos (3-4, 5-8, 9+)
- WhatsApp (com validação de formato)
- Melhor horário (manhã/tarde)
- Checkbox de marketing opt-in
- Aviso LGPD

### 7. FAQ
4 perguntas frequentes respondidas:
- Mudança de processos
- Funcionamento offline
- Tempo de implementação
- Custos extras

### 8. Página de Agradecimento
- Confirmação visual de envio
- CTA para contato imediato via WhatsApp
- Informações sobre tempo de resposta
- Reforço de "sem compromisso"

## Estrutura de Arquivos

```
src/
├── components/
│   ├── CommandClickLogo.tsx   # Logo oficial (com fallback)
│   └── MechanicBackground.tsx # Background com padrão de oficina
├── screens/
│   ├── HomeScreen.tsx          # Landing page principal
│   ├── FormScreen.tsx          # Formulário de captura
│   └── ThankYouScreen.tsx      # Página de confirmação
├── navigation/
│   ├── RootNavigator.tsx       # Navegação principal
│   └── types.ts                # Tipos de navegação
├── state/
│   └── formStore.ts            # Gerenciamento de estado com Zustand
└── types/
    └── form.ts                 # Tipos do formulário

assets/
└── images/
    └── command-click-logo.png  # Logo oficial (adicionar aqui)
```

## Design

### Paleta de Cores
- Fundo principal: `bg-slate-900` (azul escuro)
- Fundo secundário: `bg-slate-800`
- Accent primário: `bg-blue-600`
- Accent secundário: `bg-green-600` (WhatsApp)
- Texto principal: `text-white`
- Texto secundário: `text-slate-300`

### Componentes Visuais
- Ícones: `@expo/vector-icons` (Ionicons)
- Bordas arredondadas: `rounded-xl`, `rounded-2xl`
- Espaçamento consistente: padding de 6 unidades
- Cards com bordas: `border border-slate-700`

## Gerenciamento de Estado

Utilizando Zustand com persistência via AsyncStorage:
- Armazenamento dos dados do formulário
- Flag de submissão
- Funções de reset

## Validação de Formulário

Validações implementadas:
- Campos obrigatórios não vazios
- WhatsApp com formato brasileiro válido
- Estado com máximo 2 caracteres
- Seleção de opções de radio/checkbox

## SEO (Conceitual)

**Title**: Checklist Digital para Oficinas Mecânicas | Command Click

**Meta Description**: Elimine a papelada e acelere os orçamentos da sua oficina com o Command Click.

**Keywords**: checklist digital, oficina mecânica, gestão automotiva, sistema para mecânicos, orçamentos rápidos

## Fluxo do Usuário

1. **Landing Page** → Usuário vê proposta de valor, benefícios e prova social
2. **CTA Button** → Clica em "Quero conhecer o sistema" ou "Solicitar demonstração"
3. **Formulário** → Preenche dados com validação em tempo real
4. **Validação** → Sistema valida todos os campos obrigatórios
5. **Submissão** → Dados salvos no estado persistente
6. **Thank You** → Confirmação + opção de contato imediato via WhatsApp

## ✅ Logo do Command Click

**Status:** Logo oficial implementada e funcionando!

A logo completa (com o ícone do cursor em mira + texto "COMMAND CLICK") está sendo exibida em:
- Hero section (topo da página)
- Footer da landing page

Arquivo: `assets/images/command-click-logo-full.png`

## 📧 Captura de Leads

**Status:** ✅ Sistema profissional de envio por email implementado com Resend!

### Como Funciona

O sistema usa **Resend API** para enviar emails automaticamente quando um lead preenche o formulário. Funciona perfeitamente em:
- ✅ **Desktop/Web**: Envia direto sem precisar abrir cliente de email
- ✅ **Mobile (iOS/Android)**: Envia em background, sem interação do usuário
- ✅ **Confiável**: API moderna e robusta com confirmação real de envio
- ✅ **Email HTML profissional**: Design bonito com gradientes e seções organizadas

### Configuração Necessária

**⚠️ IMPORTANTE**: Para o sistema funcionar, você precisa configurar o Resend.

**Passo a passo:**

1. **Criar conta no Resend** (gratuito)
   - Acesse: https://resend.com/
   - Faça sign up com seu email

2. **Gerar API Key**
   - No dashboard do Resend, vá em "API Keys"
   - Clique em "Create API Key"
   - Copie a key (começa com `re_...`)

3. **Adicionar variáveis de ambiente**
   - Na aba **ENV** do Vibecode, adicione:

   ```
   EXPO_PUBLIC_RESEND_API_KEY=re_sua_api_key_aqui
   EXPO_PUBLIC_RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

   **Nota:** O email `onboarding@resend.dev` é fornecido automaticamente pelo Resend para testes. Para usar seu próprio domínio, você precisa verificá-lo no dashboard do Resend.

4. **Testar o envio**
   - Preencha o formulário na landing page
   - Verifique os logs na aba LOGS do Vibecode
   - O email será enviado para `commandclick.contato@gmail.com`

### Recursos

- **Email formatado em HTML** com design profissional e gradientes
- **Feedback visual** para o usuário (botão "Enviando...")
- **Mensagens de erro claras** se algo falhar
- **Logs detalhados** para debug
- **Dados salvos localmente** como backup
- **Email responsivo** que funciona em todos os clientes de email

### Vantagens do Resend

- ✅ Mais simples que EmailJS (apenas 1 API key)
- ✅ Mais confiável e rápido
- ✅ Melhor deliverability (taxa de entrega)
- ✅ API moderna e bem documentada
- ✅ 100 emails/dia no plano gratuito

**Email de destino:** `commandclick.contato@gmail.com`

📄 **Código da API:** `src/utils/sendLeadEmail.ts`

## Próximos Passos

Para produção, considere:
- Integração com backend/CRM (ex: HubSpot, RD Station)
- Analytics (ex: Google Analytics, Mixpanel)
- A/B testing de headlines e CTAs
- Integração real com API do WhatsApp Business
- Otimização de conversão baseada em métricas
- Implementação de pixels de conversão (Meta, Google Ads)

## Contato

WhatsApp de suporte: **+55 13 98211-1925**
Email para leads: **commandclick.contato@gmail.com**
