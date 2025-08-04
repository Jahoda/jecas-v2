---
title: "Responsivní tabulky"
headline: "Responsivní tabulky"
description: "Co udělat s tabulkami, aby se rozumně zobrazovaly na mobilech/tabletech."
date: "2013-11-07"
last_modification: "2013-11-24"
status: 1
tags: ["CSS", "Responsivní design", "Tabulky"]
---

/* reset rozlamování tabulek */
  table {display: table}
  td, th {display: table-cell}
  tr {display: table-row}
  thead {display: table-header-group}
  tbody {display: table-row-group}
  tfooter {display: table-footer-group}
-->

Přestože éra **tabulkových layoutů** a jejich nahrazení `&lt;div>`y (**CSS layouty**) způobila u mnoha tvůrců **tabulkový odpor**, pořád stará dobrá tabulka **má na stránce místo**.

Problém ale nastává při snaze vytvořit [responsivní web](/mobilni-web). Na malou obrazovku se těžko **vícesloupcová** tabulka vejde. Co stím?

## Zjednodušení tabulky

První možnost je zkusit tabulku zjednodušit, tj. některé **sloupce vypustit** nebo texty odkazů/tlačítek nahradit obrázky (ikonami). Ideálně s co nejmenší **ztrátou informací**.

Vezmeme-li si jako příklad **tabulku uživatelů**.

    .vypnout-popis th:nth-child(3), .vypnout-popis td:nth-child(3) {display: none;}
    .zjednodusit td:nth-child(5) .ico {display: inline-block;}
    .ico, .zjednodusit td:nth-child(5) .txt {display: none;}

      JménoE-mailPopisFunkceAkce

      Běžný Uživatel
      bezny@uzivatel.cz
      Popis běžného uživatele.
      Uživatel    
      ×SmazatEUpravit

      Franta Fytopuf
      franta@fytopuf.cz
      Popis běžného fytopufu.
      Rostlinář
      ×SmazatEUpravit

      Nejlepší Trenér
      strouhanka@kobercovka.cz
      Dlouhý popis nejlepšího trenéra.
      Reservoár    
      ×SmazatEUpravit

      Žerou Děti
      junior@plzen-wd40.cz
      Popis
      Klaun
      ×SmazatEUpravit

  var zjednodusit = document.getElementById("zjednodusit");

  - *Popis* můžeme na malé obrazovce oželet ([ukázka](http://kod.djpw.cz/dis-) – zmenšit pod 500px).

  - *Funkci* lze znázornit **podbarvením buňky** anebo **ikonou**.

  - Obdobně *akce* mohou být na mobilu **representovány jen menší ikonou**.

„Vypnout“ nebo přestylovat celé sloupce jde nejlépe *po staru* **nastavením tříd** pro všechny buňky nebo přes [selektor n-tého potomka](/css-selektory#n-ty-potomek) (více o [stylování tabulek](/stylovani-tabulky) je na samostatné stránce).

```
th:nth-child(3), td:nth-child(3) {display: none;}
```

Výše uvedený kód pro *zmizení* třetího **sloupce** sice bude fungovat až od **IE 9**, ale to nás při optimalisaci pro [mobilní zařízení](/prohlizece#mobily) nemusí moc trápit. Starší IE je na mobilech **raritní**.

## Horizontální posuvník

Asi nejjednodušší řešení je u tabulky, která se na obrazovku **nevejde**, zobrazit posuvník. Zabrání se tak **rozpadnutí stránky**, ale použitelnost **nebude nejelepší**.

Stačí k tomu tabulku obalit `&lt;div>`em s `max-width: 100%; overflow: auto`:

        JménoE-mailPopisFunkceAkce

        Nejlepší Trenér
        strouhanka@kobercovka.cz
        Dlouhý popis nejlepšího trenéra.
        Reservoár    
        ×SmazatEUpravit

        Žerou Děti
        junior@plzen-wd40.cz
        Popis
        Klaun
        ×SmazatEUpravit

## „Rozlámání“ tabulky

Pokud **zjednodušení** není možné nebo dostatečné, nezbývá než tabulku zrušit. Zkrátka ji *rozlámat* do podoby, že jednotlivé řádky budou **pod sebou**.

    .rozlamat th {display: none;}
    .rozlamat td, .rozlamat tr, .rozlamat thead, .rozlamat tbody, table.rozlamat {display: block;}
    
    .popisky td:before {position: absolute; left: 5px; top: 0; width: 40%;}
    .popisky td {position: relative; padding-left: 50%}
    
    .popisky td:nth-of-type(1):before {content: "Jméno"}
	.popisky td:nth-of-type(2):before {content: "E-mail"}
	.popisky td:nth-of-type(3):before {content: "Popis"}
	.popisky td:nth-of-type(4):before {content: "Funkce"}
	.popisky td:nth-of-type(5):before {content: "Akce"}

      JménoE-mailPopisFunkceAkce

      Běžný Uživatel
      bezny@uzivatel.cz
      Popis běžného uživatele.
      Uživatel    
      ×SmazatEUpravit

      Franta Fytopuf
      franta@fytopuf.cz
      Popis běžného fytopufu.
      Rostlinář
      ×SmazatEUpravit

  var rozlamat = document.getElementById("rozlamat");

Zrušení tabulky je možné provést třeba nastavením `display: block` pro všechny tabulkové elementy ([nezapomínat na `&lt;tbody>`](/html-znacky#volitelne)).

```
@media screen and (max-width: 600px) {
  /* rozlámání tabulek */
  td, th, tr, thead, tbody, tfoot, table {display: block} 
}
```

### Doplnění popisků

Pokud by srozumitelnost tabulky byla bez popisků nedostatečná, můžeme je přidat CSS vlastností [`content`](/content-attr).

A to buď CSS deklarací ve stylu:

```
.popisky td:nth-of-type(1):before {content: "Popis první buňky"}
.popisky td:nth-of-type(2):before {content: "Popis druhé buňky"}
```

Nebo přiřazením popisků do [vlastních atributů](/vlastni-html-znacky) všech buněk a následné dolování přes `content: attr(vlastni-atribut)`. To by mohlo zajistit i [pár řádku JavaScriptu](http://kod.djpw.cz/lts).

## Transformace tabulky

Poslední možnost je tabulku projít skriptem a převést ji třeba na **definiční seznam** (značka `&lt;dl>`), případně ji převést už na straně serveru při [detekci](/mobilni-web#detekce) mobilního prohlížeče.

## Odkazy jinam

  - [Elvery.net](http://elvery.net/demo/responsive-tables/) – Responsive Tables Demo

  - [Zurb.com](http://zurb.com/playground/playground/responsive-tables/index.html) – Responsive Tables

  - [CSS-Tricks](http://css-tricks.com/examples/ResponsiveTables/responsive.php) – Responsive Table

  - [RWD List to Table](http://codepen.io/geoffyuen/pen/FCBEg)

  - Sitepoint: [The Ancient Sumerians, Tablet Computing and HTML Tables](http://www.sitepoint.com/ancient-sumerians-knew-html-tables/)