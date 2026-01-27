---
title: "Úprava CSS/JS na ostrém serveru"
headline: "Připojení lokálního CSS/JS na ostrý server"
description: "Jak na ostrý server připojit pro vývoj a testování lokální styly nebo skripty."
date: "2014-10-02"
last_modification: "2015-08-20"
status: 1
tags: ["napady", "produktivita"]
format: "html"
---

<p>Existují různé způsoby, jak se vypořádat s <b>implementací úprav</b> do živé (již běžící) webové stránky.</p>

<p>Ideální je zpravidla mít identickou kopii ostrého webu pro vývoj a testování, ne vždy ale je takového stavu reálné dosáhnout.</p>

<p>Asi nejextrémnější způsob úprav je spojení vývojové (<i lang="en">development</i>), testovací (<i lang="en">testing</i>) a produkční části (<i lang="en">production</i>) do jedné a <b>provádění úprav přes FTP</b> přímo na ostrém serveru.</p>

<figure>
  <img src="/files/pripojeni-lokalnich-souboru/fixing-bug.jpg" alt="Ilustrační obrázek provádění úprav na ostrém serveru" class="border">
  <figcaption>
    Ilustrační obrázek provádění oprav přímo v produkčním prostředí
  </figcaption>
</figure>


































<blockquote>
  <p>Tomuhle workflow se vyhýbám jako čert kříži. :)</p>
  
  <p>I malé úpravy menších webů dělám nejdříve na lokální kopii, a pak přes FTP nahrávám ven. Díky <a href="/st-ftp">Sublime SFTP</a> je to workflow podobně jednoduché jako editace na serveru. Jsem ale klidnější, že nic nerozbiju.</p>
  
  <p class="autor"><a href="http://www.vzhurudolu.cz/martin">Martin Michálek</a></p>
</blockquote>



<p>Ačkoliv pro řadu lidí je způsob <b>upravování přímo na ostrém serveru</b> pravděpodobně hodný zavržení, pro rychlé úpravy méně významných webů takové řešení může dávat smysl. Je to <b>rychlé</b> a případné výpadky během úprav u málo navštěvovaného webu <b>příliš lidí nepostihnou</b>.</p>




<p>Weboví tvůrci, kteří pracují hlavně s <b>CSS nebo JavaScriptem</b>, mají navíc tu výhodu, že si potřebné <b>CSS/JS soubory</b> mohou připojit k ostrému webu z vlastního lokálního PC nebo vlastního serveru, bez toho, aby úpravy ovlivnily návštěvníky.</p>

<p>Existuje několik možností:</p>




<h2 id="mapovani">Mapování souboru v Chrome</h2>

<p>V prohlížeči <b>Chrome</b> jde ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> na kartě zdroje (<i lang="en">Sources</i>) připojit lokální složku se soubory:</p>

<ol>
  <li>
    <p><b>Přidání složky</b> – po kliknutí pravým tlačítkem se objeví možnost pro přidání složky.</p>
    <p><img src="/files/pripojeni-lokalnich-souboru/add-folder.png" alt="Přidání složky se soubory" class="border"></p>
  </li>
  
  
  
  
  <li>
    <p><b>Povolení přístupu do složky</b></p>
    <p><img src="/files/pripojeni-lokalnich-souboru/pristup.png" alt="Povolení přístupu" class="border"></p>
    
  </li>

  <li>
    <p><b>Namapování souboru z lokální složky</b></p>
    
    <p>Je třeba kliknou pravým tlačítkem na lokální soubor a zvolit <i lang="en">Map to network resource…</i></p>
    
    <p><img src="/files/pripojeni-lokalnich-souboru/mapovani.png" alt="Namapování souboru" class="border"></p>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

  </li>

  <li>
    <p><b>Vybrání lokálního souboru</b></p>

        
    <p>Následně potom vybrat soubor ze serveru, který se má <i>nahradit</i>:</p>
    
        <p><img src="/files/pripojeni-lokalnich-souboru/mapovani-soubor.png" alt="Namapování souboru z webu" class="border"></p>
  </li>  
</ol>



<p>Nyní by se měl obsah souboru <code>lokalni-styl.css</code> rovnou projevovat během úprav ve vývojářských nástrojích.</p>

<p><img src="/files/pripojeni-lokalnich-souboru/upravy.png" alt="Úpravy souboru" class="border"></p>




<p>Obsah jde i uložit klávesovou zkratkou <kbd>Ctrl</kbd> + <kbd>S</kbd>. Stejně tak jde soubor upravovat i v běžném editoru (třeba <a href="/st">Sublime Text</a>), jenom pro projevení změn je po uložení v editoru nutné kliknout do editačního prostoru souboru ve vývojářských nástrojích, což je trochu nepohodlné.</p>




<h2 id="livestyle">Živý náhled LiveStyle</h2>

<p>Doplněk <i>LiveStyle</i> do prohlížeče <b>Chrome</b> a <b>Sublime Text</b> jde použít i pro vzdálené úpravy na serveru.</p>

<div class="internal-content">
  <ul>
    <li><a href="/zivy-nahled-css">Živý náhled editovaného CSS</a> – přemapování CSS souboru z webu na CSS otevřené v Sublime Text</li>
  </ul>
</div>

<p>Řešení je to tedy pouze pro CSS. Bohužel namapování lokálního souboru nepřežije obnovení stránky / nebo přechod na jinou – v takovém případě se opět styly <b>načtou ze serveru</b> – změny v lokálním CSS se objeví až po další úpravě.</p>

<p>Při dramatičtějších úpravách nemusí výsledek úplně odpovídat realitě.</p>



<h2 id="fiddler">Fiddler</h2>

<p>Autor nejlepšího českého <a href="http://programio.havrlant.cz/">blogu o programování</a> – <b>Lukáš Havrlant</b> – přišel s myšlenkou použít nástroj <b>Fiddler</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.telerik.com/fiddler">Fiddler</a> – The free web debugging proxy 
 for any browser, system or platform</li>
  </ul>
</div>

<p>Fiddler dokáže monitorovat síťový přenos, zkoumat HTTP hlavičky a další věci, kromě toho umí i <b>podstrčit při požadavku na danou URL jiný obsah</b>, což se pro připojení lokálního CSS nebo JS perfektně hodí.</p>

<p>Tato funkce se jmenuje <i>AutoResponder</i>. Postup je následující:</p>

<ol>
  <li>Po spuštění Fiddleru načíst požadovanou stránku. To zajistí, že se ve Fiddleru objeví načítané soubory.</li>
  
  <li>Vybrat v levé části soubor, který se má nahradit.</li>
  
  <li>Přepnout se na kartu <b>AutoResponder</b> a aktivovat automatické odpovědi (<i lang="en">Enable automatic responses</i>).</li>
  
  <li>Přidat pravidlo pro nahrazení souboru. Důležité je zaškrtnout <i lang="en">Unmatched requests passthrough</i> a nezaškrtnou <i lang="en">Match only once</i> vpravo dole.</li>
</ol>

<p><img src="/files/pripojeni-lokalnich-souboru/fiddler-nastaveni.png" alt="Podstrčení vlastního CSS z disku" class="border"></p>






























<p>Hlavní výhoda tohoto postupu je <b>funkčnost napříč všemi prohlížeči</b>. Stačí nastavit jednou a ve všech prohlížečích na daném PC se bude soubor stahovat z lokálního umístění.</p>

<p>Použití Fiddleru jde navíc i zkombinovat s programem <b>LiveReload</b> a zajistit si tak <b>automatické obnovení prohlížeče</b> při změnách souborů ze sledované složky.</p>

<div class="internal-content">
  <ul>
    <li><a href="/livereload">Automatické obnovení stránky při uložení</a> – instalace, nastavení a používání LiveReloadu</li>
  </ul>
</div>



<h3 id="problemy">Možné problémy</h3>

<dl>
  <dt>CSS/JS soubor se nebere z lokálního úložiště</dt>
  
  <dd>
    <p>Po spuštění Fiddleru může být nutné <b>restartovat prohlížeč</b>, jinak se nemusí zachycené požadavky zobrazovat.</p>
  </dd>
  
  <dt>Úprava webu běžícího na HTTPS</dt>
  <dd>
    <p>Stránka běžící na <a href="/https">HTTPS</a> vyžaduje, aby Fiddler dešifroval obsah. Je k tomu nutné přijmout jeho certifikát.</p>
  </dd>
</dl>


<h2 id="user-css-js">Uživatelské styly a skripty</h2>

<p>Do novějších prohlížečů existují doplňky pro <b>připojení uživatelského CSS/JS</b>. Těmi jde rovnou <i>přebít</i> obsah na straně serveru (načítají se až po stylech a skriptech ze serveru).</p>

<p>Přebíjení je ale značná <b>nevýhoda u CSS</b>, kde například nepůjde nežádoucí deklarace smazat, ale budou se muset <i>vyresetovat</i>/přenastavit.</p>



<h2 id="upravy-server">Úpravy na straně serveru</h2>

<p>V serverovém skriptu běžícím na ostrém webu jde udělat <i>výhybku</i> pomocí detekce IP adresy.</p>



<h3 id="php">PHP podmínka pro IP adresu</h3>

<p>V PHP se IP adresa získá z <a href="/server#remote-addr">pole <code>$_SERVER</code></a>. Celé řešení může vypadat následovně:</p>

<pre><code>&lt;?php
if ($_SERVER["REMOTE_ADDR"] !== "<a href="/ip"><b>Moje IP adresa</b></a>"):
?>
&lt;link rel="stylesheet" href="styl.css">
&lt;?php
else:
?>
&lt;link rel="stylesheet" href="<b>http://localhost/</b>styl.css">
&lt;?php
endif;
?></code></pre>









<p>Jiné CSS jde potom připojit:</p>

<ul>
  <li>z lokálního serveru (tzv. <i>localhostu</i>),</li>
  <li>z jiného serveru,</li>
  <li>jako jiný CSS soubor ze stejného serveru</li>
</ul>



<p>Analogický bude postup pro JavaScripty.</p>

<p>Aby nehrozil problém se starým obsahem <b>kvůli cacheování</b>, jde do adresy souboru vygenerovat nějaké náhodné smetí, které zajistí vždy čerstvou podobu souboru:</p>

<pre><code>&lt;script>
document.write("&lt;script src=\"http://localhost/skript.js?" + Math.random() + "\">&lt;\/script>");
&lt;/script></code></pre>







<h3 id="htaccess">Podstrčení souborem <code>.htaccess</code></h3>

<p>Bylo-li by <b>komplikované přidávat podmínku</b> do serverových skriptů pro připojení různých souborů na základě IP adresy, jde něco obdobného zanést do souboru <code>.htaccess</code>.</p>


<p>Řekněme, že CSS soubory budou v adresáři <code>styly</code> a JS v adresáři <code>skripty</code>. Následující přepis v <code>.htaccess</code> zajistí, aby se pro zadanou IP adresu hledaly soubory ve složkách <code>testovaci-styly</code> a <code>testovaci-skripty</code>:</p>

<pre><code>RewriteEngine On
RewriteCond %{REMOTE_HOST} ^127\.0\.0\.1
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^styly/(.+\.css)$ testovaci-styly/$1

RewriteCond %{REMOTE_HOST} ^127\.0\.0\.1
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^skripty/(.+\.js)$ testovaci-skripty/$1</code></pre>











<h2 id="kopie">Lokální kopie</h2>

<p>Asi nejprostší je postup, kdy se statické HTML a příslušné CSS/JS zkrátka <b>uloží na disk</b> a po odladění se styly a skripty nahrají zpět na ostrý server.</p>

<p>Aby se nemusely <b>stahovat úplně všechny</b> připojené soubory (i obrázky a podobně), jde si vypomoci značkou <a href="/base"><code>&lt;base></code></a> a změnit jen <code>&lt;link href></code>y a <code>&lt;script src>y</code> souborů, které je potřeba upravovat.</p>

<p>Tento způsob bude ale pro úpravu webu o hodně podstránkách <b>dost komplikovaný</b>, protože se bude muset stáhnout a upravit každá jedna stránka.</p>


<!--
<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Video: <a href="https://www.youtube.com/watch?v=B63jNjSVEbQ">Advanced Debugging Techniques with Chrome</a></li>
</ul>
-->