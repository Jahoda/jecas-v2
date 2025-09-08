---
title: "Postupné vylepšování"
headline: "Postupné vylepšování"
description: "Postupné vylepšování je postup tvorby webu, kdy se začíná nejprve s podporou nejprimitivnějších zařízení."
date: "2016-03-10"
last_modification: "2025-09-09"
status: 1
tags: ["napady", "responsive", "ux"]
format: "html"
---

<p>Pojem <i lang="en">Progressive enhancement</i> je mezi některými webdesignery značně populární. Česky ho jde přeložit jako progresivní nebo postupné vylepšování.</p>


<p>Podstata je v tom, že se stránka vytváří nejprve tak, aby rozumně fungovala i v prehistorických zařízeních a postupným vylepšováním se přidávají funkce pro nová zařízení.</p>



<p>Web tedy nejprve počítá s tím, že se zobrazí jen v <a href="/html">HTML</a> podobě, následně, že se povede i aplikování <a href="/css">CSS</a> a nakonec i rozšiřující efekty v <a href="/js">JavaScriptu</a>.</p>

<p>Postup je zajistit funkci v pořadí:</p>

<ol>
  <li>HTML,</li>
  <li>CSS,</li>
  <li>JavaScript</li>
</ol>



<p>To je výhodné tím, že HTML a CSS jsou oproti JavaScriptu tolerantnější k chybám.</p>




<h2 id="shodne">Shodná funkčnost</h2>

<p>Myšlenka <i>postupného vylepšování</i> nehlásá stejnou funkčnost napříč prohlížeči, ale aby stránka nebo její <b>kritické části</b> fungovaly pokud možno i ve velmi starých prohlížečích.</p>

<p>Novější prohlížeče potom mohou dostat lepší funkčnost díky JavaScriptu.</p>

<p>Je to trochu jiný přístup, než používat různé <a href="/hacky">hacky</a> a polyfilly pro starší prohlížeče. Autor webu se zkrátka smíří s tím, že se stránka v nepodporovaném prohlížeči bude chovat trochu jinak.</p>


<h2 id="proc">Proč je to dobré</h2>

<p>Při dodržování progressive enhancementu (tj. zejména <a href="/bez-javascriptu">fungování bez JavaScriptu</a>) zpravidla získá člověk následující užitečné vlastnosti:</p>

<ul>
  <li><b>Výkon</b>: rychlejší první vykreslení.</li>
  <li><a href="/seo"><b>SEO</b></a>: indexovatelný obsah v HTML.</li>
  <li><b>Odolnost</b>: web funguje i při částečných výpadcích (JS se nestáhne nebo je v něm chyba).</li>
</ul>


<h2 id="principy">Základní principy</h2>

<ul>
  <li><b>HTML-first</b>: sémantické značky, skutečné <a href="/odkaz">odkazy</a> a formuláře.</li>
  <li><b>CSS vrstva</b>: vzhled a rozvržení bez zásahu do funkce.</li>
  <li><b>JS jako bonus</b>: vylepšení interakcí, ne nutná podmínka.</li>
  <li><b>Detekce funkcí</b>: používat <i>feature detection</i>, ne <a href="/ua">User-Agent hlavička</a>.</li>
  <li><b>Serverové fallbacky</b>: akce musí jít provést i bez JS.</li>
</ul>


<h2 id="vsdegradace">Postupné vylepšování vs. <i>graceful degradation</i></h2>

<p><b>Postupné vylepšování</b> začíná u <b>minima</b> a přidává schopnosti. <b>Graceful degradation</b> začíná u <b>maxima</b> a snaží se „nějak přežít“ v horších podmínkách.</p>


<h2 id="priklad-odkaz">Příklad: akční odkaz s vylepšením v JS</h2>

<p>Nejprve funkční HTML odkaz. Na serveru musí existovat obsluha akce i pro <code>GET</code>/<code>POST</code>.</p>

<pre><code>&lt;a class="btn-like" href="/like?id=123">👍 Přidat k oblíbeným&lt;/a>
</code></pre>

<p>Poté přidání pohodlnější interakce přes <code>fetch</code>. Bez JS vše dál funguje přes odkaz.</p>

<pre><code>const likeLink = document.querySelector('.btn-like');
if (likeLink) {
  likeLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = likeLink.getAttribute('href');
    const res = await fetch(url, { method: 'POST' });
    if (res.ok) likeLink.textContent = 'Přidáno';
  });
}
</code></pre>


<h2 id="priklad-form">Příklad: formulář s AJAX vylepšením</h2>

<p>Formulář je plně funkční bez JS:</p>

<pre><code>&lt;form action="/feedback" method="post">
  &lt;input name="message" required>
  &lt;button type="submit">Odeslat&lt;/button>
&lt;/form>
</code></pre>

<p>Vylepšení přidá <a href="/ajax">AJAX</a> odeslání a textové potvrzení:</p>

<pre><code>const form = document.querySelector('form[action="/feedback"]');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await fetch(form.action, { method: form.method, body: new FormData(form) });
    if (res.ok) form.replaceWith(document.createTextNode('Děkujeme za zpětnou vazbu'));
  });
}
</code></pre>

<p>Ideální je, když základní věci jako odkazy a formuláře dokáže forvnou řešit framework použitý na webu. Pro tvůrce stránky to tak nemusí znamenat žádnou pracnost navíc.</p>


<h2 id="feature-detection">Detekce funkcí</h2>

<ul>
  <li>V CSS použít <a href="/supports"><code>@supports</code></a> pro pokročilejší styly.</li>
  <li>V JS použít <code>'něco' in window</code>, <code>CSS.supports</code> apod.</li>
</ul>

<pre><code>if ('fetch' in window && 'FormData' in window) {
}
if (CSS && CSS.supports && CSS.supports('position', 'sticky')) {
  document.documentElement.classList.add('has-sticky');
}
</code></pre>


<h2 id="css-priklad">CSS příklad vylepšení</h2>

<p>Základ je jednoduchý sloupec. V prohlížečích s podporou <a href="/supports"><code>@supports</code></a> a CSS Grid se rozvržení vylepší na responsivní mřížku.</p>

<pre><code>.cards { display: block; }
.card { margin-bottom: 1rem; }
@supports (display: grid) {
  .cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
  .card { margin: 0; }
}
</code></pre>


<h2 id="checklist">Kontrolní seznam</h2>

<ul>
  <li>Odkazy mají <code>href</code>, tlačítka mají správný <code>type</code>.</li>
  <li>Formuláře mají <code>action</code>, <code>method</code> a fungují bez JS.</li>
  <li>Obsah je čitelný v čistém HTML bez CSS.</li>
  <li>Vylepšení se zapínají až po detekci možností.</li>
  <li>Chyby v JS neblokují načtení a použití stránky.</li>
</ul>


<h2 id="nevhody">Nevýhody progressive enhancementu</h2>

<p>Přístup má i slabiny a nehodí se vždy a všude.</p>

<ul>
  <li><b>Vyšší nároky na vývoj</b>: často se implementují dvě cesty téže akce (bez JS a s JS).</li>
  <li><b>Nároky na backend</b>: je potřeba mít serverové <i>fallbacky</i> pro akce, které by jinak řešil jen klient.</li>
  <li><b>Ne vždy vhodné</b>: čistě aplikační UI (např. komplexní <a href="/spa">SPA</a>, realtime nástroje) mohou být na JS závislé.</li>
  <li><b>Rozdíly v UX</b>: záměrně odlišná zkušenost napříč prohlížeči může zvyšovat zátěž podpory.</li>
  <li><b>Testování</b>: je třeba pokrýt kombinace (bez JS / s JS, s/bez vybraných funkcí).</li>
  <li><b>Limity technologií</b>: některé schopnosti nemají smysluplné základy bez JS (např. WebGL, přístup k médiím).</li>
</ul>


<h2 id="zaver">Závěr</h2>

<p>Postupné vylepšování dává přednost pevným osvědčeným základům webu, nad které se přidávají vylepšené funkce pro moderní prohlížeče.</p>

<p>Dodržením základních principů se moc zkazit nemůže, je ale otázka jestli a jak je přijatelná různá funkčnost napříč prohlížeči.</p>


<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>Paul Kinchla: <a href="https://paulkinchla.com/blog/javascript-is-a-ghost/">JavaScript is a Ghost</a></li>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement">Progressive enhancement</a></li>
  <li>Smashing Magazine: <a href="https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/">Progressive Enhancement: What It Is, And How To Use It</a></li>
</ul>