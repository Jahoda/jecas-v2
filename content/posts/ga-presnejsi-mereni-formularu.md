---
title: "Přesnější měření  konversí v Google Analytics"
headline: "Přesnější měření  formulářů v Google Analytics"
description: "Jednoduchá cesta, jak spárovat zdroje odeslaných formulářů na webu s Google Analytics.  "
date: "2016-02-16"
last_modification: "2016-02-22"
status: 1
tags: ["ga", "napady"]
format: "html"
---

<div class="autor-profile">
  <p>Autorem článku je <a href="https://www.smetka.net">Tomáš Smetka</a>.</p>
</div>





<h2>Měření v Google Analytics </h2>

<p><a href="/ga">Google Analytics</a> vám po správném nastavení cílů umožní měřit, z jakých zdrojů k vám lidé přicházejí a projeví zájem o vaši službu – dejme tomu odesláním poptávkového formuláře či zavoláním. Měření formulářů může probíhat více způsoby – událostmi, zobrazení „thank you page“, parametry v URL apod.</p>

<p>Bohužel, reálné měření není příliš přesné (vyjímaje e-commerce), odeslání formuláře ještě neznamená, že návštěvník reálně vašich služeb využil.  </p>






<h2>Jak konverze zpřesnit</h2>

<p>Na jednoduchém příkladu si ukážeme, jak odeslané formuláře <b>spárovat s Google Analytics</b>.</p>

 

<p>Dejme tomu, že provozujete luxusní kadeřnictví, investujete do on-line marketingu a chcete vědět, nakolik se vám investice reálně vrací.</p>

 

<p>Na webových stránkách máte umístěný on-line objednávkový formulář, pomocí kterého se potencionální zákazník může objednat.</p>

 
<p>V Google Analytics si nastavíte měření cílů, konverze se započítá po odeslání formuláře a zobrazení „thank you page“ (např. <code>/objednani-dokonceno</code>). Google Analytics této konverzi přiřadí zdroj návštěvy (cpc, organic, email apod.). Vy však víte, že se někteří objednaní zákazníci např. nedostaví, čímž je investice do marketingu reálně zmařená. Primárně tento stav nemůžete ovlivnit, nicméně můžete vyhodnotit kanály, které jsou pro vás přínosnější.</p>

 

<p>Je tu však možnost, jak měření zpřesnit. Ve formuláři můžete posílat <b>náhodně vygenerovaný kód</b> (popř. ID objednávky), který se po odeslání propíše také do URL – např. <code>/objednani-dokonceno?zakaznik=abcd</code>.</p>


<p>Tento kód pošlete spolu se zprávou do e-mailu, a tím si objednávku unikátně označíte v Google Analytics i v e-mailu. Úpravu formuláře je nutné svěřit vývoji.</p>


<p><b>Související čtení</b> ohledně generování náhodných čísel a maskování identifikátorů objednávek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/nahodne-cislo">Zobrazení náhodného čísla</a></li>
    <li><a href="/cislo-objednavky">Jak zabezpečit číslo objednávky v e-shopu</a></li>
  </ul>
</div>


<h2>Párování objednávek </h2>

<p>Nyní je nutné objednávky spárovat s daty v Google Analytics. V GA si otevřete záložku <i>Chování → Obsah webu → Všechny stránky</i>. Zobrazí se všechny stránky, které kdy Google Analytics zaznamenal. Ve vyhledávacím poli vložte URL stránky za lomítkem bez náhodného klíče – „<code>?zakaznik=</code>“.</p>

 

<p><img class="border" src="/files/ga-presnejsi-mereni-formularu/filtrovani-formularu.jpg"></p>

 








 

<p>Ve filtru „Sekundární dimenze“ poté zvolte „Zdroj / médium“, následně GA vrátí seznam stránek, resp. „objednávek“.</p>

 

<p><img class="border" src="/files/ga-presnejsi-mereni-formularu/filtrovani-zdroju.jpg"></p>








 

<p>Tento přehled si stáhněte. V horní části GA klikněte na „Export“, poté zvolte „Excel (XLSX)“. Prohlížeč vám přehled stáhne do Excel listu, ve kterém je uveden seznam stránek se zdroji a  URL obsahuje ID objednávky.</p>

 

<p><img class="border" src="/files/ga-presnejsi-mereni-formularu/export-stranek.jpg"></p>

 























<p>Nyní je nutné data spárovat s vašimi objednávkami. Dle ID si přiřaďte jméno, příjmení či další informace, poté si můžete spočítat reálný přínos různých on-line kanálů.</p>





<h2>Sofistikovanější a pohodlnější řešení </h2>

<p>Výše jsem popsal naprosto triviální postup aplikovatelný z praxe u jednoduchých webů. Tímto způsobem můžete zjistit, že lidé, kteří reálně přišli z Skliku přinášejí nižší tržby než lidé z Google AdWords či naopak a využívat tak lépe kanály.</p>

 

<p>Dnes doporučuji odeslané formuláře ukládat do databáze, data z Google Analytics můžete nahrát do vašeho on-line systému a nechat je párovat přímo aplikací. Tento postup vyžaduje hlubší znalosti na straně vývoje.</p>


<h2>Úskalí a doporučení </h2>

<p>Náhodný klíč, popřípadě ID jsem doporučuji z následujícího důvodu – Google Analytics oficiálně <b>zakazuje identifikovat uživatele</b>. Postupu, při kterém se  do URL propisuje jméno, příjmení či e-mail, bych se raději vyhnul.</p>

 

<p>Na webovou analytiku je také třeba pohlížet v kontextu. Je nutné brát v potaz asistované konverze, <b>first vs. last click</b>, offline konverze z mobilních telefonů atd.</p>

 

<p>Zdroje vyexportovaných stránek z postupu výše jsou z last clicku (poslední zdroj). První zdroj může být naprosto jiný, zákazník se o vás mohl dozvědět např. z katalogu firmy.cz, poté se proklikl z organického vyhledávání a nakonec  z Google AdWords. Tento poslední zdroj se také zobrazí u dané objednávky.</p>


<h2>Další zdroje</h2>

<ul>
	<li><a href="https://support.google.com/adwords/answer/6095883?hl=cs">Měření
	volání na telefonní čísla na webu</a></li>
	<li><a href="https://support.google.com/adwords/answer/2998031">Měření
	offline konverzí</a></li>
	<li><a href="https://support.google.com/analytics/answer/2679221?hl=cs">Porovnání
	metrik konverzí v Analytics a AdWords</a></li>
</ul>