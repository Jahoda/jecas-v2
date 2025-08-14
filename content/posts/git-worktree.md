---
title: "Více Git větví vedle sebe"
headline: "Více Git větví vedle sebe"
description: "Jak spustit více větví jednoho repositáře vedle sebe."
date: "2025-08-15"
last_modification: "2025-08-15"
status: 1
tags: ["napady", "produktivita"]
format: "html"
---

<p>S nástupem AI se mění rytmus práce programátora. Zadáme dotaz do chat okna v <b>Cursoru</b> a čekáme na výsledek. Místo pasivního čekání lze efektivně pokračovat na jiném úkolu: spustit si vedle sebe další větev stejného projektu a vyvíjet paralelně.</p>

<p>Cílem je spustit více větví jednoho repositáře současně.</p>

<h2 id="prikazy">Využití <code>git worktree</code></h2>


<p>Přímo Git umí vytvářet oddělené adresáře. Použití u běžného NodeJS projektu může být následující:</p>

<pre><code>git fetch --all
git worktree add ../my-app-feature feature/xyz
cd ../my-app-feature
pnpm install
pnpm run dev</code></pre>

<p>Tím se vytvoří nová složka, větev, nainstalují závislosti (zde je výhoda <a href="https://pnpm.io/">pnpm</a>, že je nestahuje znovu, ale dokáže přepoužít) a spustí dev server.</p>

<p>Pokud už jeden server běží, standardně se použije jiný port, takže více dev prostředí může běžet najednou.</p>

<p>Potom stačí otevřít v novém okně příslušnou složku a vyvíjet.</p>

<h2 id="klon-repositare">Klon repositáře</h2>

<p>Další možnost je si klasicky naklonovat repositář do jiné složky.</p>

<p>Asi jednodušší na pochopení, ale zabere to víc místa.</p>

<pre><code>git clone git@github.com:me/my-app.git my-app-branchB
cd my-app-branchB
git checkout branchB
npm install
npm run dev</code></pre>

<h2 id="gui">GUI</h2>

<p>Pokud preferujete nepoužívat Git přes příkazovou řádku, většina IDE bude mít rozhraní pro práci s worktree.</p>

<p>Pro Cursor / Visual Studio Code se hodí plugin <strong><a href="https://marketplace.cursorapi.com/items/?itemName=jackiotyu.git-worktree-manager">Git Worktree Manager</a></strong>, který práci s worktree zjednodušuje a zpřehledňuje.</p>

<p>Jde tak na pár kliknutí otevřít nové okno Cursoru / VS Code s novým worktree a stejně jednoduše se mezi nimi potom přepínat.</p>

<h2 id="prepinani-kontextu">Přepínání kontextu</h2>

<p>Časté přepínání mezi různými úkoly může být problematické. Je dobré si to vyzkoušet, protože to nemusí být vhodné pro každého.</p>
