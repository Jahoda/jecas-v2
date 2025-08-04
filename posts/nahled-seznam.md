---
title: "Náhled stránky na Seznam.cz"
headline: "Úprava náhledového obrázku webu na Seznamu"
description: "Vyhledávání na Seznamu zobrazuje vedle výsledků vyhledávání obrázkový náhled webu. Jak zobrazení náhledu stránky ve vyhledávači ovlivnit?"
date: "2013-04-26"
last_modification: "2017-04-24"
status: 1
tags: ["SEO", "Seznam"]
---

Jelikož weby jsou v **screenshot generátoru Seznamu** *snímány v rozlišení cca 700×550 pix* *[700×525 bodů](https://twitter.com/liborsmekal/status/362669997421629442)*, může se snadno stát, že automatický náhled nebude ideální (zobrazení zmenšené podoby stránky pro malá zařízení nebo překrytí reklamou) a nezbývá než tzv. Screenshotátor popostrčit.

  ## Nové náhledy na Seznamu

  Zatím pokusně na [seznam.sk](http://seznam.sk) funguje nový styl hledání s většími náhledy. Ty pořizuje nový *screen-shot generátor* v rozlišení 1600×1200 pixelů (podle měření v Google Analytics).

  **User-agent**: Mozilla/5.0 (compatible; Seznam screenshot-generator 2.1; +http://fulltext.sblog.cz/screenshot/)

    Kromě toho ještě existuje **mobilní** varianta: Mozilla/5.0 (Linux; U; Android 4.1.2; cs-cz; Seznam screenshot-generator Build/Q3) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30

-->

## Změna náhledu

Někdy se může stát, že obrázkový robot **zachytí stránku špatně**. Například v momentě, kdy probíhá údržba nebo se stane nějaká chyba. Stejně tak při **úpravách vzhledu** může být žádoucí, aby se náhled změnil.

Přegenerování lze vyžádat [přidáním URL](/pridat-url).

  Přidáním stránky docílíte také **obnovení starého nebo neexistujícího náhledu** stránky.

## Detekce

Pro detekování obrázkového robota jde využít tyto údaje:

IP adresy
  
    ```
77.75.77.123
77.75.77.174
77.75.77.200
77.75.79.123
77.75.79.200
2a02:598:2::1123
2a02:598:2::1200
```

Hlavičky `user-agent`
  ```
Mozilla/5.0 PhantomJS (compatible; Seznam screenshot-generator 2.1; +http://fulltext.sblog.cz/screenshot/
Mozilla/5.0 (compatible; Seznam screenshot-generator 2.0; +http://fulltext.sblog.cz/screenshot/)
Mozilla/5.0 (compatible; Seznam screenshot-generator 2.1; +http://fulltext.sblog.cz/screenshot/)
Mozilla/5.0 (Linux; U; Android 4.1.2; cs-cz; Seznam screenshot-generator Build/Q3) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
```

**Poznámka**: IP adresa i `user-agent` se mohou změnit, aktuální hodnoty by měly být na stránce nápovědy Seznamu. Doporučuji testovat řetězec `Seznam screenshot-generator`, ten by snad mohl vydržet nejdéle.

## Úpravy

Pro upravení náhledu lze zvolit dvě možnosti:

  některé části ([typicky reklamy](https://twitter.com/liborsmekal/status/362667289763512320)) při návštěvě **generátorem screenshotů** skrýt/upravit,
    ze stránky si udělat **vlastní obrázek** ve zmíněném rozlišení (*cca 700×525 pix*) a robotovi jej nabídnout jako `&lt;img>` obrázek.

## Řešení v PHP

V jazyce PHP potom stačí jednoduchá podmínka na začátku webu:
```
&lt;?php 
if (strpos($_SERVER['HTTP_USER_AGENT'], "Seznam screenshot-generator")) {
  die("&lt;img src='adresa-nahledoveho-obrazku.png'>");
}
?>
```

Nebo naopak:
```
&lt;?php if (**!**strpos($_SERVER['HTTP_USER_AGENT'], "Seznam screenshot-generator")) { ?>
&lt;div class='reklama'>Nějaký obsah, co se screenovacímu robotovi neukáže.&lt;/div>
&lt;?php } ?>
```

Pokud je cílem skrýt některé prvky. V tomto případě dávám k úvaze jen přiřadit zvláštní CSS třídu pro `&lt;html>` nebo `&lt;body>` a potřebné změny zajistit pomocí CSS.
  
## Cloaking?

Cloaking je podvodná technika, kdy se vyhledávačům (právě pomocí nějaké detekce jako je výše uvedená) a běžným návštěvníkům posílá různý obsah s nekalým úmyslem vyhledávač obelstít (více na [anglické Wikipedii](http://en.wikipedia.org/wiki/Cloaking)).

Nicméně při nepodovodném použití se jedná o běžný [content negotiation](https://en.wikipedia.org/wiki/Content_negotiation), tj. čistou praktiku podobně jako mobilní prohlížeče dostávají upravenou [mobilní versi](/mobilni-web) a slušný vyhledávač by neměl nic namítat.

## Hlavní obrázek

  Ohledně náhledů Seznam.cz nabízí ještě tzv. [Hlavní obrázek](http://napoveda.seznam.cz/cz/fulltext-hledani-v-internetu/komunikace-s-generatorem-nahledu/pravidla-pro-hlavni-obrazek/), ten ale bohužel není moc použitelný.

    Hlavní obrázek (previewimage) se uplatňuje jenom v několika spíše výjimečných situacích. V případě normální stránky pouze při hledání přes operátor `site:`.

    **Yuhů** na [DJPW](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=13&amp;topic=148171#10)