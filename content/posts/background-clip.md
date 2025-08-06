---
title: "Background-clip"
headline: "Background-clip"
description: "CSS vlastností <code>background-clip</code> jde omezit místo, kde zobrazí obrázek na pozadí."
date: "2014-11-15"
last_modification: "2014-11-16"
status: 1
tags: ["css", "css-vlastnosti", "obrazky"]
format: "html"
---

<p>Standardní chování pozadí v HTML elementu je takové, že vyplní <b>celý prostor</b>. Včetně případného rámečku (<code>border</code>), což je k vidění u rámečku s průhlednou barvou (<code>border-color: transparent</code>) nebo s průsvitnou barvou přes <a href="/rgba"><code>rgba</code></a>. Taktéž v případě, že je <code>border</code> čárkovaný (<code>dashed</code>), dvojitý (<code>double</code>) nebo tečkovaný (<code>dotted</code>).</p>

<p>Vlastnost <code>background-clip</code> toto chování umí změnit.</p>

<h2 id="podpora">Podpora</h2>

<p>Funguje od <b>IE 9</b>. Kromě zvláštní hodnoty <code>text</code>, která umí oříznout obrázek podle textu, ta funguje pouze s <a href="/css-prefixy">prefixem</a> <code>-webkit-</code>.</p>


<h2 id="zapis">Zápis</h2>

<pre><code>element {
  background-clip: <i>způsob</i>
}
</code></pre>

<p><i>Způsob</i> může mít následující hodnoty:</p>

<dl>
  
  <dt id="border-box"><code>border-box</code></dt>
  
  <dd>
    <p>Výchozí chování. Pozadí bude i za rámečkem.</p>
    
    <div class="pozadi-ramecek" style="background-clip: border-box">
      <p>Text s obrázkovým pozadím.</p>
    </div>
  </dd>
  
  <dt id="padding-box"><code>padding-box</code></dt>
  
  <dd>
    <p>Pozadí se zarazí u rámečku.</p>
    
    <div class="pozadi-ramecek" style="background-clip: padding-box">
      <p>Text s obrázkovým pozadím.</p>
    </div>
  </dd>  
  
  <dt id="content-box"><code>content-box</code></dt>
  
  <dd>
    <p>Pozadí se zarazí před <code>padding</code>em elementu.</p>
    
    <div class="pozadi-ramecek" style="background-clip: content-box">
      <p>Text s obrázkovým pozadím.</p>
    </div>
  </dd>  

  <dt id="text"><code>text</code></dt>
  
  <dd>
    <p>Asi nejzajímavější je volba <b>oříznutí pozadí podle textu</b>, což umožňuje nastavit písmenům obrázkové pozadí.</p>
    
    <p>Funguje zatím pouze v jádru Blink (<b>Chrome</b>, <b>Opera</b>). Obrázek se jako pozadí písmen objeví při zprůhlednění barvy (<code>color</code>) nebo po zprůhlednění vlastností <code>text-fill-color</code>.</p>
    
    <p><a href="https://kod.djpw.cz/anhb">Živá ukázka</a></p>
    
    <p>Obrázek, jak to přbližně vypadá v podporujícím prohlížeči.</p>
    
    <img src="/files/background-clip/obrazkovy-nadpis.png" alt="Obrázek jako pozadí textu" class="border">
    
    <p>S touto vlastností se dají dělat docela zajímavé efekty animováním pozadí (vlastností <a href="/animation"><code>animation</code></a> nebo <a href="/transition"><code>transition</code></a>).</p>
  </dd>  
</dl>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>DevDocs: <a href="http://devdocs.io/css/background-clip"><code>background-clip</code></a></li>
  <li>Zajímavé kousky s obrázkovým pozadí textu: <a href="http://scotch.io/tutorials/css/text-backgrounds-and-gradients-with-background-clip">Text Backgrounds and Gradients with background-clip</a></li>
  
  <li>CSS-Tricks: <a href="https://css-tricks.com/how-to-do-knockout-text/">How To Do Knockout Text</a></li>
</ul>


<style>
.pozadi-ramecek {
    background: #8ECCF0;
    padding: .5em;
    margin: 1em 0;
    border: 5px dotted #1081DD;
}</style>