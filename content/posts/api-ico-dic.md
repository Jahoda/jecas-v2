---
title: 'Jak z IČO nebo DIČ získat data pro předvyplnění formuláře'
headline: 'Automatické načítání firemních údajů z registru ARES'
description: 'Návod na získání dat o firmě z IČO nebo DIČ pomocí veřejné API a jejich použití pro předvyplnění webových formulářů.'
date: '2025-09-17'
last_modification: '2025-09-17'
status: 1
tags: ['formulare', 'ux', 'js']
---


<p>V mnoha webových aplikacích, jako jsou e-shopy, fakturační systémy nebo registrační formuláře, je užitečné umožnit uživatelům předvyplnit firemní údaje na základě IČO (Identifikační číslo osoby) nebo DIČ (Daňové identifikační číslo). V České republice lze tyto údaje získat z veřejného registru ARES (Administrativní registr ekonomických subjektů), který spravuje Ministerstvo financí.</p>

<p>Tento článek vysvětluje, jak data z ARES načíst a použít je pro předvyplnění formulářů. Ukážeme si příklad v JavaScriptu.</p>

<h2 id="co-je-ares">Co je ARES?</h2>

<p>ARES je veřejný registr, který obsahuje informace o firmách, podnikatelích a dalších subjektech v ČR. Mezi dostupné údaje patří:</p>

<ul>
<li>Název firmy</li>
<li>Adresa (ulice, město, PSČ)</li>
<li>Právní forma</li>
<li>Datum vzniku</li>
<li>A další</li>
</ul>

<h2 id="jak-nacist-data-z-ares">Jak načíst data z ARES</h2>

<p>Kromě jiných možností existuje Swagger dokumentace:</p>

<div class="external-content">
<ul>
<li><a href="https://ares.gov.cz/swagger-ui/#/" target="_blank" rel="noopener noreferrer">ARES API Swagger</a> – Dokumentace ARES API pro pokročilé použití.</li>
</ul>
</div>

<p>ARES poskytuje několik endpointů. Nejběžnější je vyhledávání podle IČO pomocí URL:</p>

<pre><code>https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/<b>XXX</b></code></pre>

<p>Kde <code>XXX</code> je IČO. Odpověď je v <a href="/json">JSON</a> formátu.</p>


<h3>Živá ukázka</h3>

<p>Zadejte platné IČO (například 27604977 pro Google Czech Republic) a klikněte na tlačítko:</p>

<div class="live">
<style>
.ares-demo {
    margin: 20px 0;
}

.ares-demo label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

.ares-demo input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 150px;
    margin-right: 10px;
}

.ares-demo input.invalid {
    border-color: #f44336;
    background-color: #fff5f5;
}

.ares-demo input.valid {
    border-color: #4caf50;
    background-color: #f5fff5;
}

.validation-message {
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 10px;
}

.validation-message.error {
    color: #f44336;
}

.validation-message.success {
    color: #4caf50;
}

.ares-demo button {
    padding: 8px 16px;
    background-color: #007cba;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.ares-demo button:hover {
    background-color: #005a8b;
}

.ares-result {
    margin-top: 20px;
    padding: 15px;
    background-color: #e8f5e8;
    border: 1px solid #4caf50;
    border-radius: 4px;
    display: none;
}

.ares-error {
    margin-top: 20px;
    padding: 15px;
    background-color: #ffebee;
    border: 1px solid #f44336;
    border-radius: 4px;
    color: #c62828;
    display: none;
}

.ares-result h4 {
    margin-top: 0;
    color: #2e7d32;
}

.ares-result p {
    margin: 8px 0;
}
</style>

<div class="ares-demo">
    <label for="ico-input">IČO:</label>
    <input type="text" id="ico-input">
    <button id="load-button" onclick="loadCompanyData()">Načíst data z ARES</button>
    <div id="validation-message" class="validation-message"></div>
    
    <div id="result" class="ares-result">
        <h4>Výsledek:</h4>
        <div id="company-data"></div>
    </div>
    
    <div id="error" class="ares-error"></div>
</div>

<script>
function validateICO(ico) {
    if (!ico) {
        return { valid: false, message: 'Zadejte prosím IČO' };
    }
    
    if (!/^\d{8}$/.test(ico)) {
        return { valid: false, message: 'IČO musí obsahovat přesně 8 číslic' };
    }
    
    const digits = ico.split('').map(Number);
    const weights = [8, 7, 6, 5, 4, 3, 2];
    
    let sum = 0;
    for (let i = 0; i < 7; i++) {
        sum += digits[i] * weights[i];
    }
    
    const remainder = sum % 11;
    let checkDigit;
    
    if (remainder < 2) {
        checkDigit = remainder;
    } else {
        checkDigit = 11 - remainder;
    }
    
    if (digits[7] !== checkDigit) {
        return { valid: false, message: 'IČO není platné (zkontrolujte překlepy)' };
    }
    
    return { valid: true, message: '' };
}

async function loadCompanyData() {
    const ico = normalizeICO(document.getElementById('ico-input').value);
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const dataDiv = document.getElementById('company-data');
    
    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    
    const validation = validateICO(ico);
    if (!validation.valid) {
        showError(validation.message);
        return;
    }
    
    try {
        const response = await fetch(`https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        console.log('ARES API response:', data);
        
        if (!data || !data.ico) {
            console.log('No company data found in response');
            showError('Firma s tímto IČO nebyla nalezena');
            return;
        }
        
        const subjekt = data;
        console.log('Subjekt data:', subjekt);
        
        const adresa = subjekt.sidlo;
        console.log('Adresa data:', adresa);
        
        let html = `
            <p><strong>Název:</strong> ${subjekt.obchodniJmeno || 'N/A'}</p>
            <p><strong>IČO:</strong> ${subjekt.ico || ico}</p>
        `;
        
        if (subjekt.dic) {
            html += `<p><strong>DIČ:</strong> ${subjekt.dic}</p>`;
        }
        
        if (adresa) {
            html += `<p><strong>Adresa:</strong> `;
            if (adresa.nazevUlice) html += `${adresa.nazevUlice} `;
            if (adresa.cisloDomovni) html += `${adresa.cisloDomovni}, `;
            if (adresa.nazevObce) html += `${adresa.nazevObce} `;
            if (adresa.psc) html += `${adresa.psc}`;
            html += `</p>`;
        }
        
        if (subjekt.pravniForma) {
            const pravniFormaText = typeof subjekt.pravniForma === 'object' && subjekt.pravniForma.nazev 
                ? subjekt.pravniForma.nazev 
                : `Kód: ${subjekt.pravniForma}`;
            html += `<p><strong>Právní forma:</strong> ${pravniFormaText}</p>`;
        }
        
        dataDiv.innerHTML = html;
        resultDiv.style.display = 'block';
        
    } catch (error) {
        console.error('Error loading company data:', error);
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showError('Chyba při připojení k ARES API. Zkuste to později nebo zkontrolujte připojení k internetu.');
        } else {
            showError('Chyba při načítání dat: ' + error.message);
        }
    }
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function updateValidationUI(ico) {
    const input = document.getElementById('ico-input');
    const message = document.getElementById('validation-message');
    
    if (!ico) {
        input.className = '';
        message.textContent = '';
        message.className = 'validation-message';
        return;
    }
    
    const validation = validateICO(ico);
    
    if (validation.valid) {
        input.className = 'valid';
        message.textContent = 'IČO je platné ✓';
        message.className = 'validation-message success';
    } else {
        input.className = 'invalid';
        message.textContent = validation.message;
        message.className = 'validation-message error';
    }
}

function normalizeICO(value) {
    return value.trim();
}

function shouldValidateInput(value) {
    const normalized = normalizeICO(value);
    if (!normalized) return false;
    
    if (!/^\d*$/.test(normalized)) {
        return 'immediate';
    }
    
    if (normalized.length === 8) {
        return 'immediate';
    }
    
    return false;
}

document.getElementById('ico-input').addEventListener('input', function(e) {
    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'none';
    
    const value = e.target.value;
    const normalized = normalizeICO(value);
    const shouldValidate = shouldValidateInput(value);
    
    if (shouldValidate === 'immediate') {
        updateValidationUI(normalized);
    } else {
        const message = document.getElementById('validation-message');
        message.textContent = '';
        message.className = 'validation-message';
        
        const input = document.getElementById('ico-input');
        input.className = '';
    }
});

document.getElementById('ico-input').addEventListener('blur', function(e) {
    const value = e.target.value;
    const normalized = normalizeICO(value);
    
    if (value !== normalized) {
        e.target.value = normalized;
    }
    
    if (normalized) {
        updateValidationUI(normalized);
    }
});

document.getElementById('ico-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loadCompanyData();
    }
});

updateValidationUI('');
</script>
</div>


<h2 id="predvyplneni-formulare">Předvyplnění formuláře</h2>

<p>Po získání dat je jednoduše vložte do příslušných polí formuláře. Doporučuji:</p>

<ul>
<li>Přidat tlačítko „Načíst data z ARES“ vedle pole pro IČO.</li>
<li>Ověřit formální platnost IČO (např. 8 čísel a zkontrolovat kontrolní číslici), aby se nemusela stahovat vzdálená data u evidentně špatně vyplněného pole.</li>
<li>Umožnit uživateli data upravit, protože ARES nemusí být vždy aktuální.</li>
<li>Neposílat požadavky na ARES příliš často, abyste se vyhnuli blokování.</li>
</ul>



<h2 id="dic">DIČ</h2>

<p>Získat data na základě DIČ by mohlo být uživatelsky přívětivější, protože řada podnikatelů si ho na rozdíl od IČO pamatuje, jelikož je to jejich rodné číslo.</p>

<p>Nicméně našel jsem jen tyto zdroje pro získávání dat na základě DIČ, které ale nenabízejí tak jednoduché API:</p>

<ul>
<li><a href="https://adisspr.mfcr.cz/adis/jepo/epo/dpr/apl_ramce.htm?R=/dpr/DphReg?ZPRAC=FDPHI1%26poc_dic=2%26OK=Zobraz" target="_blank" rel="noopener noreferrer">Registr plátců DPH</a> – Ověření platnosti DIČ v ČR.</li>
<li><a href="https://ec.europa.eu/taxation_customs/vies/#/vat-validation" target="_blank" rel="noopener noreferrer">EU VAT Validation</a> – Ověření DIČ v rámci EU.</li>
</ul>


<h2 id="zaver">Závěr</h2>

<p>Použití ARES API výrazně zlepšuje uživatelskou zkušenost tím, že minimalisuje ruční zadávání dat. Implementace je jednoduchá a lze ji integrovat do jakéhokoli webového projektu.</p>


<p>Pokud máte zkušenosti s ARES nebo tipy na lepší implementaci, nebo jak jednoduše získat data pro DIČ, dejte mi prosím vědět v komentářích.</p>
