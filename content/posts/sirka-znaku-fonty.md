---
title: "Šířka znaků ve fontech"
headline: "Proč mají znaky různou šířku a jak to ovlivňuje design"
description: "Různé znaky v písmu mají různou šířku. Porovnejte jednotlivé znaky s procentuálním rozdílem a zjistěte, proč se v responsivním designu nelze spoléhat na počet znaků."
date: "2026-01-16"
status: 1
tags: ["css", "typografie"]
format: "html"
---

<p>Když pracujete s textem na webu, možná jste si všimli, že <b>stejný počet znaků může zabírat různě široký prostor</b>. Je to proto, že většina fontů používá <b>proporcionální šířku znaků</b> – každý znak má svou vlastní šířku podle tvaru.</p>

<p>Písmeno <code>W</code> je výrazně širší než <code>i</code>, číslo <code>1</code> užší než <code>0</code>. Tento rozdíl může být <b>až několikanásobný</b>.</p>

<h2 id="porovnani-sirky-znaku">Interaktivní porovnání šířky znaků</h2>

<p>V tabulce níže můžete porovnat šířku jednotlivých znaků v pixelech. Referenční znak je <code>M</code>, protože se tradičně používá jako měrná jednotka (<a href="/em">em</a>).</p>

<div id="font-width-demo" style="margin: 20px 0;">
  <div style="margin-bottom: 15px;">
    <label for="font-select" style="font-weight: bold;">Vyberte font:</label>
    <select id="font-select" style="padding: 8px 12px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px; margin-left: 10px;">
      <option value="Arial, sans-serif">Arial</option>
      <option value="Times New Roman, serif">Times New Roman</option>
      <option value="Georgia, serif">Georgia</option>
      <option value="Verdana, sans-serif">Verdana</option>
      <option value="Courier New, monospace">Courier New (monospace)</option>
      <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
      <option value="system-ui, sans-serif">System UI</option>
    </select>
  </div>

  <div id="char-table-container"></div>

  <div id="visual-comparison" style="margin-top: 25px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
    <h3 style="margin-top: 0;">Vizuální porovnání</h3>
    <p style="margin-bottom: 10px;">Text se stejným počtem znaků, ale různou šířkou:</p>
    <div id="visual-strings" style="font-size: 24px; line-height: 1.8;"></div>
  </div>
</div>

<script>
(function() {
  const characters = [
    { char: 'W', label: 'W (nejširší)' },
    { char: 'M', label: 'M (reference)' },
    { char: 'O', label: 'O' },
    { char: 'A', label: 'A' },
    { char: 'N', label: 'N' },
    { char: 'H', label: 'H' },
    { char: 'o', label: 'o' },
    { char: 'a', label: 'a' },
    { char: 'n', label: 'n' },
    { char: 'e', label: 'e' },
    { char: 't', label: 't' },
    { char: 'r', label: 'r' },
    { char: 'i', label: 'i' },
    { char: 'l', label: 'l (nejužší)' },
    { char: '1', label: '1' },
    { char: '0', label: '0' },
    { char: ' ', label: 'mezera' },
  ];

  const visualStrings = [
    { text: 'WWWWWWWWWW', label: '10× W' },
    { text: 'MMMMMMMMMM', label: '10× M' },
    { text: 'iiiiiiiiii', label: '10× i' },
    { text: 'llllllllll', label: '10× l' },
  ];

  function measureCharWidth(char, font) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '100px ' + font;
    return ctx.measureText(char).width;
  }

  function updateTable() {
    const font = document.getElementById('font-select').value;
    const container = document.getElementById('char-table-container');
    const visualContainer = document.getElementById('visual-strings');

    const refWidth = measureCharWidth('M', font);

    let html = '<table style="width: 100%; border-collapse: collapse; font-size: 14px;">';
    html += '<thead><tr style="background: #333; color: white;">';
    html += '<th style="padding: 10px; text-align: left;">Znak</th>';
    html += '<th style="padding: 10px; text-align: center;">Ukázka</th>';
    html += '<th style="padding: 10px; text-align: right;">Šířka (px)</th>';
    html += '<th style="padding: 10px; text-align: right;">% vůči M</th>';
    html += '<th style="padding: 10px; text-align: left;">Vizuální poměr</th>';
    html += '</tr></thead><tbody>';

    characters.forEach((item, index) => {
      const width = measureCharWidth(item.char, font);
      const percent = Math.round((width / refWidth) * 100);
      const barWidth = Math.min(percent, 150);
      const bgColor = index % 2 === 0 ? '#fff' : '#f9f9f9';

      html += '<tr style="background: ' + bgColor + ';">';
      html += '<td style="padding: 8px 10px;">' + item.label + '</td>';
      html += '<td style="padding: 8px 10px; text-align: center; font-family: ' + font + '; font-size: 24px;">' + (item.char === ' ' ? '&nbsp;' : item.char) + '</td>';
      html += '<td style="padding: 8px 10px; text-align: right; font-family: monospace;">' + width.toFixed(1) + '</td>';
      html += '<td style="padding: 8px 10px; text-align: right; font-weight: bold; color: ' + (percent > 100 ? '#059669' : percent < 100 ? '#dc2626' : '#333') + ';">' + percent + '%</td>';
      html += '<td style="padding: 8px 10px;"><div style="background: linear-gradient(90deg, #2563eb ' + barWidth + '%, #e5e7eb ' + barWidth + '%); height: 16px; border-radius: 3px; max-width: 150px;"></div></td>';
      html += '</tr>';
    });

    html += '</tbody></table>';

    const widestWidth = measureCharWidth('W', font);
    const narrowestWidth = measureCharWidth('l', font);
    const ratio = (widestWidth / narrowestWidth).toFixed(1);

    html += '<p style="margin-top: 15px; padding: 12px; background: #fef3c7; border-radius: 6px; border-left: 4px solid #f59e0b;">';
    html += '<b>Rozdíl mezi nejširším (W) a nejužším (l) znakem: ' + ratio + '×</b><br>';
    html += 'To znamená, že text složený z úzkých znaků může být až ' + ratio + '× kratší než text ze širokých znaků při stejném počtu znaků.';
    html += '</p>';

    container.innerHTML = html;

    let visualHtml = '';
    visualStrings.forEach(item => {
      const totalWidth = measureCharWidth(item.text.charAt(0), font) * item.text.length;
      visualHtml += '<div style="font-family: ' + font + '; background: #fff; padding: 8px 12px; margin-bottom: 8px; border-radius: 4px; display: inline-block; border: 1px solid #ddd;">';
      visualHtml += item.text;
      visualHtml += '</div>';
      visualHtml += '<span style="font-size: 14px; color: #666; margin-left: 10px;">' + item.label + ' = ' + totalWidth.toFixed(0) + 'px</span><br>';
    });
    visualContainer.innerHTML = visualHtml;
  }

  document.getElementById('font-select').addEventListener('change', updateTable);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateTable);
  } else {
    updateTable();
  }
})();
</script>

<h2 id="proc-je-to-dulezite">Proč je to důležité pro webdesign</h2>

<p>Rozdílná šířka znaků má zásadní dopad na <b>layout a responsivní design</b>:</p>

<ul>
<li>
  <p><b>Nemožnost předvídat šířku textu</b> – text „William" zabere víc místa než „Jiří", i když má méně znaků</p>
</li>

<li>
  <p><b>Problém s ořezáváním</b> – nastavení <code>max-width</code> podle počtu znaků může vést k nekonzistentním výsledkům</p>
</li>

<li>
  <p><b>Dynamický obsah</b> – uživatelská jména, produktové názvy nebo překlady mohou rozbít layout</p>
</li>

<li>
  <p><b>Tlačítka a labely</b> – text „Submit" vs „Odeslat formulář" vyžaduje jiný přístup</p>
</li>
</ul>

<h2 id="jednotka-ch">CSS jednotka ch</h2>

<p>CSS nabízí jednotku <code>ch</code>, která odpovídá šířce znaku <code>0</code> v daném fontu. Je to <b>aproximace</b>, protože předpokládá, že všechny znaky mají podobnou šířku.</p>

<pre><code>.input-field {
  width: 20ch; /* Přibližně 20 znaků */
}</code></pre>

<p>Jednotka <code>ch</code> funguje dobře pro:</p>

<ul>
<li><p>Textová pole pro čísla (PSČ, telefon)</p></li>
<li><p>Kód a monospace text</p></li>
<li><p>Přibližné odhady šířky</p></li>
</ul>

<p>Ale <b>nespoléhejte na ni pro přesné rozměry</b> běžného textu.</p>

<h2 id="monospace-fonty">Monospace fonty jako řešení</h2>

<p>Pokud potřebujete konzistentní šířku znaků, použijte <b>monospace font</b>:</p>

<pre><code>.fixed-width {
  font-family: 'Courier New', Consolas, monospace;
}</code></pre>

<p>V monospace fontech mají všechny znaky stejnou šířku. Zkuste v ukázce výše vybrat <b>Courier New</b> a uvidíte, že všechny znaky mají 100% šířku vůči referenci.</p>

<p>Monospace fonty jsou vhodné pro:</p>

<ul>
<li><p>Zobrazení kódu</p></li>
<li><p>Tabulková data (čísla pod sebou)</p></li>
<li><p>ASCII art</p></li>
<li><p>Terminálový výstup</p></li>
</ul>

<h2 id="reseni-v-responsivnim-designu">Jak to řešit v responsivním designu</h2>

<p>Místo spoléhání na počet znaků použijte tyto techniky:</p>

<h3 id="flexibilni-kontejnery">Flexibilní kontejnery</h3>

<pre><code>.button {
  padding: 10px 20px; /* Padding místo fixní šířky */
  white-space: nowrap;
}

.card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}</code></pre>

<h3 id="min-max-width">Min/max šířky místo fixních</h3>

<pre><code>.input {
  min-width: 200px;
  max-width: 400px;
  width: 100%;
}</code></pre>

<h3 id="flexbox-grid">Flexbox a Grid</h3>

<pre><code>.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.nav-item {
  flex: 0 1 auto; /* Přizpůsobí se obsahu */
}</code></pre>

<h3 id="clamp">CSS funkce clamp()</h3>

<pre><code>.heading {
  font-size: clamp(1rem, 4vw, 2rem);
  /* Responsivní velikost fontu */
}</code></pre>

<h3 id="container-queries">Container queries</h3>

<pre><code>.card {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card-title {
    font-size: 1.5rem;
  }
}</code></pre>

<h2 id="prakticke-tipy">Praktické tipy</h2>

<ul>
<li>
  <p><b>Testujte s extrémními hodnotami</b> – zkuste do inputu zadat „WWWWWWWWWW" i „iiiiiiiiii"</p>
</li>

<li>
  <p><b>Počítejte s překlady</b> – německé slovo může být 2× delší než anglické</p>
</li>

<li>
  <p><b>Používejte <code>text-overflow: ellipsis</code></b> – jako záchrannou síť pro příliš dlouhý text</p>
</li>

<li>
  <p><b>Nastavujte <code>min-width</code> na tlačítkách</b> – aby nebyla příliš úzká s krátkým textem</p>
</li>

<li>
  <p><b>Pro čísla používejte <code>font-variant-numeric: tabular-nums</code></b> – zajistí stejnou šířku číslic</p>
</li>
</ul>

<pre><code>.price {
  font-variant-numeric: tabular-nums;
  /* Čísla budou mít stejnou šířku */
}</code></pre>

<h2 id="zaver">Závěr</h2>

<ul>
<li>
  <p>Většina fontů má <b>proporcionální šířku znaků</b> – různé znaky zabírají různě místa</p>
</li>

<li>
  <p>Rozdíl mezi nejširším a nejužším znakem může být <b>až 3–4×</b></p>
</li>

<li>
  <p><b>Nespoléhejte na počet znaků</b> při návrhu layoutu</p>
</li>

<li>
  <p>Používejte <b>flexibilní techniky</b>: flexbox, grid, min/max-width, padding</p>
</li>

<li>
  <p>Pro konzistentní šířku použijte <b>monospace fonty</b> nebo <code>tabular-nums</code></p>
</li>

<li>
  <p>Vždy <b>testujte s různými délkami textu</b> a překlady</p>
</li>
</ul>
