---
title: "Rozpoznávání hlasu"
headline: "Rozpoznávání hlasu"
description: "Jak <i>psát</i> na web převodem hlasu na text pomocí <code>speechRecognition</code>."
date: "2014-04-07"
last_modification: "2017-05-14"
status: 1
tags: ["hlas", "hotova-reseni", "js"]
format: "html"
---

<p>Pro usnadnění zadávání obsahu na web existuje <i>Speech Recognition API</i>. Díky němu je možné převést řeč na text a dále s ním na stránce pracovat.</p>

<p>Tím se otevírají možnosti jako je např. významné usnadnění <b>vyplňování formulářů</b> a podobně.</p>


<h2 id="podpora">Podpora v prohlížečích</h2>

<p>V květnu 2017 podporuje hlasové zadávání pouze <b>Google Chrome</b>. Ostatní prohlížeče ho buď vyvíjí (<a href="/microsoft-edge"><b>Edge</b></a>, <b>Opera</b>), nebo zvažují vyvinout (<b>Firefox</b>).</p>

<p>Jelikož rozpoznávání funguje tak, že se vstup z mikrofonu <b>odesílá na servery Google</b>, které vrací výsledný text, musí si ostatní prohlížeče implementovat obdobnou serverovou službu.</p>





<h2 id="api">JS API</h2>

<p>Pro rozpoznávání slov je třeba použít JavaScriptové API.</p>

<p>Zjednodušené použití je následovné následovné. První řádek slouží k detekci podpory v prohlížeči. <b>Rozpoznávání češtiny</b> funguje relativně slušně.</p>

<pre><code>if ('webkitSpeechRecognition' in window) {
  var speech = new webkitSpeechRecognition();
  speech.continuous = true; // Může se v mluvení navázat
  speech.lang = "cs"; // Nastavení jazyku
  speech.onend = function() {
    // Když se přestane mluvit
  }; 
  speech.onresult = function(e) {
    // Zpracování rozpoznaných slov
  };
  
  speech.start(); // Odstartuje rozpoznávání
}</code></pre>



















<div class="external-content">
  <ul>
    <li>
      <a href="https://kod.djpw.cz/kedb">Živá ukázka</a> (funguje pouze v <b>Chrome</b>)
    </li>
  </ul>
</div>


<h3 id="opera">Nepodpora v Opeře</h3>

<p><b>Opera</b> (alespoň verse 44) se tváří, že rozpoznávání podporuje, nicméně není tomu tak. </p>

<p>Aby se v <b>Opeře</b> nezobrazovaly ovládací prvky hlasového ovládání, je potřeba přidat ošklivou detekci tohoto prohlížeče, třeba:</p>

<pre><code>var isOpera = window.opr &amp;&amp; window.opr.addons;</code></pre>








<h3 id="povoleni">Povolení v prohlížeči</h3>

<p>Před započetím mluvení je nutné udělit stránce <b>přístup k mikrofonu</b>. To je poměrně logické, protože jinak by mohla webová stránka uživatele odposlouchávat.
    <p><img src="/files/speech/povoleni.png" alt="Povolení rozpoznávání hlasu v Google Chrome" class="border"></p>









<h3 id="odhad">Odhad vs. finální výsledek</h3>

Rozpoznaná slova se dělí na dva typy: odhad a finální výsledek. Interpret jazyka je nejspíš schopný ze souvislého spojení slov <b>odhalit kontext</b> a dosáhnout tak lepších výsledků než ze <b>samostatných slov</b>.

<p>Rozlišit tyto dva případy jde z JS vlastnosti <code>isFinal</code> jednotlivých výsledků.</p>



<h2 id="vyuziti">Využití</h2>


<p>Kromě prostého zadávání textu jde umožnit hlasem ovládat celou stránku, třeba podle vysloveného pokynu přecházet ze stránky na stránku.</p>




<h3 id="interpunkce">Zadávání interpunkce</h3>

<p>Asi největší slabina v zadávání delšího souvislého textu spočívá v interpunkci. Rozpoznávací server nedokáže správně umístit čárky v souvětích.</p>

<p>Řešení je asi jedině přidat do rozpoznávací metody klíčová slova tečka, čárka a podobně, která se převedou.</p>






<h2 id="text-rec">Převod textu na řeč</h2>

<p id="precist">Zatímco převod hlasu na text není moc dobře podporovaný, obrácený postup – předčítání textu na stránce – je podporované mnohem lépe.</p>

<div class="live">
  <script>
    var readText = function(text) {
        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[10]; // Note: some voices don't support altering params
        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 2; //0 to 2
        msg.lang = 'cs-CZ';
        msg.text = text;

        speechSynthesis.speak(msg);
    };
  </script>
  
  <button onclick="readText(document.getElementById('precist').innerText)">
    Přečíst předchozí odstavec
  </button>
</div>

<p>V češtině ale výsledky nejsou úplně přesvědčivé.</p>


<div class="external-content">
  <ul>
    <li>Google Developers: <a href="https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API">Web apps that talk - Introduction to the Speech Synthesis API</a></li>
  </ul>
</div>


<h2 id="input">Překonaný atribut <code>x-webkit-speech</code></h2>

<p>V prohlížeči <b>Google Chrome</b> šlo ještě v roce 2014 automaticky běžný <a href="/input"><code>&lt;input></code></a> proměnit na hlasově ovladatelný. V aktuálních versích <b>Chrome</b> to už ale nefunguje.</p>







<pre><code>&lt;input <b>x-webkit-speech</b>></code></pre>


<p><img src="/files/speech/rozpoznavani-hlasu.png" alt="Rozpoznávání hlasu v Google Chrome" class="border"></p>









<p>U takto označeného pole se potom objevovala <b>ikonka mikrofonu</b>. Živá ukázka (v novějších prohlížečích nefunguje):</p>

<div class="live">
  <input type="text" x-webkit-speech>
</div>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>W3C: <a href="http://lists.w3.org/Archives/Public/public-xg-htmlspeech/2011Feb/att-0020/api-draft.html">Speech Input API Specification</a></li>
  <li><a href="https://dictation.io/">Dictation.io</a></li>
  <li>Labnol.org: <a href="http://www.labnol.org/software/add-speech-recognition-to-website/19989/">How to Add Speech Recognition to your Website</a></li>
  
  <li><a href="https://hacks.mozilla.org/2014/09/enabling-voice-input-into-the-open-web-and-firefox-os/">Enabling Voice Input into the Open Web and Firefox OS</a></li>
  
  <li><a href="https://shaungallagher.github.io/say_restyle/">Edit this webpage with your voice</a> – hlasově ovladatelná stránka</li>
  
  <li>Google: <a href="https://www.google.com/intl/en/chrome/demos/speech.html">Web Speech API Demonstration</a></li>
  
  <li><a href="https://www.talater.com/annyang/">annyang!</a> – ovládání webu hlasovými příkazy</li>
</ul>