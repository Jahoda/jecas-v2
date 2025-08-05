---
title: "Jaký zvolit formát obrázku"
headline: "Jaký formát obrázku použít na webu"
description: "PNG, GIF, JPG? Který datový formát obrázku volit pro použití na webové stránce."
date: "2015-03-06"
last_modification: "2015-03-11"
status: 1
tags: ["obrazky"]
format: "html"
---

<p>Při vkládání grafiky a ilustračních obrázků na webové stránky existuje hned několik typů/formátů obrázků, které se hodí pro určité případy.</p>



<h2 id="volba">Volba formátu</h2>

<p>Zjednodušený způsob rozhodování je následující.</p>

<p><img src="/files/format-obrazku/format-obrazku.png" alt="" class="border"></p>




























<ul>
  <li>Jedná se o fotografii? Použít <b>JPG</b>. Nebo <b>PNG</b>, pokud nevadí datová velikost.</li>
  
  <li>Sestává obrázek z více souvislých ploch stejné barvy a ostrých přechodů mezi nimi (např. černý text na bílém pozadí)? Použít <b>PNG</b> nebo <b>GIF</b>.</li>
  
  <li>Jde hlavně o kvalitu? Použít <b>PNG</b>.</li>
  
  <li>Je cílem průhlednost obrázku? Zvolit <b>GIF</b> nebo <b>PNG</b>. Pro částečnou průhlednost se hodí pouze <b>PNG</b>.</li>
  
  <li>Má se obrázek hýbat? Nezbývá než použít <b>GIF</b>.</li>
</ul>


<h2 id="porovnani">Porovnání obrázků v různých formátech</h2>

<p>Ze srovnání PNG (4 kB), JPG (10 kB) a GIFu (12 kB) formátu následujícího obrázku vychází nejlépe PNG při nejnižší datové velikosti.</p>

<p>Formáty GIF a JPG zobrazují oproti PNG nižší rozsah barev. JPG trpí nepěknými artefakty na místech přechodů dvou barev (například kolem písmen).</p>

<p>
  Změnit na: 
  <button onclick="zmenit('png')">Obrázek PNG</button>
  <button onclick="zmenit('jpg')">JPG formát</button>
  <button onclick="zmenit('gif')">Obrázek v GIF</button>
</p>

<p><small>(Po najetí myší se obrázek přiblíží a po kliknutí změní na následující.)</small></p>

<div class="live no-source">
  <style>
    p[data-image] img {
      display: none;
      
      transform: scale(1) translate(0, 0);
      transition: transform .2s;
    }
    p[data-image] {
      overflow: hidden;
    }    
    p[data-image=png] .png,
    p[data-image=jpg] .jpg,
    p[data-image=gif] .gif {
      display: block;
    }
    p[data-image]:hover img {
      transform: scale(1.8) translate(20%, -20%);
    }
  </style>
  <p id="obrazky" data-image="png">
    <img class="png" width="600" height="315" onclick="zmenit('jpg')" src="/files/format-obrazku/png.png" alt="Obrázek v PNG" class="border">
    <img class="jpg" width="600" height="315" onclick="zmenit('gif')" src="/files/format-obrazku/jpg.jpg" alt="Obrázek v JPG" class="border">
    <img class="gif" width="600" height="315" onclick="zmenit('png')" src="/files/format-obrazku/gif.gif" alt="Obrázek v GIF" class="border">
  </p>
</div>

<h3 id="fotka">Fotografie</h3>

<p>V případě fotografie jsou nedostatky JPG komprese běžným okem velmi málo rozeznatelné a navíc má JPG nižší datovou velikost než PNG (34 kB JPG vs. cca 80 kB PNG/GIF), což za lehce nižší kvalitu většinou stojí. GIF je kvůli nízkému počtu podporovaných barev (256) pro fotografie často nedostatečný.</p>

<p>
  Změnit na: 
  <button onclick="zmenitFotku('png')">Obrázek PNG</button>
  <button onclick="zmenitFotku('jpg')">JPG formát</button>
  <button onclick="zmenitFotku('gif')">Obrázek v GIF</button>
</p>

<div class="live no-source">
  <p id="obrazky-fotka" data-image="png">
    <img class="png" width="600" height="315" onclick="zmenitFotku('jpg')" src="/files/format-obrazku/fotka.png" alt="Obrázek v PNG" class="border">
    <img class="jpg" width="600" height="315" onclick="zmenitFotku('gif')" src="/files/format-obrazku/fotka.jpg" alt="Obrázek v JPG" class="border">
    <img class="gif" width="600" height="315" onclick="zmenitFotku('png')" src="/files/format-obrazku/fotka.gif" alt="Obrázek v GIF" class="border">
  </p>
</div>


<h2 id="jpg">JPG</h2>

<p>Formát JPG se hodí na fotografie, u kterých se díky <b>ztrátové kompresi</b> dá ušetřit hodně datového objemu a lehká ztráta kvality při běžném pozorování příliš nevadí.</p>

<p>JPG formát byl navržen speciálně pro <b>fotografie</b>, takže většinou nenabízí uspokojivou kvalitu, pokud je obsahem něco jiného než fotka. Následující obrázek znázorňuje hlavní <b>rozdíl mezi JPG a PNG</b> při uložení textu na obrázku.</p>

<p><img src="/files/format-obrazku/jpg-png.png" alt="Srovnání kvality textu JPG a PNG" class="border"></p>





















<p>Kvůli nevyhnutelné ztrátě kvality při uložení není tedy JPG ani příliš vhodný pro ukládání <b>zdrojových souborů</b>.</p>


<p>Při exportu v grafickém editoru je možné nastavit úroveň komprese, čímž jde snižovat datovou velikost na úkor kvality.</p>

<figure>
  <img src="/files/format-obrazku/komprese.png" alt="Nastavení komprese JPG obrázku" class="border">
  <figcaption>Příklad nastavení kvality JPG při exportu v <a href="http://www.irfanview.cz/">IrfanView</a></figcaption>
</figure>




















<h2 id="png">PNG</h2>

<p>PNG je vhodné typicky pro webovou/počítačovou grafiku. Jeho komprese je bezztrátová, čili výsledek 100% odpovídá originálu.</p>

<p>Nevýhoda je vysoká datová velikost oproti JPG při <b>ukládání fotografií</b>.</p>

<p>Pomocí PNG jde vytvářet i <b>průhledné obrázky</b>. Průhlednost může být úplná nebo částečná – někdy označováno jako <i>průhlednost</i> a <i>průsvitnost</i>.</p>

<p><small>(Kliknutím na obrázek se změní jeho prosvítající pozadí.)</small></p>

<div class="live no-source">
  <p><img style="transition: background-color .3s; border-radius: 20px; cursor: pointer" onclick="prebartvit(this)" src="/files/format-obrazku/logo.png" alt="Poloprůhledné PNG"></p>  
</div>











<p>Tzv. průsvitnost / poloprůhlednost / podpora <i>alfa kanálu</i> u PNG standardně funguje od <b>IE 7</b>.</p>


<h2 id="gif">GIF</h2>

<p>GIF jde často používat jako alternativu k PNG – je rovněž <b>bezztrátový</b>. Nevýhoda oproti PNG je ale jeho <b>maximální počet barev omezený na 256</b>, což často nemusí stačit. Kromě toho má GIF horší kompresi a není možné ho udělat průsvitný (chybí podpora alfa kanálu), podporována je jen obyčejná průhlednost.</p>

<p>Nedává tedy příliš smysl dát přednostu GIFu před PNG. S jedinou výjimkou, což je <b>animace</b>, kde není na výběr („animované PNG“ – tzv. APNG má slabou podporu v prohlížečích).</p>

<p>Obrázek v GIFu je universální způsob s nejlepší podporou napříč prohlížeči pro umístění něčeho, co se má hýbat.</p>

<div class="internal-content">
  <ul>
    <li><a href="/video-gif">Video-záznam obrazovky do GIFu</a> – uložení videa do GIFu</li>
  </ul>
</div>





<h2 id="praxe">Volba formátu v praxi</h2>

<h3 id="screen">Do čeho uložit screenshot</h3>

<p>Pro snímky obrazovky se většinou hodí použít PNG, v případě použití JPG bude výsledek pokažen již zmíněnými artefakty kolem textu.</p>





<h3 id="smiseny">Smíšený obrázek</h3>

<p>Asi největší problém přináší smíšení fotografie s textem. Dochází k situaci, kdy by:</p>

<ul>
  <li>pro fotku byl vhodný JPG,</li>
  <li>pro text byl vhodný PNG</li>
</ul>

<p>Je nutné zvolit kompromis – tedy spojit nevýhody obou řešení. Mít datově obrovský ale kvalitní PNG nebo malé JPG s artefakty kolem textu.</p>

<p>Ideální je nesourodé části obrázků rozdělit na dva obrázky a spojit je až visuálně pomocí HTML/CSS.</p>






<h2 id="rozmery">Rozměry obrázku</h2>

<p>Ideální je obrázky na stránce zobrazovat v jejich skutečném rozlišení. Prohlížeče je sice umí zvětšit nebo zmenšit, lepší kvality se ale většinou dosáhne přímou <b>úpravou v grafickém editoru</b>.</p>

<p>Někdy ale není na výběr či je zachování skutečného rozlišení příliš komplikované.</p>




<h2 id="velikost">Datová velikost</h2>

<p>Po videu a animovaných reklamách bývají obrázky datově nejnáročnějším prvkem webových stránek. Úprava obrázků tak často nabízí velký prostor pro <b>zrychlení načítání stránky</b> s minimální či žádnou změnou kvality.</p>

<div class="internal-content">
  <ul>
    <li><a href="/optimalisace-obrazku">Hromadné datové zmenšení obrázků</a> – nástroje pro výrazné snížení velikosti obrázků bez ztráty kvality</li>
  </ul>
</div>


<h2 id="dalsi">Další formáty</h2>

<p>Postupně se prosazují ještě další formáty pro obrázky, které ty stávající v mnohém vylepšují.</p>

<ul>
  <li><p><b>SVG</b> – vektorové obrázky netrpí ztrátou kvality při změně rozměrů (<b>IE 9+</b>) a umožňují úpravy pomocí CSS nebo JS</p>
  
  <div class="internal-content">
    <ul>
      <li>
        <p><a href="/svg">Rozsáhlý přehled informací o SVG</a></p>
      </li>
    </ul>
  </div>
  </li>
  
  <li><p><b>WebP</b> – nabízí lepší ztrátovou i bezztrátovou kompresi, průhlednost i průsvitnost a menší soubory při zachování stejné kvality než při použití JPG (pouze <b>Chrome</b> a nová <b>Opera</b>)</p></li>
  
  <li><p><b>JPEG XR</b> – obdoba WebP funkční pouze v <b>Internet Exploreru</b> od verse 9</p></li>
</ul>

<p>Zatím ale nemají tak dobrou podporu v prohlížečích. Formáty PNG, JPG a GIF ji mají prakticky 100%.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>W3C: <a href="http://www.w3.org/QA/Tips/png-gif">GIF or PNG?</a></li>
  <li>
    Wikipedie: 
    <ul>
      <li><a href="http://cs.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></li>
      <li><a href="http://cs.wikipedia.org/wiki/JPEG">JPEG</a></li>
    <li><a href="http://cs.wikipedia.org/wiki/GIF">GIF</a></li>
      <li><a href="http://cs.wikipedia.org/wiki/Scalable_Vector_Graphics">SVG</a></li>
    <li><a href="http://en.wikipedia.org/wiki/WebP">WebP</a></li>
    <li><a href="http://en.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></li>
    
    </ul>
  </li>
  
  <li>Sitepoint: <a href="http://www.sitepoint.com/saving-bandwidth-by-using-images-the-smart-way/">Saving Bandwidth by Using Images the Smart Way</a></li>
</ul>

<script>
  var aktivni;
  var obal = document.getElementById("obrazky");
  function zmenit(typ) {
    obal.setAttribute("data-image", typ);
  }
  var obalObr = document.getElementById("obrazky-fotka");
  function zmenitFotku(typ) {
    obalObr.setAttribute("data-image", typ);
  }  
  
  function prebartvit(el) {
    el.style.backgroundColor = "rgb(" +
      Math.floor((Math.random() * 256) + 0) + "," +
      Math.floor((Math.random() * 256) + 0) + "," +
      Math.floor((Math.random() * 256) + 0) + ")";
  }
</script>

