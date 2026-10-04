# Repaginada MX Studio Web + domínio mxstudioweb.com.br — design

Data: 03/10/2026 · Branch: `repaginada-mxstudioweb-com-br`

## Objetivo

Lançar o site do estúdio no domínio próprio **mxstudioweb.com.br** com uma cara nova, feita do zero,
que pareça uma agência séria e de verdade, e com o e-mail **contato@mxstudioweb.com.br**
encaminhado para **developermaxrj@gmail.com**. Custo total: R$ 40/ano (só o domínio).

Sucesso significa:
- O site abre em `https://mxstudioweb.com.br` (e `www.` redireciona) com HTTPS válido, em PT, EN e ES.
- Um e-mail enviado para contato@mxstudioweb.com.br chega no Gmail developermaxrj@gmail.com.
- Todo link antigo (`mxstudioweb.vercel.app/...`, `max-costa-estudio.vercel.app/...`,
  `mx-studio-web.vercel.app`) leva à página equivalente no domínio novo.
- Nenhuma informação falsa: só a Sulamita aparece como cliente; o resto é "Modelo de demonstração".

## Decisões tomadas com o Max

| Tema | Decisão |
|---|---|
| Domínio | `mxstudioweb.com.br` (mxstudio.com.br pertence a terceiro desde 2019). Registrado em 04/10/2026, vence 04/10/2027. |
| Hospedagem | Cloudflare (plano grátis, uso comercial permitido), ligada ao GitHub `transformabi/mx-studio`. A Vercel Hobby proíbe uso comercial. |
| E-mail | Recebimento por Cloudflare Email Routing → Gmail. Envio "como contato@" pelo Gmail + SMTP grátis da Brevo (opcional). |
| Visual | Do zero. Sério, real, sem nenhum desenho ou arte feita em código. |
| Preços | Mantidos: landing R$ 3.500 · institucional R$ 4.900 · e-commerce R$ 9.900 · sistema R$ 16.000. |
| Idiomas | Mantidos: PT, EN e ES. |
| Moedas | Seletor R$, US$, €, £ (sem BTC) + "Formas de pagamento: PIX · cartão (parcelado) · Wise (internacional)". |
| Clientes | Só a Sulamita Nascimento (sulamitaestetica.pt) é cliente real. |
| Sobre | Texto simples, sem trajetória. Pode citar a consultoria de BI. Foto real do Max (fornecida). |
| /fundadores | Continua página separada, só PT, `noindex`, com os dados atuais (R$ 497, 3x, cuidado R$ 149,90/mês, vagas). |

## Fora do escopo

- Redesenhar as demos em `/demo/*` (cada uma imita a marca de um cliente fictício).
- Atendente de IA no WhatsApp (estava inativo, sem variáveis na Vercel): é removido.
- Apagar projetos da Vercel ou repositórios do GitHub (apagar é permanente; fica com o Max, depois).
- Projetos de clientes e propostas (`*-previa`, `*-proposta`, etc.): não são tocados.

## Arquitetura

- **Next.js 16 (App Router) com `output: 'export'`**: o build gera HTML estático em `out/`.
  Todas as demos já são `'use client'`; o único código de servidor era a home (cookies de idioma),
  o `proxy.ts` e a rota `api/whatsapp`, que saem.
- **Idiomas por rota** (sem cookie): `/` = PT, `/en` = EN, `/es` = ES. Dois layouts raiz em grupos
  de rota, para o `<html lang>` ficar certo em cada idioma:
  - `app/(pt)/layout.tsx` → `lang="pt-BR"`: home PT, `/fundadores`, `/demo/*`, `/carrossel`, `/brand-kit`.
  - `app/(intl)/[locale]/layout.tsx` → `lang="en"` / `lang="es"`, com `generateStaticParams`.
  - Os textos continuam em `src/i18n/messages/{pt,en,es}.ts`, reescritos para o conteúdo novo.
- **Moeda no navegador**: seletor client-side (R$, US$, €, £), padrão por idioma (PT → BRL,
  EN → USD, ES → USD), escolha lembrada em `localStorage` (com try/catch). Cotação buscada **no build**
  (API pública da Coinbase, com valores de reserva se falhar) e exibida como "≈ valor aproximado".
- **Diagnóstico** (hoje no projeto Vercel `mx-studio-web`, HTML estático + Supabase): os arquivos são
  baixados do deploy atual e passam a viver em `public/diagnostico/`, com os caminhos `/assets/...`
  ajustados para `/diagnostico/assets/...`. A configuração do Supabase não muda.
- **Hospedagem**: Cloudflare (Workers/Pages com assets estáticos) conectada ao GitHub; cada push na
  `main` publica; cada branch gera um link de prévia. URLs limpas, sem `.html`.
- **Vercel vira só redirecionamento**: um `vercel.json` na raiz do repositório com redirect 308
  `/(.*)` → `https://mxstudioweb.com.br/$1` (a Cloudflare ignora esse arquivo). O projeto
  `mx-studio-web` recebe um deploy só com redirect para `https://mxstudioweb.com.br/diagnostico`.
  **Só entra no ar depois que o domínio estiver respondendo.**

### Sai do repositório

`src/app/api/whatsapp/`, `src/lib/whatsapp-agent.ts`, `src/proxy.ts`, `src/i18n/server.ts`,
`src/components/fx/hero-canvas.tsx` (3D), `fx/hero-backdrop.tsx`, `fx/smooth-scroll.tsx`,
`fashion-silhouettes.tsx`, `marquee.tsx`, `app/template.tsx` (cortina), efeitos de grão e cortina no CSS,
`public/*.md` (anotações internas), PNGs de 2–5 MB em `public/heros/` (as versões `.webp` ficam).
Dependências removidas: `@anthropic-ai/sdk`, `@upstash/redis`, `three`, `@types/three`, `lenis`
(e `framer-motion` se nenhuma demo usar). Componentes que só a home antiga usava são apagados ou
reescritos.

## Direção visual

- **Cores** (tokens em `globals.css`): fundo `#0C0E0A`, texto `#FBFCF8`, texto secundário em branco
  com 60–70% de opacidade, linhas em branco 10%. Verde da marca `#A4FE24` **só** em botão principal,
  seta da logo e destaques pontuais. Seções claras pontuais (fundo `#F3F4EF`, texto `#0C0E0A`) para
  respiro. Contraste mínimo AA em tudo.
- **Tipografia**: Bricolage Grotesque (títulos, 600–800), Figtree (texto), JetBrains Mono (etiquetas
  em maiúsculas, pequenas). Mesma família do Instagram e do diagnóstico.
- **Grade**: container de 1280 px, 12 colunas, seções numeradas (`01 — Trabalhos`), linhas finas
  entre blocos, muito espaço vazio. Um CTA principal por seção.
- **Imagens só reais**: prints capturados das páginas no ar (desktop 1440×900 e celular 390×844),
  dentro de molduras simples de navegador/celular feitas em CSS; a foto do Max. Nada de ilustração,
  silhueta, ícone gigante decorativo, banco de imagem ou foto aleatória de fallback.
- **Foto do Max**: recorte do peito para cima (sem o copo do canto), preto e branco, fundo
  escurecido, sem retoque no rosto. Gerada com `sharp` a partir do original; WebP ~600 px.
- **Movimento**: entrada suave ao rolar (opacity + translate curtos via IntersectionObserver),
  hover nos cards. Desligado com `prefers-reduced-motion`.
- **Logo**: os SVGs atuais (`public/brand/*`, `favicon.svg`) continuam — o M branco com a seta verde.

## Conteúdo da home (PT, EN, ES)

1. **Topo** — título forte ("Sites que trazem clientes para o seu negócio" e equivalentes),
   frase de apoio, botões **Pedir prévia grátis** (→ `/diagnostico`) e **Falar no WhatsApp**.
   Ao lado: prints reais do site da Sulamita (desktop + celular), etiqueta "Cliente real · sulamitaestetica.pt".
2. **Cliente real** — caso da Sulamita: o que foi feito (site bilíngue PT/EN, domínio .pt, no ar desde
   set/2026), link para o site ao vivo. Sem métricas inventadas.
3. **Modelos por nicho** — grade de demos com filtro por ramo; cada card com print real, etiqueta
   "Modelo de demonstração", abre a demo. Um CTA no fim da seção.
4. **Como funciona** — 4 etapas: descoberta (3–5 dias), design (1–2 semanas), desenvolvimento
   (2–4 semanas), lançamento (2–3 dias).
5. **Serviços e preços** — 4 pacotes com preço "a partir de", seletor de moeda, linha de formas de
   pagamento (PIX · cartão parcelado · Wise) e "Em Portugal ou fora do Brasil? Orçamento na sua moeda."
6. **Sobre** — foto, nome (Max Costa), texto curto: faz cada site pessoalmente, como trabalha,
   também tem uma consultoria de BI. Sem anos de experiência nem passagens por agência.
7. **Perguntas frequentes** — revisadas para não citar nada que não seja verdade.
8. **Contato** — WhatsApp (21) 99319-6171, contato@mxstudioweb.com.br, Instagram @mxstudioweb,
   diagnóstico. O formulário abre o WhatsApp com a mensagem pronta (como hoje).

Rodapé: logo, links, idiomas, e-mail, Instagram, "© 2026 MX Studio Web".
Página 404 nos três idiomas (texto PT com links para EN/ES).

## Demos

- O código das demos não muda. O `DemoFrame` ganha o visual novo e o "voltar" aponta para `/`.
- **Decidido pelo Max**: a vitrine (home e `/fundadores`) lista só as **6 demos com fotografia real**
  (Moda & Arte, Terra, Sereno, Motta, Costa Imóveis, Rota Clara) — o mesmo "6 demos" da bio do
  Instagram. Lumi, Íris, Alicerce e Maré (sem foto de capa, só desenho em código) ficam fora da
  vitrine, do sitemap e com `noindex`, acessíveis só pelo endereço, até ganharem fotos.

## SEO e compartilhamento

- `metadataBase` = `https://mxstudioweb.com.br`; `title`/`description` por idioma.
- `hreflang` (`pt-BR`, `en`, `es`, `x-default` → `/`) e `canonical` em cada página.
- `sitemap.xml` e `robots.txt` gerados no build; `/fundadores`, `/carrossel`, `/brand-kit` com `noindex`.
- Imagem Open Graph 1200×630 por idioma (PNG estático gerado no build, logo + título).
- JSON-LD `ProfessionalService` com nome, URL, e-mail, telefone, Instagram, área atendida.
- Google Search Console verificado por registro TXT na Cloudflare.

## Infra e lançamento (ordem)

1. ✅ Max registrou `mxstudioweb.com.br` no registro.br.
2. Max cria conta Cloudflare (developermaxrj@gmail.com), adiciona o domínio no plano Free, troca os
   DNS no registro.br para os 2 da Cloudflare **e remove o DNSSEC** (o domínio veio com DS do
   `auto.dns.br`; se ficar, o domínio para de resolver). Conferido por RDAP depois.
3. Claude constrói o site na branch, publica prévia na Cloudflare (Max autoriza o app da Cloudflare
   no GitHub uma vez) e manda o link.
4. Com o domínio ativo: liga `mxstudioweb.com.br` ao site, `www` → apex (301), HTTPS sempre.
5. Email Routing: `contato@mxstudioweb.com.br` → `developermaxrj@gmail.com` (Max confirma o e-mail de
   verificação). SPF: `v=spf1 include:_spf.mx.cloudflare.net ~all`; DMARC `p=none` com relatório
   para contato@.
6. (Opcional) Envio como contato@: conta Brevo do Max, domínio autenticado (DKIM + SPF combinado
   `include:spf.brevo.com`), Max cola a chave SMTP no Gmail em "Enviar e-mail como".
7. Merge na `main` → Cloudflare publica; `vercel.json` de redirect entra junto; deploy de redirect no
   `mx-studio-web`.
8. Max troca o link da bio do Instagram para `mxstudioweb.com.br` (e `/fundadores`).
9. Reativar DNSSEC pela Cloudflare (DS novo no registro.br) — opcional, depois de tudo estável.

## Verificação

- `npm run build` (export estático) e `npm run lint` sem erros.
- Checagem de links internos no `out/` (nenhum 404).
- Prévia no navegador: home nos 3 idiomas, `/fundadores`, `/diagnostico`, 6 demos, 404; largura
  375 px sem rolagem horizontal; console sem erros; seletor de moeda trocando valores.
- PageSpeed (celular) da prévia: meta ≥ 90 em desempenho, acessibilidade, boas práticas e SEO.
- `curl -I` nos endereços antigos da Vercel → 308 para o caminho certo no domínio novo.
- E-mail de teste para contato@ chegando no Gmail.

## Riscos

- **DNSSEC**: trocar DNS sem tirar o DS derruba o domínio. Mitigação: passo 2 + checagem RDAP.
- **Redirect antes da hora**: se o `vercel.json` entrar antes do domínio responder, os links antigos
  apontam para o nada. Mitigação: merge só depois do passo 4 verificado.
- **Cotação de moeda velha**: atualiza a cada publicação; os valores são mostrados como aproximados.
- **Diagnóstico**: se algum arquivo não puder ser baixado do deploy, ele continua na Vercel e o botão
  aponta para lá até resolver.
