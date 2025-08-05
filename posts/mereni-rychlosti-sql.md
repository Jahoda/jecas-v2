---
title: "Rychlost SQL dotazu"
headline: "Měření rychlosti SQL dotazu"
description: "Měření rychlosti provedení SQL dotazu."
date: "2014-03-25"
last_modification: "2014-04-01"
status: 1
tags: ["php", "php-pdo", "sql"]
format: "html"
---

<p>V případě, že se stránka dotazující se na data do databáse pomalu načítá, je vhodné měřit dobu jednotlivých SQL dotazů a ty nejpomalejší prověřit, zda by nemohly být <b>rychlejší</b>.</p>

<h2 id="doba-provedeni">Doba provedení v PHP</h2>

<p>V PHP vypadá měření doby následovně:</p>

<pre><code>$zacatek = microtime(true); 
// Nějaký kód, který meříme
$konec = microtime(true);
$rozdil = ($konec - $zacatek) * 1000;</code></pre>

<p>V proměnné <code>$rozdil</code> bude čas provedení kódu v milisekundách. Stačí tedy obdobné měření provést při každém SQL dotazu.</p>

<h2 id="mereni-dotazu">Měření SQL dotazů</h2>

<p>Jelikož přidávat výše uvedený kód ke každému dotazu by nebylo moc elegantní, nabízí se vytvořit si <b>jednu funkci</b> pro provádění všech SQL příkazů.</p>

<p>Funkce měřicí rychlost SQL dotazů v <a href="/pdo">PDO</a> by mohla vypadat takto:</p>

<pre><code>$seznamDotazu = array();
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
}</code></pre>

<p>Nyní se při zavolání funkce <code>query</code>:</p>

<ol>
  <li>do pole <code>$seznamDotazu</code> uloží všechny SQL dotazy a čas jejich provedení,</li>
  
  <li>v proměnné <code>$celkovaDoba</code> potom bude celková doba všech dotazů.</li>
</ol>

<h3 id="vypis">Výpis dotazů</h3>

<pre><code>function vypisDotazu() {
  global $seznamDotazu, $celkovaDoba;
  echo "&lt;ol>";
  foreach ($seznamDotazu as $dotaz) {
    echo "&lt;li>&lt;b>" . round($dotaz["cas"], 4) . "&lt;/b> ms (" . 
          round(($dotaz["cas"] / $celkovaDoba) * 100, 2) . 
          " %)&lt;br>"  . $dotaz["sql"];
  }
  echo "&lt;/ol>";
}</code></pre>

<p>Seznam SQL dotazů je vhodné umístit do <a href="/position-fixed">fixně posicovaného elementu</a>, aby neovlivňoval okolí stránky.</p>

<p>Funkční skripty jsou na <a href="https://github.com/Jahoda/mereni-rychlosti-sql">GitHubu</a>.</p>

<h2 id="json">Měření dotazů v JSONu</h2>

<p>V případě, že aplikace, kde se má měřit doba, nebo její část, funguje na principu získávání data JavaScriptem ze souboru, který vrací <a href="/json">JSON</a>, není možné použít výše uvedený HTML výpis. JSON by potom byl nevalidní.</p>

<p>Nezbývá tedy než i dobu SQL dotazů vracet v JSONu a následně vypsat JavaScriptem. Například si připravit funkci <code>json</code>, která k původnímu poli potřebných dat <b>připojí pole s dobou SQL dotazů</b>:</p>

<pre><code>function json($pole) {
  global $seznamDotazu, $celkovaDoba;
  $pole = array_merge(
    $pole, 
    array(
      "doba" => $celkovaDoba, 
      "sql" => $seznamDotazu
    )
  );
  echo json_encode($pole);
}</code></pre>

<p><a href="/ajax">AJAXem</a> získaná data z JSONu se potom v JavaScriptu předají mj. funkci, která zajistí výpis doby <b>SQL dotazů</b>.</p>

<pre><code>var vypisDotazu = function(data) {
  var vystup = "&lt;b>Celková doba SQL:&lt;/b> " + 
                data.doba + " ms&lt;ol>";
  for (key in data.sql) {
    vystup += "&lt;li>&lt;b>" + data.sql[key]["cas"] + 
              "&lt;/b> ms (" + 
              (data.sql[key]["cas"] / data.doba) * 100 + 
              " %)&lt;br>" + data.sql[key]["sql"];
  }
  document.getElementById('debugVypis').innerHTML = vystup;
}</code></pre>