---
title: "Zvětšení obrázku"
headline: "Zvětšení obrázku"
description: "Jakými způsoby řešit zvětšení malého obrázku."
date: "2015-07-01"
last_modification: "2015-07-01"
status: 1
tags: ["Responsivní design", "Obrázky"]
---

V době [responsivních webů](/responsive) je nejistá velikost prostoru, kde se může běžný obrázek vložený značkou `&lt;img>` zobrazovat.

Zpravidla se obrázkům nastavuje maximální šířka na 100 % a *automatická* výška, aby se prostoru přizpůsobily a byl zachován poměr stran.

```
img {
  max-width: 100%;
  height: auto;
}
```

    - [Responsivní obrázky](/responsivni-obrazky) – různé způsoby přizpůsobení obrázků velikosti okna

## Čitelnost obrázků

Problém nastane, když obrázek **obsahuje nějaký text**, který by si chtěl návštěvník přečíst. Bude-li obrázek výrazně širší než dostupný prostor (což u mobilu s malým displejem může být třeba 320 pixelů), bude nutné, aby si ho návštěvník **zvětšil**.

To znamená, že nesmí být [`&lt;meta>` značkou `viewport`](/meta-viewport) zakázané zoomování stránky.

Bohužel některé prohlížeče (například mobilní **IE**) mohou kvůli úsporám prostředků zmenšit obrázek takovým způsobem, že kvůli snížení kvality nebude čitelný ani po následném ručním zvětšení.

Na desktopu potom někteří uživatelé **nemusí vědět, jak obrázek zvětšit**. Případně bude nepohodlné, že se při použití zoomu bude zvětšovat úplně celá stránka.

Celou situaci jde řešit různými způsoby:

    Mít **různé obrázky pro různé velikosti** obrazovky. V závislosti na rozměru dostupné plochy se zobrazují různé obrázky, které jsou vytvořené tak, aby na nich pořád bylo to podstatné dobře viditelné.

    Tento způsob je **velmi pracný**, protože vyžaduje ruční vybírání požadovaného výřezu nejpodstatnější části.

    Použít [lightbox](/lightbox) skript. To je dobře funkční na desktopu. Na mobilech je u responsivních webů problém, že obrázek typicky už **není kam zvětšit**, protože rovnou zabírá celou šířku.

    Někdy tak otevření obrázku do lightboxu na mobilu paradoxně obrázek zmenší o okraje a ovládací prvky lightbox skriptu.

    Řešením je **zvětšování obrázku pomocí gest**, které zajišťuje přímo skript lightboxu – dobře funkční je **PhotoSwipe**.

          [PhotoSwipe](http://photoswipe.com/) – responsivní skript pro fotogalerii s podporou dotykových gest

    **Prostý odkaz** na stejnou URL, jako je `src` obrázku, nabízí poměrně jednoduché řešení, jak obrázek otevřít přes celou stránku.

    ```
&lt;a href="obrazek.jpg">
  &lt;img src="obrazek.jpg" alt="Popis obrázku">
&lt;/a>
```

    Podle [**Dušana Janovského**](http://www.jakpsatweb.cz/) je ale takový postup pro řadu návštěvníků z mobilů a tabletů nešťastný tím, že **nemají zažitý způsob**, jak se z otevřeného obrázku dostat zpátky na předchozí stránku.

## Automatické vytvoření odkazu

Pořád je ale možnost otevřít URL obrázku po kliknutí asi lepším řešením než nic.

Pomocí pár řádků JavaScriptu jde zjistit, zda byl obrázek zmenšen – pomocí porovnání skutečné šířky ([`naturalWidth`](/skutecne-rozmery-obrazku)) s tou aktuální. A v takovém případě obrázek **obalit odkazem**.

```
(function(images){
    var solveSize = function(el) {
        if (el.naturalWidth > el.width) {
            var link = document.createElement("a");
            link.href = el.src;
            link.target = "_blank";
            el.parentNode.insertBefore(link, el);
            link.appendChild(el);
        }
    };
    
    for (var i = images.length; i--; ) {
        solveSize(images[i]);
    }
})(document.querySelectorAll("img"));
```

    - [Živá ukázka](http://kod.djpw.cz/jznb)