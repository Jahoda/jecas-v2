---
title: "Hlavička User-Agent"
headline: "Hlavička User-Agent"
description: "User-Agent je hlavička, kterou posílají prohlížeče jako svou identifikaci."
date: "2015-02-19"
last_modification: "2015-05-17"
status: 1
tags: ["Prohlížeče", "Rady a nápady"]
---

Kromě [webových prohlížečů](/webove-prohlizece) posílají *user agent* informaci (zkratka **UA**) i různí **roboti vyhledávačů**, validátory kódu nebo nástroje pro jiné [analysování stránky](/kontrola-stranky).

  Váš user-agent je: 

    document.getElementById("ua").innerHTML = navigator.userAgent;

Hlavička `User-Agent` se hodí zejména ke dvěma věcem:

    **Počítání návštěv** z různých prohlížečů, zařízeních a operačních systémů. Hodí se to pro přemýšlením o tom, pro které prohlížeče optimalisovat webovou stránku.

          [Pro jaké prohlížeče ladit svůj web](/prohlizece-optimalisace)

    **Zobrazení různého obsahu na stejné URL**. Anglicky se to označuje jako *content negotiation*. Na základě identifikace zařízení žádajícího obsah se pro různá zařízení posílá *něco jiného*.

    Zneužívání této možnosti v souvislosti se [SEO](/seo) (optimalisace pro vyhledávače) se nazývá *cloaking*.

      Termínem *cloaking* (čti klouking) se označuje technika, při které server pošle jinou verzi stránky robotu vyhledávače a jinou uživateli s běžným prohlížečem. Cloaking za účelem manipulace s výsledky vyhledávání vyhledávače obvykle penalizují (pokud na něj přijdou).

      Marek Prokop, [Co je to cloaking?](http://vyhledavace.info/seo-faq/9/cloaking)

    Existují případy, kdy je posílání různého obsahu různým zařízením **zcela v pořádku**.

      - Zabránění přístupu **nežádoucím robotům**. Problém je, že se mohou maskovat jako normální prohlížeče.

      - Řešení **odlišnosti v prohlížečích**. Různým prohlížečům se mohou posílat různé CSS, JavaScripty, obrázky a podobně. **Detekce prohlížeče** pro servírování odlišného obsahu pro odstranění nesrovnalostí v zobrazování by měla být až **poslední možnost**.

## Jak zjistit user agent

### PHP

V jazyce PHP je tato informace v poli [`$_SERVER`](/server).

```
&lt;?php
echo $_SERVER["HTTP_USER_AGENT"];
```

### JavaScript

JavaScript má tuto informaci v objektu `navigator`.

```
alert(navigator.userAgent);
```

## Podoba hlavičky user agent

Jelikož se hlavně v minulosti hlavička User-Agent skutečně hojně používala pro **odesílání různého obsahu různým zařízením**, tvůrci nových prohlížečů ve snaze, aby jejich prohlížeč dostal nejlepší možný obsah, začali přebírat části user agenta od konkurence.

**Symbolický příklad**: Existoval prohlížeč s hlavičkou `Starý` a prohlížeč s hlavičkou `Nový`, autor webu potom použil detekci typu:

```
if (prohlížečNový) {
  // lepší zobrazení
}
else {
  // základní zobrazení
}

```

Následně přišel prohlížeč `Novější`, který byl schopný zobrazovat stránky minimálně stejně dobře jako prohlížeč `Novy`, ale kvůli detekci by dostal obsah pro prohlížeč `Starý`.

Aby žádoucím způsobem prošel detekcí, dostal user agent hlavičku typu:

```
Novější (jako Nový)
```

Nebo:

```
Novější, kompatibilní s Nový
```

Detekcí hledající výraz „`Nový`“ díky tomu prohlížeč `Novější` prošel.

Takto došla situace s user agent hlavičkami do stavu, kdy prohlížeč **Chrome** má v user agentovi klíčová slova *Mozilla*, *Gecko*, *KHTML*, *Safari* nebo *AppleWebKit*.

Příklad user agent hlavičky z **Chrome**:

`Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36`

Ještě rozmanitější je potom řetězec user agenta v mobilním **IE 11**, kde je zmíněno snad úplně všechno:

Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; Microsoft) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537 

Konkrétní postup **vývoje řetězců user agentů** je popsán zde:

    - [History of the browser user-agent string](http://webaim.org/blog/user-agent-string-history/) – popis historie vývoje hlavičky user-agent

## Různý obsah dle detekce prohlížeče

Vzhledem k nevyzpytatelnému vývoji identifikátoru prohlížečů je dobré se pokusit detekci user-agenta nejraději nepoužívat.

Lepší postup je testovat **podporu konkrétních vlastností**, které je potřeba použít.

V CSS je k tomu navrženo [pravidlo `@supports`](/supports).

    - [Modernizr](http://modernizr.com/) – JS knihovna obsahující testy podpory různých vlastností ([celý skript](http://modernizr.com/downloads/modernizr-latest.js))

Bohužel testování podpory některých vlastností může být dost komplikované či náročné na výkon, takže se detekci prohlížeče půjde úplně vyhnout jen těžko.