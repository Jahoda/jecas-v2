---
title: "ID, nebo CLASS?"
headline: "Používat <code>id</code>, nebo <code>class</code>?"
description: "Rozdíl mezi .třídou a #identifikátorem."
date: "2013-09-12"
last_modification: "2013-09-14"
status: 1
tags: ["css", "napady"]
format: "html"
---

<p>Pro přiřazení CSS pravidel k úplně libovolnému elementu na stránce je možné použít identifikátor nebo třídu. Na první pohled se to může zdát jedno, ale mezi <b>ID a třídou jsou rozdíly</b>:</p>

<ol>
  <li><p>ID umí prohlížeč použít pro <b>odkázání</b> na <code>#kotvu</code>.</li>
  <li><p>Podle ID umí všechny prohlížeče <b>najít element v JavaScriptu</b>:
    <pre><code>var element = document.getElementById("id-elementu");</code></pre>
    <p>Hledání podle třídy (<code>getElement<b>s</b>By<b>ClassName</b></code>) funguje přímo až od <b>Exploreru 9</b>.</p>
    </li>
  <li><p>Identifikátor má <b>v CSS vyšší prioritu</b>. Následující kód proto zbarví odstavec na červenou, nikoliv na modrou (<a href="http://kod.djpw.cz/mzb">ukázka</a>).</p>
    <pre><code>p#cerveny {color: red}
p.modry {color: blue}</code></pre>
  </li>
  <li><p>Stejné ID by teoreticky <i>mělo</i> být na stránce jen jednou…</p></li>
</ol>

<h2 id="opakovani">Více stejných ID</h2>
<blockquote><p>Identifikátory by se narozdíl od tříd neměly na stránce opakovat.</p></blockquote>
<p>Tak nějak praví specifikace.</p>
<p>V praktickém používání na tom moc nezáleží:</p>
<ol><li><p>V samotném CSS je to <b>úplně jedno</b>, přiřazení stejných ID k více elementům <b>všude funguje</b>.</p></li>
<li>U kotev a hledání elementu dle ID v JavaScriptu zase <b>první vyhrává</b>, tj. prohlížeč odroluje na první #kotvu a JS vrátí první element s daným #identifikátorem (<a href="http://kod.djpw.cz/pzb">ukázka</a>).</li>
</ol>
<p>Mohlo by se zdát, že radím používat opakované používání stejných ID. <b>Není tomu tak.</b> Užitím jednoho identifikátoru vícekrát riskujeme obtížně odhalitelnou chybu.</p>

<h2 id="doporuceni">Kdy používat ID a kdy třídu?</h2>
<p>Dospěl jsem k závěru, že nejlepší je v CSS <b>používat jen třídy</b> a identifikátorům se v CSS selektorech vyhnou. ID ve stylech kromě <i>přebíjení</i> nic navíc nenabízejí (a přebíjet lze i s třídami).
  <p>Výhoda tohoto postupu je, že kdykoliv vidím na stránce v HTML kódu <code>id</code>, <b>je jasné, že je tam kvůli JavaScriptu nebo #kotvě</b>. Snižuje se tak při úpravách kódu nejistota, zda třeba přejmenování identifikátoru kvůli CSS nerozbije JavaScript.</p>

<p>Pokud chci daný element stylovat i s ním pracovat skriptem, napíšu jej jako:</p>
<pre><code>&lt;div id="element" class="element"&gt;</code></pre>
<p>Myslím, že to za to stojí.</p>

<h2 id="jine-selektory">Alternativa k třídám a ID</h2>
<ul><li><a href="/css-selektory">CSS selektory</a> už dnes umí o hodně víc než jen .třídy a #identifikátory. <li>Novější prohlížeče podporují <a href="/vlastni-html-znacky">vlastní HTML značky</a> a vlastní atributy.</ul>
<p>Takový <i>beztřídní</i> zápis pravidla by mohl vypadat:</p>
<pre><code>clovek[dulezity=ano] {color: red}</code></pre>
<p>A HTML:</p>
<pre><code>&lt;clovek dulezity="ano"&gt;Jahoda&lt;/clovek&gt;</code></pre>