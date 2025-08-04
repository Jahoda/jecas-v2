---
title: "Rámy v HTML"
headline: "HTML rámy"
description: "Rámy v HTML umožňují zobrazit na jedné stránce obsah z více různých zdrojů."
date: "2015-07-09"
last_modification: "2015-10-14"
status: 1
tags: ["HTML", "HTML značky"]
---

V dřívějších dobách bylo běžné sestavovat stránku pomocí rámů. Při používání prostého HTML to byl (a stále je) snadný způsob, jak spravovat **obsah společných částí**.

Dnes se rámy používají především pro **vkládání obsahu z cizích stránek**. Jsou tak [vkládána videa z YouTube](/youtube-vlozit), pluginy ze sociálních sítí jako třeba [Facebook Like tlačítko](/responsivni-facebook) nebo reklamy.

Výhoda rámu je **oddělení stránky A** se značkou `&lt;iframe>` od **stránky B**, která se do rámu načítá. Stránka B si tak zachová svůj původní styl. To se při vkládání obsahu externím JavaScriptem nestane – skriptem vložený kód se stane normální součástí stránky. Totéž platí při [stahování cizí stránky](/stazeni-stranky) v PHP.

## Bezpečnost rámů

Protože se stránka v rámu chová v podstatě stejně jako stránka v nové záložce – uživatel je v ní přihlášen a podobně – možnost používat rámy může způsobovat **bezpečnostní risika**.

Když se na stránku přidá nějaké lákavé tlačítko a přes něj se umístí neviditelná stránka v rámu, jde tak přimět uživatele, aby v přihlášené stránce v rámu provedl nějakou akci:.

    - [Clickjacking](/clickjacking) – získání kliknutí od uživatele, aniž by o tom věděl

Někteří provozovatelé webů proto načtení svého webu do rámu blokují HTTP hlavičkou `X-FRAME-OPTIONS: SAMEORIGIN`.

Výchozí chování dále zabraňuje JavaScriptu v přístupu do **rámu z externí URL**.

Totéž platí pro stránku, která je do rámu vložená: **nemůže se dostat** ke svému rodiči.

### Vyskočení z rámu

Existuje jedna možnost, jak může stránka vložená do rámu **opustit svou nadřazenou stránku**:

```
window.top.location = "http://jecas.cz";
```

Když se toto do stránky umístí a stránka se vloží do `&lt;iframe>`, po načtení rámu bude přesměrováno na `http://jecas.cz`.

Při použití `#kotvy` je to možnost, jak z vložené stránky předat *nahoru* nějaká data:

```
window.top.location = "#data";
```

## Rám `&lt;iframe>`

Značka `&lt;iframe>` má [povinnou koncovou značku](/html-znacky#povinne). Použití *iframe* pro vložení videa z YouTube vypadá následovně:

```
&lt;iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/6HT-yirOGoo" 
  frameborder="0" 
  allowfullscreen
>
&lt;/iframe>
```

### Atributy `&lt;iframe>`

    `width` a `height` – šířka a výška

    `src` – stránka, která se do rámu načte

    `allowfullscreen` – v podporovaných prohlížečích je nutný k možnosti zobrazit obsah z rámu přes celou obrazovku (jeho podpora se bude zvyšovat), pro starší **Webkity** a **Gecka** existuje tento atribut s prefixy `mozallowfullscreen` a `webkitallowfullscreen`

        [Test atributu `allowfullscreen`](http://kod.djpw.cz/ddob)

    `frameborder` – rámy mají ve výchozím stylu rámeček `border: 2px inset`, tímto atributem nebo **pomocí CSS** jde zrušit

    Atribut `frameborder` je **[nevalidní](/validita) v HTML 5**, ale při nabízení kódu pro vložení na stránky se z praktických důvodů používá. Výchozí rámeček je typicky nežádoucí a autor webu, co rám na svou stránku vkládá, by ho nemusel umět zrušit.

    `name` – pro otevírání cíle odkazu ze stránky do rámu je nutné rám pojmenovat, stejná hodnota jako atributu `name` se potom zadá do `target` u [odkazu](/odkaz)

### Nové HTML 5 atributy

    `sandbox` – atribut slouží pro **zvýšení ochrany** stránky, která do sebe vkládá cizí web pomocí `&lt;iframe>`

    Podporují prohlížeče **IE 10**, **Chrome 4**, **Firefox 17**, **Opera 15** a novější.

    Samotné uvedení atributu `sandbox` zakazuje několik věcí (uvedeno níže). Pokud je třeba povolit některou z nich, přidá se do hodnoty atributu (hodnot `allow-*` může být uvedeno více, oddělují se mezerou).

      - `allow-same-origin` – Stránka v rámu se bude chovat jako by byla stejného původu jako stránka, která ji do rámu načítá

      - `allow-top-navigation` – Stránka z rámu může způsobit přechod na jinou URL u nadřazené stránky.

      - `allow-forms` – Stránka v rámu může odesílat formuláře.

      - `allow-popups` – Povolí zobrazování [vyskakovacích oken](/nove-okno).

      - `allow-scripts` – Povolí spouště skripty.

      - `allow-pointer-lock` – Umožní stránce v rámu sledovat pohyby myši.

    `seamless` – má sloužit k **těsnému propojení** rodičovské stránky a stránky v rámu

    Obsah rámu by tak měl dědit CSS od svého rodiče, otevírat odkazy v nadřazeném okně a podobně. V říjnu 2015 ho nepodporoval žádný prohlížeč.

    `srcdoc` – existuje kvůli zpětné kompatibilitě. Pokud bude prohlížeč `srcdoc` znát, dá se očekávat, že bude znát i atributy `sandbox` a `seamless`. V takovém případě se tímto atributem dá **změnit cíl rámu** na stránku, která s tím bude počítat.

### Zastaralé atributy

Řada dalších, především presentačních, atributů byla v HTML 5 označena jako zastaralé a nejsou validní.

  - `align` – zarovnávání (jde použít [`float`](/float))

  - `marginheight`, `marginwidth` – odsazení (nahrazuje [`margin`](/margin))

  - `frameborder` – nahrazuje CSS `border`, ale stále se používá kvůli výchozímu rámečku

  - `scrolling` – skryje posuvníky a zabrání rolování

  - `longdesc` – URI s popisem rámu

### Automatická výška rámu

Při vložení stránky pomocí `&lt;iframe>` není elegantní nutnost nastavovat pevnou výšku. Když je obsah delší, zobrazuje se potom posuvník. Pro stránky ze stejné domény to jde řešit JavaScriptem:

    - [Automatická výška `&lt;iframe>` podle obsahu](/vyska-iframe) – nastavení výšky rámu podle obsahu

## Použití značky `&lt;frameset>`

Pomocí značky `&lt;frameset>` se hlavní stránka `index.html` rozdělila na několik částí a pomocí značky `&lt;frame>` se do těchto oblastí připojil obsah.

Z menu (`menu.html`) potom vedly odkazy s nastaveným cílem (atribut `target`) do rámu pro obsah.

Používání rámů přináší značné nevýhody:

  - Návštěvník se může dostat například na stránku `obsah.html` bez zobrazení menu a hlavičky.

  - Během procházení webu je **adresa** zobrazená v liště prohlížeče stále stejná.

  - Stejně tak je stále stejný **titulek stránky** (značka `&lt;title>`).

    - Jak psát web: [Problémy rámů aneb proč je nepoužívat](http://www.jakpsatweb.cz/ramy-problemy.html) – popis dalších problémů rámů

S rozšířením **podpory PHP** a dalších programovacích jazyků na straně serveru přestal být problém stránku skládat z jednotlivých kousků. Přestal tak být důvod rámy hojně používat.

    - [Složení jednoduchého webu v PHP](/include) – pospojování webu z kousků funkcí `include`

V PHP potom vznikla řada **redakčních systémů**, které skládání výsledných stránek řeší automaticky. Autor webu tedy ani nemusí umět programovat.

Používání rámů `&lt;frameset>` + `&lt;frame>` nakonec bylo označeno jako **zastaralé/překonané v HTML 5** a není tedy validní:

## Alternativní obsah

V případě, že prohlížeč **nepodporuje nebo blokuje rámy**, jde přidat dovnitř elementu alternativní obsah.

U značky `&lt;iframe>` přímo mezi její počáteční a koncovou značku.

```
&lt;iframe>
  Alternativní obsah
&lt;/iframe>
```

Dříve se ještě pro alternativní obsah ke značce `&lt;frameset>` používala značka `&lt;noframes>`. Ta je v HTML 5 označena jako překonaná.

` jde pomocí několika `&lt;iframe>` a jejich umístěním pomocí CSS.

Aternativou k `&lt;iframe>`

-->