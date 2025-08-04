---
title: "Přihlašování pomocí PINu"
headline: "Přihlašování pomocí PINu"
description: "Kdy a proč používat ve webových aplikacích přihlašování pomocí PIN kódu."
date: "2015-09-01"
last_modification: "2016-12-21"
status: 1
tags: ["Formuláře", "Bezpečnost", "Hesla"]
---

PIN je zkratka anglického *personal identification number* – tedy **osobní identifikační číslo**.

Nejčastěji se používá u **platebních karet** nebo **SIM karet mobilních telefonů**. Většinou sestává ze čtyř číslic, takže je relativně **snadný na zapsání**, a to je asi hlavní výhoda.

Při přihlašování pomocí PINu stačí vyťukat 4 číslice – to je velké zjednodušení oproti klasickým heslům, které často musí obsahovat 8 a více znaků, velká i malá písmena, číslici nebo nějaký speciální znak.

Umožnit přihlášení číslem (PINem) se tak hodí hlavně v situacích, kdy se **uživatel velmi často ohlašuje/přihlašuje**.

## Bezpečnost

Na první pohled se může zdát, že čtyřmístné číselné heslo není dostatečně bezpečné – existuje pouze 10 000 kombinací (104).

Tento problém je řešen **omezeným počtem pokusů**. Například po 3 neúspěšných pokusech je nutné minutu počkat. Tento čas se s přibývajícími neplatnými pokusy může prodlužovat a **vést k zablokování přihlašování**.

Odblokování se potom provede zadáním *plného hesla* nebo zasláním odkazu pro zadání nového PINu na e-mail.

## Implementace

Na straně serveru je nutné zajistit, aby byl omezený počet špatných pokusů. Na straně klienta je asi nejdůležitější použít vhodný typ formulářového políčka.

Zatímco pro zařízení s fysickou klávesnicí stačí použít [`&lt;input type="password">`](/input#type-password), pro dotyková zařízení je řešení složitější:

Pro zadávání čísla je vhodné přepnout na numerickou klávesnici. To ale není úplně jednoduché:

## Klávesnice pro zadávání čísel

Universální spolehlivý postup, jak připravit políčko pro pohodlné dotykové zadávání číslic, funkční na **Androidu**, **iOS** i **Windows Phone** je použít `&lt;input type="number">` + [atribut `pattern`](/atribut-pattern):

```
&lt;input type="number" pattern="[0-9]*">
```

Bez `pattern`u se na iOS zobrazuje klávesnice i s dalšími speciálními znaky:

Po jeho použití už je klávesnice jen s číslicemi:

Na **Androidu** a **WP** se jde bez atributu `pattern` obejít.

Docílit numerické klávesnice jde i s `&lt;input type="tel">` určeným pro zadávání telefonních čísel – na iOS to nastaví velmi podobnou klávesnici jako typ `number` s atributem `pattern` omezeným na čísla.

Na Androidu se typy `number` a `tel` liší následovně:

    Number

    Tel

### Atribut `inputmode`

Specifikace HTML 5.2 [popisuje](http://w3c.github.io/html/single-page.html#input-modalities-the-inputmode-attribute) atribut `inputmode`, který by měl sloužit k nastavení typu vstupu nezávisle na typu políčka.

Šel by tak použít i pro typ `password`:

```
&lt;input type="password" **inputmode="numeric"**>
```

Bohužel ale tento způsob není prohlížeči podporován.

### Odeslání `&lt;input type="number">`

V některých prohlížečích (např. stará **Opera 12**) se u políčka typu `number` neodesílají na server počáteční nuly. Ze vstupu `007` se tak na server může odeslat jen `7`.

Není-li stanoven **pevný počet míst PINu**, může s tím být problém.

### Maskování hesla

Ačkoliv je [maskování hesel](/maskovani-hesla) u běžných hesel spíš otravné (risiko překlepu), u krátkého PINu to takový problém být nemusí.

Problém ale je, že pro maskování hesla je nutný `type=password` a pro zobrazení správné klávesnice zase `type=number`. Existují následující možnosti:

    Vlastnost `text-security` – Webkit podporuje s [prefixem](/css-prefixy) CSS vlastnost pro maskování:

    ```
input[type=number].jako-password {
     -webkit-text-security: disc;
}
```

    Ta jde mimochodem aplikovat i na běžný text, takže není problém cokoliv zapuntíkovat nebo začtverečkovat.

    Heslo/PIN nemaskovat.

    Teoreticky by šlo použít skrytý `type="number"` pro nastavení správné klávesnice a kopírovat jeho obsah do viditelného `type="password"`.

    Bude ale problém se zobrazováním kursoru – [ukázka](http://kod.djpw.cz/xldc).

    Použít speciální font přes [`@font-face`](/font-face) pro `&lt;input>`, kde bude jakýkoliv znak vypadat jako puntík.

@font-face {
  font-family: 'password';
  src: url('/files/pin/password-webfont.woff2') format('woff2'),
       url('/files/pin/password-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
.number-password input {
  font-family: 'password';
  height: 1em;
}

## Odkazy

  - [Živá ukázka](http://kod.djpw.cz/wldc) – test různých `&lt;input>`ů pro zadávání PINu

.zapuntikovat {
  -webkit-text-security: disc;
}
.zactvereckovat {
  -webkit-text-security: square;
}
  
#testTextSecurity button {
  -webkit-text-security: none;
}