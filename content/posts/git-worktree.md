---
title: "Více Git větví vedle sebe"
headline: "Více Git větví vedle sebe"
description: "Jak spustit více větví jednoho repa vedle sebe."
date: "2025-08-13"
last_modification: "2025-08-13"
status: 0
tags: ["git", "workflow", "nodejs", "ai", "produktivity", "git-worktree", "docker", "pm2", "direnv", "reverse-proxy", "pnpm"]
format: "html"
---

<h2 id="proc-to-resit-prave-ted">Proč to řešit právě teď</h2>

<p>S nástupem AI se mění rytmus práce programátora. Zadáme dotaz do chat okna v Cursoru a čekáme na výsledek. Místo pasivního čekání lze efektivně pokračovat na jiném úkolu: spustit si vedle sebe další větev stejného projektu a vyvíjet paralelně.</p>

<h2 id="cil">Cíl</h2>

<ul>
  <li>Spustit více větví jednoho repozitáře současně</li>
  <li>Zajistit, aby se mezi sebou nerušily (porty, data, prostředí)</li>
  <li>Držet řešení obecné pro Node.js projekty (funguje pro většinu dev serverů)</li>
</ul>

<h2 id="tri-pristupy">Tři přístupy</h2>

<h3 id="1-git-worktree-doporuceno">1) Git worktree (doporučeno)</h3>

<p>Oddělené adresáře, jedna <code>.git</code> historie. Rychlé, úsporné a bez kolizí.</p>

<pre><code>git fetch --all
git worktree add ../my-app-feature feature/xyz
cd ../my-app-feature
npm install
PORT=3001 npm run dev</code></pre>

<p>Poznámky:</p>

<ul>
  <li>Většina dev serverů respektuje proměnnou <code>PORT</code> nebo příznak portu. Příklady:</li>
</ul>

<pre><code># obecný dev server přes argument portu
npm run dev -- --port 5174

# některé servery podporují -p
npx next dev -p 3001</code></pre>

<h3 id="2-druhy-nebo-dalsi-klon-repozitare">2) Druhý (nebo další) klon repozitáře</h3>

<p>Nejjednodušší na pochopení, jen to zabere víc místa.</p>

<pre><code>git clone git@github.com:me/my-app.git my-app-branchB
cd my-app-branchB
git checkout branchB
npm install
PORT=3002 npm run dev</code></pre>

<h3 id="3-docker-compose-pokrocile">3) Docker/Compose (pokročilé)</h3>

<p>Izolace portů a prostředí přes kontejnery.</p>

<pre><code>services:
  web:
    build: .
    ports:
      - "3001:3000"  # host:container
    environment:
      - NODE_ENV=development</code></pre>

<h2 id="na-co-nezapomenout-izolace">Na co nezapomenout (izolace)</h2>

<ul>
  <li>Porty: každá větev na jiném portu (<code>PORT=3001</code> apod., nebo <code>--port</code>/<code>-p</code>).</li>
  <li>Prostředí: používej oddělené <code>.env</code> soubory, ať si nevyměníš klíče a URL.</li>
  <li>Data: jiná databáze/schema/URL, případně jiné cesty k souborům (např. lokální SQLite).</li>
  <li>Cache/queue: odlišné namespaces/DB indexy (např. Redis <code>db=1</code> pro druhou instanci).</li>
  <li>Node verze a nástroje: <code>nvm use</code>/<code>.nvmrc</code>, případně Volta; instaluj závislosti v každé instanci zvlášť.</li>
</ul>

<h2 id="rychle-recepty">Rychlé recepty</h2>

<h3 id="druha-vetev-za-60-sekund-worktree">Druhá větev za 60 sekund (worktree)</h3>

<pre><code>git fetch
git worktree add ../my-app-refactor refactor/api
cd ../my-app-refactor
npm i
PORT=3001 npm run dev</code></pre>

<h3 id="bezici-instance-v-oddelenych-oknech">Běžící instance v oddělených oknech</h3>

<ul>
  <li>Otevři každý adresář v samostatném okně editoru (např. Cursor), ať máš izolované terminály i workspace.</li>
  <li>Pro přepínání kontextu využij různé barvy promptu či názvy oken.</li>
</ul>

<h2 id="dalsi-alternativy">Další alternativy</h2>

<h3 id="reverse-proxy-s-hostnames">Reverse proxy s hostnames</h3>

<p>Pohodlné routování přes názvy jako <code>main.localhost</code> → port 3000, <code>feature.localhost</code> → port 3001. <code>*.localhost</code> míří na <code>127.0.0.1</code>.</p>

<pre><code># Caddyfile
feature.localhost {
  reverse_proxy localhost:3001
}
main.localhost {
  reverse_proxy localhost:3000
}</code></pre>

<h3 id="direnv-automaticke-nacitani-prostredi">direnv: automatické načítání prostředí</h3>

<p>Každý adresář/worktree může mít vlastní <code>.envrc</code>, který nastaví porty a proměnné.</p>

<pre><code># .envrc
use node
dotenv .env.feature
export PORT=3001
# povolit pro daný adresář
direnv allow</code></pre>

<h3 id="docker-compose-s-odlisnymi-projekty">Docker Compose s odlišnými projekty</h3>

<p>Oddělení sítí/volume přes projektové jméno a vlastní env soubor.</p>

<pre><code>docker compose -p appA --env-file .env.appA up -d
docker compose -p appB --env-file .env.appB up -d</code></pre>

<h3 id="pm2-sprava-vice-procesu">PM2: správa více procesů</h3>

<p>Spusť dvě dev instance se jmény a porty; snadno je pak vypneš či restartuješ.</p>

<pre><code>pm2 start npm --name appA -- run dev -- --port 3000
pm2 start npm --name appB -- run dev -- --port 3001
pm2 ls</code></pre>

<h3 id="concurrently-oba-servery-z-jednoho-prikazu">concurrently: oba servery z jednoho příkazu</h3>

<pre><code>npx concurrently -n A,B \
  "PORT=3000 npm run dev" \
  "cd ../my-app-refactor && PORT=3001 npm run dev"</code></pre>

<h3 id="izolace-databaze">Izolace databáze</h3>

<p>Každá větev na vlastní DB/schema, aby si nepřepisovaly data.</p>

<pre><code># Postgres
createdb app_dev_branchA
createdb app_dev_branchB
PGDATABASE=app_dev_branchA npm run migrate
PGDATABASE=app_dev_branchB npm run migrate

# SQLite
DATABASE_URL=file:./dev-branchB.db PORT=3001 npm run dev</code></pre>

<h3 id="uspora-mista-pnpm-sdileny-store">Úspora místa: pnpm sdílený store</h3>

<p>Pro více klonů/worktrees ušetříš disk – <code>pnpm</code> používá sdílený obsahový store, takže závislosti se neduplikují.</p>

<h2 id="prepinani-kontextu">Přepínání kontextu</h2>

<p>Časté přepínání mezi „hlubokými“ úkoly zvyšuje kognitivní zátěž a chyby. Během čekání na AI preferuj krátké, mělké činnosti bez velkého kontextu.</p>

<h3 id="vyhody-prepinani">Výhody</h3>

<ul>
  <li>Využití čekacího času: nezastaví tě I/O, buildy ani AI fronta.</li>
  <li>Snížení frustrace: drobné odskočení může ulevit.</li>
  <li>Rychlé drobnosti: linter, malé review, dokumentace.</li>
</ul>

<h3 id="nevyhody-prepinani">Nevýhody</h3>

<ul>
  <li>Attention residue: část pozornosti zůstává v předchozím úkolu → pomalejší návrat.</li>
  <li>Náklady na znovunaložení kontextu: ztrácíš minuty při každém návratu.</li>
  <li>Riziko chyb a roztříštěnosti: delší lead time, horší kvalita.</li>
  <li>Falešná produktivita: hodně činností, málo dokončené hodnoty.</li>
</ul>

<h3 id="co-delat-pri-cekani-na-ai">Co dělat při čekání na AI</h3>

<ul>
  <li>Zlepšit zadání pro AI: akceptační kritéria, edge cases, ukázková data, přesné API/typy.</li>
  <li>Připravit vstupy: test fixtures, kontrakty, schémata, migrace, seed data.</li>
  <li>Napsat testy/spec: given–when–then, integrační happy path i error path.</li>
  <li>Self‑review a observabilita: logování, guardy, metriky, feature flagy.</li>
  <li>Housekeeping: rychlé linty, přejmenování pro čitelnost, úklid mrtvého kódu.</li>
  <li>Dokumentace a plán: krátké ADR/poznámky, rozpad úkolu, update ticketu.</li>
  <li>PR/Code review: odblokuj ostatní rychlým komentářem.</li>
  <li>CI/Dev prostředí: ověř build, skripty, <code>.nvmrc</code>, env šablony.</li>
  <li>Mikro‑refaktor: malé změny bez změny chování (např. přidání typů).</li>
  <li>Mikro‑pauza: 60–90 s na oči a vodu.</li>
  
</ul>

<h3 id="jak-se-vyhnout-context-thrash">Jak se vyhnout „context thrash“</h3>

<ul>
  <li>WIP limit: 1 hluboký úkol + fronta mělkých mikro‑úkolů.</li>
  <li>Timebox: < 2 min čekání zůstávám; 2–10 min = mělké úkoly; > 10–15 min = zvaž jiný úkol s dobrým handoffem.</li>
  <li>Rychlé parkování stavu: krátký zápis „kde jsem“ + další krok; ulož diff/branch, krátký checklist.</li>
  <li>Oddělená okna/porty/env: minimalizuj kolize mezi instancemi.</li>
</ul>

<h2 id="uklid">Úklid</h2>

<pre><code># vypnutí a smazání worktree
git worktree remove ../my-app-feature
git worktree prune</code></pre>

<h2 id="shrnutí">Shrnutí</h2>

<h3 id="nastroje-bez-sloziteho-nastavovani">Nástroje bez složitého nastavování</h3>

<ul>
  <li><strong>PhpStorm/WebStorm</strong>: VCS → Git → Worktree → New Worktree; otevře větev v novém okně.</li>
  <li><strong>GitKraken</strong>: GUI podpora Git Worktrees; zakládání a správa více pracovních adresářů.</li>
  <li><strong>Cursor/VS Code + Git Worktree extension</strong>: příkazy „Git Worktree: Add/Open/Prune“ přímo z palety.</li>
  <li><strong>Cursor: Git Worktree Manager</strong>: správa worktrees přímo z palety; přidání, otevření i prune bez CLI. <a href="https://marketplace.cursorapi.com/items/?itemName=jackiotyu.git-worktree-manager">Marketplace</a></li>
  <li><strong>LazyGit</strong>: TUI s podporou worktrees; velmi rychlé ovládání z klávesnice.</li>
  <li><strong>PM2</strong>: jednoduché spuštění více dev procesů s různými porty a názvy.</li>
  <li><strong>GitHub Codespaces / Gitpod</strong>: víc instancí stejného repa v cloudu jedním klikem.</li>
</ul>

<p>Paralelní běh více větví jednoho projektu je snadný: worktree nebo druhý klon, jiný port, oddělené <code>.env</code> a data. Zatímco AI v Cursoru přemýšlí nad jedním úkolem, ty můžeš plynule pokračovat na dalším – bez čekání a bez chaosu.</p>