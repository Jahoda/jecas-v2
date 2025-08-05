---
title: "Jak zjistit počet znaků a slov"
headline: "Počet znaků a slov v textu"
description: "Jak spočítat délku (počet znaků), počet slov, řádků nebo odstavců v textu."
date: "2013-11-25"
last_modification: "2013-12-06"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>U následujícího textu se počítají znaky, slova, řádky a odstavce. Zároveň jsou vypsána slova, co se v textu alespoň <b>dvakrát opakují</b>. Čím častěji se opakují, tím mají výraznější barvu. Nejčastěji používané <b>předložky jsou ignorovány</b>.</p>

<div class="live">
  <script>
function statistiky(el) {
  var znaku = el.value.length, slov = 0, odstavcu = 0, radku = 0, cetnostSlov = "", cetnost = {};
  
  if (znaku > 0) {  
    /* Přeskakování předložek */
    var preskocitSlova = ["a", "o", "i", "na", "od", "do", "pod", "přes", "u", "v", "ve", "nad", "pod", "k", "při", "po", "se", "s", "to", "pro", "z", "je", "nebo"];
    var preskocit = [];
    for (preskoc in preskocitSlova) {
      preskocit[preskocitSlova[preskoc]] = true;
    }
  
    var pocetMezer = el.value.match(/\b/g);
    slov = pocetMezer ? (pocetMezer.length/2) : 0;
    var pocetOdstavcu = el.value.split(/\n{2,}/);
    odstavcu = pocetOdstavcu ? pocetOdstavcu.length : 0;
    var pocetRadku = el.value.split("\n");
    radku = pocetRadku ? pocetRadku.length : 0;      
    
    /* Výpis opakovaných slov */
    var slova = el.value.toLowerCase().match(/([a-záäéëěíóöôúůüýčďňřŕšťžĺľ]+)/gi);
    for (var i = 0; slova[i]; i++) {
      var slovo = slova[i];      
      if (preskocit[slovo]) continue;
      cetnost[slovo] = cetnost[slovo] || 0;
	  cetnost[slovo]++;
    }
    
    for (slovo in cetnost) {
      cetnostSlov += (cetnost[slovo] > 1 ? "<span title='Kolikrát: " + cetnost[slovo] + "×' class='opakovani opak" + cetnost[slovo] + "'>" + slovo + "</span> " : "");
    }
  }
  
  document.getElementById("statistiky").innerHTML = "<span class='pocet'>Znaků: " + znaku + "</span> <span class='pocet'>Slov: " + slov + "</span> <span class='pocet'>Odstavců: " + odstavcu + "</span> <span class='pocet'>Řádků: " + radku + "</span> <span class='pocet'>Opakovaná slova: " + cetnostSlov + "</span>";
}    
  </script>
  <style>
    .statistiky .pocet, .statistiky .opakovani {display: inline-block; background: #efefef; padding: 0 .5em}
    .statistiky .opakovani {background: #F07376}
    .statistiky .opak2 {background: #FDEEEE}
    .statistiky .opak3 {background: #FDDFE0}
    .statistiky .opak4 {background: #F9CCCD}
    .statistiky .opak5 {background: #F8AFB1}
    .statistiky .opak6 {background: #E79698}
  </style>
  <textarea name="text" id="text" onkeyup="statistiky(this)" style="width: 99%; height: 200px">Jakou má zdejší text délku, kolik slov má tento text? Neopakují se v textu nějaká slova?</textarea>
<div id="statistiky" class="statistiky"></div>
<script>
  statistiky(document.getElementById("text"));
</script>
</div>


<h2 id="reseni">Jak to udělat?</h2>
<p>Jak všechny uvedené věci <b>zjišťovat JavaScriptem</b>? Samostatná <a href="http://kod.djpw.cz/stt">ukázka</a>.</p>

<h3 id="znaku">Počet znaků</h3>
<p>Pro formulářové pole (jako je použitá <code>&lt;textarea></code>) stačí prosté:</p>
<pre><code>var delka = pole.value.length;</code></pre>
<p>K úvaze je, zda obsah nejprve neočistit o <b>prázdné znaky</b> funkcí <code>trim</code>.</p>

<h4 id="trim">Funkce <code>trim</code></h4>
<p>Ta funguje až <b>od IE 9</b>, ale dá se doskriptovat:</p>
<pre><code>if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '')
  }
}</code></pre>
<p>Nebo rovnou použít zmíněný regulární výraz <code>/^\s+|\s+$/g</code>.</p>

<h3 id="pocet-slov">Počet slov</h3>
<p>Kolik slov text obsahuje, se dá zjistit počítáním <i>konců slov</i> (v <b>regulárních výrazech</b> <code>\b</code>).</p>
<pre><code>var slov = pole.value.match(/\b/g).length/2;</code></pre>

<h3 id="pocet-radku">Počet řádků</h3>
<p>Pro spočítání řádku stačí zjistit počet výskutů <code>\n</code> v celém textu:</p>
<pre><code>var radku = pole.value.split("\n").length;</code></pre>

<h3 id="pocet-odstavcu">Počet odstavců</h3>
<p>Pro zjišťování, kolik odstavců text tvoří, je nutné vybrat, co <b>odstavec</b> bude.</p>

<ol>
  <li>Nový odstavec tvoří 2 a více odřádkování:
    <pre><code>var odstavcu = pole.value.split(/\n{2,}/).length;</code></pre>
  </li>
  <li>Nový řádek = nový odstavec:
    <pre><code>var odstavcu = pole.value.split(/\n<b>+</b>/).length;</code></pre>
  </li>  
</ol>

<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li><a href="http://www.online-utility.org/text/analyzer.jsp">Text Analyzer</a></li>
  <li><a href="http://euri.ca/2013/quick-javascript-word-frequency-counter/">Word Frequency Counter</a></li>
  <li><a href="https://gist.github.com/rocktronica/2625413">wordfrequency.js</a></li>
  <li><a href="https://github.com/RadLikeWhoa/Countable">Countable</a></li>
</ul>

<!-- Stará ukázka: http://kod.djpw.cz/vft http://kod.djpw.cz/vjt -->