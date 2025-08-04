---
title: "Rychlost SQL dotazu"
headline: "Měření rychlosti SQL dotazu"
description: "Měření rychlosti provedení SQL dotazu."
date: "2014-03-25"
last_modification: "2014-04-01"
status: 1
tags: ["PHP", "PHP a PDO", "SQL"]
---

V případě, že se stránka dotazující se na data do databáse pomalu načítá, je vhodné měřit dobu jednotlivých SQL dotazů a ty nejpomalejší prověřit, zda by nemohly být **rychlejší**.

## Doba provedení v PHP

V PHP vypadá měření doby následovně:

```
$zacatek = microtime(true); 
// Nějaký kód, který meříme
$konec = microtime(true);
$rozdil = ($konec - $zacatek) * 1000;
```

V proměnné `$rozdil` bude čas provedení kódu v milisekundách. Stačí tedy obdobné měření provést při každém SQL dotazu.

## Měření SQL dotazů

Jelikož přidávat výše uvedený kód ke každému dotazu by nebylo moc elegantní, nabízí se vytvořit si **jednu funkci** pro provádění všech SQL příkazů.

Funkce měřicí rychlost SQL dotazů v [PDO](/pdo) by mohla vypadat takto:

```
$seznamDotazu = array();
$celkovaDoba = 0;

function query($dotaz, $data = array()) {
  global $pdo, $seznamDotazu, $celkovaDoba;
  $zacatek = microtime(true); 
  
  try {
    $sql = $pdo->prepare($dotaz);
    $sql->execute($data);
  }
  catch (PDOException $e) {
    die('Error: ' . $e->getMessage() . 
    ' Dotaz: ' . $dotaz . " Data:" . implode("; ", $data));
  }
  
  $konec = microtime(true);
  $rozdil = ($konec - $zacatek) * 1000;
  
  array_push(
    $seznamDotazu, 
    array("sql" => $dotaz, "cas" => $rozdil)
  );
  $celkovaDoba += $rozdil;
  
  return $sql;
}
```

Nyní se při zavolání funkce `query`:

  - do pole `$seznamDotazu` uloží všechny SQL dotazy a čas jejich provedení,

  - v proměnné `$celkovaDoba` potom bude celková doba všech dotazů.

### Výpis dotazů

```
function vypisDotazu() {
  global $seznamDotazu, $celkovaDoba;
  echo "&lt;ol>";
  foreach ($seznamDotazu as $dotaz) {
    echo "&lt;li>&lt;b>" . round($dotaz["cas"], 4) . "&lt;/b> ms (" . 
          round(($dotaz["cas"] / $celkovaDoba) * 100, 2) . 
          " %)&lt;br>"  . $dotaz["sql"];
  }
  echo "&lt;/ol>";
}
```

Seznam SQL dotazů je vhodné umístit do [fixně posicovaného elementu](/position-fixed), aby neovlivňoval okolí stránky.

Funkční skripty jsou na [GitHubu](https://github.com/Jahoda/mereni-rychlosti-sql).

## Měření dotazů v JSONu

V případě, že aplikace, kde se má měřit doba, nebo její část, funguje na principu získávání data JavaScriptem ze souboru, který vrací [JSON](/json), není možné použít výše uvedený HTML výpis. JSON by potom byl nevalidní.

Nezbývá tedy než i dobu SQL dotazů vracet v JSONu a následně vypsat JavaScriptem. Například si připravit funkci `json`, která k původnímu poli potřebných dat **připojí pole s dobou SQL dotazů**:

```
function json($pole) {
  global $seznamDotazu, $celkovaDoba;
  $pole = array_merge(
    $pole, 
    array(
      "doba" => $celkovaDoba, 
      "sql" => $seznamDotazu
    )
  );
  echo json_encode($pole);
}
```

[AJAXem](/ajax) získaná data z JSONu se potom v JavaScriptu předají mj. funkci, která zajistí výpis doby **SQL dotazů**.

```
var vypisDotazu = function(data) {
  var vystup = "&lt;b>Celková doba SQL:&lt;/b> " + 
                data.doba + " ms&lt;ol>";
  for (key in data.sql) {
    vystup += "&lt;li>&lt;b>" + data.sql[key]["cas"] + 
              "&lt;/b> ms (" + 
              (data.sql[key]["cas"] / data.doba) * 100 + 
              " %)&lt;br>" + data.sql[key]["sql"];
  }
  document.getElementById('debugVypis').innerHTML = vystup;
}
```