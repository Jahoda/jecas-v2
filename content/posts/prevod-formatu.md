---
title: "Převod formátů v prohlížeči (JavaScript)"
headline: "Převody souborů a dat přímo v prohlížeči"
description: "Jak převádět obrázky, textové formáty v prohlížeči pomocí JavaScriptu – bez odesílání dat na server."
date: "2025-09-14"
last_modification: "2025-09-14"
status: 1
tags: ["js", "napady", "produktivita"]
format: "html"
---

<p>Ve webových prohlížečích je možné čím dál tím víc.</p>

<p>Jednou z věcí je převod různých formátů souborů mezi sebou. Převádět běžné formáty lze dnes pohodlně i <b>offline</b> a <b>bez odesílání dat</b> na server.</p>

<p>Pro uživatele může být dobré, že nemusí nic odesílat na server, protože si tak může převést různé formáty, aniž by do nich mohl mít provozovatel přístup.</p>

<p>Pro provozovatele webu to naopak znamená minimální zátěž, protože se výpočty provedou na HW návštěvníka.</p>

<h2 id="co-jde">Co jde čistě v prohlížeči</h2>

<p>Teoreticky jde <b>převést skoro cokoliv</b>. JS může číst data, převést je a nabídnout ke <a href="/atribut-download">stažení</a>.</p>

<p>Hlavním limitem je tak výkon, který je navíc závislý na zařízení. Na stránku mohou přistupovat uživatelé s pomalými levnými mobily a zároveň z výkonných počítačů.</p>

<p>Velké soubory mohou být pomalé a náročné na paměť.</p>

<p>Proto se často různé konverse provádějí na straně serveru i v případě, že by to šlo obsloužit u klienta.</p>

<p>Zvlášť náročné věci (třeba generování stovek faktur) se ideálně provádějí asynchronně.</p>

<p>V praxi se může používat i hybridní řešení, kdy se část operací provede u klienta a část na serveru. Třeba rychlé operace snižující zátěž na síťový přenos se provedou v JS u klienta, ale náročné operace se už zpracují na serveru.</p>

<p>Vždy je důležité také myslet na to, že klientské straně se nedá věřit. Proto je například spolehlivé přidání vodoznaku do obrázku v každém případě nutné dělat na serveru.</p>

<p>Zjednodušeně řečeno:</p>

<ul>
  <li><b>Texty a data</b>: třeba převody CSV ↔ JSON budou dost bezproblémové u menších souborů.</li>
  <li><b>Obrázky</b> (PNG/JPEG/WebP/SVG) – jde využít kreslení do <a href="/canvas"><code>&lt;canvas></code>u</a> – obecně platí, že cokoliv se může na webu zobrazovat, není problém nakreslit do <code>&lt;canvas></code>u a ten jednoduše uložit jako libovolný obrázkový formát nebo třeba i PDF.</li>
  <li><b>Audio/video</b>, Office, ZIP, PDF apod. – dost často existuje JS knihovna, která konversi dokáže provést.</li>
</ul>

<h2 id="obrazky">Obrázky: PNG/JPEG/WebP a změna velikosti</h2>
<div class="live">
  <p class="flex gap-2 flex-wrap">
    <input id="imgInput" type="file" accept="image/*">
    <label>Cílový formát
      <select id="imgFormat">
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPEG</option>
        <option value="image/webp">WebP</option>
      </select>
    </label>
    <label>Max. šířka
      <input id="imgMaxW" type="number" value="1600" min="1">
    </label>
    <label>Kvalita
      <input id="imgQuality" type="range" min="0" max="1" step="0.05" value="0.8">
      <span id="imgQualityVal">0.8</span>
    </label>
    <button id="imgConvert">Převést</button>
  </p>
  <p id="imgInfo"></p>
  <canvas id="imgCanvas" class="border" style="max-width:100%; display:none"></canvas>
  <p class="flex gap-2 flex-wrap">
    <a id="imgDownload" download="converted.png" style="display:none">Stáhnout výsledek</a>
  </p>

<script>
  var imgInput = document.getElementById("imgInput")
  var imgFormat = document.getElementById("imgFormat")
  var imgMaxW = document.getElementById("imgMaxW")
  var imgQuality = document.getElementById("imgQuality")
  var imgQualityVal = document.getElementById("imgQualityVal")
  var imgConvert = document.getElementById("imgConvert")
  var imgCanvas = document.getElementById("imgCanvas")
  var imgInfo = document.getElementById("imgInfo")
  var imgDownload = document.getElementById("imgDownload")

  imgQuality.addEventListener("input", function() {
    imgQualityVal.textContent = imgQuality.value
  })

  function readFileAsDataURL(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader()
      reader.onload = function() { resolve(reader.result) }
      reader.onerror = function(e) { reject(e) }
      reader.readAsDataURL(file)
    })
  }

  function dataURLToImage(url) {
    return new Promise(function(resolve, reject) {
      var img = new Image()
      img.onload = function() { resolve(img) }
      img.onerror = function(e) { reject(e) }
      img.src = url
    })
  }

  function canvasToBlob(canvas, type, quality) {
    return new Promise(function(resolve) {
      if (type === "image/jpeg" || type === "image/webp") canvas.toBlob(resolve, type, parseFloat(quality))
      else canvas.toBlob(resolve, type)
    })
  }

  function formatBytes(bytes) {
    if (!bytes && bytes !== 0) return ""
    var units = ["B","KB","MB","GB","TB"]
    var i = 0
    var size = bytes
    while (size >= 1024 && i < units.length - 1) { size /= 1024; i++ }
    return size.toFixed(size < 10 && i > 0 ? 1 : 0) + " " + units[i]
  }

  function suggestName(originalName, mime) {
    var base = originalName.replace(/\.[^.]+$/, "")
    if (mime === "image/png") return base + ".png"
    if (mime === "image/jpeg") return base + ".jpg"
    if (mime === "image/webp") return base + ".webp"
    return base
  }

  imgConvert.addEventListener("click", function() {
    var file = imgInput.files && imgInput.files[0]
    if (!file) {
      imgInfo.textContent = "Vyberte soubor"
      return
    }
    var target = imgFormat.value
    readFileAsDataURL(file).then(function(url) {
      return dataURLToImage(url)
    }).then(function(image) {
      var maxW = parseInt(imgMaxW.value, 10)
      var ratio = image.width > maxW ? maxW / image.width : 1
      var w = Math.max(1, Math.round(image.width * ratio))
      var h = Math.max(1, Math.round(image.height * ratio))
      imgCanvas.width = w
      imgCanvas.height = h
      var ctx = imgCanvas.getContext("2d")
      ctx.drawImage(image, 0, 0, w, h)
      return canvasToBlob(imgCanvas, target, imgQuality.value)
    }).then(function(blob) {
      if (!blob) {
        imgInfo.textContent = "Převod selhal"
        return
      }
      var url = URL.createObjectURL(blob)
      imgCanvas.style.display = "block"
      imgDownload.style.display = "inline-block"
      imgDownload.href = url
      imgDownload.download = suggestName(imgInput.files[0].name, imgFormat.value)
      var info = []
      info.push("Vstup: " + imgInput.files[0].type + ", " + formatBytes(imgInput.files[0].size))
      info.push("Výstup: " + imgFormat.value + ", " + formatBytes(blob.size))
      info.push("Rozměry: " + imgCanvas.width + "×" + imgCanvas.height)
      imgInfo.textContent = info.join(" · ")
    }).catch(function() {
      imgInfo.textContent = "Nepodařilo se načíst obrázek"
    })
  })
  </script>
</div>

<p>Pro převod do PNG (nebo jiných formátů) z SVG jsem si vytvořil jednoduchý nástroj:</p>

<div class="internal-content">
<ul><li><a href="https://jecas.cz/nastroje/prevod-svg">Převod SVG do PNG
</a></li></ul>
</div>

<h2 id="dalsi">Přehled konversí a knihoven</h2>

<p>Skoro pro každou myslitelnou konversi souborů existuje JS knihovna, která ji aspoň nějak dokáže obsloužit.</p>

<ul>
  <li>Markdown ↔ HTML – <a href="https://github.com/markedjs/marked">marked</a>, <a href="https://github.com/mixmark-io/turndown">turndown</a></li>
  <li>YAML ↔ JSON – <a href="https://github.com/nodeca/js-yaml">js-yaml</a></li>
  <li>TOML ↔ JSON – <a href="https://github.com/iarna/iarna-toml">@iarna/toml</a></li>
  <li>XLSX ↔ CSV (tabulky) – <a href="https://sheetjs.com/">SheetJS (xlsx)</a></li>
  <li>ZIP (tvorba/rozbalení), Gzip/Deflate – <a href="https://stuk.github.io/jszip/">JSZip</a>, <a href="https://github.com/nodeca/pako">pako</a></li>
  <li>EXIF (čtení/odstranění) – <a href="https://github.com/mattiasw/ExifReader">ExifReader</a>, <a href="https://github.com/hMatoba/piexifjs">piexifjs</a></li>
  <li>QR kódy (generování) – <a href="https://github.com/soldair/node-qrcode">qrcode</a></li>
  <li>QR/čárové kódy (čtení) – <a href="https://github.com/cozmo/jsQR">jsQR</a>, <a href="https://github.com/zxing-js/library">zxing-js</a></li>
  <li>EPUB → HTML/text – <a href="https://github.com/futurepress/epub.js">epub.js</a></li>
  <li>GPX/KML → GeoJSON – <a href="https://github.com/mapbox/togeojson">togeojson</a></li>
  <li>OCR (obrázek → text) – <a href="https://github.com/naptha/tesseract.js">tesseract.js</a></li>
  <li>Fonty: TTF/OTF → WOFF/WOFF2 – <a href="https://github.com/nfroidure/ttf2woff2">ttf2woff2</a></li>
  <li>HTML → PDF – <a href="https://github.com/niklasvh/html2canvas">html2canvas</a>, <a href="https://github.com/eKoopmans/html2pdf.js">html2pdf.js</a></li>
  <li>CSV (robustní parsování) – <a href="https://www.papaparse.com/">Papa Parse</a></li>
  <li>Video/Audio převody – <a href="https://github.com/ffmpegwasm/ffmpeg.wasm">ffmpeg.wasm</a></li>
  <li>PDF (tvorba) – <a href="https://github.com/parallax/jsPDF">jsPDF</a></li>
  <li>HEIC → JPEG/PNG – <a href="https://github.com/alexcorvi/heic2any">heic2any</a></li>
  <li>DOCX → HTML – <a href="https://github.com/mwilliamson/mammoth.js">mammoth.js</a></li>
</ul>

<p>Máte zkušenost s nějakým dalším nástrojem na zajímavé převody formátů souborů? Dejte mi prosím vědět do komentářů.</p>
