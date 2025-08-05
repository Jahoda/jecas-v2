---
title: "HTML 5 video vs. GIF"
headline: "HTML 5 <code>&lt;video></code> vs. GIF"
description: "Jaké jsou výhody a nevýhody HTML5  videa oproti GIFu. Co kdy použít?"
date: "2015-12-26"
last_modification: "2016-01-11"
status: 1
tags: ["obrazky", "video"]
format: "html"
---

<p>Po dlouhá léta byl <a href="/format-obrazku#gif">obrázek GIF</a> jedinou spolehlivou možností, jak na webovou stránku snadno vložit něco animovaného/pohyblivého.</p>

<p>V roce 2016 jde s celkem dobrou podporou mimo jiné použít:</p>

<ul>
  <li><a href="/svg">SVG</a> – JavaScriptem animované vektorové obrázky</li>
  <li>Značka <b href="/html-video"><code>&lt;video></code></b> – připojení video-souboru do stránky (např. formát MP4)</li>
</ul>

<p>Co ale zvolit?</p>




<h2 id="typ-animace">Typ animace</h2>

<p>První velmi důležitá věc pro rozhodování je <b>typ pohyblivého obsahu</b>. Zatímco pro animování geometrických obrazců bude ideální SVG, pro záznam obrazovky zbývá jen GIF nebo video.</p>

<p>Nahrávat obrazovku do GIFu umí třeba program <a href="/video-gif">ScreenToGif</a>. Další programy pro nahrávání videa jsou popsány v samostatném článku:</p>

<div class="internal-content">
  <ul>
    <li>50 nejlepších programů pro Windows: <a href="/windows-programy#screenshoty-videa">Screenshoty a videa</a></li>
  </ul>
</div>




<h2 id="delka">Délka a velikost</h2>

<p>Formát GIF je hodně datově náročný. Oproti MP4 budou mít vteřiny animovaného GIFu ve velkém rozlišení klidně řádově magabytovou velikost.</p>

<p>Pro delší videa s vyšším rozlišením je tak GIF špatně použitelný.</p>

<p>U SVG záleží na typu animace, ale při vhodném použití lze vykouzlit hodně parády při nízké datové velikosti. SVG animované pomocí JavaScriptu nebo CSS může být velmi malé protože veškeré <a href="/vykreslovani">vykreslování</a> následně obstará engine prohlížeče.</p>






<h3 id="stream">Průběžné načítání</h3>

<p>Výhoda ve video-souboru je dále v tom, že se video dokáže stahovat postupně. Pokud je datová velikost jedné vteřiny videa nižší než rychlost připojení, video se dokáže načítat s průběhem přehrávání, aniž by to způsobilo nutnost čekání.</p>

<p>GIF animace se musí nejprve celá stáhnout.</p>



<h2 id="kvalita">Kvalita</h2>

<p>Pro vektorové animace jasně vede SVG, které se dokáže libovolně přizpůsobovat rozměry animace bez ztráty kvality.</p>

<p>Vzhledem k tomu, že GIF může mít maximálně <b>256 barev</b>, bude výsledná kvalita barevně náročné animace nevalná.</p>

<p>Pro <b>záznam obrazovky</b> je tak ideální video soubor.</p>





<h2 id="podpora">Podpora</h2>

<p>S podporou v prohlížečích je na tom nejlépe GIF, který funguje téměř všude.</p>


<p>Nejlepší podporu má video ve formátu MP4. Nepřehraje ho ale třeba většina uživatelů <b>Windows XP</b>. Pro bezproblémové fungování je tak dobré generovat video do více formátů (např. ještě WebM) nebo kromě značky <code>&lt;video></code> použít ještě Flash přehrávač jako fallback.</p>




<p>Pohodlným řešením je nahrát video na <a href="/youtube">YouTube</a>, čímž se všechny potřebné formáty připraví automaticky. To ale nejde udělat vždy.</p>

<p>SVG nepodporuje <b>IE 8</b>, s animováním SVG jsou potom potíže i v novějších prohlížečích. Animace pomocí SMIL nepodporuje žádný <b>Internet Explorer</b> ani <a href="/microsoft-edge"><b>Edge</b></a>:</p>

<div class="external-content">
  <ul>
    <li>Can I use: <a href="http://caniuse.com/#feat=svg-smil">SVG SMIL animation</a></li>
  </ul>
</div>

<p>Animovat SVG je s dobrou podporou nutné v JavaScriptu.</p>





<h2 id="sdileni">Obtížnost sdílení</h2>

<p>Jednoduchost sdílení je asi hlavní výhoda GIFu. Získat URL obrázku a poslat ji někomu jinému, vložit ji na sociální síť nebo obrázek uložit a poslat e-mailem dokáže skoro každý.</p>

<p>Uložit / kopírovat URL u <code>&lt;video></code> značky jde v <b>Chrome</b> nebo <b>Firefoxu</b> stejně jako u obrázku. <b>MS Edge</b> má ale u videa kontextovou nabídku jinou, kde kopírování URL není:</p>

<p><img src="/files/video-vs-gif/kopirovat-video.png" alt="Nemožnost kopírovat URL v Edge" class="border"></p>
















<p>Další věc je vložení do <a href="/cms">redakčního systému</a>. Například diskusní fóra obsahují funkce pro vložení obrázku na základě URL, aby se rovnou zobrazil. Podpora obdobné funkce pro video je mnohem méně rozšířená.</p>

<p>Některé systémy dokáží URL obrázku automaticky rozpoznat a vložit ho, v případě videa je to opět mnohem vzácnější.</p>


<p>Například v chatu na <a href="/facebook">Facebooku</a> se po vložení URL s GIF obrázkem rovnou zobrazí náhled, na rozdíl od MP4 videa:</p>

<p><img src="/files/video-vs-gif/fb-chat.png" alt="Zobrazení gifu v chatu na Facebooku" class="border"></p>




















<p>Uložit SVG obrázek jde jednoduše také, ale už ne s JS kódem, který zajišťuje animování.</p>



<h2 id="kontrola-prehravani">Kontrola přehrávání</h2>

<p>Video ve značce <code>&lt;video></code> se díky atributu <code>controls</code> může automaticky zobrazit s ovládacími prvky, kterými ho jde zastavit, přetočit nebo spustit znova:</p>

<pre><code>&lt;video src="video.mp4" <b>controls</b>>
&lt;/video></code></pre>





<p>Ovládat přehrávání GIFu je značně neohrabané. Většinou se proto GIFy vytváří s <b>nekonečným opakováním</b>, aby se uživatel dostal k celému jejich obsahu.</p>

<p>Teoreticky jde přehrávání GIFu simulovat tak, že se nejprve zobrazí statický obrázek a ten je na vyžádání nahrazen GIFem:</p>

<div class="internal-content">
  <ul>
    <li><a href="/video-gif#ukazka">Ukázka přehrání GIFu na požádání</a></li>
  </ul>
</div>



<h3 id="autoplay">Automatické přehrávání</h3>

<p>GIF se začne automaticky přehrávat v momentě, kdy se na něj v prohlížeči odroluje.</p>

<p>U značky <code>&lt;video></code> jde automatické spuštění vyvolat atributem <code>autoplay</code>. Automatické spuštění videa nefunguje v mobilních prohlížečích, tam musí uživatel vždy spustit video ručně.</p>




<h2 id="zvuk">Zvuk</h2>

<p>Má-li být obraz doplněn zvukem, je nejlepší řešení video. Přehrát doprovodný zvuk by šlo i ke GIFu, ale půjde obtížně řešit synchronisaci zvuku a obrazu.</p>






<h2 id="zaver">Závěr</h2>

<p>GIF je nejlépe podporovaný a snadno se sdílí. Pokud se nejedná o záznam něčeho hodně barevného, dlouhého a ve vysokém rozlišení, není problém ani datová velikost.</p>

<p>Video v MP4 se hodí pro delší videa s vyššími nároky na kvalitu.</p>

<p>Formát SVG je vhodný pro ručně vytvářené animace.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Sara Soueidan: <a href="https://sarasoueidan.com/blog/svg-vs-gif/">Animated SVG vs GIF [CAGEMATCH]</a> – proč animovat raději v SVG než v GIFu</li>
</ul>