# 📊 Meta Pixel - Tracking de Marketing

Este documento explica como o Meta Pixel (Facebook Pixel) está integrado na landing page do Command Click para rastrear conversões e otimizar campanhas de marketing.

## 🎯 Configuração

### Pixel ID
- **ID:** 9943378875750722
- **Token API:** EAAHICZA4RqGwBP74ZAY75JZCITUkMLBT0RJamDzikEz7hdNUnLZAlyN8y5p6yYD7zsL1dYVhAqhZBB86AHXZAhtCmKhSYayQpXbmGkXwRipKxZBZBlLYb820GJaXlx1LysAGveboEJeaZAVIXRAmyG0bwy9yKGs6jOgOS2iWnaZBvTWuqExqC7BMnBTkCDCHOqxrC6kgZDZD

### Onde está integrado

1. **web/index.html** - Código base do pixel (carrega automaticamente no site)
2. **src/utils/metaPixel.ts** - Funções utilitárias para tracking de eventos

## 📈 Eventos Rastreados

### Eventos Padrão (Standard Events)

Estes são eventos reconhecidos automaticamente pelo Facebook para otimização de campanhas:

| Evento | Quando dispara | Localização |
|--------|---------------|-------------|
| **PageView** | Visualização de página | Todas as páginas (automático) |
| **Lead** | Formulário enviado com sucesso | FormScreen (ao submeter) |
| **Contact** | Clique em WhatsApp | HomeScreen, ThankYouScreen |
| **ViewContent** | Visualização de conteúdo | Páginas principais |

### Eventos Personalizados (Custom Events)

Eventos customizados para análise detalhada:

| Evento | Quando dispara | Dados enviados |
|--------|---------------|----------------|
| **FormStart** | Usuário começa a preencher formulário | Nome do formulário |
| **ButtonClick** | Clique em botões importantes | Nome do botão, localização |
| **ScrollDepth** | Scroll da página (25%, 50%, 75%, 100%) | Porcentagem de scroll |

## 🔄 Tracking Dual (Pixel + API)

Para maior precisão, usamos **tracking duplo**:

1. **Browser Pixel** - Rastreamento via JavaScript no navegador
2. **Conversions API** - Rastreamento direto via API do servidor

### Vantagem do Tracking Dual:
- ✅ Mais confiável (não depende só do browser)
- ✅ Resiste a bloqueadores de ads
- ✅ Melhor atribuição de conversões
- ✅ Mais dados para o algoritmo do Facebook

## 📋 Eventos por Página

### HomeScreen (Landing Page)
```typescript
useEffect(() => {
  trackPageView("Home - Landing Page");
}, []);

// Ao clicar em "Solicitar Demonstração"
trackButtonClick("Solicitar Demonstração", "Hero Section");

// Ao clicar em WhatsApp
trackContact("whatsapp");
trackButtonClick("WhatsApp Support", "Footer");
```

### FormScreen (Formulário de Leads)
```typescript
useEffect(() => {
  trackPageView("Form - Lead Capture");
}, []);

// Quando usuário começa a preencher
trackFormStart();

// Ao submeter formulário (DUAL TRACKING)
await trackLeadDual({
  fullName: formData.fullName,
  workshopName: formData.workshopName,
  city: formData.city,
  state: formData.state,
  whatsapp: formData.whatsapp,
});
```

### ThankYouScreen (Obrigado)
```typescript
useEffect(() => {
  trackPageView("Thank You - Conversion Complete");
}, []);

// Ao clicar em WhatsApp
trackContact("whatsapp");
trackButtonClick("Falar agora no WhatsApp", "Thank You Page");
```

## 💡 Como Usar no Facebook Ads Manager

### 1. Verificar se o Pixel está funcionando

1. Acesse: https://business.facebook.com/events_manager
2. Selecione o Pixel ID: **9943378875750722**
3. Clique em "Test Events" (Eventos de Teste)
4. Abra seu site em outra aba
5. Você deve ver os eventos aparecendo em tempo real!

### 2. Criar Públicos Personalizados

No Events Manager:
1. Vá em "Audiences" (Públicos)
2. Crie público baseado em eventos:
   - **Visitantes da landing** = PageView
   - **Pessoas que iniciaram formulário** = FormStart (Custom Event)
   - **Leads qualificados** = Lead (Standard Event)
   - **Pessoas que contataram** = Contact

### 3. Criar Campanhas de Conversão

Ao criar uma campanha no Facebook Ads:

1. **Objetivo:** Conversões (Conversions)
2. **Evento de conversão:** Escolha "Lead"
3. **Pixel:** 9943378875750722
4. **Otimização:** Lead (o Facebook vai mostrar o anúncio para pessoas mais propensas a enviar o formulário)

### 4. Criar Públicos Similares (Lookalike)

1. Após conseguir **50+ leads**, crie um público similar
2. No Events Manager → Audiences → Create Lookalike
3. Fonte: Público de "Lead"
4. País: Brasil
5. Tamanho: 1% (mais similar) a 10% (mais abrangente)

## 📊 Métricas Importantes

Acompanhe essas métricas no Facebook Ads Manager:

### Funil de Conversão
```
PageView (Landing)
    ↓
FormStart (Início do formulário)
    ↓
Lead (Formulário enviado)
    ↓
Contact (WhatsApp clicado)
```

### Taxa de Conversão Ideal
- **FormStart → Lead:** 40-60%
- **PageView → Lead:** 5-15%
- **Lead → Contact:** 30-50%

Se suas taxas estiverem abaixo disso, considere:
- Melhorar o copy da landing page
- Simplificar o formulário
- Testar diferentes criativos de anúncio
- Ajustar o público-alvo

## 🛠️ Troubleshooting

### Pixel não está rastreando eventos

1. **Verifique no Test Events:**
   - https://business.facebook.com/events_manager
   - Vá em "Test Events"
   - Navegue no site e veja se eventos aparecem

2. **Console do navegador:**
   - Abra DevTools (F12)
   - Vá em Console
   - Você deve ver mensagens: `[Meta Pixel] Event tracked: PageView`

3. **Extensão Facebook Pixel Helper:**
   - Instale: https://chrome.google.com/webstore (procure "Facebook Pixel Helper")
   - Ícone fica azul quando pixel está funcionando

### Eventos duplicados

Se você ver eventos duplicados:
- Verifique se não há múltiplos códigos pixel no HTML
- Certifique-se de não chamar `trackEvent()` duas vezes

### Conversions API não está funcionando

Se o tracking dual não funciona:
1. Verifique se o Token API está válido
2. Vá em: https://business.facebook.com/events_manager
3. Configurações → Conversions API → Verifique token

## 🔐 Segurança

**IMPORTANTE:**
- O Token API está no código apenas para desenvolvimento
- Em produção, mova para variáveis de ambiente
- Nunca commite tokens em repositórios públicos

Para produção, use:
```typescript
const META_API_TOKEN = process.env.META_API_TOKEN;
```

## 📞 Suporte

Se tiver dúvidas sobre:
- **Pixel não rastreia:** Verifique Test Events no Facebook
- **Eventos customizados:** Veja src/utils/metaPixel.ts
- **Conversions API:** Verifique token e conexão

## 🎓 Recursos Úteis

- [Documentação oficial do Meta Pixel](https://developers.facebook.com/docs/meta-pixel)
- [Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Eventos padrão do Facebook](https://developers.facebook.com/docs/meta-pixel/reference)
- [Test Events](https://business.facebook.com/events_manager)

---

✅ **Tudo configurado!** O Meta Pixel está rastreando leads e otimizando suas campanhas automaticamente.
