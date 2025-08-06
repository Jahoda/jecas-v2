---
title: "Odkaz v HTML"
headline: "HTML odkazy"
description: "Všechny informace a detaily o HTML odkazech, jejich atributech a stylování pomocí CSS."
date: "2015-07-02"
last_modification: "2015-08-27"
status: 1
tags: ["html", "html-tagy", "odkazy"]
format: "html"
---

<p>Odkaz je na webových stránkách klíčovým prvkem – slouží k <b>propojení dokumentů mezi sebou</b>. Návštěvník tak může v ideálním případě přecházet mezi všemi stránkami daného webu.</p>


<h2 id="zapis">Zápis odkazu</h2>

<p>Pro vytvoření odkazu slouží značka <code>&lt;a></code> (anglicky <i lang="en">anchor</i> = česky <i>kotva</i>, někdy se odkazu říká <i>link</i>), má povinnou počáteční i koncovou značku.</p>

<p>Cíl odkazu, kam se návštěvník dostane po kliknutí, se uvádí do atributu <code>href</code>:</p>

<pre><code>&lt;a <b>href</b>="cilova-stranka.html">
  Text odkazu
&lt;/a></code></pre>




<p>Text uvnitř odkazu má ve výchozích stylech zpravidla modrou barvu a je podtržen (v CSS <code><a href="/text-decoration#underline">text-decoration: underline</a></code>).</p>

<p>Podtržení je u odkazů dost <b>zažité</b>, proto je dobré:</p>

<ol>
  <li>Odkazy podtrhávat.</li>
  
  <li>Nepodtrhávat text, který odkazem není.</li>
</ol>

<div class="live">
  <p>
    <a href="http://jecas.cz">
      Odkaz na hlavní stranu
    </a>    
  </p>
</div>

<p>Mezi počáteční a koncovou značkou odkazu může být cokoliv.</p>

<ul>
  <li>
    <p>Text</p>
  </li>
  
  <li>
    <p>Obrázek</p>
    

<pre><code>&lt;a href="cilova-stranka.html">
  &lt;img src="obrazek.png">
&lt;/a></code></pre>    
  </li>
  
  <li>
    <p>Spousta další HTML značek. Do odkazu jdou obalit <a href="/nadpisy">nadpisy</a>, odstavce, seznamy nebo elementy <code>&lt;div></code>. Teoreticky může být odkazem i celá stránka (obsah HTML značky <code>&lt;body></code>) – existují ale výjimky, které v odkazu být nemohou, například stránka vložená do rámu <code>&lt;iframe></code>.</p>
    
    
  <pre><code>&lt;a href="cilova-stranka.html">
  &lt;div class="v-odkaze">
    &lt;h1>Nadpis&lt;/h1>
    &lt;p>Text v odstavci&lt;/p>
  &lt;/div>
&lt;/a></code></pre>        
       
 
    <p>Dříve tento způsob byl sice funkční, ale nebyl podle HTML specifikace <b>validní</b>. V <b>HTML 5</b> už <a href="/validita">validní</a> je.</p>
  </li>
</ul>


<h2 id="href">Cíl odkazu <code>href</code></h2>

<p>Nemá-li značka <code>&lt;a></code> atribut <code>href</code> pro určení cíle odkazu, chová se <code>&lt;a></code> dost podobně jako neutrální značka <code>&lt;span></code>.</p>

<p>Odlišný styl prohlížeče ve výchozím stavu aplikují jen na odkazy s <code>href</code>em.</p>

<p>Do obsahu atributu <code>href</code> jde potom zadávat různé věci:</p>

<ul>
  <li>
    <p>Relativní odkaz na stránku:</p>
    
    <pre><code>&lt;a href="stranka.html">Text odkazu&lt;/a></code></pre>
  </li>
  
  <li>
    <p>Absolutní odkaz na stránku (začíná protokolem – nejčastěji <code>http://</code> nebo <a href="/https"><code>https://</code></a>, ale odkazovat jde i třeba na <code>ftp://</code>):</p>
    
    <pre><code>&lt;a href="<b>http://</b>example.com">Text odkazu&lt;/a></code></pre>
  </li>  
  
  <li>
    <p>Odkaz na určité místo na stránce, tzv. kotvu:</p>
    
    <pre><code>&lt;a href="<b>#</b>kotva">Odkaz na kotvu&lt;/a></code></pre>
  </li>   
  
  <li>
    <p>Skript v jazyce JavaScript:</p>
    
    <pre><code>&lt;a href="<b>javascript:</b>alert(1)">Spustit skript&lt;/a></code></pre>
  </li>    
</ul>

<p>Další méně rozšířené věci vyžadují přítomnost <b>dalšího obslužného programu</b>, který dokáže cíl zpracovat:</p>

<ul>
  <li>
    <p>E-mailová adresa pro otevření mailového klienta:</p>
    
    <pre><code>&lt;a href="<b>mailto:</b>email@example.com">E-mail&lt;/a></code></pre>
  </li>  
  
  <li>
    <p>Telefonní číslo pro snadné vytočení na mobilním telefonu:</p>
    
    <pre><code>&lt;a href="<b>tel:</b>123456789">Telefon&lt;/a></code></pre>
  </li>  
    
  <li>
    <p>Otevření torrentu v příslušném programu:</p>
    
    <pre><code>&lt;a href="<b>magnet:</b>">Stáhnout&lt;/a></code></pre>
  </li>
    
  <li>
    <p>Bitcoinová adresa pro uskutečnění platby:</p>
    
    <pre><code>&lt;a href="<b>bitcoin:</b>adresa">Poslat BTC&lt;/a></code></pre>
  </li>  
</ul>


<h3 id="relativni">Relativní, nebo absolutní?</h3>

<p>Zda používat relativní nebo absolutní podobu <b>cíle odkazů</b> je značné dilema. Oba přístupny mají své výhody i nevýhody.</p>

<p>Při <b>ručním psaní HTML</b> je dost otravné psát všude doménu, navíc potom stránka nefunguje na lokálním počítači.</p>

<p>Nejlepší nejspíš je, když jsou odkazy absolutní a jejich vytváření automaticky zajišťuje <b>redakční systém</b> nebo obdobný program usnadňující tvorbu webu.</p>


<h2 id="kotva">Značka <code>&lt;a></code> jako kotva</h2>

<p>Kromě toho, že značka <code>&lt;a></code> umožňuje někam odkázat má ještě jednu funkci:</p>


<p>Dá se použít pro označení místa, <b>kam se dá odkázat</b> odjinud. Tyto tzv. <i>kotvy</i> se používají pro označení konkrétního místa v dokumentu. Odkazy na <i>kotvy</i> se vyznačují tím, že za běžnou částí URL se nachází mřížka <code>#</code> a obsah identifikátoru.</p>


<p>Zastaralý (a podle HTML 5 specifikace překonaný) způsob vytváření kotev je pomocí atributu <code>name</code>:</p>

<pre><code>&lt;a name="nazev-kotvy">&lt;/a></code></pre>  


<p>Místo <code>name</code> by se měl používat atribut <code>id</code>, který funguje obdobně a jde použít universálně pro vytvoření kotvy i <b>z jiného elementu, než je odkaz</b>.</p>

<pre><code>&lt;a <b>id</b>="nazev-kotvy">&lt;/a></code></pre> 



<p>Identifikátor by měl začínat nějakým <b>písmenem anglické abecedy</b> (a–z bez diakritiky).</p>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/aaob">Atributy <code>href</code>, <code>name</code> a <code>id</code> u odkazu</a></li>
  </ul>
</div>


<h3 id="kotva-odkaz">Kotva i odkaz zároveň</h3>

<p>Značka <code>&lt;a></code> může současně plnit funkci odkazu i kotvy.</p>

<pre><code>&lt;a
  <i>href</i>="cilova-stranka.html"
  <b>id</b>="nazev-kotvy"
>
  Text odkazu/kotvy
&lt;/a></code></pre> 








<h3 id="kotva-top">Automatická kotva <code>#top</code></h3>

<p>Zajímavá je vlastnost dobře rozšířená napříč prohlížeči, která umožňuje <b>odkázat na začátek stránky</b> bez vytváření jakékoliv kotvy.</p>

<p>Slouží k tomu identifikátor <code>top</code> – použije-li se jako cíl odkazu, prohlížeče po kliknutí odskočí na začátek stránky, i když žádný prvek s <code>id="top"</code> neexistuje.</p>

<div class="live">
  <p>
    <a href="#top">Odkaz na začátek stránky</a>
  </p>
</div>




<h2 id="target">Cíl odkazu <code>target</code></h2>

<p>Atributem <code>target</code> jde určit cíl, kde se má odkaz otevřít. Tento atribut prožíval zlaté časy v době, kdy se stránky běžně <b>tvořily pomocí rámů</b> a bylo potřeba určit, kde se má jaká stránka otevřít.</p>

<p>V době, kdy se rámy nepoužívají, se <code>target</code> využívá hlavně k <b>otevření odkazu do nového okna/záložky</b>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/nove-okno">Otevírání nového okna</a> – různé způsoby, jak otevřít obsah do nového okna</li>
  </ul>
</div>

<p>Slouží k tomu cíl <code>_blank</code>:</p>


<pre><code>&lt;a href="http://example.com" <b>target</b>="<i>_blank</i>">
  Text odkazu
&lt;/a></code></pre>

<p>Všechny předdefinované hodnoty jsou:</p>

<ul>
  <li>
    <code>_self</code> – výchozí hodnota, funguje stejně jako bez uvedení cíle    
  </li>
  <li>
    <code>_blank</code> – otevření do nového okna
  </li>
  <li>
    <code>_parent</code> – otevření do nejbližšího nadřazeného okna
  </li>
  <li>
    <code>_top</code> – otevření do nejvzdálenějšího nadřazeného okna
  </li>
</ul>

<p>Pokud není stránka v rámu, chová se <code>_parent</code> i <code>_top</code> stejně jako <code>_self</code> nebo žádný <code>target</code>.</p>

<h2 id="atributy">Další atributy</h2>

<p>Odkaz může mít ještě další spoustu atributů, které se ale tak často nepoužívají.</p>

<p>Kromě toho na něm pochopitelně fungují i <a href="/obecne-atributy">obecné atributy</a> jako <code>id</code>, <code>title</code>, <code>class</code>, <code>lang</code> a podobně.</p>



<h3 id="download">Stažení souboru <code>download</code></h3>

<pre><code>&lt;a href="adresa-souboru" <b>download="Název souboru"</b>>
  Odkaz
&lt;/a></code></pre>




<p>Přidáním atributu <code>download</code> jde novější prohlížeče <b>přemluvit ke stažení souboru</b> známého typu (třeba obrázku nebo HTML stránky) a zároveň nastavit název staženého souboru.</p>

<div class="internal-content">
  <ul>
    <li><a href="/atribut-download">Atribut <code>download</code></a> – popis atributu <code>download</code> a alternativ pro starší prohlížeče</li>
  </ul>
</div>


<h3 id="media">Atribut <code>media</code></h3>

<p>HTML atribut <code>media</code> u odkazu má fungovat podobně jako <a href="/mobilni-web#media-queries"><code>@media</code> pravidlo</a> v CSS.</p>

<p>Slouží k nastavení podmínek, kdy bude odkaz viditelný.</p>

<pre><code>&lt;a href="maly-obrazek.png" media="<b>max</b>-width: 480px">
  &lt;img src="maly-obrazek.png">
&lt;/a>
&lt;a href="velky-obrazek.png" media="<b>min</b>-width: 480px">
  &lt;img src="velky-obrazek.png">
&lt;/a>
</code></pre>





<div class="internal-content">
  <ul>
    <li><a href="/html-media">HTML atribut <code>media</code></a> – více informací o atributu, jeho podpoře v prohlížečích apod.</li>
  </ul>
</div>


<h3 id="ping">Pingnutí atributem <code>ping</code></h3>

<p>Tento atribut umožňuje při kliknutí na odkaz odeslat neviditelný požadavek na jinou URL. To se může hodit k <b>měření chování uživatelů</b>.</p>

<pre><code>&lt;a 
  href="http://jecas.cz"
  <b>ping</b>="zaznamenat.php?url=homepage"
>
  Odkaz
&lt;/a></code></pre>





<p>Více informací je v samostatném článku:</p>

<div class="internal-content">
  <ul>
    <li><a href="/html-ping">Atribut <code>ping</code></a></li>
  </ul>
</div>





<h3 id="rel">Atribut <code>rel</code></h3>

<p>Slouží k vyznačení <b>strojově čitelného vztahu</b> stránky vůči cíli odkazu. Používá se hlavně varianta s hodnotou <code>nofollow</code> (v českém překladu <i>nesledovat</i>).</p>

<pre><code>&lt;a href="http://example.com" <b>rel="nofollow"</b>>
  Odkaz s nofollow
&lt;/a></code></pre>





<p>Atribut <code>rel="nofollow"</code> slouží hlavně jako <b>signál pro vyhledávače</b>, že nemají stránku sledovat.</p>

<p>Tvůrci webů atribut <code>nofollow</code> používají hlavně v případech, kdy není <b>100% kontrola nad obsahem</b> (diskusní fóra, komentáře) s cílem zřeknout se zodpovědnosti za takový odkaz. Vyhledávače totiž negativně posuzují, když stránka <b>odkazuje na nekvalitní weby</b>.</p>



<p>Také přítomnost <code>nofollow</code> může mírně snižovat motivaci lidí <b>spamovat odkazy</b>.</p>

<p>Jak se vyhledávače staví k <code>nofollow</code> je značně diskutabilní otázka. Tento atribut začala přidávat třeba i Wikipedie a je celkem nepravěpodobné, že by vyhledávače odepsaly všechny odkazy na související zdroje, co tam jsou.</p>


<p>Existují ještě <b>další hodnoty atributu</b> <code>rel</code>, třeba redakční systém <a href="/wordpress">WordPress</a> používá některé hodnoty <code>rel</code> atributu ve svých šablonách.</p>

<p>Jelikož se většina hodnot atributu <code>rel</code> <b>běžným návštěvníkům neprojevují</b>, moc často se nepoužívají.</p>

<p>K vidění bývají následující hodnoty (atribut <code>rel</code> se může používat i u značky <code>&lt;link></code> v hlavičce stránky):</p>

<ul>
  <li><code>alternate</code> – alternativní podoba stránky (verse k tisku, překlad a podobně)</li>

  <li><code>author</code> – odkaz na autora</li>
  
  <li><code>bookmark</code> – trvalý odkaz na stránku pro uložení do záložek</li>
  
  <li><code>category</code> – odkaz na kategorii</li>  
  
  <li><code>help</code> – odkaz na stránku s nápovědou</li>

  <li><code>license</code> – odkaz na stránku o autorských právech</li>
   
  <li><code>search</code> – odkaz na stránku s vyhledáváním</li>
  
  <li><code>tag</code> – odkaz na <i>tag</i></li>
  
  <li><code>next</code>/<code>prev</code> – odkaz na další/předchozí stránku</li>
  
  <li><a href="/noreferrer"><code>noreferrer</code></a> – zruší předání informace o předešlé stránce</li>
  
  <li><code>prefetch</code> – cílová stránka se načte dopředu, Google tak <a href="/google-prefetch">zrychluje načítání</a> stránek z výsledku hledání</li>
</ul>

<p>Hodnoty <code>rel</code> je možné <b>kombinovat</b> – potom se oddělují mezerou.</p>

<pre><code>&lt;a href="" rel="<b>category tag</b>">
  Odkaz
&lt;/a></code></pre>




<h3 id="hreflang">Jazyk cíle <code>hreflang</code></h3>

<p>Dokáže informovat prohlížeč/robota o jazyku cíle odkazu.</p>

<pre><code>&lt;a href="http://example.com" <b>hreflang="en"</b>>
  Odkaz
&lt;/a></code></pre>




<p>Používá ho třeba Wikipedie u odkazů pro přepínání jazyku:</p>

<p><img src="/files/odkaz/hreflang.png" alt="Použití atributu hreflang" class="border"></p>





<p>Jinak se <code>hreflang</code> používá dost zřídka. Praktické využití může mít jako elegantnější způsob, jak si na stránce <b>odlišovat odkazy na zahraniční zdroje</b> místo používání běžných CSS tříd.</p>

<p>Takto by šlo jednoduše přidat k odkazům na anglicky psané stránky, že jsou <i>anglicky</i>:</p>

<pre><code>a[hreflang=en]:after {
  content: " (anglicky)";
}</code></pre>




<p>Ze <b>SEO pohledu</b> asi moc smysl nemá, protože vyhledávače si stejně musí určovat jazyk stránky na <b>základě zkoumání obsahu stránky</b>.</p>

<p>Při špatném použití je <code>hreflang</code> ignorován:</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.seroundtable.com/google-ignore-incorrect-hreflang-implemention-20692.html">Google: Incorrection hreflang Implementation Won't Hurt You</a></li>
  </ul>
</div>


<h3 id="type">Typ cíle <code>type</code></h3>

<p>Má sloužit k uvedení typu souboru, který se nachází v cíli odkazu (v atributu <code>href</code>).</p>

<pre><code>&lt;a href="obrazek.jpg" <b>type="image/jpeg"</b>>
  Odkaz na JPG obrázek
&lt;/a></code></pre>



<p>Zřídka využívaný atribut. Pro prohlížeče je obsah <code>type</code> čistě informativní.</p>


<p>Využít <code>type</code> u odkazu by šlo k označení typu souboru bez používání CSS tříd – třeba přidáním malé ikonky (kvůli lomítku v atributu musí být typ uveden v uvozovkách nebo lomítko escapované – <code>\/</code>).</p>

<pre><code>a[type="image/jpeg"] {
  /* styl odkazu na JPG */
}</code></pre>



<p>V případech, kdy typ obsahu určuje jeho <b>přípona</b>, si ale jde vystačit i s <a href="/css-selektory#atributovy-koncici">atributovým selektorem</a>:</p>

<pre><code>a[href$=".jpg"] {
  /* styl odkazu na JPG */
}</code></pre>




<p>Jako typ se uvádí tzv. <i>Mime type</i>, což jsou věci jako <code>image/jpeg</code> pro JPG, <code>text/html</code> pro HTML stránku a podobně.</p>

<p>Seznam různých dalších hodnot.</p>

<div class="external-content">
  <ul>
    <li>Sitepoint: <a href="http://www.sitepoint.com/web-foundations/mime-types-complete-list/">MIME Types – Complete List</a></li>
  </ul>
</div>


<h3 id="zastarale">Zastaralé atributy odkazu</h3>

<p>Nakonec jsou ještě atributy, které jsou <b>zastaralé/překonané</b>.</p>

<ul>
  <li><code>name</code> – vytvoření kotvy, jde nahradit atributem <code>id</code></li>
  
  <li><code>charset</code> – určení kódování cíle</li>
  
  <li><code>coords</code></li>
  
  <li><code>shape</code></li>
  
  <li><code>rev</code> – opačné určení vztahu než je <code>rel</code></li>
</ul>



<h2 id="stylovani">Stylování odkazů</h2>

<p>Odkazy jsou ve výchozím CSS <span title="Toto odkaz není" style="color: #0000CC; text-decoration: underline">modré a podtržené</span> – CSS vlastnosti <code>color: #0000CC</code> a <code>text-decoration: underline</code>.</p>

<p>Značka <code>&lt;a></code> se zobrazuje jako řádková (<code>display: inline</code>). Pokud je proto nutné odkazu nastavit rozměry, je nutné přidat <code>display: block</code> nebo <code>display: inline-block</code>.</p>


<h3 id="stavy">Stavy odkazu</h3>
<p>Odkaz má v CSS několik stavů, které odpovídají CSS selektorům:</p>

<ul>
  <li id="link"><code>a:link</code> – nenavštívený odkaz, většinou se používá prosté <code>a {}</code>, protože jinak by se pravidla neaplikovala u již navštívených odkazů, což je většinou žádoucí</li>
  <li id="visited"><code>a:visited</code> – <a href="/visited">navštívený odkaz</a> (kvůli ochraně soukromí jde stylovat velmi omezeně)</li>
  
  <li id="hover"><code>a:hover</code> – odkaz po najetí myší (na dotykových zařízeních se k němu jde dostat delším podtržením prstu nad odkazem)</li>

  <li id="active"><code>a:active</code> – odkaz po kliknutí myší před uvolněním tlačítka; aktivní odkazy bývají <span title="Toto odkaz není" style="color: #ff0000; text-decoration: underline">červené</span></li>
  
  <li id="focus"><code>a:focus</code> – označený odkaz klávesou <kbd>Tab</kbd>, ve většině prohlížečů odkaz <i>dostane focus</i> po kliknutí (a následně mu zůstane). V  <b>IE 7</b> a starších fungoval jako <code>:focus</code> stav <code>:active</code>.</li>
</ul>

<p><b>Vyzkoušejte</b> si jednotlivé stavy na odkazu (vede na neexistující kotvu, takže se není nutné bát kliknout):</p>

<div class="live no-source"> 
  <p class="test-odkazu">
    <a href="#nikam">Odkaz</a>
  </p>
</div>

<p><a href="https://kod.djpw.cz/vipb">Samostatná ukázka</a></p>

<h3 id="testovani">Testování stavů</h3>

<p>Pro snazší <b>testování zobrazení</b> jednotlivých stavů slouží volba <i>Force element state</i> ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> <b>Chrome</b>. Je dostupná po kliknutím pravým tlačítkem na HTML element.</p>

<p><img src="/files/odkaz/el-state.png" alt="Nastavení stavu odkazu" class="border"></p>







<h3 id="plocha">Plocha odkazů</h3>

<p>Častou chybou při stylování odkazů je jejich <b>nedostatečná velikost</b> nebo <b>chybějící aktivní plocha</b> tam, kde by ji člověk čekal. Zabývá se tím samostatný článek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/plocha-odkazu">Plocha odkazu</a> – proč a jak vytvářet klikací plochu kolem odkazu</li>
  </ul>
</div>

<h3 id="neviditelne">Neviditelné odkazy</h3>

<p>Pro snazší <b>používání stránek pomocí hlasových čteček</b> pro nevidomé návštěvníky se někdy přidávají odkazy typu „přeskočit navigaci“, „přeskočit na obsah“ a podobně.</p>

<p>Tyto odkazy se v klasickém prohlížeči nezobrazují. Je dobré myslet na to, že i neviditelný odkaz může dostat <code>focus</code> po stisknutí klávesy <kbd>Tab</kbd>. Takže by se potom tyto odkazy měly buď zobrazit, nebo být z <i>tabování</i> vyčleněny pomocí <a href="/tabindex#zabraneni">záporného <code>tabindex</code>u</a>:</p>

<pre><code>&lt;a class="skryty" href="#obsah" <b>tabindex="-1"</b>>
  Přeskočit na obsah
&lt;/a></code></pre>






<h2 id="funkcnost">Kontrola funkčnosti odkazů</h2>

<p>Při odkazování se snadno stane, že odkaz vede na <b>neexistující stránku</b>.</p>

<ul>
  <li>Cíl může po přidání odkazu na stránku zaniknout.</li>
  
  <li>Chyba může nastat už během vytváření odkazu – překlep v adrese.</li>
</ul>

<p>Nefunkční odkazy mají <b>negativní vliv</b> na <a href="/seo">SEO</a> – vyhledávač nechce posílat návštěvníky na stránky, které <i>nefungují</i>.</p>

<p>Je tedy dobré čas od času <b>funkčnost odkazů zkontrolovat</b> a nefunkční opravit nebo odstranit. Existují k tomu automatické nástroje. Dobře funguje <b>Xenu</b>:</p>

<div class="external-content">
  <ul>
    <li><a href="http://home.snafu.de/tilman/xenulink.html#Download">Stáhnout program Xenu</a></li>
  </ul>
</div>

<p>Používání <b>Xenu</b> je velmi snadné. Po nainstalování stačí zvolit <i>Check URL…</i>:</p>

<p><img src="/files/odkaz/xenu-check.png" alt="Spuštění testu odkazů" class="border"></p>















<p>Následně zvolit <b>doménu</b> a zaškrtnou kontrolu <b>externích odkazů</b>:</p>

<p><img src="/files/odkaz/xenu-start.png" alt="Spuštění testu odkazů" class="border"></p>



































<p>Potom stačí jen počkat, až Xenu odkazy zkontroluje.</p>


<p><img src="/files/odkaz/xenu-vysledek.png" alt="Výsledek testu odkazů programem Xenu" class="border"></p>
































<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/odkazy-html.html">Odkazy v HTML</a></li>
  <li>Jak psát web: <a href="http://www.jakpsatweb.cz/html/odkazy.html">Odkazy v HTML: a href, target, rel</a></li>
  <li>DevDocs: <a href="http://devdocs.io/html/element/a">Element <code>&lt;a></code></a></li>
</ul>


  <style>
    .test-odkazu a {background: #fff !important; color: #000 !important; border: 0; padding: 1em}
    
    .test-odkazu a:hover {background: #ccc !important;}
    .test-odkazu a:hover:after {content: " :hover" !important;}
    
    .test-odkazu a:focus {background: orange !important;}
    .test-odkazu a:focus:after {content: " :focus" !important;}
    
    .test-odkazu a:active {background: yellow !important;}
    .test-odkazu a:active:after {content: " :active" !important;}    
  </style>  