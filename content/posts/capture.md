---
title: "Capture"
headline: "Capture"
description: "Vyfocení obrázku nebo nahrání videa z mobilu přímo na web."
date: "2014-11-26"
last_modification: "2014-11-26"
status: 0
tags: []
format: "html"
---

<p>Pokud chceme na mobilní webové aplikaci umožnit uživateli <b>vyfocení obrázku</b> nebo <b>natočení videa</b>, jde k tomu použít standardní formulářové <a href="/input#type-file">políčko pro <b>upload</b></a>.</p>

<pre><code>&lt;input type="file" accept="image/*"></code></pre>

<p>Po kliknutí do něj nabídne <b>mobilní operační systém</b> jako jednu z možností <b>vytvoření fotografie</b> (popř. videa).</p>

<p>HTML atribut <code>capture</code> potom řeší přímé určení, že se bude fotit.</p>

<pre><code>&lt;input type="file" accept="image/*" <b>capture="camera"</b>></code></pre>

<pre><code>&lt;input type="file" accept="image/*;<b>capture=camera</b>"></code></pre>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>HTML5Rocks: <a href="http://www.html5rocks.com/en/tutorials/getusermedia/intro/">Capturing Audio &amp; Video in HTML5</a></li>
  
  <li>W3C: <a href="http://dev.w3.org/2009/dap/camera/">HTML Media Capture</a></li>
</ul>
