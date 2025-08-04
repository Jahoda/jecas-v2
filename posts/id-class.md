---
title: "ID, nebo CLASS?"
headline: "Používat <code>id</code>, nebo <code>class</code>?"
description: "Rozdíl mezi .třídou a #identifikátorem."
date: "2013-09-12"
last_modification: "2013-09-14"
status: 1
tags: ["CSS", "Rady a nápady"]
---

Pro přiřazení CSS pravidel k úplně libovolnému elementu na stránce je možné použít identifikátor nebo třídu. Na první pohled se to může zdát jedno, ale mezi **ID a třídou jsou rozdíly**:

  - ID umí prohlížeč použít pro **odkázání** na `#kotvu`.

  Podle ID umí všechny prohlížeče **najít element v JavaScriptu**:
    ```
var element = document.getElementById("id-elementu");
```

    Hledání podle třídy (`getElement**s**By**ClassName**`) funguje přímo až od **Exploreru 9**.

  Identifikátor má **v CSS vyšší prioritu**. Následující kód proto zbarví odstavec na červenou, nikoliv na modrou ([ukázka](http://kod.djpw.cz/mzb)).

    ```
p#cerveny {color: red}
p.modry {color: blue}
```

  Stejné ID by teoreticky *mělo* být na stránce jen jednou…

## Více stejných ID

Identifikátory by se narozdíl od tříd neměly na stránce opakovat.

Tak nějak praví specifikace.

V praktickém používání na tom moc nezáleží:

V samotném CSS je to **úplně jedno**, přiřazení stejných ID k více elementům **všude funguje**.

- U kotev a hledání elementu dle ID v JavaScriptu zase **první vyhrává**, tj. prohlížeč odroluje na první #kotvu a JS vrátí první element s daným #identifikátorem ([ukázka](http://kod.djpw.cz/pzb)).

Mohlo by se zdát, že radím používat opakované používání stejných ID. **Není tomu tak.** Užitím jednoho identifikátoru vícekrát riskujeme obtížně odhalitelnou chybu.

## Kdy používat ID a kdy třídu?

Dospěl jsem k závěru, že nejlepší je v CSS **používat jen třídy** a identifikátorům se v CSS selektorech vyhnou. ID ve stylech kromě *přebíjení* nic navíc nenabízejí (a přebíjet lze i s třídami).
  Výhoda tohoto postupu je, že kdykoliv vidím na stránce v HTML kódu `id`, **je jasné, že je tam kvůli JavaScriptu nebo #kotvě**. Snižuje se tak při úpravách kódu nejistota, zda třeba přejmenování identifikátoru kvůli CSS nerozbije JavaScript.

Pokud chci daný element stylovat i s ním pracovat skriptem, napíšu jej jako:

```
&lt;div id="element" class="element"&gt;
```

Myslím, že to za to stojí.

## Alternativa k třídám a ID

[CSS selektory](/css-selektory) už dnes umí o hodně víc než jen .třídy a #identifikátory. Novější prohlížeče podporují [vlastní HTML značky](/vlastni-html-znacky) a vlastní atributy.

Takový *beztřídní* zápis pravidla by mohl vypadat:

```
clovek[dulezity=ano] {color: red}
```

A HTML:

```
&lt;clovek dulezity="ano"&gt;Jahoda&lt;/clovek&gt;
```