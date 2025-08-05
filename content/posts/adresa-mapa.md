---
title: "Adresa a mapa"
headline: "Adresa a mapa"
description: "Jak správně zadávat na webové stránce svou adresu a jako zajistit její zobrazení na mapě."
date: "2014-01-13"
last_modification: "2014-02-22"
status: 1
tags: ["mapy", "napady"]
format: "html"
---

<p>Pro zápis adres existuje speciální HTML značka <code>&lt;address></code> (dvě <kbd>d</kbd> a dvě <kbd>s</kbd>).</p>

<div class="live">
  <style>
    address.bez {font-style: normal}
  </style>
  <address id="priklad-adresy">
    Thunovská 178/10<br>
    Praha 1<br> 
    118 00
  </address>
</div>

<p>Ve výchozím nastavení se zobrazuje kursivou, což jde snadno změnit/zurušit <button onclick="toggle(document.getElementById('priklad-adresy'), 'bez')">změnou</button> <code>font-style</code> na <code>normal</code>.</p>

<h2 id="vyhledatelnost">Adresu by mělo jít vyhledat</h2>

<p>Zásadní požadavek pro uvedenou textovou adresu je v tom, aby při <b>zkopírování a zadání</b> do <b>mapové aplikace</b> byla řádně vyhodnocena. A na mapě se daná adresa zobrazila <b>na správném místě</b>.</p>

<p>To může někdy komplikovat zmatené číslování, které se v Čechách používá, kdy ve městech mívají domy <b>číslo popisné i  číslo orientační</b> (obvykle se oddělují lomítkem).</p>

<p>Při uvedení <b>pouze orientačního čísla</b> (zpravidla to druhé za lomítkem) může snadno dojít k nejednoznačnosti, kdy existuje druhá budova s <b>číslem popisným</b>, které se shoduje s <b>orientačním</b> číslem budovy první.</p>

<h2 id="nahled">Interaktivní náhled mapy</h2>

<p>Mapové služby jako:</p>

<ul>
  <li><a href="http://mapy.cz">Mapy.cz</a></li>
  <li><a href="http://maps.google.cz">Google Maps</a></li>
</ul>

<p>Nabízejí vložení <i>živé</i> mapy do stránky prostřednictvím rámu (konkrétně <code>&lt;iframe></code>).</p>

<h3 id="mapy-cz">Mapy.cz</h3>
<p>Mapy.cz mají tuto funkci vpravo nahoře.</p>

<p><img src="/files/adresa-mapa/mapy-cz.png" alt="Získání odkazu na mapu z Mapy.cz" class="border"></p>

<h3 id="google-maps">Google Maps</h3>
<p>U Google Maps je podobná funkce lehce ukrytá.</p>

<p><img src="/files/adresa-mapa/google-maps.png" alt="Získání odkazu na mapu z Google Maps" class="border"></p>

<h2 id="obrazek">Obrázek a odkaz</h2>

<p>Osobně ale doporučuji raději z mapy udělat screenshot, <b>vyříznout z něj podstatnou část</b> a tu uložit jako obrázek na vlastní server. S tím, že tento obrázek se vloží do odkazu mířící na velkou mapu.</p>


<pre><code>&lt;a href="http://mapy.cz/s/9eh7">
  &lt;img src="obrazek-mapy.png" width="šířka" height="výška" alt="Naše poloha na mapě">
&lt;/a></code></pre>

<p>Proč?</p>

<ol>
  <li>Načtení funkční interaktivní mapy do <code>&lt;iframe></code> zbytečně <b>prodlouží načítání stránky</b>.</li>
  <li>Návštěvník si mapu stejně nejspíš rozklikne do <b>plnohodnotné velké podoby</b>.</li>
</ol>

<p>(Neplatí pochopitelně pro webové stránky, kde je interaktivní mapa <a href="http://www.mechaniky.cz/">hlavní součástí</a> stránky.)</p>

<h2 id="staticke-api">Statické API</h2>

<p><a href="http://webylon.info"><b>Chamurappi</b></a> mě upozornil, že Google Mapy v <i><a href="http://maps.google.com/help/terms_maps.html">licenci</a> zakazují „kopírování, překládání, úpravy nebo vytváření odvozeného díla obsahu nebo jeho části“ a jsou schopní to připomínat</i>.</p>

<p>Lepší řešení tedy bude použít <a href="https://developers.google.com/maps/documentation/staticmaps/?hl=cs">statické API</a>. To je ještě výhodnější, protože se nemusíme řezat s obrázkem, ale vložit si ho přímo do stránky z Google Maps. Výhodnější je tedy pro <b>malé weby</b>, které nevyužijí moc požadavků, protože od určité hranice je <b>API placené</b>.</p>

<div class="live">
<form action=".?" onsubmit="prekreslit(this.adresa.value, this.zoom.value); return false">
  <p><label>Adresa: <input type="text" name="adresa" value="Thunovská 178/10
 Praha"></label> <button>Překreslit</button></p>
  <p><label>Zoom: <input type="range" min=1 value=15 max=20 name="zoom"></label></p>
</form>
<img id="mapa" src="http://maps.googleapis.com/maps/api/staticmap?center=Praha&size=400x200&sensor=false&zoom=15" alt="">
<p><code id="url-mapy"></code></p>
<script>
function prekreslit(adresa, zoom) {
    var url = "http://maps.googleapis.com/maps/api/staticmap?center=" + encodeURIComponent(adresa) + "&size=400x200&sensor=false&zoom=" + encodeURIComponent(zoom);
    document.getElementById("mapa").src = url;
    document.getElementById("url-mapy").innerHTML = url;
}
</script>
</div>

<h2 id="odkazy">Odkazy</h2>
<ul>
  <li><a href="http://openlayers.org/">OpenLayers: Free Maps for the Web</a></li>
  
  <li><a href="http://designmodo.com/vector-world-maps/">20 Free and Premium Vector World Maps</a></li>
</ul>