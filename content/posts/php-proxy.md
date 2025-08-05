---
title: "PHP proxy skript"
headline: "PHP proxy skript na 50 řádků"
description: "Hotový PHP skript umožňující zobrazit web prostřednictvím jiné IP adresy."
date: "2013-08-15"
last_modification: "2013-08-15"
status: 1
tags: ["hotova-reseni", "php"]
format: "html"
---

<p>Takový skript se může hodit v případě, že:</p>
<ul>
  <li>webová stránka je <b>dostupná jen z IP určité země</b>,</li>
  <li>na dané stránce má námi používaná <b>IP adresa ban</b>,</li>
  <li>požadovaná stránka je <b>blokovaná provozovatelem sítě</b>.</li>
</ul>

<p>Na internetu se online proxy nástrojů válí spoustu a nebo lze použít Google Cache. Bohužel hotové nástroje mohou mít <i>nekompatibilní</i> IP adresu a Google Cache nemusí být pro požadovanou stránku vždy dostupná.</p>

<h2>Jak si vytvořit vlastní proxy skript v PHP</h2>
<p>Je potřeba:</p>
<ol>
  <li>Stáhnout a vypsat obsah zadané URL,</li>
  <li>zajistit načtení stylů, obrázků, popř. skriptů,</li>
  <li>upravit odkazy, aby vedly opět na <i>prox skript</i>.</li>
</ol>

<h3 id=stazeni>Stažení stránky</h3>
<p>Pokud je to na serveru povolené (jedná se o nastavení <code><a href="http://www.php.net/manual/en/filesystem.configuration.php#ini.allow-url-fopen">allow_url_fopen</a></code>), obsah z URL lze stáhnout funkcí <code>file_get_contents</code>:
  <pre><code>echo file_get_contents("http://jecas.cz");</code></pre>

<h3 id=nacteni>Načtení stylů, skriptů a obrázků</h3>
<p><b>Předně</b>: Je-li cílem anonymisace prohlížení, není v podstatě možné bezpečně procházet web se zapnutým skriptováním. Na úrovni webové služby je nemožné zabránit, aby si JS na stránce mohl <i>pingnout</i> nějakou URL ze skutečné IP adresy mimo <i>proxy</i>. 
    <p>Musel by se nějak vyhodnotit veškerý JS kód, aby se třeba toto přepsalo na proxy skript, což automatickým nahrazováním půjde dost těžko.</p>
<pre><code>var a = "mg s";
var b = "g.gif";
document.write("&lt;i" + a + "rc='pin" + b + "'>");
// &lt;img src="ping.gif"&gt;</code></pre>
<p>V případě, že se s <b>možností zjistit skutečnou IP smíříme</b>, bude nejjednodušší využití <a href="/base">HTML značky <code>&lt;base&gt;</code></a> (nebude ale fungovat při zablokování adres provozovatelem sítě + nezajistí onu anonymitu). Stačí ji přidat za <a href="/doctype"><code>&lt;!doctype&gt;</code></a>, pokud na stránce existuje. (Pokud <code>&lt;!doctype&gt;</code> na stránce není, tak se přidá třeba hned na začátek.)</p>
<pre><code>$doctypeRegExp = "~&lt;\!doctype html.*>~siU";
if (preg_match($doctypeRegExp, $content)) {
  echo preg_replace($doctypeRegExp, "$0 &lt;base href='$page'>", $content);
}
else {
  echo "&lt;base href='{$page}'>" . $content;
}</code></pre>

<h3 id="odkazy">Úprava odkazů</h3>
<p>Teoreticky by bylo možné hledat pomocí PHP všechny odkazy na stránce a <b>přepisovat jejich adresy</b> na <code>nas-server.cz/?page=http%3A%2F%2Fjecas.cz</code> (požadovanou URL je třeba zakódovat).</p>
<p>Nicméně jako jednodušší řešení se mi jeví odkazy upravit JavaScriptem.</p>
<pre><code>for (var a in document.links) {
document.links[a].href = 'http://nas-server.cz/?page=' + encodeURIComponent(document.links[a].href);
}</code></pre>
<p>Nemusí se tak řešit různé <a href="/uvozovky">uvozovky</a> v odkazech (<code>&lt;a href="odkaz"&gt;</code> vs. <code>&lt;a href='odkaz'&gt;</code> vs. <code>&lt;a href=odkaz&gt;</code>) a vytváření absolutní cest (s tím si poradí JS)</p>
<p>Místo ručního zadávání <code>nas-server.cz</code> lze adresu <a href="http://php.vrana.cz/odkazovani-na-sebe-sama.php"><i>vypočítat</i></a>.</p>

<h2 id="stahnout">Hotový skript</h2>
<p><a href="/files/php-proxy/proxy.rar" class="button">Stáhnout</a></p>
<pre><code>&lt;?php
function modifyLink() {
?>
&lt;script type="text/javascript">
for (var a in document.links) {
	document.links[a].href = '&lt;?="http://$_SERVER[SERVER_NAME]" . substr($_SERVER["PHP_SELF"], 0, strrpos($_SERVER["PHP_SELF"], "/")) . "/";?>?page=' + encodeURIComponent(document.links[a].href);
}
&lt;/script>
&lt;?php	
}

function urlForm($url = "") {
?>
	&lt;form style="position: fixed; top: 0; left: 0; width: 100%; background: #000; z-index: 99999999; padding: .2em; text-align: center">
		&lt;input name=page size=100 value="&lt;?=htmlspecialchars($url)?>">
		&lt;input type=submit value="Open">
		&lt;input type=button onclick="this.parentNode.style.display = 'none'" value="Close"> &lt;!-- http://jecas.cz/php-proxy -->
	&lt;/form>
&lt;?php
}

$page = isset($_GET["page"]) ? $_GET["page"] : "";

if (empty($page)) {
	urlForm();
	die();
}

if (!preg_match("/^http/", $page)) {
	$page = "http://" . $page;
}

$content = @file_get_contents($page);

if (!empty($content)) {
	$doctypeRegExp = "~&lt;\!doctype html.*>~siU";
	if (preg_match($doctypeRegExp, $content)) {
		echo preg_replace($doctypeRegExp, "$0 &lt;base href='$page'>", $content);
	}
	else {
		echo "&lt;base href='{$page}'>" . $content;
	}
	modifyLink();
	urlForm($page);
}
else {
?>
	&lt;p>Nepodařilo se načíst obsah. Buď není povolené na serveru vzdálené načítání, nebo se &lt;i>něco&lt;/i> pokazilo.&lt;/p>
&lt;?php
}</code></pre>

<h2 id="debugging-proxy">Proxy pro testování webů</h2>
<p>Pro testování webových aplikací lze monitorovat síťovou komunikaci nástrojem Fiddler.</p>
<p><a href="http://fiddler2.com/" class="button">Web</a></p>