---
title: "Jak (ne)přenášet referer"
headline: "Jak (ne)přenášet referer"
description: "Jak zablokovat přenášení informace o předchozí navštívené stránce."
date: "2015-11-18"
last_modification: "2016-02-09"
status: 1
tags: ["HTML", "Hotová řešení", "Rady a nápady"]
---

Referer (nebo referrer) je HTTP hlavička obsahující informaci o předchozí navštívené URL. Provozovatel webu se z ní může dozvědět, odkud k němu návštěvník přišel.

## Jak zjistit referer?

### PHP

V PHP je předchozí URL dostupná v poli [`$_SERVER`](/server). Vypsat jde následovně:

```
&lt;?php
echo $_SERVER["HTTP_REFERER"];
```

### JavaScript

V JS je informace o předchozí stránce dostupná v `document.referrer`:

      document.write("Předchozí stránka: " + document.referrer);

### Spolehlivost?

Hodnotě hlavičky referer **není možné věřit**. Technicky zdatný uživatel může její hodnotu nastavit libovolně nebo referer vůbec neposílat.

Pokud se obsah refereru příchozích návštěvníků někde vypisuje, je třeba myslet na ochranu proti [XSS](/xss) (vložení škodlivého skriptu kvůli interpretaci HTML).

Většina uživatelů ale chování refereru neupravuje, takže je to celkem spolehlivá informace.

## Nepředávání refereru

Předávání refereru není vždy úplně žádoucí. V URL se mohou nacházet **citlivé informace**, které by se neměly dostat jinam.

Stačí aby někdo třeba i v neveřejné části webu klikl na odkaz a referer se přenese na cílový web. V případě, že neveřejný systém používá adresy tvořené z titulku, může se člověk dozvědět, že ho někde pomlouvají nebo chválí.

```
tlachtace.cz/projekty-5/**jecascz-nejlepsi-web-na-svete**-3996/
```

Odkazující stránky jde potom zjišťovat ve statistikách. Ať už přímo v *access logu* (automaticky vytvářený soubor na serveru se všemi přístupy) nebo v měřicím nástroji typu [Google Analytics](/ga).

Ve **statistikách** se potom objevují adresy webových RSS čteček, e-mailových klientů, interních informačních systému, administrací a podobně.

Pokud se na nové URL chystá web, kam nevedou žádné odkazy a ani není zaindexován [vyhledávači](/seo), pomocí referrera se adresa může nechtěně prozradit.

### Zablokování refereru v prohlížeči

Nejspolehlivější řešení je zakázat předávání refereru přímo v prohlížeči. Vyžaduje to ale součinnost všech uživatelů dané aplikace, a to je dost nereálné.

Globální zakázaní refereru navíc způsobí **částečnou nefunkčnost některých aplikací**, které kontrolu refereru používají jako ochranu před [CSRF](/bezpecnost#csrf).

Pro současné prohlížeče je k tomu asi nejlepší použít nějaký plugin.

### Blokování HTML atributem

[**Edge**](/microsoft-edge), **Chrome 21+**, **Opera 15+** a **Firefox 36+** podporují vypnutí předávání refereru pomocí `rel` atributu [`noreferrer`](/noreferrer).

```
&lt;a href="/noreferrer" **rel="noreferrer"**>
  Na cíl se nepředá referer
&lt;/a>
```

Aby nebylo nutné psát neustále `rel="noreferrer"` pro blokování více odkazů na stránce, dá se předávání refereru nastavit `&lt;meta>` hlavičkou:

```
&lt;meta name="referrer" content="origin">
```

    - Can I use: [Referrer Policy](http://caniuse.com/#feat=referrer-policy) – podpora v prohlížečích

    - Mozilla Security Blog: [Tighter Control Over Your Referrers](https://blog.mozilla.org/security/2015/01/21/meta-referrer/)

    - W3C: [Referrer Policy](https://w3c.github.io/webappsec-referrer-policy/)

### Přesměrování

Pro starší prohlížeče je asi nejlepší možnost externí odkazy přesměrovat přes universální skript.

Ten sice pořád prozradí odkazující doménu, ale už ne konkrétní URL. Třeba Adminer – nástroj pro správu database – z tohoto důvodu odkazy přesměrovává přes `adminer.org`.

Bez nutnosti vytvářet vlastní skript pro **anonymní přesměrování**, jde využít hotové služby. Třeba:

    - [JDEM.CZ - Anonymizér](http://jdem.cz/anonymizer.html)

Cílová stránka se potom dozví pouze adresu webu zajišťujícího přesměrování.

### HTTPS

Teoreticky by mohlo jít využít toho, že na HTTP weby odkazované z [HTTPS](/https#referer) se referer nepřenáší. U webu běžícího na HTTPS, který odkazuje na HTTP by tak nemělo být potřeba nic řešit.

### Neklikací odkazy

Možné řešení je neuvádět [odkazy](/odkazy) v klikatelné podobě se značkou [`&lt;a>`](/odkaz).

Zkrátka do kódu místo:

```
&lt;a href="http://example.com">example.com&lt;/a>
```

Umístit samotné `example.com`.

Uživatel si potom musí URL překopírovat do adresního řádku, čímž se referer nepřenese. Zkopírování do schránky jde alespoň zpříjemnit [kopírovacím tlačítkem](/kopirovat). I tak je takový postup méně pohodlný než normální odkaz.

V tomto případě ale bohužel existují doplňky, které neklikací text vypadající jako URL učiní klikacím, čímž je celý tento postup lehce nespolehlivý.

### Data URL

Ve starším **Firefoxu** a **Chrome** jde přenosu referera zabránit přesměrováním `&lt;meta>` značkou `refresh`, která se vytvoří ve stránce zapsané do [Data URI](/data-uri):

```
&lt;a href="http://jecas.cz/referer" 
onclick="this.href = 'data:text/html,&lt;meta http-equiv=refresh content=\'0;url=' + this.href + '\'>'"
>
  Je čas bez referera
&lt;/a>
```

[Živá ukázka](http://kod.djpw.cz/qhub) – nepřenášení referera pomocí data URI

## Závěr

Optimální řešení nepředávání hlavičky referrer se zdá být v kombinaci `rel="noreferrer"` pro odkaz / `&lt;meta name="referrer" content="origin">` pro všechny odkazy. Plus přesměrování pro starší prohlížeče.

Detekovat podporu nastavení refereru (atributem `rel` i `&lt;meta>` značkou) bohužel jednoduše nejde. Nezbývá tak než posílat přes přesměrovávací skript i prohlížeče, které vypnutí předávání refereru v HTML podporují. Nebo detekovat název a versi prohlížeče.

Teoreticky jde otestovat (ne)předávání refereru pomocí odkazu směřujícího do neviditelného [`&lt;iframe>`](/ramy#iframe), ale to testuje obecné předávání refereru, ne přímo podporu `rel="noreferrer"`:

    - StackOverflow: [How can I detect rel=“noreferrer” support?](http://stackoverflow.com/a/10020992)

## Referral spam

Ohledně informace o předchozí URL (hlavička referer) se lze setkat se spamováním.

Některé weby a redakční systémy obsahují funkci typu „Kdo sem odkazuje“. Pokud spammer čas od času nafinguje příchod ze svého webu, získá tak zpětné odkazy.

Jiná možnost je donutit k návštěvě vlastního webu webmastera sledující statistiky. Řada správců a majitelů webů sledují, odkud na web chodí návštěvníci. Jde tak zjistit, že se někde o webu píše.

Pokud se nafinguje dostatečný počet návštěv s refererem, je šance, že se majitel webu přijde na web spammera podívat. Tato technika je hodně rozšířená v Google Analytics:

    - Diskuse JPW: [ Návštevy z divných stránek ](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=17&amp;topic=165998)