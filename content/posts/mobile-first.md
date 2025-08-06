---
title: "Proč (ne)použít Mobile First"
headline: "Proč (ne)používat mobile first"
description: "Mobile first je postup tvorby responsivního webu, kdy se začíná od nejmenších obrazovek (mobil) až po větší (desktop)."
date: "2015-04-27"
last_modification: "2015-08-17"
status: 1
tags: ["napady", "responsive"]
format: "html"
---

<p>Má-li být stránka <a href="/responsive">responsivní</a>, existuje několik možností, jak toho ve finále dosáhnout:</p>

<ol>
  <li>
    <p>Připravit nejdříve <b>desktopovou podobu</b> a následně z ní vytvořit odvozeninu funkční na menších displejích.</p>    
    <div class="internal-content">
      <ul>
        <li>
          <p><a href="/prevod-responsivni-design">Převod webu na responsivní design</a> – jak předělat starý web na responsivní</p>
        </li>
      </ul>
    </div>
  </li>  
  <li>
    <p>Začít variantou pro <b>nejmenší zařízení</b> a postupně se dostávat k větším uhlopříčkám.</p>
  </li>  
  <li>
    <p>Zvolit nějakou kombinaci předchozích postupů. Například při tvorbě primárně pro <b>desktop</b> uvažovat o tom, že bude potřeba, aby se stránka přizpůsobila i <b>mobilním zařízením</b>.</p>
  </li>
  <li>
    <p>Vytvořit stránku <b>pouze pro mobil</b> – tzv. <i lang="en">mobile-only</i>.</p>
  </li>
</ol>

<p>Postup <b lang="en">mobile-first</b> (v překladu: <i>prvně pro mobilní zařízení</i>) je 2. možnost z předchozího seznamu.</p>


<h2 id="jak">Jak vytvořit mobile-first stránku</h2>

<p>Postup tvorby designu nejdříve pro malá zařízení je zpravidla takový, že se nejprve přidají stránce pouze základní styly jako jsou <b>barvy</b> nebo <b>styly písma</b>.</p>


<p>Stručně řečeno se využije toho, že HTML je samo o sobě téměř dokonale responsivní.</p>

<div class="internal-content">
  <ul>
    <li>Responsivní design webu: <a href="/responsivni-web#html">HTML je responsivní</a></li>
  </ul>
</div>

<p>Následně se začne <b>roztahovat velikost okna prohlížeče</b> a v situaci, když už je základní jedno-sloupcové rozložení příliš široké, vytvoří se první tzv. <i>break-point</i>, po kterém se obsah začne organisovat do sloupců či jinak přizpůsobovat pro větší plochu.</p>

<pre><code>@media (min-width: 30em) {
  /* pravidla pro šířku nad 30 em */
}</code></pre>

<p>Starší prohlížeče tak dostanou pouze základní styly, protože nepodporují <a href="/media"><code>@media</code> pravidla</a>, takže obsah pro větší šířku <b>budou ignorovat</b>.</p>


<p>Problém je, že i prohlížeč bez podpory <b>media queries</b> (<code>@media</code>) – např. <b>Internet Explorer 8</b> – který by nemusel mít problém se zobrazení pokročilejšího layoutu, ale kvůli nepodporování <code>@media</code> bude mít jen základní zbytečně prostý vzhled.</p>

<p>V takových situacích nezbývá než generovat těmto prohlížečům speciální CSS. A připojit ho na základě detekce prohlížeče na straně serveru místo běžného CSS s <code>@media</code> pravidly.</p>

<p><b>Horší postup</b> je použít JavaScriptový <a href="/polyfill">polyfill</a> pro zprovoznění media queries ve starých prohlížečích nebo třeba připojení zvláštního CSS <a href="/podminene-komentare">podmíněnými komentáři</a>:</p>

<pre><code>&lt;link rel="stylesheet" href="styl.css">
&lt;!--[if lte IE 8]>
  &lt;link rel="stylesheet" href="styl-ie.css">
&lt;![endif]--></code></pre>







<div class="external-content">
  <ul>
    <li><a href="https://github.com/scottjehl/Respond">Respond.js</a> – přidání podpory Media Queries pro <b>IE 6</b> až <b>IE 8</b></li>
  </ul>
</div>

<p>Proč horší? Uživatel starého slabého prohlížeče bude zatěžován dalším JavaScriptem nebo dalším HTTP požadavkem a stahováním více dat kvůli dalšímu CSS souboru.</p>



<h2 id="proc-ano">Proč používat „mobile first“ přístup</h2>

<p>Začít tvorbu webu pro zařízení s malými obrazovkami přináší některé výhody, ze kterých může těžit i desktopová verse.</p>



<h3 id="podstatne">Výběr podstatných informací</h3>

<p>Omezená velikost obrazovky nutí tvůrce webu k tomu, aby se zamyslel, <b>co na stránce je opravdu podstatné</b>. Z toho může těžit i varianta webu <b>pro desktop</b> (velké obrazovky), návštěvník potom nebude zahlcen informacemi, které se na stránku dostaly dle hesla „když nevíš, kam s tím, vytvoř další sloupec“, ale naopak <b>najde, co potřebuje</b>.</p>

<h3 id="ubrat">Je snazší přidávat než ubírat</h3>

<blockquote>
  <p>Omlouvám se, že je tento článek tak dlouhý, neměl jsem čas ho napsat kratší.</p>
</blockquote>

<p>Bývá značně snazší z jednoduchého webu vytvořit web složitější než obráceně. Během procesu <b>předělávání desktopového webu</b> na versi pro mobil dřív nebo později tvůrce narazí na situaci, kdy bude muset nějaký obsah z desktopu <b>vyškrtnout</b>, schovat za tlačítko a podobně, což vytváří nekonsistenci na zařízeních s různě velkou obrazovkou.</p>

<p>V ideálním případě by responsivní design měl nabízet <b>na všech zařízeních tentýž obsah</b>. Jinak:</p>

<ul>
  <li>
    <p>Může dojít k <b>matení návštěvníka</b>. Když si člověk nejprve oblíbí web na velkém počítači a při zobrazení stejné stránky na mobilu se nedostane k informacím, na které byl zvyklý.</p>
  </li>
  
  <li>
    <p>Skrytý obsah <b>není ideální s ohledem na <a href="/seo">SEO</a></b>. Když vyhledávač pošle člověka na web, protože hledal slovo „fytopuf“, a toto slovo na webu nebude viditelné (jelikož bude skryté), bude hledající návštěvník <b>vinit vyhledávač</b> z špatného hledání.</p>
    
    <p>Z tohoto důvodu Google snižuje váhu i obsahu, který je možné zobrazit po kliknutí.</p>
    
    <div class="internal-content">
      <ul>
        <li>
          <p><a href="/skryty-text">Google a skrytý text</a> – obsah skrytý pod tlačítkem „Zobrazit více“ může mít nižší důležitost</p>
        </li>
      </ul>
    </div>
  </li>
</ul>


<h3 id="rychlost">Rychlost načítání</h3>

<p>Vytváření stránky pro mobilní zařízení klade vyšší důraz na <b>nižší datovou náročnost</b>, protože mobily mají často k disposici pomalé připojení s velkou odezvou.</p>

<p>Tvůrce webu je tak tlačen k <b>snížení objemu potřebných dat</b> a <b>snížení počtu požadavků na soubory</b> (spojení CSS/JS do jednoho souboru, používání <a href="/css-sprite">obrázkových spritů</a> a podobně).</p>


<h3 id="formulare">Formuláře</h3>

<p>Zatímco <b>vyplňování formulářů</b> na desktopu je otravné, na mobilu je to ještě horší, takže je pro rozumnou použitelnost nutné to uživateli <b>maximálně ulehčit a vyhnout se známým chybám</b>:</p>

<div class="internal-content">
  <ul>
    <li><a href="/chyby-formularu">20 nejhorších chyb formulářů na webu</a></li>
  </ul>
</div>


<h3 id="stare">Staré prohlížeče</h3>

<p>Nakonec je výhoda, že jednoduchý mobilní design může posloužit i jako <b>dostatečně dobrá</b> varianta pro staré prohlížeče, pro které by mohlo být složitější ladit komplikovanější podobu webu.</p>



<h2 id="proc-ne">Proč mobile first nepoužívat</h2>

<p>Hlavní úskalí tvorby <b>nejprve pro mobily</b> je v tom, že to může webového tvůrce svádět k <b>ošizení webu pro desktop</b>, který ale může být důležitější než mobilní web.</p>

<p>Uživatelé různých zařízení mají <b>různé potřeby</b> a mobily, tablety i desktopy <b>používají různým způsobem</b>.</p>

<ol>
  <li>
<p>Zatímco <b>desktop</b> používá návštěvník zpravidla v klidu a delší souvislou dobu, <b>mobil</b> je zase častěji používán mnohokrát během dne na krátký okamžik a uživatel se na to moc nesoustředí.</p>
</li>
  <li>
    <p>Liší se i <b>druh informací/úkonů</b>, které člověk na mobilu a desktopu vyžaduje.</p>
  </li>
  <li>
    <p>Zcela zásadní rozdíl je i ve <b>velikosti obrazovky</b> nebo <b>způsobu ovládání</b> (prst vs. myš + klávesnice).</p></li>
</ol>

<p>Tedy:</p>

<blockquote>
  <p>Pro různé platformy je vhodné jiné řešení uživatelského rozhraní.</p>
</blockquote>


<h3 id="podil">Podíl mobilů oproti desktopům</h3>

<p>I přesto, že přístupy z mobilních zařízení globálně <b>rostou</b>, většinou není zařízení s malou obrazovkou nejvíce zastoupeným typem.</p>

<p>V ČR podle <a href="http://gs.statcounter.com/">StatCounteru</a> globálně v roce 2015 <b>desktop jasně dominuje</b>. Mobily + tablety nemají dohromady ani <b>20 %</b>.</p>

<p><img src="/files/mobile-first/desktop-mobile-tablet.png" alt="Podíl mobilů v ČR" class="border"></p>
































<p>Jsou pochopitelně i weby a odvětví, kde je <b>podíl mobilních zařízení</b> mnohem vyšší, třeba i vyšší než desktopů.</p>

<p>Stejně tak nejsou výjimkou ani weby, kde <b>návštěvy z desktopu</b> představují <b>90 % všech návštěv</b>.</p>

<p>Takto vypadaly statistiky tohoto webu (duben 2015):</p>

<p><img src="/files/mobile-first/podil.png" alt="Podíl zařízení na jecas.cz" class="border"></p>

















<p>Na základě podobných čísel se potom zdá, že varianta pro mobily je oproti té desktopové <b>celkem nevýznamná</b>. A nabízí se otázka:</p>

<blockquote>
  <p>Proč dělat web prvně pro 10 % návštěvníků z mobilu místo 90 % z desktopu?</p>
</blockquote>



<p>Používat techniku <i lang="en">mobile first</i>, tak může být ve skutečnosti výhodné spíš pro <b>webového vývojáře</b>, který si ulehčí práci, než pro návštěvníky.</p>

<p>Samozřejmě to neplatí universálně a rozhodně je možné vytvořit lepší desktopový web technikou mobile-first (díky držení se postupů, co jsou výhodné i na desktopu), než by vznikl při tvorbě nejprve pro desktop. A naopak.</p>

<p>V ideálním případě by <b>maximální péči</b> měly dostat všechny varianty webu pro všechna zařízení.</p>

<p>Bohužel ideální případ v reálném světě nastat nemůže, protože zdroje jsou omezené a je <b>nutné stanovit priority</b>. Potom je tedy často lepší, když se trochu <i>odflákne</i> raději mobilní web než ten pro desktop.</p>






<h3 id="rust">Podíl mobilů roste</h3>

<blockquote>
  <p>Trend podílu mobilů je výrazně rostoucí a weby se dělají na několik let dopředu.</p>
</blockquote>


<p>Je pravda, že <b>vypiplaný mobilní web</b> na úkor desktopového může za několik let, pokud podíl mobilů překoná desktopy, ocenit hromada návštěvníků.</p>


<p>Při počítání je ale nutné zohlednit i dobu, než ke zlomovému okamžiku dojde, kdy naopak desktopová většina má kvůli plýtvání zdrojů na mobily horší zážitek.</p>



<p>Většina současných webů (psáno v roce 2015) tak případnou <b>nadvládu mobilních zařízení</b> nejspíš nezažije po takovou dobu, aby dnešní upřednostnění mobilů dávalo smysl.</p>




<h2 id="mobile-only">Mobile only</h2>

<p>Kromě <i lang="en">mobile first</i> existuje ještě jeden přístup – <b lang="en">mobile only</b>. Tedy vytvořit stránku <b>pouze pro mobilní zařízení</b> s malou obrazovkou.</p>


<p>To je pro tvůrce webu vůbec nejsnazší varianta, protože pro mobil navržený web se bude zpravidla rovnou rozumně zobrazovat i na <b>desktopu</b>.</p>


<p>Vytvářet web „pouze pro mobily“ se hodí ve specifických případech:</p>

<p>Hlavně v situaci, kdy stačí mít web v <b>jednom sloupci</b>, protože více sloupců obsahu se na mobil zpravidla nevejde.</p>


<p>Pro rozumné zobrazení na desktopu potom stačí pouze <b>omezit maximální šířku</b>, aby text neměl příliš dlouhé řádky.</p>

<p>Mít stránku <i lang="en">mobile-only</i> není ani problém pro <a href="/google">Google</a>:</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.seroundtable.com/google-mobile-only-site-20757.html">Google: Mobile Only Sites Are Fine, You Don't Need A Desktop Site.</a></li>
  </ul>
</div>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Martin Michálek: <a href="http://kratce.vzhurudolu.cz/post/42187934506/mobile-first-css">Mobile First v CSS</a></li>
  
  <li>Deep Design: <a href="http://deep.design/mobile-first/">Why is it so Easy to Get &quot;Mobile First&quot; Wrong?</a></li>
</ul>