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

**Status:** ✅ Sistema profissional de envio por email implementado!

### Como Funciona

O sistema usa **EmailJS** para enviar emails automaticamente quando um lead preenche o formulário. Funciona perfeitamente em:
- ✅ **Desktop/Web**: Envia direto sem precisar abrir cliente de email
- ✅ **Mobile (iOS/Android)**: Envia em background, sem interação do usuário
- ✅ **Confiável**: Confirmação real de envio + feedback visual

### Configuração Necessária

**⚠️ IMPORTANTE**: Para o sistema funcionar, você precisa configurar as credenciais do EmailJS.

📄 **Guia completo de configuração**: Veja `EMAILJS_SETUP.md` para instruções detalhadas passo a passo.

**Resumo rápido:**
1. Criar conta no EmailJS (grátis até 200 emails/mês)
2. Conectar seu Gmail
3. Criar template de email
4. Adicionar 3 variáveis de ambiente na aba ENV do Vibecode:
   - `EXPO_PUBLIC_EMAILJS_SERVICE_ID`
   - `EXPO_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `EXPO_PUBLIC_EMAILJS_PUBLIC_KEY`

### Recursos

- **Email formatado em HTML** com design profissional
- **Feedback visual** para o usuário (botão "Enviando...")
- **Mensagens de erro claras** se algo falhar
- **Tracking do Meta Pixel** integrado
- **Dados salvos localmente** como backup

**Email de destino:** `commandclick.contato@gmail.com`

📄 **Guia completo:** `EMAILJS_SETUP.md`
📄 **Código da API:** `src/api/emailService.ts`

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
