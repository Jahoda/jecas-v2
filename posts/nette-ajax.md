---
title: "AJAX v Nette"
headline: "AJAX v Nette"
description: "Jak vytvořit v Nette stránku používající AJAX."
date: "2015-11-05"
last_modification: "2015-11-05"
status: 0
tags: []
format: "html"
---

<p>Pro používání <a href="/ajax">AJAXu</a> je <b>Nette Framework</b> velmi dobře připraven.</p>

<p>Načítat jednotlivé stránky AJAXem je tak otázka:</p>

<ol>
  <li>Vytvoření <i>snippetu</i> – místa na stránce, kde se bude obsah měnit</li>
  
  <li>Přidání informace do presenteru, kterou část má vracet pro použití ve snippetu.</li>
  
  <li>Obsluha odkazů JavaScriptem.</li>
</ol>



<h2 id="snippet">Snippet</h2>

<p>Označuje blok, který se bude měnit bez znovunačtení celé stránky.</p>

<p>Pro zajaxování celé stránky tak bude v šabloně <code>@laytou.latte</code> například následující:</p>

<pre><code>{snippet pageContent}
  {include #content}
{/snippet}</code></pre>




<p>Po uložení by se na stránce měl objevit nový element s identifikátorem <code>snippet--nazevSnippetu</code>:</p>

<p><img src="/files/nette-ajax/snippet-kod.png" alt="Vložení snippetu" class="border"></p>









<p>Pokud by vadilo přidání dalšího <code>&lt;div></code>u, jde udělat snippet i z existující značky atributem <code>n:snippet</code>:</p>

<pre><code>&lt;div n:snippet="pageContent"></code></pre>





<h2 id="vraceni-snippetu">Vrácení snippetu</h2>

<p>Teoreticky pro načtení samotného obsahu AJAXem není potřeba na serveru nic upravovat. Může se v JS stáhnout celá HTML stránka, vybrat z ní potřebný obsah a ten vlepit do stránky původní.</p>


<p>Elegantnější a rychlejší ale je přenášet <b>jen potřebná data</b>. Toho se docílí přidáním metody <code>redrawControl</code> do presenteru:</p>


<pre><code>public function renderDefault() {
  $this->redrawControl('pageContent');
  /* samotné nastavování proměnných pro šablonu */
}</code></pre>





<p>Nette potom při AJAXovém požadavku nevypíše celou stránku, ale pouze požadovanou oblast. AJAXový požadavek pozná podle HTTP hlavičky <code>X-Requested-With</code>.</p>

<p>Výsledkem bude navíc JSON:</p>

<pre><code>{"state":[],"snippets":{"snippet--pageContent":"HTML kód"}}</code></pre>



<p>Případně je možné si přímo nastavit, jaká data v JSONu se mají posílat. Potom není vůbec potřeba šablona. Více v dokumentaci:</p>

<div class="external-content">
  <ul>
    <li>Nette dokumentace: <a href="https://doc.nette.org/cs/2.3/ajax">AJAX &amp; snippety</a></li>
  </ul>
</div>


<h2 id="obsluha">Obsluha odkazu</h2>

<p>Zavedenou praxí je odkazům, které mají být obslouženy AJAXem, přidat CSS třídu <code>.ajax</code>.</p>

<p><b>Nette</b> přímo v sobě obslužnou funkci pro AJAX neobsahuje.</p>

<p>Je doporučeno použít knihovnu využívající <b>jQuery</b>:</p>

<div class="external-content">
  <ul>
    <li><a href="https://addons.nette.org/vojtech-dobes/nette-ajax-js">nette.ajax.js</a></li>
  </ul>
</div>

<p>Tu stačí připojit po jQuery do stránky a inicialisovat pomocí:</p>

<pre><code>$(function () {
  $.nette.init();
});</code></pre>







<p>Odkazy s třídou <code>.ajax</code> by nyní měly být načítány AJAXem.</p>