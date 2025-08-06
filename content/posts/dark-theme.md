---
title: "Jak vytvořit tmavý režim / dark mode v CSS"
headline: "Jak vytvořit tmavý režim / dark mode v CSS"
description: "Jak co nejlépe vytvořit pro web tmavý režim, aby automaticky respektoval nastavení uživatele."
date: "2020-02-26"
last_modification: "2021-11-10"
status: 1
tags: ["css", "hotova-reseni", "webove-prohlizece"]
format: "html"
---

<p>V roce 2019 přišel <b>Apple s tmavým režimem v iPhonech</b>. To tmavé režimy značně zpopularisovalo.</p>

<p>Uživatelé si najednou nastavují tmavé zobrazení a očekávají, že se tomu přizpůsobí i web.</p>












<h2 id="tmavy-svetly">Tmavý, nebo světlý?</h2>

<p>Jestli je lepší, čitelnější nebo pro oči lepší tmavý/světlý web je těžká otázka. Zdá se, že každému vyhovuje něco jiného.</p>

<p>Zastánci tmavých režimů mají pocit, že jim světlý web vypálí oči. Zastánci světlých zase argumentují lepší čitelností při intensivním okolním světle.</p>

<p>A potom je tu skupina těch, kteří preferují <b>automatické nastavení</b> podle denní doby.</p>

<p>Naštěstí se vhodným řešením dá zavděčit všem…</p>








<h2 id="nastaveni">Nastavení v systému/prohlížeči</h2>

<p>Lze se setkat se třemi možnostmi nastavení:</p>

<ol>
  <li>
    světlé,
  </li>
  <li>
    tmavé,
  </li>
  <li>automatické</li>
</ol>

<p>Automaticky znamená, že se podle denní doby (většinou východ/západ slunce) režim změní.</p>

<p>Ve <b>Windows</b> jde nastavit pouze tmavý nebo světlý vzhled aplikace. <i>Nastavení → Přizpůsobení → Barvy → Zvolit výchozí režim aplikace</i>:</p>

<p><img src="/files/dark-theme/windows.png" alt="Nastavení tmavého režimu ve Windows" class="border"></p>
















<p>Toto nastavení potom přebírají prohlížeče.</p>



<p>V <b>macOS</b> existuje i automatický režim.</p>


<p><img src="/files/dark-theme/macos.png" alt="Nastavení tmavého režimu v macOS" class="border"></p>







<p>V <b>iOS</b> potom obdobně:</p>


<p><img src="/files/dark-theme/ios.png" alt="Nastavení tmavého režimu v iOS" class="border"></p>








































<p>Web podporující změnu režimu dle nastavení systému by se při změně měl <b>ihned přebarvit</b>.</p>

<p>Světlé nebo tmavé zobrazení jde obvykle nastavit i přímo v prohlížeči.</p>



<h2 id="media">Detekce v CSS <code>@media</code> pravidlu</h2>

<p>Přímo v CSS existuje <a href="/media"><code>@media</code> pravidlo</a> detekující preferovaný režim.</p>



<h3 id="dark">Tmavý režim</h3>

<pre><code>@media (prefers-color-scheme: dark) {
  /* styly pro tmavý režim */
}</code></pre>








<h3 id="light">Světlý režim</h3>

<pre><code>@media (prefers-color-scheme: light) {
  /* styly pro světlý režim */
}</code></pre>







<p><b>Podpora v prohlížečích</b> je slušná. Chybí akorát v marginálních prohlížečích jako je <b>IE 11</b> nebo starý <b>Edge</b>.</p>

<p>Pokud se ale veškeré styly neuzavřou do těchto podmínek, ale jeden z nich se nechá mimo, zůstane v nepodporovaných prohlížečích alespoň výchozí styl.</p>





<h2 id="js">Zjištění podpory v JS</h2>

<p>Detekce v JavaScriptu lze potom provést stejnými media pravidly v <a href="/matchmedia"><code>matchMedia</code></a>:</p>

<pre><code>if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // uživatel preferuje tmavý režim
}
else {
  // uživatel preferuje světlý režim
}</code></pre>







<p>Hodí se i detekce, jestli prohlížeč dokáže převzít informaci o nastavení ze systému/prohlížeče.</p>

<pre><code>if (window.matchMedia('(prefers-color-scheme)').media === 'not all') { 
  // tmavý/světlý režim není podporován
}</code></pre>






<p>A na základě toho (ne)zobrazovat přepínání mezi světlým a tmavým tématem.</p>


<h3 id="zmena">Reakce na změnu režimu</h3>

<p>Na změnu režimu v systému/prohlížeči lze reagovat následovně:</p>

<pre><code>window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  if (event.matches) {
    // přepnuto na tmavý
  }
  else {
    // přepnuto na světlý
  }
})</code></pre>











<p>Pro <b>Safari</b> je v roce 2020 potřeba volit jiný postup a použít <code>addListener</code> bez názvu události, který funguje i v ostatních prohlížečích:</p>

<pre><code>window.matchMedia('(prefers-color-scheme: dark)').addListener(event => {
  if (event.matches) {
    // přepnuto na tmavý
  }
  else {
    // přepnuto na světlý
  }
})</code></pre>









<p>Tato událost se zavolá ve 2 případech:</p>

<ol>
  <li>Uživatel si přepne v nastavení systému/prohlížeče preferovaný režim.</li>
  <li>Režim se změní sám (např. automatická změna v <b>iOS</b> podle denní doby).</li>
</ol>


<h2 id="best-practice">Best practice</h2>

<p>Jak ale v praxi nejlépe tmavý režim vytvořit?</p>

<p>Nejjednodušší řešení je přidat pár řádků kódu, které pomocí <a href="/filter">CSS filtrů</a> otočí barvy:</p>

<pre><code>@media (prefers-color-scheme: dark) {
  html {
    background: #1D1D1D;
    filter: invert(100%) contrast(90%) hue-rotate(180deg);
  }
}
</code></pre>







<p><button onclick="document.documentElement.classList.toggle('theme-filter-dark')">Zapnout/vypnout</button></p>

<style>
.theme-filter-dark {
  background: #1D1D1D;
    filter: invert(100%) contrast(90%) hue-rotate(180deg);
}
</style>

<p>Pro seriosní použití to ale moc není :–)</p>

<p>Když pominu to, že některé barvy a obrázky nedopadnou takovou změnou dobře, další věc je, že <b>nestačí jen invertovat barvy</b>.</p>

<p>Barvy totiž slouží i k znázornění důležitosti a fakt, že jde zdůraznit část stránky použitím světlejší barvy, platí stejně u tmavého i světlého webu stejně – tato logika není invertovaná.</p>

<p>Proto je pro dobrý výsledek dobré barvy nastavit ručně.</p>


<h3 id="promenne">CSS proměnné</h3>

<p>Pro pořádné vytvoření tmavého režimu (nebo obecně snadné změny stylu) je ideální používat <a href="/var">CSS proměnné</a>.</p>

<p>Pokud se tmavý režim doplňuje do již hotového webu, je vhodné na ně přejít. Použití je potom následující:</p>

<pre><code>:root {
  --background-color: #ededed;
  --text-color: #212121;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #111;
    --text-color: #ededed;
  }
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}</code></pre>


<ol>
  <li>
    <p>Nejprve se nadeklarují výchozí proměnné světlého režimu pro selektor <code>:root</code>.</p>

    <p>Bývá zvykem pro CSS proměnné používat <a href="/css-selektory#korenovy">kořenový selektor <code>:root</code></a>, ten u HTML stránky odpovídá selektoru <code>html</code>, jen je silnější (<a href="https://kod.djpw.cz/wowc">ukázka</a>).</p>

    <p>Teoreticky je universálnější – třeba kdyby se styly potom připojily do <a href="/svg"><code>&lt;svg></code></a>, kde žádný <code>&lt;html></code> element není. V praxi se tedy může použít klidně i <code>html</code>.</p>    
  </li>
  
  <li>
    <p>Potom se pro <i>preferovaný tmavý režim</i> proměnné přepíší na tmavé varianty.</p>
  </li>
  
  <li>
    <p>Nyní se všude v kódu pro barvy používají CSS proměnné.</p>
  </li>
</ol>









<h3 id="prevod">Převod SASS proměnných</h3>


<p>Pokud se na webu používaly proměnné v preprocesoru (např. SASS):</p>

<pre><code>a {
  color: $color-link;
}</code></pre>

<p>Je možné je převést na použití <code>var(--color-link)</code> nahrazením tohoto regulárního výrazu <code>\$(color[\w-]*)</code> na <code>var(--$1)</code>.</p>







<h4 id="rgba">Co s <code>rgba()</code></h4>

<p>V případě preprocesorů je běžné psát pro průhledné barvy:</p>

<pre><code>a {
  color: rgba($color-link, .7);
}</code></pre>







<p>S CSS proměnnou nastane problém, protože tohle na ní nejde aplikovat. Řešení je třeba převod do RGB formátu. Jde k tomu použít jednoduchý SASS mixin. A proměnnou barvy potom použít uvnitř <code>rgba</code>:</p>

<pre><code>@function hexToRgb($color) {
    @return red($color), green($color), blue($color);
}
:root {
  --color-rgb-background: #{hexToRgb(#666)};
}
div {
  background: rgba(var(--color-rgb-background), .5);
}</code></pre>














<h3 id="fallback">Fallback CSS proměnných</h3>

<p>Protože třeba v <b>IE 11</b> CSS proměnné nefungují, hodí se použít nějaký fallback. Existuje šikovný PostCSS plugin <a href="https://www.npmjs.com/package/postcss-css-variables">postcss-css-variables</a>. Ten dokáže vlastnosti s proměnnými zduplikovat a <code>var(--color-neco)</code> nahradit skutečnou hodnotou.</p>

<pre><code>postcss([
  cssvariables({
    preserve: true,
  }),
])</code></pre>








<p>Hodit se může i možnost nakonfigurovat proměnné přímo:</p>

<pre><code>postcss([
  cssvariables({
    preserve: true,
    variables: {'--color-background', '#111')},
    preserveInjectedVariables: false,
  }),
])</code></pre>









<p>Výsledkem je potom následující kód:</p>

<pre><code>neco {
  background: #111;
  background: var(--color-background);
}
</code></pre>






<p>Nové prohlížeče použijí proměnnou, staré fallback.</p>




<h2 id="prepinani">Ruční přepínání</h2>

<p>Říká se, že<b> každá položka v nastavení je selhání designéra</b>. Z tohoto pohledu se nabízí žádnou možnost přepínání mezi vzhledy nemít a nechat to na nastavení systému/prohlížeče.</p>

<p>Je otázka, proč by člověku, co má v systému nastaven tmavý režim, vadilo, že se tomu přizpůsobí web.</p>

<p>Nabízí se jen situace, kdy jsou uživatelé zvyklí na světlý web a najednou se jim přepne do tmavé podoby.</p>

<p>Pro možnost autodetekce i ručního přepínání zároveň je vhodné použít nějaký mixin vkládající kód pro vynucený i automatický tmavý režim:</p>








<pre><code>@mixin inDark {
    .theme-dark {
        @content;
    }

    .theme-system {
        @media (prefers-color-scheme: dark) {
            @content;
        }
    }
}</code></pre>












<p>A použití:</p>

<pre><code>@include inDark {
    --color-background: #111;
}</code></pre>





<p>To zajistí následující chování:</p>

<ol>
  <li>
    <p>Bude-li mít značka <code>&lt;html></code> třídu <code>theme-dark</code>, nastaví se tmavé proměnné.</p>
  </li>
  <li>
    <p>Bude-li mít značka <code>&lt;html></code> třídu <code>theme-system</code>, nastaví se tmavé proměnné jen když bude uživatel preferovat tmavý režim.</p>
  </li>
  <li>
    <p>Nebude-li mít <code>&lt;html></code> žádnou třídu, použijí se výchozí světlé barvy.</p>
  </li>
</ol>

<p>Nyní stačí už jen <a href="/prepinani-trid">přepínat třídy JavaScriptem</a>. </p>

<h3 id="duplicita">Duplicitní deklarace barev</h3>

<p>Jak je vidět z kódu, deklarace CSS proměnných bude v kódu dvakrát. Mohlo by se nabízet detekovat styl čistě v JS a až podle toho třídu nastavovat. Bohužel to má nevýhodu v problikávání při načítání, než se stihne JS spustit.</p>

<p>Takže jedině takový JS nedávat do externího souboru, ale umístit ho do kódu před samotný obsah webu.</p>

<h3 id="ulozit">Uložení nastavení</h3>

<p>K úvaze je, kam uložit nastavení vzhledu. Záleží na typu aplikace. U klasické aplikace renderující se na straně serveru jsou výhodnější <a href="/cookies">cookies</a> než třeba <a href="/localstorage"><code>localStorage</code></a>, protože kvůli prevenci probliknutí po změně je nutné znát situaci už na backendu.</p>

<p>U <a href="/spa">SPA</a> je <code>localStorage</code> v pohodě.</p>

<p>Nastavení se i může ukládat do profilu, pokud se uživatel přihlašuje.</p>







<h2 id="problemy">Řešení obvyklých problémů</h2>

<p>Při převádění již existujícího světlého webu do tmavých barev dost možná  narazíte na následující problémy:</p>






<h3 id="ikony">Barvy ikon a obrázků</h3>

<p>Asi nejpracnější část výroby tmavého režimu, pokud nejsou ikony řešeny vhodným způsobem.</p>

<p>Ideální je používat nějaké ikony, které jde <b>snadno přebarvovat</b>. Takže třeba SVG vložené inline do HTML kódu nebo pomocí <code>&lt;use></code> z SVG spritu:</p>

<pre><code>&lt;svg>
  &lt;use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="sprite.svg#icon">&lt;/use>
&lt;/svg></code></pre>








<p>A v ikoně používat pro přebarvitelné části v atributech <code>fill</code> a <code>stroke</code> hodnotu <a href="/currentcolor"><code>currentColor</code></a>. Šlo by i používat přímo CSS proměnné, ale byl by s nim problém kvůli nepodpoře ve starších prohlížečích.</p>

<p>Potom už jde ikonky snadno přebarvit:</p>



<pre><code>svg {
  fill: var(--color-text);
}</code></pre>





<p>Dobře přebarvitelné jsou i staré <del>dobré</del> <a href="/font-ikony">font ikony</a>, ale ty trpí řadou různých problémů, že je používat nedoporučuji.</p>


<h4 id="filter">Přebarvení CSS filtrem</h4>

<p>U jiných než vektorových obrázků (PNG, JPG, GIF) je jediná možnost použít již zmíněnou vlastnost <code>filter</code>.</p>

<p>Průhledný obrázek jako třeba logo jde převést na bílou následovně:</p>

<pre><code>.theme-dark .logo {
  filter: invert(.5) brightness(2);
}</code></pre>








<p>Případně obráceně na černou:</p>

<pre><code>.theme-dark .logo {
  filter: invert(.5) brightness(0);
}</code></pre>







<h3 id="hodne-barev">Velký počet barev</h3>

<p>Hodně webů trpí nešvarem v podobě velkého počtu barevných odstínů. Většinou to vzniká tak, že se barvy chaoticky střílí od oka. Ve finále jsou potom na webu vysoké desítky až stovky různých barev.</p>

<p>Je dobré se podívat na všechny použité barvy – třeba nástrojem <a href="http://www.css-color-extractor.com/">CSS Color Extractor</a> – a pokusit se je sjednotit.</p>

<p>Usnadní to práci a udržování dvou (popř. více) barevných schémat.</p>







<h3 id="theme-color">Barva prohlížeče <code>theme-color</code></h3>

<p>Zvlášť na mobilech je populární <a href="/barva-mobilniho-prohlizece">přebarvovat horní lištu</a>.</p>

<pre><code>&lt;meta name="theme-color" content="#1081DD"></code></pre>





<p>I tuto lištu se pravděpodobně hodí barvit podle použitého režimu, aby ladila ke zbytku stránky.</p>

<p>Není problém barvu přepínat JavaScriptem, takže může reagovat i na přepínání a detekci režimu.</p>

<p>Akorát to nejde jen v CSS, ale musí se skriptem měnit atribut <code>content</code> – <a href="https://kod.djpw.cz/ksed">živá ukázka</a>.</p>


<h2 id="narocnost">Jak je přechod náročný?</h2>

<p>Ačkoliv to tak může vypadat, vytvořit tmavý režim k již existujícímu světlému webu není úplně práce na odpoledne. A může vyžadovat velkou porci změn ve zdrojovém kódu.</p>

<p>Příklad z jednoho projektu:</p>

<p><img src="/files/dark-theme/diff.jpeg" alt="Změny kvůli tmavému režimu" class="border"></p>



























<h2 id="inspirace">Kde se inspirovat</h2>

<p>Jaké zvolit odstíny černé a šedé? Příklad populárních webů a aplikací, kde existuje světlý/tmavý režim.</p>

<ul>
  <li><a href="https://www.facebook.com">facebook.com</a>,</li>
  <li><a href="https://twitter.com/">twitter.com</a>,</li>
  <li><a href="https://stackoverflow.com">stackoverflow.com</a>,</li>
  <li><a href="https://www.youtube.com">youtube.com</a></li>
</ul>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>
    <a href="https://gist.github.com/tunguskha/e4dceb7080bfeea486cd476e9631a413">Darken &amp; Lighten colors in pure CSS using variables</a>
  </li>
  <li>
    <a href="https://codyhouse.co/blog/post/how-to-combine-sass-color-functions-and-css-variables">How to combine SASS color functions and CSS Variables</a>
  </li>
  
  <li><a href="https://www.sassmeister.com/gist/024661b7927d7bce4874204cdbeb5eed">Příklad generování CSS proměnných ze SASS proměnných</a></li>
  
  <li><a href="https://codepen.io/sosuke/pen/Pjoqqp">Generátor filtrů pro přebarvení černé</a></li>
</ul>
