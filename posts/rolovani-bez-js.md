---
title: "Odrolování bez JavaScriptu"
headline: "Odrolování bez JavaScriptu"
description: "Jak odscrollovat na určitou část stránky bez JavaScriptu."
date: "2016-11-29"
last_modification: "2016-12-03"
status: 1
tags: ["HTML", "Rady a nápady", "Scrollování"]
---

[Odrolování na HTML značku v JS](/odrolovani) se zabývá samostatný článek.

Existují ale nějaké možnosti jen v HTML?

## Kotva

Pro odkazování na jednotlivé části dokumentu existují [#kotvy](/odkaz#kotva). Pro odrolování potom stačí použít běžný odkaz:

```
&lt;a href="#**kotva**">
  Odkaz na místo označené ↓
&lt;/a>
…
&lt;a name="**kotva**">&lt;/a>
```

### Odrolování po načtení

Využít kotvy jde pro odrolování ihned při načtení stránky.

To jde třeba díky `&lt;meta>` značce `refresh` v části [`&lt;head>`](/html-kostra#head):

```
&lt;meta http-equiv="refresh" content="1;url=#**kotva**">
```

Bohužel v takovém případě prohlížeče obnoví celou stránku. To není moc žádoucí, protože tím vznikne nekonečná smyčka přesměrování.

Teoreticky jde tento postup zkombinovat se serverovým řešením a tuto značku zobrazit jen při prvním načtení. Příklad v [PHP](/php):

```
&lt;?php if (!isset($_GET["**odrolovat**"])):?>
  &lt;meta http-equiv="refresh" content="1;url=?**odrolovat**#*kotva*">
&lt;?php endif ?>
```

U webové stránky, kde je nutné řešit [SEO](/seo), to není úplně vhodné, protože vznikají duplicitní URL, které by bylo potřeba řešit.

### Odrolování po odeslání formuláře

Postupu s kotvou jde využít i při odesílání webového [formuláře](/formulare).

Kotvu je nutné uvést už do atributu `action`:

```
&lt;form **action**="url*#kotva*">
…

```

## HTTP přesměrování na kotvu

Do hlavičky `Location` jde uvést stránku s kotvou. Řešení v PHP:

```
&lt;?php 
header("Location: stranka.html**#kotva**");
?>
```

Dle HTTP specifikace by v této hlavičce měla být absolutní URL, takže tento postup teoreticky není v souladu se specifikací. Nicméně funguje dobře napříč prohlížeči.

## Focusování políčka

Zajímavá možnost, jak automaticky odrolovat ihned po načtení stránky bez špetky JS, je využít políčka `&lt;input>` s atributem [`autofocus`](/autofocus) (funkční od **IE 9)**.

```
&lt;input **autofocus** style="position: absolute; left: -9999px">
```

Skrýt políčko, aby nestrašilo, nestačí přes [`display: none`](/display), protože by nedostalo `focus`.

[Živá ukázka](http://kod.djpw.cz/wxcc-)

Výhoda tohoto postupu je, že prohlížeč inteligentně řeší odrolování na element v rámci viewportu.

Kromě toho se odrolování provede v nejkratší možné chvíli od načtení, takže by se nemělo stávat, že uživatel začne rolovat už před automatickým odrolováním. To je nevýhoda JS řešení, kdy se nejprve čeká ještě na stažení a zpracování JavaScriptu.

Řešení funguje i v mobilních prohlížečích.

Zásadní nevýhoda spočívá v tom, že se do políčka přesune kursor, čím se **zablokují některé klávesové zkratky**.

## Závěr

Používat pro odrolování JavaScript je často nejlepší možnost. V případě, že by mělo být odrolování plynulé potom jediná volba.

Existují ale i možnosti na JS nezávislé.

Kombinace `autofocus`u + JS pro *odblokování* kláves by mohla být použitelná i v praxi díky inteligentnímu přesunu cíle do viewportu.