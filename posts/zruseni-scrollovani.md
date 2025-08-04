---
title: "Zakázat rolování stránky"
headline: "Jak zakázat scrollování na stránce"
description: "Někdy se hodí zamezit uživateli v rolování, jaké existují možnosti?"
date: "2013-08-09"
last_modification: "2013-08-09"
status: 1
tags: ["JavaScript", "Lightbox", "Hotová řešení", "Scrollování"]
---

**Upozornění**: Bránit a pozměňovat výchozí běžné uživatelské akce je vhodné jen výjimečně a v odůvodnitelných případech.

U různých lightbox [skriptů](/magnific-popup) se takové chování může hodit — originální podklad (stránka) je překrytý a rolování jeho obsahu by *každého akorát otravovalo*.

  .dialog-background {width: 100%; height: 100%; background: #000; opacity: .85; position: absolute; left: 0; top: 0; display: none}
  .dialog {width: 50%; position: fixed; left: 50%; margin-left: -25%; background: #fff; color: #000; display: none;}
  .show .dialog, .show .dialog-background {display: block;}

function openDialog(id) {
	document.getElementById(id).className+= " show";
	document.documentElement.style.overflow = "hidden";
}

function closeDialog(id) {
	document.getElementById(id).className = "dialog-cover";
	document.documentElement.style.overflow = "visible";	
}

      ## Dialog

      Vyskakovací dialog, než se zavře, nelze se stránkou rolovat.

      Zavřít

Otevřít dialog

## Řešení

Leckoho by možná nepadlo bránit rolování **stornováním všech možných událostí** jako je

  - rolování kolečkem (`onmousewheel`),

  - [mačkání kláves](/zablokovani-klaves) ↑ a ↓ (`onkeypress`)

  - a podobně.

Leč **elegantnější řešení a funkčnější** mi přijde pro `&lt;html&gt;` nastavit `overflow: hidden`, čímž se možnost posouvání stránky dokonale zablokuje.

  - Jedna možnost je [prohazovat třídu](/zobrazit-skryt), která `overflow: hidden` zajistí,
 
  - druhá měnit skriptem přímo `document.documentElement.style.**overflow**` na `hidden`/`visible`.

Drobná nevýhoda `overflow: hidden` řešení je, že zároveň zmizí posuvník, což vytvoří lehké poskočení stránky. Řešení je:

  - vycházet z toho, že posuvník má většinou cca 16 pixelů (v reálu tak většině uživatelům stránka poskočí maximálně nějak nepatrně),

  - změřit JavaScriptem šíři **scrollbaru** a stránku odšťouchnout — existuje [hotové řešení](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=7&amp;topic=149954#10) od pana [**Chamurappiho**](http://webylon.info),

  - **neřešit to** — při překrytí černým pozadím si toho člověk stejně nejspíš nevšimne.