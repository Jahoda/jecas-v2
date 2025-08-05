---
title: "Hlasování v anketě pouze jednou"
headline: "Hlasování v anketě pouze jednou"
description: "Jak umožnit návštěvníkům hlasovat v anketě pouze jednou."
date: "2015-04-02"
last_modification: "2015-04-05"
status: 1
tags: ["napady", "zabezpeceni"]
format: "html"
---

<p>Pokud je na stránce anketa a je cílem, aby hlasování nemohlo být záměrně příliš zmanipulované, je vhodné podniknout několik kroků.</p>




<h2 id="cookies">Uložení cookie</h2>

<p>Ukládat cookie jako ověření, zda uživatel hlasoval, <b>je v podstatě k ničemu</b>. Cookies jdou v prohlížeči vypnout nebo vymazat. Uživatel může mít víc prohlížečů a navíc v dnešní době existují prohlížeče umožňující <b>otevření anonymního okna</b>, čímž ochrana pomocí cookie nebude funkční.</p>

<p>Pokud je <b>anketa nechráněná</b> vůbec nebo nechráněná pomocí cookies, stačí si v prohlížeči spustit jednoduchý skript a hlasy budou díky <a href="/odpocitavani">časovači <code>setTimeout</code></a> bleskově naskakovat:</p>

<pre><code>setInterval(
  function() {
      var img = new Image();
      img.src = "http://example.com/hlasovat?volba=1";
  }, 
  1000 // Hlasování každou vteřinu
);</code></pre>












<h2 id="ip">Kontrola IP adresy</h2>

<p>Ověřování IP adresy vyžaduje ukládání jednotlivých hlasů (ideálně do DB) a následné testování, jestli daná IP adresa již nehlasovala.</p>

<p>Omezení na IP adresy má lehké <b>nedostatky</b>:</p>

<ol>
  <li>
    <p>Více uživatelů může mít jedinou IP adresu, ale hlasovat bude moci jen ten první.</p>
  </li>
  
  <li>
    <p>Jeden uživatel může mít více IP adres. Doma, v práci, během dne při připojení z mobilních zařízení není problém mít hned vyšší jednotky různých IP adres.</p>
    
    <p>Kromě toho jde použít různé anonymisery, VPN a proxy servery.</p>
    
    <p>Ve větších městech se stačí projít po ulici a připojovat se k různým otevřeným Wi-Fi sítím.</p>
  </li>
</ol>




<h2 id="csrf">Ochrana před CSRF</h2>

<p>I při kontrole IP je naprosto klíčové mít u ankety <a href="/bezpecnost#csrf">ochranu před CSRF</a>. Bez takové ochrany může hlasování snadno zmanipulovat majitel hodně navštěvovaného webu, když bude prostřednictvím svých návštěvníků tajně hlasovat.</p>

<p>Stačí k tomu jednoduché pingnutí pomocí JS na hlasovací skript.</p>

<pre><code>var img = new Image();   
img.src = "http://example.com/hlasovat?volba=1";</code></pre>




<p>Případně vložení obrázku značkou <code>&lt;img></code>:</p>

<pre><code>&lt;img scr="http://example.com/hlasovat?volba=1"></code></pre>


<p>Takové hlasování se potom tváří zcela legitimně.</p>




<h2 id="registrace">Registrace</h2>

<p>Registrace dokáže vyřešit/omezit problém, kdy jeden člověk dokáže hlasovat z více IP adres. Registrace zabere nějaký čas, což zvýší pracnost a sníží tak motivaci hlasování manipulovat.</p>

<p>Na druhou stranu <b>nutnost registrace</b> odradí mnohé <i>poctivé</i> zájemce o hlasování. Řešení může být požadovat přihlášení přes <a href="/facebook">Facebook</a>/<a href="/twitter">Twitter</a> účet, kterým disponuje prakticky každý a přihlášení je otázka několika málo kliknutí.</p>





<h2 id="ukladani-dat">Ukládání údajů</h2>

<p>V každém případě je ideální si ke každému hlasu ukládat co možná nejvíce dat. Půjde případně zpětně vyloučit podivné hlasy.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<div class="external-content">
  <ul>
    <li>PHP Triky: <a href="http://php.vrana.cz/unikatnost-navstevnika.php">Unikátnost návštěvníka</a> – technické řešení ochrany unikátnosti návštěvníka</li>
  </ul>
</div>