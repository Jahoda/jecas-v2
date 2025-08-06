---
title: "Fotografie na pozadí"
headline: "Velký obrázek na pozadí stránky"
description: "Jak správně udělat obrázkové pozadí celé stránky, které se přizpůsobí velikosti okna."
date: "2013-08-12"
last_modification: "2013-08-14"
status: 1
tags: ["css", "napady", "obrazky"]
format: "html"
---

<p>Pokud webová stránka nemusí být vždy přes celé okno nebo to nechceme, je prostor kolem ní umístit nějaký líbivý obrázek, texturu nebo fotografii.</p>

<p>Jak ale zajistit, aby to dobře vypadalo? Tedy se například řádně:</p>
<ul>
  <li><b>roztáhla dle velikosti okna</b>,</li>
  <li><b>navazovala na sebe v případě opakování</b></li>
</ul>

<h2 id="roztazeni">Roztažení obrázku dle okna prohlížeče</h2>
<p>Asi nejednodušší je obrázek nechat roztáhnout na 100 % šířky. Dosáhnout se toho dá použitím CSS vlastnosti <code>background-size</code>.</p>

<div class="live">
  <style>
    .roztahnout-cele {background-size: 100% 100%}
    .roztahnout-sirku {background-size: 100%}
    .roztahnout-vysku {background-size: auto 100%}
    .roztahnout-cover {background-size: cover}
    .roztahnout-contain {background-size: contain}
  </style>
  <div id="roztahnout" style="background-image: url(/images/jecas-16.svg); background-repeat: no-repeat; height: 100px">
  </div>
</div>
<script>
  var roztahnout = document.getElementById("roztahnout");
</script>
    <ol>
      <li><button onclick="roztahnout.className = 'roztahnout-cele'">Roztáhnout</button> – <code>background-size: 100% 100%</code>
    <li><button onclick="roztahnout.className = 'roztahnout-sirku'">Roztáhnout na šířku</button> – <code>background-size: 100%</code>
    <li><button onclick="roztahnout.className = 'roztahnout-vysku'">Roztáhnout na výšku</button> – <code>background-size: auto 100%</code>
    </ol>
<p>Kromě přesných rozměrů lze ještě provést roztažení klíčovými slovy <code>cover</code> a <code>contain</code>.</p>
    <ol>
      <li><button onclick="roztahnout.className = 'roztahnout-cover'">Roztáhnout „<code>cover</code>“</button> – <code>background-size: cover</code> – roztáhne se, aby se celý prostor vyplnil, část obrázku nemusí být vidět
    <li><button onclick="roztahnout.className = 'roztahnout-contain'">Roztáhnout „<code>contain</code>“</button> – <code>background-size: contain</code> – roztáhne se, aby se celý obrázek vešel se zachováním poměru stran
    </ol>


<h3 id="ie">Řešení pro starší prohlížeče</h3>
<p>CSS vlastnost <code>background-size</code> funguje až od <b>Internet Exploreru 9</b>, pro starší existují minimálně <b>dvě různá řešení</b>.</p>

<ol>
  <li>Obrázek vložit jako obyčejný obrázek (<code>&lt;img&gt;</code>), nastavit mu stoprocentní rozměry a absolutně jej naposicovat za stránku.</li>
  <li>Použít <code>filter</code>:
  <pre><code>filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(
src='<b>obrazek.jpg</b>',
sizingMethod='scale');<!--

-ms-filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(
src='<b>obrazek.jpg</b>',
sizingMethod='scale')";--></code></pre></li>
</ol>

<h3>Problém roztahování</h3>
<p>Problematické při roztahování je, že většinou obrázek bude mít <b>jiné rozměry</b>, než zrovna má plocha, kterou má vyplnit.</p>

<ul>
  <li>Bude tedy buď <b>příliš malý</b> a roztažení <b>nebude dvakrát pěkné</b>,</li>
  <li>nebo bude příliš <b>velký</b> a zmenšování bude <b>plýtvání daty</b>.</li>
</ul>


<h2 id="fixni">Fixní posice</h2>
<p>Občas je hezké ještě obrázek zafixovat, čímž bude pořád vidět i při odrolování stránky. Stačí nastavit obrázku fixní posici:</p>
<pre><code>body {…; background-attachment: fixed}</code></pre>

<h2 id="centrovani">Centrování obrázku</h2>
<p>Vycentrování obrázku řeší problém roztahování tím, že se při menších rozlišeních objeví z obrázku <b>jen menší část, výřez</b> v originální kvalitě.</p>
<pre><code>body {
  background-image: url(velky-obrazek.jpg);
  background-position: <b>center</b>;
  background-repeat: no-repeat
}</code></pre>

<div class="live">
  <div id="centrovac" style="background: url(/files/obrazkove-pozadi/centrovani.jpg) center no-repeat; width: 570px; height: 223px; transition: all 1s"></div>
<script>
  function zmenVelikost(sirka, vyska) {
  var centrovac = document.getElementById("centrovac");
    centrovac.style.width = sirka + "px";
    centrovac.style.height = vyska + "px";
  }
</script>
<p>Změnit velikost:         <button onclick="zmenVelikost(400,156)">Velikost 400×156</button><button onclick="zmenVelikost(250,98)">Velikost 250×98</button><button onclick="zmenVelikost(570,223)">Původní</button>
    </p>
</div>


<h2 id="opakovani">Opakování obrázku</h2>
<p>Dobré je, když se obrázek může opakovat – tedy na sebe <i>navazuje</i>, potom lze s malým (<b>i datově</b>) obrázkem hezky zaplnit celé pozadí. Vyžaduje to ale přípravu takového obrázku už v <b>grafickém editoru</b> a u fotografií je to dost komplikované.</p>

<h3>Zrcadlení</h3>
<p>Jakž takž může pomoci vhodný výřez a jeho zrcadlení — zajistí se tím, že bude fotografie <i>navazovat</i>. Ale jak je vidět na ukázce, ani to u nevhodného obrázku nevypadá úplně přirozeně.</p>
<div class="live">
  <div style="background: #FDFFFF url(/files/obrazkove-pozadi/opakovani-doztracena.jpg) bottom left repeat-x; height: 300px"></div>
</div>


<h2 id="do-ztracena">Přechod do ztracena</h2>
<p>Problém opakování u fotografií můžeme vyřešit vytvořením přechodu do ztracena, kdy na fotku naváže jednobarevné pozadí nastavené přes <code>background-color</code>.</p>
<p>Na předchozím příkladu je tak zakončen vršek obrázku.</p>


<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li><a href="http://css-tricks.com/perfect-full-page-background-image/">Perfect Full Page Background Image</a></li>
  <li><a href="http://louisremi.github.io/jquery.backgroundSize.js/demo/">Řešení roztahování pro starší IE v jQuery</a></li>
  
  <li><a href="http://msurguy.github.io/triangles/">Generátor trojúhelníkového pozadí</a></li>
</ul>