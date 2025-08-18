---
title: "Znázornění možnosti scrollování"
headline: "Znázornění možnosti scrollování"
description: "Jak dát uživateli informaci, že je možné někam scrollovat."
date: "2025-06-08"
last_modification: "2025-06-08"
status: 1
tags: ["js", "scroll", "css", "ux"]
format: "html"
---

<p>Přidat nějakému bloku na stránce posuvník je často snadné řešení problémů, kdy na daném místě může být obsah s hodně proměnlivou délkou. Ve světě responsivního designu a rozmanitých zařízení je to navíc velmi praktické řešení.</p>

<p>Typické případy použití zahrnují:</p>

<ul>
<li><strong>Uživatelský obsah</strong> – komentáře, zprávy, popisy produktů</li>
<li><strong>Datové tabulky</strong> s mnoha sloupci, které se nevejdou na menší obrazovky</li>
<li><strong>Navigační menu</strong> s velkým počtem položek</li>
<li><strong>Seznamy produktů</strong> nebo článků v boční liště</li>
<li><strong>Kód nebo logy</strong> v administračních rozhraních</li>
<li><strong>Galerie obrázků</strong> v horizontálním layoutu</li>
</ul>

<p>Je-li obsah plně pod kontrolou tvůrce webu, lze a je dobré těmto situacím předcházet promyšleným designem. Nicméně v reálných aplikacích to často není možné.</p>

<p>Přidat posuvník čemukoliv jde velmi snadno – vlastností <code>overflow: auto</code> nebo <code>overflow: scroll</code>. Rozdíl je v tom, že <code>auto</code> zobrazí posuvník pouze při potřebě, zatímco <code>scroll</code> ho zobrazuje vždy.</p>


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

<p>Pokud nastavíme výšku kontejneru tak, aby byla menší než výška obsahu, ale přitom <em>usekla</em> obsah uprostřed řádku nebo elementu, uživatel rychle pochopí, že obsah pokračuje.</p>

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

<p>Druhou možností je přidat visuální indikátor, který uživateli napoví, že je možné scrollovat. Může to být například:</p>

<ul>
<li><strong>Gradient přechod</strong> na konci obsahu indikující jeho pokračování</li>
<li><strong>Šipka</strong> nebo jiná ikona</li>
</ul>

<h3 id="gradient">Gradient přechod</h3>

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

<p>Docílit tohoto efektu jde přechodem z průhledné do barvy pozadí bloku.</p>




<h3 id="js-reseni">JavaScript řešení</h3>

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

<h2 id="horizontalni-scrollovani">Horizontální scrollování</h2>

<p>Horizontální scrollování má svá specifika a často je problematičtější než vertikální:</p>

<h3 id="horizontalni-implementace">Základní implementace</h3>

<p>Pro horizontální scrollování se používá <code>overflow-x</code>, současně je potřeba zabránit zalomení obsahu:</p>

<pre><code class="language-css">.horizontal-scroll {
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    /* Alternativně pro flex layout */
    display: flex;
    flex-wrap: nowrap;
}</code></pre>


<p>Pro horizontální scrollování můžeme použít podobné indikátory, jen orientované jinak:</p>

<div class="live">
<div style="position: relative; overflow: hidden">
    <div style="overflow-x: auto; overflow-y: hidden; display: flex; background: white; 
                gap: 10px; padding: 1rem; scroll-behavior: smooth"
        onscroll="
         const indicatorShadow = this.parentNode.querySelector('.scroll-indicator-shadow');
         const indicatorArrow = this.parentNode.querySelector('.scroll-indicator-arrow');
         const isScrollable = this.scrollWidth > this.clientWidth;
         const isAtBottom = this.scrollLeft + this.clientWidth >= this.scrollWidth - 1;
         
         if (isScrollable && !isAtBottom) {
             indicatorShadow.style.opacity = '1';
             indicatorArrow.style.opacity = '1';
         } else {
             indicatorShadow.style.opacity = '0';
             indicatorArrow.style.opacity = '0';
         }
     ">
        <div style="min-width: 150px; height: 100px; background: #ff6b6b; 
                    display: flex; align-items: center; justify-content: center; 
                    color: white; border-radius: 8px">Karta 1</div>
        <div style="min-width: 150px; height: 100px; background: #4ecdc4; 
                    display: flex; align-items: center; justify-content: center; 
                    color: white; border-radius: 8px">Karta 2</div>
        <div style="min-width: 150px; height: 100px; background: #45b7d1; 
                    display: flex; align-items: center; justify-content: center; 
                    color: white; border-radius: 8px">Karta 3</div>
        <div style="min-width: 150px; height: 100px; background: #f9ca24; 
                    display: flex; align-items: center; justify-content: center; 
                    color: white; border-radius: 8px">Karta 4</div>
        <div style="min-width: 150px; height: 100px; background: #6c5ce7; 
                    display: flex; align-items: center; justify-content: center; 
                    color: white; border-radius: 8px">Karta 5</div>
    </div>
    <div class="scroll-indicator-shadow" style="position: absolute; right: 0; top: 0; height: 100%; width: 30px;
                background: linear-gradient(to left, white, transparent); 
                pointer-events: none"></div>
    <div class="scroll-indicator-arrow" style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%);
                background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; 
                border-radius: 3px; font-size: 12px">→ více</div>
</div>
</div>

<h3>JavaScript pro horizontální scroll</h3>

<p>Detekce horizontálního scrollování je podobná vertikálnímu, jen používáme jiné vlastnosti:</p>

<pre><code class="language-javascript">function setupHorizontalScrollIndicator(container) {
    const indicator = container.querySelector('.horizontal-indicator');
    
    function updateIndicator() {
        const isScrollable = container.scrollWidth > container.clientWidth;
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
        
        if (isScrollable && !isAtEnd) {
            indicator.style.opacity = '1';
        } else {
            indicator.style.opacity = '0';
        }
    }
    
    container.addEventListener('scroll', updateIndicator);
    updateIndicator();
}</code></pre>

<h3>Scroll snapping</h3>

<p>Pro horizontální scrollování se často hodí scroll snapping pro přichycení na konkrétní položky:</p>

<pre><code class="language-css">.horizontal-snap {
    scroll-snap-type: x mandatory;
    overflow-x: auto;
    display: flex;
}

.horizontal-snap > * {
    scroll-snap-align: start;
    flex-shrink: 0;
}</code></pre>

<h2 id="progress-bar">Progress bar pro scroll</h2>

<p>Pokročilejší technikou je zobrazení progress baru, který ukazuje, jaká část obsahu už byla přečtena:</p>

<div class="live">
<div style="position: relative">
    <div style="position: absolute; top: 0; left: 0; height: 3px; 
                background: #3498db; width: 0%; transition: width 0.1s; z-index: 10"
         class="progress-bar"></div>
    <div style="overflow: auto; height: 8rem; border: 1px solid #ccc; padding: 1rem"
         onscroll="
             const progressBar = this.parentNode.querySelector('.progress-bar');
             const scrollPercent = (this.scrollTop / (this.scrollHeight - this.clientHeight)) * 100;
             progressBar.style.width = scrollPercent + '%';
         ">
        <h4>Dlouhý článek s progress barem</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.</p>
        <p>Explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
        <p>Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    </div>
</div>
</div>

<pre><code class="language-javascript">function createScrollProgress(container) {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        height: 3px;
        background: #3498db;
        width: 0%;
        transition: width 0.1s ease;
        z-index: 10;
    `;
    
    container.style.position = 'relative';
    container.appendChild(progressBar);
    
    container.addEventListener('scroll', () => {
        const scrollPercent = (container.scrollTop / 
            (container.scrollHeight - container.clientHeight)) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    });
}</code></pre>


<h2 id="zaver">Závěr a doporučení</h2>

<p>Při návrhu rozhraní s možností scrollování je důležité myslet na celkovou uživatelskou zkušenost:</p>

<p>Nejjednodušší řešení spočívá v přesném nastavení výšky kontejneru tak, aby část obsahu byla uříznuta. Pro složitější případy lze použít visuální indikátory jako barevné přechody nebo ikony zobrazované dle odrolování.</p>

<p>Nejlepší scroll indikátor je ten, který uživatel ani nepotřebuje – promyšlený design obsahu a layoutu může často eliminovat nutnost scrollování úplně.</p>

<style>
    .live {
        padding-right: 10rem;
    }
</style>