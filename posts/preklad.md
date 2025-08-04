---
title: "Překlad stránky"
headline: "Překlad stránky"
description: "Snadná lokalisace webu do různých jazyků."
date: "2014-04-12"
last_modification: "2014-04-15"
status: 1
tags: ["Hotová řešení", "PHP", "Lokalisace"]
---

Při vytváření aplikace, kde má být možné **přepínat různé jazyky**, je potřeba řešit pohodlnou lokalisaci. Jak na to jednoduše v PHP?

## Použití

Cílem je mít funkci s nějakým krátkým názvem – třeba `l`, která se bude používat pro výpis všech textů na stránce.

```
&lt;?=l("Text, který půjde později přeložit.")?>
```

Poznámka: Sekvence `&lt;?=` slouží k výpisu PHP skriptem do HTML. Košatější ekvivalent je `&lt;?php echo`.

### Skládání řetězců

Někdy je nutné v textech reagovat na různé stavy aplikace / používat proměnné.

```
&lt;?=l("Uživatelské jméno „") . $jmeno . l("“ je již obsazeno.")?>
```

Takto vypadající spojování jistě není úplně elegantní. Lepíš se zdá použít funkci [`vsprintf`](http://www.php.net/manual/en/function.vsprintf.php):

```
&lt;?=l("Uživatelské jméno „%s“ je již obsazeno.", $jmeno)?>
```

V případě **více *proměnných*** v textu se funkci `l` předá místo jedné proměnné **pole s hodnotami**, které se mají dosazovat.

## Uložení překladu

Hlavní jazyk může být použit přímo v kódu. A další překlady potom budou PHP soubory, kde bude PHP pole s jednotlivými překlady.

```
$l["Text v kódu"] = "Překlad textu z kódu";
```

Požadovaný jazyk se potom zapne prostým **vložením PHP skriptu** (`include`).

Problém může nastat v případě, že budeme chtít **změnit** nějaký text primárního jazyku, který má své texty přímo v kódu. Řešením je buď úpravy hlavního jazyka vytvářet jako překlad, nebo měnit přímo kód. Potom je ale nutné **synchronisovat ostatní překlady**, aby překládaly i upravené řetězce.

## Funkce `l`

Funkce `l` jen zkontroluje, jestli příslušný překlad existuje a vrátí ho s použitím funkce `vsprintf` (v případě, že jsou předány nějaké *argumenty*).

```
$l = array();
function l($text, $argumenty = array()) {
  global $l;
  if (isset($l[$text])) {
    $text = $l[$text];
  }
  if (!empty($argumenty)) {
    $text = vsprintf($text, $argumenty);
  }
  return $text;
}
```

Funkční ukázka je na [GitHubu](https://github.com/jahoda/preklad).

## Odkazy jinam

  - [Localize Your Web Application for Any Country With the Google Translate API](http://code.tutsplus.com/tutorials/localize-your-web-application-for-any-country-with-the-google-translate-api--cms-23126) – automatický překlad aplikace pomocí Google Translate API