# MX Studio Web

Site do estúdio em https://mxstudioweb.com.br — PT (`/`), EN (`/en`) e ES (`/es`), com 10 modelos de demonstração em `/demo/*`.

O formulário de diagnóstico continua em https://mx-studio-web.vercel.app/ (projeto separado, fora deste repositório).

## Rodar local

Node 24 (versão em `.node-version`, a mesma que a Cloudflare usa no build).

```bash
npm install
npm run dev
```

## Antes de publicar

```bash
npm run check   # lint, testes, build estático e testes do HTML gerado
```

O `npm run build` apaga o cache de `fetch` do Next (`.next/cache/fetch-cache`, para a cotação das moedas ser sempre a do dia da publicação), roda o `next build` e depois `scripts/flatten-segments.mjs`, que copia os arquivos de pré-carregamento do Next que saem em subpastas (`__next.*/`) para o nome plano que o navegador pede. Onde o build já sai plano, não faz nada.

## Publicação

Cloudflare Workers (plano grátis) conectado a este repositório: cada push na `main` publica; outras branches geram link de prévia. Configuração em `wrangler.jsonc` (pasta `out/`); cabeçalhos de segurança e cache em `public/_headers`.

Depois da migração, a Vercel só redireciona os endereços antigos (`vercel.json`).

## Imagens

- `npm run shots` — prints reais das páginas no ar (precisa do Microsoft Edge)
- `npm run portrait` — foto do Sobre a partir de `scripts/source/max.jpg`
- `npm run og` — imagens de compartilhamento em `public/og/`

## Onde mudar o quê

- Textos: `src/i18n/messages/{pt,en,es}.ts`
- Preços, vitrine, contato, vagas de fundador: `src/lib/estudio.ts`
