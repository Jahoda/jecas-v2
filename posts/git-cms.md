---
title: "CMS založené na Gitu"
headline: "CMS založené na Gitu"
description: "K čemu jsou dobré redakční systémy postavené na Gitu."
date: "2023-01-29"
last_modification: "2023-01-29"
status: 0
tags: []
---

Pro správu obsahu se často hodí mít tzv. redakční systém (CMS = *content management system*).

Otázka je, kam redakční systém ukládá data.

Například v roce 2023 stále nejrozšířenější [WordPress](/wordpress) ukládá data do **SQL database**.

To přináší jistou režii pro provoz – DB někde musí běžet, musí být někde [hostovaná](/hosting).

## Statické stránky

V posledních letech se znovu do hry vrátily **statické stránky**. To nutně neznamená, že tvůrce obsahu [ručně vytváří](https://www.jakpsatweb.cz/jak-udelat.html#soubory) jednotlivé `*.html` soubory.

Statické soubory mohou vzniknout až v okamžiku *buildu*.

Existuje řada hotových řešení pro generování statických stránek:

  - [Astro](https://astro.build)

  - [Gatsby](https://www.gatsbyjs.com)

  - [Hugo](https://gohugo.io)

  - [Jekyll](https://jekyllrb.com)

A mnoho [dalších](https://jamstack.org/generators/).

## Markdown

[Markdown](/markdown) nabízí způsob, jak v obyčejném textu používat strojově pochopitelné formátování. Místo HTML značek se používají lidsky intuitivnější symboly:

```
# Nadpis
Odstavec s **tučným** a *šikmým textem*
1. číslovaný seznam
2. s několika
2. položkami
```

Pro Markdown existuje hromada nástrojů, pluginů a editorů a pomalu se rozšiřuje i mimo programátory.

## Git

Git je nástroj pro versování zdrojových kódů. Nad Gitem jsou navíc postavené online služby pro jeho nahrávání na internet.

Nejpoužívanější je [GitHub](https://github.com) a [GitLab](https://about.gitlab.com).

## Hosting s podporou Gitu

Existuje mnoho služeb, které se na pár kliknutí dokáží napojit na Git repositář na GitHubu nebo GitLabu a jeho obsah automaticky deployovat (vystavit na veřejnou URL).

  - [Netlify](https://www.netlify.com)

  - [Vercel](https://vercel.com/)

  - [GitHub Pages](https://pages.github.com)

  - [Cloudflare Pages](https://pages.cloudflare.com)

Díky tomu, že mohou být *serverless*, jde na nich menší weby hostovat zdarma.

## Serverless hosting

Serverless je v překladu *bezserverový*. Co to znamená? Přece to musí běžet na nějakém serveru.

Zjednodušeně řečeno se termínem serverless myslí situace, kdy se vývojář vůbec nestará o server. Nemusí řešit potřebné prostředky, ale vše škáluje automaticky.

Aplikace tak vytěžuje servery, jen když je zrovna potřeba.

Takže v situaci, kdy na web nechodí moc lidí, je jeho provoz velmi levný.

## Stateless

*Stateless* – tedy bezstavové – jsou aplikace, které neukládají trvalá data na server.

Tato architektura umožňuje snadnější škálování a zlepšuje dostupnost aplikace, protože stav aplikace není uložen na konkrétním serveru.

## Headless CMS

Česky přeloženo jako *bezhlavé* (headless) jsou redakční systémy, které neřeší frontend webu, ale pouze správu dat.

Data se z takových CMS buď stahují přes API, nebo ukládají data do souborů.

- [Headless CMS](https://jamstack.org/headless-cms/) – seznam spousty headless CMS

## Git-based CMS

Díky dříve zmíněným technologiím existují *Git-based* redakční systémy, tj. založené na Gitu.

Z toho plyne, že Git repositář se používá jako **úložiště obsahu**. Změny na stránce se tak provádí klasickými *commity*.

To ale nutně neznamená, že vyžadují **znalost práce s Gitem**, protože tak mohou fungovat jen na pozadí. Pro uživatele se to může tvářit jako běžný CMS.

Implementace je obvykle velmi jednoduchá – víceméně stačí redakčnímu systému dát přístup k repositáři na GitHubu/GitLabu a rovnou začít provádět změny.

### Netlify CMS

[Netlify CMS](https://www.netlifycms.org) je open-source redakční systém.

Není nutné ho používat jen na Netlify.

### Prose.io

[Prose](https://prose.io) dokáže po připojení GitHub repositáře upravovat libovolné soubory. Pro soubory v Markdownu nabízí přehledný editor i s možností uploadu souborů.

### Tina

[Tina](https://tina.io) (dříve [Forestry](https://forestry.io))

### GitHub Pages

GitHub Pages dokáží generovat statické stránky přes [Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)

## Odkazy jinam

    [Nitro](https://nitro.unjs.io/deploy) – přehled hostingů

    [Fly.io](https://fly.io)
  
  - [Supabase](https://supabase.com)

  - [PlanetScale](https://planetscale.com) – serverless MySQL