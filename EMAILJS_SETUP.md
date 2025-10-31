# 📧 Configuração do EmailJS - Envio Profissional de Leads

## O que é EmailJS?

EmailJS é um serviço que permite enviar emails diretamente do seu app (web ou mobile) sem precisar de backend. É perfeito para envio de formulários de contato e captura de leads.

## Por que usar EmailJS?

✅ **Funciona em todas as plataformas**: Web, iOS e Android
✅ **Sem backend necessário**: Tudo funciona no client-side
✅ **Gratuito até 200 emails/mês**: Suficiente para começar
✅ **Confiável**: Emails são enviados automaticamente, sem depender do cliente de email do usuário
✅ **Profissional**: Emails chegam na caixa de entrada, não no spam

---

## 🚀 Passo a Passo - Configuração Completa

### 1️⃣ Criar Conta no EmailJS

1. Acesse: **https://www.emailjs.com/**
2. Clique em **"Sign Up"** (Cadastrar)
3. Use seu email do Gmail: `commandclick.contato@gmail.com`
4. Confirme seu email

---

### 2️⃣ Adicionar Serviço de Email (Gmail)

1. No dashboard do EmailJS, clique em **"Email Services"**
2. Clique em **"Add New Service"**
3. Selecione **"Gmail"**
4. Clique em **"Connect Account"** e faça login com `commandclick.contato@gmail.com`
5. Autorize o EmailJS a enviar emails pela sua conta
6. **Copie o Service ID** (exemplo: `service_abc123`)

---

### 3️⃣ Criar Template de Email

1. Clique em **"Email Templates"** no menu
2. Clique em **"Create New Template"**
3. Configure o template:

**Template Name**: `Command Click - Novo Lead`

**Subject**:
```
{{subject}}
```

**Content (corpo do email)**:
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border: 2px solid #e2e8f0;
      border-top: none;
      border-radius: 0 0 10px 10px;
    }
    .info-section {
      background: white;
      padding: 20px;
      margin: 15px 0;
      border-radius: 8px;
      border-left: 4px solid #2563eb;
    }
    .info-label {
      color: #64748b;
      font-size: 12px;
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .info-value {
      color: #1e293b;
      font-size: 16px;
      font-weight: 600;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      color: #64748b;
      font-size: 14px;
    }
    .cta-button {
      display: inline-block;
      background: #22c55e;
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 Novo Lead Capturado!</h1>
    <p>Command Click - Landing Page</p>
  </div>

  <div class="content">
    <div class="info-section">
      <h2 style="color: #2563eb; margin-top: 0;">👤 Informações do Contato</h2>
      <div style="margin: 10px 0;">
        <div class="info-label">Nome Completo</div>
        <div class="info-value">{{full_name}}</div>
      </div>
      <div style="margin: 10px 0;">
        <div class="info-label">Oficina</div>
        <div class="info-value">{{workshop_name}}</div>
      </div>
      <div style="margin: 10px 0;">
        <div class="info-label">Localização</div>
        <div class="info-value">{{city}}/{{state}}</div>
      </div>
    </div>

    <div class="info-section">
      <h2 style="color: #2563eb; margin-top: 0;">🏢 Detalhes da Oficina</h2>
      <div style="margin: 10px 0;">
        <div class="info-label">Número de Mecânicos</div>
        <div class="info-value">{{number_of_mechanics}}</div>
      </div>
      <div style="margin: 10px 0;">
        <div class="info-label">WhatsApp</div>
        <div class="info-value">{{whatsapp}}</div>
      </div>
      <div style="margin: 10px 0;">
        <div class="info-label">Melhor Horário para Contato</div>
        <div class="info-value">{{contact_time}}</div>
      </div>
    </div>

    <div class="info-section">
      <h2 style="color: #2563eb; margin-top: 0;">📊 Informações Adicionais</h2>
      <div style="margin: 10px 0;">
        <div class="info-label">Aceita Receber Novidades</div>
        <div class="info-value">{{accepts_marketing}}</div>
      </div>
      <div style="margin: 10px 0;">
        <div class="info-label">Data/Hora do Envio</div>
        <div class="info-value">{{submission_date}}</div>
      </div>
    </div>

    <div style="text-align: center;">
      <a href="https://wa.me/55{{whatsapp}}?text=Olá%20{{full_name}}!%20Sou%20da%20Command%20Click" class="cta-button">
        💬 Entrar em Contato via WhatsApp
      </a>
    </div>
  </div>

  <div class="footer">
    <p><strong>Command Click</strong> - Checklist Digital para Oficinas Mecânicas</p>
    <p>Este lead foi capturado através da Landing Page</p>
  </div>
</body>
</html>
```

4. Clique em **"Save"**
5. **Copie o Template ID** (exemplo: `template_xyz789`)

---

### 4️⃣ Obter Public Key

1. No menu, clique em **"Account"** (conta)
2. Na seção **"API Keys"**, você verá sua **Public Key**
3. **Copie a Public Key** (exemplo: `AbCdEfGhIjKlMnOp`)

---

### 5️⃣ Adicionar Variáveis de Ambiente no App

**IMPORTANTE**: Você precisa adicionar as 3 credenciais no app usando a **aba ENV** do Vibecode:

1. Abra o **app Vibecode**
2. Vá na aba **"ENV"** (variáveis de ambiente)
3. Adicione as seguintes variáveis:

```
EXPO_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
EXPO_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
EXPO_PUBLIC_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
```

**⚠️ ATENÇÃO**: Substitua os valores de exemplo pelos valores reais que você copiou nos passos anteriores!

---

## ✅ Pronto! Testando o Sistema

Depois de configurar:

1. Preencha o formulário no app
2. Clique em "Quero aplicar o sistema na minha oficina"
3. Você deve ver "Enviando..." no botão
4. O email chegará em **commandclick.contato@gmail.com** em alguns segundos

---

## 🔧 Solução de Problemas

### Erro: "Configuração de email não encontrada"
**Causa**: Variáveis de ambiente não foram adicionadas
**Solução**: Adicione as 3 variáveis na aba ENV do Vibecode

### Erro: "Erro ao enviar email"
**Causa**: Service ID, Template ID ou Public Key incorretos
**Solução**: Verifique se copiou os valores corretos do EmailJS

### Emails não chegam
**Causa**: Gmail pode estar bloqueando
**Solução**:
1. Verifique a pasta de Spam
2. Adicione `noreply@emailjs.com` aos contatos confiáveis

### Limite de 200 emails atingido
**Causa**: Plano gratuito do EmailJS
**Solução**: Faça upgrade para o plano pago (a partir de $10/mês para 1000 emails)

---

## 📊 Planos do EmailJS

- **Free**: 200 emails/mês (ótimo para começar)
- **Email Lite**: $10/mês - 1.000 emails
- **Email Pro**: $20/mês - 5.000 emails
- **Email Enterprise**: $50/mês - 20.000 emails

---

## 🎯 Vantagens da Nova Implementação

✅ **Desktop funciona perfeitamente**: Não depende mais do cliente de email local
✅ **Mobile funciona perfeitamente**: Envia direto, sem abrir app de email
✅ **Feedback visual**: Usuário vê "Enviando..." e mensagens de erro claras
✅ **Profissional**: Emails formatados com HTML, logo e design bonito
✅ **Confiável**: Confirmação de envio real
✅ **Rastreável**: Você pode ver no dashboard do EmailJS quantos emails foram enviados

---

## 📞 Suporte

Se tiver dúvidas sobre a configuração:
- Documentação oficial: https://www.emailjs.com/docs/
- WhatsApp: +55 13 98211-1925
