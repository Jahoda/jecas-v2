---
title: "JavaScriptové události myši"
headline: "JavaScriptové události myši"
description: "Popis všech možných událostí, které lze v JavaScriptu vyvolat myší. Návod, jak je odchytávat a blokovat."
date: "2013-12-05"
last_modification: "2013-12-08"
status: 1
tags: ["JavaScript", "JS události"]
---

Při vytváření JavaScriptové aplikace existuje spoustu **událostí** a postupů, jak zpracovávat akce vyvolané myší (kursorem/ukazatelem/prstem).

## Kliknutí myši

  `onclick`
  
    Základní kliknutí, rozumí se tím **stisknutí a uvolnění** levého tlačítka myši. To uvolnění je důležité. Když se po stisknutí myši s kursorem trochu pohne, událost `onclick` se nevyvolá. To může být výhoda i nevýhoda.

    - Uživatel si může kliknutí **rozmyslet** a při stisknutém tlačítku pohnout kursorem a akci tak zrušit.

    - Zároveň při **rychlém klikání** může první případ vyvolat omylem. Proto v situaci, kdy je očekáváno rychlejší klikání, může být výhodnější `onmousedown`. Rychlejšího vyvolání události `onmousedown` (oproti `onclick`u) je možné využít pro zrychlení [AJAXvé](/ajax) aplikace, kde načítání proběhne už při **stisknutí** tlačítka. Nečeká se na **uvolnění**.

      Kliknout

    Stejného efektu jako atributem `onclick` lze docílit pseudo-protokolem `javascript:` u odkazu `&lt;a>`.

      Kliknout

    Není to ovšem moc ideální řešení z pohledu zařízení, co **nepodporují JS**, vznikne v nich nesmyslný odkaz.

    Při vytváření klikacích prvků je dobré myslet na uživatele **ovládající web klávesnicí**. Nebude-li mít element s `onclick`em atribut `tabindex`, nepůjde na něj spolehlivě ve všech prohlížečích odTabovat. Více v [testu události `onclick`](/onclick-test).

  `onmousedown`
  
    Vyvolá se **ihned po stisknutí libovolného tlačítka myši**. Je to tedy způsob, jak **odchytit pravé tlačítko nebo kolečko**.

        function kliknout(e) {
          e = e || window.event;
          alert("Kód tlačítka: " + e.which);
        }
      
      Kliknout
    
    Většinou jsou čísla tlačítek následující:

      - 1 — **levé tlačítko**,

      - 2 — **prostřední tlačítko / kolečko**,

      - 3 — **pravé tlačítko**.

    Odchytnout **pravé tlačítko** je většinou možné i přes událost [kontextové nabídky](/kontextova-nabidka) (`oncontextmenu`). Fungujete díky tomu, že pravé tlačítko zpravidla kontextovou nabídku vyvolává.

  `onmouseup`
  
    Vyvolá se po **uvolnění libovolného tlačítka** na elementem. Vyvolá se i v případě, že se tlačítko stiskne někde jinde, přejede se nad element a uvolní.

        function kliknout(e) {
          e = e || window.event;
          alert("Kód tlačítka: " + e.which);
        }
      
      Kliknout

    Jinak, co se týče rozlišování, které tlačítko bylo uvolněno, funguje stejně jako `onmousedown`.

  `ondblclick`
  
    Aktivuje se **dvojklikem levého tlačítka** (dvojité rychlé kliknutí).

        function kliknout(e) {
          e = e || window.event;
          alert("Kód tlačítka: " + e.which);
        }
      
      Kliknout

    Pravé tlačítko nebo kolečko myši dvojlik nevyvolá.

### Objekt `event`

Pro zjištění *podrobností* o kliknutí nebo pro zablokování výchozích akcí slouží objekt `event`, jeho použití a **sjednocení napříč prohlížeči** vypadá následovně:

```
&lt;span onmousedown='funkce(**event**)'>Kliknout&lt;/span>
```

```
function funkce(e) {
  e = e || window.event;
}

```

  - Kód tlačítka je v `e.which`,

  - [Souřadnice kursoru](/souradnice-mysi) v době kliknutí je nutné dále sjednocovat.

## Stornování výchozí akce

Někde je vhodné stornovat výchozí akci prohlížeče, což je například **kontextová nabídka** nebo **ikona pro posouvání** po stránce vyvolaná stisknutím kolečka; případně **prokliknutí odkazu** nebo **odeslání formuláře**.

Klíčem je příkaz `return false`.

Před stornováním je třeba **důkladně rozmyslet**, zda narušení výchozí funkčnosti prohlížeče nebude **návštěvníka obtěžovat**.

(Mimochodem, CSS [vlastnost `pointer-events`](/pointer-events) umí stornovat jen vlastní CSS/JS události. Ty výchozí z prohlížeče nikoliv.)

### Zablokování odeslání formuláře

Příkaz `return false` dokáže zrušit víceméně všechny události.

Zamezit poslání formuláře je možné buď v `onclick`u u jednotlivých odesílacích polí ([`&lt;input type=submit>`](/input#type-submit)/`&lt;button type=submit>`), nebo **spolehlivěji** v události `onsubmit` celého formuláře.

```
&lt;form action="?akce" **onsubmit**="vlastniFunkce(); *return false*">

```

### Zablokování odkazu

Není problém *vystornovat* přechod na adresu `href`u z odkazů.

Hodnotu `false` může vracet i přímo `vlastniFunkce` ([ukázka](http://kod.djpw.cz/bav)):

```
function vlastniFunkce() {
  // nějaký kód
  return false;
}
```

```
&lt;a href='http://jecas.cz' onclick='return vlastniFunkce()'>Odkaz&lt;/a>
```

### Zablokování a odchytnutí pravého tlačítka

**Kontextovou nabídku** po stitknutí pravého tlačítka můžeme zablokovat událostí `oncontextmenu`.

```
&lt;span oncontextmenu="return false">Kliknout&lt;/span>
```

Že bylo pravé tlačítko stisknuto následně **odchytne** [událost `onmousedown`](#onmousedown) ([ukázka](http://kod.djpw.cz/lav)).

### Zablokování kolečka

Chceme-li **tlačítko kolečka** zapojit do ovládání aplikace, je potřeba stornovat jeho běžnou funkci — zobrazení **čtyřsměrné šipky** pro posouvání po stránce pohybem kursoru.

Kolečko / prostřední tlačítko je trochu problematické, protože ne každý návštěvník dokáže **vyvolat jeho stisknutí**.

Blokaci vytvoří `return false` v události `onmousedown` ([ukázka](http://kod.djpw.cz/mav)). Nefunguje v **Opeře 12**.

## Pohyb myši

Kromě mačkání tlačítek je možné reagovat i na **posouvání kursoru**.

  `onmouseover`
  
    Vyvolá se v **momentě** najetí myší na element. V CSS je alternativa [pseudotřída `:hover`](/css-selektory#uzivatelske-akce).

      Najet.

    Pomocí `onmouseover`/`onmouseout` lze i zjišťovat [směr odjetí/přijetí kursoru](/smer-odjeti-mysi).

    České vysvětlení atributu `onmouseover` sepsal [před lety](http://diskuse.jakpsatweb.cz/?action=vthread&forum=1&topic=61146#6) **Miloš F. Pechar**.

  `onmouseout`
  
    Opak `onmouseover`u. Vyvolá se při **odjetí**.

  `onmousemove`
  
    Vyvolává se **neustále** při pohybování se myší nad elementem.

### Objekt `event`

I u **posouvání kursoru** je možné další užitečné věci jako třeba [posici kursoru](/souradnice-mysi) zjistit z `event`u.

„Praktické“ použití zjišťování posice při posouvání myši je u [CSS baterky](/baterka).

## Výběr textu

Taktéž pro vybírání textu na stránce tažením myši se stisknutým tlačítkem existuje událost.

  `onselectstart`
  
    Vyvolá se při označování textu.

      Vybrat text

    Chová se **dost rozdílně** napříč prohlížeči:

      - V **Opeře 12** a **Firefoxu** nedělá nic.

      - Ve **Webkitu** se spustí už při stisknutí levého i pravého tlačítka, nemusí se ani nic označit.

      - V **IE** se spustí v okamžiku, kdy se alespoň něco vybere.

    V **IE** a **Chrome** tak lze pomocí `return false` **znemožnit výběr textu** ([ukázka](http://kod.djpw.cz/wav)).

### Zablokování výběru textu

K tomu nakonec událost `onselectstart` není ani příliš potřeba. Stornováním `onmousedown`u dosáhneme v zásadě téhož ve všech prohlížečích:

  Text, který nejde vybrat. Blokuje to `onmousedown="return false"`.

V **IE** a staré **Opeře 12** funguje atribut `unselectable` nastavený na `on`.

  Text, který nejde vybrat. Blokuje to `unselectable="on"`.

#### Zablokování v CSS

V CSS k blokování výběru slouží vlastnost `user-select`. Funguje od **IE 10**, nefunguje v **Opeře 12**. V ostatních prohlížečích funguje jen s [CSS prefixy](/css-prefixy) ([ukázka](http://kod.djpw.cz/bbv)).

Kromě vlastnosti `user-select` by mohlo jít označování zakamuflovat pseudo-elementem `::selection` ([ukázka](http://kod.djpw.cz/wbv)).

```
elment::selection {background-color: transparent}
```

Používat `::selection` je možné od **IE 9**, ve **Firefoxu** s [`-moz-` prefixem](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection).

## Rolování kolečkem

  `onmousewheel`
  
    Provede se při roztočení kolečka nad daným elementem.

      Roztočit kolečko

    Z `event`u je možné zjistit směr, **jakým se roluje** (nahoru/dolů).

    Co se týče rolování kolečkem, tak existují **obrovské rozdíly napříč prohlížeči**.

      - **Firefox** nezná událost `onmousewheel`. Dá se v něm ale využít událost `DOMMouseScroll` nebo nová událost [`onweel`](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel).

      - Směr rolování se získává z `wheelDelta` (**Webkit** umí rozlišit směr rolování (vodorovně/svisle) na základě hodnot `wheelDelta**X**` a `wheelDelta**Y**`).

      - Ve starších **IE** a ve **Firefoxu** při použití `DOMMouseScroll` je směr ve vlastnosti `detail`.

      - **Firefox** a **Webkit** při použití `onweel` zná dokonce `deltaX`, `deltaY`, `deltaZ` ([ukázka](http://kod.djpw.cz/rbv)).

Kód určující, **kterým směrem se roluje**, funkční ve všech prohlížečích, by mohl vypadat následovně — [živá ukázka](http://kod.djpw.cz/ubv).

## Drag and drop události

Další události, které je možné vyvolat myší, jsou ty pro přetahování elementů po stránce bez **většího množství JS kódu**.

Funkční s omezeními od **IE 8** (není možné přetahovat soubory z operačního systému do prohlížeče a podobně). Ve starších prohlížečích je posouvání elementů možné docílit přes `onmousedown` (zapne přesouvání), `onmousemove` (provede přesouvání) a `onmouseup` (ukončí přesouvání) ([ukázka](http://diskuse.jakpsatweb.cz/?action=vthread&forum=7&topic=153139#3)).

  `ondragstart`
  
    Vyvolá se při započatí tažení ([ukázka](http://kod.djpw.cz/xdv)).

    ```
&lt;div
  **draggable**="true"
  *ondragstart*="event.dataTransfer.setData('Text', 'Obsah, který se přesune')"
>
  Obsah je možné přesunovat.
&lt;/div>
```

    Atribut `draggable` umožňuje samotné přetahování elementu. Pomocí `event.dataTransfer.setData` se potom nastaví obsah, který se **má přesouvat**.

    Pro **přesun HTML obsahu** si lze s `Text` typem vystačit (jiné typy ostatně nefungují ve starších **IE**).

    Ovlivnit podobu kursoru, který signalisuje, zda se bude obsah přesouvat/kopírovat, je možné přes `event.dataTransfer.effectAllowed` ([možné hodnoty](https://developer.mozilla.org/en-US/docs/DragDrop/Drag_Operations#drageffects)).

    Pří řešení drag &amp; dropu způsobem pro **IE 7** a starší bez `drag`/`drop` událostí je vhodné `ondragstart` vystornovat:

    ```
&lt;element **ondragstart**="return false">
```

  `ondragenter`
  
    Vyvolá se v okamžiku, kdy nad elementem potáhneme přesouvatelný objekt. Hodí se tedy například k signalisaci, že **je možné tažený obsah upustit**.

  `ondragover`
  
    Něco jako `onmousemove` — vyvolává se, když se nad elementem hýbe s **přetahovaným obsahem**. Užitečné k **samotnému umožnění** `drop`u přes `event.preventDefault()`.

  `ondragleave`
  
    Aktivuje se, když se při tažení opustí element s touto událostí. Může například zrušit signalisaci, kterou vyvolá `ondragstart`.

    [Ukázka](http://kod.djpw.cz/fev) kombinace `ondragenter` a `ondragleave`.

  `ondrag`
  
    Událost se vyvolává neustále při pohybu přesouvaného elementu.

  `ondrop`
  
    Vyvolá se při *upuštění* obsahu nad elementem, který `drop` podporuje. Podpora `drop`nutí se umožní zabráněním výchozí akce — `preventDefault()`.

    ```
&lt;div ondragover="event.preventDefault()" ondrop="alert('Položeno')">
&lt;/div>
```

    V události `ondrop` je možné získat dříve nastavený obsah pomocí:

    ```
event.dataTransfer.**getData**("text/plain");
```

  `ondragend`
  
    Nastavuje se pro přesouvatelný (`draggable`) element a spustí se při ukončení **přesouvání elementu**. Je jedno, jakým způsobem přetahování skončilo (úspěšným/neúspěšným `drop`em, stornováním klávesy Esc apod.).

### Příklad drag and dropu

Ukázka přesouvání obsahu. V zásadě existují dva způsoby, jak přesouvat/kopírovat obsah.

  - Při započatí přesouvání (`ondragstart`) nastavit metodou `event.dataTransfer.setData` potřebný HTML obsah. A při dokončení (`ondrop`) ho vyvolat přes `event.dataTransfer.getData` a umístit do elementu.

  - Přesouvat v `event.dataTransfer` jen identifikátor přetahovatelného elementu. A po skončení `drag`ování si ho najít nějakou [metodou DOMu](/queryselector).

Samostatná [ukázka](http://kod.djpw.cz/qqv). Přesouvací **kursor** se zapíše přes `cursor: move`.

    function stav(text) {
      document.getElementById("stav").innerHTML = text;
    }
    function onDrop(e) {
      e = e || window.event;
      var data = e.dataTransfer.getData("Text");
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      (e.target || e.srcElement).appendChild(document.getElementById(data));
    }
    
    function prevent(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }

    .kontejner {background: #DA3F94; color: #fff; width: 200px; height: 100px; margin-right: 2px; float: left}
    .kontejner.najeto {opacity: .8}
    
    #presouvany {padding: .5em; background: #fff; color: #000; cursor: move}

    Obsah je možné přesunovat.

  Vyvolaná událost: ``

Hotové řešení [Sortable](http://rubaxa.github.io/Sortable/) usnadní vytváření drag and drop aplikací (nepoužívá jQuery).

## Dotykové události (ontouch*)

Pro dotyková zařízení existuje obdoba `onmouse*` událostí.

  `ontouchstart`
  
    Obdoba `onmousedown`. Spustí se, jak už název vypovídá, při dotyku.

    Dotyků **může být více**, proto se věci jako souřadnice nedolují z `event`u, ale z `event.touches` s indexem dle pořadí dotyku (první dotyk bude v `event.touches[0]`).

  `ontouchmove`
  
    Obdoba `on*mouse*move`.

  `ontouchend`
  
    Obdoba `onmouseup`. Souřadnice pro události `ontouchmove` i `ontouchend` jsou v `event.changedTouches[0]`.

Využitím **dotykových událostí** je možné vytvořit třeba tzv. swipování — [Add Finger-Swipe Support to Webpages](http://padilicious.com/code/touchevents/).