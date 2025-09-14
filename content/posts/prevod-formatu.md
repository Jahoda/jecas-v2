---
title: "Převod formátů v prohlížeči (JavaScript)"
headline: "Převody souborů a dat přímo v prohlížeči"
description: "Jak převádět obrázky, textové formáty v prohlížeči pomocí JavaScriptu – bez odesílání dat na server."
date: "2025-09-14"
last_modification: "2025-09-14"
status: 0
tags: ["js", "hotova-reseni", "obrazky", "video", "webove-prohlizece", "produktivita"]
format: "html"
---

<p>Ve webových prohlížečích je možné čím dal tím víc.</p>

<p>Jedno z věcí je převod různých formátů souborů mezi sebou. Převádět běžné formáty lze dnes pohodlně i <b>offline</b> a <b>bez odesílání dat</b> na server.</p>

<p>Pro uživatele může být dobré, že nemusí nic odesílat na server. Může si tak převést různé formáty, aniž by do nich mohl mít provozovatel přístup.</p>

<p>Pro provozovatele webu to naopak znamená minimální zátěž, protože se výpočty provedou na HW návštěvníka.</p>

<h2 id="co-jde">Co jde čistě v prohlížeči</h2>

<p>Teoreticky jde převést skoro cokoliv. JS může číst data, převést je, a nabídnout ke <a href="/atribut-download">stažení</a>.</p>

<p></p>

<ul>
  <li>Obrázky: PNG/JPEG/WebP, změna velikosti, SVG → PNG</li>
  <li>Texty a data: CSV ↔ JSON, Base64</li>
  <li>Bez knihoven nejde spolehlivě: PDF, audio/video, Office; řeší knihovny</li>
</ul>

<h2 id="obrazky">Obrázky: PNG/JPEG/WebP a změna velikosti</h2>
<div class="live no-source">
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
</div>

<h3 id="svg-png">SVG → PNG</h3>
<p>Pro <b>SVG</b> stačí nahrát SVG soubor a zvolit PNG jako cílový formát. Pro lokální soubory funguje bez potíží.</p>

<h2 id="csv-json">CSV ↔ JSON</h2>
<div class="live no-source">
  <div class="grid" style="grid-template-columns:1fr 1fr; gap:1rem; align-items:start">
    <div>
      <h3>CSV</h3>
      <textarea id="csvInput" rows="10" cols="50">name,age
Alice,30
Bob,28</textarea>
      <p class="flex gap-2 flex-wrap">
        <button id="csvToJson">CSV → JSON</button>
      </p>
    </div>
    <div>
      <h3>JSON</h3>
      <textarea id="jsonInput" rows="10" cols="50">[
  {"name":"Alice","age":30},
  {"name":"Bob","age":28}
]</textarea>
      <p class="flex gap-2 flex-wrap">
        <button id="jsonToCsv">JSON → CSV</button>
      </p>
    </div>
  </div>
</div>

<h2 id="base64">Texty a Base64</h2>
<div class="live no-source">
  <div class="grid" style="grid-template-columns:1fr 1fr; gap:1rem; align-items:start">
    <div>
      <h3>Text</h3>
      <textarea id="txtPlain" rows="6" cols="50">Žluťoučký kůň</textarea>
      <p class="flex gap-2 flex-wrap"><button id="toB64">→ Base64</button></p>
    </div>
    <div>
      <h3>Base64</h3>
      <textarea id="txtB64" rows="6" cols="50"></textarea>
      <p class="flex gap-2 flex-wrap"><button id="fromB64">→ Text</button></p>
    </div>
  </div>
</div>

<h2 id="pdf-video">PDF, audio, video a další</h2>
<p>Pro tyto převody je obvykle potřeba knihovna běžící v prohlížeči:</p>
<div class="external-content">
  <ul>
    <li><a href="https://github.com/ffmpegwasm/ffmpeg.wasm">ffmpeg.wasm</a> – převody videa a audia (náročné na výkon)</li>
    <li><a href="https://github.com/parallax/jsPDF">jsPDF</a> – tvorba PDF</li>
    <li><a href="https://github.com/alexcorvi/heic2any">heic2any</a> – HEIC → JPEG/PNG</li>
    <li><a href="https://github.com/mwilliamson/mammoth.js">mammoth.js</a> – DOCX → HTML</li>
  </ul>
</div>

<h2 id="dalsi">Další převody v prohlížeči (přehled)</h2>
<ul>
  <li>Markdown ↔ HTML</li>
  <li>HTML ↔ Markdown</li>
  <li>YAML ↔ JSON, TOML ↔ JSON</li>
  <li>XLSX ↔ CSV (tabulky)</li>
  <li>ZIP tvorba/rozbalení, Gzip/Deflate komprese/dekomprese</li>
  <li>EXIF čtení/odstranění u fotografií</li>
  <li>Barvy: HEX ↔ RGB ↔ HSL</li>
  <li>QR kódy a čárové kódy: generování i čtení</li>
  <li>EPUB → HTML/text</li>
  <li>GPX/KML → GeoJSON</li>
  <li>OCR: obrázek → text</li>
  <li>Fonty: TTF/OTF → WOFF/WOFF2</li>
  <li>Hashování a šifrování (např. SHA‑256, AES‑GCM) – Web Crypto API</li>
  <li>HTML → PDF (render přes canvas + PDF)</li>
  <li>CSV robustněji (oddělovače, citace, Unicode)</li>
  
</ul>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/markedjs/marked">marked</a> – Markdown → HTML</li>
    <li><a href="https://github.com/mixmark-io/turndown">turndown</a> – HTML → Markdown</li>
    <li><a href="https://github.com/nodeca/js-yaml">js-yaml</a> – YAML ↔ JSON</li>
    <li><a href="https://github.com/iarna/iarna-toml">@iarna/toml</a> – TOML ↔ JSON</li>
    <li><a href="https://sheetjs.com/">SheetJS (xlsx)</a> – XLSX ↔ CSV</li>
    <li><a href="https://stuk.github.io/jszip/">JSZip</a> – ZIP tvorba/čtení</li>
    <li><a href="https://github.com/nodeca/pako">pako</a> – Gzip/Deflate</li>
    <li><a href="https://github.com/mattiasw/ExifReader">ExifReader</a>, <a href="https://github.com/hMatoba/piexifjs">piexifjs</a> – EXIF</li>
    <li><a href="https://github.com/bgrins/TinyColor">tinycolor2</a> – barvy</li>
    <li><a href="https://github.com/soldair/node-qrcode">qrcode</a> – generování QR</li>
    <li><a href="https://github.com/cozmo/jsQR">jsQR</a>, <a href="https://github.com/zxing-js/library">zxing-js</a> – čtení QR/čárových kódů</li>
    <li><a href="https://github.com/futurepress/epub.js">epub.js</a> – EPUB</li>
    <li><a href="https://github.com/mapbox/togeojson">togeojson</a> – GPX/KML → GeoJSON</li>
    <li><a href="https://github.com/naptha/tesseract.js">tesseract.js</a> – OCR</li>
    <li><a href="https://github.com/nfroidure/ttf2woff2">ttf2woff2</a> – WOFF2</li>
    <li><a href="https://github.com/niklasvh/html2canvas">html2canvas</a>, <a href="https://github.com/eKoopmans/html2pdf.js">html2pdf.js</a> – HTML → PDF</li>
    <li><a href="https://www.papaparse.com/">Papa Parse</a> – robustní CSV</li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto">Web Crypto API (SubtleCrypto)</a> – hash/šifra</li>
  </ul>
  
</div>

<h2 id="soukromi">Soukromí a limity</h2>
<ul>
  <li>Převody běží lokálně v prohlížeči.</li>
  <li>Velké soubory mohou být pomalé a náročné na paměť.</li>
  <li>HEIC, RAW, proprietární formáty vyžadují specializované knihovny.</li>
</ul>

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
    var units = ["B","KB","MB","GB"]
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

  var csvInput = document.getElementById("csvInput")
  var jsonInput = document.getElementById("jsonInput")
  var csvToJson = document.getElementById("csvToJson")
  var jsonToCsv = document.getElementById("jsonToCsv")

  function parseCsv(text) {
    var rows = []
    var row = []
    var cell = ""
    var quoted = false
    for (var i = 0; i < text.length; i++) {
      var ch = text[i]
      if (quoted) {
        if (ch === '"') {
          if (text[i + 1] === '"') { cell += '"'; i++ } else { quoted = false }
        } else {
          cell += ch
        }
      } else {
        if (ch === '"') quoted = true
        else if (ch === ",") { row.push(cell); cell = "" }
        else if (ch === "\n" || ch === "\r") {
          if (ch === "\r" && text[i + 1] === "\n") i++
          row.push(cell)
          rows.push(row)
          row = []
          cell = ""
        } else {
          cell += ch
        }
      }
    }
    if (cell.length > 0 || row.length > 0) { row.push(cell); rows.push(row) }
    return rows
  }

  function toCsv(rows) {
    return rows.map(function(r) {
      return r.map(function(v) {
        var s = v == null ? "" : String(v)
        var needQuote = /[",\n\r]/.test(s)
        s = s.replace(/"/g, '""')
        return needQuote ? '"' + s + '"' : s
      }).join(",")
    }).join("\n")
  }

  csvToJson.addEventListener("click", function() {
    try {
      var rows = parseCsv(csvInput.value.trim())
      if (!rows.length) { jsonInput.value = "[]"; return }
      var headers = rows[0]
      var data = []
      for (var i = 1; i < rows.length; i++) {
        var obj = {}
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = rows[i][j]
        }
        data.push(obj)
      }
      jsonInput.value = JSON.stringify(data, null, 2)
    } catch (e) {
      jsonInput.value = "[]"
    }
  })

  jsonToCsv.addEventListener("click", function() {
    try {
      var arr = JSON.parse(jsonInput.value)
      if (!Array.isArray(arr) || !arr.length) { csvInput.value = ""; return }
      var keys = Object.keys(arr.reduce(function(acc, o) { Object.keys(o).forEach(function(k){ acc[k]=true }); return acc }, {}))
      var rows = [keys]
      for (var i = 0; i < arr.length; i++) {
        rows.push(keys.map(function(k){ return arr[i][k] }))
      }
      csvInput.value = toCsv(rows)
    } catch (e) {
      csvInput.value = ""
    }
  })

  var txtPlain = document.getElementById("txtPlain")
  var txtB64 = document.getElementById("txtB64")
  var toB64 = document.getElementById("toB64")
  var fromB64 = document.getElementById("fromB64")

  function base64Encode(str) {
    var bytes = new TextEncoder().encode(str)
    var bin = ""
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
    return btoa(bin)
  }

  function base64Decode(b64) {
    var bin = atob(b64)
    var bytes = new Uint8Array(bin.length)
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    return new TextDecoder("utf-8").decode(bytes)
  }

  toB64.addEventListener("click", function() {
    try { txtB64.value = base64Encode(txtPlain.value) } catch(e) { txtB64.value = "" }
  })
  fromB64.addEventListener("click", function() {
    try { txtPlain.value = base64Decode(txtB64.value.trim()) } catch(e) { txtPlain.value = "" }
  })
</script>

