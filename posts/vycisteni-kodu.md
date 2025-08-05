---
title: "Pročištění HTML kódu"
headline: "Pročištění a opravení „prasáckého“ HTML"
description: "Jak z WYSIWYG editorů (jako třeba Word, starší TinyMCE/CKEditor) vytvořit rozumný a sémantický HTML kód."
date: "2013-05-26"
last_modification: "2013-06-05"
status: 1
tags: ["hotova-reseni", "napady", "wysiwyg"]
format: "html"
---

<p>Takový kód pro <i>nadpis</i> s odstavcem může vypadat následovně.</p>

<pre><code>&lt;p class=MsoNormal style='margin-bottom:12.0pt;line-height:normal'>&lt;b>&lt;span
style='font-size:14.0pt'><b>Nadpis</b>&lt;/span>&lt;/b>&lt;/p>

&lt;p class=MsoNormal style='margin-bottom:12.0pt;line-height:normal'>&lt;span
style='font-size:14.0pt'><i>Běžný text.</i>&lt;/span>&lt;/p></code></pre>






<p>Tedy plno všelijakých stylů, ze kterých je cílem dostat něco jako:</p>
  
<pre><code>&lt;h1>Nadpis&lt;/h1>
&lt;p>Běžný text.&lt;/p></code></pre>





<p>Pro podobnou potřebu existují hotové nástroje, takže není potřeba vymýšlet nějaké komplikované regulární výrazy pro odstraňování nežádoucích atributů a podobně. (I když <a href='http://djpw.cz/148716'>i to je možné</a>.)</p>

  

<h2 id=purifier>HTML Purifier</h2>

<p><a class=button href='http://htmlpurifier.org/demo.php'>Demo</a></p>
  
<p>Jedná se o hodně kvalitní nástroj, který lze snadno široce konfigurovat (přesně si navolit, které značky a atributy mají projít, lze upravovat relativní a absolutní adresy), navíc zajišťuje 100% vyhovující HTML výstup (nehrozí neuzavřené nebo překřížené značky a podobně).</p>

<p>Hodně přísný zápis povolených značek a atributů může vypadat takto: <code>p,b,a[href],i,br,img[src],ul,ol,li,table,tr,td</code></p>

<p>Příklad:</p>

<pre><code>require_once 'HTMLPurifier/Bootstrap.php';
spl_autoload_register(array('HTMLPurifier_Bootstrap', 'autoload'));

$config = HTMLPurifier_Config::createDefault();
$config->set('HTML.Allowed', 'p,b,a[href],i,br,img[src],ul,ol,li,table,tr,td');
$config->set('AutoFormat.RemoveEmpty', true);
//$config->set('URI.Base', 'http://www.example.com');
//$config->set('URI.MakeAbsolute', true);

$purifier = new HTMLPurifier($config);
$clean_html = $purifier->purify($dirty_html);</code></pre>



















<h2 id=texy>Texy!</h2>

<p>Není to sice primární účel, ale tento nástroj jde použít i k <b>opravě a kontrole</b> nad HTML kódem. Nenabízí tak pohodlnou konfiguraci jako HTML Purifier, ale zase je tato knihovna datově menší a rychlejší.</p>

<p><a class="button demo" href='http://texy.info/cs/try'>Demo</a></p>

<p>Příklad:</p>

<pre><code>require_once '/Texy/Texy.php';
$texy = new Texy();
$texy->setOutputMode(Texy::HTML5);
$texy->allowedTags =
    array(
        'p','b','i','br','ul','ol','li','table','tr','td',
        'a' => array('href'),
        'img' => array('src'),
    );
$texy->allowed = array('html/tag' => true);
$clean_html = $texy->process($dirty_html);</code></pre>














<p>Nevýhody Texy! pramení z toho, že je určen primárně k <b>něčemu jinému</b>.</p>

<p>Hlavní rozdíl je v <b>nevyhazování neznámých značek</b> (atributy se vyhazují). Texy! je převede na entity, takže se budou v textu zobrazovat. U ukázky na začátku zase z podivných důvodů nechá element <code>&lt;span></code>.</p>

<p>Výhoda spočívá v poměrně zdařilých typografických úpravách, které Texy nabízí (pokud se zakomentuje <code>$texy->allowed = array('html/tag' => true);</code>).


  
  
  
  

  <h2 id=ruce>Ruční úpravy</h2>

<p>Takto se lze dobrat k slušnějšímu kódu.</p>

<pre><code>&lt;p&gt;&lt;b&gt;Nadpis&lt;/b&gt;&lt;/p&gt;
&lt;p&gt;Běžný text.&lt;/p&gt;</code></pre>




<p>A nezbývá než si vytvořit regulární výrazy, které kód vylepší do finální podoby.</p>

<p>Vytvoření nadpisu může být náhrada <code>&lt;p>&lt;b>(.*)&lt;/b>&lt;/p></code> za <code>&lt;h1>$1&lt;/h1></code>.</p>  
  
<p>Testovat, zda regulární výrazy fungují, lze pohodlně v editoru <a href='/sublime-text'>Sublime Text</a> po stisknutí <kbd>Ctr</kbd> + <kbd>H</kbd>.
  
<p><img class=border src='/files/vycisteni-kodu/st-regexp.png' alt='Regulární výrazy v ST2'>
  
  
  
  
  
  
  
  

<p><b>Poznámka</b>: Někdy může být lepší provádět tyto ruční úpravy nad nepročištěným kódem.</p>



<h2 id="odstraneni-mezery">Odstranění mezer</h2>

<p><a href="http://php.vrana.cz/odstraneni-mezer-z-html-dokumentu.php">Hotová funkce</a> odstraňující mezery z HTML kódu (bere ohled na blokové/inline značky a speciální elementy jako <code>&lt;pre></code>). Kromě toho uzavírá <a href="/html-znacky#koncova-volitelna">nepovinné značky</a> a také uzavírá všechny <b>hodnoty atributů</b> do uvozovek.</p>
  


<h2 id=pozor>Na co si dát pozor</h2>

<p>Vstup od uživatele, je-li umožněno zadávat HTML, by <b>vždy</b> měl nějakým obdobným nástrojem být ošetřen; neošetření představuje <a href="/bezpecnost">bezpečnostní nebo jiné risiko</a>. Mezi bezpečnostní patří např. vložení škodlivého skriptu, mezi jiná rozhození webu (třeba i neúmyslnou) chybou.</p>