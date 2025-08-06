---
title: "Text-decoration"
headline: "Text-decoration"
description: "Vlastnost <code>text-decoration</code> slouží k „vyzdobení“ běžného textu."
date: "2014-11-16"
last_modification: "2018-06-25"
status: 1
tags: ["css", "css-vlastnosti"]
format: "html"
---

<p>Z historických má <code>text-decoration</code> dva režimy.</p>

<ol>
  <li>
    <p>Ve své původní podobě umožňuje <span style="text-decoration: underline">podtržení</span>, <span style="text-decoration: overline">nadtržení</span>, <span style="text-decoration: line-through">přeškrtnutí</span> a v <b>Opeře 12</b> <span style="text-decoration: blink">blikání</span>. Kromě blikání funguje napříč prohlížeči.
    </p>
  </li>
  
  <li>
    <p>V novější podobě funguje v <b>Chrome 57</b>, <b>Opeře 44</b> a s <a href="/css-prefixy">prefixy</a> ve <b>Firefoxu 6+</b> a <b>Safari 7.1+</b> jako <i>zkratka</i>. V těchto prohlížečích <code>text-decoration</code> zahrnuje další vlastnosti:</p>
    
    <ul>
      <li><code>text-decoration-color</code></li>
      <li><code>text-decoration-line</code></li>
      <li><code>text-decoration-style</code></li>
    </ul>
  </li>
</ol>


<h2 id="puvodni">Původní <code>text-decoration</code></h2>

<p>Symbolický zápis původní podoby vypadá následovně:</p>

<pre><code>element {
  text-decoration: <b>styl</b> (nebo víc stylů);
}</code></pre>


<dl>
  <dt id="none"><code>text-decoration: none</code></dt>
  <dd>
    <p>Zruší <i>dekoraci</i> textu. Často se používá u odkazů, když jsou zvýrazněny jinak než podtržením (třeba jako <a href="/odkaz-tlacitko">tlačítko</a>).</p>
  </dd>
  
  <dt id="underline"><code>text-decoration: underline</code></dt>
  <dd>
    <p><span style="text-decoration: underline">Podtrhne</span> text. Obecně není moc dobré texty kromě odkazů podtrhávat, protože uživatelé bývají zvyklí, že právě <b>podtržení značí odkaz</b>. Navíc podtržení textu snižuje <b>čitelnost</b>.</p>
    
    <p>Někdy se podtrhávání odkazů řeší tak, že se <code>text-decoration</code> vypne a podtržení zajistí spodní rámeček (<code>border-bottom</code>) nebo obrázek (<code>background</code>). Umožňuje si to lépe pohrát se vzdáleností podtržení od textu nebo vytvořit jinou <b>barvu</b> podtržení než textu — s <code>text-decoration: underline</code> to jde jen pomocí vnořeného elementu (<a href="https://kod.djpw.cz/iohb">ukázka</a>).</p>
    
    <p>Kromě odkazů jsou ve výchozím stylu podtrženy i značky <code>&lt;u></code> a <code>&lt;ins></code>.</p>   
    
    <p>Občas se používá, když něco, co není odkaz, má <b>jako odkaz vypadat</b> a spouštět nějakou JavaScriptovou akci.</p>
  </dd>
  <dt id="overline"><code>text-decoration: overline</code></dt>
  <dd>
    <p><span style="text-decoration: overline">„Čára“</span> nad slovem. Těžko najít využití. Na nějakém webu jsem to viděl použité pro označení odkazů. Raději bych zůstal u zažitého <b>podtržení</b>.</p>
    
    <p>Dle komentáře od uživatele <b>odpad</b> se (<code>overline</code>) dost hodí u značení signálů (v elektrotechnice) – jako negovaný vstup/výstup.</p>
  </dd>
  <dt id="line-through"><code>text-decoration: line-through</code></dt>
  <dd>
    <p><span style="text-decoration: line-through">Přeškrtnutý</span> text.</p>
    
    <p>Výchozí vzhled přeškrtnutí mají i značky  <a href="/s"><code>&lt;s></code></a> , <code>&lt;del></code> a <code>&lt;strike></code>.</p>
    
    <p>Využití se moc nenabízí. Když má být něco přeškrtnuté, bývá vhodné použít přímo HTML značku – <code>&lt;del></code> nebo <code>&lt;s></code> v závislosti na případu užití.</p>
  </dd>
  <dt id="blink"><code>text-decoration: blink</code></dt>
  <dd>
    <p>Podpora blikání byla z prohlížečů s ohledem na (ne)příjemnost blikání pro uživatele <b>odebrána</b>. Totéž se týká i blikání značky <code>&lt;blink></code>.</p>
    
    <p>Nahradit se dá například CSS animací pomocí vlastnosti <code>animation</code> nebo JavaScriptovým časovačem. Příklady jsou na <a href="http://en.wikipedia.org/wiki/Blink_element">Wikipedii</a>.</p>
  </dd>
</dl>






<h3 id="skladani">Skládání dekorací</h3>

<p>Jednotlivé <i>dekorace</i> jde skládat, takže jde vytvořit text, který je <span style="text-decoration: underline overline line-through">podtržený, přeškrtnutý i nadtržený</span> (<a href="https://kod.djpw.cz/johb">ukázka</a>).</p>


<h2 id="nove">Nové <code>text-decoration</code></h2>

<p>V novější podobě je <code>text-decoration</code> zkratka pro <code>text-decoration-<b>něco</b></code> vlastnosti.</p>

<pre><code>element {
  text-decoration: 
    [text-decoration-line] 
    [text-decoration-style]
    [text-decoration-color]
}
</code></pre>











<h3 id="line"><code>text-decoration-line</code></h3>

<p>Původní hodnoty <code>text-decoration</code> se staly součástí vlastnosti <code>text-decoration-<b>line</b></code>. Je tedy shodné s <i>původním</i> <code>text-decoration</code>.</p>



<h3 id="style"><code>text-decoration-style</code></h3>

<p>Udává styl čáry z <code>text-decoration-line</code>.</p>


<ul>
  <li><code>solid</code> — výchozí  <span style="text-decoration: underline;-moz-text-decoration-style: solid; -webkit-text-decoration-style: solid; text-decoration-style: solid">čára</span></li>
  <li><code>double</code> — dvojitá  <span style="text-decoration: underline;-moz-text-decoration-style: double; -webkit-text-decoration-style: double; text-decoration-style: double">čára</span></li>
  <li><code>dotted</code> — tečkovaná <span style="text-decoration: underline;-moz-text-decoration-style: dotted; -webkit-text-decoration-style: dotted; text-decoration-style: dotted">čára</span></li>
  <li><code>dashed</code> — čárkovaná <span style="text-decoration: underline;-moz-text-decoration-style: dashed; -webkit-text-decoration-style: dashed; text-decoration-style: dashed">čára</span></li>
  <li><code>wavy</code> — <span style="text-decoration: underline;-moz-text-decoration-style: wavy; -webkit-text-decoration-style: wavy; text-decoration-style: wavy">vlnovka</span></li>  
</ul>

<p><a href="https://kod.djpw.cz/kohb">Samostatná ukázka</a> (nepodporuje <b>Edge</b>/<b>IE</b> a starší verse ostatních prohlížečů)</p>


<h3 id="color"><code>text-decoration-color</code></h3>

<p>Jedná se o nastavení barvy čáry. Díky tomu lze elegantně řešit problém různé barvy odkazu a podtržení (<a href="https://kod.djpw.cz/nohb">ukázka</a>).</p>

<p>Případně v kombinaci s <code>text-decoration-style: wavy</code> konečně vytvořit <b>podtržení červenou vlnovkou</b> bez nutnosti používat obrázek.</p>


<div class="live">
  <span style="text-decoration: underline; text-decoration-style: wavy; text-decoration-color: red">Text podtržený červenou vlnovkou</span>
</div>


<h3 id="skip"><code>text-decoration-skip</code></h3>

<p>Hodně užitečná vlastnost, která dlouhou dobu chyběla. Umožňuje nepodtrhnout mezery slov nebo části písmen, které se nyní <b>kříží s podtržením</b>.</p>

<p><img src="/files/text-decoration/preskrtnuti-pismen.png" alt="Přeškrtnutí písmen" class="border"></p>

<p>S <code>text-decoration-skip: ink</code> vypadá podtržení následovně:</p>

<p><img src="/files/text-decoration/nepreskrtnuti-pismen.png" alt="Nepřeškrtnutí písmen" class="border"></p>








<p>Podporuje <b>Chrome 57</b> a <b>Opera 44</b>. Dále potom od <b>Chrome 64</b> a <b>Opery 51</b> (konec <a href="https://www.chromestatus.com/feature/5631679087509504">ledna 2018</a>) je výchozí hodnota, která přeskakuje podtržení:</p>

<div class="live">
  <style>
  .chytre-podtrzeni {
    text-decoration: underline;
    text-decoration-skip: ink;
  }</style>
  <p class="chytre-podtrzeni">Chytré podtržení textu, kdy se podtržení vyhne písmenům.</p>
</div>

<p>Pro hezčí podtržení tedy není v těchto prohlížeči třeba nic dělat.</p>

<p>Případně jde vypnout pomocí <code>text-decoration-skip-ink: none</code>.</p>

<p>Bez <code>text-decoration-skip: ink</code> se podobného efektu dosahovalo dost krkolomně.</p>

<div class="internal-content">
  <ul>
    <li><a href="/podtrzeni">Lepší podtržení odkazu</a></li>
  </ul>
</div>
<div class="external-content">
  <ul>
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip"><code>text-decoration-skip</code></a></li>
  </ul>
</div>

<h3 id="position"><code>text-underline-position</code></h3>

<p><a href="http://dev.w3.org/csswg/css-text-decor-3/#text-underline-position-property">Specifikace</a></p>

<p>Upravuje umístění podtržení. Z výchozího stavu:</p>


<p><img src="/files/text-decoration/underline-position-alphabetic.png" alt="Výchozí posice podtržení" class="border"></p>


<p>Jde pomocí hodnoty <code>under</code> přesunout podtržení níže:</p>

<p><img src="/files/text-decoration/underline-position-under.png" alt="Nepřeškrtnutí písmen" class="border"></p>

<!-- náhled: https://kod.djpw.cz/erhb -->






<h2 id="podpora">Podpora nového podtržení v prohlížečích</h2>

<p>Podpora se postupně zlepšuje. U některých vlastností jde podporu brát jako <i lang="en">nice to have</i> – drobně zlepší uživatelských dojem v podporovaných prohlížečích bez zhoršení stavu v těch ostatních.</p>

<p>Staré prohlížeče, co znají <code>text-decoration</code> jako samostatnou vlastnost a ne zkratku, budou brát nové vlastnosti jako <b>neznámé hodnoty</b>, takže zahodí celou deklaraci (<a href="https://kod.djpw.cz/mohb">ukázka</a>).</p>

<p>Takže pro to, aby se zobrazila alespoň <b>základní čára</b>, je nutné zdvojení jako například u <a href="/rgba"><code>rgba()</code> barev</a>.</p>

<pre><code>element {
  text-decoration: underline;
  text-decoration: underline double;
}</code></pre>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS tricks: <a href="https://css-tricks.com/more-control-over-text-decoration/">More Control over Text Decoration</a></li>
</ul>