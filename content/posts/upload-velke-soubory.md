---
title: "Upload velkých souborů v JS/PHP"
headline: "Upload obrovských souborů v JS/PHP"
description: "Jak umožnit návštěvníkům nahrát soubory jako videa v řádech MB/GB s progress barem."
date: "2016-04-20"
last_modification: "2016-05-02"
status: 1
tags: ["formulare", "hotova-reseni", "js", "php"]
format: "html"
---

<p>U některých typů webových aplikací je potřeba umožnit uživatelům nahrávat na server soubory (obrázky, videa a podobně).</p>



<p>Nahrát v PHP soubor velký několik stovek kB nebo jednotek MB není příliš složité – stačí k tomu formulář a funkce <a href="http://php.net/manual/en/function.move-uploaded-file.php"><code>move_uploaded_file</code></a>.</p>

<p>Co ale v případě, že požadované soubory mají <b>stovky megabytů nebo dokonce gigabyty</b>?</p>



<h2 id="demo">Demo</h2>


<p>Jen simulace (data se nikam neodesílají), ideální je nahrát soubor v řádu stovek MB:</p>

<div class="live no-source">
<div class="upload">
    <div id="upload" ondrop="runUpload(event)">
    	Přetáhněte sem soubor
    </div>
    <div class="upload-info">
        <div id="upload-fileinfo"></div>
	    <div id="upload-text"></div>
        <div id="upload-stav"></div>
	</div>
</div>
</div>

<p>Ke stažení:</p>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/rnxb">Samostatná ukázka</a></li>
    <li>Funkční JS/PHP řešení na <a href="https://github.com/Jahoda/upload">GitHubu</a></li>
  </ul>
</div>


<h2 id="limity">Zvýšení limitů v PHP</h2>


<p>Mimo sdílené hostingy jde hýbat s limity pro maximální velikost souborů.</p>

<p>Bohužel to má některé problémy:</p>

<ol>
  <li>Při selhání spojení se celý obsah zahodí a musí se přenášet znovu.</li>
  
  <li>Nezobrazuje se průběh nahrávání. (Jde řešit pomocí <a href="http://php.vrana.cz/zobrazeni-prubehu-uploadu-prakticky.php">APC</a>.)</li>
</ol>

<p>Cesta tedy vede jinudy.</p>



<h2 id="filereader">JS <code>FileReader</code></h2>

<p>Od <b>IE 10</b> prohlížeče podporují <code>FileReader</code>. Jedná se o JavaScriptovou třídu, která umí číst soubory přímo na straně klienta.</p>


<p>Při uploadu menších souborů jako jsou obrázky nebo text jde obsah zobrazit přímo na stránce, aniž by se musel odesílat na server.</p>


<div class="internal-content">
  <ul>
    <li><a href="/upload">Drag &amp; Drop upload obrázků</a></li>
  </ul>
</div>

<p>Teoreticky by tak šlo celé video zobrazit v prohlížeči před uploadem. V praxi je ale zobrazení velkého souboru velmi náročné na operační paměť.</p>





<h3 id="rozsekani">Rozsekání souborů</h3>

<p>Klíčová vlastnost pro nahrávání obrovských souborů je možnost jejich rozsekání.</p>




<pre><code>var reader = new FileReader();
reader.readAsDataURL(
  <b>soubor.slice</b>(zacatek, konec)
);</code></pre>








<p>Pomocí <code>slice</code>, jde ze souboru vzít libovolnou část a načíst ji jako <a href="/data-uri">data URL</a>.</p>

<pre><code>reader.onload = function (e) {
  var cast = e.target.result;
}</code></pre>







<p>V proměnné <code>cast</code> nyní po načtení bude část souboru, kterou jen stačí <a href="/ajax">AJAXem</a> odeslat na server a pomocí PHP uložit.</p>

<p>Na tomto principu je tedy třeba postavit rekursivní funkci, která projde celý soubor po stanovených blocích (třeba 1 MB) a všechno postupně odešle na server.</p>

<p>Je nutné zachovat pořadí odesílaných částí, takže je potřeba funkci rekursivně volat až v úspěšném callbacku z volání AJAXu.</p>

<p>Vzhledem k tomu, že je možné předem zjistit velikost souboru a velikost jednoho bloku je také známa, není problém na základě toho sestavit <b>znázornění průběhu odesílání</b>.</p>




<h3 id="spojeni">Spojení souborů</h3>

<p>Získání obsahu na straně PHP je velmi jednoduché. Nejprve je potřeba dekódovat data:</p>


<pre><code>$data = str_replace("data:;base64,", "", urldecode($_POST['data']));
$data = str_replace(' ', '+', $data);
$data = base64_decode($data);</code></pre>









<p>Nyní je stačí při každém spuštění skriptu připsat funkcí <code>file_put_contents</code>:</p>


<pre><code>file_put_contents(
  "data/" . $_POST['filename'], 
  $data, 
  <b>FILE_APPEND</b>
);</code></pre>








<p>Tímto způsobem jde i na sdíleném hostingu nahrávat velké soubory. Celý postup jde ale ještě vylepšit…</p>



<h2 id="vylepseni">Vylepšení</h2>


<h3 id="preruseni">Přerušení a navázání</h3>

<p>Pokud nahrávání selže, je zbytečné, aby již odeslaná data musel návštěvník nahrávat znovu. Řešení je kromě připisování do jednoho souboru ještě ukládat jednotlivé části a při úspěšném uložení poslat ze serveru odpověď s číslem poslední části.</p>


<pre><code>if (file_put_contents(
  "data/" . $_POST['filename'] . ".part" . $_POST['chunk'], 
  $data
)) {
  echo $_POST['chunk'];
}</code></pre>










<p>Na straně klienta se poslední část pro daný soubor může uložit do <a href="/localstorage"><code>localStorage</code></a>. Díky tomu nebude případně problém v odesílání souboru navázat tam, kde se minule skončilo.</p>



<h3 id="velikost-bloku">Ideální velikost dělení</h3>



<p>K úvaze je, jakou zvolit jednotku pro dělení souboru. Při nižším objemu získá návštěvník rychlejší odezvu a živější aktualisaci odeslaných procent.</p>

<p>Dále v případě selhání odesílání bude zahozeno menší množství dat.</p>


<p>Na druhou stranu nahrávání po hodně malých částech může způsobit zdržení kvůli odezvě serveru a připojení.</p>



<h3 id="rychlost">Zobrazení rychlosti</h3>

<p>Vzhledem k tomu, že je možné zaznamenat čas, kdy byla na server data odeslána, a čas, kdy byla uložena, a stejně tak je známa velikost bloku, dá se spočítat rychlost odesílání.</p>


<p>Podle rychlosti by potom případně šlo ovlivňovat velikost odesílaných bloků.</p>




<h3 id="readAsBinaryString">Metoda <code>readAsBinaryString</code></h3>

<p>Místo čtení dat metodou <code>readAsDataURL</code> by nejspíš bylo lepší použít <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString"><code>readAsBinaryString</code></a>. Podpora v prohlížečích je ale podle všeho horší (nefunguje v <b>IE</b>).</p>


<style>
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
</style>
<script>
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
    uploadFileInfo.innerHTML = file.name + "<br>";
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
        if (chunk <= chunks) {
        	loadFile(file);	        	
        }
        else {
            uploadText.innerHTML = "Hotovo";
            uploadText.style.background = "lightgreen";
        }
    };
    reader.readAsDataURL(file.slice(start, end));    
}  
</script>