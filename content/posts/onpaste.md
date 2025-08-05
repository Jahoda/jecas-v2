---
title: "Onpaste – vložení ze schránky"
headline: "Vložení ze schránky <code>onpaste</code>"
description: "JavaScriptová událost <code>onpaste</code> slouží k odchycení vložení obsahu ze schránky."
date: "2015-02-18"
last_modification: "2015-02-19"
status: 1
tags: ["hotova-reseni", "js", "schranka"]
format: "html"
---

<p>U <a href="/formulare">formulářových</a> polí <a href="/input"><code>&lt;input></code></a>/<a href="/textarea"><code>&lt;textarea></code></a>, kde je reálné očekávat, že bude člověk vkládat ze schránky, se hodí toto vložení <b>odchytit</b>. Uživatelé některé údaje kopírují, takže vložení lze současně chápat jako <b>pokyn k validaci</b>.</p>

<pre><code>&lt;input <b>onpaste</b>="vlozeno()"></code></pre>

<p>V novějších prohlížečích (<b>IE 9</b>+) jde místo <code>onpaste</code> použít universálnější událost <a href="/oninput"><code>oninput</code></a>, která se při vložení ze schránky (<kbd>Ctrl</kbd> + <kbd>V</kbd>) rovněž vyvolá, ale není z ní přímo patrné, že se jedná o vložení.</p>




<h2 id="prodleva">Prodleva <code>onpaste</code></h2>

<p>Trošku záludné je chování <code>onpaste</code> v tom, že se událost provede <b>předtím</b>, než se obsah vloží do políčka. Následující kód tedy zobrazí po vložení předchozí hodnotu, což je většinou nežádoucí.</p>

<pre><code>&lt;input onpaste="alert(this.value)"></code></pre>

<div class="live no-source">
  <input onpaste="alert(this.value)" value="Původní hodnota">
</div>



<p>Řešení je práci s hodnotou pole obalit do <a href="/odpocitavani">časovače</a>.</p>

<pre><code>&lt;input onpaste="
  var that = this;
  setTimeout(function(){
    alert(that.value)
  }, 0)
"></code></pre>







<p>Výsledek:</p>

<div class="live no-source">
  <label>Něco vložte:
  <input value="Původní"
    onpaste="
  var that = this;
  setTimeout(function(){
    alert(that.value)
  }, 0)
">  
  </label>
</div>

<p>Vzhledem ke složitějšímu <b>programování uvnitř atributu</b> se nabízí obsluhu pro vložení vytvořit jako samostatnou funkci a v atributu ji pouze zavolat – <code>onpaste="vlozit(this)"</code>. Pozměněná ukázka se stejnou funkčností:</p>

<div class="live">
  <script>
  function vlozit(el) {
    setTimeout(function(){
        alert(el.value)
    }, 0)  
  }    
  </script>
  <label>
    Něco vložte:
    <input onpaste="vlozit(this)" value="Původní">  
  </label>
</div>