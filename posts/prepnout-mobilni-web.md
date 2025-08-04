---
title: "Přepnout na mobilní/desktopový web"
headline: "Přepnout mobilní/desktopový web"
description: "Jak přepnout mezi desktopovým a mobilním webem. Má to vůbec smysl?"
date: "2015-12-09"
last_modification: "2015-12-10"
status: 1
tags: ["Rady a nápady", "Responsivní design"]
---

U responsivního webu je běžné, že na mobilu není možné vidět jeho plnou desktopovou podobu, ale pouze responsivní versi pro malé rozlišení.

Některým lidem to může vadit:

  Co jsem udělal u responsivního designu při pohledu na mobilu? Zakomentoval řádek na responsivitu! Já fakt ty mobilní verze nenávidím.

  – Jan Horák na [Twitteru](https://twitter.com/domainsworld/status/674620474257768448)

## Kdy responsivní vadí?

Někomu se může zdát divné, že existují lidé, kteří dají přednost desktopovému vzhledu, když je stránka přizpůsobena pro malé displeje.

Stává se to hlavně v následujících případech:

    **Zvyk** – návštěvník je zvyklý používat daný web z počítače. Při jeho zobrazení na mobilu si na responsivní podobě připadá jako na jiných stránkách, protože najednou všechno vypadá a ovládá se jinak.

    **Chybějící obsah** – někteří tvůrci webů části obsahu na mobilech natvrdo skrývají.

    Pokud se nejedná o reklamy, zákon schválnosti zajistí, že při [převádění desktopového webu na responsivní](/prevod-responsivni-design) a skrývání obsahu pro mobil se skryje zrovna něco, co návštěvník chce.

    Ideálně by se proto nic skrývat nemělo. Tohle je problém i kvůli [vyhledávačům](/seo), protože ty nechtějí posílat návštěvníky na weby, kde hledaný obsah nakonec nebude viditelný.

        [Google a skrytý text](/skryty-text) – postoj Googlu ke skrytému textu

    **Odbyté zobrazení** – řada součástí velkých desktopových webů je obtížně převoditelná pro malé obrazovky. Typický příklad jsou třeba tabulky, které se řeší dost krkolomně.

        [Responsivní tabulky](/responsivni-tabulky) – všechny možné postupy, co udělat s tabulkou na mobilech

    Zvlášť v kombinaci se zvykem může být nedostatečně promyšlené zobrazení na malých obrazovkách důvodem k zavržení responsivního vzhledu.

    Tomuto problému jde předcházet [mobile-first](/mobile-first) postupem, kdy se obsah navrhuje nejprve pro malá zařízení.

    **Plýtvání místem** – majitelé mobilního přístroje s velkým displejem a dobrým zrakem nemusí mít problém s lehce odzoomovanou desktopovou podobou stránky ani na mobilu.

    Při zobrazení na šířku je řada desktopových webů relativně pohodlně čitelná.

    Protože lidé mají zrak různý a mobil používají v různých vzdálenostech od očí, může být řešením nastavitelná velikost písma. Docela hezky to vyřešili programátoři na iDNESu:

    Pokud web na mobilu plýtvá místem, motivuje to návštěvníka k desktopovému vzhledu.

    Je dobré se slepě nedržet break-pointů mobil – tablet – desktop (míst, kde se změní rozložení webu). Ale upravovat rozložení v závislosti na tom, jak se vejde do daného prostoru.

    I na malé šířce mobilů držených „na výšku“ může někdy mít smysl použít vícesloupcové zobrazení.

## Proč responsivní

Z bodů výše by se mohlo zdát, že responsivní podoba stránky nemusí být potřeba.

Tak to ale není.

Kromě skupiny lidí, kterým responsivní weby vadí, existuje ještě početnější skupina, které **vadí neresponsivní desktopové stránky na mobilu**.

  Hodně lidí z webu neoptimalisovaného pro mobil rovnou uteče.

Ze statistik jednoho webu před časem vyplynulo, že na mobilech má responsivní podoba stránky přibližně 2× nižší míru okamžitého opuštění, než měla desktopová varianta.

Vyhledávač [Google](/google) si kvůli tomu pohrával s označeních stránek [„mobile-friendly“](/google-mobile-friendly) ve výsledcích hledání.

## Zapnout/vypnout responsivitu

V případě, že pro web platí některý z bodů, kdy responsivní web vadí, nabízí se přidat přepínač, který responsivní zobrazení vypne.

Přidat tuto možnost není příliš složité.

Pro zapnutí „desktopové verse“ na mobilech stačí odstranit značku 
  [`&lt;meta name=viewport>`](/meta-viewport):

```
&lt;meta name="viewport" content="width=device-width,initial-scale=1">
```

Mobilní prohlížeč tak bude simulovat větší šířku a stránka se zobrazí podobně jako na desktopu.

Přepnutí přidáváním/odebíráním `&lt;meta>` značky jde provádět JavaScriptem bez nutnosti obnovit stránku:

    - [Živá ukázka](http://kod.djpw.cz/zrsb-) – zapnutí/vypnutí responsivního webu

Tento postup **nejde použít u desktopových prohlížečů**. Ty se ke značce `viewport` chovají jinak. Výše uvedená ukázka proto na desktopu *nic nedělá*.

Pro uložení nastavení se potom hodí použít [cookies](/cookies) a při opětovném načtení stránky příslušnou podobu `&lt;meta name=viewport>` vygenerovat na straně serveru.

  Přepínání bez obnovení stránky **na mobilních zařízeních** z [ukázky](http://kod.djpw.cz/zrsb-) nemám moc otestované. Budu moc rád, když to vyzkoušíte a dáte mi vědět do komentářů s informací o prohlížeči/OS.

    Při testování jsme narazili na problém v mobilním **Firefoxu**, kde přepínání `viewport`u JavaScriptem neprobíhá korektně.

  Děkuji.

### Nastavení pevných rozměrů

V ukázce se pro zrušení přizpůsobování velikosti stránky šířce zařízení (`width=device-width`) nepoužívá nastavení větší šířky v pevných rozměrech pomocí pixelů.

Je to z toho důvodu, aby si prohlížeč šířku sám určil dle svého uvážení.

### Přepnutí na desktopu

Je otázka, jestli existuje reálná potřeba při úzkém okně na desktopu vypnout responsivní versi.

V takovém případě jde použít třeba postup, který popsal [**habendorf**](http://www.1-webdesign.cz/) (nejlepší kodér, co znám):

  Řešil jsem to dvěma CSS soubory, základním a „mobilním“ (záměrně v uvozovkách), přičemž ten „mobilní“ se na nějaký `onclick` zakazoval/povoloval.

Jiné řešení je přidat před všechny deklarace pro zobrazení mimo desktop speciální třídu, kterou potom půjde přepínat pro `&lt;html>`/`&lt;body>`. Zvýší to ale sílu [selektorů](/css-selektory), na to je třeba dát pozor.

## Kam umístit přepínání

Nejčastěji bývá tlačítko pro přepnutí umístěno na konci stránky u patičky, takže asi tam.

## Vypnutí mobilního zobrazení v prohlížeči

Většina mobilních prohlížečů má v sobě funkci pro přepnutí mezi desktopovým a mobilním zobrazení.

Mobilní [**Edge**](/edge-mobile) ve **Windows 10 Mobile**:

Obdobné nastavení mají i prohlížeče na jiných platformách.

Problém tohoto nastavení je ale v tom, že pouze mění hlavičku [`user-agent`](/ua), aby pro automatické detekce nevypadala jako z mobilu.

Změna nastavení tak zafunguje u webů, kde se používá detekce mobilů a [přesměrování na mobilní subdoménu](/mobilni-web-url) nebo servírování různého obsahu podle detekce.

Na **responsivní design** vytvořený pouze změnou CSS a `@media` pravidly to nemá vliv. To je trochu škoda, ale nejspíš s tím nejde rozumně nic moc dělat.

Přidávat `&lt;meta name=viewport>` na základě detekce *user-agenta* není tak spolehlivé, navíc lidí, kteří toto nastavení znají a používají, bude nejspíš velmi málo.