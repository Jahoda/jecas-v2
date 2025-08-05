---
title: "Tolerance myši u vyskakovacího menu"
headline: "Tolerance myši u vysouvacího menu"
description: "Při vytváření menu reagujícího na najetí myši (hover) je dobré tolerovat nepřesnou cestu myší."
date: "2015-02-25"
last_modification: "2015-02-25"
status: 1
tags: ["hotova-reseni", "menu", "napady"]
format: "html"
---

<p>Celou situaci ilustruje následující obrázek.</p>

<p><img src="/files/tolerance-menu/pohyb-mysi.png" alt="Přesun kursoru myši" class="border"></p>

























<p>Při pohybu z položky první úrovně (A) na zanořenou položku (B) existují dva základní způsoby, kudy <b>přesunout kursor</b>.</p>

<ol>
  <li>Přímou <font color="green">zelenou</font> trasou.</li>
  
  <li>Oklikou po trase <font color="red">červené</font>.</li>
</ol>

<p>Cílem by mělo být zajistit, aby fungoval přesun <font color="green">přímou trasou</font> – pro uživatele je přirozenější přesouvat kursor po <b>nejkratší možné trase</b>.</p>


<h2 id="problem">Problém</h2>

<p>Problém běžného hover menu v CSS, kde se podnabídka zobrazuje do strany, je, že při volbě <font color="green">přímé trasy</font> se rozevře jiná položka.</p>

<div class="internal-content">
  <ul>
    <li><a href="/vyskakovaci-menu">Vysouvací menu v CSS</a></li>
  </ul>
</div>

<p>Kromě CSS navigací webových stránek a aplikací tímto nedostatkem trpí i uživatelská rozhraní některý desktopových aplikací.</p>


<figure>
  <img src="/files/tolerance-menu/netbeans.gif" alt="Přesun kursoru myši" class="border">
  <figcaption>
    Nepohodlné hover menu v NetBeans IDE.
  </figcaption>
</figure>






<p>Většina aplikací se ale toto chování snaží řešit ke spokojenosti uživatele.</p>


<figure>
  <img src="/files/tolerance-menu/windows.gif" alt="Přesun kursoru myši" class="border">
  <figcaption>
    Možnost přejet přímo v nabídce Windows
  </figcaption>
</figure>










<h2 id="reseni">Řešení</h2>

<p>Nemožnost přejet na podnabídku přes jinou položku vyšší úrovně má několik způsobů řešení.</p>


<h3 id="prodleva">Časová prodleva</h3>

<p>Relativně spolehlivé a zároveň poměrně jednoduché řešení je použití <b>časové prodlevy</b>.</p>

<p>Podnabídka se <b>nezobrazí/nezmizí hned</b>, ale až po určité době (například 0,5 vteřin), což dá uživateli prostor si v úseku té půl vteřiny přejet myší na cíl libovolnou cestou, aniž by podnabídka zmizela.</p>

<p><b>Nevýhoda</b> je právě ta časová prodleva v případě, že je cílem rozevřít jinou podnabídku.</p>

<p><a href="http://kod.djpw.cz/wwkb">Živá ukázka</a></p>

<p>Také není dobré časovou prodlevou kombinovat s navigací, kde položky první úrovně po kliknutí způsobí přechod na jinou stránku. Mohlo by se stát, že by uživatel nevydržel čekat a kliknul, začala by se načítat nová stránka, během toho by se třeba už konečně zobrazilo podmenu, načež by se přešlo na novou stránku. Takové chování je hodně <b>otravné</b>.</p>






<h3 id="zvetseni">Zvětšení ploch</h3>

<p>Další možnost je zvětšit/přidat plochy, které budou <i>držet</i> nabídku otevřenou.</p>

<p><img src="/files/tolerance-menu/dopocitani.png" alt="Přesun kursoru myši" class="border"></p>


























<p>V momentě najetí na položku první úrovně (A) se na základě posice kursoru spočítá trojúhelník, který po najetí udrží podnabídku otevřenou.</p>

<p><b>Výhoda</b> je, že při pohybu mezi položkami první úrovně (přibližně svislý pohyb myší) není nutné čekat s otevřením podnabídky.</p>

<p><b>Nevýhoda</b> tohoto postupu spočívá v nutnosti relativně <b>přesného pohybu myší</b>. Pokud uživatel kursorem trochu cukne, snadno se dostane z vymezeného trojúhelníku.</p>

<p>I tento postup je vhodné skloubit s časovačem, protože když návštěvník zůstane s kursorem umístěným v „trojúhelníku“ na jiné položce delší dobu, dá se očekávat, že by preferoval její <b>rozbalení</b>.</p>

<p>Vytvořit <b>potřebnou plochu</b> by šlo v nových prohlížečích celkem elegantně pomocí CSS vlastnosti <code>clip</code>. Na základě souřadnice kursoru a souřadnic podnabídky.</p>



<div class="internal-content">
  <ul>
    <li><a href="/clip">Oříznutí CSS vlastností clip</a> – nepravidelné oříznutí funkční v prohlížečích <b>Chrome 24+</b>, <b>Opera 15+</b> a <b>Safari 8+</b></li>
    
    <li><a href="/souradnice-mysi">Zjištění souřadnic myši</a> – pomocí JS napříč prohlížeči</li>
  </ul>
</div>

<p>Ve starších prohlížečích nezbývá než počítat souřadnice kursoru při pohybu v rámci celého menu a na základě toho zjišťovat, jestli se kursor nachází na pomyslné rozšířené ploše.</p>





<h3 id="smer">Sledování směru kursoru</h3>

<p>Situaci s pomyslným trojúhelníkem jde zjednodušit na pouhé zkoumání směru, kterým se kursor pohybuje.</p>

<p>Dá se očekávat, že když při přejetí z jedné položky první úrovně na druhou bude <b>nízká vodorovná ↔ změna</b> souřadnic, uživatel chce změnit hlavní položku a ne najet na podnabídku.</p>

<p>Na základě toho se nabízí upravit řešení s časovou prodlevou a přidat pomyslné pásmo, které způsobí okamžitou (nebo rychlejší) změnu hlavní položky.</p>

<p>Za změnu položky jde považovat situace, kdy se kursor nepřibližuje podnabídce (s nějakou tolerancí). Zelené pole na obrázku znázorňuje plochu sousední nabídky, která by mohla rychlejší změnu vyvolat. Pokud by se podnabídka nezobrazovala až na úrovni aktivní položky (A), ale už odshora celé navigace, byla by podobná plocha i pro směr vzhůru.</p>

<p><img src="/files/tolerance-menu/okamzita-zmena.png" alt="Pásmo okamžité změny položky" class="border"></p>






















<h3 id="priblizne">Přibližné plochy</h3>

<p>Do jisté míry nedokonalé, ale poměrně snadné na realisaci je přidání přibližné plochy. Jde si vystačit pouze s CSS a pseudo-elementy <a href="/css-selektory#before-after"><code>:before</code>/<code>:after</code></a>.</p>

<p>Přes tyto CSS elementy se tedy (značně nedokonale) zvětší aktivní plocha odkazu hlavní položky (A).</p>

<p><img src="/files/tolerance-menu/css-tolerance.png" alt="Rozšíření plochy odkazu" class="border"></p>
















<p><a href="http://kod.djpw.cz/ywkb">Živá ukázka</a></p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS-Tricks: <a href="http://css-tricks.com/dropdown-menus-with-more-forgiving-mouse-movement-paths/">Dropdown Menus with More Forgiving Mouse Movement Paths</a></li>
</ul>