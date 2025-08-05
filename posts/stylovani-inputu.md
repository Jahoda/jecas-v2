---
title: "Stylování formulářových políček"
headline: "Stylování formulářových políček a tlačítek"
description: "Které CSS vlastnosti si ohlídat při dosahování perfektního stylu vstupní políček a odesílacích tlačítek. "
date: "2013-12-11"
last_modification: "2013-12-12"
status: 1
tags: ["css", "formulare", "stylovani"]
format: "html"
---

<p>Pokud se rozhodneme pro <a href="/vzhled-formularu">vlastní vzhled formulářů</a>, nevyhneme se <i>resetování</i> původních hodnot. (Tím není myšlen jen obyčejný <a href="/css-reset#hvezdickovy">hvězdičkový reset</a>, který toho z vzhledu formulářů zase tolik <a href="/css-reset-formularu">neodstraní</a>.)</p>

<p>Chceme-li docílit prostého vzhledu, kde budou popisky (<a href="/label-for"><code>&lt;label></code></a>), vstupní pole (<a href="/input"><code>&lt;input></code></a>) i tlačítka (<code>&lt;button></code>/<code>&lt;input type=text></code>) vypadat jako obyčejné <i>prázdné</i> elementy (<code>&lt;div></code> a <code>&lt;span></code>) a budou tak <b>hezky lícovat</b>:</p>

<p><img src="/files/stylovani-inputu/label-input-button.png" alt="Jednoduchý styl &lt;label>u, &lt;input>u a &lt;button>u" class="border"></p>

<p>Není to úplná legrace.</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/uvqb">Živá ukázka</a> – nastavení výšky políčka a tlačítka pomocí <code>height</code> a <code>line-height</code></li>
  </ul>
</div>


<h2 id="reset">Co všechno resetovat/sjednotit?</h2>
<dl>
  <dt id="odsazeni">Odsazení</dt>
  <dd>
    <p>Vnitřní i vnější odsazení — <code>padding</code> a <code>margin</code>.</p>
  </dd>
  
  <dt id="border">Rámeček</dt>
  <dd>
    <p>Rámeček tlačítek a vstupních políček — <code>border</code>.</p>
  </dd>
  
  <dt id="pismo">Písmo</dt>
  <dd>
    <p>Různý <b>styl</b> i <b>velikost</b> písma způsobí různou různou výšku řádku — <code>font-size</code> a <code>font-family</code>.</p>
  </dd>
  
  <dt id="vyska-radku">Výška řádku</dt>
  <dd>
    <p>Nastavit výšku řádku je možné pomocí <code>line-height</code>  po nastavení <code>display: (inline-)block</code>. Na <code>&lt;input></code>y to nefunguje, takže se jim musí ještě přidat <code>height</code>/<code>min-height</code> se stejnou hodnotou.</p>
  </dd>
  
  <dt id="-moz-focus-inner">Odsazení při <code>:focus</code> ve Firefoxu</dt>
  <dd>
    <p>Ve Firefoxu vzhled políček ještě upravují vlastnosti v pseudoelementu <code>button::-moz-focus-inner</code>. Hodnoty <code>padding</code> a <code>border</code> je vhodné <b>nastavit na nulu</b>.</p>
  </dd>
</dl>

<p><a href="http://kod.djpw.cz/jxw">Živá ukázka</a> funkční od <b>IE 8</b>.</p>
<p>Pro znázornění <code>:focus</code>u je možné použít třeba <code>box-shadow</code> a resetovat <code>outline</code>, který je v některých prohlížečích výchozí (<b>Chrome</b>).</p>
<!-- Starší http://kod.djpw.cz/tkw -->

<div class="live">
  <style>
    .jako-text label, .jako-text input, .jako-text button {
      background: #DA3F94; color: #fff; /* Jen barvy */
      display: inline-block; 
      padding: 0 .4em; 
      border: 0; 
      margin: .1em; 
      line-height: 2em;
      height: 2em; /* pro <input> */
      font-size: 100%;
      font-family: "Segoe UI", Arial;
    }
    
    .jako-text input[type=text] {background: #0D6AB7; color: #8ECCF0}
    .jako-text label {background: #1081DD;} 
      
    .jako-text input::-moz-focus-inner, .jako-text button::-moz-focus-inner {padding: 0; border: 0}
    .jako-text button:focus, .jako-text input:focus {box-shadow: 0 0 4px #DA3F94; outline: 0}
  </style>
  <div class="jako-text">
    <label for="input">Popis pole</label><input type="text" id="input"><button>Odeslat</button>
  </div>
  
  <div class="jako-text">
    <label for="input2">Popis pole</label><input type="text" id="input2"><input type="submit" value="Odeslat">
  </div>
  
  <div class="jako-text">
    <label for="input3">Popis pole</label><input type="text" id="input3"><button>Odeslat</button>
  </div>
</div>

<p>I v <b>IE 7</b> by požadovaného vzhledu šlo docílit <a href="/float">obtékáním</a> (vlastností <code>float</code>). <a href="http://kod.djpw.cz/ixw">Ukázka</a>.</p>
<!-- Starší http://kod.djpw.cz/zkw -->

<div class="live">
  <style>
    .jako-text2 label, .jako-text2 input, .jako-text2 button {
      background: #DA3F94; color: #fff; /* Jen barvy */
      float: left;
      padding: 0 .4em; 
      border: 0; 
      margin: .1em; 
      line-height: 2em;
      height: 2em; /* pro <input> */
      font-size: 100%;
      font-family: "Segoe UI", Arial;
    }
    
    .jako-text2 input[type=text] {background: #0D6AB7; color: #8ECCF0}
    .jako-text2 label {background: #1081DD; clear: left} 
    
    .jako-text2 input::-moz-focus-inner, .jako-text2 button::-moz-focus-inner {padding: 0; border: 0}
    .jako-text2 button:focus, .jako-text2 input:focus {box-shadow: 0 0 4px #DA3F94; outline: 0}
  </style>
  <div class="jako-text2">
    <label for="input4">Popis pole</label><input type="text" id="input4"><button>Odeslat</button>
  </div>
  
  <div class="jako-text2">
    <label for="input5">Popis pole</label><input type="text" id="input5"><input type="submit" value="Odeslat">
  </div>
  
  <br clear="all">
</div>

