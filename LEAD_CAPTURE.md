# 📧 Como Funcionam os Leads do Command Click

## ✅ Sistema de Captura Implementado

Quando um cliente preenche o formulário da landing page, os dados são processados da seguinte forma:

### 1️⃣ Envio por Email (Principal)

**Email de destino:** `commandclick.contato@gmail.com`

**O que acontece:**
- Ao clicar em "Quero aplicar o sistema na minha oficina"
- O app abre o **aplicativo de email nativo** do celular
- Email já vem **pré-formatado** com todos os dados do lead
- O email é enviado para: **commandclick.contato@gmail.com**

**Formato do Email:**
```
Assunto: 🎯 Novo Lead: [Nome da Oficina] - [Cidade]/[Estado]

INFORMAÇÕES DO LEAD:
--------------------
Nome: [Nome Completo]
Oficina: [Nome da Oficina]
Cidade: [Cidade]
Estado: [UF]

DETALHES DA OFICINA:
--------------------
Número de Mecânicos: [3-4 / 5-8 / 9+]
WhatsApp: [Número]
Melhor Horário: [Manhã / Tarde]

MARKETING:
----------
Aceita receber novidades: [Sim / Não]

Data/Hora: [timestamp]
```

### 2️⃣ Salvamento Local (Backup)

Os dados também ficam salvos localmente no dispositivo usando:
- **Zustand** (gerenciamento de estado)
- **AsyncStorage** (persistência local)

Isso serve como backup caso o email não seja enviado.

## 📱 Como Testar

1. Preencha o formulário no app
2. Clique em "Quero aplicar o sistema na minha oficina"
3. O app de email vai abrir automaticamente
4. Clique em "Enviar"
5. Você receberá o email em: **commandclick.contato@gmail.com**

## ⚙️ Configurações

- **Email de recebimento:** `commandclick.contato@gmail.com`
- **Método:** Expo MailComposer (usa app nativo de email do dispositivo)
- **Backup:** AsyncStorage local

## 🔧 Arquivo de Configuração

O código de envio está em:
`/src/utils/sendLeadEmail.ts`

Para alterar o email de destino, edite a linha:
```typescript
recipients: ["commandclick.contato@gmail.com"]
```

## 🚀 Próximos Passos (Opcional)

Para produção profissional, você pode integrar:

1. **Google Sheets** - Salvar automaticamente em planilha
2. **Backend próprio** - API REST para receber leads
3. **CRM** - HubSpot, RD Station, Pipedrive
4. **Webhook** - Zapier, Make (Integromat)
5. **Firebase** - Firestore Database

Mas o sistema atual com email já funciona perfeitamente! 📧✅
