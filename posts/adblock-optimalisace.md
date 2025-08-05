---
title: "Optimalisace pro AdBlock"
headline: "Optimalisace pro AdBlock"
description: "Jak stránku optimalisovat, aby ji nerozbilo blokování reklam AdBlockem."
date: "2016-01-20"
last_modification: "2016-02-16"
status: 1
tags: ["napady", "reklama", "webove-prohlizece"]
format: "html"
---

<p>Blokování reklam je mezi internetovými uživateli celkem populární. Třeba na tomto webu ji blokuje přibližně 25 % návštěvníků, ačkoliv tu reklama prakticky není.</p>

<blockquote>
  <p>Lidé neblokují reklamu u konkrétního webu na základě toho, že by je reklama obtěžovala, ale universálně u všech stránek.</p>
</blockquote>

<p>Jak počet blokování změřit popisuje následující článek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/podil-adblocku">Měření blokování reklam v Google Analytics</a></li>
  </ul>
</div>


<p>K tomu, že web bez reklam rozbije AdBlock plugin, tak přijde webmaster jako slepý k houslím. Na vině jsou nejspíš provozovatelé webů, kteří svůj web totálně zaneřádili reklamou.</p>

<p><img src="/files/adblock-optimalisace/lupa-ads.png" alt="Reklama na Lupě" class="border"></p>














































<p>Nezbývá než <i>se s tím smířit</i> a agresívní filtry AdBlocku obejít. Pluginy blokující reklamy nejsou moc tolerantní a s radostí zablokují i obsah bez reklamy, takže i u webu bez reklam je dobré zkontrolovat, že ho AdBlock kvůli něčemu nerozbíjí.</p>




<h2 id="priklady">Příklady zablokování</h2>

<p>Jak konkrétně se AdBlock může projevit:</p>



<h3 id="subdomena">Subdoména <b>ads</b>l.wia.cz</h3>

<blockquote cite="https://www.facebook.com/jecas.cz/posts/1017945931600456?comment_id=1018275368234179&reply_comment_id=1021202857941430&comment_tracking=%7B%22tn%22%3A%22R%22%7D">
  <p>Kdysi jsem dělal web http://adsl.wia.cz a spousta lidí jej vůbec neviděla (subdoména začíná na ads) a bylo to neskutečný WTF zážitek. Vyřešeno přechodem na dsl.wia.cz</p>
  
  <p class="autor">– <a href="https://www.facebook.com/jecas.cz/posts/1017945931600456?comment_id=1018275368234179&reply_comment_id=1021202857941430&comment_tracking=%7B%22tn%22%3A%22R%22%7D">Tomáš Kapler</a></p>
</blockquote>

<h3 id="reklamace">URL „<b>reklama</b>ce“</h3>

<blockquote cite="https://twitter.com/petrsoukup/status/689517513139490817">
  <p>AdBlock nám kdysi zkomplikoval život, když blokoval ajax požadavky na url /admin/reklamace/* (asi kvůli "reklama")</p>
  
  <p class="autor">– <a href="https://twitter.com/petrsoukup/status/689517513139490817">Petr Soukup</a></p>
</blockquote>



<p>Aby AdBlock odstranil co největší množství reklam, používá celkem důmyslné filtry. Kromě podezřelých adres obsahujících „ad“ nebo „reklama“ blokuje i obsah na základě HTML kódu.</p>

<p>Dát jako třídy HTML elementů nebo adresy obrázků názvy typu: ad, ads, adv, advert, advertisement, banner nebo banners tak není úplně dobrý nápad.</p>

<p>Bohužel totéž platí i pro české prostředí a CSS třídy / názvy souborů typu „<code>reklama</code>“.</p>


<p>Některé AdBlocky jsou rafinované do té míry, že zablokují i <code>&lt;img></code> obrázky obsahující rozměr typické pro bannery. Následující obrázek tak může být zablokován.</p>

<pre><code>&lt;img src="obrazek-468x60.png"></code></pre>






<h2 id="obejit">Jak obejít AdBlock</h2>

<p>Na základě znalosti filtrů pro blokování reklam jde snadno vytvářet reklamy, které automaticky zablokovány nebudou. Je potřeba se vyvarovat:</p>


<ol>
  <li>
    <p>CSS třídám a identifikátorům <b>s reklamou v názvu</b>. Čeští uživatelé používají české AdBlock filtry, takže je potřeba dávat pozor kromě angličtiny i v češtině.</p>
  </li>
  
  <li>
    <p>URL obsahujícím slovo „reklama“. Česky i anglicky (<i>ad*</i>).</p>
  </li>
  
  <li>
    <p>Rozměrům v URL typických pro bannery. Tedy například: 745 × 100, 468 x 60, 250 x 250, 88 x 31 a podobně.</p>
  </li>
</ol>

<p>V každém případě je dobré si pro otestování stránky do nějakého <a href="/webove-prohlizece">prohlížeče</a> rozšíření <a href="https://adblockplus.org/en/">Adblock Plus</a> nainstalovat a podívat se, jestli blokovač reklamy neblokuje normální obsah nebo nějak stránku nerozbíjí.</p>