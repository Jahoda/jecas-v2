---
title: "Font"
headline: "Font"
description: "CSS vlastnost <code>font</code> slouží k nastavení písma na stránce."
date: "2014-05-07"
last_modification: "2015-01-17"
status: 1
tags: ["css", "css-vlastnosti", "pisma", "typografie"]
format: "html"
---

<p>Jedná se o zkratku pro mnoho další <code>font-*</code> vlastností.</p>

<p>Minimální funkční použití vyžaduje uvést <b>velikost písma</b> (<code>font-size</code>) a <b>rodinu písma</b> (použitý font – <code>font-family</code>):</p>

<pre><code>body {
  font: 100% sans-serif;
}</code></pre>





<h2 id="style"><code>font-style</code></h2>

<p>Styl písma:</p>

<ul>
  <li><code>font-style: normal</code> – výchozí písmo</li>
  
  <li><code>font-style: italic</code> – <font style="font-style: italic">kursiva</font></li>
  
  <li><code>font-style: oblique</code> – <font style="font-style: oblique">zkosené písmo, vypadá většinou stejně jako kursiva</font></li>
</ul>



<h2 id="variant"><code>font-variant</code></h2>

<p>Ve starší specifikaci CSS umí <code>font-variant</code> pouze nastavit typ písma na <b>kapitálky</b>.</p>

<ul>
  <li><code>font-variant: normal</code> – výchozí písmo</li>
  
  <li><code>font-variant: small-caps</code> – <font style="font-variant: small-caps">malá velká písmena</font></li>
</ul>

<p>(Pro <b>převod</b> textu na malá/velká písmena slouží vlastnost <code>text-transform</code>.)</p>

<p>V novější specifikaci je <code>font-variant</code> <b>zkratka</b> pro další CSS vlastnosti.</p>

<ul>
  <li><code>font-variant-caps</code></li>
  <li><code>font-variant-numeric</code></li>
  <li><code>font-variant-alternates</code></li>
  <li><code>font-variant-ligatures</code></li>
  <li><code>font-variant-east-asian</code></li>
</ul>

<p>Některé z těchto vlastností jde používat pomocí <a href="/font-feature-settings"><code>font-feature-settings</code></a>.</p>



<h2 id="weight"><code>font-weight</code></h2>

<p>Upravuje sílu (<b>tučnost</b>).</p>

<ul>
  <li>
    <code>font-weight: normal</code> – normální tloušťka
  </li>
  
  <li>
    <code>font-weight: bold</code> – <font style="font-weight: bold">tučné písmo</font>
  </li>
</ul>

<p>Kromě toho existuje možnost nastavit <b>sílu písma</b> na hodnoty z rozmezí <code>100</code>–<code>900</code>. Výsledek potom hodně záleží na konkrétním písmu a prohlížeči.</p>

<ul id="sila">
  <li><code>font-weight: 100</code> – <font style="font-weight: 100">ukázka síly 100</font></li>
  <li><code>font-weight: 200</code> – <font style="font-weight: 200">ukázka síly 200</font></li>
  <li><code>font-weight: 300</code> – <font style="font-weight: 300">ukázka síly 300</font></li>
  <li><code>font-weight: 400</code> – <font style="font-weight: 400">ukázka síly 400</font> (odpovídá hodnotě <code>normal</code>)</li>
  <li><code>font-weight: 500</code> – <font style="font-weight: 500">ukázka síly 500</font></li>
  <li><code>font-weight: 600</code> – <font style="font-weight: 600">ukázka síly 600</font></li>
  <li><code>font-weight: 700</code> – <font style="font-weight: 700">ukázka síly 700</font> (odpovídá hodnotě <code>bold</code>)</li>
  <li><code>font-weight: 800</code> – <font style="font-weight: 800">ukázka síly 800</font></li>
  <li><code>font-weight: 900</code> – <font style="font-weight: 900">ukázka síly 900</font></li>  
</ul>

<script>function nastavitPismo(nazev){
  sila.style.fontFamily = nazev;
}</script>

<datalist id="pisma">
  <option value="Verdana">
  </option><option value="Arial">
  </option><option value="Tahoma">
  </option><option value="Segoe UI">
  </option><option value="Times New Roman">
  </option>
</datalist>

<p><label>Nastavit ukázku na písmo: <input list="pisma" oninput="nastavitPismo(this.value)"></label></p>


<p>Pokud daný font <i>umí</i> pouze normální písmo a tučné, bude cokoliv z rozsahu <code>100</code>–<code>500</code> normální a z <code>600</code>–<code>900</code> tučné.</p>

<p>Nakonec potom existují ještě hodnoty <code>bolder</code> a <code>lighter</code>. Jelikož se <b>síla písma dědí</b>, lze u potomka vytvořit písmo o jeden stupeň silnější/slabší.</p>

<ul>
  <li><code>font-weight: lighter</code></li>
  <li><code>font-weight: bolder</code></li>  
</ul>

<p>Jelikož většina písem má pouze dva stupně tučnosti, nemají klíčová slova <code>lighter</code> a <code>bolder</code> přílišné využití.</p>

<p><a href="https://kod.djpw.cz/wnjb">Test hodnot</a> <code>bolder</code> a <code>lighter</code></p>


<h2 id="size"><code>font-size</code></h2>

<h3 id="absolutni">Absolutními klíčovými slovy</h3>

<ul>
  <li><code>font-size: xx-small</code> – <font style="font-size: xx-small">ukázka velikosti <code>xx-small</code></font></li>
  <li><code>font-size: x-small</code> – <font style="font-size: x-small">ukázka velikosti <code>x-small</code></font></li>
  <li><code>font-size: small</code> – <font style="font-size: small">ukázka velikosti <code>small</code></font></li>
  <li><code>font-size: medium</code> – <font style="font-size: medium">ukázka velikosti <code>medium</code></font></li>
  <li><code>font-size: large</code> – <font style="font-size: large">ukázka velikosti <code>large</code></font></li>
  <li><code>font-size: x-large</code> – <font style="font-size: x-large">ukázka velikosti <code>x-large</code></font></li>
  <li><code>font-size: xx-large</code> – <font style="font-size: xx-large">ukázka velikosti <code>xx-large</code></font></li>  
</ul>


<h3 id="relativni">Relativními klíčovými slovy</h3>

<p>Písmo bude o stupeň větší/menší než velikost rodiče.</p>

<ul>
  <li><code>font-size: larger</code> – <font style="font-size: larger">ukázka velikosti <code>larger</code></font></li>
  <li><code>font-size: smaller</code> – <font style="font-size: smaller">ukázka velikosti <code>smaller</code></font></li>  
</ul>



<h3 id="jednotky">Délkovými jednotkami</h3>

<p>Velikost se nastaví standardními CSS délkovými jednotkami (<code>em</code>, <code>px</code> a podobně).</p>

<pre><code>font-size: 1em;</code></pre>


<h3 id="procenta">Procenty</h3>

<p>Písmo bude dvakrát větší než velikost rodiče.</p>

<pre><code>font-size: 200%;</code></pre>

<p>Při použití procent, relativních délkových jednotek (např. <code>em</code>) nebo <code>larger</code>/<code>smaller</code> jde šikovně využívat <b>dědičnosti</b>, klidně na jednom místě změnit velikost písma celého webu a velikosti jednotlivých částí se tomu přizpůsobí.</p>

<p><a href="https://kod.djpw.cz/ynjb">Živá ukázka</a></p>


<h2 id="line-height"><code>line-height</code></h2>

<p>Když se za velikost písma u zkrácené vlastnosti <code>font</code> napíše lomítko, může se za něj uvést výška řádku.</p>

<pre><code>html {
  font: x-small/<b>300%</b> Arial, serif;
}</code></pre>

<p>Je trochu zvláštní, že pro změnu <b>výšky řádku</b> neslouží <code>font-*</code> vlastnosti, ale <code>line-height</code>.</p>

<p>Výška řádku je hodně důležitá vlastnost s ohledem na <b>dobrou čitelnost</b> textu. Při nastavení <code>line-height</code> společnému obalu stránky (<code>&lt;html></code>/<a href="/stylovani-body"><code>&lt;body></code>/<code>&lt;div class="obal"></code></a>) se snadno stane, že pro <b>velké písmo</b> bude výška řádku malá a pro <b>malá písmena</b> zase moc velká.</p>

<p><a href="https://kod.djpw.cz/bojb">Živá ukázka</a></p>



<p>Je tedy dobré si elementy s větší/menší velikostí písma ohlídat a <b>výšku řádku</b> jim upravit. Snadno se na to zapomene u nadpisů, protože se často vejdnou <b>na jeden řádek</b>, takže se nesprávná výška řádku hned neprojeví.</p>


<h2 id="font-family"><code>font-family</code></h2>

<p>Slouží k nastavení <b>rodiny písem</b> / konkrétního fontu. Zadává se konkrétní název písma (například <code>Arial</code>), obecná rodina (<code>sans-serif</code>) nebo víc položek zároveň.</p>

<p>Protože nikdy není jistota, že konkrétní font bude dané koncové zařízení <b>podporovat</b>, obvykle se uvádí několik konkrétních rozšířených fontů zakončených obecnou rodinou.</p>

<pre><code>h1 {
  font-family: Arial, Helvetica, sans-serif
}</code></pre>




<h3 id="rodiny">Obecné rodiny</h3>

<p>Zpravidla si jde vystačit s <b style="font-family: sans-serif">bezpatkovým</b> (<code>sans-serif</code>), <b style="font-family: serif">patkovým</b> (<code>serif</code>) a <b style="font-family: monospace">neproporcionálním</b> (<code>monospace</code>) písmem.</p>

<ul>
  <li><code>font-family: sans-serif</code> – <font style="font-family: sans-serif">ukázka stylu sans-serif</font></li>
  <li><code>font-family: serif</code> – <font style="font-family: serif">ukázka stylu serif</font></li>
  <li><code>font-family: fantasy</code> – <font style="font-family: fantasy">ukázka stylu fantasy</font></li>
  <li><code>font-family: cursive</code> – <font style="font-family: cursive">ukázka stylu cursive</font></li>
  <li><code>font-family: monospace</code> – <font style="font-family: monospace">ukázka stylu monospace</font></li>  
</ul>


<h3 id="uvozovky">Uvozovky kolem názvu písma</h3>

<p>V některých návodech se uvádí, že víceslovné názvy fontu musí být <b>obaleny <a href="/uvozovky#css">uvozovkami</a></b>. To je pravda jen částečná – uvozovkami musejí být obaleny názvy obsahující <b>čísla a speciální symboly</b>.</p>

<p>Víceslovný název proto bude normálně fungovat i bez uvozovek:</p>

<pre><code>element {
  font-family: Lucida Console, monospace;
}</code></pre>


<div class="external-content">
  <ul>
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-family#Valid_family_names">Valid family names</a> – jaké názvy zadané do <code>font-family</code> jsou platné</li>
  </ul>
</div>



<h2 id="systemova">Systémová písma</h2>

<p>Písmo jde také nastavit podle určitých prvků systému. V tom případě se zadává jediná hodnota, která určí použitý font, velikost, tučnost a podobně.</p>

<p>Je poměrně obtížné najít pro tento způsob <b>rozumné využití</b>, možná při snaze napodobit v prohlížeči <b>systémovou aplikaci</b>.</p>

<ul>
  <li><code>font: caption</code> – <font style="font: caption">ukázka písma</font> <code>caption</code></li>
  <li><code>font: icon</code> – <font style="font: icon">ukázka písma</font> <code>icon</code></li>
  <li><code>font: menu</code> – <font style="font: menu">ukázka písma</font> <code>menu</code></li>
  <li><code>font: message-box</code> – <font style="font: message-box">ukázka písma</font> <code>message-box</code></li>
  <li><code>font: small-caption</code> – <font style="font: small-caption">ukázka písma</font> <code>small-caption</code></li>
  <li><code>font: status-bar</code> – <font style="font: status-bar">ukázka písma</font> <code>status-bar</code></li>  
</ul>


<h3 id="firefox">Další hodnoty ve Firefoxu</h3>
<p>Firefoxu podporuje ještě další hodnoty systémových stylů s <a href="/css-prefixy">prefixem</a>:</p>

<ul>
  <li><code>font: -moz-window</code> – <font style="font: -moz-window">ukázka písma</font> <code>-moz-window</code></li>
  <li><code>font: -moz-document</code> – <font style="font: -moz-document">ukázka písma</font> <code>-moz-document</code></li>
  <li><code>font: -moz-desktop</code> – <font style="font: -moz-desktop">ukázka písma</font> <code>-moz-desktop</code></li>
  <li><code>font: -moz-info</code> – <font style="font: -moz-info">ukázka písma</font> <code>-moz-info</code></li>
  <li><code>font: -moz-dialog</code> – <font style="font: -moz-dialog">ukázka písma</font> <code>-moz-dialog</code></li>
  <li><code>font: -moz-button</code> – <font style="font: -moz-button">ukázka písma</font> <code>-moz-button</code></li>
  <li><code>font: -moz-pull-down-menu</code> – <font style="font: -moz-pull-down-menu">ukázka písma</font> <code>-moz-pull-down-menu</code></li>
  <li><code>font: -moz-list </code> – <font style="font: -moz-list ">ukázka písma</font> <code>-moz-list </code></li>
  <li><code>font: -moz-field</code> – <font style="font: -moz-field">ukázka písma</font> <code>-moz-field</code></li>  
</ul>



<h2 id="font-html">Styl písma v HTML</h2>

<p>Před příchodem CSS se velikost, font a barva písma upravovaly prostřednictvím značek <code>&lt;font></code> a <code>&lt;basefont></code>:</p>


<h3 id="font"><code>&lt;font></code></h3>

<p>Řádková značka pro změnu stylu textu přímo v HTML. Tento způsob nastavování písma, ačkoliv není doporučený, stále dobře funguje napříč prohlížeči:</p>

<pre><code>&lt;font size="6" color="red" face="sans-serif">
  Velký červený bezpatkový text
&lt;font></code></pre>







<p><a href="https://kod.djpw.cz/twtb">Živá ukázka</a></p>

<p>Podporuje 3 atributy:</p>

<ul>
  <li><code>size</code> – velikost písma se udává hodnotami 1–7 (7 je největší)</li>
  <li><code>color</code> – barva písma (odpovídá CSS vlastnosti <code>color</code>)</li>
  <li><code>face</code> – použitý font (odpovídá CSS vlastnosti <code>font-family</code>)</li>
</ul>



<p>Ačkoliv je <code>&lt;font></code> zavržený, občas se hodí a jeho použití mi přijde rozumné. Třeba v případě potřeby přebarvit text na konkrétní barvu mi přijde:</p>

<pre><code>&lt;font color="red">Červený text&lt;/font></code></pre>



<p>Elegantnější než <i>správná</i> varianta pomocí CSS:</p>

<pre><code>&lt;span style="color: red">Červený text&lt;/span></code></pre>




<h3 id="basefont"><code>&lt;basefont></code></h3>

<p>Nastavení písma jedinou značkou pro celou stránku. Bez používání CSS to bylo docela elegantní, protože nemusel být každý text obalen samostatným <code>&lt;font></code>em, ale styl celé stránky se deklaroval na jednom místě.</p>

<pre><code>&lt;basefont face="Arial" color="red"></code></pre>

<p>Značka je považována za zastaralou a není v prohlížečích moc podporovaná. Posledním prohlížečem, kde má vliv, je <b>Internet Explorer 9</b>. <a href="https://kod.djpw.cz/rwtb">Ukázka</a>.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>DevDocs: <a href="http://devdocs.io/css/font"><code>font</code></a></li>
  
  <li>JPW: <a href="http://www.jakpsatweb.cz/css/font.html">Font</a></li>
</ul>