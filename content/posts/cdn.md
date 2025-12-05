---
title: "K čemu slouží CDN?"
headline: "K čemu slouží CDN?"
description: "Má smysl používat pro připojení CSS a JS souborů CDN?"
date: "2016-01-23"
last_modification: "2016-02-08"
status: 1
tags: ["hosting", "zrychlovani", "cloud"]
format: "html"
---

<p>CDN je zkratka anglického <i lang="en">Content delivery network</i>, česky tedy <b>síť pro doručování obsahu</b>.</p>

<p>V praxi to funguje tak, že požadovaná data nejsou umístěna jen na jednom serveru, ale jsou distribuována na více serverech po světě. Návštěvník, jehož prohlížeč začne požadovat určitý obsah, tak bude připojen na server, který <i>má blíž</i>.</p>

<p>Od získávání dat z blíže umístěného serveru se očekává lepší odezva a vyšší rychlost. Použít CDN je tak zajímavé hlavně pro weby, kam přistupují lidé z celého světa.</p>





<h2 id="zrychleni-odezvy">Zrychlení odezvy</h2>

<p>Takto vypadá odezva tohoto webu z různých částí světa (je hostovaný v ČR). Je vidět, že mimo Evropu a USA není rychlost odezvy ideální.</p>

<p><img src="/files/cdn/rychlost-odezvy.png" alt="Rychlost odezvy stránky" class="border"></p>











<p>Pro testování rychlosti existují hotové nástroje:</p>

<div class="internal-content">
  <ul>
    <li>Nástroje pro kontrolu stránky: <a href="/kontrola-stranky#rychlost">Rychlost a odezva</a></li>
  </ul>
</div>


<h2 id="rozlozeni-zateze">Rozložení zátěže</h2>

<p>Replikování obsahu na více serverů si lépe poradí s nárazovou vyšší návštěvností.</p>





<h2 id="pohodli">Pohodlné použití</h2>

<p>Připojit externí JS/CSS z CDN je nejspíš pohodlnější a rychlejší než stahování, kopírování a začleňování knihoven lokálně do projektu.</p>



<p>Pro rychlé testování se tak připojování skriptů z CDN hodí. Často se skripty z CDN připojují u různých online editorů pro psaní HTML/CSS/JS ukázek typu <a href="https://kod.djpw.cz">kod.djpw.cz</a>.</p>

<p>Prakticky každou známou knihovnu jde najít na CDN. Tvůrci tomu chodí hodně naproti, protože bez nabízení CDN si značná část lidí připojí knihovnu z umístění, které se používá jako ukázka dané knihovny na jejím webu, a při masovém používání to může být problém.</p>


<div class="external-content">
  <ul>
    <li><a href="https://cdnjs.com/libraries">cdnjs</a> – k vyhledání přes 1700 různých knihoven</li>
    <li><a href="https://www.bootstrapcdn.com/">BootstrapCDN</a> – soubory populárního CSS frameworku</li>
    <li><a href="https://code.jquery.com/">jQuery CDN</a> – CDN pro připojení jQuery</li>
  </ul>
</div>



<h2 id="cache">Cacheování obsahu</h2>

<p>Při tvorbě webů se někdy z CDN načítají hotové knihovny třetích stran jako třeba <b>jQuery</b>, CSS framework <a href="/bootstrap-rychlokurs">Bootstrap</a>, různé <a href="/lightbox">lightbox skripty</a> a podobně.</p>



<p>Pro použití cizí knihovny ve vlastním projektu je připojení z CDN často pohodlnější než stahování a kopírování potřebných souborů.</p>



<p><b>Idea kešování</b> je taková, že v případě, kdy by populární knihovny připojovali všichni ze stejné URL pomocí CDN, nemusely by se znovu a znovu stahovat na každém webu, ale už by je obsahovala <i>cache</i> prohlížeče.</p>

<p>Má to bohužel problémy:</p>




<h2 id="problemy">Nevýhody CDN pro CSS/JS</h2>


<h3 id="vypadek">Výpadek CDN</h3>

<p>První nevýhoda je v tom, že při <b>výpadku CDN</b> se web špatně zobrazí (např. se nenačte CSS) nebo bude špatně fungovat (nenačte se JavaScript). Teoreticky může něco adresu z CDN na rozdíl od samotného webu zablokovat. To vede k obtížně vysvětlitelným chybám.</p>

<p>Připojováním externích souborů se zároveň ztíží <b>offline vývoj</b>. Jde-li web/aplikaci vyvíjet na <a href="/localhost">localhostu</a>, při výpadku internetu budou externí soubory logicky chybět.</p>






<h3 id="spojeni">Spojení na další doménu</h3>

<p>V případě, že člověk nemá požadovaný obsah z CDN už nakešovaný, <b>vytváření spojení na novou doménu</b> bude trvat déle než získání souboru ze stejné domény, odkud dorazil HTML kód.</p>



<h3 id="ruzne-verse">Různé verse knihoven</h3>

<p>Napříč weby se používají <b>různé verse CSS/JS knihoven</b>, někdy i hodně staré, které si nikdo moc nedovolí updatovat na novější, protože není jasné, zda by se tím něco nerozbilo. Taktéž stejný soubor jde připojit z různých CDN. Úspora tedy nebude tak výrazná.</p>




<h3 id="bezpecnost">Bezpečnost</h3>

<p>Posledním probléme je <b>bezpečnost</b>. Připojením <code>*.js</code> souboru z cizí CDN se do webu dostane obsah, nad kterým nemá provozovatel kontrolu a může napáchat hodně škody, pokud ho někdo se zlými úmysly nežádoucím způsobem upraví.</p>


<p>Prohlížeče <b>Firefox 43</b>, <b>Chrome 45</b> a <b>Opera 32</b> (<a href="http://caniuse.com/#feat=subresource-integrity">aktuální podpora</a>) zavedly podporu atributu <code>integrity</code>. Ten slouží k uvedení hashe pro ověření integrity obsahu CSS/JS souboru.</p>


<pre><code>&lt;link 
href="https://examplecdn.com/bootstrap.min.css" 
rel="stylesheet" 
<b>integrity</b>="sha256-7s5uDGW3AHqw6xtJmNNtr+OBRJUlgkNJEo78P4b0yRw="
></code></pre>





<p>Prohlížeč v takovém případě musí před aplikováním připojeného CSS/JS spočítat jeho hash a porovnat ho s hodnotou atributu <code>integrity</code>. Pokud se neshodují, skript nebo styl se nesmí provést.</p>

<div class="external-content">
  <ul>
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity">Subresource Integrity</a> – vysvětlení kontroly integrity</li>
  </ul>
</div>

<p>Ačkoliv se tento problém snaží prohlížeče řešit, spousta návštěvníků používá prohlížeče, které tuto ochranu nenabízejí.</p>

<p>Druhá věc je, že dle <a href="http://cs.wikipedia.org/wiki/Dirichletův_princip">principu holubníku</a> musí teoreticky nastat případ, kdy pro různé soubory vyjde stejný hash.</p>


<h3 id="v-prohlicezi">Zahrnutí knihoven do prohlížeče</h3>

<p>Jako řešení by se mohlo zdát zahrnutí známých knihoven přímo do prohlížeče. Takové potenciální risiko ale výrobci prohlížečů nejspíš těžko podstoupí.</p>

<p>Myšlenku jednoho společného skriptu pro více webů ale razí <a href="/amp-html">AMP HTML</a>, kde je přímo vyžadováno připojení skriptu z dané CDN.</p>

<p>Pravděpodobnější scénář, který podporuje i vývoj v poslední letech, je zahrnutí vychytávek z populárních knihoven do HTML/CSS/JS specifikací.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Wikipedie: <a href="http://cs.wikipedia.org/wiki/Content_delivery_network">Content delivery network</a></li>
</ul>