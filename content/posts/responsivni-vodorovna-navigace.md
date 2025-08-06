---
title: "Responsivní navigace s neznámou šířkou"
headline: "Responsivní navigace s neznámým počtem položek"
description: "Jak vytvořit lepší horisontální responsivní navigaci, než je pouhé skrývání položek do tlačítka."
date: "2013-12-15"
last_modification: "2013-12-15"
status: 0
tags: []
format: "html"
---

<p>V případě, že má <b>vodorovná navigace</b> sestávat z <b>neznámého počtu položek s neznámou šířkou</b>, je trochu oříšek vymyslet dobré řešení.</p>

<p>První možnost je počítat při návrhu vzhledu se situací proměnlivého počtu položek a navigaci plánovat jako <b>víceřádkovou</b>.</p>


<p>Další způsob je při určité šířce (kdy už se navigace nevejde do jednoho řádku) skrýt menu do tlačítka, pod tzv. <i>hamburger ikonu</i>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/responsivni-menu">Responsivní menu</a> – skrytí navigace do tlačítka</li>
  </ul>
</div>


<p>Nevýhoda tohoto postupu se projeví u navigací, kde mají různé položky <b>různou důležitost</b> – v takové situaci by bylo lepší skrýt jen méně důležitý obsah a ten důležitější nechat rovnou viditelný (stranou ponechám námitku, jestli méně důležitý obsah má v navigaci vůbec být).</p>

<p>Následující obrázek ilustruje, co se stane při <b>zmenšení dostupné šířky</b>.</p>

<p><img src="/files/responsivni-vodorovna-navigace/responsivni-navigace.png" alt="Skrytí méně důležitých položek" class="border"></p>
















<p>V momentě, kdy se nejméně podstatná položka vpravo už nevejde do prostoru, zmizí a místo ní se zobrazí šipka (nebo cokoliv jiného), co další nabídku dokáže zobrazit/skrýt.</p>





<h2 id="reseni">Technické řešení</h2>

<p>Uvést myšlenku do praxe jde několika způsoby:</p>

<ol>
  <li>Počítat JavaScriptem <b>šířku jednotlivých položek</b> a ty, co se nevejdou, v <a href="/dom">DOMu</a> přesunout do odkrývatelné podnabídky.</li>
  
  <li>Využít přirozeného chování CSS, kdy se položky řadí pod sebe, a pouze <b>omezit výšku na jeden řádek</b>. Změna výšky z jednoho řádku na neomezenou zajistí odkrývání/skrývání.</li>
</ol>




<h2 id="posuvnik">Posuvník</h2>

<p>Asi nejsnazší řešení je nastavit menu na jeden řádek zakázáním zalamování (<code>white-space: nowrap</code>), nastavit <code>max-width</code> na 100 % a přidat volitelný posuvník konstrukcí <code>overflow: auto</code>.</p>

<p>V případě, že se všechny položky na obrazovku nevejdou, se zobrazí posuvník.</p>

<p>Na desktopu systémový posuvník nemusí vypadat úplně esteticky. Pokud se ale na desktop / nedotyková zařízení většinou vejdou všechny položky, nemusí to vadit, protože na tabletech a mobilech už velký posuvník obvykle nebývá.</p>

<h3 id="znazorneni">Znázornění posouvání</h3>

<p>Toto řešení má menší problém v tom, že na dotykových zařízeních kvůli absenci posuvníku nemusí být jasné, že má menu další položky.</p>



<p><a href="https://kod.djpw.cz/djdc">Živá ukázka</a></p>

<h3 id="vyska">Omezení výšky</h3>

<li><a href="https://kod.djpw.cz/hxnb">Živá ukázka</a> – přeskupování položek</li>

<li><a href="https://kod.djpw.cz/xnqb">Živá ukázka</a> – zobrazení <i>Více</i>, jen když je potřeba</li>

<h3 id="pocitani">Počítání šířky skriptem</h3>
<li><a href="https://kod.djpw.cz/rxnb">Živá ukázka</a> – zobrazení další položek dole</li>

<h3 id="jquery">Řešení v jQuery</h3>

<li><a href="https://kod.djpw.cz/tkob">Živá ukázka</a></li>

<h2 id="odkazy">Odkazy jinam</h2>


<ul>
  <li><a href="http://codepen.io/olach/pen/adeMzP/">CSS only priority navigation</a> – řešení pouze v CSS <a href="https://kod.djpw.cz/wjwb">ukázka</a></li>
  <li><a href="http://blog.teamtreehouse.com/challenges-solutions-responsive-navigation">Challenges &amp; Solutions for Your Responsive Navigation</a></li>
</ul>#