---
title: "QR kód generátor online zdarma"
headline: "QR kód generátor – online, zdarma"
description: "Online QR kód generátor zdarma. Vytvořte QR kód pro text, URL, platbu, e-mail nebo telefon přímo v prohlížeči bez registrace."
date: "2015-02-19"
last_modification: "2025-09-16"
status: 1
tags: ["hotova-reseni", "produktivita"]
format: "html"
---

<p>QR code (zkratka z <i>Quick Response Code</i>) se používá hlavně pro <b>mobilní zařízení</b>. Jedná se o způsob, jak do grafické podoby uložit menší množství dat. Vzniklý obrázek potom člověk vyfotí fotoaparátem svého mobilního zařízení a speciální aplikací z obrázku získá potřebná strojově čitelná data.</p>

<p>Hlavní výhoda QR kódu je <b>pohodlné a rychlé získání</b> textových dat. Místo pomalého opisování textu na klávesnici dokáže v jednotkách sekund obsah získat a rozluštit software.</p>

<p>Dnes většina chytrých telefonů umí QR kódy číst přímo ve vestavěné aplikaci Fotoaparát (iOS i Android), bez nutnosti instalovat speciální čtečku.</p>


<div class="live">

<!-- QR generátor CSS -->
<style>
.qr-generator .items > div[data-type] { display: none; }
.qr-generator .items > div.active[data-type] { display: block; }
#qr-code table { 
    margin: 0 auto; border-collapse: collapse; border: none;
    background: white; padding: 10px;
}
#qr-code td { 
    padding: 0; margin: 0; line-height: 0; border: none;
    width: 4px; height: 4px;
}
#qr-code img {
    max-width: 300px; height: auto; border: none;
    image-rendering: pixelated; image-rendering: -moz-crisp-edges;
}
</style>
<form onsubmit="return false" id="qr-form" class="qr-generator" name="generator">

<h2 id="vytvor">Vytvoření QR code</h2>
  
  <p>Vygenerujte si potřebný QR kód. Zadaná data se <b>nikam nepřenášejí</b> a neukládají. Kód se sestavuje přímo v prohlížeči.</p>

<p><b>Typ kódu</b>:</p>
  
	<div class="flex flex-wrap gap-2 controls">
	    <button data-type="text" class="active">Text</button>
	    <button data-type="url">Odkaz</button>
	    <button data-type="tel">Telefon</button>    
	    <button data-type="email">E-mail</button>
	    <button data-type="sms">SMS</button>
	    <button data-type="event">Událost</button>
	    <button data-type="vcard">Kontakt</button>
	    <button data-type="wifi">Wi-Fi</button>
	    <button data-type="geo">Mapa</button>
	    <button data-type="btc">Bitcoin</button>
	</div>        
	<div class="items">
	    <div data-type="text" class="active">
	        <table>
	            <tr>
	                <th><label for="text">Text</label></th>
	                <td>
	                    <textarea name="text" id="text" cols="30" rows="10"></textarea>
	                </td>
	            </tr>
	        </table>
	    </div>
	    
	    <div data-type="url">
	        <table>
	            <tr>
	                <th><label for="url">URL</label></th>
	                <td>
	                    <input name="url" type="url" placeholder="example.com">
	                </td>
	            </tr>
	        </table>
	    </div>    
	    
	    <div data-type="tel">
	        <table>
	            <tr>
	                <th><label for="tel">Telefon</label></th>
	                <td>
	                    <input name="tel" type="tel" placeholder="+420123456789">
	                </td>
	            </tr>
	        </table>
	    </div>    
	    
	    <div data-type="email">
	        
	    <table>
	        <tr>
	            <th><label for="email">E-mail</label></th>
	            <td><input name="email" type="email" placeholder="mail@example.com"></td>
	        </tr>
	        <tr>
	            <th><label for="email-subject">Předmět</label></th>
	            <td><input name="email-subject" type="text" placeholder=""></td>
	        </tr>        
	        <tr>
	            <th><label for="email-text">Text zprávy</label></th>
	            <td>
	            <textarea name="email-text" id="email-text" type="text" placeholder="Text zprávy"></textarea></td>
	        </tr>
	    </table>        
	    </div>       
	    
	    <div data-type="sms">
	    <table>
	        <tr>
	            <th><label for="sms-tel">Telefon</label></th>
	            <td><input name="sms-tel" id="sms-tel" type="tel" placeholder="+420123456789"></td>
	        </tr>
	        <tr>
	            <th><label for="sms">Text zprávy</label></th>
	            <td>
	            <textarea name="sms" id="sms" type="text" placeholder="Text zprávy"></textarea></td>
	        </tr>
	    </table>
	        
	    </div>      
	    
	    <div data-type="event">
	        <table>
	            <tr>
	                <th><label for="event-name">Název události</label></th>
	                <td><input type="text" name="event-name" id="event-name"></td>
	            </tr>
	            <tr>
	                <th><label for="event-start">Začátek</label></th>
	                <td><input type="datetime" name="event-start" id="event-start"></td>
	            </tr>        
	            <tr>
	                <th><label for="event-end">Konec</label></th>
	                <td><input type="datetime" name="event-end" id="event-end"></td>
	            </tr>                    
	        </table>
	    </div>          
	    
	    <div data-type="vcard">
	        <table>
	            <tr>
	                <th><label for="vcard-name">Jméno a příjmení</label></th>
	                <td><input type="text" name="vcard-name" id="vcard-name" placeholder="Jméno Příjmení"></td>
	            </tr>
	            <tr>
	                <th><label for="vcard-email">E-mail</label></th>
	                <td><input type="text" name="vcard-email" id="vcard-email" placeholder="email@example.com"></td>
	            </tr>        
	            <tr>
	                <th><label for="vcard-tel">Telefon</label></th>
	                <td><input type="text" name="vcard-tel" id="vcard-tel" placeholder="123456789"></td>
	            </tr>                    	            
	            <tr>
	                <th><label for="vcard-url">Web</label></th>
	                <td><input type="text" name="vcard-url" id="vcard-url" placeholder="example.com"></td>
	            </tr>                    
	            <tr>
	                <th><label for="vcard-address">Adresa</label>
	                	<p><small style="font-size: 60%; line-height: .5em">Ulice<br>Město<br>PSČ</small></p></th>
	                <td><textarea type="text" name="vcard-address" rows="5" id="vcard-address" placeholder=""></textarea></td>
	            </tr>                    
	        </table>
	    </div>          

	    <div data-type="wifi">
	    <table>
	        <tr>
	            <th><label>Zabezpečení</label></th>
	            <td>
	                <label><input type="radio" name="wifi-encrypt" value="WPA" checked>WPA</label>
	                <label><input type="radio" name="wifi-encrypt" value="WEP">WEP</label>
	                <label><input type="radio" name="wifi-encrypt" value="">žádné</label>
	            </td>
	        </tr>
	        <tr>
	            <th><label for="wifi-name">Název sítě</label></th>
	            <td><input type="text" name="wifi-name"></td>
	        </tr>
	        <tr>
	            <th><label for="wifi-password">Heslo</label></th>
	            <td><input type="text" name="wifi-password"></td>
	        </tr>        
	    </table>
	    </div>              

	    <div data-type="geo">
	        <table>
	            <tr>
	                <th><label for="geo">GPS souřadnice</label></th>
	                <td>
	                    <input name="geo-cords" type="text" placeholder="50.0892069,14.4032178" size="40">
	                </td>
	            </tr>
	        </table>
	    </div>       
	    
	    <div data-type="btc">
	        <table>
	            <tr>
	                <th><label for="btc">Bitcoin adresa</label></th>
	                <td>
	                    <input name="btc" type="text" placeholder="15hiREsY5C28toE1bwtQaEPAUV11F5W1Me" size="40">
	                </td>
	            </tr>
	            <tr>
	                <th><label for="btc">Částka</label></th>
	                <td>
	                    <input name="btc-ammount" type="number" step="0.0001" placeholder="0.01">
	                </td>
	            </tr>            
	        </table>
	    </div>       
      
      <h3>QR kód</h3>

	    <div id="qr-code"></div>
	    <div style="text-align: center; margin: 10px 0;">
	        <button id="download-qr" style="background: #0066cc; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 14px;">Stáhnout QR kód</button>
	    </div>

      <h3>Textová data</h3>
	    <pre><code id="raw"></code></pre>
	</div>    
	</form>	

<script src="/files/qr/qr-code.js"></script>
<script>
(function() {
    var form = document.getElementById('qr-form');
    var qrContainer = document.getElementById('qr-code');
    var rawDataContainer = document.getElementById('raw');
    
    if (!form || !qrContainer || !rawDataContainer) return;

    var qrTypes = {
        text: function(form) { return form.text.value || 'Zkušební text'; },
        url: function(form) {
            var url = form.url.value || 'example.com';
            return url.match(/^https?:\/\//) ? url : 'https://' + url;
        },
        tel: function(form) { return 'tel:' + (form.tel.value || '+420123456789'); },
        sms: function(form) {
            var tel = form['sms-tel'].value || '+420123456789';
            var text = form.sms.value || 'Zpráva';
            return 'sms:' + tel + '?body=' + encodeURIComponent(text);
        },
        email: function(form) {
            var email = form.email.value || 'email@example.com';
            var params = [];
            if (form['email-subject'].value) params.push('subject=' + encodeURIComponent(form['email-subject'].value));
            if (form['email-text'].value) params.push('body=' + encodeURIComponent(form['email-text'].value));
            return 'mailto:' + email + (params.length > 0 ? '?' + params.join('&') : '');
        },
        event: function(form) {
            var name = form['event-name'].value || 'Událost';
            var start = form['event-start'].value || '2025-12-01T12:00';
            var end = form['event-end'].value || '2025-12-01T13:00';
            return 'BEGIN:VEVENT\nSUMMARY:' + name + '\nDTSTART:' + start.replace(/[-:]/g, '') + 'Z\nDTEND:' + end.replace(/[-:]/g, '') + 'Z\nEND:VEVENT';
        },
        vcard: function(form) {
            var name = form['vcard-name'].value || 'Jan Novák';
            var parts = name.split(' ');
            var firstName = parts[0] || '';
            var lastName = parts.slice(1).join(' ') || '';
            return 'BEGIN:VCARD\nVERSION:3.0\nFN:' + name + 
                   '\nN:' + lastName + ';' + firstName + ';;;\n' +
                   'TEL;TYPE=CELL:' + (form['vcard-tel'].value || '+420123456789') + '\n' +
                   'EMAIL;TYPE=INTERNET:' + (form['vcard-email'].value || 'jan@example.com') + '\n' +
                   'URL:' + (form['vcard-url'].value ? (form['vcard-url'].value.match(/^https?:\/\//) ? form['vcard-url'].value : 'https://' + form['vcard-url'].value) : 'https://example.com') + '\n' +
                   'END:VCARD';
        },
        wifi: function(form) {
            var encrypt = 'WPA';
            var radios = form['wifi-encrypt'];
            if (radios) {
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].checked) { encrypt = radios[i].value; break; }
                }
            }
            return 'WIFI:T:' + encrypt + ';S:' + (form['wifi-name'].value || 'MojeSit') + ';P:' + (form['wifi-password'].value || 'heslo123') + ';H:false;;';
        },
        geo: function(form) { return 'geo:' + (form['geo-cords'].value || '50.0755,14.4378'); },
        btc: function(form) {
            var address = form.btc.value || '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2';
            var amount = form['btc-ammount'].value || '0.001';
            return 'bitcoin:' + address + '?amount=' + amount;
        }
    };

    var currentType = 'text';
    var currentQRData = '';

    function generateQR() {
        var text = qrTypes[currentType](form);
        currentQRData = text;
        rawDataContainer.textContent = text;
        try {
            // Zkusit PNG generování
            var img = document.createElement('img');
            img.src = QRCode.generatePNG(text, {modulesize: 4, margin: 2});
            img.style.maxWidth = '300px';
            img.style.height = 'auto';
            qrContainer.innerHTML = '';
            qrContainer.appendChild(img);
        } catch (e) {
            try {
                // Fallback na HTML
                var qrElement = QRCode.generateHTML(text, {modulesize: 3, margin: 2});
                qrContainer.innerHTML = '';
                qrContainer.appendChild(qrElement);
            } catch (e2) {
                qrContainer.innerHTML = '<p>Chyba při generování QR kódu</p>';
            }
        }
    }

    function downloadQR() {
        if (!currentQRData) return;
        
        try {
            // Vygenerovat PNG pro stažení
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var matrix = QRCode.generate(currentQRData);
            var size = matrix.length;
            var scale = 8; // Velikost pixelu
            var margin = 4 * scale; // Okraj
            
            canvas.width = canvas.height = (size + 8) * scale;
            
            // Bílé pozadí
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Černé moduly
            ctx.fillStyle = '#000000';
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    if (matrix[i][j]) {
                        ctx.fillRect((j + 4) * scale, (i + 4) * scale, scale, scale);
                    }
                }
            }
            
            // Stáhnout
            var link = document.createElement('a');
            link.download = 'qr-kod-' + currentType + '.png';
            link.href = canvas.toDataURL();
            link.click();
            
        } catch (e) {
            alert('Chyba při stahování QR kódu. Zkuste uložit obrázek ručně.');
        }
    }

    // Stahování QR kódu
    document.addEventListener('click', function(e) {
        if (e.target.id === 'download-qr') {
            e.preventDefault();
            downloadQR();
            return;
        }
    });

    // Přepínání typů
    document.addEventListener('click', function(e) {
        if (e.target.matches('.qr-generator .controls button')) {
            e.preventDefault();
            document.querySelectorAll('.qr-generator .controls button').forEach(function(btn) { btn.classList.remove('active'); });
            document.querySelectorAll('.qr-generator .items > div').forEach(function(panel) { panel.classList.remove('active'); });
            
            currentType = e.target.getAttribute('data-type');
            e.target.classList.add('active');
            
            var activePanel = document.querySelector('.qr-generator .items > div[data-type="' + currentType + '"]');
            if (activePanel) activePanel.classList.add('active');
            
            generateQR();
        }
    });

    // Aktualizace při změně
    document.addEventListener('input', function(e) {
        if (e.target.closest('.qr-generator')) generateQR();
    });
    document.addEventListener('change', function(e) {
        if (e.target.closest('.qr-generator')) generateQR();
    });

    // Inicializace
    setTimeout(function() {
        var firstButton = document.querySelector('.qr-generator .controls button');
        if (firstButton) firstButton.classList.add('active');
        var firstPanel = document.querySelector('.qr-generator .items > div');
        if (firstPanel) firstPanel.classList.add('active');
        var textArea = form.querySelector('textarea[name="text"]');
        if (textArea && !textArea.value) textArea.value = 'Zkušební text pro QR kód';
        generateQR();
    }, 100);
})();
</script>
</div>



<h2 id="podoba">Podoba kódu</h2>

<p><img src="/files/qr/qrcode.png" alt="Příklad QR kódu" class="border"></p>















<p>Na příkladu jednoduchého QR kódu stojí za povšimnutí velké čtverce ve třech rozích, které slouží jako <b>orientační body</b> pro snímací aplikaci. Zbytek jsou už potom <b>data</b>. Díky třem „kontrolním“ čtvercům v rozích jde určit orientaci kódu, takže není problém kód fotit klidně vzhůru nohama.</p>

<p>QR kód je také i tolerantní k chybám, může být v různých barvách nebo barevně <b>invertován</b>. I část výsledného obrázku může fungovat, což přináší možnost do obrázku například umístit <b>logo</b> nebo <b>lidsky čitelný text</b>.</p>

<figure>
  <img src="/files/qr/qr-logo.png" alt="QR kód s logem">
  <figcaption>
    <p>Příklad invertovaného QR kódu s umístěním loga, který je stále funkční</p>
  </figcaption>
</figure>















<div class="external-content">
  <ul>
    <li>Wikipedie: <a href="http://cs.wikipedia.org/wiki/QR_kód">QR kód</a> – obsahuje i detailní popis, jakým způsobem jsou data v obrázku uložena</li>
  </ul>
</div>


<h2 id="pocet-znaku">Počet znaků</h2>

<p>Pokud se do obrázku zakóduje víc dat (delší text), bude jeho struktura <b>hustší</b>, což ztíží i převod obrázku na data.</p>

<p>Některé starší čtečky mohou mít s delšími kódy (například nad <b>300 znaků</b>) problémy. Většinou není nutné do kódu zapsat celé romány, ale používají se spíš odkazy na <b>webovou stránku</b>, kde je potom více obsahu.</p>

<h3 id="max">Maximální počet znaků</h3>

<table class="wikitable">
  <tbody>
    <tr>
      <th>Typ obsahu</th>
      <th>Znaků</th>
    </tr>
    <tr>
      <td>číslice</td>
      <td>7 089</td>
    </tr>
    <tr>
      <td>písmena a číslice</td>
      <td>4 296</td>
    </tr>
    <tr>
      <td>8bitová data</td>
      <td>2 953</td>
    </tr>
    <tr>
      <td>kandži</td>
      <td>1 817</td>
    </tr>
  </tbody>
</table>

<p>Jiný QR kód s delším textem (cca 120 znaků).</p>

<p><img src="/files/qr/qrcode-dlouhy.png" alt="Příklad QR kódu" class="border"></p>






<h2 id="funkce">Funkce</h2>

<p>Kromě textu nebo URL (adresy webové stránky) se dají do kódu zakódovat další funkce. Aplikace pro luštění QR kódu bývají chytré, takže se snaží automaticky zjistit typ dat.</p>

<ul>
  <li>Číslo <code>123456789</code> se bude nejspíš brát jako telefonní číslo.</li>
  
  <li>Text <code>www.jecas.cz</code> bude potom pochopen jako odkaz na webovou stránku.</li>
  
  <li>Text <code>neco@example.com</code> půjde pochopit jako e-mail.</li>
</ul>

<p>Kromě automatického určování obsahu existuje způsob pro označení jiných funkcí.</p>



<h3 id="text">Text</h3>

<p>Obyčejný text:</p>

<pre><code>Text</code></pre>





<h3 id="url">URL</h3>

<p>Adresa nepotřebuje zvláštní zacházení. Automaticky ji rozpozná aplikace. Preferujte <code>https</code>.</p>

<pre><code>https://example.com</code></pre>



<h3 id="e-mail">E-mail</h3>

<p>Samotný e‑mail je možné rozpoznat automaticky.</p>

<p>Pro vytvoření zprávy v e‑mailovém klientu použijte <code>mailto:</code> s parametry:</p>

<pre><code>mailto:mail@example.com?subject=P%C5%99edm%C4%9Bt&amp;body=Text</code></pre>




<h3 id="telefon">Telefon</h3>

<p>Předvyplní číslo pro pohodlné zavolání. Stačí na začátek uvést <code>tel:</code>. Používejte mezinárodní formát.</p>

<pre><code>tel:+420123456789</code></pre>



<h3 id="sms">SMS</h3>

<p>Pro připravení SMS zprávy je nejrozšířenější tvar <code>SMSTO:</code> nebo schéma <code>sms:</code> s parametry. Doporučení: používejte <code>sms:</code>.</p>

<pre><code>sms:+420123456789?body=Text</code></pre>




<h3 id="udalost">Událost</h3>

<p>Připraví událost ve formátu iCalendar (UTC čas, bez diakritiky pro maximální kompatibilitu):</p>

<pre><code>BEGIN:VEVENT
SUMMARY:Nazev udalosti
DTSTART:20251001T160000Z
DTEND:20251001T170000Z
END:VEVENT</code></pre>







<h3 id="geo">Geolokace</h3>

<p>Místo na mapě. Uvádí se v pořadí zeměpisná šířka, zeměpisná délka a volitelně nadmořská výška.</p>

<pre><code>geo:50.0892069,14.4032178,400</code></pre>

<p>Získat GPS určitého místa jde například pomocí stránky <a href="https://mapy.cz">Mapy.cz</a>:</p>


<ol>
  <li>
    <p>Stačí kliknout pravým tlačítkem na místo a vybrat <i>Co je zde</i>:</p>
    
    <p><img src="/files/qr/mapy.png" alt="Co je zde?" class="border"></p>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  </li>
  
  
  <li>
    <p>V pravém panelu dole si zkopírovat GPS souřadnice:</p>
    
    <p><img src="/files/qr/mapy-gps.png" alt="Co je zde?" class="border"></p>
  </li>
</ol>









<h3 id="wifi">Připojení k Wi-Fi</h3>

<p>Do QR kódu jde zachytit i přihlášení k Wi-Fi.</p>

<pre><code>WIFI:T:WPA;S:Nazev;P:heslo;H:false;;</code></pre>




<h3 id="vcard">Kontakt vCard</h3>

<p>Docela užitečná je možnost vytvořit <b>celý kontakt</b>. Dá se zadat jméno, příjmení, telefonní čísla, e-mail, adresa nebo webová stránka.</p>

<p>Může se hodit takový kód vytisknout na visitku, čímž si půjde pohodlně uložit kompletní kontakt. Jelikož visitky nebývají velké, je kvůli dobré čitelnosti lepší uvést jen nejnutnější údaje (např. jen jeden telefon nebo e-mail a podobně).</p>

<p>Používá se běžný formát <b>vCard</b> (doporučeno <code>VERSION:3.0</code> nebo <code>4.0</code>):</p>

<pre><code>BEGIN:VCARD
VERSION:3.0
FN:Jmeno Prijmeni
N:Prijmeni;Jmeno;;;
TITLE:Funkce
TEL;TYPE=CELL:+420222222222
EMAIL;TYPE=INTERNET:osobni@example.com
URL:https://example.com
ADR:;;Ulice;Mesto;;11100;Zeme
ORG:Organisace
END:VCARD</code></pre>













<div class="external-content">
  <ul>
    <li><a href="https://en.wikipedia.org/wiki/VCard">vCard</a> – popis formátu na anglické Wikipedii</li>
  </ul>
</div>


<h3 id="qr-platba">QR platba</h3>

<p>Pro elegantní placení prostřednictvím <b>mobilní bankovní aplikace</b> je užitečné generovat QR platební kód. Člověk tak nemusí z papírové faktury opisovat číslo účtu, banky, sumu a podobně. Nebo tyto údaje kopírovat z e-mailu nebo webové stránky.</p>

<p>Kód pro platby může vypadat následovně:</p>

<pre><code>SPD*1.0*ACC:CZ5608000000000002171532*AM:999*CC:CZK*DT:20150518*MSG:Zpráva*X-KS:1414*X-SS:1313*X-VS:1212</code></pre>


<ul>
  <li><code>ACC</code> – číslo účtu v <a href="http://cs.wikipedia.org/wiki/International_Bank_Account_Number">IBAN</a> formátu (pokud ho neznáte, jde spočítat)</li>
  <li><code>AM</code> – částka k platbě</li>
  <li><code>CC</code> – měna</li>
  <li><code>DT</code> – datum splatnosti</li>
  <li><code>MSG</code> – zpráva pro příjemce</li>
  <li><code>X-KS</code> – konstantní, <code>X-SS</code> – specifický a <code>X-VS</code> – variabilní symbol</li>
</ul>



<div class="external-content"><ul>
  <li><a href="https://qr-platba.cz/">QR platba</a> – více informací o placení pomocí QR kódu</li>
</ul></div>


<h3 id="bitcoin">Bitcoin adresa</h3>

<p>Pro zjednodušení platby v Bitcoinech používejte URI schéma <code>bitcoin:</code> s parametry:</p>

<pre><code>bitcoin:{adresa}?amount={castka}&amp;label={zprava}</code></pre>

<p>Nutná je pochopitelně mobilní bitcoinová peněženka, která může platbu na adresu zpracovat.</p>




<h2 id="aplikace">Aplikace</h2>

<p>Pro čtení QR kódu je nutná nějaká aplikace, co z obrázku vydoluje text.</p>

<p>Pro luštění kódu na počítači bez používání webkamery je ideální nástroj:</p>

<div class="external-content">
  <ul>
    <li><a href="https://zxing.org/w/decode.jspx">ZXing Decoder</a> – dekódování QR kódu z URL nebo nahraného obrázku v prohlížeči</li>
  </ul>
</div>


<h3 id="mobilni">Mobilní aplikace</h3>

<p>Na mobilních telefonech dnes QR kód zpravidla naskenujete přímo vestavěnou aplikací Fotoaparát (iOS i Android). Pro pokročilejší funkce je k disposici také Google Lens nebo řada QR čteček v obchodech s aplikacemi.</p>


<h2 id="generovani">PHP, JS, API generátory</h2>

<p>Pro automatické generování QR kódu existuje spousta hotových řešení.</p>



<h3 id="js">Generování QR v JavaScriptu</h3>

<p>Generovat QR kód v JavaScriptu je výhodné – není nutné čekat na odpověď serveru a data se neposílají třetí straně. Výsledek lze vykreslit do <a href="/canvas"><code>&lt;canvas></code></a> nebo jako SVG.</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/soldair/node-qrcode">qrcode</a> – spolehlivá JS/TS knihovna (Node i prohlížeč), podporuje UTF‑8</li>
    <li><a href="https://github.com/kozakdenys/qr-code-styling">qr-code-styling</a> – generování stylovaných QR kódů s logem</li>
  </ul>
</div>


<h3 id="php">PHP generátor QR kódu</h3>

<p>Pro PHP je dnes nejpoužívanější a aktivně udržovaná knihovna <a href="https://github.com/endroid/qr-code">endroid/qr-code</a> (composer balíček <code>endroid/qr-code</code>). Alternativou je <a href="https://github.com/chillerlan/php-qrcode">chillerlan/php-qrcode</a>.</p>

<p><b>Poznámka</b>: po stažení archivu a spuštění na <a href="/localhost">localhostu</a> nemusí u dema čestina správně fungovat kvůli absenci HTML <code>&lt;meta></code> značky:</p>

<pre><code>&lt;meta charset="utf-8"></code></pre>


<h3 id="online">Online generátor</h3>

<p>Nakonec je možnost si QR kód jednorázově vygenerovat pomocí nějaké online služby.</p>

<div class="external-content">
  <ul>
    <li><a href="https://goqr.me">QR Code Generator</a> – pokročilý online generátor QR kódu</li>
  </ul>
</div>

