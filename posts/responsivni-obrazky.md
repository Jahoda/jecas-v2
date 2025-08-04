---
title: "Responsivní obrázky"
headline: "Responsivní obrázky"
description: "Co s obrázky na mobilních zařízeních?"
date: "2013-11-26"
last_modification: "2014-01-06"
status: 1
tags: ["Hotová řešení", "Responsivní design", "Obrázky"]
---

Poradit si s **obrázky** (tím jsou myšleny obyčejné PNG/GIF/JPG obrázky vložené značkou `&lt;img>` — ne například vektory/[SVG](/svg)) je jedna z největších výzev při vytváření [responsivního designu](/responsive). Proč?

  - Obrázky mají fysicky dané **pevné rozměry** v pixelech. Tyto rozměry jsou často větší než obvyklá šířka mobilních obrazovek, což je **třeba** 480 pixelů.

  - Při změně velikosti na jinou než výchozí, a to menší i větší, dojde ke **ztrátě kvality**.

## Nastavit `max-width`

Nejprostší řešení je šířku obrázkům omezit na 100 %.

```
img {
  max-width: 100%
}
```

A je to. Je potřeba myslet na [box model](/box-model). V případě výchozího okrajového se přičte případný `padding` nebo `border` ([ukázka](http://kod.djpw.cz/iebb)). Zároveň je nutné nechat dopočítat výšku podle té nové šířky. Takže spíš použít:

```
img {
  max-width: 100%; 
  **box-sizing: border-box**; 
  *height: auto*
}
```

**Nevýhoda** tohoto postupu je zřejmá:

  Bude se značně **plýtvat s daty**.

  Zmenšení/zvětšení v prohlížeči **nebude tak kvalitní**, jak by mohlo  být.

    Prohlížeč nebude do načtení obrázku znát jeho rozměry a nepůjde mu tak **vyhradit přesné místo**. Stránka tedy může během načítání poskakovat.

      [Nastavení výšky responsivního obrázku](/rozmery-responsivniho-obrazku) – nastavení výšky podle šířky

## Více obrázků

Druhé (a kromě jednoduchosti lepší) řešení spočívá ve vytvoření více obrázků s různými rozměry. To je nejlepší nějak zautomatisovat na straně serveru ([řešení v PHP](http://php.vrana.cz/zmensovani-obrazku.php)).

Potom už stačí jen v **závislosti na zařízení** zobrazit ten vhodný rozměr.

### Řešení na straně serveru

**Hotové řešení** v PHP je například [Adaptive Images](http://adaptive-images.com/). Funguje to tak, že jednoduchý JavaScript uloží do cookie rozlišení obrazovky:

```
document.cookie = 'resolution=' + 
  Math.max(screen.width, screen.height) +
  '; path=/';
```

Potom se úpravou souboru `.htaccess` zajistí, aby požadavky na obrázky zpracovával PHP skript. Ten si vezme z cookie hodnotu rozlišení a podle toho vygeneruje obrázek. Různé velikosti obrázků se pro urychlení následně **ukládají do cache**.

Nevýhoda tohoto řešení může být v tom, že se na stejné adrese nachází různé velikosti téhož obrázku. A nejspíš bude taktéž problém v tom, že při změně rozměrů se zobrazí obrázek z cache, a tedy se špatnou velikostí.

### Řešení v JavaScriptu

Když v redakčním systému zajistíme **generování různých velikostí**, můžeme je potom nastavovat JavaScriptem.

Využít jde podobného postupu jako při [lazy loadingu obrázků](/lazy-loading-obrazky) — `&lt;noscript>` značku, do které se umístí skutečný obrázek a poblíž ní vloží JavaScript zmenšeninu/zvětšeninu podle **aktuálního rozlišení**.

Tak funguje třeba [Picturefill](https://github.com/scottjehl/picturefill).

### Detekce mobilního prohlížeče

Ještě je možnost [detekovat mobilní prohlížeč](/mobilni-web#detekce) z hlavičky `user-agent` a o velikosti obrázku, který se má vložit, rozhodnout na straně serveru.

Zde může být problém, že jako mobilní bude určeno staré zařízení s rozlišením 320 × 240 i nové s rozlišením 1920 × 1080.

## Lightbox

[Lightbox](/magnific-popup) pro zobrazení plného obrázku je většinou lepší **na mobilních zařízeních zrušit**. Vyhneme se tak trapné situaci, kdy se po rozkliknutí náhledu zobrazí datově velký obrázek, který ale bude ve finále stejně velký nebo dokonce menší než náhled.

## Odkazy

  - [lazysizes](https://github.com/aFarkas/lazysizes) – JS knihovna umožňující zobrazit vhodný obrázek pro dané rozlišení

  - Smashing Magazine: [One Solution To Responsive Images](http://mobile.smashingmagazine.com/2014/02/03/one-solution-to-responsive-images/)

  - Smashing Magazine: [Picturefill 2.0: Responsive Images And The Perfect Polyfill](http://www.smashingmagazine.com/2014/05/12/picturefill-2-0-responsive-images-and-the-perfect-polyfill/)

  - Smashing Magazine: [Responsive Images Done Right: A Guide To &lt;picture> And srcset](http://www.smashingmagazine.com/2014/05/14/responsive-images-done-right-guide-picture-srcset/)

  - [Sizer Soze](http://sizersoze.org/) – spočítá, jak by responsivní obrázky snížily datový objem

  - [The state of responsive images in 2015](http://www.webdesignerdepot.com/2015/08/the-state-of-responsive-images/)