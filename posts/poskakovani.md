---
title: "Poskakování stránky"
headline: "Poskakování stránky"
description: "Proč vadí poskakování stránky během načítání a jak se ho zbavit."
date: "2016-12-06"
last_modification: "2017-05-07"
status: 1
tags: ["Prohlížeče", "Rady a nápady", "Responsivní design"]
---

Je poměrně častý jev, že webové stránky během načítání všelijak poskakují, jak se stahují a zpracovávají jednotlivé připojené soubory.

Před načtením a zpracováním zejména **obrázků a skriptů** může web vypadat nějak takto:

Když se další obsah dotáhne, stránka přeskočí do finálního zobrazení.

Ačkoliv je poskakování častý nešvar, existují možnosti, jak proti němu bojovat.

## Proč poskakování vadí

    **Překreslování** – prohlížeč musí tentýž obsah vykreslit vícekrát s ohledem na to, jak se mu mění pod rukama.

        [Jak probíhá vykreslování stránky](/vykreslovani)

    To stojí nějaký čas a výkon navíc.

    **Visuální dojem** – poskakování prvků stránky není úplně estetické, takže nebude lahodit oku návštěvníka.

    **Matení návštěvníka** – velké změny stránky během načítání mohou být až matoucí. S ohledem na možnou nespolehlivost zejména mobilního internetového připojení se obrázky/skripty mohou načíst za hodně dlouhou dobu nebo třeba vůbec.

    V případě dlouhého načítání se už může návštěvník do webu začíst (někam odroluje) a po donačtení obsahu a změny výšky stránky bude najednou někde jinde.

## Jak zjistit, že stránka poskakuje

Pro rychlý orientační přehled stačí na stránce vypnout obrázky a JavaScript a výsledek porovnat s *plnou* podobou webu.

Blokovat JS/obrázky v **Chrome** jde následovně:

V ideálním případě by si měly být obě varianty co možná nejpodobnější. Případně by prvky závislé na načtení obrázků/skriptů **neměly ovlivňovat okolí**.

Přepnout

## Co poskakování způsobuje

### Obrázky

Nejčastější příčinou bývají obrázky. Pokud se obrázek vloží do stránky značkou `&lt;img>` bez uvedení rozměrů v HTML atributech nebo CSS, jeho velikost na stránce bude prohlížeč vědět až po stažení souboru obrázku. Logicky tak nejde dopředu na stránce vyhradit místo.

Nejsnazší řešení je přidat rozměry do atributů `width` a `height`:

```
&lt;img src="obrazek.png" **width="100" height="100"**>
```

Problém ale nastává v případě **responsivních obrázků**. Zde je žádoucí, aby se rozměry obrázku dopočítaly podle dostupného prostoru (např. šířka okna).

```
img {
  max-width: 100%;
  height: auto;
}
```

Nějaké jednoduché řešení neexistuje. Pokud je znám poměr stran (výšky a šířky), je možné si pomoci obalovým elementem:

    - [Nastavení výšky responsivního obrázku](/rozmery-responsivniho-obrazku)

### JavaScripty

Častým jevem je poskakování při použití JS, který významně [modifikuje stránku](/prepinani-vzhledu#). Například kolotoče (carousely), přepínání obsahu v záložkách nebo skrývání a odkrývání bloků.

Je dobré si takovéto prvky projít s vypnutým JavaScriptem a ověřit, že neposkakují.

Problematické prvky je potřeba zvlášť nastylovat pro situaci s ještě nenačteným JS. Ideální je detekovat dostupnost skriptování například nahrazením značky `&lt;body>` za:

```
&lt;body class="no-js">
&lt;script>
    document.body.className = document.body.className.replace('no-js', 'js');
&lt;/script>
```

V CSS jde potom psát `.js .trida {}` pro ovlivnění vzhledu elementů, které teprve čekají na načtení externího JS.

  function prepnoutObrazek(obr) {
    var puvodniSrc = obr.src;
    obr.src = obr.getAttribute("data-src");
    obr.setAttribute("data-src", puvodniSrc);
  }