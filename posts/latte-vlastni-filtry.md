---
title: "Vlastní Latte filtr"
headline: "Vlastní Latte filtr"
description: "Jak si vytvořit vlastní filtr (helper) do Latte šablon v Nette Frameworku."
date: "2015-10-19"
last_modification: "2015-10-19"
status: 1
tags: ["hotova-reseni", "nette", "php"]
format: "html"
---

<p>Při používání šablonovacího systému <b>Latte</b> si jde práci usnadnit používáním filtrů (dříve se jim říkalo <i>helpery</i>). Jedná se o příkazy zapisující se za <code>|</code> (tento znak se na <a href="/ceska-klavesnice">české klávesnici</a> zapíše zkratkou <kbd>Pravý Alt</kbd> + <kbd>W</kbd>).</p>

<p>Spoustu filtrů je přímo zabudovaných:</p>

<div class="external-content">
  <ul>
    <li>Nette dokumentace: <a href="https://doc.nette.org/cs/2.3/default-filters">Výchozí Latte filtry</a></li>
  </ul>
</div>

<p>Příklad elegantního formátování kalendářního data přímo v <code>*.latte</code> šabloně vypadá následovně:</p>

<pre><code>{$article->last_modification|date:'j. n. Y'}</code></pre>


<h2 id="jednoduchy">Jednoduchý vlastní filtr</h2>

<p>Vlastní filtry se registrují v presenteru (typicky soubory <code>NecoPresenter.php</code> ve složce <code>presenters</code>). Pro použití v rámci celé aplikace (modulu) se je hodí zaregistrovat v <code>BasePresenter.php</code> v metodě <code>beforeRender</code>.</p>

<p>Filtr je potom <b>obyčejná funkce</b>, které se předají parametry, a ona vrátí požadovaným způsobem upravený výstup.</p>

<pre><code>protected function beforeRender()
{
  $this->template->addFilter('<b>tucne</b>', function ($obsah) {
    return "&lt;b>" . $obsah . "&lt;/b>";
  });
}
</code></pre>






<p>Použití v šabloně je následující:</p>

<pre><code>{<b>!</b>$article->last_modification|date:'j. n. Y'|<b>tucne</b>}</code></pre>

<p>Jak je vidět:</p>

<ol>
  <li>Filtry je možné řetězit (použít více filtrů pro jednu proměnnou).</li>
  <li>Před proměnnou je vykřičník, aby se vypsaly HTML značky.</li>
</ol>





<h2 id="vice">Více vlastních filtrů</h2>

<p>Používat filtry výše uvedeným způsobem příliš nepomáhá přenositelnosti kódu. Lepší bude si pro filtry vytvořit vlastní třídu nebo dokonce více tříd.</p>

<h3><code>Filters.php</code></h3>

<pre><code>&lt;?php
class Filters
{
    public static function common($filter, $value)
    {
        if (method_exists(__CLASS__, $filter)) {
            $args = func_get_args();
            array_shift($args);
            return call_user_func_array(array(__CLASS__, $filter), $args);
        }
    }

    public static function tucne($obsah)
    {
        return "&lt;b>" . $obsah . "&lt;/b>";
    }
}</code></pre>























<h3><code>BasePresenter.php</code></h3>

<p>Přidá se metoda <code>createTemplate</code>:</p>

<pre><code>protected function createTemplate($class = NULL)
{
    $template = parent::createTemplate($class);
    $template->addFilter(NULL, 'Filters::common');
    return $template;
}</code></pre>







<p>Metoda <code>common</code> ve třídě <code>Filters</code> zajistí to, že půjde v šablonách všechny filtry ze třídy používat prostřednictvím názvu funkce.</p>

<p>Filtry z nějaké třídy jde přiřazovat i jednotlivě:</p>

<pre><code>$template->addFilter("tucne", 'Filters::tucne');</code></pre>



<h2 id="trida">Třída jako filtr</h2>

<p>Byla-li by celá třída jeden filtr, mělo by jít použít <code>__invoke</code>:</p>

<pre><code>class TucneFilter
{
    public function __invoke($obsah)
    {
        return "&lt;b>" . $obsah . "&lt;/b>";
    }
}</code></pre>





<p>A následně připojit filtr v <code>BasePresenter</code>u jako:</p>

<pre><code>$template->addFilter('tucne', new TucneFilter);
</code></pre>

<p>Více informací:</p>

<div class="external-content">
  <ul>
    <li>Petr Jirásek: <a href="https://petrjirasek.cz/blog/jak-napsat-vlastni-latte-filtr-v-nette">Jak napsat vlastní Latte filtr v Nette?</a></li>
  </ul>
</div>






<h2 id="uzitecne">Užitečné vlastní filtry</h2>

<p>Hodně populární je filtr pro výpis data v podobě „<a href="/update-casu">před X minutami</a>“:</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/fprochazka/nette-components/blob/master/TimeAgoInWords/Helpers.php">TimeAgoInWords</a></li>
  </ul>
</div>


<p>Filtr se hodí i pro přidání formátování nástrojem Texy!, ale to ještě budu muset vymyslet, jak se dělá.</p>


<h2 id="starsi">Starší způsob</h2>

<p>Dříve se vlastní helpery registrovaly přes <code>registerHelperLoader</code>:</p>

<pre><code>$template->registerHelperLoader('Helpers::loader');</code></pre>

<p><img src="/files/latte-vlastni-filtry/helperloader.png" alt="Deprecated helperLoader" class="border"></p>









<p>To už je <i>deprecated</i> a hlásí to chybu:</p>

<blockquote>
  <p>Nette\Bridges\ApplicationLatte\Template::registerHelperLoader() is deprecated, use dynamic getLatte()->addFilter()</p>
</blockquote>