---
title: "Stažení celého webu"
headline: "Stažení dynamického webu"
description: "Jak stáhnout celou webovou stránku a převést ji do statické HTML podoby."
date: "2015-02-04"
last_modification: "2015-10-22"
status: 1
tags: ["offline", "produktivita"]
format: "html"
---

<p>Z nejrůznějších důvodů může být vhodné, aby celý web byl ve <b>statických souborech</b>:</p>

<ul>
  <li>rychlost,</li>
  
  <li>nenáročnost na hosting,</li>
  
  <li>plnohodnotná offline varianta webu</li>
</ul>

<p>Tvorba statického webu je poměrně <b>náročná na údržbu</b>. Společné prvky stránek jako hlavička, menu nebo patička je nutné nějakým způsobem synchronisovat mezi sebou.</p>

<p>Jedna z možností tak může být využití klasického redakčního systému a <b>uložení jeho výstupu</b>.</p>


<h2 id="httrack">HTTrack</h2>

<p>Program HTTrack dokáže projít zadanou URL a stáhnout veškerý obsah, na který <b>vedou odkazy</b>.</p>

<p><a href="http://www.httrack.com/page/2/en/index.html" class="button">Stáhnout</a></p>

<p>Pokud stránka rozlišuje mezi návštěvníky na základě HTTP hlavičky <code>user-agent</code>, je dobré tuto hodnotu změnit na podobu obvyklou pro dnešní internetové prohlížeče.</p>

<div class="internal-content">
  <ul>
    <li><a href="/ua">Zjištění <code>user-agent</code> hlavičky prohlížeče</a></li>
  </ul>
</div>



<p>Nastavit tuto hlavičku jde v nabídce <i>Předvolby</i>:</p>


<p><img src="/files/stazeni-webu/predvolby.png" alt="Předvolby HTTrack" class="border"></p>






























<p>Po zadání požadované URL by mělo začít stahování:</p>


<p><img src="/files/stazeni-webu/stahovani.png" alt="Stahování pomocí HTTrack" class="border"></p>














<p>Stáhnout rozsáhlejší web může trvat i několik desítek minut.</p>

<p>Před začátkem stahování je dobré dát pozor na <b>omezení úrovně domén</b>, které se budou stahovat. Typicky pouze na doménu webu, který je cílem stáhnout.</p>

<p>Jinak HTTrack dokáže stahovat i stránky z <b>externích odkazů</b>, takže nakonec může stáhnout „celý internet“.</p>

<p>Stahování jecas.cz s externími zdroji nebylo dokončeno ani po 8 hodinách:</p>

<p><img src="/files/stazeni-webu/cizi-domeny.png" alt="Stahování pomocí HTTrack" class="border"></p>











<h2 id="zmena-odkazu">URL bez „.html“</h2>

<p>HTTrack standardně stahuje obsah do <code>.*html</code> souborů, na které potom vedou i <a href="/odkaz">odkazy</a>. Pokud je cílem mít odkazy bez HTML koncovky, dá se využít přepis adres pomocí <code>mod_rewrite</code> a v souborech hromadně změnit cíle všech odkazů (<code>href</code>).</p>



<h3 id="htaccess">Soubor <code>.htaccess</code></h3>

<p>Následující obsah v <code>.htaccess</code> zajistí, že se po zadání <code>example.com/obsah</code> zobrazí obsah stránky <code>obsah<b>.html</b></code>.</p>

<pre><code>RewriteEngine On
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^([^.]+)$    $1.html    [L]</code></pre>




<p>Pro stránky v <b>podadresářích</b>.</p>

<pre><code>RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [NC,L]</code></pre>






<h3 id="nahrazeni">Nahrazení <code>.html</code> v odkazech</h3>

<p>Odchytit všechny výskyty <code>.html</code> v běžných cílech odkazu jde následujícím regulárním výrazem:</p>

<pre><code>href="([A-z0-9\-]*)\.html"</code></pre>

<p>Vyhovující <code>href</code> se nahradí za:</p>

<pre><code>href="$1"</code></pre>

<p>Pro podadresáře:</p>

<pre><code>href="(\.\.\/[A-z0-9\-\/]*)\.html"</code></pre>

<pre><code>href="(\.\.\/\.\.\/[A-z0-9\-\/]*)\.html"</code></pre>








<h2 id="wget">Nástroj wget</h2>

<p>Stáhnout celé stránky jde i nástrojem wget. Ve <b>Windows</b> k tomu jde použít program <a href="http://www.cygwin.com/">Cygwin</a> a následně při instalaci nechat nainstalovat <b>balíček wget</b>.</p>

<p><img src="/files/stazeni-webu/cygwin-wget.png" alt="Cygwin wget package" class="border"></p>


































<p>Příkaz pro stažení obsahu stránky může vypadat následovně:</p>

<pre><code>wget -np -e robots=off --mirror --domains=example.com http://example.com</code></pre>






<h2 id="cizi">Stažení cizí stránky</h2>

<p>Kromě vlastních webů jde těmito postupy pochopitelně rovněž <b>stahovat stránky cizí</b>.</p>

<p>Pokud se stahování nebude dít ve velké míře a opakovaně, provozovatel webu si toho nejspíš nevšimne a v zásadě mu to ani <b>nemusí moc vadit</b>.</p>

<p>Stažení celého webu se nároky na server příliš neliší od situace, kdy by si člověk celý web proklikal.</p>

<p>Někteří autoři své weby přímo nabízí ke stažení:</p>

<ul>
  <li><a href="http://www.jakpsatweb.cz/download.html">Jak psát web</a></li>
  
  <li><a href="http://semantika.name/download.html">HTML sémantika</a></li>
  
  <li><a href="http://php.vrana.cz/verze-ke-stazeni.php">PHP triky</a></li>
</ul>



<p>Typicky si ale <b>nepřejí další šíření</b> – tj. publikování staženého obsahu na jiném webu. To bývá problém kvůli <a href="/seo">vyhledávačům</a>, protože vzniká <b>duplicitní obsah</b>.</p>