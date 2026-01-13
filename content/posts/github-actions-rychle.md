---
title: 'Rychlejší GitHub Actions'
headline: 'Jak zrychlit GitHub Actions'
description: 'Praktické tipy pro optimalisaci GitHub Actions pomocí paralelisace, composite actions a gh CLI'
date: '2026-01-13'
status: 1
tags: ['hotova-reseni']
format: 'html'
---

<p>GitHub Actions jsou mocný nástroj pro CI/CD, ale bez optimalisace mohou workflows trvat zbytečně dlouho. Zde jsou praktické tipy, jak je zrychlit.</p>

<h2 id="paralelni-joby">Paralelní joby</h2>

<p>Joby bez <code>needs</code> běží paralelně. Pokud jeden job nepotřebuje výstup druhého, odstraňte závislost.</p>

<pre><code>jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - run: pnpm run lint

  check:
    runs-on: ubuntu-latest
    steps:
      - run: pnpm run check

  build:
    runs-on: ubuntu-latest
    # needs: [lint, check]
    steps:
      - run: pnpm run build</code></pre>

<p>Celková doba CI = doba nejpomalejšího jobu, ne součet všech.</p>

<h3 id="cekat-na-lint">Má build čekat na lint a check?</h3>

<p>Záleží na situaci:</p>

<ul>
  <li><b>Bez <code>needs</code></b> – build běží paralelně, CI je rychlejší. Pokud lint selže, build proběhne zbytečně, ale ušetříte čas když vše projde.</li>
  <li><b>S <code>needs: [lint, check]</code></b> – build čeká. Šetří CI minuty při selhání, ale zpomaluje úspěšné běhy.</li>
</ul>

<p>Pro malé projekty s rychlým buildem se vyplatí paralelisace. Pro dlouhé buildy (10+ minut) může být lepší čekat.</p>

<h2 id="composite-actions">Composite actions pro DRY</h2>

<p>Opakující se kroky (checkout, setup Node.js, instalace závislostí) extrahujte do composite action.</p>

<h3 id="vytvoreni-composite">.github/actions/setup/action.yml</h3>

<pre><code>name: 'Setup Node.js with pnpm'
description: 'Setup pnpm, Node.js, and install dependencies'

inputs:
  setup-env:
    description: 'Copy .env.example to .env'
    required: false
    default: 'false'

runs:
  using: 'composite'
  steps:
    - uses: pnpm/action-setup@v4

    - uses: actions/setup-node@v4
      with:
        node-version: 'lts/*'
        cache: 'pnpm'

    - name: Install dependencies
      shell: bash
      run: pnpm install --frozen-lockfile

    - name: Setup environment
      if: inputs.setup-env == 'true'
      shell: bash
      run: cp .env.example .env</code></pre>

<h3 id="pouziti-composite">Použití v workflow</h3>

<pre><code>jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: ./.github/actions/setup
        with:
          setup-env: 'true'

      - run: pnpm run build</code></pre>

<p>Změna verse Node.js nebo package manageru se dělá na jednom místě.</p>

<h2 id="paths-filter">Paths filter</h2>

<p>Spouštějte workflow jen pro relevantní změny:</p>

<pre><code>on:
  pull_request:
    paths:
      - 'src/**'
      - 'package.json'</code></pre>

<p>Paths filter funguje pouze na úrovni workflow, ne jednotlivých jobů. Pro job-level filtrování potřebujete action jako <code>dorny/paths-filter</code> nebo vlastní logiku.</p>

<h2 id="gh-cli">GitHub CLI místo checkout</h2>

<p>Pokud potřebujete jen data z GitHub API (seznam změněných souborů, komentáře), použijte <code>gh</code> CLI. Je předinstalované na runners a nevyžaduje checkout.</p>

<pre><code>jobs:
  comment:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    env:
      GH_TOKEN: ${{ github.token }}
    steps:
      - name: Get changed files and comment
        run: |
          # Seznam změněných souborů z PR
          FILES=$(gh pr view ${{ github.event.pull_request.number }} \
            --json files --jq '.files[].path')

          # Přidání komentáře
          gh pr comment ${{ github.event.pull_request.number }} \
            --body "Changed: $FILES"</code></pre>

<p>Tím ušetříte 10–15 sekund na checkout a případný setup Node.js pro actions.</p>

<h2 id="cache">Cachování závislostí</h2>

<p>Setup-node s parametrem <code>cache</code> automaticky cachuje závislosti:</p>

<pre><code>- uses: actions/setup-node@v4
  with:
    node-version: 'lts/*'
    cache: 'pnpm'  # nebo npm, yarn</code></pre>

<p>První běh stáhne závislosti, další je načtou z cache.</p>

<h2 id="bezpecnost">Bezpečnostní poznámky</h2>

<h3 id="script-injection">Script injection</h3>

<p>Doporučuje se neinterpolovat uživatelsky kontrolované hodnoty přímo do shell příkazů:</p>

<pre><code># Přímá interpolace
run: echo "Branch: ${{ github.head_ref }}"

# Přes environment variable
env:
  BRANCH: ${{ github.head_ref }}
run: echo "Branch: $BRANCH"</code></pre>

<p>V kontextu GitHub Actions je risiko minimální – GitHub striktně omezuje povolené znaky v názvech větví, takže shell injection přes <code>github.head_ref</code> prakticky není možný. Použití environment variables je spíše konvence a best practice než reálné bezpečnostní opatření.</p>

<h3 id="pinning">Pinning actions</h3>

<p>Pro maximální bezpečnost pinnujte actions na konkrétní SHA:</p>

<pre><code># Tag - lze přepsat na jiný commit
- uses: actions/checkout@v4

# SHA - neměnné
- uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11</code></pre>

<p>Git tagy (jako <code>v4</code>) může vlastník repozitáře kdykoli přesunout na jiný commit. Pokud by byl účet kompromitován, útočník může tag přepsat na škodlivý kód. SHA commit hash je neměnný – vždy ukazuje na stejný kód. Pro oficiální actions od GitHubu je risiko minimální, ale pro third-party actions z neznámých zdrojů je pinning na SHA rozumná pojistka.</p>

<h2 id="checklist">Checklist optimalisace</h2>

<ul>
  <li>Joby bez závislostí běží paralelně (bez <code>needs</code>)</li>
  <li>Opakující se kroky v composite action</li>
  <li>Paths filter pro selektivní spouštění</li>
  <li>GitHub CLI místo checkout, kde to jde</li>
  <li>Cachování závislostí zapnuto</li>
  <li>Node.js verse jako <code>lts/*</code> – pohodlnější než manuální aktualisace, ale s risikem, že nová verse rozbije build</li>
</ul>
