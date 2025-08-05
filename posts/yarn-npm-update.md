---
title: "Yarn/NPM update balíčků"
headline: "Yarn/NPM update balíčků"
description: "Jak funguje instalace a update balíčků přes npm nebo yarn."
date: "2018-03-08"
last_modification: "2018-03-08"
status: 0
tags: []
format: "html"
---

<h2 id="yarn">Yarn</h2>

<p>Nainstalování závislostí dle souboru <code>package.json</code>:</p>

<pre><code>yarn</code></pre>



<p>Update závislostí dle povolených versí v <code>package.json</code>:</p>

<pre><code>yarn upgrade</code></pre>




<p>Případně si jde vybrat, co se má upgradovat, z nabídky po příkazu:</p>

<pre><code>yarn upgrade-interactive</code></pre>





<p>Tyto upgrady by měly být bezpečné. Mění pouze <code>yarn.lock</code>, nikoliv <code>package.json</code>.</p>














<h3 id="latest">Aktualisace na nejnovější</h3>

<pre><code>yarn upgrade --latest</code></pre>

<p>Všechny balíčky se upgradují na poslední versi. Změní se <code>package.json</code> i <code>yarn.lock</code>. Může vést k rozbití aplikace, protože nové verse nemusí bez dalších úprav spolu fungovat.</p>










<h2 id="node">NPM</h2>

<p>Při používání NPM jde použít následující postup:</p>

<ol>
  
  <li>
    <p>Nainstalovat balíček <code>npm-check-updates</code>:</p>
    <pre><code>npm install -g npm-check-updates</code></pre>
  </li>
  
  <li>
    <p>Updatovat verse balíčků v <code>package.json</code>:</p>
    
    <pre><code>ncu -u</code></pre>
  </li>
  
  
  <li>
    <p>Nainstalovat balíčky podle <code>package.json</code>:</p>
    
    <pre><code>npm install</code></pre>
  </li>
</ol>