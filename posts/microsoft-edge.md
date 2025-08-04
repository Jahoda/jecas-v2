---
title: "Microsoft Edge"
headline: "Microsoft Edge"
description: "Jaký je nový nástupce Internet Exploreru – Microsoft Edge."
date: "2015-01-04"
last_modification: "2015-07-27"
status: 1
tags: ["Prohlížeče"]
---

Microsoft tradičně spojuje vydání nového **operačního systému** s vydáním nového prohlížeče. Obdobně je to u prohlížeče **Edge**, který vychází spolu s [Windows 10](/windows-10).

  Článek vyšel na serveru Lupa.cz:

    - [Microsoft Edge: připravte se na prohlížeč, který nahradí Internet Explorer](http://www.lupa.cz/clanky/microsoft-edge-pripravte-se-na-prohlizec-ktery-nahradi-internet-explorer/)

### Proč nové jádro?

Někdo by si mohl pomyslet, proč Microsoft tvoří v podstatě **nové vykreslovací jádro**, když by šel použít **Webkit** či jeho odnož **Blink** (používá **Chrome** a **Opera**).

Podle [vyjádření](http://blogs.msdn.com/b/ie/archive/2015/02/26/a-break-from-the-past-the-birth-of-microsoft-s-new-web-rendering-engine.aspx) Microsoftu se myšlenka použít **Webkit** zvažovala, nakonec prý ze dvou (oficiálních) důvodů byla zavržena:

  - Snížilo by to **rozmanitost a konkurenci**, která by mohla vést k ustrnutí vývoje.

  - V Microsoftu se domnívali, že jsou schopni vytvořit ze starého vlastního jádra Trident lepší výsledek než při použití Webkitu.

### Kompatibilita

Starší Internet Explorery nabízely pro funkčnost rozbitých starších webů tzv. **režim kompatibility**.

[Internet Explorer 11](/ie11) tedy kvůli tomu obsahoval celkem **6 vykreslovacích jader**.

Mezi jednotlivými jádry mohl přepínat **uživatel prohlížeče** i **tvůrce webu**.

Pro tvůrce webu k tomu sloužila `&lt;meta>` značka nebo hlavička `X-UA-Compatible`, kterou si šlo Internet Explorery přepnout do libovolné starší verse.

V hodnotě `X-UA-Compatible` byla shodou okolností už dříve k vidění hodnota *Edge* znamenající nejnovější (*krajní*) versi Internet Exploreru. Její uvádění se používalo pro **skrytí tlačítka** přepínajícího vykreslovací jádro do **kompatibilního režimu**:

```
&lt;meta http-equiv="X-UA-Compatible" content="**IE=edge**"> 
```

Rozsáhlé vysvětlení přepínání režimů je na StackOverflow:

    - StackOverflow: [What's the difference if X-UA-Compatible exists or not?](http://stackoverflow.com/questions/6771258/whats-the-difference-if-meta-http-equiv-x-ua-compatible-content-ie-edge-e)

Vzhledem k tomu, že velké množství zpravidla **intranetových systémů** vyžaduje prastaré Internet Explorery, i ve **Windows 10** bude kvůli kompatibilitě zůstávat obdoba **IE 11** se starými jádry Trident.

**Přepnutí do starého IE** půjde ale vynutit jen ze strany návštěvníka / administrátora vnitřní sítě. Přímo v nabídce prohlížeče *Edge* je volba „Otevřít v Internet Exploreru“.

Zároveň některé starší významnější weby, co by v Edge nefungovaly, mohou být automaticky přepnuty do režimu kompatibility.

„Optimalisovat“ z pohledu tvůrce webů pro **nový prohlížeč od Microsoftu** tím stylem, že se shodí do nižší verse, už tedy dál nepůjde.

### Dva prohlížeče ve Windows 10

Windows 10 pro desktop tedy budou obsahovat v dva samostatné prohlížeče:

  - Microsoft Edge – EdgeHTML (výchozí)

  - Internet Explorer – MSHTML

Microsoft Edge a Internet Explorer jsou ve Windows 10 dvě samostatné oddělené aplikace.

V mobilním operačním systému **Windows Phone 10** bude pouze Edge s velmi podobným jádrem jako desktopová verse.

  Microsoft Edge will be the only browser on Windows 10 phones - no Internet Explorer in that case.

  MSEdgeDev na [Twitteru](https://twitter.com/MSEdgeDev/status/596204249089847297)

## Budoucí aktualisace prohlížeče

Absence přímé čísla verse nasvědčuje tomu, že **Microsoft Edge** by mohl mít bližší **tempo updatů** k prohlížečům **Chrome**, **Opera** nebo **Firefox**.

Na novinky by se tak už nemuselo čekat roky.

Obdobou testovacích versí (Chrome Canary a Firefox Nightly) by měl být program [**Windows Insider**](https://insider.windows.com/), pomocí kterého budou dostupné novinky v prohlížeči dříve, než se dostanou do ostrého provozu.

Updaty pro *insidery* by mohly vycházet [2× za měsíc](https://twitter.com/morris_charles/status/596395467476369408).

Nějaký pevný plán updatů prý ale v Microsoftu nemají.

## Podpora webových standardů

Microsoft zveřejňuje přehled všech **novinek s aktuálním stavem** (hotovo, ve vývoji, zvažováno, zavrženo a podobně), který se pořád mění. **Aktuální stav** je na následující adrese:

      [Platform status](http://dev.modern.ie/platform/status/) – přehled jednotlivých věcí a stav implementace v ME

### Názory uživatelů

Vývojový tým Edge je otevřený i k nápadům uživatelů. O prvcích, které by se měly do prohlížeče přidat, je možné hlasovat.

**Gesta myší** tedy v prohlížeči [zatím nebudou](https://windows.uservoice.com/forums/285214-microsoft-edge/suggestions/7384336-please-add-support-for-native-mouse-gestures-simi).

    - [Microsoft Edge – Suggestion Box](https://windows.uservoice.com/forums/285214-microsoft-edge)

## Testování v Microsoft Edge

Pro webové tvůrce je **MSE** další prohlížeč s očekávaným významným **tržním podílem** – bude tedy nutné pro něj weby ladit.

Microsoft Edge nativně funguje **pouze na Windows 10** – tedy [nepůjde](http://dev.modern.ie/platform/faq/win81) nainstalovat do starších **Windows 7 nebo 8.1**, protože počítá s funkcemi Windows 10, jako je třeba **Cortana**, a je postaven na *Universal Windows Platform*, která je nekompatibilní se staršími Windows.

Rozšíření na **další platformy** jako je Linux, OS X a další není v plánu.

  No other platforms currently planned - right now we're all working hard to ship it on Windows 10

  MSEdgeDev na [Twitteru](https://twitter.com/MSEdgeDev/status/596203030644592640)

Vývoj podílu starého prohlížeče **Internet Explorer** a nového prohlížeče **Edge** bude zajímavé sledovat. **Bezplatný upgrade** z Windows 7 a Windows 8.1 na Windows 10 by mohl znamenat, že se Edge rychle stane nejpoužívanější prohlížečem od Microsoftu.

Testovat Edge mimo **Windows 10** by mohlo do budoucna jít přes cloudové řešení **Azure RemoteApp**, které fungovalo už pro **IE 11**:

    - [Samostatný Internet Explorer 11](/remote-ie) – pomocí Azure RemoteApp

Rovněž jde pro testování použít například placenou službu [BrowserStack](https://www.browserstack.com/), která **Microsoft Edge** (mimo hromady dalších prohlížečů) nabízí.

## Vývojářské nástroje

Nástroje pro vývojáře jsou vzhledem hodně podobné **IE 11**. Obsahují ale řadu zlepšení:

    - [Announcing the latest improvements for the F12 developer tools in Windows 10](http://blogs.windows.com/msedgedev/2015/07/21/announcing-the-latest-improvements-for-the-f12-developer-tools-in-windows-10/)

## Hlavička `user-agent`

Identifikace prohlížeče v případě desktopu:

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135  Safari/537.36 Edge/12.&lt;OS Build #>
```

Na mobilech potom:

```
Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; DEVICE INFO) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.&lt;OS Build #>
```

Protože řada webů používá/používala tuto hlavičku pro **servírování odlišných stylů nebo skriptů** pro různá koncová zařízení, je historicky zanesena spoustou balastu sloužící k **projití detekčními skripty**.

    - [Podoba hlavičky user agent](/ua#podoba) – vysvětlení podoby *user-agenta*

## Flash, Silverlight a Java

Prohlížeč *Edge* přestane podporovat objekty **Silverlight a Java**, kromě toho také *ActiveX*.

Podpora **Flashe** z důvodu jeho velkého rozšíření bude zachována. Microsoft chce dál úzce spolupracovat s Adobe a aktualisovat Flash přes **Windows Update**.

Zapnout nebo vypnout Flash jde jednoduše v nastavení. Výchozí stav je *zapnuto*.

### Nastavení „Do Not Track“

V nastavení jde zapnout/vypnout i Do Not Track.

Myšlenka **Do Not Track** je taková, že prohlížeč pošle provozovateli webu hlavičku, že si **nepřeje být sledován** a ten ho **nebude sledovat**. V praxi se tím mnoho webů neřídí, protože by se tak připravily o zajímavá data ohledně chování návštěvníků.

Tato volba je v prohlížeči *Edge* ve výchozím nastavení **vypnuta**.

## Podpora rozšíření

Jediná momentální rozšíření jsou **Flash** a plugin pro **zobrazování PDF**.

V nějakém budoucím updatu by Mirosoft Edge měl nabízet **JavaScriptová rozšíření** podobná ostatním prohlížečům.

## Uživatelské rozhraní

Rozhraní je maximálně **minimalistické** a v plochém stylu – podobně jako další aktuální aplikace Microsoftu (např. [Office 2016](/office-2016)).

Tento obrázek zachycuje v kompletní podobě rozhraní. Rozhraní je **responsivní**, takže jde i takto zúžit a pořád jsou na něm všechny ovládací prvky viditelné.

### Stavový řádek

Trochu nestandardní je absence **stavového řádku** – po najetí myší na odkaz tak **není vidět, kam vede**. Jediná možnost je si ho zkopírovat a vložit někam jinam.

V dnešní době, kdy se čím dál víc odkazů **obsluhuje JavaScriptem** a stejně není záruka, že odkaz přejde na adresu ze stavového řádku, to asi není zase takový problém.

Naopak to eliminuje situaci, kdy se uživatel **dostane někam jinam**, než mu stavový řádek tvrdil.

### Nabídka/menu

Menu se zobrazuje po kliknutí na vodorovné *kebab menu*  a neukrývá žádnou hromadu funkcí.

Netradiční jsou v zásadě jen dvě položky:

  - **Share** – otevře boční panel s možnostmi sdílení

  - **Open with Internet Explorer** – zobrazí stránku ve starém „MSHTML režimu“ (tedy otevře samostatnou aplikaci Internet Explorer)

Minimalismem se vyznačují i další nabídky, třeba po kliknutí pravým tlačítkem na odkaz se zobrazí jen 3 možnosti:

## Nové funkce Microsoft Edge

### Cortana

Po označení textu (např. **Microsoft**) a kliknutí **pravým tlačítkem** je k disposici příkaz **Ask Cortana**.

Cortana je jakýsi **virtuální asistent**, který se snaží lidským způsobem odpovídat na dotazy.

Po volbě *Ask Cortana* se tak pokusí dohledat informace o **vybraném slově nebo spojení** v bočním panelu. To je o hodně pohodlnější než **zobrazování výsledků hledání slova v nové záložce**, protože nikam nezmizí původní stránka.

Když se to povede, Cortana rovnou zobrazí informace o hledaném spojení. Není se tedy potřeba proklikávat výsledky hledání.

Cortana dokáže dohledat i **význam slova**. Příklad při hledání slova *porn*:

Jde dokonce i hledat Cortanu Cortanou:

Když Cortana nedokáže obdobnou odpověď připravit, zobrazí se běžné **výsledky hledání z Bingu**.

### Zvýraznění na stránce

Další inovativní funkce nabízí **zvýrazňování na webových stránkách**, která funguje podobně jako aplikace *Výstřižky* ve Windows. Tato funkce se označuje jako *Web Note*.

Aktivuje se ikonkou tužky , načež se zobrazí místo ovládacích prvků prohlížeče lišta se zvýrazňovači:

Výsledek jde následně uložit nebo sdílet.

### Režim nerušeného čtení

Tuto funkci budou znát hlavně uživatelé **Window Phone** a vestavěného **mobilního Internet Exploreru 11**. Anglicky se jmenuje *Reading view*.

Hodí se u stránek, které jsou **špatně čitelné** (malé písmo, špatný kontrast, příliš dlouhé řádky a podobně).

Po zapnutí tohoto režimu ikonou knížky  se obsah stránky překlopí do unifikovaného vzhledu:

Tento vzhled lze navíc lehce modifikovat v nastavení.

Využít režim pro čtení **není možné vždy**. Nezobrazuje se v případě, že prohlížeč o stránce usoudí, že je čitelná dobře, nebo **nevypadá jako článek** (třeba hlavní stránka blogu).

Podobnou funkci dokáží nezávisle na prohlížeči zajistit služby jako [Readability](https://readability.com/) či [Pocket](https://getpocket.com).

### Záložky a k přečtení

Zajímavý je nápad rozdělit záložky na část pro **stránky k pozdějšímu přečtení** – *Reading list*.

Stránky k přečtení najdou užitečné uplatnění spolu se **synchronisací** mezi více zařízeními. Kdy by mělo jít si například stránku přidat na desktopu a mít ji dostupnou v prohlížeči ve **Windows Phone**.

U stránek k pozdějšímu přečtení se kromě názvu (titulku) ukládá i **náhledový obrázek**.

Obrázek stránky neumí Microsoft Edge chytře **automaticky vytáhnout ze stránky**, ale potřebuje k tomu postrčit *Open Graph* `&lt;meta>` značkou, která se běžně používá i pro Facebook a další sociální sítě.

```
&lt;meta property="og:image" content="obrazek.png">
```

### Sdílení

Uživatel s prohlížečem Microsoft Edge nepotřebuje, aby na stránce byla [sdílecí tlačítka](/sdileci-tlacitka). Po zvolení volby *Share* se objeví boční panel se seznamem nainstalovaných aplikací, které jde pro sdílení použít.

## Odkazy a zdroje

  - [Microsoft Edge Dev Blog](http://blogs.windows.com/msedgedev/) – oficiální blog tvůrců prohlížeče

  - [Často kladené otázky](http://dev.modern.ie/platform/faq/) – nejčastější dotazy ohledně nového prohlížeče

  - [Otázky na MS Edge na Twitteru](https://twitter.com/hashtag/AskMSEdge?src=hash) – tým MSE odpovídá na Twitteru

  Políčka `&lt;input>` pro zadávání kalendářních dat

    Pro výběr data, měsíce nebo týdnu už není potřeba kalendář v JavaScriptu.

      - `&lt;input type='date'>`

      - `&lt;input type='month'>`

      - `&lt;input type='week'>`

  `&lt;img srcset>`
  
    Hodí se pro responsivní obrázky, kdy jde prohlížeči nabídnout více zdrojových souborů, aby se mohl vybrat ten nejvhodnější.

  GamePad API
  
    Podpora **[GamePad API](/gamepad)** – umožňuje ovládání webu USB ovladačem.

-->