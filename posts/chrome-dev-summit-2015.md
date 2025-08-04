---
title: "Chrome Dev Summit 2015"
headline: "Chrome Dev Summit 2015"
description: "Výběr zajímavostí z konference Chrome Dev Summit 2015."
date: "2015-11-17"
last_modification: "2015-11-19"
status: 1
tags: ["Google", "Konference"]
---

[Chrome Dev Summit](https://developer.chrome.com/devsummit) je celkem zajímavá konference vysílaná živě na YouTube, kterou se vyplatí sledovat.

  Poznámky z minulého ročníku: [Chrome Dev Summit 2014](/chrome-dev-summit-2014)

Hlavní téma konference bylo jasné: **nahrazení nativních aplikací** pomocí **mobilních webů**.

Díky **ServiceWorkerům** je možné stále více a více vlastností typických pro nativní aplikace zajistit u **mobilní webové aplikace**.

## Mobilní webové aplikace

Díky rozšiřování funkčnosti webových prohlížečů se výrazně rozšiřují možnosti mobilních webových aplikací.

Velkou roli zde hraje **ServiceWorker** –  prostředník mezi prohlížečem a operačním systémem, který umožňuje, že se weby mohou chovat jako nativní aplikace:

  - Mohou fungovat offline.

  - Jde je připnout na hlavní obrazovku (*homescreen*).

  - Mohou posílat notifikace.

Webové aplikace, které se na podporovaných zařízeních chovají jako nativní, jsou označeny termínem **Progressive Web App**. Mohou obstojně fungovat i na starších zařízeních bez Service Workeru.

Jako ukázka, čeho je možné dosáhnout, může posloužit mobilní stránka [Flipkart.com](https://flipkart.com). Načítá se bleskurychle a dokáže i fungovat offline.

### Automatické vyplňování formulářů

Automatické vyplňování formulářů může o 25 % zvýšit šanci, že ho člověk vyplní.

## Připojení k internetu ve světě

Pořád je spoustu lidí na světě, kteří nejsou online. Například v Indii. Tito lidé se s internetem zpravidla nejdříve setkají z mobilního telefonu.

Zařízení používané v zaostalých zemích se značně liší výkonem a velikostí úložiště. Omezená velikost úložiště nahrává použití webové aplikace, která nepotřebuje instalovat desítky MB.

Většina mobilního přípojení je stále 2G.

1 vteřina prodlevy při načítání znamená 11 % méně zobrazení stránek a o 16 % menší spokojenost návštěvníků.

V Indii se cena 500 MB mobilních dat rovná 17 hodinám práce za minimální mzdu. Za hodinu práce za minimální mzdu si lze načíst 15 stránek.

Lidé tak několikrát denně **zapínají a vypínají svá data**.

Důležité je proto dostat návštěvníky na požadovanou stránku bez zbytečných překážek. Napomoci tomu může přidání webu na homescreen a notifikace, které vedou přímo na konkrétní obsah.

**PageSpeed Module** dokáže jediným řádkem kódu výrazně zrychlit webovou stránku, aniž by si toho návštěvník všiml.

`Save-data: on` – speciální režim, který lze zapnout v prohlížeči. Znamená, že je návštěvník náchylný na plýtvání daty.

Z JS vlastností `navigator.connection.type` a `navigator.connection.downlinkMax` jde zjistit typ a maximální rychlost připojení.

Díky ServiceWorkerům jde plynule přecházet mezi offline a online.

## Instalace webové aplikace

Lidem se moc nechce instalovat aplikace. Samotná instalace typicky trvá hodně času, bojí se nedostatku místa, ztráty soukromí apod.

Při hledání aplikace se většina lidí nedostane k jejímu použití. Mobilní webová aplikace může přinést lepší výsledky.

[Google](/google) navíc trestá stránky, které nabízejí ke stažení nativní aplikaci. Neoznačuje je ve vyhledávání jako [mobile-friendly](/google-mobile-friendly).

### Přidání na homescreen

Četnější používání webové aplikace jde docílit přidáním webu na plochu.

Chrome dokáže automaticky **nabídnout přidání webové aplikace na homescreen** při splnění následujících požadavků:

  - ServiceWorker,

  - TSL (zabezpečené připojení),

  - web manifest (soubor obsahující název aplikace, ikonu a podobně),

  - dvě návštěvy na 5+ minut

V případě nesplnění počtu návštěv jde stránku přidat na hlavní obrazovku alespoň ručně.

## Web manifest

Soubor pro deklarace názvu, barev a ikon webové aplikace. Připojuje se v hlavičce.

```
&lt;link rel="manifest" href="manifest.json">
```

### Typ zobrazení

  - `"display" : "standalone"` – zobrazení webové aplikace bez navigační lišty prohlížeče

  - `"display" : "fullscreen"` – zobrazení přes celou obrazovku bez horní systémové lišty

  - `"display" : "browser"` – zobrazení jako v prohlížeči

Typ zobrazení jde použít v `@media` pravidlech.

```
@media (display-mode: standalone) {
  /* zobrazení v režimu standalone */
}
```

### Orientace

  - `"orientation" : "portrait"` – standardní zobrazení na výšku

  - `"orientation" : "landscape"` – zobrazení aplikace na šířku, vhodné pro hry

### Úvodní adresa

Musí odpovídat ServiceWorkeru:

```
"start_url" : "/simple-demo/?home=true"
```

### Manifest generátor

Soubor manifest je možné vygenerovat:

    - [Manifest Generator](http://brucelawson.github.io/manifest/)

## HTTPS

Hlavní důvody (kromě soukromí) [proč přejít na HTTPS](/https) jsou:

  - soukromí a bezpečnost,

  - vložení nežádoucího obsahu (ze strany veřejné Wi-Fi apod.),

  - některé funkce vyžadují HTTPS (přístup ke kameře)

**Google** se snaží změnit chování prohlížeče v označování HTTP a HTTPS webů.

Nezabezpečená stránka se aktuálně zobrazuje neutrálně. To by se do budoucna mělo změnit.

Pro zjišťování problémů s HTTPS vznikla ve [vývojářských nástrojích](/vyvojarske-nastroje) záložka *Security*.

## Push notifikace

Zvyšují počet aktivních uživatelů.

Návštěvník si povolí posílání notifikací, takže až vyjde na webu nový článek, dostane upozornění přímo s odkazem.

Je rozumné posílat pouze **důležité a naléhavé** notifikace. Obtěžování uživatele notifikacemi povede k jejich celému zablokování.

**Žádost o zapnutí notifikací** by měla být zobrazena až ve chvíli, kdy návštěvník ví, co taková funkce bude dělat. Žádost o povolení notifikací by se tak neměla objevovat hned po načtení stránky.

Je dobré umožnit notifikace případně snadno vypnout v nastavení aplikace.

Neměly by být duplikované s nativní aplikací.

### Custom actions

V budoucnu bude možné přidávat do notifikací speciální akce.

## Web Bluetooth / Physical Web

Propojení webu s reálným světem.

Webová aplikace může komunikovat s hardwarem prostřednictvím technologie Bluetooth.

Zatím jde o experimentální funkci.

Kromě získávání informací ze zařízení typu měřič srdečního tepu nebo ovládání jiného hardware se nabízí další možnost:

### Vysílání URL

Usnadnit objevení adresy webové stránky v reálném světě. Současný stav, kdy je člověk na mobilu nucen ručně vyťukávat URL do adresního řádku, není úplně pohodlný.

Myšlenka je taková, že na určitém místě v reálném světě bude krabička, která bude jednosměrně vysílat URL (*URL beacon*). Tuto adresu půjde mobilním telefonem snadno zachytit a navštívit. Jedná se tedy v podstatě o pohodlnější náhradu [QRCode](/qr).

Tato funkce je dostupná v **mobilní Opeře**:

  - Dev.Opera.com: [Release the Beacons!](https://dev.opera.com/articles/release-the-beacons/)

## Udělení povolení

Webové aplikace mohou potřebovat technologie, které musí uživatel napřed povolit (notifikace, geolokace).

Povolení udělí velmi málo návštěvníků:

  - 6 % povolí geolokaci

- 17 % povolí notifikace

Problém je, že aplikace žádají povolení ve špatnou chvíli (například při načtení stránky). Pro maximální šanci získání povolení je dobré dodržet následující body:

  Žádost musí být dobře vysvětlená. Ideálně speciální stránkou s informacemi, proč jsou notifikace dobré / geolokace výhodná.

  Žádat o povolení pouze nezbytných věcí.

  Dát možnost povolení odvolat.

  - W3C: [Permissions API](https://w3c.github.io/permissions/)

  - Google Developers: [Permissions API for the Web](https://developers.google.com/web/updates/2015/04/permissions-api-for-the-web)

## Polymer

[Polymer](https://www.polymer-project.org/1.0/) je kolekce připravených elementů pro rychlé stavění aplikací.

V nové versi 1.0 je mnohem rychlejší.

## Novinky v DevTools

Řada lidí používá vývojářské nástroje pro návrh webů. V **Chrome** cítí, že tento trend bude pokračovat, takže vývojářské nástroje v **Chrome** mají poprvé v historii vlastního designera, který zlepšuje uživatelské rozhraní.

### Výběr barvy

Nový nástroj pro **výběr barvy**. Barva jde nabrat kapátkem přímo ze stránky nebo použít barevné schéma založené na barvách použitých na webu.

### Device mode

Device mode je [mobile-first](/mobile-first). Už se striktně nerozlišuje zobrazení mobil/desktop.

Při zobrazení náhledu stránky jde zapnout znázornění media-queries.

### Zkoumání animací

Nový nástroj pro zkoumání a upravování animací. Jde měnit rychlost nebo časování.

### Debugování JavaScriptu

Pro debugování JavaScriptu je možné vyčlenit ze zobrazovaného kódu frameworky. Zobrazují se potom pouze volání samotné aplikace.

### Layout Mode

**Layout Mode** je pokus o vytvoření WYSIWYG režimu upravování webu.

Vývojáři **Chrome** zjistili, že je nejčastěji potřeba měnit `padding`/`margin` – jde to tak prostým tažením myši.

## Web performance

Potřebná rychlost závisí na tom, co člověk dělá. Orientační vnímání rychlosti může vypadat nějak takto:

### Princip RAIL

  - **R**esponse – odezva do 100 milisekund se jeví člověku jako okamžitá.

  - **A**nimace s 60 FPS (16,67 ms) se jeví jako plynulé.

  - **I**dle time 50 milisekund. Operace v nečinnosti na pozadí.

  - **L**oad time do 1 vteřiny (nemusí jít o celou aplikaci, ale alespoň o její podstatnou část)

Důležitost RAILu se liší dle typu webu. U obsahového webu je důležitý hlavně *Load*.

U aplikací zase spíš *Response* a *Animation*:

### Animation

Plynulým animacím jde hodně pomoci používáním změny průhlednosti a transformací, které jsou šetrnější k [překreslování](/vykreslovani#prekreslovani), postupem FLIP (first, last, invert, play).

Při přechodu se nejprve nastaví cílový stav, transformací se vrátí do výchozí podoby a přehrání je tak pouze zrušení transformace.

Výhoda je v tom, že náročné operace se provedou ještě před tím, než začne samotná animace.

Dobré je také se vyhnout animacím během rolování, které je samo o sobě hodně náročná animace.

### Idle

Pomocí `requestIdleCallback` jde provádět úkony ve chvíli, kdy prohlížeč *nic důležitého nedělá*.

Hodí se pro věci, které nejsou nezbytné, např. různá měření a podobně. Potřebné úkony je dobré rozdělit do malých operací, které se stihnou provést do 50 milisekund.

### Load

Do 1 vteřiny pro opakované načtení. Při prvním načtení trvá dlouho samotné navázání spojení, DNS lookup apod.

Při opakovaném načtení je ideální už použít ServiceWorker, čímž jde docílit prakticky okamžitého načtení.

## HTTP/2

HTTP/1 je plné hacků, jak obejít zásadní problém – pomalé zpracovávání více požadavků zároveň.

Opakovaně se pro každý požadavek přenáší stejná data – typicky identifikátor session v [cookie](/cookies).

Používají se věci jako:

  - inline vkládání obsahu (např. [data URI](/data-uri)),

  - [sprite](/css-sprite) obrázků (spojení více obrázků do jednoho)

  - [spojování CSS a JS souborů](/slouceni-js-css) do jednoho

Výše uvedená snaha o snižování požadavků je s příchodem HTTP/2 antipattern:

  Změna jednoho ze spojených souborů invaliduje všechna data, která by se jinak mohla kešovat samostatně.

    Stahuje se i obsah, který není zrovna potřeba.

HTTP/2 si s hodně požadavky poradí.

### HTTP/2 PUSH

Server může poslat informaci se soubory, které budou potřebovat.

Není potom nejprve v HTML kódu najít externí styly a skripty, které se mají stáhnout, ale server může už při požadavku na `index.html` předat informaci, že se mají začít stahovat další soubory.

## Příští Chrome Dev Summit

Příští konference Chrome Dev Summit bude už za **6 měsíců**.