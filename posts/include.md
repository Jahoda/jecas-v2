---
title: "Složení jednoduchého webu v PHP"
headline: "Jednoduchý web v PHP"
description: "I web o pár stránkách je vhodné skládat automatisovaně. Jak na to v PHP?"
date: "2013-09-05"
last_modification: "2013-09-08"
status: 1
tags: ["Hotová řešení", "PHP"]
---

Pro některé **malé weby** může být jednodušší a z hlediska výkonu (zátěž serveru + rychlost načítání) výhodnější nepoužívat nějaký rozsáhlý redakční systém. Psát vše v **čistém HTML** a **ručně kopírovat společné části** není také nic moc. Nabízí se třetí cesta… skládání stránky v PHP.

## Vložení společných částí

Jako nejelegantnější se mi jeví společné části uložit jako funkce do společného souboru, který se na každé stránce připojí a společné funkce se zavolají.

Můžeme vycházet z toho, že výsledný HTML kód každé stránky sestává z:

  - společného obsahu **před** samotným obsahem — typicky `&lt;!doctype html&gt;`, `&lt;meta&gt;` značky, hlavička, popřípadě menu,

  - společného obsahu **za** samotným obsahem — typicky patička nebo další sloupec

Samotná stránka `nejaka-stranka.php` potom bude vypadat nějak takto:

```
&lt;?php
include "spolecne.php";
hlavicka("Titulek stránky");
?&gt;

&lt;!-- samotný obsah --&gt;
&lt;h1&gt;Nadpis stránky&lt;/h1&gt;
&lt;p&gt;Obsah stránky&lt;/p&gt;
&lt;!-- konec samotného obsahu --&gt;

&lt;?php 
paticka();
?&gt;

```

Soubor `spolecne.php` bude v začátku jen definovat funkce `hlavicka` a `paticka`.

### Hlavička

```
&lt;?php
function hlavicka($title, $description = "") {
?>
&lt;!doctype html>
&lt;meta charset="utf-8">
&lt;title>&lt;?=empty($title) ? "Název webu" : $title . " – Název webu"?>&lt;/title>
&lt;?php if (!empty($description)) { ?>
&lt;meta name="description" content="&lt;?=$description?&gt;">
&lt;?php } ?>
&lt;rel="stylesheet" type="text/css" href="styl.css">
…
&lt;div class=container>

  &lt;div class=menu>
    &lt;a href="./">Hlavní strana&lt;/a>
    &lt;a href="./druha.php">Druhá&lt;/a>
    &lt;a href="./treti.php">Třetí&lt;/a>
  &lt;/div>

&lt;div class=content>
&lt;?php } ?>
```

Tato funkce provede následující:
  
    vypíše `&lt;!doctype>`, `&lt;meta>` značku pro **kódování**, pokud bude předán **titulek**, tak nastaví `&lt;title>` na *Název stránky – Název webu* pokud se funkci předá **popisek**, nastaví se `&lt;meta name=description>`,
    - připojí CSS a vůbec všechen **společný obsah** (hlavička, navigace, obal z `&lt;div>`u pro samotný obsah.

Některé HTML značky v rámci této funkce **zůstanou neuzavřené** — uzavře je až funkce `paticka`.

### Patička

Tato funkce bude o poznání jednodušší. Stačí v ní v podstatě akorát vypsat běžné HTML (uzavření otevřených značek, vypsání patičky, připojení měřicích skriptů).

```
&lt;?php
function paticka() {
?>
&lt;/div>
&lt;p>Web vytvořil XXX
&lt;/div>
&lt;?php } ?>
```

## Hezké adresy

Tento postup řešení **skládání stránek** sám o sobě nabízí relativně rozumnou podobu adres, tj. `example.com/**adresa-stranky.php**`. Nicméně, můžeme adresy ještě trochu vylepšit přepisem v `.htaccess` na podobu `example.com/adresa-stranky`:

```
RewriteEngine On
# podstrčení PHP, přepsat pouze na existující skript
RewriteCond %{REQUEST_FILENAME}.php -f
RewriteRule ^([^.]+)$    $1.php    [L]
```

### Přesměrování `*.php` adres

Zamezit duplicitě lze:
  [přesměrováním](http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=31&amp;topic=97246#bez-pripony) v `.htaccess`,
    *čisticí* funkcí v PHP, která se přidá do hlavičky (do funkce `hlavicka`):
    ```
function presmerovat() {
	$redir = str_replace(array("index.php", ".php"), "", $_SERVER['REQUEST_URI']);
	 if ($_SERVER['REQUEST_URI'] != $redir) {
	 	header("Location: $redir", 301);
	 }
}
```

## Menu se zvýrazněním aktuální položky

Ve společném souboru (`spolecny.php`) můžeme statické menu *oživit*, aby se aktuální položka zvýraznila.

Asi nejpohodlnější bude nadefinovat si jednotlivé stránky jako pole:

```
$menu = array(
    "Název stránky" => "url-stranky",
    "Název další stránky => "url-dalsi-stranky",
  );

```

A potom jen zajistit výpis.

```
&lt;?php
function menu($title) {
?>
  &lt;div class=menu>
&lt;?php
  $menu = array(…);
  foreach ($menu as $nazev => $odkaz) { ?>
    &lt;a href="./&lt;?=$odkaz?>"&lt;?=($nazev == $title) ? " class='active'" : ""?>>&lt;?=$nazev?>&lt;/a>
&lt;?php } ?>
  &lt;/div>
&lt;?php } ?>
```

Tato funkce `menu` se zavolá z funkce `hlavicka` a předá se zadaný titulek, ten se porovná a v případě schody s některou z položek se přidá CSS třída `active`.

## Stáhnout

[Hotová ukázka ke stažení](/files/include/web.rar) [Demo](/files/include/demo)

Pro vyzkoušení na svém počítači je třeba mít [nainstalován webserver](http://pehapko.cz/sprava-serveru/instalace) s podporou PHP.