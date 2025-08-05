---
title: "Meta tag viewport"
headline: "Značka <code>&lt;meta name=viewport></code>"
description: "K čemu používat <code>&lt;meta></code> tag <code>name=viewport</code>."
date: "2013-06-28"
last_modification: "2015-08-16"
status: 1
tags: ["html", "html-tagy", "responsive", "webove-prohlizece"]
format: "html"
---

<p>Dává smysl pro <a href="/responsivni-web">responsivní weby</a>, jelikož prohlížeče v chytrých telefonech a tabletech běžně <b>zobrazují web „zmenšený“</b>, aby byl celý vidět, a do čitelné velikosti si jej musí zvětšit až sám uživatel.</p>

<p><b>Běžné použití</b>:</p>

<pre><code>&lt;meta name="viewport" content="width=device-width,initial-scale=1"></code></pre>





<h2 id="proc">Proč <code>&lt;meta></code> viewport?</h2>

<p>Takový mobilní prohlížeč v orientaci na výšku má například skutečnou šířku 480 px, ale tváří se, že má třeba 1024 px. Web se potom vykreslí v rozlišení 1024 pixelů a je <b>zmenšen</b> na 480, aby měl návštěvník po načtení přehled o celé stránce a mohl si následně přiblížit, co potřebuje.</p>



<p>Meta tagem <code>&lt;meta name=viewport&gt;</code> jde <i>přemluvit</i> k jinému chování. To se hodí u responsivních webů, kdy není nutné, aby prohlížeč <b>předstíral vyšší rozlišení</b>.</p>



<p>Docílit toho lze zadáváním určitých parametrů do atributu <code>content</code>. Pro kombinaci více vlastností je stačí oddělit čárkami.</p>


<dl>
  <dt><code>width=device-width</code></dt>
  
  <dd>
    <p>Za <code>=</code> se zadává buď přesná hodnota v pixelech bez jednotek (pokud je web udělán na nějaké přesné rozlišení), nebo <code>device-width</code>, což je skutečná šířka zařízení.</p>
    
    <pre><code>&lt;!-- šířka 480 px --&gt;
&lt;meta name="<i>viewport</i>" content="<b>width=480</b>"&gt;</code></pre>  
    
    
    <p>Stavět web pro <b>přesnou šířku</b> je v době obrovské rozmanitosti rozlišení značně problematické. Lepší je šířku nastavit podle zařízení.</p>
    
    <pre><code>&lt;!-- šířka dle zařízení --&gt;
&lt;meta name="<i>viewport</i>" content="width=<b>device-width</b>"&gt;</code></pre>
    
    
    <p>Správné zobrazení na malém displeji se potom zajistí v CSS. To se typicky dělá s využitím <a href="/mobilni-web#media-queries">Media Queries</a>.</p>  
    
  </dd>    
  
  
  <dt><code>initial-scale=1</code></dt>
  
  <dd>
    <p>Měřítko, ve kterém se web automaticky zobrazí. Měřítko 1:1 je <code>initial-scale=<b>1</b></code>, vyšší hodnoty jsou zvětšení, menší zmenšení. Stránku nebývá možné zmenšit pod stanovené měřítko, proto je dobré jej zvolit tak, aby stránka nebyla zbytečně velká.</p>
    
    <p>Měřítko na <code>1</code> bývá dobré nastavit i při kombinaci s <code>width=device-width</code>. Bez něj může nastat problém s elementy, které jsou mimo plochu – třeba navigace, co „odtlačuje“ obsah.</p>
  </dd>
  
  
  <dt><code>maximum-scale=5</code></dt>
  
  <dd>
    <p>Maximální zvětšení. Zadáním hodnoty <code>0.1</code> vytvoříme nečitelný a nezvětšitelný web. :–) Analogicky funguje <code><b>min</b>imum-scale</code>.</p>
  </dd>
  
  <dt><code>user-scalable=no</code></dt>
  
  <dd>
    <p>Zabránění měnit velikost.</p>
  </dd>
</dl>



<h2 id="pouziti">Co a kdy použít?</h2>

<p>Na stránce, která má CSS styly pro malé displeje, je osvědčené:</p>

<pre><code>&lt;meta name="viewport" content="width=device-width,initial-scale=1"></code></pre>

<p>Změnou ostatních hodnot lze lehce zlepšit zážitek z běžného webu bez vytváření speciálních CSS pravidel. Při špatném použití ale také výrazně zhoršit (nezmenšitelná nebo nezvětšitelná stránka).</p>





<h2 id="zmena">Změna měřítka stránky</h2>

<p>U <b>stránek s fixními rozměry</b> (třeba šířka 960 pixelů) se může nabízet vyřešit zobrazení na mobilu tak, že se změní měřítko.</p>

<p>Problém je v tom, že různá zařízení mají <b>různá rozlišení</b>, takže je nemožné odlišné měřítko od 1:1 nastavit, aby <b>fungovalo universálně</b>.</p>

<p>Teoreticky by šlo <b>měřit rozlišení JavaScriptem</b> a podle toho nastavovat měřítko. Jde ale spíš o nouzové a ne moc dobré řešení – se skutečným responsivním webem půjde dosáhnout lepších výsledků.</p>

<div class="internal-content">
  <ul>
    <li><a href="/prevod-responsivni-design">Jak předělat web na responsivní</a> – postupy, jak ze starého webu udělat responsivní</li>
  </ul>
</div>

<!--
<li>
  
								Safari 9 now has a 
  <a href="http://jsbin.com/fubunucopi/4/edit?html,output">
    <code>shrink-to-fit: no</code>
     property in the viewport
  </a>
  <sup class="po" id="note-5">
    <a href="#5">5</a>
  </sup>
   meta element 
  <a href="https://www.reddit.com/r/web_design/comments/3la04p/psa_safari_on_ios9_has_a_media_query_bug/">
    as the 
    <code>initial-scale</code>
     property has been changed on purpose
  </a>
  <sup class="po" id="note-6">
    <a href="#6">6</a>
  </sup>
   in the new WebKit version.			
</li>
-->


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Vzhůru dolů: <a href="http://www.vzhurudolu.cz/prirucka/viewport-windows">Viewport na Windows 8 a 8.1</a></li>
</ul>