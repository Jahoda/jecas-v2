---
title: "Kontrola pravopisu v Sublime Text"
headline: "Kontrola pravopisu v Sublime Text"
description: "Jak přidat českou kontrolu pravopisu do editoru Sublime Text."
date: "2015-07-06"
last_modification: "2015-07-07"
status: 1
tags: ["produktivita", "st"]
format: "html"
---

<p>Při psaní textů je velmi vhodné <b>používat kontrolu pravopisu</b>. Nástroj, který by zaručil 100% gramaticky správných text v českém jazyce, sice neexistuje, použitím automatické kontroly pravopisu jde ale alespoň <b>zabránit překlepům</b>.</p>

<p>Kontrolovat pravopis je možné i v editoru <a href="/st">Sublime Text</a>, který se obvykle používá především pro programování.</p>


<h2 id="slovnik">Přidání české kontroly</h2>

<p>Sublime Text má v základu <b>pouze anglický slovník</b>. Pro kontrolu pravopisu se využívá nástroj <a href="http://hunspell.sourceforge.net/">Hunspell</a>. Pro češtinu je tedy nutné stáhnout <i>slovník</i>, který je s Hunspellem kompatibilní.</p>

<p>Vhodný český slovník jde najít na více zdrojích. Může být ale problém s kódováním, kdy Sublime Text považuje za neznámá všechna <b>slova s diakritikou</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/titoBouzout/Dictionaries">Hunspell UTF8 dictionaries</a> – obsahuje řadu slovníku včetně českého ve správném kódování</li>
  </ul>
</div>

<p>České slovníky jde pro Hunspell získat i z dalších umístění. Bohužel mi v Sublime Text 2 správně nefungují právě u slov s diakritikou.</p>

<div class="external-content">
  <ul>
    <li><a href="https://aur.archlinux.org/packages/hunspell-cs/">hunspell-cs</a></li>
    
    <li><a href="http://extensions.services.openoffice.org/en/project/dict-cs">Czech dictionary pack</a> – rozšíření pro OpenOffice</li>
  </ul>
</div>



<h3 id="umisteni">Kam soubory umístit</h3>

<p>Soubory se slovníky je nutné zkopírovat do složky <i>Packages</i>. Tu jde otevřít ze Sublime Text z nabídky <i>Preferences</i> → <i>Browse Packages…</i></p>

<p>Ve Windows se nachází většinou v umístění:</p>

<pre><code>C:\Users\<b>Jméno</b>\AppData\Roaming\Sublime Text 2\Packages</code></pre>


<p>Zde je vhodné vytvořit složku s názvem např. <code>Language - Czech</code> a vložit do ní soubory s příponou <code>*.dic</code> a <code>*.aff</code>.</p>


<p><img src="/files/st-kontrola-pravopisu/slovniky.png" alt="Umístění českých slovníků" class="border"></p>













<h3 id="prepnuti">Přepnutí na české slovníky</h3>

<p>Následně je nutné přenastavit slovníky z angličtiny na češtinu. To jde udělat v nastavení <i>Preferences → Settings – Default</i>.</p>

<pre><code>// Word list to use for spell checking
//"dictionary": "Packages/Language - English/en_US.dic",
"dictionary": "Packages/Language - Czech/Czech.dic",</code></pre>




<h2 id="zapnuti">Zapnutí kontroly pravopisu</h2>

<p>Zvýrazňování slov, které obsahují překlep/chybu, jde přepínat klávesou <kbd>F6</kbd>.</p>

<p>Výchozí stav jde přednastavit rovněž v nastavení:</p>

<pre><code>// Set to true to turn spell checking on by default
"spell_check": <b>true</b>,</code></pre>







<h2 id="problemy">Problémy a nedostatky</h2>

<p>Kontrola pravopisu není v Sublime Text úplně dokonalá. Hlavně má problémy s <b>určením hranice slov</b>. Takže používání českých uvozovek, trojtečky nebo lomítka mezi slovy vede k tomu, že bude slovo označené jako neznámé.</p>

<p><img src="/files/st-kontrola-pravopisu/chyby.png" alt="Chybné určení pravopisu" class="border"></p>








<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Dokumentace Sublime Text: <a href="https://www.sublimetext.com/docs/2/spell_checking.html">Spell Checking</a></li>
</ul>