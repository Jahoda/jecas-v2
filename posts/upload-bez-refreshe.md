---
title: "AJAX upload souborů"
headline: "Upload souborů bez obnovení stránky"
description: "Jak vytvořit <a href="/ajax">ajaxové</a> nahrávání souborů na server bez obnovení stránky."
date: "2013-08-17"
last_modification: "2013-08-17"
status: 1
tags: ["formulare", "hotova-reseni", "js", "js-ajax"]
format: "html"
---

<p>Možné řešení je <b>uploadovací formulář</b> odeslat na zpracovávající skript do neviditelného <code>&lt;iframe&gt;</code>, soubor se nahraje a skript zavolá funkci z nadřazené stránky a předá jí výsledek snažení.</p>

<p><img src="/files/upload-bez-refreshe/schema.png" alt="" class="border"></p>

<h2>Nahrávání bez refreshe</h2>

<script>
function uploadStatus(status) {
	document.getElementById("status").innerHTML = '<span style="background: #A6F874; color: #000; padding: .5em">' + status + '</span>';
}
</script>

<p>Po kliknutí na „Upload“ se soubor odešle do skrytého <code>&lt;iframe></code>u na <a href="/files/upload-bez-refreshe/upload.html">skript</a>, který soubor zpracuje a zavolá funkci na této stránce s předaným parametrem (pro pochopení si zobrazte zdrojový kód).

<div class="live">
<iframe id="frame" name="frame" src="" style="display: none"></iframe>
  <p><b>Ukázka</b> (nic se nikam nenahrává)</p>
<form action="/files/upload-bez-refreshe/upload.html" method="post" enctype="multipart/form-data" target="frame" if="form"> 
  <input type="file" name="file"> 
  <input type="submit" name="upload" value="Upload"> 
</form> 

<p id="status"></p>
  </div>

<h3>Soubor s formulářem</h3>
<p>Funkce <code>uploadStatus</code> se bude volat ze stránky načtené v <code>&lt;iframe&gt;</code>u prostřednictvím <code><b>window.top.window</b>.uploadStatus()</code>.</p>
<pre><code>&lt;script>
function <b>uploadStatus</b>(status) {
	alert(status);
}
&lt;/script>
&lt;iframe id="frame" name="frame" src="" style="<b>display: none</b>">&lt;/iframe>

&lt;form action="upload.php" method="post" enctype="multipart/form-data" target="frame"> 
  &lt;input type="file" name="file"> 
  &lt;input type="submit" name="upload" value="Upload"> 
&lt;/form> 
</code></pre>

<h3>Soubor pro nahrávání <code>upload.php</code></h3>
<pre><code>&lt;?php
// Vlastní nahrání souboru
$stav = "Hláška ze souboru, který uploaduje.";
?>
&lt;script> 
  window.top.window.<b>uploadStatus</b>("&lt;?php echo $stav ?>");
&lt;/script>
</code></pre>

<p>Vlastní <b>upload v PHP</b> může vypadat <a href="http://php.net/manual/en/features.file-upload.post-method.php#example-354">nějak takto</a>.</p>

<h2 id="vypnuty-js">Vypnutý JavaScript</h2>
<p>Bude-li mít uživatel vypnutý JS, je toto řešení značně problematické — po odeslání do neviditelného rámu se zdánlivě <i>nic nestane</i>. </p>

<ol>
  <li>V případě, že potřebujeme funkčnost i bez JS a není potřeba s výsledky uploadu ihned dále pracovat, může se výsledek vypsat přímo do rámu, který bude v takovém případě viditelný.</li>
  <li>Je-li s výsledky potřeba pracovat, nezbývá než použít standardní odesílání.</li>
</ol>