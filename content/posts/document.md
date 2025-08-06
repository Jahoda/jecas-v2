---
title: "CSS pravidlo @document"
headline: "CSS pravidlo <code>@document</code>"
description: "CSS pravidlo <code>@document</code> umí omezit platnost CSS na určité URL."
date: "2014-10-09"
last_modification: "2014-10-09"
status: 1
tags: ["css", "css-pravidla"]
format: "html"
---

<h2 id="podpora">Podpora</h2>

<p>Funguje zatím pouze ve <b>Firefoxu</b> (od verse 6) s <a href="/css-prefixy">prefixem</a>.</p>



<h2 id="zapis">Zápis</h2>

<p>Následující styl bude použit pouze na doméně <code>jecas.cz</code>.</p>

<pre><code><b>@document</b> domain(jecas.cz) {
    h1 {color: red}
}</code></pre>

<p><a href="https://kod.djpw.cz/gfgb">Živá ukázka</a></p>

<p>Kromě omezení na <code>domain</code> existují i omezení na <b>přesnou URL</b>, <b>začátek URL</b> nebo <b>regulární výraz</b>.</p>


<dl>
  <dt id="url"><code>url</code></dt>
  <dd>
    <p>Styly se aplikují jen a pouze na stránce <code>http://example.com/presna</code>.</p>
    
    <pre><code>@document <b>url</b>(http://example.com/presna) {
  /* pravidla */
}</code></pre>
  </dd>
  
  <dt id="url-prefix"><code>url-prefix</code></dt>
  <dd>
    <p>Styly se aplikují na všech adresách, které začínají na řetězec v <code>url-prefix</code>. Tedy například adresa <code>http://example.com/presne/cokoliv</code> bude vyhovovat.</p>
    
    <pre><code>@document url<b>-prefix</b>(http://example.com/presne) {
  /* pravidla */
}</code></pre>    
  </dd>
  
  <dt id="domain"><code>domain</code></dt>
  <dd>
    <p>Styly se aplikují na všech stránkách určené <b>domény</b> i <b>subdomény</b>.</p>

    <pre><code>@document <b>domain</b>(example.com) {
  /* pravidla */
}</code></pre>       
  </dd>
  
  <dt id="regexp"><code>regexp</code></dt>
  <dd>
    <p>Poslední možnost je zadat <b>regulární výraz</b>, kterému musí adresa vyhovovat.</p>
    
    <p>Regulární výraz musíme obalit uvozovkami. Následující pravidlo se tak aplikuje jen na URL, které obsahují řetězec „kod“.</p>
    
    <pre><code>@document <b>regexp</b>(".*kod.*") {
  /* pravidla */
}</code></pre>      
  </dd>
</dl>


<h3 id="kombinace">Kombinování</h3>

<p>V případě, že daný blok CSS má <i>fungovat</i> na různých adresách, jde výše uvedené funkce kombinovat (oddělit je čárkou).</p>

<pre><code>@document 
  url(http://example.com/presna),
  url-prefix(http://example.com/presne),
  domain(example.com),
  regexp(".*kod.*")
{
  /* pravidla */
}</code></pre>

<p>Tato pravidla se proto použijí ve všech případech, kdy vyhoví <b>alespoň jedno pravidlo</b>. Používat nějaké logické operátory typu <code>and</code> nebo <code>or</code> možné není.</p>


<h2 id="vyuziti">Využití</h2>

<p>Hlavní využití se nabízí pro <b>uživatelské styly</b>, které mají platit jen na určitých adresách. Ale i v běžném použití by se <code>@document</code> mohl hodit, šlo by tak snížit risiko nechtěného přibíjení si pravidel pro různé stránky.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>W3C: <a href="http://www.w3.org/TR/2011/WD-css3-conditional-20110901/#at-document">Document queries: the ‘@document’ rule</a></li>
</ul>