---
title: "HTML nadpisy H1, H2, …"
headline: "Nadpisy na webu"
description: "Pro značení nadpisů stránek existují značky <code>&lt;h1></code>, <code>&lt;h2></code>, <code>&lt;h3></code>, <code>&lt;h4></code>, <code>&lt;h5></code> a <code>&lt;h6></code>."
date: "2015-02-22"
last_modification: "2015-03-02"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Jako jedna z forem pro označení důležitějšího textu existují v HTML nadpisy. Pomáhají vytvářet celou strukturu dokumentu a usnadňují návštěvníkům webu získat <b>rychlý přehled o obsahu</b> stránky. Ne každý čte stránku písmeno po písmenu shora dolů. Netrpělivý návštěvník napřed <b>výrazné prvky</b> stránky (což nadpisy jsou) prolétne očima, aby zjistil, jestli stojí za to obsah vůbec číst.</p>

<p>Z pohledu HTML jsou nadpisy <a href="/html-znacky#povinne">párové elementy</a> s povinnou počáteční i koncovou značkou. Písmeno <code>H</code> v názvu značky pochází z anglického slova <i>heading</i> – nadpis.</p>




<h2 id="zapis">Zápis</h2>

<p>Jednotlivé úrovně nadpisů se v zápisu liší jen číslem.</p>

<pre><code>&lt;h1>
  Nadpis nejvyšší úrovně
&lt;/h1>
&lt;h2>Druhá úroveň&lt;/h2>
&lt;h3>Třetí úroveň&lt;/h3>
&lt;h4>Nadpis úrovně 4&lt;/h4>
&lt;h5>Nadpis úrovně 5&lt;/h5>
&lt;h6>Nadpis úrovně 6&lt;/h6></code></pre>












<h2 id="urovne">Úrovně nadpisů</h2>

<p>Úrovní je sice hned 6, v praxi se ale většinou <b>používají první 3 až 4</b>. Ve výchozím stylu prohlížečů jsou nadpisy <a href="/display#block">blokové</a> (<code>display: block</code>) a <b>zobrazují se tučné</b> (<code>font-weight: bold</code>). První tři úrovně (<code>&lt;h1></code> až <code>&lt;h3></code>) jsou navíc větším písmem než prostý text.</p>

<p><img src="/files/nadpisy/velikost.png" alt="Velikost nadpisů" class="border"></p>












<p>Nadpis <code>&lt;h4></code> se potom zobrazuje zpravidla stejně jako běžný tučný text.</p>

<p><img src="/files/nadpisy/h4.png" alt="Srovnání nadpisu H4 a tučného textu" class="border"></p>





<p>Nadpis <code>&lt;h5></code> je už menší než prostý text. Dle výchozích stylů velikostně odpovídá obsahu značky <code>&lt;small></code>.</p>

<p><img src="/files/nadpisy/h5-h6.png" alt="Srovnání nadpisů H5, H6 a tučného textu" class="border"></p>










<p>Nakonec <code>&lt;h6></code> je úplně nejnižší úroveň nadpisu. Je ještě menší než obyčejný text ve značce <code>&lt;small></code>. Bez změny výchozího stylu už je skoro nečitelný.</p>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/halb">Ukázková stránka se všemi nadpisy</a></li>
  </ul>
</div>



<h2 id="styly">Výchozí styl</h2>

<p>Následující tabulka přibližně zachycuje výchozí velikost písma (<a href="/font#size"><code>font-size</code></a>) a odsazení (<a href="/margin"><code>margin</code></a>) shora i zdola – odsazení z obou stran bývá shodné.</p>

<table>
  <tr>
    <th>Značka</th>
    <th>Velikost</th>
    <th>Odsazení</th>
  </tr>
  <tr><td>H1</td><td>32 px</td><td>21 px</td></tr>
  <tr><td>H2</td><td>24 px</td><td>20 px</td></tr>
  <tr><td>H3</td><td>19 px</td><td>19 px</td></tr>
  <tr><td>H4</td><td>16 px</td><td>21 px</td></tr>
  <tr><td>H5</td><td>13 px</td><td>22 px</td></tr>
  <tr><td>H6</td><td>11 px</td><td>25 px</td></tr>  
</table>





<p>Místo stejného odsazení zdola i shora někdy působí lépe vyšší odsazení horní než spodní (<code>margin-top</code> větší než <code>margin-bottom</code>).</p>

<p>Velikost písma nadpisů jednotlivých úrovní odpovídá zastaralému atributu <code>size</code> používaného pro element <code>&lt;font></code> – <code>&lt;font size="6"></code> je tak stejně velký jako <code>&lt;h1></code> atd.</p>





<h2 id="struktura">Struktura dokumentu</h2>

<p>Pomocí nadpisů se utváří <b>struktura dokumentu</b>. Z toho vyplývá, že:</p>

<ol>
  <li>
    <p>Úroveň nadpisů by měla začínat od nejvyšší úrovně (<code>&lt;h1></code>).</p>
  </li>
  
  <li>
    <p>Jednotlivé úrovně by měly jít <b>postupně</b> za sebou. Tedy <b>ne</b> nějak takto.</p>
    
    <pre><code>&lt;h1>
  Nadpis nejvyšší úrovně
&lt;/h1>
&lt;h3>Třetí úroveň&lt;/h3></code></pre>
  </li>
  
  
  <li>
    <p>Nadpisy by <b>neměly</b> být používány k <b>zvětšování písma</b>. Pokud na dané místo ze struktury vychází nadpis H2, ale jeho písmo je visuálně moc velké, řešení je změnit pro <code>&lt;h2></code> velikost pomocí CSS vlastnosti <code>font-size</code>.</p>
    
    <p>O úrovni použitého nadpisu by se <b>nemělo rozhodovat na základě vzhledu</b>.</p>
  </li>
</ol>

<p>V případě správného strukturování nadpisů půjde dobře automaticky sestavit ze stránky její obsah, jaký mají třeba stránky na Wikipedii.</p>

<div class="internal-content">
  <ul>
    <li><a href="/toc">Automatické generování obsahu stránky</a> – JS a PHP skripty pro vygenerování TOC (<i>Table of contents</i>) na základě nadpisů.</li>
  </ul>
</div>




<h3 id="id">Atribut <code>id</code></h3>

<p>Pokud je stránka delší a obsahuje hodně podnadpisů, je užitečné pro ně <b>přidávat identifikátory</b>. Dělá se to globálním atributem <code>id</code>. Na takový nadpis potom jde přímo odkázat přidáním <code>#id</code> do adresy.</p>

<pre><code>&lt;h2 <b>id="id-nadpisu"</b>>
  Nadpis
&lt;/h2></code></pre>






<h3 id="musi">Musí se používat nadpisy?</h3>

<p>Volnost HTML nijak nenutí tvůrce webu nadpisy používat, stránka místo elementů <code>&lt;h1></code>–<code>&lt;h6></code> tak může obsahovat samé <code>&lt;div></code>y:</p>

<pre><code>&lt;div class="nadpis">Nadpis&lt;/div>
&lt;div class="podnadpis">Podnadpis&lt;/div></code></pre>

<p>S ohledem na strukturu obsahu stránky, kterou nadpisy tvoří, to ale <b>není dobrý nápad</b>.</p>






<h2 id="line-height">Výška řádku</h2>

<p>Při globální změně výšky řádku (<a href="/font#line-height"><code>line-height</code></a>) se snadno stane, že zadaný rozměr nebude vhodný pro velké písmo v případě nadpisů.</p>

<p>Jelikož nadpisy většinou bývají krátké, špatná <b>výška řádku nadpisů</b> snadno unikne oku při testování. A potom se v ostrém provozu při mimořádně dlouhém nadpisu stane něco takového:</p>

<p><img src="/files/nadpisy/vyska-radku.png" alt="Nedostatečná výška řádku u velkých písmen" class="border"></p>










<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/kalb">Živá ukázka nedostatečné výšky řádku</a></li>
  </ul>
</div>





<h2 id="jeden-h1">Pouze jeden <code>&lt;h1></code></h2>

<p>Některé poučky praví, že na stránce by měl být <b>pouze jeden nadpis</b> nejvyšší úrovně a obsahovat podobný obsah jako titulek (značka <code>&lt;title></code>).</p>

<pre><code>&lt;title>Název stránky&lt;/title>
…
&lt;h1>
  Název stránky
&lt;/h1></code></pre>








<p>U většiny stránek je to skutečně vhodný postup. Nikde ale používání více <code>&lt;h1></code> nadpisů zakázané není.</p>

<p>Mohou nastat případy, kdy dává více H1 nadpisů smysl.</p>

<p>Někdo má ve zvyku do <code>&lt;h1></code> dávat <b>název celého webu / logo</b> – záleží na úhlu pohledu, jestli se jedná o název stránky nebo spíš součást navigace – potom zpravidla i nadpis samotné stránky bývá v <code>&lt;h1></code>. Často <b>více nadpisů</b> nejvyšší úrovně vzniká jako z nouze ctnost kvůli komplikovanému technickému řešení.</p>

<ul>
  <li>
    <p>U stránek, jako je například výpis článků z blogu podle určité kategorie, by se musely nadpisy článků celkově „ponížit“, aby neobsahovaly H1.</p>
  </li>
  
  <li>
    <p>Často by se na hlavní stránce hodil jako nejvyšší nadpis název webu a na podstránkách potom mít v H1 <b>název té podstránky</b>, což opět znamená dynamicky určovat, jestli název webu má nebo nemá být v <code>&lt;h1></code>.</p>
  </li>
</ul>



<h2 id="seo">Vliv nadpisů na SEO</h2>

<p>Jelikož text v nadpisech mívá <b>větší význam</b> a v případě <code>&lt;h1></code>, <code>&lt;h2></code> a <code>&lt;h3></code> je i ve výchozím stylu větší než běžný text v odstavcích nebo seznamech, dává smysl, aby mu větší důraz přisuzovaly i <b>vyhledávače</b>.</p>

<p>Nabízí se proto do nadpisů vkládat důležitá klíčová slova. Pokud je ale cílem, aby obsah webu také <b>četl návštěvník</b>, měly by nadpisy stále dávat smysl. Začínat kvůli SEO každý odstavec nadpisem na základě šablony „super seo klíčová fráze &lt;slovo>“ tak není úplně to pravé.</p>

<div class="external-content">
  <ul>
    <li>Plaváček: <a href="http://www.zdrojak.cz/clanky/budiz-nadpis-reklo-seo/">Budiž nadpis. Řeklo SEO.</a></li>
  </ul>
</div>


<p>Na některých webech jsou k vidění nadpisy obsahující klíčová slova <b>maskované pomocí CSS</b> jako běžný text. Jde to jednoduše:</p>

<pre><code>h1 {
  font-weight: normal;
  font-size: 100%;
}</code></pre>


<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/malb">Ukázka maskování H1 pomocí CSS</a></li>
  </ul>
</div>

<p>Nejedná se ale o moc čistou praktiku, kterou by bylo dobré následovat.</p>





<h2 id="podnadpisy">Podnadpisy</h2>

<p>V případě, že by se hodilo ihned pod hlavní nadpis umístit podnadpis, existuje několik možností:</p>

<ol>
  <li>
    <p>Podnadpis vložit přímo do <code>&lt;h1></code>, třeba do značky <code>&lt;small></code> nebo <code>&lt;span></code>:</p>
    
    <pre><code>&lt;h1>
  Nadpis stránky&lt;br>
  &lt;small>Podnadpis&lt;/small>
&lt;/h1></code></pre>
  </li>
  
  
  
 
  
  <li>
    <p>Podnadpis umístit do <b>odstavce</b> a vhodně ho nastylovat:</p>
    <pre><code>&lt;h1>Nadpis stránky&lt;/h1>
&lt;p class="podnadpis">Podnadpis&lt;/p></code></pre>    
  </li>  
  
  
  
  <li>
    <p>Podnadpis vložit jako <code>&lt;h2></code>:</p>
    <pre><code>&lt;h1>Nadpis stránky&lt;/h1>
&lt;h2>Podnadpis&lt;/h2></code></pre>    
    
    <p>Nevýhoda je, že se tím hned <i>vyplácá</i> jedna úroveň nadpisů, protože nejvyšší podnadpisy stránky by potom měli začínat nejspíš úrovní <code>&lt;h3></code>.</p>
  </li>  
</ol>

<h3 id="hgroup">Značka <code>&lt;hgroup></code></h3>

<p>V návrzích HTML existovala značka <code>&lt;hgroup></code>, která měla sloužit právě k obalení hlavního nadpisu a jeho podnadpisů.</p>

    <pre><code>&lt;hgroup>
  &lt;h1>Nadpis stránky&lt;/h1>
  &lt;h2>Podnadpis&lt;/h2>
&lt;/hgroup></code></pre> 



<p>Řada prohlížečů ji podporuje, ale z W3C specifikace HTML 5 byla vyřazena.</p>


<h2 id="odkaz">Odkaz v nadpisu, nadpis v odkazu</h2>

<p>Není problém odkaz a nadpis zanořovat oběma způsoby.</p>


<h3 id="nadpis-odkaz"><code>&lt;a></code> v <code>&lt;h1></code></h3>

<pre><code>&lt;h1>
    &lt;a href=#">
        Odkaz v nadpisu
    &lt;/a>
&lt;/h1></code></pre>









<h3 id="odkaz-nadpis"><code>&lt;h1></code> v <code>&lt;a></code></h3>

<p>Tato možnost je od <b>HTML 5 validní</b>, dříve <a href="/validita">validní</a> nebyla, ale <b>spolehlivě fungovala</b>.</p>

<pre><code>&lt;a href="#">
    &lt;h1>
        Nadpisu v odkazu
    &lt;/h1>
&lt;/a></code></pre>





<p>V případě, že je žádoucí, aby byl součástí odkazu kromě nadpisu ještě další element, je nejjednodušší použít jen jeden <code>&lt;a></code>, který vše obalí.</p>



<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/dblb">Příklad nadpisu v odkazu a odkazu v nadpisu</a></li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Jak psát web: Bloky > <a href="http://www.jakpsatweb.cz/html/bloky.html#hn">h1 až h6</a></li>
  
  <li>DevDocs: <a href="http://devdocs.io/html/element/heading_elements">Heading Elements</a></li>
  
  <li>(Video) Google Webmasters: <a href="https://www.youtube.com/watch?v=GIn5qJKU8VM">More than one H1 on a page: good or bad?</a></li>
</ul>

<p><button class="no-js" id="presun-nahoru" onclick="window.scrollTo(0, 0); schovat()" style="font-size: 200%; margin: 1em 0; padding: 1em">Zaujala vás při rychlém prolétnutí stránka? <br> Klikněte pro návrat nahoru.</button></p>

<script>
  var el = document.getElementById("presun-nahoru");
  function zaznamenat() {
    ga('send', 'event', 'click', 'Nadpisy nahoru'); 
  }
  function schovat() {
    el.style.display = "none";
  }
  var casovac;
  window.onscroll = function() {
    casovac = setTimeout(function() {
      if (!inViewPort(el)) {
        schovat();
      }
    }, 10 * 1000)
    this.onscroll = null;
  }
  
  function inViewPort(el) {
    var coords = el.getBoundingClientRect();
    return (coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight);
  }  
</script>

<!-- o-b-r: http://kod.djpw.cz/lalb -->