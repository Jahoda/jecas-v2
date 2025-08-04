---
title: "Atribut novalidate"
headline: "Atribut <code>novalidate</code>"
description: "HTML atribut <code>novalidate</code> zabrání výchozí HTML 5 validaci formulářů."
date: "2015-01-29"
last_modification: "2015-01-30"
status: 1
tags: ["HTML", "Formuláře", "HTML atributy"]
---

Při používání pokročilejších pokročilejších typů značky [`&lt;input>`](/input) je ve výchozím stavu přítomna jistá **automatická validace**.

Například políčko `&lt;input type="email">` požaduje platnou e-mailovou adresu. Ověření proběhne při **odeslání formuláře**.

      E-mail: 
      Odeslat

Atributem `novalidate` jde toto výchozí chování **vypnout**:

```
&lt;form novalidate>
&lt;/form>
```

[Živá ukázka](http://kod.djpw.cz/bzjb) – test formuláře s/bez výchozí validace

## Proč validaci vypnout

Výchozí HTML 5 validace není úplně optimální. Lepšího výsledku jde zpravidla dosáhnout **vlastní validací v JavaScriptu**, která nemá následující nedostatky:

    **Nedostatečná podpora napříč prohlížeči**. U HTML 5 validace je například políčko pro e-mail podporované až v **IE 10**.

    **Nejistá kontrola** nad výsledkem. Někdy se zvláštní typy políček používají hlavně k tomu, aby na mobilních zařízeních byla nabídnuta [lepší podoba klávesnice](/chyby-formularu#type). To je dobré chování, které ale doprovází i **výchozí validace**, která nemusí vyhovovat.

## Výchozí validace

[Text hlášek](/valid-invalid#vlastni-hlaska) výchozí validace změnit jde. Problematická může být přílišná nebo nedostatečná **benevolence k zadaným datům**.

Například u e-mailu si lze představit tři stupně *přísnosti*:

  - Vyžadovat přesný tvar „email@example.com“.

  - Tolerovat a oříznout  tzv. *bílé znaky*, tedy akceptovat i „ email@example.com“.

  - Spokojit se s výskytem e-mailu, tj. akceptovat i „cokoliv email@example.com“. Takový případ může nastat při nešikovném kopírování.

Výchozí validace formulářů používá většinou první nebo druhý způsob.

### Výhoda

Výhoda HTML 5 validace je ale ve své jednoduchosti nasazení a se selektory [`:valid` a `:invalid`](/valid-invalid) jde provádět i něco jako primitivní **ověřování během psaní**.