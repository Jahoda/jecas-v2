---
title: "Návštěvnost jen z určitých zemí v Google Analytics"
headline: "Návštěvnost jen z určitých zemí v Google Analytics"
description: "Jak v Google Analytics filtrovat návštěvnost na základě země návštěvníka."
date: "2014-11-28"
last_modification: "2014-11-29"
status: 1
tags: ["ga", "google", "seo"]
format: "html"
---

<p>Pokud web cílíme jen na <b>určité země</b>, nemusí být žádoucí, aby se do statistik počítaly i zbloudilé duše nerozumějící našemu obsahu či různí roboti, kteří by jen <b>zkreslovali statistiku</b>.</p>

<p>Podobně jako při <a href="/vylouceni-svych-navstev">vyloučení vlastních návštěv</a> k tomu poslouží <b>filtry</b>.</p>

<p>Nejjednodušší je si v nabídce <i>Správce</i> pro daný účet vytvořit <b>nové zobrazení</b>.</p>

<p><img src="/files/analytics-filtrovani-zeme/nove-zobrazeni.png" alt="Vytvořit nové zobrazení" class="border"></p>

<p>Po vytvoření zobrazení pro něj přidáme <b>filtr</b>.</p>

<p><img src="/files/analytics-filtrovani-zeme/filtry.png" alt="Filtry" class="border"></p>

<p>Filtr se pojmenuje (pro případné pozdější použití jinde) a vytvoří se mu výběr dat.</p>

<!--<p><img src="/files/analytics-filtrovani-zeme/vytvorit-vyber.png" alt="Vytvořit výběr dat" class="border"></p>-->

<p>Typ filtru bude <b>vlastní</b>. V závislosti na potřebách se zvolí <b>Zahrnout</b>/<b>Vyloučit</b>. Jako pole filtru potom poslouží <b>Země</b>.</p>

<p><img src="/files/analytics-filtrovani-zeme/zahrnout-zemi.png" alt="Zahrnutí země" class="border"></p>

<p>Nyní stačí do políčka napsat anglický název země, která se má vyloučit/zahrnout. Do políčka se píše regulární výraz, takže více zemí je třeba oddělit znakem „<code>|</code>“ (na <a href="/ceska-klavesnice#pravy-alt">české klávesnici</a> se zapíše klávesovou zkratkou <kbd>Alt</kbd> + <kbd>W</kbd>).</p>

<p>Vyčíst si názvy zemí je ideální ve statistikách <i>Cílové publikum → Geograficky → Lokalita.</i></p>

<p><img src="/files/analytics-filtrovani-zeme/lokalita.png" alt="Zobrazení lokalit ve statistikách" class="border"></p>

<p>Po uložení vznikne na hlavní straně nový přehled, kde budou data vyfiltrována potřebným způsobem.</p>
