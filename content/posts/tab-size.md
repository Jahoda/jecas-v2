---
title: "CSS tab-size"
headline: "Šířka tabulátoru <code>tab-size</code>"
description: "Jak pomocí CSS změnit šířku tabulátoru ve zdrojovém kódu."
date: "2013-11-21"
last_modification: "2013-11-28"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>Vlastnost <code>tab-size</code> umožňuje čistě z CSS změnit šířku (<b>počet mezer</b>), kterou bude zabírat <b>tabulátor</b>.</p>

<p>Tato vlastnost má smysl zejména u <b>zdrojových kódů</b> (elementu <code>&lt;pre></code> nebo nečeho s <code>white-space: pre</code>). Pro maximální funkčnost napříč prohlížeči je nutné používat <a href="/css-prefixy">prefixy</a> pro <b>Operu</b> a <b>Firefox</b> (<b>Chrome</b> umí <code>tab-size</code> bez prefixu a <b>IE</b> (ani <a href="/ie11">IE 11</a>) si <i>neškrtá</i>). <a href="https://kod.djpw.cz/ips">Samostatná ukázka</a>.</p>

<div class="live">
  <style>
    .tab-size {tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4}
  </style>
<pre id="tab-size" class="tab-size"><code>if (podminka) {
	for () {
		// Cyklus
		if (podminka) {
			// Podmínka
		}
	}
}</code></pre>
</div>
<script>
  function zmenitTabSize(size) {
    var tabSizeCss = "tab-size: " + size + "; -moz-tab-size: " + size + "; -o-tab-size: " + size + "; -ms-tab-size: " + size;
    document.getElementById("tab-size").style.cssText = tabSizeCss;
  }
</script>

<p>Změnit <code>tab-size</code>: <input type="range" step="1" min="0" max="40" value="4" onchange="zmenitTabSize(this.value)"></p>

<p>Kromě <b>nedostatečné podpory v IE</b> má <code>tab-size</code> další vadu. Velká část kódů bývá odsazována <b>několika mezerami</b> místo <b>skutečného tabulátoru</b>. Na takový kód se pochopitelně přenastavení <code>tab-size</code> <b>neprojeví</b>.</p>

<p>Je otázka, zda úpravu <b>zdrojových kódů</b> neřešit přímo na straně serveru. U hotových <b>obarvovačů kódu</b> nebývá problém počet mezer nastavit.</p>