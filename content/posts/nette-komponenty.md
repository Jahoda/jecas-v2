---
title: "Vlastní komponenty v Nette"
headline: "Vlastní komponenty v Nette"
description: "Komponenty v Nette dokáží bránit opakování stejného kódu."
date: "2015-11-04"
last_modification: "2015-11-05"
status: 1
tags: ["hotova-reseni", "nette", "php"]
format: "html"
---

<p>Jedna z programátorských zásad zní: <i lang="en">Don't repeat yourself</i> – zkratka <b>DRY</b> – česky: <i>Neopakujte se</i>. Podle ní by se neměl v programu <b>opakovat kód</b>.</p>

<p><b>Nette Framework</b> má pro opakovaně používaný kód tzv. <i>komponenty</i>.</p>




<h2 id="kdy">Kdy se komponenty hodí</h2>

<p>Typickým případem jsou formuláře, kdy tentýž formulář může být potřeba vypsat ve více šablonách.</p>

<div class="external-content">
  <ul>
    <li>Martin Zlámal: <a href="http://zlml.cz/znovupouzitelny-formular">Znovupoužitelný formulář</a> – příklad formulářové komponenty</li>
  </ul>
</div>

<p>Podle mého názoru se ale komponenty hodí i pro různé výpisy.</p>

<p>Třeba na tomto webu se na mnoha místech vypisuje seznam článků:</p>

<ol>
  <li>nejnovější články na hlavní straně,</li>
  <li>nejoblíbenější články na hlavní straně,</li>
  <li>související články vedle otevřeného článku,</li>
  <li>články v kategorii</li>
</ol>



<p>Všechny výpisy jsou si dost podobné, takže se nabízí mít jejich kód na jednom místě.</p>




<h2 id="vlastni">Vlastní komponenta</h2>


<h3 id="sablona">Šablona</h3>

<p>V šabloně se na místě, kde má být komponenta použita, napíše prosté <code>{control nazevKomponenty, $parametr}</code>.</p>

<p>Parametr je nepovinný, ale pokud je potřeba předávat do komponenty nějaká data, tak je potřeba (parametrů může být i více).</p>

<p>Cílem je tedy původní zápis typu:</p>

<pre><code>{foreach $articles as $article}
  &lt;h2>{$article->nazev}&lt;h2>
  &lt;p>{$article->popis}&lt;p>
{/foreach}</code></pre>






<p>Nahradit něčím jako:</p>


<pre><code>{foreach $articles as $article}
  {control article, $article}
{/foreach}</code></pre>



<h3 id="presenter">Presenter</h3>

<p>Komponentu pro použití napříč celou aplikací/modulem je vhodné přidat do <i>BasePresenteru</i>:</p>

<pre><code>protected function createComponentArticle()
{
  $control = new \ArticleControl;
  return $control;
}</code></pre>





<p>Zde se vytvoří komponenta <code>article</code> na základě zvláštní třídy <code>ArticleControl</code>.</p>

<p>To lomítko před názvem třídy je zásadní, bez něj Nette tuto třídu nenajde.</p>




<h3 id="komponenta">Komponenta</h3>

<p>Komponenty se dávají třeba do složky <code>app/components</code>, ale není to podmínka. V případě používání hodně komponent se ještě mohou zanořovat do podsložek. Název souboru potom odpovídá názvu třídy.</p>

<p>Stěžejní je metoda <code>render</code>, která zajistí vykreslení. Přijímá parametry z <code>{control nazevKomponenty, $parametr}</code> v šabloně.</p>

<p>Na rozdíl od presenterů si komponenta <b>nehledá šablonu automaticky</b>, ale musí se jí přiřadit přes <code>$template->setFile</code>.</p>

<pre><code>&lt;?php
use Nette\Application\UI\Control;
class ArticleControl extends Control
{
  public function render($article)
  {
    $template = $this->template;
    // nastavení šablony
    $template->setFile(__DIR__ . '/article.latte');
    // nastavení proměnné z parametru
    $template->article = $article;
    $template->render();
  }
}</code></pre>















<h3 id="sablona-komponenty">Šablona komponenty</h3>

<p>Šablona komponenty <code>article.latte</code> potom bude obsahovat společný HTML kód, takže ho půjde elegantně upravovat na jednom místě.</p>




<h2 id="filtry">Filtry v komponentě</h2>

<p>V komponentě nebudou fungovat <a href="/latte-vlastni-filtry">vlastní Latte filtry</a>.</p>

<p>Nicméně jdou zprovoznit stejným kódem jako v souboru <code>BasePresenter.php</code>:</p>

<pre><code>protected function createTemplate($class = NULL)
{
  $template = parent::createTemplate($class);
  $template->addFilter(NULL, 'Filters::common');
  return $template;
}</code></pre>











<h2 id="odkazy">Odkazy v komponentě</h2>

<p>V komponentě nefungují odkazy v <code>n:href</code> stejným způsobem jako v šabloně presenteru:</p>

<pre><code>&lt;a n:href="Article:default">
  Odkaz
&lt;/a></code></pre>





<p>Výše uvedený kód skončí chybou:</p>

<pre><code>Component with name 'Article' does not exist</code></pre>

<p>Řešení je použít normální <code>href</code> a <code>{plink}</code>:</p>

<pre><code>&lt;a href="{plink Article:default}">
  Odkaz
&lt;/a></code></pre>







<h2 id="vlozeni-sablony">Vložení <code>*.latte</code> šablony</h2>

<p>Jiná možnost předcházení opakujícímu se kódu, než používat komponenty, je přímo vložit šablonu. Následující kód vloží šablonu <code>article.latte</code> a předá jí proměnnou <code>$article</code>:</p>

<pre><code>{include "article.latte", article => $article}</code></pre>


<p>Příkaz <code>include</code> nefunguje v Latte stejně jako v PHP, tj. vkládaná šablona <b>nemá k disposici proměnné</b> své nadřazené šablony, takže se jí to takto musí předávat.</p>

<p>V případě, že se šablona <code>article.latte</code> používá v různých presenterech, bude trochu problém se sestavením cesty. Cesta k <i>includované</i> šabloně je (nejspíš) relativní vůči šabloně, která ji vkládá.</p>