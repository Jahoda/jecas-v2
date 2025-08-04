---
title: "Napovídání e-mailu"
headline: "Napovídání poskytovatele e-mailu"
description: "Jak usnadnit vyplňování e-mailové adresy automatickým napovídáním poskytovatele."
date: "2016-02-22"
last_modification: "2016-02-26"
status: 1
tags: ["Hotová řešení", "Formuláře", "Rady a nápady"]
---

Vyplňování formulářů je nedílnou součástí řady webů a vždy je prostor vymyslet zlepšení, které lidem usnadní práci a zrychlí proces zadávání dat do formuláře.

Jedno z možných zlepšení je **našeptávání poskytovatele e-mailu**. Velké procento lidí v ČR používá e-mailové adresy končící na `seznam.cz`, `gmail.com`, `hotmail.com`, `centrum.cz`, `email.cz` a podobně.

Na jedné nejmenované [Diskusi JPW](http://djpw.cz) z cca 20 tisíc účtů používá jednoho z Top 10 poskytovatelů přibližně **70 % lidí**.

Vyloudil jsem data ještě od pár lidí z webů s řádově desítkami až stovkami tisíc e-mailů a podíl lidí s e-mailem u Top 10 poskytovatelů se pohyboval mezi **44** a **98 %** v závislosti na projektu (např. u B2B není tak pravděpodobné, že někdo použije adresu typu `pepicek.pytlicek@seznam.cz`).

Poděkování zaslouží [Zdeněk Haták](http://hatak.cz/), [Tomáš Janda](https://twitter.com/medvidek88), [Jan Horák](http://gransy.com/) a [Jiří Císař](http://www.jiricisar.cz/).

## Řešení

Nejméně invasivní se zdá být napovídání pomocí [absolutně posicovaného](/position#absolute) elementu přes běžné formulářové políčko.

Po zadání zavináče a prvního písmena se zobrazí případná nápověda, aniž by se tím původní [`&lt;input>`](/input) nějak ovlivnil. Po kliknutí na nápovědu se její obsah nastaví do `value` formuláře.

Statická ukázka pro představu – hodnota políčka je „`email@s`“ a obsah „eznam.cz“ je v posicovaném `&lt;span>`u.

    eznam.cz

Na stránce je tedy z pohledu uživatele úplně obyčejný `&lt;input>`, jen se u něj objevuje nápověda. Její obsah se do políčka doplní po kliknutí, při opuštění políčka / přeskočení jinam (`onblur`) nebo třeba při odeslání formuláře.

### Našeptávání v JS

Pro zvolení nápovědy v závislosti na obsahu políčka je potřeba použít JavaScript.

Získání obsahu za zavináčem a najití možné nápovědy je cvičení na základní práci s řetězci:

  - `indexOf` – zjistí posici daného znaku

  - `substr` – získá požadovanou část řetězce

Trochu oříšek je umístění posicované nápovědy na správné místo:

Teoreticky by mohlo jít použít neproporcionální font, kde jsou všechny znaky stejně široké, a umístění nápovědy zajistit výpočtem typu *počet znaků * šířka*.

Spolehlivější a universálnější ale bude zjistit umístění pomocí zkopírování obsahu `&lt;input>`u do nového `&lt;span>`u se stejným stylem, který poslouží k přeměření rozměru.

    [Živá ukázka](http://kod.djpw.cz/iwub) (hotové řešení na [GitHubu](https://github.com/Jahoda/email-hint))

## Extrémnější varianta

Může se nabízet myšlenka ten `@seznam.cz` jako nejčastější nabízet rovnou na konci e-mailu.

Mimo přihlašování na homepage [Seznamu](/seznam) to ale bude pro značnou část lidí neužitečné a nejspíš až matoucí.

V ČR, kde e-mailové adresy `neco@seznam.cz` dominují, by se možná dalo v některých případech uvažovat o nabídnutí ihned po zadání zavináče.

## Zjištění nejčastějších domén

Nejpoužívanější domény e-mailů se budou lišit projekt od projektu, takže se hodí si seznam vytvořit dle konkrétní situace.

Seznam nejčetnější poskytovatelů pro konkrétní web jde získat následujícím SQL dotazem:

```
SELECT 
  COUNT(**email**) Pocet, 
  SUBSTRING_INDEX(
    SUBSTRING_INDEX(**email**, '@', 2), '@', -1
  ) Domain 
FROM *uzivatele*
GROUP BY Domain 
ORDER BY Pocet DESC 
LIMIT 10
```

Budu rád, když se o data podělíte.

## Odkazy jinam

    Litle Big Details: [Gilt.com – When entering your email address in the sign up form, the input field auto completes common domains.](http://littlebigdetails.com/post/139151387912/giltcom-when-entering-your-email-address-in-the)

.naseptavac-email {
    position: relative;
    display: block;
}
.naseptavac-email input, 
.naseptavac-napoveda {
    font-family: sans-serif;
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    padding: 6px;
    border: 1px solid gray;
    display: block;
    margin: 0;
}
.naseptavac-napoveda {
    color: gray;
    position: absolute;
    top: 0;
    left: 63px;
    border-color: transparent;
}