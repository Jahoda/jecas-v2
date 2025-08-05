---
title: "Náhled webu na Twitteru"
headline: "Náhled odkazu na Twitteru"
description: "Jak u odkazu na Twitteru zobrazit jeho náhled?"
date: "2013-05-09"
last_modification: "2013-05-17"
status: 1
tags: ["twitter"]
format: "html"
---

<p><img src="/files/nahled-twitter/twitter-cards-test.png" alt="Obrázek finálního zobrazení náhledu na Twitteru" class=border></p>


















<p>Lze použít tzv. <a href="https://dev.twitter.com/docs/cards">Twitter Cards</a>, tedy:</p>
<ol>
<li>přidat pár <code>&lt;meta&gt;</code> značek s informacemi pro Twitter,</li>
<li><a href="https://dev.twitter.com/docs/cards/validation/validator">vyzkoušet si</a>, zda to správně funguje,</li>
<li>vyplnit pár údajů a požádat o schválení,</li>
<li><b>počkat několik dní, možná týden</b> (tento web čekal 8 dní).
</ol>
<p>Pokud se už na webu používají <code>og:*</code> značky pro sdílení na Facebooku, použijí se, není tedy nutno je duplikovat.</p>
<p>Meta značky funkční napříč těmito sociálními sítěmi mohou být:</p>
<pre><code>&lt;meta name="twitter:card" content="summary"&gt; 
&lt;meta name="twitter:site" content="@Jahoda"&gt;
&lt;meta name="twitter:creator" content="@Jahoda"&gt;
&lt;meta property="og:url" content="{link //this}"&gt; 
&lt;meta property="og:title" content="{include #title}"&gt; 
&lt;meta property="og:description" content="{$description}" n:ifset="$description"&gt;
&lt;meta property="og:image" content="{$image}" n:ifset="$image"&gt;</code></pre>
<p>(Ukázka je z šablony Latte z Nette Frameworku.)</p>
<h3>Co umí Twitter oproti Facebooku navíc?</h3>
<p>Podporuje více formátů náhledů. </p>
<p><img src="/files/nahled-twitter/twitter-cards.png" alt="Možnosti Twitter „karet“"></p>
<ol>
<li>Popis,</li>
<li>produkt,</li>
<li>fotografie,</li>
<li>popis se velkým obrázkem,</li>
<li>videopřehrávač,</li>
<li>galerie obrázků.</li>
</ol>