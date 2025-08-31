---
title: "Proč používat Svelte?"
headline: "Proč používat Svelte?"
description: "Svelte je JS framework, který kompiluje kód do čistého JavaScriptu. Proč je lepší než React nebo Vue?"
date: "2025-08-31"
last_modification: "2025-08-31"
status: 0
tags: ["js", "framework", "svelte"]
format: "html"
---

<p>Svelte je <b>moderní JavaScript framework</b>, který se liší od ostatních populárních řešení jako React nebo Vue.js. Kompiluje kód přímo do skoro čistého JavaScriptu se zachováním výhod jiných reaktivních frameworků, což přináší řadu výhod.</p>

<blockquote>
  <p>Svelte není jen další framework – je to nový přístup k vývoji webových aplikací, který eliminuje potřebu virtuálního DOMu a runtime knihoven.</p>
</blockquote>

<h2 id="co-je-svelte">Co je Svelte?</h2>

<p>Svelte je <b>kompilační framework</b>, který transformuje vaše komponenty do vysoce optimalizovaného vanilla JavaScriptu během build procesu. Na rozdíl od Reactu nebo Vue.js nepotřebuje runtime knihovnu v prohlížeči.</p>

<p>Zatímco tradiční frameworky používají virtuální DOM a diffing algoritmy, Svelte <b>přímo manipuluje s DOMem</b> na základě změn v datech. To vede k menšímu bundle size a lepšímu výkonu.</p>

<h3 id="kompilace-vs-runtime">Kompilace vs Runtime - klíčový rozdíl</h3>

<p><strong>Často se ptáte:</strong> "Jde React nebo Vue taky zkompilovat do čistého JS?"</p>

<p><b>Ano, všechny frameworky se kompilují do JavaScriptu</b>, ale způsob kompilace je zásadně odlišný:</p>

<ul>
  <li><b>React & Vue:</b> Kompilují JSX/templates do volání funkcí, ale stále potřebují runtime knihovnu v prohlížeči</li>
  <li><b>Svelte:</b> Kompiluje přímo do DOM manipulace bez jakýchkoliv runtime závislostí</li>
</ul>

<p>Příklad rozdílu:</p>

<pre><code>// React výsledek (stále potřebuje React runtime):
React.createElement("div", { className: "container" },
  React.createElement("h1", null, "Hello ", name)
);

// Svelte výsledek (čistý vanilla JavaScript):
function update() {
  text1.data = "Hello " + name;
}</code></pre>

<p>Proto má Svelte <b>menší bundle size</b> - nepotřebuje balit runtime knihovnu do výsledného kódu.</p>

<h2 id="výhody">Hlavní výhody Svelte</h2>

<h3 id="menší-bundle">Menší bundle size</h3>

<p>Protože Svelte nepotřebuje runtime knihovnu, výsledný JavaScript je mnohem menší. Typická Svelte aplikace má bundle size <b>3–4x menší</b> než ekvivalentní React aplikace.</p>

<pre><code>// Svelte 5 komponenta
&lt;script>
  let count = $state(0);
  
  function increment() {
    count += 1;
  }
&lt;/script>

&lt;button on:click={increment}>
  Kliknuto {count}x
&lt;/button></code></pre>

<p>Výše uvedený kód se zkompiluje do několika řádků vanilla JavaScriptu bez jakýchkoliv závislostí.</p>

<h3 id="lepší-výkon">Lepší výkon</h3>

<p>Bez virtuálního DOMu a diffing algoritmů jsou Svelte aplikace <b>rychlejší</b>. Framework přímo aktualizuje DOM pouze tam, kde je to potřeba, bez zbytečných re-renderů.</p>

<p>Benchmarky ukazují, že Svelte je často <b>2–3x rychlejší</b> než React při renderování a aktualizacích.</p>

<h3 id="jednodušší-syntax">Jednodušší syntax</h3>

<p>Svelte má <b>minimalistickou syntax</b>, která je blíže vanilla HTML a JavaScriptu. Není potřeba učit se JSX nebo speciální template syntax.</p>

<p><strong>Nejlepší na Svelte:</strong> Běžné HTML/CSS je automaticky validní Svelte komponenta!</p>

<pre><code>// Toto je kompletní Svelte komponenta:
&lt;h1>Ahoj světe!&lt;/h1>
&lt;p>Toto je odstavec.&lt;/p>

&lt;style>
  h1 {
    color: blue;
    font-size: 2rem;
  }
  
  p {
    margin: 1rem 0;
    line-height: 1.6;
  }
&lt;/style></code></pre>

<p><strong>Srovnání s ostatními frameworky:</strong></p>

<pre><code>// React - potřebuje JSX a className
function Component() {
  return (
    &lt;div className="container">
      &lt;h1 style={{color: 'blue'}}>Ahoj světe!&lt;/h1>
    &lt;/div>
  );
}

// Vue - potřebuje template wrapper
&lt;template>
  &lt;div class="container">
    &lt;h1 :style="{color: 'blue'}">Ahoj světe!&lt;/h1>
  &lt;/div>
&lt;/template>

// Svelte - čisté HTML/CSS
&lt;div class="container">
  &lt;h1>Ahoj světe!&lt;/h1>
&lt;/div>

&lt;style>
  .container { padding: 1rem; }
  h1 { color: blue; }
&lt;/style></code></pre>

<p>Tato vlastnost dělá Svelte <b>ideálním pro migraci</b> z vanilla HTML/CSS nebo jQuery aplikací. Stačí přidat <code>&lt;script></code> tag pro interaktivitu.</p>

<h3 id="jednoduché-komponenty">Jednoduché vytváření komponent</h3>

<p><strong>Nejlepší na Svelte:</strong> I prázdný soubor je validní Svelte komponenta!</p>

<pre><code>// Toto je kompletní Svelte 5 komponenta:
// (prázdný soubor)

// Toto je také validní komponenta:
&lt;h1>Ahoj!&lt;/h1>

// A toto je plnohodnotná interaktivní komponenta:
&lt;script>
  let count = $state(0);
&lt;/script>

&lt;h1>Počet: {count}&lt;/h1>
&lt;button on:click={() => count++}>
  Zvýšit
&lt;/button>

&lt;style>
  h1 { color: blue; }
  button { background: green; }
&lt;/style></code></pre>

<p><strong>Srovnání s ostatními frameworky:</strong></p>

<pre><code>// React - vždy potřebuje export a return
import React from 'react';

function Component() {
  return (
    &lt;div>
      &lt;h1>Ahoj!&lt;/h1>
    &lt;/div>
  );
}

export default Component;

// Vue - vždy potřebuje template wrapper
&lt;template>
  &lt;div>
    &lt;h1>Ahoj!&lt;/h1>
  &lt;/div>
&lt;/template>

&lt;script>
export default {
  name: 'Component'
}
&lt;/script>

// Svelte - stačí HTML
&lt;h1>Ahoj!&lt;/h1></code></pre>

<p><strong>Výhody jednoduchého vytváření komponent:</strong></p>

<ul>
  <li><b>Minimální překážky</b> - stačí vytvořit soubor s HTML</li>
  <li><b>Postupný vývoj</b> - začněte s HTML, přidejte JavaScript podle potřeby</li>
  <li><b>Snadné prototypování</b> - rychlé vytváření mockupů</li>
  <li><b>Nízký práh vstupu</b> - začátečníci mohou začít okamžitě</li>
</ul>

<p>Tato vlastnost dělá Svelte <b>nejpřístupnějším frameworkem</b> pro začátečníky i zkušené vývojáře.</p>

<h3 id="učicí-křivka">Strmá učicí křivka</h3>

<p>Svelte má <b>strmou učicí křivku</b> - pokud člověk pracoval dříve s Vue.js nebo Reactem, není problém ihned začít psát ve Svelte.</p>

<p><strong>Přechod z React/Vue na Svelte:</strong></p>

<pre><code>// React podmínky a cykly
function Component() {
  const items = ['a', 'b', 'c'];
  const show = true;
  
  return (
    &lt;div>
      {show && &lt;h1>Zobrazeno&lt;/h1>}
      {items.map(item => (
        &lt;div key={item}>{item}&lt;/div>
      ))}
    &lt;/div>
  );
}

// Svelte 5 - jednodušší a čitelnější
&lt;script>
  let items = $state(['a', 'b', 'c']);
  let show = $state(true);
&lt;/script>

{#if show}
  &lt;h1>Zobrazeno&lt;/h1>
{/if}

{#each items as item (item)}
  &lt;div>{item}&lt;/div>
{/each}</code></pre>

<p><strong>Klíčové rozdíly v syntaxi:</strong></p>

<ul>
  <li><b>Podmínky:</b> <code>{#if}...{/if}</code> místo <code>{condition && ...}</code></li>
  <li><b>Cykly:</b> <code>{#each}...{/each}</code> místo <code>.map()</code></li>
  <li><b>Události:</b> <code>on:click</code> místo <code>onClick</code></li>
  <li><b>Styly:</b> <code>class:active</code> místo <code>className={active ? 'active' : ''}</code></li>
</ul>

<p><strong>Výhody Svelte syntaxe:</strong></p>

<ul>
  <li><b>Čitelnější</b> - bloky jsou jasně ohraničené</li>
  <li><b>Konzistentnější</b> - stejný způsob pro všechny kontrolní struktury</li>
  <li><b>Méně boilerplate</b> - žádné arrow funkce nebo ternární operátory</li>
  <li><b>Přirozenější</b> - blíže k běžným programovacím jazykům</li>
</ul>

<p><strong>Čas potřebný na přechod:</strong></p>

<ul>
  <li><b>Z React/Vue:</b> 1-2 dny pro základní syntaxi</li>
  <li><b>Z jQuery:</b> 3-5 dní - velmi přirozený přechod</li>
  <li><b>Z vanilla JS:</b> 1 týden pro kompletní pochopení</li>
  <li><b>Úplný začátečník:</b> 2-3 týdny pro solidní základy</li>
</ul>

<p><strong>Přechod z jQuery na Svelte:</strong></p>

<pre><code>// jQuery - imperativní přístup
$(document).ready(function() {
  $('#counter').text('0');
  
  $('#increment').click(function() {
    var count = parseInt($('#counter').text());
    $('#counter').text(count + 1);
  });
  
  $('#show-hide').click(function() {
    $('#content').toggle();
  });
});

// Svelte 5 - deklarativní přístup
&lt;script>
  let count = $state(0);
  let visible = $state(true);
  
  function increment() {
    count += 1;
  }
  
  function toggle() {
    visible = !visible;
  }
&lt;/script>

&lt;div id="counter">{count}&lt;/div>
&lt;button id="increment" on:click={increment}>
  Zvýšit
&lt;/button>

&lt;button id="show-hide" on:click={toggle}>
  {visible ? 'Skrýt' : 'Zobrazit'}
&lt;/button>

{#if visible}
  &lt;div id="content">Obsah&lt;/div>
{/if}</code></pre>

<p><strong>Výhody přechodu z jQuery:</strong></p>

<ul>
  <li><b>Přirozený přechod</b> - HTML zůstává HTML, CSS zůstává CSS</li>
  <li><b>Méně DOM manipulace</b> - Svelte se o DOM stará automaticky</li>
  <li><b>Lepší struktura</b> - komponenty místo volných funkcí</li>
  <li><b>Modernější přístup</b> - deklarativní místo imperativního</li>
  <li><b>Lepší výkon</b> - optimalizované renderování</li>
</ul>

<p><strong>Co se mění při přechodu z jQuery:</strong></p>

<ul>
  <li><b>Selektory → Proměnné</b> - místo <code>$('#element')</code> používáte <code>let element</code></li>
  <li><b>Event listeners → on:click</b> - místo <code>.click()</code> používáte <code>on:click</code></li>
  <li><b>DOM manipulace → Reaktivita</b> - místo <code>.text()</code> používáte <code>{variable}</code></li>
  <li><b>Globální funkce → Komponenty</b> - místo volných funkcí máte strukturované komponenty</li>
</ul>

<p>Přechod z jQuery na Svelte je <b>jedním z nejpřirozenějších</b> - zachováváte znalosti HTML/CSS a jen modernizujete JavaScript část.</p>

<h3 id="srovnání-událostí">Srovnání připojování událostí</h3>

<p><strong>Jak se připojují události v různých frameworkech:</strong></p>

<pre><code>// Čistý JavaScript
&lt;button id="btn">Klikni&lt;/button>

&lt;script>
  document.getElementById('btn').addEventListener('click', function() {
    console.log('Kliknuto!');
  });
&lt;/script>

// React
function Component() {
  const handleClick = () => {
    console.log('Kliknuto!');
  };
  
  return (
    &lt;button onClick={handleClick}>
      Klikni
    &lt;/button>
  );
}

// Vue.js
&lt;template>
  &lt;button @click="handleClick">
    Klikni
  &lt;/button>
&lt;/template>

&lt;script>
export default {
  methods: {
    handleClick() {
      console.log('Kliknuto!');
    }
  }
}
&lt;/script>

// Svelte 5
&lt;script>
  function handleClick() {
    console.log('Kliknuto!');
  }
&lt;/script>

&lt;button on:click={handleClick}>
  Klikni
&lt;/button></code></pre>

<p><strong>Porovnání syntaxe:</strong></p>

<table>
  <tr>
    <th>Framework</th>
    <th>Syntax</th>
    <th>Výhody</th>
    <th>Nevýhody</th>
  </tr>
  <tr>
    <td><b>Čistý JS</b></td>
    <td><code>addEventListener('click', handler)</code></td>
    <td>Žádné závislosti, plná kontrola</td>
    <td>Verbózní, nutnost selektorů</td>
  </tr>
  <tr>
    <td><b>React</b></td>
    <td><code>onClick={handler}</code></td>
    <td>Jednoduché, inline</td>
    <td>CamelCase, JSX syntax</td>
  </tr>
  <tr>
    <td><b>Vue</b></td>
    <td><code>@click="handler"</code></td>
    <td>Krátké, intuitivní</td>
    <td>Speciální syntax, template scope</td>
  </tr>
  <tr>
    <td><b>Svelte</b></td>
    <td><code>on:click={handler}</code></td>
    <td>Konzistentní, blíže k HTML</td>
    <td>Dlouhší než Vue</td>
  </tr>
</table>

<p><strong>Pokročilé události:</strong></p>

<pre><code>// Svelte 5 - inline funkce a modifikátory
&lt;button on:click={() => count++}>
  Zvýšit
&lt;/button>

&lt;button on:click|preventDefault={() => submit()}>
  Odeslat
&lt;/button>

&lt;input on:input|debounce={300}={(e) => search(e.target.value)} />

// React - inline funkce
&lt;button onClick={() => setCount(count + 1)}>
  Zvýšit
&lt;/button>

&lt;button onClick={(e) => { e.preventDefault(); submit(); }}>
  Odeslat
&lt;/button>

// Vue - inline funkce
&lt;button @click="count++">
  Zvýšit
&lt;/button>

&lt;button @click.prevent="submit">
  Odeslat
&lt;/button></code></pre>

<p><strong>Modifikátory událostí:</strong></p>

<ul>
  <li><b>Svelte:</b> <code>on:click|preventDefault|stopPropagation</code></li>
  <li><b>Vue:</b> <code>@click.prevent.stop</code></li>
  <li><b>React:</b> Manuální <code>e.preventDefault()</code></li>
</ul>

<p><strong>Závěr:</strong> Svelte události jsou <b>konzistentní a intuitivní</b> - používají standardní HTML názvy událostí s <code>on:</code> prefixem, což je blíže k vanilla JavaScriptu než React nebo Vue.</p>

<p>Všechno je zpravidla <b>jednodušší</b> než v React nebo Vue - méně konceptů k naučení, méně boilerplate kódu, méně "magie" v pozadí.</p>

<pre><code>&lt;script>
  let name = $state("Svět");
  let items = $state(["jablko", "hruška", "banán"]);
&lt;/script>

&lt;h1>Ahoj {name}!&lt;/h1>

&lt;ul>
  {#each items as item}
    &lt;li>{item}&lt;/li>
  {/each}
&lt;/ul>

&lt;style>
  h1 {
    color: blue;
  }
&lt;/style></code></pre>

<h3 id="reaktivita">Automatická reaktivita</h3>

<p>Svelte má <b>automatickou reaktivitu</b>. Stačí přiřadit novou hodnotu proměnné a UI se automaticky aktualizuje.</p>

<h3 id="minimální-boilerplate">Minimální opakující se kód</h3>

<p>Svelte má <b>minimální boilerplate kód</b> (opakující se/šablonový kód). Ve srovnání s React nebo Vue potřebujete mnohem méně kódu pro stejnou funkcionalitu.</p>

<pre><code>// React - hodně boilerplate kódu
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Počet: ${count}`;
  }, [count]);
  
  return (
    &lt;div>
      &lt;p>Počet: {count}&lt;/p>
      &lt;button onClick={() => setCount(count + 1)}>
        Zvýšit
      &lt;/button>
    &lt;/div>
  );
}

// Svelte - minimální boilerplate
&lt;script>
  let count = 0;
  $: document.title = `Počet: ${count}`;
&lt;/script>

&lt;p>Počet: {count}&lt;/p>
&lt;button on:click={() => count++}>
  Zvýšit
&lt;/button></code></pre>

<p><strong>Svelte 5 reaktivní systém:</strong></p>

<p>Svelte 5 zavedl nový reaktivní systém s explicitními runes, což přináší lepší výkon a optimalizace:</p>

<pre><code>// Svelte 5 - explicitní reaktivita
&lt;script>
  let count = $state(0);
  let doubled = $derived(count * 2);
  
  $effect(() => {
    document.title = `Počet: ${count}`;
  });
&lt;/script>

&lt;p>Počet: {count}&lt;/p>
&lt;p>Dvojnásobek: {doubled}&lt;/p>
&lt;button on:click={() => count++}>
  Zvýšit
&lt;/button></code></pre>

<p>Nový systém má <b>výhody</b> - lepší výkon, explicitní reaktivita, lepší optimalizace a TypeScript podpora. I s explicitními runes je Svelte stále framework s nejméně boilerplate kódu.</p>

<h3 id="vestavěné-animace">Vestavěné animace a přechody</h3>

<p>Svelte má <b>vestavěné animace a přechody</b>, které umožňují velmi snadno a rychle vytvořit cokoliv bez knihoven třetích stran.</p>

<pre><code>// Jednoduchá animace - stačí přidat transition
&lt;script>
  import { fade, slide } from 'svelte/transition';
  import { fly } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  
  let visible = $state(false);
  let items = $state(['Jablko', 'Hruška', 'Banán']);
&lt;/script>

&lt;button on:click={() => visible = !visible}>
  {visible ? 'Skrýt' : 'Zobrazit'}
&lt;/button>

{#if visible}
  &lt;div transition:fade={{ duration: 300 }}>
    &lt;h2>Nadpis s fade efektem&lt;/h2>
  &lt;/div>
{/if}

&lt;ul>
  {#each items as item (item)}
    &lt;li transition:slide={{ duration: 200 }}>
      {item}
    &lt;/li>
  {/each}
&lt;/ul>

&lt;div transition:fly={{ y: 50, duration: 500 }}>
  Létající element
&lt;/div>

&lt;div transition:scale={{ duration: 300 }}>
  Měřítkování
&lt;/div></code></pre>

<p><strong>Srovnání s ostatními frameworky:</strong></p>

<ul>
  <li><b>React:</b> Potřebuje knihovny jako Framer Motion, React Spring, nebo CSS-in-JS</li>
  <li><b>Vue:</b> Má transition komponenty, ale méně flexibilní než Svelte</li>
  <li><b>Svelte:</b> Vestavěné animace přímo v frameworku</li>
</ul>

<p><strong>Dostupné přechody:</strong></p>

<ul>
  <li><code>fade</code> - průhlednost</li>
  <li><code>slide</code> - posun</li>
  <li><code>fly</code> - létání</li>
  <li><code>scale</code> - měřítkování</li>
  <li><code>blur</code> - rozmazání</li>
  <li><code>draw</code> - kreslení (pro SVG)</li>
</ul>

<p><strong>Výhody vestavěných animací:</strong></p>

<ul>
  <li><b>Žádné externí závislosti</b> - menší bundle size</li>
  <li><b>Konzistentní API</b> - stejný způsob pro všechny animace</li>
  <li><b>Optimalizované výkonem</b> - přímo v Svelte runtime</li>
  <li><b>Snadné použití</b> - stačí přidat transition: directive</li>
</ul>

<p>Tato vlastnost dělá Svelte <b>ideálním pro moderní UI</b> s plynulými animacemi bez zbytečných závislostí.</p>

<pre><code>&lt;script>
  let count = $state(0);
  let doubled = $derived(count * 2);
  
  function increment() {
    count += 1;
  }
&lt;/script>

&lt;p>Počet: {count}&lt;/p>
&lt;p>Dvojnásobek: {doubled}&lt;/p>
&lt;button on:click={increment}>Zvýšit&lt;/button></code></pre>

<h2 id="srovnání">Srovnání s ostatními frameworky</h2>

<h3 id="vs-react">Svelte vs React</h3>

<p><b>React</b> používá virtuální DOM a JSX syntax. Každá komponenta se re-renderuje při změně props nebo state, což může být neefektivní.</p>

<p><b>Svelte</b> kompiluje kód do optimalizovaného JavaScriptu, který přímo manipuluje s DOMem. Výsledek je menší a rychlejší.</p>

<p><strong>Důležitý rozdíl v kompilaci:</strong> React a Vue kompilují JSX/templates do volání funkcí (např. <code>React.createElement()</code>), ale stále potřebují runtime knihovnu. Svelte kompiluje přímo do DOM manipulace bez runtime závislostí.</p>

<h3 id="vs-vue">Svelte vs Vue.js</h3>

<p><b>Vue.js</b> má podobný přístup jako React s virtuálním DOMem, ale jednodušší syntax. Stále ale potřebuje runtime knihovnu.</p>

<p><b>Svelte</b> jde ještě dál a eliminuje potřebu runtime knihovny úplně.</p>

<h3 id="kompilace">Jak funguje kompilace v různých frameworkech</h3>

<p><strong>React kompilace:</strong></p>

<pre><code>// Původní JSX
&lt;div className="container">
  &lt;h1>Hello {name}&lt;/h1>
&lt;/div>

// Zkompilováno do:
React.createElement("div", { className: "container" },
  React.createElement("h1", null, "Hello ", name)
);</code></pre>

<p><strong>Vue kompilace:</strong></p>

<pre><code>// Původní template
&lt;div class="container">
  &lt;h1>Hello {{ name }}&lt;/h1>
&lt;/div>

// Zkompilováno do render funkce:
function render() {
  return h('div', { class: 'container' }, [
    h('h1', null, 'Hello ' + this.name)
  ]);
}</code></pre>

<p><strong>Svelte kompilace:</strong></p>

<pre><code>// Původní Svelte komponenta
&lt;div class="container">
  &lt;h1>Hello {name}&lt;/h1>
&lt;/div>

// Zkompilováno přímo do DOM manipulace:
function update() {
  text1.data = "Hello " + name;
}</code></pre>

<p>Klíčový rozdíl je v tom, že <b>React a Vue stále potřebují runtime knihovnu</b> pro virtuální DOM, reaktivitu a lifecycle metody. Svelte kompiluje vše do vanilla JavaScriptu bez jakýchkoliv závislostí.</p>

<h3 id="alternativy-bez-vdom">Existují React/Vue alternativy bez virtuálního DOMu?</h3>

<p><strong>Ano, existují frameworky, které se snaží eliminovat virtuální DOM:</strong></p>

<ul>
  <li><b>Solid.js</b> – "React-like" syntax, ale bez virtuálního DOMu, kompiluje do fine-grained reaktivity</li>
  <li><b>Preact</b> – lehčí alternativa k Reactu, ale stále používá virtuální DOM</li>
  <li><b>Alpine.js</b> – lehká alternativa k Vue, přímo manipuluje s DOMem</li>
  <li><b>Lit</b> – webové komponenty od Google, bez virtuálního DOMu</li>
</ul>

<p><strong>Ale pozor:</strong> I když některé frameworky eliminují virtuální DOM, většina z nich stále potřebuje runtime knihovnu pro reaktivitu a lifecycle. Svelte jde nejdál - eliminuje jak virtuální DOM, tak runtime závislosti.</p>

<h3 id="svelte-runtime">Má Svelte vůbec nějaký runtime kód?</h3>

<p><strong>Krátká odpověď:</strong> Ano, Svelte má minimální runtime, ale je to zásadně jiné než u React/Vue.</p>

<p><strong>Dlouhá odpověď:</strong></p>

<ul>
  <li><b>Svelte runtime:</b> ~2-3 KB (minimální pomocné funkce)</li>
  <li><b>React runtime:</b> ~40-50 KB (včetně virtuálního DOMu)</li>
  <li><b>Vue runtime:</b> ~30-40 KB (včetně virtuálního DOMu)</li>
</ul>

<p><strong>Co obsahuje Svelte runtime:</strong></p>

<pre><code>// Svelte runtime obsahuje pouze:
- schedule_update() // plánování aktualizací
- flush() // provedení aktualizací
- create_fragment() // vytvoření DOM fragmentů
- mount() // připojení komponent
- destroy() // zničení komponent</code></pre>

<p><strong>Co NENÍ v Svelte runtime:</strong></p>

<ul>
  <li>Žádný virtuální DOM</li>
  <li>Žádné diffing algoritmy</li>
  <li>Žádné lifecycle metody</li>
  <li>Žádné reaktivní systémy</li>
</ul>

<p><strong>Příklad rozdílu:</strong></p>

<pre><code>// React potřebuje celý runtime pro každou komponentu
React.createElement("div", { className: "container" },
  React.createElement("h1", null, "Hello ", name)
);

// Svelte runtime se používá pouze pro plánování aktualizací
schedule_update(component); // ~2KB runtime
text1.data = "Hello " + name; // přímá DOM manipulace</code></pre>

<p>Proto je Svelte runtime <b>15-20x menší</b> než React/Vue runtime a neobsahuje žádné složité algoritmy.</p>

<p><strong>Příklad Solid.js (nejblíže React syntax):</strong></p>

<pre><code>// Solid.js - React-like syntax, ale bez virtuálního DOMu
import { createSignal } from 'solid-js';

function Counter() {
  const [count, setCount] = createSignal(0);
  
  return (
    &lt;button onClick={() => setCount(count() + 1)}>
      Kliknuto {count()}x
    &lt;/button>
  );
}</code></pre>

<p>Solid.js je často považován za nejbližší alternativu k Reactu bez virtuálního DOMu, ale stále potřebuje runtime knihovnu pro fine-grained reaktivitu.</p>

<h2 id="kdy-použít">Kdy použít Svelte?</h2>

<h3 id="ideální-případy">Ideální případy použití</h3>

<ul>
  <li><b>Malé až střední aplikace</b> – Svelte vyniká u aplikací, kde je důležitý výkon a velikost</li>
  <li><b>Progressive Web Apps</b> – menší bundle size znamená rychlejší načítání</li>
  <li><b>Webové komponenty</b> – Svelte umí kompilovat do webových komponent</li>
  <li><b>Migrace z jQuery</b> – jednoduchá syntax usnadňuje přechod</li>
</ul>

<h3 id="kdy-ne">Kdy Svelte nepoužívat</h3>

<ul>
  <li><b>Velké enterprise aplikace</b> – menší ekosystém a méně knihoven</li>
  <li><b>Projekty s velkým týmem</b> – méně vývojářů zná Svelte</li>
  <li><b>Aplikace vyžadující specifické knihovny</b> – ne všechny React/Vue knihovny mají Svelte ekvivalenty</li>
</ul>

<h3 id="nevýhody-svelte">Nevýhody Svelte</h3>

<p><strong>Menší komunita a ekosystém:</strong></p>

<ul>
  <li><b>Méně vývojářů</b> – React má ~10x větší komunitu než Svelte</li>
  <li><b>Méně pracovních pozic</b> – React je nejrozšířenější, takže je v něm více pracovních příležitostí</li>
  <li><b>Méně hotových řešení</b> – méně knihoven, komponent a boilerplate kódu</li>
  <li><b>Méně dokumentace a tutoriálů</b> – zejména pro pokročilé případy</li>
</ul>

<p><strong>Srovnání popularity (2024):</strong></p>

<ul>
  <li><b>React:</b> ~40% všech frontend projektů, miliony vývojářů</li>
  <li><b>Vue:</b> ~20% projektů, stovky tisíc vývojářů</li>
  <li><b>Svelte:</b> ~5% projektů, desítky tisíc vývojářů</li>
</ul>

<p><strong>Praktické dopady menší komunity:</strong></p>

<ul>
  <li><b>Obtížnější najít vývojáře</b> – méně lidí zná Svelte</li>
  <li><b>Méně knihoven</b> – pro složité UI komponenty, grafy, tabulky</li>
  <li><b>Méně řešení problémů</b> – méně Stack Overflow odpovědí</li>
  <li><b>Pomalejší vývoj ekosystému</b> – méně lidí přispívá</li>
</ul>

<p><strong>Kdy to nevadí:</strong></p>

<ul>
  <li><b>Malé až střední projekty</b> – kde nepotřebujete složité knihovny</li>
  <li><b>Osobní projekty</b> – kde si můžete vybrat technologie</li>
  <li><b>Inovativní týmy</b> – ochotné učit se nové technologie</li>
  <li><b>Projekty s časem na vývoj</b> – kde můžete vytvořit vlastní řešení</li>
</ul>

<p>Tato nevýhoda je <b>největší překážkou</b> pro adopci Svelte ve velkých firmách, ale pro menší projekty a inovativní týmy může být výkon a jednoduchost Svelte důležitější než velikost ekosystému.</p>

<h3 id="populární-aplikace">Populární aplikace a weby používající Svelte</h3>

<p><strong>Poznámka:</strong> Následující seznam obsahuje známé případy použití Svelte, ale ne všechny jsou oficiálně potvrzené. Mnoho firem experimentuje s různými technologiemi bez veřejného oznámení.</p>

<h4 id="potvrzené-případy">Potvrzené případy použití</h4>

<ul>
  <li><b>Svelte.dev</b> – oficiální web Svelte frameworku</li>
  <li><b>Kit.svelte.dev</b> – oficiální web SvelteKit</li>
  <li><b>Vercel</b> – některé webové komponenty (potvrzeno vývojáři)</li>
  <li><b>Storybook</b> – některé komponenty a nástroje</li>
  <li><b>Prettier</b> – webové rozhraní</li>
</ul>

<h4 id="známé-experimenty">Známé experimenty a interní použití</h4>

<ul>
  <li><b>Spotify</b> – experimenty s interními nástroji (podle vývojářských konferencí)</li>
  <li><b>Netflix</b> – experimentální projekty (podle technických blogů)</li>
  <li><b>GitHub</b> – některé interní nástroje (podle vývojářských diskuzí)</li>
  <li><b>Shopify</b> – experimenty s admin rozhraním</li>
  <li><b>Cloudflare</b> – interní nástroje (podle technických prezentací)</li>
</ul>

<h4 id="startupy-a-nové-aplikace">Startupy a nové aplikace</h4>

<ul>
  <li><b>Linear</b> – projektový management (částečně, podle technických článků)</li>
  <li><b>Notion</b> – některé webové komponenty (experimenty)</li>
  <li><b>Figma</b> – experimentální projekty (podle vývojářských diskuzí)</li>
  <li><b>Stripe</b> – některé webové nástroje (experimenty)</li>
</ul>

<p><strong>Důležité poznámky:</strong></p>

<ul>
  <li><b>Částečné použití</b> – většina firem používá Svelte pouze pro části aplikací</li>
  <li><b>Interní nástroje</b> – často se používá pro dashboardy a admin rozhraní</li>
  <li><b>Experimentální projekty</b> – mnoho firem testuje Svelte na menších projektech</li>
  <li><b>Postupná adopce</b> – firmy často začínají s menšími částmi aplikací</li>
  <li><b>Omezené informace</b> – mnoho firem neveřejně experimentuje s různými technologiemi</li>
</ul>

<p><strong>Proč velké firmy zkouší Svelte:</strong></p>

<ul>
  <li><b>Výkon</b> – menší bundle size a rychlejší aplikace</li>
  <li><b>Jednoduchost</b> – méně boilerplate kódu</li>
  <li><b>Vývojářská zkušenost</b> – příjemnější vývoj</li>
  <li><b>Budoucnost</b> – příprava na možné větší adopci</li>
</ul>

<p><strong>Zdroje informací:</strong></p>

<ul>
  <li>Oficiální dokumentace a weby frameworků</li>
  <li>Vývojářské konference a prezentace</li>
  <li>Technické blogy a články</li>
  <li>Vývojářské diskuze na GitHub, Reddit, Stack Overflow</li>
  <li>Job postings a technické požadavky firem</li>
</ul>

<p>I když Svelte není tak rozšířený jako React, existují <b>důkazy o jeho použití</b> v řadě významných firem a jeho popularita postupně roste. To ukazuje, že framework má potenciál pro větší adopci v budoucnu.</p>

<h2 id="ekosystém">Ekosystém a nástroje</h2>

<h3 id="sveltekit">SvelteKit</h3>

<p><b>SvelteKit</b> je oficiální full-stack framework pro Svelte. Poskytuje routing, server-side rendering, API routes a další funkce potřebné pro moderní webové aplikace.</p>

<p><strong>File-based routing:</strong> SvelteKit nabízí <b>file-based routing</b>, kde struktura složek automaticky určuje strukturu URL. Stačí vytvořit soubor a máte novou stránku.</p>

<pre><code>src/routes/
├── +page.svelte          // / (domovská stránka)
├── about/
│   └── +page.svelte      // /about
├── blog/
│   ├── +page.svelte      // /blog
│   └── [slug]/
│       └── +page.svelte  // /blog/nejaky-clanek
└── api/
    └── posts/
        └── +server.ts    // /api/posts</code></pre>

<p><strong>Univerzální flexibilita:</strong> SvelteKit umožňuje vytvořit prakticky cokoliv:</p>

<ul>
  <li><b>Dynamický web</b> - server-side rendering s databází</li>
  <li><b>Statický web</b> - pre-renderované stránky pro GitHub Pages, Netlify</li>
  <li><b>Single Page Application</b> - SPA s client-side routingem</li>
  <li><b>Knihovna</b> - kompilace do npm balíčku</li>
  <li><b>Web komponenty</b> - kompilace do custom elements</li>
  <li><b>Progressive Web App</b> - offline funkcionalita</li>
  <li><b>API server</b> - backend s REST/GraphQL endpoints</li>
</ul>

<pre><code>// Vytvoření nové aplikace
npm create svelte@latest my-app
cd my-app
npm install
npm run dev

// Build pro různé platformy
npm run build        // Statický web
npm run build --ssr  // Server-side rendering
npm run build --lib  // Knihovna
npm run build --wcs  // Web komponenty</code></pre>

<p><strong>Adaptéry pro deployment:</strong> SvelteKit podporuje všechny populární platformy:</p>

<ul>
  <li><b>Vercel</b> - automatický deployment</li>
  <li><b>Netlify</b> - statické stránky</li>
  <li><b>Cloudflare Pages</b> - edge computing</li>
  <li><b>Docker</b> - kontejnerizace</li>
  <li><b>Node.js server</b> - vlastní hosting</li>
</ul>

<p>Tato flexibilita dělá SvelteKit <b>ideálním pro jakýkoliv typ webového projektu</b> - od jednoduchých stránek po komplexní aplikace.</p>

<h3 id="vite">Vite</h3>

<p>SvelteKit používá <b>Vite</b> jako build tool, který poskytuje extrémně rychlý development server a optimalizovaný build proces.</p>

<h3 id="knihovny">Populární knihovny</h3>

<ul>
  <li><b>Svelte Stores</b> – state management</li>
  <li><b>Svelte Actions</b> – DOM manipulace</li>
  <li><b>Svelte Transitions</b> – animace a přechody</li>
  <li><b>Svelte Inertia</b> – pro Laravel aplikace</li>
</ul>

<h2 id="příklad-aplikace">Příklad jednoduché aplikace</h2>

<p>Zde je ukázka jednoduché todo aplikace v Svelte:</p>

<pre><code>&lt;script>
  let todos = $state([]);
  let newTodo = $state("");
  
  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, { id: Date.now(), text: newTodo, done: false }];
      newTodo = "";
    }
  }
  
  function toggleTodo(id) {
    todos = todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
  }
  
  function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
  }
&lt;/script>

&lt;main>
  &lt;h1>Todo aplikace&lt;/h1>
  
  &lt;div class="add-todo">
    &lt;input 
      bind:value={newTodo} 
      placeholder="Přidat úkol..."
      on:keydown={(e) => e.key === 'Enter' && addTodo()}
    />
    &lt;button on:click={addTodo}>Přidat&lt;/button>
  &lt;/div>
  
  &lt;ul>
    {#each todos as todo (todo.id)}
      &lt;li class:done={todo.done}>
        &lt;input 
          type="checkbox" 
          checked={todo.done}
          on:change={() => toggleTodo(todo.id)}
        />
        &lt;span>{todo.text}&lt;/span>
        &lt;button on:click={() => removeTodo(todo.id)}>Smazat&lt;/button>
      &lt;/li>
    {/each}
  &lt;/ul>
&lt;/main>

&lt;style>
  main {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .add-todo {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  input {
    flex: 1;
    padding: 8px;
  }
  
  button {
    padding: 8px 16px;
    background: #007acc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  li.done span {
    text-decoration: line-through;
    color: #666;
  }
&lt;/style></code></pre>

<h2 id="závěr">Závěr</h2>

<p>Svelte představuje <b>moderní přístup</b> k vývoji webových aplikací. Jeho kompilační model, automatická reaktivita a minimalistická syntax ho činí atraktivním pro mnoho projektů.</p>

<p>Hlavní výhody:</p>

<ul>
  <li><b>Menší bundle size</b> – žádná runtime knihovna</li>
  <li><b>Lepší výkon</b> – přímá manipulace s DOMem</li>
  <li><b>Jednodušší syntax</b> – blíže vanilla HTML/JS</li>
  <li><b>Automatická reaktivita</b> – méně boilerplate kódu</li>
</ul>

<p>Pro nové projekty, kde je důležitý výkon a velikost aplikace, je Svelte <b>výbornou volbou</b>. Jeho rostoucí popularita a aktivní komunita zajišťují, že se bude dále vyvíjet a zlepšovat.</p>

<p>Pokud uvažujete o přechodu na moderní JavaScript framework, Svelte rozhodně stojí za zvážení.</p>