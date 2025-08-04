---
title: "Jak funguje jecas.cz"
headline: "Jak funguje jecas.cz"
description: "Jak funguje zdejší frontend, backend a jak se to vše nahrává na server."
date: "2019-07-17"
last_modification: "2020-04-05"
status: 1
tags: ["Produktivita", "Rady a nápady"]
---

## Backend

Web používá [Nette Framewrok](https://nette.org) 2.5 běžící v PHP 7.4. Používat novější verse [PHP](/php) je dobré hlavně kvůli rychlosti.

Potřebné závislosti se stahují přes [Composer](https://getcomposer.org). Díky tomu nemusí být v repositáři zduplikován cizí kód a je jednodušší potřebné závislosti instalovat a aktualisovat.

Data článků a štítky jsou uloženy v MySQL.

Proč MySQL, PHP a Nette? Na jaře roku **2013**, kdy jecas.cz vzniknul, to byl dost populární způsob, jak vyrábět weby.

Kvůli nedostatečné rychlosti jsem tehdy zavrhl [WordPress](/wordpress).

Psaní obsahu probíhá přes jednoduchou administraci a **obsah tvořím přímo v HTML**, protože jsem nad ním chtěl 100% kontrolu (např. možnost mít ukázky přímo v textu). Vedle HTML je rovnou vidět živý výsledek:

Dnes bych podobý web nejspíš stavěl na statických generátorech stránek v [JS](/js) jako je třeba [Hugo](https://gohugo.io), [GatsbyJS](https://www.gatsbyjs.org), [VuePress](https://vuepress.vuejs.org) nebo [Nuxt.js](https://nuxtjs.org).

Nemusel bych nic programovat, měl rovnou hotové pohodlné vývojové prostředí s automatickým obnovováním změn, možnost používat JS frameworky jako **React** nebo **Vue.js**, připravené prostředí pro psaní testů, připravené CSS preprocesory apod.

Celý web by potom šel zdarma hostovat na [Netlify](https://www.netlify.com), kde by se nové změny projevily automaticky po publikování do Gitu.

Ale protože to tak není…

## Frontend

CSS je kompilováno pomocí [Gulpu](/gulp-4) ze zdrojových SCSS souborů. JavaScript je pouze spojován.

Výsledné soubory jsou připojeny přes Nette rozšíření Webloader, které aktuálně řeší pouze invalidaci cache.

### Autoprefixer

Psát [CSS prefixy](/css-prefixy) ručně je otrava. Proto je automaticky doplňuje [autoprefixer](https://github.com/postcss/autoprefixer).

### Stylelint

Pro jednotný vzhled SCSS je použit Stylelint.

### Lazy loading

[Zrychlení webu](/rychlost) odloženým načítáním řeší knihovna [vanilla-lazyload](https://github.com/verlok/lazyload), která načítá obrázky a `&lt;iframe>`, až když se k nim uživatel [proscrolluje](/scroll). 

Knihovna je v čistém JS a využívá [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## Server &amp; hosting

Web je provozován na [hostingu eBola.cz](http://www.ebola.cz/r/15998). Důvody pro to jsou hlavně tyto:

    [**HTTPS**](/https) – na jedno kliknutí a zdarma.

    **Různé verse PHP** – pro starší projekty jde zvolit třeba PHP 5.2, pro nové 7.4.

    **Cena** – za 39 Kč měsíčně jde provozovat **5 různých domén**.

Předtím jsem spokojeně hostoval u [Wedosu](https://www.wedos.cz/?ap=zy839S), kde šlo ale za podobnou cenu [mít jen 2 domény](/wedos-alias). Aktuálně to vypadá, že už je možné mít celkem 4, ale pořád se připlácí za HTTPS.

### Přesměrování v `.htaccess`

Přesměrování všech případných subdomén na hlavní doménu.

```
RewriteCond %{HTTP_HOST} ^(.+)\.jecas\.cz$ [NC]
RewriteRule ^ https://jecas.cz/ [L,R]
```

Přesměrování na HTTPS:

```
RewriteCond %{HTTPS} !on
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```

## Deployment

Celý projekt je na GitHubu, kde je možné mít bezplatně i privátní repositáře. Nasazování řeší služba [Buddy.works](https://buddy.works) (do **5 projektů je zdarma**). Díky té jde velmi rychle nastavit build celého projektu a jeho vystavení na server.

Buddy totiž automaticky detekuje, co projekt používá, a navíc má připravené konfigurace pro nejrůznější jazyky a technologie.

Takže připravení **Docker kontejneru** pro PHP a nainstalování závislostí je otázka pár kliknutí.

Celé to v praxi vypadá tak, že při novém `push`nutí do master větve dojde k:

    Připravení prostředí (řeší Buddy automaticky).

    Nainstalování PHP závislostí přes Composer.

    ```
composer install
```

    Nainstalování frontednových závislostí přes NPM a spuštění buildu (Gulp tasku).

    ```
npm install
npm run build
```

    Upload na FTP.

Proč upload na FTP? Není to moc dobré řešení, protože není bezvýpadkové a návštěvník se může dostat na web v průběhu nahrávání, ale je to velmi jednoduché a jde takto fungovat na obyčejném hostingu za pár korun.

### GitHub aplikace

GitHub má [obchod](https://github.com/marketplace) s šikovnými aplikacemi. Používám tyto dvě:

#### [Dependabot Preview](https://github.com/marketplace/dependabot-preview)

Hlídá nové verse použitých knihoven a automaticky připravuje pull requesty pro update, kam rovnou zapisuje seznam změn.

#### [Imgbot](https://github.com/marketplace/imgbot)

Vytváří pull requesty s [datově optimalisovanými obrázky](/optimalisace-obrazku), pokud se do repositáře dostanou neoptimalisované.

## Monitorování chyb

O přehled o řádném běhu PHP i JavaScriptu se stará nástroj [Sentry](https://sentry.io/welcome/).

Když na webu něco rozbije, začnou mi kvůli tomu chodit e-maily s popisem.