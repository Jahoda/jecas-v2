---
title: "Rozpoznávání hlasu"
headline: "Rozpoznávání hlasu"
description: "Jak <i>psát</i> na web převodem hlasu na text pomocí <code>speechRecognition</code>."
date: "2014-04-07"
last_modification: "2017-05-14"
status: 1
tags: ["JavaScript", "Hotová řešení", "Hlas"]
---

Pro usnadnění zadávání obsahu na web existuje *Speech Recognition API*. Díky němu je možné převést řeč na text a dále s ním na stránce pracovat.

Tím se otevírají možnosti jako je např. významné usnadnění **vyplňování formulářů** a podobně.

## Podpora v prohlížečích

V květnu 2017 podporuje hlasové zadávání pouze **Google Chrome**. Ostatní prohlížeče ho buď vyvíjí ([**Edge**](/microsoft-edge), **Opera**), nebo zvažují vyvinout (**Firefox**).

Jelikož rozpoznávání funguje tak, že se vstup z mikrofonu **odesílá na servery Google**, které vrací výsledný text, musí si ostatní prohlížeče implementovat obdobnou serverovou službu.

## JS API

Pro rozpoznávání slov je třeba použít JavaScriptové API.

Zjednodušené použití je následovné následovné. První řádek slouží k detekci podpory v prohlížeči. **Rozpoznávání češtiny** funguje relativně slušně.

```
if ('webkitSpeechRecognition' in window) {
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
}
```

      [Živá ukázka](http://kod.djpw.cz/kedb) (funguje pouze v **Chrome**)

### Nepodpora v Opeře

**Opera** (alespoň verse 44) se tváří, že rozpoznávání podporuje, nicméně není tomu tak. 

Aby se v **Opeře** nezobrazovaly ovládací prvky hlasového ovládání, je potřeba přidat ošklivou detekci tohoto prohlížeče, třeba:

```
var isOpera = window.opr &amp;&amp; window.opr.addons;
```

### Povolení v prohlížeči

Před započetím mluvení je nutné udělit stránce **přístup k mikrofonu**. To je poměrně logické, protože jinak by mohla webová stránka uživatele odposlouchávat.

### Odhad vs. finální výsledek

Rozpoznaná slova se dělí na dva typy: odhad a finální výsledek. Interpret jazyka je nejspíš schopný ze souvislého spojení slov **odhalit kontext** a dosáhnout tak lepších výsledků než ze **samostatných slov**.

Rozlišit tyto dva případy jde z JS vlastnosti `isFinal` jednotlivých výsledků.

## Využití

Kromě prostého zadávání textu jde umožnit hlasem ovládat celou stránku, třeba podle vysloveného pokynu přecházet ze stránky na stránku.

### Zadávání interpunkce

Asi největší slabina v zadávání delšího souvislého textu spočívá v interpunkci. Rozpoznávací server nedokáže správně umístit čárky v souvětích.

Řešení je asi jedině přidat do rozpoznávací metody klíčová slova tečka, čárka a podobně, která se převedou.

## Převod textu na řeč

Zatímco převod hlasu na text není moc dobře podporovaný, obrácený postup – předčítání textu na stránce – je podporované mnohem lépe.

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

    Přečíst předchozí odstavec

V češtině ale výsledky nejsou úplně přesvědčivé.

    - Google Developers: [Web apps that talk - Introduction to the Speech Synthesis API](https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API)

## Překonaný atribut `x-webkit-speech`

V prohlížeči **Google Chrome** šlo ještě v roce 2014 automaticky běžný [`&lt;input>`](/input) proměnit na hlasově ovladatelný. V aktuálních versích **Chrome** to už ale nefunguje.

```
&lt;input **x-webkit-speech**>
```

U takto označeného pole se potom objevovala **ikonka mikrofonu**. Živá ukázka (v novějších prohlížečích nefunguje):

## Odkazy jinam

  - W3C: [Speech Input API Specification](http://lists.w3.org/Archives/Public/public-xg-htmlspeech/2011Feb/att-0020/api-draft.html)

  - [Dictation.io](https://dictation.io/)

  - Labnol.org: [How to Add Speech Recognition to your Website](http://www.labnol.org/software/add-speech-recognition-to-website/19989/)

  - [Enabling Voice Input into the Open Web and Firefox OS](https://hacks.mozilla.org/2014/09/enabling-voice-input-into-the-open-web-and-firefox-os/)

  - [Edit this webpage with your voice](https://shaungallagher.github.io/say_restyle/) – hlasově ovladatelná stránka

  - Google: [Web Speech API Demonstration](https://www.google.com/intl/en/chrome/demos/speech.html)

  - [annyang!](https://www.talater.com/annyang/) – ovládání webu hlasovými příkazy