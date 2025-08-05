---
title: "Nastavení rozměrů responsivního obrázku"
headline: "Nastavení výšky responsivního obrázku"
description: "Jak zabránit poskakování responsivních obrázků během načítání stránky."
date: "2015-07-25"
last_modification: "2015-08-19"
status: 1
tags: ["hotova-reseni", "obrazky", "responsive"]
format: "html"
---

<p>Nejsnazší řešení <a href="/responsivni-obrazky">responsivních obrázků</a> je nastavení maximální šířky <code>&lt;img></code> na 100 % a nastavení výšky na <code>auto</code>, aby se <b>dopočítala podle šířky</b>.</p>

<pre><code>img {
  max-width: 100%; 
  height: auto;
}</code></pre>





<p>Obrázky se potom sice hezky přizpůsobují velikosti okna, ale trpí zásadním nedostatkem – <b>prohlížeč nezná výšku, dokud obrázek nestáhne</b>. To způsobuje nepěkné <b>poskakování stránky během načítání</b>, které navíc zdržuje vykreslování.</p>

<p>Prohlížeč zkrátka neví, kolik místa má pro obrázek vyhradit.</p>

<p><img src="/files/rozmery-responsivniho-obrazku/nacitani.gif" alt="Odsunutí textu během načítání" class="border"></p>















<p>Naštěstí existuje následující řešení:</p>

<div class="internal-content">
  <ul>
    <li><a href="/vyska-podle-sirky">Výška závislá na šířce</a> – způsob, jak nastavit výšku jako procento z šířky</li>
  </ul>
</div>

<p>Využívá se toho, že <code>padding</code> se počítá z šířky elementu a v případě výchozího „obsahového“ <a href="/box-sizing">box modelu</a> (<code>box-sizing: border-box</code>) se do rozměrů sčítá <code>padding</code> s výškou. Pokud tedy bude <code>height</code> nulová, bude celkovou výšku určovat hodnota <code>padding</code>u.</p>


<h2 id="reseni">Řešení</h2>

<p>Pro nastavení výšky obrázku v závislosti na proměnlivé šířce je tak nutné <b>nastavit poměr stran</b> jako <code>padding</code>.</p>

<p>Dopočítat potřebný poměr jde snadno <b>vydělením výšky obrázku jeho šířkou</b> a převedením na procenta (vynásobit stem).  Níže v článku je přímo generátor kódu, který po zadání URL obrázku připraví potřebné CSS.</p>




<h3 id="css">Realisace v CSS</h3>

<p>V CSS je postup takový, že se pro obrázek vytvoří kontejner (obal), který vymezí prostor na šířku a na výšku, což zabrání poskakování, a do tohoto obalu se vloží samotná značka <code>&lt;img></code>.</p>

<p>HTML kód:</p>

<pre><code>&lt;div class="img-cover">
  &lt;img src="">
&lt;/div></code></pre>





<p>Element <code>.img-cover</code> bude mít nastaven požadovaný poměr stran (v tomto případě 75 %):</p>

<pre><code>.img-cover {
    height: 0;
    padding-bottom: 75%;
}</code></pre>






<p>Obrázek se potom pouze roztáhne podle tohoto obalu:</p>

<pre><code>.img-cover img {
  width: 100%;
}</code></pre>




<p>V případě, že bude dostupná šířka pro <code>.img-cover</code> větší než skutečná šířka obrázku, bude obrázek <b>roztažen nad své rozměry</b>.</p>


<p>Je-li to nežádoucí, je potřeba všechno obalit do dalšího <code>&lt;div></code>u:</p>


<pre><code>&lt;div class="img">
  &lt;div class="img-cover">
    &lt;img src="">
  &lt;/div>
&lt;/div></code></pre>




  
<p>Tento obal <code>.img</code> bude mít nastavenou maximální šířku (<code>max-widht</code>). Odsazení (<code>padding</code>) elementu <code>.img-cover</code>, které ve finále stanovuje výšku, se totiž počítá z šířky svého rodiče.</p>


<form class="live no-source" oninput="generateCode(this)" id="ratio-generator">
  <p><b>Generátor CSS kódu pro přepočet rozměrů v px na procenta:</b></p>
  
  <p><label>Načíst obrázek z URL: <input type="url" onpaste="loadImage(this)" onkeyup="loadImage(this)" onchange="loadImage(this)" onclick="this.select()"></label></p>
  <div id="img-area"></div>
  
  <p>
    <label>Šířka: <input type="text" name="width" value="100"></label>
  </p>
  <p>
    <label>Výška: <input type="text" name="height" value="75"></label>
  </p>  

  <p>
    <label><input type="checkbox" name="maxwidth" onchange="generateCode(this.form)"> Nastavit maximální šířku</label>
  </p>
  
  <pre><code id="img-code">.img-cover {height: 0; padding-bottom: 75%}
.img-cover img {width: 100%; height: auto}</code></pre>
</form>


<h2 id="ruzne-rozmery">Obrázky s různými rozměry</h2>

<p>Problém nastane, když je na stránce hromada obrázků s <b>různými rozměry</b>. Potom by ruční počítání poměru výšky a šířky každého z nich bylo značně pracné.</p>




<h3 id="server">Řešení na straně serveru</h3>

<p>V případě, že na straně serveru existuje nějaký mechanismus, který obrázkům dokáže nastavovat rozměry, může rovnou dopočítat i poměr s maximální šířkou a přidat tato pravidla do <code>style</code> atributu.</p>

<pre><code>&lt;div class="img" <i>style="max-width: 200px"</i>>
  &lt;div class="img-cover" <b>style="padding-bottom: 75%"</b>>
    &lt;img width="200" height="150">
  &lt;/div>
&lt;/div></code></pre>







<p>Výše uvedený kód počítá s CSS pravidly:</p>

<pre><code>.img-cover {height: 0}
.img-cover img {width: 100%; height: auto}</code></pre>



<p>V budoucnu je možné, že by rozměr z atributů mohl jít získat přes <code>attr</code> a dopočítat <a href="/calc">funkcí <code>calc</code></a>. Momentálně ale <code>attr</code> funguje pouze u vlastnosti <a href="/content-attr"><code>content</code></a>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/tbpb">Živá ukázka</a> vygenerovaného kódu kolem obrázků</li>
  </ul>
</div>


<h3 id="js">Řešení v JavaScriptu</h3>

<p>Použít k nastavení rozměrů JS je spíš nouzové řešení, protože některé obrázky se mohou <b>začít načítat dříve</b>, než se stihne spustit skript nastavující rozměry.</p>



<p>Dále řešení v JavaScriptu přichází pouze v úvahu, když obrázky už mají nastaveny rozměry v HTML atributech <code>width</code> a <code>height</code>. JS sice umí <a href="/skutecne-rozmery-obrazku">zjistit skutečné rozměry obrázku</a>, potřebuje ho ale k tomu <b>nejprve načíst</b>, což je v tomto případě problém.</p>

<p>JS tedy projde obrázky na stránce (<code>document.images</code>) a obalí je do elementů <b>zabírající prostor o rozměrech obrázku</b>.</p>

<p>Aby bylo poskakování co nejmenší, měl by se tento kód spustit na stránce co nejdříve.</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/sbpb">Živá ukázka</a> – vytvoření placeholderů pro responsivní obrázky</li>
  </ul>
</div>

<h2 id="otestovat">Netrpí poskakováním můj web?</h2>

<p>Nejlepší způsob, jak zjistit, jestli tímto problémem web netrpí, je vypnutí/zakázání obrázků.</p>

<p>V <b>Chrome</b> je toto nastavení pod <code>chrome://settings/content</code>.</p>

<p>Všimnout si poskakování stránky jde i při nastavení velmi pomalého připojení ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a>.</p>

<p>Bez <b>vypínání obrázků</b> v prohlížeči si jde pomoci krátkým JavaScriptem, který všechny obrázky na stránce nahradí 1px bílým GIFem.</p>

<p>Po spuštění tohoto kódu by dobře udělaná stránka <b>neměla nijak poskočit</b>.</p>

<pre><code>(function(img) {
    for (var i = img.length; i--; ) {
        img[i].src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAAHAP8ALAAAAAABAAEAAAICRAEAOw==";
    }
})(document.images);</code></pre>







<p>Spustit tento kód přímo na stránce jde třeba vložením po napsání <code>javascript:</code> do adresního řádku (kopírovat „<code>javascript:</code>“ z bezpečnostních důvodů jít nemusí).</p>





<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://daverupert.com/2015/12/intrinsic-placeholders-with-picture/">Intrinsic Placeholders with the Picture Element</a> – využití značky <code>&lt;picture></code> pro placeholdery</li>
</ul>

<!--
<p><a href="http://kod.djpw.cz/pnob">Živá ukázka</a> – příklad použití u responsivní mřížky</p>
-->

<script>
  var imgCode = document.getElementById("img-code");
  
  function generateCode(f) {
    var ratio = Math.round(parseInt(f.height.value) / parseInt(f.width.value) * 100 * 100) / 100;
    var code = (f.maxwidth.checked) ? ".img {max-width: " + parseInt(f.width.value) + "px}\n" : "";
    code += ".img-cover {height: 0; padding-bottom: " + ratio + "%}" + "\n" +
      ".img-cover img {width: 100%; height: auto}";
    imgCode.innerHTML = code;
  }
  generateCode(document.getElementById("ratio-generator"));
  
  var imgArea = document.getElementById("img-area");
  
  function loadImage(el) {
    var img = new Image();
    img.src = el.value;
    
    imgArea.innerHTML = "";
    imgArea.appendChild(img);
    img.onload = function() {
      el.form.width.value = img.naturalWidth;
      el.form.height.value = img.naturalHeight;
      generateCode(el.form);
    }    
  }
</script>