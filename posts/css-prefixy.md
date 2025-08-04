---
title: "CSS prefixy"
headline: "CSS prefixy"
description: "Některé CSS vlastnosti se zapisují s prefixy. Proč tomu tak je a jak prefixy zapisovat."
date: "2013-09-11"
last_modification: "2016-05-08"
status: 1
tags: ["CSS", "Prohlížeče"]
---

Jedná se o zápisy typu `-moz-`, `-webkit-`, `-ms-` nebo `-o-` před samotnými CSS vlastnostmi.

## K čemu je to dobré

Při **vývoji** jednotlivých prohlížečů se přidávají různé nové vlastnosti. Protože se může zjistit, že by nová vlastnost měla fungovat **ve finální podobě jinak**, nejprve se přidá ve zkušební podobě s prefixem.

    Nehrozí potom tolik, že finální podoba dané vlastnosti **rozbije již dříve vytvořený web**.

    Pro autora webu je prefix **varování**, že se může něco změnit.

    Na první pohled je jasné, který prohlížeč danou vlastnost podporuje.

## Prefixy v CSS

  Internet Explorer
  Používá od verse 9 prefix `-ms-`.

  Firefox
  Používá prefix `-moz-`.

  Webkit/Blink
  Prohlížeče s jádrem Blink (**Chrome**, **Safari**, **Opera** od verse 15) používají prefix `-webkit-`.

  Opera
  Starší verse ([**Opera 12**](/opera)) používají prefix `-o-`. Nicméně Opera u drtivé většiny vlastností, kde ostatní používají prefixy, žádný prefix nepotřebuje.

Pokud je potřeba zapsat nějakou *CSS novinku* pro všechny prohlížeče, dost nepěkně nám kód nabobtná.

Příklad oprefixovaného zápisu [rotační transformace](/rotace).

```
-webkit-transform: rotate(-90deg);
-moz-transform: rotate(-90deg);
-ms-transform: rotate(-90deg);
-o-transform: rotate(-90deg);
transform: rotate(-90deg);
```

## Pořadí vlastností

Existuje dilema ohledně volby pořadí CSS vlastností s a bez prefixu.

Na jednu stranu dává smysl umístit vlastnost bez prefixu jako poslední, aby přepsala experimentální implementace s prefixy a podporující prohlížeče tak použili optimální variantu.

Na stranu druhou je **použití neprefixované vlastnosti jako poslední** menším krokem do neznáma. Pokud by se změnilo chování finální vlastnosti bez prefixu oproti té s prefixem, mohl by se v novějších prohlížečích web rozbít.

## Prefixy v JavaScriptu

Mají-li se nastavovat vlastnosti funkční jen s prefixy prostřednictvím JS, stačí převést vlastnost s prefixem dle obvyklé konvence:

  - **písmeno za pomlčkou** (spojovníkem) se **zapíše velké**,

  - **pomlčka se vypustí**

Tedy jako se z `background-color` udělá `backgroundColor`, analogicky z `-webkit-transform` bude `WebkitTransform`.

Aby to nebylo tak jednoduché, tak **Internet Explorer** první písmeno na začátku nezvětšuje, takže v něm funguje `msTransform`.

JS zápis výše uvedeného CSS by mohl vypadat následovně.

```
element.style.WebkitTransform =
element.style.MozTransform =
element.style.**m**sTransform =
element.style.oTransform =
element.style.transform = "rotate(-90deg)";
```

Lze si vypomoci hotovými knihovnami, které **sjednocují výše uvedený zápis**, nebo se, pokud je to jen trochu možné, **snažit skriptem nastavovat jen třídu** a styly nastavit přímo v CSS — tam nám může pomoci se psaním prefixů [snippet](/sublime-text#snippet) nebo CSS preprocesor.

## Hotová řešení

  [Prefix free](http://leaverou.github.io/prefixfree/#)
  Stačí připojit jeden JS soubor a připojené CSS bude automaticky oprefixováno.

  [Autoprefixer](https://github.com/postcss/autoprefixer)

    Automatické doplnění potřebných prefixů v různých programovacích jazycích.

  [LESS Hat](http://lesshat.com/)
  
  Předpřipravené oprefixované vlastnosti pro CSS preprocesor [LESS](http://lesscss.org/).

    Vytvořit [rozmazání](/blur) je potom otázka zápisu:

    ```
div {
 .blur(5px);
}
```

    **Výsledek:**

    ```
div {
 -webkit-filter: blur(5px);
 -moz-filter: blur(5px);
 -ms-filter: blur(5px);
 filter: blur(5px);
}
```

      - David Walsh: [Say Goodbye to Vendor Prefixes](http://davidwalsh.name/goodbye-vendor-prefixes)

## Budoucnost prefixů

Lze očekávat, že se do budoucna bude od používání prefixů ustupovat. Místo toho by měly fungovat obyčejné názvy CSS vlastností, jejichž funkci bude nutné zapnout v nastavení, než se stanou standardně podporovanými.

    - WebKit: [Updating Our Prefixing Policy](https://webkit.org/blog/6131/updating-our-prefixing-policy/) – upouštění od prefixů