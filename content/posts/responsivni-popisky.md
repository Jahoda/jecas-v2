---
title: "Responsivní popisky odkazů"
headline: "Responsivní popisky tlačítek"
description: "Jak na různě velkých obrazovkách měnit popisky odkazů a tlačítek."
date: "2016-04-08"
last_modification: "2016-04-10"
status: 1
tags: ["odkazy", "responsive"]
format: "html"
---

<p>Při šetření místa na malých obrazovkách může být nevyhnutelné řešit zmenšení prvků jako jsou tlačítka, odkazy nebo položky v menu.</p>







<h2 id="velikost">Zmenšení velikosti</h2>

<p>Jako první se nabízí zmenšit velikost textu pomocí <a href="/font#size"><code>font-size</code></a>.</p>

<p>Problém tohoto postupu je, že <font style="font-size: 60%">malé</font> písmo bude… malé. </p>

<p>Kromě horší čitelnosti bude malý odkaz i špatně trefitelný prstem na dotykovém displeji.</p>

<p>Docela populární řešení této situace je používání <b>tlačítek s ikonkou</b> doplněných malým popiskem:</p>

<ol>
  <li>Plocha zůstane rozumně velká.</li>
  <li>Význam tlačítka jde pochopit jen ze symbolu ikony.</li>
</ol>

<p>Tento koncept používá třeba <a href="/twitter">Twitter</a>:</p>

<p><img src="/files/hamburger-menu/twitter-menu.png" alt="Různé délky textu" class="border"></p>






<h2 id="oriznuti">Oříznutí textu</h2>



<p>Asi nejsnazší možnost je odkazu/tlačítku nastavit maximální rozměry a zbytek nekompromisně <b>oříznout</b>. Díky <code>text-overflow: ellipsis</code> jde automaticky doplnit na konec trojtečku.</p>

<div class="live">
  <p style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 15em">Kdo bude přistižen, bude mu ustřižen.</p>
</div>



<p>Bohužel v takovém případě může utrpět srozumitelnost. Zvlášť u dotykových zařízení je komplikované umístit plný text popisku do <a href="/obecne-atributy#title">atributu <code>title</code></a>, protože se k němu uživatelé nejspíš nedostanou.</p>

<div class="internal-content">
  <ul>
    <li><a href="/oriznuti-textu">Oříznutí dlouhého textu</a> – různé způsoby oříznutí řádku textu</li>
  </ul>
</div>


<h2 id="text">Jiné texty</h2>


<p>Jiná možnost je v závislosti na šířce viewportu (např. podle <a href="/media"><code>@media</code> pravidel</a>) měnit varianty popisků.</p>

<ul>
  <li>Na velkém monitoru tak zobrazit například <i>Přidat nový fytopuf</i>,</li>
  <li>na menším jen <i>Přidat fytopuf</i></li>
  <li>a na nejmenší obrazovce jen <i>Nový</i>.</li>
</ul>

<p>Jak na to?</p>




<h3 id="duplicita">Duplicitní odkazy</h3>

<p>Asi nejsnazší je odkazy/tlačítka zkrátka zduplikovat:</p>

<pre><code>&lt;a href="akce" class="desktop">
  Přidat nový fytopuf
&lt;/a>
&lt;a href="akce" class="mobile">
  Nový
&lt;/a></code></pre>











<p>A podle <code>@media</code> určit, která z variant se má zobrazovat:</p>

<pre><code>.mobile {display: none}
@media (max-width: 50em) {
  .mobile {display: inline}
  .desktop {display: none}
}</code></pre>









<p>Toto řešení není úplně ideální pro <a href="/seo">vyhledávače</a> nebo hlasové čtečky, které mohou odkaz zaznamenat dvakrát.</p>

<p>Nabízí se tak pro informačně chudší obsah použít atribut <a href="/aria#hidden"><code>aria-hidden</code></a>:</p>


<pre><code>&lt;a href="akce" class="mobile" <b>aria-hidden="true"</b>>
  Nový
&lt;/a></code></pre>








<h3 id="obal">Obalení slov</h3>

<p>V některých případech může stačit řešení, kdy se některá slova popisku obalí <a href="/div-span#span"><code>&lt;span></code>em</a> a na mobilu skryjí:</p>


<pre><code>&lt;a href="akce">
  Přidat&lt;span class="desktop"> nový fytopuf&lt;/span>
&lt;/a></code></pre>








<p>Na mobilech se potom skryje řetězec „ nový fytopuf“:</p>


<pre><code>@media (max-width: 50em) {
  .desktop {display: none}
}</code></pre>






<p>Toto řešení není moc universální – spoléhá na to, že v úsporném popisku bude slovní spojení, které je i v tom dlouhém pro desktop.</p>


<p>Další problém nejspíš nastane v případě vícejazyčného webu, kdy bude muset být text <a href="/preklad">překladu</a> rozdělen na dvě části nebo používat zástupné znaky pro doplnění HTML značek:</p>


<pre><code>"Přidat %s nový fytopuf %s", "&lt;span class='desktop'>", "&lt;/span>"</code></pre>






<h3 id="atributy">Text v atributu</h3>

<p>Relativně výhodné tak může být umístit různé popisky do <code>data-*</code> atributů a pomocí <a href="/css-selektory#before-after"><code>:before</code>/<code>:after</code></a> je vyvolat díky vlastnosti <a href="/content-attr"><code>content</code></a>:</p>




<pre><code>&lt;a href="akce" class="button" <b>data-title="Nový"</b>>
  &lt;span>Přidat nový fytopuf&lt;/span>
&lt;/a></code></pre>







<p>Popisek pro různé šířky se umístí do vlastního <code>data-*</code> atributu, plné znění popisku se obalí <code>&lt;span></code>em, aby šel dlouhý obsah skrýt, a zbytek zařídí CSS:</p>

<pre><code>@media (max-width: 50em) {
  .button:after {
    content:attr(data-title);
  }
  .button span {
    display: none;
  }
}</code></pre>










<p>Podpora v prohlížečích je limitována od <b>IE 9</b> kvůli media queries a od <b>IE 8</b> kvůli <code>:before</code>.</p>

<p><a href="https://kod.djpw.cz/rgwb-">Samostatná živá ukázka</a></p>




<h2 id="preklad">Různé překlady</h2>


<p>Celou situaci ještě komplikují různé <a href="/jazyk">jazykové verse</a>, kvůli kterým je prakticky nemožné spoléhat na nějakou šířku textu.</p>

<p>Příklad délky pozvánek k události na <a href="/facebook">Facebooku</a> v němčině a angličtině:</p>

<p><img src="/files/responsivni-popisky/delka-textu.png" alt="Různé délky textu" class="border"></p>





<p>Dobrý poměr universálnosti, srozumitelnosti a pracnosti tak nabízí používání ikonek a oříznutí textu.</p>