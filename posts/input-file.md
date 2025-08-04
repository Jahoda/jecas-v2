---
title: "Reset políčka pro nahrávání souboru"
headline: "Resetování <code>&lt;input type=file&gt;</code>"
description: "Jak resetovat (odstranit) hodnotu z <code>&lt;input&gt;</code>u pro upload souborů."
date: "2013-10-02"
last_modification: "2018-09-14"
status: 1
tags: ["HTML", "HTML značky", "Hotová řešení", "Formuláře"]
---

Z [bezpečnostních](/zabezpeceni) důvodů platí pro uploadovací formulářové políčko trochu jiná pravidla.

Například **není možné přistupovat JavaScriptem k jeho hodnotě** ve stejné míře jako u jiných políček.

    Přenastavení hodnoty `uploadInput.value = "něco"` selže.

    Přečtení hodnoty `alert(uploadInput.value)` vrátí jen smyšlenou cestu: `C:\fakepath\nazev-souboru.txt`. Ve starších prohlížečích **Firefox** je název souboru.)

Je to docela pochopitelné, protože jinak by si majitel stránky mohl nahrávat libovolné soubory z disku návštěvníka tipováním jejich cest.

## Jak vymazat pole pro upload

    Jedna možnost je použít běžné **resetovací tlačítko** (např. [`&lt;input type=reset>`](/input#type-reset)) — to ale vymaže celý formulář.

    Druhá možnost je nahrávací `&lt;input&gt;` **vymazat**, tj. nastavit jeho `value` na `""`:

    ```
formular.nazevPole.value = "";
```

    Smazání je jediná možnost, jak měnit hodnotu tohoto pole. Nastavení něčeho jiného, než je prázdný řetězec skončí chybout:

    ```
Failed to set the 'value' property on 'HTMLInputElement': This input element accepts a filename, which may only be programmatically set to the empty string.
```

## Starší prohlížeče

Výše uvedené řešení nefunguje v **IE 10** a starších. V ostatních prohlížečích nešel tento postup použít ještě v roce **2014**.

Pro tyto případy existuje ještě jedna možnost — **přepsat JavaScriptem obsah políčka tím samým obsahem**.

```
&lt;span id="**obal**">
  &lt;input name="upload" type="file">
&lt;/span>
&lt;button onclick="
  document.getElementById('**obal**').innerHTML = document.getElementById('**obal**').innerHTML
">
  Odstranit
&lt;/button>
```

## Živá ukázka

U javascriptového resetovacího tlačítka je nutno dát pozor na to, aby **nechtěně neodesílalo formulář**. Tomu zabrání buď `return false`, nebo tlačítko, co formulář neodešle, což je `&lt;input&gt;` nebo `&lt;button&gt;` s `type=button`.

  var obal = document.getElementById("obal");

  Resetovat upload starým způsobem

Hodnota `&lt;input type=file&gt;`
  Přečíst hodnotu
  Nastavit hodnotu na „“ (prázdný řetězec)

Resetovat celý formulář