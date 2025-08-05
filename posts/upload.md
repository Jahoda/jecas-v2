---
title: "Drag & Drop upload obrázků"
headline: "Drag & Drop upload obrázků"
description: "Všechny možnosti nahrávání obrázků ze schránky a pomocí drag &amp; drop."
date: "2014-11-02"
last_modification: "2015-09-03"
status: 1
tags: ["hotova-reseni", "js", "obrazky"]
format: "html"
---

<p>Pro <b>maximální pohodlí návštěvníka</b> při nahrávání obrázků na web existuje řada postupů, které fungují v různých prohlížečích.</p>


<p class="soft">Ukázka maximálních možností uploadu běží na: <a href="http://img.djpw.cz">img.djpw.cz</a></p>


<h2 id="schranka">Vložení ze schránky</h2>

<p>Příjemná funkce je <b>vložení obrázku ze schránky</b>. Zde se situace lehce komplikuje, neboť mohou nastat dva případy vložení.</p>

<ol>
  <li>
    <p>Uživatel <b>zkopíruje celý soubor</b>. Buď přes <i>kontextové menu</i>, nebo například klávesovou zkratkou <kbd>Ctrl</kbd> + <kbd>C</kbd>.</p>
    
    <p><img src="/files/upload/kopirovani-souboru.png" alt="Kopírování souboru do schránky" class="border"></p>
  </li>
  
  
  
  
  
  
  <li>Uživatel <b>zkopíruje kus (výřez) obrázku</b> do schránky. To může nastat v <b>grafickém editoru</b>, také po vyfocení obrazovky klávesou <kbd>PrintScreen</kbd> (či jen aktivního okna – <kbd>Alt</kbd> + <kbd>PrintScreen</kbd>) nebo třeba v prohlížeči po vybrání volby <i>Kopírovat obrázek</i> z kontextového menu.</li>
  
      
  <p><img src="/files/upload/kopirovani-obrazku.png" alt="Kopírování obrázku do schránky" class="border"></p>
</ol>









<h3 id="contenteditable">Využití <code>contenteditable</code></h3>

<p>Ve <b>Firefoxu</b> a <b>IE 11</b> je možné využít toho, že tyto prohlížeče umí (například) <b>screenshot obrazovky</b> vložit jako obrázek do elementu s <code>contenteditable</code>/<code>designMode</code> (tak si je možné vytvořit i <a href="/vlastni-wysiwyg">vlastní WYSIWYG edtior</a>).</p>

<p><b>Firefox</b> takto umí dokonce i vkládat zkopírované soubory.</p>


<p><a href="http://kod.djpw.cz/rchb">Živá ukázka</a> – vložení obrázku ze schránky do <code>contenteditable</code></p>

<p>Jinde to ale nefunguje. Ve staré <b>Opeře 12</b> a starších <b>IE</b> není možnost obrázek ze schránky vložit (jen s využitím HTML a JS) v jakékoliv podobě bez použití nějakých <b>pluginů</b> v Javě nebo Flashi.</p>

<p>V <b>Chrome</b> jde použít <code>clipboardData</code>.</p>

<p><a href="http://kod.djpw.cz/ovpb">Živá ukázka</a> – získání souboru z <code>clipboardData</code></p>





<h2 id="drag-drop">Drag &amp; Drop souborů</h2>

<p>Kromě vložení přes <kbd>Ctrl</kbd> + <kbd>V</kbd> se může hodit i nahrání souboru jeho přetažením na stránku.</p>

<p>V <b>Chrome</b>, <b>nové Opeře</b> a <b>Firefoxu</b> jde soubor přesunout přímo na <a href="/input#type-file"><code>&lt;input type="file"></code></a> bez nutnosti dalšího programování. <b>Internet Explorer</b> ani <a href="/microsoft-edge"><b>MS Edge</b></a> toto neumí.</p>

<p>Jelikož je ale dobré mít uploadování funkční i v <b>IE</b> a navíc se hodí mít pro přesun souborů vyhrazenou větší plochu, která bude po přetažení navíc signalisovat možnost <b>tažený soubor upustit</b>, je řešení pomocí <code>&lt;input type="file"></code> celkem nedostatečné.</p>

<p>Nejdříve je nutné zablokovat výchozí akci prohlížeče při <b>přetáhnutí souboru</b>, což někde způsobí nežádoucí přechod na obrázek. Slouží k tomu drag &amp; drop událostí:</p>

<pre><code>function prevent(e) {
    e = e || event;
    e.preventDefault();
}
window.addEventListener("dragover", prevent, false);
window.addEventListener("drop", prevent, false);</code></pre>










<p>Přetažený soubor (nebo soubory) se získají z <code>event.dataTransfer.files</code> při události <code>ondrop</code> (upuštění obrázku).</p>

<p><a href="http://kod.djpw.cz/cchb">Živá ukázka</a> – výpis přetažených souborů</p>





<h2 id="zvyrazneni">Zvýraznění při přesouvání</h2>

<p>Aby uživatel poznal, že stránka na přesouvání souboru reaguje, použijí se příslušné <a href="/udalosti-mysi#drag-drop">drag &amp; drop události myši</a>.</p>

<p><img src="/files/upload/zvyrazneni-drag-drop.gif" alt="Zvýraznění drag and drop" class="border"></p>

















<ul>
  <li><code>ondragenter</code> – uživatel najel se souborem na oblast (provést zvýraznění)</li>
  <li><code>ondragleave</code> – uživatel najel se souborem na oblast (zrušit zvýraznění)</li>
  <li><code>ondrop</code> – uživatel soubor v dané oblasti <i>pustil</i></li>
</ul>


<h2 id="zobrazeni-souboru">Zobrazení souboru</h2>


<p>Když člověk vybere soubor (je jedno, jestli přesunutím na <code>&lt;input type="file"></code> nebo po kliknutí na tlačítko <i>Vybrat</i>) či použije přetažení myší, je dobré obsah obrázku <b>ihned zobrazit</b>.</p>



<p>Kromě toho, že návštěvník získá jistotu, že vybral správný obrázek a uvidí ho prakticky ihned, lze nabídnout i nějaké základní <b>funkce pro práci s obrázky</b>:</p>

<ul>
  <li>změnu velikosti,</li>
  <li>oříznutí,</li>
  <li>otočení/převrácení</li>
  
</ul>



<p>To lze v dnešních prohlížečích řešit <b>na straně klienta</b> bez nutnosti přenášet data na server. Zvlášť výhodné je to u zmenšování obrázků, což je výborné i pro uživatele, neboť nemusí třeba X megabytový soubor vůbec <b>nikam přenášet</b>, ale nahraje se jen jeho zmenšenina.</p>

<p>Slouží k tomu <i>FileReader</i>:</p>





<h3 id="filereader"><code>FileReader</code></h3>

<p>Řešení pomocí <code>FileReader</code> funguje od <b>IE 10</b>. Pro vložení souboru jako obrázku na stránku je potřeba z původního souboru udělat <a href="/data-uri">data URL</a>, která se nastaví jako <code>src</code> pro <code>&lt;img></code> (popř. se následně tento obrázek může nakreslit do <a href="/canvas"><code>&lt;canvas></code>u</a>). Převod na <i>data URL</i> řeší metoda <code>readAsDataURL</code>, které se jako argument předá soubor získaný z políčka pro <b>nahrávání souborů</b> nebo pomocí <code>dataTransfer</code> při přesunutí souboru do stránky pomocí drag&amp;dropu.</p>


<p>FileReader se používá velmi jednoduše:</p>

<pre><code>var reader = new FileReader();
reader.onload = function (e) {
  <i>obrazek</i>.src = e.target.result;
};
reader.readAsDataURL(<b>soubor</b>);</code></pre>






<ul>
  <li>Proměnná <code>obrazek</code> je <code>&lt;img></code> značka na stránce, kde se obrázek objeví.</li>
  <li>Proměnná <code>soubor</code> obsahuje soubor získaný přes <code>dataTransfer.files</code> / <code>input.files</code>.</li>  
</ul>

<p>Za povšimnutí stojí konstrukce <code>reader.onload</code>, která se spustí po dokončení <code>readAsDataURL</code>.</p>


<h3 id="fr-drop">Zobrazení přetaženého souboru</h3>

<p>Hotové řešení zobrazení obrázku po drag &amp; drop může vypadat následovně:</p>

<p><a href="http://kod.djpw.cz/gchb">Živá ukázka</a> – zobrazení obrázku před uploadem</p>


<h3 id="input">Zobrazení souboru z <code>&lt;input></code>u</h3>

<p>V případě políčka <code>&lt;input></code> se celý proces náhledu nabízí volat při změně (<code>onchange</code>) nahrávacího <code>&lt;input></code>u.</p>

<pre><code>&lt;input type="file" onchange="zobrazit(this)"></code></pre>


<p>Funkci <code>zobrazit</code> se předává nahrávací políčko (<code>this</code>) právě kvůli následnému získání souboru z <code>input.files</code>.</p>

<p><a href="http://kod.djpw.cz/tbhb">Živá ukázka</a> – okamžitého zobrazení obrázku z <code>&lt;input type="file"></code></p>


<h3 id="multiple">Více souborů najednou</h3>

<p>Pro upload více souborů existuje HTML atribut <code>multiple</code>. V takovém případě bude záhodno zobrazit náhledy všech souborů. Počet souborů se zjistí z <code>input.files.length</code>. Potom stačí soubory projít <a href="/js-cykly">běžným cyklem <code>for</code></a> a místo nuly na místě indexu použít index každého jednoho souboru.</p>

<p><a href="http://kod.djpw.cz/xbhb">Živá ukázka</a> – zobrazení více souboru z <code>multiple</code> upload políčka.</p>

<p>Zobrazení více (datově větších) souborů <b>zabere nějaký čas</b>. Tudíž by bylo dobré dát uživateli vědět, že se něco děje.</p>



<h3 id="canvas">Kreslení do <code>&lt;canvas></code>u</h3>

<p>Překreslit obrázek do elementu <code>&lt;canvas></code> jde metodou <code>drawImage</code>. Nejdříve se v HTML kódu připraví <i>plátno</i> (<code>&lt;canvas></code>).</p>

<pre><code>&lt;canvas id="<b>cc</b>">&lt;/canvas></code></pre>


<p>Do pomocných proměnných se přidá odkaz na <code>&lt;canvas></code> a jeho <i>2D kontext</i>.</p>

<pre><code>var canvas = document.getElementById("<b>cc</b>");
var ctx = canvas.getContext("2d");</code></pre>



<p>A do funkce prováděné při <code>reader.onload</code> se pár řádky <b>nakreslí na plátno obrázek</b>. Může se hodit i nastavit <code>&lt;canvas></code>u rozměry podle obrázku.</p>

<pre><code>canvas.width = obrazek.width;
canvas.height = obrazek.height;
ctx.<b>drawImage</b>(obrazek, 0, 0);</code></pre>






<p>Druhý a třetí parametr funkce <code>drawImage</code> <b>určuje souřadnice</b>, kam se má obrázek nakreslit – cílem je ho umístit hned do levého horního rohu, proto ty dvě nuly. Proměnná <code>obrazek</code> je <code>&lt;img></code> element.</p>


<p><a href="http://kod.djpw.cz/ubhb">Živá ukázka</a> – překreslení obrázku do <code>&lt;canvas></code>u</p>


<p>Kvůli <b>IE</b> musí obrázek na stránce skutečně existovat (být přidán do <a href="/dom">DOMu</a>), byť třeba skrytý.</p>

<pre><code>var obrazek = new Image();
obrazek.src = e.target.result;</code></pre>

<p>Tato elegantnější konstrukce proto nebude v <b>IE</b> fungovat (<a href="http://kod.djpw.cz/vbhb">ukázka</a>).</p>



<h3 id="zobrazeni-text">Zobrazení textu před uploadem</h3>

<p>Také textový soubor je možné před samotným nahráváním zobrazit.</p>

<p>Místo metody <code>readAsDataURL</code> k tomu slouží <b>přečtení souboru jako text</b> – <code>readAs<b>Text</b></code> a výsledek se nastaví jako <a href="/innerhtml"><code>innerHTML</code></a> nějakého elementu.</p>

<p><a href="http://kod.djpw.cz/ybhb">Živá ukázka</a></p>




<h2 id="starsi-prohlizece">Starší prohlížeče</h2>

<p>V <b>IE 9</b> a starších není možné použít <code>FileReader</code>. Pro zobrazení náhledu tak nezbývá než soubor <b>nahrát na server</b> a až ten zobrazit. Případně použít nějaký plugin ve Flashi nebo Javě.</p>

<p>Údajně by ve starších <b>IE</b> mohlo fungovat <a href="http://forums.asp.net/t/1320559.aspx">tohle</a> – <a href="http://kod.djpw.cz/wbhb">ukázka</a> – v <b>IE 9</b> to ale funkčně nevypadá.</p>


<h2 id="upload">Upload souboru</h2>

<p>Samotný proces <b>nahrání souboru na server</b> proběhne například odesláním <a href="/ajax">AJAXového</a> požadavku. Jako data se odešle <i>data URL</i>.</p>

<p>Obsah <code>&lt;canvas></code>u se získá prostým <code>canvas.toDataURL()</code>.</p>

<pre><code>var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    alert(xhr.responseText); // výstup PHP skriptu
  }
}
xhr.open("POST", "upload.php");
xhr.setRequestHeader(
  "Content-type", 
  "application/x-www-form-urlencoded"
);
xhr.send("data=" + canvas.toDataURL());
</code></pre>

<p>PHP skript <code>upload.php</code>, který tento obsah <b>uložit do souboru</b> může vypadat takto:</p>

<pre><code>if (isset($_POST["data"])) {
  $img = $_POST["data"];
  $img = str_replace('data:image/png;base64,', '', $img);
  $img = str_replace(' ', '+', $img);
  $data = base64_decode($img);
  $filename = time() . ".png";
  file_put_contents($filename, $data);
  echo $filename;
}
else {
  echo "Error";
}</code></pre>


<ul>
  <li>
    <p>Při ukládání souborů je v praxi dobré zajistit, aby nemohlo vzniknout <a href="/slozka-hodne-souboru">hodně souborů v rámci jedné složky</a>.</p></li>
    
  <li><p>Taktéž určování názvu souboru podle <i>timestampu</i> (času požadavku na uložení) nebude v případě používání uploadu více uživateli ideální. Mohli by si navzájem obrázky <b>přepisovat</b>.</p></li>
    
  <li><p>Lepší postup je o obrázcích ukládat <b>záznam v databási</b> a fysický obrázek na serveru pojmenovat až na základě identifikátoru v DB (popř. nějakým hashem).</p>
  </li>
  
  <li>
    <p>Skript natvrdo ukládá obrázky jako PNG. To v případě například fotek nebude s ohledem na <b>datovou velikost</b> optimální formát.</p>
  </li>
</ul>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://img.djpw.cz">img.djpw.cz</a> – můj nahrávač souborů obsahující všechny popsané postupy</li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer">DataTransfer</a></li>
  
  <li><a href="http://stackoverflow.com/questions/18377891/how-can-i-let-user-paste-image-data-from-the-clipboard-into-a-canvas-element-in">Odchycení vložení obrázku ze schránky</a> (<a href="http://jsfiddle.net/KJW4E/2/">ukázka</a>)</li>
  
  <li>PHP triky: <a href="http://php.vrana.cz/ukladani-souboru-od-uzivatele.php">Ukládání souborů od uživatele</a></li>
  
  <li>Medio Blog: <a href="http://blog.medio.cz/jak-ukladame-obrazky">Jak ukládáme obrázky</a></li>
  
  <li>The New Code: <a href="http://thenewcode.com/42/Upload-and-Upgrade-The-HTML-File-Form-Input">Upload and Upgrade: The HTML File Form Input</a></li>
</ul>