---
title: "Stažení celého webu"
headline: "Stažení dynamického webu"
description: "Jak stáhnout celou webovou stránku a převést ji do statické HTML podoby."
date: "2015-02-04"
last_modification: "2015-10-22"
status: 1
tags: ["Produktivita", "Offline"]
---

Z nejrůznějších důvodů může být vhodné, aby celý web byl ve **statických souborech**:

  - rychlost,

  - nenáročnost na hosting,

  - plnohodnotná offline varianta webu

Tvorba statického webu je poměrně **náročná na údržbu**. Společné prvky stránek jako hlavička, menu nebo patička je nutné nějakým způsobem synchronisovat mezi sebou.

Jedna z možností tak může být využití klasického redakčního systému a **uložení jeho výstupu**.

## HTTrack

Program HTTrack dokáže projít zadanou URL a stáhnout veškerý obsah, na který **vedou odkazy**.

[Stáhnout](http://www.httrack.com/page/2/en/index.html)

Pokud stránka rozlišuje mezi návštěvníky na základě HTTP hlavičky `user-agent`, je dobré tuto hodnotu změnit na podobu obvyklou pro dnešní internetové prohlížeče.

    - [Zjištění `user-agent` hlavičky prohlížeče](/ua)

Nastavit tuto hlavičku jde v nabídce *Předvolby*:

Po zadání požadované URL by mělo začít stahování:

Stáhnout rozsáhlejší web může trvat i několik desítek minut.

Před začátkem stahování je dobré dát pozor na **omezení úrovně domén**, které se budou stahovat. Typicky pouze na doménu webu, který je cílem stáhnout.

Jinak HTTrack dokáže stahovat i stránky z **externích odkazů**, takže nakonec může stáhnout „celý internet“.

Stahování jecas.cz s externími zdroji nebylo dokončeno ani po 8 hodinách:

## URL bez „.html“

HTTrack standardně stahuje obsah do `.*html` souborů, na které potom vedou i [odkazy](/odkaz). Pokud je cílem mít odkazy bez HTML koncovky, dá se využít přepis adres pomocí `mod_rewrite` a v souborech hromadně změnit cíle všech odkazů (`href`).

### Soubor `.htaccess`

Následující obsah v `.htaccess` zajistí, že se po zadání `example.com/obsah` zobrazí obsah stránky `obsah**.html**`.

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^([^.]+)$    $1.html    [L]
```

Pro stránky v **podadresářích**.

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [NC,L]
```

### Nahrazení `.html` v odkazech

Odchytit všechny výskyty `.html` v běžných cílech odkazu jde následujícím regulárním výrazem:

```
href="([A-z0-9\-]*)\.html"
```

Vyhovující `href` se nahradí za:

```
href="$1"
```

Pro podadresáře:

```
href="(\.\.\/[A-z0-9\-\/]*)\.html"
```

```
href="(\.\.\/\.\.\/[A-z0-9\-\/]*)\.html"
```

## Nástroj wget

Stáhnout celé stránky jde i nástrojem wget. Ve **Windows** k tomu jde použít program [Cygwin](http://www.cygwin.com/) a následně při instalaci nechat nainstalovat **balíček wget**.

Příkaz pro stažení obsahu stránky může vypadat následovně:

```
wget -np -e robots=off --mirror --domains=example.com http://example.com
```

## Stažení cizí stránky

Kromě vlastních webů jde těmito postupy pochopitelně rovněž **stahovat stránky cizí**.

Pokud se stahování nebude dít ve velké míře a opakovaně, provozovatel webu si toho nejspíš nevšimne a v zásadě mu to ani **nemusí moc vadit**.

Stažení celého webu se nároky na server příliš neliší od situace, kdy by si člověk celý web proklikal.

Někteří autoři své weby přímo nabízí ke stažení:

  - [Jak psát web](http://www.jakpsatweb.cz/download.html)

  - [HTML sémantika](http://semantika.name/download.html)

  - [PHP triky](http://php.vrana.cz/verze-ke-stazeni.php)

Typicky si ale **nepřejí další šíření** – tj. publikování staženého obsahu na jiném webu. To bývá problém kvůli [vyhledávačům](/seo), protože vzniká **duplicitní obsah**.