---
title: "Chytré umístění tooltipu"
headline: "Chytré umístění tooltipu"
description: "Jak umisťovat popisek, aby byl neustále viditelný."
date: "2014-11-12"
last_modification: "2014-11-12"
status: 0
tags: []
format: "html"
---

<p>Při používání webové aplikace na desktopu jde u ovládacích prvků zobrazovat <b>nápovědu v tooltipu</b> po přejetí myší.</p>

<p>Nejprimitivnější je využít obecného atributu <code>title</code>:</p>

<div class="live">
  <button title="Toto tlačítko nic nedělá">Tlačítko s popiskem</button>
</div>

<p><b>Styl a chování</b> popisku <code>title</code> si určuje prohlížeč / operační systém.</p>

<p>Pokud je potřeba mít vlastní styl nebo <b>zobrazovat popisek ihned</b> (výchozí chování prohlížečů ho zpravidla zobrazuje až s prodlevou), je nutné ho řešit pomocí CSS/JS.</p>

<div class="internal-content">
  <ul>
    <li><a href="/js-tooltip">JS tooltip</a> – hotové řešení popisků</li>
    
    <li><a href="/tooltip">Popisek po najetí myší v CSS</a></li>
    
    <li><a href="/atribut-title">Stylování atributu <code>title</code></a></li>
  </ul>
</div>




<h2 id="umisteni">Umístění popisku</h2>

<p>Jestli něco systémové/prohlížečové popisky dobře řeší, tak je to inteligentní umisťování popisku, které zajistjí, že se popisek <b>nezobrazí mimo viditelnou oblast</b>.</p>

<p>Popisek se totiž v závislosti na umístění prvku, který ho vyvolal může zobrazovat:</p>

<ul>
  <li>Vpravo dole – výchozí chování, když je dost místa</li>
  
  <li>Vpravo nahoře – pokud pod tlačítkem není dost místa</li>
  
  <li>Vlevo nahoře/dole – když není místo vpravo od tlačítka a dola/nahoře</li>
</ul>

<p>Navíc výchozí popisek zohledňuje <b>umístění kursoru myši</b>.</p>




<h2 id="reseni">Řešení</h2>


<h3 id="css">CSS popisky</h3>

<p>Při popiscích <b>čistě v CSS</b> je jediná možnost změnu orientace popisku (vlevo/vpravo) zajistit ručním přidáním třídy.</p>

<p>To je poměrně nešikovné, protože:</p>

<ul>
  <li>Všechny popisky bude nutné projít a určit na jakou stranu se mají zobrazovat.</li>
  
  <li>V případě <a href="/responsive">responsivního designu</a> není často jasné, <b>kam se má popiske zobrazit</b> (situace se mění podle šířky).</li>
  
  <li>Situace se mění i při různě dlouhém popisku.</li>
  
  <li>Určit svislé umístění je potom nemožné, protože není jasné, jak bude stránka odrolována.</li>
</ul>

<p>Samotné <b>umístění popisku</b> se potom musí řešit <a href="/position">posicováním</a> – relativní pro popisovaný element, absolutní pro popisek. To znemožňuje použití <code>overflow: hidden</code> pro popisovaný obsah, protože by se tím popisek <b>oříznul</b>.</p>


<h3 id="js">Tooltip v JavaScriptu</h3>

<p>Pro lepší chování je tedy nutné zapojit JavaScript a umístění popisku počítat.</p>

<p>Aby nebyl problém s <code>overflow: hidden</code> popisek se umístí přímo do nějakého společného elementu.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS Ticks: <a href="http://css-tricks.com/collision-detection/">Collision Detection</a></li>
  
  <li><a href="http://github.hubspot.com/tether/">Tether</a> – připojení absolutně posicovaných elementů ke statickým</li>
</ul>