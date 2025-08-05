---
title: "Oprava chyb použitelnosti v mobilních zařízeních"
headline: "Oprava chyb použitelnosti v mobilních zařízeních"
description: "Google informuje o chybách v použitelnosti u mobilních zařízeních. Jak je opravit?"
date: "2015-03-11"
last_modification: "2015-03-17"
status: 1
tags: ["google", "responsive", "seo"]
format: "html"
---

<p>Pokud je daná stránka připojena v <b>Google Webmasters Tool</b>, je možné se setkat s e-mailem upozorňujícím na chyby použitelnosti v mobilních zařízení.</p>

<p><img src="/files/oprava-chyb-pouzitelnosti/email.png" alt="E-mail upozorňující na chyby" class="border"></p>




















<p>Google si dlouhodobě hraje se znázorněním, že je stránka optimalisována pro mobily, při hledání z dotykových zařízení s malou obrazovkou.</p>

<div class="internal-content">
  <ul>
    <li><a href="/google-mobile-friendly">Google označí stránky vhodné pro mobil</a></li>
  </ul>
  <p><img src="/files/google-mobile-friendly/ukazka.png" alt="Označení stránky vhodné pro mobilní zařízení" class="border"></p>
</div>















<p>Počty přístupů z mobilních zařízení meziročně <b>rostou</b> a Google naznačuje, že stránky přizpůsobené mobilům budou <b>lépe hodnoceny ve výsledcích vyhledávání</b>.</p>

<blockquote>
  <p>Chyby na těchto stránkách významně ovlivňují možnost zobrazení vašeho webu v mobilních zařízeních. Vyhledávání Google tyto stránky nebude považovat za vhodné pro mobilní zařízení, což bude mít vliv na jejich pořadí ve výsledcích vyhledávání z chytrých telefonů.</p>
  
  <p class="autor">Zpráva z GWT</p>
</blockquote>







<p>Vytvořit použitelnou mobilní podobu stránek tak většinou dává smysl.</p>



<h2 id="jak">Jak chyby odstranit?</h2>

<p>V e-mailu z Google nástroje pro webmastery je odkaz pro zobrazení chyb, které by bylo dobré opravit.</p>

<p><img src="/files/oprava-chyb-pouzitelnosti/prozkoumat.png" alt="Prohlédnutí chyb" class="border"></p>





<p>Obecně stačí vycházet ze zásad tvorby responsivního webu.</p>

<div class="internal-content">
  <ul>
    <li><a href="/responsivni-web">Responsivní design webu</a> – kompletní průvodce postupem tvorby responsivního webu</li>
  </ul>
</div>



<h2 id="nejcastejsi">Nejčastější chyby</h2>

<p>Mezi nejčastější chyby v použitelnosti patří následující.</p>



<h3 id="viewport">Není nakonfigurován viewport</h3>

<p>Tuto chybu způsobuje absence značky <a href="/meta-viewport"><code>&lt;meta name="viewport"></code></a>. Bez její přítomnosti mobilní prohlížeče předstírají větší velikost než mají, aby následně stránku zmenšily, takže je bez přiblížení špatně čitelná.</p>

<p>Řešení je přidat do hlavičky:</p>

<pre><code>&lt;meta name="viewport" content="width=device-width,initial-scale=1"></code></pre>





<h3 id="velikost-pisma">Malá velikost písma</h3>

<p>Tento problém může být vyvolán nenastavením <i>viewportu</i>, protože se stránka nezobrazí v měřítku 1:1, ale bude zmenšená. Po přidání <code>&lt;meta name="viewport"></code> tedy možná zmizí.</p>

<p>Přetrvá-li i nadále, je potřeba nastavit větší písmo (<a href="/font#size"><code>font-size</code></a>). Vhodný postup je i základní velikost písma vůbec nenastavovat a <b>ponechat výchozí</b>, kterou má prohlížeč (obvykle 16 pixelů).</p>




<h3 id="dotykove-prvky">Dotykové prvky jsou moc blízko</h3>

<p>Má-li se web dobře ovládat prsty prostřednictvím dotykové obrazovky, je zapotřebí dodržet dvě podmínky:</p>

<ol>
  <li>Zajistit <b>dostatečně velkou plochu</b> ovládacích prvků, aby se do nich dalo prstem trefit.</li>
  
  <li>Mezi malými tlačítky/odkazy alespoň <b>vytvořit rozestup</b>, aby uživatel omylem neaktivoval jiné tlačítko, než které chtěl.</li>
</ol>

<p>Google uvádí doporučení, že ovládací prvek by měl být velký alespoň <b>48 × 48 pixelů</b> (cca 7 × 7 milimetrů ve skutečnosti), aby šel snadno trefit průměrně velkým prstem.</p>

<p>U některých méně důležitých ovládacích prvků stačí rozměry menší, v tom případě by ale mělo být mezi nimi větší horisontální a vertikální odsazení. Google tento odstup stanovuje na 32 pixelů (5 mm) oběma směry.</p>


<h3 id="pevna-sirka">Velikost obsahu není přizpůsobena viewportu</h3>

<p>I přes přidání <code>&lt;meta name="viewport"></code> se nemusí použitelnost stránky moc zlepšit v případě, že její elementy mají nastaveny <b>velkou fixní šířku</b>. V takovém případě se zkrátka nevejdou na displej a bude nutné se po stránce vodorovně posouvat.</p>

<p>Ideální je vícesloupcové rozvržení stránky vytvářet v procentech a pouze omezit maximální šířku celého obalu, aby web nebyl na velkých monitorech příliš roztažený.</p>

<div class="internal-content">
  <ul>
    <li><a href="/responsivni-web#sloupce">Responsivní sloupcový layout</a></li>
  </ul>
</div>

<p>Při šířce, kdy už jsou jednotlivé sloupce příliš úzké, přichází do hry <a href="/mobilni-web#media-queries">pravidlo <code>@media</code></a>, které umožňuje aplikovat určitá CSS pravidla pouze při stanovených rozměrech stránky.</p>

<p>V závislosti na šířce se tak obvykle <b>počet sloupců snižuje</b> a obsah se dostává pod sebe.</p>

<p>Nechtěně zvětšit šířku mohou i prvky jako obrázky, videa, rámy nebo tabulky, ale i to se <a href="/responsivni-web#vyjimky">dá vyřešit</a>.</p>


<h2 id="test">Test použitelnosti v mobilech</h2>

<p>Otestovat, zda stránka vyhovuje některým pravidlům Google jde na následující stránce:</p>

<p><a href="https://www.google.com/webmasters/tools/mobile-friendly/" class="button">Mobile-Friendly Test</a></p>

<p>Pokud ji Google shledá jako vhodnou pro mobily, mělo by se zobrazit něco jako:</p>

<p><img src="/files/google-mobile-friendly/test.png" alt="Výsledek testu" class="border"></p>














<p>Výsledek je nutné brát s reservou. Jedná se o vyhovění formálním pravidlům, která je možné <b>strojově ověřovat</b>. Skutečně dobrou použitelnost pro návštěvníky kladný výsledek tedy negarantuje.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Google Developers: <a href="https://developers.google.com/web/fundamentals/?hl=en">Web Fundamentals</a> – příručka „nejlepších postupů“, jak vytvářet moderní web</li>
</ul>