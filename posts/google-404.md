---
title: "Google a chybová stránka 404"
headline: "Google ignoruje obsah „404 stránky“"
description: "Jak se staví Google k obsahu chybové stránky s kódem 404/410."
date: "2015-01-20"
last_modification: "2015-07-21"
status: 1
tags: ["SEO", "Google"]
---

Pro případy, kdy se uživatel dostane na URL, která na webu **neexistuje**, bývá dobré vytvořit „chybovou stránku 404“.

**Chybová stránka** má smysl pro návštěvníka, protože se z ní může dozvědět, kde by původní obsah mohl najít. Aby robot vyhledávače poznal, že se jedná o **chybovou stránku**, posílá se HTTP kód 404 nebo 410.

  - **404 Not Found** – stránka nebyla nalezena, není vyloučeno, že v budoucnu bude fungovat
  
  - **410 Gone** – stránka **byla zrušena** a není plánované její obnovení

Zajímavý je přístup, kterým se k 404/410 stránkám **chová Google**. Jejich obsah totiž úplně **ignoruje**.

Na Twitteru to [potvrdil](https://twitter.com/JohnMu/status/556889502187536384) **John Mueller** z Googlu.

  We ignore everything on pages that return 404/410 when we crawl them - make them work for your users.

## Minimum 404 stránek

Plyne z toho mimo jiné následující – snažit se mít minimální počet zpětných odkazů a přístupů na stránky vracející kód 404.

    - [Dohledání a opravení rozbité adresy](/oprava-url) – překlepy v odkazech může jít automaticky opravit a přesměrovat

Pomůže se i držet pravidla **nikdy neměnit URL**. A když už, tak všechny staré URL **přesměrovat na nové**.

    - **Yuhů**: [Tři zásady pro tvorbu dobrých SEO URL](http://weblog.jakpsatweb.cz/d/1333060980-tri-zasady-pro-tvorbu-dobrych-seo-url.html)

Pokud na nějakou neexistující URL chodí návštěvníci nebo vedou odkazy, je dobrý nápad na takové adrese **vytvořit obsah**.

## Zrušený obsah

Častou chybou je, že autor webu neaktuální obsah (např. zboží v e-shopu, co se už neprodává) jednoduše **smaže**. Zbytečně se tím připraví o případné návštěvy z vyhledávání.

Ideální postup je na stránku přidat informaci, že už **není aktuální**. A k tomu nabídnout návštěvníkovi obsah, který by ho mohl zajímat.

## Zjištění chyb 404

Aby se mohlo s případnými neexistujícími stránkami něco dělat, je dobré je **zaznamenávat** (*logovat*). To jde mnoha způsoby jako je:

  - Logování chybových stránek na straně serveru.

  - Používání nějakého počitadla. Např. [Google Analytics](/ga).

  - Logování 404 v redakčním systému. Třeba [WordPress](/wordpress) to umí s doplňkem **SEO Ultimate**.

## Zobrazení odkazu na archive.org

Archivní služba, která ukládá čas od času podoby webových stránek, nabízí jednoduchý způsob, jak na stránku 404 přidat odkaz na **zobrazení z archivu**.

Stačí vložit kód:

```
&lt;div id="wb404">&lt;/div>
&lt;script src="https://archive.org/web/wb404.js">&lt;/script>
```

V případě, že je z archivu co zobrazit, se objeví informace s odkazem.

Jinak se neukáže nic.

    - [Free “404: File Not Found” Handler for Webmasters to Improve User Experience](https://blog.archive.org/2013/10/24/web-archive-404-handler-for-webmasters/)

Tip na toto řešení poslal [Jan Barášek](http://baraja.cz/).