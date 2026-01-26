---
title: "Baterka v CSS a JavaScriptu"
headline: "Vytvoření efektu baterky v CSS a JS"
description: "Jak jednoduše vytvořit na stránce efekt baterky? Tedy ztmavit web a prohlížet ho jakýmsi průzorem."
date: "2013-05-13"
last_modification: "2013-05-13"
status: 1
tags: ["css", "hotova-reseni", "js"]
format: "html"
---

<div class="live nosource" style="position: static">
<style>
.js .baterka {
    display: none;
    position: absolute; 
    top: 0; 
    left: 0; 
    background: url("/files/baterka/baterka.png") center center no-repeat; 
    width: 100%; 
    height: 100%; 
    opacity: 0.7; -moz-opacity: 0.7; filter:alpha(opacity=70);
}
</style>

<div id="baterka" class="baterka"></div>

<script>
var b = document.getElementById("baterka");

function getPosition(e) {
    e = e || window.event;
    var cursor = {x:0, y:0};

    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    } 
    else {
        cursor.x = e.clientX + 
            (document.documentElement.scrollLeft || 
            document.body.scrollLeft) - 
            document.documentElement.clientLeft;
        cursor.y = e.clientY + 
            (document.documentElement.scrollTop || 
            document.body.scrollTop) - 
            document.documentElement.clientTop;
    }
    return cursor;
}
  
document.onmousemove = function(e){ moveLight(e); }
document.onmousewheel = function(){ moveLight(); } /* IE7, IE8 */
if(document.addEventListener){ /* Chrome, Safari, Firefox */
    document.addEventListener('DOMMouseScroll', moveLight, false);
}

function moveLight(e) {
    var cursorPos = getPosition(e);
    b.style.backgroundPosition = (cursorPos.x - 2500) + "px " + (cursorPos.y - 2500) + "px";
}
</script>

<button id="vypnout-baterku" style='position: fixed; width: 200px; cursor: pointer; background: red; color: #fff; border: 1px solid red; top: 0; left: 50%; margin-left: -100px; z-index: 10; display: none' onclick='b.style.display = this.style.display = "none"'>Vypnout baterku</button>
<button onclick="b.style.display = document.getElementById('vypnout-baterku').style.display = 'block'">Zapnout baterku</button>
</div>


<p>Řešení je možná jednodušší, než se zdá.</p>
<ol>
<li>Základem je velký černý <a href='/files/baterka/baterka.png'>obrázek</a> s průhlednou dírou uprostřed (asi by mohl mít větší rozměr než 5000 × 5000 px),
<li>ten se nastaví elementu roztaženému přes celou stránku jako <code>background-image</code>,
  <li>pomocí <a href="/opacity"><code>opacity</code></a> (popřípadě pro starší Explorery <code>filter:alpha(opacity=<b>XX</b>)</code>) se nastaví úroveň <i>tmy</i>,
<li>JavaScript bude tento obrázek posouvat dle pohybu myši a tím vytvářet výsledný efekt.
</ol>

<h2 id="zjisteni-kursoru">Funkce pro zjištění posice kursoru</h2>
<p>To je nějaká hotová funkce sjednocující chování napříč prohlížeči.
<pre><code>function getPosition(e) {
    e = e || window.event;
    var cursor = {x:0, y:0};

    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    } 
    else {
        cursor.x = e.clientX + 
            (document.documentElement.scrollLeft || 
            document.body.scrollLeft) - 
            document.documentElement.clientLeft;
        cursor.y = e.clientY + 
            (document.documentElement.scrollTop || 
            document.body.scrollTop) - 
            document.documentElement.clientTop;
    }
    return cursor;
}</code></pre>

<h2 id="css">CSS</h2>
<pre><code>.baterka {
    position: absolute; 
    top: 0; 
    left: 0; 
    background: url("baterka.png") center center no-repeat; 
    width: 100%; 
    height: 100%; 
    opacity: 0.7; -moz-opacity: 0.7; filter:alpha(opacity=70); /* průhlednost na 70 % */
}</code></pre>

<h2 id="js">JavaScript</h2>
<pre><code>document.onmousemove = function(e) {
    var cursorPos = getPosition(e); // zjištění posice kursoru
    /* Nastavení posice obrázku, 2500 je polovina šířky „obrázku s dírou“ */
    b.style.backgroundPosition = (cursorPos.x - 2500) + "px " + (cursorPos.y - 2500) + "px";
};</code></pre>
