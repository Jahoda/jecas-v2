---
title: "Tabindex"
headline: "Tabindex"
description: "Atribut <code>tabindex</code> slouží k uspořádání položek pro procházení klávesnicí."
date: "2014-09-13"
last_modification: "2014-09-13"
status: 1
tags: ["HTML", "Formuláře", "HTML atributy"]
---

Tabindex je universální – lze ho použít na **každém elementu**.

```
&lt;div **tabindex="0"**>
&lt;/div>
```

## Využití

Použití `tabindexu` jsou tři:

  - **změna pořadí** procházení klávesou Tab,

  - **umožnění procházení**/`:focus`u,

  - **zabránění označení** Tabem

## Změna pořadí

Bez použití `tabindexu` se *Tabování* zachytí jen na určitých prvcích (**formuláře** a **odkazy**). Pořadí je potom řízeno umístěním jednotlivých prvků v **HTML kódu**.

Chceme-li toto pořadí upravit, což se v případě [nelogického pořadí](/chyby-formularu#klavesnice) může hodit, začneme hodnoty `tabindex`u zvyšovat nad nulu (nula je u standardně Tabovatelných elementů výchozí hodnota).

```
&lt;input value="Druhý">
&lt;input **tabindex="1"** value="První">
&lt;input value="Třetí">
```

[Samostatná ukázka](http://kod.djpw.cz/nqfb)

*Tabindex* se nemusí (a ani to není příliš vhodné) nastavovat všem položkám, ale jen těm, kterým chceme **zvýšit prioritu**.

Při řazení pomocí vyšší hodnoty `tabindex`u není nutné neustále hodnotu zvyšovat (ve smyslu 1, 2, 3, …), ale lze využít pravidla, že při stejné hodnotě se pořadí řídí **umístěním v kódu**.

V této ukázce proto s klidem můžeme použít jako hodnoty `tabindex`u jen samé jedničky ([ukázka](http://kod.djpw.cz/pqfb)) místo:

```
&lt;input value="Čtvrtý">
&lt;input tabindex="1" value="První">
&lt;input tabindex="**2**" value="Druhý">
&lt;input tabindex="**3**" value="Třetí">
```

## Umožnění procházení

Pro elementy mimo **formulářové prvky a odkazy** způsobí přidání atributu `tabindex` schopnost se na element odTabovat nebo prvku udělit `focus`. To se hodí v případě, že chceme mít *klikací* `&lt;span>` nebo `&lt;div>` a umožnit ho **vybrat jen pomocí klávesnice**.

```
&lt;div tabindex="0">
    Tabovatelný DIV
&lt;/div>
```

Hodnota `0` zajistí, že se prvek vloží do pořadí dle umístění v HTML kódu.

[Ukázka](http://kod.djpw.cz/qqfb)

## Zabránění označení

Poslední možnost je `tabindex` nastavit na zápornou hodnotu:

```
&lt;input tabindex="**-1**" value="Nepůjde vybrat">
```

U formulářových prvků mě využití moc nenapadá. Když se pole skryje (`display: none` nebo `visibility: hidden`) či zablokuje (atribut [`disabled`](/input#disabled)), tak se na něj dostat nedá. A jinak je poměrně žádoucí, aby se na prvek **dostat dalo**.

U **neformulářových** elementů to ale smysl dávat může.

Záporným `tabindex`em získá element možnost být `:focus`ován – z čehož plyne využití v CSS pomocí příslušného [selektoru `:focus`](/css-selektory#uzivatelske-akce).

Rovněž v JavaScriptu jde elementu `focus` udělit.

```
element.focus();
```

[Ukázka](http://kod.djpw.cz/rqfb)