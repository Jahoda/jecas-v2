---
title: "Detekce Adblocku"
headline: "Detekce blokování reklam Adblockem"
description: "Jak detekovat, že si uživatel na stránce blokuje reklamy. Dá se „ad block“ obejít?"
date: "2014-01-07"
last_modification: "2014-01-08"
status: 1
tags: ["hotova-reseni", "napady", "reklama"]
format: "html"
---

<p>Pokud máme na stránce reklamy, uživatel je může nástroji typu <a href="http://cs.wikipedia.org/wiki/Adblock">Adblock</a> zablokovat. Tuto skutečnost může být zajímavé zjistit:</p>

<ul>
  <li>Logovat si uživatele, kteří <b>blokují reklamy</b>.</li>
  <li><b>Uživatelům s Adblockem</b> vynadat, <b>stránku nezobrazit</b>, zobrazit <b>jinou reklamu</b> a podobně.</li>
</ul>

<h2 id="zjistit">Zjištění zapnutého Adblocku</h2>
<p>Jak zjistit, že návštěvník blokuje reklamu, je možné více způsoby.</p>

<ol>
  <li>U vlastních reklam (na vlastním serveru) se dá při načtení reklamy uložit cookie. Potom stačí zjistit, jestli uživatel prochází první stránku, a když ne a zároveň mu chybí cookie z reklamy, nejspíš <b>blokuje reklamu</b>.</li>
  
  <li>Při používání externích reklam typu <b>Google AdSense</b> můžeme blokování detekovat fingovanou reklamou.</li>
</ol>

<h3>Detekce Adblocku</h3>
<p>Momentálně jde využít třeba toho, že Adblock jako reklamu považuje element s ID „reklama“.</p>

<p>Tímto prinicipem je zároveň možné uživatelům Adblocku skrýt obsah stránky — stačí obalovému elementu přidat <code>id="reklama"</code>.</p>

<pre><code>&lt;div id="reklama">
  Obsah bude zablokován jako reklama.
&lt;/div></code></pre>

<p>Když tedy takový testovací <code>&lt;div></code> vložíme na web a po načtení stránky (<code>window.onload</code>) spustíme <a href="/odpocitavani">časovačem</a> třeba s prodlevou 1000 milisekund test, zda je tento <code>&lt;div></code> viditelný, v případě negativního výsledku byl obsah skryt Adblockem. <a href="https://kod.djpw.cz/qzab">Ukázka</a>.</p>

<pre><code>window.onload = function() {
  setTimeout(function() {
    var reklama = document.getElementById("reklama");
    if (reklama.clientWidth == 0) {
      // Reklama byla zablokována
    }
  }, 1000);
}</code></pre>


<h2 id="jak-obejit">Jak obejít Adblock</h2>
<p>Že je možné blokování reklam detekovat je sice hezké, ale nešlo by tomu blokování zabránit?</p>

<p>Stručně řečeno <b>ne</b>. Jediná možnost, jak mít na stránce reklamu, která <b>nebude zablokována</b>, je mít reklamu netradiční, na kterou (ještě) nejsou v Adblocku vytvořeny filtry. Nebo ji lze filtrovat obtížně.</p>

<p>Pokud bude reklama spočívat v HTML odkazu a <code>&lt;img></code> obrázku, půjde totiž <b>těžko vytvořit</b> účinný filtr, který by toto blokoval, ale běžný nereklamní obsah zůstal zachován.</p>

<h3>Dvě vrstvy reklamy</h3>
<p>Zajímavý postup je umístit obtížně filtrovatelnou reklamu a až přes tu umístit AdSense / jinou <i>profláklou</i> reklamu (docílit toho lze <a href="/position#absolute">absolutním posicováním</a>).</p>

<ul>
  <li>Návštěvníkům bez Adblocku se zobrazí <i>plná</i> reklama,</li>
  <li>blokujícím se objeví alespoň nějaká reklama.</li>
</ul>

<h2 id="trest">Trestání návštěvníků s vypnutými reklamami</h2>
<p>V případě úvahy o nějakém penalisování uživatelů, co blokují reklamy, je dobré zvážit, zda <b>návštěvník s Adblockem</b> není pořád lepší než <b>žádný návštěvník</b> (může na stránku odkázat další návštěvníky, co reklamu neblokují).</p>

<p>U reklamy, kde jsou placené prokliky, blokování nemusí moc vadit. Uživatelé blokující reklamy nejspíš ani nebudou na případně objevivší se reklamy klikat. Blokování tedy positivně zvýší míru prokliku ve statistikách.</p>