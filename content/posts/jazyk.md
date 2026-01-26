---
title: "Výběr jazyku stránky"
headline: "Výběr jazyku stránky"
description: "Jak vytvořit vícejazyčný web s ohledem na uživatele i vyhledávače."
date: "2014-10-31"
last_modification: "2016-03-06"
status: 1
tags: ["lokalisace", "napady", "seo"]
format: "html"
---

<p>V případě, že má být webová stránka nebo aplikace dostupná ve více jazycích, existuje několik způsobů, jak to udělat. V různých situacích se hodí různé postupy.</p>



<h2 id="detekce">Autodetekce jazyku</h2>

<p>Pro lepší komfort návštěvníků je vhodné zkoušet automaticky určit jazyk, který bude návštěvník preferovat.</p>

<p>V některých situacích se kromě jazyku hodí detekovat i lokalitu, na základě které může být web personalisovaný.</p>

<p>Detekovat jazyk klienta lze v <a href="/php">PHP</a> z hlavičky <a href="/server#http-accept-language"><code>HTTP_ACCEPT_LANGUAGE</code></a>.</p>

<p>V JavaScriptu je informace o jazyku v <code>navigator.language</code> (případně <code>navigator.userLanguage</code> v <b>IE 10</b> a starší).</p>

<div class="live">
  <p>Váš jazyk je „<span id="vypisJazyku"></span>“</p>
  <script>
    vypisJazyku.innerHTML = navigator.language || navigator.userLanguage;
  </script>
</div>

<p>Výstup z této detekce je závislý na nastavení jazyku v prohlížeči. Když si člověk jazyk v prohlížeči změní, adekvátně se změní informace v <code>HTTP_ACCEPT_LANGUAGE</code>:</p>

<p><img src="/files/jazyk/chrome-jazyk.png" alt="Nastavení jazyku v Chrome" class="border"></p>

















<p>Jazyk zjištěný <a href="/js">JavaScriptem</a> se nemusí shodovat s hlavičkou <code>HTTP_ACCEPT_LANGUAGE</code>.</p>

<p>Při přítomnosti více jazyků může prohlížeč vrátit jejich seznam se stanovenou prioritou.</p>

<pre><code>en-GB,en;q=0.8,cs;q=0.6,de;q=0.4</code></pre>


<p>U prohlížečů od Microsoftu – <a href="/microsoft-edge"><b>Edge</b></a>/<b>IE</b> – je jazyk prohlížeče nejspíš určen operačním systémem.</p>


<h3 id="geoip">GeoIP</h3>

<p>Druhá možnost, jak jazyk automaticky určit, je detekce podle IP adresy:</p>

<div class="internal-content">
  <ul>
    <li><a href="/geoip">Lokalisace podle IP v PHP</a></li>
  </ul>
</div>

<p>Jde o relativně spolehlivou metodu. Stačí vyzkoušet. Zjistit aktuální jazyk dle HTTP hlavičky a IP detekce je možné na následující stránce:</p>



<h3 id="risiko">Risiko autodetekce</h3>

<p>Automatické určení jazyku může v případě selhání značně zkomplikovat návštěvníkovi život. Přijít na web a vidět ho v jazyce, kterému člověk absolutně nerozumí, je dost nešťastné.</p>

<p>Mělo by proto být zřejmé, jakým způsobem jazyk následně <b>ručně změnit</b>.</p>






<h2 id="zmena">Změna jazyku</h2>

<p>Pokud automatická detekce nastaví jazyk jinak, než by si návštěvník přál, bude potřeba jazyk přepnout.</p>

<p><img src="/files/jazyk/jazyk.png" alt="Změna jazyku" class="border"></p>






<p>Vzhledem k tomu, že různé weby mají různé požadavky na změnu jazyka, neexistuje nějaký <b>jednoznačný styl</b>, jak přepínání jazyků realisovat.</p>


<p>Nejčastěji jde změnu jazyka nalézt nejspíš:</p>

<ol>
  <li>Vpravo nahoře.</li>
  <li>V patičce.</li>
  <li>V nastavení.</li>
</ol>




<p>Díky automatické detekci nemusí být zvlášť u aplikací nutné, aby vůbec někdy uživatel jazyk měnil. U obsahových webů je ale situace někdy odlišná, protože některé stránky mohou být v některém z jazyků lépe zpracovány.</p>



<h3 id="priklady">Příklady</h3>

<p>Na Facebooku jde jazyk změnit v patičce po kliknutí na aktuální jazyk.</p>

<p><img src="/files/jazyk/facebook-zmena.png" alt="Změna jazyka" class="border"></p>





<p><a href="/twitter">Twitter</a> má změnu jazyku až v nastavení:</p>

<p><img src="/files/jazyk/twitter-zmena.png" alt="Změna jazyka" class="border"></p>



















<p>Pokud jsou k disposici pouze dvě jazykové verse, nabízí se použít třeba styl, který používá <a href="http://hosting.wedos.com/d/117947">Wedos</a>:</p>

<p><img src="/files/jazyk/wedos-zmena.png" alt="Změna jazyka" class="border"></p>







<h3 id="vlajky">Ikony vlajek</h3>

<p>Obchod Alza.cz používá řešení se symboly vlajek:</p>

<p><img src="/files/jazyk/jazyk.png" alt="Změna jazyku" class="border"></p>







<p>Ty na jednu stranu pomohou v orientaci, na stranu druhou dávají výběru jazyku <b>vyšší pozornost</b>, než by možná bylo potřeba.</p>

<p>Další problém je v tom, že úplně neplatí rovnice vlajka = jazyk. V některých zemích se hovoří více jazyky a stejně tak některými jazyky se mluví ve více zemích (člověk z Brazílie bude klikat na portugalskou vlajku a podobně).</p>



<h3 id="jazyk">Jazyk jazyků</h3>

<p>K úvaze je, jestli jednotlivé jazyky vypsat v aktuálně nastaveném jazyce, jazykem daného jazyku nebo použít universální angličtinu.</p>

<p>Při použití aktuálního jazyku může nastat problém v případě, že se člověk překlikne. Najít způsob, jak se přepnout zpátky do alespoň trochu srozumitelného jazyku je potom náročné.</p>

<p><img src="/files/jazyk/fb-caj.png" alt="Změna jazyka" class="border"></p>









<p>Zabránit tomu jde vypsáním seznamu jazyků v jazyce každého z nich. Tedy místo „Slovinština“ psát slovinsky „Slovenščina“ a podobně. Uživatel potom najde svůj jazyk i v případě, že je web nastaven do jazyku, kterému vůbec nerozumí.</p>

<p>Tento přístup je třeba na Facebooku, kde se po najetí navíc zobrazí název jazyku v aktuálně nastaveném překladu.</p>

<p><img src="/files/jazyk/vyber-jazyku.png" alt="Změna jazyku" class="border"></p>














<h2 id="ukladani">Ukládání jazyku</h2>

<p>Nastaví-li si uživatel vlastnoručně požadovaný jazyk, je dobré mu tuto volbu uložit, aby si ji stránka pamatovala.</p>

<p>Dobře se pro to hodí <a href="/cookies">cookies</a> – nejspíš i v případě, že se uživatel na stránku přihlašuje, aby po případném odhlášení byl web v jeho oblíbeném jazyce.</p>

<p>V přenášení informace o aktuálním jazyce se liší vhodné postupy pro obsahové weby od webových aplikací:</p>




<h2 id="aplikace">Webová aplikace</h2>

<p>Webové aplikace (jako <a href="/facebook">Facebook</a> nebo Twitter) v určitém jazyce mají typicky jen uživatelské rozhraní a samotný obsah je potom v jazyce jeho autora.</p>

<p>Například na Facebooku je vidět, jak je uživatelský obsah v češtině doplněn uživatelským rozhraním (například) v angličtině.</p>

<p><img src="/files/jazyk/facebook.png" alt="Uživatelský obsah vs. aplikace" class="border"></p>























<p>V takové situaci je poměrně rozumné, že se obsah nachází na stále stejné URL nezávisle na jazyku návštěvníka.</p>

<pre><code>https://www.facebook.com/jecas.cz/posts/1026829824045400</code></pre>

<p>Když si tuto URL nalistuje člověk s Facebookem ve španělštině, bude mít ovládací prvky mimo textu příspěvku španělsky.</p>



<h2 id="stranka">Obsahová stránka</h2>

<p>U webů sestávajících ze souvislého textu v různých jazycích je potom situace úplně jiná.</p>

<p>Jednotlivé stránky jsou textově kompletně odlišné, takže je potřeba, aby byly na odlišných adresách (aby na různé jazykové mutace šlo odkazovat a mohly je indexovat vyhledávače).</p>





<h3 id="jazyk-url">Jazyk v URL</h3>

<p>Obvykle se informace o jazyku přenáší v URL. Ačkoliv by teoreticky šlo mít pro kontaktní stránku v češtině a angličtině adresy typu:</p>

<pre><code>example.com/kontakt
example.com/contact</code></pre>





<p>Při potřebě překladu do němčiny nebo slovenštiny by ale nastal problém s obsazenými URL.</p>

<p>Pohodlnější tak bývá zanést informaci o jazykové versi přímo jako část URL:</p>

<pre><code>example.com/cs/kontakt
example.com/en/contact
example.com/sk/kontakt</code></pre>






<h3 id="domeny">Různé domény</h3>

<p>Možnost je případně i v použití zvláštních domén pro jednotlivé jazykové mutace:</p>


<pre><code>example.cz/kontakt
example.com/contact
example.sk/kontakt</code></pre>



<p>U webu s hodně překlady to ale může být neúnosně finančně nákladné nebo technicky složitěji řešitelné.</p>


<h3 id="vychozi">Výchozí jazyk</h3>

<p>K úvaze je, jestli mít nějaký jazyk jako výchozí. Tedy například anglickou podobu stránky mít na:</p>

<pre><code>example.com/
example.com/contact</code></pre>



<p>A překlady na:</p>

<pre><code>example.com/cs/kontakt
example.com/sk/kontakt</code></pre>



<p>Nebo mít všechny verse na URL nesoucí název jazyku.</p>





<h2 id="presmerovani">Přesměrování</h2>

<p>Je-li informace o jazyku v URL u všech jazykových mutací, je třeba vyřešit situaci, kdy se návštěvník dostane na stránku:</p>

<pre><code>example.com</code></pre>


<p>Nabízí se ho přesměrovat na základě detekce jazyku na příslušnou jazykovou podobu, například:</p>

<pre><code>example.com/cs</code></pre>


<p>Pro vyhledávače je totiž jinak problém, když se na stejné adrese zobrazuje různým lidem různý obsah:</p>

<blockquote>
  <p>Obecně zatím platí, že Seznam
    dokáže na jedné URL zaindexovat jenom jeden obsah.</p>

<p>Google dokáže zaindexovat na jedné URL více obsahů, ale nedokáže je
pak oba nabídnout uživateli.</p>
  <p class="autor">– Yuhů</p>
</blockquote>


<p>Bohužel přesměrování má ten problém, že zbytečně <b>zdržuje načítání stránky</b>. Na pomalém mobilním připojení může být odezva každého požadavku třeba 300 milisekund.</p>


<p>Přesměrování tak zbytečně zdrží načítání a sníží <a href="/zrychlovani">rychlost webu</a>.</p>




<h3 id="canonical">Kanonické URL</h3>

<p>Obejít problém přesměrování jde servírováním odlišného obsahu na stejné URL hlavní stránky, kde je podle automaticky detekovaného jazyku uvedena značka <code>&lt;link rel="canonical"></code> – ta slouží pro vyhledávače, aby pro ně neexistovala adresa s proměnlivým obsahem.</p>


<pre><code>&lt;link rel="canonical" href="http://www.example.com/en"></code></pre>




<p>Problematiku přesměrování a použití kanonického odkazu jsem konsultoval s <b>Yuhůem</b>:</p>

<blockquote>
  <p>Pokud použiješ na HP obsah proměnlivý podle jazyka, Seznam uvidí
kanonický link a zpracuje ho podobně jako přesměrování, ovšem jako
kanonickou adresu v SERPu vždy použije <code>example.com/xx</code></p>
</blockquote>


<dl>
  <dt>Přijde ti postup s kanonickým odkazem v pořádku, nebo je lepší postupovat jinak?</dt>
  <dd>
    <p><b>Yuhů</b>: Já bych se smířil s tím přesměrováním, aby mohly vyhledávače pohodlně
zaindexovat všechny jazykové verse na jejich URL.
</p>
  </dd>
  <dt>Posílá SeznamBot hlavičku HTTP_ACCEPT_LANGUAGE, ze které lze detekovat češtinu?
</dt>
  <dd><p><b>Yuhů</b>: Pokud vím, posílá tuhle hlavičku a primárně chce češtinu.
Občas to přináší i vtipné až smutné situace, například když narazíme
na nějaké automaticky nebo komunitně přeložené mohutné americké weby.
</p></dd>
</dl>

<h2 id="html">HTML atributy</h2>

<p>V souvislosti s jazykovými versemi se je možné setkat s atributy <a href="/lang"><code>lang</code></a> a <a href="/odkaz#hreflang"><code>hreflang</code></a>.</p>

<p>Atribut <code>lang</code> se zpravidla používá pro celou stránku u značky <a href="/html-kostra#html"><code>&lt;html></code></a>. Jeho význam je trochu sporný, protože vyhledávače stejně musí provádět detekci jazyku na základě obsahu.</p>

<p>Pomocí <code>hreflang</code>u jde k odkazu přidat informaci, že vede na určitou jazykovou versi.</p>


<p>První způsob je značkou <code>&lt;link></code> v hlavičce:</p>

<pre><code>&lt;link rel="alternate" <b>hreflang</b>="sk" href="http://example.sk/"></code></pre>



<p>A podobně pak i u odkazů (třeba v menu na přepnutí jazyka):</p>

<pre><code>&lt;a href="http://example.sk/" <b>hreflang</b>="sk">
  slovensky
&lt;/a></code></pre>



<p><small>Za doplnění děkuji <a href="https://www.souki.cz/"><b>Petru Soukupovi</b></a>.</small></p>

<h2 id="preklad">Překlad</h2>

<p>Jak technicky řešit přeložení obsahu stránky řeší následující článek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/preklad">Překlad stránky v PHP</a></li>
  </ul>
</div>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Sitepoint: <a href="http://www.sitepoint.com/representing-language-on-the-web/">How Do You Represent a Language on the Web?</a></li>
</ul>