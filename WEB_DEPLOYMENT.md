# 🌐 Deploy Web - Command Click Landing Page

Este guia explica como rodar e fazer deploy da landing page do Command Click na web para captar leads.

## 🚀 Como Rodar Localmente

Para testar a landing page no navegador localmente:

```bash
bun run web
```

Isso vai abrir automaticamente o navegador em `http://localhost:8081` (ou outra porta disponível).

## 📱 Funcionalidades Web

### ✅ O que funciona na Web:

- ✅ **Todas as telas** (Home, Formulário, Obrigado)
- ✅ **Navegação** entre páginas
- ✅ **Formulário completo** com validação
- ✅ **Captura de leads por email** (usando mailto:)
- ✅ **WhatsApp** link direto
- ✅ **Todos os estilos** e animações
- ✅ **Responsivo** para desktop e mobile

### 📧 Como funciona o envio de leads na Web:

Quando o usuário preenche o formulário na versão web, o sistema usa um link `mailto:` que abre o cliente de email padrão do usuário (Gmail, Outlook, etc.) com:
- **Destinatário:** commandclick.contato@gmail.com
- **Assunto:** Novo Lead com informações da oficina
- **Corpo:** Todos os dados formatados do formulário

**Nota:** O usuário precisa ter um cliente de email configurado no navegador/sistema.

## 🌍 Opções de Deploy

### Opção 1: Expo Hosting (Mais Fácil - RECOMENDADO)

O Expo oferece hosting gratuito e é a forma mais simples:

```bash
# 1. Instale o Expo CLI globalmente (se ainda não tiver)
npm install -g expo-cli

# 2. Faça login na sua conta Expo (ou crie uma grátis)
expo login

# 3. Faça o build web
npx expo export --platform web

# 4. Publique o projeto
expo publish --platform web
```

Após o deploy, você receberá uma URL pública tipo: `https://expo.dev/@seuusuario/commandclick`

**Vantagens:**
- Gratuito
- Deploy em segundos
- HTTPS automático
- Fácil de atualizar

### Opção 2: Vercel (Profissional)

Vercel é excelente para landing pages profissionais:

```bash
# 1. Instale o Vercel CLI
npm install -g vercel

# 2. Faça o build
npx expo export --platform web

# 3. Deploy
vercel --prod
```

A Vercel vai gerar automaticamente uma URL tipo: `https://commandclick.vercel.app`

**Vantagens:**
- Gratuito para projetos pessoais
- Performance excelente
- Domínio customizado fácil de configurar
- CI/CD integrado com GitHub

### Opção 3: Netlify

Outra opção popular:

```bash
# 1. Instale o Netlify CLI
npm install -g netlify-cli

# 2. Faça o build
npx expo export --platform web

# 3. Deploy
netlify deploy --prod --dir dist
```

**Vantagens:**
- Gratuito
- Fácil de usar
- Bom suporte para SPAs
- Domínio customizado

### Opção 4: GitHub Pages (Gratuito)

Se você já usa GitHub:

```bash
# 1. Instale gh-pages
npm install -g gh-pages

# 2. Build
npx expo export --platform web

# 3. Deploy
gh-pages -d dist
```

Sua landing page ficará em: `https://seuusuario.github.io/commandclick`

## 🔧 Configuração de Domínio Próprio

Depois de fazer deploy em qualquer plataforma acima, você pode configurar um domínio próprio tipo `www.commandclick.com.br`:

### Na Vercel/Netlify:
1. Entre no dashboard
2. Vá em "Domains"
3. Adicione seu domínio
4. Configure os DNS no seu provedor de domínio (Registro.br, GoDaddy, etc.)

### DNS Records necessários:
```
Tipo: CNAME
Nome: www
Valor: [url-da-plataforma]
```

## 📊 Melhorando a Captura de Leads

### Recomendação: Usar um Backend Simples

Para melhorar a captura de leads na web (sem depender do mailto:), considere usar:

**Opção A: Google Forms Backend**
- Crie um Google Form
- Use a API dele para enviar dados
- Receba leads numa planilha Google Sheets

**Opção B: Formspree (Mais Fácil)**
- Serviço gratuito: https://formspree.io
- Você cria uma conta, eles te dão um endpoint
- Substitua o mailto: por um POST request para o endpoint
- Receba leads por email automaticamente

**Opção C: EmailJS**
- Serviço gratuito: https://www.emailjs.com
- Envia emails diretamente do JavaScript
- Sem backend necessário

## 🎯 Próximos Passos Após Deploy

1. **Teste tudo:** Acesse a URL, preencha o formulário, teste o WhatsApp
2. **Configure Analytics:** Adicione Google Analytics para ver quantas visitas você tem
3. **Configure domínio próprio** para parecer mais profissional
4. **Compartilhe a URL** nas redes sociais, WhatsApp Business, email marketing

## ❓ Troubleshooting

### "Email não abre quando clico em Enviar"
- Na web, o mailto: depende do usuário ter email configurado
- Considere usar EmailJS ou Formspree (opções acima)

### "Página não carrega estilos"
- Limpe o cache: `rm -rf .expo` e rode `bun run web` novamente

### "Erro ao fazer build"
- Certifique-se que todas as dependências estão instaladas: `bun install`

## 📞 Suporte

Se tiver problemas, entre em contato com o suporte técnico da Vibecode.
