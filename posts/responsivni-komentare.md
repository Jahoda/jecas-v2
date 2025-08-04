---
title: "Responsivní komentáře"
headline: "Responsivní komentáře"
description: "Jak některé části stránky načítat jen při určité velikosti obrazovky."
date: "2013-11-29"
last_modification: "2013-12-13"
status: 1
tags: ["JavaScript", "CSS", "Responsivní design"]
---

V případě, že při tvorbě [responsivního webu](/mobilni-web) skrýváme větší množství obsahu přes CSS (nepoužijeme **detekci na straně serveru**), většinou to nepřinese takovou výkonovou úsporu, jakou by mohlo v případě, že by se zbytečný kód **nevyhodnocoval**.

Typicky třeba **obrázky** vložené značkou `&lt;img>` se načtou, ať mají třeba `display: none`. Podobně v některých prohlížečích budou [stažena obrázková pozadí](/opozdene-nacteni#css) skrytých elementů. Taktéž **nepotřebné JS soubory** budou stále ke stránce připojeny.

## ResponsiveComments

[Web](http://responsivecomments.com/)

Nástroj **ResponsiveComments** se tento problém snaží řešit tak, že se obsah obalí do `&lt;div>`u s nějakou podmínkou a obsah se *skryje* do HTML komentáře. Pokud se podmínka splní, JavaScript obsah komentáře **přidá** do stránky.

```
&lt;div data-responsive-comment-media="(min-width: 769px)">
  &lt;!-- &lt;div>Obsah se zobrazí jen při splnění podmínky ↑.&lt;/div> -->
&lt;/div>
```

Dle mého názoru je tento **postup na hlavu postavený**, protože veškerý obsah bude ve skutečnosti **v komentáři** (tj. pro **vyhledávače** a návštěvníky **bez JavaScriptu** nepřístupný.)

## Lepší řešení

Naštěstí existují různá řešení, jak vytvořit přístupný obsah, který se při zapnutém JavaScriptu **nebude vyhodnocovat**.

### Značka `&lt;noscript>`

Při zapnutém skriptování se obsah ignoruje, ale není problém se k němu v JS dostat a **vložit ho viditelně** do stránky. Tedy kromě **IE 7**, kde se dá maximálně vydolovat jeho **atribut**.

### Skript s nesmyslným `type`m vypsaný skriptem

**Chamurappi** [přišel](http://diskuse.jakpsatweb.cz/?action=vthread&forum=3&topic=153269) na to, že pokud se kolem obsahu vypíše značka `&lt;script>` s [nesmyslným MIME typem](/template#js-type-nesmysl), kterou ale vypíše JavaScript, takový obsah se **nezpracuje**, půjde **napříč prohlížeči** obnovit a bez podpory JS se kolem něj značka nevypíše, takže bude **normálně viditelný**.

```
&lt;script>document.write("&lt;script type='text/skryt'>")&lt;/script>
&lt;p>Obsah skrytý JavaScriptem.&lt;/p>
&lt;script>document.write("")&lt;/script>
```

### Značka `&lt;template>`

V některých prohlížečích už [značka `&lt;template>`](/template) nyní funguje, je otázka, jak se k jejímu obsahu budou stavět **vyhledávače**.