---
title: "Jak zjistit počet sdílení na FB a Twitteru"
headline: "Počet sdílení na Facebooku a Twitteru"
description: "Jak pomocí API získat ve JSONu počet sdílení stránky na Facebooku a Twitteru."
date: "2015-03-31"
last_modification: "2015-12-23"
status: 1
tags: ["facebook", "google-plus", "twitter"]
format: "html"
---

<p>Pro snadné sdílení adresy stránky ze strany návštěvníků na sociálních sítích jde použít přímo dostupná <a href="/sdileci-tlacitka">tlačítka pro sdílení</a>. Tato tlačítka dokáží ukazovat počet lidí, co stránku sdíleli.</p>

<figure>
  <img src="/files/pocet-sdileni/pocet-sdileni.png" alt="Zobrazení počtu sdílení" class="border">
  <figcaption>Výsledek použití nativních prvků sociálních sítí</figcaption>
</figure>


<p>Bohužel tyto prvky znamenají značnou <b>zátěž na rychlost načítání</b>, navíc provozovatelé zmíněných služeb mohou vloženými skripty šmírovat své přihlášené návštěvníky.</p>

<p>Pokud jsou počty sdílení pro návštěvníky zajímavé, nabízí se je získat jinou – méně obtěžující – cestou.</p>





<h2 id="facebook">Facebook</h2>

<p>Facebooku dokáže připravit <a href="/json">JSON</a> s potřebnými daty na adrese:</p>

<pre><code>https://graph.facebook.com/?id=<b>http://example.com</b></code></pre>



<p>Výsledek je potom ve vlastnosti <code>shares</code>:</p>

<pre><code>{
  "id": "http://example.com",
  "shares": <b>527617</b>
}</code></pre>





<p>Pro použití přímo v JavaScriptu jde předat <i>callback</i> s názvem vlastní funkce, připojit adresu jako <code>&lt;script></code>, což zavolá vlastní funkci s předanými daty. Tento postup se označuje jako <a href="/ajax#jsonp">JSONP</a> (<i>JS objekt notace s „vycpávkou“</i>).</p>

<pre><code>https://graph.facebook.com/?<b>callback</b>=<i>nazevFunkce</i>&amp;id=http://example.com</code></pre>



<p>Kromě počtu sdílení umí Facebook ukazovat i případný počet komentářů. Výsledek:</p>

<pre><code>/**/ <i>nazevFunkce</i>({
  "id": "http://example.com",
  "shares": 527617,
  "comments": 11354
});</code></pre>








<h2 id="twitter">Twitter</h2>

<p class="soft">
  U Twitteru byl postup obdobný. Zobrazení počtu sdílení bylo ale následně <b>skryto</b> a není možné se k němu dostat.
</p>

<del>

<p>U Twitteru je postup obdobný. Jen je logicky jiná adresa.</p>

<pre><code>http://urls.api.twitter.com/1/urls/count.json?url=<b>http://example.com</b></code></pre>





<p>Počet <i>sdílení</i> na Twitteru je ve vlastnosti <code>count</code>:</p>

<pre><code>{"count":12066,"url":"http:\/\/example.com\/"}</code></pre>


<p>Použití JS callbacku je totožené jako u Facebooku.</p>
</del>


<h2 id="google-plus">Google Plus</h2>

<p>Google veřejně dostupné JSON API pro získání počtu „+1“ nenabízí. Jedna možnost nejspíš bude si nechat vytvořit API klíč a použít standardní metody. Bez získávání klíče jde počet sdílení získat parsováním obsahu stránky s rychlým tlačítkem pro sdílení:</p>

<pre><code>https://plusone.google.com/u/0/_/+1/fastbutton?url=<b>http://example.com</b></code></pre>

<p><b>Počet sdílení</b> z kódu jde vytáhnout regulárním výrazem „<code>window\.__SSR = \{c: (\d*).0 ,</code>“.</p>





<h2 id="zobrazeni">Zobrazení počtu sdílení</h2>

<p>Pro maximální rychlost načítání je vhodné údaje o počtu sdílení periodicky <b>získávat CRONem</b> a ukládat do DB.</p>

<ol>
  <li>Uživatel nebude muset čekat, až se pomocí API získá počet sdílení.</li>
  
  <li>Z uložených dat půjde případně i snadno vykreslit graf sdílenosti stránky v čase.</li>
</ol>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://www.nodejs-news.com/fun-with-nodejs/monitor-social-endorsement/">Monitor social endorsement using Node.JS</a> – počítání sdílení ve spoustě sociálních sítích</li>
  
  <li><a href="https://developers.google.com/+/api/">Google+ API</a> – dokumentace HTTP API</li>
</ul>