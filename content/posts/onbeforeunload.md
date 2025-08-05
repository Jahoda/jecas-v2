---
title: "Upozornění před opuštěním stránky"
headline: "Upozornění před zavřením stránky"
description: "Javascriptová událost <code>onbeforeunload</code> umožňuje pozastavit uzavření/obnovení stránky."
date: "2013-10-09"
last_modification: "2015-07-02"
status: 1
tags: ["js", "js-udalosti", "napady"]
format: "html"
---

<p>Pokud je na webové stránce nějaké složitější aplikační nastavení nebo jen rozepsaný formulář, může být kromě <a href="/zalohovani-formularu">průběžného zálohování</a> vhodné <b>nechat případné uzavření potvrdit</b>.</p>

<p>Kromě ušlechtilých myšlenek, kdy <code>onbeforeunload</code> <i>zachrání</i> uživatele před nechtěným uzavřením prohlížeče nebo <b>obnovením stránky</b>, je taktéž možné návštěvníka zablokováním <b>naštvat</b>, což se nezřídka děje na všelijakých pochybných stránkách — <b>třeba zrovna na této</b>. :–)</p>

<p>Událost <code>onbeforeunload</code> (<i>před-od-načtením</i>) funguje ve všech prohlížečích kromě staré <b>Opery 12</b> a některých mobilních prohlížečů, někdy jde použít alespoň <code>window.onunload</code>.</p>





<h2>Použití</h2>

<pre><code>window.onbeforeunload = function() {
  return "Zpráva před odchodem";
}</code></pre>




<p>Tento kód zablokuje obnovení nebo zavření stránky a v <b>IE</b> a <b>Chromu</b> vypíše <i>„Zpráva před odchodem“</i>, ve Firefoxu by šlo použít třeba <code>alert</code>.</p>



<p><img src="/files/onbeforeunload/ie.png" alt="Zablokování obnovení v IE" class="border"></p>
















<p>Kromě zablokování zavření nebo obnovení a vypsání zprávy je možné provést i nejrůznější jiné akce jako třeba již zmíněné <b>uložení rozepsaného formuláře</b> do lokálního úložiště, <b>odeslání rozepsaného formuláře</b>, <b>přesměrování</b> na nějakou jinou stránku a další.</p>






<h2 id="nabidka">Zobrazení nabídky před opuštěním</h2>

<p>U webů, které něco prodávají nebo nabízejí, jde okamžik před <b>opuštěním/zavřením webu</b> využít k poslední šanci, jak ještě návštěvníka <b>přemluvit k nákupu</b>, <b>získat na něj kontakt</b> a podobně.</p>


<div class="external-content">
  <ul>
    <li>MaxTraffic Blog: <a href="http://maxtraffic.com/blog/13-simple-and-surprisingly-effective-exit-pop-up-examples/">13 Simple and Surprisingly Effective Exit Pop-up Examples</a>
    <br>
    — co umístit do zprávy před opuštěním stránky</li>
  </ul>
</div>



<!-- Ukázka -->
<script>
window.onbeforeunload = function() {
  return "Zpráva před odchodem (onbeforeunload)";
}

window.onunload = function() {
  alert("Zpráva před odchodem (onunload)");
}
</script>
<!-- konec ukázky -->