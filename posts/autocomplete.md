---
title: "Autocomplete"
headline: "Automatické vyplňování formulářů"
description: "Pomocí atributu <code>autocomplete</code> jde usnadnit a zrychlit vyplňování formulářů."
date: "2014-01-10"
last_modification: "2015-03-18"
status: 1
tags: ["HTML", "Formuláře", "HTML atributy"]
---

Webové **formuláře** jsou nedílnou součástí webu. V případě, že stránka něco prodává (e-shop), je takový formulář místem, který zákazník bude muset překonat, má-li nakoupit.

Když už se tedy povede zákazníka přimět k objednání zboží, byla by škoda ho následně odradit **špatně použitelným** formulářem.

    - [20 nejhorších chyb formulářů](/chyby-formularu) – přehled chyb, kterým se vyvarovat

## Automatické vyplnění

Zvlášť u mobilních zařízení s malými obrazovkami a dotykovou klávesnicí je hodně nepohodlné cokoliv vyplňovat.

Při návrhu formuláře je tak dobré se nad každým prvkem zamyslet, jestli je skutečně nutný. U opravdu **nezbytných políček** může pomoci atribut `autocomplete`.

Atributem `autocomplete` jde prohlížeči sdělit typ údaje k vyplnění, který by se na dané místo hodil.

```
&lt;input type="email" **autocomplete="email"**>
```

Automatické doplňování funguje pouze u formulářů odesílaných metodou `post`.

### Uložení údajů v Chrome

V prohlížeči **Chrome** si jde údaje k napovídání nastavit v *Menu → Nastavení → Zobrazit rozšířená nastavení... → Hesla a formuláře*.

## Jméno políčka

I bez atributu `autocomplete` dokáží některé prohlížeče nabízet hodnoty zadané do políček se stejným atributem `name`, nezávisle na webu, kde byly vyplněny.

Z tohoto důvodu je proto vhodné **používat názvy políček**, které jsou hodně rozšířené.

## Doporučené hodnoty `name` a `autocomplete`

Možné hodnoty pro `autocomplete` jsou uvedené ve specifikaci.

    - HTML specifikace: [Autofill](https://html.spec.whatwg.org/multipage/forms.html#autofill)

Pro názvy políček (atribut `name`) je většinou nejuniversálnější používat anglické názvy.

### Jméno

```
&lt;input name="name" autocomplete="name">
```

### E-mail

```
&lt;input name="email" autocomplete="email">
```

### Telefon

```
&lt;input name="phone" autocomplete="tel">
```

## Vypnutí `autocomplete`

V případě, že políčko disponuje vlastním **našeptávačem** obsahu, mohlo by být napovídání ještě z prohlížeče rušivé. Autocomplete se dá v takových případech vypnout hodnotou `off`.

```
&lt;input autocomplete="**off**">
```

## requestAutocomplete API

Metoda `requestAutocomplete` slouží k vyplnění čísel **platební karty** a adresy pro doručení. Pokud má potřebná data návštěvník uložená, je nakupování otázkou jednoho kliknutí.

  - Metoda `requestAutocomplete` funguje pouze pro **platební formuláře** (musí obsahovat pole s `autocomplete="cc-*"` – „cc“ znamená *credit card*).

  - Jde použít pouze na **zabezpečeném připojení** ([HTTPS](/https)).

    - [Simplify checkout with requestAutocomplete API](https://developers.google.com/web/fundamentals/input/form/use-request-auto-complete?hl=en)

  - [Chrome’s requestAutocomplete(), for a Better Payment on the Web &amp; Mobile](http://daker.me/2014/01/chrome-requestautocomplete-better-payment-web-mobile.html)

## Odkazy jinam

  - Google Webmaster Central Blog: [Helping users fill out online forms](http://googlewebmastercentral.blogspot.cz/2015/03/helping-users-fill-out-online-forms.html)

  - Jeremy's Blog: [Rules for Autocomplete](http://jeremymikkola.com/posts/2019_03_19_rules_for_autocomplete.html)