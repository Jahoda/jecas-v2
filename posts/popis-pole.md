---
title: "Popis formulářového políčka"
headline: "Popisek formulářového pole"
description: "Jakým způsobem řešit popisky formulářových prvků."
date: "2015-04-29"
last_modification: "2015-04-30"
status: 1
tags: ["formulare", "hotova-reseni", "napady"]
format: "html"
---

<p>Má-li návštěvník webu vyplnit políčko ve formuláři, je zpravidla nutné ho nějakým způsobem popsat.</p>

<div class="live" data-zvyraznovany="k-zvyrazneni">
  <p>
    <label for="email">
      E-mail: 
    </label>
    <input id="email" type="email" placeholder="jmeno@domena.cz">
    <br>
    <i>Na uvedený e-mail vám budeme posílat spamy</i>
  </p>
</div>

<p>Na příkladu je možné pozorovat 3 popisky:</p>

<ol data-zvyraznovac="k-zvyrazneni">
  <li data-zvyraznit="label[for=email]"><span class="help">název políčka</span> – „E-mail“,</li>
  <li data-zvyraznit="input"><span class="help">příklad hodnoty</span>, kterou má návštěvník vyplnit – „jmeno@domena.cz“ (slouží k tomu atribut <code>placeholder</code>),</li>
    <li data-zvyraznit="i"><span class="help">sekundární popisek</span> blíže doplňující význam políčka.</li>
</ol>


<p>Bývá zvykem, že kliknutí na hlavní popisek tlačítka přesune kursor do políčka (tzv. „dá políčku <code>focus</code>“), takže je možné začít psát. Technicky se to řeší pomocí <a href="/label-for">značky <code>&lt;label></code></a>.</p>

<p>Kvůli <a href="/responsive">responsivním webům</a> je pro zařízení s úzkou obrazovkou nutné řešit <b>nedostatek místa</b>, což vytváří tlak na prostorově úspornější provedení formuláře.</p>

<h2 id="otaznik">Otazník obsahující vysvětlení</h2>

<p>Prvním způsobem úspory místa je schovat <i>sekundární popisek</i> do tlačítka a vysvětlení zobrazovat v tooltipu.</p>

<div class="live">
  <style>
    .popisek {
      background: #0D6AB7;
      color: #fff;
      display: inline-block;
      width: 1.2em;
      line-height: 1.2em;
      text-align: center;
      border-radius: 50%;
      cursor: help;
    }
  </style>
  <p>
    <label for="email2">E-mail:</label><br>
    <input id="email2" type="email" placeholder="jmeno@domena.cz">
    <span class="popisek" title="Na uvedený e-mail vám budeme posílat spamy">?</span>
  </p>
</div>

<p>Technické řešení tooltipu potom samozřejmě může být jiné než prostý <a href="/atribut-title">atribut <code>title</code></a>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/js-tooltip">JS tooltip</a> – vysvětlující popisek po najetí myší</li>
  </ul>
</div>

<p>Zatímco u zařízení <b>ovládaných myší</b> nepředstavuje najetí na popisek výrazný problém, horší je to u ovládání dotykem.</p>

<p>Obyčejný atribut <code>title</code> je úplně ze hry, protože na řadě zařízení z něj <i>nejde popisek vymáčknout</i>. Řešení používající <b>JavaScript</b> má zase problém s tím, že vyžaduje od uživatele <b>vynaložit zvláštní úsilí</b> a tapnout na otazník. To je zvlášť problematické v situaci, kdy se zrovna píše do políčka a je zobrazena klávesnice, protože dotyk mimo ji skryje.</p>


<h2 id="placeholder">Placeholder jako popisek</h2>

<p>Prázdný <a href="/input"><code>&lt;input></code></a> čekající na vyplnění může vybízet k umístění popisku právě do políčka.</p>

<div class="live">
  <p>
    <input type="email" placeholder="E-mail">
    <span class="popisek" title="Na uvedený e-mail vám budeme posílat spamy">?</span>
  </p>
</div>

<p>Od <b>IE 10</b> jde takové chování snadno vytvořit <a href="/placeholder">atributem <code>placeholder</code></a>.</p>

<pre><code>&lt;input <b>placeholder</b>="text"></code></pre>

<p>Ačkoliv to může působit elegantně a úsporně s ohledem na prostor, má poměrně zásadní problém.</p>

<h3 id="mizeni">Mizení popisku</h3>

<p><b>Internet Explorer</b> a <b>Opera 12</b> skryjí obsah <i>placeholderu</i> <b>ihned po aktivování políčka</b>. Pokud tedy člověk rychle klikne do políčka nebo použije klávesu <kbd>Tab</kbd> pro přeskočení na další pole, popisku si vůbec <b>nemusí všimnout</b> a už se k němu snadno nedostane.</p>

<p>Problém může nastat i v situaci, kdy je uživatel během vyplňování pole něčím <b>vyrušen</b>. Začne vyplňovat e-mail, najednou se přepne někam jinam a po návratu k formuláři už vůbec netuší, co vyplňuje. Nezbývá potom než všechno smazat (+ v <b>IE</b> kliknout někam mimo) nebo obnovit stránku, aby se popis pole opět objevil.</p>

<p>Závěr je proto ten, že <b>popisek políčka musí být <font color="red">vždy viditelný</font></b>. Případně musí být za každé situace patrné, co se má do políčka vyplnit.</p>

<p>V atributu <code>placeholder</code> by tedy nemělo být nic hodně důležitého.</p>


<h2 id="presun">Přesun popisku</h2>

<p>Relativně rozumným řešení je umístění popisku do prostoru tlačítka a jeho <b>zmenšení a přesunutí</b> jinam tak, aby byl popisek stále viditelný.</p>

<p>V praxi to může vypadat následovně.</p>

<div class="live">
<style>
.policko {
    position: relative;
}
.policko label {
    position: absolute;
    left: .2em;
    top: 0;
    transition: all .2s;
    line-height: 1;
}

.policko .focus + label {
    top: -1.2em;
    font-size: 70%;
    background: #fff;
    padding: .2em;
}
</style>
<p>
  <span class="policko">
    <input id="email3" type="email" onfocus="this.className = 'focus'">
    <label for="email3">E-mail</label>
  </span>
</p>
<p>
  <span class="policko">
    <input id="url" type="url" onfocus="this.className = 'focus'">
    <label for="url">URL</label>
  </span>
</p>  
</div>

<h2 id="odkazy">Odkazy jinam</h2>

<ul> 
  <li>Codrops: <a href="http://tympanus.net/codrops/2015/03/18/inspiration-text-input-effects-2/">Some More Inspiration for Text Input Effects</a> – různé efekty popisků</li>
  
  <li>Osvaldas Valutis: <a href="http://osvaldas.info/placeholder-polyfill-with-password-support">Placeholder Polyfill with Password Support</a> – podpora <code>placeholder</code>u pro <b>IE 9</b> a starší</li>  
</ul>


<style>
  .zvyraznit {
    outline: 5px solid #0D6AB7;
  }
  [data-zvyraznit]:hover {
    background: #efefef;
  }
</style>

<script>
  var zvyrazneno;
  var zvyraznovac = document.querySelector("[data-zvyraznovac]");
  var cil = document.querySelector("[data-zvyraznovany=" + zvyraznovac.getAttribute("data-zvyraznovac") + "]");
  var zvyraznovane = zvyraznovac.querySelectorAll("[data-zvyraznit]");
  for (var i = zvyraznovane.length; i--; ) {
      zvyraznovane[i].onmouseover = function() {
          skryt();
          zvyrazneno = cil.querySelector(this.getAttribute("data-zvyraznit"));
          zvyrazneno.className = "zvyraznit";
      };
  }
  zvyraznovac.onmouseout = function() {
    skryt();
  }
  
  function skryt() {
    if (zvyrazneno) zvyrazneno.className = "";
  }
  // http://kod.djpw.cz/lvmb
</script>