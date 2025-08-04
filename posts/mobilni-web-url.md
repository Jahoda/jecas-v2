---
title: "Mobilní web na subdoméně"
headline: "Mobilní web na subdoméně"
description: "Má smysl mít mobilní web na zvláštní adrese <code>m.example.com</code>?"
date: "2015-11-23"
last_modification: "2015-11-24"
status: 1
tags: ["SEO", "Rady a nápady", "Responsivní design"]
---

Ne.

Převážně z historických důvodů se je možné setkat s weby, jejichž mobilní verse běží na jiné URL než *velký* desktopový web:

```
example.com/clanek – desktopová stránka
**m.**example.com/clanek – mobilní stránka
```

Z praktického hlediska je většinou lepší použít adresu **jen jednu**.

Přizpůsobení webu cílovému zařízení jde potom zajistit dvěma způsoby (nebo jejich kombinací):

    V CSS pomocí [pravidla `@media`](/media) a servírování různého stylu na základě šířky (popř. výšky) stránky.

    ```
@media (max-width: 40em) {
  /* styly pro šířku do 40 em */
}
```

    Detekcí na straně serveru a posláním specifického HTML. To jde provést i bez přesměrování na stejné URL.

## Proč se používá jiná URL

Hlavní důvod, proč i velké weby jako [Facebook](/facebook) nebo [Twitter](/twitter) mají mobilní weby na subdoménách `m.facebook.com`/`mobile.twitter.com`, je typicky **historický**.

Daný web byl nejprve vytvořen pro desktop a až následně a nezávisle byla vytvořena mobilní podoba.

Aby se při [přizpůsobování desktopového webu pro mobil](/prevod-responsivni-design) omylem nerozbil velký web, je z počátku nejjednodušší řešení vytvořit kopii desktopového webu, spustit ji na subdoméně `m.example.com` a začít provádět úpravy.

Dalším důvodem může být **omezení redakčního systému**. Upravit systém pro správu obsahu, aby podle detekce mobilů vracel jiný obsah, bývá složitější než jeho zkopírování.

### Osekaná desktop verse

V minulosti byl i více rozšířený názor, že mobilní web je pouze **osekaná podoba hlavního webu pro desktop** s nejnutnějšími funkcemi a pro pokročilé možnosti se má člověk přepnout na „plnou stránku“.

Statisticky ale přibývají lidé, kteří weby **používají jen z malých dotykových zařízení** (mobily, tablety). Taktéž pro návštěvníky, co se na stránku připojují z více zařízení, není nic horšího, než když jim na mobilním webu bude chybět prvek, na který jsou z desktopu zvyklí.

### Preference mobilního webu

Někdy se může stát, že zjednodušená podoba stránky pro mobily bude tak dobrá, že bude i desktopovým návštěvníkům vyhovovat více než plná podoba stránky. Či spíš desktopový web bude tak špatný, že ho předčí ten mobilní.

Díky hromadě dostupného místa při návrhu webu pro desktopy se může zapomenout na to, **co je na stránce nejdůležitější**.

Někdo kvůli tomu preferuje [mobile-first](/mobile-first) přístup – web se udělá nejprve pro mobil a až následně se upravuje pro větší rozlišení.

### Jistota mobilního webu

V dávných dobách pomalého mobilního internetu placeného dle přenesených dat byla mobilní subdoména zárukou toho, že je člověk na úsporné podobě webu.

Dnešní uživatelé už takové chování spíš neočekávají. Případně úsporu dat řeší prostřednictvím prohlížeče.

Nakonec umožnit přístup přes `m.example.com` není problém ani při používání jednotných URL. Zkrátka se taková adresa přesměruje na `example.com` a do [cookie](/cookies) se uloží, že se má zobrazovat mobilní verse.

Na první pohled se tedy může zdát dělení na základě URL hlavně snazší na výrobu, ale nevýhody spíš převažují:

## Nevýhody „m“ subdomény

### Přesměrovávání

V první řadě je nutné vyřešit přesměrování. Když návštěvník přijde na stránku `example.com/clanek`, měl by být přesměrován na `m.example.com/clanek`.

Příručka **Google** nedodržení tohoto principu nazývá termínem [faulty redirects](https://developers.google.com/webmasters/mobile-sites/mobile-seo/common-mistakes/faulty-redirects) (vadné přesměrování). Jde o stav, kdy podstránky desktopového webu přesměrovávají na hlavní stranu mobilního.

Zajistit správné přesměrovávání může být problém v situaci, kdy mobilní i desktopový web jsou v podstatě **dvě zvláštní aplikace** a ne všechny adresy je možné přeložit tam i zpátky.

Dilema potom nastává v případě, co udělat s mobilní URL na desktopu. Pokud někdo bude sdílet odkaz s „`m.`“ na začátku a člověk si tento odkaz otevře na desktopu, dostane typicky osekanou podobu stránky v desktopovém prohlížeči.

Příklad [odkazu](https://m.facebook.com/jecascz/posts/990623920999324) na mobilní stránku z [Facebooku](/facebook) při zobrazení v desktopovém prohlížeči [**Edge**](/microsoft-edge):

Odkaz pro přepnutí na desktopovou stránku je často zatoulaný někde hluboko ve stránce:

Vytvářet mobilní web jako samostatnou aplikaci s jinou strukturou adres je tak dost nepraktické, protože přesměrování oběma směry bude obtížně realisovatelné.

### Prodleva přesměrování

I v případě dobře zvládnutého přesměrování je zde další problém: **přesměrování adres stojí zbytečný čas, kdy se nic neděje**.

Na pomalém mobilním 2G připojení s odezvou 300 milisekund se tato doba odezvy prakticky zahodí jen kvůli přesměrování.

Přesměrovávat hlavní doménu na mobilní subdoménu je tak zaručený způsob, jak hloupě zpomalit první načtení webu.

### Detekce mobilních prohlížečů

Detekovat pro účely přesměrování, že je prohlížeč mobilní, je nutné dělat na základě hlavičky [user-agent](/ua).

To vyžaduje udržovat aktuální regulární výraz, který detekci provádí:

    - [Detect Mobile Browsers](http://detectmobilebrowsers.com/) – implementace detekcí v PHP, JS a dalších jazycích

Zajistit jiný vzhled na základě `@media` v CSS je v tomto ohledu spolehlivější.

### Správa dvou webů

Udržovat dvě varianty webu může být časem značná koule na noze, protože se nová funkcionalita musí přidávat dvojmo.

### URL by měla být jednotná

Někdo zastává názor, že z teoretického pohledu by podoba URL se stejným obsahem neměla nést informaci o cílovém zařízení. Stejně jako se nedělají speciální subdomény pro **hlasové čtečky** nebo **Internet Explorery**, mělo by totéž platit pro web pro mobily.

Trochu proti tomuto názoru stojí [AMP HTML](/amp-html) nebo RSS podoba článků – v obou případech je tentýž obsah na různých URL.

## Mobilní URL a SEO

Z pohledu vyhledávačů je při použití mobilní subdomény na dvou různých adresách duplicitní obsah. [Google](/google) proto doporučuje mobilní a desktopový web propojit `&lt;link>` značkami s hodnotami `rel="canonical"` a `rel="alternate`:

V [hlavičce](/html-kostra#head) desktopového článku na adrese `example.com/clanek` bude odkaz na mobilní variantu:

```
&lt;link rel="alternate" media="only screen and (max-width: 640px)"
      href="http://m.example.com/clanek">
```

V hlavičce mobilního článku `m.example.com/clanek` bude zase zpět odkaz na desktopovou stránku:

```
&lt;link rel="canonical" href="http://example.com/clanek" >
```

Díky tomu **Google** pochopí vztah stránek mezi sebou. Je důležité, aby obsah obou stránek odpovídal 1:1 a značky `&lt;link>` se shodovali s přesměrováním, které se na serveru provádí při návštěvě z mobilu/desktopu.

**Další doporučení:**

  Konkrétní desktopová podstránka se musí přesměrovávat na svůj mobilní ekvivalent. Nikdy ne na hlavní stránku.

  Taktéž `&lt;link rel="canonical">` nemá z mobilní podstránky vést na hlavní stranu desktopového webu, ale na konkrétní podstránku.

    U stránek, které nemají ekvivalent pro mobil/desktop nemá cenu uživatele někam přesměrovávat. Je lepší špatně optimalisovaná stránka než žádná stránka.

    Google akceptuje všechny tři postupy tvorby mobilního webu. (Doporučuje první.)

      **Různý styl pomocí pravidla `@media`.** Společný HTML kód pro mobil i desktop.

        Různý HTML obsah na základě serverové detekce na stejné URL.

        V tomto případě je nutné dobře provést detekci prohlížečů, aby:

          - `Googlebot` dostal podobu stránky pro desktop.

          - `Googlebot-Mobile` dostal mobilní web.

      Přesměrování na „m“ subdoménu.

    Google nemá doporučení ohledně toho, kdy nebo jestli vůbec přesměrovávat z mobilní subdomény na hlavní stránku při návštěvě z desktopu. Nechává to plně na autorech webů.

    Google Webmaster's Mobile Guide: 
    
      - [Select your mobile configuration](https://developers.google.com/webmasters/mobile-sites/mobile-seo/overview/select-config)

      - [Separate URLs](https://developers.google.com/webmasters/mobile-sites/mobile-seo/configurations/separate-urls)

### Mobilní web na Seznamu

Podle vyjádření **Dušana Janovského** jsou v případě Seznamu stejně jako u Googlu správně všechny tři způsoby vytvoření mobilního webu (změna pouze CSS, různý obsah na jedné URL nebo „m“ subdoména).

Vytvoření mobilního webu na jiné URL je z nich nejslabší, responsivní web nejlepší:

  Všechny tři popsané možnosti jsou správně. Dá se ale říct, že některé
    jsou správněji než jiné.

  Responsivní web je nejlepší.

Posílání různého obsahu na stejné URL je taky dobré, ale je nutné se
ujistit, že [SeznamBot](http://napoveda.seznam.cz/cz/seznambot/) dostává obsah, který dostávat má.

  Propojení přes `&lt;link rel=cannonical>` je také dobré řešení, i když v
praxi asi nejslabší, protože to může vést k tomu, že se některé
kanonické linky nezvalidují a zaignorují, zejména pokud bude obsah na
obou URL výrazněji odlišný.
  
  **Dušan Janovský**

V případě servírování různého obsahu na stejné URL je důležité, aby `SeznamBot` dostal preferovanou podobu stránky.

Na rozdíl od Google nemá **Seznam mobilního robota** pro procházení mobilních webů. Detekce prohlížečů by tak neměla `SeznamBot`a poslat na osekanou podobu stránky.

## Přepínání mezi mobilem a desktopem

Není špatné umožnit návštěvníkovi přepnout mezi různými existujícími podobami webu.

Na obrázku níže je mobilní a desktopová podoba [Facebook stránky jecas.cz](https://fb.com/jecascz) na témže mobilu:

Přepínání verse se typicky dělá pomocí cookies. V případě, že si návštěvník ručně vyžádá desktopovou podobu stránky na mobilu, už se neprovede automatická detekce, která by mu naservírovala mobilní web.

### Přepínání responsivního webu

I dobře responsivní web, kde veškeré přizpůsobení mobilům a desktopů probíhá pomocí `@media` pravidel v CSS, může mít smysl přepnout do desktopové podoby.

Zvlášť v případě doplnění responsivní podoby pro mobily do již existujícího webu mohou stálí návštěvníci toužit po původní podobě, na kterou byli zvyklí.

Není problém jim vyhovět. Stačí k tomu jen při zapnutí „desktopové verse“ odstranit značku [`&lt;meta name=viewport>`](/meta-viewport). Mobilní prohlížeč tak bude simulovat větší šířku a stránka se zobrazí podobně jako na desktopu.

## Odkazy jinam

  - Smashing Magazine: [Why We Shouldn’t Make Separate Mobile Websites](http://www.smashingmagazine.com/2012/04/why-we-shouldnt-make-separate-mobile-websites/)