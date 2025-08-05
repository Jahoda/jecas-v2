---
title: "Přechod z Windows na Mac"
headline: "Přechod z Windows na Mac"
description: ""
date: "2019-11-22"
last_modification: "2019-11-22"
status: 0
tags: []
format: "html"
---

<h2>Klávesové zkratky</h2>

<p><kbd>Alt</kbd> + <kbd>Tab</kbd> = <kbd>Command</kbd> <kbd>Tab</kbd></p>

<p><kbd>⊞ Win</kbd> = <kbd>⌘</kbd> + <kbd>Mezerník</kbd> – vyhledávání v aplikacích, souborech atd.</p>

<p><kbd>Delete</kbd> = <kbd>fn</kbd> + <kbd>Delete</kbd> </p>

<p><kbd>Alt</kbd> + <kbd>F4</kbd> = <kbd>⌘ command</kbd> + <kbd>Q</kbd> – zavře okno</p>

<h2 id="mys">Myš</h2>

<p>Při připojení klasické myši s kolečkem je směr rolování převrácen oproti Windows.</p>

<p>Systém to nazývá <i>přirozeným směrem posuvu</i>.</p>

<p>Změnit to jde v <i>Předvolby systému &gt; Myš</i>.</p>

<p>Bohužel toto nastavení nejde odlišit od nastavení trackpadu, kde se naopak „přirozený“ směr hodí.</p>

<p>Řešení je aplikace <a href="https://github.com/pilotmoon/Scroll-Reverser/releases">Scroll Reverser</a>.</p>







<h3 id="screenshoty">Screenshoty</h3>

<p><kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>3</kbd> – screen celé obrazovky</p>

<p><kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>4</kbd> – výstřižek</p>

<p><kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>5</kbd> – zobrazení nástroje pro screenshoty (hodí se k vyfocení okna)</p>

<p>Při stisknutí klávesy <kbd>Ctrl</kbd> navíc se screenshot uloží do schránky.</p>



<h2 id="jak-napsat">Jak napsat</h2>

<ul>
  <li>české uvozovky „“ – <kbd>⌥ option</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd> a <kbd>option</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd></li>
    <li>nedělitelná mezera – <kbd>⌥ option</kbd> + <kbd>Mezerník</kbd></li>
      <li>trojtečka … – <kbd>⌥ option</kbd> + <kbd>shift</kbd> + <kbd>ů</kbd></li>
  <li>pomlčka – <kbd>⌥ option</kbd> + <kbd>-</kbd></li>
</ul>



<h2 id="terminal">Příkazová řádka / terminál</h2>

<p>Vyhledat „Terminál“</p>




<h2 id="pruzkumnik">Průzkumník / Finder</h2>

<p>Obdoba <i>Průzkumníku</i> ve Windows se jmenuje <b>Finder</b>.</p>

<p>Zásadně jiná je navigace napříč úrovněmi složek. Třeba možnost, jak se dostat <b>o adresář výš</b>, je řádně ukrytá.</p>

<p>Docílit toho jde kliknutím pravého tlačítka na záhlaví okna (jméno aktuální složky) nebo klávesovou zkratkou <kbd>⌘ command</kbd> + <kbd>↑</kbd>.</p>






<h3 id="skryte">Zobrazení skrytých souborů</h3>

<p>Systém před uživatelem tají některé soubory a složky. Odkrýt je ve <i>Finderu</i> jde těmito příkazy v terminálu:</p>

<pre><code>defaults write com.apple.Finder AppleShowAllFiles true
killall Finder</code></pre>










<h2 id="spravce-uloh">Správce úloh</h2>

<p>Pro násilné ukončení zaseknuté aplikace existuje ekvivalent <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Delete</kbd>. Slouží k tomu zkratka <kbd>⌘ command</kbd> + <kbd>⌥ option</kbd> + <kbd>esc</kbd>.</p>

<p>Druhá možnost je vybrat položku <i>Vynutit ukončení…</i> v  Apple menu (ikona vlevo nahoře).</p>

<p>Pro zobrazení vytížení prostředků slouží aplikace <i>Monitor aktivity</i>. Nejjednodušší je ho vyhledat ve <i>Spotlightu</i> (zkratka <kbd>⌘</kbd> + <kbd>Mezerník</kbd>) nebo ve <i>Finderu</i> pod <i>Aplikace &gt; Utitlity</i>.</p>






<h2 id="ovladani">Ovládání</h2>

<p>Oproti <b>Windows</b> je dost nezvyk umístění menu dané aplikace vždy do horní společné lišty. Než si na to člověk zvykne, snadno přehlédne, že má program nějaké nastavení.</p>

<p><b>Práce se oknky</b> – není moc zvykem zvětšovat okna přes celou obrazovku (asi protože to jednoduše moc nejde). Místo <i>maximalisace</i> jde okno zvětšit do fullscreenu.</p>

<p><b>Přichycení ke straně</b> – je nutné najet na ikonky vlevo u daného okna a vydržet chvíli s kursorem na zelené.</p>






<h3 id="tooltipy">Tooltipy</h3>

<p>Některé ikonky zobrazují popis své akce, jiné ne.</p>




<h3 id="update">Update systému</h3>

<p>Update <b>MacOS</b> může v závislosti na rychlosti internetu trvat hodně dlouho. I když predikuje <i>několik miniut</i>, může to trvat mnoho hodin.</p>




<h2 id="vyvoj">Vývoj</h2>

<p><a href="https://brew.sh">Homebrew</a></p>

<p>Node.js:</p>


<pre><code>brew update
brew install node
npm i npm -g
</code></pre>







<h2 id="ssh">Putty/SSH</h2>

<p>Ve Windows je běžné se ke vzdáleným serverům připojovat například přes Putty. V macOS jde k tomu použít vestavěný terminál.</p>


<p>Nejprve je třeba transformovat klíč z <code>*.ppk</code> formátu pomocí <code>puttygen</code>u. Nainstalovat jde přes:</p>

<pre><code>brew install putty</code></pre>

<p>Nyní už samotný převod a nastavení oprávnění:</p>

<pre><code>puttygen privatekey.ppk -O private-openssh -o privatekey.pem
chmod go-rw privatekey.pem</code></pre>

<p>A konečně připojení k vzdálenému serveru:</p>

<pre><code>ssh -i privatekey.pem uzivatel@hostname</code></pre>

<p>Připojit se jde i přes grafické rozhraní. Při otevřeném terminálu je v horním menu nabídka <i>Shell/Nové vzdálené připojení</i>.</p>














<h2 id="programy">Programy</h2>

<p><b>RAR</b> – <a href="https://apps.apple.com/cz/app/the-unarchiver/id425424353?l=cs&mt=12">The Unarchiver</a></p>

<h2 id="mac-book-pro">MacBook Pro 2019</h2>

<h3 id="baterie">Výdrž baterie</h3>

<p>Udávaná výdrž je asi 10 hodin. Mně se podařilo při standardní práci vydržet skoro <b>7 hodin</b>.</p>

<h3 id="tlacitko-vypnout">Tlačítko vypnout</h3>

<p>Původně jsem si myslel, že tímto tlačítkem notebook nedisponuje. Není tomu tak. Je zkombinované s tlačítkem pro Touch ID.</p>

<h2 id="nevyhody">Nevýhody</h2>

<p><b>MS Office</b> – Word, Excel i Outlook mají své verse pro MacOS. Bohužel tak dobře jako ve <b>Windows</b>.</p>
