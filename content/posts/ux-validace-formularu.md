---
title: 'Jak neotravovat uživatele validací formulářů'
headline: 'Jak neotravovat uživatele validací formulářů'
description: 'Kdy zobrazovat chyby, kdy ne, a jak pomoci uživatelům místo jejich trestání.'
date: '2025-10-21'
last_modification: '2025-10-21'
status: 1
tags: ['ux', 'formulare', 'js']
---

<p>Validace formulářů patří k nejčastějším UX problémům na webu. Špatně implementovaná validace dokáže z jednoduchého úkolu udělat frustrující zážitek.</p>

<h2 id="zakladni-principy">Základní principy dobré validace</h2>

<p><strong>1. Nepřerušujte uživatele během psaní</strong> – zobrazujte chyby, až když má uživatel záměr pokračovat. Pokud mu během psaní „123“ zobrazíte chybu „Musí obsahovat 8 číslic“, pouze ho rozptýlíte.</p>

<p><strong>2. Inteligentní načasování</strong> – analysujte stav vstupu a reagujte vhodně:</p>

<ul>
<li><strong>Prázdné pole</strong> → bez validace</li>
<li><strong>Neplatné znaky</strong> → okamžitá chyba</li>
<li><strong>Neúplný vstup</strong> → čekejte</li>
<li><strong>Kompletní vstup</strong> → okamžitá validace</li>
<li><strong>Opuštění pole</strong> → validujte</li>
</ul>


<p><strong>3. Tolerance k chybám</strong> – je dobré se zamyslet nad tím, jestli by nešlo obsah od uživatele normalisovat do potřebné formy, než mu vynadat.</p>

<p>Typickým příkladem může být telefonní číslo nebo PSČ, kam někteří uživatelé mohou zadávat mezery. Je zbytečné je nutit do nějakého specifického formátu, když jde mezery jednoduše z obsahu políčka odstranit.</p>

<div class="live">
<style>
.validation-demo {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
}

.validation-demo label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

.validation-demo input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
    margin-bottom: 10px;
}

.validation-demo input.invalid {
    border-color: #f44336;
    background-color: #fff5f5;
}

.validation-demo input.valid {
    border-color: #4caf50;
    background-color: #f5fff5;
}

.demo-message {
    font-size: 14px;
    margin-top: 5px;
    padding: 8px;
    border-radius: 4px;
}

.demo-message.error {
    color: #c62828;
    background-color: #ffebee;
    border: 1px solid #f44336;
}

.demo-message.success {
    color: #2e7d32;
    background-color: #e8f5e8;
    border: 1px solid #4caf50;
}

.demo-message.neutral {
    color: #666;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
}
</style>

<div class="validation-demo">
    <label for="demo-input">Zadejte 8-místné číslo:</label>
    <input type="text" id="demo-input" placeholder="Zkuste: 1234 5678, text, nebo 12345678">
    <div id="demo-message" class="demo-message neutral">Začněte psát a sledujte, kdy se zobrazí validace</div>
</div>

<script>
function normalizeNumber(value) {
    return value.replace(/\s+/g, '');
}

function validateDemo(value) {
    if (!value) return { valid: null, message: 'Začněte psát a sledujte, kdy se zobrazí validace' };
    
    const normalized = normalizeNumber(value);
    
    if (!/^\d*$/.test(normalized)) {
        return { valid: false, message: '❌ Okamžitá chyba - obsahuje neplatné znaky' };
    }
    
    if (normalized.length < 8) {
        return { valid: null, message: '⏳ Čekám, můžete ještě dopsat...' };
    }
    
    if (normalized.length === 8) {
        const message = value !== normalized ? 
            '✅ Perfektní! Automaticky jsem odstranil mezery' : 
            '✅ Perfektní! Kompletní a platné číslo';
        return { valid: true, message: message };
    }
    
    return { valid: false, message: '❌ Příliš dlouhé - maximum 8 číslic' };
}

function shouldValidateDemo(value) {
    if (!value) return false;
    const normalized = normalizeNumber(value);
    if (!/^\d*$/.test(normalized)) return 'immediate';
    if (normalized.length === 8) return 'immediate';
    if (normalized.length > 8) return 'immediate';
    return false;
}

function updateDemoUI(value) {
    const input = document.getElementById('demo-input');
    const message = document.getElementById('demo-message');
    const result = validateDemo(value);
    
    message.textContent = result.message;
    
    if (result.valid === true) {
        input.className = 'valid';
        message.className = 'demo-message success';
    } else if (result.valid === false) {
        input.className = 'invalid';
        message.className = 'demo-message error';
    } else {
        input.className = '';
        message.className = 'demo-message neutral';
    }
}

document.getElementById('demo-input').addEventListener('input', function(e) {
    updateDemoUI(e.target.value);
});

document.getElementById('demo-input').addEventListener('blur', function(e) {
    updateDemoUI(e.target.value);
});

updateDemoUI('');
</script>
</div>

<h2 id="antipatterns">Běžné chyby a jak se jim vyhnout</h2>

<p><strong>Nedeaktivujte tlačítka</strong> – místo toho, abyste zakázali tlačítko, když je vstup nevalidní, nechte ho aktivní a zobrazte chybu při kliknutí. Zakázané tlačítko nevysvětluje, co je špatně a nutí uživatele hádat. Aktivní tlačítko dává jasnou zpětnou vazbu a umožňuje uživateli vidět všechny chyby najednou, místo jejich postupného odhalování.</p>

<p><strong>Pozor na tvrdé HTML limity</strong> – <code>maxlength</code> dokáže dost komplikovat třeba vložení ze schránky, kdy se ke kopírovanému textu něco připlete. Místo toho, aby mohl člověk nežádoucí věci odmazat, se mu rovnou oříznou. Použijte vlastní inteligentní validaci.</p>

<div class="live">
<input maxlength="3">
</div>


<h2 id="komunikace-s-uzivatelem">Jak komunikovat s uživatelem</h2>

<p>Neříkejte, co je špatně. Řekněte, co má uživatel udělat dál.</p>

<h3 id="predchazejte-chybam">Předcházejte chybám</h3>

<ul>
<li>Automaticky odstraňujte mezery a nevhodné znaky</li>
<li>Normalisujte formáty (čísla účtů, telefonní čísla, PSČ)</li>
<li>Navrhujte správný formát předem (placeholder, příklad)</li>
</ul>

<h3 id="jak-psat-hlasky">Jak psát hlášky</h3>

<ul>
<li>Nabídněte návod místo konstatování – „Zkontrolujte překlepy“ místo „Chybný e-mail'</li>
<li>Preferujte positivní, uctivý tón – „Zadejte prosím e‑mail“</li>
<li>Buďte konkrétní – „Alespoň 8 znaků, jedno číslo“</li>
<li>Uveďte příklad – „např. jan@email.cz“</li>
<li>Nabídněte pomoc – odkaz na nápovědu nebo podporu</li>
<li>Nebuďte příliš techničtí – chybové hlášky často píší programátoři a pro běžné uživatele může být problém takové vyjadřování pochopit.</li>
</ul>

<p><strong>Příklady:</strong></p>

<table>
<tr>
<td><strong>Špatně</strong></td>
<td><strong>Dobře</strong></td>
</tr>
<tr>
<td>Neplatný formát</td>
<td>E‑mail zadejte jako: jan@email.cz</td>
</tr>
<tr>
<td>Pole je povinné</td>
<td>Vyplňte prosím své jméno</td>
</tr>
<tr>
<td>Chybné heslo</td>
<td>Heslo musí mít alespoň 8 znaků a jedno číslo</td>
</tr>
<tr>
<td>Neplatné číslo</td>
<td>Zadejte číslo mezi 1 a 10</td>
</tr>
</table>

<h3 id="adaptivni-hlasky">Adaptivní/progresivní hlášky</h3>

<p>Pokročilá technika, kdy se nápověda stupňuje podle situace – při opakovaných pokusech přidávejte konkrétnější rady a příklady. Začněte stručně, detail přidávejte až podle potřeby. Při hodně neúspěšných pokusech třeba i přidat odkaz na nápovědu nebo kontakt na podporu.</p>

<ul>
<li><strong>Kdy použít:</strong> složitá pravidla (hesla, IČO), opakované selhání, potřeba vysvětlení</li>
<li><strong>Kdy nepoužít:</strong> triviální pole (jméno), jednoduché požadavky</li>
</ul>


<h2 id="zaver">Závěr</h2>

<p>Cílem validace není prokázat chybu, ale pomoci uživateli úspěšně dokončit úkol. Dobré hlášky jsou průvodcem, ne kritikem.</p>
