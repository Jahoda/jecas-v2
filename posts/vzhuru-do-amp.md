---
title: "Recense: Vzhůru do AMP"
headline: "Recense: Vzhůru do AMP"
description: "Má smysl používat AMP, nebo je to úplná blbost?"
date: "2020-05-11"
last_modification: "2020-05-12"
status: 1
tags: ["js", "produktivita", "recense"]
format: "html"
---

<p>Po <a href="/vzhuru-do-css3">Vzhůru do CSS3</a> a <a href="/vzhuru-do-responzivniho">Vzhůru do (responzivního) webdesignu</a> vyšla v roce 2019 i příručka k <b>výrobě AMP webů</b> od Martina Michálka s Robinem Pokorným.</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.vzhurudolu.cz/ebook-amp/">Vzhůru do AMP</a> – Vše o technologii pro tvorbu bezkonkurenčně rychlých webů v jednom e-booku. 304 stránek. Cena 299 Kč.</li>
  </ul>
</div>



<h2 id="historie">Historie</h2>

<p>O AMP jsem psal poprvé v roce 2016, kdy se tomu ještě říkalo <a href="/amp-html">AMP HTML</a>. Technologie od Google, která má sloužit ke <b>zrychlení webu</b> díky značným omezením v používání potenciálně pomalých a neefektivních knihoven a řešení.</p>

<p>Tehdy jsem došel k tomu, že AMP může mít své uplatnění, ale osobně si nebudu brzdit web stahováním AMP knihovny a v praxi tuto technologii nepoužívám.</p>


<p>Změnila se nějak situace?</p>







<h2 id="soucasnost">Současnost</h2>

<p>Hlavní výhoda a důvod pro vytvoření AMP webu je <b>AMP Cache</b>.</p>

<p>Co to je?</p>


<h3 id="amp-cache">AMP Cache</h3>

<p><b>Google</b> a některé další firmy jsou ochotné AMP podoby stránek ukládat na své servery. A zároveň je ještě optimalisovat s ohledem na rychlost.</p>

<p>Díky tomu, že dodržení AMP podmínek má garantovat, že je stránka datově malá a rychlá, <b>Google může přednačítat a dokonce předrenderovávat AMP weby ve vyhledávání</b>. Tím se docílí bezkonkurenčně rychlého (často okamžitého) zobrazení webu po kliknutí z vyhledávače.</p>

<p>Docílit toho s <i>normálním</i> webem není možné.</p>

<p>Bohužel tedy z důvodu omezení Google, protože pořád platí, že <b>ne-AMP stránka může být rychlejší než AMP</b> (hlavně proto, že nemusí stahovat a spouštět cca 260 kB kódu samotného AMP JavaScriptu).</p>

<p>Mimo přístupy na web z Google a jiných služeb, co podporují přednačítání AMP versí, <b>může AMP stránku zpomalovat</b>.</p>

<p>To se týká ale hlavně hodně rychlých webů s maximálně nízkými stovkami kB JS kódu.</p>




<h3 id="js-komponenty">Připravené JS komponenty</h3>

<p>Zajímavá je i <b>AMP knihovna z pohledu vývojářů</b>, protože nabízí <b>hotová řešení v JavaScriptu</b> blízká <i>best practice</i> pro běžné součásti vývoje stránky jako <a href="/lazy-loading">lazy loading</a>, vkládání obrázků, videí, reklam nebo čehokoliv jiného bez otravného <a href="/poskakovani">poskakování</a> stránky a podobně.</p>

<p>Připravené jsou i komponenty pro stavění layoutu jako třeba vysouvací menu (<code>amp-sidebar</code>), existuje rozbalovací sekce (<code>amp-accordion</code>) nebo třeba i komponenta pro odpočet času (<code>amp-date-countdown</code>).</p>

<div class="external-content">
  <ul>
    <li>amp.dev: <a href="https://amp.dev/documentation/components/">The AMP Component Catalogue</a> – přehled všech komponent</li>
  </ul>
</div>






<p>AMP tak nemusí znamenat osekaná varianta normálního webu, ale jde web rovnou začít tvořit jako AMP. Dokonce i třeba <b>e-shop</b> (detail produktu e-shopu je v knize přímo jako příklad).</p>


<h3 id="js">Podpora vlastního JS</h3>

<p>Vzhledem k neustálému vývoji je kniha mírně neauktuální. V době jejího vzniku ještě nebylo možné používat vlastní JavaScript.</p>

<p>Aktuálně je možné vložit v součtu až <b>150 kB vlastních skriptů</b> přes značku <code>&lt;amp-script></code>. Takže klidně používat React nebo jQuery.</p>

<p>Nejedná se ale o plnohodnotnou podporu. Vlastní JS se spouští přes <b>Web Worker</b> (způsob, jak pouštět JS v jiném vlákně než samotnou stránku a neblokovat ji). Z toho plynou některá omezení v <a href="https://github.com/ampproject/worker-dom/blob/master/web_compat_table.md">použitelných rozhraní</a>. Omezené jsou i některé manipulace <a href="/dom">DOMu</a>.</p>

<div class="external-content">
  <ul>
    <li>amp.dev: <a href="https://amp.dev/documentation/guides-and-tutorials/develop/custom-javascript/">Use custom JavaScript in AMP pages</a></li>
  </ul>
</div>

<h3 id="css">Omezení CSS</h3>

<p>Velikost veškerého CSS, ať se vkládá jakkoliv, je omezená na <b>cca 75 kB</b>.</p>

<p>Styly se vkládají buď pomocí značky <code>&lt;style amp-custom></code>, nebo klasicky inline do atributu <code>style</code>, kde je pro každý atribut limit necelý <b>1 kB</b> (1000 bytů)</p>

<p>Externí CSS nelze připojovat s výjimkou vlastní fontů.</p>

<p>Není možné používat <a href="/important"><code>!important</code></a> ani stylovat třídy a značky začínající na <code>i-amphtml-</code>, aby nešlo přestylovat prvky AMP, pokud se zobrazuje z AMP Cache (jedná se například o pruh s informací o původní URL stránky).</p>


<h2 id="budoucnost">Budoucnost</h2>

<p>AMP svým způsobem přidává na web věci, které by se dávno hodilo mít rovnou v prohlížečích. Je to rychlejší cesta z opačné strany, než vytvářet webové standardy, které se potom dlouhou dobu dostávají do stavu, kdy jsou prohlížeči dobře podporované.</p>

<p>Osobně to vidím tak, že jednoho krásného dne <b>nebudou AMP komponenty potřeba</b>, protože prohlížeče nebudou <i>rozbité</i> a budou řadu funkcionalit AMP komponent umět nativně.</p>




<h2 id="zaver">Závěr</h2>

<p>Kniha  je neuvěřitelně ucelený průvodce touto technologií. Kromě teorie nabízí i praktický příklad, <b>jak do AMP správně přetvořit existující web</b> – jak jednotlivé prvky nahradit za AMP ekvivalenty a na co si dát pozor.</p>

<p>Obsahuje odpovědi prakticky na všechny otázky, co by člověka mohly napadnout.</p>

<p>Trochu jsem se obával, že to bude <b>nekritické opěvování AMP</b> ze strany jeho  fanoušků. Naštěstí se to nestalo a kniha se věnuje i argumentům proti AMP (třeba závislosti na Google) a osobně nemám moc s čím nesouhlasit.</p>

<p>Doporučuji si ji přečíst!</p>

<p><a href="https://www.vzhurudolu.cz/ebook-amp/">Vzhůru do AMP</a>!</p>
