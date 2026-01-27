---
title: "Font-feature-settings"
headline: "Font-feature-settings"
description: "S CSS vlastností <code>font-feature-settings</code> lze dosáhnout zajímavější typografie u OpenType písem."
date: "2014-05-07"
last_modification: "2014-12-02"
status: 1
tags: ["css", "css-vlastnosti", "pisma", "typografie"]
format: "html"
---

<p>Pro vytvoření lépe čitelného textu a lepší přenositelnosti písem vznikl tzv. formát <b>OpenType</b>. Tento formát umožňuje, aby v souboru s písmy bylo mnohem více symbolů. To má tu výhodu, že <i>OpenType</i> písmo může kromě <b>standardních znaků</b> a <b>diakritiky</b> nabízet i více variant téhož znaku, třeba <b>závislých na kontextu</b> a podobně.</p>

<p>Jde tak vytvořit i <b>spojité písmo</b>, kde se přirozeně napojují jednotlivé znaky. Daní za to je potom případná <b>větší datová náročnost</b>.</p>





<h2 id="podpora">Podpora</h2>

<p>Funkční od <b>IE 10</b>, <b>Chrome 16</b>, <b>Firefoxu 4</b>.</p>




<h2 id="zapis">Zápis</h2>

<p>Nejprve je potřeba pravidlem <a href="/font-face"><code>@font-face</code></a> <b>připojit</b> <i>OpenType</i> písmo:</p>

<pre><code>@font-face {  
  font-family: 'Název';  
  src: url('pismo.<i>otf</i>') format('<b>opentype</b>');  
} </code></pre>

<p>Následně ho nastavit nějakému prvku a konečně použít <code>font-feature-settings</code> (momentálně vyžaduje <a href="/css-prefixy">prefixy</a>):</p>

<pre><code>element {
  font-feature-settings: 
    "vlastnost" hodnota, 
    "dalsi-vlastnost" hodnota
}</code></pre>

<p>Hodnota bývá většinou <code>0</code> nebo <code>1</code> ve smyslu zapnuto/vypnuto, jednotlivé hodnoty je možné <b>kombinovat</b>. Funkčnost stojí a padá na podpoře dané vlastnosti přímo v <b>použitém fontu</b>.</p>












<h2 id="vylepseni">Vylepšení</h2>

<p>Z pohledu webových stránek jsou zajímavé vlastnosti jako je:</p>

<ul>
  <li>
    <p><b>Kontextové alternativy</b> – písmena mohou mít různé varianty, které se použijí dle kontextu. Je tak možné vytvořit <b>spojité písmo</b>.</p>
        
    <pre><code>font-feature-settings: "calt" 1</code></pre>    
    
    <p><i>Calt</i> je zkratka pro <i><b>C</b>ontextual <b>Alt</b>ernates</i>.</p>
    
    <p>Na následujícím pohyblivém obrázku je například písmeno „i“ ve 3 variantách (nespojené, spojené a na začátku slova).</p>
    
    <p><img src="/files/font-feature-settings/calt.gif" alt="Spojování písem" class="border"></p>
    
    
    
    
    
    
    
    
    
    
  </li>
  
  <li>
    <p><b>Vyrovnání</b> (<a href="http://cs.wikipedia.org/wiki/Kerning">Kerning</a>) – přizpůsobení vzdáleností mezi určitými písmeny, aby více lahodily oku.</p>
    
    <pre><code>font-feature-settings: "kern" 1</code></pre>
    
    <p>Na obrázku <i>kerning</i> zmenší zbytečně velkou mezeru mezi „A“ a „T“.</p>
    
    <p><img src="/files/font-feature-settings/kern.gif" alt="Vyrovnání písem" class="border"></p>
    
    
  </li>
  
  <li>
    <p><b>Svazování</b> (<a href="http://cs.wikipedia.org/wiki/Ligatura_(typografie)">Ligatura</a>) – optické spojení více písmen v jeden znak. Příkladem budiž například „fi“ nebo „fl“.</p>
    
    <pre><code>font-feature-settings: "liga" 1</code></pre>   
    
    <p><img src="/files/font-feature-settings/liga.gif" alt="Svazování písem" class="border"></p>
  </li>
  
  <li>
    <p><b>Zlomky</b> – hezčí podoba zápisu zlomků, kdy je čitatel i jmenovatel vertikálně odlišen. Simulovat to někdy lze pomocí <a href="/ceska-klavesnice#mocniny-zlomky">speciálních znaků</a>: 3/4 vs. ¾.</p>
    
    <pre><code>font-feature-settings: "frac" 1</code></pre>
    
    <p><img src="/files/font-feature-settings/frac.gif" alt="Zlomky" class="border"></p>
  </li>
  
  <li>
    <p><b>Různá velikost čísel</b> – někdy může lépe vypadat, když mají číslice různou velikost.</p>
    <pre><code>font-feature-settings: "onum" 1</code></pre>
    
    <p>Zkratka <code>onum</code> znamená <i><b>O</b>ldstyle <b>num</b>ber</i> (starý styl čísel). Tento styl používá například písmo <b>Georgia</b> (<a href="https://kod.djpw.cz/phib">ukázka</a>).</p>
    
    <p><img src="/files/font-feature-settings/onum.gif" alt="Různé varianty čísel" class="border"></p>
  </li>
</ul>


<div class="external-content"> 
  <p><a href="http://clagnut.com/sandbox/css3/" class="button">Nástroj pro testování</a> <a href="http://ie.microsoft.com/testdrive/Graphics/opentype/Default.html" class="button">Ukázka od Microsoftu</a> </p>
  
  <ul>
    <li><a href="http://www.microsoft.com/typography/otspec/featurelist.htm">Seznam všech hodnot</a></li>
  </ul>  
</div>




<h2 id="pisma">OpenType písma</h2>

<p>Aby speciální vlastnosti mohly fungovat, musí je podporovat dané písmo. Moc jich zatím není a <b>zdarma</b> ještě méně.</p>



<h2 id="specifikace">Specifikace</h2>

<p>V <a href="http://www.w3.org/TR/css3-fonts/#font-rend-props">CSS specifikaci</a> jsou potom místo zápisu prostřednictvím <code>font-feature-settings</code> uvedeny přímo <code>font-*</code> vlastnosti.</p>

<ul>
  <li><code>font-variant-ligatures</code></li>
  
  <li><code>font-kerning</code></li>
  <li><code>font-variant-position</code></li>
  <li><code>font-variant-caps</code></li>
  <li><code>font-variant-numeric</code></li>
  
  <li><code>font-variant-alternates</code></li>
</ul>


<h2 id="odkazy">Odkazy jiam</h2>


<ul>
  <li>Typo.cz: <a href="http://www.typo.cz/database/pismolijny-a-distributori/tvorba-a-editace-fontu/opentype/">Co to je OpenType</a> (česky)</li>
  
   <li><code>font-variant-ligatures</code>
    <ul>
      <li>Elliot Jay Stocks: <a href="http://elliotjaystocks.com/blog/the-fine-flourish-of-the-ligature/">The fine flourish of the ligature</a></li>
      
      <li>Meyerweb.com: <a href="http://meyerweb.com/eric/css/tests/css3/show.php?p=font-variant-ligatures">CSS3 test: font-variant-ligatures</a></li>
      
      <li>W3C: <a href="http://dev.w3.org/csswg/css-fonts-3/#font-variant-ligatures-prop">CSS Fonts Module Level 3</a></li>
    </ul>
  </li>
  
  <li><a href="http://blog.fontdeck.com/post/15777165734/opentype-1">Using OpenType font features with CSS 3: Part 1</a></li>  
  
  <li>Webplatform.org: <a href="https://docs.webplatform.org/wiki/css/properties/font-feature-settings">font-feature-settings</a></li>
</ul>