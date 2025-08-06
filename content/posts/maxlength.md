---
title: "Maximální délka pole"
headline: "Maximální počet znaků"
description: "HTML atribut <code>maxlength</code> omezuje počet znaků ve formulářovém poli."
date: "2015-01-25"
last_modification: "2015-01-26"
status: 1
tags: ["formulare", "html", "html-atributy"]
format: "html"
---

<p>Pro formulářové prvky <a href="/input"><code>&lt;input></code></a> a <a href="/textarea"><code>&lt;textarea></code></a> existuje HTML atribut <code>maxlength</code>. Ten umožňuje nastavit maximální možný počet znaků, které lze do pole zadat.</p>

<pre><code>&lt;input <b>maxlength="3"</b>></code></pre>

<p>Do takového políčka půjde zadat maximálně 3 znaky.</p>

<div class="live">
  <input maxlength="3">
</div>




<h2 id="textarea">Limit v <code>&lt;textarea></code></h2>
<p>Atribut <code>maxlength</code> u <code>&lt;textarea></code> podporuje až <b>IE 10</b>, <b>Firefox 4</b> a <b>Opera 15</b>.</p>





<h2 id="nepouzivat">Proč <code>maxlength</code> nepoužívat</h2>

<p>Osobně se domnívám, že v podstatě <b>neexistuje případ</b>, kdy je vhodné <code>maxlength</code> použít.</p>

<p>Ohlídat počet znaků je vždy nutné <b>na straně serveru</b> a tento limit může při práci s formulářem spíš <b>vytvářet problémy</b>.</p>


<h3 id="kopirovani">Kopírování</h3>

<p>Kromě běžného psaní uživatelé někdy formuláře vyplňují <b>kopírováním ze schránky</b>. Při kopírování se snadno stane, že návštěvník omylem označí například mezeru před kopírovaným řetězcem. To způsobí, že se mu ve finále konec obsahu usekne, protože mezera se bude počítat do limitu.</p>

<p>Někdy se zase mohou <b>lišit zdrojové a cílové formáty</b>. Při kopírování delšího tvaru do pole, které je určeno pro kratší, se přebytečný obsah usekne a uživatel <b>nemá možnost nápravy</b>.</p>

<p>Bez <code>maxlength</code> je následně možné délku upravit.</p>




<h3 id="preforumovani">Přeformulování</h3>

<p>V případě, že návštěvník narazí na limit – např. pro nadpis článku – pokusí se obsah <b>přepsat do stručnější podoby</b>. Zde nejspíš bude <b>pevný limit</b> opět vadit, protože nebude přesně jasné o kolik znaků je nutné text <b>zkrátit</b> / kolik znaků ještě zbývá.</p>



<h2 id="pocet-znaku">Počet napsaných znaků</h2>

<p>Optimální postup je u polí zobrazovat <a href="/pocet-znaku">počet znaků</a>, které zbývají. A při příliš dlouhém popisku <b>pouze blokovat odeslání formuláře</b>.</p>

<p>Hezké řešení používá <a href="/twitter">Twitter</a>, kde se navíc ještě počítadlo barví podle procent zbývajících znaků, takže má uživatel <b>odezvu</b>, že už by měl končit.</p>

<p>Ve zjednodušené podobě to vypadá přibližně takto:</p>

<div class="live">
<style>
.vyplneno-100 {color: red}
.vyplneno-90, 
.vyplneno-80,
.vyplneno-70 {color: #8C0000}

input+span {
    color: gray;
    padding-left: .2em;
}
</style>
<p>
    <input type="text" data-maxlength="10" size="20"><span></span>
</p>
<p>
    <input type="text" data-maxlength="20" size="30"><span></span>
</p>
<script>
var omezen = document.querySelectorAll("input[data-maxlength]");
for (var i = omezen.length; i--; ) {
    omezen[i].onkeyup = omezen[i].onpaste = omezen[i].onkeypress = omezen[i].oninput = prepocitat;
    zobrazitLimit(omezen[i]);
}
function prepocitat() {
    zobrazitLimit(this);
}
function zobrazitLimit(el) {
    var delka = el.value.replace(/^\s+|\s+$/g, '').length;
    var maximalniDelka = el.getAttribute("data-maxlength");
    var pocitadlo = el.nextSibling;
    pocitadlo.innerHTML = maximalniDelka - delka;
    pocitadlo.className = "vyplneno-" + (Math.min(Math.round(delka / maximalniDelka * 10) / 10, 1) * 100);
}
</script>
</div>

<p><a href="https://kod.djpw.cz/fwjb">Samostatná živá ukázka</a></p>

<p>U jednořádkových polí by šlo použít něco jako <a href="/progress">progress</a> bar.</p>

<p><a href="https://kod.djpw.cz/gwjb">Živá ukázka</a></p>