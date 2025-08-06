---
title: "Základy CSS"
headline: "Základy CSS"
description: "K čemu je CSS dobré a jak ho rychle začít používat."
date: "2016-02-01"
last_modification: "2016-02-01"
status: 0
tags: ["css", "napady", "selektory-css"]
format: "html"
---

<p>CSS (anglicky <i lang="en">Cascading Style Sheets</i>) je velmi rozšířený způsob, jak upravovat visuální vzhled dokumentů na internetu. V češtině se CSS běžně nazývá spojením <b>kaskádové styly</b>.</p>

<p>Pomocí CSS pravidel se nejčastěji upravuje podoba HTML značek.</p>




<h2 id="zapis">Zápis CSS</h2>

<p>Jednoduché použití CSS na HTML značku pro <a href="/nadpisy">nadpis <code>&lt;h1></code></a> může vypadat následovně:</p>

<pre><code>h1 {
  color: red;
}</code></pre>




<p>Tento kód způsobí, že obsah následujícího HTML kódu:</p>

<pre><code>&lt;h1>Text&lt;/h1></code></pre>

<p>Bude <font color="red">červený</font>. Proč to tak bude?</p>

<ul>
  <li>
    <p><code>h1</code> je tzv. <b>CSS selektor</b>, kterým se zaměří prvek na stránce (<a href="/css-selektory">selektorů</a> je velké množství), tento selektor zaměří všechny značky <code>&lt;h1></code>, které se na stránce vyskytují</p>
  </li>
  <li><p><code>{</code> a <code>}</code> jsou složené závorky a obalují všechny předpisy pro daný selektor (na <a href="/ceska-klavesnice">české klávesnici</a> je lze zapsat jako <kbd>Pravý Alt</kbd> + <kbd>B</kbd>/<kbd>N</kbd>)</p>
  </li>
  <li>
    <p><code>color</code> je <b>CSS vlastnost</b> – všech vlastností je obrovské množství – konkrétně <code>color</code> slouží pro nastavení barvy</p>
  </li>
  <li><p><code>:</code> – pomocí dvojtečky se odděluje název vlastnosti od její hodnoty</p>
  </li>
  <li><p><code>red</code> – <b>CSS hodnota</b> přiřazená k vlastnosti před dvojtečkou</p>
  </li>
  <li><p><code>;</code> – středník odděluje více párů <i>vlastnost – hodnota</i>, za poslední dvojicí se psát nemusí, ale je to docela dobrý zvyk</p>
  </li>
  <li>
    <p>Mezery a odřádkování jsou v předchozí ukázce CSS pouze pro přehlednost. Zápis „<code>h1{color:red;}</code>“ povede ke stejnému výsledku.</p>
  </li>
</ul>

<p><a href="https://kod.djpw.cz/jbub">Živá ukázka</a> – nejjednodušší použití CSS na HTML dokument</p>



<h2 id="pripojeni">Připojení CSS</h2>

<p>Aby se mohly kaskádové styly v HTML stránce projevit, musí se nějak <b>připojit</b>.</p>



<h3 id="style">Značka <code>&lt;style></code></h3>

<p>Nejrychlejší a nejsnazší je vložit CSS předpisy do HTML značky <code>&lt;style></code>, která se obvykle přidává před samotný obsah do hlavičky stránky (volitelná značka <a href="/html-kostra#head"><code>&lt;head></code></a>).</p>

<pre><code>&lt;head>
  <b>&lt;style></b>
    h1 {
      color: red;
    }
  <b>&lt;/style></b>
&lt;/head>
&lt;h1>Červený text&lt;/h1>
</code></pre>










<p>U vícestránkového webu by se ale muselo CSS se značkou <code>&lt;style></code> kopírovat na všechny podstránky. Velké weby navíc mají styly značně rozsáhlé a datově objemné, takže by se totéž CSS muselo znovu a znovu stahovat s každou stránkou.</p>

<p>Proto se CSS ve značce <code>&lt;style></code> moc nepoužívá. Případně jen pro menší množství pravidel.</p>


<h3 id="atribut-style">Atribut <code>style</code></h3>

<p>Psát CSS jde i přímo k jednotlivým HTML značkám do atributu <code>style</code>.</p>

<pre><code>&lt;h1 <b>style</b>="color: red">Červený text&lt;/h1></code></pre>



<p>Tento postup nazývaný jako <b>inline zápis</b> se ale používá jen výjimečně, protože je obtížnější takový kód spravovat. Navíc se obvykle CSS předpisy používají opakovaně, takže by neustálé opakování kódu nebylo moc elegantní.</p>

<p>Měli-li by být všechny nadpisy <code>&lt;h1></code> červené, musela by mít každá tato značka <code>style="color: red"</code>. Při vyčlenění CSS a zaměření pomocí selektorů to stačí napsat jednou.</p>



<h3 id="externi">Externí CSS</h3>

<p>Asi nejčastěji se používá <b>externí CSS soubor</b>. Někde v adresáři s webem se vytvoří soubor s příponou <code>*.css</code> (třeba <code>styl.css</code>) a jednotlivé CSS předpisy se píší přímo do něj.</p>


<p>Tento soubor se potom připojí ze všech stránek, kde je potřeba, značkou <code>&lt;link></code> (před obsahem v části <code>&lt;head></code>):</p>

<pre><code>&lt;link rel="stylesheet" href="<b>styl.css</b>"></code></pre>


<p>Pomocí <code>rel="stylesheet"</code> se prohlížeč dozví, že se jedná o soubor se styly.</p>


<p>Občas se je možné setkat s připojením stylů vypadajícím následovně:</p>

<pre><code>&lt;link rel="stylesheet" <b>type="text/css"</b> href="styl.css"></code></pre>

<p>Uvádění typu je zbytečné, protože „<code>text/css</code>“ je výchozí typ pro <code>rel="stylesheet"</code>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://gist.github.com/Jahoda/b220c02d7fc01f93a091">Nejjednodušší HTML + CSS kostra</a> s externím stylem</li>
  </ul>
</div>


<h2 id="vlastnosti">CSS vlastnosti</h2>

<p>Pro základní ovládnutí CSS je dále nutné znát asi deset <a href="/css-vlastnosti">CSS vlastností</a>.</p>


<h3 id="text">Vzhled textu</h3>

<ul>
  <li><a href="/font"><code>font</code></a> – nastavení fontu, velikosti písma (<code>font-size</code>) nebo výšky řádku (<code><a href="/font#line-height">line-height</a></code>)</li>
  <li><code>color</code> – barva textu</li>
  <li><code><a href="/text-align">text-align</a></code> – zarovnání textu</li>
  
  <li><a href="/odkaz#stylovani">stylování odkazů</a></li>
</ul>



<h3 id="bloky">Vzhled bloků</h3>

<ul>
  <li><code><a href="/margin">margin</a></code> – vytváření rozestupů mezi bloky</li>
  <li><code>background</code> – pozadí</li>
  <li><code>border</code> – rámeček</li>
  <li><code><a href="/display"><code>display</code></a></code> – různá podoba zobrazení (řádkové/blokové)</li>
  <li><code><a href="/float">float</a></code> – obtékání je základní způsob, jak něco dostat vedle sebe</li>
  <li><code><a href="/position">position</a></code> – posicování elementů</li>
</ul>


<!-- Výchozí hodnota text/css: https://www.w3.org/TR/html5/links.html#link-type-stylesheet -->