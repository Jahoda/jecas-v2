---
title: "Text-shadow"
headline: "Text-shadow"
description: "CSS vlastnost <code>text-shadow</code> přidává textu stín."
date: "2014-09-09"
last_modification: "2014-09-09"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>Podobně jako je tomu u <b>celých boxů</b> (více v článku o podobné vlastnosti <a href="/box-shadow"><code>box-shadow</code></a>) existuje podobná vlastnost vytvářející <b>stín</b> i pro samotný text.</p>

<p>Funguje od <b>IE 10</b>. V <b>IE 9</b> a starších jde stín vytvořit starou podobou vlastnosti <code>filter</code> (parametry jsou <i>barva</i>, <i>směr</i> ve stupních a <i>síla</i>).</p>

<pre><code>.ie9-stin {
  filter: Shadow(Color=#252525, Direction=45, Strength=2);
}</code></pre>

<p>Stín s použitím <i>filtru</i> ale vypadá méně hezky, jak je vidět na obrázku:</p>

<p><img src="/files/text-shadow/srovnani.png" alt="Srovnání stínů v IE 9 a IE 10" class="border"></p>

<p>(O standardní podobě <i>nové</i> vlastnosti <a href="/filter"><code>filter</code></a> pojednává samostatný článek.)</p>

<h2 id="zapis">Zápis</h2>

<pre><code>element {
  text-shadow: <i>vodorovné</i> <i>svislé umístění</i> <i>rozmazání</i> <i>barva</i>;
}</code></pre>

<p>V <b>Internet Exploreru 10+</b> funguje i čtvrtý parametr určující <b>velikost stínu</b> (podobně jako u <code>box-shadow</code>). Bohužel ale jeho použití rozbije zobrazení v ostatních prohlížečích.</p>

<h2 id="vice-stinu">Více stínů</h2>

<p>Daný text může mít stínů více. Stačí jednotlivé stíny oddělit čárkou.</p>

<pre style="overflow: visible; text-shadow: 
    10px -10px 15px red,
    10px 10px 15px green"><code>element {
  text-shadow: 
    10px -10px 15px red,
    10px 10px 15px green
}</code></pre>

<p>(Ve <b>Webkitech</b> existuje i lehce podobná vlastnost <a href="/text-stroke"><code>text-stroke</code></a>, která textu umí vytvořit obrys, právě tuto vlastnost jde do jisté míry vícenásobnými stíny simulovat – <a href="http://kod.djpw.cz/xmfb">ukázka</a>.)</p>


<h2 id="generator">Generátor</h2>
<pre id="test" style="text-shadow: 10px 10px 5px red; overflow: visible"><code>element {
  text-shadow: <span id="test-css"><b>10px 10px</b> <i>5px</i> red</span>;
}</code></pre>

<script>
  function el(id) {
    return document.getElementById(id);
  }
  function upravitStin() {
    var css = el("x").value + "px " + el("y").value + "px " + el("rozmazani").value + "px " + /*el("velikost").value + "px " +*/ el("barva").value;
    el("test").style.textShadow = css;
    el("test-css").innerHTML = css;
  }
</script>

<dl>
  
 
  <dt id="offset">Umístění</dt>
  <dd>  
    <ul>
      <li>
        <p>V ukázce výše první dvě hodnoty udávají umístění stínu. První hodnota je <b>horisontální</b> (vodorovná). Čím větší hodnota bude nastavená, tím bude stín <b>víc vpravo</b>. Přehodit stín <b>doleva</b> je možné zadáním záporné hodnoty.
        </p>
        
        <p>        <span class="live">-100 <input oninput="upravitStin()" onchange="upravitStin()" type="range" min="-100" max="100" id="x" value="10"> 100</span></p>
        
      </li>
      <li>
        <p>Druhá hodnota je <b>vertikální</b> (svislá). Nastavuje umístění stínu <b>dolů</b>. Nebo <b>nahoru</b> nad text při zadání záporné hodnoty. </p>
      <p><span class="live">-100 <input oninput="upravitStin()" onchange="upravitStin()" type="range" min="-100" max="100" id="y" value="10"> 100</span></p>
      </li>
    </ul>
  </dd>
  
  <dt id="blur">Rozmazání</dt>
  <dd>
    <p>Další hodnota určuje, jak moc bude stín rozmazaný. Při nulové hodnotě tedy stín bude v podstatě <b>kopie textu</b>. Pozor, při nulovém umístění i nulovém rozmazání nebude stín vidět, schová se za text. 
    </p>
    
    <p><span class="live">0 <input oninput="upravitStin()" onchange="upravitStin()" type="range" min="0" max="100" id="rozmazani" value="5"> 100</span></p>
    
  </dd>
  <!--
  <dt id="spread">Velikost</dt>
  <dd>
    <p>Dokáže roztáhnout stín všemi směry. Funkční pouze v <b>IE</b>. </p>
    <p><span class="live">0 <input oninput="upravitStin()" onchange="upravitStin()" type="range" min="0" max="100" id="velikost" value="0"> 100</span></p>
  </dd>
  -->
  <dt id="color">Barva</dt>
  <dd>
    <p>Poslední hodnota je barva stínu. <span class="live"><input oninput="upravitStin()" onchange="upravitStin()" type="color" value="#ff0000" id="barva"></span></p>    
  </dd>
</dl>


<h2 id="vyuziti">Využití</h2>

<p>Použít stín se může hodit k vytvoření <b>graficky atraktivnějšího</b> nadpisu nebo třeba <b>zlepšení čitelnosti písma</b>, které není dostatečně kontrastní s pozadím. V případě, že je na pozadí vícebarevné pozadí se světlými i tmavými částmi a nelze zajistit přesné umístění textu, stín písma může čitelnost lehce zvýšit bez nutnosti upravovat původní pozadí.</p>

<p>Vyzkoušejte si menší zlepšení <b>najetím/odjetím myši</b> nad obrázkem.</p>

<div class="live">
  <img src="/files/text-shadow/horsi.jpg" onmouseover="this.src=this.src.replace('horsi','lepsi')" onmouseout="this.src=this.src.replace('lepsi','horsi')" alt="Test čitelnosti">
</div>

<!-- Ukázka: http://kod.djpw.cz/pmfb -->

<p>Asi nejlepších výsledků lze docílit při rozmazání okolo 10 px. Pro silnější efekt by se hodila zatím mimo <b>IE 10</b> a <b>IE 11</b> nepodporovaná <b>intensita stínu</b> nebo využít <b>vícenásobného stínu</b> (<a href="http://kod.djpw.cz/anfb">ukázka</a>).</p>

<p>Naopak při dobře kontrastním jednobarevném pozadí stín písmo spíš <b>rozmaže</b> a <b>čitelnost může utrpět</b>.</p>


<h2 id="dedicnost">Dědičnost</h2>

<p>Stín textu svým způsobem dědí i vnořené elementy. Pokud ho nastavíme třeba pro element <code>&lt;body></code>, všechen text na stránce bude se stínem.</p>

<p><button onclick='document.body.style.textShadow = "10px 10px 5px #0D6AB7"'>Přidat</button> nebo <button onclick='document.body.style.textShadow = ""'>odebrat</button> stín celé této stránce.</p>

<h2 id="overflow">Vytečení stínu</h2>

<p>Nemá-li element <code>overflow: hidden</code>, může stín, který má nastaven text v tomto elementu, <i>vytéci</i> mimo obsah elementu.</p>

<p>Teoreticky tak jde <code>text-shadow</code> v podobě bez rozmazání použít k <b>duplikování a <i>posicování</i> textu</b>. Na následující ukázce je původní „Text 1“ pomocí stínu <i>rozkopírován</i> na tři různá místa.</p>

<div class="live">
  <span style="padding: 30px; display: inline-block; text-shadow: 100px 0px 0 #000, 0px -20px 0 #000, 450px -100px 0 red">Text 1</span>
</div>

<p>Tohoto <i>kopírovacího</i> <i>triku</i> je využito i u <a href="/hover-efekty-text-shadow">hover efektů s <code>text-shadow</code></a>.</p>