---
title: "Font ikony"
headline: "Font ikony"
description: "Ikony tvořené fontem. Proč je nepoužívat a čím je nahradit."
date: "2014-01-10"
last_modification: "2015-12-04"
status: 1
tags: ["ikony", "pisma", "typografie"]
format: "html"
---

<p>Při používání ikon ve webové aplikaci je dobré, když jde ikonky pohodlně:</p>

<ol>
  <li>zvětšovat a zmenšovat bez ztráty ostrosti,</li>
  <li>přebarvovat</li>
</ol>

<p>Font ikony dokáží oboje.</p>



<h2 id="jak">Jak fungují</h2>

<p>Technicky se jedná o zvláštní druh webového písma připojeného pomocí <a href="/font-face"><code>@font-face</code></a>. Místo toho, aby v něm byly definovány normální znaky z abecedy, obsahuje grafické symboly pro běžně nepoužívané znaky, které tak nahradí ikonami.</p>

<p>Bez načtení ikonového fontu se tak typicky zobrazují jen čtverečky . Je to vidět na následujícím obrázku s a bez načteného fontu pro ikony.</p>

<p><img src="/files/font-ikony/ikonky.png" alt="Zobrazení s a bez obrázků" class="border"></p>
















<p>Aby <i>čtverečky</i> nestrašily v HTML kódu, zpravidla se do něj dává pouze prázdný element typu:</p>

<pre><code>&lt;i class="el-icon-info-sign">&lt;/i></code></pre>



<p>(Používat pro font-ikony značku <code>&lt;i></code> je jen rozšířená konvence. Může to být jinak libovolný element, třeba neutrální <code>&lt;span></code>.)</p>

<p>Symboly nahrazené ikonou se potom přidávají přes CSS vlastnost <code>content</code> pro pseudo-elementy <a href="/content-attr"><code>:before</code>/<code>:after</code></a>:</p>

<pre><code>.el-icon-info-sign {
  font-family: "Název font-ikon";
}
.el-icon-info-sign:before {
  content: "\e699";
}</code></pre>







<h2 id="podpora">Podpora</h2>

<p>Font-ikony jde používat ve všech prohlížečích podporujících webové fonty.</p>

<p>To je třeba už <b>IE 6</b> (při použití formátu EOT). Prohlížeče mimo <b>Internet Explorer</b> potom podporují například formát WOFF.</p>


<h3 id="mobily">Mobilní zařízení</h3>

<p>Webové fonty a tedy i ikony tvořené fonty vůbec nefungují v mobilním prohlížeči <b>Opera Mini</b>. Dále nefungují v <b>mobilních Internet Explorerech 9</b> a starších – <b>IE 9 mobile</b> je ve Windows Phone 7 zařízeních, která není možné upgradovat.</p>

<p>Obecně do starých mobilů zpravidla nejde dostat lepší prohlížeč než <b>Operu Mini</b>.</p>

<p>Ukázka zobrazení v mobilních prohlížečích bez a s podporou webfontů/font-ikon. Vlevo <b>Opera Mini</b>, vpravo <a href="/edge-mobile"><b>Edge Mobile</b></a>:</p>

<p><img src="/files/font-ikony/opera-edge.png" alt="Zobrazení s a bez obrázků" class="border"></p>



















































<p>Zápis fontů přes CSS pseudo-elementy <a href="/css-selektory#before-after"><code>:before</code>/<code>:after</code></a> potom limituje funkčnost na <b>IE 8+</b>.</p>



<h2 id="nevyhody">Nevýhody</h2>


<p>Velká nevýhoda je nefunkčnost v aktuálním prohlížeči <b>Opera Mini 8</b> i starších, které jsou v mobilech dost používané. Zobrazí se v nich místo ikon jen čtverečky.</p>



<h3 id="workaround">Font ikony jsou <i lang="en">workaround</i></h3>

<p>Další nevýhody plynou z toho, že:</p>

<blockquote>
  <p>Používání webfontů pro ikony je od počátku dočasné řešení.</p>
</blockquote>



<p>Některé nástroje pro <b>blokování nepotřebného obsahu</b> (reklamy, měřicí kódy, sociální pluginy od Facebooku apod.) mohou blokovat i webová písma.</p>

<p>Případně může mít návštěvník nastavený ve svém <i>user CSS</i> své vlastní písmo, kterým přepíše deklarace font-ikon. To může být případ například dyslektiků, kteří používají specifický font pro snazší čtení:</p>


<p><img src="/files/font-ikony/dyslexie.png" alt="OpenDyslexic" class="border"></p>































<p>V některých případech se při nenačtení fontu s ikonami mohou místo čtverečků zobrazit nežádoucí symboly <a href="/emoji">Emoji</a>.</p>


<p><img src="/files/font-ikony/emoji.png" alt="Zobrazení emji místo hvězdičky" class="border"></p>








<p id="jim">Případně se do načtení může zobrazovat něco jiného, než by mělo, jak ilustruje příklad od <b>Jima</b>:</p>

<blockquote>
  <p>Dostal jsem jeden takový custom font k nasazení. 4 ikonky v kroužkách pod logem (mobilní verse). Krásně jsem to naaranžoval a spokojeně pušnul. Druhej den přišel screen vod šéfa, kterej to testoval na pomalém připojení. Než se font načetl, byla v kroužkách postupně písmena P, I, C a A přesně v tomto pořadí...</p>
</blockquote>


<p>Další negativum je omezení na jedinou barvu, kterou ikonka může mít. Kvůli tomu musí být font-ikona plochá.</p>

<p>Podobu ikonky, protože se jedná o text, ovlivňuje hromada vlastností jako velikost písma, výška řádku, zarovnání na řádku a spoustu dalších vlastností. Kvůli tomu je obtížnější používat font-ikony s přesností na pixel.</p>

<p>Proč nepoužívat font-ikony shrnuje následující presentace:</p>

<div class="external-content">
  <ul>
    <li>Seren Davies: <a href="https://speakerdeck.com/ninjanails/death-to-icon-fonts">Death to Icon Fonts</a></li> 
  </ul>
</div>


<h3 id="vytvoreni">Vytvoření font-ikon</h3>

<p>Komplikovanější je i <b>výroba vlastního fontu</b> s potřebnými ikonkami oproti prostému vygenerování obrázků.</p>

<p>Při používání hotových sad <i>icon-fontů</i> se potom typicky stahují i nepoužívané ikony (jednak deklarace v CSS, jednak samotný font s ikonami). Je samozřejmě možné si vytvořit vlastní font, kde budou jen potřebné ikony, ale může to být pracné / hůře automatisovatelné.</p>


<div class="external-content">
  <ul>
    <li><a href="https://icomoon.io">Icomoon</a> – procházení ikon a generování vlastních sad</li>
    <li><a href="http://fontastic.me/">Fontastic</a> – nástroj pro generování vlastní font-ikon</li>
  </ul>
</div>



<h3 id="poskakovani">Poskakování během načítání</h3>

<p>Symboly ikon z fontu mají často jiný rozměr než <i>čtvereček</i>, který je na stránce do doby načtení font-ikon.</p>

<p>Po načtení fontu se tak typicky změní velikost ikony a stránka lehce poskočí.</p>

<p>Prohlížeče na stažení fontu pro ikony nejčastěji chvíli čekají (cca 3 vteřiny). Po tuto dobu se <i>text</i> ikon nezobrazuje. Při dlouhém načítání se tak mohou návštěvníkovi objevit čtverečky.</p>

<p>Kliknutím na obrázek se přepne podoba GitHubu mezi podobami bez a s font-ikonkami:</p>

<div class="live no-source live--toggle-image">
  <img src="/files/font-ikony/github-bez.png" data-src="/files/font-ikony/github-s.png" alt="Github bez ikonek" onclick="var prohodit = this.getAttribute('data-src'); this.setAttribute('data-src', this.src); this.src = prohodit; return false">
</div>











<h3 id="hlasove-ctecky">Přístupnost a hlasové čtečky</h3>

<p>Další problém je s tím, že hlasová čtečka v případě použití zvláštního symbolu, který se díky fontu nahradí ikonou, může chtít tento znak přečíst – považuje ho za text.</p>

<p>Některé ikon fonty to řeší CSS konstrukcí: <code>speak: none</code>. Pro bezproblémové chování v nejrůznějších čtečkách je lepší použít ještě <a href="/aria#hidden">aria atribut <code>hidden</code></a>.</p>

<p>Přístupností font ikon se zabývá následující článek:</p>

<div class="external-content">
  <ul>  <li><a href="https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html">Bulletproof Accessible Icon Fonts</a> – font-ikony s ohledem na přístupnost</li></ul>
</div>





<h2 id="svg-ikony">SVG ikony</h2>

<p>Nejlepším postupem, jak v dnešní době řešit ikony, se zdá být <a href="/svg">SVG</a>. Stejně jako font-ikony se dokáže zvětšovat/zmenšovat bez ztráty kvality i jde snadno přebarvovat.</p>

<p>Dokonce jde samostatně stylovat jednotlivé části ikony. SVG ikony je navíc možné i animovat.</p>

<p>Nakonec použití SVG nevypadá jako zneužití technologie pro jiný účel, než pro který byla navržena.</p>

<p>Kritické SVG ikony jde případně vložit přímo do HTML kódu stránky, čímž se prakticky zaručí jejich načtení.</p>


<p>Font-ikony se tak nabízí použít spíš jako fallback pro prohlížeče nepodporující SVG – <b>IE 8</b> a starší nebo <b>Android Browseru 2.3</b>. I když je otázka, jestli se takové prohlížeče nespokojí jen s PNG fallbackem a font-ikony tak <b>nemá vůbec smysl používat</b>.</p>





<h2 id="vyhody">Výhody font-ikon oproti SVG</h2>


<p>V závislosti na použitém <i lang="en">workflow</i> (pracovním postupu) může být nasazení font-ikon jednodušší. Pro použití stačí připojit jeden CSS soubor a už jde ikony přidávat do HTML.</p>

<h3 id="pocet-spojeni">Spojení HTTP požadavků</h3>

<p>Pokud se nepoužívá protokol HTTP/2 nebo ho prohlížeč nepodporuje, zabalení všech ikon do souboru s fontem elegantně řeší snížení počtu HTTP požadavků a zrychluje načítání.</p>




<h3 id="prebarveni">Přebarvení ikon</h3>

<p>Aby <b>SVG ikony</b> šlo pohodlně přebarvit v CSS ve všech prohlížečích, musí být jejich obsah vložený v HTML kódu. To znamená:</p>

<ol>
  <li><p>Vypsat obsah SVG souborů při generování HTML. Tento postup zabrání uložení ikonek do cache a bude zdržovat načtení samotného obsahu.</p></li>
  
  <li><p>Načítat SVG ikony <a href="/ajax">AJAXem</a> a vkládat je do HTML kódu JavaScriptem. Ikonky budou kešovatelné. Nebudou ale fungovat <a href="/bez-javascriptu">bez JS</a>.</p></li>
</ol>


<p>Není-li potřeba SVG ikony přebarvovat, jde je zapsat do CSS souboru přes <code>background-image: url(ikona.svg)</code>. Pro snížení počtu HTTP spojení potom vložit do zvláštního CSS přes <a href="/data-uri">data URI</a> nebo z nich klasicky vytvořit <a href="/css-sprite">CSS sprite</a>.</p>

<p>Přebarvitelné a kešovatelné SVG ikonky funkční bez JavaScriptu nejde vytvořit pro <b>Internet Explorer</b>. V tomto specifickém případu font-ikony nad SVG vítězí.</p>




<h2 id="sady-ikon">Hotové sady ikon</h2>

<p>Řada původně font-ikon je už dostupná i v SVG.</p>

<ul>
  <li><a href="http://elusiveicons.com/">Elusive Icons</a> – 299 ikon</li>
  <li><a href="http://glyphicons.com/">Glyphicons</a> – zdarma 470 ikon a 50 ikon sociálních sítí</li>
  <li><a href="http://fontawesome.io/icons/">Font Awesome</a> – 369 ikon, zdarma i pro komerční použití. Plně kompatibilní s frameworkem Bootstrap.</li>
  <li><a href="http://freebiesbug.com/psd-freebies/150-free-outlined-icons-psd-ai-svg-webfont/">Freebie</a> – 150 ikon</li>
  <li><a href="http://mariodelvalle.github.io/CaptainIconWeb/">Captain Icon</a> – 350+ ikon v kresleném stylu</li>
  <li><a href="http://colebemis.com/feather/">Feather</a> – 130 ikon</li>
  <li><a href="http://elusiveicons.com/">Payment Webfont</a> – 34 ikon/obrázků pro platební služby</li>
  <li><a href="https://themify.me/themify-icons">Themify Icons</a> – 320+ ikon</li>
  
  <li><a href="http://www.entypo.com/">Entypo</a> – 411 ikon</li>
  
  <li><a href="http://typicons.com/">Typicons</a> – 336 ikon</li>
</ul>

  
<p>Souhrnné články s tipy na hotové font-ikony:</p>

<ul>
  <li><a href="http://www.webresourcesdepot.com/10-best-free-icon-webfonts/">10 Absolute Best Free Icon Webfonts</a></li>
  <li><a href="http://speckyboy.com/2014/05/14/more-free-icon-fonts/">Top 50 Free Icon Fonts for Web Design</a></li>
  <li><a href="https://scotch.io/bar-talk/11-great-icon-fonts-for-your-projects">11 Great Icon Fonts for Your Projects</a></li>
</ul>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS tricks: <a href="http://css-tricks.com/icon-fonts-vs-svg/">Font ikony vs. SVG</a> (anglicky)</li>
  <li><a href="http://snook.ca/archives/html_and_css/icons-and-type">Icons and Type</a> – zarovnání ikony na řádku</li>
  <li><a href="http://webdesign.tutsplus.com/articles/new-course-mastering-icon-fonts-on-the-web--cms-23817">New Course: Mastering Icon Fonts on the Web</a></li>
  <li>Six Revisions: <a href="http://sixrevisions.com/tools/icon-font-generators/">6 Free Tools for Creating Your Own Icon Font</a></li>
</ul>