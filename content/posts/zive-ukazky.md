---
title: "Živé ukázky"
headline: "Živé ukázky"
description: "Proč používám vlastní nástroj na ukázky zdrojových kódů."
date: "2014-08-01"
last_modification: "2014-08-15"
status: 1
tags: ["napady", "produktivita"]
format: "html"
---

<p>Pro rychlé testování kousků HTML/CSS/JS existuje řada populárních on-line nástrojů. Nejznámější jsou asi:</p>

<ul>
  <li><a href="http://jsfiddle.net/">JSFiddle</a></li>
  <li><a href="http://codepen.io/pen">Codepen.io</a></li>
</ul>

<p>Přesto jsem v červenci 2013 spustil svůj vlastní nástroj.</p>

<p>Momentálně běží na adrese <a href="https://kod.djpw.cz">kod.djpw.cz</a></p>

<p>Proč? Protože ostatní řešení trpěla a stále trpí věcmi značně komplikujícími používání.</p>



<h2 id="stare-prohlizece">Funkčnost ve starých prohlížečích</h2>

<p>Testovat kusy kódu potřebuji v různých zařízeních a i dost starých.</p>

<ul>
  <li><b>Codepen</b> funguje od <b>IE 10</b></li>
  <li><b>JSFiddle</b> funguje od <b>IE 9</b></li>
</ul>

<p>Pro starší prohlížeče je potřeba připravit ukázku v <b>novějším prohlížeči</b>, vypreparovat surový výsledek a ten zkopírovat do staršího.</p>

<p>A totéž pro každou změnu. Můj nástroj funguje (omezeně) od <b>IE 7</b>, včetně okamžitého zobrazování výsledku.</p>

<p>Kromě toho v mé <a href="/opera">oblíbené</a> <b>Opeře 12</b> v JSFiddle není možné <b>kopírovat text</b>. A v Codepenu nefunguje <b>průběžné automatické ukládání obsahu</b> do <a href="/zalohovani-formularu"><code>localStorage</code></a>.</p>



<h2 id="prubezne-ukladani">Průběžné automatické ukládání</h2>

<p>Kromě problémů v <b>Opeře 12</b> v Codepenu, neumí JSFiddle průběžné ukládání vůbec.</p>



<h2 id="prubezne-spousteni">Průběžné spouštění kódu</h2>

<p>Příjmená věc je <b>rovnou vidět výsledek</b> zadaného HTML/CSS/JS kódu.</p>

<p>V JSFiddle taková věc není, byť jde kód spouštět klávesovou zkratkou <kbd>Ctrl</kbd> + <kbd>Enter</kbd>.</p>

<p>S tím souvisí i drobná vychytávka na <b>kod.djpw.cz</b>, kdy je <code>alert</code> překryt <a href="/vlastni-alert">vlastní funkcí</a>, která neblokuje prohlížeč, takže je možné pohodlně provádět testovací výpisy z JavaScriptu.</p>

<p><img src="/files/zive-ukazky/vlastni-alert.png" alt="Zobrazení alertu" class="border"></p>



<h2 id="prepinani">Přepínání editace a výsledku</h2>

<p>Na JSFiddle ani Codepenu nejde pohodlně změnit URL, aby se místo <b>čistého výsledku</b> zobrazil <b>editační režim</b> a obráceně. Vzhledem k <b>nefunkčnosti rozhraní</b> ve starších prohlížečích je zvlášť mrzuté, že není ani možné někde zkopírovat odkaz na čistý výsledek.</p>

<p>Jediná možnost je funkce <i>Zobrazit pouze obsah rámu</i>, kterou ale nedisponují všechny prohlížeče.</p>

<p>Mému řešení stačí na konci URL přidat/odebrat spojovník.</p>

<p><img src="/files/zive-ukazky/url-spojovnik.gif" alt="Přepínání mezi ukázkou a úpravaou" class="border"></p>



<h2 id="psani-kodu">Psaní kódu</h2>

<p>V tom jsou všechny 3 nástroje dost podobné. Všude je možné používat <a href="/emmet">Emmet</a>. Jinak kod.djpw.cz nabízí nejvíc.</p>

<ul>
  <li>
    <p><b>Snippety</b> podobně funkční jako v <a href="/sublime-text">Sublime Text</a> (nemají obě známé služby).</p></li>
  
  <li><p><b>Vícenásobný kursor</b> (má jenom Codepen).</p></li>
  
  <li><p><b>Napovídání</b> po stisku <kbd>Ctrl</kbd> + <kbd>Mezerník</kbd> (nemají oba).<img src="/files/zive-ukazky/napovidani.png" alt="Zobrazení alertu" class="border"></p></li>
  
  <li><p><b>Okamžité upozorňování na chyby/nedostatky</b> v JS/CSS (oba mají až na vyžádání).<img src="/files/zive-ukazky/css-upozorneni.png" alt="Upozornění na CSS nedostatek" class="border"></p></li>
</ul>







<h2 id="rychlost">Rychlost</h2>

<p>Načítání kod.djpw.cz je oproti ostatním službám bleskurychlé.</p>

<p>Pro srovnání <b>rychlosti načtení</b> a možnosti s ukázkou něco dělat je zde ukázka téhož <b>jednoduchého kódu</b> ve všech nástrojích.</p>

<ul>
  <li><a href="http://codepen.io/anon/pen/KsfEH">Codepen</a></li>
  <li><a href="http://jsfiddle.net/7cSkp/">JSFiddle</a></li>
  <li><a href="https://kod.djpw.cz/eueb">kod.djpw.cz</a></li>
</ul>


<h2 id="obrazky">Obrázky</h2>

<p>Ve svém nástroji vložím obrázek 200 × 200 px zadáním url „<code>/i/200</code>“. <a href="https://kod.djpw.cz/cueb">Ukázka</a></p>



<h2 id="kontrola-nad-obsahem">Kontrola nad obsahem</h2>

<p>Pokud jsou živé ukázky <b>významnou součástí webu</b>, což třeba v případě tohoto webu jsou – bez jejich funkčnosti je plno článků skoro bezcenných – je značné risiko nemít takto strategický obsah pod <b>vlastní kontrolou</b>.</p>


<h2 id="nejlepší">Je kod.djpw.cz nejlepší?</h2>

<p>Je tedy <b>kod.djpw.cz</b> lepší než Codepen nebo JSFiddle? Jak v čem. Codepen i JSFiddle například nabízí možnost <b>spolupracovat</b> na jedné <i>ukázce</i> ve více lidech. Taktéž existence <b>uživatelského profilu</b>, pohodlná možnost přehledu nad svými ukázkami nebo možnost editace v mém řešení zcela chybí.</p>

<h3>Codepen</h3>
<p>Codepen potom nabízí různé <b>sociální prvky</b> – komentáře ukázek nebo <b>žebříčky</b> zajímavých a populárních ukázek a podobně. Kód navíc umožňuje kromě HTML, CSS a JS zapisovat i alternativně. HTML třeba v <a href="/markdown">Markdownu</a>, pro CSS používat <i>preprocesory</i> a v JS využít CoffeScript/LiveScript.</p>

<p>Nakonec výhoda z <i>kontroly nad obsahem</i> platí pochopitelně pouze pro provozovatele dané služby.</p>