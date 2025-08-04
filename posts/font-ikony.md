---
title: "Font ikony"
headline: "Font ikony"
description: "Ikony tvořené fontem. Proč je nepoužívat a čím je nahradit."
date: "2014-01-10"
last_modification: "2015-12-04"
status: 1
tags: ["Písma", "Ikony"]
---

Při používání ikon ve webové aplikaci je dobré, když jde ikonky pohodlně:

  - zvětšovat a zmenšovat bez ztráty ostrosti,

  - přebarvovat

Font ikony dokáží oboje.

## Jak fungují

Technicky se jedná o zvláštní druh webového písma připojeného pomocí [`@font-face`](/font-face). Místo toho, aby v něm byly definovány normální znaky z abecedy, obsahuje grafické symboly pro běžně nepoužívané znaky, které tak nahradí ikonami.

Bez načtení ikonového fontu se tak typicky zobrazují jen čtverečky . Je to vidět na následujícím obrázku s a bez načteného fontu pro ikony.

Aby *čtverečky* nestrašily v HTML kódu, zpravidla se do něj dává pouze prázdný element typu:

```
&lt;i class="el-icon-info-sign">&lt;/i>
```

(Používat pro font-ikony značku `&lt;i>` je jen rozšířená konvence. Může to být jinak libovolný element, třeba neutrální `&lt;span>`.)

Symboly nahrazené ikonou se potom přidávají přes CSS vlastnost `content` pro pseudo-elementy [`:before`/`:after`](/content-attr):

```
.el-icon-info-sign {
  font-family: "Název font-ikon";
}
.el-icon-info-sign:before {
  content: "\e699";
}
```

## Podpora

Font-ikony jde používat ve všech prohlížečích podporujících webové fonty.

To je třeba už **IE 6** (při použití formátu EOT). Prohlížeče mimo **Internet Explorer** potom podporují například formát WOFF.

### Mobilní zařízení

Webové fonty a tedy i ikony tvořené fonty vůbec nefungují v mobilním prohlížeči **Opera Mini**. Dále nefungují v **mobilních Internet Explorerech 9** a starších – **IE 9 mobile** je ve Windows Phone 7 zařízeních, která není možné upgradovat.

Obecně do starých mobilů zpravidla nejde dostat lepší prohlížeč než **Operu Mini**.

Ukázka zobrazení v mobilních prohlížečích bez a s podporou webfontů/font-ikon. Vlevo **Opera Mini**, vpravo [**Edge Mobile**](/edge-mobile):

Zápis fontů přes CSS pseudo-elementy [`:before`/`:after`](/css-selektory#before-after) potom limituje funkčnost na **IE 8+**.

## Nevýhody

Velká nevýhoda je nefunkčnost v aktuálním prohlížeči **Opera Mini 8** i starších, které jsou v mobilech dost používané. Zobrazí se v nich místo ikon jen čtverečky.

### Font ikony jsou *workaround*

Další nevýhody plynou z toho, že:

  Používání webfontů pro ikony je od počátku dočasné řešení.

Některé nástroje pro **blokování nepotřebného obsahu** (reklamy, měřicí kódy, sociální pluginy od Facebooku apod.) mohou blokovat i webová písma.

Případně může mít návštěvník nastavený ve svém *user CSS* své vlastní písmo, kterým přepíše deklarace font-ikon. To může být případ například dyslektiků, kteří používají specifický font pro snazší čtení:

V některých případech se při nenačtení fontu s ikonami mohou místo čtverečků zobrazit nežádoucí symboly [Emoji](/emoji).

Případně se do načtení může zobrazovat něco jiného, než by mělo, jak ilustruje příklad od **Jima**:

  Dostal jsem jeden takový custom font k nasazení. 4 ikonky v kroužkách pod logem (mobilní verse). Krásně jsem to naaranžoval a spokojeně pušnul. Druhej den přišel screen vod šéfa, kterej to testoval na pomalém připojení. Než se font načetl, byla v kroužkách postupně písmena P, I, C a A přesně v tomto pořadí...

Další negativum je omezení na jedinou barvu, kterou ikonka může mít. Kvůli tomu musí být font-ikona plochá.

Podobu ikonky, protože se jedná o text, ovlivňuje hromada vlastností jako velikost písma, výška řádku, zarovnání na řádku a spoustu dalších vlastností. Kvůli tomu je obtížnější používat font-ikony s přesností na pixel.

Proč nepoužívat font-ikony shrnuje následující presentace:

    - Seren Davies: [Death to Icon Fonts](https://speakerdeck.com/ninjanails/death-to-icon-fonts)

### Vytvoření font-ikon

Komplikovanější je i **výroba vlastního fontu** s potřebnými ikonkami oproti prostému vygenerování obrázků.

Při používání hotových sad *icon-fontů* se potom typicky stahují i nepoužívané ikony (jednak deklarace v CSS, jednak samotný font s ikonami). Je samozřejmě možné si vytvořit vlastní font, kde budou jen potřebné ikony, ale může to být pracné / hůře automatisovatelné.

    - [Icomoon](https://icomoon.io) – procházení ikon a generování vlastních sad

    - [Fontastic](http://fontastic.me/) – nástroj pro generování vlastní font-ikon

### Poskakování během načítání

Symboly ikon z fontu mají často jiný rozměr než *čtvereček*, který je na stránce do doby načtení font-ikon.

Po načtení fontu se tak typicky změní velikost ikony a stránka lehce poskočí.

Prohlížeče na stažení fontu pro ikony nejčastěji chvíli čekají (cca 3 vteřiny). Po tuto dobu se *text* ikon nezobrazuje. Při dlouhém načítání se tak mohou návštěvníkovi objevit čtverečky.

Kliknutím na obrázek se přepne podoba GitHubu mezi podobami bez a s font-ikonkami:

### Přístupnost a hlasové čtečky

Další problém je s tím, že hlasová čtečka v případě použití zvláštního symbolu, který se díky fontu nahradí ikonou, může chtít tento znak přečíst – považuje ho za text.

Některé ikon fonty to řeší CSS konstrukcí: `speak: none`. Pro bezproblémové chování v nejrůznějších čtečkách je lepší použít ještě [aria atribut `hidden`](/aria#hidden).

Přístupností font ikon se zabývá následující článek:

    - [Bulletproof Accessible Icon Fonts](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html) – font-ikony s ohledem na přístupnost

## SVG ikony

Nejlepším postupem, jak v dnešní době řešit ikony, se zdá být [SVG](/svg). Stejně jako font-ikony se dokáže zvětšovat/zmenšovat bez ztráty kvality i jde snadno přebarvovat.

Dokonce jde samostatně stylovat jednotlivé části ikony. SVG ikony je navíc možné i animovat.

Nakonec použití SVG nevypadá jako zneužití technologie pro jiný účel, než pro který byla navržena.

Kritické SVG ikony jde případně vložit přímo do HTML kódu stránky, čímž se prakticky zaručí jejich načtení.

Font-ikony se tak nabízí použít spíš jako fallback pro prohlížeče nepodporující SVG – **IE 8** a starší nebo **Android Browseru 2.3**. I když je otázka, jestli se takové prohlížeče nespokojí jen s PNG fallbackem a font-ikony tak **nemá vůbec smysl používat**.

## Výhody font-ikon oproti SVG

V závislosti na použitém *workflow* (pracovním postupu) může být nasazení font-ikon jednodušší. Pro použití stačí připojit jeden CSS soubor a už jde ikony přidávat do HTML.

### Spojení HTTP požadavků

Pokud se nepoužívá protokol HTTP/2 nebo ho prohlížeč nepodporuje, zabalení všech ikon do souboru s fontem elegantně řeší snížení počtu HTTP požadavků a zrychluje načítání.

### Přebarvení ikon

Aby **SVG ikony** šlo pohodlně přebarvit v CSS ve všech prohlížečích, musí být jejich obsah vložený v HTML kódu. To znamená:

  Vypsat obsah SVG souborů při generování HTML. Tento postup zabrání uložení ikonek do cache a bude zdržovat načtení samotného obsahu.

  Načítat SVG ikony [AJAXem](/ajax) a vkládat je do HTML kódu JavaScriptem. Ikonky budou kešovatelné. Nebudou ale fungovat [bez JS](/bez-javascriptu).

Není-li potřeba SVG ikony přebarvovat, jde je zapsat do CSS souboru přes `background-image: url(ikona.svg)`. Pro snížení počtu HTTP spojení potom vložit do zvláštního CSS přes [data URI](/data-uri) nebo z nich klasicky vytvořit [CSS sprite](/css-sprite).

Přebarvitelné a kešovatelné SVG ikonky funkční bez JavaScriptu nejde vytvořit pro **Internet Explorer**. V tomto specifickém případu font-ikony nad SVG vítězí.

## Hotové sady ikon

Řada původně font-ikon je už dostupná i v SVG.

  - [Elusive Icons](http://elusiveicons.com/) – 299 ikon

  - [Glyphicons](http://glyphicons.com/) – zdarma 470 ikon a 50 ikon sociálních sítí

  - [Font Awesome](http://fontawesome.io/icons/) – 369 ikon, zdarma i pro komerční použití. Plně kompatibilní s frameworkem Bootstrap.

  - [Freebie](http://freebiesbug.com/psd-freebies/150-free-outlined-icons-psd-ai-svg-webfont/) – 150 ikon

  - [Captain Icon](http://mariodelvalle.github.io/CaptainIconWeb/) – 350+ ikon v kresleném stylu

  - [Feather](http://colebemis.com/feather/) – 130 ikon

  - [Payment Webfont](http://elusiveicons.com/) – 34 ikon/obrázků pro platební služby

  - [Themify Icons](https://themify.me/themify-icons) – 320+ ikon

  - [Entypo](http://www.entypo.com/) – 411 ikon

  - [Typicons](http://typicons.com/) – 336 ikon

Souhrnné články s tipy na hotové font-ikony:

  - [10 Absolute Best Free Icon Webfonts](http://www.webresourcesdepot.com/10-best-free-icon-webfonts/)

  - [Top 50 Free Icon Fonts for Web Design](http://speckyboy.com/2014/05/14/more-free-icon-fonts/)

  - [11 Great Icon Fonts for Your Projects](https://scotch.io/bar-talk/11-great-icon-fonts-for-your-projects)

## Odkazy jinam

  - CSS tricks: [Font ikony vs. SVG](http://css-tricks.com/icon-fonts-vs-svg/) (anglicky)

  - [Icons and Type](http://snook.ca/archives/html_and_css/icons-and-type) – zarovnání ikony na řádku

  - [New Course: Mastering Icon Fonts on the Web](http://webdesign.tutsplus.com/articles/new-course-mastering-icon-fonts-on-the-web--cms-23817)

  - Six Revisions: [6 Free Tools for Creating Your Own Icon Font](http://sixrevisions.com/tools/icon-font-generators/)