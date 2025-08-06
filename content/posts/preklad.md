---
title: "Překlad stránky"
headline: "Překlad stránky"
description: "Snadná lokalisace webu do různých jazyků."
date: "2014-04-12"
last_modification: "2014-04-15"
status: 1
tags: ["hotova-reseni", "lokalisace", "php"]
format: "html"
---

<p>Při vytváření aplikace, kde má být možné <b>přepínat různé jazyky</b>, je potřeba řešit pohodlnou lokalisaci. Jak na to jednoduše v PHP?</p>

<h2 id="pouziti">Použití</h2>

<p>Cílem je mít funkci s nějakým krátkým názvem – třeba <code>l</code>, která se bude používat pro výpis všech textů na stránce.</p>

<pre><code>&lt;?=l("Text, který půjde později přeložit.")?></code></pre>

<p><small>Poznámka: Sekvence <code>&lt;?=</code> slouží k výpisu PHP skriptem do HTML. Košatější ekvivalent je <code>&lt;?php echo</code>.</small></p>

<h3 id="skladani-retezcu">Skládání řetězců</h3>

<p>Někdy je nutné v textech reagovat na různé stavy aplikace / používat proměnné.</p>

<pre><code>&lt;?=l("Uživatelské jméno „") . $jmeno . l("“ je již obsazeno.")?></code></pre>

<p>Takto vypadající spojování jistě není úplně elegantní. Lepíš se zdá použít funkci <a href="http://www.php.net/manual/en/function.vsprintf.php"><code>vsprintf</code></a>:</p>

<pre><code>&lt;?=l("Uživatelské jméno „%s“ je již obsazeno.", $jmeno)?></code></pre>

<p>V případě <b>více <i>proměnných</i></b> v textu se funkci <code>l</code> předá místo jedné proměnné <b>pole s hodnotami</b>, které se mají dosazovat.</p>

<h2 id="ulozeni">Uložení překladu</h2>

<p>Hlavní jazyk může být použit přímo v kódu. A další překlady potom budou PHP soubory, kde bude PHP pole s jednotlivými překlady.</p>

<pre><code>$l["Text v kódu"] = "Překlad textu z kódu";</code></pre>

<p>Požadovaný jazyk se potom zapne prostým <b>vložením PHP skriptu</b> (<code>include</code>).</p>

<p>Problém může nastat v případě, že budeme chtít <b>změnit</b> nějaký text primárního jazyku, který má své texty přímo v kódu. Řešením je buď úpravy hlavního jazyka vytvářet jako překlad, nebo měnit přímo kód. Potom je ale nutné <b>synchronisovat ostatní překlady</b>, aby překládaly i upravené řetězce.</p>

<h2 id="funkce">Funkce <code>l</code></h2>

<p>Funkce <code>l</code> jen zkontroluje, jestli příslušný překlad existuje a vrátí ho s použitím funkce <code>vsprintf</code> (v případě, že jsou předány nějaké <i>argumenty</i>).</p>

<pre><code>$l = array();
function l($text, $argumenty = array()) {
  global $l;
  if (isset($l[$text])) {
    $text = $l[$text];
  }
  if (!empty($argumenty)) {
    $text = vsprintf($text, $argumenty);
  }
  return $text;
}</code></pre>

<p>Funkční ukázka je na <a href="https://github.com/jahoda/preklad">GitHubu</a>.</p>

<!--
<h2 id="prekladani">Překládání</h2>
-->


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://code.tutsplus.com/tutorials/localize-your-web-application-for-any-country-with-the-google-translate-api--cms-23126">Localize Your Web Application for Any Country With the Google Translate API</a> – automatický překlad aplikace pomocí Google Translate API</li>
</ul>