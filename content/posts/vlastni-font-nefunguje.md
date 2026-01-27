---
title: "Proč nemůže vlastní externí font fungovat"
headline: "Proč nemůže vlastní externí font fungovat"
description: "Vysvětlení proč není možné na webu používat vlastní externí písmo, které funguje správně."
date: "2022-03-01"
last_modification: "2025-03-26"
status: 1
tags: ["napady", "pisma", "typografie"]
format: "html"
---

<p>Pro ozvláštnění stránek je populární používat různá písma – tzv. <i>web fonty</i>.</p>

<p>Většinou ze služeb jako je:</p>

<ul>
  <li>
    <a href="https://fonts.google.com">Google Fonts</a>
  </li>
  <li>
    <a href="https://fonts.adobe.com/fonts">Adobe Fonts</a> (dříve známé jako Typekit)
  </li>
</ul>

<p>Tyto externí fonty jde buď přímo připojit z uvedených služeb:</p>

<pre><code>&lt;link rel="preconnect" href="https://fonts.googleapis.com">
&lt;link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
&lt;link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&amp;display=swap" rel="stylesheet"></code></pre>



<p>Nebo si je stáhnout k sobě a provozovat na stejné doméně jako další jiné zdroje (obrázky, styly, skripty).</p>



<h2 id="zpomaleni">Zpomalení načítání</h2>

<p>Připojování fontů z cizí domény je první technický problém. Jak je vidět na ukázce výš v případě <b>Google Fontů</b>, nejprve se musí stáhnout CSS soubor s deklarací fontů a až následně samotný font.</p>

<pre><code>@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v29/KFOkCnqEu92Fr1MmgVxGIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}</code></pre>










<p>Z toho plyne, že se proces stažení fontu zbrzdí stahováním dalšího externího CSS, které navíc blokuje vykreslení stránky.</p>

<p>Zvlášť problém je to u pomalého připojení (v <a href="/vyvojarske-nastroje">DevTools</a> jde nasimulovat volbou <i>Slow 3G</i>), kde to prodlouží první načtení klidně o 2 vteřiny:</p>

<p><img src="/files/vlastni-font/css-font-blokuje-vykresleni.png" alt="CSS font blokuje vykreslení" class="border"></p>












<p>To je popis situace, kdy se ani dané písmo nepoužívá a nestahuje. Už jen samotné stažení toho CSS má tento negativní dopad – <a href="https://kod.djpw.cz/qofd">ukázka</a>.</p>

<p>Potom podobnou dobu může zabrat samotné stažení fontu – <a href="https://kod.djpw.cz/oofd">ukázka</a></p>

<p>To přináší ještě další risiko v případě výpadku nebo zpomalení dané služby, že bude prohlížeč čekat s vykreslením, až tento styl stáhne.</p>

<p>Kromě toho je potřeba nastavit připojení na další 2 domény, což přináší další režii a zpomalení (trochu to zlepšuje použití <code>&lt;link></code> značky <a href="/preconnect"><code>preconnect</code></a>).</p>






<p>Roli hraje i <b>velikost samotného souboru</b> s fontem. </p>

<p>K tomu je zase použití služby Google Font dobré, protože CSS vlastností <code>unicode-range</code> rozděluje soubor s písmem na více menších souborů podle potřeby znaků použitých na stránce.</p>


<h2 id="chybejici-znaky">Chyb<span style="font-family: serif">ě</span>j<span style="font-family: serif">í</span>c<span style="font-family: serif">í</span> <span style="font-family: serif">č</span>esk<span style="font-family: serif">é</span> znaky</h2>

<p>Snaha ušetřit datovou velikost vede k tomu, že se tvůrce pokusí zahrnout do souboru s písmem pouze znaky, které očekává.</p>


<p>Dost tím trpí zahraniční služby, že nepočítají s češtinou – třeba Tinder:</p>

<p><img src="/files/vlastni-font/tinder-chybejici-cestina.png" alt="Tinder chybějící čeština" class="border"></p>

















<p>Tento problém zrovna dobře řeší Google Fonts, kdy všechny znaky rozděluje do souborů a připojuje na základě znaků na stránce pomocí <code>unicode-range</code>.</p>


<h2 id="blokovani">Blokování textu</h2>

<p>Další risiko u vlastního písma je v blokování textu. Projevuje se to tak, že do doby načtení externího fontu není na stránce nic vidět.</p>

<p>Blokováním zobrazení textu se předchází tomu, aby stránka problikla ze stavu s výchozím písmem do stavu s externím fontem po jeho načtení.</p>

<p>To už naštěstí vyřešila CSS vlastnost <a href="/font-face#font-display"><code>font-display</code></a>. Výchozí chování nových prohlížečů je takové, že se na písmo s vykreslením textu nečeká.</p>

<p>Ve starších prohlížečích to ale může být problém.</p>






<h2 id="poskakovani">Poskakování stránky</h2>

<p>Chování odpovídající <code>font-display: swap</code>, kdy se stránka nějak vykreslí a po stažení externího fontu se písmo změní, vede k tomu, že stránka po stažení fontu <a href="/poskakovani">poskočí</a>.</p>

<p>Důvodem je to, že text je v různých fontech jinak velký:</p>


<div class="live">
  <p>Příliš žluťoučký kůň úpěl ďábelské ódy.</p>
  <p style="font-family: Arial">Příliš žluťoučký kůň úpěl ďábelské ódy.</p>
  <p style="font-family: Verdana">Příliš žluťoučký kůň úpěl ďábelské ódy.</p>
  <p style="font-family: Tahoma">Příliš žluťoučký kůň úpěl ďábelské ódy.</p>  
</div>









  
<p>Nejen šířka znaků, ale proměnlivá je i jejich výška nebo výška řádkování.</p>


<h2 id="prizpusobeni">Přizpůsobení fallback fontu</h2>

<p>Zlepšit toto nepěkné poskakování jde přizpůsobením fallback fontu finální podobě.</p>

<p>Existují 2 možnosti:</p>

<ol>
  <li>Upravit CSS vlastnosti textu.</li>
  <li>Upravit vlastnosti fontu ve <code>@font-face</code> deklaraci.</li>
</ol>


<h3 id="font-loading-api">CSS Font Loading API</h3>

<p>První technika je založená na použití <a href="https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API">Font Loading API</a>.</p>
  

<p>Úpravami CSS vlastností se rozumí změna vlastností jako <code>font-size</code>, <code>line-height</code>, <code>letter-spacing</code>, <code>word-spacing</code> a podobně.</p>

<div class="live">
  <p style="letter-spacing: .85px">Příliš žluťoučký kůň úpěl ďábelské ódy.</p>
  <p style="font-family: Arial; letter-spacing: .9px">Příliš žluťoučký kůň úpěl ďábelské ódy.</p>
  <p style="font-family: Verdana">Příliš žluťoučký kůň úpěl ďábelské ódy.</p>
  <p style="font-family: Tahoma; letter-spacing: .95px">Příliš žluťoučký kůň úpěl ďábelské ódy.</p>  
</div>







<p>Prostou úpravou <code>letter-spacing</code>u (mezer mezi písmeny) se zde dosáhlo toho, že všechny odstavce jsou přibližně stejně široké, ačkoliv je každý jiným fontem.</p>

<p>Výhoda je v tom, že tohle řešení funguje všude, nevýhoda, že se musí  <b>sledovat načítání fontu JavaScriptem</b>:</p>

<pre><code>var font = new FontFace("Vlastní písmo", "url(/fonts/vlastni-pismo.woff2)", {
  style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
});

font.load().then(function() {
  document.fonts.add(font);
  document.body.classList.remove("font-fallback");
  document.body.classList.add("font-loaded");
});</code></pre>











<p>Tento kód po načtení fontu přidá elementu <code>&lt;body></code> třídu <code>font-loaded</code> a naopak odebere <code>font-fallback</code>. Ve stylech se na to tak může zareagovat a pro <code>font-fallback</code> upravit záložní písmo tak, aby co nejvíc prostorově odpovídalo vlastnímu externímu písmu.</p>

<p>Užitečný nástroj pro použití této techniky je <a href="https://meowni.ca/font-style-matcher/">Font style matcher</a>.</p>

<p><img src="/files/vlastni-font/font-style-matcher.png" alt="Font style matcher" class="border"></p>






















<p>Jde si tam hezky pohrát s jednotlivými vlastnostmi, aby se oba fonty jakž takž překrývaly:</p>

<p><img src="/files/vlastni-font/prekryv-fontu.png" alt="Překryv fontů" class="border"></p>














<h3 id="f-mods">Font display modifikátory</h3>

<p>Novější způsob jsou tzv. font display modifikátory. Někdy známé také jako <i lang="en">@font-face descriptors</i>, lze se setkat i se zkratkou <i>f-mods</i>.</p>

<p>Vypadá to nějak takto:</p>

<pre><code>@font-face {
    font-family: "Roboto-fallback";
    size-adjust: 100.06%;
    ascent-override: 96%;
    src: local("Arial");
}</code></pre>











<p>Ještě existují vlastnosti <code>descent-override</code> a <code>line-gap-override</code>.</p>

<p>Funguje to mimo <b>Safari</b> a <b>Internet Explorer</b>.</p>


<p>Tím se na základě systémového písma (<code>src: local("Arial")</code>) založí <i>nové</i> písmo s upravenými hodnotami, aby vypadalo podobně jako externí font.</p>

<p>Použití je potom typické:</p>

<pre><code>body {
  font-family: Roboto, 'Roboto-fallback', sans-serif;
}</code></pre>






<p>Výsledkem je trochu méně poskakování – <a href="https://kod.djpw.cz/xofd">ukázka</a>.</p>

<p>Existuje nástroj <a href="https://deploy-preview-15--upbeat-shirley-608546.netlify.app/perfect-ish-font-fallback/?font=Montserrat">Automatic font matching</a>, který dokáže k některým fontům tyto vlastnosti stanovit automaticky.</p>

<p>Případně si to jde nastavit ručně a zkontrolovat, že se obě písma přibližně překrývají – <a href="https://kod.djpw.cz/yofd">ukázka</a>.</p>


<p>Bohužel to je pořád jen zmírnění dopadů než <b>opravdové vyřešení problému</b>.</p>

<p>Kvůli tomu, že písma používají <a href="https://cs.wikipedia.org/wiki/Kerning">kerning</a> (vyrovnávání mezer mezi písmeny), který se mezi písmy liší, je podle mě nemožné docílit na pixel přesných rozměrů napříč fonty.</p>

<p><img src="/files/vlastni-font/kerning.png" alt="Kerning" class="border"></p>


























<p>Takže 100% za všech případů se poskakování podle mě nedá zabránit.</p>


<h2 id="systemove">Systémová písma</h2>

<p>Kvůli mnoha problémům a některým neřešitelným s externími fonty může být východisko používat <a href="systemova-pisma">systémová písma</a>.</p>

<p>V roce <b>2025</b> třeba v podobě:</p>

<pre><code>body {
    font-family: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'
}</code></pre>

<p><a href="https://kod.djpw.cz/pofd">Ukázka</a></p>

<p>Pro aktuální styl se doporučuji podívat třeba na <a href="https://tailwindcss.com/docs/font-family">Tailwind</a>.</p>



<p>Tímto se vzhled stránky přizpůsobí písmu, které používá daný operační systém.</p>

<p>Hodně webů se touto cestou vydává – <a href="/facebook">Facebook</a>, Instagram, GitHub nebo StackOverflow.</p>


<p>Je potřeba si zvážit, zda stojí za to řešit spousty problémů s externími fonty, ze kterých některé ani nemají řešení, nebo použít 100% funkční a načítání nezdružující <b>systémový font</b>.</p>

<p>Na druhou stranu ale volba systémového vzhledu znamená různé zobrazení na různých zařízeních. Je potřeba si rozhodnout, jestli dát přednost rychlému načítání nebo jednotné visuální identitě.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://deploy-preview-15--upbeat-shirley-608546.netlify.app/posts/high-performance-web-font-loading/">More than you ever wanted to know about font loading on the web</a></li>
  
  <li><a href="https://www.smashingmagazine.com/2021/05/reduce-font-loading-impact-css-descriptors/">A New Way To Reduce Font Loading Impact: CSS Font Descriptors</a></li>
  
  <li><a href="https://simonhearne.com/2021/layout-shifts-webfonts/">How to avoid layout shifts caused by web fonts</a></li>
</ul>