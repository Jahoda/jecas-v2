---
title: "Preprocesor SASS/SCSS v praxi"
headline: "Preprocesor SASS/SCSS v praxi"
description: "Rychlokurs z praxe proč a jak začít psát CSS s využitím preprocesoru SASS."
date: "2017-05-29"
last_modification: "2017-05-29"
status: 0
tags: []
format: "html"
---

<p>Pro usnadnění psaní CSS existuje řada tzv. <b>CSS preprocesorů</b> – jedná se o nástroje, které z nějaké jiné, ale zpravidla CSS velmi podobné, syntaxe kompilují finální styly, kterým rozumí prohlížeč.</p>

<p>Díky tomu jde psát CSS pohodlnějším způsobem. Hlavní přednost je možnost lépe dodržovat zásadu DRY (<i lang="en">don't repeat yourself</i>) – tedy neopakovat stejný kód.</p>

<p>Nevýhoda je nutnost řešit <b>build proces</b> finálních CSS v deployovacím procesu.</p>








<h2 id="sass-scss">SASS vs. SCSS</h2>

<p>Zdrojové soubory mohou být psány buď v syntaxi SASS (přípona <code>*.sass</code>) nebo SCSS (přípona <code>*.scss</code>).</p>

<p>Liší se syntaxí a SCSS se více <b>podobá obyčejnému CSS</b>. Validní CSS soubor je zároveň <b>automaticky validní SCSS</b>. Díky tomu jde snadno celý projekt psaný v čistém CSS překlopit do SASSu (s SCSS syntaxí).</p>

<pre><code>/* příklad validního CSS i SCSS zároveň */
a <b>{</b>
  color: red<b>;</b>
  font-weight: bold<b>;</b>
<b>}</b></code></pre>











<p>Syntaxe SASS je trochu jiná – nepoužívá složené závorky pro zanořování (místo toho je odsazování) a nevyžaduje psát středníky mezi deklaracemi.</p>



<pre><code>/* příklad SASS syntaxe */
a
  color: red
  font-weight: bold</code></pre>







<p>Pro začátek je tak asi lepší zvolit <b>SCSS syntaxi</b> – je více podobná CSS.</p>

<p>Pokročilejší tvůrce zase může lákat SASS syntaxe, protože vypouští nepotřebné znaky a vede tak k úspornějšímu kódu.</p>




<h2 id="rozdily">Rozdíly oproti CSS</h2>

<p>Při pohledu do SCSS souboru jde pozorovat oproti CSS řadu rozdílů:</p>






<h3 id="promenne">Proměnné</h3>

<p>Tím nejsou myšleny nativní <a href="/var">CSS proměnné přes <code>var</code></a>, ale vlastní proměnné, které se potom zkompilují do obyčejného CSS (bez <code>var</code>).</p>


<p>Používají se nejčastěji pro barvy nebo breakpointy v <a href="/media">media queries</a>.</p>

<p>Nejprve se nadeklarují:</p>

<pre><code>$blue: #1081DD;
$dark-blue: #0D6AB7;
$light-blue: #8ECCF0;

$small: 40em;
</code></pre>











<p>Nyní je možné kdekoliv používat:</p>

<pre><code>@media (max-width: $small) {
  body {
    background-color: $dark-blue;
  }
}</code></pre>











<h3 id="import">Importování souborů</h3>

<p>V běžném CSS je poměrně běžné psát všechny styly do jediného souboru, který se potom připojí na všechny stránky. Tento postup se obejde bez nutnosti řešit všelijaké <a href="slouceni-js-css">spojování CSS</a>.</p>

<p>Jelikož se SCSS stejně musí zkompilovat do finálního CSS, není problém zdrojové soubory dělit do jednotlivých souborů.</p>

<p>Používá se k tomu stejně jako v CSS příkaz <code>@import</code> (v CSS se většinou moc nepoužívá, protože v externím CSS brání paralelnímu stahování a má tak negativní vliv na <a href="/zrychlovani">rychlost stránky</a>).</p>


<p>Hlavní soubor projektu (např. <code>main.scss</code>) potom typicky obsahuje pouze <code>@import</code>y jednotlivých částí:</p>

<pre><code>@import "helpers/mixins"; /* znovupoužitelné mixiny */

@import "base/variables"; /* definice proměnných */
@import "base/document"; /* základní definice dokumentu */

@import "components/buttons"; /* samostatná komponenta tlačítek */</code></pre>











<p>Veškeré styly se tak <i>rozsekají</i> do <b>jednotlivých souborů</b> podle logických souvisejících celků.</p>

<p><b>Proč?</b></p>

<p>Napomáhá to přehlednosti, orientaci, znovupoužitelnosti atd. Bývá příjemnější pracovat se soubory s desítkami řádků než s tisíci.</p>

<p>Například styly tohoto webu se (v době psaní článku) skládají z cca 50 <code>*.scss</code> souborů. U větších webů to mohou být klidně stovky.</p>


<h3 id="komentare">Komentáře</h3>

<p>V SCSS jde používat i řádkové komentáře používané třeba v <a href="/php">PHP</a> nebo <a href="/js">JavaScriptu</a>:</p>

<pre><code>// Řádkový komentář, který v čistém CSS rozbije následující deklaraci

/*
Blokový komentář
funguje v SCSS i CSS.
*/</code></pre>














<h3 id="zanorovani">Zanořování bloků selektorů</h3>

<p>V SCSS jde napsat něco jako:</p>

<pre><code>p {
  color: red;
  
  a {
    color: blue;
  }
}</code></pre>











<p>Výsledkem bude následující výstup:</p>

<pre><code>p {color: red}
p a {color: blue}</code></pre>









<p>Zvlášť užitečná je tato schopnost při využití <a href="/media"><code>@media</code> pravidel</a>:</p>

<pre><code>.nejaka-super-trida {
  color: red;
  
  @media (max-width: $small) {
    color: blue;
  }
}</code></pre>










<p>Výstup / zápis v čistém CSS by vypadal takto:</p>

<pre><code>.nejaka-super-trida {color: red}
@media (max-width: 40em) {
  .nejaka-super-trida {color: blue}
}</code></pre>








<p>V SCSS je hezké, jak odpadne nutnost duplikovat CSS selektor uvnitř <code>@media</code> bloku.</p>


<h3 id="ampersand">Magický ampersand</h3>

<p>Ušetřit psaní dokáže magický <code>&amp;</code>, zvlášť při psaní podle <a href="/bem">metodiky BEM</a>:</p>


<pre><code>.block {
  position: relative;
  
  &amp;__element {
    color: blue;
    
    &amp;--modifikator {
      color: red;
    }
  }
}</code></pre>




<p>Výsledné CSS bude:</p>

<pre><code>.block {
  position: relative;
}
.block__element {
  color: blue;
}
.block__element--modifikator {
  color: red;
}</code></pre>










<p>Velmi se to hodí i u pseudo tříd a pseudo elementů:</p>

<pre><code>a {
  color: red;
  
  &amp;:hover {
    color: blue;
  }
  
  &amp;:after {
    content: "…";
  }
}</code></pre>










<p>Výsledkem je:</p>


<pre><code>a {
  color: red;
}
a:hover {
  color: blue;
}
a:after {
  content: "...";
}
</code></pre>






<p><b>Pozor na přehnané zanořování!</b> Zanořování je na používání lákavé, ale má to jisté nevýhody:</p>


<ol>
  <li>
    <p>Při nepoužívání BEMu vznikají hodně silné selektory, které potom může být problém přebít.</p>
  </li>
  
  <li>
    <p>V delším SCSS souboru je náročné najít potřebný selektor, když všechno začíná na <code>&amp;__</code>.</p>
    
    <p>Z tohoto důvodu může být přehlednější bloky moc nezanořovat (maximálně jednu až dvě úrovně) nebo celé názvy selektorů raději vypisovat. Trochu to ale odporuje zásadě DRY (neopakovat kód).</p>
    
    <p>Lepší řešení je spíš rozsekat styly do samostatných komponent v samostatných souborech.</p>    
  </li>
</ol>


<h2 id="mixiny">Mixiny, include a extend</h2>


<h3 id="mixin">Mixin <code>@mixin</code></h3>

<p>Mixin je něco jako funkce. Jde mu zadat nějaké parametry a on podle toho vrátí kód.</p>

<p>Většina příkladů použití <i>mixinu</i> uvádí přidávání <a href="/css-prefixy">CSS prefixů</a> (<code>-webkit-</code>, <code>-moz</code> apod.). To ale není moc rozumné řešení, protože to mnohem elegantněji dokáže vyřešit <a href="https://github.com/postcss/autoprefixer">autoprefixer</a> (plugin k potřebným vlastnostem automaticky přidává prefixy).</p>

<p>Mixin se v praxi může hodit třeba na <a href="/float#after">clearfix</a>.</p>

<p>Docela užitečný může být mixin pro <a href="/animation">animace</a> – třeba pro jednoduchou pulsující animaci, které lze nastavit měřítko:</p>

<pre><code>@mixin pulseAnimation($scale) {
  @keyframes pulseAnimation#{$scale} {
    from {
      transform: scale(1);
    }
    to {
      transform: scale($scale);
    }
  }
  
  animation: infinite .5s alternate pulseAnimation#{$scale};
}
</code></pre>














<p>Při použití se vygenerují potřebné <code>@keyframes</code> + CSS vlastnost <code>animation</code>. Pro vložení mixinu slouží příkaz <code>@include</code>.</p>

<pre><code>.block {
  @include pulseAnimation(2);
}</code></pre>








<p>Výsledkem bude pulsující animace od měřítka 1 do měřítka 2 – <a href="http://kod.djpw.cz/cnhc">živá ukázka</a>.</p>

<p>Obecně se mixiny hodí hlavně pro <b>automatické generování parametrizovaného kódu</b>.</p>



<h3 id="extend">Rozšiřování <code>@extend</code></h3>

<p>Používat <code>@extend</code> jde s běžnými selektory. Funguje to tak, že např. třída, ve které se použije <code>@extend</code>, se přidá k selektoru třídy za <code>@extend</code>:</p>

<pre><code>.prvni-trida {
  color: red;
}

.druha-trida {
  <b>@extend .prvni-trida</b>;
}</code></pre>













<p>Výstupem bude:</p>

<pre><code>.prvni-trida, <b>.druha-trida</b> {
  color: red;
}</code></pre>







<p>Tedy místo zkopírování celého kódu jako u <i>mixinů</i> se pouze zkopíruje selektor.</p>

<p>V praxi je <code>@extend</code> ale celkem problematický.</p>

<ol>
  <li>
    <p>Může být na první pohled lákavé si extendovat celé bloky kódu a potom některé vlastnosti přebíjet. Vzhledem k tomu, že <code>@extend</code>y jdou do sebe zanořovat, může tento postup vést k velkému chaosu.</p>
  </li>  
  <li>
    <p>Extendování selektorů <b>nejde použít</b> uvnitř <code>@media</code> bloku.</p>
  </li>
  <li>Na první pohled se může zdát dobré, že ty samé bloky v kódu nemusí být vícekrát. S tím si ale celkem <b>poradí GZIP komprese</b>, která opakující se kód dost datově zmenší.</li>
</ol>



<p>Z těchto důvodů je tedy lepší <code>@extend</code> nepoužívat a vystačit si s <code>@include</code>.</p>

<p>Nebo k elementům v HTML přiřazovat klidně více tříd. Tj. nepoužít <code>@extend</code>, ale místo toho:</p>

<pre><code>&lt;div class="prvni-trida druha-trida">
  …
&lt;/div></code></pre>

<p>Co se stane, když se tento postup dotáhne do extrému, popisuje článek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/expressive-css">Expressive CSS</a> – stylování webů (skoro jen) prostřednictvím CSS tříd</li>
  </ul>
</div>

<h3 id="extend-bloku">Extendování <code>%blok</code>u</h3>

<p>Pokud se blok místo CSS selektoru označí procentem, půjde extendovat stejně jako třeba třída, ale nebude mít žádný dostupný selektor:</p>

<pre><code>%blok {
  color: red;
}

.trida {
  @extend %blok;
}</code></pre>












<p>Výstupem bude:</p>

<pre><code>.trida {color: red}</code></pre>



<p>Asi nikdy jsem to nepoužil.</p>




<h3 id="prazdne-deklarace">Prázdné deklarace</h3>

<p>Hezká vlastnost je vypouštění zbytečného kódu z finálního výstupu. Takže z následujícího kódu nic nezbude:</p>

<pre><code>.super-trida {
}</code></pre>



<h2 id="funkce">Vestavěné funkce</h2>

<h3 id="barvy">Barvy</h3>

<p>Hezká vlastnost je schopnost zadávat průhledné barvy v <a href="/rgba"><code>rgba</code></a> bez nutnosti psát v RGBA. Tohle normálně funguje:</p>

<pre><code>background-color: rgba(black, .5);
background-color: rgba(#000, .5);</code></pre>










<p>Další užitečná věc je transformace barev. Třeba ztmavení/zesvětlení barvy o X procent:</p>

<pre><code>.box {
  background: yellow;
  color: blue;
  
  &amp;:hover {
    background: darken(yellow, 5);
    color: darken(blue, 15);
  }
}</code></pre>









<div class="external-content">
  <ul>
    <li><a href="https://sass-lang.com/documentation/functions/color">Sass: Color Functions</a> – popis všech operací s barvami</li>
  </ul>
</div>










<h2 id="cykly">Cykly for, foreach a while</h2>

<p>Vyhnout se opakování kódu jde s využitím cyklů. Asi nejzajímavější je <code>@foreach</code>. Jde tak elegantně vypsat např. různé helper offsety:</p>

<pre><code>$offsets: (
    'small': 20px,
    'medium': 40px,
    'large': 60px
);

@each $offset in $offsets {
  .offset-#{nth($offset, 1)} {
    margin-top: nth($offset, 2);
  }
}</code></pre>

<p>Výsledkem bude:</p>

<pre><code>.offset-small {
  margin-top: 20px;
}

.offset-medium {
  margin-top: 40px;
}

.offset-large {
  margin-top: 60px;
}
</code></pre>

<div class="external-content">
  <ul>
    <li><a href="https://www.sassmeister.com/gist/6c0234de43d8012594e7dccbfc5ae895">Živá ukázka</a> – generování CSS z SCSS ve <code>@foreach</code> cyklu</li>
  </ul>
</div>


<p>Články o pokročilejších využitích těchto technik:</p>

<div class="external-content">
  <ul>
    <li>The Sass Way: <a href="http://thesassway.com/intermediate/if-for-each-while">Sass control directives: @if, @for, @each and @while</a></li>
    <li><a href="https://www.sitepoint.com/using-sass-maps/">Using Sass Maps</a></li>
  </ul>
</div>




















<h2 id="vyzkouset">Vyzkoušet SASS</h2>

<p>Pro okamžité zkoušení SCSS/SASS syntaxe existuje šikovná služba:</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.sassmeister.com">SassMeister</a> – online nástroj kompilující SCSS do CSS</li>
  </ul>
</div>








<h2 id="zacit">Jak začít SASS používat</h2>

<p>Začít SASS používat na projektu vyžaduje určité <b>vstupní nastavení</b>. Je potřeba, aby <i>něco</i> přeložilo SASS/SCSS do CSS, co bude fungovat v prohlížečích.</p>

<p>Možností je hned několik:</p>

<ul>
  <li>příkazová řádka,</li>
  <li>editor,</li>
  <li>externí aplikace</li>
</ul>

<p>Asi nejsnazší řešení je použít aplikaci typu <a href="https://compass.kkbox.com">Compass.app</a>. V ní jde snadno naklikat nový projekt, který bude kompilovat SCSS soubory do CSS. Včetně automatického sledování změn souborů a obnovování změn (hotreload).</p>

<p><img class="border" src="/files/scss/compass-app.png" alt="Vytvoření nového projektu s Compass.app"></p>

<p>Obdobně dokáže fungovat i <a href="/livereload">LiveReload</a>.</p>

<p>Nevýhoda těchto řešení spočívá v tom, že použité řešení není pevně spjato s projektem. Může se tak stát, že různí lidé budou používat různé verse a ze stejných zdrojových SCSS souborů bude vznikat různý výstup.</p>

<p>Další problém je v ne úplně hezkém způsobu deployování (nasazování na server). Většinou je žádoucí produkční CSS <b>zkompilovat až při buildu</b> během nasazování webu, aby zkompilované soubory nebyly versované v repositáři. A k tomu se tyto aplikace moc nehodí.</p>

<p>Versovat kompiláty není dobré, protože při změnách často vznikají konflikty. Zvlášť v případě minifikace.</p>