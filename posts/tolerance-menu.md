---
title: "Tolerance myši u vyskakovacího menu"
headline: "Tolerance myši u vysouvacího menu"
description: "Při vytváření menu reagujícího na najetí myši (hover) je dobré tolerovat nepřesnou cestu myší."
date: "2015-02-25"
last_modification: "2015-02-25"
status: 1
tags: ["Hotová řešení", "Rady a nápady", "Menu v CSS"]
---

Celou situaci ilustruje následující obrázek.

Při pohybu z položky první úrovně (A) na zanořenou položku (B) existují dva základní způsoby, kudy **přesunout kursor**.

  - Přímou zelenou trasou.

  - Oklikou po trase červené.

Cílem by mělo být zajistit, aby fungoval přesun přímou trasou – pro uživatele je přirozenější přesouvat kursor po **nejkratší možné trase**.

## Problém

Problém běžného hover menu v CSS, kde se podnabídka zobrazuje do strany, je, že při volbě přímé trasy se rozevře jiná položka.

    - [Vysouvací menu v CSS](/vyskakovaci-menu)

Kromě CSS navigací webových stránek a aplikací tímto nedostatkem trpí i uživatelská rozhraní některý desktopových aplikací.

    Nepohodlné hover menu v NetBeans IDE.

Většina aplikací se ale toto chování snaží řešit ke spokojenosti uživatele.

    Možnost přejet přímo v nabídce Windows

## Řešení

Nemožnost přejet na podnabídku přes jinou položku vyšší úrovně má několik způsobů řešení.

### Časová prodleva

Relativně spolehlivé a zároveň poměrně jednoduché řešení je použití **časové prodlevy**.

Podnabídka se **nezobrazí/nezmizí hned**, ale až po určité době (například 0,5 vteřin), což dá uživateli prostor si v úseku té půl vteřiny přejet myší na cíl libovolnou cestou, aniž by podnabídka zmizela.

**Nevýhoda** je právě ta časová prodleva v případě, že je cílem rozevřít jinou podnabídku.

[Živá ukázka](http://kod.djpw.cz/wwkb)

Také není dobré časovou prodlevou kombinovat s navigací, kde položky první úrovně po kliknutí způsobí přechod na jinou stránku. Mohlo by se stát, že by uživatel nevydržel čekat a kliknul, začala by se načítat nová stránka, během toho by se třeba už konečně zobrazilo podmenu, načež by se přešlo na novou stránku. Takové chování je hodně **otravné**.

### Zvětšení ploch

Další možnost je zvětšit/přidat plochy, které budou *držet* nabídku otevřenou.

V momentě najetí na položku první úrovně (A) se na základě posice kursoru spočítá trojúhelník, který po najetí udrží podnabídku otevřenou.

**Výhoda** je, že při pohybu mezi položkami první úrovně (přibližně svislý pohyb myší) není nutné čekat s otevřením podnabídky.

**Nevýhoda** tohoto postupu spočívá v nutnosti relativně **přesného pohybu myší**. Pokud uživatel kursorem trochu cukne, snadno se dostane z vymezeného trojúhelníku.

I tento postup je vhodné skloubit s časovačem, protože když návštěvník zůstane s kursorem umístěným v „trojúhelníku“ na jiné položce delší dobu, dá se očekávat, že by preferoval její **rozbalení**.

Vytvořit **potřebnou plochu** by šlo v nových prohlížečích celkem elegantně pomocí CSS vlastnosti `clip`. Na základě souřadnice kursoru a souřadnic podnabídky.

    - [Oříznutí CSS vlastností clip](/clip) – nepravidelné oříznutí funkční v prohlížečích **Chrome 24+**, **Opera 15+** a **Safari 8+**

    - [Zjištění souřadnic myši](/souradnice-mysi) – pomocí JS napříč prohlížeči

Ve starších prohlížečích nezbývá než počítat souřadnice kursoru při pohybu v rámci celého menu a na základě toho zjišťovat, jestli se kursor nachází na pomyslné rozšířené ploše.

### Sledování směru kursoru

Situaci s pomyslným trojúhelníkem jde zjednodušit na pouhé zkoumání směru, kterým se kursor pohybuje.

Dá se očekávat, že když při přejetí z jedné položky první úrovně na druhou bude **nízká vodorovná ↔ změna** souřadnic, uživatel chce změnit hlavní položku a ne najet na podnabídku.

Na základě toho se nabízí upravit řešení s časovou prodlevou a přidat pomyslné pásmo, které způsobí okamžitou (nebo rychlejší) změnu hlavní položky.

Za změnu položky jde považovat situace, kdy se kursor nepřibližuje podnabídce (s nějakou tolerancí). Zelené pole na obrázku znázorňuje plochu sousední nabídky, která by mohla rychlejší změnu vyvolat. Pokud by se podnabídka nezobrazovala až na úrovni aktivní položky (A), ale už odshora celé navigace, byla by podobná plocha i pro směr vzhůru.

### Přibližné plochy

Do jisté míry nedokonalé, ale poměrně snadné na realisaci je přidání přibližné plochy. Jde si vystačit pouze s CSS a pseudo-elementy [`:before`/`:after`](/css-selektory#before-after).

Přes tyto CSS elementy se tedy (značně nedokonale) zvětší aktivní plocha odkazu hlavní položky (A).

[Živá ukázka](http://kod.djpw.cz/ywkb)

## Odkazy jinam

  - CSS-Tricks: [Dropdown Menus with More Forgiving Mouse Movement Paths](http://css-tricks.com/dropdown-menus-with-more-forgiving-mouse-movement-paths/)