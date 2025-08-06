---
title: "Responsivní CSS mřížka"
headline: "Responsivní CSS mřížka"
description: "Jak vytvořit čistě v CSS mřížku, která se bude přizpůsobovat velikosti okna. "
date: "2014-09-22"
last_modification: "2014-09-22"
status: 1
tags: ["css", "hotova-reseni", "responsive"]
format: "html"
---

<p>Při vytváření webu, kde má být obsah vypsán v jednotlivých boxech ve více sloupcích, stojíme před dilematem ohledně určení ideální <b>šířky boxů a počtu sloupců</b>.</p>

<p>Naštěstí jde využít <a href="/mobilni-web#media-queries">Media Queries</a> a pro různé šířky <i>viewportu</i> (dostupná plocha prohlížeče, kde se zobrazuje samotná stránka) nastavit různý počet sloupců.</p>

<p>Idea je taková, že šířka boxů bude nastavená <b>procentuálně</b> a při snížení šířky <b>okna</b> pod určitou velikost se šířka <b>boxu</b> zvětší, což sníží počet sloupců. Umístění boxů vedle sebe zajistí <a href="/float">obtékání</a>.</p>

<p><img src="/files/responsivni-mrizka/preskladani.png" alt="Přeskládání boxů" class="border"></p>

<p>Jak ilustruje obrázek, při změně šířky se nejprve bude měnit šířka boxů, až se při šířce nastavené v <code>@media</code> změní počet sloupců.</p>

<p>Sloupců bude ve výchozí podobě pět (100 / 20 = 5).</p>

<pre><code>.box {
  width: 20%;
  float: left;
}</code></pre>

<p>Vyšší šířku při nižší šířce okna zajistíme potom pravidlem <code>@media</code>.</p>

<pre><code>@media (max-width: 700px) {
  .box {width: 25%}
}
@media (max-width: 600px) {
  .box {width: 33.3333%}
}
@media (max-width: 450px) {
  .box {width: 50%}
}</code></pre>

<p>Při šířce do 700 px se tedy zvýší šířka boxu na 25 %, což vytvoří místo 5 sloupců jen čtyří (100 / 25 = 4) a tak dále.</p>


<p>U hodnot šířky, které nejsou celé (např. <code>33.3333%</code>) může nastat problém s <b>přesným zaokrouhlením</b>. Proto je vhodné šířku spočítat CSS vlastností <a href="/calc"><code>calc</code></a>. Podpora <code>calc</code> je od <b>IE 9</b> a mimo starou <b>Operu 12</b>. Nefunkčnost v <b>IE 8</b> a starších ale nemusí vadit, protože v takových Explorerech nefunguje ani <code>@media</code> a navíc se takovéto prohlížeče nevyskytují v <b>mobilních zařízeních</b>.</p>

<pre><code>.box {
  width: 33.3333%; /* prohlížeč nezná calc */
  width: -webkit-calc(100% / 3); 
  width: calc(100% / 3)
}</code></pre>

<p><a href="https://kod.djpw.cz/svfb">Samostatná ukázka</a></p>



<h2 id="mezery">Mezery mezi boxy</h2>

<p>Výše uvedená ukázka je sice hezká, ale v praxi nejspíš budeme potřebovat mít mezi boxy <b>mezeru, rámeček</b> a podobně.</p>

<p>Mezeru je možné zajistit snížením procentuální šířky a použitím ubrané hodnoty do <a href="/margin"><code>margin</code>u</a>. Na pixel <b>přesného řešení</b> tím ale nedocílíme – <a href="https://kod.djpw.cz/tvfb">ukázka</a>.</p>

<p>Další možnost je použít <b>rámeček</b> (<code>border</code>). Při přepnutí <a href="/box-model">box modelu</a> na <code>border-box</code> (<i>okrajový</i> = <code>padding</code> a rámeček se k šířce nepřičítá) lze dosáhnout uspokojivého výsledku – <a href="https://kod.djpw.cz/uvfb">ukázka</a>.</p>

<p>Poslední možnost je potom použít další <b>vnořený element</b>, což prakticky umožní si libovolně nastavovat cokoliv – <a href="https://kod.djpw.cz/wvfb">ukázka</a>.</p>


<h2 id="ramecek">Stejně tlustý rámeček</h2>

<p>Na první pohled složitější je vytvoření <i>dlaždic</i>, kde jednotlivé prvky bude oddělovat vždy <b>stejně silný rámeček</b>.</p>

<p><img src="/files/responsivni-mrizka/ramecek.png" alt="Stejně silný rámeček" class="border"></p>

<p>S využitím obalového elementu potom dosáhneme relativně rozumného kódu.</p>

<p><a href="https://kod.djpw.cz/qnfb">Živá ukázka</a></p>



<h2 id="pevna-vyska">Pevná výška</h2>

<p>Všechny výše uvedené ukázky mají nastavenou <b>pevnou výšku</b>. To je bohužel nutnost v případě, že chceme používat obtékání.</p>




<h2 id="selektory">Speciální selektory</h2>

<p>Pokud již zmíněné postupy a triky nestačí, zachrání nás CSS selektor <a href="/css-selektory#n-ty-potomek"><code>nth-child</code></a> a obdobné.</p>

<ul>
  <li><code>.polozka:nth-child(<b>5</b>n + 1)</code> – každá pátá položka</li>
  
  <li><code>.polozka:nth-child(<b>5</b>) ~ .polozka</code> – každá položka následující po páté</li>
</ul>

<p><a href="https://kod.djpw.cz/xvfb">Ukázka</a> stejně tlustého rámečku u všech boxů s využitím <code>nth-child</code> selektoru.</p>