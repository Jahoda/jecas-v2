---
title: "Upload velkých souborů v JS/PHP"
headline: "Upload obrovských souborů v JS/PHP"
description: "Jak umožnit návštěvníkům nahrát soubory jako videa v řádech MB/GB s progress barem."
date: "2016-04-20"
last_modification: "2016-05-02"
status: 1
tags: ["JavaScript", "Hotová řešení", "Formuláře", "PHP"]
---

U některých typů webových aplikací je potřeba umožnit uživatelům nahrávat na server soubory (obrázky, videa a podobně).

Nahrát v PHP soubor velký několik stovek kB nebo jednotek MB není příliš složité – stačí k tomu formulář a funkce [`move_uploaded_file`](http://php.net/manual/en/function.move-uploaded-file.php).

Co ale v případě, že požadované soubory mají **stovky megabytů nebo dokonce gigabyty**?

## Demo

Jen simulace (data se nikam neodesílají), ideální je nahrát soubor v řádu stovek MB:

    	Přetáhněte sem soubor

Ke stažení:

    - [Samostatná ukázka](http://kod.djpw.cz/rnxb)

    - Funkční JS/PHP řešení na [GitHubu](https://github.com/Jahoda/upload)

## Zvýšení limitů v PHP

Mimo sdílené hostingy jde hýbat s limity pro maximální velikost souborů.

Bohužel to má některé problémy:

  - Při selhání spojení se celý obsah zahodí a musí se přenášet znovu.

  - Nezobrazuje se průběh nahrávání. (Jde řešit pomocí [APC](http://php.vrana.cz/zobrazeni-prubehu-uploadu-prakticky.php).)

Cesta tedy vede jinudy.

## JS `FileReader`

Od **IE 10** prohlížeče podporují `FileReader`. Jedná se o JavaScriptovou třídu, která umí číst soubory přímo na straně klienta.

Při uploadu menších souborů jako jsou obrázky nebo text jde obsah zobrazit přímo na stránce, aniž by se musel odesílat na server.

    - [Drag &amp; Drop upload obrázků](/upload)

Teoreticky by tak šlo celé video zobrazit v prohlížeči před uploadem. V praxi je ale zobrazení velkého souboru velmi náročné na operační paměť.

### Rozsekání souborů

Klíčová vlastnost pro nahrávání obrovských souborů je možnost jejich rozsekání.

```
var reader = new FileReader();
reader.readAsDataURL(
  **soubor.slice**(zacatek, konec)
);
```

Pomocí `slice`, jde ze souboru vzít libovolnou část a načíst ji jako [data URL](/data-uri).

```
reader.onload = function (e) {
  var cast = e.target.result;
}
```

V proměnné `cast` nyní po načtení bude část souboru, kterou jen stačí [AJAXem](/ajax) odeslat na server a pomocí PHP uložit.

Na tomto principu je tedy třeba postavit rekursivní funkci, která projde celý soubor po stanovených blocích (třeba 1 MB) a všechno postupně odešle na server.

Je nutné zachovat pořadí odesílaných částí, takže je potřeba funkci rekursivně volat až v úspěšném callbacku z volání AJAXu.

Vzhledem k tomu, že je možné předem zjistit velikost souboru a velikost jednoho bloku je také známa, není problém na základě toho sestavit **znázornění průběhu odesílání**.

### Spojení souborů

Získání obsahu na straně PHP je velmi jednoduché. Nejprve je potřeba dekódovat data:

```
$data = str_replace("data:;base64,", "", urldecode($_POST['data']));
$data = str_replace(' ', '+', $data);
$data = base64_decode($data);
```

Nyní je stačí při každém spuštění skriptu připsat funkcí `file_put_contents`:

```
file_put_contents(
  "data/" . $_POST['filename'], 
  $data, 
  **FILE_APPEND**
);
```

Tímto způsobem jde i na sdíleném hostingu nahrávat velké soubory. Celý postup jde ale ještě vylepšit…

## Vylepšení

### Přerušení a navázání

Pokud nahrávání selže, je zbytečné, aby již odeslaná data musel návštěvník nahrávat znovu. Řešení je kromě připisování do jednoho souboru ještě ukládat jednotlivé části a při úspěšném uložení poslat ze serveru odpověď s číslem poslední části.

```
if (file_put_contents(
  "data/" . $_POST['filename'] . ".part" . $_POST['chunk'], 
  $data
)) {
  echo $_POST['chunk'];
}
```

Na straně klienta se poslední část pro daný soubor může uložit do [`localStorage`](/localstorage). Díky tomu nebude případně problém v odesílání souboru navázat tam, kde se minule skončilo.

### Ideální velikost dělení

K úvaze je, jakou zvolit jednotku pro dělení souboru. Při nižším objemu získá návštěvník rychlejší odezvu a živější aktualisaci odeslaných procent.

Dále v případě selhání odesílání bude zahozeno menší množství dat.

Na druhou stranu nahrávání po hodně malých částech může způsobit zdržení kvůli odezvě serveru a připojení.

### Zobrazení rychlosti

Vzhledem k tomu, že je možné zaznamenat čas, kdy byla na server data odeslána, a čas, kdy byla uložena, a stejně tak je známa velikost bloku, dá se spočítat rychlost odesílání.

Podle rychlosti by potom případně šlo ovlivňovat velikost odesílaných bloků.

### Metoda `readAsBinaryString`

Místo čtení dat metodou `readAsDataURL` by nejspíš bylo lepší použít [`readAsBinaryString`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString). Podpora v prohlížečích je ale podle všeho horší (nefunguje v **IE**).

.upload {
    background: #fff;
}
#upload {
    line-height: 150px;
    text-align: center;
    font-size: 200%;
}
#upload-stav {
	background: #1081DD;
	height: 1em;
	width: 0;
	transition: .2s width;
	position: absolute;
	bottom: 0;
}
.upload-info {
    position: relative;
}
#upload-text,
#upload-fileinfo {
    text-align: center;
    position: relative;
    z-index: 1;
}

function prevent(e) {
    e = e || event;
    e.preventDefault();
}

window.addEventListener("dragover", prevent, false);
window.addEventListener("drop", prevent, false);

var chunk = 0;
var uploadStav = document.getElementById("upload-stav");
var uploadText = document.getElementById("upload-text");
var uploadFileInfo = document.getElementById("upload-fileinfo");
  
function runUpload(e) {
    var files = e.dataTransfer.files;
    file = files[0];
    uploadFileInfo.innerHTML = file.name + "
";
    uploadFileInfo.innerHTML+= Math.round(file.size / 1000 / 1000) + " MB";
    chunk = 0;
    uploadText.innerHTML = "";
    uploadText.style.background = "";
    loadFile(file);
}

function loadFile(file) {
	var chunkSize = 1000 * 1000; // Velikost jedné části
	var chunks = Math.ceil(file.size / chunkSize);
    var reader = new FileReader();

	var start, end;
    start = chunk * chunkSize;
    if (start > file.size) {
        start = end + 1;
    }
    end = start + (chunkSize) >= file.size ? file.size : start + (chunkSize);

    reader.onload = function (e) {
    	// Ve sliceData je část souboru k odeslání AJAXem na server
    	var sliceData = e.target.result;
    	
    	// Jen výpis obsahu do stránky, že to funguje
    	uploadStav.style.width = chunk / chunks * 100  + "%";
    	uploadText.innerHTML = Math.round(chunk / chunks * 100)  + " %";

        chunk++;
        if (chunk