---
title: "Přesun Wordpressu"
headline: "Přestěhování Wordpressu na jiný server"
description: "Jak přenést web běžící na redakčním sytému Wordpressu na jiný server."
date: "2014-08-26"
last_modification: "2015-05-26"
status: 1
tags: ["cms", "napady", "wordpress"]
format: "html"
---

<h2 id="zaloha">Záloha ze starého webu</h2>

<p>Z původního serveru, odkud se Wordpress stěhuje, je nutné:</p>

<ol>
  <li>
    <p><b>Vyexportovat databasi</b> – na (skoro) každém hostingu bývá k disposici <i>PHPMyAdmin</i>. Stejně dobře jde použít <a href="http://adminer.org">Adminer</a>. Výhoda <i>Admineru</i> je, že si ho člověk sám <b>nahraje na server</b> a nemusí zkoumat, jak se dostat do PHPMyAdminu.</p>
    
    <p>Přihlašovací údaje je ideální získat z konfiguračního souboru Wordpressu. Ten se jmenuje <code>wp-config.php</code> a je v hlavním adresáři. Potřebné přihlašovací údaje jsou:</p>
    
    <pre><code>/** MySQL database username */
define('DB_USER', '<b>uživatelské jméno</b>');

/** MySQL database password */
define('DB_PASSWORD', '<b>heslo</b>');

/** MySQL hostname */
define('DB_HOST', '<b>server</b>');</code></pre>
    
    
    
    
    
    
    
    
    
    
    
    <p>V Admineru po přihlášení a výběru DB stačí zvolit odkaz <i>Export</i> a nastavení ponechat výchozí nebo případně nastavit <i>Výstup</i> na <i>gzip</i> (to je komprese, takže teoreticky může být export datově menší).</p>
    
    <p>
      <img src="/files/wordpress-presun/export.png" alt="Export v Admineru" class="border">
    </p>
  </li>
  
  
  
  
  
  
  
  
  
  
  
  
  
  <li>
    <p><b>Stáhnout si soubory z FTP</b> – nějakým FTP programem (například <b>Total Commander</b>) pro pozdější nahrání obsahu celého webu na nové umístění.</p>
  </li>
</ol>


<h2 id="presun">Přesun na nový server</h2>

<p>Na nový server stačí <b>nahrát přes FTP</b> soubory, <i>Importovat</i> obsah do DB a v souboru <code>wp-config.php</code> nastavit přihlašovací údaje k DB pro nový server.</p>

<p>Import database jde kromě klasického nahrání přes <b>rozhraní prohlížeče</b> udělat i pomocí uploadu exportu z DB do složky s <i>Adminerem</i> a pojmenováním <code>adminer</code> (<code>adminer.sql</code> nebo <code>adminer.sql.gz</code> v případě <i>gzip</i> výstupu). To se může hodit zvlášť v případě, kdy je vyexportovaná database <b>příliš velká</b> a nešla by kvůli tomu uploadovat pomocí prohlížeče.</p>

<p><img src="/files/wordpress-presun/import.png" alt="Export v Admineru" class="border"></p>




















<p>V ideálním případě by nyní měl web fungovat jako předtím.</p>




<h2 id="zmena-domeny">Přesun na jinou doménu</h2>

<p>Při změně domény je nejjednodušší funkcí <i>Najít a nahradit</i> upravit dump z database (vyexportovaný soubor <code>*.sql</code>).</p>

<p>Nahradit všechny výskyty <code>nazev-stare-domeny.cz</code> za <code>nova-domena.cz</code>.</p>

<p>U větších exportů může být problematické pracovat s datově velkým souborem v textovém editoru. Potom je řešení nahrazení v MySQL funkcí <code>REPLACE</code>.</p>





<h2 id="problemy">Možné problémy</h2>

<p>Zatímco <i>čistý Wordpress</i> by neměl při přesunu dělat problémy. Ne tak to platí pro pluginy.</p>

<p>Může se tak po přesunu stát, že nějaký plugin způsobí <i>Bílou obrazovku smrti</i>, kdy se na adrese webu vůbec nic neobjeví.</p>

<p>Pro zjištění příčin pomocí <b>vypsání chybových hlášek</b> je nutné zapnout <i>debugovací režim</i> v souboru <code>wp-config.php</code>:</p>

<pre><code>define('WP_DEBUG', <b>true</b>);</code></pre>


<p>Typicky to způsobují pluginy, které si někam ukládají <b>absolutní cesty</b> svého umístění. Třeba u doplňku <b>Quick cache</b> se kvůli tomu musí přepsat adresa v konstantě <code>QUICK_CACHE_PLUGIN_FILE</code> v souboru <code>/wp-content/advanced-cache.php</code>.</p>

<p>Některé pluginy mohou <i>rozbít</i> Wordpress do té míry, že nepůjde spustit ani administraci a tam je <b>přeinstalovat</b>. Proto je sázka na jistotu pluginy před přesouváním odstranit.</p>

<p>Po zprovoznění WP na novém serveru se nesmí zapomenout v <code>wp-congif.php</code> <b>vypnout testovací režim</b>:</p>

<pre><code>define('WP_DEBUG', <b>false</b>);</code></pre>






<h2 id="cache">Pozor na zapnutou cache</h2>

<p>Pokud se něco při přesunu rozbilo a je zapnuté zobrazování chyb (<code>WP_DEBUG</code> nastavené na <code>true</code>) a případná chyba se opraví, nemusí se <b>projevit výsledek</b> vlivem zapnutého cacheování pomocí nějakého pluginu.</p>

<p>Člověk potom chybu opraví, ale stále se objevuje stejná chybová hláška z cache. Pro odladění je tedy dobré cache vypnout. Jde to rovněž v souboru <code>wp-config.php</code>.</p>

<pre><code>define('WP_CACHE', <b>FALSE</b>);</code></pre>







<h2 id="bila-stranka">Pouze bílá stránka</h2>

<p>Pokud se i přes vypnutí cache a zapnutí zobrazování chyb zobrazuje místo webu <b>prázdná bílá stránka</b>, může být na vině neaktuální stav DB, který vznikne při updatu samotného WordPressu.</p>

<p>Řešením je přejít do administrace (dostupné na URL: <code>nazevwebu.cz/<b>admin</b></code>) a aktualisaci database tam dokončit, čímž by web měl začít fungovat.</p>






<h2 id="zmena-prefixu">Změna prefixů tabulek</h2>


<p>Pokud se z nějakého důvodu musí <b>změnit prefix</b> (výchozí je <code>wp_</code>) jednotlivých tabulek v DB (například hosting nepodporuje vytvoření více databasí), přináší to jisté komplikace.</p>

<p>V SQL exportu je nejprve nutné <b>hromadně změnit názvy tabulek</b>:</p>

<p>Tj. příkazy typu:</p>

<pre><code>INSERT INTO `wp_options`</code></pre>




<p>Nahradit za:</p>

<pre><code>INSERT INTO `<b>prefix</b>_options`</code></pre>


<p>A podobně. Při změně z výchozího <code>wp_</code> je ideální nahrazovat řetězec „<code>`wp</code>“ na „<code>`prefix</code>“.</p>


<p>Odkazy na název buněk jsou na několika místech <i>zadrátovány</i> v datech v DB. Je to udělané tak nešťastně, že nestačí provést změnu v proměnné <code>$table_prefix</code> v souboru <code>wp-config.php</code>:</p>

<pre><code>$table_prefix  = 'prefix_';</code></pre>




<p>Při zkopírování původní database a změně prefixů v DB i v konfiguračním souboru se po přihlášení zobrazí následující chybová hláška.</p>

<blockquote>
  <p>Nemáte dostatečné oprávnění pro přístup na tuto stránku.</p>
</blockquote>




<p>Případně anglicky:</p>

<blockquote>
  <p lang="en">You do not have sufficient permissions to access this page.</p>
</blockquote>



<p>Pro nápravu je nutné provést pár změn i v přímo datech SQL exportu. Týká se to tabulky <code>wp_options</code>, kde je nutné změnit <code>wp_user_roles</code> na <code><b>prefix</b>_user_roles</code>.</p>

<p><img src="/files/wordpress-presun/zmena-klice.png" alt="Změna prefixu nastavení" class="border"></p>

<p>Možná je ještě potřeba provést stejné úpravy v tabulce <code>wp_usermeta</code> u klíčů <code>wp_capabilities</code> a <code>wp_user_level</code>.</p>