---
title: "Na co nezapomenout při přechodu na novější iPhone"
headline: "Checklist věcí, na které se při přechodu na nový iPhone zapomíná"
description: "Na co se nejčastěji zapomíná při migraci na nový iPhone? Bankovní aplikace, messengery, eGovernment služby a další aplikace."
date: "2025-12-03"
last_modification: "2025-12-03"
status: 1
tags: ["apple", "produktivita"]
format: "html"
---

<p>
Přestože se Apple snaží přechod ze staršího iPhone na novější maximálně usnadnit, není přechod úplně bezstarostný. <strong>Největší problém je s platebními kartami, bankovními aplikacemi a různými klíči pro ověřování.</strong>
</p>

<p>
Hodně věcí naštěstí Apple už opravil klíčenkou – hesla k webům a Wi-Fi sítím se přenesou automaticky. Problém zůstává s aplikacemi, které používají vlastní bezpečnostní mechanismy mimo ekosystém Apple.
</p>

<p>
<strong>Zákon schválnosti zajistí, že určitě na něco zapomenete.</strong> Proto si tento checklist vytiskněte nebo si ho mějte otevřený, a zaškrtávejte jednotlivé položky, jak je budete dokončovat.
</p>

<style>
.checklist-progress {
  position: sticky;
  top: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 16px;
  margin: 20px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 12px;
}
.progress-bar {
  background: #e5e7eb;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  flex: 1;
}
.progress-fill {
  background: linear-gradient(90deg, #34c759, #30d158);
  height: 100%;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 11px;
}
.progress-info {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  color: #6b7280;
  font-size: 13px;
}
.reset-button {
  padding: 4px 12px;
  background: #ef4444;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  border: none;
  transition: background 0.2s;
  white-space: nowrap;
}
.reset-button:hover {
  background: #dc2626;
}
.checklist {
  list-style: none;
  padding-left: 0;
}
.checklist-group {
  margin-top: 24px;
}
.checklist-group:first-child {
  margin-top: 0;
}
.checklist-group h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 2px solid #e5e7eb;
}
.checklist li {
  padding: 12px 0;
  padding-left: 40px;
  position: relative;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s;
  user-select: none;
  min-height: 44px;
  line-height: 1.5;
}
.checklist li:hover {
  background-color: #f9fafb;
}
.checklist li:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  background: #fff;
  transition: all 0.2s;
}
.checklist li.checked:before {
  background: #34c759;
  border-color: #34c759;
}
.checklist li.checked:after {
  content: "";
  position: absolute;
  left: 7px;
  top: 50%;
  transform: translateY(-60%) rotate(45deg);
  width: 6px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
}
.checklist li.checked {
  opacity: 0.6;
}
.checklist li.checked strong {
  text-decoration: line-through;
  color: #6b7280;
}
.checklist li strong {
  color: #1d4ed8;
  transition: all 0.2s;
}
</style>

<h2 id="checklist-pred-smazanim-stareho-telefonu">Checklist – co udělat před smazáním starého telefonu</h2>

<p>Tyto věci <strong>vyžadují starý telefon</strong> nebo jsou kritické pro okamžité fungování. Udělejte je, než smažete starý iPhone:</p>

<div class="checklist-progress">
  <div class="progress-bar">
    <div class="progress-fill" id="progressFill" style="width: 0%">0%</div>
  </div>
  <div class="progress-info">
    <strong id="progressText">0/14</strong>
    <span id="completeMessage" style="display: none; color: #34c759; font-weight: bold;">✓ Hotovo</span>
  </div>
  <button class="reset-button" onclick="resetChecklist()">Reset</button>
</div>

<div class="checklist-group">
  <h3 id="messengery">Messengery</h3>
  <ul class="checklist" data-group="messengers">
    <li><strong>Převést zprávy v Signálu</strong> – Vyžaduje obě zařízení zapnutá, proces běží desítky minut</li>
    <li><strong>Převést zprávy ve WhatsApp</strong> – Najít šifrovací klíč a vyplnit znovu jméno profilu, nutné obě zařízení</li>
    <li><strong>Obnovit Telegram</strong> – Převod přes aplikaci v původním zařízení</li>
  </ul>
</div>

<div class="checklist-group">
  <h3 id="banky-a-platby">Banky a platby</h3>
  <ul class="checklist" data-group="banks">
    <li><strong>Aktivovat všechny platební karty</strong> – Apple Pay karty znovu přidat v Wallet (ideálně otestovat platbu ještě doma)</li>
    <li><strong>Revolut</strong> – Nové přihlášení včetně selfie verifikace</li>
    <li><strong>Airbank</strong> – Nové přihlášení včetně selfie verifikace</li>
    <li><strong>Moneta</strong> – Propojení nového zařízení přes QR kód ze starého telefonu</li>
    <li><strong>Komerční banka</strong> – Připojení přes QR kód ze starého, přepis kódu a potvrzení přes SMS</li>
    <li><strong>Raiffeisenbank</strong> – Připojení přes QR kód ze starého, zadání PINu, zapnout ověřování plateb</li>
  </ul>
</div>

<div class="checklist-group">
  <h3 id="egovernment">eGovernment</h3>
  <ul class="checklist" data-group="egov">
    <li><strong>eDoklady</strong> – Nové přihlášení a zadání PINu pro občanský průkaz</li>
    <li><strong>Mobilní klíč eGovernmentu</strong> – Nainstalovat a aktivovat znovu</li>
    <li><strong>MojeID</strong> – Nejsložitější: přihlásit na web, odebrat stávající klíč, přidat nový a ověřit přes datovou schránku</li>
  </ul>
</div>

<div class="checklist-group">
  <h3 id="ostatni">Ostatní</h3>
  <ul class="checklist" data-group="other">
    <li><strong>Převést eSIM</strong> – U některých operátorů potřebujete starý telefon pro převod</li>
    <li><strong>Oura Ring</strong> – Vypnout Bluetooth na starém telefonu, teprve pak spárovat s novým</li>
  </ul>
</div>

<script>
(function() {
  const STORAGE_KEY = 'iphone-migration-checklist';
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const completeMessage = document.getElementById('completeMessage');

  // Get all checklist items from all groups
  const allChecklists = document.querySelectorAll('.checklist');
  const items = [];
  allChecklists.forEach(list => {
    items.push(...Array.from(list.getElementsByTagName('li')));
  });

  const totalItems = items.length;

  // Load saved state from localStorage
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  // Save state to localStorage
  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save checklist state', e);
    }
  }

  // Update progress bar
  function updateProgress() {
    const checkedCount = items.filter(item => item.classList.contains('checked')).length;
    const percentage = Math.round((checkedCount / totalItems) * 100);

    progressFill.style.width = percentage + '%';
    progressFill.textContent = percentage + '%';
    progressText.innerHTML = `<strong>${checkedCount}/${totalItems}</strong>`;

    // Show completion message
    if (checkedCount === totalItems && totalItems > 0) {
      completeMessage.style.display = 'inline';
    } else {
      completeMessage.style.display = 'none';
    }

    // Save state
    const state = {};
    items.forEach((item, index) => {
      if (item.classList.contains('checked')) {
        state[index] = true;
      }
    });
    saveState(state);
  }

  // Initialize items
  items.forEach((item, index) => {
    // Add click handler
    item.addEventListener('click', function() {
      this.classList.toggle('checked');
      updateProgress();
    });

    // Load saved state
    const state = loadState();
    if (state[index]) {
      item.classList.add('checked');
    }
  });

  // Reset function
  window.resetChecklist = function() {
    if (confirm('Opravdu chcete resetovat celý checklist?')) {
      items.forEach(item => item.classList.remove('checked'));
      localStorage.removeItem(STORAGE_KEY);
      updateProgress();
    }
  };

  // Initial progress update
  updateProgress();
})();
</script>

<h2 id="co-je-jeste-potreba-udelat">Co je ještě potřeba udělat</h2>

<p>Tyto věci <strong>nevyžadují starý telefon</strong> a můžete je udělat kdykoliv po migraci. Jen je potřeba počítat s tím, že přechod na nový iPhone bude znamenat ještě další úkony:</p>

<ol>
<li><strong>Nastavit akční tlačítko</strong> (iPhone 15 Pro a novější) – Vyberte si funkci pro Action Button podle vašich preferencí</li>
<li><strong>Nastavit Camera Control</strong> (iPhone 16 a novější) – Nakonfigurujte tlačítko fotoaparátu a jeho gesta</li>
<li><strong>Nastavit fotografické styly</strong> – Vyberte si preferovaný styl zpracování fotek</li>
<li><strong>Odstranit nežádoucí aplikace</strong> – Apple automaticky přidá na plochu Keynote, iMovie, Apple Store, Pages</li>
<li><strong>Přihlásit se do Outlook</strong> – Pracovní email se nepřevede automaticky</li>
<li><strong>Přihlásit se do Slacku</strong> – Nové přihlášení do všech workspaces</li>
<li><strong>Přihlásit se do Google účtů</strong> – Gmail, Drive, Photos vyžadují nové přihlášení</li>
<li><strong>Vývojářské nástroje</strong> (v0, GitHub apod.) – Většina vyžaduje nové přihlášení</li>
<li><strong>SkipPay</strong> – Přihlášení přes email a heslo, automaticky přepíše zařízení pro potvrzování plateb</li>
<li><strong>Krypto peněženky</strong> (např. Muun) – Nové přihlášení, seed fráze, verifikace</li>
<li><strong>Odklikat bezpečnostní hlášky</strong> – Na počítači, tabletu atd. se objeví notifikace "K vašemu účtu bylo přidáno zařízení"</li>
</ol>

<p>Pokud nepoužíváte správce hesel, pravděpodobně nějaký čas zabere resetování zapomenutých hesel.</p>

<h2 id="zaver">Závěr</h2>

<p>
<strong>Nespěchejte s vymazáním starého telefonu</strong> – Minimálně týden ponechte starý iPhone funkční. Možná ho budete potřebovat pro QR kódy z bank, převod messengerů a dalších aplikací, pokud na něco zapomenete.
</p>

<p>
<strong>Vyhraďte si klidné odpoledne</strong> – Celý proces zabere 2-4 hodiny čistého času. Budete potřebovat obě zařízení nabitá, funkční Wi-Fi a často i počítač pro některé webové služby.
</p>

<p>
Většinu věcí Apple převede automaticky, ale <strong>tyto kritické kroky vyžadují starý telefon</strong> – hlavně bankovní aplikace s QR kódy a messengery s end-to-end šifrováním.
</p>

<p>
<strong>Klíčové je nepospíchat se smazáním starého iPhonu.</strong> Týden ho nechte zapnutý a nabitý. Uvidíte, že si na další aplikaci, kterou je potřeba nastavit, vzpomenete vždycky až když ji potřebujete použít.
</p>

<p>
Chybí vám něco v checklistu? Napište mi prosím do komentářů a doplním to tam.
</p>
