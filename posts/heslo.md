---
title: "Bezpečnost hesel a přihlašování"
headline: "Bezpečnost hesel a přihlašování"
description: "Pravidla pro tvorbu hesel a bezpečné přihlašování."
date: "2015-08-31"
last_modification: "2015-08-31"
status: 0
tags: []
---

Pravidla pro **minimální délku hesla**.

    Nároky by neměly být přehnané.

    Při změně e-mailu a dalších citlivých údajů vyžadaovat **zadání hesla**.

    Používání přihlašování třetích stran (Facebook, Twitter). Používat pro registrace více e-mailových adres. Vytvořit si účty u běžně používaných služeb pro zablokování e-mailu.

  - Nedostatečná ochrana obsahu, kam vede odkaz.

## Požadavky na heslo

Požadavky na minimální délku a sílu hesla jsou značně ošemetné.

Běžně se je možné setkat s tím, že heslo vyžaduje:

  - minimálně 8 znaků,

  - maximálně 30 znaků,

  - alespoň jedno velké písmeno,

  - alespoň jedno číslo,

  - alespoň jeden speciální znak

Takže třeba `1Password_` projde.

Na jednu stranu

### Příklad, jak to nedělat

Pro přihlašování z mobilu do jedné nejmenované banky je nutné vytvořit PIN.

Zadal jsem PIN `27775555`, načež mi aplikace vynadala, že PIN musí mít 4–6 znaků.

Zkrátil jsem na `277755`, načež aplikace zahlásila, že kód nesmí obsahovat opakující se číselné řady.

Zkusil jsem zadat `2727` a prošlo to.

## Změna hesla

Některé systémy vyžadují změnu po určitém období. Heslo má omezenou platnost, po které musí být změněno.

Na první pohled se to může zdát rozumné – pokud by se útočník dostal ke starým heslům, byly by mu k ničemu, protože už by byla dávno změněná.

Bohužel nucená změna hesel v praxi způsobuje, že:

    Lidé volí **lépe zapamatovatelná** a tedy jednodušší hesla, když vidí, že jim na dlouho nevydrží.

    Změnu hesla řeší tím, že na konec přidají **pořadové číslo nebo letopočet**.

    Vznikne tak heslo: `1Password_1`, `1Password_2`, `1Password_2015` a podobně.

    Nové heslo si člověk pro jistotu **někam zapíše**. Třeba si ho [nalepí na monitor](http://praha.idnes.cz/blanka-a-kuriozity-z-provozu-djp-/praha-zpravy.aspx?c=A151019_112525_praha-zpravy_nub):

  - Smashing Magazine: [Why Passphrases Are More User-Friendly Than Passwords](http://www.smashingmagazine.com/2015/12/passphrases-more-user-friendly-passwords/)