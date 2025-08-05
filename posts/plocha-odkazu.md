---
title: "Plocha odkazu"
headline: "Plocha odkazu"
description: "Proč a jak vytvářet klikací plochu kolem odkazu."
date: "2014-12-16"
last_modification: "2014-12-21"
status: 1
tags: ["napady", "odkazy"]
format: "html"
---

<p>Častým nedostatkem na webových stránkách je <b>malá plocha odkazu</b>. Zvlášť problematické je to na <b>dotykových zařízeních</b> s menšími displeji, kdy je problém malý odkaz <b>prstem trefit</b>.</p>

<p>V řadě případů přitom jde plochu odkazu zvětšit prostým <b>využitím prázdného místa</b>.</p>


<h2 id="menu">Menu</h2>

<p>Budeme-li mít například následující <a href="/menu">menu</a>:</p>

<div class="live">  
  <style>
    .priklad-menu {background: #fff; width: 10em; margin: 0}
    .priklad-menu a {border: 0; text-decoration: none}
  </style>
  <menu class="priklad-menu">
    <li><a href="#">První odkaz</a></li>
    
    <li><a href="#">Druhý delší odkaz na více řádků</a></li>
    
    <li><a href="#">Odkaz</a></li>
  </menu>
</div>

<p>Bylo by lepší, kdyby odkazy <i>klikaly</i> po celé šířce, často k tomu stačí jen přidat <a href="/display#block"><code>display: block</code></a>.</p>

<div class="live">  
  <style>
    .vetsi-plocha a {display: block;}
  </style>
  <menu class="priklad-menu vetsi-plocha">
    <li><a href="#">První odkaz</a></li>
    
    <li><a href="#">Druhý delší odkaz na více řádků</a></li>
    
    <li><a href="#">Odkaz</a></li>
  </menu>
</div>


<h2 id="kliknete-zde">Klikněte zde</h2>

<p>Dále nedostatečnou plochou trpí prosté odkazy typu:</p>

<div class="live">
  <p>Pro jako zobrazení klikněte <a href="#">zde</a>.</p>
</div>

<p>Zvětšit klikací plochu jde snadno uvedením <b>výzvy k akci</b>:</p>

<div class="live">
  <p><a href="#">Jako zobrazit</a></p>
</div>

<p>Kromě zvětšení plochy je to výhodné i pro uživatele, protože když se při <b>rychlém pročítání stránky</b> zastaví na odkazu jakožto <b>výrazném prvku</b>, rychle pochopí jeho význam (nemusí číst text okolo).</p>

<p>Obzvlášť důležitý odkaz je rozumné ještě <b>zvýraznit odlišným stylem</b>.</p>

<div class="live">
  <style>
    .dulezity-odkaz a {
      display: block;
      margin: auto;
      width: 50%;
      text-align: center;
      color: #fff;
      border: 1px solid;
      border-radius: .5em;
    }
  </style>
  <p class="dulezity-odkaz"><a href="#">Jako zobrazit</a></p>
</div>


<h2 id="strankovani">Stránkování</h2>

<p>Níže uvedené <a href="/strankovani">stránkování</a> bude nejspíš velmi nepohodlné.</p>

<div class="live">
  <p>
    <a href="#">1</a> <a href="#">2</a> <b>3</b> <a href="#">4</a> <a href="#">5</a>
  </p>
</div>

<p>Šlo by lehce vylepšit přidáním vycpávky (<code>padding</code>u):</p>

<div class="live">
  <style>
    .lepsi-strankovani * {padding: .5em 1em; text-align: center;}
  </style>
  <p class="lepsi-strankovani">
    <a href="#">1</a> <a href="#">2</a> <b>3</b> <a href="#">4</a> <a href="#">5</a>
  </p>
</div>

<p>Zrovna v případě stránkování se ale dá celý problém často řešit <b>úplně jinak</b> a lépe:</p>

<div class="live">
  <p class="lepsi-strankovani">
    <a href="#">&laquo; Předchozí</a> <a href="#">Další &raquo;</a>
  </p>
</div>




<h2 id="velka">Příliš velká plocha</h2>

<p>Opačným problémem je naopak <b>příliš velká klikací plocha</b>. Uživatelé používající pro ovládání <b>myš</b> si ji potřebují někam <i>odložit</i> – mít kursor v části stránky, která nic nedělá. Hodí se to třeba při <b>přepínání mezi nemaximalisovanými okny</b> nebo pro použití <b>kontextové nabídky</b>.</p>

<p>Typickým (většinou) špatným příkladem je výpis témat v diskusním fóru, kde „klikají“ celé řádky.</p>

<p>Pro uživatele <b>dotykových zařízeních</b> to většinou problém nebývá.</p>


<h2 id="rozestup">Odstupy od odkazů</h2>

<p>Co je naopak zásadní problém některých <a href="/responsivni-web">responsivních webů</a> na dotykových zařízeních je nedostatečný prostor mezi jednotlivými odkazy. V kombinaci s <b>malou plochou</b> to může totálně znemožnit pohodlné trefení se na požadované místo.</p>


<h2 id="test">Testování</h2>

<p>Google při testování stránek, jestli se hodí pro mobilní zařízení, posuzuje jako jednu z věcí i právě <b>velikost a rozestupy mezi odkazy</b>. Úspěšné stránky potom označuje jako „<a href="/google-mobile-friendly">mobile-friendly</a>“.</p>

<p><a href="https://www.google.com/webmasters/tools/mobile-friendly/" class="button">Mobile-Friendly Test</a></p>