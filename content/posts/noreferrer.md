---
title: "Noreferrer"
headline: "Noreferrer"
description: "Řetězec <code>rel=noreferrer</code> umožňuje nastavit odkazu, že nemá posílat informace o předešlé navštívené stránce."
date: "2014-04-19"
last_modification: "2014-04-24"
status: 1
tags: ["html", "html-atributy"]
format: "html"
---

<p>Standardní chování většiny prohlížečů je při přechodu na novou stránku odesílat URL, ze které se přišlo.</p>

<p>Jedná se o hlavičku <a href="/referer"><b>HTTP referrer</b></a>. Hodnota atributu <code>rel</code> nastavená na <code>noreferrer</code> tomuto předávání zabrání:</p>

<pre><code>&lt;a href="http://jecas.cz/noreferrer" <b>rel="noreferrer"</b>>
  Na cíl odkazu nepošle podporovaný prohlížeč referrer
&lt;/a></code></pre>

<h2 id="podpora">Podpora</h2>

<p>Konstrukce <code>rel=noreferrer</code> funguje zatím jen ve <b>Webkitu</b> (<b>Chrome</b>, <b>nová Opera</b>).</p>

<p>V ostatních prohlížečích lze zabránit zjištění konkrétní adresy přesměrovávacím skriptem. Na cílové stránce se potom místo skutečné předchozí stránky zobrazí URL přesměrovávacího skriptu.</p>

<h2 id="vyuziti">Využití</h2>

<p>Nastavit odkazu neposílání referreru se hodí z <b>bezpečnostních důvodů</b>. U aplikace, která obsahuje citlivé údaje v URL, se prokliknutím nějakého externího odkazu dostane tato informace na cílovou stránku.</p>

<p>I v případě, že v URL nic citlivého není, se zbytečně může prozradit adresa webu/aplikace, kterou do světa (ještě) pouštět nechceme.</p>

<p></p>

<h2 id="blokovani">Ruční blokování referreru</h2>

<p>Kvůli <b>soukromí</b> někteří uživatelé referer neposílají. Dá se to nastavit přímo v prohlížeči nebo tak činí některé firewally / proxy servery.</p>

<p>V takovém případě je ale dobré mít pohodlnou možnost referrer alespoň občas zapnout, protože jisté weby ho vyžadují pro <a href="/bezpecnost#csrf">ochranu před CSRF</a>.</p>


<h2 id="zjisteni">Zjištění předchozí stránky</h2>

<p>Obsah hlavičky referer může tvůrce webu snadno získat.</p>

<dl>
  
  <dt id="js">JavaScript</dt>
  <dd>
    
    <pre><code>var predchoziAdresa = document.referrer;</code></pre>
    
    <div class="live nosource">
      <span id="noreferrer-referrer-output"></span>
      <script>
        document.getElementById('noreferrer-referrer-output').textContent = "Předchozí URL: " + document.referrer;
      </script>
    </div>
  </dd>
  
  <dt id="php">PHP</dt>
  
  <dd>
    
    <pre><code>$predchoziAdresa = $_SERVER['HTTP_REFERER'];</code></pre>
  </dd>
</dl>

<!--
<h2 id="odkazy">Odkazy</h2>
<ul>
  <li><a href="http://webdesign.about.com/od/html5tags/fl/rel-noreferrer.htm">Webdesign.about.com: Rel = Noreferrer</a></li>
</ul>
-->