---
title: "Margin, border a absolutní posicování"
headline: "Margin, border a absolutní posicování"
description: "Jak se chová <code>margin</code> a <code>border</code> u absolutně posicovaných elementů."
date: "2014-10-13"
last_modification: "2014-10-14"
status: 1
tags: ["css", "hotova-reseni", "napady"]
format: "html"
---

<p>Fakt, že něco <a href="/position#absolute">absolutně naposicujeme</a> – tj. umístíme přesně na určité místo vlastnostmi <code>top</code>/<code>bottom</code>, <code>left</code>/<code>right</code> – nemusí znamenat, že to na daném místě <b>skutečně bude</b>.</p>

<p>Změnit posici elementu s <code>position: absolute</code> dokáže vlastnost <a href="/margin"><code>margin</code></a>.</p>

<div class="live">
  <style>
    .obal {position: relative; background: #efefef;}
    .obal > span {position: absolute; right: 0; bottom: 0; background: #ccc;}
    .obal .s-marginem {margin: 1em}
  </style>
  <div class="obal">    
    <p>Obsah je v obalu s <code>position: relative</code>.</p>    
    <p>Obsah.</p>  
    <span id="posicovany">Abs. posicovaný element (<code>bottom: 0; right: 0</code>)</span>
  </div>
</div>

<p><button onclick="toggle(document.getElementById('posicovany'), 's-marginem')">Přidat/odebrat <code>margin</code></button></p>

<p>Jak je vidět, přidání <code>margin</code>u element <b>posune</b>.</p>

<p>To na jednu stranu může být výhodné chování, na stranu druhou to může nepříjemně překvapit u elementů, které mají různý <code>margin</code> <b>napříč prohlížeči</b>. To je třeba <a href="/button">element <code>&lt;button></code></a>, který má v <b>Chrome</b> 2px <code>margin</code> a jinde má nulu.</p>


<p><a href="http://kod.djpw.cz/algb">Živá ukázka</a> rozdílu v <b>Chrome</b>.</p>

<p><img src="/files/margin-border-absolute/margin-button.png" alt="Výchozí margin tlačítka v Chrome" class="border"></p>


<h2 id="hranice">Hranice obalu</h2>

<p>Další zajímavá věc je, kde se nacházejí hranice obalu s <code>position: relative</code>, kam se potom prvek absolutně umisťuje.</p>

<p>Vezmeme-li si obecné znázornění boxu, pomyslný bod „<code>top: 0; left: 0</code>“ se nachází na hranici mezi <code style="background: #C1CD89">padding</code>em a <code style="background: #FCDB9A">border</code>em.</p>

<p><img src="/files/margin-border-absolute/box.png" alt="Části boxu" class="border"></p>

<p>Někdy je cílem, aby například rámeček boxu <b>splýval s rámečkem</b> absolutně posicovaného tlačítka.</p>

<p><img src="/files/margin-border-absolute/tlacitko-okraj.png" alt="Splývání okrajů" class="border"></p>

<p>Řešení je buď <b>záporný <code>margin</code></b> o rozměrech rámečku, nebo záporné souřadnice <code>top</code>/<code>bottom</code>, <code>left</code>/<code>right</code> – rovněž o tloušťku rámečku.</p>

<p><a href="http://kod.djpw.cz/blgb">Ukázka obou postupů</a></p>

<p>Problém nastane, když budeme potřebovat obalu nastavit <code>overflow: hidden</code>, protože rámeček se v podstatě nachází mimo <span style="background: #8AB3BF">obsah</span> + <code style="background: #C1CD89">padding</code> (jak znázorňuje předchozí obrázek), takže bude <b>oříznut</b>.</p>

<p><img src="/files/margin-border-absolute/tlacitko-okraj-overflow.png" alt="Splývání okrajů" class="border"></p>

<p><a href="http://kod.djpw.cz/clgb">Živá ukázka</a></p>

<p>Řešení je umístit oba prvky s rámečkem na stejnou úroveň v HTML kódu. <a href="http://kod.djpw.cz/dlgb">Ukázka</a>.</p>

<p>Nebo rámeček vytvořit vlastností <a href="/box-shadow"><code>box-shadow</code></a> (<b>IE 9+</b>). <a href="http://kod.djpw.cz/flgb">Ukázka</a>.</p>