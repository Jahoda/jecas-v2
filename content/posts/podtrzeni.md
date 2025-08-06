---
title: "Lepší podtržení odkazu"
headline: "Lepší podtržení odkazu"
description: "Jak si vytvořit hezčí podtržení textu odkazu, než je výchozí."
date: "2014-11-15"
last_modification: "2018-01-22"
status: 1
tags: ["css", "hotova-reseni", "napady", "odkazy"]
format: "html"
---

<p>Odkazy na webových stránkách je většinou <b>vhodné podtrhávat</b>. Standardní podtržení vlastností <a href="/text-decoration"><code>text-decoration</code></a> ale nenabízí příliš možností <b>upravení vzhledu</b>.</p>

<p>S podtržením vytvořeným pomocí <code>text-decoration: underline</code> není v podstatě možné nic moc dále dělat.</p>

<p>Řešení je tuto <i>dekoraci</i> vypnout a <b>podtržení</b> si zajistit po svém.</p>




<h2 id="vlastni">Vlastní podtržení</h2>

<p>Existuje spousta možností, jak vlastní podtržení realisovat, například:</p>

<ol>
  <li>
    <p>Rámečkem pod odkazem – <code>border-bottom</code>.</p>
    
    <pre><code>a {
  text-decoration: none;
  border-bottom: 1px solid;
}</code></pre>
    
    <p>Bez uvedení barvy se použije <a href="/currentcolor">aktuální barva</a>. <a href="https://kod.djpw.cz/niib">Ukázka</a>.</p>
  </li>
  
  <li>Stínem <a href="/box-shadow"><code>box-shadow</code></a> (<b>IE 9+</b>). <a href="https://kod.djpw.cz/llib">Ukázka</a>.</li>
  
  <li>
    <p>Podtržení vytvořit <b>obrázkem na pozadí</b>. Nemusí se jednat o skutečný obrázek – jde použít i <a href="/gradient">gradient</a>.</p>
  </li>
  
  <li>
    <p>Pseudo-elementem <code>:before</code>/<code>:after</code>, který se <a href="/position#absolute">absolutně naposicuje</a> podle odkazu. Problém tohoto řešení bude s <b>delšími odkazy</b>, které by se rozdělily na dva řádky. Bude nutné zakázat jejich <a href="/zalamovani-slov">zalamovaní</a>.</p>
  </li>
</ol>

<h2 id="preskrtnuti">Přeškrtnutí písmen</h2>

<p>Ne úplně hezky může působit skutečnost, že podtržení přeškrtává písmena, která sahají pod <b>úroveň řádku</b>.</p>

<p><img src="/files/text-decoration/preskrtnuti-pismen.png" alt="Přeškrtnutí písmen" class="border"></p>

<p>Vyřešit tuto situaci jde přidáním <a href="/text-shadow">stínu textu</a> v barvě pozadí, který podtržení <b>překryje</b>.</p>

<pre><code>a {
  text-shadow: 2px 0 #fff, -2px 0 #fff;
}</code></pre>

<p>Toto řešení půjde použít pouze v případě, že je <b>pozadí jednolité</b>.</p>

<p><a href="https://kod.djpw.cz/siib">Živá ukázka</a></p>

<!--
<p><a href="https://kod.djpw.cz/kmhb">Živá ukázka</a></p>


<h2 id="starsi-prohlizece">Starší prohlížeče</h2>

<p>Při použit</p>-->




<h2 id="text-decoration-skip"><code>text-decoration-skip</code></h2>

<p>Do budoucna počítá <b>CSS specifikace</b> s možnostmi ovlivnit výchozí podtržení pomocí <i>nové</i> vlastnosti <code>text-decoration</code>.</p>

<ul>
  <li><a href="/text-decoration#color"><code>text-decoration-color</code></a> – přímé nastavení barvy podtržení</li>
  
  <li><a href="/text-decoration#skip"><code>text-decoration-skip</code></a> – umožní nepřeškrtnout pod řádek sahající písmena</li>
  
  <li><a href="/text-decoration#position"><code>text-underline-position</code></a> – umožní přesun podtržení až pod písmena sahající pod úroveň řádku</li>  
</ul>




<p>Podpora v prohlížečích se pomalu rozšiřuje.</p>



<h2 id="skip-ink">Nepřeškrtnutí s <code>text-decoration-skip: ink</code></h2>

<p>Zvlášť hezká je možnost zbavit se ošklivého přeškrtávání písmen při podtržení.</p>

<img src="/files/text-decoration/nepreskrtnuti-pismen.png" alt="Nepřeškrtávání písmen" class="border">







<p>Prohlížeče <b>Chrome 57</b> a <b>Opera 44</b> (a novější verse) už si vystačí s prostým:</p>

<pre><code>a {
  text-decoration-skip: ink;    
}</code></pre>






<p>Není tak potřeba používat různé hacky, pro zamaskování podtržení okolo písmen. <a href="https://kod.djpw.cz/ixlc">Ukázka</a>.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>CSS-Tricks: <a href="https://css-tricks.com/styling-underlines-web/">Styling Underlines on the Web</a></li>
  <li>Sitepoint: <a href="http://www.sitepoint.com/secret-underlined-links-dont-sting-eyes/">The Secret to Underlined Links That Don’t Sting Your Eyes?</a></li>
  
  <li>Adam Schwartz: <a href="https://eager.io/blog/smarter-link-underlines/">Smarter Link Underlines For Every Website</a></li>
  
  <li><a href="https://medium.com/designing-medium/crafting-link-underlines-on-medium-7c03a9274f9#8e94-7f28cf83d214">Crafting link underlines on Medium</a></li>
</ul>