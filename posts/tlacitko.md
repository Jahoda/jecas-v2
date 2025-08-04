---
title: "Tlačítko na webu"
headline: "Tlačítko na webu"
description: "Jaké HTML značky používat pro tlačítka na webových stránkách a aplikacích."
date: "2015-11-09"
last_modification: "2015-11-29"
status: 1
tags: ["Formuláře", "Rady a nápady", "Odkazy"]
---

Tlačítka jsou základním prvkem každé webové aplikace. Ať jde o jednoduchý kontaktní formulář nebo o JS aplikaci typu emailový klient (např. [Outlook.com](/outlook-com) nebo Gmail). I běžný odkaz v menu jde svým způsobem považovat za tlačítko.

## Značky

V HTML existuje pro tlačítko přímo značka [`&lt;button>`](/button). V podstatě stejnou podobu a funkčnost nabízí i značka [`&lt;input>`](/input) – s typem `button`/`submit`.

Obě značky se obvykle používají uvnitř formulářů.

## Různé podoby tlačítka

Tlačítko jde ale vytvořit více způsoby.

  - `&lt;button>` (s `type=submit` nebo `type=button`)

  - `&lt;input>` (s `type=submit` nebo `type=button`)

  - `&lt;input type="image">` – obrázkové tlačítko

  - [`&lt;a>`](/odkaz) – běžný HTML odkaz

  - `&lt;div>`/`&lt;span>`

Je možné dlouze diskutovat, jestli je lepší `&lt;button>`, `&lt;input type="button">`, odkaz a podobně. Záleží ale na okolnostech. Každý ze způsobu má výhody i nevýhody.

### Systémový vzhled

Pokud se člověk nechce zabývat vlastním [stylem tlačítek](/vzhled-formularu) (to obnáší vytvořit styl pro 5 různých stavů), při použití `&lt;button>`/`&lt;input type="button">` obstará styl prohlížeč v kombinaci s operačním systémem.

Tlačítko má potom bez práce vzhled pro všechny stavy, navíc je na něj uživatel zvyklý.

### `&lt;button>` vs. `&lt;input type="button">`

Rozhodování mezi tlačítkem a input-tlačítkem je potom celkem jednoduché. Input-tlačítko v sobě **nemůže mít HTML obsah**.

Má-li mít tlačítko například ikonku, s `&lt;button>`em jde použít následující:

```
&lt;button>
  &lt;span class="ikona">&lt;/span>
  Popisek
&lt;/button>

```

V případě `&lt;input type="submit">`/`&lt;input type="button">` by se obrázková ikona musela řešit pozadím přímo pro `&lt;input>`. Tento postup nemusí být tak pohodlný.

Stejně tak vzhledem k tomu, že `&lt;input>` nemá obsah, nejde u něj použít pseudo-elementy [`:before`/`:after`](/css-selektory#before-after).

V dřívějších dobách se častěji používal `&lt;input type"submit">`, protože se formulářové prvky tolik nestylovaly a `&lt;button>` se ve starších **IE** choval odlišně:

    Do **IE 6** se odesílal obsah všech `&lt;button>`ů ve formuláři (ne jen ten stisknutý).

    Do **IE 7** se místo atributu `value` tlačítka  odesílal jeho HTML obsah mezi `&lt;button>` a `&lt;/button>`.

    Do **IE 8** se tlačítko neodeslalo při potvrzení formuláře klávesou Enter z jiného políčka. (Jeho `name` a `value` se nepřenesly na server.)

Dnes kvůli častějšímu stylování a potřebě mít HTML kód v tlačítku převládá spíš `&lt;button>`. Problémy se staršími **IE** se buď ignorují, nebo jim lze předcházet návrhem serverového skriptu, který nedetekuje odeslání formuláře podle odesílacího tlačítka ale podle jiných prvků.

### Obrázkový `&lt;input type="image">`

Jako tlačítko jde použít běžný obrázek:

```
&lt;input type="image" src="obrazek.png" alt="Odeslat">
```

Tento postup se prakticky nepoužívá, protože styl tlačítka jde universálněji vykouzlit pomocí CSS. Pro tlačítka s různými popisy by se muselo generovat spoustu obrázků.

## Odkaz

Běžný [HTML odkaz `&lt;a>`](/odkaz) se hodí pro tlačítka, která nemají odesílat obsah jiných formulářových prvků, byť i to by s JavaScriptem šlo.

Odkaz není problém [nastylovat jako tlačítko](/odkaz-tlacitko) i je možné se na něj standardně dostat pouze z klávesnice klávesou Tab.

Hlavní rozdíl mezi mezi odkazem a formulářovým tlačítkem je v tom, že tlačítko jde aktivovat kromě Enteru i klávesou Space (mezerník).

Používat odkaz se obecně hodí u tlačítek, která **vedou na nějakou URL**. Návštěvník si tak cíl odkazu může pohodlně zkopírovat do schránky, standardním způsobem cíl otevřít do nové záložky a podobně.

V případě `&lt;button>`u se zobrazí většinou standardní kontextová nabídka jako u kteréhokoliv jiného obyčejného elementu.

## Neutrální `&lt;div>`/`&lt;span>`

V rozhraní některých velkých JS aplikací se je možné setkat s tím, že tlačítka jsou jen obyčejné `&lt;div>`y/`&lt;span>`y.

Příklad z [Google+](/google-plus):

Taktéž v **Gmailu** je tlačítkem neutrální značka:

I pro obyčejný `&lt;div>` není problém **doplnit chování** jako má běžné formulářové tlačítko:

    Atributem [`tabindex`](/tabindex) umožnit ovládání klávesnicí.

    Atributem `role="button"` sdělit hlasovým čtečkám, že se jedná o tlačítko.

    Vlastností [`user-select`](/zakazat-oznaceni-textu#user-select) zakázat označení obsahu.

    Pomocí JS událostí připojit příslušné akce.

Pokud aplikace stejně [bez JavaScriptu](/bez-javascriptu) nefunguje a styl tlačítek má být vlastní, není příliš důvod se neutrálním značkám bránit.

Na jednu stranu je těmto *tlačítkům* nutné přidat některé vlastnosti, aby se chovala jako opravdová tlačítka, na stranu druhou odpadne nutnost při stylování **přebíjet výchozí styly prohlížečů**.

Někdy to není úplně snadné:

    - [Stylování formulářových políček a tlačítek](/stylovani-inputu)

    - [Vyšší tlačítko ve Firefoxu](/firefox-vyssi-tlacitko)

## Odkazy jinam

  - [Jordan Scales na Twitteru](https://twitter.com/jdan/status/663835261948837888): Jaké jsou výhody `&lt;div>`u oproti `&lt;button>`?

  - CSS Tricks: [When To Use The Button Element](https://css-tricks.com/use-button-element/)