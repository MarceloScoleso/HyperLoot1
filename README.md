# HyperLoot - Loja Gamer (CP3 FIAP)

Projeto desenvolvido para o **Checkpoint 3** da FIAP. Site institucional de uma loja gamer ficticia chamada **HyperLoot**, com foco em diferenciais inovadores no mercado de equipamentos para gamers.

## Integrante (Projeto Individual)

| RM     | Nome                           |
| ------ | ------------------------------ |
| 571626 | Marcelo Antonio Scoleso Junior |

## Como rodar localmente

1. Clone o repositorio.
2. Abra a pasta no VSCode.
3. Instale a extensao **Live Server** (recomendada em `.vscode/extensions.json`).
4. Clique com o botao direito em `index.html` e selecione **Open with Live Server**.

Tambem funciona abrindo `index.html` direto no navegador.

## Estrutura

```
cp3/
- index.html                    Home
- pages/
  - portifolio.html             Produtos, precos, planos e promocoes
  - sobre.html                  Historia, valores, equipe e timeline
  - contato.html                Formulario + FAQ + mapa
- src/
  - assets/
    - img/                      Pasta para imagens (vazia por padrao - usa SVGs inline)
  - css/estilo.css              Estilo principal (tema dark gamer)
  - js/script.js                Comportamento e interatividade
- .vscode/                      Configuracoes da IDE
- Equipes.txt                   Identificacao do integrante + link GitHub Pages
```

## Diferenciais inovadores do HyperLoot

- **SetupAI**: IA que monta setup gamer ideal por orcamento e estilo de jogo
- **TryBeforeBuy**: sala de teste com 12 setups montados antes de comprar
- **GamerCare 24h**: garantia com troca em 24 horas para defeito de fabrica
- **Arena Respawn**: torneios mensais para clientes com premios em produtos
- **TrocaUp**: programa de troca de hardware antigo com credito na loja
- **Streamer Kit**: pacote completo + mentoria 1:1 com streamer profissional

## Tecnologias

- HTML5 semantico (header, nav, main, section, article, aside, footer)
- CSS3 (variaveis, Grid, Flexbox, animacoes, mobile-first, tema dark)
- JavaScript vanilla (IntersectionObserver, validacao de form, quiz interativo)
- Google Fonts (Rajdhani + Inter)
- SVG inline para ilustracoes (controle, produtos, hero) - sem dependencia de imagens externas

## Paleta de cores

- **Primary**: `#7C5CFC` (violeta vivido)
- **Secondary**: `#22D3EE` (ciano teal)
- **Accent**: `#FBBF24` (dourado ambar)
- **Background**: `#0B0F1E` (midnight blue profundo)
- **Surface**: `#131A2E` (azul-acinzentado escuro)

## Deploy

Hospedado no **GitHub Pages**. Link no arquivo `Equipes.txt`.

## Acessibilidade

- Estrutura semantica completa
- Labels e ARIA em todos campos do formulario
- Contraste AA em textos sobre fundo escuro
- Navegacao por teclado
- Indicacao de campos obrigatorios
- `aria-live` em resultados dinamicos (quiz e validacao)
