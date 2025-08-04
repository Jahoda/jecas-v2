---
title: "Responsivní Facebook Like"
headline: "Responsivní Facebook Like"
description: "Jak zajistit, aby se Facebook Like a Page box přizpůsobovaly šířce obrazovky."
date: "2015-08-27"
last_modification: "2015-09-04"
status: 1
tags: ["Facebook", "Responsivní design"]
---

Pro snazší sdílení obsahu a zvyšování počtu fanoušků stránky se na webech používají Facebook pluginy jako *Like* tlačítko nebo náhled FB Page.

Při vytváření [responsivního webu](/responsive) je potom nutné zajistit, aby se box z Facebooku **dobře vešel na stránku**.

[Facebook](/facebook) bohužel **nenabízí úplně dokonale responsivní** *widgety*. FB plugin potřebuje znát rozměry při svém načtení. Při následné změně šířky už se dál nepřizpůsobuje.

Další věc je, že prvky Facebooku mají nějaké **minimální rozměry**. Ty naštěstí začínají už na nějakých 180/225 pixelech, což se při zobrazení přes celou šířku na mobilu vejde.

## Nastavení šířky

Pro **nastavení šířky** podle dostupného prostoru existují dvě možnosti:

  Vytvořit pro Facebook plugin **kontejner se 100% šířkou**, podle které se při načtení přizpůsobí. Funguje pouze u *Stránek*.

  JavaScriptem **spočítat dostupnou šířku** (vlastnost `offsetWidth`) a natvrdo ji nastavit kódu generující obsah z Facebooku.

## Page Plugin

Jeden z doplňků je vložení náhledu FB stránky. Dokáže na web vložit něco takového (příklad z FB stránky [jecas.cz](http://fb.com/jecascz)):

Potřebný kód jde během okamžiku vygenerovat:

    - [Page Plugin](https://developers.facebook.com/docs/plugins/page-plugin) – generátor kódu pro přidání Facebook stránky na svůj web

Tento plugin je pro použití v **responsivním webu** částečně připravený.

Jeho šířka může být v rozmezí `180` až `500`, řešení je tedy obalit plugin do `&lt;div>`u se 100% šířkou omezenou na 500 pixelů:

```
.fb-plugin-cover {
  width: 100%;
  max-width: 500px;
}
```

Pro využití maximální šířky 500 px je nutné stejnou šířku nastavit i v generátoru kódu a ponechat zapnuté nastavení *Adapt to plugin container width*:

Page Plugin se potom bude přizpůsobovat dostupné šířce. To se týká pouze momentu **načtení webu** – při změně velikosti okna se nic měnit nebude.

[Živá ukázka](http://kod.djpw.cz/jppb) – přizpůsobení FB Page pluginu šířce

Pro řešení **změny velikosti okna** při JS události `onresize` by bylo nutné vyvolat nové načtení pluginu.

Je k tomu potřeba [Facebook aplikace](https://developers.facebook.com/apps/) a její identifikátor **App ID**, které se zadá do připojení JS SDK:

```
connect.facebook.net/en_GB/all.js#xfbml=1**&amp;appId=**
```

  - [Vytvoření Facebook aplikace](/facebook-poslat#aplikace) – postup vytvoření vlastní FB aplikace a získání App ID

Potom půjde použít `FB.XFBML.parse()`, což spustí nové vykreslení Facebook komponent. To se mimo jiné hodí i v případech, kde je potřeba FB pluginy vkládat do dynamicky načítaných stránek pomocí [AJAXu](/ajax).

Pro **urychlení překreslování** jde do `FB.XFBML.parse()` zadat jako argument element, ve kterém se má překreslovat, aby se nemusel procházet celý dokument.

[Živá ukázka](http://kod.djpw.cz/ippb) překreslování FB pluginu při změně velikosti okna

V praxi by bylo vhodné při zmněně rozměrů okna použít nějakou **časovou prodlevu** (`setTimeout`), aby se plugin neustále nepřekresloval během tažení myší při změně velikosti.

## Facebook Like tlačítko

Tlačítko *To se mi líbí* je k vidění na mnoha webech, vypadá takto:

Jde snadno vytvořit a vložit na web pomocí generátoru:

    - [Like Button for the Web](https://developers.facebook.com/docs/plugins/like-button) – generátor kódu pro přidání tlačítka *To se mi líbí*

*Like* tlačítko je na tom s responsivitou hůře. Nedokáže se přizpůsobit velikosti svého obalu.

Řešení je tedy obalit kód *Like* tlačítka nějakým `&lt;div>`em (v příkladu `fb-plugin-cover`), spočítat u něj JavaScriptem dostupný prostor a podle toho nastavovat atribut `data-width` kódu tlačítka:

```
var fbCover = document.getElementById("fb-plugin-cover");
var fbCoverWidth = fbCover.offsetWidth;
fbCover.getElementsByTagName("div")[0].setAttribute(
  "data-width", 
  fbCoverWidth
);

```

[Živá ukázka](http://kod.djpw.cz/lppb) Facebook Like tlačítka

Pro přizpůsobení velikosti při změně šířky okna je nutné výše uvedený kód počítající dostupný prostor opětovně spustit a *To se mi líbí* tlačítko nechat vykreslit znovu přes `FB.XFBML.parse()`.

## Vypnutí na mobilech

Nejextrémnější řešení je prvky z Facebooku na mobilu **skrýt**. [Tlačítka pro sdílení](/sdileci-tlacitka) jsou poměrně datově náročná, takže jejich vyhození návštěvníci positivně pocítí **rychlejším načítáním**.

Další věc je fakt, že mobilní prohlížeče typicky disponují zabudovanou **funkcí *Sdílet***, takže nasdílení na sociálních sítích není problém i bez tlačítek přímo na webu.

Příklad sdílení v [mobilním MS Edge](/edge-mobile):

Pořád ale bude nejspíš platit, že přítomnost originálního FB sdílecího pluginu bude znamenat vyšší počet sdílení – zobrazuje totiž [počty sdílení](/pocet-sdileni) a hlavně **přátele návštěvníka**, kterým se stránka už *Líbí*, což funguje jako silný **sociální důkaz**.