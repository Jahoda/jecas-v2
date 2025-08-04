---
title: "Oprava chyb použitelnosti v mobilních zařízeních"
headline: "Oprava chyb použitelnosti v mobilních zařízeních"
description: "Google informuje o chybách v použitelnosti u mobilních zařízeních. Jak je opravit?"
date: "2015-03-11"
last_modification: "2015-03-17"
status: 1
tags: ["SEO", "Google", "Responsivní design"]
---

Pokud je daná stránka připojena v **Google Webmasters Tool**, je možné se setkat s e-mailem upozorňujícím na chyby použitelnosti v mobilních zařízení.

Google si dlouhodobě hraje se znázorněním, že je stránka optimalisována pro mobily, při hledání z dotykových zařízení s malou obrazovkou.

    - [Google označí stránky vhodné pro mobil](/google-mobile-friendly)

Počty přístupů z mobilních zařízení meziročně **rostou** a Google naznačuje, že stránky přizpůsobené mobilům budou **lépe hodnoceny ve výsledcích vyhledávání**.

  Chyby na těchto stránkách významně ovlivňují možnost zobrazení vašeho webu v mobilních zařízeních. Vyhledávání Google tyto stránky nebude považovat za vhodné pro mobilní zařízení, což bude mít vliv na jejich pořadí ve výsledcích vyhledávání z chytrých telefonů.

  Zpráva z GWT

Vytvořit použitelnou mobilní podobu stránek tak většinou dává smysl.

## Jak chyby odstranit?

V e-mailu z Google nástroje pro webmastery je odkaz pro zobrazení chyb, které by bylo dobré opravit.

Obecně stačí vycházet ze zásad tvorby responsivního webu.

    - [Responsivní design webu](/responsivni-web) – kompletní průvodce postupem tvorby responsivního webu

## Nejčastější chyby

Mezi nejčastější chyby v použitelnosti patří následující.

### Není nakonfigurován viewport

Tuto chybu způsobuje absence značky [`&lt;meta name="viewport">`](/meta-viewport). Bez její přítomnosti mobilní prohlížeče předstírají větší velikost než mají, aby následně stránku zmenšily, takže je bez přiblížení špatně čitelná.

Řešení je přidat do hlavičky:

```
&lt;meta name="viewport" content="width=device-width,initial-scale=1">
```

### Malá velikost písma

Tento problém může být vyvolán nenastavením *viewportu*, protože se stránka nezobrazí v měřítku 1:1, ale bude zmenšená. Po přidání `&lt;meta name="viewport">` tedy možná zmizí.

Přetrvá-li i nadále, je potřeba nastavit větší písmo ([`font-size`](/font#size)). Vhodný postup je i základní velikost písma vůbec nenastavovat a **ponechat výchozí**, kterou má prohlížeč (obvykle 16 pixelů).

### Dotykové prvky jsou moc blízko

Má-li se web dobře ovládat prsty prostřednictvím dotykové obrazovky, je zapotřebí dodržet dvě podmínky:

  - Zajistit **dostatečně velkou plochu** ovládacích prvků, aby se do nich dalo prstem trefit.

  - Mezi malými tlačítky/odkazy alespoň **vytvořit rozestup**, aby uživatel omylem neaktivoval jiné tlačítko, než které chtěl.

Google uvádí doporučení, že ovládací prvek by měl být velký alespoň **48 × 48 pixelů** (cca 7 × 7 milimetrů ve skutečnosti), aby šel snadno trefit průměrně velkým prstem.

U některých méně důležitých ovládacích prvků stačí rozměry menší, v tom případě by ale mělo být mezi nimi větší horisontální a vertikální odsazení. Google tento odstup stanovuje na 32 pixelů (5 mm) oběma směry.

### Velikost obsahu není přizpůsobena viewportu

I přes přidání `&lt;meta name="viewport">` se nemusí použitelnost stránky moc zlepšit v případě, že její elementy mají nastaveny **velkou fixní šířku**. V takovém případě se zkrátka nevejdou na displej a bude nutné se po stránce vodorovně posouvat.

Ideální je vícesloupcové rozvržení stránky vytvářet v procentech a pouze omezit maximální šířku celého obalu, aby web nebyl na velkých monitorech příliš roztažený.

    - [Responsivní sloupcový layout](/responsivni-web#sloupce)

Při šířce, kdy už jsou jednotlivé sloupce příliš úzké, přichází do hry [pravidlo `@media`](/mobilni-web#media-queries), které umožňuje aplikovat určitá CSS pravidla pouze při stanovených rozměrech stránky.

V závislosti na šířce se tak obvykle **počet sloupců snižuje** a obsah se dostává pod sebe.

Nechtěně zvětšit šířku mohou i prvky jako obrázky, videa, rámy nebo tabulky, ale i to se [dá vyřešit](/responsivni-web#vyjimky).

## Test použitelnosti v mobilech

Otestovat, zda stránka vyhovuje některým pravidlům Google jde na následující stránce:

[Mobile-Friendly Test](https://www.google.com/webmasters/tools/mobile-friendly/)

Pokud ji Google shledá jako vhodnou pro mobily, mělo by se zobrazit něco jako:

Výsledek je nutné brát s reservou. Jedná se o vyhovění formálním pravidlům, která je možné **strojově ověřovat**. Skutečně dobrou použitelnost pro návštěvníky kladný výsledek tedy negarantuje.

## Odkazy jinam

  - Google Developers: [Web Fundamentals](https://developers.google.com/web/fundamentals/?hl=en) – příručka „nejlepších postupů“, jak vytvářet moderní web