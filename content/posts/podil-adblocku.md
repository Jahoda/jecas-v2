---
title: "Měření AdBlocku v Google Analytics"
headline: "Měření blokování reklam v Google Analytics"
description: "Jak pomocí Google Analytics změřit návštěvníky, kteří blokují reklamy."
date: "2015-02-23"
last_modification: "2015-02-28"
status: 1
tags: ["ga", "hotova-reseni", "reklama"]
format: "html"
---

<p>Pokud je webová stránka závislá na <b>finančním příjmu z reklamy</b>, může se hodit měřit návštěvníky, kteří <b>reklamu blokují</b>.</p>

<p>Tento údaj se hodí pro potenciální zájemce o reklamu na daném webu nebo pro rozhodování, jaký typ reklamy zvolit. Zatímco používání rozšířených reklamních systému typu <b>AdSense</b> od <a href="/google">Google</a> nebo <b>Sklik</b> od <a href="/seznam">Seznamu</a> bude nástrojem pro <b>blokování reklam</b> prakticky určitě blokováno, jiný způsob reklamy může <b>filtru AdBlocku</b> utéci.</p>



<h2 id="detekce">Detekce blokování reklamy</h2>

<p>Aby bylo co v GA (<a href="/ga">Google Analytics</a>) měřit, musí se v první řadě blokování reklamy detekovat.</p>

<div class="internal-content">
  <ul>
    <li><a href="/zapnuty-adblock">Detekce blokování reklam Adblockem</a></li>
  </ul>
</div>

<p>K tomu stačí na stránku přidat element s identifikátorem <code>reklama</code> a nastavit mu například nějakou výšku.</p>

<pre><code>&lt;div id="reklama" style="height: 2px">&lt;/div></code></pre>

<p>A po nějaké době takový element <b>přeměřit</b>. Když bude jeho výška nulová, nejspíš byl zablokován jako reklama.</p>

<pre><code>window.onload = function() {
  setTimeout(function() {
    var reklama = document.getElementById("reklama");
    var stav;
    if (reklama.clientWidth == 0) {
      // Reklama byla zablokována
      stav = "Ano";
    }
    else {
      stav = "Ne";
    }
    // Odeslání dat do Google Analytics
    ga('send', 'event', 
      'Adblock', 
      stav, 
      {'nonInteraction': true}
    );
  }, 1000);
}</code></pre>


















<p>Stav blokování reklamy se zaloguje jako událost do Google Analytics.</p>

<div class="internal-content">
  <ul>
    <li><a href="/ga-mereni">Měření akcí v Google Analytics</a></li>
  </ul>
</div>

<p>Aby toto měření neovlivňovalo <i>bounce rate</i> (míru opuštění stránky), používá se parametr <a href="/ga-mereni#nonInteraction"><code>nonInteraction</code></a>, kterým se předá informace, že se tato událost nemá brát jako <b>interakce se stránkou</b>.</p>



<h2 id="vysledek">Výsledek</h2>

<p>Výsledky měření jsou následně k disposici pod <i>Chování → Události → Přehled → Adblock</i>.</p>

<p><img src="/files/podil-adblocku/zobrazeni.png" alt="Zobrazení události" class="border"></p>


















<p>Po kliknutí na kateogirii <i>Adblock</i> je nutné zvolit primární dimensi <i>Akce události</i>.</p>

<p><img src="/files/podil-adblocku/akce.png" alt="Zobrazení události" class="border"></p>












<p>Nyní by se měl konečně zobrazit podíl návštěvníků, kteří reklamu blokují. Pro tento web je to kolem 20 %.</p>

<p><img src="/files/podil-adblocku/vysledek.png" alt="Zobrazení podílu AdBlocků" class="border"></p>












<h2 id="vyhodnoceni">Vyhodnocení</h2>

<p>Jak už to tak bývá, data nejsou úplně přesná. Pokud si návštěvník kromě reklam blokuje i měřicí skripty jako je GA, do přehledu se tato informace nedostane.</p>