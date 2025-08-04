---
title: "Testování webů na mobilech"
headline: "Ladění responsivních webů"
description: "Jak testovat zobrazení responsivního webu na mobilních zařízeních."
date: "2016-02-16"
last_modification: "2016-03-07"
status: 1
tags: ["Prohlížeče", "Responsivní design", "Testování webů"]
---

Problém vývoje responsivních webů je v tom, že cílové publikum tvoří obrovsky rozmanitá skupina zařízení.

Doby „optimalisováno pro 15" monitor a rozlišení 800 × 600“ už jsou [nenávratně pryč](/sirka-stranky#historie). Web se musí dobře zobrazovat na tisících různých rozlišeních a fungovat na značně rozličných zařízeních.

V možnostech běžného vývojáře potom nejspíš není zakoupit si stovky různých zařízení pro testování.

## Testování na desktopu

Vzhledem k tomu, že mobilní prohlížeče se vykreslovacím jádrem téměř **neliší** od *velkých* prohlížečů, dost slušně jde pro mobily ladit na desktopu.

### Device Mode

Prohlížeč **Chrome** disponuje ve [vývojářských nástrojích](/vyvojarske-nastroje) režimem pro simulaci různých zařízení.

Tato funkce se nazývá *Device Mode* a je dostupná **po otevření DevTools** (klávesová zkratka F12)  zkratkou Ctrl + Shift + M nebo po kliknutí na ikonku telefonu.

Po zapnutí se stránka zobrazí s řadou ovládacích prvků, které slouží pro simulaci různých přístrojů:

    **Device** – umožňuje ze seznamu vybrat konkrétní model. To zajistí příslušné nastavení rozměrů obrazovky a hustotu pixelů.

    Vybírat z nabídky telefonu konkrétní modely se hodí k tomu, že se podle toho nastaví hlavička [user-agent](/ua). Pokud stránka používá serverovou detekci na základě *user-agenta*, výsledek v simulátoru bude odpovídat realitě při použití zmíněného zařízení.

    **Orientace** – někteří lidé používají svá zařízení na šířku (*landscape*) i na výšku (*portrait*).

    **Screen** – změna velikosti *viewportu* (prostoru, kde se může vykreslovat obsah stránky). Tažením za okraje si lze s velikostí hrát nebo jde přesně zadat v pixelech.

    Kliknutím na ikonu vlevo od zaškrtávátka *Screen* jde zapnout visualisaci [`@media` pravidel](/media).

    Spolu s nastavováním velikosti stránky se hodí i možnost **Zoom to fit**. Pokud se web testuje na zařízení s malou obrazovkou, jde díky tomu dostat zmenšeninu ve vyšším rozlišení.

    **Pixel ratio** – hodnota vpravo od rozměrů značí poměr HW a SW pixelů.

    Prohlížeče mobilů obvykle mají nějaký poměr mezi HW pixely a SW pixely. Zpravidla nebývá 1:1.

    Tedy telefon s rozlišením 1080 × 1920 (FullHD) zobrazí stránku třeba v třetinovém rozlišení 360 × 640. Device pixel ratio je potom rovno hodnotě **3**.

    Děje se to kvůli tomu, že pixel na telefonu může být tak malý, že by stránka zobrazená v poměru 1:1 byla nečitelná.

## Rychlost připojení

U mobilních zařízení se může někdy stát, že jsou připojena k internetu velmi špatným způsobem. Na řadě míst není kvalita signálu dobrá, takže se připojení vyznačuje:

  - Pomalou přenosovou rychlostí (dlouho trvá, než se něco stáhne).

  - Pomalou odezvou (dlouho trvá, než se něco začne stahovat).

Naštěstí **rychlost a odezvu připojení** jde ve vývojářských nástrojích ručně nastavit.

**Poznámka**: Občas se stane, že člověk zapomene omezenou rychlost vypnout a potom se diví, proč se běžné stránky mimo režim testování pomalu načítají.

## Výkon zařízení

Asi nejhůře se bez skutečného zařízení testuje výkon celého webu. Průměrný desktop bude typicky mnohem rychlejší než prastarý telefon.

Problémy s výkonem se ale běžných obsahových webů tolik netýkají.

Největší brzdou obvykle bývají efekty navázané na scrollování jako paralax efekty, fixní prvky a podobné věci, které nutí prohlížeč překreslovat velkou plochu obrazovky.

    - [Měření plynulosti vykreslování](/vykreslovani#mereni)

Ačkoliv jde výkon (počet FPS) v prohlížeči měřit, při tvorbě her nebo visuálně náročných animací se ale reálné zařízení docela hodí.

## Vzdálené testování

Kromě simulování různých zařízení v nástrojích **Chromu** existují služby nabízející vzdálené připojení ke skutečným fysickým zařízením (100% věrnost) nebo emulátorům.

Asi nejpopulárnější je Browserstack. Jedná se o placenou službu s omezenou trial versí zdarma (časem a dostupnými zařízeními).

Kromě testování různých mobilních platforem a prohlížečů umí i desktopové OS/prohlížeče.

    - [Browserstack](https://www.browserstack.com/) – vzdálené testování v různých prohlížečích

## Localhost na mobilu

Při lokálním vývoji na PC se může hodit podívat na výsledek i na mobilu.

Nejsnazší je připojit počítač i mobil ke stejné Wi-Fi, zjistit IP adresu počítače v rámci sítě a zadat ji do mobilu:

Pokud vývoj na PC běží na adrese `localhost:**3000**`, stačí v tomto případě na mobilu přejít na `192.168.8.102:**3000**`.

## Je potřeba smartphone?

Z možností, kterými disponují vývojářské nástroje nebo vzdálené testování, se skoro může zdát, že mít skutečný smartphone nemusí být nutné.

Na jednu stranu je to pravda, lepší ale bývá si alespoň pro představu web na mobilu osahat.

Způsob ovládání prsty se od používání přesného kursoru myši značně liší.

## Související

    - [Testování v MS Edge a IE](/testovani-edge) – jak testovat v prohlížečích od Microsoftu

    - [Testování webů napříč prohlížeči](/prohlizece) – testování i pro desktop

      - [Pro jaké prohlížeče ladit svůj web](/prohlizece-optimalisace) – teoretická úvaha (trochu starší)