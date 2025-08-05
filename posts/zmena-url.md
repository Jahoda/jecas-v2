---
title: "Změna URL a AJAX"
headline: "Změna URL bez obnovení stránky"
description: "Jak může JavaScript přes <code>history.pushState</code> změnit URL stránky bez znovunačtení."
date: "2013-11-13"
last_modification: "2013-11-13"
status: 1
tags: ["js", "js-ajax", "napady"]
format: "html"
---

<p>Pokud se jednotlivé stránky webové aplikace mají načítat asynchronně (<a href="/ajax">AJAXem</a>), je důležité spolu se změnou obsahu <b>změnit i URL</b>. Proč?</p>

<ul>
  <li>Aby se dalo <b>na stránku odkázat</b>,</li>
  <li>aby se návštěvník <b>mohl pohybovat historií</b> prohlížeče,</li>
  <li>aby danou <b>URL mohl vyhledávač zaindexovat</b>.</li>
</ul>

<p>Kromě <b>změny URL</b> je potřeba zároveň zajistit, aby se po zadání konkrétní URL <b>zpětně načetl</b> příslušný obsah.</p>

<h2>Změna URL</h2>
<p>Od <b>IE 10</b> lze napříč prohlížeči používat <code>history.pushState</code>:
</p>
  
<pre><code>if (history.pushState) { // Test podpory
  // Načtení obsahu AJAXem
  window.history.pushState(objektObsah, "Titulek stránky", "url-stranky");
}</code></pre>

<p>Parametry <i>Titulek</i> a <i>URL</i> jsou jasné. Parametr <code>objektObsah</code> slouží k uchování dat právě pro případ <b>pohybu v historii prohlížeče</b>. Jedná se o běžný JS objekt:</p>
<pre><code>window.history.pushState(
  <b>{nadpis: "Text nadpisu", obsah: "Obsah stránky"}</b>, 
  "Titulek stránky", 
  "url-stranky"
);</code></pre>

<p>Ideální proto je do něj <b>uložit obsah stránky</b>, který se mění (nadpis, obsah, …). K uloženým hodnotám objektu se dá dostat z <code>history.state</code>. Zjistit, že se má načíst obsah z <code>history.state</code>, je možné z události <code>window.onpopstate</code>. Testovací <a href="http://kod.djpw.cz/apq-">ukázka</a>.</p>

<pre><code>window.onpopstate = function(<i>event</i>) {
  alert(<i>event</i>.state.<b>nadpis</b>);
};</code></pre>

<h3 id="replaceState"><code>history.replaceState</code></h3>
<p>Kromě <code>pushState</code> existuje ještě metoda <code>replaceState</code>, která funguje víceméně stejně, jen místo nové položky v historii <b>nahradí</b> tu současnou.</p>

<h2 id="hash">Změna #hashe ve starých prohlížečích</h2>
<p>V prohlížečích <b>IE 9</b> a starších je jediná možnost, jak <b>zajistit změnu URL</b> u AJAXem načítaného obsahu, měnit hodnotu <code>location.hash</code>.</p>
<p>Zachytit změnu <code>hash</code>e jde od <b>IE 8</b> přes <code>window.onhashchange</code>; pro ještě starší prohlížeče nezbývá než <code>location.hash</code> kontrolovat <b>časovačem</b>.</p>

<h3 id="odkazovani">Odkazování</h3>
<p>Problém tohoto řešení je v tom, že URL v obvyklém tvaru <code>http://example.com/#!url-stranky</code> může být dostupná jen <b>při zapnutém JS</b>.</p>

<p><b>Vyhledávače</b> a další služby (typu <b>facebookové načítání</b> titulku a popisu stránky u odkazů) to řeší tak, že adresu obsahující tzv. <i>hashbang</i> (<code>#!</code>) – tj. například <code>http://example.com/<b>#!</b>url-stranky</code> přepíší na <code>http://example.com/<b>?_escaped_fragment_=</b>url-stranky</code> a tam očekávají obsah.</p>

<p>Nešťastné je, že takto nefungují zdaleka všechny služby a návštěvníci bez JavaScriptu se na URL s <b>fragmentem/hashem nedostanou</b>.</p>

<p>Další nevýhoda je, že <b>fragment v URL</b> neumí serverový skript spolehlivě zachytit, takže při příchodu na <code>example.com/#!url-stranky</code> se stejně nejprve vygeneruje stránka <code>example.com</code>, aby se potom <b>skriptem stáhla ještě</b> <code>example.com/url-stranky</code>. Očekávané <b>zrychlení</b> webu je potom fuč.</p>

<p>Při použítí <code>history.pushState</code> tyto problémy nehrozí. JavaScript mění URL stránek na <b>plnohodnotné</b>, takže se po příchodu na tuto URL načte obsah standardně <b>ze serveru</b> a asynchronně se donačítá až další obsah při procházení. Vyhledávače a roboti používají jen <b>obsah přímo ze serveru</b>.</p>

<h2 id="co-pouzivat">Co používat?</h2>
<p>Použití <code>history.pushState</code> s plnohodnotnými adresami se zdá být docela rozumné (už to tak funguje mj. na <b>YouTube</b>). Měnit adresu za <code>#!</code> už je trochu slabší, ale při <b>správném řešení</b> to jako náhrada <code>pushState</code> může sloužit, tj.:</p>

<ul>
  <li>Všude používat <b>plnohodnotné adresy</b> (cíl/<code>href</code> odkazů na <code>#!</code> variantu měnit v daných prohlížečích až skriptem).</li>
  <li>Zajistit zobrazení příslušného obsahu na URL s <code>?_escaped_fragment_=</code>, aby např. návštěvník v <b>IE 9</b> mohl stránku normálně nasdílet na Facebooku.</li>
  <li>Zajistit, aby se po zadání <b>adresy s fragmentem</b> zobrazil odpovídající obsah. V prohlížečích, co umí <code>pushState</code>, <b>fragment odstraňovat</b>.</li>
</ul>

<p>Pořád ale přetrvává nevýhoda <b>dvojitého načítání</b> a získávání <b>nehezkých zpětných odkazů</b> s <code>#!</code>.</p>

<h3 id="reset">Reset a zrychlení</h3>
<p>Kromě toho je dobré zvážit, zda není při běžném (neajaxovém) procházení webů výhodné to, že se při každém načtení stránky všechen JavaScript v podstatě <b>vyresetuje</b>. Hrozí tak menší risiko, že se něco <b>rozbije</b> a návštěvník neznalý <b>reload tlačítka</b> nebude na stránce schopen dalšího fungování.</p>
<p>Nakonec u <b>rychlého webu</b> nebude nejspíš zisk z AJAXového načítání jen části stránky moc <b>významný</b>.</p>

<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li><a href="https://developers.google.com/webmasters/ajax-crawling/docs/getting-started">Jak Google prohledává AJAXové weby</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history"><i>Manipulování</i> s historií na MDN</a></li>
</ul>