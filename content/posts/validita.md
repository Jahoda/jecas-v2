---
title: "Musí být web validní?"
headline: "Musí být web validní?"
description: "Je nutné, aby byl HTML kód stránky validní? Vliv (ne)validního kódu na SEO."
date: "2015-07-24"
last_modification: "2016-01-31"
status: 1
tags: ["html", "napady", "seo"]
format: "html"
---

<p>Někdy kolem roku 2005 bylo hodně populární mít <b>web validní</b> a pochlubit se o tom prostřednictvím ikonek.</p>

<p><img src="/files/validita/valid-xhtml10.png" alt="Validní XHTML" class="border"></p>


<p><img src="/files/validita/valid-html401.png" alt="Validní HTML 4.01" class="border"></p>


<p><img src="/files/validita/valid-css.png" alt="Validní CSS" class="border"></p>



<p>Tyto ikony odkazovaly na validátor – nástroj pro kontrolu, zda je stránka validní.</p>


<div class="external-content">
  <ul>
    <li><a href="http://validator.webylon.info/">Český validátor HTML</a> (neoficiální validátor od <b>Chamurappiho</b>)</li>
    <li><a href="https://validator.w3.org/"> Markup Validation Service</a> (oficiální HTML validátor)</li>
    <li><a href="https://jigsaw.w3.org/css-validator/">CSS Validation Service</a> (validátor CSS)</li>
  </ul>
</div>

<p>Vzhledem k tomu, že HTML a CSS jsou <b>velmi tolerantní k chybám</b> (tj. i nevalidní web se zpravidla bez vážných potíží zobrazí), někteří tvůrci webů se kdysi validitou svých stránek snažili odlišit od amatérů, pro které byla zelená hláška z validátoru těžko dosažitelná.</p>

<p><img src="/files/validita/validni.png" alt="Zelená hláška z Českého validátoru" class="border"></p>




















<p>Jelikož informace o validitě stránky návštěvníky obvykle nezajímají, zbytečné ikonky odkazující na validátor z internetu pomalu mizí. A to je dobře.</p>



<h2 id="verse">Verse (X)HTML</h2>

<p>V dřívější době bylo běžné rozlišovat pro účely validování různé verse HTML, které se stanovovaly prostřednictvím značky <a href="/doctype"><code>&lt;!doctype></code></a> na začátku kódu stránky.</p>

<p>Vzhledem k tomu, že prohlížeče nikdy různé verse HTML nerozlišovaly, od jejich uvádění se upustilo a jako <i>doctype</i> se uvádí prosté:</p>

<pre><code>&lt;!doctype html></code></pre>






<p>Uvádět tento <code>&lt;!doctype></code> se hodí zejména pro starší prohlížeče, kde slouží pro zapnutí standardního režimu.</p>

<!--<p>Časem pravděpodobně nebude nutné <i>doctype</i> uvádět vůbec, protože prohlížeče podporující režim zpětné kompatibility vymizí.</p>-->



<h3 id="xhtml">XHTML</h3>

<p>Příznivci maximálně přísných pravidel dříve dokonce psali v XHTML. To se od HTML syntaxe liší hlavně ve 2 věcech:</p>
<ol>
  <li>
    <p><b>XHTML značky</b> musí být psány malými písmeny a být uzavřené. I takové, které mají v HTML uzavírací značku <a href="/html-znacky#koncova-volitelna">volitelnou</a> – třeba <a href="/odstavec"><code>&lt;p></code></a> nebo <a href="/seznamy#li"><code>&lt;li></code></a>.</p>
    <p>Značky bez obsahu (např. <code>&lt;img></code> nebo <a href="/input"><code>&lt;input></code></a>) se uzavírají pomocí lomítka:</p>
    
    <pre><code>&lt;input name="policko"<b> /></b></code></pre>
  </li>
  <li>
    <p><b>XHTML atributy</b> musejí mít uvedenu svou hodnotu v uvozovkách. Atributy, které jsou sami o sobě hodnotou, se v XHTML potom musí psát jako <code>atribut="atribut"</code>:</p>
    
    <pre><code>&lt;input required="required"></code></pre>
  </li>
</ol>

<p>Tento zápis jde (volitelně) použít i v HTML, ale v XHTML je povinný.</p>

<p>Dokument splňující tato pravidla je potom možné parsovat jako XML.</p>


<p>V praxi se parsování XHTML pomocí XML parseru ale prakticky vůbec neuchytilo, protože:</p>

<ol>
  <li>
    <p>Jakákoliv chyba v XHTML způsobila nenačtení stránky. To se kromě chyby autora nebo zásahem do kódu ze strany provozovatele připojení mohlo stát i v případě, že se nestáhl celý XHTML kód. Nekompletní stránka je v X(HT)ML nevalidní, protože nemá uzavřené některé značky.</p>
    <p>I špatné zobrazení stránky bývá obvykle lepší než zobrazení žádné.</p>
  </li>
  <li>
    <p>Kvůli nutnosti zpracování stránky XML parserem se muselo před vykreslováním čekat na stažení celé stránky, aby šlo jasně určit, že je v pořádku.</p>
  </li>
  <li>
    <p>Některé vyhledávače měly problém s indexováním <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=13&amp;topic=33775">XHTML stránek</a>.</p>
  </li>
  <li>
    <p>V té době rozšířený <b>Internet Explorer 6</b> si s běžnou XHTML stránkou neporadil.</p>
  </li>
</ol>



<p>Kvůli těmto problémům se drtivá většina XHTML stránek neposílala s odpovídající hlavičkou:</p>

<pre><code>Content-Type: application/xhtml+xml</code></pre>



<p>Ale stejně jako běžné HTML stránky s typem <code>text/html</code>. Prohlížeče tyto rádoby XHTML weby potom zpracovávaly stejně jako obyčejné HTML. Kvůli nekompatibilitě HTML a XHTML se tyto „XHTML“ stránky potom zpracovávaly jako <i>HTML s chybami</i>, s kterými si ale prohlížeče poradily.</p>





<h2 id="musi">Musí být web validní?</h2>

<blockquote>
  <p>Nemusí.</p>
</blockquote>


<p>Validátor je ale celkem užitečný nástroj pro odhalení případných chyb, které by mohly dělat problémy. Problematické je zejména špatné zanoření značek nebo zapomenutí uzavíracího tagu:</p>

<div class="internal-content">
  <ul>
    <li><a href="/neukoncena-znacka">Jak najít neuzavřenou značku?</a></li>
  </ul>
</div>


<p>Ideální je používat HTML linter – nástroj pro okamžité zobrazování případných problémů rovnou v editoru. Existuje přímo <a href="/pluginy-sublime-text#linter">plugin do Sublime Text</a>.</p>

<p>Chyby v HTML jde tak odhalit ihned po jejich vytvoření.</p>




<h2 id="seo">Validní web a SEO</h2>

<p>Některé SEO příručky doporučují, aby HTML kód stránky byl validní.</p>



<p>Rozhodně nelze obecně tvrdit, že by validita stránky byla významným prvkem v hodnocení stránek vyhledávači. Záleží ale na typu prohřešku proti validátoru, který web obsahuje.</p>


<p>Nesprávně zanořené/ukončené značky mohou vést k špatnému zobrazení stránky a potažmo špatnému pochopení ze strany robota vyhledávače.</p>



<p>Při pouhém použití třeba neznámého atributu, je ale risiko minimální.</p>

<p>Podle vyjádření z <a href="/google">Google</a> může nevalidní kód způsobit špatné pochopení strukturovaných dat:</p>


<ul>
  <li><a href="https://www.seroundtable.com/google-html-validation-20633.html">Google: Bad HTML Validation Doesn't Hurt Rankings But Can Impact Structured Data</a> – nevalidní stránka nepoškozuje umístění ve vyhledávači</li>
  
  <li><a href="https://www.seroundtable.com/google-invalid-html-concern-21556.html">Google: Valid HTML Not Required For Ranking But Can Hurt Structured Data &amp; Mobile Friendliness</a></li>
</ul>


<h2 id="css">Validní CSS</h2>

<p>Zatímco dosáhnout validního HTML nemusí být úplně problém, u CSS je to prakticky nemožné, chce-li člověk používat novější konstrukce nebo nestandardní postupy zlepšující chování v některých prohlížečích.</p>