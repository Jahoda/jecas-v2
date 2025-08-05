---
title: "CSS content"
headline: "CSS vlastnost <code>content</code>"
description: "CSS vlastnost <code>content</code> slouží k zapisování obsahu do stránky z kaskádových stylů."
date: "2014-04-11"
last_modification: "2014-04-11"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<h2 id="zapis">Zápis</h2>
<pre><code>element:before {
  content: "Textový obsah před";
}
element:after {
  content: "Textový obsah po";
}</code></pre>


<h2 id="podpora">Podpora</h2>
<p>Vlastnost <code>content</code> (česky obsah) umožňuje nastavit elementu <b>textový obsah</b>. Funguje od <b>IE 8</b> a dá se používat <b>jen</b> na <a href="/css-selektory#before-after">pseudo-elementech <code>:before</code> a <code>:after</code></a>. (V prohlížeči <b>Opera 12</b> a starších, jde <code>content</code>em i přepisovat původní obsah samotného elementu.)</p>

<div class="live">
  <style>
    .test-content:before {
          content: "Ahoj ";
    }
  </style>
  <p class="test-content">světe! („Ahoj“ je vypsané pomocí CSS.)</p>
</div>

<h2 id="vyuziti">Využití</h2>

<p>K čemu ale <code>content</code> <b>využít</b>? Vypisovat text přes CSS místo přímého umístění do HTML není nic převratného.</p>

<ol>
  <li>
    <p>První případ je, když se má někde něco vypisovat a není možné / nechce se nám upravovat HTML.</p>
    
    <p>Třeba si můžeme nají na stránce všechny <small>elementy <code>&lt;small></code></small>, dát jejich obsah do závorky a připsat k tomu „Poznámka:“. </p>
    
    <div class="live">
      <style>
        .poznamky small:before {
          content: "(Poznámka: ";
        }
        .poznamky small:after {
          content: ")";
        }
      </style>
      <div class="poznamky">
        <p>Kobercovka</p>
        <p><small>Fytopuf.</small></p>  
      </div>      
    </div>
  </li>

  
  <li>
    <p>Vypsat na stránce nějaký symbol/ikonu.</p>
    
    <div class="live">
      <style>
        .ikony .fajfka:before {
          content: "✔ ";
        }
        .ikony .kriz:before {
          content: "✖ ";
        }
      </style>
      <div class="ikony">
        <p class="fajfka">Kobercovka</p>
        <p class="kriz">Strouhanka</p>
      </div>      
    </div>
    
    <p>Dobrý zdroj obdobných symbolů je stránka <a href="http://copypastecharacter.com/">CopyPasteCharacter.com</a>.</p>
  </li>
  
  <li>
    <p>Vložit do elementu <b>obrázek</b>. Nemusí se používat <code>background</code> a nastavovat rozměry nebo opakování. Funguje to skoro jako vložení obrázku značkou <code>&lt;img></code> (jen obrázek neroztáhne výšku řádku, ale naopak se přizpůsobí).</p>
    
    <pre><code>element:before {
  content: url("adresa-obrazku.png");
}</code></pre>
  </li>
  
    
  <li>
    <p>Vypisovat do stránky obsah atributů pomocí <a href="/content-attr"><code>attr</code></a>.</p></li>
  
  <li>
    <p><i>Vyvolat</i> uvozovky nastavené vlastností <a href="/quotes"><code>quotes</code></a>.</p>
  </li>
  
  <li>
    <p>Vytvářet v CSS automatické číslování přes <a href="/counter"><code>counter</code></a>.</p>
  </li>
</ol>

<h3 id="vodorovny-seznam">Vodorovný seznam</h3>

<p>Tímto posutpme snadno vytvoříme vodorovný seznam s odrážkami.</p>

<div class="live">
  <style>
.vodorovny-seznam ul {text-align: center; padding-left: 0;}
.vodorovny-seznam li {display: inline; padding-left: 1em; color: #0D6AB7}
.vodorovny-seznam li:before {content: "● "; color: #DA3F94; padding-right: 1em;}
.vodorovny-seznam li:first-child:before {display: none;}
  </style>
  <div class="vodorovny-seznam">
    <ul><li>Kobercovka</li><li>Strouhanka</li><li>Šroubovák</li><li>Stativ</ul>
  </div>
</div>

<p>Pomocí selektoru <code>:first-child</code> je navíc možné skrýt odrážku <b>před prvním elementem</b>.</p>

<h2 id="animace">Animace vlastnosti <code>content</code></h2>

<ul>
  <li>CSS Tricks: <a href="https://css-tricks.com/animating-the-content-property/">Animating the `content` Property</a></li>
</ul>