# 📱 Como Adicionar a Imagem de Mockup do Command Click

## ✅ Status Atual

Por enquanto está mostrando um placeholder estilizado com ícones de celular, tablet e notebook.

## 📤 Como Adicionar a Imagem Real

### Passo 1: Upload da Imagem

1. Abra a aba **IMAGES** no aplicativo Vibecode
2. Faça upload da imagem do mockup (celular + tablet + notebook)
3. **Nome do arquivo:** `command-click-mockup.png`
4. **Salve em:** `assets/images/`

### Passo 2: Atualizar o Código

Depois de fazer o upload, edite o arquivo:
`/home/user/workspace/src/screens/HomeScreen.tsx`

**Encontre esta linha (linha 9):**
```typescript
import MockupImage from "../components/MockupImage";
```

**Substitua por:**
```typescript
import MockupImage from "../components/MockupImageReal";
```

### Passo 3: Pronto!

A imagem aparecerá automaticamente na landing page!

## 📏 Especificações da Imagem

Sua imagem já está perfeita:
- ✅ **Formato:** PNG
- ✅ **Proporção:** 16:9 (paisagem)
- ✅ **Dimensões:** ~1200 x 675 pixels
- ✅ **Fundo:** Azul do Command Click
- ✅ **Conteúdo:** Celular + Tablet + Notebook com interfaces do sistema

## 🎯 Componentes Criados

- **`MockupImage.tsx`** - Placeholder atual (3 ícones)
- **`MockupImageReal.tsx`** - Versão com imagem real (use após upload)

## ⚠️ Importante

- **NÃO altere o código** antes de fazer o upload da imagem
- A imagem DEVE estar em `assets/images/command-click-mockup.png`
- Só troque o componente depois que a imagem estiver no lugar

---

**Qualquer dúvida, é só me avisar!** 📸

