---
title: "Změna vzhledu stránky"
headline: "Změna designu bez znovunačtení stránky"
description: "Jak snadno umožnit uživateli přepínat různé vzhledy stránky, tmavou/světlou variantu apod."
date: "2013-05-26"
last_modification: "2013-05-26"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení", "Přepínání vzhledu"]
---

Zásadní věc je, že styl se bude měnit pomocí CSS, kdy JavaScript [nastaví příslušnou třídu](/prepinani-trid).

function setDesign(designName) {
  document.body.className = designName;
}

Přebarvit záhlaví: Modrá
Šedivá
Červená
Zelená
Žlutá
Výchozí

  Různé **designy** budou buď ve zvláštních CSS souborech,
  nebo přímo v jednom a všechny selektory pro daný vzhled budou začínat **společnou třídou**.

## Změna třídy `&lt;body>`/`&lt;html>`

Asi nejjednodušší řešení – v jednou souboru budou styly pro všechny dostupné *designy*.
```
.cervena h1 {color: red}
.zelena h1 {color: green}
.modra h1 {color: blue}
```

A teď, když se JavaScriptem nastaví třída pro `&lt;body>` na `cervena`, budou všechny nadpisy na stránce červené.
```
function setDesign(designName) {
	document.body.className = designName;
}
```

```
&lt;button onclick='setDesign("cervena")'>Červená&lt;/button>
```

## Změna CSS souboru

Pokud by změna měla být komplexnější než pár barviček, nabízí se změnit celé CSS. To už ale nebude okamžité jako prohazování tříd (CSS soubor se musí načíst).

Stačí elementu `&lt;link>` přidat ID (nebo jej zaměřit přes jméno značky a číslo indexu (`getElementsByTagName`)) a podle toho měnit `element.href`.

```
&lt;link rel=stylesheet href="style.css" **id=css**>
&lt;script>
function changeCss(styleUrl) {
	document.getElementById("**css**").href = styleUrl;
	//document.getElementsByTagName("link")[1].href = styleUrl;
}
&lt;/script>
```

```
&lt;button onclick='changeCss("cervena.css")'>Červená&lt;/button>
```

function changeCss(styleUrl) {
	//document.getElementById("css").href = styleUrl;
	document.getElementsByTagName("link")[1].href = styleUrl;
}

Přepnout na DJPW CSS
  Přepnout na Je čas CSS

V případě, že další styly budou jen doplňující k původnímu, bude třeba je přidávat a nechat je se *přebíjet*.
```
function addCss(styleUrl) {
	var file = document.createElement("link");
	file.href = styleUrl;
	file.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(file);
}
```

```
&lt;button onclick='addCss("cervena.css")'>Červená&lt;/button>
```

function addCss(styleUrl) {
	var file = document.createElement("link");
	file.href = styleUrl;
	file.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(file);
}

Přidat DJPW CSS
Přidat Je čas CSS

## Ukládání a načítání

Aby vybrané téma *přežilo* přechod na další stránku, je zapotřebí nastavení někam uložit (cookie / [`localStorage`](/zalohovani-formularu#local-storage) / profil uživatele). A při načtení stránky hodnotu přečíst a podle ní CSS nastavit (ideálně na straně serveru).

.blue .header,
.blue a:hover {
    background-color: #0D5255
}

.blue .header__inner {
    background: #127378
}

.white .header,
.white a:hover {
    background-color: #666
}

.white .header__inner {
    background: #999
}

.green .header,
.green a:hover {
    background-color: #0C870F
}

.green .header__inner {
    background: #0EA912
}

.red .header,
.red a:hover {
    background-color: #A81C34
}

.red .header__inner {
    background: #CE2B2F
}

.yellow .header,
.yellow a:hover {
    background-color: #9F9F00;
}

.yellow .header a {
    color: #000;
}

.yellow .header__inner {
    background: #E6E600
}