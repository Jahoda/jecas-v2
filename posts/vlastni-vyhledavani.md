---
title: "Vyhledávání na vlastním webu"
headline: "Vyhledávání na vlastním webu"
description: "Jak umožnit návštěvníků vyhledávat na vlastním webu."
date: "2015-10-07"
last_modification: "2015-10-07"
status: 0
tags: []
format: "html"
---

<p>U rozsáhleší obsahové stránky už přestává stačit <b>navigace pomocí odkazů</b> a je pro uživatele snazší požadovaný obsah na stránce <b>vyhledat</b>.</p>

<p>Hranice, kdy uvažovat o přidání funkce <i>Hledat</i>, může být někde u vyšších desítek stránek.</p>

<p>Kromě toho, že možnost hledání usnadní návštěvníků najít požadovaný obsah, existuje ještě jedna výhoda – z <b>hledaných spojení</b> lze vydedukovat, jaký obsah by návštěvníky zajímal. Proto je dobré <b>hledané výrazy</b> zaznamenávat:</p>

<div class="internal-content">
  <ul>
    <li>Google Analytics: <a href="/ga-mereni#vyhledavani">Měření interního vyhledávání</a></li>
  </ul>
</div>



<h2 id="google">Použít Google</h2>

<p>Asi nejsnazší je pro prohledávání webu použít <a href="/google">Google</a>. Dobře udělaný a populárnější web Google indexuje velmi rychle, takže není problém pomocí něho veškerý obsah dohledat.</p>


<h3 id="vyhody-google">Výhody</h3>

<ul>
  <li>Snadná implementace (nemusí se nic programovat).</li>
  
  <li>Nenáročnost na vlastní server.</li>
  
  <li>Řazení podle relevance.</li>
</ul>

<p>Hledání pomocí Google lze implementovat minimálně <b>3 způsoby</b>:</p>




<h3 id="odkaz">Odkaz na vyhledávání</h3>

<p>Pro <b>prohledání určité domény</b> jde ve vyhledávání použít operátor „<code>site:</code>“.</p>

<p>Následující dotaz najde „css“ na tomto webu:</p>

<pre><code>css site:jecas.cz</code></pre>



<p>Stačí tak na základě <b>hodnoty z vyhledávacího pole</b> připravit adresu pro <b>výsledky hledání</b>:</p>

<pre><code>https://www.google.cz/search?q=<b>css</b>%20<i>site:jecas.cz</i></code></pre>


<p>Případně sestavit <b>parazitní formulář</b>:</p>

<p>Ten se odešle na adresu <code>https://www.google.cz/search</code> a předá se mu:</p>

<ul>
  <li>Hledaný výraz z políčka nazvaného <code>q</code>.</li>
  <li>Adresa stránky skrytým políčkem <code>sitesearch</code>:
    <pre><code>&lt;input name="sitesearch" value="jecas.cz" type="hidden"></code></pre>
  </li>
</ul>

<p>Ukázka (hledání se otevře do nového okna):</p>

<div class="live">
  <form action="https://www.google.cz/search" target="_blank">
    <label>Hledat: <input name="q"></label>
    <input name="sitesearch" value="jecas.cz" type="hidden">
    <button>Hledat na Google</button>
  </form>
</div>


<h3 id="cse">Google Custom Search</h3>

<p>Personalisovaných výsledků hledání jde docílit pomocí <b>Google Custom Search</b>:</p>

<div class="external-content">
  <ul>
    <li>Google: <a href="https://cse.google.cz/cse/">Vlastní vyhledávač</a></li>
  </ul>
</div>

<p>Tuto službu jde použít dvěma způsoby:</p>

<ol>
  <li>
    <p>Vložit JS kód od Google na vlastní stránku.</p>
    
    <div class="live" style="min-height: 20em">
<script>
  (function() {
    var cx = '005154510265796145973:3qn0hgidqzu';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
</script>
<gcse:search></gcse:search>  
</div>
  </li>
  <li>
    <p>Z vyhledávacícho formuláře posílat návštěvníky na zvláštní stránku:</p>
    
    <pre><code>https://cse.google.com/cse?<b>cx</b>=005154510265796145973:3qn0hgidqzu&amp;q=css</code></pre>
    
    <p>Podstatný je parametr <code>cx</code>, který identifikuje vlastní vyhledávání.</p>
    
<div class="live">
  <form action="https://cse.google.com/cse" target="_blank">
    <label>Hledat: <input name="q"></label>
    <input name="cx" value="005154510265796145973:3qn0hgidqzu" type="hidden">
    <button>Custom Search</button>
  </form>
</div>    
  </li>
</ol>

<p>Vzhled výsledků vyhledávání lze <b>personalisovat</b>. K disposici jsou i statistiky vyhledávání a podobně.</p>


<h3 id="api">Google Search API</h3>

<p>Pro vlastní integraci Google vyhledávání jde použít API.</p>

<p>Získat JSONP s daty jde následovně:</p>

<pre><code>http://ajax.googleapis.com/ajax/services/search/web?v=1.0&amp;q=<b>css%20site%3Ajecas.cz</b>&amp;hl=cs&amp;rsz=large&amp;callback=<b>vlastniFunkce</b>&amp;context=req1</code></pre>

<p>Pro hodně hledání denně (uvádí se 100) bude nejspíš nutné použít placenou versi, u které se bude používat API klíč:</p>

<div class="external-content">
  <ul>
    <li>Google Custom Search: <a href="https://developers.google.com/custom-search/json-api/v1/overview">Custom Search JSON/Atom API</a></li>
  </ul>
</div>


<h2 id="vlastni">Vlastní vyhledávání</h2>

<p>Vyhledávání vytvořené vlastnoručně nebo jako součást redakčního systému má také své výhody:</p>

<ol>
  <li>
    <p><b>Hledávní v reálném čase</b>. Nemusí se čekat ani chvilku, až se obsah zaindexuje.</p>
  </li>
  
  <li>
    <p>Prohledávání <b>soukromých dat</b>. Aby Google stránky zaindexoval, musí být veřejně přístupné. Hledávní v některých oblastech stránky může být nuté vázat na oprávnění hledajícího.</p>
  </li>
  
  <li>
    <p><b>Rychlejší odezva</b> v případě vlastního vyhledávání umožní hledat již v průběhu, co návštěvník zadává hledané slovo.</p>
  </li>
  
  <li>
    <p><b>Pokročilé filtrování</b> – jde nastavit přesná kriteria, co se má najít. V případě diskusního fóra jde například <b>omezit hledání</b> dle data příspěvku, jeho autora a kategorie.</p>
  </li>
  
  <li>
    <p><b>Výsledky vyhledávání</b> mohou obsahovat více informací (obrázky, výzvy k akci atd.) než jen úryvek se zvýrazněným hledaným slovem jako v případě Google.</p>
  </li>
</ol>


<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>Web Design Ledger: <a href="http://webdesignledger.com/search-interface-design">30 Examples of Website Search Interface Design</a></li>
</ul>