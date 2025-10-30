# 🚀 Deploy no Vercel - Command Click

Guia completo para publicar sua landing page do Command Click no Vercel.

## 📋 Pré-requisitos

1. **Conta no Vercel** (gratuita)
   - Acesse: https://vercel.com
   - Clique em "Sign Up"
   - Faça login com GitHub, GitLab ou Email

2. **Projeto configurado** ✅
   - Todos os arquivos já estão prontos!
   - vercel.json configurado
   - Scripts de build adicionados

## 🎯 Método 1: Deploy via CLI (Mais Rápido)

### Passo 1: Instalar Vercel CLI

Se ainda não tem o Vercel CLI instalado:

```bash
npm install -g vercel
```

### Passo 2: Fazer Login

```bash
vercel login
```

Digite seu email, você receberá um link para confirmar.

### Passo 3: Deploy!

No diretório do projeto `/home/user/workspace/`, execute:

```bash
vercel
```

O Vercel vai perguntar algumas coisas:

```
? Set up and deploy "~/workspace"? [Y/n] → Digite Y
? Which scope do you want to deploy to? → Escolha sua conta
? Link to existing project? [y/N] → Digite N (primeira vez)
? What's your project's name? → Digite: commandclick (ou o nome que quiser)
? In which directory is your code located? → Pressione Enter (./)
```

**Pronto!** O Vercel vai:
1. Instalar dependências (bun install)
2. Fazer o build (bun run export:web)
3. Fazer upload
4. Te dar uma URL tipo: `https://commandclick-xyz.vercel.app`

### Passo 4: Deploy em Produção

Para fazer deploy em produção (não preview):

```bash
vercel --prod
```

## 🌐 Método 2: Deploy via Dashboard (Visual)

Se preferir usar a interface web:

### Passo 1: Criar repositório Git (se ainda não tiver)

```bash
# No diretório do projeto
git init
git add .
git commit -m "Landing page Command Click pronta"
```

### Passo 2: Push para GitHub

1. Crie um repositório no GitHub: https://github.com/new
2. Nome: `commandclick-landing`
3. Deixe público ou privado (sua escolha)
4. **NÃO** inicialize com README

```bash
git remote add origin https://github.com/SEU_USUARIO/commandclick-landing.git
git branch -M main
git push -u origin main
```

### Passo 3: Conectar no Vercel

1. Acesse: https://vercel.com/new
2. Clique em "Import Git Repository"
3. Escolha seu repositório `commandclick-landing`
4. Clique em "Import"

### Passo 4: Configurar Build

O Vercel vai detectar automaticamente as configurações do `vercel.json`, mas confirme:

- **Framework Preset:** Expo
- **Build Command:** `bun run export:web`
- **Output Directory:** `dist`
- **Install Command:** `bun install`

Clique em **"Deploy"**

## 🎨 Configurações Adicionais

### Configurar Domínio Próprio

Depois do deploy:

1. No dashboard do Vercel, clique no seu projeto
2. Vá em "Settings" → "Domains"
3. Clique em "Add"
4. Digite seu domínio: `www.commandclick.com.br`
5. Siga as instruções para configurar DNS

**Configuração DNS:**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

### Variables de Ambiente (Opcional)

Se quiser adicionar variáveis de ambiente:

1. Dashboard → Projeto → Settings → Environment Variables
2. Adicione qualquer variável necessária

## ✅ Verificar se funcionou

Após o deploy, teste:

1. ✅ **Landing page carrega**
2. ✅ **Meta Pixel funciona** (abra Test Events do Facebook)
3. ✅ **Formulário funciona**
4. ✅ **Email abre ao submeter** (mailto: funciona)
5. ✅ **WhatsApp funciona**
6. ✅ **Estilos aparecem corretamente**

## 🔄 Atualizações Futuras

### Com CLI:
```bash
# Faça mudanças no código
vercel --prod
```

### Com GitHub:
```bash
# Faça mudanças no código
git add .
git commit -m "Descrição das mudanças"
git push
```

O Vercel vai fazer deploy automático a cada push! 🚀

## 📊 Analytics

O Vercel oferece analytics gratuito:

1. Dashboard → Seu projeto → Analytics
2. Veja visitantes, pageviews, etc.

## 🐛 Troubleshooting

### Build falha com erro de memória

Se o build falhar:
1. Dashboard → Settings → General
2. Aumente o timeout ou recursos

### Estilos não aparecem

Limpe o cache:
```bash
rm -rf .expo
rm -rf dist
bun run export:web
```

### "Command not found: bun"

Se Vercel não reconhecer bun:
1. Dashboard → Settings → General
2. Node.js Version → 18.x ou 20.x
3. Em "Install Command", mude para: `npm install`
4. Em "Build Command", mude para: `npx expo export --platform web`

## 🎉 Próximos Passos

Após deploy bem-sucedido:

1. ✅ **Teste tudo** na URL de produção
2. ✅ **Configure domínio próprio** (opcional)
3. ✅ **Compartilhe a URL** nas redes sociais
4. ✅ **Configure Facebook Ads** apontando para a URL
5. ✅ **Monitore conversões** no Meta Events Manager

## 📞 Suporte

**URL da sua landing page estará em um formato tipo:**
- Preview: `https://commandclick-abc123.vercel.app`
- Produção: `https://commandclick.vercel.app`
- Domínio próprio: `https://www.commandclick.com.br`

---

🎊 **Parabéns!** Sua landing page está no ar e capturando leads!
