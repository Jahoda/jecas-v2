---
title: "Znázornění možnosti scrollování"
headline: "Znázornění možnosti scrollování"
description: "Jak dát uživateli informaci, že je možné někam scrollovat."
date: "2025-06-08"
last_modification: null
status: 1
tags: ["js", "scroll"]
format: "html"
---

<p>Přidat nějakému bloku na stránce posuvník je často snadné řešení problémů, kdy na daném místě může být obsah s hodně proměnlivou délkou.</p>

<p>To může být typicky třeba <strong>uživatelský obsah</strong>, ale třeba i různé <strong>tabulky se spoustou sloupců</strong>.</p>

<p>Je-li obsah plně pod kontrolou tvůrce webu, lze a je dobré těmto situacím předcházet.</p>

<p>Přidat posuvník čemukoliv jde velmi snadno – vlastností <code>overflow: auto</code>.</p>


<div class="live">
<div style="overflow: auto; height: 5rem">
    Opravdu
    <br>
    hodně
    <br>
    dlouhý
    <br>
    obsah
    <br>
    s posuvníkem
</div>
</div>

<p>Problém nastává s tím, že uživatel nemusí posuvník postřehnout a vůbec ho nemusí napadnout, že obsah někam pokračuje.</p>

<p>Co s tím?</p>

<ol>
<li>Jedna možnost je volit výšku tak, aby pokud možno <em>usekla</em> kus obsahu.</li>
<li>Druhá možnost je přidat indikátor.</li>
</ol>

<h2 id="useknuti">Useknutí řádku</h2>

<p>Pokud nastavíme výšku kontejneru tak, aby byla menší než výška obsahu, ale přitom "usekla" obsah uprostřed řádku nebo elementu, uživatel rychle pochopí, že obsah pokračuje.</p>

<p>Zde jde dobře využít kombinace velikosti písma (<a href="/font#size"><code>font-size</code></a>) a výšky řádku (<a href="/font#line-height"><code>line-height</code></a>).</p>

<div class="live">
<div style="overflow: auto; height: 3.2rem; padding: 0.5rem">
    První řádek obsahu
    <br>
    Druhý řádek obsahu
    <br>
    Třetí řádek obsahu - tento je částečně oříznutý
    <br>
    Čtvrtý řádek obsahu
    <br>
    Pátý řádek obsahu
</div>
</div>

<p>Toto řešení funguje dobře zejména u textového obsahu, kde je jasně vidět, že text pokračuje.</p>

<h2 id="indikator">Scroll indikátor</h2>

<p>Druhou možností je přidat vizuální indikátor, který uživateli napoví, že je možné scrollovat. Může to být například:</p>

<ul>
<li><strong>Gradient přechod</strong> na konci obsahu</li>
<li><strong>Šipka</strong> nebo jiná ikona</li>
<li><strong>Stínování</strong> indikující pokračování obsahu</li>
</ul>

<h3>Gradient přechod</h3>

<p>Nejelegantnějším řešením bývá gradient, který postupně mizí směrem k okraji kontejneru:</p>

<div class="live">
<div style="position: relative; overflow: hidden; height: 5rem">
    <div style="overflow: auto; height: 100%; padding: 0.5rem; padding-right: 1rem; background: white">
        Dlouhý obsah který pokračuje
        <br>
        další řádek
        <br>
        ještě další řádek
        <br>
        a další obsah
        <br>
        hodně dlouhý obsah
        <br>
        ještě více obsahu
        <br>
        konec obsahu
    </div>
    <div style="position: absolute; bottom: 0; right: 0; width: 100%; height: 1rem; 
                background: linear-gradient(transparent, white); pointer-events: none"></div>
</div>
</div>

<p>Doclít tohoto efektu jde přechodem z průhledné do barvy pozadí bloku.</p>

<h3>JavaScript řešení</h3>

<p>Pro pokročilejší indikaci můžeme použít JavaScript, který bude zobrazovat indikátor pouze tehdy, když je skutečně co scrollovat:</p>


<pre><code class="language-javascript">function setupScrollIndicator(container) {
    const indicator = container.querySelector('.scroll-indicator');
    
    function updateIndicator() {
        const isScrollable = container.scrollHeight > container.clientHeight;
        const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;
        // -1 kompenzuje možné zaokrouhlovací chyby v prohlížeči
        
        if (isScrollable && !isAtBottom) {
            indicator.style.opacity = '1';
        } else {
            indicator.style.opacity = '0';
        }
    }
    
    container.addEventListener('scroll', updateIndicator);
    updateIndicator();
}
</code></pre>


<p><strong>Vysvětlení klíčových částí kódu:</strong></p>
<ul>
<li><code>scrollHeight</code> – celková výška obsahu včetně skryté části</li>
<li><code>clientHeight</code> – viditelná výška kontejneru</li>
<li><code>scrollTop</code> – aktuální pozice scrollu od vrcholu</li>
<li><code>-1</code> na konci kompenzuje zaokrouhlovací chyby prohlížeče při práci se subpixely</li>
</ul>

<div class="live">
<div style="position: relative">
<div style="overflow: auto; height: 5rem"
     onscroll="
         const indicator = this.parentNode.querySelector('.scroll-indicator');
         const isScrollable = this.scrollHeight > this.clientHeight;
         const isAtBottom = this.scrollTop + this.clientHeight >= this.scrollHeight - 1;
         
         if (isScrollable && !isAtBottom) {
             indicator.style.opacity = '1';
         } else {
             indicator.style.opacity = '0';
         }
     ">
    Dlouhý obsah s indikátorem scrollování
    <br>
    Druhý řádek obsahu
    <br>
    Třetí řádek obsahu
    <br>
    Čtvrtý řádek obsahu
    <br>
    Pátý řádek obsahu
    <br>
    Šestý řádek obsahu
    <br>
    Sedmý řádek obsahu
    <br>
    Osmý řádek obsahu
    <br>
    Devátý řádek obsahu
    <br>
    Konec obsahu
</div>
    <div class="scroll-indicator" style="position: absolute; bottom: 5px; right: 10px; 
         background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 3px; 
         font-size: 12px; opacity: 1; transition: opacity 0.3s">
        ↓ více
    </div>
</div>
</div>

<h2 id="zaver">Závěr</h2>

<p>Při návrhu rozhraní s možností scrollování je důležité myslet na to, zda bude uživateli jasné, že obsah pokračuje. Nejjednodušší řešení spočívá v přesném nastavení výšky kontejneru tak, aby část obsahu byla uříznuta.</p>

<p>Pro složitější případy lze použít visuální indikátory jako gradienty nebo ikony, případně s využitím JavaScriptu.</p>

<style>
    .live {
        padding-right: 10rem;
    }
</style>