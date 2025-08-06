---
title: "Přesun CMS Joomla!"
headline: "Přestěhování systému Joomla!"
description: "Jak zkopírovat web běžící na redakčním sytému Joomla! na jiný server."
date: "2015-01-27"
last_modification: "2015-01-31"
status: 1
tags: ["cms", "napady"]
format: "html"
---

<h2 id="zaloha">Záloha ze starého webu</h2>

<p>Z původního serveru, odkud se Joomla! stěhuje, je nutné provést:</p>

<ol>
  <li>
    <p><b>Export database</b> – na webhostingu bývá většinou k disposici <i>PHPMyAdmin</i>. Dá se využít i <a href="http://adminer.org">Adminer</a>. Plus <i>Admineru</i> je, že jde snadno <b>uploadovat na server</b>, takže není nutné zkoumat, jak se přihlásit do PHPMyAdminu.</p>
    
    <p>Přihlašovací údaje k DB jsou v konfiguračním souboru CMS Joomla. Jeho název je <code>configuration.php</code> a je v hlavním adresáři. Údaje pro <b>přihlášení do database</b> jsou:</p>
    
    <pre><code>public $host = '<b>server</b>';
public $user = '<b>uživatel</b>';
public $password = '<b>heslo</b>';
public $db = '<b>název DB</b>';</code></pre>
    
    
    
    <p>Po zalogování v Admineru a výběru database stačí vybrat <i>Export</i>.</p>
    
    <p>
      <img src="/files/wordpress-presun/export.png" alt="Export v Admineru" class="border">
    </p>
  </li>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <li>
    <p><b>Stáhnout zdrojové soubory z FTP</b> – nějakým FTP programem (například <b>FileZilla</b> nebo <b>Total Commander</b>) pro následné nahrání obsahu na nový server.</p>
  </li>
</ol>


<h2 id="presun">Převod na nový server</h2>

<p>Na nový server stačí <b>přes FTP</b> zkopírovat soubory, <i>Importovat</i> obsah do database a v souboru <code>configuration.php</code> nastavit nové přihlašovací údaje k databasi pro nový server.</p>

<p>Import DB jde kromě klasického nahrání přes <b>rozhraní prohlížeče</b> udělat i pomocí uploadu exportu z DB do složky s <i>Adminerem</i> a pojmenováním <code>adminer</code> (<code>adminer.sql</code> nebo <code>adminer.sql.gz</code> v případě <i>gzip</i> výstupu). To se může hodit zvlášť v případě, kdy je vyexportovaná database <b>příliš velká</b> a nešla by kvůli tomu uploadovat pomocí prohlížeče.</p>

<p><img src="/files/wordpress-presun/import.png" alt="Export v Admineru" class="border"></p>






















<h2 id="zmena-cesty">Změna cesty</h2>

<p>Při změně domény nebo přesun na jiný hosting se dost možná změní cesta k logům a dočasným souborům, cesty se dají přepsat opět v souboru <code>configuration.php</code>.</p>

<pre><code>public $log_path = '/home/www/example.com/logs';
public $tmp_path = '/home/www/example.com/tmp';</code></pre>



<p>V ideálním případě by po následujících úpravách měl web <b>fungovat jako předtím</b>.</p>




<h2 id="problemy">Řešení problémů</h2>

<p>Může se stát, že stránka nebude fungovat, potom je dobré <b>zapnout zobrazování chyb</b> (<a href="/chyby">chybových hlášek</a>). Pokud je povolené zobrazování chyb v nastavení serveru (vlastnost <code>display_errors</code>), v Joomle jde zapnout následovně.</p>

<pre><code>public $error_reporting = "development";</code></pre>

<p>Po úpravách potom vrátit na:</p>

<pre><code>public $error_reporting = "none";</code></pre>