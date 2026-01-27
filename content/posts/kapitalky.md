---
title: "Kapitálky (small caps)"
headline: "Kapitálky – CSS small caps a verzálky"
description: "Co jsou kapitálky (small caps), jak se liší od verzálek a jak je použít v CSS pomocí font-variant a text-transform."
date: "2025-01-27"
status: 1
tags: ["css", "css-vlastnosti", "typografie"]
format: "html"
---

<p><b>Kapitálky</b> (anglicky <i>small caps</i>) jsou velká písmena zmenšená na výšku malých písmen. Na rozdíl od verzálek (běžných velkých písmen) mají kapitálky opticky vyvážené proporce a tloušťku tahů, takže v textu nepůsobí rušivě.</p>

<div class="live">
<style>
.demo-sc { font-variant: small-caps; }
.demo-uc { text-transform: uppercase; font-size: 0.85em; }
</style>
<p style="font-size:1.3em"><span class="demo-sc">Toto jsou kapitálky</span></p>
<p style="font-size:1.3em"><span class="demo-uc">Toto jsou verzálky</span></p>
<p style="font-size:1.3em">Toto je běžný text</p>
</div>


<h2 id="rozdil">Kapitálky vs. verzálky</h2>

<table>
  <thead>
    <tr>
      <th></th>
      <th>Kapitálky (small caps)</th>
      <th>Verzálky (uppercase)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Vzhled</td>
      <td>Velká písmena o velikosti malých</td>
      <td>Plně velká písmena</td>
    </tr>
    <tr>
      <td>Výška</td>
      <td>Výška minusek (x-height)</td>
      <td>Plná výška verzálek</td>
    </tr>
    <tr>
      <td>Čitelnost</td>
      <td>Nenápadné, vhodné do textu</td>
      <td>Výrazné, mohou působit jako křik</td>
    </tr>
    <tr>
      <td>CSS</td>
      <td><code>font-variant: small-caps</code></td>
      <td><code>text-transform: uppercase</code></td>
    </tr>
  </tbody>
</table>


<h2 id="css">CSS kapitálky</h2>

<p>Nejjednodušší způsob je vlastnost <code>font-variant</code>:</p>

<pre><code>/* Kapitálky */
.kapitalky {
  font-variant: small-caps;
}

/* Všechna písmena jako kapitálky */
.kapitalky-vse {
  font-variant: all-small-caps;
}</code></pre>

<p>Rozdíl mezi <code>small-caps</code> a <code>all-small-caps</code>: první převede pouze malá písmena na kapitálky (velká zůstanou velká), druhý převede všechna písmena na kapitálky.</p>


<h2 id="font-variant-caps">Pokročilé: font-variant-caps</h2>

<p>CSS nabízí i detailnější vlastnost <code>font-variant-caps</code> s více hodnotami:</p>

<pre><code>font-variant-caps: small-caps;      /* malá → kapitálky */
font-variant-caps: all-small-caps;   /* vše → kapitálky */
font-variant-caps: petite-caps;      /* menší kapitálky */
font-variant-caps: unicase;          /* mix verzálek a kapitálek */</code></pre>

<p>Tyto hodnoty fungují správně pouze u fontů, které obsahují skutečné kapitálkové glyfy (OpenType feature <code>smcp</code>). Pokud font kapitálky nemá, prohlížeč je simuluje zmenšením verzálek – výsledek bývá vizuálně méně kvalitní.</p>


<h2 id="pouziti">Kdy kapitálky použít</h2>

<ul>
  <li><b>Jména autorů</b> – v bibliografiích a citacích</li>
  <li><b>Zkratky</b> – <span style="font-variant:small-caps">html</span>, <span style="font-variant:small-caps">css</span>, <span style="font-variant:small-caps">api</span> v běžném textu</li>
  <li><b>Nadpisy a podnadpisy</b> – elegantní alternativa k verzálkám</li>
  <li><b>Právní dokumenty</b> – zvýraznění klíčových pojmů</li>
</ul>
