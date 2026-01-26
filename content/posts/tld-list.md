---
title: "Seznam TLD"
headline: "Seznam TLD ke stažení"
description: "Aktuální seznam všech TLD domén ve formátu JSON a PHP pole."
date: "2014-05-07"
status: 1
tags: ["domeny"]
format: "html"
---

<p>Aktuální seznam všech <a href="/tld">TLD (top-level domén)</a> ve formátech vhodných pro programové zpracování.</p>

<h2 id="zdroj">Zdroj dat</h2>

<p>Oficiální a vždy aktuální seznam TLD spravuje organizace <b>IANA</b> (Internet Assigned Numbers Authority):</p>

<div class="external-content">
  <ul>
    <li><a href="http://data.iana.org/TLD/tlds-alpha-by-domain.txt">IANA TLD List</a> – textový soubor s aktuálním seznamem</li>
  </ul>
</div>

<h2 id="json">JSON formát</h2>

<p>Seznam TLD jako JSON pole:</p>

<pre><code>["ac","ad","ae","aero","af","ag",...]</code></pre>

<p>Získání v JavaScriptu:</p>

<pre><code>fetch('http://data.iana.org/TLD/tlds-alpha-by-domain.txt')
  .then(r => r.text())
  .then(text => {
    const tlds = text
      .split('\n')
      .filter(line => line && !line.startsWith('#'))
      .map(tld => tld.toLowerCase());
    console.log(JSON.stringify(tlds));
  });</code></pre>

<h2 id="php">PHP pole</h2>

<p>Získání seznamu TLD v <a href="/php">PHP</a>:</p>

<pre><code>$text = file_get_contents('http://data.iana.org/TLD/tlds-alpha-by-domain.txt');
$lines = explode("\n", $text);
$tlds = [];

foreach ($lines as $line) {
    $line = trim($line);
    if ($line && $line[0] !== '#') {
        $tlds[] = strtolower($line);
    }
}

// Výsledek: ['ac', 'ad', 'ae', 'aero', ...]</code></pre>

<h2 id="validace">Validace domény</h2>

<p>Příklad použití pro validaci e-mailové adresy:</p>

<pre><code>function isValidTld($email) {
    $tlds = getTldList(); // funkce vracející pole TLD
    $parts = explode('.', $email);
    $tld = strtolower(end($parts));
    return in_array($tld, $tlds);
}</code></pre>

<p>Pozor: Seznam TLD se průběžně mění (přibývají nové domény), proto je vhodné ho <b>pravidelně aktualizovat</b> nebo načítat dynamicky.</p>

<div class="internal-content">
  <ul>
    <li><a href="/tld">Seznam všech TLD</a> – kompletní přehled domén prvního řádu</li>
  </ul>
</div>
