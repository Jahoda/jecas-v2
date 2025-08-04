---
title: "Vlastní Latte filtr"
headline: "Vlastní Latte filtr"
description: "Jak si vytvořit vlastní filtr (helper) do Latte šablon v Nette Frameworku."
date: "2015-10-19"
last_modification: "2015-10-19"
status: 1
tags: ["Hotová řešení", "PHP", "Nette Framework"]
---

Při používání šablonovacího systému **Latte** si jde práci usnadnit používáním filtrů (dříve se jim říkalo *helpery*). Jedná se o příkazy zapisující se za `|` (tento znak se na [české klávesnici](/ceska-klavesnice) zapíše zkratkou Pravý Alt + W).

Spoustu filtrů je přímo zabudovaných:

    - Nette dokumentace: [Výchozí Latte filtry](https://doc.nette.org/cs/2.3/default-filters)

Příklad elegantního formátování kalendářního data přímo v `*.latte` šabloně vypadá následovně:

```
{$article->last_modification|date:'j. n. Y'}
```

## Jednoduchý vlastní filtr

Vlastní filtry se registrují v presenteru (typicky soubory `NecoPresenter.php` ve složce `presenters`). Pro použití v rámci celé aplikace (modulu) se je hodí zaregistrovat v `BasePresenter.php` v metodě `beforeRender`.

Filtr je potom **obyčejná funkce**, které se předají parametry, a ona vrátí požadovaným způsobem upravený výstup.

```
protected function beforeRender()
{
  $this->template->addFilter('**tucne**', function ($obsah) {
    return "&lt;b>" . $obsah . "&lt;/b>";
  });
}

```

Použití v šabloně je následující:

```
{**!**$article->last_modification|date:'j. n. Y'|**tucne**}
```

Jak je vidět:

  - Filtry je možné řetězit (použít více filtrů pro jednu proměnnou).

  - Před proměnnou je vykřičník, aby se vypsaly HTML značky.

## Více vlastních filtrů

Používat filtry výše uvedeným způsobem příliš nepomáhá přenositelnosti kódu. Lepší bude si pro filtry vytvořit vlastní třídu nebo dokonce více tříd.

### `Filters.php`

```
&lt;?php
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
}
```

### `BasePresenter.php`

Přidá se metoda `createTemplate`:

```
protected function createTemplate($class = NULL)
{
    $template = parent::createTemplate($class);
    $template->addFilter(NULL, 'Filters::common');
    return $template;
}
```

Metoda `common` ve třídě `Filters` zajistí to, že půjde v šablonách všechny filtry ze třídy používat prostřednictvím názvu funkce.

Filtry z nějaké třídy jde přiřazovat i jednotlivě:

```
$template->addFilter("tucne", 'Filters::tucne');
```

## Třída jako filtr

Byla-li by celá třída jeden filtr, mělo by jít použít `__invoke`:

```
class TucneFilter
{
    public function __invoke($obsah)
    {
        return "&lt;b>" . $obsah . "&lt;/b>";
    }
}
```

A následně připojit filtr v `BasePresenter`u jako:

```
$template->addFilter('tucne', new TucneFilter);

```

Více informací:

    - Petr Jirásek: [Jak napsat vlastní Latte filtr v Nette?](https://petrjirasek.cz/blog/jak-napsat-vlastni-latte-filtr-v-nette)

## Užitečné vlastní filtry

Hodně populární je filtr pro výpis data v podobě „[před X minutami](/update-casu)“:

    - [TimeAgoInWords](https://github.com/fprochazka/nette-components/blob/master/TimeAgoInWords/Helpers.php)

Filtr se hodí i pro přidání formátování nástrojem Texy!, ale to ještě budu muset vymyslet, jak se dělá.

## Starší způsob

Dříve se vlastní helpery registrovaly přes `registerHelperLoader`:

```
$template->registerHelperLoader('Helpers::loader');
```

To už je *deprecated* a hlásí to chybu:

  Nette\Bridges\ApplicationLatte\Template::registerHelperLoader() is deprecated, use dynamic getLatte()->addFilter()