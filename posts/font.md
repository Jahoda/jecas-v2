---
title: "Font"
headline: "Font"
description: "CSS vlastnost <code>font</code> slouží k nastavení písma na stránce."
date: "2014-05-07"
last_modification: "2015-01-17"
status: 1
tags: ["CSS", "CSS vlastnosti", "Písma"]
---

Jedná se o zkratku pro mnoho další `font-*` vlastností.

Minimální funkční použití vyžaduje uvést **velikost písma** (`font-size`) a **rodinu písma** (použitý font – `font-family`):

```
body {
  font: 100% sans-serif;
}
```

## `font-style`

Styl písma:

  - `font-style: normal` – výchozí písmo

  - `font-style: italic` – kursiva

  - `font-style: oblique` – zkosené písmo, vypadá většinou stejně jako kursiva

## `font-variant`

Ve starší specifikaci CSS umí `font-variant` pouze nastavit typ písma na **kapitálky**.

  - `font-variant: normal` – výchozí písmo

  - `font-variant: small-caps` – malá velká písmena

(Pro **převod** textu na malá/velká písmena slouží vlastnost `text-transform`.)

V novější specifikaci je `font-variant` **zkratka** pro další CSS vlastnosti.

  - `font-variant-caps`

  - `font-variant-numeric`

  - `font-variant-alternates`

  - `font-variant-ligatures`

  - `font-variant-east-asian`

Některé z těchto vlastností jde používat pomocí [`font-feature-settings`](/font-feature-settings).

## `font-weight`

Upravuje sílu (**tučnost**).

    `font-weight: normal` – normální tloušťka

    `font-weight: bold` – tučné písmo

Kromě toho existuje možnost nastavit **sílu písma** na hodnoty z rozmezí `100`–`900`. Výsledek potom hodně záleží na konkrétním písmu a prohlížeči.

  - `font-weight: 100` – ukázka síly 100

  - `font-weight: 200` – ukázka síly 200

  - `font-weight: 300` – ukázka síly 300

  - `font-weight: 400` – ukázka síly 400 (odpovídá hodnotě `normal`)

  - `font-weight: 500` – ukázka síly 500

  - `font-weight: 600` – ukázka síly 600

  - `font-weight: 700` – ukázka síly 700 (odpovídá hodnotě `bold`)

  - `font-weight: 800` – ukázka síly 800

  - `font-weight: 900` – ukázka síly 900

function nastavitPismo(nazev){
  sila.style.fontFamily = nazev;
}

Nastavit ukázku na písmo: 

Pokud daný font *umí* pouze normální písmo a tučné, bude cokoliv z rozsahu `100`–`500` normální a z `600`–`900` tučné.

Nakonec potom existují ještě hodnoty `bolder` a `lighter`. Jelikož se **síla písma dědí**, lze u potomka vytvořit písmo o jeden stupeň silnější/slabší.

  - `font-weight: lighter`

  - `font-weight: bolder`

Jelikož většina písem má pouze dva stupně tučnosti, nemají klíčová slova `lighter` a `bolder` přílišné využití.

[Test hodnot](http://kod.djpw.cz/wnjb) `bolder` a `lighter`

## `font-size`

### Absolutními klíčovými slovy

  - `font-size: xx-small` – ukázka velikosti `xx-small`

  - `font-size: x-small` – ukázka velikosti `x-small`

  - `font-size: small` – ukázka velikosti `small`

  - `font-size: medium` – ukázka velikosti `medium`

  - `font-size: large` – ukázka velikosti `large`

  - `font-size: x-large` – ukázka velikosti `x-large`

  - `font-size: xx-large` – ukázka velikosti `xx-large`

### Relativními klíčovými slovy

Písmo bude o stupeň větší/menší než velikost rodiče.

  - `font-size: larger` – ukázka velikosti `larger`

  - `font-size: smaller` – ukázka velikosti `smaller`

### Délkovými jednotkami

Velikost se nastaví standardními CSS délkovými jednotkami (`em`, `px` a podobně).

```
font-size: 1em;
```

### Procenty

Písmo bude dvakrát větší než velikost rodiče.

```
font-size: 200%;
```

Při použití procent, relativních délkových jednotek (např. `em`) nebo `larger`/`smaller` jde šikovně využívat **dědičnosti**, klidně na jednom místě změnit velikost písma celého webu a velikosti jednotlivých částí se tomu přizpůsobí.

[Živá ukázka](http://kod.djpw.cz/ynjb)

## `line-height`

Když se za velikost písma u zkrácené vlastnosti `font` napíše lomítko, může se za něj uvést výška řádku.

```
html {
  font: x-small/**300%** Arial, serif;
}
```

Je trochu zvláštní, že pro změnu **výšky řádku** neslouží `font-*` vlastnosti, ale `line-height`.

Výška řádku je hodně důležitá vlastnost s ohledem na **dobrou čitelnost** textu. Při nastavení `line-height` společnému obalu stránky (`&lt;html>`/[`&lt;body>`/`&lt;div class="obal">`](/stylovani-body)) se snadno stane, že pro **velké písmo** bude výška řádku malá a pro **malá písmena** zase moc velká.

[Živá ukázka](http://kod.djpw.cz/bojb)

Je tedy dobré si elementy s větší/menší velikostí písma ohlídat a **výšku řádku** jim upravit. Snadno se na to zapomene u nadpisů, protože se často vejdnou **na jeden řádek**, takže se nesprávná výška řádku hned neprojeví.

## `font-family`

Slouží k nastavení **rodiny písem** / konkrétního fontu. Zadává se konkrétní název písma (například `Arial`), obecná rodina (`sans-serif`) nebo víc položek zároveň.

Protože nikdy není jistota, že konkrétní font bude dané koncové zařízení **podporovat**, obvykle se uvádí několik konkrétních rozšířených fontů zakončených obecnou rodinou.

```
h1 {
  font-family: Arial, Helvetica, sans-serif
}
```

### Obecné rodiny

Zpravidla si jde vystačit s **bezpatkovým** (`sans-serif`), **patkovým** (`serif`) a **neproporcionálním** (`monospace`) písmem.

  - `font-family: sans-serif` – ukázka stylu sans-serif

  - `font-family: serif` – ukázka stylu serif

  - `font-family: fantasy` – ukázka stylu fantasy

  - `font-family: cursive` – ukázka stylu cursive

  - `font-family: monospace` – ukázka stylu monospace

### Uvozovky kolem názvu písma

V některých návodech se uvádí, že víceslovné názvy fontu musí být **obaleny [uvozovkami](/uvozovky#css)**. To je pravda jen částečná – uvozovkami musejí být obaleny názvy obsahující **čísla a speciální symboly**.

Víceslovný název proto bude normálně fungovat i bez uvozovek:

```
element {
  font-family: Lucida Console, monospace;
}
```

    - MDN: [Valid family names](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family#Valid_family_names) – jaké názvy zadané do `font-family` jsou platné

## Systémová písma

Písmo jde také nastavit podle určitých prvků systému. V tom případě se zadává jediná hodnota, která určí použitý font, velikost, tučnost a podobně.

Je poměrně obtížné najít pro tento způsob **rozumné využití**, možná při snaze napodobit v prohlížeči **systémovou aplikaci**.

  - `font: caption` – ukázka písma `caption`

  - `font: icon` – ukázka písma `icon`

  - `font: menu` – ukázka písma `menu`

  - `font: message-box` – ukázka písma `message-box`

  - `font: small-caption` – ukázka písma `small-caption`

  - `font: status-bar` – ukázka písma `status-bar`

### Další hodnoty ve Firefoxu

Firefoxu podporuje ještě další hodnoty systémových stylů s [prefixem](/css-prefixy):

  - `font: -moz-window` – ukázka písma `-moz-window`

  - `font: -moz-document` – ukázka písma `-moz-document`

  - `font: -moz-desktop` – ukázka písma `-moz-desktop`

  - `font: -moz-info` – ukázka písma `-moz-info`

  - `font: -moz-dialog` – ukázka písma `-moz-dialog`

  - `font: -moz-button` – ukázka písma `-moz-button`

  - `font: -moz-pull-down-menu` – ukázka písma `-moz-pull-down-menu`

  - `font: -moz-list ` – ukázka písma `-moz-list `

  - `font: -moz-field` – ukázka písma `-moz-field`

## Styl písma v HTML

Před příchodem CSS se velikost, font a barva písma upravovaly prostřednictvím značek `&lt;font>` a `&lt;basefont>`:

### `&lt;font>`

Řádková značka pro změnu stylu textu přímo v HTML. Tento způsob nastavování písma, ačkoliv není doporučený, stále dobře funguje napříč prohlížeči:

```
&lt;font size="6" color="red" face="sans-serif">
  Velký červený bezpatkový text
&lt;font>
```

[Živá ukázka](http://kod.djpw.cz/twtb)

Podporuje 3 atributy:

  - `size` – velikost písma se udává hodnotami 1–7 (7 je největší)

  - `color` – barva písma (odpovídá CSS vlastnosti `color`)

  - `face` – použitý font (odpovídá CSS vlastnosti `font-family`)

Ačkoliv je `&lt;font>` zavržený, občas se hodí a jeho použití mi přijde rozumné. Třeba v případě potřeby přebarvit text na konkrétní barvu mi přijde:

```
&lt;font color="red">Červený text&lt;/font>
```

Elegantnější než *správná* varianta pomocí CSS:

```
&lt;span style="color: red">Červený text&lt;/span>
```

### `&lt;basefont>`

Nastavení písma jedinou značkou pro celou stránku. Bez používání CSS to bylo docela elegantní, protože nemusel být každý text obalen samostatným `&lt;font>`em, ale styl celé stránky se deklaroval na jednom místě.

```
&lt;basefont face="Arial" color="red">
```

Značka je považována za zastaralou a není v prohlížečích moc podporovaná. Posledním prohlížečem, kde má vliv, je **Internet Explorer 9**. [Ukázka](http://kod.djpw.cz/rwtb).

## Odkazy jinam

  - DevDocs: [`font`](http://devdocs.io/css/font)

  - JPW: [Font](http://www.jakpsatweb.cz/css/font.html)