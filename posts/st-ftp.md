---
title: "Sublime Text FTP"
headline: "FTP v Sublime Text"
description: "Jak se připojovat k FTP v editoru Sublime Text."
date: "2014-05-08"
last_modification: "2014-05-09"
status: 1
tags: ["ftp", "produktivita", "st"]
format: "html"
---

<p>V případě, že chceme používat FTP v <a href="/sublime-text">Sublime Textu</a>, tj.:</p>

<ul>
  <li>Nahrávat soubory <b>přímo z editoru</b> na server.</li>
  <li>Synchronisovat soubory mezi serverem a localhostem.</li>
  <li>Upravovat soubory přímo na serveru.</li>
</ul>

<p>… existuje pro <b>ST</b> plugin <b>SFTP</b>.</p>

<p>Pro <a href="/pluginy-sublime-text">nainstalování puginu</a> je potřebný <i>Package Control</i>. Potom si v <code>Preferences → Package Control → Package Control: Install Package</code> stačí vyhledat <code>SFTP</code> a nainstalovat.</p>

<p>Plugin SFTP není podobně jako Sublime Text zdarma, občas se objeví hláška, že by se měl zakoupit, leč obé je možné <i>prodlužovat do nekonečna.</i></p>

<h2 id="nastaveni">Nastavení</h2>
<p>Když je plugin nainstalován, první je nutné <i>namapovat</i> složku pro SFTP. Pravý klik na složku → SFTP/FTP → Map to Remote…</p>

<p><img src="/files/st-ftp/map-to-remote.png" alt="Namapování FTP složky" class="border"></p>

<p>Nyní by se měl otevřít konfigurační soubor <code>sftp-config.json</code>. V něm stačí v podstatě zadat jen <code>host</code> (adresa serveru), <code>user</code> (uživatelské jméno) a popř. <code>password</code> (heslo). Heslo se <b>vyplňovat nemusí</b>, ale bude se v takovém případě muset zadávat při každém připojení.</p>

<p><img src="/files/st-ftp/nastaveni.png" alt="Nastavení FTP" class="border"></p>

<p>Zajímavá je i část <code>ignore_regexes</code>, kde se dá vyčlenit některé soubory nebo složky ze synchronisace.</p>

<h2 id="synchronisace">Synchronisace</h2>
<p>Nyní je všechno nastaveno a stačí sesynchronisovat lokální složku s FTP. Pravý klik na složku → SFTP/FTP → Sync Local -> Remote…</p>

<p><img src="/files/st-ftp/sync.png" alt="Sync FTP složky" class="border"></p>

<p>Funkce <i>Sync</i> se od běžného <i>Upload</i> nebo <i>Download</i> liší tím, že před zahájením přenosu souborů se zjistí, které <b>soubory se změnily</b>. Nepřenáší se tedy tupě všechno, ale jen to, co je potřeba.</p>

<p>Plugin <b>SFTP</b> má sice i funkci <i>Browse Remote…</i> ovšem procházení FTP přes dialogové okno není úplně moc pohodlné.</p>

<p><img src="/files/st-ftp/browse-remote.png" alt="Vzdálené procházení FTP složky" class="border"></p>