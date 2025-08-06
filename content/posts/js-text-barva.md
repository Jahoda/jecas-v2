---
title: "Získání unikátní barvy pro text v JS"
headline: "Získání unikátní barvy pro text v JS"
description: "Jak pro libovolný řetězec spočítat unikátní barvu."
date: "2023-01-07"
last_modification: "2023-01-10"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>V některých případech se hodí na základě uživatelského obsahu vytvořit barvu.</p>

<p>Například u chybějícího profilového obrázku se může nabízet vytvořit něco jako:</p>

<p><img src="/files/js-text-barva/barva-avataru.png" alt="Barva avataru" class="border"></p>
















<p>K tomu stačí převést identifikátor uživatele (např. jméno) na kód barvy. Jde k tomu použít následující funkce:</p>

<pre><code>function hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i &lt; str.length; i++) {
        hash = str.charCodeAt(i) + ((hash &lt;&lt; 5) - hash);
    }
    return hash;
}

function intToRGB(i: number) {
    const c = (i &amp; 0x00ffffff).toString(16).toUpperCase();

    return '00000'.substring(0, 6 - c.length) + c;
}

function stringToColor(string: string) {
    return `#${intToRGB(hashCode(string))}`;
}</code></pre>


<p>Použití:</p>

<pre><code>stringToColor("Tomáš Jedno")</code></pre>



















<p>Jak to funguje?</p>



<ol>
  <li>
    <p>První funkce <code>hashCode</code> převede řetězec na číslo.</p>
    
    <p>Funkce začíná s <code>hash</code> hodnotou 0 a poté iteruje přes každý znak v řetězci. Pro každý znak pak funkce přidá jeho ASCII  k <code>hash</code> hodnotě a poté posune <code>hash</code> hodnotu vlevo o 5 bitů a odečte původní <code>hash</code> hodnotu. To vytvoří novou <code>hash</code> hodnotu, která je závislá na předchozí hodnotě a ASCII hodnotě aktuálního znaku.</p>
  </li>
  
  
  <li>
    <p>Druhá funkce číslo převede na hexadecimální kód barvy.</p>
    
    <p>Nejprve provede bitovou operaci AND s číslem <code>0x00FFFFFF</code>. Tím nastaví prvních 8 bitů čísla na 0, což efektivně omezí číslo na rozsah 0 až 16777215 (16777215 je rovno 0x00FFFFFF v hexadecimální soustavě).</p>
    
    <p>Výsledné číslo je poté převedeno na řetězec v základu 16 (hexadecimální) pomocí metody <code>toString</code>. Výsledný řetězec je poté převeden na velká písmena pomocí metody <code>toUpperCase</code>.</p>
    
    <p>Nakonec funkce vrátí hexadecimální řetězec, který je případně vyplněný doplněn na začátku nulami tak, aby měl délku 6 znaků. Vyplnění nulami je dosaženo pomocí metody <code>substring</code>, která extrahuje část řetězce založené na počátečním a koncovém indexu. V tomto případě je počáteční index 0 a koncový index je 6 mínus délka hexadecimálního čísla.</p>
  </li>
</ol>




<h2 id="inicialy">Získání iniciál</h2>

<p>Pro získání prvních písmen ze jména stačí jméno rozdělit funkcí <code>split</code> podle mezery:</p>

<p><a href="https://svelte.dev/repl/40aed0ec00af4ce68fec106d138e7e3e?version=3.55.0">Živá ukázka ve Svelte</a></p>










<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>
    StackOverflow: <a href="https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript">Create a hexadecimal colour based on a string with JavaScript</a>
  </li>
</ul>