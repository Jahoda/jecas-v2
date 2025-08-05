---
title: "CSS @media queries"
headline: "CSS pravidlo <code>@media</code>"
description: "Pravidlo <code>@media</code> se používá k omezení platnosti CSS jen za určitých podmínek."
date: "2014-10-14"
last_modification: "2015-12-17"
status: 1
tags: ["css", "css-pravidla", "responsive"]
format: "html"
---

<p>Typický <b>příklad užití</b> vypadá nějak takto:</p>

<pre><code>@media (max-width: 40em) {
  .obsah {
    width: 50%;
  }
}</code></pre>






<p>Kód výše zajistí, že se obsah bloku <code>@media</code> aplikuje jen za podmínky, kdy je maximální šířka (<code>max-width</code>) okna prohlížeče <code>40em</code>.</p>

<p>Do <code>@media</code> bloku se mezi složené závorky zapisují běžné <a href="/css-selektory">CSS selektory</a>, takže v tomto případě bude značka s třídou <code>.obsah</code> při splnění podmínek široká 50 %.</p>

<p>Nejčastěji se pravidlo <code>@media</code> využívá v případě <a href="/responsive">responsivního layoutu</a>, kdy umožňuje stránku upravovat v závislosti na <b>velikosti obrazovky</b> (okna prohlížeče – tzv. <i>viewportu</i>).</p>




<h2 id="media-queries">Media queries</h2>


<p>Kvůli tomu, že se do závorek za <code>@media</code> zadávají <b>dotazy na splnění určitých podmínek</b>, nazývá se tato technologie často anglickým termínem <b lang="en">media queries</b> (doslovný překlad <i>media dotazy</i>).</p>

<p>Další častá označení jsou <i lang="en">conditional rules</i> (podmíněná pravidla) nebo <i lang="en">media rules</i> (media pravidla).</p>



<h2 id="podpora">Podpora</h2>

<p>Základní <code>@media</code> podmínky jsou podporovány od <b>Internet Exploreru 9</b>. Případná nefunkčnost v <b>IE 8</b> nebo jiných starších prohlížečích nemusí moc vadit v případě, že se media queries používají pouze pro přizpůsobení stylu pro <b>mobilní zařízení</b> a styl mimo <code>@media</code> je určen pro desktopové monitory.</p>

<p>Starší <b>IE</b> než <b>8</b> se na mobilech prakticky nepoužívají, takže nepodporování tolik nevadí.</p>




<h2 id="praxe">Použití v praxi</h2>

<p>Velmi častý případ je, že stránka má pro zobrazení na velkém monitoru <b>vícesloupcové rozvržení</b>, které by se na malou obrazovku mobilu nevešlo.</p>

<p>Bude-li rozložení například následující dvousloupcové:</p>

<pre><code>.levy {
  width: 30%;
  float: left;
}
.pravy {
  width: 70%;,
  float: right;
}</code></pre>












<p>Pro užší šířku (<code>40em</code>) se bude hodit sloupce přeskládat pod sebe. Toho se docílí třeba nastavením 100% šířky:</p>

<pre><code>@media (max-width: 40em) {
  .levy, .pravy {
    width: 100%;
  }
}</code></pre>




<p><a href="http://kod.djpw.cz/txob">Samostatná živá ukázka</a></p>



<p>Možný je i obrácený postup, kdy jsou <i>výchozí</i> styly určené pro zobrazení na mobilu a až v <code>@media</code> je doplněno vícesloupcové rozložení.</p>

<pre><code>.levy, .pravy {
  /* společné deklarace */
}</code></pre>






<p>Pro šířku <code>40em</code> a větší se sloupce přeskládají vedle sebe.</p>

<pre><code>@media (min-width: 40em) {
  .levy {
    width: 30%;
    float: left;
  }
  .pravy {
    width: 70%;,
    float: right;
  }
}</code></pre>












<h2 id="breakpointy">Jaké breakpointy zvolit?</h2>

<p>Místa, kde se mají začít aplikovat určitá pravidla, se nazývají <i>break-pointy</i> – body zlomu, kde se díky <code>@media</code> podmínkám mění zobrazení.</p>

<p>Existují 3 postupy, jak <code>@media</code> podmínky používat:</p>

<ol>
  <li>
    <p>Začít od <b>nejmenší šířky</b> mobilních zařízení (cca 320 pixelů). Postupně rozšiřovat okno a ve chvíli, kdy už je prostor značně nevyužitý, přidat podmínku:</p>
    
    <pre><code><code>@media (<b>min-width</b>: <i>XX</i>em) {
}</code></code></pre>
    
      
        

  </li>  
  <li>
    <p>Začít od velikosti, kterou na webu uvidí nejvíce návštěvníků (<a href="/sirka-stranky">Jak široký web udělat?</a>).</p>
    
    <p>Pomocí <code>@media</code> pravidel potom upravovat styly:</p>
    
    <ol>
      <li>
        <p>Směrem <b>dolu</b>:</p>
            <pre><code><code>@media (<b>max-width</b>: <i>XX</i>em) {
}</code></code></pre>
      </li>
      <li>
        <p>Směrem <b>nahoru</b>:</p>
            <pre><code><code>@media (<b>min-width</b>: <i>XX</i>em) {
}</code></code></pre>
      </li>      
    </ol>
  </li>
  
  
  <li>
    <p>Začít od <b>největší šířky</b> a postupně přidávat break-pointy dle omezení maximální šířky:</p>
    
    <pre><code><code>@media (<b>max-width</b>: <i>XX</i>em) {
}</code></code></pre>
  </li>
</ol>


<h3 id="nepodporovane">Nepodporované prohlížeče</h3>

<p>Konkrétní postup se většinou volí s ohledem na prohlížeče neznalé media-queries.</p>


<p>Pokud výchozí styl, který <b>IE 8</b> uvidí, bude pro mobily, ale tento prohlížeč se používá výhradně na desktopu, bude jeho uživatel zbytečně odbyt osekaným vzhledem. Proto by se nabízelo začít běžnou desktopovou velikostí a zobrazení na mobilech mít až <code>@media</code>.</p>



<p>Někdy se tento postup volí záměrně, aby se ve starých prohlížečích nemuselo řešit špatné zobrazení layoutu – zkrátka se tam žádný layout nezobrazí.</p>



<p>Jiná možnost je psát CSS <a href="/mobile-first">mobile-first</a> (nejdříve pro mobily) a nějakým automatisačním nástrojem vyřešit vygenerování desktopového CSS bez <code>@media</code> pravidel pro prohlížeče typu <b>IE 8</b>.</p>


<p>Nakonec je možné podporu <code>@media</code> pro staré prohlížeče vyřešit JavaScriptem. Ten si stránku přeměří, stáhne AJAXem CSS soubor, vypreparuje z něj příslušné styly a aplikuje na stránku.</p>

<p>Nevýhoda je, že staré prohlížeče běží většinou na slabém HW a další JS jim dvakrát nepomůže.</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/scottjehl/Respond">Respond.js</a> – doplnění podpory <code>min-width</code>/<code>max-width</code> media-queries do <b>IE 6–8</b></li>
  </ul>
</div>


<h2 id="em">Proč <code>em</code> jednotky</h2>

<p>Hodnoty v <code>@media</code> podmínkách je dobré zadávat v <code>em</code> jednotkách, protože se dobře vypořádají s případnou změnou velikosti písma.</p>

<p>Pokud by byly v pixelech, při změně výchozí velikosti písma by přestaly prostorově odpovídat.</p>

<p>Breakpointy se nejčastěji vytváří s ohledem na textový obsah. Zvětšení písma v operačním systému nebo v prohlížeči ovlivní výchozí hodnotu, z které se počítají rozměry <code>em</code> v <code>@media</code> pravidlech.</p>




<h3 id="priklad">Příklad</h3>

<p><b>Výchozí velikost písma</b> je typicky <b>16 pixelů</b>. Platí tak tedy, že <code>1em = 16px</code>.</p>

<p>Pokud se sloupce mají přeskládat při šířce 800 px, kdy už má text ve sloupcích příliš málo prostoru, nabízelo by se použít:</p>

<pre><code>@media (max-width: 800px) {
  .levy, .pravy {
    width: 100%;
  }
}</code></pre>





<p>Problém je v tom, že při větší výchozí velikosti písma by to chtělo přeskládat dřív – s ohledem na velikost písma.</p>

<p>Správné zobrazení v momentě před přeskládáním při výchozí velikosti písma:</p>

<p><img src="/files/media/media-px-ok.png" alt="Dvousloupcové rozložení" class="border"></p>













<p>Co ale když se zvětší písmo při <code>@media</code> pravidlech v pixelech?</p>


<p><img src="/files/media/media-px.png" alt="Dvousloupcové rozložení" class="border"></p>


































<p>Pokud by hodnota byla přepočítaná do <code>em</code>, stránka by se ve stejné velikosti okna už dávno přeskládala pod sebe:</p>

<p><img src="/files/media/preskladani.png" alt="Přeskládání pod sebe" class="border"></p>
































<p><a href="http://kod.djpw.cz/slsb-">Ukázka</a> – problematické nastavení break-pointů v pixelech</p>


<h2 id="kam-psat">Kam psát breakpointy</h2>

<p>V počátcích responsivního designu se pomocí <code>@media</code> pravidel často dělil vzhled <b>třemi breakpointy</b> na desktop, tablet a mobil.</p>

<pre><code>/* všechny styly pro desktop */
…
@media (max-width: 960px) {
  /* všechny styly pro tablet */
  …
}
@media (max-width: 480x) {
  /* všechny styly pro mobil */
  …
}</code></pre>











<p>Postupně se od tohoto postupu upustilo, protože <a href="/sirka-stranky">šířka stránky</a> je značně proměnlivá napříč zařízeními a <b>hranice mezi mobilem, tabletem a desktopem nejsou ostré</b>.</p>

<p>Break-pointy se tedy v ideálním případě nepoužívají přesně 3, ale přidávají se v momentě, kdy je to potřeba – když obsah neoptimálně využívá dostupný prostor.</p>

<p>Z tohoto důvodu je nejspíš i přehlednější psát <code>@media</code> podmínky ke každému elementu (komponentě).</p>

<pre><code>/* výchozí styl */
.hlavicka {…}
@media (max-width: 60em) {
  /* styl pro menší šířku */
  .hlavicka {…}
}
@media (max-width: 40em) {
  /* styl pro ještě menší šířku */
  .hlavicka {…}
}</code></pre>












<p>Pomocí CSS preprocesorů je možné používat nějaký jiný zápis bez nutnosti opakovat selektory, který se následně do standardního CSS automaticky přeloží.</p>




<h2 id="element">Podmínky na šířku elementu</h2>

<p>Praktické by bylo, kdyby šlo kromě podmínek zohledňující velikost okna reagovat i na rozměry elementu.</p>

<p>To bohužel není momentálně čistě v CSS možné.</p>




<h2 id="seznam">Všechny <code>@media</code> podmínky</h2>

<p>Byť se <code>@media</code> nejčastěji používá v souvislosti s podmínkou na <b>minimální nebo maximální šířku</b>, existuje celá řada dalších pravidel, která jsou <b>různě podporována v prohlížečích</b>.</p>




<h3 id="typy">Media typy</h3>

<p>Dřívější návrhy CSS specifikace počítaly s různými typy <code>@media</code> pravidel vázanými na konkrétní <b>typ koncového zařízení</b> – typicky obrazovka, tisk, televise, projektor a podobně.</p>

<p>Aktuálně se ve specifikaci nachází a v praxi používá:</p>

<dl>
  <dt id="all"><code>all</code></dt>
  <dd>
    <p>Pro všechna zařízení.</p>
  </dd>  
  
  <dt id="screen"><code>screen</code></dt>
  <dd>
    <p>Pro všechny obrazovky.</p>
  </dd>
  
  <dt id="print"><code>print</code></dt>
  <dd>
    <p>Pro vytvoření <a href="/tisk">tiskového stylu</a>:</p>
    
    <pre><code>@media print {
  * {color: black; background: #fff}
}</code></pre>
  </dd>  
  
  <dt id="speech"><code>speech</code></dt>
  <dd>
    <p>Hlasové čtečky.</p>
  </dd>
</dl>


<p>Ve starší CSS 2.1 specifikaci se nacházely ještě následující typy, které jsou nyní zavržené: <code>tty</code>, <code>tv</code>, <code>projection</code>, <code>handheld</code>, <code>braille</code>, <code>embossed</code>, <code>aural</code></p>




<h3 id="vlastnosti">Media vlastnosti</h3>

<p>Protože <b>odlišovat styly podle typu zařízení</b> je podobně nešikovné kvůli přílišné obecnosti jako odlišování podle <b>názvu prohlížeče</b>, byly vymyšleny tzv. media vlastnosti.</p>

<p>Pro podmínku (ne)aplikování stylu tak jde použít jednotlivé vlastnosti zařízení; řada věcí není moc dobře podporovaná:</p>

<table>
  <thead>
    <tr>
      <th>Název</th>
      <th>Význam</th>
    </tr>
  </thead>
  <tbody>
    <tr id="width"><td><code>width</code></td>
      <td>Šířka viewportu</td>
    </tr>
    <tr id="height"><td><code>height</code></td>
      <td>Výška viewportu</td>
    </tr>
    <tr id="aspect-ratio"><td><code>aspect-ratio</code></td>
      <td>Poměr výšky a šířky</td>
    </tr>
    <tr id="orientation"><td><code>orientation</code></td>
      <td>Orientace zařízení, existují dvě hodnoty:
      <ul>
        <li><code>portrait</code> – na výšku</li>
        <li><code>landscape</code> – na šířku</li>
      </ul></td>
    </tr>
    <tr id="resolution"><td><code>resolution</code></td>
      <td>Hustota pixelů daného zařízení. Typicky uváděné v jednotkách <code>dpi</code>.</td>
    </tr>
    <tr id="scan"><td><code>scan</code></td>
      <td>Způsob zobrazování například na TV (<code>interlace</code>/<code>progressive</code>).</td>
    </tr>
    <tr id="grid"><td><code>grid</code></td>
      <td>Detekce primitivních displejů, co zobrazují pouze v mřížce.</td>
    </tr>
    <tr id="update-frequency"><td><code>update-frequency</code></td>
      <td>Obnovovací frekvence zařízení (<code>none</code>, <code>slow</code>, <code>normal</code>).</td>
    </tr>
    <tr id="overflow-block"><td><code>overflow-block</code></td>
      <td>Co udělá zařízení s blokem, který se dostane mimo viewport (<code>none</code>, <code>scroll</code>, <code>optional-paged</code>, <code>page</code>).</td>
    </tr>
    <tr id="overflow-inline"><td><code>overflow-inline</code></td>
      <td>Půjde řádek, který přeteče z viewportu doscrollovat (<code>none</code>, <code>scroll</code>).</td>
    </tr>
    <tr id="color"><td><code>color</code></td>
      <td>Počet bitů barev, které zvládá cílové zařízení.</td>
    </tr>
    <tr id="color-index"><td><code>color-index</code></td>
      <td>Počet barev, které zvládá cílové zařízení.</td>
    </tr>
    <tr id="monochrome"><td><code>monochrome</code></td>
      <td>Detekce černobílé obrazovky.</td>
    </tr>
    <tr id="inverted-colors"><td><code>inverted-colors</code></td>
      <td>Detekce invertovaných barev (<code>none</code>/<code>inverted</code>).</td>
    </tr>
    <tr id="pointer"><td><code>pointer</code></td>
      <td>Je primární vstupní zařízení <i>ukazatel</i> (myš, prst) a jak je přesný (<code>none</code>, <code>coarse</code> – nepřesný, <code>fine</code> – přesný).</td>
    </tr>
    <tr id="hover"><td><code>hover</code></td>
      <td>Umí primární vstupní zařízení vytvořit <code>hover</code> (<code>none</code> – neumí, <code>on-demand</code> – je to trochu komplikovanější, např. delší podržení prstu na mobilech, <code>hover</code> – v pořádku, např. myš).</td>
    </tr>
    <tr id="any-pointer"><td><a href="/media-any#pointer"><code>any-pointer</code></a></td>
      <td>Je k disposici alespoň nějaký ukazatel a jak je přesný.</td>
    </tr>
    <tr id="any-hover"><td><a href="/media-any#hover"><code>any-hover</code></a></td>
      <td>Existuje alespoň nějaká možnost, jak vyvolat hover.</td>
    </tr>
    <tr id="light-level"><td><code>light-level</code></td>
      <td>Intensita okolního světla (hodnoty <code>dim</code>, <code>normal</code> a <code>washed</code>).</td>
    </tr>
    <tr id="scripting"><td><code>scripting</code></td>
      <td>Podpora JavaScriptu.</td>
    </tr>
    <tr id=""><td><code>device-width</code></td>
      <td>(Zavržené)</td>
    </tr>
    <tr id=""><td><code>device-height</code></td>
      <td>(Zavržené)</td>
    </tr>
    <tr id=""><td><code>device-aspect-ratio</code></td>
      <td>(Zavržené)</td>
    </tr>
    <tr>
      <td><code>-webkit-transform-3d</code></td>
      <td>
        Podpora 3D transformací.
      </td>
    </tr>
    <tr>
      <td><code>-webkit-transform-2d</code></td>
      <td>
        Podpora 2D transformací.
      </td>
    </tr>
    <tr>
      <td><code>-webkit-transition</code></td>
      <td>
        Podpora <a href="/transition"><code>transition</code></a>.
      </td>
    </tr>
    <tr>
      <td><code>-webkit-animation</code></td>
      <td>
        Podpora animací přes CSS vlastnost <a href="/animation"><code>animation</code></a>.
      </td>
    </tr>
  </tbody>
</table>



<h2 id="spojovani">Spojování <code>@media</code> pravidel</h2>

<p>V některých případech je potřeba pravidla spojovat. Ve smyslu logických operátorů <code>and</code> a <code>or</code>.</p>


<h3 id="and">And</h3>

<p>Musí platit obě podmínky:</p>

<pre><code>@media 
  (min-width: 20em) and (max-width: 30em) {
  /* Aplikuje se jen při šířce 20–30em */
}</code></pre>






<h3 id="or">Or</h3>

<p>Pro vyznačení <i>nebo</i> se <b>nepoužívá</b> klíčové slovo <code>or</code>, ale pravidla se oddělují čárkou:</p>

<pre><code>@media 
  (min-width: 30em) and (max-width: 40em),
  (max-width: 20em) {
  /* Aplikuje se jen při šířce 30–40em nebo do šířky 20 em */
}</code></pre>




<p>Tento zápis se v praxi hodí v případě, kdy při nějaké šířce například zmizí široký sloupec, čímž se uvolní místo v hlavním obsahu.</p>

<div class="external-content">
  <ul>
    <li>StackOverflow: <a href="http://stackoverflow.com/questions/11404744/media-queries-max-width-or-max-height">Media queries: max-width OR max-height</a></li>
  </ul>
</div>

<p>V <b>IE 9</b> až <b><a href="/ie11">IE 11</a></b> nastává zajímavá věc při spojení <code>@media (min-width: 9999px) and (min-width: 0)</code>, pravidla se totiž aplikují:</p>

<div class="external-content">
  <ul>
      <li><a href="http://kod.djpw.cz/xurb">Živá ukázka</a> – chyba <code>and</code> v <b>Internet Exploreru</b></li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS Tricks: <a href="https://css-tricks.com/the-at-rules-of-css/">The At-Rules of CSS</a></li>
  
  <li>Vzhůru dolů: <a href="http://www.vzhurudolu.cz/prirucka/css3-media-queries">CSS3 Media Queries – podmíněné zobrazení pro média</a></li>
  
  <li>DevDocs: <a href="http://devdocs.io/css/@media"><code>@media</code></a></li>

</ul>