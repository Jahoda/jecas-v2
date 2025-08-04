---
title: "Responsivní web"
headline: "Jak na mobilní (responsivní) web"
description: "Jak a proč vytvářet mobilní versi webu – responsive web."
date: "2013-07-21"
last_modification: "2013-07-21"
status: 1
tags: ["Hotová řešení", "Rady a nápady", "Responsivní design"]
---

Jelikož různí návštěvníci používají různá zařízení, jedna jediná varianta často není **universálně použitelná**.

## Proč mobilní web?

### Rozlišení a uhlopříčka

Pokud si srovnáme typický **chytrý telefon** s uhlopříčkou kolem 4 palců s **FullHD monitorem** o uhlopříčce například 24 palců (nebo třeba FullHD televisí s uhlopříčkou ještě násobnou), je vidět značný nepoměr. (I při zohlednění běžné vzdálenost, ze které člověk dané zařízení očima čte/prohlíží.)

### Datová náročnost

Ještě pořád jsou mobilní připojení typicky pomalejší a uživatelé často limitováni datovým přenosem (FUP). Mobilní web může být proto prospěšný.

### Jiné potřeby

Nakonec může člověk po webu při prohlížení z mobilního telefonu  chtít o trochu něco jiného než z běžného počítače.

#### Příklady

  - Web nabízející obsah ke stažení, který na mobilu nebude moc platný (např. [titulky k seriálům](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=17&amp;topic=150308#6)).

  - Webová stránka restaurace: Na PC si typicky budu v prvé řadě chtít prohlédnout, jak to tam vypadá, na mobilu mě bude hlavně zajímat, jak se tam dostanu a mají-li otevřeno.

## Způsoby řešení

V zásadě existují dva způsoby:

  - Jeden web pro **desktop**, jeden web pro **mobily**.

  - Jen jeden web s **detekcí** desktopu/mobilu a drobnými úpravami.

  - Kombinace.

## Dva různé weby

K běžnému (desktopovému) webu se vytvoří další web pro mobily. Obvykle běží na `m.example.com` subdoméně nebo se provádí detekce prohlížeče a podle toho se nabídne příslušný obsah.

### Detekce

Detekovat mobilní prohlížeč lze hledáním řetězce `mobile` v HTTP hlavičce `user-agent`, v PHP to může vypadat následovně.

```
if (stripos($_SERVER["HTTP_USER_AGENT"], "mobile") !== false) {
  $isMobile = true;  
  // mobilní prohlížeč
}
else {
  $isMobile = false;
  // běžný prohlížeč
}
```

Po **detekci mobilu** se může rovnou přesměrovat na `m.example.com`, rovnou zobrazit na stejné URL mobilní versi — nebo mobilní versi jen nabídnout.

## Jeden web a „Media Queries“

Pro jednodušší úpravu čistě pomocí CSS si lze vystačit s tzv. [Media Queries](/media). Oč jde? K běžnému CSS pro desktop se přidají speciální podmínky, které zajistí, že se další pravidla zlepšující zobrazení u mobilních zařízení aplikují jen za určitých podmínek – typicky šířky okna prohlížeče (viewportu).

Šířku, při které se web **přeskládá** (tzv. *breakpointy*), není příliš vhodné volit ve stylu *„tohle je pro mobil/tablet/PC“*. Lepší je si web pomalu zmenšovat a **nový breakpoint** vytvořit vždy, když se stránka přestane ideálně zobrazovat.

```
@media screen and (max-width: **480px**) {
  /* pravidla se aplikují jen při šířce do 480 px */
}
```

Nevýhoda tohoto řešení je, že nefunguje u Explorerů starších než 9 (lze řešit [doskriptováním v JS](https://github.com/scottjehl/Respond)).

Kromě Media Queries je nutné správně nastavit [`&lt;meta&gt;` značku `viewport`](/meta-viewport) v hlavičce stránky.

```
&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
```

### Mobile first

Opačným postupem je vytvořit nejprve základní mobilní vzhled a pomocí Media Queries jej rozšířit pro větší zařízení.

Výhodné na tom je, že i velmi starý prohlížeč může dostat alespoň základní jednoduché CSS, což může být lepší, než když dostane komplikovaný plný layout, který se potom v něm rozpadne.

## Kombinace postupů

Jelikož samotné CSS není všemocné a dva různé weby komplikují správu, je možné obě řešení zkombinovat.

  - Pokud se nějaké **větší části** nemají na mobilu zobrazovat, ušetříme datový přenost náhradou `obsah {display: none}` za obalení daného bloku podmínkou „`$isMobile`“ na straně serveru.

  - Podobně různé reklamy nebo třeba lightbox skripty a další na mobilech zbytečná data.

  - **Obrázky** ve vysokém rozlišení nemá smysl zobrazovat, rozumnější nejspíš bude místo nich zobrazit zmenšeninu.

## Testování a ladění

Prohlížeče v mobilních zařízeních se hodně blíží „velkým“ prohlížečům, proto běžně stačí si na desktopu zmenšit okno (Media Queries fungují od IE 9). Více informací [je zde](/prohlizece#mobily).

## Úskalí a risika responsivních webů

Jako hlavní risiko vidím vytvoření jisté nekonsistence. Návštěvník si zvykne na desktopovou versi dané stránky a po připojení z mobilu je na jednou skoro *na jiném webu*.

Vždy je proto dobré se zamyslet, zda přeskládáním stránky pro jiné zařízení návštěvníka příliš nezmateme. Lépe řečeno, zda lepší přeskládání převáží nad neohrabaném – ale povědomém – zobrazení.

Více o tom na diskusi.