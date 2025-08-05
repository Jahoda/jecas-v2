---
title: "Vlastní HTML značky"
headline: "Vytváření vlastních HTML značek"
description: "Je možné si kromě standardních HTML tagů vytvořit nějaké vlastní?"
date: "2013-08-29"
last_modification: "2017-04-21"
status: 1
tags: ["hotova-reseni", "html", "html-tagy"]
format: "html"
---

<p>Prohlížeč v podstatě cokoliv začínajícího <code>&lt;</code> a nějakým písmenem považuje za HTML značku.</p>

<ol>
  <li><p>Pokud takovou <b>značku zná a má nějaký speciální význam</b>, převezme její obsah či atributy a na jejím místě zobrazí nějakou svou <i>komponentu</i>.</p>
    <p>Typickým příkladem jsou <b>formulářové prvky</b>, například značka <a href="/input"><code>&lt;input&gt;</code></a>, která vykreslí <span class="live"><input></span>, nebo třeba <a href="/progress">značka <code>&lt;progress&gt;</code></a> vykreslí v podporovaných prohlížečích <i>průběh</i>.</p>
  </li>
  
  <li>Když daná značka žádnou komponentu vykreslovat nemá, což <b>je většina značek</b> (např. <code>&lt;div&gt;</code>, <code>&lt;span&gt;</code>, <code>&lt;h1&gt;</code> apod. nebo i <b>vlastní značky</b>), <b>pouze se vypíše obsah</b> mezi počáteční a koncovou značkou.</li>
</ol>

<p>Známé značky potom mají v prohlížečích před-připravené CSS styly (zhruba <a href="http://www.w3.org/TR/CSS2/sample.html">následující</a>), tudíž třeba <code>&lt;h1&gt;</code> se zobrazí velkým tučným písmem s odsazením. Nic nám ale nebrání <b>známé i neznámé značky dále stylovat</b>.</p>

<h2 id="pouziti">Vlastní značka</h2>

<p>Zapíšeme HTML:</p>

<pre><code>&lt;ctverec barva=modry>&lt;/ctverec></code></pre>

<p>Přidáme trochu CSS:</p>

<pre><code>ctverec {display: block; width: 50px; height: 50px}
ctverec[barva=modry] {background: blue}</code></pre>

<p>A čtverec zapsaný vlastní značkou je na světě:</p>

<div class="live">
  <script>
    /* pro starší než IE 9 */
    // document.createElement("ctverec");
    var znacky = "ctverec obdelnik kruh";
    znacky.replace(/\w+/g, function(znacka){document.createElement(znacka)});
  </script>
  <style>ctverec {display: block; width: 50px; height: 50px}
ctverec[barva=modry] {background: blue}</style>
  <ctverec barva=modry></ctverec>
</div>


<h3 id="specifikace">Co na to specifikace?</h3>

<p>HTML specifikace přímo počítá s vytvářením vlastních značek. Aby nedocházelo ke konfliktu s existujícími značkami, mají mít vlastní tagy v názvu <code>–</code>.</p>

<div class="external-content">
  <ul>
    <li>W3C: <a href="https://www.w3.org/TR/custom-elements/#prod-potentialcustomelementname">Custom elements: valid custom element name</a></li>
  </ul>
</div>

<p>Příklad se značkou <code>&lt;ctverec></code> tedy neodpovídá specifikaci. V praxi nicméně bude fungovat. Jedině hrozí risiko, že někdy v budoucnu vznikne oficiální značka stejného názvu.</p>

<h3 id=ie>Starší prohlížeče</h3>

<p>V IE 8 a starších se normálně neobjeví nic, protože stylovat neznámé značky neumí.</p>

<p>Dá se tomu ale pomoci skriptem:</p>

<pre><code>document.createElement("nazev-znacky");</code></pre>

<p>Popřípadě <i>registrování</i> vlastních značek víc automatisovat.</p>

<pre><code>var znacky = "ctverec obdelnik kruh";
znacky.replace(/\w+/g, function(znacka){document.createElement(znacka)});</code></pre>
<!--
<pre><code>var znacky = ("ctverec,obdelnik,kruh").split(',');
for (var i = 0; i &lt; znacky.length; i++){
    document.createElement(znacky[i]);
}</code></pre>
-->




<h2 id="html5">HTML 5 značky</h2>

<p>Jako vlastní HTML značky se chovají i <a href="/html-kostra#semanticke-znacky">elementy z HTML 5</a> jako <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;article&gt;</code> a podobně, tj. <b>starší prohlížeče je neznají</b> a <b>není možné je stylovat</b>.</p>



<h3>HTML 5 značky v IE 8 a starších</h3>

<p>Stačí použít výše uvedený postup pro vlastní značky i s HTML 5 značkami. A nejspíš skript připojit <a href="/podminene-komentare">podmíněnými komentáři</a> jen pro IE 8 a starší.</p>

<pre><code>&lt;!--[if lte IE 8]>
&lt;script>
var znacky = "article aside audio bb canvas datagrid datalist details dialog eventsource figure figcaption footer header hgroup mark menu meter nav output progress section time video";
znacky.replace(/\w+/g, function(znacka){document.createElement(znacka)});
&lt;/script>
&lt;![endif]--></code></pre>














<h2 id="pouzivat">Používat, nebo ne?</h2>

<p>Z důvodu zmíněné nekompatibility se nabízí otázka, zda vlastní HTML značky nebo <i>neznámé</i> HTML5 značky používat.</p>

<dl>
  <dt>Z pohledu vývojáře</dt>
  <dd><p>Mohou vlastní/HTML5 značky zpřehlednit a zrychlit psaní. Místo <code>&lt;div class=header&gt;</code> stačí napsat <code>&lt;header&gt;</code>.</p></dd>
  
  <dt>Z pohledu návštěvníka</dt>
  <dd><p>Momentálně <b>nenabízejí vlastní značky téměř nic navíc</b>, jen vytváří komplikace uživatelům starších Explorerů, ve kterých je celý web s využitím vlastní značek závislý na JavaScriptu, který navíc ještě zdržuje načítání.</p>
  </dd>
</dl>



<h2 id="odkazy">Odkazy jinam</h2>

<dl>  
  <dt id="html5shiv"><a href="https://github.com/afarkas/html5shiv">HTML5 Shiv</a></dt> 
  <dd><p>Hotové řešení <i>registrující</i> HTML 5 značky pro starší prohlížeče řeší i výchozí CSS a jde <i>hotlinkovat</i>.</p>
    
    <div class="soft">
      <p>Hotlinkování se zrovna v tomto případě ukázalo jako nepraktické, protože URL níže přestala fungovat.</p>
      
      <p>Hromada webů je tak teď kvůli tomu rozbitá v <b>Internet Exploreru 8</b>.</p>
    </div>
    
    <pre><code>&lt;!--[if IE]>
&lt;script src="<del>http://html5shiv.googlecode.com/svn/trunk/html5.js</del>">&lt;/script>
&lt;![endif]--></code></pre>
    
    <p>Připojit vzdáleně HTML5 Shiv je možné například z <a href="https://cdnjs.com/libraries/html5shiv/">CDNJS</a>, ale nejbezpečnější s ohledem do budoucna je použít lokální kopii.</p>
    </dd>
  <dt>Hudba budoucnosti 
    <dd>
      <ul>
        <li><a href="http://www.html5rocks.com/en/tutorials/webcomponents/customelements/">Custom Elements: defining new elements in HTML</a></li>
        <li><a href="http://coding.smashingmagazine.com/2014/03/04/introduction-to-custom-elements/">A Detailed Introduction To Custom Elements</a></li>
        <li><a href="https://hacks.mozilla.org/2014/03/custom-elements-for-custom-applications-web-components-with-mozillas-brick-and-x-tag/">Custom Elements for Custom Applications</a></li>
      </ul>
    </dd> 
</dl>