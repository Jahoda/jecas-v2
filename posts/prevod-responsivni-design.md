---
title: "Jak předělat web na responsivní"
headline: "Převod webu na responsivní design"
description: "Jak webovou stránku co nejlépe a nejjednodušeji převést do responsivní podoby."
date: "2015-04-20"
last_modification: "2015-04-21"
status: 1
tags: ["Hotová řešení", "Responsivní design"]
---

Při **navrhování nového webu** je dobré myslet na to, že si stránku budou moci prohlížet návštěvníci na širokém spektru velikosti obrazovek.

  - Běžný rozsah rozlišení v roce 2015 se pohybuje někde okolo **320 až 2560 pixelů**.

  - Návštěvníci navíc používají obrovské množství **různých konkrétních rozlišení**. Jen za poslední týden na tomto webu [Google Analytics](/ga) naměřil **180 různých rozlišení** obrazovky.

Co ale dělat, když je potřeba předělat již existující web s fixním layoutem do **responsivní podoby**?

## Fixní layout a breakpointy

V dřívějších dobách bylo poměrně běžné, že se místo jednoho layoutu (rozvržení webu) s pevnými rozměry vytvořila další dvě rozvržení:

  - **layout pro mobily** (v šířce například 320 nebo 480 pixelů),

  - **rozvržení pro tablety**

Pomocí CSS [pravidla `@media`](/mobilni-web#media-queries) se vytvořily tzv. *breakpointy* – hodnoty šířky obrazovky, kdy se aplikují odlišná CSS pravidla.

Takový přístup umožňoval vytvoření **na pixel přesného designu** (anglický termín: *pixel-perfect*), protože všechny rozměry jsou zadány v pixelech. Na druhou stranu pokryl jen úzkou skupinu používaných rozlišení.

Třísloupcové pevné rozvržení stránky vypadá typicky následovně:

## Pružný layout

S ohledem na různá používaná rozlišení se zdá být výhodnější rozvržení, které se odvíjí od aktuální dostupné velikosti plochy, kde se může stránka zobrazovat (tzv. *viewport*).

Takový typ layoutu se obvykle označuje jako **pružný, gumový, elastický, procentuální, dynamický** a podobně.

Od fixního se liší tím, že se zadávají pouze **poměry rozměrů** jednotlivých sloupců. Pokud bude mít obal těchto sloupců nastavenu pevnou šířku, výsledek bude naprosto totožný jako v předchozím případě.

Zajímavé věci se začnou dít, když se poslední **fixní šířka** odstraní – layout se bude přizpůsobovat šířce okna, aby ji za každé okolnosti vyplnil, ale nevytvořil vodorovný posuvník.

Při zúžení okna z 1000 na 850 pixelů se celé rozvržení chytře přizpůsobí.

### Maximální šířka

Protože s ohledem na [délku řádku textu](/responsivni-web#typografie), která je ještě pohodlně čitelná (např. 80 znaků/řádek), je zbytečné na FullHD monitoru (1920 px na šířku) využít celý prostor, **maximální šířka** celého webu se nějak omezuje.

Slouží k tomu CSS vlastnost `max-width`. Maximální šířka se většinou zadává v pixelech, ale lepší je použít `em` jednotky, protože potom bude rozměr správně reagovat na případné **zvětšení písma** ze strany uživatele.

    - [Proč nepoužívat pixely](/responsivni-web#px) – vysvětlení + nástroj pro přepočet `px` na `em`

### Minimální šířka sloupců

Stejně jako je vhodné omezit maximální šířku, taktéž naopak **minimální** šířka je potřeba. V opačném případě by z třísloupcového layoutu na malé obrazovce mobilního telefonu vznikly jen **tři úzké nudle**, kam by se obsah těžko vměstnal.

Řešení je postupně (již pružnou) stránku zužovat a v momentě, kdy je obsah ve sloupcích už příliš nalepený, přidat **breakpoint** pomocí pravidla `@media`, kterým se počet sloupců sníží.

    - [Responsivní CSS mřížka](/responsivni-mrizka) – proměnlivá změna počtu sloupců a šířky na základě rozlišení

V daném breakpointu se zvedne procentuální šířka sloupců, což je odsune pod sebe (na obrázku se už třetí sloupec nevejde, takže se posune pod).

A následně se skončí jednosloupcovou variantou přes celou šířku u nejmenších zařízení (obrázek nerespektuje měřítko).

Pouhé **přeskládání obsahu pod sebe**, ale nemusí být ideální. Proč a co s tím udělat je popsáno dále v článku…

## Vytvoření responsivního designu v praxi

V praxi potom převod fixního layoutu na responsivní vyžaduje následující.

### Nastavit `viewport`

Pro mobilní zařízení je nutné vložit do hlavičky stránky [`&lt;meta>` značku `viewport`](/meta-viewport), která mobilnímu prohlížeči řekne, že se stránka chce přizpůsobovat skutečné šířce. Aby totiž **ne**responsivní stránky na mobilech jakž takž fungovaly, mobilní prohlížeč pro ně simuluje větší rozlišení a potom stránku zmenší.

Použití *viewportu* toto chování zruší.

```
&lt;meta name="viewport" content="width=device-width">
```

### Používat okrajový box-model

Při používání rozměrů v procentech je praktičtější „okrajový“ [box-model](/box-model). Není při jeho použití problém **kombinovat rozměry v procentech** třeba s jednotkou `em` nebo `px`. Jednomu elementu tak půjde nastavit šířku, `padding` a rámeček v různých jednotkách, protože odsazení (`padding`) a rámeček (`border`) se nepřičítají k rozměrům elementu.

Přepnout box-model na `border-box` u všech elementů na stránce jde přidáváním tohoto předpisu do CSS:

```
*, 
*:after, 
*:before {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
```

Problém s mícháním jednotek teoreticky řešit počítáním pomocí [`calc`/`-webkit-calc`](/calc), použití okrajového (`border-box`) modelu je ale jednodušší.

Navíc `calc` nepodporuje **IE 8**, stará **Opera 12**, **Android Browser 4.3** a **Opera Mini**.

### Odstranit pevnou šířku

Jelikož se stránka má ve finále vejít i na obrazovku mobilu s kratší stranou o šířce 320 pixelů, všechny předpisy „`width: 321px`“ a širší musí jít z CSS pryč.

Pokud se **blokovému elementu** šířka nenastaví (a není [floatovaný](/float)), roztáhne se přes celou dostupnou plochu. Někteří tvůrci CSS toto pravidlo neznají (nebo se jím neřídí), takže je možné pozorovat i zbytečné nastavení šířky vnitřního elementu na stejnou hodnotu jako má jeho rodič.

```
&lt;div style="width: 500px">
  &lt;div style="**width: 500px**">
  &lt;/div>
&lt;/div>
```

Hodně vlastností `width` je tak možné z kódu odstranit. V případě, že by roztažení přes celý dostupný prostor vedlo k moc velké šířce, stačí přepsat `width` na `**max-**width`.

Typicky se `max-width` používá pro omezení šířky celého obalu, vnitřní rozměry jsou potom v procentech.

### Sloupce převést do procent

Při převádění (zpravidla obtékaných) sloupců do procent je potřeba především **kalkulačka** a základní znalost počítání s procenty. Nebo použít tento přepočítávací nástroj:

    Sloupec 1:  px

    Sloupec 2:  px

    Sloupec 3:  px

    25 %
    50 %
    25 %

**Pozor na margin**!

V případě, že se používá okrajový box model a při převodu na procenta se sloupce vedle sebe nevejdou, nejspíš bude příčinou **odsazení** – vlastnost [`margin`](/margin) – je nutné tuto vlastnost odstranit/vynulovat a odsazení realisovat **vnořeným elementem** nebo `margin` zadat v procentech a jeho rozměr odečíst od šířky (rovněž v procentech). Zkrátka šířky + odsazení se musí vejít do 100 %.

### Obrázky, videa, iframe, objekty

Typem prvků, které se nemusí vejít do responsivní podoby stránek, jsou prvky, které se i bez zadání `width` nemusejí na malou obrazovku vejít.

Rychlé řešení je přidat do CSS:

```
img, iframe, canvas, video, svg {
  max-width: 100%;
  height: auto;
}
```

Zajistí se tím „nerozbití layoutu“, ale optimální postup to úplně není. Pro nižší rozlišení by například mohl stačit **zmenšený a datově úspornější obrázek**. Bohužel s ohledem na zpětnou kompatibilitu a chování prohlížečů není k disposici úplně elegantní řešení. Navíc je v takovém případě nutné nějak generovat různé velikosti obrázků.

    - Martin Michálek: [Picturefill](http://www.vzhurudolu.cz/prirucka/picturefill) – technika řešení responsivních obrázků

Je otázka, zda rozumná **podpora v koncových zařízení** (prohlížeče, roboti vyhledávačů) přijde dřív než doba, kdy nebude tolik nutné řešit pár desítek ušetřených kilobytů.

### Formulářové prvky

Nevejít do 320 px se mohou i formulářové prvky – [`&lt;input>`](/input) nebo [`&lt;textarea>`](/textarea). Řešení je opět `max-width` a dát si pozor na případný `margin`.

```
input, textarea, select {
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
}
```

### Obrázková grafika

Velkou překážkou je grafický návrh webu sestávající z **velkého množství obrázkové grafiky**, kterou je s proměnlivými rozměry často obtížné skloubit.

Jde ale využít možnosti CSS ([kulaté rohy](/border-radius), [stíny](/box-shadow), [gradienty](/gradient), [průhlednost](/opacity)), které v době vytváření původního fixního layoutu nebyly dostatečně podporované, a nahradit těmito CSS postupy značné množství grafiky.

### Tabulky

Úplně největší oříšek jsou HTML tabulky, které obsahují **hodně obsahu** nebo mají **hodně sloupců**.

Rychlé řešení je tabulku „rozlámat“ změnou vlastnosti [`display`](/display). Může se ale stát, že to znemožní její čitelnost (jednotlivé buňky budou pod sebou dle pořadí v HTML kódu).

Pro **Internet Explorer 9** nestačí použít `display: block`, ale rozlomení buněk tabulky zajistí až `float`.

Mobilní varianta **IE 9** se nachází ve Windows Phone 7, který ve starších telefonech již nejde updatovat na WP 8 s **IE 11**.

Finální řešení je tedy následující ([ukázka](http://kod.djpw.cz/yqmb)).

```
@media screen and (max-width: 600px) {
  /* rozlámání tabulek */
  td, th, tr, thead, tbody, tfoot {
    float: left;
    width: 100%;
  } 
}
```

Prakticky neřešitelné jsou potom tabulky se **sloučenými buňkami** (HTML atributy `colspan`/`rowspan`). Takové je buď nutné kompletně předělat, nebo alespoň obalit elementem s `overflow-y: auto`, což umožní se k celému obsahu tabulky vodorovně dorolovat, aniž by se roztáhla celá stránka.

```
.overflow {
    overflow-y: auto;
}
```

    - [Responsivní tabulky](/responsivni-tabulky) – různé způsoby, jak si poradit s tabulkami na mobilech a tabletech

### Velikost písma a prvků

Tlačítka nebo odkazy, co jde pohodlně trefit **myší**, nemusí být dostatečně velká pro **ovládání prsty**.

  Google uvádí doporučení, že ovládací prvek by měl být velký alespoň 48 × 48 pixelů (cca 7 × 7 milimetrů ve skutečnosti), aby šel snadno trefit průměrně velkým prstem.

U některých méně důležitých ovládacích prvků stačí rozměry menší, v tom případě by ale mělo být mezi nimi větší horisontální a vertikální odsazení. Google tento odstup stanovuje na 32 pixelů (5 mm) oběma směry.

— [Dotykové prvky jsou moc blízko](/oprava-chyb-pouzitelnosti#dotykove-prvky)

Velikost písma je nejjednodušší **globálně vůbec nenastavovat** a ponechat výchozí, což je většinou **16 pixelů**. A pouze zvětšit nadpisy nebo důležitý text – jde k tomu použít třeba procenta.

Případně místy zmenšit méně podstatný text.

## Skrývání obsahu

Protože pouhé přeskládání několika-sloupcového rozložení do **jedné úzké nekonečně dlouhé nudle** není z hlediska pohodlného procházení webu úplně ideální postup, může se nabízet některé prvky stránky úplně skrýt.

### Úplné skrytí obsahu

```
.nedpostatny-box {
  display: none;
}
```

A je to. Nebo ne?

Problém **trvalého skrývání obsahu** je větší, než se může zdát.

  Zákon schválnosti zajistí, že návštěvník bude hledat zrovna ten obsah, co se **jako nepodstatný skryl**. Vzhledem k tomu, že responsivní podobu webu většinou není z mobilu snadné „vypnout“, bude nemožnost dostat se k obsahu „který tam na počítači byl“ značně nepříjemná.

    Skrývání obsahu není úplně **vhodná praktika vzhledem k vyhledávačům**. Z pohledu návštěvníka není situace, kdy mu vyhledávač obsah najde, ale na stránce potom není ihned vidět, dvakrát dobrá.

    [Google](/google) kvůli tomu i snižuje váhu obsahu, který je skrytý, byť jde odkrýt.

        - [Google a skrytý text](/skryty-text)

### Tlačítka pro zobrazení obsahu

Co tedy s tím? Vytvořit onu kilometr dlouho mobilní stránku není žádoucí. Zbývá proto méně špatná varianta – ne tak důležité části stránky **skrýt za tlačítka**, která budou obsah zobrazovat/skrývat.

Před procesem skrývání si je nutné rozmyslet, které prvky na stránce jsou ty **nejdůležitější** – tj. by měly být ihned viditelné a pokud možno hned na začátku stránky.

Pro technické řešení stačí troška JavaScriptu.

    - [Skrývání a odkrývání textu](/zobrazit-skryt)

    - [Plynulé rozbalení obsahu](/rozbaleni) – obsah se může rozkrýt i postupně plynulou změnou výšky

    - [Responsivní navigace](/responsivni-menu) – různé řešení navigace schované do tlačítka

## Rychlost

Ačkoliv **rychlost načítání** není podmínkou pro funkční responsivní layout webu, z mobilních zařízení se častěji připojují lidé s pomalejším připojením k internetu. Je tedy dobré, když už responsivní web existuje, aby se také uživatelům načetl v rozumné době.

Odhalit nedostatky v rychlosti načítání a navrhnout opravy umí online nástroj [Google PageSpeed Insights](http://developers.google.com/speed/pagespeed/insights/).

## Testování mobilního webu

Pro zběžné otestování formální použitelnosti stránky v mobilech existuje test od Googlu:

    - [Test použitelnosti v mobilech](https://www.google.com/webmasters/tools/mobile-friendly/)

Projít tímto testem je užitečné, protože Google [označuje stránky vhodné pro mobil](/google-mobile-friendly) ve výsledcích hledání, což může přinést **vyšší míru prokliku** u vyhovujících stránek. Z praktického hlediska ale „zelená hláška“ zase tolik nezaručuje.

### Je potřeba pro testování několik mobilů a tabletů?

K testování responsivního webu z velké části stačí běžný počítač. Mobilní prohlížeče používají velice **podobná vykreslovací jádra** jako „velké“ prohlížeče.

Menší obrazovku jde potom snadno nasimulovat zmenšením okna prohlížeče.

**Chamurappi** (vládce [Webylonu](http://webylon.info)) doporučuje pro testování na desktopu **používat zoom**.

  Na desktopu jsou lidé zvyklí ladit bez zoomu, mobilní prohlížeče jsou de facto přizoomované vždy. Podle mě je vhodné na desktopu natáhnout okno na šířku 640 nebo 960 pixelů a nastavit 200% zoom – to je přesnější reprezentace toho, jak stránka v mobilu funguje, než když prohlížeč simuluje třistadvacetipixelové okénko.

  Chamurappi

Ve [vývojářských nástrojích](/vyvojarske-nastroje) v **Chrome** je navíc k testování na mobilních zařízeních funkce **Mobilní zobrazení**. Zapíná se ikonkou telefonu.

Tento nástroj v **Chrome** dokáže navíc emulovat dotykové události [`ontouch*`](/udalosti-mysi#dotykove), nastavovat rychlost připojení, měnit hlavičku *User agent*, měnit hustotu pixelů, nebo nastavit rozlišení dle některých populárních mobilů a tabletů.

V některých situacích se ale web na skutečném fysickém zařízení může chovat trochu jinak. Navíc prohlížení webu na malém zařízení a ovládání prsty se dost liší od emulace pomocí myši na velkém PC. Rozhodně je tedy užitečné si stránku zkusit **používat i na skutečném mobilu**.

Jde tak třeba zjistit, že často používané ovládací prvky jsou špatně dostupné nebo příliš malé a podobně.

Opatřit si **zařízení pro testování** nemusí být úplně nákladná záležitost. Není k tomu potřeba nejvýkonnější model telefonu/tabletu, ale naopak se docela hodí slabší HW, což může tvůrce přimět příliš neplýtvat systémovými prostředky. Dále potom stačí zařízení z druhé ruky a ani nemusí být plně funkční – zpravidla je potřeba hlavně funkční internetový prohlížeč a Wi-Fi připojení.

.vysledek-sloupec {
    color: #fff;
    padding: 1em 0;
    text-align: center;
    background: #0D6AB7;
    float: left;
    overflow: hidden;
}
.vysledek-sloupec + .vysledek-sloupec {
    background: #fff;
    color: #000;
}
.vysledek-sloupec + .vysledek-sloupec + .vysledek-sloupec {
    background: #1081DD;
    color: #fff;
}

var vysledek = document.getElementById("vysledek").getElementsByTagName("div");
function prepocitat(el) {
    var sloupce = el.elements;
    var celkem = 0;
    var pocetSloupcu = sloupce.length;
    for (var i = pocetSloupcu; i--; ) {
        celkem += parseInt(sloupce[i].value * 1);
    }

    var sirka, podil;
    for (i = pocetSloupcu; i--; ) {
        if (celkem === 0) {
            sirka = 0;
        }
        else {
            podil = parseInt(sloupce[i].value * 1) / celkem * 100;
            sirka = Math.round(podil * 1000) / 1000;
          //sloupce[i].parentNode.appendChild(document.createTextNode(podil));
            
        }
        vysledek[i].innerHTML = sirka + " %";
        vysledek[i].style.width = sirka + "%";
    }
}  
  
  // http://kod.djpw.cz/ipmb