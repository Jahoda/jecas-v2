---
title: "Jak používat git rebase"
headline: "Jak používat <code>git rebase</code>"
description: "Proč a jak používat git rebase pro přehlednou historii v Gitu."
date: "2020-06-05"
last_modification: "2025-08-17"
status: 1
tags: ["napady", "produktivita", "git"]
format: "html"
---

<p>Při práci ve více lidech s versovacím nástrojem Git je prakticky nevyhnutelný stav, kdy vývoj probíhá paraelně ve více větvích. V extrémním případě potom ve větvích různě od sebe odvozených.</p>

<p>Např. první <i>feature branch</i> odvozená z hlavní <code>main</code> větve, ze které vychází další <i>feature branch</i>. </p>

<p>Příkaz <code>git rebase</code> (popř. <code>git merge</code>) se potom hodí pro synchronisaci větví mezi sebou, aby pořád vycházely z aktuálního <i>mainu</i>.</p>




<h2 id="merge">Merge vs. rebase</h2>

<p>Obecně celkem platí, že <code>git merge</code> používají dvě skupiny lidí:</p>

<ol>
  <li>lidé, co moc nerozumí Gitu,</li>
  <li>lidé, co neřeší hezkou historii commitů</li>
</ol>

<p>Hezká historie souvisí i s vytvářením smysluplných commitů.</p>

<p>Jsou i lidé, co se <code>rebase</code> bojí. Přitom pro to moc není důvod – použití je dost jednoduché.</p>




<h2 id="rebase">Základní rebase</h2>

<p>Běžné použití je následovné:</p>
<p>Nejprve se stáhne aktuální stav:</p>

<pre><code>git fetch</code></pre>

<p>Do aktuální <code>feature</code> větve se dostanou nové commity prostým:</p>

<pre><code>git rebase origin/main</code></pre>

<p>Co se stane:</p>
<ol>
  <li>Git najde poslední společný commit obou větví.</li>
  <li>Dočasně uloží všechny commity z <code>feature</code> větve.</li>
  <li>Přesune <code>feature</code> větev na konec <code>main</code> větve.</li>
  <li>Postupně aplikuje uložené commity jeden po druhém.</li>
</ol>

<p>Výsledkem je lineární historie, kde všechny commity z <code>feature</code> větve následují po commitech z <code>main</code> větve.</p>

<p>Nezbývá než změny <i>pushnout</i>. Je zde potřeba uvést přepínač <i>force</i>, protože se změnila historie.</p>

<pre><code>git push -f</code></pre>

<p>Případně jde rebase <i>naklikat</i> ve VS Code:</p>

<p><img src="/files/git-rebase/git-rebase-vs-code.png" class="border" alt="Rebase ve VS Code" /></p>

<h2 id="onto">Rebase <code>--onto</code></h2>

<p>Příkaz <code>git rebase --onto</code> se hodí pro případy, kdy moje větev vychází z větve, na které pracuje někdo jiný. A ten tam mění historii. To se obecně nepovažuje za dobrý postup, ale s rebase --onto to není problém.</p>

<pre><code>git rebase --onto origin/cizi-vetev HEAD~</code></pre>

<p>Tento příklad vezme můj poslední commit (<code>HEAD~</code>) a umístí ho nad celou cizí větev. Starší commity se ignorují, takže nehrozí řešení nesmyslných konfliktů.</p>


<h2 id="interactive">Interaktivní rebase</h2>

<p>Interaktivní rebase je mocný nástroj pro úpravu historie:</p>

<pre><code>git rebase -i HEAD~3</code></pre>

<p>Otevře se editor s možnostmi:</p>
<ul>
  <li><code>pick</code> – ponechat commit</li>
  <li><code>reword</code> – změnit commit message</li>
  <li><code>edit</code> – upravit commit</li>
  <li><code>squash</code> – sloučit s předchozím</li>
  <li><code>fixup</code> – sloučit a zahodit message</li>
  <li><code>drop</code> – smazat commit</li>
</ul>

<h2 id="konflikty">Řešení konfliktů</h2>

<p>Při rebase mohou nastat konflikty. Git oznámí konflikt a zastaví rebase. Po vyřešení:</p>

<pre><code>git add &lt;conflicted-files&gt;
git rebase --continue</code></pre>

<p>Nebo můžete rebase zrušit:</p>

<pre><code>git rebase --abort</code></pre>

<h2 id="best-practices">Dobré praktiky</h2>

<ul>
  <li>Pravidelně rebaseovat s hlavní větví. Minimalisuje se tím nepěkné překvapení po dokončení úkolu s řešením hromady konfliktů.</li>
  <li>Mít <code>main</code> větev nastavenou jako <i>protected</i>. Jestliže se používá force push, je jen otázka času, kdy se člověk splete, a pustí to nad <code>main</code> větví.</li>
  <li>Nepoužívat force push do větví, kde pracuje více lidí. Nebo nepracovat v jedné větvi ve více lidech, ale řešit to další odvozenou větví a merge/pull requestem.</li>
</ul>

<h2 id="zaver">Závěr</h2>

<p><code>git rebase</code> je nástroj pro vytvoření čisté a lineární historie. Umožňuje přesunout commity na novou základnu a upravit historii před publikováním. Je to alternativa k merge, která zachovává přehlednou historii, ale vyžaduje opatrnost při používání na veřejných větvích.</p>
