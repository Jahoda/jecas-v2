---
title: "PHP proxy skript"
headline: "PHP proxy skript na 50 řádků"
description: "Hotový PHP skript umožňující zobrazit web prostřednictvím jiné IP adresy."
date: "2013-08-15"
last_modification: "2013-08-15"
status: 1
tags: ["Hotová řešení", "PHP"]
---

Takový skript se může hodit v případě, že:

  - webová stránka je **dostupná jen z IP určité země**,

  - na dané stránce má námi používaná **IP adresa ban**,

  - požadovaná stránka je **blokovaná provozovatelem sítě**.

Na internetu se online proxy nástrojů válí spoustu a nebo lze použít Google Cache. Bohužel hotové nástroje mohou mít *nekompatibilní* IP adresu a Google Cache nemusí být pro požadovanou stránku vždy dostupná.

## Jak si vytvořit vlastní proxy skript v PHP

Je potřeba:

  - Stáhnout a vypsat obsah zadané URL,

  - zajistit načtení stylů, obrázků, popř. skriptů,

  - upravit odkazy, aby vedly opět na *prox skript*.

### Stažení stránky

Pokud je to na serveru povolené (jedná se o nastavení `[allow_url_fopen](http://www.php.net/manual/en/filesystem.configuration.php#ini.allow-url-fopen)`), obsah z URL lze stáhnout funkcí `file_get_contents`:
  ```
echo file_get_contents("http://jecas.cz");
```

### Načtení stylů, skriptů a obrázků

**Předně**: Je-li cílem anonymisace prohlížení, není v podstatě možné bezpečně procházet web se zapnutým skriptováním. Na úrovni webové služby je nemožné zabránit, aby si JS na stránce mohl *pingnout* nějakou URL ze skutečné IP adresy mimo *proxy*. 
    Musel by se nějak vyhodnotit veškerý JS kód, aby se třeba toto přepsalo na proxy skript, což automatickým nahrazováním půjde dost těžko.

```
var a = "mg s";
var b = "g.gif";
document.write("&lt;i" + a + "rc='pin" + b + "'>");
// &lt;img src="ping.gif"&gt;
```

V případě, že se s **možností zjistit skutečnou IP smíříme**, bude nejjednodušší využití [HTML značky `&lt;base&gt;`](/base) (nebude ale fungovat při zablokování adres provozovatelem sítě + nezajistí onu anonymitu). Stačí ji přidat za [`&lt;!doctype&gt;`](/doctype), pokud na stránce existuje. (Pokud `&lt;!doctype&gt;` na stránce není, tak se přidá třeba hned na začátek.)

```
$doctypeRegExp = "~&lt;\!doctype html.*>~siU";
if (preg_match($doctypeRegExp, $content)) {
  echo preg_replace($doctypeRegExp, "$0 &lt;base href='$page'>", $content);
}
else {
  echo "&lt;base href='{$page}'>" . $content;
}
```

### Úprava odkazů

Teoreticky by bylo možné hledat pomocí PHP všechny odkazy na stránce a **přepisovat jejich adresy** na `nas-server.cz/?page=http%3A%2F%2Fjecas.cz` (požadovanou URL je třeba zakódovat).

Nicméně jako jednodušší řešení se mi jeví odkazy upravit JavaScriptem.

```
for (var a in document.links) {
document.links[a].href = 'http://nas-server.cz/?page=' + encodeURIComponent(document.links[a].href);
}
```

Nemusí se tak řešit různé [uvozovky](/uvozovky) v odkazech (`&lt;a href="odkaz"&gt;` vs. `&lt;a href='odkaz'&gt;` vs. `&lt;a href=odkaz&gt;`) a vytváření absolutní cest (s tím si poradí JS)

Místo ručního zadávání `nas-server.cz` lze adresu [*vypočítat*](http://php.vrana.cz/odkazovani-na-sebe-sama.php).

## Hotový skript

[Stáhnout](/files/php-proxy/proxy.rar)

```
&lt;?php
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
}
```

## Proxy pro testování webů

Pro testování webových aplikací lze monitorovat síťovou komunikaci nástrojem Fiddler.

[Web](http://fiddler2.com/)