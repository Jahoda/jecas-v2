---
title: "Responsivní Facebook Like"
headline: "Responsivní Facebook Like"
description: "Jak zajistit, aby se Facebook Like a Page box přizpůsobovaly šířce obrazovky."
date: "2015-08-27"
last_modification: "2015-09-04"
status: 1
tags: ["facebook", "responsive"]
format: "html"
---

<p>Pro snazší sdílení obsahu a zvyšování počtu fanoušků stránky se na webech používají Facebook pluginy jako <i>Like</i> tlačítko nebo náhled FB Page.</p>

<p>Při vytváření <a href="/responsive">responsivního webu</a> je potom nutné zajistit, aby se box z Facebooku <b>dobře vešel na stránku</b>.</p>

<p><a href="/facebook">Facebook</a> bohužel <b>nenabízí úplně dokonale responsivní</b> <i>widgety</i>. FB plugin potřebuje znát rozměry při svém načtení. Při následné změně šířky už se dál nepřizpůsobuje.</p>

<p>Další věc je, že prvky Facebooku mají nějaké <b>minimální rozměry</b>. Ty naštěstí začínají už na nějakých 180/225 pixelech, což se při zobrazení přes celou šířku na mobilu vejde.</p>




<h2 id="nastaveni">Nastavení šířky</h2>

<p>Pro <b>nastavení šířky</b> podle dostupného prostoru existují dvě možnosti:</p>

<ol>
  <li><p>Vytvořit pro Facebook plugin <b>kontejner se 100% šířkou</b>, podle které se při načtení přizpůsobí. Funguje pouze u <i>Stránek</i>.</p></li>
  
  <li><p>JavaScriptem <b>spočítat dostupnou šířku</b> (vlastnost <code>offsetWidth</code>) a natvrdo ji nastavit kódu generující obsah z Facebooku.</p></li>
</ol>








<h2 id="page">Page Plugin</h2>

<p>Jeden z doplňků je vložení náhledu FB stránky. Dokáže na web vložit něco takového (příklad z FB stránky <a href="http://fb.com/jecascz">jecas.cz</a>):</p>

<p><img src="/files/responsivni-facebook/fb-page.png" alt="Facebook Page Plugin" class="border"></p>






























<p>Potřebný kód jde během okamžiku vygenerovat:</p>

<div class="external-content">
  <ul>
    <li><a href="https://developers.facebook.com/docs/plugins/page-plugin">Page Plugin</a> – generátor kódu pro přidání Facebook stránky na svůj web</li>
  </ul>
</div>

<p>Tento plugin je pro použití v <b>responsivním webu</b> částečně připravený.</p>

<p>Jeho šířka může být v rozmezí <code>180</code> až <code>500</code>, řešení je tedy obalit plugin do <code>&lt;div></code>u se 100% šířkou omezenou na 500 pixelů:</p>

<pre><code>.fb-plugin-cover {
  width: 100%;
  max-width: 500px;
}</code></pre>





<p>Pro využití maximální šířky 500 px je nutné stejnou šířku nastavit i v generátoru kódu a ponechat zapnuté nastavení <i lang="en">Adapt to plugin container width</i>:</p>

<p><img src="/files/responsivni-facebook/fb-page-plugin.png" alt="Responsivní Facebook Page plugin" class="border"></p>













<p>Page Plugin se potom bude přizpůsobovat dostupné šířce. To se týká pouze momentu <b>načtení webu</b> – při změně velikosti okna se nic měnit nebude.</p>

<p><a href="http://kod.djpw.cz/jppb">Živá ukázka</a> – přizpůsobení FB Page pluginu šířce</p>



<p>Pro řešení <b>změny velikosti okna</b> při JS události <code>onresize</code> by bylo nutné vyvolat nové načtení pluginu.</p>

<p>Je k tomu potřeba <a href="https://developers.facebook.com/apps/">Facebook aplikace</a> a její identifikátor <b>App ID</b>, které se zadá do připojení JS SDK:</p>

<pre><code>connect.facebook.net/en_GB/all.js#xfbml=1<b>&amp;appId=</b></code></pre>


<div class="internal-content"><ul>
  <li><a href="/facebook-poslat#aplikace">Vytvoření Facebook aplikace</a> – postup vytvoření vlastní FB aplikace a získání App ID</li>
</ul></div>


<p>Potom půjde použít <code>FB.XFBML.parse()</code>, což spustí nové vykreslení Facebook komponent. To se mimo jiné hodí i v případech, kde je potřeba FB pluginy vkládat do dynamicky načítaných stránek pomocí <a href="/ajax">AJAXu</a>.</p>

<p>Pro <b>urychlení překreslování</b> jde do <code>FB.XFBML.parse()</code> zadat jako argument element, ve kterém se má překreslovat, aby se nemusel procházet celý dokument.</p>

<p><a href="http://kod.djpw.cz/ippb">Živá ukázka</a> překreslování FB pluginu při změně velikosti okna</p>

<p>V praxi by bylo vhodné při zmněně rozměrů okna použít nějakou <b>časovou prodlevu</b> (<code>setTimeout</code>), aby se plugin neustále nepřekresloval během tažení myší při změně velikosti.</p>




<h2 id="like">Facebook Like tlačítko</h2>

<p>Tlačítko <i>To se mi líbí</i> je k vidění na mnoha webech, vypadá takto:</p>

<p><img src="/files/responsivni-facebook/fb-like.png" alt="Facebook Like Tlačítko" class="border"></p>





<p>Jde snadno vytvořit a vložit na web pomocí generátoru:</p>

<div class="external-content">
  <ul>
    <li><a href="https://developers.facebook.com/docs/plugins/like-button">Like Button for the Web</a> – generátor kódu pro přidání tlačítka <i>To se mi líbí</i></li>
  </ul>
</div>

<p><i>Like</i> tlačítko je na tom s responsivitou hůře. Nedokáže se přizpůsobit velikosti svého obalu.</p>

<p>Řešení je tedy obalit kód <i>Like</i> tlačítka nějakým <code>&lt;div></code>em (v příkladu <code>fb-plugin-cover</code>), spočítat u něj JavaScriptem dostupný prostor a podle toho nastavovat atribut <code>data-width</code> kódu tlačítka:</p>

<pre><code>var fbCover = document.getElementById("fb-plugin-cover");
var fbCoverWidth = fbCover.offsetWidth;
fbCover.getElementsByTagName("div")[0].setAttribute(
  "data-width", 
  fbCoverWidth
);
</code></pre>




<p><a href="http://kod.djpw.cz/lppb">Živá ukázka</a> Facebook Like tlačítka</p>

<p>Pro přizpůsobení velikosti při změně šířky okna je nutné výše uvedený kód počítající dostupný prostor opětovně spustit a <i>To se mi líbí</i> tlačítko nechat vykreslit znovu přes <code>FB.XFBML.parse()</code>.</p>





<h2 id="vypnuti">Vypnutí na mobilech</h2>

<p>Nejextrémnější řešení je prvky z Facebooku na mobilu <b>skrýt</b>. <a href="/sdileci-tlacitka">Tlačítka pro sdílení</a> jsou poměrně datově náročná, takže jejich vyhození návštěvníci positivně pocítí <b>rychlejším načítáním</b>.</p>


<p>Další věc je fakt, že mobilní prohlížeče typicky disponují zabudovanou <b>funkcí <i>Sdílet</i></b>, takže nasdílení na sociálních sítích není problém i bez tlačítek přímo na webu.</p>


<p>Příklad sdílení v <a href="/edge-mobile">mobilním MS Edge</a>:</p>


<p><img src="/files/responsivni-facebook/edge-sdilet.png" alt="Sdílení přímo v prohlížeči" class="border"></p>





























<p>Pořád ale bude nejspíš platit, že přítomnost originálního FB sdílecího pluginu bude znamenat vyšší počet sdílení – zobrazuje totiž <a href="/pocet-sdileni">počty sdílení</a> a hlavně <b>přátele návštěvníka</b>, kterým se stránka už <i>Líbí</i>, což funguje jako silný <b>sociální důkaz</b>.</p>