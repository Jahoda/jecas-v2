---
title: "Přechod z Windows na Mac"
headline: "Přechod z Windows na Mac"
description: ""
date: "2019-11-22"
last_modification: "2019-11-22"
status: 0
tags: []
---

## Klávesové zkratky

Alt + Tab = Command Tab

⊞ Win = ⌘ + Mezerník – vyhledávání v aplikacích, souborech atd.

Delete = fn + Delete 

Alt + F4 = ⌘ command + Q – zavře okno

## Myš

Při připojení klasické myši s kolečkem je směr rolování převrácen oproti Windows.

Systém to nazývá *přirozeným směrem posuvu*.

Změnit to jde v *Předvolby systému &gt; Myš*.

Bohužel toto nastavení nejde odlišit od nastavení trackpadu, kde se naopak „přirozený“ směr hodí.

Řešení je aplikace [Scroll Reverser](https://github.com/pilotmoon/Scroll-Reverser/releases).

### Screenshoty

⌘ + Shift + 3 – screen celé obrazovky

⌘ + Shift + 4 – výstřižek

⌘ + Shift + 5 – zobrazení nástroje pro screenshoty (hodí se k vyfocení okna)

Při stisknutí klávesy Ctrl navíc se screenshot uloží do schránky.

## Jak napsat

  - české uvozovky „“ – ⌥ option + Shift + N a option + Shift + H

    - nedělitelná mezera – ⌥ option + Mezerník

      - trojtečka … – ⌥ option + shift + ů

  - pomlčka – ⌥ option + -

## Příkazová řádka / terminál

Vyhledat „Terminál“

## Průzkumník / Finder

Obdoba *Průzkumníku* ve Windows se jmenuje **Finder**.

Zásadně jiná je navigace napříč úrovněmi složek. Třeba možnost, jak se dostat **o adresář výš**, je řádně ukrytá.

Docílit toho jde kliknutím pravého tlačítka na záhlaví okna (jméno aktuální složky) nebo klávesovou zkratkou ⌘ command + ↑.

### Zobrazení skrytých souborů

Systém před uživatelem tají některé soubory a složky. Odkrýt je ve *Finderu* jde těmito příkazy v terminálu:

```
defaults write com.apple.Finder AppleShowAllFiles true
killall Finder
```

## Správce úloh

Pro násilné ukončení zaseknuté aplikace existuje ekvivalent Ctrl + Alt + Delete. Slouží k tomu zkratka ⌘ command + ⌥ option + esc.

Druhá možnost je vybrat položku *Vynutit ukončení…* v  Apple menu (ikona vlevo nahoře).

Pro zobrazení vytížení prostředků slouží aplikace *Monitor aktivity*. Nejjednodušší je ho vyhledat ve *Spotlightu* (zkratka ⌘ + Mezerník) nebo ve *Finderu* pod *Aplikace &gt; Utitlity*.

## Ovládání

Oproti **Windows** je dost nezvyk umístění menu dané aplikace vždy do horní společné lišty. Než si na to člověk zvykne, snadno přehlédne, že má program nějaké nastavení.

**Práce se oknky** – není moc zvykem zvětšovat okna přes celou obrazovku (asi protože to jednoduše moc nejde). Místo *maximalisace* jde okno zvětšit do fullscreenu.

**Přichycení ke straně** – je nutné najet na ikonky vlevo u daného okna a vydržet chvíli s kursorem na zelené.

### Tooltipy

Některé ikonky zobrazují popis své akce, jiné ne.

### Update systému

Update **MacOS** může v závislosti na rychlosti internetu trvat hodně dlouho. I když predikuje *několik miniut*, může to trvat mnoho hodin.

## Vývoj

[Homebrew](https://brew.sh)

Node.js:

```
brew update
brew install node
npm i npm -g

```

## Putty/SSH

Ve Windows je běžné se ke vzdáleným serverům připojovat například přes Putty. V macOS jde k tomu použít vestavěný terminál.

Nejprve je třeba transformovat klíč z `*.ppk` formátu pomocí `puttygen`u. Nainstalovat jde přes:

```
brew install putty
```

Nyní už samotný převod a nastavení oprávnění:

```
puttygen privatekey.ppk -O private-openssh -o privatekey.pem
chmod go-rw privatekey.pem
```

A konečně připojení k vzdálenému serveru:

```
ssh -i privatekey.pem uzivatel@hostname
```

Připojit se jde i přes grafické rozhraní. Při otevřeném terminálu je v horním menu nabídka *Shell/Nové vzdálené připojení*.

## Programy

**RAR** – [The Unarchiver](https://apps.apple.com/cz/app/the-unarchiver/id425424353?l=cs&mt=12)

## MacBook Pro 2019

### Výdrž baterie

Udávaná výdrž je asi 10 hodin. Mně se podařilo při standardní práci vydržet skoro **7 hodin**.

### Tlačítko vypnout

Původně jsem si myslel, že tímto tlačítkem notebook nedisponuje. Není tomu tak. Je zkombinované s tlačítkem pro Touch ID.

## Nevýhody

**MS Office** – Word, Excel i Outlook mají své verse pro MacOS. Bohužel tak dobře jako ve **Windows**.