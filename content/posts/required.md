---
title: "Označení povinných položek"
headline: "Označení povinných položek"
description: "Jak elegantně ve formuláři označit povinné položky atributem <code>required</code>."
date: "2014-07-28"
last_modification: "2014-07-31"
status: 1
tags: ["formulare", "html", "html-atributy"]
format: "html"
---

<p>Od <b>Internet Exploreru 10</b> je pro položky, které se musí vyplnit, funkční HTML atribut <code>required</code> pro formulářová pole.</p>

<pre><code>&lt;input name="jmeno" <b>required</b>></code></pre>

<p>Takové políčko je potom nutné (v podporovaných prohlížečích) vyplnit, jinak se odeslání formuláře nezdaří.</p>

<div class="live">
  <form action="">
    <label>Povinné pole: <input type="text" required></label>
    <button>Odeslat</button>
  </form>
</div>

<p>Vypadat by hláška upozorňující na <b>nutnost vyplnění</b> měla vypadat zhruba následovně (ukázka z <b>Firefoxu</b>).</p>

<p><img src="/files/required/hlaska.png" alt="Hlášky vyžadující vyplnění políčka" class="border"></p>


<h2 id="validace">Validace pole</h2>

<p>Odlišit <b>vyplněné</b> povinné pole od <b>nevyplněného</b> jde selektory <a href="/valid-invalid"><code>:valid</code> a <code>:invalid</code></a>.</p>

<div class="live">
  <style>
    .validace :invalid+span:before,
    .validace :valid+span:before {
      content: "Vyplňte!";
      background: red;
      color: #fff;
      padding: .2em;
    }
    .validace :valid+span:before {
      content: "OK, vyplněno";
      background: green;
    }    
  </style>
  <form action="" class="validace">
    <label>Povinné pole: <input type="text" required><span></span></label>
    <button>Odeslat</button>
  </form>
</div>


<h2 id="oznaceni">Označení</h2>

<p>Zaměřit povinné pole je možné speciálním selektorem <a href="/css-selektory#requried"><code>:required</code></a> (<b>IE 10</b>+) nebo obecným <a href="/css-selektory#atributovy">atributovým</a> <code>input[required]</code> (<b>IE 7+</b>).</p>

<p>Bývá zvykem povinná pole označovat hvězdičkou, tučným nebo barevně odlišeným popiskem či prostým textem „<i>povinné</i>“.</p>

<p>Tomuhle repertoár CSS selektorů příliš nenahrává, protože není možné zaměřit <b>předcházející element</b>. Kromě toho u <a href="/input"><code>&lt;input></code>u</a> není možné použít obsah vložený přes <a href="/content"><code>content</code></a> do pseudoelementů <code>:before</code>/<code>:after</code>.</p>

<p>Následující kód tedy nic neudělá:</p>

<pre><code>input[required]:after {
  content: "*";
}</code></pre>

<p>Existují následující řešení:</p>

<ol>
  <li>
    <p>Pomocí <a href="/position">posicování</a> nebo <a href="/float">obtékání</a> dosáhnout HTML kódu typu:</p>
  <pre><code>&lt;input id="<b>pole</b>">&lt;label for="<b>pole</b>"></code></pre>
    
    <p>Tento kód půjde v CSS <b>pohodlně zaměřit</b>:</p>
    
    <pre><code>input[required] + label:after {
  content: " povinné";
}</code></pre>
    
    <ul>
      <li><a href="https://kod.djpw.cz/vreb">Živá ukázka obtékáním</a></li>
      <li><a href="https://kod.djpw.cz/wreb">Živá ukázka posicováním</a></li>
    </ul>    
  </li>
  
  <li>
    <p>Za <code>&lt;input></code> přidat prázdný element (například <code>&lt;span></code>). Který bude možné zaměřit.</p>
    
    <pre><code>input[required] + span:after {
  content: " (povinné)";
}</code></pre>
    
    <p><a href="https://kod.djpw.cz/xreb">Živá ukázka</a></p>
  </li>
  
  <li>
    <p>Použít JavaScript, který projde všechna pole a prázdný element tam <b>přidá</b>. Zbývající postup je stejný.</p>
    
    <p><a href="https://kod.djpw.cz/jreb">Živá ukázka</a> (využívá <a href="/queryselector"><code>querySelectorAll</code></a>)</p>
  </li>
</ol>



<h2 id="osetreni-server">Ošetření na straně serveru</h2>

<p>Ošetřit přijatá data na serveru je <b>bezpodmínečně nutné</b> i při používání všelijakých pravidel na straně <b>klienta</b> (HTML/JavaScript).</p>

<p>Znalejší návštěvník nebude mít problém pomocí <a href="/vyvojarske-nastroje">vývojářských nástrojů</a> atribut <code>required</code> (nebo kterýkoliv jiný) <b>vyřadit</b>.</p>

<p><img src="/files/required/odstraneni-atributu.png" alt="Odstranění atributu ve vývojářských nástrojích" class="border"></p>



<h2 id="kompatibilita">Zpětná kompatibilita</h2>

<p>Jednotlivé části řešení mají odlišnou podporu v <b>Internet Explorerech</b></p>

<ul>
  <li>
    <p>Zobrazování obsahu pomocí <code>content</code> funguje až v <b>IE 8</b>.</p>
  </li>
  
  <li>
    <p>Validace (povinnost vyplnit položku označenou <code>required</code>) na straně klienta funguje až v <b>IE 10</b>.</p>
  </li>
</ul>

<p>Prohlížeče <b>IE 9</b> a starší tedy nechají formulář odeslat i bez vyplnění <b>povinných položek</b>.</p>

<p>Je k úvaze, jak to při důsledné validaci na serveru bude vadit. Stejně tak případné nezobrazení obsahu z vlastnosti <code>content</code> v <b>IE 7</b>.</p>

<p><a href="http://webylon.info"><b>Chamurappi</b></a> správně podotýká, že v případě důsledné (funkční napříč všemi prohlížeči) validaci na <b>straně klienta</b> může být naopak <b>validace na serveru</b> lehce ošizená, protože se k ní drtivá většina návštěvníků se <b>zapnutým JavaScriptem</b> vůbec nedostane (v extrémním případě stačí zajistit, aby data nenarušila aplikaci).</p>

<p>Pouze validace na serveru, která by v <b>IE 9</b> a starších v případě užití <code>required</code> nastala, může ale značně znepříjemnit zážitek u formulářů obsahující:</p>

<ul>
  <li><b>zadávání hesel</b>,</li>
  <li><b>opisování kódu</b> z obrázků (<a href="/spam#opsani-kodu">obrázková CAPTCHA</a>),</li>
  <li><b>upload souborů</b> (jde udělat i bez <a href="/upload-bez-refreshe">obnovení stránky</a>)</li>
</ul>

<p>V případě, že po odeslání formuláře na server a vrácení <b>chybové hlášky</b> tato pole <b>nepřežijí</b>, zažije návštěvník značný diskomfort, protože je bude muset vyplňovat znovu.</p>