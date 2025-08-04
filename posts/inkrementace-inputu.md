---
title: "Zvyšování hodnoty inputů"
headline: "Zvyšování hodnoty inputů"
description: "Jak zpříjemnit zadávání číselných hodnot nebo času do <code>&lt;input></code>ů tlačítky plus a mínus."
date: "2013-12-18"
last_modification: "2013-12-20"
status: 1
tags: ["JavaScript", "Hotová řešení", "Formuláře"]
---

Má-li uživatel zadat na stránce nějaké číslo nebo čas, musí ho většinou **napsat ručně**. Existují různé postupy, jak zadávání zpříjemnit zjednodušením akcí pro **snižování nebo zvyšování hodnoty**.

## „Nové“ formulářové prvky

Trochu si je možné pomoci rozšířenými typy [značky `&lt;input>`](/input).

  `&lt;input type=number>`
  
    Automaticky u něj podporované prohlížeče zobrazí tlačítka pro zvýšení/snížení o nastavený krok (atribut `step`).

  `&lt;input type=time>`
  
    Téhož jde v některých prohlížečích docílit i při zadávání času.

## Tlačítka +/−

Kvůli slabší a nejednoznačné podpoře nativních formulářových plus/mínus tlačítek si je můžeme **vytvořit v JavaScriptu**.

Taková funkce volaná při [kliknutí myši](/udalosti-mysi#onclick) (`onclick`) bude velmi prostá. Nejvíce kódu bude sloužit k převodu `value` na číslo a **zaokrouhlování** ([ukázka](http://kod.djpw.cz/pfy)).

var cislo = document.getElementById("cislo");
+
−

/* Zaokrouhlení */
function zaokrouhlit(cislo) {
	return (Math.round((cislo) * 10000) / 10000);	
}

/* Převedení na číslo */
function val(value) {
  return value * 1;
}

/* Přidat/odebrat hodnotu */
function pridavat(kam, kolik)  {
  kam.value = zaokrouhlit(val(kam.value) + kolik);
}

## Změna hodnoty kolečkem

Aby se návštěvník **neuklikal k smrti**, pomůže **inkrementování**/**dekrementování** pomocí [točení kolečka](/udalosti-mysi#onmousewheel).

Změna hodnot `&lt;inputu>`u kolečkem bude ale nejspíš **méně intuitivní** než tlačítka.

[Ukázka](http://kod.djpw.cz/vfy)

/* Zaokrouhlení */
function zaokrouhlit(cislo) {
	return (Math.round((cislo) * 10000) / 10000);	
}

/* Převedení na číslo */
function val(value) {
  return value * 1;
}

/* Úprava kolečkem */
function kolecko(e, pole, kolik) {
  e = e || window.event;
  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  nalozit(pole, delta * kolik);
}

// Firefox
if (document.addEventListener) { 
  document.getElementById("pole-kolecko").addEventListener("DOMMouseScroll", function(event) {
    kolecko(event, this, 0.1);
    event.preventDefault();
  }, false);
}

function nalozit(kam, kolik) {
  kam.value = zaokrouhlit(val(kam.value) + kolik);
}

## Tlačítka plus/mínus se zrychlením

Vylepšit obyčejná tlačítka pro snižování nebo zvyšování hodnoty je možné **akcelerací**. Při stisknutém tlačítku (`onmousedown`) se bude hodnota stále upravovat a čím déle bude tlačítko stisknuté, tím to bude rychlejší (docílí se toho [časovačem](/odpocitavani)). [Ukázka](http://kod.djpw.cz/lfy) (sloučená varianta i s [kolečkem](http://kod.djpw.cz/wfy)).

var pole = document.getElementById("pole");
+
−

/* Zaokrouhlení */
function zaokrouhlit(cislo) {
	return (Math.round((cislo) * 10000) / 10000);	
}

/* Převedení na číslo */
function val(value) {
  return value * 1;
}

var casovacNakladatoru;
var rychlost = puvodniRychlost = 300;
function nakladator(kam, kolik)  {
  kam.value = zaokrouhlit(val(kam.value) + kolik);
  casovacNakladatoru = setTimeout(function() {
    rychlost = rychlost * 0.9;
    nakladator(kam, kolik);
  }, rychlost)
}

function stopNakladator() {
  clearTimeout(casovacNakladatoru); 
  rychlost = puvodniRychlost;
}