---
title: "Otevření nového okna"
headline: "Otevírání nového okna"
description: "Možnosti, jak otevřít stránku do nového okna / nového tabu prohlížeče."
date: "2014-03-04"
last_modification: "2014-03-13"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Někteří lidé namítají, že by webová stránka neměla nic otevírat do nového okna a <b>nechat to na uživateli</b>.</p>

<p>Ten si přece umí odkaz požadovaným způsobem <i>otevřít sám</i>. Cíl odkazu je ve většině prohlížečů zpravidla možné:</p>

<ol>
  <li>otevřít <b>kliknutím kolečkem</b>, stránka se otevře na pozadí,</li>
  <li>otevřít rovněž <b>na pozadí</b> při přidržení klávesy <kbd>Ctrl</kbd> a prokliknutím,</li>
  <li>otevřít do <b>nové záložky</b> přidržením klávesy <kbd>Shift</kbd>,</li>
  <li>vybrat požadovaný způsob z <b>kontextové nabídky</b>.</li>
</ol>

<div class="live">
  <a href="https://kod.djpw.cz">Odkaz na vyzkoušení</a>
</div>

<p>Osobně se ale domnívám, že značná část návštěvníků toto <b>nezná</b> a v případech, kdy je nežádoucí přechodem na další stránku v podstatě <b>zavřít tu původní</b>, je <b>otevření nového okna</b> rozumné řešení. (Nechtěnému zavření může zabránit <a href="/onbeforeunload">událost <code>onbeforeunload</code></a> a nebo alespoň minimalisovat následky dokáže <a href="/zalohovani-formularu">ukládání formulářů do <code>localStorage</code></a>.)</p>

<p>Těm, co je <i>nevyžádané</i> otevírání <b>nových tabů</b> otravuje, doporučím alespoň zjednodušení v podobě zavírání záložek <b>klikáním kolečkem</b> – ve většině prohlížečů funguje.</p>

<h2 id="target">HTML odkaz a <code>target</code></h2>

<p>První způsob otevření nového okna je obyčejný HTML odkaz doplněný o nastavení prázdného rámu:</p>

<pre><code>&lt;a href="http://example.com" <b>target</b>="<i>_blank</i>">
  Text odkazu
&lt;/a></code></pre>

<p>Pro otevření cíle odkazu do nového tabu se zpravidla používá hodnota <code>_blank</code>. (Mimochodem, je možné použít i nějaké <b>nesmyslné jméno rámce</b>, což také funguje.)</p>

<h2 id="window-open">JavaScript a <code>window.open</code></h2>

<p>V JS se nové okno otevírá přes <code>window.open</code>.</p>

<pre><code>window.open("url-stranky", '_blank');</code></pre>

<h3 id="blokovani">Blokování vyskakovacích oken</h3>

<p>Kvůli pohodlí uživatelů většina prohlížečů <b>blokuje automatické otevírání nových oken</b>, která se JavaScript snaží otevřít bez přímé akce uživatele. Jako <i>přímé</i> akce jsou vyhodnocovány některé <a href="/udalosti-mysi">události myši</a>, např. <code>onclick</code> nebo <code>onmousedown</code>, tam prohlížeče ve výchozím nastavení <b>nová okna neblokují</b>.</p>

<p>Neznám způsob, jak u jiných událostí omezení obejít, <b>nefunguje</b> ani trik typu:</p>

<pre><code>&lt;button id="tlacitko" onclick="window.open('http://example.com')">
  Tlačítko
&lt;/button>
&lt;script>
  document.getElementById("tlacitko").click();
&lt;/script></code></pre>

<p><a href="https://kod.djpw.cz/jfcb">Ukázka</a></p>

<h3 id="zmena-url">Změna URL okna</h3>

<p>Měnit URL zobrazenou v okně <b>otevřeném skriptem</b> je možné přes <code>location.href</code> (<a href="https://kod.djpw.cz/kfcb">ukázka</a>):</p>

<pre><code>var okno = window.open();
okno.location.href = "http://example.com";</code></pre>

<p>To se může hodit v situaci, kdy při potřebě otevřít nové okno ještě <b>neznáme URL</b>, která se teprve zjistí třeba <a href="/ajax">AJAXem</a>. Při přímé akci (kliknutí) se jen otevře prázdné okno a při nepřímé akci (získání dat AJAXem) se změní URL. To funguje bez <b>blokování</b> ze strany prohlížečů.</p>

<h3 id="zavreni">Zavření okna</h3>

<p>Právě otevřené okno zavře prosté:</p>
<pre><code>window.close()</code></pre>

<p>V případě, že si na skriptem vytvořené okno vytvoříme odkaz (přiřadíme ho do proměnné dostupné z daného <a href="/scope">scope</a>), můžeme zavřít i okno konkrétní:</p>

<pre><code>var <b>okno</b> = window.open("url");
<b>okno</b>.close();</code></pre>

<h2 id="window-open-dalsi">Rozšíření <code>window.open</code></h2>

<p>Kromě URL stránky a názvu okna/rámu existuje ještě třetí parametr, který umožňuje různá <b>další nastavení</b>, co fungují různě napříč prohlížeči, a je s jejich pomocí možné docílit různých nestandardních podob. A to moc nedoporučuji.</p>