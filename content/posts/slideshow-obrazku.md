---
title: "Slideshow obrázků"
headline: "Plynulá změna obrázků"
description: "Jak na stránce automaticky plynule měnit obrázky."
date: "2014-12-22"
last_modification: "2014-12-25"
status: 1
tags: ["hotova-reseni", "js", "obrazky", "webove-animace"]
format: "html"
---

<p>Ozvláštnit webovou stránku je možné <b>obrázkovou galerií</b>, kde se budou automaticky v určitém <b>časovém intervalu</b> prohazovat jednotlivé obrázky.</p>

<p>Rozhodně postup automatické změny nelze doporučit pro vytváření populárních prvků v hlavičkách stránek, kde se střídá důležitý obsah, na který má uživatel kliknout – tzv. <b>kolotoč</b> (<i>carousel</i>).</p>

<p><img src="/files/slideshow-obrazku/kolotoc.png" alt="Měl bych použít kolotoč" class="border"></p>

<div class="external-content">
  <ul>
    <li><a href="http://shouldiuseacarousel.com/">Should I Use A Carousel?</a></li>
  </ul>
</div>
































<h2 id="reseni">Řešení</h2>

<p>Cílem je tedy vytvořit box, kde se budou <b>střídat jednotlivé obrázky</b> s nějakou plynulou <a href="/webove-animace">animací</a>.</p>

<p>Pro lepší použitelnost se hodí přidat následující dvě funkce:</p>

<ul>
  <li><b>zastavit přehrávání</b> při najetí na obrázek,</li>
  
  <li><b>přeskočit</b> na další při kliknutí</li>
</ul>

<h3 id="zmena">Plynulá změna</h3>

<p>Asi nejsnazší způsob, jak dosáhnout <b>plynulého přechodu</b>, bude změna <a href="/opacity">průhlednosti</a>. Všechny obrázky se dají do společného <code>&lt;div></code>u a <a href="/position#absolute">absolutně</a> se <b>naposicují přes sebe</b>.</p>

<p>Všechny kromě aktivního obrázku budou <b>100% průhledné</b> (<code>opacity: 0</code>). Aktivní bude naopak neprůhledný (<code>opacity: 1</code>). Přidáním <a href="/transition"><code>transition</code></a> pro průhlednost potom dosáhneme <b>efektu prolnutí</b>.</p>

<p><a href="https://kod.djpw.cz/qzib">Živá ukázka</a></p>


<h3 id="responsivni">Responsivní</h3>

<p>Trochu komplikovanější bude vytvořit celou věc, aby byla <a href="/responsive">responsivní</a>. Nabízí se třeba pro první obrázek (selektor <a href="/first-last-child"><code>:first-child</code></a>) použít relativní/statickou posici, aby roztáhl obal.</p>

<div class="live">
<style>
.slideshow {
    width: 600px;
    position: relative;
    max-width: 100%;
}

.slideshow img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    filter: alpha(opacity=0);
    transition: opacity .4s;
}

.slideshow .show {
    opacity: 1;
    filter: alpha(opacity=100);
}

.slideshow .stoped {
    z-index: 1;
}

.slideshow :first-child {
    position: relative; 
    display: block;
}
</style>

<div class="slideshow">
    <img src="http://lorempixel.com/600/300/0" class="show"><!-- první obrázek -->
    <img src="http://lorempixel.com/600/300/0/0">
    <img src="http://lorempixel.com/600/300/0/0/0">
</div>
<script>
(function(el, time) {
    var timer;
    var active = 0;
    var img = el.querySelectorAll("img");
    var imgCount = img.length;
    
    function change() {
        img[active].className = "";
      
        if (active == (imgCount - 1)) {
            active = 0;
        }
        else {
            active = active + 1;
        }
        img[active].className = "show";
    }
    
    timer = setInterval(change, time);
    
    el.onmouseover = function() {
        clearInterval(timer);
        img[active].className = "show stoped";
    };
    el.onmouseout = function() {
        timer = setInterval(change, time);
    };    
    el.onclick = change;
})(
    document.querySelector(".slideshow"), 
    3 * 1000 // Doba jednoho obrázku v milisekundách
);
</script>
</div>

<p><a href="https://kod.djpw.cz/rzib">Samostatná živá ukázka</a></p>


<h2 id="problemy">Možné problémy</h2>

<p>Kvůli tomu, že se jednotlivé obrázky překrývají, není možné si snadno přes pravé tlačítko myši aktuální obrázek <b>uložit</b>. Ukázka tomu přechází zvýšením <a href="/position#z-index"><code>z-index</code>u</a> při najetí.</p>

<p>V <b>IE 9</b> a starších nebude přechod plynulý kvůli nepodpoře <code>transition</code>.</p>

<p>Všechny obrázky se začnou načítat spolu se stránkou, ne až v momentě, kdy se mají zobrazit.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://metafizzy.co/blog/wrapping-around/">Wrapping around Flickity for infinite looping</a> – nekonečné vodorovné posouvání obsahu (<a href="https://github.com/metafizzy/flickity">GitHub</a>)</li>
  
  <li><a href="http://demosthenes.info/blog/991/Cross-Fading-Background-Images">Cross-Fading Background Images</a> – prolínání obrázků</li>
</ul>


