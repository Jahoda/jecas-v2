---
title: "Posice kursoru v poli"
headline: "Umístění kursoru v poli"
description: "Jak v JavaScriptu zjistit posici, na které je kursor v textovém poli."
date: "2015-02-19"
last_modification: "2015-11-10"
status: 1
tags: ["formulare", "hotova-reseni", "js"]
format: "html"
---

<p>Při <b>okamžité validaci</b> formulářových polí se může hodit znát místo, kde je zrovna kursor.</p>

<p>Od <b>IE 9</b> je možné zjistit aktuální místo kursoru z vlastnosti <code>selectionStart</code>. Zjišťovat posici má smysl hlavně při události <code>onkeyup</code> (po uvolnění klávesy).</p>

<pre><code>&lt;input
  onkeyup="alert(this.<b>selectionStart</b>)"
></code></pre>


<div class="live no-source">
  <label>
    Zobrazit posici kursoru: 
    <input
      onkeyup="this.nextElementSibling.innerHTML = (this.selectionStart)"
    >
    <span></span>
  </label>
</div>


<h2 id="zmena">Změna umístění kursoru</h2>

<p>Pomocí <code>selectionStart</code> jde i umístit kursor na vybrané místo.</p>

<pre><code>input.selectionStart = 0; // začátek na 0</code></pre>

<p>Následující pole bude mít po vybrání (<code>onfocus</code>) kursor před zavináčem:</p>

<div class="live">
  <input type="text" value="@" onfocus="this.selectionStart = this.selectionEnd = 0">
</div>

<p><b>Chrome</b> a <a href="/microsoft-edge"><b>Edge</b></a> mají problém s označením výběru při focusu.</p>

<p>Je možné použít <code>onclick</code>, ale potom je vidět poskočení kursoru z konce na začátek:</p>

<div class="live">
<input type="text" value="@" onclick="this.selectionStart = this.selectionEnd = 0">  
</div>

<p><b>Nejlepšího výsledku</b> napříč prohlížeči jde nejspíš dosáhnout pomocí obalení do časovače při použití <code>onfocus</code>:</p>

<div class="live">
  <input type="text" value="@" onfocus="var that = this; setTimeout(function(){that.selectionStart = that.selectionEnd = 0})">  
</div>

<h3 id="selectionEnd">Konec výběru <code>selectionEnd</code></h3>

<p>Kromě vlastnosti <code>selectionStart</code> existuje ještě <code>selectionEnd</code>, která znamená konec výběru. Nastavením odlišného startu a konce jde potom označit vybranou část políčka:</p>

<div class="live">
  <input type="text" id="zmenaUmisteni" value="123456789">
  <p><button onclick="zmenaUmisteni.focus(); zmenaUmisteni.selectionStart = 2; zmenaUmisteni.selectionEnd = 5">Označit 3–5</button></p>
</div>

<p>Výběr se začíná číslovat od nuly, takže <code>selectionStart = 2</code> přesune začátek výběru za 2. znak.</p>



<h2 id="starsi">Starší IE</h2>

<p>Pro <b>IE 8</b> a starší je pro stejnou funkčnost nutné použít <code>document.selection.createRange()</code> a metody <code>moveStart</code>/<code>moveEnd</code>.</p>

<pre><code>var sel = document.selection.createRange();
sel.moveStart('character', -pole.value.length);
posice = sel.text.length;</code></pre>

<p>Oba postupy potom stačí zkombinovat.</p>

<p><a href="https://kod.djpw.cz/qpkb">Živá ukázka</a></p>