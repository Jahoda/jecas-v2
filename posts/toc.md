---
title: "Automatické generování obsahu"
headline: "Automatické generování obsahu stránky"
description: "Automatické generování obsahu HTML stránky v JavaScriptu i PHP."
date: "2014-03-18"
last_modification: "2014-03-30"
status: 1
tags: ["JavaScript", "Hotová řešení", "PHP"]
---

Obsah stránky (anglicky: *table of contents*, zkráceně **TOC**) může zpřehlednit čtení delšího článku na **obsahovém webu**.

Takový obsah například běžně používá Wikipedie, kdy se na začátku stránky zobrazuje seznam obsahující odkazy na jednotlivé části dané stránky.

## Jak na to

Prvním předpokladem pro automatickou tvorbu *Obsahu* je důsledné používání kotev/záložek u nadpisů. Tj. u každého nadpisu **mít identifikátor**.

```
&lt;h1 **id="nadpis"**>
  Text nadpisu
&lt;/h1>
```

Chybí-li identifikátory, není nic ztraceno. I identifikátor je možné automaticky vygenerovat. Stačí projít nadpisy a v jejich textu převést **mezery na spojovníky** a **odstranit diakritiku** (více v článku [Vytvoření přátelského URL](http://php.vrana.cz/vytvoreni-pratelskeho-url.php)).

TOC (table of contents) umí generovat i nástroje typu [Texy!](http://texy.info).

### Generování obsahu stránky

Z nadpisů (nebo obecně z elementů, které mají atirbut `id`) je potom celkem jednoduché sestavit výsledný seznam.

### Sestavování obsahu

V zásadě existují dvě možnosti, jak výsledný obsah sestavit.

  - Použít HTML seznam (`&lt;ul>`/`&lt;ol>`) a různé úrovně nadpisů do sebe zanořovat.

  - Zanoření znázornit **jen CSS styly**.

Druhů způsob vypsání obsahů značně **zjednodušuje**. Stačí v podsatě ke každé položce s [`id`](/id-class) přiřadit CSS třídu odpovídajícího názvu. A zbytek zařídit **kaskádovými styly**.

```
&lt;ul>
  &lt;li class="uroven-h1">&lt;/li>
  &lt;li class="uroven-h2">&lt;/li>
&lt;/ul>
```

## JavaScript

Na straně klienta v JS je to asi nejsnazší. Zvlášť za pomoci [`querySelector`u](/queryselector) (od **IE 8**) je vybrání potřebných elementů hodně **elegantní**.

```
var polozky = document.querySelectorAll("[id]");
```

Tyto položky [projedeme cyklem](/js-cykly):

```
var obsah = "&lt;h2>Obsah&lt;/h2>&lt;ul>";
for (var i = 0; i &lt; polozky.length; i++) {
  var uroven = polozky[i].tagName.toLowerCase();
  obsah += "&lt;li class='level-" + 
            uroven + 
            "'>&lt;a href='#" + 
            polozky[i].id + "'>" + 
            polozky[i].innerHTML + "&lt;/a>";    
}
obsah += "&lt;/ul>";

```

Nyní stačí obsah proměnné vypsat do nějakého `&lt;div>`u.

```
&lt;div class="obsah">&lt;/div>
&lt;script>
  document.querySelector(".obsah").innerHTML = obsah;
&lt;/script>
```

V případě, že se na stránce používají [identifikátory](/id-class) i pro stylování, je vhodné některé značky buď přeskočit (`&lt;div>` a `&lt;span>`), nebo napak vytvářet odkazy jen pro nadpisy (`&lt;h1>`, `&lt;h2>`, …). Stačí k tomu kontrolovat vlastnost `tagName` (v ukázce hodnotu proměnné `uroven`).

```
if (uroven == "div" || uroven == "span") continue;
```

## PHP

Podobný seznam může *vyzobat* z HTML i PHP.

```
function tableOfContents($html) {
  $pattern = '/&lt;h([2-5]) id=["\'](.*?)["\'].*?>(.*?)&lt;\/h\1>/';
  preg_match_all($pattern, $html, $matches, PREG_SET_ORDER);

  $output = "";
  foreach ($matches as $item) {
    $output .= '
      &lt;li class="level-' . $item[1] . '">
        &lt;a href="#' . $item[2] . '">' . $item[3] . '&lt;/a>
      &lt;/li>';
  }
  
  return (!empty($output)) ? 
    "&lt;ul class='summary'>" . $output . "&lt;/ul>" : 
    "";
}
```

Funkční ukázka na [GitHubu](https://github.com/Jahoda/toc).

## Zvýraznění aktuální části

Zajímavé vylepšení může být [zvýraznění aktivní části](/zvyrazneni-odrolovani), pokud je na ní odrolováno. Pochopitelně v případě, že je prostor pro [fixní umístění](/position-fixed) seznamu nadpisů.