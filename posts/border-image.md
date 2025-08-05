---
title: "Border-image"
headline: "Border-image"
description: "CSS vlastnost <code>border-image</code> slouží k vytváření obrázkových rámečků."
date: "2014-11-24"
last_modification: "2014-11-25"
status: 1
tags: ["css", "css-vlastnosti", "obrazky"]
format: "html"
---

<p>Dříve, když bylo cílem mít <b>obrázkové ohraničení textu</b>, bylo nutné celý obal rozřezat na jednotlivé části a nastavit ho jako <a href="/vice-obrazku">vícenásobné pozadí</a> nebo použít více obalových elementů.</p>

<p>Vlastnost <code>border-image</code> toto zjednodušuje.</p>



<h2 id="podpora">Podpora</h2>

<p>Obrázkový rámeček funguje od <b>IE 11</b>, <b>Firefoxu 3.5</b>, <b>Chrome 7</b> a <b>Opery 11</b>. Stará <b>Opera 12</b>, <b>Firefox 14</b> a <b>Chrome 15</b> vyžadují <a href="/css-prefixy">prefixy</a>. (Stará <b>Opera 12</b> zná pouze sdruženou prefixovanou vlastnost <code>-o-border-image</code>).</p>




<h2 id="zapis">Zápis</h2>

<pre><code>element {
  border: 10px solid black; /* standardní rámeček */
  border-image: url(ramecek.png) 20 <b>round</b>
}</code></pre>

<p>Vlastnost <code>border-image</code> je zkratka pro více dalších <code>border-image-*</code> vlastností.</p>

<p>Podmínka pro funkčnost obrázkového okraje je minimálně 1px klasický rámeček, který zároveň slouží jako <i>fallback</i> pro nepodporované prohlížeče. Může mít libovolnou barvu či styl, obrázkový rámeček jeho visuální podobu následně <b>zruší</b> – tj. nebude někde prosvítat a podobně, prostor na stránce ale zabírat bude.</p>







<h3 id="image-source"><code>border-image-source</code></h3>

<p>Připojuje obrázek, který utvoří rámeček.</p>

<pre><code>border-image-source: url(ramecek.png)</code></pre>

<p>Používá se k tomu standardní funkce <code>url()</code>, ale může to být klidně i <a href="/gradient">gradient</a>.</p>




<h3 id="image-slice"><code>border-image-slice</code></h3>

<p>Stěžejní vlastnost <b>obrázkových rámečků</b>, která určuje, jakým způsobem se obrázek nařeže.</p>

<p>Celé to funguje tak, že se obrázek pro vytvoření rámečků rozdělí na <b>9 částí</b> (4 rohy + 4 strany + prostředek) vytvořením pomyslných čtyř čar:</p>

<p><img src="/files/border-image/rez.png" alt="Rozřezání obrázku" class="border"></p>












<pre><code>border-image-slice: top right bottom left</code></pre>

<p>Hodnoty tedy mohou být čtyři – pro každou čáru jedna. Kromě toho je možné zadat hodnot méně, což způsobí <b>standardní dopočítání</b> (jako třeba u <code>margin</code>u nebo <code>padding</code>u). V případě pravidelného obrázku proto stačí uvést jen jednu vzdálenost, která bude vyhovovat všem čarám řezu.</p>

<p>Vzdálenost <i>čáry</i> od okraje se udává v:</p>

<ul>
  <li>pixelech – <b>bez uvedení jednotky</b>, tj. například <code>30</code></li>
  <li>procentech – pochopitelně s <code>%</code>, tj. například <code>30%</code></li>
</ul>

<p>Procenta se hodí hlaně pro <b>vektorové obrázky</b>, které ze své podstaty šířku nemají.</p>

<p>Zjistit hodnotu jednotlivých řezů je nejsnazší odečtením souřadnic v <b>grafickém editoru</b>.</p>

<h4 id="fill"><code>fill</code></h4>

<p>Klíčovým slovem <code>fill</code> je možné zajistit, aby byl zachován střed obrázku. Výchozí chování střed neaplikuje.</p>






<h3 id="image-width"><code>border-image-width</code></h3>

<p>Vlastnost <code>border-image-width</code> určuje šířku rámečku, která se má z řezů sestavit. Výchozí hodnota je rovna příslušné vzdálenosti řezu. Tedy pokud obrázek pro rámeček rozřízneme 10 pixelů od všech stran (<code>border-image-slice: <b>10</b></code>), je to totéž jako připsat:</p>

<pre><code>border-image-width: <b>10px</b></code></pre>

<p>Nebo:</p>

<pre><code>border-image-width: <b>auto</b></code></pre>

<p>Pozor, zde se už jednotky u pixelů uvádí. Počet hodnot může být opět 1–4 s klasickým dopočítáváním.</p>

<p>Využití úprav tloušťky obrázkového rámečku se hodí spíš u <b>vektorových obrázků</b>, kde je možné měnit rozměry obrázku bez ztráty kvality. V PNG/GIF/JPG je lepší nechat <b>výchozí skutečné rozměry</b>, případně je měnit jen minimálně.</p>

<p>Standardní tloušťka rámečku s hodnotou <code>border-image-width</code> až tak úplně nesouvisí. Hodnoty se mohou rozcházet, což způsobí v případě tenčího <code>border-width</code> než <code>border-<b>image</b>-width</code>, že rámeček bude pod obsahem.</p>








<h3 id="image-outset"><code>border-image-outset</code></h3>

<p>Pro posunutí obrázkového rámečku směrem od obsahu ven slouží vlastnost <code>border-image-outset</code>. Fungují pouze kladné hodnoty. Čím vyšší hodnota, tím je obrázkový rámeček dál od rámečku skutečného.</p>

<pre><code>border-image-outset: 10px</code></pre>

<p>Kombinace různých rozměrů <code>border-<b>image</b>-width</code> a <code>border-width</code> v kombinaci s <code>border-image-outset</code> se hodí k <b>sladění obrázkového rámečku</b> s klasickým rámečkem pro starší prohlížeče.</p>

<p><img src="/files/border-image/ozdoby.png" alt="Ozdobný rámeček" class="border"></p>
















<p>Například u výše uvedeného ozdobného obrázku asi nemá smysl, používat tlustý <code>border-width</code>, ale cílem by mělo být sjednotit umístění čar a „kudrlinky“ nechat mimo.</p>



<h3 id="image-repeat"><code>border-image-repeat</code></h3>

<p>Poslední věc je nastavení <b>opakování</b>. Jde zadat zvlášť pro <b>vodorovný</b> i <b>svislý</b> směr či pro <b>oba směry</b> zároveň jedinou hodnotou.</p>

<pre><code>border-image-repeat: vodorovně svisle;</code></pre>

<dt id="stretch"><code>stretch</code></dt>
<dd>
  <p>Obrázek se roztáhne, aby vyplnil šířku. U nevektorových obrázků použitelné jen při <b>minimální změně velikosti</b> oproti originálu. Jinak bude výsledek dost ošklivý.</p>
</dd>

<dt id="repeat"><code>repeat</code></dt>
<dd>
  <p>Obrázek se bude opakovat. Je proto potřeba, aby na sebe jednotlivé kraje <b>navazovaly</b>.</p>
</dd>

<dt id="round"><code>round</code></dt>
<dd>
  <p>Asi nejzajímavější vlastnost, která <b>zachová rohy</b> a opakuje jen obsah mezi nimi. Zde je potřeba, aby navazovaly středy. Pokud do prostoru nevyjde přesný počet opakování, přizpůsobí se velikost, aby to vycházelo.</p>
  
  <p>Z důvodu <b>přizpůsobování velikosti</b> je vhodné mít základní obrázek spíš <b>menší</b>. Může se stát, že na jedno opakování bude obrázek moc malý, ale dvě opakování budou až moc, takže se rámeček ve výsledku <b>nepěkně srazí</b>. Algoritmus pro výpočet se navíc trochu <b>liší</b> napříč prohlížeči – <b>Firefox</b> na rozdíl od <b>IE</b> a <b>Chrome</b> obrázek nezvětší nad skutečné rozměry, ale raději přidá další opakování.</p>
  
  <p><img src="/files/border-image/zvetseni.png" alt="Ukázka zvětšení" class="border"></p>
  
  <p>Kromě toho menší obrázek bude <b>datově úspornější</b>.</p>
</dd>

<dt id="round"><code>space</code></dt>
<dd>
  <p>Ještě existuje hodnota <code>space</code>, která by měla v případě toho, že rozměr nevyjde do počtu opakování, rozdělit jednotlivá opakování mezerami.</p>
  
  <p>Nezdá se mi ale, že by někde fungovala.</p>
</dd>

<p><a href="http://kod.djpw.cz/waib">Živá ukázka</a> (díky <a href="/resize"><code>resize</code></a> jde i měnit velikost)</p>
<!-- Opera 12 zná pouze sdruženou vlastnost -o-border-image, jinak http://kod.djpw.cz/vaib -->









<h2 id="generator">Generátor</h2>

<p>Pro rychlejší pochopení a vyrobení <code>border-image</code> může posloužit <b>online generátor</b>:</p>

<div class="external-content">
  <ul>
    <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Tools/Border-image_generator">Border-image generator</a></li>
  </ul>
</div>

<h2 id="zaver">Závěr</h2>

<p>Podpora v prohlížečích je s ohledem na <b>Internet Explorer</b> (<a href="/ie11">IE 11</a> a novější) nedostatečná. Navíc se v roce 2014 používá místo <b>dekorativní grafiky</b> spíše flat design, případně se <i>kreslí v CSS</i> – <a href="/box-shadow">stíny</a>, <a href="/border-radius">kulaté rohy</a> a podobně, takže se člověk se situací, kdy by využil obrázkový rámeček zase tak často nesetká.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>W3C: <a href="http://dev.w3.org/csswg/css-backgrounds/#border-images">Border Images</a></li>
  
  <li>DevDocs: <a href="http://devdocs.io/css/border-image"><code>border-image</code></a></li>
</ul>