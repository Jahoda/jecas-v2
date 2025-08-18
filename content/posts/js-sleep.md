---
title: "Sleep v JavaScriptu"
headline: "Sleep v JavaScriptu"
description: "Jak implementovat sleep/delay funkcionalitu v JavaScriptu pomocí <code>Promise</code> a <code>async</code>/<code>await</code>"
date: "2025-08-20"
last_modification: "2025-08-20"
status: 0
tags: ["javascript", "napady"]
format: "html"
---

<p>JavaScript nemá nativní <code>sleep()</code> funkci jako jiné programovací jazyky. Můžeme ji ale snadno implementovat pomocí <code>Promise</code> a <code>setTimeout()</code>.</p>

<h2 id="zakladni-implementace">Základní implementace</h2>

<pre><code>const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const funkce = async () => {
  // kód před čekáním
  await sleep(5000)
  // nějaký kód, co se spustí po 5000 ms
}</code></pre>

<h2 id="pouziti-v-async-await">Použití v async/await</h2>

<pre><code>const main = async () => {
  console.log('Začátek')
  await sleep(2000)
  console.log('Po 2 sekundách')
  await sleep(1000)
  console.log('Po další 1 sekundě')
}

main()</code></pre>

<h2 id="alternativni-implementace">Alternativní implementace</h2>

<h3 id="sleep-s-reject-moznosti">Sleep s reject možností</h3>

<pre><code>const sleep = (ms, shouldReject = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error('Sleep interrupted'))
      } else {
        resolve()
      }
    }, ms)
  })
}</code></pre>

<h3 id="sleep-s-moznosti-zruseni">Sleep s možností zrušení</h3>

<pre><code>const sleepWithAbort = (ms) => {
  let timeoutId
  const promise = new Promise(resolve => {
    timeoutId = setTimeout(resolve, ms)
  })
  
  promise.abort = () => {
    clearTimeout(timeoutId)
  }
  
  return promise
}

// Použití
const sleepPromise = sleepWithAbort(5000)
setTimeout(() => sleepPromise.abort(), 2000) // zruší sleep po 2s</code></pre>

<h2 id="prakticke-priklady">Praktické příklady</h2>

<h3 id="simulace-api-volani">Simulace API volání</h3>

<pre><code>const simulateApiCall = async (data) => {
  await sleep(1000 + Math.random() * 2000) // náhodné zpoždění 1-3s
  return { success: true, data }
}</code></pre>

<h3 id="animace-s-delay">Animace s delay</h3>

<pre><code>const animateElement = async (element) => {
  element.style.opacity = '0'
  await sleep(500)
  element.style.opacity = '1'
  element.style.transform = 'scale(1.1)'
  await sleep(200)
  element.style.transform = 'scale(1)'
}</code></pre>

<h3 id="sekvencni-zpracovani">Sekvenční zpracování</h3>

<pre><code>const processItems = async (items) => {
  for (const item of items) {
    console.log(`Zpracovávám: ${item}`)
    await sleep(1000) // pauza mezi položkami
  }
}</code></pre>

<p>Často se hodí v případě opakovaného volání cizích API, aby nedošlo k zahlcení a chybě <i>429 Too Many Requests</i>.</p>

<h2 id="pozor-na-blokovani">Pozor na blokování</h2>

<p>Sleep funkce <strong>neblokuje</strong> hlavní vlákno:</p>

<pre><code>const demo = async () => {
  console.log('Start')
  await sleep(3000)
  console.log('Konec')
}

demo()
console.log('Toto se vypíše okamžitě')</code></pre>

<p>Výstup:</p>
<pre><code>Start
Toto se vypíše okamžitě
Konec (po 3 sekundách)</code></pre>

<h2 id="kdy-sleep-nepouzivat">Kdy sleep nepoužívat</h2>

<p>Řešení časté chyby: <strong>místo čekání na čas je lepší počkat na skutečný stav</strong>.</p>

<p>Zvlášť začínající programátory může svádět řešit problémy tak, že si někam přidají <code>sleep</code> jako rychlou opravu chyby.</p>

<pre><code>const checkStatus = async () => {
  await sleep(2000) // předpokládáme, že bude hotovo
  return getStatus()
}</code></pre>

<p>Lepší je počkat na skutečný výsledek:</p>

<pre><code>const checkStatus = async () => {
  const response = await fetch('/api/status')
  return response.json()
}</code></pre>

<p>Nebo použít callbacky místo sleep.</p>

<h2 id="zaver">Závěr</h2>

<p>Sleep funkce je užitečná pro:</p>
<ul>
  <li>Simulaci API volání</li>
  <li>Rate limiting</li>
  <li>Sekvenční zpracování dat</li>
  <li>Debugging a testování</li>
</ul>

<p>Doporučuji používat <code>async</code>/<code>await</code> zápis pro čitelnější kód a lepší zpracovávání chyb.</p>
