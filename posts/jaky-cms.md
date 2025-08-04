---
title: "Jaký CMS použít pro svůj web"
headline: "Jak vybrat CMS pro svůj web"
description: "Jaký redakční systém zvolit pro správu obsahu na webu."
date: "2022-01-19"
last_modification: "2022-01-19"
status: 0
tags: []
---

Chce-li člověk vytvářet obsah na webových stránkách existuje několik možností:

  - Všechno si programovat sám a nějak nahrávat na [webhosting](/hosting).

  - Zvolit nějaké hotové řešení pro správu obsahu (tzv. CMS – *content management system*). Ať už hostované ve vlastní nebo cizí režii.

Pokud se člověk nechce zaobírat vývojem vlastního technického řešení pro správu obsahu, ale **víc se zaměřit na obsah samotný**, je celkem logické použít něco hotového.

## Kde hostovat?

Důležité kritérium pro správný výběr RS (redakčního systému) je otázka hostování webu.

Pokud je web vážně myšlený a hodně důležitý, je vhodné mít **připraven záložní plán** pro případ:

  - dlouhého výpadku,

  - ukončení služby,

  - nepřijatelného zdražení

To je obvykle snazší u vlastního hostingu (*self hosted*), kde stačí potřebná data nahrát někam jinam.

Nabízí-li někdo přímo hostování konkrétního redakčního systému, je dobré mít migrační plán pro případ, že by nastal problém. Některé služby takový export nemusí nabízet.

## Doména

Doménu určitě doporučuji vlastní. CZ doména stojí cca 175 Kč za rok.

      [Jak vybrat vhodnou doménu?](/domena)

Pokud by byl web na jiné než vlastní doméně, hrozí další risiko ztráty kontroly nad touto doménou.

## Typy CMS

S příchodem rozšíření [JavaScriptu](/js) a tzv. **JAMStacku** (**J**avaScript, **A**PI a **M**arkup) vzniklo hodně nástrojů, které umožňují doslova naklikat potřebnou datovou strukturu, ze které je automaticky vytvořeno API.

Na toto API se potom připojí frontendová aplikace v JS (typicky v reaktivním JavaScriptu, takže Reactu, Vue nebo Svelte).

Výsledkem potom může být vygenerování statických souborů, které se následně nahrají na hosting.

Tyto CMS se v angličtině nazývají jako *headless CMS*.

      [Headless CMS](https://jamstack.org/headless-cms/) – rozsáhlý přehled CMS

### [Strapi.io](https://strapi.io)

Elegantní rozhraní pro naklikání si potřebné struktury během chvíle. Automaticky se k tomu generuje API.

Administraci je možné si hostovat u sebe nebo to nechat na Strapi.

Podobné nástroje:

  - [DatoCMS](https://www.datocms.com)

  - [Contentful](https://www.contentful.com)

### [Forestry.io](https://forestry.io)

Změny commituje do repositáře.

### [Ghost](https://ghost.org)

Uživatelsky přívětivé.

### [Webflow](https://webflow.com/)

Umožňuje si web doslova nakreslit bez znalosti programování.

## Zdarma, nebo placené?