---
title: "AJAX upload souborů"
headline: "Upload souborů bez obnovení stránky"
description: "Jak vytvořit <a href=\"/ajax\">ajaxové</a> nahrávání souborů na server bez obnovení stránky."
date: "2013-08-17"
last_modification: "2013-08-17"
status: 1
tags: ["JavaScript", "Hotová řešení", "Formuláře", "AJAX"]
---

Možné řešení je **uploadovací formulář** odeslat na zpracovávající skript do neviditelného `&lt;iframe&gt;`, soubor se nahraje a skript zavolá funkci z nadřazené stránky a předá jí výsledek snažení.

## Nahrávání bez refreshe

function uploadStatus(status) {
	document.getElementById("status").innerHTML = '' + status + '';
}

Po kliknutí na „Upload“ se soubor odešle do skrytého `&lt;iframe>`u na [skript](/files/upload-bez-refreshe/upload.html), který soubor zpracuje a zavolá funkci na této stránce s předaným parametrem (pro pochopení si zobrazte zdrojový kód).

  **Ukázka** (nic se nikam nenahrává)

### Soubor s formulářem

Funkce `uploadStatus` se bude volat ze stránky načtené v `&lt;iframe&gt;`u prostřednictvím `**window.top.window**.uploadStatus()`.

```
&lt;script>
function **uploadStatus**(status) {
	alert(status);
}
&lt;/script>
&lt;iframe id="frame" name="frame" src="" style="**display: none**">&lt;/iframe>

&lt;form action="upload.php" method="post" enctype="multipart/form-data" target="frame"> 
  &lt;input type="file" name="file"> 
  &lt;input type="submit" name="upload" value="Upload"> 
&lt;/form> 

```

### Soubor pro nahrávání `upload.php`

```
&lt;?php
// Vlastní nahrání souboru
$stav = "Hláška ze souboru, který uploaduje.";
?>
&lt;script> 
  window.top.window.**uploadStatus**("&lt;?php echo $stav ?>");
&lt;/script>

```

Vlastní **upload v PHP** může vypadat [nějak takto](http://php.net/manual/en/features.file-upload.post-method.php#example-354).

## Vypnutý JavaScript

Bude-li mít uživatel vypnutý JS, je toto řešení značně problematické — po odeslání do neviditelného rámu se zdánlivě *nic nestane*. 

  - V případě, že potřebujeme funkčnost i bez JS a není potřeba s výsledky uploadu ihned dále pracovat, může se výsledek vypsat přímo do rámu, který bude v takovém případě viditelný.

  - Je-li s výsledky potřeba pracovat, nezbývá než použít standardní odesílání.