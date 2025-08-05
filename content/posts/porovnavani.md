---
title: "Porovnávání == a ==="
headline: "Rozdíl mezi == a ==="
description: "Rozdíl mezi porovnáváním hodnota pomocí <code>==</code> a <code>===</code>."
date: "2014-06-17"
last_modification: "2014-06-21"
status: 1
tags: ["js", "napady", "php"]
format: "html"
---

<p>Pro porovnávání dvou hodnot existuje v PHP operátor <code>==</code>.</p>

<pre><code>$a = 1;
if ($a == 1) // něco se provede</code></pre>

<p>Porovnávání dvojitým rovnítkem ale má v PHP (ale i v JavaScriptu) svá specifika. Před samotným porovnáním totiž obsah přetypuje.</p>

<table>
  <tr>
    <th>Porovnání</th>
    <th>Výsledek</th>
  </tr>
  <tr>
    <td><code>0 == "0"</code></td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td><code>0 == 0.0</code></td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td><code>0 == ""</code></td>
    <td><code>true</code></td>
  </tr>  
</table>

<p>Kladný výsledek porovnávání <code>0 == ""</code> už může vypadat trochu divně. Ještě zvláštněji působí:</p>

<table>
  <tr>
    <th>Porovnání</th>
    <th>Výsledek</th>
  </tr>
  <tr>
    <td><code>'0e1' == 0</code></td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td><code>'1e2' == 100</code></td>
    <td><code>true</code></td>
  </tr>
</table>

<p>Zde se budou rovnat různé zápisy čísla. To <code>1e2</code> znamená 1 * 10 ^ 2.</p>

<p>Vtipná situace může potom nastat při následujícím porovnání:</p>

<table>
  <tr>
    <th>Porovnání</th>
    <th>Výsledek</th>
  </tr>
  <tr>
    <td><code>md5('240610708') == md5('QNKCDZO')</code></td>
    <td><code>true</code></td>
  </tr>
</table>

<p>Nejedná se o problém v <code>md5</code>, ale o to, že:</p>

<ul>
  <li><code>md5('240610708')</code> → <code><b>0e</b>462097431906509019562988736854</code> → <code>0</code></li>
  <li><code>md5('QNKCDZO')</code> → <code><b>0e</b>830400451993494058024219903391</code> → <code>0</code></li>
</ul>

<p>Porovnávání dvěma <code>=</code> je tedy značně nevyzpytatelné.</p>

<h2 id="tri">Tři rovná se (<code>===</code>)</h2>

<p>Použití <code>===</code> potom zajistí, že výše uvedené konstrukce skončí jako <code>false</code>.</p>

<table>
  <tr>
    <th>Porovnání</th>
    <th>Výsledek</th>
  </tr>
  <tr>
    <td><code>0 === "0"</code></td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>0 === 0.0</code></td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>0 === ""</code></td>
    <td><code>false</code></td>
  </tr>  
  <tr>
    <td><code>'0e1' === 0</code></td>
    <td><code>false</code></td>
  </tr>  
</table>


<h2 id="prevod">Automatický převod <code>==</code> na <code>===</code></h2>

<p>Některé editory/IDE navrhují používat rovnou <code>===</code>.</p>

<p>Důrazně ale varuji před <b>automatickým nahrazením</b> <code>==</code> za <code>===</code>, snadno to může vytvořit fatální chybu v případě, že programátor s chováním dvou rovnítek (a přetypováním) počítal.</p>

