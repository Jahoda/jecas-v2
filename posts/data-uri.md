---
title: "Data URI"
headline: "Data URI"
description: "Data URI je způsob, jak obsah externího souboru zapsat přímo do HTML/CSS."
date: "2014-10-21"
last_modification: "2015-11-16"
status: 1
tags: ["html", "zrychlovani"]
format: "html"
---

<p>Nejčastěji se <i>Data URI</i> používá pro obrázky.</p>

<ol>
  <li>
    <p>V <b>HTML</b> značce <code>&lt;img>:</code></p>    
    <pre><code>&lt;img src="<b>data:</b>image/png;base64,<i>samotná data obrázku</i>></code></pre>
  </li>  
  <li>
    <p>V <b>CSS</b> jako pozadí:</p>    
    <pre><code>background: url("<b>data:</b>image/png;base64,<i>samotná data obrázku</i>");</code></pre>
  </li>
</ol>

<p>Pomocí <code>data:</code> tak jde vložit do HTML obrázek, aniž by se musel někam zvlášť nahrávat (funkční od <b>IE 8</b>):</p>

<div class="live">
  <p>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA
AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
9TXL0Y4OHwAAAABJRU5ErkJggg==">
  </p>
</div>

<p>Řetězec <i>data</i> na začátku je jakýsi pseudo-protokol, pomocí kterého prohlížeč pochopí, že má místo dotazu na externí soubor použít následující data.</p>

<p>Pro běžné <a href="/format-obrazku">formáty obrázků</a> se obsah typicky kóduje pomocí <i>base64</i>.</p>


<h2 id="prevod">Převod na data URI</h2>

<p>Převést obrázek na <i>data URI</i> umí prohlížeče podporující třídu <code>FileReader</code>, která umí číst soubory určené k <a href="/upload#filereader">uploadu</a> (<b>IE 10+</b>).</p>

<p>Stačí sem požadovaný soubor vložit a zobrazí se jeho data URI (soubor se nikam nenahrává).</p>

<div class="live no-source">
  <p><label for="soubor">Převést soubor na data URI</label></p>
<input type="file" id="soubor" onchange="zpracovat(this)">
<div id="nahledy"></div>  
</div>




<h3 id="php">PHP</h3>

<p>V PHP může vložení externího obrázku přes <code>data:</code> vypadat následovně:</p>

<pre><code>$obrazek = file_get_contents("logo.png");
$dataUrl = "data:image/png;base64," . base64_encode($obrazek);
echo "&lt;img src='" . $dataUrl . "'>";</code></pre>




<p>Šablonovací systém <b>Latte</b> v <a href="/nette">Nette Frameworku</a> na to má přímo <a href="https://doc.nette.org/cs/2.1/default-helpers#toc-datastream">makro</a> <code>dataStream</code>:</p>

<pre><code>&lt;img src="{$img|dataStream}"></code></pre>


<h3 id="js">JavaScript</h3>

<p>V JavaScriptu od <b>IE 10</b> funguje přímo metoda <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa">btoa</a></code>.</p>

<p>Případě existují online převodníky do <i>base64</i>:</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.mobilefish.com/services/base64/base64.php">Base64 encoder and decoder</a></li>
  </ul>
</div>

<h2 id="vyuziti">Využití <code>data:</code> protokolu</h2>

<p>Nejčastěji se data URI používá ke snížení počtu <b>HTTP spojení</b>. Pokud není použit protokol HTTP/2, režie navázání spojení pro získáním jednotlivého souboru je mnohem větší než samotné stažení dat.</p>

<p>Při velkém počtu souborů hraje navíc roli <b>maximální počet souběžných spojení</b>, kvůli kterému musí soubory čekat ve frontě.</p>


<p>Pokud se data obrázku vloží přímo do HTML kódu, zobrazí se ve chvíli, kdy na ně prohlížeč narazí.</p>



<h3 id="srovnani">Srovnání rychlosti</h3>

<p>Při simulované rychlosti připojení <b>2G</b> (pomocí <a href="/vyvojarske-nastroje">vývojářských nástrojů</a> v <b>Chrome</b>), jsem načetl stránku s 500 obrázky o celkové velikosti <b>1,5 MB</b>:</p>

<ol>
  <li>
    <p>Při běžném přípojení značkou <code>&lt;img src="obrazek.png"></code> trvalo načtení průměrně <b>65 vteřin</b>.</p>
  </li>  
  <li>
    <p>Při použití <i>inline</i> obrázků pomocí data URL trvalo totéž cca <b>45 vteřin</b>.</p>
  </li>
</ol>

<p>Může se tedy zdát, že používání obrázků přes <code>data:</code> je dobrý nápad a vede ke zrychlení.</p>

<p>Jenže…</p>

<p><img src="/files/data-uri/disable-cache.png" alt="Zablokování cache" class="border"></p>


<p>Data URI přinesou zrychlení při <b>prvním načtení</b>, ale potom se situace otočí.</p>


<p>Stránka bez data URI se při opakovaném načtení z cache kompletně stáhne a zobrazí v čase kolem <b>30 vteřin</b>, navíc se přenese jen cca desetina dat, protože všechny obrázky vrátí hlavičku <i>304 Not Modified</i>, takže se znovu nestahují a vezmou se z cache prohlížeče.</p>

<p>Další věc je vykreslení obsahu HTML stránky – jelikož je HTML kód prošpikován daty obrázků, stáhne se jako celek později.</p>

<p>Při použití <b>externích obrázků</b> se HTML dotáhne rychleji, takže návštěvník vidí kompletní textový obsah dříve a obrázky se jen načtou později.</p>



<p>Mít v HTML kódu inline obrázky tak není moc rozumné.</p>

<p>V případě <b>CSS</b> je situace podobná. Vložené data-obrázky prodlouží stažení celého CSS souboru. Pokud jsou v něm i obecné styly a nenačítá se asynchronně (tj. blokuje <a href="/vykreslovani">vykreslení stránky</a>), tak bude návštěvník do dotažení obrázků koukat na prázdnou stránku.</p>

<p>Při použití obrázků přes <code>data:</code> v CSS je tak dobré:</p>

<ol>
  <li>
    <p>Mít všechny deklarace data-obrázků ve zvláštním CSS souboru.</p>
  </li>
  <li>
    <p>Načítat CSS s data-obrázky <a href="/nacitani-css">asynchronně</a>.</p>
  </li>
</ol>

<p>I tak přetrvávají další problémy:</p>

<ol>
  <li><p>Změna jediného obrázku <b>invaliduje cache</b> všech obrázků na stránce.</p></li>
  
  <li><p>Různé stránky zpravidla potřebují různé obrázky. Při použití data URI se <b>stáhnout vždy úplně všechny</b>, i když se na stránce nepoužijí.</p></li>
</ol>

<p>Podrobněji se problematikou <i>inline</i> obrázku zabývá článek:</p>

<div class="external-content">
  <ul>
    <li>
      Performance Calendar: <a href="http://calendar.perfplanet.com/2011/why-inlining-everything-is-not-the-answer/">Why Inlining Everything Is NOT The Answer</a>
    </li>
  </ul>
</div>


<h2 id="vse">Vše v jednom</h2>

<p>Občas se zápis externích souborů přes <code>data:</code> používá kvůli omezeným možnostem nebo pohodlnosti instalace.</p>

<p>Může být pohodlnější si do stránky připojit hotový skript – třeba pro <a href="/lightbox">lightboxovou</a> galerii, který sestává z jediného <code>*.js</code> souboru, co v sobě má obrázky i styly. Není tak nutné přemýšlet co kam nakopírovat a podobně.</p>

<p>V případech, kdy není na stránku možné nahrát soubor, ale jde zapisovat HTML, je pseudo-protokol data způsob, jak na takovou stránku vložit obrázek.</p>



<h2 id="svg">Base64 a SVG</h2>

<p>Pro vložení <a href="/svg">SVG</a> přes data URI je zbytečné base64 používat. Naopak je to dokonce škodlivé, protože to způsobí větší datovou velikost.</p>

<div class="external-content">
  <ul>
    <li>CSS Tricks: <a href="http://css-tricks.com/probably-dont-base64-svg/">Probably Don’t Base64 SVG</a></li>
  </ul>
</div>




<h2 id="sprite">Data URI vs. CSS sprite</h2>

<p>Zápisem obrázků přes data URI jde nahradit používání <a href="/css-sprite">obrázkových spritů</a> (spojení všech obrázků do jednoho a jejich vybírání pomocí <code>background-position</code>).</p>

<p>Data-obrázky jsou v CSS pohodlnější na používání.</p>

<p>Nevýhoda je teoreticky nefunkčnost v prehistorických prohlížečích (např. <b>IE 7</b>). A nutnost řešit asynchronní načítání CSS souboru s data-obrázky.</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.onextrapixel.com/2015/03/21/datauri-vs-css-sprites-understanding-which-one-performs-better/">DataURI vs CSS Sprites – Understanding Which One Performs Better</a></li>
  </ul>    
</div>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs">data URIs</a></li>
</ul>




<script>
function zpracovat(el) {
    var soubory = el.files;
    for (var i = 0; i < soubory.length; i++) {
        nacist(soubory[i]);
    }
}

var nahledy = document.getElementById("nahledy");

function nacist(soubor) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var obsah = e.target.result;
        var pre = document.createElement("div");
        pre.innerHTML = "<pre><code>" + obsah + "</code></pre><img src='" + obsah + "'>";
        nahledy.appendChild(pre);
    };
    reader.readAsDataURL(soubor);    
}
</script>