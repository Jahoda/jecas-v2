---
title: "Samouk amatér vs. SuperKodér"
headline: "Samouk amatér vs. SuperKodér"
description: "Reakce na článek <a href=\"http://www.superkoderi.cz/samouk-amater-vs-superkoder\">Samouk amatér vs. SuperKodér</a> z webu superkoderi.cz."
date: "2014-01-29"
last_modification: "2014-01-29"
status: 0
tags: []
format: "html"
---


<h2 id="struktura-css">Struktura CSS</h2>
<blockquote><p>Strukturu css dělíme do několika složek a desítek menších souborů s průměrnou délkou cca sto řádků (záleží podle toho, co stylujete). Máme složku na layout, tiskový styl, různé boxíky, formuláře, formulářové prvky a meníčka. Výhoda je ta, že v html máme pak napsáno např. box-gallery a hned víme, kde hledat její styly. Orientace je perfektní.</p></blockquote>

<p>Dobré je zvolit řešení odpovídající konkrétnímu projektu. Dělení na malé soubory je dobré spíš s ohledem na znovupoužitelnost vytvořeného CSS nebo při práci více lidí na různých částech najednou.</p>

<p>Navíc se musí nějak řešit <a href="/slouceni-js-css">spojení potřebných CSS do jednoho souboru</a>.</p>

<p>I v tisíciřádkovém CSS není problém použít vyhledávání. Srovnatelné prohledávání desítek souborů může být v některých editorech mnohem obtéžnější.</p>

<h2 id="preprocessor">Preprocessor</h2>
<blockquote><p>Píšeme hlavně ve Stylusu a je to naprostá bomba. Nejen, že umí stejné věci jako jiné preprocesory, např. psát mixiny nebo proměnné, ale jeho syntaxe je tak neuvěřitelně lehká a intuitivní, že se v něm člověk naučí psát během pár dní.</p></blockquote>

<p>Preprocessor je jakýsi pseudo-jazyk, který nabízí vymoženosti jako <a href="/var">proměnné</a> nebo <i>mixiny</i>. Tzv. <i>mixin</i> je zpravidla větší kus kódu, který se jednou nadeklaruje, a potom se opakovaně používá. Je možné mu předat i parametry.</p>

<p>Opět si je třeba se zeptat proč preprocessor používat. Cílem by mělo být zrychlení a zlepšení práce. Použití preprocessoru minimálně komplikuje </p>