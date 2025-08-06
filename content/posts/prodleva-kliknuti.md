---
title: "Prodleva při kliknutí na mobilu"
headline: "Prodleva po tapnutí na mobilech"
description: "Co způsobuje 300 milisekundovou prodlevu po kliknutí na odkaz/tlačítko na dotykových zařízeních."
date: "2015-03-14"
last_modification: "2017-02-21"
status: 1
tags: ["napady", "responsive"]
format: "html"
---

<p>Při ovládání webu na zařízeních s <b>dotykovou obrazovkou</b> se je možné setkat s lehkou prodlevou mezi kliknutím na odkaz nebo tlačítko a provedení akce.</p>


<p>Prodleva o délce cca 300 ms je způsobena tím, že po prvním stisku (<code>ontouch</code>) mobilní prohlížeče čekají, zda náhodou není cílem vyvolat <b>dvoj-dotyk</b>, který typicky slouží k zoomování.</p>

<p>Pokud je stránka <a href="/responsive">responsivní</a> a vejde se bez změny měřítka na displej, zdá se toto vyčkávání na gesto pro přiblížení/oddálení <b>zbytečné</b>.</p>





<h2 id="zruseni">Odstranění prodlevy po kliknutí</h2>


<h3 id="chrome">Mobilní Chrome a Firefox na Androidu</h3>

<p>V mobilních versích prohlížeče <b>Chrome 32</b> a novějších postačí přítomnost <a href="/meta-viewport">značky <code>viewport</code></a>:</p>

<pre><code>&lt;meta name="viewport" content="width=device-width"></code></pre>

<p>Starší a některé další prohlížeče na Androidu reagují po dotyku okamžitě při <b>zakázání zoomování</b>:</p>

<pre><code>&lt;meta 
  name="viewport" 
  content="width=device-width, <b>user-scalable=no</b>"
></code></pre>





<p>Zakázat přibližování ale není z uživatelského hlediska úplně vhodná věc. I při responsivní podobě stránek se může hodit si například zvětšit obrázek. Populární mobilní aplikace <a href="/twitter">Twitteru</a> nebo <a href="/facebook">Facebooku</a> tento způsob používají.</p>




<h3 id="ie">Mobilní IE na Windows Phone</h3>

<p>V mobilní IE slouží k okamžité odezvě CSS vlastnost <code>touch-action</code>.</p>

<p>Aplikovat ji jde na celý dokument (<code>html</code>):</p>

<pre><code>html {
  -ms-touch-action: manipulation; /* IE10  */
  touch-action: manipulation;
}</code></pre>

<p>Nebo jen na jednotlivé <b>ovládací prvky</b>.</p>

<pre><code>a, button, .tlacitko {
  -ms-touch-action: manipulation; /* IE10  */
  touch-action: manipulation;
}</code></pre>

<p>Či obecně pro všechna tlačítka, jiné formulářové prvky a <a href="/odkaz">odkazy</a>:</p>

<pre><code>a,
area,
button,
[role="button"],
input,
label,
select,
summary,
textarea {
  -ms-touch-action: manipulation; /* IE10  */
  touch-action: manipulation;
}</code></pre>




<h3 id="safari">Safari na iOS</h3>

<p><b>Safari</b> od verse 9.3 (březen 2016) vlastnost <code>touch-action</code> podporuje.</p>

<p>Ve starších Safari nějaký standardní způsob, jak prodlevu <i>vypnout</i> neexistuje.</p>


<h3 id="js">Starší prohlížeče</h3>

<p>Zrušit prodlevu čekání v nepodporovaných prohlížečí jde pouze na základě monitorování <a href="/udalosti-mysi#dotykove">dotykových událostí</a> a hádání, jestli uživatel opravdu chce vykonat akci tlačítka/odkazu. Existují na to hotová řešení:</p>

<div class="external-content">
<ul> 
  <li><a href="https://github.com/filamentgroup/tappy/">Tappy!</a></li>
  
  <li><a href="https://github.com/ftlabs/fastclick">FastClick</a></li>
</ul>  
</div>



<h2 id="vyuziti">„Využití“ prodlevy</h2>

<p>Místo odstranění prodlevy ji někdy jde využít pro <b>načítání dat</b> – tj. začít načítat data na pozadí ihned při dotyku (<code>ontouchstart</code>). Obdobně jako u stisku a uvolnění tlačítka klasické <b>myši</b>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/zrychleni-kliknutim">Zrychlení AJAXové aplikace o 100 ms</a></li>
  </ul>
</div>

<p>Pochopitelně tento postup nejde použít vždy. Zvlášť u nevratných akcí na serveru by bylo takové spouštění v okamžiku, kdy ještě není jasné, jestli uživatel akci chce skutečně vyvolat, nebylo rozumné.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Adactio: <a href="https://adactio.com/journal/10019">Delay</a> – ovlivnění chování přes CSS: <code>touch-action: manipulation</code></li>
  <li>Sitepoint: <a href="http://www.sitepoint.com/5-ways-prevent-300ms-click-delay-mobile-devices/">5 Ways to Prevent the 300ms Click Delay on Mobile Devices</a></li>
  <li>HTML5 Rocks: <a href="http://updates.html5rocks.com/2013/12/300ms-tap-delay-gone-away">300ms tap delay, gone away</a></li>  
</ul>