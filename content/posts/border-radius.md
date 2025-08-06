---
title: "Kulaté rohy"
headline: "Kulaté okraje v CSS"
description: "Jak vytvořit v CSS zaoblené okraje."
date: "2013-09-30"
last_modification: "2018-10-13"
status: 1
tags: ["css", "css-vlastnosti", "hotova-reseni"]
format: "html"
---

<p>Pro prohlížeče <b>Internet Explorer 9</b> a novější je možné použít přímo CSS vlastnost <code>border-radius</code>, což je zkrácený zápis vlastností:</p>
<ul>
  <li><code>border-top-left-radius</code>,</li>
  <li><code>border-top-right-radius</code>,</li>
  <li><code>border-bottom-left-radius</code> a</li>
  <li><code>border-bottom-right-radius</code>.</li>
</ul>
<p>Jako hodnotu jde použít libovolnou délkovou jednotku.</p>

<p>Pomocí vlastnosti <code>border-radius</code> se dá docílit i úplně kulatého vzhledu elementu (nebo i <a href="/kruhovy-obrazek">kruhového obrázku</a>), řešením je nastavit <code>border-radius</code> o polovinu nižší než jsou rozměry elementu. Nebo universálně:</p>
<pre><code>element {border-radius: 50%}</code></pre>

<div class="live">
  <style>
    .kulaty {border-radius: 50%; background: #DA3F94; width: 100px; height: 100px; transition: border-radius 1s}
    .kulaty:hover {border-radius: 0}
  </style>
  <div class="kulaty" style="border: 5px solid #000"></div>
</div>











<p>Lze <i>zakulatit</i> i element bez okraje (<code>border</code>u).</p>
<div class="live">
    <div class="kulaty"></div>
</div>











<p>(Kulaté rohy se hodí i při <a href="/css-kresleni">kreslení pomocí CSS</a>.)</p>




<h2 id="nepravidelne">Nepravidelné rámečky</h2>

<p>Zajímavá a ne moc známá věc, je zápis s lomítkem:</p>

<pre><code>element {border-radius: 25% / 75%}</code></pre>

<p>Tím jde určovat zvlášť horisontální (před lomítkem) a zvlášť vertikální (za lomítkem) radius. Chování bez lomítka je nastavuje shodné.</p>

<div class="live">
  <style>
    .nepravidelny {
      border-radius: 25% / 75%;
    }
  </style>
  <div class="kulaty nepravidelny"></div>
</div>


<p>Složitějšími kombinacemi lze docílit hodně nestandardních výsledků.</p>

<div class="live">
  <style>
    .divny {
      border-radius: 65% 35% 75% 25% / 50% 80% 15% 50%;
    }
  </style>
  <div class="kulaty divny"></div>
</div>

<div class="live">
  <style>
    .kapka {
      border-radius: 100% 0% 70% 30% / 70% 0% 100% 30%;
    }
  </style>
  <div class="kulaty kapka"></div>
</div>

<div class="live">
  <style>
    .stit {
      border-radius: 50% 50% 50% 50% / 0% 0% 100% 100%;
    }
  </style>
  <div class="kulaty stit"></div>
</div>









<p>Existuje hezký generátor:</p>

<div class="external-content">
  <ul>
    <li><a href="https://9elements.github.io/fancy-border-radius/">Fancy Border Radius Generator</a></li>
  </ul>
</div>



<h2 id="outline">Vnější rámeček – <code>outline</code></h2>
<p>Od <b>Exploreru 8</b> je možné používat i vnější rámeček, tzv. <code>outline</code>, jak je to u něj s oblými rohy?</p>
<p>Zatím něco jako <code>outline-radius</code> rozumnou podporu napříč prohlížeči nemá. Výjimkou je <b>Firefox</b> s nestandardní vlastností <code>-moz-outline-radius</code></p>

<p>Pořád ale existují následující možnosti:</p>

<h3 id="obal">Obalový element</h3>
<p>Použít více elementů s <code>border-radius</code>.</p>
<pre><code>&lt;div class=kulaty-obal&gt;
  &lt;div class=kulaty&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

<div class="live">
   <div class="kulaty" style="border: 5px solid #000">
     <div class="kulaty" style="border: 5px solid #5EAA11; width: 90px; height: 90px"></div>
   </div>
</div>

<h3 id="box-shadow">Stín jako rámeček</h3>
<p>Další možnost je CSS vlastnost <code>box-shadow</code>, tedy stín <i>boxu</i> (funguje podobně jako <code>border-radius</code> od <b>Internet Exploreru 9</b>). Stín bude vně elementu s <code>border-radius</code>.</p>

<pre><code>element {border-radius: 50%; border: 5px solid black; box-shadow: 0px 0px 0px 5px green}</code></pre>

<div class="live">
  <div class="kulaty" style="border: 5px solid #000; box-shadow: 0px 0px 0px 5px #5EAA11"></div>
</div>

<p>Pomocí <code>box-shadow</code> můžeme vytvořit i <b>více <i>rámečků</i> najednou</b>, jak ve <a href="https://kod.djpw.cz/glc">své ukázce</a> předvedl pan <a href="http://teststranek.kvalitne.cz/">Bubák</a>.</p>

<div class="live">
  <style>
  .kuk {
  width: 300px;
  height: 150px;
  margin: 30px;
  border-radius: 50%;
  border: 10px solid black;
  box-shadow: 0px 0px 0px 10px navy inset,
              0px 0px 0px 20px blue inset,
              0px 0px 0px 30px red inset,
              0px 0px 0px 40px orange inset,
              0px 0px 0px 50px gold inset,
              0px 0px 0px 50px gold inset,
              0px 0px 0px 10px gold,
              0px 0px 0px 20px red;
  transition: 0.5s;
  
}
.kuk:hover {
  box-shadow: none;
}
  </style>
  <div class="kuk"></div>
</div>
  
<h3 id="after">Pseudo-elementy obsahu</h3>
<p>Pomocí <a href="/css-selektory#before-after">pseudo-elementů obsahu</a> jde <i>vytvořit</i> další elementy ke stylování. Rámeček vytvořený přes <code>:after</code> bude uvnitř elementu.</p>

<div class="live">
  <style>
    .kulaty {position: relative}
    .kulaty-after:after {content: ''; display: block; position: absolute; top: 0; bottom: 0; left: 0; right: 0; border-radius: 50%; border: 5px solid #5EAA11}
  </style>
  <div class="kulaty kulaty-after" style="border: 5px solid #000"></div>
</div>

<h2 id="starsi-prohlizece">Historické prohlížeče</h2>
<p>V roce <b>2018</b> už to nejspíš nemá smysl řešit, ale při podporování starších prohlížečů (<b>IE 8</b> a starší) jsou k úvaze tyto možnosti:</p>

<ol>
  <li><b>kulaté rohy oželet</b> (je třeba si rozmyslet, <a href="/prohlizece-optimalisace#kalkulace">zda se to vyplatí</a>),</li>
  <li><b>použít obrázky</b>,</li>
  <li><b>rámeček doslova nakreslit</b>.</li>
</ol>

<p>K třetímu způsobu existují <b>hotová řešení</b>.</p>

<dl>
  <dt><a href="http://jquery.malsup.com/corner/">jQuery Corner Demo</a></dt>
  <dd>
    <p>Řešení v jQuery, rámečky jsou kresleny pixel po pixelu.</p>
  </dd>
  
  <dt><a href="http://dimox.net/cross-browser-border-radius-rounded-corners/"><code>border-radius.htc</code></a></dt>
  <dd>
    <p>Jedná se o <code>*.htc</code> soubor, který kreslí kulaté rámečky v Explorerech přes <code>behavior</code> a <a href="http://en.wikipedia.org/wiki/Vector_Markup_Language">VML</a>.</p>
  </dd>
</dl>

