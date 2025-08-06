---
title: "Testování webů v různých prohlížečích"
headline: "Testování webů napříč prohlížeči"
description: "Možnosti, jak otestovat webové stránky v různých versích různých prohlížečů. Desktopových i mobilních."
date: "2013-06-22"
last_modification: "2013-06-24"
status: 1
tags: ["produktivita", "testovani", "webove-prohlizece"]
format: "html"
---

<h2 id=ie>Více Internet Explorerů</h2>

<p>Na jednom systému Windows není standardní cestou provozovat různé IE. Naštěstí ale existuje několik možností, jak více versí Internet Exploreru na jednom počítači přece jenom dosáhnout.

  
  
  
  
<h3 id=vyvojarske-nastroje>Vývojářské nástroje</h3>

<p>Pokud si aktualisujeme Internet Explorer na nejnovější, lze si ve <a href='/vyvojarske-nastroje'>vývojářských nástrojích</a> (po stisknutí klávesy <kbd>F12</kbd>) přepínat režimy starších Explorerů.
  
<p><img class=border src='/files/prohlizece/ie-rezimy.png' alt='Volba vykreslovacích režimů v IE 10'>
  
  
  
  
  
  
  
  
  
  
  
<p><a class=button href='http://windows.microsoft.com/cs-cz/internet-explorer/ie-10-worldwide-languages'>Stažení IE 10</a>
  

<h3 id=ie-tester>IE Tester</h3>

<p>Speciální program obsahující všechny Explorery se jmenuje IETester.
<p><img class=border src='/files/prohlizece/ie-tester.png' alt='Volba jednotlivých IE v IETesteru'>

  
  
  
  
  
  
  
  
  
  
  
  
<p><a class=button href='http://www.my-debugbar.com/wiki/IETester/HomePage'>Stránka IE Testeru</a></p>

<h3 id=virtual>Virtuální stroj</h3>

<p>Virtuální stroj (<a href='http://cs.wikipedia.org/wiki/Virtuální_stroj'>virtual machine</a>) slouží k provozování dalšího OS ze svého běžného systému. Microsoft připravil obrazy různých operačních systémů se všemi reálně používanými versemi Explorerů.

  
<p>Trochu nevýhoda je, že nabízené operační systémy jsou aktivovány jen na 30 dní. Je proto potřeba po případném uzpůsobení si daného image vytvořit snapshot a minimálně jednou do měsíce se k němu vrátit.
    
    
<p><a class=button href='http://www.modern.ie/en-US/virtualization-tools#downloads'>Stažení image z modern.IE</a>

<p>Každé řešení má svoje.

<ul>
<li>Přepínání ve vývojářských nástrojích je nejjednodušší.
<li>IE Tester poslouží tam, kde není nejnovější IE možné nainstalovat.
<li>Používání IE ve virtuálním stroji zase zajistí 100% shodu se skutečnými prohlížeči. Předchozí dvě varianty mají drobné odchylky.
</ul>





<h2 id=opera-firefox-chrome>Opera, Firefox, Chrome</h2>
<p>Tyto prohlížeče se mají tendenci u uživatele samy a často aktualisovat. Nová verse tu starou takřka kompletně vytlačí za pár měsíců. Navíc se jednotlivé verse moc neliší.

<p>Následovně vypadá střídání jednotlivých Chromů za poslední rok (zdroj <a href='http://gs.statcounter.com/'>StatCounter.com</a>).
  
  
<p><img class=border src='/files/prohlizece/chrome-share.png' alt='Vývoj podílů jednotlivých versí Chrome'>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
<p>Starší verse prohlížečů je možné sehnat na stránce <a href='http://www.oldapps.com/category/browsers'>OldApps.com</a>.

<p><a class=button href='http://www.opera.com/'>Prohlížeč Opera</a>
<a class=button href='http://www.google.com/intl/cs/chrome/browser/'>Prohlížeč Chrome</a>
<a class=button href='http://www.mozilla.org/cs/firefox/new/'>Prohlížeč Firefox</a>

  

<h2 id=mobily>Mobilní prohlížeče</h2>

<p>Pod tímto pojmem rozumíme prohlížeče používané v přenosných zařízeních jako je chytrý telefon nebo tablet.

  
<h3 id=opera-mobile>Opera Mobile</h3>

<p>Mobilní Opera nabízí desktopový emulátor pro Windows, Mac i Linux.
<p><img class=border src='/files/prohlizece/opera-emulator.jpg' alt='Emulace mobilního prohlížeče Opera'>

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <p><a class=button href='http://www.opera.com/developer/mobile-emulator'>Opera Mobile Emulator</a>

<h3 id=ie-mobile>Internet Explorer Mobile</h3>

<p>V mobilních operačních systémech Windows Phone od Microsoftu se používají prohlížeče založené na stejném jádru jako desktopové Explorery. Zjednodušeně řečeno si stačí zmenšit okno běžného IE.
  
  
<p>Pro věrnou simulaci lze použít emulátor celého systému Windows Phone.
  
  
  
<p><a class=button href='https://dev.windowsphone.com/en-us/downloadsdk'>Windows Phone SDK</a>

  
  
<h3 id=ostatni>Mobilní Chrome, Firefox, Safari</h3>

<p>U ostatních prohlížečů platí totéž, co u mobilního IE. Pro základní simulaci stačí zmenšit okno běžného prohlížeče. 
  
<p>V <b>Chromu</b> je docela <a href='https://developers.google.com/chrome-developer-tools/docs/mobile-emulation'>zajímavý nástroj</a> ve vývojářských nástrojích (po stisknutí <kbd>F12</kbd>). Díky němu lze vybírat z běžných rozměrů mobilních zařízení, simulovat geolokaci, dotykové události a jiné.

<p><img class=border src='/files/prohlizece/chrome-mobile.png' alt='Emulace mobilního zařízení v desktopovém Chrome'>

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
<p>Pro naprosto věrnou simulaci mobilního prohlížeče na desktopovém OS by bylo (jako v případě IE) SDK daného systému.
  

<h2 id=screenshoty>Zobrazení screenshotu stránky</h2>

<p>Pro zběžnou představu, zda není v jednotnosti webové stránky chyba, mohou posloužit služby tvořící náhledy.
  
<p><a class=button href='http://browsershots.org/'>Browsershots.org</a>

  
  
  
<h2 id=browserstack>BrowserStack</h2>

<p>Tato služba nabízí kromě screenshotů webu ve všech možných prohlížečích i možnost přímo z vlastního prohlížeče živě testovat.
<p>K disposici jsou všechny běžně používané prohlížeče a dokonce i mobilní Opera, Chrome (Android) a Safari (iOS).

<p><img class=border src='/files/prohlizece/browserstack.jpg' alt='Emulace mobilního zařízení přes webové rozhraní BrowserStack'>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
<p>Nevýhoda je, že BrowserStack není zdarma. Nabízí určitý čas k vyzkoušení, dlouhodobé používání stojí přibližně 20 dolarů za měsíc.

  
<p><a class=button href='http://www.browserstack.com/start'>BrowserStack</a>
  
  


<h2 id="crossbrowsertesting">Cross Browser Testing</h2>  

<p>Podobná služba jako <b>BrowserStack</b>, rovněž placená a se zkušebním provozem zdarma. Nezkoušel jsem.</p>

<p><a href="http://crossbrowsertesting.com/" class="button">Cross Browser Testing.com</a></p>


  
<h2>Pro které prohlížeče optimalisovat?</h2>

<p>Tím se zabývám v článku: <a href="/prohlizece-optimalisace">Pro jaké prohlížeče ladit svůj web</a>.</p>



<h2 id="loga">Loga všech prohlížečů</h2>

<p><a href="https://github.com/paulirish/browser-logos">Kvalitní loga</a> všech známých i méně známých prohlížečů.</p>