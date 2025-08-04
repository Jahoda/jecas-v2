---
title: "Návštěvnost jen z určitých zemí v Google Analytics"
headline: "Návštěvnost jen z určitých zemí v Google Analytics"
description: "Jak v Google Analytics filtrovat návštěvnost na základě země návštěvníka."
date: "2014-11-28"
last_modification: "2014-11-29"
status: 1
tags: ["SEO", "Google", "Google Analytics"]
---

Pokud web cílíme jen na **určité země**, nemusí být žádoucí, aby se do statistik počítaly i zbloudilé duše nerozumějící našemu obsahu či různí roboti, kteří by jen **zkreslovali statistiku**.

Podobně jako při [vyloučení vlastních návštěv](/vylouceni-svych-navstev) k tomu poslouží **filtry**.

Nejjednodušší je si v nabídce *Správce* pro daný účet vytvořit **nové zobrazení**.

Po vytvoření zobrazení pro něj přidáme **filtr**.

Filtr se pojmenuje (pro případné pozdější použití jinde) a vytvoří se mu výběr dat.

-->

Typ filtru bude **vlastní**. V závislosti na potřebách se zvolí **Zahrnout**/**Vyloučit**. Jako pole filtru potom poslouží **Země**.

Nyní stačí do políčka napsat anglický název země, která se má vyloučit/zahrnout. Do políčka se píše regulární výraz, takže více zemí je třeba oddělit znakem „`|`“ (na [české klávesnici](/ceska-klavesnice#pravy-alt) se zapíše klávesovou zkratkou Alt + W).

Vyčíst si názvy zemí je ideální ve statistikách *Cílové publikum → Geograficky → Lokalita.*

Po uložení vznikne na hlavní straně nový přehled, kde budou data vyfiltrována potřebným způsobem.