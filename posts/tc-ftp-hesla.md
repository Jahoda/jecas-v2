---
title: "Zjištění FTP hesla v Total Commanderu"
headline: "Zjištění FTP hesla v Total Commanderu"
description: "Jak zjistit z Total Commanderu uložená hesla k FTP."
date: "2015-08-23"
last_modification: "2018-05-31"
status: 1
tags: ["ftp", "hesla", "produktivita"]
format: "html"
---

<p><a href="http://www.ghisler.com/">Total Commander</a> je populární správce souborů. Mimo toho ho řada lidí používá pro <b>přístup k FTP</b>.</p>


<p><img src="/files/tc-ftp-hesla/tc-ftp.png" alt="Připojení k FTP v Total Commanderu" class="border"></p>





















<p>Přestože existují pohodlnější způsoby, jak <b>obsah nahrávat na server</b> (tzv. <i lang="en">deployment</i>) – třeba <a href="/st-ftp">SFTP plugin</a> pro <a href="/st">Sublime Text</a> – značná část lidí používá právě <b>TC</b>.</p>

<p>V minulosti Total Commander čelil řadě napadení, kdy zavirovaný počítač <b>uložená hesla k FTP</b> vyzradil útočníkům, kteří následně přidaly do stránek <b>škodlivý kód</b>.</p>

<p>Při používání <b>Total Commanderu</b> s uloženými hesly k FTP je tedy možné <b>zpětně zjistit</b> původní textovou podobu všech použitých hesel.</p>





<h2 id="soubor">Soubor s přístupy</h2>

<p>Soubor s přístupy se jmenuje <code>wcx_ftp.ini</code> a je k nalezení ve složce:</p>

<pre><code>C:\Users\<b>Uživatel</b>\AppData\Roaming\GHISLER</code></pre>



<p>V něm jsou potom jednotlivé uložené FTP přístupy:</p>

<pre><code>[example.com]
host=example.com
username=example
<b>password</b>=417AB8F35BF1FC25A75B02FF4E</code></pre>





<p>Pokud je heslo k FTP účtu uložené, zobrazí se zašifrované za <code>password=</code>.</p>




<h2 id="decrypt">Dešifrování hesla</h2>

<p>Pro zjištění hesla existují následující programy:</p>


<h3 id="decrypt-tc">DecrypTC</h3>

<p>Funguje v případě, že se v TC <b>nepoužívá master heslo</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://totalcmd.net/plugring/ftp_decrypt.html">DecrypTC 1.2</a></li>
    <!-- http://en.totalcmd.pl/download/add/tls/DecrypTC -->
  </ul>
</div>

<p>Stačí zkopírovat zašifrované heslo z <code>wcx_ftp.ini</code> a zvolit <i lang="en">Decrypt Password</i>.</p>

<p><img src="/files/tc-ftp-hesla/decrypt.png" alt="Dešifrování hesla k FTP" class="border"></p>












<h3 id="tccrypt">Tccrypt</h3>

<p>Rozluští hesla při používání hlavního (master) hesla v Total Commanderu.</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.ghisler.ch/board/viewtopic.php?t=22729">Tccrypt: Tool to decrypt TC 7.5 passwords (with master pass)</a></li>
  </ul>
</div>


<h2 id="ochrana">Rychlá a jednoduchá ochrana</h2>

<p>Pro <b>snížení šance</b>, že někdo hesla z Total Commanderu zjistí, dešifruje a dostane se tak k FTP účtu, jde použít následující postup, který příliš nesníží komfort plynoucí z ukládání hesel:</p>

<p>Záměrně se do TC uloží heslo v <b>chybné podobě</b>, která půjde snadno a rychle upravit.</p>

<p>Bude-li heslo <code>lepsifytopuf</code>, uloží se místo toho třeba heslo <code>nejlepsifytopuf</code> – pro opravení potom stačí jen smazat první tři písmena. Postupy úprav jdou samozřejmě vymyslet různé. Hromadnému <b>napadení FTP účtů</b> by měla i tato drobná změna zabránit.</p> 