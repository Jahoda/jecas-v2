---
title: "Lightboxová vstupní stránka"
headline: "Lightboxová vstupní stránka ihned po načtení"
description: "Jak vytvořit lightbox okno, které po načtení stránky překryje obsah."
date: "2013-05-20"
last_modification: "2013-11-04"
status: 1
tags: ["css", "hotova-reseni", "js", "lightbox"]
format: "html"
---

<p>V dávných dobách měl každý správný web <b>vstupní stránku</b> s odkazem na hlavní web. Dnes jde k tomu využít JavaScript.</p>
<p>Jak jednoduše vytvořit <i>lightboxové</i> <b>vyskakovací okno</b> ihned po načtení stránky.</p>
<p>Taková věc nemusí být <b>jen</b> bezúčelným otravným prvkem, ale může dávat i smysl v případech jako:

<ul>
  <li>upozornění na nějakou <b>významnou událost</b> na stránce,
    <li>upozornění na <b><i>speciální</i> obsah</b>,
      <li><b>reklama</b>.
</ul>

<h2 id=jak>Jak na to?</h2>
<h3 id="lightbox">Lightbox</h3>
<p>První možnost je použít nějaký <b>lightbox skript</b> — třeba <a href="/magnific-popup">Magnific Popup</a> ihned po načtení stránky (<a href="https://kod.djpw.cz/gnv">ukázka</a>).</p>
<pre><code>$.magnificPopup.open({
    items: [
      {
        src: $('&lt;div class="popup">Vstupní vyskakovací okno&lt;/div>'),
      }
    ]
});</code></pre>
<p>Jako obsah (tj. do <code>src</code>) je možné umístit <b>obrázek</b>, <b>HTML kód</b> (jako na ukázce) nebo odkaz na jinou <b>HTML stránku</b>.</p>

<h3 id="vlastni">Vlastní řešení</h3>
<p>Druhá možnost je si potřebný efekt z lightbox skriptu vytvořit <i>ručně</i>. V podstatě stačí jen obrázek/element <a href="/centrovani">vycentrovat</a> a po kliknutí ho <a href="/zobrazit-skryt">zavřít změnou třídy</a> + vytvořit <a href="/opacity">částečně průhledný</a> element, co překryje původní obsah.</p>

<div class="live">
  <style>
    .dialog-background {width: 100%; height: 100%; background: #000; opacity: .85; position: fixed; left: 0; top: 0; display: none}
    .dialog {width: 50%; position: fixed; left: 50%; top: 50%; height: 200px; margin-top: -100px; margin-left: -25%; background: #fff; color: #000; display: none;}
    .show .dialog, .show .dialog-background {display: block;}
  </style>
  
  <script>
    function openDialog(id) {
        document.getElementById(id).className+= " show";
        document.documentElement.style.overflow = "hidden";
    }
    
    function closeDialog(id) {
        document.getElementById(id).className = "dialog-cover";
        document.documentElement.style.overflow = "visible";	
    }
  </script>
  
  <div id="okno" class="dialog-cover">
    <div class="dialog-background"></div>
    <div class="dialog">
      <div style="padding: 1em">
        <h2>Vstupní stránka</h2>
    
        <p>Vlastní vyskakovací obsah ihned po načtení.</p>
        <button onclick='closeDialog("okno")'>Zavřít</button>
      </div>
    </div>
  </div>
  <script>
    openDialog("okno");
  </script>
  <p>(Okno se automaticky otevírá při <a href='/vstupni-stranka'>načtení stránky</a>.)</p>
</div>