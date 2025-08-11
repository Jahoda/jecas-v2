---
title: "Jak v praxi používat Git"
headline: "Jak v praxi používat Git"
description: "Jak rychle a efektivně používat versovací systém Git. "
date: "2025-04-01"
last_modification: "2025-08-12"
status: 1
tags: ["produktivita", "napady"]
format: "html"
---

<p><a href="https://git-scm.com">Git</a> je dnes v podstatě standard, jak ukládat zdrojový kód.</p>

<p>Chce-li člověk programovat, nemá moc možnost se Gitu vyhnout. Možná v bance se může setkat se <a href="https://subversion.apache.org">Subversion (SVN)</a> nebo v herním průmyslu s <a href="https://www.perforce.com/products/helix-core">Perforce (Helix Core)</a>.</p>

<p>Git původně vznikl jako sada příkazů pro příkazovou řádku (CLI – <i lang="en">command line interface</i>), ale postupem času nad tím vznikla řada aplikací nabízejících grafické rozhraní (GUI – <i lang="en">graphical user interface</i>).</p>



<h2 id="cli-gui">CLI, nebo GUI?</h2>

<p>Opravdoví programátoři nepochybně používají Git v příkazové řádce. Osobně se ale domnívám, že vyšší efektivity a nižší chybovosti jde dosáhnout spíš v Git klientu s grafickým rozhraním.</p>

<p>Osobně mi nejvíc vyhovuje <a href="https://github.com/apps/desktop">GitHub Desktop</a>. Jde v něm snadno vyřešit drtivá většina úkonů, co je potřeba, aniž by se příliš často dostával do neřešitelných stavů.</p>

<p>Další výhoda je napojení na <a href="https://github.com">GitHub</a>, díky čemuž z něj jde snadno klonovat repozitáře.</p>


<p><img src="/files/git-prakticky/klonovani-repositare-z-githubu.png" alt="Klonování repositáře z GitHubu" class="border"></p>


<h2 id="editor">Git v editoru/IDE</h2>

<p>Dost praktické je používat Git klienta v oblíbeném editoru.</p>

<p>Dle mého názoru nejlépe funguje vestavěný Git v IDE od <a href="https://www.jetbrains.com">JetBrains</a>.</p>

<p>Kontrolu vlastního kódu mi ale přijde lepší provádět v jiném zobrazení, než ve kterém kód vznikl, protože to člověku trochu naruší slepotu.</p>

<p>Něco mezi je nástroj typu <a href="https://magit.vc">Magit</a>, pro vyznavače příkazové řádky to může být zajímavé řešení.</p>


<h2 id="ai">Git přes AI</h2>

<p>Git jde dost dobře používat i přes nějakého AI chatbota. Třeba přes <a href="https://www.cursor.com">Cursor</a>. Pokud se mu umožní spouštět příkazy v příkazové řádce, jde mu lidským způsobem popsat, co má dělat.</p>

<p>Dost užitečné je to k řešení konfliktů v kódu, což je typicky rutinní otravná činnost, kterou jazykový model snadno zvládne.</p>



<h2 id="prikazy">Užitečné příkazy</h2>

<p>Doporučuji Git používat přes grafické rozhraní a většinu věcí klikat. Přijde mi to rychlejší s nižší chybovostí. Některé věci ale naklikat neumím, a proto používám následující příkazy:</p>


<dl>
<dt><code>git reset --hard origin/main</code></dt>
<dd>Tvrdý reset na vzdálenou <code>main</code> (nebo jinou) větev. Na konkrétní commit: <code>git reset --hard &lt;HASH&gt;</code>.</dd>


<dt><code>git rebase --onto origin/nazev-vetve HEAD~</code></dt>
<dd>Vychází-li můj kód z cizí větve, kde někdo změní historii, klasický rebase může znamenat konflikty. Tento příkaz bere v úvahu jen poslední commit (typicky můj), který hodí nad aktualisovanou cizí větev.</dd>


<dt><code>git rebase --abort</code></dt>
<dd>Když se při rebaseování a řešení konfliktů něco pokazí, tímto se to ukončí.</dd>


<dt><code>git cherry-pick &lt;HASH&gt;</code></dt>
<dd>Vezme konkrétní commit z jiné větve a aplikuje ho sem. Ideální pro rychlé převzetí bugfixu bez merge celé větve.</dd>
</dl>


<h2 id="commit-messages">Commit zprávy</h2>
<p>Doporučuji moc neřešit, nezdržovat se tím, ideálně nechat vygenerovat AI nebo převzít identifikátor a název ticketu, používá-li se nějaký takový systém na projektu.</p>

<h2 id="squash">Squashování commitů</h2>

<p>V některých případech se hodí sloučit více commitů do jednoho.</p>

<p><img src="/files/git-prakticky/squash.png" alt="Squash commitů" class="border"></p>


<h2 id="poradek">Pořádek v commitech a historii</h2>

<p>Když se člověk trochu naučí s Gitem, může mít tendenci se snažit o perfektní Git historii. Tj. rozdělovat části kódu do více smysluplných commitů v rámci jedné feature branche, squashovat commity a podobně.</p>

<p>Časem jsem došel k tomu, že Git historie je často přeceňovaná. Důležitější než „dokonalé“ atomické commity je rychlá a bezpečná integrace změn a srozumitelný popis v PR. Prakticky se mi osvědčilo:</p>

<ul>
  <li>Malé PR s jasným cílem a popisem. Snadněji se reviewuje a revertuje.</li>
  <li>Na feature větvi klidně „WIP“ commity; před merge do hlavní větve použít v GitLabu/GitHubu squash, ať je výsledek přehledný.</li>
  <li>Po začátku review už historii větve nepřepisovat; případné opravy přidat navrch jako <code>!fixup</code> commity.</li>
</ul>

<p><img src="/files/git-prakticky/commit-messages.png" alt="Commit messages meme" class="border"></p>

<p>Stručně řečeno v rámci merge/pull requestu může být v commitech nepořádek, který se vyřeší squashnutím a změnou commit message.</p>



<h2 id="rebase-merge">Rebase vs. merge</h2>
<p><b>Rebase</b> přepisuje historii tak, že mé commity přehrává na aktuální vrchol cílové větve. Výsledek je čistá, lineární historie.</p>
<p><b>Merge</b> zachovává původní historii a vytvoří merge commit.</p>

<p>Osobně mi přijde přehlednější používat rebase.</p>

<h2 id="reflog">Záchrana přes <code>git reflog</code></h2>
<p><code>git reflog</code> ukazuje všechny nedávné pohyby HEAD. Když se „ztratí“ commit po rebase/resetu, téměř vždy je v reflogu dohledatelný.</p>
<pre><code>git reflog
git checkout &lt;HASH_Z_REFLOGU&gt;
git branch zachrana/&lt;popis&gt;</code></pre>
<p>Pro návrat celé větve na starý stav: <code>git reset --hard &lt;HASH&gt;</code>. Reflog je lokální; po <code>git gc</code> se staré záznamy mohou čistit, proto zachraňovat co nejdřív.</p>

<h2 id="cisteni">Vyčištění Gitu</h2>
<p>Pravidelné čištění udrží repozitář malý a svižný. Následující příkazy jsou běžná údržba, některé jsou destruktivní – pouštět jen s vědomím důsledků.</p>
<dl>
  <dt><code>git fetch --prune</code></dt>
  <dd>Odstraní neaktuální vzdálené sledované větve (smazané na originu).</dd>

  <dt><code>git gc --prune=now</code></dt>
  <dd>Úklid nepotřebných objektů a optimalizace balíků. Agresivnější varianta po expirování reflogu.</dd>

  <dt><code>git reflog expire --expire=now --all</code></dt>
  <dd>Okamžitě vyprázdní reflog, aby šlo následně uvolnit prostor přes <code>git gc</code>.</dd>

  <dt><code>git clean -fdx</code></dt>
  <dd>Smaže neversované soubory a adresáře včetně ignorovaných (build/artefakty). Používat jen, když je to žádoucí.</dd>

  <dt><a href="https://github.com/newren/git-filter-repo">git-filter-repo</a>, <a href="https://rtyley.github.io/bfg-repo-cleaner/">BFG</a></dt>
  <dd>Trvalé odstranění velkých souborů či citlivých dat z historie. Po přepsání historie je nutné force push a koordinace s týmem.</dd>

  <dt><a href="https://git-lfs.com">Git LFS</a></dt>
  <dd>Pro binární soubory. Migrace existující historie: <code>git lfs migrate import --include="*.psd,*.zip"</code>.</dd>
</dl>


<h2 id="github-gitlab">GitHub, nebo GitLab?</h2>
<ul>
  <li><a href="https://github.com"><b>GitHub</b></a>: největší ekosystém, Actions, Copilot, přehledné PR UI, snadná integrace a marketplace.</li>
  <li><a href="https://gitlab.com"><b>GitLab</b></a>: silné integrované DevOps (CI/CD, registry, issue tracking) v jednom, on‑prem varianta, detailní oprávnění.</li>
</ul>
<p>Volba: veřejné/open‑source a rychlý start spíš GitHub. Firemní on‑prem all‑in‑one a detailní řízení přístupu spíš GitLab.</p>

<h2 id="vice-vetvi">Více větví</h2>

<p>Pracuje-li člověk s hodně větvemi zároveň, zajímavé řešení je <a href="https://gitbutler.com">GitButler</a>, který dokáže mít aplikovaný všechen kód najednou, ale zároveň ho sekat na samostatné větve pro pohodlnější code review a integraci.</p>

<p>Řeší to přesně takový problém typu mám rozdělanou práci, přišel bug a chtěl bych ho rychle opravit.</p>

<h2 id="stash">Nepoužívat <code>stash</code></h2>

<p>Stash slouží k odkládání změn na později.</p>

<p>Myšlenka hezká, ale celé to zavání tím, že člověk na odložené změny zapomene. Lepší mi přijde i rozdělané změny commitnout.</p>


<h2 id="zaloha">Slouží Git jako záloha?</h2>

<p>Git je versovací systém, ne plnohodnotná záloha. Umí skvěle chránit zdrojáky a historii, ale neřeší:
 dostupnost (off‑site kopie), snapshoty celého prostředí, databáze, velké binárky mimo repo.</p>

<p>Rozumné může být používat zrcadlení mezi GitHubem a GitLabem.</p>
