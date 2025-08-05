---
title: "5minutový rychlokurs Bootstrapu"
headline: "5minutový rychlokurs Bootstrapu"
description: "Jak za 5 minut vytvořit web pomocí CSS frameworku Bootstrap."
date: "2016-01-22"
last_modification: "2016-01-23"
status: 1
tags: ["css", "knihovny", "napady"]
format: "html"
---

<p>Bootstrap je populární CSS framework – stručně řečeno sada připravených hotových stylů, které lze pohodlně aplikovat na HTML kód a vytvořit tak ne úplně odpudivě vypadající stránku během pár minut bez nutnosti psát nebo znát CSS.</p>

<p>Pro některé vymoženosti je potřeba ještě <code>*.js</code> soubor, ale není to podmínkou.</p>



<h2 id="vychozi">Výchozí styly prohlížeče</h2>

<p>Používá-li stránka pouze prosté HTML, výsledné zobrazení obstará výchozí styl prohlížeče.</p>

<div class="internal-content">
  <ul>
    <li><a href="/css-reset#vychozi">Příklady výchozích hodnot CSS v prohlížečích</a></li>
  </ul>
</div>

<p>Ten zajistí, že například <a href="/nadpisy">nadpisy</a> budou větším a tučným písmem, <a href="/odkaz">odkaz</a> bude barevně odlišen, <a href="/tabulky">tabulka</a> bude vypadat jako tabulka a podobně.</p>

<p>Výchozí formátování některých HTML elementů je vidět na následující <a href="http://kod.djpw.cz/sutb">ukázce</a>:</p>

<p><img src="/files/bootstrap-rychlokurs/vychozi.png" alt="Výchozí vzhled" class="border"></p>
























<h2 id="pripojeni">Připojení Bootstrapu</h2>

<p>Není-li chuť nebo čas se věnovat vymýšlení vlastního originálního vzhledu, trochu lepšího zobrazení se docílí prostým připojením CSS souboru <code>bootstrap.css</code>.</p>

<p>Pro zrychlení instalace není potřeba CSS soubor Bootstrapu ani stahovat, ale dá se připojit z <a href="https://www.bootstrapcdn.com/">CDN</a> (<a href="/cdn" lang="en">Content delivery network</a>) vložením <code>&lt;link></code> značky do <a href="/html-kostra#head">hlavičky</a>:</p>

<pre><code>&lt;link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"></code></pre>




<p>Soubor <code>bootstrap.min.css</code> má po zagzipování docela přijatelných cca 25 kB.</p>

<p>Stránka se při načtení tohoto CSS zobrazí… <a href="http://kod.djpw.cz/avtb">jinak</a>:</p>


<p><img src="/files/bootstrap-rychlokurs/pripojeni.png" alt="Výchozí vzhled Bootstrapu" class="border"></p>



















<p>Zatím se nedá úplně říct, že by vypadala mnohem lépe než ve výchozím zobrazení. Znatelného zlepšení se dosáhne až použitím vestavěných CSS tříd:</p>





<h2 id="styly">Připravené styly</h2>

<p>Studovat, jak se co v Bootstrapu dělá, je ideální procházením ukázek/příkladů. Jejich rozcestník je na následující stránce:</p>

<div class="external-content">
  <ul>
    <li>Bootstrap: <a href="http://getbootstrap.com/getting-started/#examples">Getting started: Examples</a></li>
  </ul>
</div>

<p>Při objevení nějakého prvku, který by se hodil na stránce použít, stačí použít funkci prohlížeče <i>Prozkoumat</i>, která zobrazí HTML kód ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a>. Tato možnost se objeví po kliknutí pravým tlačítkem na element (obrázek pochází z <b>Chrome</b>):</p>


<p><img src="/files/bootstrap-rychlokurs/prozkoumat.png" alt="Prozkoumání BS prvku" class="border"></p>


















<p>Tím se zobrazí HTML kód, kterým se po zkopírování do vlastníh HTML dosáhne stejného efektu jako na ukázkové stránce:</p>

<p><img src="/files/bootstrap-rychlokurs/html-tlacitko.png" alt="Prozkoumání BS prvku" class="border"></p>


















<p>Tak jde snadno původní ukázku během pár minut zkrášlit (<a href="http://kod.djpw.cz/uutb">ukázka</a>):</p>


<p><img src="/files/bootstrap-rychlokurs/uprava.png" alt="Výsledek po použití BS" class="border"></p>






















<h2 id="komponenty">Užitečné komponenty</h2>

<p>Vzhledem k tomu, že o základní nastavení typografie se postará Bootstrap automaticky, lze si u jednoduchého webu vystačit jen s pár komponentami.</p>



<h3 id="obal">Obal obsahu stránky</h3>

<p>Obsah je běžně nalepený na okraje. Po přidání obalu dostane stránka maximální šířku a bude vodorovně <a href="/centrovani">centrovaná</a>:</p>

<pre><code>&lt;div class="container">
  Obsah stránky
&lt;/div></code></pre>





<h3 id="tlacitka">Tlačítka</h3>

<p>Pro tlačítka jsou připraveny styly pro různé velikosti a typy akcí (liší se barvami):</p>

<pre><code>&lt;button class="btn btn-success">
  Odeslat
&lt;/button></code></pre>





<p>Styl tlačítek jde aplikovat i na odkazy <code>&lt;a href="…"></code>.</p>



<h3 id="tabulky">Tabulky</h3>

<p>Lépe formátovaných tabulek se docílí prostým přidáním třídy <code>table</code>.</p>

<pre><code>&lt;table class="table"></code></pre>


<p>Třída <code>table-striped</code> zajistí pruhovanou tabulku (odlišení lichých a sudých řádků):</p>

<pre><code>&lt;table class="table <b>table-striped</b>"></code></pre>


<p>Záhlaví tabulky se automaticky vytvoří po použití HTML značky <code>&lt;thead></code>.</p>




<h3 id="hlasky">Hlášky</h3>

<p>Pokud web vypisuje nějaký obsah uživateli na základě jeho akce (např. odeslání formuláře), jsou k disposici varovné a potvrzující hlášky:</p>

<pre><code>&lt;div class="alert <b>alert-success</b>">
  Obsah byl úspěšně odeslán.
&lt;/div></code></pre>




<p>Barevná podoba hlášky se určuje druhou třídou <code>alert-*</code>. Jde použít <code>alert-success</code>, <code>alert-info</code>, <code>alert-warning</code> a <code>alert-danger</code>:</p>

<p><img src="/files/bootstrap-rychlokurs/alert.png" alt="Hlášky v Bootstrapu" class="border"></p>





















<h3 id="formulare">Formuláře</h3>

<p><a href="/formulare">Formuláře</a> se označují třídou <code>form</code> u elementu <code>&lt;form></code>. Řádkový formulář se vytvoří třídou <code>form-inline</code>.</p>

<p>Jednotlivá políčka <a href="/input"><code>&lt;input></code></a> by měla mít <code>class="form-control"</code>. Skupina políček se obaluje třídou <code>form-group</code>.</p>


<p>Více o tvorbě formulářů je v následujícím přehledu:</p>

<div class="external-content">
  <ul>
    <li>Bootstrap Components: <a href="http://v4-alpha.getbootstrap.com/components/forms/">Forms</a></li>
  </ul>
</div>

<h2 id="programatori">Programátoři navrhují design</h2>

<p>O Bootstrapu se někdy mluví jako o nástroji, který umožňuje programátorům vytvářet aplikace, které nejsou jako od programátorů.</p>

<p>Bohužel to platí jen částečně. Vzhledově skutečně jde pomocí Bootstrapu dosáhnout profesionálně vypadajícího vzhledu (byť v dnešní době značně tuctového). Co se ale týče dobré použitelnosti, využití Bootstrapu a jeho komponent ji v žádném případě negarantuje.</p>