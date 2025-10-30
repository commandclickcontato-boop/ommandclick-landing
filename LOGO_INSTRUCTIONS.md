# Como adicionar a logo do Command Click

## Status Atual:
✅ Logo estilizada em texto está funcionando (fallback temporário)
⏳ Aguardando upload da imagem oficial

## Passo a Passo para Adicionar a Logo Real:

### PASSO 1: Adicionar a Imagem

#### Opção A: Usando a aba IMAGES do Vibecode (MAIS FÁCIL)
1. Abra a aba **IMAGES** no aplicativo Vibecode
2. Faça upload da imagem da logo (a imagem azul com "COMMAND CLICK" que você enviou)
3. Salve com o nome exato: `command-click-logo.png`
4. Mova/salve o arquivo para a pasta: `assets/images/`

#### Opção B: Via linha de comando (se tiver acesso ao terminal)
Se você tiver a imagem salva localmente:
```bash
# Copie o arquivo para a pasta correta
cp /caminho/da/sua/logo.png /home/user/workspace/assets/images/command-click-logo.png
```

### PASSO 2: Atualizar o Código (APENAS APÓS ADICIONAR A IMAGEM)

Abra o arquivo: `/home/user/workspace/src/screens/HomeScreen.tsx`

Encontre esta linha (linha 8):
```typescript
import CommandClickLogo from "../components/CommandClickLogo";
```

Substitua por:
```typescript
import CommandClickLogo from "../components/CommandClickLogoImage";
```

Pronto! A logo real será exibida.

## Observações Importantes:
- **Formato**: PNG com fundo transparente (recomendado)
- **Nome do arquivo**: `command-click-logo.png` (exatamente assim, minúsculas)
- **Localização**: `assets/images/` na raiz do projeto
- **Não altere o código** antes de adicionar a imagem, senão dará erro

## Por que em duas etapas?

React Native precisa que os `require()` de imagens sejam resolvidos em tempo de compilação. Por isso:
1. Primeiro você adiciona a imagem
2. Depois troca o componente no código
3. O Metro bundler detecta e recarrega automaticamente

## Status dos Componentes:

- ✅ **CommandClickLogo.tsx** - Versão atual (fallback em texto) - SEM ERRO
- ⏳ **CommandClickLogoImage.tsx** - Versão com imagem real - USE APÓS UPLOAD

## Atualizações Concluídas:
✅ Número do WhatsApp: 13982111925
✅ Background de mecânica com transparência
✅ Componente de logo sem erro

