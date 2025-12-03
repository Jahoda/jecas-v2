---
title: "Na co nezapomenout při přechodu na novější iPhone"
headline: "Checklist věcí, na které se při přechodu na nový iPhone zapomíná"
description: "Na co se nejčastěji zapomíná při migraci na nový iPhone? Bankovní aplikace, messengery, eGovernment služby a další aplikace, které nepřenesl automatický převod dat."
date: "2025-12-03"
last_modification: "2025-12-03"
status: 1
tags: ["apple", "ios", "navody"]
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
  padding: 12px 16px;
  margin: 20px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 100;
}
.progress-bar {
  background: #e5e7eb;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 6px;
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
.progress-text {
  text-align: center;
  color: #6b7280;
  font-size: 13px;
}
.reset-button {
  display: inline-block;
  margin-left: 10px;
  padding: 4px 12px;
  background: #ef4444;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  border: none;
  transition: background 0.2s;
}
.reset-button:hover {
  background: #dc2626;
}
.checklist {
  list-style: none;
  padding-left: 0;
}
.checklist li {
  padding: 12px 0;
  padding-left: 40px;
  position: relative;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  transition: background-color 0.2s;
  user-select: none;
  display: flex;
  align-items: center;
  min-height: 44px;
}
.checklist li:hover {
  background-color: #f9fafb;
}
.checklist li:before {
  content: "☐";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #6b7280;
  transition: all 0.2s;
  line-height: 1;
}
.checklist li.checked:before {
  content: "☑";
  color: #34c759;
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

<h2>Checklist – co udělat před smazáním starého telefonu</h2>

<p><em>Tyto věci <strong>vyžadují starý telefon</strong> nebo jsou kritické pro okamžité fungování. Udělejte je, než smažete starý iPhone:</em></p>

<div class="checklist-progress">
  <div class="progress-bar">
    <div class="progress-fill" id="progressFill" style="width: 0%">0%</div>
  </div>
  <div class="progress-text">
    <strong id="progressText">0 z 14</strong> splněno
    <span id="completeMessage" style="display: none; color: #34c759; font-weight: bold;"> 🎉</span>
    <button class="reset-button" onclick="resetChecklist()">Reset</button>
  </div>
</div>

<ul class="checklist" id="iPhoneChecklist">
<li><strong>Převést eSIM</strong> – U některých operátorů potřebujete starý telefon pro převod</li>

<li><strong>Aktivovat všechny platební karty</strong> – Apple Pay karty je nutné znovu přidat. Otestujte platbu ještě doma!</li>

<li><strong>Převést zprávy v Signálu</strong> – <em>Vyžaduje obě zařízení zapnutá!</em> Proces běží desítky minut</li>

<li><strong>Převést zprávy ve WhatsApp</strong> – Šifrovací klíč a jméno profilu, nutné obě zařízení</li>

<li><strong>Obnovit Telegram</strong> – Převod přes aplikaci v původním zařízení</li>

<li><strong>Revolut</strong> – Nové přihlášení <em>včetně selfie verifikace</em></li>

<li><strong>Airbank</strong> – Nové přihlášení <em>včetně selfie verifikace</em></li>

<li><strong>Moneta</strong> – <em>QR kód ze starého telefonu!</em> Propojení přes staré zařízení</li>

<li><strong>Komerční banka</strong> – <em>QR kód ze starého telefonu,</em> přepis kódu a SMS</li>

<li><strong>Raiffeisenbank</strong> – <em>QR kód ze starého telefonu,</em> PIN, zapnout ověřování</li>

<li><strong>Oura Ring</strong> – <em>Vypnout Bluetooth na starém!</em> Teprve pak spárovat s novým</li>

<li><strong>eDoklady</strong> – Nové přihlášení a zadání PINu pro občanský průkaz</li>

<li><strong>Mobilní klíč eGovernmentu</strong> – Nainstalovat a aktivovat znovu</li>

<li><strong>MojeID</strong> – <em>Nejsložitější!</em> Web, odebrat klíč, přidat nový, ověřit přes datovou schránku</li>
</ul>

<script>
(function() {
  const STORAGE_KEY = 'iphone-migration-checklist';
  const checklist = document.getElementById('iPhoneChecklist');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const completeMessage = document.getElementById('completeMessage');

  if (!checklist) return;

  const items = Array.from(checklist.getElementsByTagName('li'));
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
    progressText.innerHTML = `<strong>${checkedCount} z ${totalItems}</strong> splněno`;

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

<h2>💡 Důležité tipy</h2>

<p>
<strong>Nespěchejte s vymazáním starého telefonu</strong> – <em>Minimálně týden ponechte starý iPhone funkční.</em> Budete ho potřebovat pro QR kódy z bank, převod messengerů a určitě si vzpomenete na další aplikaci.
</p>

<p>
<strong>Vyhraďte si klidné odpoledne</strong> – Celý proces zabere 2-4 hodiny čistého času. Budete potřebovat obě zařízení nabitá, funkční Wi-Fi a často i počítač pro některé webové služby.
</p>

<p>
<strong>Progress si ukládáme automaticky</strong> – Checklist si pamatuje, co už máte hotové. Můžete článek kdykoliv zavřít a vrátit se k němu později.
</p>

<h2>Závěr</h2>

<p>
Většinu věcí Apple převede automaticky, ale <strong>tyto kritické kroky vyžadují starý telefon</strong> – hlavně bankovní aplikace s QR kódy a messengery s end-to-end šifrováním.
</p>

<p>
<strong>Klíčové je nepospíchat se smazáním starého iPhonu.</strong> Týden ho nechte zapnutý a nabitý. Uvidíte, že si na další aplikaci, kterou je potřeba nastavit, vzpomenete vždycky až když ji potřebujete použít.
</p>

<p>
Tento checklist si <strong>uložte do záložek</strong> – při dalším upgradu za pár let budete rádi, že ho máte. Progress se ukládá automaticky, takže se k němu můžete kdykoliv vrátit.
</p>
