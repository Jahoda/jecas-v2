---
title: "Prázdný řádek na konci souboru"
headline: "Prázdný řádek na konci souboru"
description: "Proč by textové soubory měly končit prázdným řádkem."
date: "2025-08-25"
last_modification: "2025-08-25"
status: 1
tags: ["napady", "produktivita"]
format: "html"
---

<p>Je zažitá představa, že by textové soubory měly končit prázdným řádkem.</p>

<p>Asi každý programátor se setkal s tím, že to někomu psal při <i>code review</i>. Nebo to naopak někdo psal jemu.</p>

<p>Má to ale opodstatnění?</p>

<h2 id="unix-standard">Unix standard</h2>
<p>Podle <a href="https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap03.html#tag_03_387">POSIX standardu</a> by každý textový soubor měl končit znakem nového řádku. Přesněji řečeno standard definuje, že textový soubor je posloupnost řádků, kde každý řádek končí znakem nového řádku.</p>

<h2 id="praxe">Chování v praxi</h2>
<p>Situace, kdy by absence prázdného řádku na konci souboru způsobovala reálné problémy, je spíše raritní.</p>

<h3 id="spojeni">Spojování souborů</h3>

<p>Problém může být v tom, že nějaké nástroje mohou počítat s chováním dle standardu, a tak spoléhat na to, že na konci souboru bude prázdný řádek.</p>

<p>Třeba při spojování souborů při nedodržení standardu se může stát, že se řádky slijí dohromady:</p>

<p><code>soubor1.js</code></p>

<pre><code>let promenna = 1</code></pre>

<p><code>soubor2.js</code></p>

<pre><code>let promenna2 = 2</code></pre>

<p>Výsledkem bude syntaktická chyba:</p>

<pre><code>let promenna = 1let promenna2 = 2</code></pre>

<h3 id="pocet-radku">Počet řádků</h3>

<p>Podobně může vyjít špatný počet řádků, pokud se budou počítat podle konce řádků, který ale na konci souboru nebude.</p>

<h3 id="git">Git a versování</h3>
<p>Git sám o sobě automaticky nepřidává prázdný řádek na konec souborů, ale zobrazuje varování, když soubor nekončí novým řádkem:</p>

<pre><code class="language-bash">\ No newline at end of file</code></pre>

<p>Pokud někdo na projektu nové řádky na konec dává a někdo ne, zbytečně to způsobuje nerelevantní změny.</p>

<h2 id="lint">Lint</h2>

<p>Osobně si myslím, že nemá moc smysl řešit ručně <i>code style</i>. Takže je určitě vhodné mít na projektu např. <a href="https://prettier.io">Prettier</a>, který konsistenci zajistí.</p>

<h2 id="tolerance">Tolerance</h2>

<p>Při programování doporučuji nebýt naivní a počítat při práci s konci řádků s oběma variantami. Tj. počítat s tím, že prázdný řádek existovat může a nemusí.</p>

<p>Většinou se to řeší tak, že se stejně používá nějaká funkce trim.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
    <li><a href="http://stackoverflow.com/questions/729692/why-should-text-files-end-with-a-newline">Why should text files end with a newline?</a></li>
    <li><a href="http://stackoverflow.com/questions/2287967/why-is-it-recommended-to-have-empty-line-in-the-end-of-file">Why is it recommended to have empty line in the end of file?</a></li>
    <li><a href="http://stackoverflow.com/questions/5813311/no-newline-at-end-of-file">No newline at end of file</a></li>
</ul>
