---
title: "Otevření nového okna"
headline: "Otevírání nového okna"
description: "Možnosti, jak otevřít stránku do nového okna / nového tabu prohlížeče."
date: "2014-03-04"
last_modification: "2014-03-13"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

Někteří lidé namítají, že by webová stránka neměla nic otevírat do nového okna a **nechat to na uživateli**.

Ten si přece umí odkaz požadovaným způsobem *otevřít sám*. Cíl odkazu je ve většině prohlížečů zpravidla možné:

  - otevřít **kliknutím kolečkem**, stránka se otevře na pozadí,

  - otevřít rovněž **na pozadí** při přidržení klávesy Ctrl a prokliknutím,

  - otevřít do **nové záložky** přidržením klávesy Shift,

  - vybrat požadovaný způsob z **kontextové nabídky**.

  [Odkaz na vyzkoušení](http://kod.djpw.cz)

Osobně se ale domnívám, že značná část návštěvníků toto **nezná** a v případech, kdy je nežádoucí přechodem na další stránku v podstatě **zavřít tu původní**, je **otevření nového okna** rozumné řešení. (Nechtěnému zavření může zabránit [událost `onbeforeunload`](/onbeforeunload) a nebo alespoň minimalisovat následky dokáže [ukládání formulářů do `localStorage`](/zalohovani-formularu).)

Těm, co je *nevyžádané* otevírání **nových tabů** otravuje, doporučím alespoň zjednodušení v podobě zavírání záložek **klikáním kolečkem** – ve většině prohlížečů funguje.

## HTML odkaz a `target`

První způsob otevření nového okna je obyčejný HTML odkaz doplněný o nastavení prázdného rámu:

```
&lt;a href="http://example.com" **target**="*_blank*">
  Text odkazu
&lt;/a>
```

Pro otevření cíle odkazu do nového tabu se zpravidla používá hodnota `_blank`. (Mimochodem, je možné použít i nějaké **nesmyslné jméno rámce**, což také funguje.)

## JavaScript a `window.open`

V JS se nové okno otevírá přes `window.open`.

```
window.open("url-stranky", '_blank');
```

### Blokování vyskakovacích oken

Kvůli pohodlí uživatelů většina prohlížečů **blokuje automatické otevírání nových oken**, která se JavaScript snaží otevřít bez přímé akce uživatele. Jako *přímé* akce jsou vyhodnocovány některé [události myši](/udalosti-mysi), např. `onclick` nebo `onmousedown`, tam prohlížeče ve výchozím nastavení **nová okna neblokují**.

Neznám způsob, jak u jiných událostí omezení obejít, **nefunguje** ani trik typu:

```
&lt;button id="tlacitko" onclick="window.open('http://example.com')">
  Tlačítko
&lt;/button>
&lt;script>
  document.getElementById("tlacitko").click();
&lt;/script>
```

[Ukázka](http://kod.djpw.cz/jfcb)

### Změna URL okna

Měnit URL zobrazenou v okně **otevřeném skriptem** je možné přes `location.href` ([ukázka](http://kod.djpw.cz/kfcb)):

```
var okno = window.open();
okno.location.href = "http://example.com";
```

To se může hodit v situaci, kdy při potřebě otevřít nové okno ještě **neznáme URL**, která se teprve zjistí třeba [AJAXem](/ajax). Při přímé akci (kliknutí) se jen otevře prázdné okno a při nepřímé akci (získání dat AJAXem) se změní URL. To funguje bez **blokování** ze strany prohlížečů.

### Zavření okna

Právě otevřené okno zavře prosté:

```
window.close()
```

V případě, že si na skriptem vytvořené okno vytvoříme odkaz (přiřadíme ho do proměnné dostupné z daného [scope](/scope)), můžeme zavřít i okno konkrétní:

```
var **okno** = window.open("url");
**okno**.close();
```

## Rozšíření `window.open`

Kromě URL stránky a názvu okna/rámu existuje ještě třetí parametr, který umožňuje různá **další nastavení**, co fungují různě napříč prohlížeči, a je s jejich pomocí možné docílit různých nestandardních podob. A to moc nedoporučuji.