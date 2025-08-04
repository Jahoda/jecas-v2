---
title: "Proč nemůže vlastní externí font fungovat"
headline: "Proč nemůže vlastní externí font fungovat"
description: "Vysvětlení proč není možné na webu používat vlastní externí písmo, které funguje správně."
date: "2022-03-01"
last_modification: "2025-03-26"
status: 1
tags: ["Rady a nápady", "Písma"]
---

Pro ozvláštnění stránek je populární používat různá písma – tzv. *web fonty*.

Většinou ze služeb jako je:

    [Google Fonts](https://fonts.google.com)

    [Adobe Fonts](https://fonts.adobe.com/fonts) (dříve známé jako Typekit)

Tyto externí fonty jde buď přímo připojit z uvedených služeb:

```
&lt;link rel="preconnect" href="https://fonts.googleapis.com">
&lt;link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
&lt;link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&amp;display=swap" rel="stylesheet">
```

Nebo si je stáhnout k sobě a provozovat na stejné doméně jako další jiné zdroje (obrázky, styly, skripty).

## Zpomalení načítání

Připojování fontů z cizí domény je první technický problém. Jak je vidět na ukázce výš v případě **Google Fontů**, nejprve se musí stáhnout CSS soubor s deklarací fontů a až následně samotný font.

```
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v29/KFOkCnqEu92Fr1MmgVxGIzIXKMnyrYk.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
```

Z toho plyne, že se proces stažení fontu zbrzdí stahováním dalšího externího CSS, které navíc blokuje vykreslení stránky.

Zvlášť problém je to u pomalého připojení (v [DevTools](/vyvojarske-nastroje) jde nasimulovat volbou *Slow 3G*), kde to prodlouží první načtení klidně o 2 vteřiny:

To je popis situace, kdy se ani dané písmo nepoužívá a nestahuje. Už jen samotné stažení toho CSS má tento negativní dopad – [ukázka](http://kod.djpw.cz/qofd).

Potom podobnou dobu může zabrat samotné stažení fontu – [ukázka](http://kod.djpw.cz/oofd)

To přináší ještě další risiko v případě výpadku nebo zpomalení dané služby, že bude prohlížeč čekat s vykreslením, až tento styl stáhne.

Kromě toho je potřeba nastavit připojení na další 2 domény, což přináší další režii a zpomalení (trochu to zlepšuje použití `&lt;link>` značky [`preconnect`](/preconnect)).

Roli hraje i **velikost samotného souboru** s fontem. 

K tomu je zase použití služby Google Font dobré, protože CSS vlastností `unicode-range` rozděluje soubor s písmem na více menších souborů podle potřeby znaků použitých na stránce.

## Chybějící české znaky

Snaha ušetřit datovou velikost vede k tomu, že se tvůrce pokusí zahrnout do souboru s písmem pouze znaky, které očekává.

Dost tím trpí zahraniční služby, že nepočítají s češtinou – třeba Tinder:

Tento problém zrovna dobře řeší Google Fonts, kdy všechny znaky rozděluje do souborů a připojuje na základě znaků na stránce pomocí `unicode-range`.

## Blokování textu

Další risiko u vlastního písma je v blokování textu. Projevuje se to tak, že do doby načtení externího fontu není na stránce nic vidět.

Blokováním zobrazení textu se předchází tomu, aby stránka problikla ze stavu s výchozím písmem do stavu s externím fontem po jeho načtení.

To už naštěstí vyřešila CSS vlastnost [`font-display`](/font-face#font-display). Výchozí chování nových prohlížečů je takové, že se na písmo s vykreslením textu nečeká.

Ve starších prohlížečích to ale může být problém.

## Poskakování stránky

Chování odpovídající `font-display: swap`, kdy se stránka nějak vykreslí a po stažení externího fontu se písmo změní, vede k tomu, že stránka po stažení fontu [poskočí](/poskakovani).

Důvodem je to, že text je v různých fontech jinak velký:

  Příliš žluťoučký kůň úpěl ďábelské ódy.

  Příliš žluťoučký kůň úpěl ďábelské ódy.

  Příliš žluťoučký kůň úpěl ďábelské ódy.

  Příliš žluťoučký kůň úpěl ďábelské ódy.

Nejen šířka znaků, ale proměnlivá je i jejich výška nebo výška řádkování.

## Přizpůsobení fallback fontu

Zlepšit toto nepěkné poskakování jde přizpůsobením fallback fontu finální podobě.

Existují 2 možnosti:

  - Upravit CSS vlastnosti textu.

  - Upravit vlastnosti fontu ve `@font-face` deklaraci.

### CSS Font Loading API

První technika je založená na použití [Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API).

Úpravami CSS vlastností se rozumí změna vlastností jako `font-size`, `line-height`, `letter-spacing`, `word-spacing` a podobně.

  Příliš žluťoučký kůň úpěl ďábelské ódy.

  Příliš žluťoučký kůň úpěl ďábelské ódy.

  Příliš žluťoučký kůň úpěl ďábelské ódy.

  Příliš žluťoučký kůň úpěl ďábelské ódy.

Prostou úpravou `letter-spacing`u (mezer mezi písmeny) se zde dosáhlo toho, že všechny odstavce jsou přibližně stejně široké, ačkoliv je každý jiným fontem.

Výhoda je v tom, že tohle řešení funguje všude, nevýhoda, že se musí  **sledovat načítání fontu JavaScriptem**:

```
var font = new FontFace("Vlastní písmo", "url(/fonts/vlastni-pismo.woff2)", {
  style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
});

font.load().then(function() {
  document.fonts.add(font);
  document.body.classList.remove("font-fallback");
  document.body.classList.add("font-loaded");
});
```

Tento kód po načtení fontu přidá elementu `&lt;body>` třídu `font-loaded` a naopak odebere `font-fallback`. Ve stylech se na to tak může zareagovat a pro `font-fallback` upravit záložní písmo tak, aby co nejvíc prostorově odpovídalo vlastnímu externímu písmu.

Užitečný nástroj pro použití této techniky je [Font style matcher](https://meowni.ca/font-style-matcher/).

Jde si tam hezky pohrát s jednotlivými vlastnostmi, aby se oba fonty jakž takž překrývaly:

### Font display modifikátory

Novější způsob jsou tzv. font display modifikátory. Někdy známé také jako *@font-face descriptors*, lze se setkat i se zkratkou *f-mods*.

Vypadá to nějak takto:

```
@font-face {
    font-family: "Roboto-fallback";
    size-adjust: 100.06%;
    ascent-override: 96%;
    src: local("Arial");
}
```

Ještě existují vlastnosti `descent-override` a `line-gap-override`.

Funguje to mimo **Safari** a **Internet Explorer**.

Tím se na základě systémového písma (`src: local("Arial")`) založí *nové* písmo s upravenými hodnotami, aby vypadalo podobně jako externí font.

Použití je potom typické:

```
body {
  font-family: Roboto, 'Roboto-fallback', sans-serif;
}
```

Výsledkem je trochu méně poskakování – [ukázka](http://kod.djpw.cz/xofd).

Existuje nástroj [Automatic font matching](https://deploy-preview-15--upbeat-shirley-608546.netlify.app/perfect-ish-font-fallback/?font=Montserrat), který dokáže k některým fontům tyto vlastnosti stanovit automaticky.

Případně si to jde nastavit ručně a zkontrolovat, že se obě písma přibližně překrývají – [ukázka](http://kod.djpw.cz/yofd).

Bohužel to je pořád jen zmírnění dopadů než **opravdové vyřešení problému**.

Kvůli tomu, že písma používají [kerning](https://cs.wikipedia.org/wiki/Kerning) (vyrovnávání mezer mezi písmeny), který se mezi písmy liší, je podle mě nemožné docílit na pixel přesných rozměrů napříč fonty.

Takže 100% za všech případů se poskakování podle mě nedá zabránit.

## Systémová písma

Kvůli mnoha problémům a některým neřešitelným s externími fonty může být východisko používat [systémová písma](systemova-pisma).

V roce **2025** třeba v podobě:

```
body {
    font-family: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'
}
```

[Ukázka](http://kod.djpw.cz/pofd)

Pro aktuální styl se doporučuji podívat třeba na [Tailwind](https://tailwindcss.com/docs/font-family).

Tímto se vzhled stránky přizpůsobí písmu, které používá daný operační systém.

Hodně webů se touto cestou vydává – [Facebook](/facebook), Instagram, GitHub nebo StackOverflow.

Je potřeba si zvážit, zda stojí za to řešit spousty problémů s externími fonty, ze kterých některé ani nemají řešení, nebo použít 100% funkční a načítání nezdružující **systémový font**.

Na druhou stranu ale volba systémového vzhledu znamená různé zobrazení na různých zařízeních. Je potřeba si rozhodnout, jestli dát přednost rychlému načítání nebo jednotné visuální identitě.

## Odkazy jinam

  - [More than you ever wanted to know about font loading on the web](https://deploy-preview-15--upbeat-shirley-608546.netlify.app/posts/high-performance-web-font-loading/)

  - [A New Way To Reduce Font Loading Impact: CSS Font Descriptors](https://www.smashingmagazine.com/2021/05/reduce-font-loading-impact-css-descriptors/)

  - [How to avoid layout shifts caused by web fonts](https://simonhearne.com/2021/layout-shifts-webfonts/)