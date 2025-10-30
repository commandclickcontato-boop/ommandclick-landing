# 🚀 GUIA RÁPIDO - Deploy no Vercel em 3 Passos

## Passo 1: Criar conta no Vercel (se não tiver)

1. Acesse: **https://vercel.com/signup**
2. Clique em **"Continue with GitHub"** (ou Email)
3. Faça login/crie conta

## Passo 2: Deploy do Projeto

### Opção A: Via CLI (Terminal)

**Execute este comando único:**

```bash
npx vercel --yes
```

O Vercel vai:
- Pedir para fazer login (abre navegador automaticamente)
- Fazer build do projeto
- Fazer deploy
- Te dar a URL: `https://commandclick-xxx.vercel.app`

**Para produção final:**
```bash
npx vercel --prod
```

### Opção B: Via Dashboard (Interface Visual)

1. **Acesse:** https://vercel.com/new

2. **Clique em "Add New..." → Project**

3. **Importe o repositório Git:**
   - Se seu código está no GitHub: Clique em "Import Git Repository"
   - Se não está no Git ainda, veja instruções abaixo ↓

4. **Configure (geralmente automático):**
   - Framework Preset: Other
   - Build Command: `bun run export:web`
   - Output Directory: `dist`
   - Install Command: `bun install`

5. **Clique em "Deploy"**

6. **Aguarde 2-3 minutos** ⏳

7. **Pronto!** Você vai receber a URL 🎉

## Se não está no Git ainda:

```bash
# No terminal, no diretório do projeto:
git init
git add .
git commit -m "Landing page Command Click"

# Crie repo no GitHub: https://github.com/new
# Nome: commandclick-landing

# Depois:
git remote add origin https://github.com/SEU_USUARIO/commandclick-landing.git
git branch -M main
git push -u origin main
```

Agora volte para o Vercel e importe o repositório.

## Passo 3: Verificar se funcionou

Depois do deploy, teste:

1. ✅ Abra a URL que o Vercel te deu
2. ✅ Teste o formulário (preencha e envie)
3. ✅ Verifique Meta Pixel:
   - Acesse: https://business.facebook.com/events_manager
   - Clique em "Test Events" (Eventos de Teste)
   - Abra sua URL do Vercel em outra aba
   - Você deve ver eventos chegando em tempo real! 🎯

## 🎨 Configurar Domínio Próprio (Opcional)

Depois do deploy:

1. No dashboard do Vercel → Seu projeto
2. Settings → Domains
3. Add Domain → Digite: `www.commandclick.com.br`
4. Configure DNS no seu provedor de domínio:

```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

## 🔄 Atualizações Futuras

Depois do primeiro deploy, fazer atualizações é fácil:

**Se usou Git + Vercel:**
```bash
# Faça suas mudanças no código
git add .
git commit -m "Descrição das mudanças"
git push
```
Deploy automático! ✨

**Se usou CLI:**
```bash
# Faça suas mudanças no código
npx vercel --prod
```

## ❓ Problemas?

### "Build failed"
- Verifique se tem bun instalado: `bun --version`
- Se não, mude no Vercel para: Install Command = `npm install`

### "Module not found"
- Delete node_modules: `rm -rf node_modules`
- Reinstale: `bun install`
- Tente novamente

### "Permission denied"
- Use `npx vercel` ao invés de instalar globalmente

## 📞 Sua URL será:

- **Preview:** `https://commandclick-abc123.vercel.app`
- **Produção:** `https://commandclick.vercel.app`
- **Domínio próprio:** `https://www.commandclick.com.br` (depois de configurar)

---

🎊 **É isso!** Em 5 minutos sua landing page está no ar capturando leads!

**Comando único para deploy:**
```bash
npx vercel --yes
```
