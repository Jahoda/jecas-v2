---
title: "WordPress spam registrace"
headline: "WordPress spam registrace"
description: "Jak zabránit falešným spam registrací robotů ve WordPress."
date: "2014-04-22"
last_modification: "2014-04-25"
status: 1
tags: ["Rady a nápady", "WordPress", "Spam", "Redakční systémy"]
---

Jakožto nejpopulárnější redakční systém čelí WordPress a weby na něm postavené **masivnímu útoku spammerů** (zpravidla robotů).

Před [spamem](/spam) je dobré se bránit. V případě samotných **registrací** by roboti na první pohled nemusely vadit. Horší je, že registrace je spojená s **odesláním potvrzovacího e-mailu**, což může provozovatel webhostingu vyhodnotit jako spamování.

Na jednom webu u [hostingu Wedos](http://hosting.wedos.com) mně kvůli tomu byla zablokována PHP funkce `mail`, která rozesílání mailů obstarává.

## Řešení proti spamu

První a nejjednodušší řešení je **registrace vůbec neumožnit**. Možnost zaregistrovat ovlivňuje položka *Členství* v nabídce *Nastavení*:

Chceme-li ale registrace povolit, nezbývá než najít řešení jiné.

## Plugin proti spamu

Jak už to tak u Wordpressu bývá, na všechno **existuje plugin**.

Funkčním se ukázal být **Stop Registration Spam**, který zavádí ochranu prostřednictvím [kontrolní otázky](/spam#otazka-bez-vyplneni). To je sice pro *živého škůdce* slabá metoda, ale na roboty relativně slušně funguje.

Po instalaci a aktivaci pluginu přibude v menu položka *Stop Registration Spam Settings*, kde je rovněž možné nastavit vlastní (českou) otázku.

Při špatné odpovědi se zobrazí chyba a **e-mail na adresu spammera** se neodešle. Výsledná podoba na stránce registrace (`example.com/wp-login.php?action=register`) bude následovná: