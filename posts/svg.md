---
title: "SVG"
headline: "SVG"
description: "SVG je grafický formát vhodný pro grafické prvky, které mají mít možnost měnit svou velikost."
date: "2014-10-27"
last_modification: "2016-12-06"
status: 1
tags: ["Responsivní design", "Obrázky"]
---

Zkratka **SVG** znamená *Scalable Vector Graphics* – škálovatelná vektorová grafika.

Zásadní rozdíl oproti běžným [formátům obrázků](/format-obrazku) jako je PNG, GIF nebo JPG spočívá v tom, že jednotlivé části obrázku jsou přesně popsány XML značkami.

Má-li být na obrázku obdélník (anglicky *rectangle*), přidá se do `&lt;svg>` značka `&lt;rect>`:

```
&lt;svg width="200" height="100">
 &lt;rect width="200" height="100" fill="#0D6AB7" />
&lt;/svg>
```

Po nastavení rozměrů a barvy výplně (`fill`) je obrázek na světě:

Jak je vidět na ukázce, kód SVG obrázku jde vložit přímo do HTML.

Po uložení tohoto krátkého kódu do textového souboru s příponou `*.svg` vznikne  **plnohodnotný SVG obrázek**.

V uloženém souboru je nutné uvést **jmenné prostory**:

```
&lt;svg 
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  &lt;!-- samotný obsah obrázku -->
  &lt;rect width="200" height="100" fill="#0D6AB7" />
&lt;/svg>
```

Potom jde použít jako jakýkoliv jiný obrázek standardním způsobem se značkou `&lt;img>`:

```
&lt;img src="obrazek.**svg**">
```

Nebo jako CSS `background`:

```
element {
  background: url(obrazek.**svg**);
}
```

## Podpora

SVG obrázky jde používat od **IE 9**. Starší **Internet Explorery** podporují jiný vektorový formát – VML (*Vector Markup Language*).

Kromě **IE 8** nefunguje SVG ještě ve starém **Android Browseru 2.3**.

Za rozšíření formátu SVG může hlavně vzestup [**responsivních webů**](/responsive), protože je najednou nutné zobrazovat grafické prvky v různých rozlišeních.

## Kdy použít SVG

SVG se hodí prakticky na všechno **kromě fotografií**, tedy:

  - loga,

  - ikony,

  - prvky uživatelského rozhraní,

  - vektorové ilustrace

Kromě prostých obrázků se SVG hodí i pro reklamní bannery, infografiky, interaktivní grafické prvky, datové visualisace / grafy, animované ilustrace nebo pro efekty, které jsou aplikovatelné na HTML prvky.

## Výhody SVG

    Je možné **měnit rozměry** (`width` a `height`) bez ztráty kvality a změny datového objemu.

    Proto je SVG velmi užitečné při tvorbě responsivního webu. Při zvětšení nebo zmenšení obrázku mimo skutečné rozměry je SVG obrázek pořád téměř dokonale ostrý.

    Dále není potřeba vytvářet více obrázků pro různou hustotu pixelů.

    Obrázek v SVG vypadá dobře i při **zoomování stránky**.

    Kromě značky `&lt;img>` či CSS vlastnosti `background` jde SVG obrázek vložit přímo do stránky.

    SVG obrázek jde **stylovat pomocí CSS**. Jisté části se klidně mohou například přebarvit při najetí myší (`:hover`). Změny mohou být díky CSS [`transition`](/transition) i plynulé.

    S obrázkem jde **manipulovat JavaScriptem**. Pomocí JS jde SVG i nakreslit.

    Jednotlivé prvky a efekty SVG obrázku jdou **výborně animovat**.

    Do obrázku jde vkládat **text, který je skutečně text** a ne jen barevné body, které utváří písmena.

## Nevýhody

Existují ale i nevýhody:

    Základní **podpora v prohlížečích** je slabší než u klasických formátů, které fungují všude. SVG nepodporuje **IE 8** a **Android Browser 2.3**.

    Vzhledem k tomu, že obrázky často bývají **nepostradatelnou součástí stránky**, je jejich nezobrazení problematické. Je potom nutné SVG obrázek převést ještě do klasickém formátu pro starší prohlížeče.

    Pokročilejší funkce mají potom podporu proměnlivější a chování se občas liší napříč prohlížeči.

    **SVG se nehodí pro všechno** – pro grafiku, která nevzešla z grafického editoru, ale třeba z fotoaparátu, je formát SVG naprosto nevhodný.

    **Datová velikost** může být u SVG větší než u [optimalisovaného](/optimalisace-obrazku) PNG obrázku. SVG jde ale ještě komprimovat při přenosu pomocí *gzipu*, což může jeho velikost srazit na podobnou velikost.

    **Otevřený zdrojový kód** – zdrojový kód SVG si lze prohlížet v libovolném textovém editoru. SVG obrázek se chrání před [kopírováním](/kopirovani) a upravováním ještě hůř než klasické obrázky.

    Není problém si  jednotlivé části SVG projít ve [vývojářských nástrojích](/vyvojarske-nastroje):

## Vložení SVG na stránku

Samotné použití SVG na stránce je relativně komplikované. Existují základní tři způsoby:

### Značka `&lt;img>`

Klasická značka `&lt;img>` funguje i pro SVG:

```
&lt;img src="obrazek.svg">
```

Fallback pro starší prohlížeče jde potom zajistit JavaScriptem u události `onerror`:

```
&lt;img src="obrazek.svg" 
  onerror="this.onerror=null; this.src='obrazek.png'
">
```

Případě použít nepopulární detekci na straně serveru. Ta nebude trpět tím, že se nepodporovaným prohlížečům **stáhnou dva obrázky**.

### Vložení SVG kódu do HTML

SVG jde vložit do stránky přímo pomocí elementu `&lt;svg>`. Při tomto postupu se obrázek stane součástí [DOMu](/dom). To umožní jeho snadné **stylování a ovládání JavaScriptem**.

```
&lt;svg width="200" height="100">
 &lt;rect width="200" height="100" fill="#0D6AB7" />
 &lt;!-- další prvky obrázku -->
&lt;/svg>
```

Takové vložení je pro pohodlnost vhodné řešit na straně serveru. Příklad v PHP:

```
&lt;?php echo file_get_contents("obrazek.svg"); ?>
```

Vložení SVG při použití **Latte** (šablonovací nástroj Nette frameworku):

```
{file_get_contents($baseUrl . '/images/obrazek.svg')|noescape}
```

Tento způsob vložení je hodně podobný použití [*data-uri*](/data-uri). Ušetří se tím HTTP požadavek, ale obrázek se **nebude cacheovat**.

Inline vložení značkou `&lt;svg>` má lehce horší podporu v prohlížečích. Kromě nepodporovaných prohlížečů **IE 8** a **Android Browser 2.3** nefunguje tento postup ve starých versích dalších prohlížečů:

    - Can I use: [Inline SVG in HTML5](http://caniuse.com/#feat=svg-html5)

Pro nepodporované prohlížeče se nabízí **detekce na straně serveru**. Případně jde pro inline SVG použít záložní obsah s použitím značek `&lt;switch>` a `&lt;foreignObject>`:

```
&lt;svg width="200" height="100">
  &lt;switch>
    &lt;rect width="200" height="100" fill="#0D6AB7" />
    &lt;foreignObject>
      &lt;div class="zalozni-obrazek">&lt;/div>
    &lt;/foreignObject>
  &lt;/switch>
&lt;/svg>
```

Nebo alternativní obsah umístit do značky `&lt;desc>`, jejíž obsah se v podporovaných prohlížečích nezobrazí.

```
&lt;svg width="200" height="100">
  &lt;rect width="200" height="100" fill="#0D6AB7" />
  &lt;desc>
    &lt;div class="zalozni-obrazek">&lt;/div>
  &lt;/desc>
&lt;/svg>
```

Nabízí se otázka, proč do `&lt;desc>`/`&lt;foreignObject>` neumístit přímo značku `&lt;img>`. To má svůj dobrý důvod: prohlížeče podporující SVG by potom **stáhly i záložní obrázek**.

### CSS `background`

Pro všelijaké SVG ikonky a podobně se typicky hodí použít **CSS pozadí** spolu s [`background-size`](/obrazkove-pozadi):

```
element {
  background: url(obrazek.svg) no-repeat;
  background-size: contain;
}
```

Při použití CSS `background`u se nabízí poměrně jednoduché řešení fallbacku pro starší prohlížeče. Podpora SVG je v **IE** stejná jako podpora vícenásobných obrázků (**IE 9+**):

```
element {
  background: url(obrazek.png);
  background-image: url(obrazek.svg), none;
}
```

Nejprve se nastaví pozadí na PNG obrázek a následně se přepíše dvěma obrázky: SVG obrázkem a *ničím* (`none`). Prohlížeče nepodporující vícenásobné pozadí celou deklaraci s `background-image` zahodí a použijí PNG.

Problematický je v tomto **Android Browser 2.3** a starší, který nezná SVG, ale umí vícenásobné pozadí, takže nezobrazí nic.

Obdobně jde využít (ne)podpory [CSS gradientů](/gradient):

```
element {
  background: url(obrazek.png);
  background-image: url(obrazek.svg), 
                    linear-gradient(transparent, transparent);
}
```

To sice vyřadí starý **Adroid Browser**, ale rovněž bude místo SVG jen záložní obrázek v prohlížečích, které SVG podporují: **IE 9** a **Opera Mini**.

### SVG přes `&lt;object>`

Značka `&lt;object>` slouží pro universální vložení cizího prvku do stránky.

Výhoda je v tom, že přímo do značky lze umístit obsah, který prohlížeč použije v případě, že objekt nezná.

```
&lt;object type="image/svg+xml" data="obrazek.svg">
  &lt;div class="zalozni-obrazek">&lt;/div>
&lt;/object>
```

Záložní obrázek je vhodné vložit prostřednictvím CSS pozadí a ne značkou `&lt;img>`, aby záložní obrázek zbytečně nestahovaly prohlížeče, které umí `&lt;svg>`.

### Značka `&lt;image>`

Značka SVG umožňuje pomocí elementu `&lt;image>` vložit v rámci `&lt;svg>` libovolný obrázek:

```
&lt;svg width="200" height="100">
  &lt;image 
    xlink:href="obrazek.svg" 
    src="obrazek.png"
    width="200" height="100" />
&lt;/svg>
```

Z toho jde vymyslet zajímavý fallback pro prohlížeče, co SVG neznají. Značka `&lt;image>` se mimo element `&lt;svg>` totiž chová prakticky stejně jako `&lt;img>`, takže jde do `src` připojit záložní obrázek v PNG.

Starší prohlížeče budou neznámou značku `&lt;svg>` ignorovat a `&lt;image>` zobrazí jako `&lt;img>`. Prohlížeče, co SVG znají, potom budou zase ignorovat atribut `src` a zobrazí `obrazek.svg`:

Je-li obdélník modrý, zobrazuje se SVG. V nepodporovaných prohlížečích se zobrazuje následující PNG obrázek:

## Test podpory SVG

Detekovat podporu SVG v JavaScriptu jde pohodlně s využitím knihovny [Modernizr](https://modernizr.com/):

```
if (!Modernizr.svg) {
  // SVG není podporováno
}
```

Samostatný test podpory SVG je tam udělán následovně:

```
function supportsSVG() {
  return !!document.createElementNS &amp;&amp; !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
}
```

## SVG fallback

Pro případ, že prohlížeč SVG nepodporuje, se zdá být nejsnazší fallback s CSS `background`em, který využívá podobné podpory SVG jako vícenásobného pozadí.

```
element {
  background: url(obrazek.png);
  background-image: url(obrazek.svg), none;
}
```

Není závislý na JS a funguje skoro všude. Pro vyšší jistotu se může přidat třída `.no-svg` pro `&lt;html>`/`&lt;body>` na základě detekce podpory SVG v JS nebo dle detekce problematického zařízení na serveru.

A v CSS mít ještě zálohu:

```
element {
  background: url(obrazek.png);
  background-image: url(obrazek.svg), none;
}
.no-svg element {
  background-image: url(obrazek.png);
}
```

Další příklady SVG fallbacků:

    - [SVG fallback pure CSS: Can I use Part 5](http://developersdev.blogspot.ru/2014/10/svg-fallback-pure-css-can-i-use-part-5.html)

    - [SVG Fallbacks](https://css-tricks.com/svg-fallbacks/)

    - [A Complete Guide to SVG Fallbacks](https://css-tricks.com/a-complete-guide-to-svg-fallbacks/)

## SVG ikony / sprite

Pro optimalisaci počtu HTTP spojení bývá zvykem všechny obrázky spojit do jednoho a jednotlivé obrázky zobrazovat vhodně nastaveným `background-position`.

    - [CSS sprite](/css-sprite) – spojení všech obrázků do jednoho

Menší vsuvka ohledně budoucnosti:

### Protokol HTTP/2

Protokol HTTP/2 řeší problém se stahováním velkého množství externích souborů. Po jeho rozšíření nebude problém připojit do stránky desítky souborů s ikonkami bez zpomalení načítání.

Používání **CSS spritů a spojování souborů** bude potom naopak **anti-pattern**, protože bude komplikovat cacheování.

Klasický *CSS sprite postup* jde použít i v případě SVG. Jen se tím při **fixních rozměrech** nic moc nezíská (kromě ostrých ikonek při zoomu a na displejích s velkou hustotou pixelů).

### Různá velikost

Aby šly ikonky snadno zvětšovat a zmenšovat, je užitečné mít posice jednotlivých obrázků v relativních jednotkách – třeba `em`.

Díky tomu, že rozměry i posice obrázku jsou v `em` jednotkách, stačí pro změnu velikosti změnit [`font-size`](/font#size).

[Živá ukázka](http://kod.djpw.cz/kprb) – změna velikosti SVG ikonek ve spritu

Na ukázce je vidět, že není rozumné ikonky nalepit úplně na sebe, ale je dobré ponechat nějaké odsazení.

Dále ke čtení:

    - Smashing Magazine: [Resolution Independence With SVG](http://www.smashingmagazine.com/2012/01/resolution-independence-with-svg/)

### SVG v data-uri

Jelikož SVG má stejnou podporu jako Data URI (zápis obsahu souboru pomocí protokolu `data:`), není příliš problém `data:` použít místo vytváření **SVG spritu**:

```
.icon {
  background-image: url('data:image/svg+xml;…');
}
```

Každá ikonka potom má vlastní `background-image`, takže se nemusí kouzlit s `background-position`.

Veškeré SVG obrázky se stanou součástí CSS souboru.

Existují hotové nástroje, které umí z SVG ikonek vygenerovat hotové řešení s fallbacky:

    - [Iconizr](http://iconizr.com/) – vygeneruje SVG sprite pro CSS background, data-uri i fallbacky v PNG

    - [Grumpicon](http://www.grumpicon.com/) – vygeneruje SVG do data-uri s PNG fallbacky

Vkládání obrázků pomocí data-uri je dobré zvážit. Má to i své nevýhody:

    Obrázky se **kešují spolu s CSS souborem**, což nemusí být ideální. Změna jediného obrázku vede k nutnosti znovu stahovat celé CSS. Změna CSS v podstatě zneplatní všechny obrázky.

    Datově velké obrázky budou **zdržovat stažení CSS**. Měly by tedy být mimo *kritické CSS* [načítané asynchronně](/nacitani-css), jinak budou blokovat vykreslení.

    Vždy se stáhnou všechny obrázky, ačkoliv na dané stránce nemusí být potřeba.

Pro **větší obrázky** tedy není tento postup moc šťastný. Detailněji se problematikou zabývá článek:

    - [Why Inlining Everything Is NOT The Answer](http://calendar.perfplanet.com/2011/why-inlining-everything-is-not-the-answer/)

### Skutečný SVG sprite

SVG nabízí ještě jeden elegantní způsob, jak sprity vytvořit.

Do značky `&lt;svg>` přímo do HTML kódu jde umístit všechny ikonky. Slouží k tomu značka `&lt;symbol>`.

```
&lt;svg style="display:none;">
  &lt;symbol id="**id-ikony**" viewBox="0 0 32 32">
    &lt;path d="…" fill="#000000">&lt;/path>
  &lt;/symbol>
  &lt;symbol id="dalsi-ikona" viewBox="0 0 32 32">
    &lt;!-- obsah další ikony -->
  &lt;/symbol>
&lt;/svg>
```

Používat element `&lt;symbol>` není úplně nutné. Jde použít i skupinu `&lt;g>`, ale není to tak dobré. Symbol totiž prohlížeče nerenderují před použitím.

Element `&lt;svg>` je skrytý pomocí [`display: none`](/display#none), jinak by na stránce zabíral nějaký ten prostor.

Jednotlivé nadefinované *symboly* jde následně použít kdekoliv na stránce pomocí značky `&lt;use>`:

```
&lt;svg class="ikona">
  &lt;use xlink:href="**#id-ikony**">&lt;/use>
&lt;/svg>
```

Třída u `&lt;svg>` slouží pro další stylování. Tímto postupem je navíc možné měnit vlastnosti SVG obrázku pomocí CSS souboru připojeného ke stránce (při jiném způsobu vložení musí být CSS v `*.svg` souboru).

.ikona {
	display: inline-block;
	width: 1em;
	height: 1em;
	fill: currentColor;
}  

  Tlačítko s SVG ikonkou

Tuto techniku dokáže používat online nástroj **Icomoon**:

    - [Icomoon](https://icomoon.io/app/) – nástroj pro vytvoření SVG spritů

Nevýhoda nastrkání všech SVG ikonek do hlavičky je jasná – **ikonky se nebudou ukládat do cache**.

Teoreticky je možné ikonky cacheovat JavaScriptem do [`localStorage`](/localstorage):

    - Osvaldas Valutis: [Caching SVG Sprite in localStorage](http://osvaldas.info/caching-svg-sprite-in-localstorage)

Nebo SVG definici ikonek stáhnout [AJAXem](/ajax), což použití cache umožní, ale opět to bude závislé na JavaScriptu.

I problém s kešováním se SVG snaží řešit:

### SVG sprite z externího souboru

Do konstrukce `&lt;use xlink:href="**#id-ikony**">&lt;/use>` jde zadat **externí soubor** se všemi definicemi ikonek a odkázat se na konkrétní symbol:

```
&lt;svg class="ikona">
  &lt;use xlink:href="**ikony.svg**#id-ikony">&lt;/use>
&lt;/svg>
```

Tento postup ale bohužel nefunguje v **Internet Exploreru** (ani v **IE 9+**, který SVG podporuje).

Detailnější popis **SVG spritů**:

    - Sara Soueidan: [An Overview of SVG Sprite Creation Techniques](https://24ways.org/2014/an-overview-of-svg-sprite-creation-techniques/)

## Grafické programy pro SVG

Pro vlastní vytváření SVG je potřeba nějaký ten grafický editor:

### Inkscape

[Stáhnout Inkscape](https://inkscape.org/en/download/)

**Inkscape** je zdarma pro všechny platformy – [**Windows**](/windows-10), **Mac OS X**, **Linux**.

Výsledný SVG obrázek je potřeba pro použití pročistit od zbytečných značek.

### Adobe Illustrator

[Stáhnout Illustrator](http://www.adobe.com/cz/products/illustrator.html)

Poměrně drahý program, který se pro pouhou úpravu SVG asi nevyplatí kupovat.

### Online editory

Vzhledem k povaze SVG není takový problém vytvořit **editor přímo v prohlížeči**.

    - [SVG edit](http://svg-edit.googlecode.com/svn-history/r1771/trunk/editor/svg-editor.html) – kreslení SVG přímo v prohlížeči

### Zobrazení SVG v průzkumníku

Ve Windows se při prohlížení *Explorerem* (průzkumníkem) standardně nezobrazují náhledy SVG obrázků. To není moc praktické. Existuje ale rozšíření, které tento problém řeší:

[SVG Viewer Extension for Windows Explorer](https://svgextension.codeplex.com/)

Po stažení a instalaci se budou automaticky zobrazovat náhledy SVG souborů:

Pokud se ihned po instalaci náhledy nezačnou zobrazovat, jde tomu pomoci změnou možnosti *Otevřít v programu* ve vlastnostech souboru. Po nastavení klidně té samé možnosti by se měly náhledy ukázat.

## Optimalisace SVG

Z grafických editorů typicky lezou zbytečně datově velké SVG obrázky. Existují nástroje pro optimalisaci a kompresi.

Mnohdy jde dosáhnout i **50% úspor**:

  - **Odstraněním meta** dat, které do SVG obrázku uložil grafický editor.

  - Zjednodušením a zkombinováním *cest* (`&lt;path>`).

  - Snížení **počtu desetinných míst** typicky vede k největším úsporám.

  - Pro opakované styly více prvků jde použít CSS.

Úpravy pochopitelně mohou změnit výsledný vzhled obrázku. 

### SVGOMG

[SVGOMG online](https://jakearchibald.github.io/svgomg/)

SVGOMG je online nástroj běžící přímo v prohlížeči.

Díky tomu jde při různých stupních optimalisace přímo pozorovat výsledek.

Zároveň se zobrazuje **míra úspory velikosti**.

Využívá SVGO, které jde použít i pro automatisovanou optimalisaci na lokálním PC.

    - [SVGO](https://github.com/svg/svgo) – optimalisuje SVG obrázky v Node.js

### SVG Editor

[SVG Editor online](https://petercollingridge.appspot.com/svg-editor)

Hodně podobný nástroj jako SVGOMG.

Další informace o optimalisaci SVG obsahují články:

    - Mozilla Hacks: [Optimising SVG images](https://hacks.mozilla.org/2015/03/optimising-svg-images/)

    - Sara Soueidan, Performance Calendar: [Tips For Optimising SVG Delivery For The Web](http://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)

    - CSS Tricks: [5 Gotchas You’re Gonna Face Getting Inline SVG Into Production](http://css-tricks.com/gotchas-on-getting-svg-into-production/)

## Převod PNG na SVG

Pro použití v responsivním designu se hodí PNG obrázky nahrazovat SVG formátem.

Existuje řada online nástrojů, které se snaží automaticky převádět PNG do SVG. Rozumně to funguje pouze pro jednoduché obrázky.

Složitější věci je nutné **ručně překreslit**. Některé převodní nástroje pouze zabalí PNG/GIF obrázek do značky `&lt;svg>`, což je k ničemu.

  - [PNG to SVG](https://www.pngtosvg.com)

  - [Vector Magic](http://vectormagic.com/home)

  - [Convert image to the SVG format](http://image.online-convert.com/convert-to-svg)

  - [SVG to PNG image conversion](http://www.fileformat.info/convert/image/svg2png.htm)

  png2svg

simple pixel art -> SVG
  
  - [PicSvg](http://picsvg.com/) – Convert Picture to SVG

  - [Font-blast](https://github.com/eugene1g/font-blast) – umí převést [font-ikony](/font-ikony) na SVG

## Text v SVG

Skutečný text se do SVG obrázku zadává značkou `&lt;text>`:

    Je čas

Takový text z obrázku je potom perfektně **přístupný** a je i možné ho **označit myší**.

      Je čas
      web design

S textem jde potom provádět spoustu věcí. Třeba roztáhnout písmo podle šířky a obarvit ho gradientem.

Další úpravy a animace textu popisuje následující presentace:

    - Brenna O'Brien: [Creative Typography with SVG](http://talks.brennaobrien.com/svg-typography/) – formátování a animování písma

## SVG ikony ke stažení

Hromadu ikon v SVG je možné zdarma stáhnout z internetu:

    - [Noun Project](https://thenounproject.com/) – ikonky pro všechno se snadnou možností prohledávat

    - [SVG Icons](http://svgicons.sparkk.fr/) – několik hotových sad ikon připravených ke vložení

## Odkazy jinam

  - CSS Tricks: [Using SVG](https://css-tricks.com/using-svg/) – úvod do používání SVG

  - [Snap SVG](http://snapsvg.io/start/) – vytváření SVG pomocí JavaScriptu (článek na [Sitepointu](http://www.sitepoint.com/introduction-snap-svg/))

### SVG animace

  - CSS Ticks: [SVG Animation and CSS Transforms: A Complicated Love Story](http://css-tricks.com/svg-animation-on-css-transforms/)
  
  - CSS Ticks: [Scroll Drawing](https://css-tricks.com/scroll-drawing/) – kreslení v závislosti na rolování
  
- Smashing Magazine: [Styling And Animating SVGs With CSS](http://www.smashingmagazine.com/2014/11/03/styling-and-animating-svgs-with-css/)
    
  - Jake Archibald: [Animated line drawing in SVG](http://jakearchibald.com/2013/animated-line-drawing-svg/) – animované SVG čáry
  
  - The new code: [Morphing Elements with SVG](http://thenewcode.com/36/Morphing-Elements-with-SVG)

  JS knihovny pro animace SVG:
    
      - [Snap.svg](http://snapsvg.io/)

      - [GSAP](http://greensock.com/gsap)

      - [Velocity.js](http://julian.com/research/velocity/#svg)

      - [D3.js](http://d3js.org/)

### SVG bannery

  - Chris Gannon: [My First SVG Banner Ad](http://codepen.io/chrisgannon/post/my-first-svg-banner-ad)

### SVG filtry a textury

  - [SVG Filters](http://jorgeatgu.github.io/svg-filters/)
   
  - [Textures.js](http://riccardoscalco.github.io/textures/) – SVG patterns for Data Visualization

### Generátory

  - [Bokeh Backgrounds with SVG and JS](http://demosthenes.info/blog/1061/Bokeh-Backgrounds-with-SVG-and-JS) – generování pozadí pomocí JS

### Grafy

  - [How to Make Charts with SVG](https://css-tricks.com/how-to-make-charts-with-svg/)

### WebGL

  - CSS Tricks: [Rendering SVG Paths in WebGL](https://css-tricks.com/rendering-svg-paths-in-webgl/)

### Přednášky

  - Brenda Storer: [Cracking the SVG Code](http://brendastorer.com/presentations/2015-10-CSSDevConf-SVGs/#intro)

  - Chris Coyier: [The Wonderful World of SVG](https://speakerdeck.com/chriscoyier/the-wonderful-world-of-svg)
  
  - Sarah Drasner: [Designing Complex SVG Animations](http://slides.com/sdrasner/cssdevconf/)

  - Sara Soueidan: [SVG For Web Designers (and Developers)](http://www.slideshare.net/SaraSoueidan/svg-for-web-designers-and-developers)

  .live--svg-blok svg {
    display: block;
  }