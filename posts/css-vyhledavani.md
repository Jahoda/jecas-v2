---
title: "CSS vyhledávání a filtrování"
headline: "CSS vyhledávání a filtrování obsahu"
description: "Jak pomocí CSS se špetkou JS filtrovat obsah stránky nebo na ní vyhledávat."
date: "2013-09-12"
last_modification: "2013-09-13"
status: 1
tags: ["JavaScript", "CSS", "Hotová řešení", "Rady a nápady"]
---

Kromě filtrování pomocí [`radio` přepínačů](/css-filtrovani-dat) na to lze jít ještě jinak — dle potřeby vygenerovat JavaScriptem CSS kód, který pomocí tříd nebo [pokročilých selektorů](/css-selektory) zvýrazní vyhovující obsah / skryje nevyhovující.

## Připojení CSS pomocí JavaScriptu

V novějších prohlížečích (novější než IE 7) stačí měnit `innerHTML` značky `&lt;style&gt;`.

```
&lt;style id=js-styl&gt;&lt;/style&gt;
&lt;p id=cerveny class=cerveny&gt;Text, který JS přebarví na červenou.
&lt;script&gt;
document.getElementById("js-styl").innerHTML = "p.cerveny {color: red}"
&lt;/script&gt;

### Ukázka

Text, který JS přebarví na červenou.

document.getElementById("js-styl").innerHTML = "p.cerveny {color: red}"

### Starší Internet Explorery

Ve starších IE funguje tato šílenost:

var css = "p.zeleny {color: green}";
var pomocnyDiv = document.createElement('div');
pomocnyDiv.innerHTML = '&lt;p>jen tak&lt;/p>&lt;style>' + css + '&lt;/style>';
document.getElementsByTagName('head')[0].appendChild(pomocnyDiv.childNodes[1]);
```

#### Ukázka

  Text, který JS přebarví na zelenou i ve starých prohlížečích.

var css = "p.zeleny {color: green}";
var pomocnyDiv = document.createElement('div');
pomocnyDiv.innerHTML = 'jen tak

' + css + '';
document.getElementsByTagName('head')[0].appendChild(pomocnyDiv.childNodes[1]);

## Filtrování

Nyní už stačí přidat jednotlivým položkám CSS třídy a těm požadovaným přidat skriptem CSS.

function pridatCss(css) {
  var stylSkript = document.getElementById("styl-skript");
  if (stylSkript) {
    stylSkript.parentNode.removeChild(stylSkript);
  }
  
  var pomocnyDiv = document.createElement('div');
  pomocnyDiv.innerHTML = 'jen tak

' + css + '';
  document.getElementsByTagName('head')[0].appendChild(pomocnyDiv.childNodes[1]);
}

function filtruj(trida) {
  pridatCss(".polozky li {display: none} .polozky ." + trida + 
            " {display: list-item}");
}

    HTML
    CSS
    Odkazy
    Tabulky
    Seznamy
    Selektory

    - a

    - background-image

    - :link

    - :visited

    - :target

    - :first-child

    - table

    - thead

    - tr

    - ul

    - dl

## Vyhledávání

Na tomtéž principu lze vytvořit i vyhledávání v obsahu na stránce.

Použijeme k tomu [selektor obsahujícího řetězce](/css-selektory#atributovy-obsahujici). Ten aplikuje dané pravidlo na cokoliv, co má v hlídaném atributu požadovaný text.

```
p[class*="a"] {color: red}
```

Obarví všechny odstavce, které mají v názvu třídy písmeno `a`.

  .a-test p[class*="a"] {color: red}

    Odstavec `p.**a**hoj`

    Odstavec `p.n**a**zdar`

    Odstavec `p.c**a**u`

Toho využijeme a do nějakého atributu si **připravíme klíčová slova**. Vhodné je bude oddělit nějakým málo používaným znakem, aby vyhledávání nechytalo i složeniny více slov.

Klíčová slova **může připravit server** nebo případně **JavaScript** — tolerantnějšího vyhledávání dosáhneme převedením klíčových slov i hledaného řetězce na malá písmena (pro ještě tolerantnější vyhledávání můžeme odstranit diakritiku).

function sjednotit(text) {
  return text.replace(/ /g, "-").toLowerCase();
}
  
function nastavitCss(css) {
  var stylSkript = document.getElementById("styl-skriptu");
  if (stylSkript) {
    stylSkript.parentNode.removeChild(stylSkript);
  }
  
  var pomocnyDiv = document.createElement('div');
  pomocnyDiv.innerHTML = 'jen tak

' + css + '';
  document.getElementsByTagName('head')[0].appendChild(pomocnyDiv.childNodes[1]);
}
 
function vyhledat(slovo) {
  var hidden = "max-height: 0; opacity: 0; =display: none";
  var visible = "max-height: 1.5em; opacity: 1; =display: block";
  
  if (slovo == "") {
    hidden = visible;
  }
  
  nastavitCss(".hledani ul li {" + hidden + "} .hledani ul li[data-slova*=\"" + 
            sjednotit(slovo) + "\"] {" + visible + "}");
}

  .hledani ul {list-style: none}
  .hledani li {=display: block; overflow: hidden; max-height: 1.5em; opacity: 1; transition: 1s all}

    Hledaný výraz: 

    Posicování v CSS	
    Složení jednoduchého webu v PHP	
    Zjištění skutečných rozměrů obrázku	
    Box model	
    Stejně vysoké sloupce	
    Odkaz jako tlačítko	
    Upload souborů bez refreshe	
    Automatická datová optimalisace obrázků	
    PHP proxy skript	
    Fotografie na pozadí	
    Centrování v CSS	
    Zabránění rolování stránky	
    Automatický lazy-loading YouTube videí	
    Živý náhled CSS ze Sublime Text	
    Kulatý obrázek	
    Animace	
    Flat UI	
    Sublime Text 3 – pluginy a vylepšení	
    Emmet	
    Pro které prohlížeče optimalisovat	
    Mobilní web	
    Který prohlížeč je rychlejší?	
    Přidání URL do Seznamu a Google	
    Meta tag viewport	
    Menu reagujicí na kliknutí	
    Jak získat náhled webu?	
    Testování webů v různých prohlížečích

  Separátní [živá ukázka](http://kod.djpw.cz/eac).

var zaznam = document.getElementById("hledane").getElementsByTagName("li");

for (var i = 0; i 

### Vytvoření *indexu* v PHP

Převést **v PHP nadpisy na *klíčová slova*** jde třeba takto:

```
foreach ($nadpisy as $nadpis) {
  echo "&lt;li data-slova='" . 
        str_replace(" ", "-", strtolower($nadpis)) . 
       "'>$nadpis";
}

```

### Vytvoření *indexu* v JavaScriptu

Při načtení stránky může slova pro vyhledávání do `data-atributu` připravit i přímo JS.

```
var zaznam = document.getElementById("seznam-polozek").getElementsByTagName("li");
for (var i = 0; i &lt; zaznam.length; i++) {
  zaznam[i].setAttribute("data-slova", zaznam[i].innerHTML.replace(/ /g, "-").toLowerCase());
} 
```

## Alternativní řešení

Popsané řešení nelze použít a není vhodné vždy. V případě prohledávání velkého množství záznamů je **nesmyslné všechen obsah vypisovat na jedné stránce**. Lepší je [AJAXové](/ajax) vyhledávání s pomocí serveru.

Vyfiltrovat výsledky umí i samotný JavaScript pomocí `indexOf`, bude to ale nejspíš pomalejší než CSS filtrování.

Uživatelský dojem by mohlo ještě zlepšit **zvýraznění nalezeného řetězce**.

## Filtrování v JavaScriptu

Pro filtrování a řazení seznamů nebo tabulek existují i JS hotová řešení:

  - [List.js](http://listjs.com/)

  - [My Top 5 jQuery Filter &amp; Sort Plugins](http://www.sitepoint.com/top-5-jquery-filter-sort-plugins/)

  - [Real-Time Search in JavaScript](http://osvaldas.info/real-time-search-in-javascript)