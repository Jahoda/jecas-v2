---
title: "Převod PHP na JavaScript"
headline: "Převedení PHP do JavaScriptu"
description: "Jak převést PHP kód do JavaScriptu."
date: "2014-04-09"
last_modification: "2014-04-10"
status: 1
tags: ["js", "napady", "php"]
format: "html"
---

<p>V případě, že máme nějaké logické funkce v PHP a potřebujeme je zároveň používat na straně klienta, tj. v JavaScriptu, není (polo)automatický převod výrazně komplikovaný.</p>

<h2 id="promenne">Proměnné</h2>

<p>S proměnnými nemusí být potřeba dělat skoro nic. Pro PHP typické <b>dolary</b> (<code><b>$</b>promenna</code>) na začátcích názvů se sice nabízí odstranit, nicméně ničemu nevadí. Znak dolaru je platným znakem JS proměnné, koneckonců v <i>proměnné</i> <code>$</code> je ukryta třeba celá knihovna <b>jQuery</b>.</p>

<p>Jediné, co může vadit, je nekorektní platnost v různých <a href="/scope">prostorech/rámcích (scope)</a>. Zvlášť u cyklů je lepší použít <code>var</code>.</p>

<h2 id="funkce">Funkce</h2>

<p>Funkce jsou mezi oběma jazyky asi nejpodobnější. Následující kód například funguje v obou jazycích bez úpravy (<a href="http://kod.djpw.cz/qqcb">ukázka</a>).</p>

<pre><code>function pozdrav($text) {
    return ($text);
}</code></pre>

<h2 id="retezce">Skládání řetězců</h2>

<p>Významný rozdíl je naopak při skládání řetězců:</p>

<ul>
  <li>PHP používá tečku.
    <pre><code>echo "Ahoj, " <b>.</b> $promenna;</code></pre>
  </li>
  <li>JavaScript znak <code>+</code>.
    <pre><code>alert("Ahoj, " <b>+</b> promenna);</code></pre></li>
</ul>


<h2 id="cykly">Cykly</h2>

<p>Klasický <code>for</code> cyklus od určitého čísla do jiného čísla je skoro identický.</p>

<h3>PHP</h3>
<pre><code>for ($i = 0; $i &lt;= 10; $i++) {
}</code></pre>

<h3>JS</h3>
<pre><code>for (<b>var</b> i = 0; i &lt;= 10; i++) {
}</code></pre>


<h2 id="prochazeni-polem">Procházením polem</h2>

<h3 id="foreach">Cyklus <code>foreach</code></h3>

<p>Klasický cyklus v PHP:</p>

<pre><code>$polozky = array("jedna", "dva", "tri");
foreach ($polozky as $polozka) {
  // $polozka
}</code></pre>

<p>Vypadá v JS následovně (<a href="http://kod.djpw.cz/rqcb">ukázka</a>):</p>

<pre><code>var polozky = ["jedna", "dva", "tri"];
for (var polozka in polozky) {
  // polozky[polozka]
}</code></pre>

<h2 id="podminky">Podmínky</h2>

<p>Podmínky jsou hodně podobné. Asi největší rozdíl je v tom, že <code>else if</code> se v JavaScriptu píše s mezerou. PHP připouští obě varianty.</p>

<pre><code>if (neco) {
}
else<b> </b>if (necoJineho) {
  // bez mezery to skoční v JS chybou
}
else {
}</code></pre>

<h3 id="ternarni-operator">Ternární operátor</h3>

<p>Funguje v obou jazycích podobně:</p>

<pre><code>var vysledek = (neco == necemuJinemu) ? "ano" : "ne";</code></pre>

<h2 id="konstanty">Konstanty</h2>
<p>Pro PHP konstantu:</p>

<pre><code>&lt;?php
define("KONSTANTA", "hodnota");</code></pre>

<p>Má JS klíčové slovo <code>const</code>:</p>

<pre><code>const KONSTANTA = "hodnota";</code></pre>

<p>Ale funguje až od <b>IE 11</b> (v <b>IE 10</b> a starších nikoliv). Ve staré <b>Opeře 12</b> se potom <code>const</code> ignoruje – hodnotu proměnné lze stále změnit. Ve <b>Firefoxu</b> a <b>Chrome</b> skutečné konstanty fungují.</p>

<p>Kvůli <b>nedostatečné podpoře</b> je proto lepší psát:</p>

<pre><code><b>var</b> KONSTANTA = "hodnota";</code></pre>

<p>Jelikož JS hledí na velikost písmen v proměnných, tak ani <b>nehrozí kolise</b>. Nebo je řešení si vytvořit <i>objekt</i>:</p>

<pre><code>var konstanty = {
  prvni : "hodnota",
  druha : "dalsi hodnota"
};
// konstanty.prvni;</code></pre>

<h2 id="php-funkce">PHP funkce v JavaScriptu</h2>

<p>Spousta PHP funkcí napodobených v JS je na <a href="http://phpjs.org/functions/">stránce phpjs.org</a> připravena rovnou k použití.</p>