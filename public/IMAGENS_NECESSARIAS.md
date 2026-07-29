# Inventário de imagens do portfólio Max Costa Estúdio

Todas as fotos ficam em `public/estudio/<pasta>/<arquivo>` no repositório. Use JPG (fotos, ~85% qualidade) — o `next/image` cuida do resto.

**Regra prática:**
- Resolução mínima **2× o tamanho de exibição maior** (retina)
- Formato JPG (fotos, ~85% qualidade). PNG só se tiver transparência
- Peso alvo: 200–500KB por foto (comprime em [tinypng.com](https://tinypng.com) antes de subir)

Aspect ratios usados no site: `3:4` (portrait), `1:1` (square), `4:3` (landscape), `16:9` (cinematic), `4:5` (retrato editorial).

---

## HEROS (já gerados — não precisa) ✅

Ficam em `public/estudio/heros/*.png`. Já rodando:
- `moda-arte.png` (3:4) · `restaurante-terra.png` (16:9) · `clinica-sereno.png` (1:1)
- `motta-advogados.png` (3:4) · `costa-imoveis.png` (16:9) · `rota-clara.png` (16:9)

Se quiser trocar depois, é só substituir o arquivo mantendo o nome.

---

## 1 · MODA ARTE (`public/estudio/moda-arte/`)

Loja de moda autoral. Paleta terra: barro, osso, cera, ferrugem, cru. Direção de arte editorial minimalista.

### Produtos (obrigatório — 12 fotos) — `3:4` portrait · min 800×1067px

| Arquivo | Peça | Cor referência |
|---|---|---|
| `products/v1.jpg` | Vestido curto/slip dress terra clay | #d4c19a |
| `products/v2.jpg` | Vestido longo barro/marrom | #a67c52 |
| `products/v3.jpg` | Vestido camisa off-white/osso | #e6d3b7 |
| `products/b1.jpg` | Blusa fluida areia/creme | #f0e5d0 |
| `products/b2.jpg` | Blusa cropped ferrugem/laranja terroso | #b56a44 |
| `products/b3.jpg` | Camisa larga branca/linho cru | #faf6f0 |
| `products/c1.jpg` | Calça wide leg argila/nude | #b8886c |
| `products/c2.jpg` | Calça alfaiataria marrom escuro | #5c3a24 |
| `products/a1.jpg` | Bolsa de couro cor cera/mel | #c9a373 |
| `products/a2.jpg` | Colar delicado prata/pearl | #e8ded0 |
| `products/a3.jpg` | Chapéu de palha bege | #e0c890 |
| `products/a4.jpg` | Cinto de couro tabaco escuro | #7a4a2e |

**Como enquadrar:** peça isolada em fundo neutro, luz natural, sem modelo (ou modelo cortado do pescoço pra baixo). Vibe: Zara Origins / Farm Rio editorial / Everlane.

### Trust strip (opcional — 4 ícones-fotos) — `1:1` square · min 200×200px

Substituir emojis por foto-ícones pequenos flat lay:
- `trust/frete.jpg` — caixa de entrega
- `trust/troca.jpg` — etiqueta/cabide
- `trust/pix.jpg` — cartão sobre mesa
- `trust/atelie.jpg` — máquina de costura ou mão trabalhando

---

## 2 · RESTAURANTE TERRA (`public/estudio/restaurante/`)

Alta gastronomia à brasa. Paleta escura + acento âmbar (#d97706). Vibe Michelin/moody food photography.

### Pratos do menu (obrigatório mínimo — 5 fotos por categoria) — `4:3` landscape · min 800×600px

Estas 5 fotos são reutilizadas por prato dentro da categoria:

| Arquivo | Categoria | Referência |
|---|---|---|
| `dishes/couvert.jpg` | Couvert | Pão de fermentação + azeitonas em ramekin |
| `dishes/entrada.jpg` | Entrada | Carpaccio de tomate defumado ou tartar |
| `dishes/principal.jpg` | Principal | Bife/carne à brasa com farofa e ervas |
| `dishes/sobremesa.jpg` | Sobremesa | Sorvete de leite queimado com caramelo |
| `dishes/bebida.jpg` | Bebida | Taça de vinho tinto ou coquetel |

**Plus — 14 fotos únicas** (uma por prato, se quiser máximo capricho): `c1`, `c2`, `e1`, `e2`, `e3`, `p1`, `p2`, `p3`, `p4`, `s1`, `s2`, `b1`, `b2`, `b3` — mesmos ratios.

### Interior da casa (opcional — 2 fotos) — `4:3` · min 1200×900px

- `interior/salao.jpg` — salão principal com mesas de madeira e velas
- `interior/varanda.jpg` — varanda coberta ou fachada do casarão

---

## 3 · CLÍNICA SERENO (`public/estudio/clinica/`)

Clínica multiprofissional. Paleta eucalipto/creme/verde-mar. Vibe editorial calma.

### Profissionais (obrigatório — 3 fotos) — `1:1` square · min 500×500px

Retratos profissionais close-up ombros pra cima, luz natural, fundo neutro/desfocado:

| Arquivo | Profissional | Descrição |
|---|---|---|
| `professionals/p1.jpg` | Dra. Camila Rezende | Psicóloga, mulher, expressão empática |
| `professionals/p2.jpg` | Dr. André Vasconcelos | Psicólogo, homem, calmo |
| `professionals/p3.jpg` | Nutri. Beatriz Alves | Nutricionista, mulher, sorriso natural |

**Como enquadrar:** headshot editorial, roupa neutra clara. Não deve parecer LinkedIn genérico — mais editorial de revista.

### Espaço da clínica (opcional — 4 fotos) — `4:3` · min 800×600px

- `space/consultorio-1.jpg` — consultório com poltrona e planta
- `space/espera.jpg` — sala de espera silenciosa
- `space/detalhe.jpg` — detalhe (chá, plantas, luz)
- `space/fachada.jpg` — entrada da clínica

---

## 4 · MOTTA ADVOGADOS (`public/estudio/motta/`)

Escritório de advocacia especializado. Paleta indigo/creme editorial. Vibe autoridade sem parecer datado.

### Sócios (obrigatório — 3 fotos) — `4:5` portrait · min 500×625px

Retratos formais em ambiente do escritório (biblioteca, mesa, corredor). Terno/camisa neutra, expressão séria mas acessível:

| Arquivo | Sócio | Descrição |
|---|---|---|
| `partners/p1.jpg` | Dr. Henrique Motta | Sócio-fundador, homem, autoridade calma |
| `partners/p2.jpg` | Dra. Fernanda Ferreira | Sócia, mulher, expressão firme |
| `partners/p3.jpg` | Dr. Rodrigo Barreto | Sócio, homem, jovem |

**Bonus — 1 headshot round** — `1:1` · min 200×200px

- `partners/p1-round.jpg` — mesmo Dr. Henrique, crop quadrado pra usar no blockquote do hero. Pode ser recorte da mesma foto.

---

## 5 · COSTA IMÓVEIS (`public/estudio/imoveis/`)

Vitrine imobiliária boutique Rio de Janeiro. Vibe arquitetura + luz natural + interior premium.

### Card do imóvel (obrigatório — 10 fotos) — `4:3` · min 800×600px

Foto principal de cada imóvel (exterior OU interior — o que melhor represente):

| Arquivo | Imóvel | Bairro · Tipo |
|---|---|---|
| `properties/i1.jpg` | Cobertura duplex vista mar | Ipanema · Cobertura |
| `properties/i2.jpg` | Apartamento reformado | Copacabana · Apartamento |
| `properties/i3.jpg` | Loft pé-direito duplo | Botafogo · Loft |
| `properties/i4.jpg` | Casa em condomínio | Barra da Tijuca · Casa |
| `properties/i5.jpg` | Apartamento varanda gourmet | Leblon · Apartamento |
| `properties/i6.jpg` | Cobertura prédio boutique | Botafogo · Cobertura |
| `properties/i7.jpg` | Studio compacto reformado | Copacabana · Studio |
| `properties/i8.jpg` | Casa de vila | Laranjeiras · Casa |
| `properties/i9.jpg` | Apartamento renovado | Ipanema · Apartamento |
| `properties/i10.jpg` | Loft industrial | Botafogo · Loft |

**Vibe:** Interior clean, luz natural, sem gente. Referência: [nordic-noir.com](https://nordic-noir.com), Kinfolk real estate features, casas do NYT Real Estate.

### Galeria do imóvel (obrigatório — 8 fotos) — `16:9` · min 1200×675px

Estas 8 fotos são reutilizadas dentro do modal do imóvel (galeria walking). Podem representar diferentes cômodos/detalhes genéricos:

- `gallery/g1.jpg` — living
- `gallery/g2.jpg` — cozinha
- `gallery/g3.jpg` — quarto principal
- `gallery/g4.jpg` — banheiro
- `gallery/g5.jpg` — varanda/vista
- `gallery/g6.jpg` — closet ou detalhe
- `gallery/g7.jpg` — sala de jantar
- `gallery/g8.jpg` — entrada/hall

---

## 6 · ROTA CLARA (`public/estudio/rota-clara/`)

Curso online + landing de conversão. Paleta ciano-noturno + midnight blue. Vibe: creator authority + programa premium.

### Criadora (obrigatório — 1 foto) — `3:4` portrait · min 600×800px

- `creator.jpg` — retrato editorial de Larissa Nogueira (mulher, ~40 anos, elegante casual, expressão confiante). Fundo neutro ou lifestyle.

### Depoimentos (obrigatório — 3 fotos) — `1:1` square · min 200×200px

Retratos ombros pra cima, olhando pra câmera, expressão natural:

| Arquivo | Aluno | Descrição |
|---|---|---|
| `testimonials/t1.jpg` | Renata Mendes | Mulher ~38 anos, sorriso confiante |
| `testimonials/t2.jpg` | Bruno Lima | Homem ~35 anos, expressão determinada |
| `testimonials/t3.jpg` | Priscila Souza | Mulher ~42 anos, olhar tranquilo |

### Stack de alunos (obrigatório — 4 fotos) — `1:1` square · min 100×100px

Só aparecem como thumbnails circulares empilhados no hero (small):

- `students/s1.jpg` a `students/s4.jpg` — retratos ombros pra cima, gente diversa

### Video/aula preview (opcional — 1 foto) — `16:9` · min 1200×675px

- `preview/aula.jpg` — Larissa dando aula, ou setup de gravação, ou notebook + coffee ambient

---

## Contagem final

| Trilha | Total | Cobre |
|---|---|---|
| **Essencial** | 31 fotos + 6 heros (já feitos) | Todos os slots primários — site fica completo |
| **Completo** | 60 fotos + 6 heros | Todos os slots + variantes plus (interiores, galeria única por prato, etc.) |

## Como me mandar

**Opção A (recomendada):** cria a pasta `public/estudio/` no repositório do jeito descrito acima e sobe as imagens direto no GitHub (drag-and-drop na interface web do GitHub funciona).

**Opção B:** manda o zip e eu descompacto e organizo — só precisa manter o naming.

Assim que as imagens estiverem em `/public/estudio/`, eu atualizo o código de cada demo pra usar as fotos no lugar dos ícones/silhuetas atuais. Tempo estimado meu: 30 min pra plugar tudo.
