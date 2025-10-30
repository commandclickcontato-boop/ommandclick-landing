# 🚀 DEPLOY NO VERCEL - Execute estes comandos

✅ **Tudo configurado!** Pronto para fazer deploy.

## Opção 1: Deploy via Vercel CLI (Recomendado)

Execute estes comandos no seu terminal:

```bash
# 1. Fazer deploy (vai abrir o navegador para você fazer login)
npx vercel

# Responda as perguntas:
# ? Set up and deploy? → Y
# ? Which scope? → Escolha sua conta
# ? Link to existing project? → N
# ? What's your project's name? → commandclick
# ? In which directory is your code located? → ./

# 2. Depois que der certo, faça deploy em produção:
npx vercel --prod
```

**Você vai receber uma URL tipo:** `https://commandclick.vercel.app`

## Opção 2: Deploy via Dashboard do Vercel

Se preferir fazer pela interface visual:

### A) Upload direto da pasta dist:

1. Acesse: https://vercel.com/new
2. Clique em "Browse" e selecione a pasta `dist` que está em `/home/user/workspace/dist`
3. Clique em "Deploy"

### B) Conectar via Git (melhor para atualizações futuras):

1. Fazer commit das mudanças:
```bash
git add .
git commit -m "Landing page Command Click completa com Meta Pixel"
git push
```

2. No Vercel:
   - Acesse: https://vercel.com/new
   - Clique em "Import Git Repository"
   - Selecione seu repositório
   - Configurações já estão prontas no vercel.json
   - Clique em "Deploy"

## ✅ O que já está pronto:

- ✅ Build feito (pasta `dist` criada)
- ✅ Configuração do Vercel (`vercel.json`)
- ✅ Scripts de build configurados
- ✅ Meta Pixel integrado
- ✅ Todas as funcionalidades testadas

## 📊 Depois do deploy:

1. **Teste a URL** que o Vercel te der
2. **Verifique o Meta Pixel:**
   - Acesse: https://business.facebook.com/events_manager
   - Clique em "Test Events"
   - Abra sua URL do Vercel
   - Veja os eventos chegando em tempo real!

3. **Teste o formulário:**
   - Preencha e submeta
   - Deve abrir seu email com os dados do lead

4. **Configure domínio próprio (opcional):**
   - No dashboard do Vercel → Settings → Domains
   - Adicione: www.commandclick.com.br

## 🎯 Arquivos importantes criados:

- `dist/` - Build pronto para produção
- `vercel.json` - Configuração do deploy
- `VERCEL_DEPLOY.md` - Guia completo
- `META_PIXEL_GUIDE.md` - Guia do Meta Pixel

---

💡 **Dica:** Depois do primeiro deploy, toda vez que você fizer mudanças e rodar `npx vercel --prod`, o Vercel atualiza automaticamente!
