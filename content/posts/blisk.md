---
title: "Prohlížeč Blisk a testování responsivních webů"
headline: "Blisk – testování responsivních webů"
description: "Blisk prohlížeč vypadá jako Chrome, ale má šikovné nástroje pro testování responsivních webů."
date: "2016-05-23"
last_modification: "2016-05-23"
status: 1
tags: ["produktivita", "responsive", "webove-prohlizece"]
format: "html"
---

<p>Při testování responsivních webů je zpravidla neustále nutné měnit velikost stránky (viewportu). To jde na desktopu buď přímo změnou rozměrů okna prohlížeče, nebo ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> (většinou klávesa <kbd>F12</kbd>) pomocí režimu pro různá zařízení.</p>


<div class="internal-content">
  <ul>
    <li><a href="/testovani-mobily">Ladění responsivních webů</a> – Jak testovat zobrazení responsivního webu na mobilních zařízeních</li>
  </ul>
</div>


<p>Prohlížeč <b>Blisk</b> dokáže celý proces testování zjednodušit.</p>



<h2 id="stazeni">Stažení Blisku</h2>

<p>Blisk jde zdarma stáhnout.</p>

<div class="external-content">
  <ul>
    <li><a href="https://blisk.io/">Stáhnout Blisk</a> (nevyžaduje registraci)</li>
  </ul>
</div>



<h2 id="funkce">Funkce</h2>

<ol>
  <li>
    <p>Disponuje rozdělením stránky <b>do dvou oken</b>, kde vlevo jde zvolit nějaké z běžných mobilních zařízení a vpravo je klasické desktopové zobrazení. Tedy za situace, že je prohlížeč v dostatečně velkém okně.</p>
  </li>
  
  <li>
    <p>V okně pro mobilní zařízení je potom <b>emulace mobilního prohlížeče</b> včetně dotykových gest a mobilní <a href="/ua">hlavičky <code>user-agent</code></a>.</p>
  </li>
  
  <li>
    <p><b>Blisk</b> dokáže synchronisovat rolování, čímž jde docela rychle získat celkový přehled o stránce na mobilu i desktopu.</p>
  </li>
</ol>


<p><img src="/files/blisk/prohlizec.png" alt="Prohlížeč Blisk" class="border"></p>

























<p>Trochu je škoda, že stránka otevřená do dvou zařízení není synchronisovaná. Změny ve vývojářských nástrojích v jednom okně se tedy automaticky <b>nepromítnou</b> do okna druhého. To by byla hodně užitečná vlastnost.</p>



<h2 id="autoreload">Auto refresh</h2>

<p>Kromě zmíněných funkcí umí i automaticky obnovit stránku po změně lokálních souborů.</p>

<p>Stačí si v nastavení přidat pro určitou doménu lokální složku, ve které změna jakéhokoliv souboru způsobí obnovení stránky.</p>



<p><img src="/files/blisk/auto-refresh.png" alt="Automatické obnovení stránky v Blisku" class="border"></p>
















<p>Tato funkce je použitelná i v případě, že se vyvíjí na vzdáleném serveru, kam se kopírují soubory z lokálního umístění (třeba přes <a href="/st-ftp">FTP plugin v Sublime Text</a>).</p>


<p>Není tedy potřeba používat <a href="/livereload">program LiveReload</a>.</p>


<h2 id="zaver">Závěr</h2>

<p><b>Blisk</b> vypadá jako šikovný prohlížeč pro testování responsivních webů. Pro uživatele zvyklé na vývojářské nástroje v <b>Chrome</b> se zdá být hodně zajímavou volbou (DevTools jsou prakticky stejné), jak mobilní weby testovat rychleji a pohodlněji.</p>