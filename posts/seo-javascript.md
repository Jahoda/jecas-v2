---
title: "Indexování JavaScriptu"
headline: "Indexování JavaScriptu"
description: "Jak se vyhledávače Google a Seznam vypořádají s obsahem v JavaScriptu. Dokáží takový obsah indexovat?"
date: "2016-03-14"
last_modification: "2016-03-22"
status: 1
tags: ["js", "napady", "seo"]
format: "html"
---

<p>Mezi webmastery se má obecně za to, že JavaScript není moc přívětivý pro vyhledávače a textový obsah by tak měl mít na JS nezávislou alternativu.</p>


<p>Je možné se setkat i s názory typu:</p>

<blockquote>
  <p>Vyhledávač vidí stránku jako při vypnutí CSS a JavaScriptu.</p>
</blockquote>

<p>Skutečnost je ale trochu jiná…</p>






<h2 id="google">Google</h2>

<p>Google v květnu 2014 oznámil, že jeho robot zpracovává JavaScript a CSS podobně jako prohlížeč běžného návštěvníka:</p>

<div class="external-content">
  <ul>  <li><a href="https://webmasters.googleblog.com/2014/05/understanding-web-pages-better.html">Understanding web pages better</a> – Googlebot interpretuje JS a CSS</li></ul>
</div>

<p>Z tohoto důvodu je vhodné, aby web v souboru <code>robots.txt</code> neblokoval pro Googlebota soubory s externími styly a skripty. Některé weby to dělají kvůli snížení zátěže na server vyvolaný roboty, Google ale v takovém případě dostane o stránce zkreslený výsledek.</p>



<h3 id="ajax">Indexování AJAXu</h3>

<p>Kvůli provádění JS nemá robot Google problém ani s <a href="/ajax">AJAXem</a>. Není tak už nutné používat postup s <a href="/zmena-url#hash">_escaped_fragment_</a>, na který si vyhledávač převedl URL s <i lang="en">hasbangem</i> (<code>example.com/<b>#!</b>url</code>).</p>


<div class="external-content">
  <ul>  <li><a href="https://webmasters.googleblog.com/2015/10/deprecating-our-ajax-crawling-scheme.html">Deprecating our AJAX crawling scheme</a></li></ul>
</div>


<p>Díky podpoře JavaScriptu jsou tak na Google normálně indexovány například komentáře ze služeb typu <a href="/komentare#sluzby">Disqus nebo Facebook</a>, které se bez JavaScriptu vůbec nezobrazí.</p>



<h3 id="skryty">Skrytý obsah</h3>

<p>Interpretace JavaScriptu/CSS může mít kromě positivních efektů i své stinné stránky. Například kvůli tomu robot Google nemusí zaindexovat obsah, který se zobrazí až po kliknutí.</p>

<p>Jde o různé přepínání obsahu v záložkách nebo sbalení obsahu pod tlačítko <i>Zobrazit více</i>.</p>

<p>Důvod je prostý – uživatel tento obsah po příchodu na stránku neuvidí, a to moc není v zájmu vyhledávače, protože to vypadá jako jeho chyba. Více v samostatném článku:</p>

<div class="internal-content">
  <ul>
    <li><a href="/skryty-text">Google a skrytý text</a></li>
  </ul>
</div>




<h3 id="podpora">Co z JS Google umí?</h3>

<p>Nezdá se, že by interpretace JavaScriptu v podání Googlebota byla odlišná od běžného prohlížeče.</p>

<p>Google tak nemá problém s:</p>

<ul>
  <li>přesměrováním pomocí JavaScriptu,</li>
  <li>dynamicky přidávaným obsahem (včetně AJAXu),</li>
  <li>odkazy fungujícími pouze s JavaScriptem,</li>
  <li>dynamickou změnou titulku stránky</li>
</ul>


<p>Test věci, se kterými si Google poradí:</p>

<div class="external-content">
  <ul>
    <li><a href="http://searchengineland.com/tested-googlebot-crawls-javascript-heres-learned-220157">We Tested How Googlebot Crawls Javascript And Here’s What We Learned</a></li>
  </ul>  
</div>



<h2 id="seznam">Seznam</h2>

<p>Pokud je pro web zajímavá návštěvnost z vyhledávání na Seznamu, na weby funkčních pouze s JavaScriptem je lepší zapomenout.</p>

<p>Seznambot vlivy JavaScriptu a CSS na stránku při standardním indexování téměř ignoruje. Zeptal jsem se na to <b>Yuhůa</b>:</p>

<blockquote>
  <p>Seznam momentálně javascript zpracovává málo. V plánu je rozšíření
indexování javascriptu, ale s dlouhým výhledem.</p>
  
  <p>To, co nyní děláme, se omezuje na některé typy jednoduchých
přesměrování. Jako že třeba jednoduše zapsané <code>location.replace</code> poznáme
a interpretujeme jako přesměrování.</p>
  
  <p class="autor">— <b>Yuhů</b></p>
</blockquote>





<p>Dynamický obsah přidaný na stránku skriptem tedy dohledatelný nebude.</p>


<p>Za jednu z dalších schopností Seznambota lehce související s indexováním AJAXových aplikací lze považovat podporu hashbangu (nejde ale o příliš doporučovaný postup):</p>

<div class="external-content">
  <ul>
    <li><a href="http://napoveda.seznam.cz/cz/ajax-indexace/">Indexace AJAX pomocí hashbang</a></li>
  </ul>
</div>


<p>JavaScript a CSS svým způsobem plně interpretuje <a href="/nahled-seznam">Screenshotátor</a> – zvláštní robot Seznamu sloužící ke snímání screenshotů stránek, které se potom zobrazují ve výsledcích hledání.</p>



<h2 id="uzivatele">Uživatelé</h2>

<p>I v případě podpory JS ze strany všech relevantních vyhledávačů je vhodné brát ohledy na lidské návštěvníky.</p>

<p>JavaScript může v některých případech selhat nebo se nestihnout načíst a je hloupé, když kvůli tomu nebude dostupný textový obsah, který by se bez JS obešel.</p>

<p>Jistější postup tak je zobrazovat obsah co nejstabilnější cestou (HTML) a JavaScriptem řešit jen rozšiřující funkce, co nejsou úplně kritické.</p>

<p>Více v článku:</p>

<div class="internal-content">
  <ul>
    <li><a href="/bez-javascriptu">Má web fungovat bez JavaScriptu?</a></li>
  </ul>
</div>