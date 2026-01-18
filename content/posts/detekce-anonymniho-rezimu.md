---
title: "Jak detekovat anonymní režim v prohlížeči"
headline: "Jak detekovat anonymní režim v prohlížeči"
description: "Metody a techniky pro zjištění, zda uživatel používá anonymní režim (incognito mode) v prohlížeči."
date: "2025-12-21"
last_modification: "2025-12-21"
status: 1
tags: ["js", "webove-prohlizece", "zabezpeceni"]
format: "html"
---

<p>Anonymní režim (neboli <i lang="en">incognito mode</i> nebo <i lang="en">private browsing</i>) je funkce prohlížečů, která uživatelům nabízí soukromější procházení webu. Ale dá se vůbec detekovat?</p>

<h2 id="proc">Proč detekovat anonymní režim?</h2>

<p>Důvody pro detekci anonymního režimu se liší:</p>

<ul>
  <li><b>Analytika</b> – Pochopení, kolik návštěvníků používá anonymní režim</li>
  <li><b>Omezení obsahu</b> – Některé weby chtějí omezit přístup k obsahu v anonymním režimu (např. kvůli obcházení paywallů)</li>
  <li><b>Bezpečnost</b> – Detekce podezřelého chování</li>
  <li><b>Testování</b> – Ověření, jak se aplikace chová v anonymním režimu</li>
</ul>

<p>Je třeba zmínit, že <b>detekce anonymního režimu je kontroverzní</b> a uživatelé ji často vnímají jako narušení soukromí.</p>

<h2 id="jak-funguje">Jak funguje anonymní režim?</h2>

<p>V anonymním režimu prohlížeč:</p>

<ul>
  <li>Neukládá historii prohlížení</li>
  <li>Maže cookies po zavření okna</li>
  <li>Neukládá data formulářů</li>
  <li>Omezuje přístup k některým API</li>
  <li>Omezuje nebo vypíná úložiště (localStorage, IndexedDB)</li>
</ul>

<p>Právě <b>omezení přístupu k úložišti</b> je klíčové pro detekci.</p>

<h2 id="metody">Metody detekce</h2>

<h3 id="filesystem-api">FileSystem API</h3>

<p>Nejstarší a nejznámější metoda využívala <code>FileSystem API</code>, které v anonymním režimu nebylo dostupné:</p>

<pre><code>function isIncognito() {
  return new Promise((resolve) => {
    if ('webkitRequestFileSystem' in window) {
      window.webkitRequestFileSystem(
        window.TEMPORARY,
        1,
        () => resolve(false), // Běžný režim
        () => resolve(true)   // Anonymní režim
      );
    } else {
      resolve(null); // Nelze detekovat
    }
  });
}

// Použití
isIncognito().then((incognito) => {
  if (incognito === true) {
    console.log('Uživatel je v anonymním režimu');
  } else if (incognito === false) {
    console.log('Uživatel NENÍ v anonymním režimu');
  } else {
    console.log('Nelze detekovat');
  }
});</code></pre>

<p><b>Problém:</b> FileSystem API je zastaralé a moderní prohlížeče ho postupně odstraňují. Navíc funguje jen v Chrome-based prohlížečích.</p>

<h3 id="quota-api">Quota Management API</h3>

<p>Modernější přístup využívá <code>navigator.storage.estimate()</code>:</p>

<pre><code>async function detectIncognitoQuota() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const { quota } = await navigator.storage.estimate();

    // V anonymním režimu je kvóta často menší
    // Chrome: 120MB v normálním režimu vs 0 v incognito
    if (quota < 120000000) {
      return true; // Pravděpodobně incognito
    }
    return false;
  }
  return null; // Nelze detekovat
}

// Použití
detectIncognitoQuota().then((isIncognito) => {
  console.log('Incognito:', isIncognito);
});</code></pre>

<p><b>Výhoda:</b> Funguje ve většině moderních prohlížečů.</p>

<p><b>Problém:</b> Není 100% spolehlivé. Kvóta se může lišit podle různých faktorů (dostupné místo na disku, nastavení prohlížeče).</p>

<h3 id="indexeddb">IndexedDB test</h3>

<p>Firefox v anonymním režimu omezuje IndexedDB:</p>

<pre><code>function detectIncognitoFirefox() {
  return new Promise((resolve) => {
    const db = indexedDB.open('test');

    db.onerror = () => {
      resolve(true); // IndexedDB selhal = pravděpodobně incognito
    };

    db.onsuccess = () => {
      resolve(false); // IndexedDB funguje = normální režim
      // Smazat testovací databázi
      indexedDB.deleteDatabase('test');
    };
  });
}

// Použití
detectIncognitoFirefox().then((isIncognito) => {
  console.log('Firefox incognito:', isIncognito);
});</code></pre>

<p><b>Poznámka:</b> Tato metoda je specifická pro Firefox. V jiných prohlížečích IndexedDB v anonymním režimu funguje.</p>

<h3 id="localstorage">LocalStorage test</h3>

<p>Některé starší prohlížeče zcela blokovaly localStorage v anonymním režimu:</p>

<pre><code>function detectIncognitoStorage() {
  try {
    localStorage.setItem('test', '1');
    localStorage.removeItem('test');
    return false; // localStorage funguje
  } catch (e) {
    return true; // localStorage je blokován
  }
}

console.log('Incognito (localStorage):', detectIncognitoStorage());</code></pre>

<p><b>Problém:</b> Moderní prohlížeče localStorage v anonymním režimu <b>neblokují</b>, pouze ho po zavření okna smažou. Tato metoda již není spolehlivá.</p>

<h2 id="univerzalni">Univerzální řešení</h2>

<p>Žádná metoda není 100% spolehlivá ve všech prohlížečích. Nejlepší přístup je <b>kombinace více metod</b>:</p>

<pre><code>async function detectPrivateMode() {
  // Test 1: Quota API
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const { quota } = await navigator.storage.estimate();
    if (quota && quota < 120000000) {
      return { isPrivate: true, method: 'quota' };
    }
  }

  // Test 2: IndexedDB (Firefox)
  try {
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open('test');
      request.onerror = () => reject();
      request.onsuccess = () => {
        indexedDB.deleteDatabase('test');
        resolve(true);
      };
    });
  } catch (e) {
    return { isPrivate: true, method: 'indexeddb' };
  }

  // Test 3: FileSystem API (zastaralé, ale stále funguje v některých prohlížečích)
  if ('webkitRequestFileSystem' in window) {
    try {
      await new Promise((resolve, reject) => {
        window.webkitRequestFileSystem(
          window.TEMPORARY,
          1,
          resolve,
          reject
        );
      });
    } catch (e) {
      return { isPrivate: true, method: 'filesystem' };
    }
  }

  return { isPrivate: false, method: 'none' };
}

// Použití
detectPrivateMode().then((result) => {
  if (result.isPrivate) {
    console.log(`Anonymní režim detekován metodou: ${result.method}`);
  } else {
    console.log('Normální režim nebo nelze detekovat');
  }
});</code></pre>

<h2 id="live-demo">Živá ukázka</h2>

<div class="live">
  <style>
    .incognito-result {
      padding: 1em;
      border-radius: 8px;
      margin-top: 1em;
      font-weight: bold;
    }
    .incognito-yes {
      background: #ff6b6b;
      color: white;
    }
    .incognito-no {
      background: #51cf66;
      color: white;
    }
    .incognito-unknown {
      background: #ffd43b;
      color: #333;
    }
  </style>

  <button onclick="checkIncognito()">Detekovat anonymní režim</button>
  <div id="incognito-result"></div>

  <script>
    async function checkIncognito() {
      const resultDiv = document.getElementById('incognito-result');
      resultDiv.className = 'incognito-result';
      resultDiv.textContent = 'Detekovávám...';

      let detected = false;
      let method = 'unknown';

      // Test 1: Quota API
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        try {
          const { quota } = await navigator.storage.estimate();
          if (quota && quota < 120000000) {
            detected = true;
            method = 'Quota API';
          }
        } catch (e) {
          // Ignorovat chyby
        }
      }

      // Test 2: IndexedDB
      if (!detected) {
        try {
          await new Promise((resolve, reject) => {
            const request = indexedDB.open('incognito-test');
            request.onerror = () => reject();
            request.onsuccess = () => {
              indexedDB.deleteDatabase('incognito-test');
              resolve();
            };
            setTimeout(() => reject(), 100);
          });
        } catch (e) {
          detected = true;
          method = 'IndexedDB';
        }
      }

      // Test 3: FileSystem API (Chrome)
      if (!detected && 'webkitRequestFileSystem' in window) {
        try {
          await new Promise((resolve, reject) => {
            window.webkitRequestFileSystem(
              window.TEMPORARY,
              1,
              resolve,
              reject
            );
          });
        } catch (e) {
          detected = true;
          method = 'FileSystem API';
        }
      }

      if (detected) {
        resultDiv.className = 'incognito-result incognito-yes';
        resultDiv.textContent = `Anonymní režim detekován (${method})`;
      } else {
        resultDiv.className = 'incognito-result incognito-no';
        resultDiv.textContent = 'Normální režim nebo nelze detekovat';
      }
    }
  </script>
</div>

<p><i>Zkuste otevřít tuto stránku v anonymním režimu a porovnat výsledky.</i></p>

<h2 id="omezeni">Omezení a problémy</h2>

<ul>
  <li><b>Různé prohlížeče, různé výsledky</b> – Každý prohlížeč implementuje anonymní režim jinak</li>
  <li><b>Časté změny</b> – Prohlížeče neustále mění chování, aby ztížily detekci</li>
  <li><b>False positive/negative</b> – Žádná metoda není 100% přesná</li>
  <li><b>Blokování detekce</b> – Některá rozšíření prohlížeče blokují pokusy o detekci</li>
</ul>

<h2 id="etika">Etické úvahy</h2>

<p>Detekce anonymního režimu je eticky problematická:</p>

<ul>
  <li><b>Soukromí uživatelů</b> – Uživatelé používají anonymní režim z důvodu soukromí</li>
  <li><b>Důvěra</b> – Aktivní snaha obejít preference uživatele může poškodit důvěru</li>
  <li><b>Legitimní použití</b> – Ne všichni používají anonymní režim pro obcházení omezení</li>
</ul>

<p>Pokud detekujete anonymní režim, zvažte:</p>

<ul>
  <li>Je to opravdu nutné?</li>
  <li>Nelze problém vyřešit jinak (např. lepší autentizací)?</li>
  <li>Jak bude uživatel reagovat na blokování?</li>
</ul>

<h2 id="alternativy">Alternativní přístupy</h2>

<p>Místo detekce anonymního režimu zvažte:</p>

<h3 id="fingerprinting">Browser fingerprinting</h3>

<p>Identifikace uživatele na základě unikátní kombinace vlastností prohlížeče (rozlišení, fonty, canvas, WebGL atd.):</p>

<pre><code>// Velmi zjednodušený příklad
function getBrowserFingerprint() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('Browser fingerprint', 2, 2);

  return canvas.toDataURL();
}

console.log('Fingerprint:', getBrowserFingerprint());</code></pre>

<p><b>Poznámka:</b> Fingerprinting je ještě kontroverzněj než detekce anonymního režimu a některé prohlížeče ho aktivně blokují.</p>

<h3 id="autentizace">Robustnější autentizace</h3>

<p>Místo detekce anonymního režimu použijte:</p>

<ul>
  <li>Přihlášení přes účet</li>
  <li>Dvou-faktorovou autentizaci</li>
  <li>Časově omezené tokeny</li>
</ul>

<h3 id="analyza-chovani">Analýza chování</h3>

<p>Sledujte podezřelé vzorce chování místo technické detekce:</p>

<ul>
  <li>Neobvykle rychlé akce</li>
  <li>Opakované vytváření účtů</li>
  <li>Automatizované requesty</li>
</ul>

<h2 id="budoucnost">Budoucnost detekce</h2>

<p>Prohlížeče se neustále vyvíjejí a <b>detekce anonymního režimu bude stále obtížnější</b>:</p>

<ul>
  <li>Chrome plánuje sjednotit chování normálního a anonymního režimu</li>
  <li>Firefox již IndexedDB v anonymním režimu umožňuje</li>
  <li>Safari má nejpřísnější omezení a nejméně rozdílů mezi režimy</li>
</ul>

<p>Očekává se, že v budoucnu bude detekce <b>prakticky nemožná</b>.</p>

<h2 id="knihovny">Knihovny pro detekci</h2>

<p>Existují hotové knihovny, které detekci zjednodušují:</p>

<h3>detect-incognito</h3>

<pre><code>// npm install detect-incognito
import { detectIncognito } from 'detect-incognito';

detectIncognito().then((result) => {
  console.log(result.browserName);
  console.log(result.isPrivate);
});</code></pre>

<p>Knihovna: <a href="https://github.com/Joe12387/detectIncognito">github.com/Joe12387/detectIncognito</a></p>

<h2 id="zaver">Závěr</h2>

<ul>
  <li>Detekce anonymního režimu <b>je možná</b>, ale není 100% spolehlivá</li>
  <li>Různé prohlížeče vyžadují <b>různé metody</b> detekce</li>
  <li>Nejlepší je použít <b>kombinaci více metod</b></li>
  <li>Detekce je <b>eticky problematická</b> a měla by se používat s rozvahou</li>
  <li>Prohlížeče aktivně <b>ztěžují detekci</b> a v budoucnu bude prakticky nemožná</li>
  <li>Zvažte <b>alternativní řešení</b> místo detekce (lepší autentizace, analýza chování)</li>
</ul>

<p>Pokud detekci opravdu potřebujete, používejte ji zodpovědně a transparentně. Respektujte přání uživatelů o soukromí.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Storage_API">MDN: Storage API</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">MDN: IndexedDB API</a></li>
  <li><a href="https://blog.mozilla.org/security/2021/01/26/supercookie-protections/">Mozilla: Supercookie Protections</a></li>
</ul>
