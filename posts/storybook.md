---
title: "Storybook"
headline: "Storybook"
description: "Storybook je nástroj pro snadné generování přehledu UI komponent."
date: "2021-11-10"
last_modification: "2021-11-18"
status: 1
tags: ["Produktivita", "Rady a nápady", "Style guide"]
---

Při kódování zvlášť větších webů vzniká problém – nikdo už si **nepamatuje**, jaké věci jsou již vytvořené.

Když je potom potřeba přidat novou funkcionalitu, buď se musí celá nakódovat, nebo složitě procházet web a hledat, jestli by nešlo použít už něco hotového.

Tyto problémy snižuje existence tzv. *styleguidu*. A **Storybook** je jedním z takových nástrojů, který styleguide dokáže snadno vytvořit.

      [Storybook – Build component driven UIs faster](https://storybook.js.org)

V praxi je to samostatná aplikace, kde je přehled použitých komponent na webu.

Jde ji následně i zbuildit do statických souborů a vystavit někde veřejně.

To ale není vše, má to další užitečné vlastnosti:

    **Snadnější testování a vývoj** – ve Storybooku jdou znázornit všechny myslitelné stavy komponent a snadno mezi nimi přepínat.

    Není tak nutné složitě simulovat požadovaný stav přímo v aplikaci.

    **Spolupráce více lidí** – frontend vývojář si může bokem připravit jednotlivé komponenty bez nějakých závislostí na backendu.

    Práce jde díky tomu i lépe rozdělit mezi více lidí. Jeden člověk může kódovat komponenty ve Storybooku a jiný je potom implementovat do systému.

    **Dokumentace** – styleguide slouží zároveň jako dokumentace. Kromě zobrazení všech stavů je možné přidat i vlastní textové poznámky k použití.

    **Sdílení stylů napříč projekty** – je-li potřeba nějaké společné styly používat na různých projektech, styleguide může hodně pomoci.

    Vytvoří se nový repositář se Storybookem, kde se společné hotové styly odpresentují, a celé se to potom připojí jako závislost.

    **Podpora různých frameworků/knihoven** – není nutné používat jenom např. React, ale podporována je prakticky libovolná populární JS knihovna, web komponenty, čisté HTML, čisté CSS nebo různé CSS preprocesory.

      - React

      - Vue

      - Angular

      - Web Components

      - Ember

      - HTML

      - Mithril

      - Marko

      - Svelte

      - Riot

      - Preact

      - Rax

## Instalace

Nejjednodušší je nainstalovat do projektu přes `npx`:

```
npx sb init
```

Pokud `npx` neexistuje, stačí doinstalovat přes `npm install -g npx`.

Instalace Storybooku je tak chytrá, že automaticky rozpozná použitý JS framework, vše podle toho nainstaluje a připraví v daném stylu ukázku.

**Spouští** se přes:

```
npm run storybook
```

Zobrazit by se měla nová stránka s příkladem pár komponent:

## Dokumentace komponenty

Ve výchozím nastavení se komponenty, které mají být zdokumentované ve Storybooku, dávají do složky `stories`.

Hned vedle komponenty ke zdokumentování se vytvoří další komponenty se `stories` před příponou, která popisuje, jak se má komponenta používat.

Příklad ve **Svelte**:

U komponenty mohou být i CSS styly, které se do ní potom importují, záleží na preferovaném způsobu stylování.

Tento postup není nijak vnucený, samotné komponenty i *stories* mohou být v libovolných umístěních.

Samostatná složka se vůbec nemusí používat, klidně stačí založit vedle komponenty soubor `neco.stories.js` a Storybook si to sám najde.

(Dokonce i ty soubory mohou mít místo `stories` v názvu třeba `fytopuf` a může to při požadovaném nastavení v `.storybook/main.js` fungovat.)

To je hezká vlastnost Storybooku, že jde snadno **začlenit i do již existujícího projektu** a začít postupně dopisovat dokumentaci.

## Storybook a Vite

Kromě různých JS frameworků Storybook podporuje i jiné nástroje pro build.

Jde použít i [Vite](/vite) a výrazně si zrychlit celý build a následný hot reload.

Stačí nainstalovat s parametrem pro Vite builder:

```
npx sb init --builder storybook-builder-vite
```

## Závěr

Osobně nevidím moc důvod nástroj typu Storybook nepoužívat. Není to jen pro nové projekty – jde ho prakticky okamžitě přidat i do něčeho staršího.

Snad s výjimkou nějakého prototypování, kdy může psaní dokumentace zdržovat, ale u dlouhodobého projektu se to vyplatí.