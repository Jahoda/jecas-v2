---
title: "QR code generátor"
headline: "Generování QR kódu"
description: "Co je to QR kód a jak ho okamžitě vytvořit pomocí jednoduchého online generátoru."
date: "2015-02-19"
last_modification: "2015-05-18"
status: 1
tags: ["Produktivita", "Hotová řešení"]
---

QR code (zkratka z *Quick Response Code*) se používá hlavně pro **mobilní zařízení**. Jedná se o způsob, jak do grafické podoby uložit menší množství dat. Vzniklý obrázek potom člověk vyfotí fotoaparátem svého mobilního zařízení a speciální aplikací z obrázku získá potřebná strojově čitelná data.

Hlavní výhoda QR kódu je **pohodlné a rychlé získání** textových dat. Místo pomalého opisování textu na klávesnici dokáže v jednotkách sekund obsah získat a rozluštit software.

## Podoba kódu

Na příkladu jednoduchého QR kódu stojí za povšimnutí velké čtverce ve třech rozích, které slouží jako **orientační body** pro snímací aplikaci. Zbytek jsou už potom **data**. Díky třem „kontrolním“ čtvercům v rozích jde určit orientaci kódu, takže není problém kód fotit klidně vzhůru nohama.

QR kód je také i tolerantní k chybám, může být v různých barvách nebo barevně **invertován**. I část výsledného obrázku může fungovat, což přináší možnost do obrázku například umístit **logo** nebo **lidsky čitelný text**.

    Příklad invertovaného QR kódu s umístěním loga, který je stále funkční

    - Wikipedie: [QR kód](http://cs.wikipedia.org/wiki/QR_kód) – obsahuje i detailní popis, jakým způsobem jsou data v obrázku uložena

## Počet znaků

Pokud se do obrázku zakóduje víc dat (delší text), bude jeho struktura **hustší**, což ztíží i převod obrázku na data.

Některé starší čtečky mohou mít s delšími kódy (například nad **300 znaků**) problémy. Většinou není nutné do kódu zapsat celé romány, ale používají se spíš odkazy na **webovou stránku**, kde je potom více obsahu.

### Maximální počet znaků

      Typ obsahu
      Znaků

      číslice
      7 089

      písmena a číslice
      4 296

      8bitová data
      2 953

      kandži
      1 817

Jiný QR kód s delším textem (cca 120 znaků).

## Funkce

Kromě textu nebo URL (adresy webové stránky) se dají do kódu zakódovat další funkce. Aplikace pro luštění QR kódu bývají chytré, takže se snaží automaticky zjistit typ dat.

  - Číslo `123456789` se bude nejspíš brát jako telefonní číslo.

  - Text `www.jecas.cz` bude potom pochopen jako odkaz na webovou stránku.

  - Text `neco@example.com` půjde pochopit jako e-mail.

Kromě automatického určování obsahu existuje způsob pro označení jiných funkcí.

### Text

Obyčejný text:

```
Text
```

### URL

Adresa nepotřebuje zvláštní zacházení. Automaticky ji rozpozná aplikace.

```
http://example.com
```

### E-mail

Samotný e-mail je také možné rozpoznat automaticky.

Pro vytvoření obrázku, který připraví e-mailovou zprávu včetně předmětu nebo textu zprávy se používá:

```
MATMSG:TO:mail@example.com;SUB:Předmět;BODY:Text;;
```

### Telefon

Předvyplní číslo pro pohodlné zavolání. Stačí na začátek uvést `tel`. Aplikace pro snímání QR kódu mohou jako telefon pochopit i prosté uvedení čísla bez „`tel:`“ na začátku.

```
tel:420123456789
```

### SMS

Pro připravení SMS zprávy se používá `SMSTO` na začátku obsahu. Za dvojtečku po telefonním čísle je možné uvést text zprávy.

```
SMSTO:420123456789:Text
```

### Událost

Připraví událost.

```
BEGIN:VEVENT
SUMMARY:Název události
DTSTART:20180801T160000Z
DTEND:20180801T170000Z
END:VEVENT
```

### Geolokace

Místo na mapě. Uvádí se v pořadí zeměpisná šířka, zeměpisná délka a nadmořská výška.

```
geo:50.0892069,14.4032178,400
```

Získat GPS určitého místa jde například pomocí stránky [Mapy.cz](http://mapy.cz):

    Stačí kliknout pravým tlačítkem na místo a vybrat *Co je zde*:

    V pravém panelu dole si zkopírovat GPS souřadnice:

### Připojení k Wi-Fi

Do QR kódu jde zachytit i přihlášení k Wi-Fi.

```
WIFI:T:WPA;S:Nazev;P:heslo;;
```

### Kontakt vCard

Docela užitečná je možnost vytvořit **celý kontakt**. Dá se zadat jméno, příjmení, telefonní čísla, e-mail, adresa nebo webová stránka.

Může se hodit takový kód vytisknout na visitku, čímž si půjde pohodlně uložit kompletní kontakt. Jelikož visitky nebývají velké, je kvůli dobré čitelnosti lepší uvést jen nejnutnější údaje (např. jen jeden telefon nebo e-mail a podobně).

Používá se běžný formát **vCard**:

```
BEGIN:VCARD
VERSION:2.1
FN:Jméno Příjmení
N:Příjmení;Jméno
TITLE:Funkce
TEL;CELL:222222222
TEL;WORK;VOICE:333333333
TEL;HOME;VOICE:111111111
EMAIL;HOME;INTERNET:osobni@example.com
EMAIL;WORK;INTERNET:pracovni@example.com
URL:http://example.com
ADR:;;Ulice;Město;;11100;Země
ORG:Organisace
END:VCARD
```

    - [vCard](http://en.wikipedia.org/wiki/VCard) – popis formátu na anglické Wikipedii

### QR platba

Pro elegantní placení prostřednictvím **mobilní bankovní aplikace** je užitečné generovat QR platební kód. Člověk tak nemusí z papírové faktury opisovat číslo účtu, banky, sumu a podobně. Nebo tyto údaje kopírovat z e-mailu nebo webové stránky.

Kód pro platby může vypadat následovně:

```
SPD*1.0*ACC:CZ5608000000000002171532*AM:999*CC:CZK*DT:20150518*MSG:Zpráva*X-KS:1414*X-SS:1313*X-VS:1212
```

  - `ACC` – číslo účtu v [IBAN](http://cs.wikipedia.org/wiki/International_Bank_Account_Number) formátu (pokud ho neznáte, jde [spočítat](https://www.cnb.cz/cs/platebni_styk/iban/iban.html))

  - `AM` – částka k platbě

  - `CC` – měna

  - `DT` – datum splatnosti

  - `MSG` – zpráva pro příjemce

  - `X-KS` – konstantní, `X-SS` – specifický a `X-VS` – variabilní symbol

  - [QR platba](http://qr-platba.cz/) – více informací o placení pomocí QR kódu

### Bitcoin adresa

Pro zjednodušení platby v Bitcoinech se používají zpravidla dvě možnosti:

  - Prosté uvedení BTC adresy.

  - Řetězec `bitcoin:` před samotnou adresou.

Za bitcoinovou adresu jde i uvést částku za „`amount=`“ a zprávu/popis za „`label=`“:

```
bitcoin:{adresa}?amount={částka}&amp;label={zpráva}
```

Nutná je pochopitelně mobilní bitcoinová peněženka, která může platbu na adresu zpracovat.

## Aplikace

Pro čtení QR kódu je nutná nějaká aplikace, co z obrázku vydoluje text.

Pro luštění kódu na počítači bez používání webkamery je ideální nástroj:

    - [ZXing Decoder](http://zxing.org/w/decode.jspx) – dekódování QR kódu z URL nebo nahraného obrázku v prohlížeči

### Mobilní aplikace

Pro čtení kódu na mobilních telefonech s fotoaparátem si většinou stačí v obchodu vyhledat něco jako „QR code“.

Osobně mi vyhovuje aplikace od Seznamu QR čtečka, je k disposici pro tři nejrozšířenější platformy.

  - [Android (Google Play)](https://play.google.com/store/apps/details?id=com.threegvision.products.seznam.Android)

  - [iOS (App Store)](https://itunes.apple.com/cz/app/seznam.cz-qr-ctecka/id389526252?ls=1&amp;mt=8)

  - [Windows Phone Store](http://www.windowsphone.com/cs-cz/store/app/qr-%C4%8Dte%C4%8Dka/178d002b-2e35-4527-bc3d-47c0fc3886e2)

## PHP, JS, API generátory

Pro automatické generování QR kódu existuje spousta hotových řešení.

### Google Charts

Velice snadný způsob je použít [Google Charts](https://developers.google.com/chart/infographics/docs/qr_codes). Není potřeba se s ničím programovat, jen se na stránku vloží obrázek s URL, kam se zadá text, co má být v QR kódu.

  - [Generování QR kódu přes Google Charts](http://kod.djpw.cz/lzkb)

### Generování QR v JavaScriptu

Generovat QR code JavaScriptem je výhodné tím, že se nemusí **čekat na odezvu** ze strany serveru. Navíc se data pro vytvoření kódu nepřenášejí žádné třetí straně.

Výsledný QR kód je možné nakreslit do plátna [`&lt;canvas>`](/canvas) nebo sestavit pomocí obyčejné HTML tabulky.

    - [qr-code](https://github.com/educastellano/qr-code) – Nástroj pro generování QR kódu v JavaScriptu, [ukázka](http://kod.djpw.cz/qzkb)

Existuje řada dalších hotových skriptů, bohužel si ale **neporadí s diakritikou**:

    - [qrcode.js](http://davidshimjs.github.io/qrcodejs/) – [ukázka qrcode.js](http://kod.djpw.cz/pzkb)

    - [neocotic.com/qr.js](http://neocotic.com/qr.js/) – [ukázka qr.js](http://kod.djpw.cz/nzkb)

### PHP generátor QR kódu

Pro PHP je dobře použitelná knihovna PHP QR Code, která bezpečně zvládá znaky s českou diakritikou.

    - [PHP QR Code](http://phpqrcode.sourceforge.net/) – open-source nástroj pro generování QR kódu v PHP

**Poznámka**: po stažení archivu a spuštění na [localhostu](/localhost) nemusí u dema čestina správně fungovat kvůli absenci HTML `&lt;meta>` značky:

```
&lt;meta charset="utf-8">
```

### Online generátor

Nakonec je možnost si QR kód jednorázově vygenerovat pomocí nějaké online služby.

    - [QR Code Generator](http://goqr.me) – pokročilý online generátor QR kódu

## Vytvoření QR code

  Vygenerujte si potřebný QR kód. Zadaná data se **nikam nepřenášejí** a neukládají. Kód se sestavuje přímo v prohlížeči.

**Typ kódu**:

	    Text
	    Odkaz
	    Telefon    
	    E-mail
	    SMS
	    Událost
	    Kontakt
	    Wi-Fi
	    Mapa
	    Bitcoin

	                Text

	                URL

	                Telefon

	            E-mail

	            Předmět

	            Text zprávy

	            Telefon

	            Text zprávy

	                Název události

	                Začátek

	                Konec

	                Jméno a příjmení

	                E-mail

	                Telefon

	                Web

	                Adresa
	                	Ulice
Město
PSČ

	            Zabezpečení
	            
	                WPA
	                WEP
	                žádné

	            Název sítě

	            Heslo

	                GPS souřadnice

	                Bitcoin adresa

	                Částka

      ### QR kód

      ### Textová data

	    ```

```

  var g = document.getElementById("qr-generator");
  var f = document.getElementById("qr-form");
  g.appendChild(f);