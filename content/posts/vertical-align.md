---
title: "Vertical-align"
headline: "CSS zarovnání <code>vertical-align</code>"
description: "Vertikální zarovnání řádku nebo buňky tabulky."
date: "2015-11-17"
last_modification: "2016-02-11"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>CSS vlastnost <code>vertical-align</code> slouží k <b>svislému zarovnávání</b>. Ošemetné na ní je, že funguje jen za určitých podmínek.</p>

<ol>
  <li>    <p>Zarovnává se umístění <a href="/display#inline"><code>inline</code></a>/<code>inline-block</code> elementu na řádek.</p>  </li>
  <li>    <p>Zarovnává se obsah buňky tabulky (ať již element <a href="/html-tabulky"><code>&lt;td></code></a> nebo cokoliv s <code>display: table-cell</code>).</p>  </li>
</ol>

<h2 id="radek">Zarovnání řádku</h2>

<p>Zarovnání se často hodí pro elementy nižší než řádek jako ikonky:</p>

<div class="internal-content">
  <ul>
    <li><a href="/odkaz-ikona">Ikona vedle odkazu</a> – jak přidat a zarovnat ikonku vedle odkazu</li>
  </ul>
</div>

<p>Další případ, kde se <code>vertical-align</code> používá jsou <a href="/horni-dolni-index">horní a dolní indexy</a>, které ve výchozím zobrazení rozhazují výšku řádků:</p>

<p><img src="/files/horni-dolni-index/vyska-radku.png" alt="Rozhození výšky řádku" class="border"></p>











<h3 id="hodnoty">Možné hodnoty</h3>

<p>Na následující ukázce je vidět zarovnání malého čtverečku do řádku klíčovými slovy:</p>

<div class="live">
<style>
.radek {
  background: #efefef;
  padding: 0 .4em;
  margin: .4em;
  font-size: 120%;
  line-height: 2;
}
.radek span {
  width: .4em;
  height: .4em;
  background: #000;
  display: inline-block;
}
</style>
  <div class='radek'>Zarovnání <span></span> <code>baseline</code> (výchozí)</div>
  <div class='radek'>Zarovnání <span style="vertical-align: sub"></span> <code>sub</code> (dolní index)</div>
  <div class='radek'>Zarovnání <span style="vertical-align: super"></span> <code>super</code> (horní index)</div>
  <div class='radek'>Zarovnání <span style="vertical-align: middle"></span> <code>middle</code> (střed)</div>
  <div class='radek'>Zarovnání <span style="vertical-align: top"></span> <code>top</code> (nahoru na řádek)</div>
  <div class='radek'>Zarovnání <span style="vertical-align: bottom"></span> <code>bottom</code> (dolů na řádek)</div>
  <div class='radek'>Zarovnání <span style="vertical-align: text-top"></span> <code>text-top</code> (nahoru dle textu)</div>
<div class='radek'>Zarovnání <span style="vertical-align: text-bottom"></span> <code>text-bottom</code> (dolů dle textu)</div>
</div>

<p>V některých případech se mohou některé způsoby zarovnání chovat totožně. Typicky, když je nízká výška řádku (<a href="/font#line-height"><code>line-height</code></a>), bude <code>top</code> a <code>text-top</code> na stejném místě.</p>

<p><button onclick='nastavit(".live .radek", "line-height", 1)'>Nízký řádek</button>
<button onclick='nastavit(".live .radek", "line-height", 2)'>Vyšší řádek</button></p>

<p>Byl-li by zarovnávaný element velký přes celý řádek nebo i víc, <code>vertical-align</code> se bude projevovat trochu podivně.</p>

<p><button onclick='nastavit(".live .radek > span", "height", "3em")'>Vysoký element</button>
<button onclick='nastavit(".live .radek > span", "height", ".4em")'>Malý čtvereček</button></p>

<p><a href="http://kod.djpw.cz/yiub">Samostatná živá ukázka</a></p>

<p>Kromě klíčových slov je možné používat i délkové jednotky a procenta. Ty se odvíjí od výchozího umístění <code>baseline</code>. Kladné hodnoty posunou element směrem nad <i>baseline</i>, záporné pod baseline.</p>


<h2 id="taulka">Zarovnání v tabulce</h2>

<p>Kromě řádku jde zarovnávat i obsah v buňce tabulky.</p>

<p>Zpravidla se používají hodnoty <code>top</code>, <code>bottom</code> a <code>middle</code> nastavované pro buňky:</p>

<div class="live">
<style>
.tabulka-va td {
  height: 5em;
}
</style>
<table class="tabulka-va">
<tr>
    <td rowspan="2" style="vertical-align: middle">middle</td>
    <td style="vertical-align: top">top</td>
    <td rowspan="2">výchozí</td>
</tr>
<tr>    
    <td style="vertical-align: bottom">bottom</td>
</tr>
</table>  
</div>

<p><a href="http://kod.djpw.cz/ziub">Samostatná živá ukázka</a></p>

<h2 id="div">Zarovnání v <code>&lt;div></code>u</h2>

<p>Konstrukce <code>vertical-align: middle</code> se dá použít pro svislé <a href="/centrovani">centrování</a>:</p>

<div class="live">
<style>
.zarovnat {
    height: 15em;
    width: 20em;
    background: #efefef;
    display: table-cell;
    vertical-align: middle;
}

.blok {
    background: #ccc;
}
</style>
<div class="zarovnat">
    <div class="blok">Svisle centrovaný blok</div>
</div>  
</div>

<p>Světle šedý obal má nastavenou výšku, <code>display: table-cell</code> a <code>vertical-align: middle</code>.</p>

<p><a href="http://kod.djpw.cz/ajub">Samostatná živá ukázka</a></p>

<p>Naprosto klíčové je použít tabulkové zobrazení <code>table-cell</code> pro obalující <code>&lt;div></code>, jinak se <code>vertical-align</code> neprojeví.</p>




<script>
  
  function nastavit(selektor, vlastnost, hodnota) {
    var elementy = document.querySelectorAll(selektor);
    for (var i = elementy.length; i--;) {
      elementy[i].style.cssText += vlastnost + ":" + hodnota;
    }
  }
</script>