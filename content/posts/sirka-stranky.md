---
title: "Jak zvolit šířku stránky"
headline: "Jak široký web udělat"
description: "Jakou zvolit optimální šířku webové stránky."
date: "2015-02-24"
last_modification: "2015-09-22"
status: 1
tags: ["napady", "responsive", "rozliseni"]
format: "html"
---

<p>Při navrhování <b>šířky rozložení webu</b> je nutné vycházet z požadavků na obsah a dostupnou plochu na typických zařízení.</p>

<p>Nejpoužívanější je v roce 2015 rozlišení <b>1366 × 768 pixelů</b>.</p>


<h2 id="historie">Pohled do historie</h2>


<h3 id="rok-2005">2005</h3>
<p>V dávných dobách bylo stanovení šířky stránky poměrně jednoduché. Většina lidí měla 15" nebo 17" monitory s <b>rozlišením 800 × 600</b> nebo 1024 × 768 pixelů. Nějaké místo zabrala rolovací lišta, takže se webu dala šířka třeba <b>750 pixelů</b> a bylo hotovo.</p>






<h3 id="rok-2010">2010</h3>

<p>Později 15 palcové monitory s rozlišením 800 × 600 vymřely a rozšířily se <b>Full HD monitory</b> (1920 × 1080 px).</p>

<p><img src="/files/sirka-stranky/fullhd.png" alt="Stránka ve FullHD monitoru" class="border"></p>




































<p>Dále vyšší prodeje notebooků vedly k rozšíření jejich typického širokoúhlého rozlišení <b>1366 × 768</b>.</p>

<p>Nejmenší běžnou šířkou se stalo 1024 pixelů, takže se webu zadala <b>šířka 960 pixelů</b> a bylo hotovo.</p>

<p>Hodnoty šířek se <b>nevymýšlely náhodně</b>, ale volila se taková čísla, co jsou dobře dělitelná pro <b>vytváření přesné mřížky</b>. Třeba zrovna 960 je beze zbytku dělitelné čísly 2, 3, 4, 5, 6 a 8.</p>


<h3 id="rok">2015</h3>

<p>Následně se hodně rozšířila <b>mobilní zařízení</b> s menšími displeji schopná relativně slušně zobrazovat webové stránky.</p>

<p>Podíly jednotlivých rozlišení se obrovským způsobem <b>rozdrobily</b>. Pro příklad na tento web zavítalo posledních 20 000 návštěvníků z <b>450 různých rozlišení</b>.</p>

<p><img src="/files/sirka-stranky/responsive.png" alt="Stránka v různých zařízeních" class="border"></p>




























<p>Běžně se tak používají rozlišení od <b>240 pixelů</b> po Ultra HD rozlišení <b>3840 × 2160 pixelů</b>.</p>

<p>Používané uhlopříčky jsou potom od 1.5" u chytrých hodinek po desítky palců u velkých monitorů nebo televisí.</p>

<p><img src="/files/sirka-stranky/screen-size.png" alt="Stránka v různých zařízeních" class="border"></p>











































<p>V podstatě tak nezbývá než web dělat <a href="/responsive">responsivní</a>, aby se všem možným rozlišením přizpůsobil.</p>



<h2 id="nejpouzivanejsi">Nejpoužívanější rozlišení</h2>

<p>Přestože jde díky <b>responsivnímu designu</b> zajistit, aby se stránka dobře zobrazovala na celé plejádě zařízení, hodí se znát podíly jednotlivých rozlišení, aby šlo stanovit, <b>jaká velikost stránky má být nejvíce vypiplaná</b>, protože ji bude používat nejvíce lidí.</p>


<p>Podle Toplistu to vypadá v roce 2015 následovně a nejčastější rozlišení jsou:</p>

<ol>
  <li><b>1366 × 768</b></li>
  <li>1280 × 768</li>
  <li>1152 × 864</li>
  <li>1280 × 960</li>
  <li>1920 × 1080</li>
</ol>


<p>U mobilů potom kraluje <b>320 × 480</b>.</p>

<figure>
  <img src="/files/sirka-stranky/rozliseni.png" alt="Vývoj podílu rozlišení" class="border">
  <figcaption>Vývoj rozlišení v ČR v letech 2014–2015 podle <a href="https://www.toplist.cz/global/history/resolution/">Toplistu</a></figcaption>
</figure>
<!-- http://www.toplist.cz/stat/?a=history&type=3 -->






























<h2 id="fullhd">Stránka ve Full HD</h2>

<p>Ačkoliv by poměrně početná skupina návštěvníků mohla mít na monitoru stránku ve Full HD (1920 pixelů na šířku), většinou se tak široké stránky nedělají.</p>



<p>Pro <b>dobrou čitelnost souvislého textu</b> není dobré mít delší řádky než cca 80 znaků – to je v závislosti na velikosti a stylu písma něco kolem <b>600 pixelů</b>.</p>


<p>Na Full HD monitor by se tak vešly v podstatě tři stránky textu vedle sebe.</p>


<p>Pro zaplnění tak velkého prostoru často není vhodný obsah, takže se stránky dělají užší.</p>


<p>Extrémní situace někdy nastává u <b>postupu mobile first</b>, kdy webový tvůrce u zobrazení pro mobily a tablety v podstatě také skončí a na velkém monitoru je zbytečně vidět pouze úzká nudle i v případě, že by dávalo smysl použít více sloupců. Vznikne nakonec spíš <a href="/mobile-first#mobile-only">mobile only</a>.</p>





<h2 id="best-practice">Best practice</h2>

<p>Pokud se rozvržení stránky (sloupce) navrhne chytře v procentech (s použitím <a href="/responsivni-mrizka">responsivní mřížky</a>), je změna maximální šířky otázka úpravy jedné hodnoty v CSS:</p>

<pre><code>.obal {
  max-width: 1300px;
}</code></pre>

<p>Při menším rozlišení se zkrátka stránka automaticky přizpůsobí dostupnému místu.</p>

<p>Protože většinou bývá nejpoužívanější rozlišení <b>1366 × 768</b>, používám ho jako primární. Samozřejmě v případech, kdy je prostor čím smysluplným vyplnit.</p>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://baymard.com/blog/responsive-upscaling">Responsive Upscaling: 11 Ideas for Large-Screen E-Commerce Design</a> – optimalisace stránky pro velké obrazovky</li>
</ul>