---
title: "Noreferrer"
headline: "Noreferrer"
description: "Řetězec <code>rel=noreferrer</code> umožňuje nastavit odkazu, že nemá posílat informace o předešlé navštívené stránce."
date: "2014-04-19"
last_modification: "2014-04-24"
status: 1
tags: ["HTML", "HTML atributy"]
---

Standardní chování většiny prohlížečů je při přechodu na novou stránku odesílat URL, ze které se přišlo.

Jedná se o hlavičku [**HTTP referrer**](/referer). Hodnota atributu `rel` nastavená na `noreferrer` tomuto předávání zabrání:

```
&lt;a href="http://jecas.cz/noreferrer" **rel="noreferrer"**>
  Na cíl odkazu nepošle podporovaný prohlížeč referrer
&lt;/a>
```

## Podpora

Konstrukce `rel=noreferrer` funguje zatím jen ve **Webkitu** (**Chrome**, **nová Opera**).

V ostatních prohlížečích lze zabránit zjištění konkrétní adresy přesměrovávacím skriptem. Na cílové stránce se potom místo skutečné předchozí stránky zobrazí URL přesměrovávacího skriptu.

## Využití

Nastavit odkazu neposílání referreru se hodí z **bezpečnostních důvodů**. U aplikace, která obsahuje citlivé údaje v URL, se prokliknutím nějakého externího odkazu dostane tato informace na cílovou stránku.

I v případě, že v URL nic citlivého není, se zbytečně může prozradit adresa webu/aplikace, kterou do světa (ještě) pouštět nechceme.

## Ruční blokování referreru

Kvůli **soukromí** někteří uživatelé referer neposílají. Dá se to nastavit přímo v prohlížeči nebo tak činí některé firewally / proxy servery.

V takovém případě je ale dobré mít pohodlnou možnost referrer alespoň občas zapnout, protože jisté weby ho vyžadují pro [ochranu před CSRF](/bezpecnost#csrf).

## Zjištění předchozí stránky

Obsah hlavičky referer může tvůrce webu snadno získat.

  JavaScript

    ```
var predchoziAdresa = document.referrer;
```

        document.write("Předchozí URL: " + document.referrer);

  PHP

    ```
$predchoziAdresa = $_SERVER['HTTP_REFERER'];
```