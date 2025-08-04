---
title: "Seznam prohlížeč"
headline: "Seznam.cz prohlížeč"
description: "Seznam vytvořil vlastní webový prohlížeč. Jaký je?"
date: "2014-12-18"
last_modification: "2014-12-18"
status: 1
tags: ["Seznam", "Prohlížeče"]
---

Stáhnout **nový Seznam prohlížeč** je možné z oficiální stránky.

[Stáhnout](https://www.seznam.cz/prohlizec/)

Jedná se o prohlížeč používající **vykreslovací jádro Blink** (podobně jako **Chrome**, **Opera**), z pohledu webového vývojáře tedy nehrozí problémy s **odlišným zobrazováním stránek**.

Seznam.cz se na rozdíl od [Yandexu](/yandex) držel relativně standardního rozhraní prohlížeče.

(adsbygoogle = window.adsbygoogle || []).push({});

Prohlížeč Seznam je cílen na **méně náročné uživatele**, co rádi používají Seznam a související služby. Případně pro majitele **starších počítačů**, kam nejde nainstalovat nový Internet Explorer a ostatní prohlížeče tam běhají pomalu.

Webovému tvůrci tedy nejspíš vyhovovat nebude.

## Zajímavosti

### Posuvník

Hlavní posuvník stránky **nemá šipky** nahoru/dolů. To je trochu zvláštní, protože řada lidí je s oblibou používá k posouvání po stránce.

S jejich odstraněním experimentoval i **Chrome**, ale raději je vrátil.

Ostatní posuvníky kromě toho hlavního šipky mají.

### Favicona

Na záložkách se vůbec nezobrazuje **ikonka webu** (`favicon.ico`).

### Zvětšování textu

V prohlížeči nikde není možnost pro **zoomování stránky**. Nefunguje ani Ctrl + kolečko. Pouze Ctrl + + a Ctrl + -.

### Adresní řádek

Adresní řádek **neobsahuje konkrétní URL**, ale jen název domény. Skutečná URL se zobrazí až po kliknutí do adresního řádku.

## User-agent

Prohlížeč posílá následující hlavičku `user-agent`:

```
Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) **Seznam.cz**/1.0.0 Chrome/40.0.2125.104 Safari/537.36

```

## Smysl prohlížeče

Ohledně smyslu prohlížeče se [vyjádřil na svém Facebooku](https://www.facebook.com/dusan.janovsky/posts/10204534286570148) **Dušan Janovský**, který se v Seznamu věnuje vyhledávání.

### Domovská stránka

Hodně uživatelů se podpory Seznamu ptá na to, jak nastavit Seznam.cz jako **domovskou stránku**. Domovská stránka se navíc může různými způsoby změnit (např. **instalací programů** a neodškrtnutí „změnit domovskou stránku“).

  Například nejčastější dotaz na náš helpdesk je žádost o návod, jak si nastavit Seznam jako domovskou stránku. Máme prostě velkou skupinu loajálních uživatelů, kteří skutečně Seznam používat chtějí, a chceme jim to usnadnit. Aby nemuseli každou chvíli řešit, že jim někdo nebo něco přenastavilo domovskou stránku.

V prohlížeči od Seznamu je domovská stránka **nastavená napevno** a uživatel se na ni rovněž dostane kliknutím na logo.

### Náhrada starých prohlížečů

Jeden z důvodů vytvoření Seznam prohlížeče je náhrada za staré **Internet Explorery**, které řada návštěvníků služeb Seznamu používá.

Do **Windows XP** je možné nainstalovat maximálně **IE 8**.

  No a za druhé je to pro nás pokus o řešení problému se starými prohlížeči. Když má dneska někdo IE 6 nebo IE 8, tak mi mu sice můžeme říct "nainstaluj si novější browser", ale zároveň mu tu alternativu chceme přímo dát.

  Přičemž nabízet mu Chrome nebo Firefox je způsob, jak o toho uživatele časem přijít, neboť oba browsery docela agresivně domovskou stránku přenastavují, případně na ní mají velké logo naší konkurence. To fakt byznysově smysl nedává. A doporučovat jim nejnovější IE smysl nemá, protože oni mají staré IE právě proto, že na jejich počítač nejnovější IE nainstalovat zpravidla nejde.

Z tohoto důvodu je prohlížeč ořezaný. Trochu podivné je ale použití **plynule vysouvacích** panelů z pravé strany, které mění šířku stránky, což je na [vykreslení stránky](/vykreslovani) hodně náročná činnost.

### Doplňky

Do prohlížeče není možné instalovat rozšíření. Hlavním cílem prý ale není zabránění instalace **AdBlocku**.

  AdBlock skutečně není žádné ohrožení byznysu Seznamu. Naši uživatelé jsou spíše netechničtí. Věřím, že třeba pro Živě nebo Lupu adBlock může znamenat problém. Zrovna tohle rozšíření bych se do Seznam browseru nebál zavést.

### Omezení na určité země

Stažení prohlížeče je omezené pouze na Českou republiku, je to údajně kvůli poplatkům za kodeky.

  Za kodeky se platí podle země uživatele. A myslím, že zrovna faktura za kodeky byla v rozpočtu na browser zdaleka největší položka.

## Odkazy jinam

  - DJPW: [Diskuze: Seznam.cz prohlížeč](http://djpw.cz/160584)

  - Marek Prokop: [Jak v Google Analytics zjistíte, kolik návštěv vám chodí s novým prohlížečem Seznamu](https://www.facebook.com/notes/prokop-software/jak-v-google-analytics/10152686888513472)

  - Jeden Bod: [Seznam.cz prohlížeč](http://jedenbod.cz/1583-seznam-cz-prohlizec.html) – detaily technického řešení a bezpečnostní risika