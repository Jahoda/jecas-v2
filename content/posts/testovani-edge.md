---
title: "Testování v MS Edge a IE"
headline: "Testování v MS Edge a IE"
description: "Jak testovat stránky v různých versích Internet Exploreru a Edge ve Windows, Mac OS nebo v Linuxu."
date: "2015-08-18"
last_modification: "2015-08-18"
status: 1
tags: ["produktivita", "testovani", "webove-prohlizece"]
format: "html"
---

<p>Jelikož v případě <b>prohlížečů od Microsoftu</b> nebývá zvykem, že uživatelé rychle updatují na nejnovější versi (jako u <b>Firefoxu</b>, <b>Chrome</b> a podobně), drží se na významnějších tržních podílech souběžně několik prohlížečů najednou:</p>

<ul>
  <li><b>Internet Explorer 8</b> (nejnovější Explorer, co jde dostat do Windows XP)</li>
  <li><b>Internet Explorer 9, 10</b></li>
  <li><a href="/ie11"><b>Internet Explorer 11</b></a> (nejnovější Explorer, co jde dostat do Windows 7 a 8)</li>
  <li><a href="/microsoft-edge"><b>Microsoft Edge</b><b></b></a> (dostupný pouze ve <a href="/windows-10">Windows 10</a>)</li>
</ul>

<p>Globální podíly jednotlivých IE v roce 2015 v ČR podle StatCounteru:</p>

<p><img src="/files/testovani-edge/podily-ie.png" alt="Přepnutí režimu v Internet Exploreru" class="border"></p>

































<h2 id="windows">Více IE/Edge ve Windows</h2>

<p>V případě platformy Windows je nejsnazší upgradovat na <b>Windows 10</b>, kde je dostupný nejnovější <b>Microsfot Edge</b> i <b>IE 11</b>, který obsahuje kompatibilní režimy až po <b>IE 5</b>.</p>

<p>Ve Windows 10 jsou Edge a IE samostatné nezávislé programy.</p>


<p>Po spuštění Internet Exploreru je ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> (klávesa <kbd>F12</kbd>) možnost <i>Emulace</i> starších vykreslovacích jader:</p>


<p><img src="/files/testovani-edge/rezim-ie.png" alt="Přepnutí režimu v Internet Exploreru" class="border"></p>
















<h2 id="virtualni">Virtuální stroje pro Windows, Mac, Linux</h2>

<p>Prohlížeče od Microsoftu nejsou určeny pro jiné operační systémy než Windows.</p>


<p>Pro <b>Mac</b> a <b>Linux</b> je tedy řešení <b>virtualisace operačního systému Windows</b>, kde je požadovaný Internet Explorer nebo Micrsoft Edge dostupný.</p>


<div class="external-content">
  <ul>
    <li><a href="http://dev.modern.ie/tools/vms/windows/">Download virtual machines</a> – stažení virtuálních strojů s IE 6 až IE 11 i Edge</li>
  </ul>
</div>

<p>Na stránce výše si stačí vybrat vlastní operační systém, požadovaný prohlížeč a virtualisační platformu.</p>

<p><img src="/files/testovani-edge/download-vm.png" alt="Přepnutí režimu v Internet Exploreru" class="border"></p>




























<h2 id="vzdalene">Vzdálené spouštění prohlížečů</h2>

<p>Pro vývojáře, kteří si <b>nechtějí instalovat virtuální stroj</b> s různými operačními systémy, existují nástroje, kteří k těmto instalacím nabízejí <b>vzdálený přístup</b>.</p>

<p>Z prostředí vlastního prohlížeče si potom jde spustit prakticky libovolný prohlížeč v libovolném operačním systému.</p>

<p><img src="/files/testovani-edge/browserstack.png" alt="Spuštění prohlížeče v BrowserStack" class="border"></p>





















<p>Tyto služby obvykle fungují za úplatu, ale pro vyzkoušení jsou <b>trial verse zdarma</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.browserstack.com/">BrowserStack</a></li>
    <li><a href="http://crossbrowsertesting.com/">Cross Browser Testing</a></li>
  </ul>
</div>



<h2 id="odkazy">Odkazy jinam</h2>

<div class="internal-content">
  <ul>
    <li><a href="/prohlizece">Testování webů napříč prohlížeči</a> – další možnosti testování v různých prohlížečích než jen od Micrsoftu</li>
  </ul>
</div>