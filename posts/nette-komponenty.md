---
title: "Vlastní komponenty v Nette"
headline: "Vlastní komponenty v Nette"
description: "Komponenty v Nette dokáží bránit opakování stejného kódu."
date: "2015-11-04"
last_modification: "2015-11-05"
status: 1
tags: ["Hotová řešení", "PHP", "Nette Framework"]
---

Jedna z programátorských zásad zní: *Don't repeat yourself* – zkratka **DRY** – česky: *Neopakujte se*. Podle ní by se neměl v programu **opakovat kód**.

**Nette Framework** má pro opakovaně používaný kód tzv. *komponenty*.

## Kdy se komponenty hodí

Typickým případem jsou formuláře, kdy tentýž formulář může být potřeba vypsat ve více šablonách.

    - Martin Zlámal: [Znovupoužitelný formulář](http://zlml.cz/znovupouzitelny-formular) – příklad formulářové komponenty

Podle mého názoru se ale komponenty hodí i pro různé výpisy.

Třeba na tomto webu se na mnoha místech vypisuje seznam článků:

  - nejnovější články na hlavní straně,

  - nejoblíbenější články na hlavní straně,

  - související články vedle otevřeného článku,

  - články v kategorii

Všechny výpisy jsou si dost podobné, takže se nabízí mít jejich kód na jednom místě.

## Vlastní komponenta

### Šablona

V šabloně se na místě, kde má být komponenta použita, napíše prosté `{control nazevKomponenty, $parametr}`.

Parametr je nepovinný, ale pokud je potřeba předávat do komponenty nějaká data, tak je potřeba (parametrů může být i více).

Cílem je tedy původní zápis typu:

```
{foreach $articles as $article}
  &lt;h2>{$article->nazev}&lt;h2>
  &lt;p>{$article->popis}&lt;p>
{/foreach}
```

Nahradit něčím jako:

```
{foreach $articles as $article}
  {control article, $article}
{/foreach}
```

### Presenter

Komponentu pro použití napříč celou aplikací/modulem je vhodné přidat do *BasePresenteru*:

```
protected function createComponentArticle()
{
  $control = new \ArticleControl;
  return $control;
}
```

Zde se vytvoří komponenta `article` na základě zvláštní třídy `ArticleControl`.

To lomítko před názvem třídy je zásadní, bez něj Nette tuto třídu nenajde.

### Komponenta

Komponenty se dávají třeba do složky `app/components`, ale není to podmínka. V případě používání hodně komponent se ještě mohou zanořovat do podsložek. Název souboru potom odpovídá názvu třídy.

Stěžejní je metoda `render`, která zajistí vykreslení. Přijímá parametry z `{control nazevKomponenty, $parametr}` v šabloně.

Na rozdíl od presenterů si komponenta **nehledá šablonu automaticky**, ale musí se jí přiřadit přes `$template->setFile`.

```
&lt;?php
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
}
```

### Šablona komponenty

Šablona komponenty `article.latte` potom bude obsahovat společný HTML kód, takže ho půjde elegantně upravovat na jednom místě.

## Filtry v komponentě

V komponentě nebudou fungovat [vlastní Latte filtry](/latte-vlastni-filtry).

Nicméně jdou zprovoznit stejným kódem jako v souboru `BasePresenter.php`:

```
protected function createTemplate($class = NULL)
{
  $template = parent::createTemplate($class);
  $template->addFilter(NULL, 'Filters::common');
  return $template;
}
```

## Odkazy v komponentě

V komponentě nefungují odkazy v `n:href` stejným způsobem jako v šabloně presenteru:

```
&lt;a n:href="Article:default">
  Odkaz
&lt;/a>
```

Výše uvedený kód skončí chybou:

```
Component with name 'Article' does not exist
```

Řešení je použít normální `href` a `{plink}`:

```
&lt;a href="{plink Article:default}">
  Odkaz
&lt;/a>
```

## Vložení `*.latte` šablony

Jiná možnost předcházení opakujícímu se kódu, než používat komponenty, je přímo vložit šablonu. Následující kód vloží šablonu `article.latte` a předá jí proměnnou `$article`:

```
{include "article.latte", article => $article}
```

Příkaz `include` nefunguje v Latte stejně jako v PHP, tj. vkládaná šablona **nemá k disposici proměnné** své nadřazené šablony, takže se jí to takto musí předávat.

V případě, že se šablona `article.latte` používá v různých presenterech, bude trochu problém se sestavením cesty. Cesta k *includované* šabloně je (nejspíš) relativní vůči šabloně, která ji vkládá.