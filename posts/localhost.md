---
title: "Instalace Apache, PHP a MySQL za 30 vteřin"
headline: "Instalace Apache, PHP a MySQL za 30 vteřin"
description: "Jak si ve Windows spustit vlastní Apache, PHP a MySQL na svém PC za půl minuty."
date: "2014-05-12"
last_modification: "2017-05-26"
status: 1
tags: ["php", "produktivita", "sql"]
format: "html"
---

<p>Pro <b>programování v PHP</b> se většinou hodí mít možnost spouštět skripty na vlastním počítači, tzv. na <i>localhostu</i>. Je sice možné používat <b>vzdálený webhosting</b> a soubory upravovat a zkoušet přímo tam, ale lokální server mívá <b>lepší odezvu</b>.</p>








<h2 id="vlastni-hotove">Vlastní, nebo hotové řešení?</h2>

<p>Jedna možnost, jak vlastního serveru docílit, je instalace jednotlivých aplikací vlastnoručně. Tedy nainstalovat si:</p>

<ul>
  <li><b>Apache</b> (webový server)</li>
  <li><b>PHP</b> (podpora skriptování)</li>
  <li><b>MySQL</b> (database)</li>
</ul>

<p>A <i>nějak</i> to nastavit, aby to dohromady fungovalo.</p>

<p>Dle mého názoru je to <b>zbytečně pracné a zdlouhavé</b>. Pohodlnější je použít hotový balík, který všechno nainstaluje sám a další nastavování je povětšinou dostupné z <b>grafického rozhraní</b> a ne jen prostřednictvím konfiguračních souborů.</p>







<h2 id="wamp">WampServer</h2>

<p>Osobně se mi osvědčil WampServer.</p>

<p><img src="/files/localhost/wamp.png" alt="Obrázek WAMP serveru" class="border"></p>

































<p><a href="http://www.wampserver.com/en/" class="button">Stáhnout WAMP Server</a></p>

<p>Po stažení a prostém nainstalování jsou důležité následující údaje.</p>

<dl>
  <dt>Složka pro umístění skriptů</dt>
  <dd>
    <pre><code>C:\wamp\www</code></pre>
  </dd>
  
  <dt>Zobrazení obsahu</dt>
  <dd>
    <pre><code><a target="_blank" href="http://localhost">http://localhost</a></code></pre>
  </dd>
  
  <dt>Přihlašovací údaje k MySQL</dt>
  <dd>
    <ul>
      <li>Server: <code>localhost</code></li>
      <li>Jméno: <code>root</code></li>
      <li>Heslo: (prázdné)</li>
    </ul>
  </dd>
</dl>








<h2 id="mysql">Správa MySQL</h2>

<p>Pro práci s DB (vytváření tabulek a podobně) je předinstalovaný nástroj <b>phpMyAdmin</b> (<code>http://localhost/phpmyadmin/</code>).</p>

<p>Osobně ale dávám přednost <a href="http://adminer.org">Admineru</a>. Stačí <a href="http://www.adminer.org/#download">stáhnout</a> <i>pouze českou versi pro MySQL</i></p>






<h2 id="nastaveni">Nastavení serveru</h2>

<p>V případě, že se nastavení serveru na našem webhostingu liší od výchozího nastavení WAMPu, není problém si pohodlně zapínat různá <b>rozšíření a moduly</b>.</p>

<p>Veškeré nastavování (stejně jako spouštění/zastavování/restartování služeb) probíhá po kliknutí <b>levým tlačítkem</b> na ikonu WAMPu v hlavním panelu Windows vedle hodin.</p>

<p><img src="/files/localhost/ikona.png" alt="Ikona WAMP serveru" class="border"></p>











<h3 id="apache">Apache</h3>

<p>U Apache se dá přímo zaškrtávat moduly, které mají běžet. V dnešní době je prakticky nezbytné například zapnout <code>rewrite_module</code> pro přepisování adres. Pro <i>cacheování</i> se potom hodí <code>expires_module</code>.</p>

<p>Ruční nastavování je možné provádět v souboru <code>httpd.conf</code> (vede na něj odkaz z menu WAMPu).</p>

<p><img src="/files/localhost/apache-moduly.png" alt="Zapínání Apache modulů" class="border"></p>




















<h3 id="php">PHP</h3>

<p>PHP má odděleno nastavení a rozšíření (<i>PHP settings</i> a <i>PHP extensions</i>):</p>

<p><img src="/files/localhost/nastaveni-php.png" alt="Zapínání Apache modulů" class="border"></p>




















<p>Pro <a href="/stazeni-stranky">získávání obsahu cizích stránek</a> se hodí v <b>nastavení</b> zapnout <code>allow_url_fopen</code>. K přístupu k serverům běžícím na HTTPS se zase hodí zapnout <i>exstenzi</i> <code>php_openssl</code> a pro <b>pracování s obrázky</b> potom <code>php_gd2</code>.</p>

<p>Nastavování přes <b>konfigurační soubor</b> se provádí v souboru <code>php.ini</code> (také na něj vede odkaz z nabídky).</p>


<h2 id="virtual-host">VirtualHosts</h2>

<p>Při souběžném provozování více projektů se může hodit používat tzv. <i>virtual hosty</i>.</p>

<p>Díky tomu jde docílit hezčích adres než <code>localhost/projekt</code>. Třeba v podobě běžné domény – např. <code>projekt.cz</code> nebo <code>projekt.local</code>.</p>


<p><b>Jak na to?</b></p>

<ol>
  <li>
    <p>V souboru <code>hosts</code> ve Windows (umístění <code>C:\Windows\System32\drivers\etc</code>) přidat na konec souboru:</p>  
  <pre><code>127.0.0.1 projekt.local</code></pre>
    <p>To zajistí, že se požadavek na „<code>projekt.local</code>“ pošle na lokální umístění (adresa <code>127.0.0.1</code>), tedy <i>localhost</i>.</p>
  </li>
  
  <li>
    <p>V souboru <code>httpd-vhosts.conf</code> nastavit umístění souborů pro danou <i>doménu</i>. K <code>httpd-vhosts.conf</code> se jde proklikat z nabídky WAMPu v kategorii <i>Apache</i> nebo je umístěn v <code>C:\wamp64\bin\apache\apache2.4.23\conf\extra</code>.</p>
    
    <p>Jednotlivé <i>virual hosty</i> jdou nastavit následovně:</p>
    
    <pre><code>&lt;VirtualHost *:80>
	ServerName projekt.local
	DocumentRoot c:/projekt/
	&lt;Directory  "c:/projekt/">
		Options +Indexes +Includes +FollowSymLinks +MultiViews
		AllowOverride All
		Require local
	&lt;/Directory>
&lt;/VirtualHost></code></pre>
  </li>
</ol>

















<p>Nyní by se po restartu Apache a zadání <code>projekt.local</code> do adresního řádku měl zobrazit obsah z <code>c:/projekt</code>.</p>


<h2 id="problemy">Řešení problémů</h2>

<h3 id="port">Obsazený port</h3>

<p>Může se stát, že WAMP z ničeho nic <b>přestane fungovat</b>. Typicky po nainstalování nějaké aplikace, která obsadí port 80 (ten používá WAMP ve výchozím nastavením).</p>

<p><img src="/files/localhost/test-port.png" alt="Otestování portu 80" class="border"></p>






















<p>V případě, že je <b>blokování portu</b> důvod, proč server neběží, se při testu portu 80 zobrazí název aplikace, která dělá problémy.</p>

<p><img src="/files/localhost/microsoft-iis.png" alt="Microsfot IIS blokue port 80" class="border"></p>






<p>Řešení je tedy takovou aplikaci odinstalovat, vypnout, změnit u ní číslo portu nebo totéž změnit u <i>Apache</i>.</p>

<p>Službu <i>Microsoft-IIS/7.5</i> z obrázku je možné vypnout v <i>Ovládací panely\Systém a zabezpečení\Nástroje pro správu\Správce Internetové informační služby</i>.</p>



<h3 id="zmena-portu">Změna portu</h3>

<p>WAMP přímo nabízí možnost číslo portu změnit. Po kliknutí pravým tlačítkem na ikonku WAMPu v oznamovací oblasti, je tato možnost pod volbou <i>Tools → Use a port other than 80</i>.</p>

<p>Do zobrazeného dialogu stačí zadat jiné číslo (např. <code>8080</code>). Adresa serveru potom nebude <code>localhost</code> ale <code>localhost:<b>8080</b></code>.</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Pehapko.cz: <a href="http://pehapko.cz/sprava-serveru/instalace">Instalace prostředí pro běh PHP skriptů</a></li>
  <li>Programujte.com: <a href="http://programujte.com/clanek/2014021500-instalace-nejnovejsi-verze-apache-2-4-php-5-5-mysql-5-6-phpunit-xdebug-a-memcached-na-windows-8/">Samostatná ruční instalace všech služeb</a></li>
</ul>