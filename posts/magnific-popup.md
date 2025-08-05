---
title: "„Lightbox“ Magnific Popup"
headline: "Magnific Popup – zajímavý lightbox skript"
description: "Rozumně napsaný, universální a dobře použitelný lightbox skript."
date: "2013-05-09"
last_modification: "2013-12-07"
status: 1
tags: ["knihovny", "lightbox"]
format: "html"
---

<p><a href="http://dimsemenov.com/plugins/magnific-popup/" class="button">Web Magnific Popup</a> <a href="http://dimsemenov.com/plugins/magnific-popup/documentation.html" class="button">Dokumentace</a></p>

<p>Na stránce projektu se lze podívat na hezké řešení vyskakovacích oken pomocí lightboxu.</p>
<p>Zajímavý je rovněž <a href="http://coding.smashingmagazine.com/2013/05/02/truly-responsive-lightbox/">postup tvorby</a>, ze kterého je vidět, že autor věděl, co dělá.</p>
<ol>
  <li>Celé vyskakovací okno je <strong>tvořeno pomocí CSS</strong> a plynule se přizpůsobuje velikosti plochy prohlížeče, nemůže se stát, že JavaScript šířku/výšku špatně vypočte,</li>
  <li>Magnific Popup <strong>neprovádí zdlouhavé otravné animace</strong>, </li>
  <li>obrázky v galerii lze <strong>pohodlně přednačítat</strong> a dokonce nastavit počet preloadovaných obrázků zvlášť pro přechod zpět i vpřed,</li>
  <li><strong>lze ovládat klávesami</strong> (šipky doprava a doleva, klávesou <code>Esc</code> se lightbox zavře),</li>
  <li>rozumný HTML kód a <a href="/vypnuty-js">funkčnost bez JS</a> — co by se s JS mělo otvírat ve vyskakovacím okně se <em>otevře</em> běžným odkazem,</li>
  <li><strong>možnost vyskakovací okno lehce vypnout</strong> např. při nízké šířce okna,</li>
  <li>ovládací prvky jsou <em>nakresleny</em> pomocí CSS, <strong>neplýtvá se tedy HTTP spojeními</strong> na obrázek/obrázky,</li>
  <li><strong>předvídatelné ovládání</strong>, jednotlivé prvky kolem sebe mají <em>polštář</em>, ve kterém jsou stále klikací,</li>
  <li><strong>kvalitní dokumentace</strong>.</li>
</ol>

<p>Nevýhody?</p>
<ol>
  <li>Dobře funkční až od <b>Internet Exploreru 8</b>, částečně od <b>IE 7</b>.</li>
  <li>Pro frameworkové odpůrce: závislé na jQuery/<a href='/framework-zepto'>Zepto.js</a>.</li>
</ol>

<h2 id="priklady">Příklady použití</h2>
<h3>Vstupní stránka</h3>
<p>Kromě zobrazení na vyžádání (po kliknutí na tlačítko a podobně) je možné lightbox zobrazit <b>ihned po načtení</b>. <a href="http://kod.djpw.cz/gnv">Ukázka</a> (další možnosti <a href="/vstupni-stranka">vytvoření vstupní stránky</a>).</p>

<p>Jako <code>src</code> je možné nastavit i <b>kus HTML kódu</b>.</p>

<pre><code>window.onload = function (){
  $.magnificPopup.open({
      items: [
        {
          src: $('&lt;div class="popup">Vstupní vyskakovací okno&lt;/div>'),      
        }
      ]
  });
}</code></pre>

<h3 id="html-stranka">Zobrazení HTML stránky</h3>
<p>Docílit se dá nejen zobrazování obrázků, ale i jiných HTML stránek.</p>

<ul>
  <li>V <code>&lt;iframe></code>. <a href="http://kod.djpw.cz/env">Ukázka</a>.
  <pre><code>$("#tlacitko").magnificPopup({
    items: [{
        type: 'iframe',
        src: 'http://example.com',       
      }]
});
</code></pre>
  </li>
  <li>Z <b>vlastní domény</b> to jde kromě toho i <a href="/ajax">AJAXem</a>.
    <pre><code>&lt;a href="/url-stranky" class="<b>ajax</b>">Odkaz, jehož cíl se načte AJAXem do lightboxu&lt;/a>
&lt;script>
  $('.<b>ajax</b>').magnificPopup({type: 'ajax'});
&lt;/script></code></pre>
  </li>
</ul>


<h2 id="odkazy">Odkazy jianm</h2>

<ul>
  <li><a href="http://photoswipe.com/">PhotoSwipe</a></li>
</ul>