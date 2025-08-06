---
title: "Universální hover efekt"
headline: "Universální hover efekt pro různé barvy pozadí"
description: "Jak vytvořit universální <code>:hover</code> efekt pro různě barevná tlačítka."
date: "2014-04-19"
last_modification: "2014-04-20"
status: 1
tags: ["css", "hotova-reseni", "napady"]
format: "html"
---

<p>V případě, že na webové stránce používáme <b>různě barevné</b> odkazy nebo tlačítka, je trochu nepohodlné pro každou barvu zvlášť vytvářet samostatný efekt při najetí myší (<code>:hover</code>).</p>

<p>Dát uživateli <i>potvrzení</i>, že na tlačítko najel změnou stylu, bývá docela vhodné. Jak tedy pohodlně na to?</p>

<h2 id="opacity">Průhlednost (<code>opacity</code>)</h2>

<p>Jako příklad mohou posloužit <a href="/sdileci-tlacitka">tlačítka sociálních sítí</a>:</p>

<div class="live">
  <style>
.tlacitka a {
    display: inline-block; 
    text-align: center; 
    padding: .2em .5em; 
    color: #fff; 
    text-decoration: none;
    position: relative;
    border: 0;
}
.tlacitka .fb-like, 
.tlacitka .fb-like:hover {background: #4B67A1}
.tlacitka .twitter-share-button,
.tlacitka .twitter-share-button:hover {background: #00ACEE}
.tlacitka .g-plusone,
.tlacitka .g-plusone:hover {background: #DD4B39}
  </style>
  <p class="tlacitka">
    <a href="http://www.facebook.com/sharer.php?u=http://jecas.cz/" class="fb-like" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false">Facebook</a>
    <a href="http://twitter.com/share?text=Poznámky+k+webdesignu&amp;url=http://jecas.cz/" class="twitter-share-button">Tweet</a>
    <a href="https://plus.google.com/share?url=http://jecas.cz/" class="g-plusone" data-size="medium">Google +</a>
  </p>
</div>

<p>Cílem je, aby každé tlačítko mělo <code>:hover</code> ve své barvě, aniž by se musela konkrétní barva pro každý jeden odkaz nastavovat.</p>

<p>Nejjednodušší řešení je asi měnit <a href="/opacity">průhlednost</a> (<code>opacity</code>). Buď ji při <code>:hover</code>u snižovat.</p>

<div class="live">
  <style>
    .opacity a:hover {
      filter: alpha(opacity=70); 
      opacity: .7
    }
  </style>
  <p class="tlacitka opacity">
    <a href="http://www.facebook.com/sharer.php?u=http://jecas.cz/" class="fb-like" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false">Facebook</a>
    <a href="http://twitter.com/share?text=Poznámky+k+webdesignu&amp;url=http://jecas.cz/" class="twitter-share-button">Tweet</a>
    <a href="https://plus.google.com/share?url=http://jecas.cz/" class="g-plusone" data-size="medium">Google +</a>
  </p>
</div>

<p>Nebo naopak zvyšovat.</p>

<div class="live">
  <style>
    .opacity-zvysit a {
      filter: alpha(opacity=70); 
      opacity: .7
    }
    .opacity-zvysit a:hover {
      filter: alpha(opacity=100); 
      opacity: 1
    }
  </style>
  <p class="tlacitka opacity-zvysit">
    <a href="http://www.facebook.com/sharer.php?u=http://jecas.cz/" class="fb-like" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false">Facebook</a>
    <a href="http://twitter.com/share?text=Poznámky+k+webdesignu&amp;url=http://jecas.cz/" class="twitter-share-button">Tweet</a>
    <a href="https://plus.google.com/share?url=http://jecas.cz/" class="g-plusone" data-size="medium">Google +</a>
  </p>
</div>

<h2 id="prekryti">Překrytí průhledným elementem</h2>

<p>Výše uvedená změna průhlednosti přecejenom nemusí být vždy ideální. Hezčí efekt jde vykouzlit <b>překrytím jednobarevným elementem</b>, vloženým přes <a href="/css-selektory#before-after"><code>:before/:after</code></a>.</p>

<p>Tento pseudoelement se <a href="/position#absolute">absolutně naposicuje</a> přes původní obsah, nastaví se mu pozadí (např. bílá v případě zesvětlení, černá v případě ztmavení) a celé se to hodně zprůhlední (<code>opacity: 0.1</code>).</p>

<h3>Zesvětlení</h3>
<div class="live">
  <style>
.prekryt a:hover:before {
    content: "";
    background: #fff;
    width: 100%;
    height: 100%;
    position: absolute; 
    top: 0; 
    left: 0;
    zoom: 1;
    filter: alpha(opacity=10); 
    opacity: .1;
}
  </style>
  <p class="tlacitka prekryt">
    <a href="http://www.facebook.com/sharer.php?u=http://jecas.cz/" class="fb-like" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false">Facebook</a>
    <a href="http://twitter.com/share?text=Poznámky+k+webdesignu&amp;url=http://jecas.cz/" class="twitter-share-button">Tweet</a>
    <a href="https://plus.google.com/share?url=http://jecas.cz/" class="g-plusone" data-size="medium">Google +</a>
  </p>
</div>

<h3>Ztmavení</h3>
<div class="live">
  <style>
.prekryt-tma a:hover:before {
    content: "";
    background: #000;
    width: 100%;
    height: 100%;
    position: absolute; 
    top: 0; 
    left: 0;
    zoom: 1;
    filter: alpha(opacity=10); 
    opacity: .1;
}
  </style>
  <p class="tlacitka prekryt-tma">
    <a href="http://www.facebook.com/sharer.php?u=http://jecas.cz/" class="fb-like" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false">Facebook</a>
    <a href="http://twitter.com/share?text=Poznámky+k+webdesignu&amp;url=http://jecas.cz/" class="twitter-share-button">Tweet</a>
    <a href="https://plus.google.com/share?url=http://jecas.cz/" class="g-plusone" data-size="medium">Google +</a>
  </p>
</div>

<p><a href="https://kod.djpw.cz/ktcb">Samostatná ukázka</a></p>

<h3 id="ie8">Internet Explorer 8 a 9</h3>
<p>Alternativně k <code>opacity</code> by šlo rovnou použít <a href="/opacity#rgba"><code>rgba</code></a>, ale to funguje až od <b>IE 9</b>.</p>

<p>Vytvoření pseudo-elementu přes <code>:before</code>/<code>:after</code> sice funguje už v <b>IE 8</b>, nicméně u pseudo-elementů v tomto prohlížeči není možné nastavovat průhlednost. Takže je stejně nejspíš nutné použít další element uvnitř odkazu. <a href="https://kod.djpw.cz/rtcb">Ukázka</a>.</p>

<h3 id="vylepseni">Vylepšení <code>:hover</code>u</h3>

<p>Samotnou podobou <b>hover efektu</b> může ještě vyšperkovat obrázkový <a href="/gradient">CSS gradient</a> (<a href="https://kod.djpw.cz/ltcb">ukázka</a>) nebo <a href="/transition">přechodový efekt <code>transition</code></a>.</p>

<h2 id="filter">CSS vlasnost <code>filter</code></h2>

<p>Dle CSS specifikace by se k ztmavení/rozsvícení báječně hodil CSS filter <code>brightness</code>:</p>

<pre><code>.ztmavit a:hover {
  filter: brightness(90%);
}
.zesvetlit a:hover {
  filter: brightness(110%);
}
</code></pre>

<p>Bohužel ale momentálně funguje jen ve <b>Webkitu</b> (s <a href="/css-prefixy">prefixem <code>-webkit-</code></a>). <a href="https://kod.djpw.cz/qtcb">Ukázka</a>.</p>


<h2 id="focus-active">Použití <code>:focus</code> a <code>:active</code></h2>

<p>Při vytváření <code>:hover</code> stylu je dobrou volbou rovnou stejný styl přidat i pro <a href="/css-selektory#uzivatelske-akce"><code>:focus</code> a <code>:active</code></a>, pokud tedy <code>:focus</code> a <code>:active</code> nemají už styly vlastní.</p>

<p>Nedá to moc práce navíc a zlepší to <b>uživatelský dojem</b>.</p>