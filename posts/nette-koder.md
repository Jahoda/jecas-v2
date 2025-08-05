---
title: "Nette z pohledu kodéra"
headline: "Nette z pohledu kodéra"
description: "Jak kódovat šablony pro weby používající Nette."
date: "2015-08-17"
last_modification: "2015-08-17"
status: 0
tags: []
format: "html"
---

<p><a href="http://nette.org/">Nette Framework</a> je poměrně rozšířený webový framework, na kterém běží řada českých webů.</p>

<p>Weby postavené na Nette zpravidla používají <b>šablonovací systém Latte</b>. Soubory Latte šablon mají příponu <code>*.latte</code> a jedná o <i>trochu vylepšené HTML</i>.</p>

<p>V Latte šablonách jde totiž <b>programovat v PHP</b>.</p>




<h2 id="jak-se-vyznat">Jak se vyznat v Nette</h2>

<p>Typické rutinní úkoly se s Nette řeší skoro samy, takže člověk ani nemusí umět moc programovat, <b>horší je se vyznat v adresářové struktuře</b>.</p>




<h3 id="priklad">PHP vs. Nette</h3>

<p>Pokud je cílem v čistém PHP <b>vypsat článek</b> z database, může to vypadat v nejjednodušší formě nějak takto (s využitím <a href="/pdo">PDO</a>):</p>

<pre><code>&lt;?php
$dotaz = $pdo->prepare(
  "SELECT nadpis, text FROM clanky WHERE id = ?"
);
$dotaz->execute(array($idClanku));
$clanek = $dotaz->fetch();
?>
&lt;h1>&lt;?=$clanek["nadpis"]?>&lt;/h1>
&lt;?=$clanek["text"]?>
</code></pre>








<p>V kódu je promíchán PHP kód, SQL příkaz i HTML kód.</p>

<p>Toto omílané míchání kódu je u složitějších aplikací trochu nešikovné, takže se to Nette <b>snaží oddělit</b>.</p>

<p>Proto se ve složce <code>app</code> nacházejí různé adresáře jako <code>models</code>, <code>presenters</code>, <code>templates</code> a podobně.</p>

<p>Vypsání téhož článku v Nette se tedy zpravidla dělá následovně:</p>

<ol>
  <li>
    <p><b>Příkazy do DB</b> se ukládají do tzv. <i>modelu</i>, ten se může nacházet ve složce <code>models</code> a u jednodušších webů může existovat jediný model v souboru <code>Model.php</code>.</p>
  </li>
  
  <li>
    <p>Tento model nejprve obsahuje <b>připojení k databasi</b>, které se definuje v konfiguračním souboru typicky umístěném v <code>config/config.neon</code>.</p>
  </li>
  
  <li>
    <p>Jednotlivé <b>příkazy do DB</b> jsou potom uložené v samostatných metodách, například:</p>
    
    <pre><code>public function getPage($id) {
  return $this->database->query(
    "SELECT nadpis, text FROM stranky WHERE id = ?", 
    $id
  );
} </code></pre>
    
    
    
    
    <p>Kromě psaní SQL jde použí i jiný způsob, kdy se člověk nemusí obtěžovat se skládáním SQL:</p>
    
    <pre><code>public function getPage($id) {
  return $this->database->table('stranky')->where("id", $id)->fetch();
} </code></pre>    
  </li>
  
  
  
  <li>
    <p>Nyní je potřeba <b>připravit získaná data pro šablonu</b> – to dělají tzv. <i>presentery</i>. Typický presenter hlavní stránky se nachází v <code>presenters/HomepagePresenter.php</code></p>
    
    <p>Nejjednodušší použití je takové, že se přiřazení dat do šablony vloží do metody <code>renderDefault</code>:</p>
    
    <pre><code>public function renderDefault($id) {
  $this->template->clanek = $this->model->getPage($id);
}</code></pre>
  </li>
  
  
  
  <li>
    <p>Nakonec je tak v šabloně <code>templates/Homepage/default.latte</code> možné provést <b>elegantní vypsání</b> článku:</p>
    
    <pre><code>&lt;h1>{$clanek->nadpis}&lt;/h1>
{$clanek->text}
</code></pre>    
    
    
  </li>
</ol>


<h2 id="presmerovani">Přesměrování</h2>

<p>Například po odeslání formuláře je dobré provést přesměrování, aby formulář člověk náhodou neodeslal dvakrát.</p>

<ul>
  <li>Přesměrování na tutéž stránku: <code>$this-redirect('this')</code></li>
  
  <li>Přesměrování na presenter: <code>$this->redirect('Article:edit', 5);</code></li>
</ul>


<h2 id="id-vlozeni">ID vloženého řádku</h2>

<p>Získat ID vloženého záznamu do database jde přes:</p>

<pre><code>$newArticle = $this->model->insertArticle($values);
$id = $newArticle->id;</code></pre>


<h2 id="filtry">Latte filtry</h2>

<div class="external-content">
  <ul>
    <li><a href="https://petrjirasek.cz/blog/jak-napsat-vlastni-latte-filtr-v-nette">Jak napsat vlastní Latte filtr v Nette?</a></li>
  </ul>
</div>


<h2 id="detekce-mobilu">Detekce mobilu</h2>

<p>Nette přímo umí <b>detekovat na straně serveru mobilní prohlížeč</b>. Slouží k tomu konstrukce:</p>

<pre><code>$mobile = Nette\Environment::getContext()->browser->isMobile();</code></pre>

<p>Nemá-li se nějaký obsah na mobilu zobrazovat (například reklamy), je lepší ho vůbec do prohlížeče návštěvníka neposílat než ho jen skrýt pomocí <code>@media</code> pravidla.</p>

<p>Hodí se to hlavně obsahu, jehož stažení nejde zabránit (obrázky, skripty).</p>