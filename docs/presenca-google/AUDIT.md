# Auditoria: presença no Google (MX Studio Web)

Data de referência: 2026-11-06 (America/Sao_Paulo). Escopo: site institucional `https://mxstudioweb.com.br` (repo `transformabi/mx-studio`).

## Fontes oficiais consultadas

| Tema | Fonte | Achado |
| --- | --- | --- |
| Lançamento BR dos Perfis na Pesquisa | [Blog Google Brasil, 27 out 2026](https://blog.google/intl/pt-br/produtos/um-novo-perfil-para-ajudar-criadores-e-veiculos-a-destacarem-seu-conteudo-na-busca/) | Recurso anunciado no Brasil; seguir a fonte aumenta as chances de ver conteúdo no Discover (não é garantia). |
| Critério ~10k / plataformas | [Google Search Help — Create a new Search profile](https://support.google.com/websearch/answer/16904498) e [creators.google/pt-BR/profile](https://creators.google/pt-BR/profile) | Mínimo tipicamente 10.000 em **uma** plataforma: YouTube, Instagram, X ou TikTok; 18+; políticas de conteúdo. |
| Disponibilidade geográfica na Ajuda EN | Mesma página de Ajuda (EN) | Lista Canadá, Índia e EUA; o blog BR afirma o lançamento no Brasil. Há **lag / inconsistência** entre Ajuda EN e anúncio BR — copy do site deve ser condicional. |
| Elegibilidade Google Business Profile | [Business eligibility](https://support.google.com/business/answer/13763036) | Precisa de contato presencial no horário informado (ou exceções). Marcas / negócios **só online** em geral **não** elegíveis. |
| Distinção GBP vs Perfil na Pesquisa | creators.google FAQ | Para empresas/marcas, o Painel de Informações ligado a Perfil da Empresa permanece; Search Profile é fluxo de criadores/editores. |

**Conclusão para produto:** tratar GBP (Maps) e Perfis na Pesquisa como produtos distintos. Nunca prometer verificação, ranking, Discover ou elegibilidade universal. Não inventar API oficial de claim.

## Já existe no site

| Item | Estado |
| --- | --- |
| CTA WhatsApp | Sim — hero, planos, contato, footer; número em `src/lib/estudio.ts` (`5521993196171`). |
| CTA planos | Sim — hero/`diagnosticoUrl` → `#planos`; header CTA; showcase. |
| Planos Launch / Business / Growth | Sim — setup + mensalidade; domínio/hospedagem/design/suporte no discurso de assinatura. |
| SEO títulos / meta / OG / Twitter | Sim — `src/lib/seo.tsx` + `messages.*.meta` + imagens OG. |
| Sitemap / robots | Sim — `src/app/sitemap.ts`, `src/app/robots.ts`. |
| Velocidade mobile | Showcase cita LCP medido (Lighthouse); **não** inventamos score global do institucional neste PR. |
| i18n PT / EN / ES | Sim. |
| Seção “Presença no Google” | **Não** (antes deste PR). |
| Pacote “Site + Google” com preço | **Não** — e este PR **não** define preço. |
| Painel do cliente | **Não existe** no repo (sem auth/dashboard Supabase para status domínio/GBP). |
| Integração API Perfil na Pesquisa | **Não** (correto; não inventar). |

## Inconsistências a sinalizar (não alteradas silenciosamente)

1. **Sobre / FAQ vs Termos:** copy de “domínio e código no seu nome / sem fidelidade” pode conflitar com Termos v1.1 § licença — já conhecido; não muda neste PR.
2. **Ajuda Google EN vs Blog BR** sobre disponibilidade de Search Profiles — copy condicional.
3. **Preços / taxas / setup** — intocados neste PR.

## Entrega deste PR (PR1)

- Seção `#presenca-google` + CTAs planos/WhatsApp.
- Docs de auditoria, roadmap e checklist.
- Sem novo preço, sem painel, sem mutação de contas Google.
