---
title: "Pročištění HTML kódu"
headline: "Pročištění a opravení „prasáckého“ HTML"
description: "Jak z WYSIWYG editorů (jako třeba Word, starší TinyMCE/CKEditor) vytvořit rozumný a sémantický HTML kód."
date: "2013-05-26"
last_modification: "2013-06-05"
status: 1
tags: ["WYSIWYG", "Hotová řešení", "Rady a nápady"]
---

Takový kód pro *nadpis* s odstavcem může vypadat následovně.

```
&lt;p class=MsoNormal style='margin-bottom:12.0pt;line-height:normal'>&lt;b>&lt;span
style='font-size:14.0pt'>**Nadpis**&lt;/span>&lt;/b>&lt;/p>

&lt;p class=MsoNormal style='margin-bottom:12.0pt;line-height:normal'>&lt;span
style='font-size:14.0pt'>*Běžný text.*&lt;/span>&lt;/p>
```

Tedy plno všelijakých stylů, ze kterých je cílem dostat něco jako:

```
&lt;h1>Nadpis&lt;/h1>
&lt;p>Běžný text.&lt;/p>
```

Pro podobnou potřebu existují hotové nástroje, takže není potřeba vymýšlet nějaké komplikované regulární výrazy pro odstraňování nežádoucích atributů a podobně. (I když i to je možné.)

## HTML Purifier

Demo

Jedná se o hodně kvalitní nástroj, který lze snadno široce konfigurovat (přesně si navolit, které značky a atributy mají projít, lze upravovat relativní a absolutní adresy), navíc zajišťuje 100% vyhovující HTML výstup (nehrozí neuzavřené nebo překřížené značky a podobně).

Hodně přísný zápis povolených značek a atributů může vypadat takto: `p,b,a[href],i,br,img[src],ul,ol,li,table,tr,td`

Příklad:

```
require_once 'HTMLPurifier/Bootstrap.php';
spl_autoload_register(array('HTMLPurifier_Bootstrap', 'autoload'));

$config = HTMLPurifier_Config::createDefault();
$config->set('HTML.Allowed', 'p,b,a[href],i,br,img[src],ul,ol,li,table,tr,td');
$config->set('AutoFormat.RemoveEmpty', true);
//$config->set('URI.Base', 'http://www.example.com');
//$config->set('URI.MakeAbsolute', true);

$purifier = new HTMLPurifier($config);
$clean_html = $purifier->purify($dirty_html);
```

## Texy!

Není to sice primární účel, ale tento nástroj jde použít i k **opravě a kontrole** nad HTML kódem. Nenabízí tak pohodlnou konfiguraci jako HTML Purifier, ale zase je tato knihovna datově menší a rychlejší.

Demo

Příklad:

```
require_once '/Texy/Texy.php';
$texy = new Texy();
$texy->setOutputMode(Texy::HTML5);
$texy->allowedTags =
    array(
        'p','b','i','br','ul','ol','li','table','tr','td',
        'a' => array('href'),
        'img' => array('src'),
    );
$texy->allowed = array('html/tag' => true);
$clean_html = $texy->process($dirty_html);
```

Nevýhody Texy! pramení z toho, že je určen primárně k **něčemu jinému**.

Hlavní rozdíl je v **nevyhazování neznámých značek** (atributy se vyhazují). Texy! je převede na entity, takže se budou v textu zobrazovat. U ukázky na začátku zase z podivných důvodů nechá element `&lt;span>`.

Výhoda spočívá v poměrně zdařilých typografických úpravách, které Texy nabízí (pokud se zakomentuje `$texy->allowed = array('html/tag' => true);`).

  ## Ruční úpravy

Takto se lze dobrat k slušnějšímu kódu.

```
&lt;p&gt;&lt;b&gt;Nadpis&lt;/b&gt;&lt;/p&gt;
&lt;p&gt;Běžný text.&lt;/p&gt;
```

A nezbývá než si vytvořit regulární výrazy, které kód vylepší do finální podoby.

Vytvoření nadpisu může být náhrada `&lt;p>&lt;b>(.*)&lt;/b>&lt;/p>` za `&lt;h1>$1&lt;/h1>`.

Testovat, zda regulární výrazy fungují, lze pohodlně v editoru Sublime Text po stisknutí Ctr + H.

**Poznámka**: Někdy může být lepší provádět tyto ruční úpravy nad nepročištěným kódem.

## Odstranění mezer

[Hotová funkce](http://php.vrana.cz/odstraneni-mezer-z-html-dokumentu.php) odstraňující mezery z HTML kódu (bere ohled na blokové/inline značky a speciální elementy jako `&lt;pre>`). Kromě toho uzavírá [nepovinné značky](/html-znacky#koncova-volitelna) a také uzavírá všechny **hodnoty atributů** do uvozovek.

## Na co si dát pozor

Vstup od uživatele, je-li umožněno zadávat HTML, by **vždy** měl nějakým obdobným nástrojem být ošetřen; neošetření představuje [bezpečnostní nebo jiné risiko](/bezpecnost). Mezi bezpečnostní patří např. vložení škodlivého skriptu, mezi jiná rozhození webu (třeba i neúmyslnou) chybou.