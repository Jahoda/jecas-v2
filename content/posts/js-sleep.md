---
title: "Sleep v JavaScriptu"
headline: "Sleep v JavaScriptu"
description: "Jak implementovat sleep/delay funkcionalitu v JavaScriptu pomocí <code>Promise</code> a <code>async</code>/<code>await</code>"
date: "2025-08-19"
last_modification: "2025-08-19"
status: 1
tags: ["js", "napady"]
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

<p>Užitečné pro simulaci chybových stavů nebo testování error handlingu:</p>

<pre><code>const testErrorHandling = async () => {
  try {
    await sleep(2000, true) // simuluje chybu po 2 sekundách
    console.log('Toto se nevypíše')
  } catch (error) {
    console.log('Zachycena chyba:', error.message)
  }
}

// Použití pro testování timeoutů
const simulateTimeout = async () => {
  const timeoutPromise = sleep(5000, true)
  const dataPromise = fetch('/api/data')
  
  try {
    const result = await Promise.race([dataPromise, timeoutPromise])
    return result
  } catch (error) {
    console.log('Timeout nebo chyba:', error.message)
  }
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


<h3 id="sekvencni-zpracovani">Sekvenční zpracování</h3>

<pre><code>const processItems = async (items) => {
  for (const item of items) {
    console.log(`Zpracovávám: ${item}`)
    await sleep(1000) // pauza mezi položkami
  }
}</code></pre>

<p>Často se hodí v případě opakovaného volání cizích API, aby nedošlo k zahlcení a chybě <i>429 Too Many Requests</i>.</p>



<div class="interactive-demo">
      <button id="rate-limit-demo" class="demo-btn">Spustit simulaci</button>
      <div id="rate-limit-output" class="output"></div>


<style>
  .interactive-demo {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
  }
  
  .output {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 15px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    height: 150px;
    overflow-y: auto;
    margin-top: 15px;
    white-space: pre-wrap;
    line-height: 1.4;
  }
</style>

<script>
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  function logToOutput(outputId, message) {
    const output = document.getElementById(outputId);
    if (output) {
      const time = new Date().toLocaleTimeString();
      output.textContent += `[${time}] ${message}\n`;
      output.scrollTop = output.scrollHeight;
    }
  }
  
  function clearOutput(outputId) {
    const output = document.getElementById(outputId);
    if (output) {
      output.textContent = '';
    }
  }
  
  // Inicializace při načtení stránky
  document.addEventListener('DOMContentLoaded', () => {
    const rateLimitBtn = document.getElementById('rate-limit-demo');
    
    if (rateLimitBtn) {
      rateLimitBtn.addEventListener('click', async () => {
        clearOutput('rate-limit-output');
        
        const simulateApiCall = async (endpoint) => {
          logToOutput('rate-limit-output', `🌐 Volám ${endpoint}...`);
          await sleep(500 + Math.random() * 1000);
          logToOutput('rate-limit-output', `✅ ${endpoint} dokončeno`);
        };
        
        logToOutput('rate-limit-output', '🚀 Spouštím simulaci API volání s rate limiting...');
        
        await simulateApiCall('/api/users');
        logToOutput('rate-limit-output', '⏳ Čekám 1s před dalším voláním (rate limiting)...');
        await sleep(1000);
        
        await simulateApiCall('/api/posts');
        logToOutput('rate-limit-output', '⏳ Čekám 1s před dalším voláním (rate limiting)...');
        await sleep(1000);
        
        await simulateApiCall('/api/comments');
        logToOutput('rate-limit-output', '🎉 Všechna API volání dokončena!');
        logToOutput('rate-limit-output', '💡 Rate limiting pomohl vyhnout se chybě 429 Too Many Requests');
      });
    }
  });
</script>
</div>

<p>Při lokalizaci jedné aplikace po jednotlivých částech přes OpenAI API používám sleep pro přidávání prodlevy mezi requesty, když dojde k chybě 429. Tím se vyhnu zahlcení API a zajistím plynulé zpracování celé aplikace.</p>

<h3 id="dynamicky-sleep">Dynamický sleep</h3>

<p>S hodnotou prodlevy si jde pohrát tak, aby se dynamicky měnila podle odpovědi ze serveru, tj. se prodlužovala při neúspěchu.</p>

<pre><code>const translateWithDynamicRetry = async (text, targetLanguage) => {
  let retryCount = 0
  let baseDelay = 1000
  
  while (retryCount < 5) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: `Přelož tento text do ${targetLanguage}: ${text}`
          }]
        })
      })
      
      if (response.status === 429) {
        const delay = baseDelay * Math.pow(2, retryCount)
        
        console.log(`Rate limit dosažen, čekám ${delay}ms (pokus ${retryCount + 1})`)
        await sleep(delay)
        retryCount++
        continue
      }
      
      return await response.json()
    } catch (error) {
      console.error('Chyba při překladu:', error)
      retryCount++
      await sleep(baseDelay * Math.pow(2, retryCount))
    }
  }
  
  throw new Error('Překročen maximální počet pokusů')
}</code></pre>

<p>Některé API vrací <code>Retry-After</code> hlavičku s doporučeným časem čekání. Pokud je k disposici, může se použít.</p>


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

<p>Doporučuji používat <code>async</code>/<code>await</code> zápis pro čitelnější kód a lepší zpracování chyb.</p>
