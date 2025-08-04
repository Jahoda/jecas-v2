---
title: "HTTPS – má smysl?"
headline: "Přechod na HTTPS"
description: "Jaké jsou výhody a nevýhody převedení webu na zabezpečené HTTPS. Proč web na HTTPS přesunout?"
date: "2014-12-21"
last_modification: "2015-10-07"
status: 1
tags: ["SEO", "Zrychlování webu", "Bezpečnost"]
---

HTTP – *Hypertext Transfer Protocol* – je *způsob*, kterým se přenášejí data na internetu. HTTP není chráněné před odposloucháváním/sledováním nebo modifikací obsahu. HTTPS tyto problémy řeší **šifrováním dat** mezi klientem a serverem.

## Vlastnosti HTTPS

### Modifikace obsahu

Nezabezpečené HTTP spojení nezaručuje, že obsah, který se dostane do prohlížeče, je ten obsah, který vytvořila příslušná webová stránka.

Po cestě od webového serveru dané stránky k prohlížeči návštěvníka je možné **modifikovat výsledek**, aniž by si toho návštěvník všiml.

V dnešní době sice nebývá zvykem, aby například **poskytovatel připojení** modifikoval stránky svých zákazníků, ale problém mohou být **neznámé Wi-Fi sítě**, které teoreticky může provozovat člověk, co chce sledovat připojené uživatele.

Cílem modifikace obsahu stránky může být třeba:

  - **Vložení reklamy** provozovatele Wi-Fi.

  - **Získání osobních údajů (hesel)**. Útočník může do stránky vložit skript, který obsah formulářů odešle kromě originální stránce i nějak jinam.

### Odposlouchávání provozu

Jelikož je HTTP nešifrované, může člověk s **přístupem do sítě** sledovat, co za weby si ostatní prohlížejí.

Nešifrovaně se přenášejí i případné identifikátory pro přihlášení jako jsou **cookie**. Odposloucháváním přenosu dat přes HTTP je tak možné získat cookie jiného uživatele a třeba **se za něj přihlásit** do webové aplikace.

Pro Facebook dokonce existovala mobilní aplikace, která poslouchala v síti, a na **jediné kliknutí** umožňovala přihlášení se za odposlechnuté uživatele, co **nezabezpečeně přes HTTP použili Facebook**.

Zjistit ale, co si člověk na webu čte, není **výrazný problém ani u HTTPS**. U webu s méně stránkami teoreticky půjde relativně spolehlivě určit prohlížené stránky jen na základě **zkoumání objemu dat**.

### Přenášení refereru

Jedna z vlastností HTTPS je, že při přechodu na HTTP stránku z HTTPS nejsou **přenášeny informace o předchozí stránce**. U HTTP se při příchodu na stránku může provozovatel webu standardně snadno dozvědět, odkud návštěvník přišel. Z praktického hlediska tento rozdíl ale nic moc neřeší.

  	Uživatel může [referer](/referer) **nepředávat i u HTTP**. Není problém jeho odesílání blokovat v prohlížeči.

  	Provozovatel webu může přesný referer rovněž **nepředávat i u HTTP**. Přesměrováním odkazu přes nějakou stránku.

    Provozovatelé webu mohou i při přechodu z **HTTPS stránky na HTTP** stále sledovat pohyb uživatelů přidáváním identifikačních parametrů do URL. Vyžaduje to ale jejich **vzájemnou spolupráci**.

    Takto může Franta odkázat na Pepu, aby se Pepa dozvěděl, že k němu návštěvník přišel od Franty:

    ```
&lt;a href="http://pepa.cz/?odkud=franta">
  Pepa
&lt;/a>
```

    Do budoucna předání refereru při přechodu HTTPS → HTTP může zajistit `&lt;meta>` značka:

    ```
&lt;meta name="referrer" content="always">
```

        - [Where did all the HTTP referrers go?](http://smerity.com/articles/2013/where_did_all_the_http_referrers_go.html)

### Smíšený obsah

Na HTTPS stránce **je problematické** mít vložený obsah z HTTP. To se týká rámů (`&lt;iframe>`), stylů, skriptů a podobně. Obráceně v tom není problém.

Prohlížeče rozlišují **externí objekty** na:

  - **pasivní** – obrázky, videa, zvuky

  - **aktivní** – rámy, skripty, styly, objekty typu Flashe

Pasivní se zobrazí, ale stav stránky není „100% zelený“. Prohlížeč upozorňuje, že stránka obsahuje **nezabezpečené zdroje**.

Ty aktivní jsou potom ve výchozím nastavení prohlížečů **blokovány**. V **Internet Exploreru** se v případě smíšeného obsahu objevuje v dolní části prohlížeče varovná hláška:

Ve starších **IE** (IE 7 a IE 8) je informace o smíšeném obsahu výraznější a vyžaduje přímou akci uživatele.

V ostatních prohlížečích se zobrazí informace o smíšeném obsahu až při zkoumání zabezpečení stránky.

Nemožnost vložit HTTP `&lt;iframe>` nebo **externí JS** vadí například při **vkládání reklamy**, která nefunguje pod HTTPS. S příjmy z reklamy od reklamní služby **nenabízející HTTPS** se tak nezbývá než rozloučit.

Pokud je potřeba používat HTTP obsah na HTTPS stránce, nezbývá než použít [proxy](/php-proxy) (stahovat si na serveru daný HTTP obsah).

    - [Testovací stránka smíšeného obsahu](https://www.bennish.net/mixed-content.html)

## Cena

Někteří příznivci HTTPS prohlašují, že **není jediný důvod nepoužívat HTTPS**. Je to pochopitelně nesmysl. I když je **cena potřebných certifikátů** v řádů stokorun nebo dokonce zdarma, přechod na HTTPS bude často znamenat i **vyšší náklady na hosting**.

    - [Let's Encrypt](https://letsencrypt.org) – certifikáty zdarma

Pro provoz webu na HTTPS je potřeba **vlastní IP adresa** nebo **používat SNI** ([Server Name Indication](http://cs.wikipedia.org/wiki/Server_Name_Indication)).

Vlastní IP adresa znamená zpravidla náklady navíc. Třeba u [Wedosu](http://hosting.wedos.com) stojí **100 Kč + DPH měsíčně**. I jinde jsou ceny podobné.

    - Wedos: [HTTPS u webhostingu](http://kb.wedos.com/webhosting/https.html)

Použití SNI zase nebude ideální pro **uživatele starších prohlížečů** – **Internet Explorer 6,7** a **8** na **Windows XP**. Těm se místo stránky objeví chybová hláška, že je **problém s certifikátem**.

I přesto půjde **stránku zobrazit**, když návštěvník klikne na nedoporučenou akci „Pokračovat na stránku“. Stránka potom bude doplněna červenou chybovou hláškou „Chyba certifikátu“. Moc dobré mínění o webu ale návštěvník nejspíš mít nebude.

Pokud už má člověk pro webovou stránku vlastní IP adresu nebo chyba certifikátu v **Internet Exploreru** pod Windows XP nevadí, přímé náklady se zvýší jen o **cenu certifikátu**.

Kromě toho ještě něco stojí samotný jednorázový **přechod na HTTPS**, který se **sám neudělá**. I pokud si vše člověk vlastnoručně nastaví sám podle návodů na internetu, pořád existují [náklady obětované příležitosti](http://cs.wikipedia.org/wiki/Náklady_obětované_příležitosti), které je třeba brát v úvahu.

## Vyhledávače

Jelikož převod webu na HTTPS znamená **změnu všech URL celého webu**, mohou panovat jisté obavy, jak si s tím poradí internetové vyhledávače.

### Google

**Google** po přesměrováním stránek **hlavičkou 301** zpravidla aplikuje změnu velmi rychle a ani nezpůsobuje problémy jako významné výpadky posic ve výsledcích vyhledávání.

Algoritmus Google údajně má jako jedno z kritérií **zabezpečení webu** (jestli používá HTTPS nebo HTTP). Aplikace tohoto kritéria ale nezměnila ani **1 % všech výsledků**, takže o nějaké významné výhodě HTTPS nelze hovořit.

    - Google Online Security Blog: [HTTPS as a ranking signal](http://googleonlinesecurity.blogspot.cz/2014/08/https-as-ranking-signal_6.html)

### Seznam

U **Seznamu** typicky **přesun webu** (změna URL stránek) přináší problémy – změna nějakou dobu trvá a hrozí **krátkodobý pokles umístění ve vyhledávání** a z toho plynoucí ztráty návštěvnosti.

Z pohledu Seznamu jsou níže **dvě různé URL**:

```
http://example.com
http**s**://example.com
```

Může se na nich nacházet odlišný obsah. Není tedy možné vzít všechny URL s `http:` a nahradit je za `https:`.

  Množí se dotazy, jestli je dobrý nápad přesouvat weby na https: protokol. Že prý Google to chce. Já říkám, že měnit zbůhdarma URL je blbost.

  …

  Seznam trable s https indexací nemá. Má trable s provozovateli webů, kteří nechápou, že výměna protokolu je změna URL. :-)

  **Dušan Janovský**, konzultant vyhledávání v Seznam.cz, [Twitter](https://twitter.com/janovsky/status/506819036861435904)

Podle zkušeností některých tvůrců webů není přechod na HTTPS u Seznamu **rozhodně bezproblémový**.

    - Webtrh: [Přesměrování na https s platným SSL a vliv na Seznam.cz](https://webtrh.cz/282348-presmerovani-https-platnym-ssl-vliv)

Přesměrování na HTTPS u webu hodně závislého na **návštěvnosti ze Seznamu** je tedy poněkud risiková záležitost. A celou akci si je dobré dvakrát rozmyslet (přinese významná positiva?) a pro jistotu přesun provést v období, kdy propad návštěvnosti způsobí **co možná nejmenší ztráty**.

Dne **6. 10. 2015** se na blogu fulltextového týmu objevil článek, že s přechodem na HTTPS je v případě **Seznamu** dobré ještě počkat do roku **2016**:

    - Blog fulltextového týmu: [Přechod webů na HTTPS doporučujeme odložit na začátek příštího roku](http://fulltext.sblog.cz/2015/10/06/3254/)

Nové weby nebo stránky, kde krátkodobé zhoršení posic ve vyhledávání nevadí, jde ale bez problému stavět na HTTPS. Hodnocení HTTP a HTTPS webů je rovnocenné.

Celý problém tkví v indexaci přesměrovaných stránek, nejde o problém primárně s HTTPS.

## Rychlost

Použití HTTPS je sice značně komplikovanější než HTTP, znatelně **zvýšit rychlost** načítání webu díky **spojování požadavků** na jednotlivé soubory může použití **SPDY protokolu**. Pokud stránka načítá velké množství objektů (typicky obrázky, které není možné [spojit do jednoho](/css-sprite)) u HTTP trvá značnou dobu **samotná režie s vytvořením požadavku**. SPDY si požadavky na soubory dokáže seskupovat.

    - [HTTP vs HTTPS Test](https://www.httpvshttps.com/) – porovnání rychlosti HTTP a HTTPS při načítání hodně objektů

    - Souki.cz: [Optimalizujeme pro rychlost: HTTPS](https://www.souki.cz/optimalizujeme-pro-rychlost-https)

    - Can I use: [HTTP/2 protocol / SPDY](http://caniuse.com/#search=spdy) – podpora SPDY v prohlížečích

### Nutné přesměrování

Menší zdržení může přechod na HTTPS způsobit kvůli tomu, že prohlížeče berou jako výchozí protokol `http://`. Pokud tedy člověk zadá do adresního řádku `example.com`, prohlížeč navšíví stránku `http://example.com`, kde bude následně přesměrován na `http**s**://example.com`.

## HTTPS má smysl jen pro přihlašování uživatelů

Někteří lidé zastávají názory, že HTTPS má smysl jen u webových stránek, kdy se **přihlašují uživatelé** nebo tam mají **citlivé údaje**.

Zde je zásadní otázka, co jsou to **citlivá data**. Je to značně **individuální** a universální odpověď neexistuje.

    Pro někoho nejsou citlivá skoro žádná jeho data. Pokud je člověk **aktivní na internetu**, řada informací o něm zkrátka půjde zjistit. Takže ho například (ne)bezpečnost přenosu jeho adresy v e-shopu nemusí trápit, protože ji má stejně na webu.

    Pro další skupinu je citlivý obsah **dostupný až po přihlášení**.

    Někdo považuje za citlivá data už jen informaci, co si prohlíží.

## Kdo HTTPS ocení?

Je poměrně složité najít početnější skupinu lidí, která HTTPS vědomě ocení.

    Zvlášť **opatrní uživatelé** se nebudou k citlivým službám přihlašovat **mimo důvěryhodná připojení / z neznámých zařízení**. U cizího počítače hrozí, že bude obsahovat program, který bude tajně zaznamenávat znaky napsané na klávesnici nebo výsledný obsah v prohlížeči.

    Uživatele vědomě resignující na bezpečnost po internetu kolujících dat použití HTTPS nezachrání.

    Uživatelé, co neví, co je to HTTP nebo HTTPS , potom nemají co ocenit.

Někdo se domnívá, že **důvěryhodné označení**, které prohlížeče zobrazují u přes HTTPS zabezpečených webů, zabrání útokům, kdy někdo například zkopíruje design banky na vlastní stránku a následně si **ukládá hesla klientů**. Či jinak podvodným webům.

Zde by mohl zafungovat *Peltzmanův efekt* a **HTTPS u podvodné stránky** by mohlo ještě snížit (už tak nízkou) **ostražitost běžných uživatelů**.

Čistě z technického hlediska ale zabezpečení webu pomocí HTTPS zvýší celkovou bezpečnost.

## Něco se pokazí

Prakticky každá zkušenost s přechodem na HTTPS, co je možné na internetu najít, obsahuje zmínku, že se v něčem **udělala chyba**, něco špatně zafungovalo, byly s něčím **problémy** a podobně.

Převod webu na HTTPS je poměrně **značný zásah** do něčeho, **co funguje**, který s velkou šancí skončí tím, že něco **fungovat nebude**. Při úvahách o přesunu webu je to dobré dát do úvahy.

    - Zkušenost: [Jak proběhl přechod vaszrak.cz na HTTPS](/https-vaszrak)

## HTTP, nebo HTTPS?

Rozhodnout, jestli přesunout stránku na HTTPS nebo ne, tedy není úplně snadné.

### Proč přejít na HTTPS

  - **Rychlost** – načítání větších počtů objektu pomocí SPDY.

  - **Ochrana uživatelů** před odposloucháváním / podstrčením obsahu. U méně významných webů spíš teoretická hrozba.

### Proč nepřejít na HTTPS

  - **Cena** – certifikát, platba za vlastní IP adresu, náklady realisace přesunu.
  
  - **Seznam** – ztráta návštěvnosti z vyhledávání kvůli změně všech URL.
  
  - **Externí skripty a rámy** načítané z HTTP – budou v prohlížečích blokovány.

  - **Něco se rozbije**.

Při přesunu osobního *webíku*, kam chodí 5 lidí denně z nových prohlížečů, je jediným důvodem proti **náklad jednorázového přesunu**.

U jiných webů se těch důvodů ale může sejít více, což učiní přesun značně nerozumným, pokud nepřinese adekvátní výhodu.

### Nový web

V případě budování nového webu hovoří proti **použití HTTPS** v podstatě pouze **cena**. Nehrozí risika spojená s přesměrováním/přesunem a problémem ve vyhledávačích.

## Poděkování

Děkuji [Michalu Špačkovi](https://www.michalspacek.cz/) za připomínky, které pomohly v článku odstranit některé chyby, nepřesnosti a nejasnosti.

## Odkazy jinam

  - Chris Palmer: [How To Migrate To HTTPS](https://docs.google.com/document/d/1oRXJUIttqQxuxmjj2tgYjj096IKw4Zcw6eAoIKWZ2oQ/preview?sle=true#)

  - [HTTPS Mixed Content: Still the Easiest Way to Break SSL](https://community.qualys.com/blogs/securitylabs/2014/03/19/https-mixed-content-still-the-easiest-way-to-break-ssl)

  - HTG: [What Exactly is a Mixed Content Warning?](http://www.howtogeek.com/181911/htg-explains-what-exactly-is-a-mixed-content-warning/)

  - Paul Irish: [The Protocol-relative URL](http://www.paulirish.com/2010/the-protocol-relative-url/)

  - IEBlog: [Internet Explorer 9 Security Part 4: Protecting Consumers from Malicious Mixed Content](http://blogs.msdn.com/b/ie/archive/2011/06/23/internet-explorer-9-security-part-4-protecting-consumers-from-malicious-mixed-content.aspx)