---
title: "Obecné HTML atributy"
headline: "Globální HTML atributy"
description: "Obecné atributy jdou používat u všech HTML značek. Zde je jejich kompletní seznam."
date: "2015-07-08"
last_modification: "2015-07-14"
status: 1
tags: ["html", "html-atributy"]
format: "html"
---

<p>Různé značky (<a href="/vsechny-html-znacky">seznam všech HTML značek</a>) mají své specifické atributy. Kromě toho existuje řada atributů, které jde použít u úplně všech značek – nazývají se jako <b>globální</b> nebo <b>obecné atributy</b>.</p>

<p>Dle specifikace tyto obecné atributy mají fungovat i u elementů, které prohlížeč nezná.</p>



<h2 id="title">Popisek <code>title</code></h2>

<p>Atribut <code>title</code> byl dlouhá léta populární způsob, jak přidat k nějakému prvku stránky <b>doplňující vysvětlení</b>, které se objevilo <b>až po najetí myší</b>.</p>

<div class="live">
  <button title="Po kliknutí se nestane nic">Tlačítko</button>
</div>


<p>V podstatě k zániku tento atribut nejspíš odsoudila <b>dotyková zařízení</b>, kde obsah popisku zpravidla nejde zobrazit.</p>

<p>Teoreticky může na dotykových zařízeních fungovat <b>vlastní titulek</b> zobrazovaný při <code>:hover</code>u – ten jde vyvolat delším podržením prstu. Ale nejspíš to <b>moc lidí nezná</b>.</p>

<p>Různými způsoby stylování <code>title</code> se zabývají následující články:</p>

<div class="internal-content">
  <ul>
    <li><a href="/atribut-title">Vlastní styl bubliny <code>title</code></a> – řešení v CSS</li>
    
    <li><a href="/tooltip">Popisek obrázku po najetí myší</a></li>
    
    <li><a href="/js-tooltip">JS tooltip</a> – umístění popisku JavaScriptem</li>
  </ul>
</div>





<h2 id="class">Třída <code>class</code></h2>

<p>Třídy se hodí pro <b>aplikování CSS</b> předpisů na HTML kód. Do jednoho atributu <code>class</code> jde uvést případně více tříd oddělených mezerou.</p>

<pre><code>&lt;div <b>class</b>="prvni druha treti">
  Obsah
&lt;/div></code></pre>





<p>Přiřazení CSS k takovému kódu vypadá třeba takto:</p>

<pre><code>.prvni {
  color: red;
}</code></pre>






<h2 id="id">Identifikátor <code>id</code></h2>

<p>Atribut <code>id</code> slouží pro vytvoření <b>jedinečného identifikátoru elementu</b>. Na stránce by měla být každá hodnota atributu <code>id</code> <b>pouze jednou</b>.</p>

<pre><code>&lt;div id="nazev">
  Obsah
&lt;/div></code></pre>



<p>Nastavovat <code>id</code> se hodí v následujících případech:</p>

<ol>
  <li>
    <p><b>Odkaz na kotvu</b> – na <code>id</code> je možné přímo odkázat uvedením jeho názvu za mřížku do adresy.</p>
    
    <pre><code>&lt;a href="<b>#nazev</b>">Odkaz na kotvu&lt;/a></code></pre>
  </li>
  
  <li>
    <p><b>Propojení elementů</b> – například popisku <a href="/label-for"><code>&lt;label></code></a> s příslušným políčkem díky atributu <code>for</code>.</p>
    
    <pre><code>&lt;label for="<b>policko</b>">Popis&lt;/label>
&lt;input id="<b>policko</b>"></code></pre>
    
    <p>Podobně se propojují <a href="/aria"><code>aria-*</code> atributy</a>, připojuje <a href="/datalist"><code>&lt;datalist></code></a>, kontextové menu sestavené z položek <a href="/menuitem"><code>&lt;menuitem></code></a> a podobně.</p>
  </li>
  
  <li>
    <p><b>Zaměření pomocí JS</b> – dlouhou dobu neexistovala možnost, jak získat element v JavaScriptu pomocí <a href="/css-selektory">CSS selektorů</a>.</p>
    
    <p>ID se tak hodilo kvůli metodě <a href="/getelement#id"><code>getElementById</code></a>. Od <b>IE 8</b> jde využívat <a href="/queryselector"><code>querySelector</code></a>, takže toto využití se už trochu ztrácí.</p>
    
    <p>Kromě toho každé použití <code>id</code> vytváří v JavaScriptu <b>globální proměnnou stejného názvu</b>. Dostat se k HTML kódu výše uvedeného <code>&lt;div></code>u s <code>id="nazev"</code> tak jde následovně:</p>
    
    <pre><code>nazev.innerHTML</code></pre>
    
    
    
    <p>Používat globální proměnné ale nebývá dobrý nápad.</p>
  </li>
  
  
  <li>
    <p><b>Zaměření prvku v CSS</b> – podle <code>id</code> jde připojit k elementu styl:</p>
    
    <pre><code>#nazev {
  color: red
}</code></pre>
    
    <p>Používání identifikátorů v CSS není moc šikovné, protože zbytečně <b>zvyšují sílu selektorů</b>. Tu je dobré udržovat co nejnižší. Osobně používám pouze třídy.</p>
    
    <div class="internal-content">
      <ul>
        <li><p><a href="/id-class">ID, nebo CLASS?</a> – úvaha o používání tříd míst identifikátorů v CSS</p></li>
      </ul>
    </div>
  </li>
</ol>





<h2 id="style">Atribut <code>style</code></h2>

<p>Jeden ze způsobů, jak aplikovat na HTML <b>kaskádové styly</b>, je zápis přímo do atributu <code>style</code>.</p>

<pre><code>&lt;p <b>style</b>="color: red">
  Odstavec bude červený
&lt;/p>
</code></pre>

<p>Nazývá se to spojením <i>inline styl</i> a jedná se spíš o <b>nouzový způsob, který není moc dobré používat</b>.</p>

<p>Proč?</p>

<ol>
  <li>
    <p>Pokud se styly do atributu <code>style</code> zapisují opakovaně, je zpravidla složitější <b>hromadně provádět změny</b>.</p>
    
    <p>Elegantnější bývá daný styl <b>pojmenovat třídou</b> a umístit do CSS deklarací (ať už do externího souboru nebo do značky <code>&lt;style></code> v hlavičce).</p>
  </li>
  
  
  <li>
    <p>Vyčlenění stylů z atributu style <b>zpřehlední HTML kód</b> a při opakovaném používání třídy místo opakovaných deklarací <b>sníží datovou velikost</b>. V případě použití externího souboru se mohou CSS pravidla cacheovat.</p>
  </li>
  
  <li>
    <p>Řádkový styl má téměř nejvyšší prioritu/sílu. Má-li se přepsat z externího CSS / obsahu značky <code>&lt;style></code>, je potřeba uvést <code>!important</code> za každou deklarací.</p>
  </li>
  
  <li>
    <p>CSS v atributu <code>style</code> je problematické s ohledem na <b>rychlost vykreslování stránky</b>, protože se styly mění během stahování HTML kódu, což vynucuje překreslování.</p>
    <div class="internal-content">
      <ul>
        <li><p><a href="/vykreslovani#prubeh">Jak funguje vykreslování stránky</a></p></li>
      </ul>
    </div>
  </li>
</ol>

<h2 id="lang">Jazyk <code>lang</code></h2>

<p>Atribut <code>lang</code> určuje, jakým jazykem je obsah daného elementu. Nejčastěji se asi používá u elementu <code>&lt;html></code> pro určení jazyku celé stránky. Je ale možné i následně vnořený element přepnout do jiného jazyka.</p>

<pre><code>&lt;html <b>lang</b>="cs">
  &lt;p>
    Celý obsah stránky je česky,
    až na slovo &lt;span <i>lang="en"</i>>page&lt;/span>
  &lt;/p></code></pre>






<p>Použití <code>lang</code>u se může hodit:</p>

<ul>
  <li>pro výběr slovníku kontroly pravopisu,</li>
  
  <li>robotům pro detekci jazyka (i když stejně spíš detekují jazyk podle obsahu),</li>
  
  <li>pro hlasové čtečky</li>
</ul>

<p>Podrobněji se atributu <code>lang</code> věnuje samostatná stránka:</p>

<div class="internal-content">
  <ul>
    <li><a href="/lang">HTML atribut <code>lang</code></a></li>
  </ul>
</div>




<h2 id="spellcheck">Kontrola pravopisu <code>spellcheck</code></h2>

<p>Dnešní prohlížeče obsahují <b>kontrolu pravopisu</b>; ta standardně podtrhává neznámá slova ve formulářových polích a elementech s <code>contenteditable</code>.</p>

<p></p>

<p><img src="/files/obecne-atributy/spellcheck.png" alt="Podtrhávání neznámých slov" class="border"></p>








<p>Mohou nastat případy, kdy je kontrola nežádoucí a má smysl kontrolu vypnout pomocí <code>spellcheck="false"</code>?</p>

<div class="live">
  <textarea spellcheck="false" rows="3">Kontrola parvopisu je vypnutá</textarea>
  <textarea spellcheck="true" rows="3">Kontrola parvopisu je zapnutá</textarea>
  <br>
  <textarea spellcheck="true" readonly rows="3">Pole je pouze ke čtneí</textarea>
</div>




<p>Možná v případě, že je pole určené pouze ke čtení, ale nemá nastaveno atribut <a href="/input#readonly"><code>readonly</code></a>, které kontrolu rovněž potlačí. Třeba při <a href="/oznaceni-textu">označování kódu ke zkopírování</a>.</p>

<p>Nebo v případě, že by se kontrola nějak zajišťovala vlastním způsobem.</p>

<p>Rozhodně je dobré kontrolu vypínat jen v <b>odůvodněných případech</b>. Návštěvník si ji může vypnout sám, ale v případě, že je zablokována atributem <code>spellcheck</code>, už nemusí jít zapnout.</p>





<h2 id="translate">Překlad <code>translate</code></h2>

<p>Zřídka využitelný atribut. Slouží jako pomůcka pro <b>automatické překladače webových stránek</b> (například <a href="http://translate.google.com">translate.google.com</a>), aby obsah elementu s <code>translate="no"</code> nepřekládaly.</p>

<p>Hodí se tedy pro zakázání překladu <b>regionálních pojmů</b>.</p>

<p>Výchozí chování je překládat všechno. Skutečně to funguje, při použití <code>translate="no"</code> bude <i>prase</i> nepřeložené:</p>

<p><img src="/files/obecne-atributy/translate.png" alt="Vynechání slova z překladu" class="border"></p>




















<p><a href="https://kod.djpw.cz/scob">Kód ukázky</a></p>





<h2 id="tabindex"><code>tabindex</code> – ovládání klávesou <kbd>Tab</kbd></h2>

<p>Standardně klávesa <kbd>Tab</kbd> dokáže na stránce zaměřovat odkazy a políčka <a href="/formulare">formulářů</a>.</p>

<p>Atributem <code>tabindex</code> jde:</p>

<ol>
  <li><b>Měnit pořadí</b> procházení. Výchozí chování je dle pořadí položek v HTML kódu.</li>
  
  <li>Umožnit <b>zaměřit další elementy</b> – třeba neutrální <code>&lt;span></code>.</li>
</ol>

<p>Podrobněji se <code>tabindex</code>u věnuje samostatný článek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/tabindex">Tabindex</a> – uspořádání položek pro procházení klávesnicí</li>
  </ul>
</div>


<h2 id="item">Mikrodata <code>item*</code></h2>

<p>Pro lepší strojové zpracovávání kódu existují tzv. <b>mikrodata</b>, speciální atributy začínající na <code>item</code>, jedná se o:</p>

<p><code>itemid</code>, <code>itemprop</code>, <code>itemref</code>, <code>itemscope</code> a <code>itemtype</code></p>

<div class="external-content">
  <ul>
    <li>HTML specifikace: <a href="https://html.spec.whatwg.org/multipage/microdata.html#microdata">Microdata</a></li>
  </ul>
</div>

<h2 id="accesskey">Klávesová zkratka <code>accesskey</code></h2>

<p>Atribut <code>accesskey</code> (dvě <kbd>c</kbd> a dvě <kbd>s</kbd>) je jednoduchý způsob, jak zprovoznit na stránce <b>klávesové zkratky</b>.</p>

<p>Když se <code>accesskey</code> přidá odkazu nebo tlačítku, jeho akce se po klávesové zkratce vykoná. Kromě toho jde atributem <code>accesskey</code> také aktivovat textové pole <a href="/input"><code>&lt;input></code></a>.</p>

<p>Ve Windows se akce vyvolá klávesou levý <kbd>Alt</kbd> + znak nastavená do atributu.</p>

<pre><code>&lt;a href="http://jecas.cz" <b>accesskey</b>="j">
  Je čas
&lt;/a></code></pre>





<p>Pro přechod na odkaz výše by mohlo fungovat <kbd>Levý Alt</kbd> + <kbd>J</kbd>.</p>

<div class="live">
<a href="http://jecas.cz" accesskey="j">
  Je čas
  </a>
</div>

<p>Používání klávesových zkratek s atributem <code>accesskey</code> <b>není moc spolehlivé</b>, může být totiž snadno přebito <b>výchozí akcí prohlížeče</b>.</p>

<p>Spolehlivé ovládání klávesnicí je třeba udělat JavaScriptem:</p>

<div class="internal-content">
  <ul>
    <li><a href="/klavesy">Ovládání webu klávesami v JavaScriptu</a> – postup, jak odchytávat stisknuté klávesy a vázat na ně akce</li>
  </ul>
</div>




<h2 id="contenteditable">Upravitelný obsah <code>contenteditable</code></h2>

<p>Pro možnost vytvořit pomocí HTML + JavaScriptu pokročilejší editor pro psaní a úpravy obsahu, než je <a href="/textarea"><code>&lt;textarea></code></a>, existuje atribut <code>contenteditable</code>.</p>

<p>V editovacím režimu i prohlížeče většinou podporují základní klávesové zkratky – třeba <kbd>Ctrl</kbd> + <kbd>B</kbd> by mělo označený text učinit <b>tučným</b>.</p>

<div class="live">
  <p contenteditable>Obsah tohoto odstavce jde přepisovat</p>
</div>






<p>Pomocí <code>contenteditable</code> se vytváří primitivnější <a href="/wysiwyg">WYSIWYG editory</a>. Pokročilé editory potom fungují tak, že přímo odchytávají stisknuté klávesy a podle toho <i>kreslí</i> výsledek.</p>

<p>Pro <b>uložení úprav</b> z <code>contenteditable</code> elementu je nutné jeho obsah (JS vlastnost <code>innerHTML</code>) odeslat ke zpracování na server.</p>




<h2 id="dir">Směr textu <code>dir</code></h2>

<p>Atribut <code>dir</code> slouží k určení, jestli se obsah webu <b>píše zprava doleva</b> (<code>rtl</code>) nebo <b>zleva doprava</b> (<code>ltr</code>).</p>

<p>Jde nahradit CSS vlastností <code>direction</code>.</p>

<div class="live">
  <p dir="rtl">النص من اليمين إلى اليسار.</p>
</div>


<p>Změna směru textu se hodí i v jiných případech, než když je obsah stránky arabsky.</p>

<p>Jde tak například prohodit pořadí sloupců v tabulce:</p>

<div class="live">
  <table dir="rtl">
    <tr dir="ltr">
      <th>První</th>
      <th>Druhý</th>
    </tr>
    <tr dir="ltr">
      <td>1</td>
      <td>2</td>
    </tr>
  </table>
</div>

<p>Celkem elegantně to řeší například <a href="/sachovnicovy-vypis">šachovnicový výpis položek</a>.</p>


<h2 id="hidden">Atribut <code>hidden</code></h2>

<p>HTML atribut <code>hidden</code> začal fungovat až v <a href="/ie11"><b>IE 11</b></a>. Obsah označený atributem <code>hidden</code>, jak název napovídá, není viditelný.</p>

<pre><code>&lt;div <b>hidden</b>>
  Skrytý obsah
&lt;/div></code></pre>





<p>Patří do něj obsah, který momentálně <b>není relevantní</b>. Použití se tedy nabízí hlavně u <b>JS aplikací</b>, protože jinak by takový obsah na stránce nemusel být vůbec.</p>


<p><b>Důležitá věc</b>: Atribut <code>hidden</code> <b>neslouží k vytvoření rozklikávání obsahu nebo přepínání záložek</b>. V takovém případě je skrytí pouze visuální a pro hlasové čtečky nebo roboty vyhledávačů je skrytý obsah relevantní.</p>

<p>Obsah elementu s <code>hidden</code> by měl být kompletně ignorován.</p>

<div class="internal-content">
  <ul>
    <li><a href="/hidden">HTML atribut <code>hidden</code></a> – informace a příklady</li>
  </ul>
</div>




<h2 id="contextmenu">Kontextová nabídka <code>contextmenu</code></h2>

<p>Pomocí značek <code>&lt;menu></code> a <code>&lt;menuitem></code> jde vytvořit vlastní kontextovou nabídku, která se typicky zobrazuje po <b>kliknutí pravým tlačítkem</b>.</p>

<p>Tato vytvořená nabídka se následně připojuje k elementu právě atributem <code>contextmenu</code>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/menuitem">Kontextová nabídka <code>&lt;menuitem></code></a> – samostatný článek o kontextovém menu</li>
  </ul>
</div>



<h2 id="data">Data atributy</h2>

<p>Atributy <code>data-*</code> slouží k ukládání informací do HTML kódu / <a href="/dom">DOMu</a>. To se zpravidla hodí pro různé manipulace JavaScriptem, kdy jde do těchto atributů <b>nastavit počáteční hodnoty</b> nebo <b>ukládat stav</b>.</p>

<p>Často se <code>data-*</code> atributy používají pro konfiguraci HTML elementu, se kterým potom JS pracuje.</p>

<p>Bude-li existovat kód:</p>

<pre><code>&lt;div class="zpravy" <b>data-pocet</b>="5">
&lt;/div></code></pre>





<p>Stačí aby si následně:</p>

<ol>
  <li>JavaScript našel element s třídou <code>zpravy</code>, </li>
  
  <li>přečetl hodnotu <code>data-pocet</code> – pomocí <code>getAttribute("data-pocet")</code>,</li>
  
  <li>vložil 5 zpráv.</li>
</ol>

<p>Podobným způsobem používají <code>data-*</code> atribut například sociální sítě pro vkládání svých <a href="/sdileci-tlacitka">tlačítek pro sdílení</a>.</p>


<h2 id="aria">ARIA atributy</h2>

<p>Slouží pro zlepšení přístupnosti webových stránek. Zápis je <code>aria-*</code>. Těcho atributů existuje celkem 35. Více v článku:</p>

<div class="internal-content">
  <ul>
    <li><a href="/aria">ARIA atributy</a> – sémantické vyznačení informací pro postižené uživatele</li>
  </ul>
</div>


<h2 id="drag-drop">Drag &amp; drop</h2>

<p>Pro přesouvání elementu různě po stránce existují dva pomocné atributy:</p>



<h3 id="draggable"><code>draggable</code></h3>

<p>Přidání <code>draggable="true"</code> znamená, že je element <b>přesouvatelný</b>.</p>

<div class="live">
  <p draggable="true">Přesouvatelný odstavec</p>
  
  <p draggable="false">Nepřesouvatelný</p>
</div>




<p>Po <b>chycení myší</b> a tažení se průhledná kopie elementu pohybuje kolem kursoru.</p>



<h3 id="dropzone"><code>dropzone</code></h3>

<p>Atribut <code>dropzone</code> se přidává elementu, kam je možné <code>draggable</code> elementy přesouvat.</p>

<p>Na základě nastavení <code>dropzone</code> může prohlížeč například <b>změnou kursoru</b> signalisovat, že se bude přesouvaný obsah kopírovat (<code>dropzone="copy"</code>), přesouvat (<code>dropzone="move"</code>) nebo se vytvoří odkaz (<code>dropzone="link"</code>).</p>

<div class="live">
  <p dropzone="copy">Kopírovat</p>
  
  <p dropzone="move">Přesunout</p>
  
  <p dropzone="link">Odkaz</p>
</div>






<p>Tyto atributy <b>samy o sobě nezajišťují</b> funkční drag&amp;drop. Pouze mohou jeho tvorbu lehce zjednodušit. Samotný přesun elementů se musí doskriptovat.</p>

<div class="internal-content">
  <ul>
    <li><a href="/udalosti-mysi#drag-drop">Drag and drop události</a> – hotové řešení přesouvání elementů</li>
  </ul>
</div>


<h2 id="on">JavaScriptové události</h2>

<p>Ke každému elementu jde přidat libovolný atribut sloužící pro obsluhu události JavaScriptem.</p>

<pre><code>&lt;span <b>onclick</b>="// JS akce">
  Kliknout
&lt;/span></code></pre>





<p>Řada událostí se <b>projeví pouze u určitých elementů</b>, to ale na teoretické možnosti nic nemění.</p>

<p><b>Seznam všech 63 JS atributů</b> je následující: <code>onabort</code>, <code>onautocomplete</code>, <code>onautocompleteerror</code>, <code>onblur</code>, <code>oncancel</code>, <code>oncanplay</code>, <code>oncanplaythrough</code>, <code>onchange</code>, <code>onclick</code>, <code>onclose</code>, <code>oncontextmenu</code>, <code>oncuechange</code>, <code>ondblclick</code>, <code>ondrag</code>, <code>ondragend</code>, <code>ondragenter</code>, <code>ondragexit</code>, <code>ondragleave</code>, <code>ondragover</code>, <code>ondragstart</code>, <code>ondrop</code>, <code>ondurationchange</code>, <code>onemptied</code>, <code>onended</code>, <code>onerror</code>, <code>onfocus</code>, <code>oninput</code>, <code>oninvalid</code>, <code>onkeydown</code>, <code>onkeypress</code>, <code>onkeyup</code>, <code>onload</code>, <code>onloadeddata</code>, <code>onloadedmetadata</code>, <code>onloadstart</code>, <code>onmousedown</code>, <code>onmouseenter</code>, <code>onmouseleave</code>, <code>onmousemove</code>, <code>onmouseout</code>, <code>onmouseover</code>, <code>onmouseup</code>, <code>onmousewheel</code>, <code>onpause</code>, <code>onplay</code>, <code>onplaying</code>, <code>onprogress</code>, <code>onratechange</code>, <code>onreset</code>, <code>onresize</code>, <code>onscroll</code>, <code>onseeked</code>, <code>onseeking</code>, <code>onselect</code>, <code>onshow</code>, <code>onsort</code>, <code>onstalled</code>, <code>onsubmit</code>, <code>onsuspend</code>, <code>ontimeupdate</code>, <code>ontoggle</code>, <code>onvolumechange</code>, <code>onwaiting</code></p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes">Global attributes</a></li>
  
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/html/obecne-atributy.html">Obecné atributy</a> (lehce zastaralé)</li>
</ul>