---
title: "Zjištění souřadnic kursoru"
headline: "Zjištění souřadnic myši"
description: "Jak v JavaScriptu zjistit aktuální souřadnice myši (kursoru)."
date: "2013-09-14"
last_modification: "2013-11-14"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>V některých situací (jako třeba u <a href="/baterka">efektu baterky</a> nebo <a href="/kontextova-nabidka">kontextové nabídky</a>) je třeba skriptem sledovat, <b>kde je umístěn kursor</b>. Universální JS funkce sjednocující chování napříč prohlížeči (hlavně <b>IE</b> a ostatní prohlížeče) může vypadat takto:</p>

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

<p>Použití je potom následovné:</p>
<pre><code>var souradnice = getPosition(e);</code></pre>
<ul>
  <li>V <code>souradnice.x</code> bude <b>X-ová souřadnice</b> (nebo také <code>left</code> hodnota).</li>
  <li>V <code>souradnice.y</code> bude <b>Y-ová souřadnice</b> (nebo také <code>top</code> hodnota).</li>  
</ul>

<p>Při nastavování CSS se <b>nesmí zapomenout</b> na přidání jednotky <code>px</code>.</p>
<pre><code>neco.style.left = souradnice.x + "px";
neco.style.top = souradnice.y + "px";</code></pre>

<p>Při používání funkce je nutné předávat <code>event</code>.</p>
<pre><code>&lt;script>
function funkce(<b>e</b>) {
  var souradnice = getPosition(<b>e</b>);
}
&lt;/script>
&lt;p onclick='funkce(<b>event</b>)'></code></pre>
