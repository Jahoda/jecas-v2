---
title: "JavaScriptové události myši"
headline: "JavaScriptové události myši"
description: "Popis všech možných událostí, které lze v JavaScriptu vyvolat myší. Návod, jak je odchytávat a blokovat."
date: "2013-12-05"
last_modification: "2013-12-08"
status: 1
tags: ["js", "js-udalosti"]
format: "html"
---

<p>Při vytváření JavaScriptové aplikace existuje spoustu <b>událostí</b> a postupů, jak zpracovávat akce vyvolané myší (kursorem/ukazatelem/prstem).</p>

<h2 id="kliknuti">Kliknutí myši</h2>

<dl>
  <dt id="onclick"><code>onclick</code></dt>
  <dd>
    <p>Základní kliknutí, rozumí se tím <b>stisknutí a uvolnění</b> levého tlačítka myši. To uvolnění je důležité. Když se po stisknutí myši s kursorem trochu pohne, událost <code>onclick</code> se nevyvolá. To může být výhoda i nevýhoda.
    </p>
  <ol>
    <li>Uživatel si může kliknutí <b>rozmyslet</b> a při stisknutém tlačítku pohnout kursorem a akci tak zrušit.</li>
    <li>Zároveň při <b>rychlém klikání</b> může první případ vyvolat omylem. Proto v situaci, kdy je očekáváno rychlejší klikání, může být výhodnější <code>onmousedown</code>. Rychlejšího vyvolání události <code>onmousedown</code> (oproti <code>onclick</code>u) je možné využít pro zrychlení <a href="/ajax">AJAXvé</a> aplikace, kde načítání proběhne už při <b>stisknutí</b> tlačítka. Nečeká se na <b>uvolnění</b>.</li>
  </ol>
    
    <div class="live">
      <span onclick='alert("Baf")'>Kliknout</span>
    </div>
    
    <p>Stejného efektu jako atributem <code>onclick</code> lze docílit pseudo-protokolem <code>javascript:</code> u odkazu <code>&lt;a></code>.</p>
    
    <div class="live">
      <a href='javascript:alert("Baf")'>Kliknout</a>
    </div>
    
    <p>Není to ovšem moc ideální řešení z pohledu zařízení, co <b>nepodporují JS</b>, vznikne v nich nesmyslný odkaz.</p>
    
    <p>Při vytváření klikacích prvků je dobré myslet na uživatele <b>ovládající web klávesnicí</b>. Nebude-li mít element s <code>onclick</code>em atribut <code>tabindex</code>, nepůjde na něj spolehlivě ve všech prohlížečích od<kbd>Tab</kbd>ovat. Více v <a href="/onclick-test">testu události <code>onclick</code></a>.</p>
  </dd>
  
  <dt id="onmousedown"><code>onmousedown</code></dt>
  <dd>
    <p>Vyvolá se <b>ihned po stisknutí libovolného tlačítka myši</b>. Je to tedy způsob, jak <b>odchytit pravé tlačítko nebo kolečko</b>.</p>
    
    <div class="live">
      <script>
        function kliknout(e) {
          e = e || window.event;
          alert("Kód tlačítka: " + e.which);
        }
      </script>
      <span onmousedown='kliknout(event)'>Kliknout</span>
    </div>
    <p>Většinou jsou čísla tlačítek následující:</p>
    
    <ul>
      <li>1 — <b>levé tlačítko</b>,</li>
      <li>2 — <b>prostřední tlačítko / kolečko</b>,</li>
      <li>3 — <b>pravé tlačítko</b>.</li>
    </ul>
    
    <p>Odchytnout <b>pravé tlačítko</b> je většinou možné i přes událost <a href="/kontextova-nabidka">kontextové nabídky</a> (<code>oncontextmenu</code>). Fungujete díky tomu, že pravé tlačítko zpravidla kontextovou nabídku vyvolává.</p>
  </dd>
  <dt id="onmouseup"><code>onmouseup</code></dt>
  <dd>
    <p>Vyvolá se po <b>uvolnění libovolného tlačítka</b> na elementem. Vyvolá se i v případě, že se tlačítko stiskne někde jinde, přejede se nad element a uvolní.</p>
    
    <div class="live">
      <script>
        function kliknout(e) {
          e = e || window.event;
          alert("Kód tlačítka: " + e.which);
        }
      </script>
      <span onmouseup='kliknout(event)'>Kliknout</span>
    </div>
    
    <p>Jinak, co se týče rozlišování, které tlačítko bylo uvolněno, funguje stejně jako <code>onmousedown</code>.</p>
  </dd>
  
  <dt id="ondblclick"><code>ondblclick</code></dt>
  <dd>
    <p>Aktivuje se <b>dvojklikem levého tlačítka</b> (dvojité rychlé kliknutí).</p>
    
    <div class="live">
      <script>
        function kliknout(e) {
          e = e || window.event;
          alert("Kód tlačítka: " + e.which);
        }
      </script>
      <span ondblclick='kliknout(event); return false'>Kliknout</span>
    </div>
    
    <p>Pravé tlačítko nebo kolečko myši dvojlik nevyvolá.</p>
  </dd>
</dl>

<h3 id="event">Objekt <code>event</code></h3>
<p>Pro zjištění <i>podrobností</i> o kliknutí nebo pro zablokování výchozích akcí slouží objekt <code>event</code>, jeho použití a <b>sjednocení napříč prohlížeči</b> vypadá následovně:</p>

<pre><code>&lt;span onmousedown='funkce(<b>event</b>)'>Kliknout&lt;/span></code></pre>

<pre><code>function funkce(e) {
  e = e || window.event;
}
</code></pre>

<ul>
  <li>Kód tlačítka je v <code>e.which</code>,</li>
  <li><a href="/souradnice-mysi">Souřadnice kursoru</a> v době kliknutí je nutné dále sjednocovat.</li>
</ul>


<h2 id="stornovani">Stornování výchozí akce</h2>
<p>Někde je vhodné stornovat výchozí akci prohlížeče, což je například <b>kontextová nabídka</b> nebo <b>ikona pro posouvání</b> po stránce vyvolaná stisknutím kolečka; případně <b>prokliknutí odkazu</b> nebo <b>odeslání formuláře</b>.</p>

<p>Klíčem je příkaz <code>return false</code>.</p>

<p>Před stornováním je třeba <b>důkladně rozmyslet</b>, zda narušení výchozí funkčnosti prohlížeče nebude <b>návštěvníka obtěžovat</b>.</p>

<p><small>(Mimochodem, CSS <a href="/pointer-events">vlastnost <code>pointer-events</code></a> umí stornovat jen vlastní CSS/JS události. Ty výchozí z prohlížeče nikoliv.)</small></p>

<h3 id="zablokvani-formulare">Zablokování odeslání formuláře</h3>
<p>Příkaz <code>return false</code> dokáže zrušit víceméně všechny události.</p>

<p>Zamezit poslání formuláře je možné buď v <code>onclick</code>u u jednotlivých odesílacích polí (<a href="/input#type-submit"><code>&lt;input type=submit></code></a>/<code>&lt;button type=submit></code>), nebo <b>spolehlivěji</b> v události <code>onsubmit</code> celého formuláře.</p>

<pre><code>&lt;form action="?akce" <b>onsubmit</b>="vlastniFunkce(); <i>return false</i>">
</code></pre>

<h3 id="zablokovani-odkazu">Zablokování odkazu</h3>
<p>Není problém <i>vystornovat</i> přechod na adresu <code>href</code>u z odkazů.</p>
<p>Hodnotu <code>false</code> může vracet i přímo <code>vlastniFunkce</code> (<a href="http://kod.djpw.cz/bav">ukázka</a>):</p>

<pre><code>function vlastniFunkce() {
  // nějaký kód
  return false;
}</code></pre>

<pre><code>&lt;a href='http://jecas.cz' onclick='return vlastniFunkce()'>Odkaz&lt;/a></code></pre>

<h3 id="prave-tlacitko">Zablokování a odchytnutí pravého tlačítka</h3>
<p><b>Kontextovou nabídku</b> po stitknutí pravého tlačítka můžeme zablokovat událostí <code>oncontextmenu</code>.</p>

<pre><code>&lt;span oncontextmenu="return false">Kliknout&lt;/span></code></pre>

<p>Že bylo pravé tlačítko stisknuto následně <b>odchytne</b> <a href="#onmousedown">událost <code>onmousedown</code></a> (<a href="http://kod.djpw.cz/lav">ukázka</a>).</p>

<h3 id="zablokovani-kolecka">Zablokování kolečka</h3>
<p>Chceme-li <b>tlačítko kolečka</b> zapojit do ovládání aplikace, je potřeba stornovat jeho běžnou funkci — zobrazení <b>čtyřsměrné šipky</b> pro posouvání po stránce pohybem kursoru.</p>

<p>Kolečko / prostřední tlačítko je trochu problematické, protože ne každý návštěvník dokáže <b>vyvolat jeho stisknutí</b>.</p>

<p>Blokaci vytvoří <code>return false</code> v události <code>onmousedown</code> (<a href="http://kod.djpw.cz/mav">ukázka</a>). Nefunguje v <b>Opeře 12</b>.</p>

<h2 id="pohyb">Pohyb myši</h2>
<p>Kromě mačkání tlačítek je možné reagovat i na <b>posouvání kursoru</b>.</p>

<dl>
  <dt id="onmouseover"><code>onmouseover</code></dt>
  <dd>
    <p>Vyvolá se v <b>momentě</b> najetí myší na element. V CSS je alternativa <a href="/css-selektory#uzivatelske-akce">pseudotřída <code>:hover</code></a>.</p>
    
    <div class="live">
      <span onmouseover="alert('Najet')">Najet.</span>
    </div>
    
    <p>Pomocí <code>onmouseover</code>/<code>onmouseout</code> lze i zjišťovat <a href="/smer-odjeti-mysi">směr odjetí/přijetí kursoru</a>.</p>
    
    <p>České vysvětlení atributu <code>onmouseover</code> sepsal <a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=1&topic=61146#6">před lety</a> <b>Miloš F. Pechar</b>.</p>
  </dd>
  
  <dt id="onmouseout"><code>onmouseout</code></dt>
  <dd>
    <p>Opak <code>onmouseover</code>u. Vyvolá se při <b>odjetí</b>.</p>
  </dd>
  
  <dt id="onmousemove"><code>onmousemove</code></dt>
  <dd>
    <p>Vyvolává se <b>neustále</b> při pohybování se myší nad elementem.</p>
  </dd>
</dl>

<h3 id="pohyb-event">Objekt <code>event</code></h3>
<p>I u <b>posouvání kursoru</b> je možné další užitečné věci jako třeba <a href="/souradnice-mysi">posici kursoru</a> zjistit z <code>event</code>u.</p>
<p>„Praktické“ použití zjišťování posice při posouvání myši je u <a href="/baterka">CSS baterky</a>.</p>

<h2 id="vyber-textu">Výběr textu</h2>
<p>Taktéž pro vybírání textu na stránce tažením myši se stisknutým tlačítkem existuje událost.</p>

<dl>
  <dt id="onselectstart"><code>onselectstart</code></dt>
  <dd>
    <p>Vyvolá se při označování textu.</p>
    
    <div class="live">
      <span onselectstart="alert('Vybíráte text')">Vybrat text</span>
    </div>
    
    <p>Chová se <b>dost rozdílně</b> napříč prohlížeči:</p>
    <ul>
      <li>V <b>Opeře 12</b> a <b>Firefoxu</b> nedělá nic.</li>
      <li>Ve <b>Webkitu</b> se spustí už při stisknutí levého i pravého tlačítka, nemusí se ani nic označit.</li>
      <li>V <b>IE</b> se spustí v okamžiku, kdy se alespoň něco vybere.</li>
    </ul>
    
    <p>V <b>IE</b> a <b>Chrome</b> tak lze pomocí <code>return false</code> <b>znemožnit výběr textu</b> (<a href="http://kod.djpw.cz/wav">ukázka</a>).</p>
  </dd>
</dl>

<h3 id="zablokovani-vyberu-textu">Zablokování výběru textu</h3>
<p>K tomu nakonec událost <code>onselectstart</code> není ani příliš potřeba. Stornováním <code>onmousedown</code>u dosáhneme v zásadě téhož ve všech prohlížečích:</p>

<div class="live">
  <span onmousedown="return false">Text, který nejde vybrat. Blokuje to <code>onmousedown="return false"</code>.</span>
</div>

<p>V <b>IE</b> a staré <b>Opeře 12</b> funguje atribut <code>unselectable</code> nastavený na <code>on</code>.</p>

<div class="live">
  <span unselectable="on">Text, který nejde vybrat. Blokuje to <code>unselectable="on"</code>.</span>
</div>

<h4 id="user-select">Zablokování v CSS</h4>
<p>V CSS k blokování výběru slouží vlastnost <code>user-select</code>. Funguje od <b>IE 10</b>, nefunguje v <b>Opeře 12</b>. V ostatních prohlížečích funguje jen s <a href="/css-prefixy">CSS prefixy</a> (<a href="http://kod.djpw.cz/bbv">ukázka</a>).</p>

<p>Kromě vlastnosti <code>user-select</code> by mohlo jít označování zakamuflovat pseudo-elementem <code>::selection</code> (<a href="http://kod.djpw.cz/wbv">ukázka</a>).</p>

<pre><code>elment::selection {background-color: transparent}</code></pre>

<p>Používat <code>::selection</code> je možné od <b>IE 9</b>, ve <b>Firefoxu</b> s <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::selection"><code>-moz-</code> prefixem</a>.</p>

<h2 id="kolecko">Rolování kolečkem</h2>
<dl>
  <dt id="onmousewheel"><code>onmousewheel</code></dt>
  <dd>
    <p>Provede se při roztočení kolečka nad daným elementem.</p>
    <div class="live">
      <span onmousewheel="alert('Točím si')">Roztočit kolečko</span>
    </div>
    
    <p>Z <code>event</code>u je možné zjistit směr, <b>jakým se roluje</b> (nahoru/dolů).</p>
    
    <p>Co se týče rolování kolečkem, tak existují <b>obrovské rozdíly napříč prohlížeči</b>.</p>
    
    <ul>
      <li><b>Firefox</b> nezná událost <code>onmousewheel</code>. Dá se v něm ale využít událost <code>DOMMouseScroll</code> nebo nová událost <a href="https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel"><code>onweel</code></a>.</li>
      <li>Směr rolování se získává z <code>wheelDelta</code> (<b>Webkit</b> umí rozlišit směr rolování (vodorovně/svisle) na základě hodnot <code>wheelDelta<b>X</b></code> a <code>wheelDelta<b>Y</b></code>).</li>
      <li>Ve starších <b>IE</b> a ve <b>Firefoxu</b> při použití <code>DOMMouseScroll</code> je směr ve vlastnosti <code>detail</code>.</li>
      <li><b>Firefox</b> a <b>Webkit</b> při použití <code>onweel</code> zná dokonce <code>deltaX</code>, <code>deltaY</code>, <code>deltaZ</code> (<a href="http://kod.djpw.cz/rbv">ukázka</a>).</li>
    </ul>
  </dd>
</dl>

<p>Kód určující, <b>kterým směrem se roluje</b>, funkční ve všech prohlížečích, by mohl vypadat následovně — <a href="http://kod.djpw.cz/ubv">živá ukázka</a>.</p>

<h2 id="drag-drop">Drag and drop události</h2>
<p>Další události, které je možné vyvolat myší, jsou ty pro přetahování elementů po stránce bez <b>většího množství JS kódu</b>.</p>

<p>Funkční s omezeními od <b>IE 8</b> (není možné přetahovat soubory z operačního systému do prohlížeče a podobně). Ve starších prohlížečích je posouvání elementů možné docílit přes <code>onmousedown</code> (zapne přesouvání), <code>onmousemove</code> (provede přesouvání) a <code>onmouseup</code> (ukončí přesouvání) (<a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=7&topic=153139#3">ukázka</a>).</p>

<dl>
  <dt id="ondragstart"><code>ondragstart</code></dt>
  <dd>
    <p>Vyvolá se při započatí tažení (<a href="http://kod.djpw.cz/xdv">ukázka</a>).</p>
    
    <pre><code>&lt;div
  <b>draggable</b>="true"
  <i>ondragstart</i>="event.dataTransfer.setData('Text', 'Obsah, který se přesune')"
>
  Obsah je možné přesunovat.
&lt;/div></code></pre>
    
    <p>Atribut <code>draggable</code> umožňuje samotné přetahování elementu. Pomocí <code>event.dataTransfer.setData</code> se potom nastaví obsah, který se <b>má přesouvat</b>.</p>
    
    <p>Pro <b>přesun HTML obsahu</b> si lze s <code>Text</code> typem vystačit (jiné typy ostatně nefungují ve starších <b>IE</b>).</p>
    
    <p>Ovlivnit podobu kursoru, který signalisuje, zda se bude obsah přesouvat/kopírovat, je možné přes <code>event.dataTransfer.effectAllowed</code> (<a href="https://developer.mozilla.org/en-US/docs/DragDrop/Drag_Operations#drageffects">možné hodnoty</a>).</p>
    
    <p>Pří řešení drag &amp; dropu způsobem pro <b>IE 7</b> a starší bez <code>drag</code>/<code>drop</code> událostí je vhodné <code>ondragstart</code> vystornovat:</p>
    
    <pre><code>&lt;element <b>ondragstart</b>="return false"></code></pre>
  </dd>
  
  <dt id="ondragenter"><code>ondragenter</code></dt>
  <dd>
    <p>Vyvolá se v okamžiku, kdy nad elementem potáhneme přesouvatelný objekt. Hodí se tedy například k signalisaci, že <b>je možné tažený obsah upustit</b>.</p>
  </dd>
  
  <dt id="ondragover"><code>ondragover</code></dt>
  <dd>
    <p>Něco jako <code>onmousemove</code> — vyvolává se, když se nad elementem hýbe s <b>přetahovaným obsahem</b>. Užitečné k <b>samotnému umožnění</b> <code>drop</code>u přes <code>event.preventDefault()</code>.</p>
  </dd>
  
  <dt id="ondragleave"><code>ondragleave</code></dt>
  <dd>
    <p>Aktivuje se, když se při tažení opustí element s touto událostí. Může například zrušit signalisaci, kterou vyvolá <code>ondragstart</code>.</p>
    <p><a href="http://kod.djpw.cz/fev">Ukázka</a> kombinace <code>ondragenter</code> a <code>ondragleave</code>.</p>
  </dd>
  
  <dt id="ondrag"><code>ondrag</code></dt>
  <dd>
    <p>Událost se vyvolává neustále při pohybu přesouvaného elementu.</p>
  </dd>
  
  <dt id="ondrop"><code>ondrop</code></dt>
  <dd>
    <p>Vyvolá se při <i>upuštění</i> obsahu nad elementem, který <code>drop</code> podporuje. Podpora <code>drop</code>nutí se umožní zabráněním výchozí akce — <code>preventDefault()</code>.</p>
    
    <pre><code>&lt;div ondragover="event.preventDefault()" ondrop="alert('Položeno')">
&lt;/div></code></pre>
    
    <p>V události <code>ondrop</code> je možné získat dříve nastavený obsah pomocí:</p>
    
    <pre><code>event.dataTransfer.<b>getData</b>("text/plain");</code></pre>
  </dd>
  
  <dt id="ondragend"><code>ondragend</code></dt>
  <dd>
    <p>Nastavuje se pro přesouvatelný (<code>draggable</code>) element a spustí se při ukončení <b>přesouvání elementu</b>. Je jedno, jakým způsobem přetahování skončilo (úspěšným/neúspěšným <code>drop</code>em, stornováním klávesy <kbd>Esc</kbd> apod.).</p>
  </dd>
</dl>

<h3 id="drag-drop-priklad">Příklad drag and dropu</h3>
<p>Ukázka přesouvání obsahu. V zásadě existují dva způsoby, jak přesouvat/kopírovat obsah.</p>

<ul>
  <li>Při započatí přesouvání (<code>ondragstart</code>) nastavit metodou <code>event.dataTransfer.setData</code> potřebný HTML obsah. A při dokončení (<code>ondrop</code>) ho vyvolat přes <code>event.dataTransfer.getData</code> a umístit do elementu.</li>
  
  <li>Přesouvat v <code>event.dataTransfer</code> jen identifikátor přetahovatelného elementu. A po skončení <code>drag</code>ování si ho najít nějakou <a href="/queryselector">metodou DOMu</a>.</li>
</ul>

<p>Samostatná <a href="http://kod.djpw.cz/qqv">ukázka</a>. Přesouvací <b>kursor</b> se zapíše přes <code>cursor: move</code>.</p>

<!-- http://kod.djpw.cz/qev, http://kod.djpw.cz/bfv -->
<div class="live">
  <script>
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
  </script>
  <style>
    .kontejner {background: #DA3F94; color: #fff; width: 200px; height: 100px; margin-right: 2px; float: left}
    .kontejner.najeto {opacity: .8}
    
    #presouvany {padding: .5em; background: #fff; color: #000; cursor: move}
  </style>
  <div id="presouvany" 
     draggable="true" 
     ondragstart="event.dataTransfer.setData('Text', (event.target || event.srcElement).id); stav('ondragstart')" 
     ondragend="stav('ondragend')">
    Obsah je možné přesunovat.
  </div>
  <div class="kontejner"
       ondrop="onDrop(event); this.className = 'kontejner'; stav('ondrop')" 
       ondragenter='this.className+= " najeto"; stav("ondragenter")' 
       ondragleave='this.className = "kontejner"; stav("ondragleave")' 
       ondragover="stav('ondragover'); prevent(event)"></div>
  <div class="kontejner"
       ondrop="onDrop(event); this.className = 'kontejner'; stav('ondrop')" 
       ondragenter='this.className+= " najeto"; stav("ondragenter")' 
       ondragleave='this.className = "kontejner"; stav("ondragleave")' 
       ondragover="stav('ondragover'); prevent(event)"></div>
  <p style='clear: both'>Vyvolaná událost: <code id="stav"></code></p>
</div>

<p>Hotové řešení <a href="http://rubaxa.github.io/Sortable/">Sortable</a> usnadní vytváření drag and drop aplikací (nepoužívá jQuery).</p>

<h2 id="dotykove">Dotykové události (ontouch*)</h2>
<p>Pro dotyková zařízení existuje obdoba <code>onmouse*</code> událostí.</p>

<dl>
  <dt id="ontouchstart"><code>ontouchstart</code></dt>
  <dd>
    <p>Obdoba <code>onmousedown</code>. Spustí se, jak už název vypovídá, při dotyku.</p>
    <p>Dotyků <b>může být více</b>, proto se věci jako souřadnice nedolují z <code>event</code>u, ale z <code>event.touches</code> s indexem dle pořadí dotyku (první dotyk bude v <code>event.touches[0]</code>).</p>
  </dd>
  
  <dt id="ontouchmove"><code>ontouchmove</code></dt>
  <dd>
    <p>Obdoba <code>on<i>mouse</i>move</code>.</p>
  </dd>
  
  <dt id="ontouchend"><code>ontouchend</code></dt>
  <dd>
    <p>Obdoba <code>onmouseup</code>. Souřadnice pro události <code>ontouchmove</code> i <code>ontouchend</code> jsou v <code>event.changedTouches[0]</code>.</p>
  </dd>
</dl>

<p>Využitím <b>dotykových událostí</b> je možné vytvořit třeba tzv. swipování — <a href="http://padilicious.com/code/touchevents/">Add Finger-Swipe Support to Webpages</a>.</p>