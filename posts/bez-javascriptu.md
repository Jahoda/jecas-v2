---
title: "Má web fungovat bez JavaScriptu?"
headline: "Má web fungovat bez JavaScriptu?"
description: "Při tvorbě webu je potřeba zvážit, jestli a jak má fungovat bez podpory JavaScriptu."
date: "2015-09-15"
last_modification: "2015-09-28"
status: 1
tags: ["JavaScript", "Rady a nápady"]
---

Názory na to, jestli se mají podporovat **lidé s vypnutým JavaScriptem**, se mohou lišit. Od snahy, aby web bez JS fungoval, až po názory na návštěvníky bez JS typu:

  Takový lidi si zaslouží chcípnout.

  – [Zdeněk Haták](http://hatak.cz/), front-end developer

Desktopový Facebook zastává podobný názor:

Na Alza.cz si **bez JS** nejde nic objednat, protože tlačítko *Koupit* je závislé na JS akci:

## Selhání JavaScriptu

Jelikož **podíl zařízení nepodporujících JavaScript** je naprosté minimum, může se zdát zbytečné situace bez dostupného JS řešit.

Nicméně:

  Stránky funkční bez JavaScriptu se nedělají pro návštěvníky s vypnutým JS. Dělají se hlavně pro **případ jeho selhání**.

I u zařízení plně podporující JS se mohou stát dvě věci:

    Soubor se skriptem se **nepovede načíst**. Buď se vůbec nestáhne vlivem pomalého/přerušeného spojení, nebo se načte později, než jeho funkce uživatel potřebuje.

    Do skriptu **programátor zanese chybu**, která v určitých případech způsobí celkové selhání. JS není tolik tolerantní k chybám jako HTML/CSS.

Řešit danou věc v CSS nebo nejlépe v HTML **přináší vyšší stabilitu a odolnost** stránky.

## Rozšiřování funkčnosti

Ideální je tak všechno řešit co nejblíže HTML/CSS a JavaScriptem zajišťovat až **rozšířenou/vylepšenou funkcionalitu**.

Nicméně v praxi může být tento přístup hodně pracný, takže typicky **dochází ke kompromisům**, kdy něco bez JavaScriptu tak dobře nefunguje.

Je třeba si **určit priority**, aby bez JS fungovaly alespoň stěžejní součásti webu:

  - V případě obsahové stránky by se měl zobrazit obsah. To je dost důležité i s ohledem na [SEO](/seo), protože některé vyhledávače mají s **obsahem vypisovaným skriptem** problém.

  - U služby pro nahrávání obrázků by kromě [drag &amp; drop](/upload) uploadu v AJAXu měl existovat klasický formulář s `&lt;input type="file">`.

  - Při použití [AJAXového](/ajax) objednávkového formuláře by měla existovat standardní cesta, jak formulář odeslat.

A tak dál…

## Jak vypnout JavaScript

Pro ověření, že je web bez JS použitelný, je vhodné skriptování pro otestování vypnout.

Jde to ve [vývojářských nástrojích](/vyvojarske-nastroje) po stisku F12. Postup v **Chrome**:

    Vpravo nahoře je ikona pro *Nastavení*:

    Na začátku je přímo volba *Disable JavaScript*

## Detekce JS

Jak detekovat, že je JavaScript vypnutý, popisuje následující samostatný článek:

    - [Detekce zapnutého JavaScriptu](/vypnuty-js)

Pokud je web na JS existenčně závislý, je dobré na to upozornit ve značce `&lt;noscript>`. Návštěvník může mít omylem **vypnuté skriptování**, aniž by si to uvědomoval.

## Skrývání obsahu

Jedna z nejčastějších chyb webových tvůrců nastává při skrývání obsahu, který následně má zobrazit JS funkce.

```
&lt;div id="skryty" style="display: none">
  Skrytý obsah
&lt;/div>
&lt;button onclick="$('#skryty').show()">
  Zobrazit
&lt;/button>
```

[Živá ukázka](http://kod.djpw.cz/eiqb)

Bez JS se nikdo ke skrytému obsahu nedostane.

### Řešení

Lepší postup je přidat třídu `js` pro element `&lt;body>`:

```
&lt;body>
&lt;script>
document.body.className+= ' js';
&lt;/script>
```

A skrývání provádět přes CSS:

```
.js #skryty {
  display: none;
}
```

Ani tento postup není úplně ideální, protože třída `js` se typicky nastaví dříve, než se stáhne ostatní JavaScript umožňující zobrazení skrytého obsahu.

Nabízelo by se tedy obsah skrývat až v momentě, kdy bude **připravena funkce pro jeho zobrazení**.

To by ale zase způsobilo **poskakování stránky** při načítání skrývajících skriptů.

Proto je šikovné problém obejít a řešit co nejvíce věcí v HTML/CSS. Případně dát na stažení obslužného JS nějaký časový limit – třeba **3 vteřiny** – po kterém se `js` třída zase odebere.

```
var jsCasovac = setTimeout(function() {
  document.body.className = 
    document.body.className.replace(" js", "");
}, 3 * 1000);
```

Po stažení obslužné JS funkce se případně tento časovač zruší:

```
clearTimeout(jsCasovac);
```

A opět se přidá JS třída:

```
document.body.className+= ' js';
```

**Poznámka**: Pro práci s třídami by bylo lepší v podporovaných prohlížečích (**IE 10+**) použít vlastnost [`classList`](/prepinani-trid#classlist).

## Řešení bez JavaScriptu

Postupem času jde více a více věcí řešit v HTML/CSS bez použití JavaScriptu:

  - Animace přes [`animation`](/animation) a [`transition`](/transition)

  - [Rozbalování a sbalování obahu v CSS](/css-rozbalovani) – využívá se `&lt;input type=checkbox>` a CSS [selektor `:checked`](/css-selektory#checked)

  - [Jednoduché filtrování dat v čistém CSS](/css-filtrovani-dat) – používá se `radio` [`&lt;input>`](/input) a selektor `:checked`

  - [Přepínání záložek pomocí `:target`](/zvyrazneni-kotvy)

  - [Popisek/tooltip pouze v CSS](/tooltip)

  - [Odpočítávání času](/odpocitavani#css) – používá se CSS animace

## Odkazy jinam

  - [Maybe we could tone down the JavaScript](https://eev.ee/blog/2016/03/06/maybe-we-could-tone-down-the-javascript/) – popis problémů nefunkčnosti bez JS

  - [The Website Obesity Crisis](http://idlewords.com/talks/website_obesity.htm) – úvaha ohledně přeplácání webů zbytečnými obrázky a skripty