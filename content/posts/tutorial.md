---
title: "Tutoriál na webu"
headline: "Tutoriál na webu"
description: "Jak vyrobit jednoduchý tutoriál pro seznámení se s webovou aplikací."
date: "2014-01-15"
last_modification: "2014-01-26"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<link rel="stylesheet" href="/files/tutorial/tutorial.css">
<script src="/files/tutorial/tutorial.js"></script>

<p>Při navrhování/upravování uživatelského rozhraní webové aplikace stojíme před dilematem, jak vytvořit rozhraní, které je zároveň:</p>

<ol>
  <li><b>intuitivní na pochopení</b> už při první návštěvě,</li>
  <li><b>přehledné a jednoduché</b> při rutinním používání</li>
</ol>

<p>Zatímco v prvním případě jsou užitečné všelijaké popisky a vysvětlivky, ve druhém je to nadbytečný balast, protože uživatel už jen <i>kliká po paměti</i>.</p>

<p>Příkladem může být tlačítko <i>Start</i> z OS Windows, u kterého šlo bez obav vypustit textový popisek, protože už <i>každý</i> věděl, co daná ikona znamená.</p>

<p data-tutorial-step="1" data-tutorial="Obrázek srovnání Start menu z Windows 95 a Windows 7"><img src="/files/tutorial/start-menu-95-w7.png" alt="Srovnání Start menu z Windows 95 a Windows 7" class="border"></p>

<p>Jako řešení se nabízí (kromě vytváření dvou versí) jakýsi <b>tutoriál</b>, který projde v několika krocích jednotlivé části aplikace a podrobněji je vysvětlí.</p>

<p><button onclick="tutorial()" data-tutorial-step="5" data-tutorial="Tímto tlačítkem se spouští tutorial.">Spustit ukázku tutoriálu</button> nebo <a href="https://github.com/Jahoda/tutorial" class="">zobrazit na GitHubu</a> (<a href="http://kod.djpw.cz/pmbb">samostatná živá ukázka</a>)</p>

<h2 id="pouziti">Použití</h2>
<p>Po připojení potřebného JS a CSS, se vybrané elementy „k vysvětlení“ přidají do tutoriálu pomocí <a href="/vlastni-html-znacky">vlastního atributu</a> <code>data-tutorial</code>.</p>

<p>Obsah nápovědy se vkládá jako <code>innerHTML</code>, tudíž atribut <code>data-tutorial</code> může obsahovat i <b>HTML kód</b>.</p>

<pre><code>&lt;div class="element" <b>data-tutorial-step="1" data-tutorial="&lt;b>Tučný&lt;/b> popisek"</b>></code></pre>

<p>Druhý atribut <code>data-tutorial-step</code> určuje pořadí jednotlivých kroků.</p>

<p>Potom stačí zavolat funkci <code>tutorial</code>. Buď třeba po <b>kliknutí</b> (<code><a href="/udalosti-mysi#onclick">onclick</a>="tutorial()"</code>) nebo <b>ihned po načtení stránky</b>:</p>

<pre><code>&lt;script>
  tutorial();
&lt;/script></code></pre>

<h3>Alternativní použití</h3>
<p>Někdy není moc vhodné zanášet HTML kód <code>data</code> atributy, ale bylo by vhodnější tutoriál nadeklarovat jednotně.</p>

<pre><code>createTutorial({
    "Popis prvního kroku" : document.getElementsByTagName("div")[0],
    "Popis druhého kroku" : document.getElementsByTagName("div")[3],
  });</code></pre>

<p>Zavoláním tohoto kódu před <code>tutorial()</code> první a druhý <code>&lt;div></code> na stránce utvoří jednotlivé kroky celého tutoriálu. Oba postupy není momentálně možné kombinovat.</p>

<p><a href="http://kod.djpw.cz/qmbb">Ukázka</a>.</p>

<h2 id="reseni">Jak to funguje?</h2>

<h3 id="pozadi">Průhledné pozadí přes celou stránku</h3>
<p>Po vyvolání nápovědy se vytvoří <a href="/opacity">průhledný element</a> s černým pozadím, který zakryje celou stránku. Opticky ji tedy ztmaví. (Od <b>IE 9</b> by šla použít <a href="/opacity#rgba" data-tutorial-step="2" data-tutorial="Odkaz na průhlednou barvu pomocí rgba()." href="/css-sipky">průhledná barva</a>).</p>
<p>Způsobů, jak takový element vytvořit, existuje několik:</p>

<ol>
  <li>
    <p><a href="/position#absolute">Absolutní posice</a>, 100% výška a šířka a relativní posice pro <code>&lt;body></code>. <a href="http://kod.djpw.cz/xhbb">Ukázka</a>.
    </p>
  </li>
  <li>
    <p>V případě, že se jako <a href="/stylovani-body">obal stránky</a> používá přímo <code>&lt;body></code>, je problém se absolutním posicováním dostat <i>mimo</i>. Může pomoci <a href="/position#fixed">fixní posice</a>. <a href="http://kod.djpw.cz/yhbb">Ukázka</a>.
    </p>
  </li>
  <li>
    <p>Změřit <a href="/zjisteni-rozmeru">velikost stránky</a> JavaScriptem. Je v tom trochu nejednotnosti napříč prohlížeči, ale jako funkční se zdá být následující kód:</p>
    
    <pre data-tutorial-step="4" data-tutorial="Zdrojový kód funkce pro zjištění rozměrů stránky."><code>function pageSize() {
  return {
    width: (document.body.scrollWidth > document.documentElement.scrollWidth) ? document.body.scrollWidth : document.documentElement.scrollWidth,
    height: (document.body.scrollHeight > document.documentElement.scrollHeight) ? document.body.scrollHeight : document.documentElement.scrollHeight,
  }
}</code></pre>
  </li>
</ol>

<h3 id="zvyrazneni">Zvýraznění elementu</h3>
<p>Zvýraznění konkrétní části stránky je vytvořené <a href="/position#z-index">změnou <code>z-index</code>u</a> (nastaví se vyšší než pro překryvnou vrstvu). K tomu je nutná jiná hodnota <code>position</code> než <code>static</code>. Proto pokud je <code>static</code>, přepne se na relativní. (Může to teoreticky dělat problémy, kdyby element měl ponechané vlastnosti jako <code>left</code> a <code>top</code>, které by se změnou <code>position</code> projevily.)</p>

<p>Další <i>vlastnost</i> tohoto způsobu zvýraznění je ta, že se moc neprojeví u elementu, co <b>nemá nastavené pozadí</b>. Může být proto vhodné nastavit universální barvu pro zvýrazněný element (má třídu <code>tutorial-highlight</code>).</p>

<h3 id="popisek">Zobrazení nápovědy</h3>
<p>Popisek k jednotlivým krokům je absolutně posicovaný <code>&lt;div></code>. Jeho umístění je trochu inteligentní:</p>

<ul>
  <li>Kontroluje se místo vlevo a vpravo vedle zvýrazněného boxu a podle toho se box s popiskem umístí.</li>
  <li>Zároveň je lehce nad popisek <a href="/odrolovani">odrolováno</a> v případě, že by měl být mimo <b>viewport</b>.</li>
</ul>

<p><a data-tutorial-step="3" data-tutorial="Odkaz na generátor CSS šipek." href="/css-sipky">Šipky</a> jsou <a href="/css-kresleni">nakresleny v CSS</a>.</p>

<h3 id="zavrit">„Zavření“ tutoriálu</h3>
<p>Ukončit nápovědu je možné třemi způsoby.</p>

<ol>
  <li>Kliknout na <b>zavírací křížek</b>.</li>
  <li>Kliknout mimo nápovědu a zvýrazněný element.</li>
  <li>Projít celou nápovědu — v posledním kroku je místo tlačítka „Další“ volba „Ukončit“.</li>
</ol>

<h3 id="korkovani">Krokování</h3>
<p>Krok se ukládá do proměnné <code>step</code>. To má tu výhodu, že po zavření tutoriálu je možné opět navázat v téže kroku nebo rovnou spustit až N-tý krok.</p>

<pre><code>step = 3;
tutorial();</code></pre>

<h3 id="zmena-velikosti">Změna velikosti okna</h3>
<p>Skript při <code>window.resize</code> přepočítává umístění popisku a zda je ve viewportu.</p>

<!--
http://kod.djpw.cz/lfbb
http://kod.djpw.cz/mfbb
http://kod.djpw.cz/nfbb

    // No background
    if (getStyle(el, "background-image") == "none" && getStyle(el, "background-color") == "transparent") {
      tutorialContent.className += " tutorial-no-background";
    }
    alert(getStyle(el, "background-image") + "--------" + getStyle(el, "background-color"));
-->


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://xbsoftware.com/products/enjoyhint">EnjoyHint</a></li>
</ul>