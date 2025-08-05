---
title: "QR code generátor"
headline: "Generování QR kódu"
description: "Co je to QR kód a jak ho okamžitě vytvořit pomocí jednoduchého online generátoru."
date: "2015-02-19"
last_modification: "2015-05-18"
status: 1
tags: ["hotova-reseni", "produktivita"]
format: "html"
---

<p>QR code (zkratka z <i>Quick Response Code</i>) se používá hlavně pro <b>mobilní zařízení</b>. Jedná se o způsob, jak do grafické podoby uložit menší množství dat. Vzniklý obrázek potom člověk vyfotí fotoaparátem svého mobilního zařízení a speciální aplikací z obrázku získá potřebná strojově čitelná data.</p>

<p>Hlavní výhoda QR kódu je <b>pohodlné a rychlé získání</b> textových dat. Místo pomalého opisování textu na klávesnici dokáže v jednotkách sekund obsah získat a rozluštit software.</p>

<div class="live no-js" id="qr-generator"></div>




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

<p>Adresa nepotřebuje zvláštní zacházení. Automaticky ji rozpozná aplikace.</p>

<pre><code>http://example.com</code></pre>



<h3 id="e-mail">E-mail</h3>

<p>Samotný e-mail je také možné rozpoznat automaticky.</p>

<p>Pro vytvoření obrázku, který připraví e-mailovou zprávu včetně předmětu nebo textu zprávy se používá:</p>

<pre><code>MATMSG:TO:mail@example.com;SUB:Předmět;BODY:Text;;</code></pre>




<h3 id="telefon">Telefon</h3>

<p>Předvyplní číslo pro pohodlné zavolání. Stačí na začátek uvést <code>tel</code>. Aplikace pro snímání QR kódu mohou jako telefon pochopit i prosté uvedení čísla bez „<code>tel:</code>“ na začátku.</p>

<pre><code>tel:420123456789</code></pre>



<h3 id="sms">SMS</h3>

<p>Pro připravení SMS zprávy se používá <code>SMSTO</code> na začátku obsahu. Za dvojtečku po telefonním čísle je možné uvést text zprávy.</p>

<pre><code>SMSTO:420123456789:Text</code></pre>




<h3 id="udalost">Událost</h3>

<p>Připraví událost.</p>

<pre><code>BEGIN:VEVENT
SUMMARY:Název události
DTSTART:20180801T160000Z
DTEND:20180801T170000Z
END:VEVENT</code></pre>







<h3 id="geo">Geolokace</h3>

<p>Místo na mapě. Uvádí se v pořadí zeměpisná šířka, zeměpisná délka a nadmořská výška.</p>

<pre><code>geo:50.0892069,14.4032178,400</code></pre>

<p>Získat GPS určitého místa jde například pomocí stránky <a href="http://mapy.cz">Mapy.cz</a>:</p>


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

<pre><code>WIFI:T:WPA;S:Nazev;P:heslo;;</code></pre>




<h3 id="vcard">Kontakt vCard</h3>

<p>Docela užitečná je možnost vytvořit <b>celý kontakt</b>. Dá se zadat jméno, příjmení, telefonní čísla, e-mail, adresa nebo webová stránka.</p>

<p>Může se hodit takový kód vytisknout na visitku, čímž si půjde pohodlně uložit kompletní kontakt. Jelikož visitky nebývají velké, je kvůli dobré čitelnosti lepší uvést jen nejnutnější údaje (např. jen jeden telefon nebo e-mail a podobně).</p>

<p>Používá se běžný formát <b>vCard</b>:</p>

<pre><code>BEGIN:VCARD
VERSION:2.1
FN:Jméno Příjmení
N:Příjmení;Jméno
TITLE:Funkce
TEL;CELL:222222222
TEL;WORK;VOICE:333333333
TEL;HOME;VOICE:111111111
EMAIL;HOME;INTERNET:osobni@example.com
EMAIL;WORK;INTERNET:pracovni@example.com
URL:http://example.com
ADR:;;Ulice;Město;;11100;Země
ORG:Organisace
END:VCARD</code></pre>













<div class="external-content">
  <ul>
    <li><a href="http://en.wikipedia.org/wiki/VCard">vCard</a> – popis formátu na anglické Wikipedii</li>
  </ul>
</div>


<h3 id="qr-platba">QR platba</h3>

<p>Pro elegantní placení prostřednictvím <b>mobilní bankovní aplikace</b> je užitečné generovat QR platební kód. Člověk tak nemusí z papírové faktury opisovat číslo účtu, banky, sumu a podobně. Nebo tyto údaje kopírovat z e-mailu nebo webové stránky.</p>

<p>Kód pro platby může vypadat následovně:</p>

<pre><code>SPD*1.0*ACC:CZ5608000000000002171532*AM:999*CC:CZK*DT:20150518*MSG:Zpráva*X-KS:1414*X-SS:1313*X-VS:1212</code></pre>


<ul>
  <li><code>ACC</code> – číslo účtu v <a href="http://cs.wikipedia.org/wiki/International_Bank_Account_Number">IBAN</a> formátu (pokud ho neznáte, jde <a href="https://www.cnb.cz/cs/platebni_styk/iban/iban.html">spočítat</a>)</li>
  <li><code>AM</code> – částka k platbě</li>
  <li><code>CC</code> – měna</li>
  <li><code>DT</code> – datum splatnosti</li>
  <li><code>MSG</code> – zpráva pro příjemce</li>
  <li><code>X-KS</code> – konstantní, <code>X-SS</code> – specifický a <code>X-VS</code> – variabilní symbol</li>
</ul>



<div class="external-content"><ul>
  <li><a href="http://qr-platba.cz/">QR platba</a> – více informací o placení pomocí QR kódu</li>
</ul></div>


<h3 id="bitcoin">Bitcoin adresa</h3>

<p>Pro zjednodušení platby v Bitcoinech se používají zpravidla dvě možnosti:</p>

<ul>
  <li>Prosté uvedení BTC adresy.</li>
  
  <li>Řetězec <code>bitcoin:</code> před samotnou adresou.</li>
</ul>

<p>Za bitcoinovou adresu jde i uvést částku za „<code>amount=</code>“ a zprávu/popis za „<code>label=</code>“:</p>

<pre><code>bitcoin:{adresa}?amount={částka}&amp;label={zpráva}</code></pre>

<p>Nutná je pochopitelně mobilní bitcoinová peněženka, která může platbu na adresu zpracovat.</p>




<h2 id="aplikace">Aplikace</h2>

<p>Pro čtení QR kódu je nutná nějaká aplikace, co z obrázku vydoluje text.</p>

<p>Pro luštění kódu na počítači bez používání webkamery je ideální nástroj:</p>

<div class="external-content">
  <ul>
    <li><a href="http://zxing.org/w/decode.jspx">ZXing Decoder</a> – dekódování QR kódu z URL nebo nahraného obrázku v prohlížeči</li>
  </ul>
</div>


<h3 id="mobilni">Mobilní aplikace</h3>

<p>Pro čtení kódu na mobilních telefonech s fotoaparátem si většinou stačí v obchodu vyhledat něco jako „QR code“.</p>

<p>Osobně mi vyhovuje aplikace od Seznamu QR čtečka, je k disposici pro tři nejrozšířenější platformy.</p>

<div class="external-content">
<ul>
  <li><a href="https://play.google.com/store/apps/details?id=com.threegvision.products.seznam.Android">Android (Google Play)</a></li>
  <li><a href="https://itunes.apple.com/cz/app/seznam.cz-qr-ctecka/id389526252?ls=1&amp;mt=8">iOS (App Store)</a></li>
  <li><a href="http://www.windowsphone.com/cs-cz/store/app/qr-%C4%8Dte%C4%8Dka/178d002b-2e35-4527-bc3d-47c0fc3886e2">Windows Phone Store</a></li>
</ul>  
</div>


<h2 id="generovani">PHP, JS, API generátory</h2>

<p>Pro automatické generování QR kódu existuje spousta hotových řešení.</p>


<h3 id="google">Google Charts</h3>

<p>Velice snadný způsob je použít <a href="https://developers.google.com/chart/infographics/docs/qr_codes">Google Charts</a>. Není potřeba se s ničím programovat, jen se na stránku vloží obrázek s URL, kam se zadá text, co má být v QR kódu.</p>

<div class="external-content">
<ul>
  <li><a href="http://kod.djpw.cz/lzkb">Generování QR kódu přes Google Charts</a></li>
</ul>  
</div>

<h3 id="js">Generování QR v JavaScriptu</h3>

<p>Generovat QR code JavaScriptem je výhodné tím, že se nemusí <b>čekat na odezvu</b> ze strany serveru. Navíc se data pro vytvoření kódu nepřenášejí žádné třetí straně.</p>

<p>Výsledný QR kód je možné nakreslit do plátna <a href="/canvas"><code>&lt;canvas></code></a> nebo sestavit pomocí obyčejné HTML tabulky.</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/educastellano/qr-code">qr-code</a> – Nástroj pro generování QR kódu v JavaScriptu, <a href="http://kod.djpw.cz/qzkb">ukázka</a></li>
  </ul>
</div>

<p>Existuje řada dalších hotových skriptů, bohužel si ale <b>neporadí s diakritikou</b>:</p>

<div class="external-content">
  <ul>
    <li><a href="http://davidshimjs.github.io/qrcodejs/">qrcode.js</a> – <a href="http://kod.djpw.cz/pzkb">ukázka qrcode.js</a></li>
    <li><a href="http://neocotic.com/qr.js/">neocotic.com/qr.js</a> – <a href="http://kod.djpw.cz/nzkb">ukázka qr.js</a></li>
  </ul>
</div>


<h3 id="php">PHP generátor QR kódu</h3>

<p>Pro PHP je dobře použitelná knihovna PHP QR Code, která bezpečně zvládá znaky s českou diakritikou.</p>

<div class="external-content">
  <ul>
    <li><a href="http://phpqrcode.sourceforge.net/">PHP QR Code</a> – open-source nástroj pro generování QR kódu v PHP</li>
  </ul>
</div>

<p><b>Poznámka</b>: po stažení archivu a spuštění na <a href="/localhost">localhostu</a> nemusí u dema čestina správně fungovat kvůli absenci HTML <code>&lt;meta></code> značky:</p>

<pre><code>&lt;meta charset="utf-8"></code></pre>


<h3 id="online">Online generátor</h3>

<p>Nakonec je možnost si QR kód jednorázově vygenerovat pomocí nějaké online služby.</p>

<div class="external-content">
  <ul>
    <li><a href="http://goqr.me">QR Code Generator</a> – pokročilý online generátor QR kódu</li>
  </ul>
</div>


<form onsubmit="return false" id="qr-form" class="qr-generator" name="generator" oninput="createQr(event, this)">

<h2 id="vytvor">Vytvoření QR code</h2>
  
  <p>Vygenerujte si potřebný QR kód. Zadaná data se <b>nikam nepřenášejí</b> a neukládají. Kód se sestavuje přímo v prohlížeči.</p>

<p><b>Typ kódu</b>:</p>
  
	<div class="controls">
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
	                    <textarea oninput="createQrText(this)" name="text" id="text" cols="30" rows="10"></textarea>
	                </td>
	            </tr>
	        </table>
	    </div>
	    
	    <div data-type="url">
	        <table>
	            <tr>
	                <th><label for="url">URL</label></th>
	                <td>
	                    <input oninput="createQrText(this)" name="url" type="url" placeholder="example.com">
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

      <h3>Textová data</h3>
	    <pre><code id="raw"></code></pre>
	</div>    
	</form>	

<!-- Generátor -->
<script>
  var g = document.getElementById("qr-generator");
  var f = document.getElementById("qr-form");
  g.appendChild(f);
</script>
<script src="/files/qr/qr-code.js"></script>
<script src="/files/qr/qr-generator.js"></script>
<link rel="stylesheet" href="/files/qr/qr-generator.css">
