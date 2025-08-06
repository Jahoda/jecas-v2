---
title: "Odkazy ze starých článků"
headline: "Odkazy ze starých článků"
description: "Do starých článků je dobré doplňovat odkazy na související nový obsah."
date: "2015-12-24"
last_modification: "2015-12-25"
status: 1
tags: ["napady", "odkazy", "seo"]
format: "html"
---

<p>U webu, kde postupně vzniká nový obsah, je poměrně běžné, že nové články obsahují <b>interní odkazy</b> na relevantní starší články.</p>

<p>V případě navazujících zápisků na blogu může úvod čtvrtého článku vypadat následovně. Obsahuje <a href="/odkaz">odkazy</a> na předchozí obsah, aby si ho mohl návštěvník pohodlně dočíst:</p>

<figure>
<p><img src="/files/odkazy-starsi-stranky/zpet.png" alt="Odkazy na předchozí články" class="border"></p>
  <figcaption>
    Zdroj příkladu: <a href="http://mariorozensky.cz/jak-jsem-temer-zkrachoval-lidi/">Jak jsem téměř zkrachoval: Lidi</a>
  </figcaption>
</figure>








<p>Zvládnout <b>interní prolinkování</b> na starší obsah nebývá problém. Horší je to ale opačně…</p>



<h2 id="vstupni-stranka">Vstupní stránka</h2>

<p>Na rozdíl od skutečné návštěvy v živém světě, která přijde hlavními dveřmi, návštěvníci na webových stránkách přichází často pověstným <i>okýnkem na záchodě</i>, kudy je pošle třeba vyhledávač.</p>

<p>Každá stránka by tedy měla být připravená na to, že ji návštěvník uvidí jako první z celého webu.</p>

<p>Je-li proto daná stránka prvním dílem jakési série, je dobré, aby obsahovala odkazy na své pokračování, aby návštěvník věděl <i>kam dál</i>.</p>





<h2 id="seo">Vliv interních odkazů na SEO</h2>

<p>Kromě lepšího zážitku pro návštěvníky a potenciálně delší dobu strávenou na webu mají interní odkazy positivní dopad na umístění ve <a href="/seo">vyhledávačích</a>.</p>



<p>Na novou stránku ze začátku nevedou zpětné odkazy. Díky přidání interních odkazů ze starší stránek se vyhledávač dozví, že je nový obsah něčím důležitý.</p>


<p>K interním odkazům se v <a href="http://www.lukaspitra.cz/dusan-janovsky-o-fulltextovem-vyhledavani-na-seznam-cz-3-cast/">rozhovoru o fulltextovém vyhledávání</a> vyjádřil <b>Dušan Janovský</b> ze <a href="/seznam">Seznamu</a> následovně:</p>

<blockquote cite="http://www.lukaspitra.cz/dusan-janovsky-o-fulltextovem-vyhledavani-na-seznam-cz-3-cast/">
  <p>Budování interních odkazů. To je aktivní i důležité. Veledůležité.</p>
  
  <p>…</p>
  
  <p>Když se dívám do debugu rozhovacích stromů, které používáme pro výpočet relevance, vidím, že se odkazové signály nejčastěji točí kolem velmi nízkých hodnot. Jinak řečeno hlavní rozhodování většinou zní, zda stránka má alespoň jeden zaindexovaný zpětný odkaz (interní i externí), plus pár dalších podmínek.</p>
</blockquote>





<h2 id="odkazy">Odkazy ze starších stránek</h2>

<p>Pokud existuje <b>série článků</b>, mělo by být v silách slušnějšího <a href="/cms">redakčního systému</a> zajistit přehled s odkazy na všechny články oběma směry:</p>

<ul>
  <li>z novějších na starší</li>
  <li>ze starších na novější</li>
</ul>



<p><a href="http://jimmyhayek.cz/"><b>Jakub Hájek</b></a> doporučuje pro <a href="/wordpress">WordPress</a> doplněk <b>Serial Posts</b>.</p>

<p>V případě, že nejde o sérii článků, ale zkrátka třeba nejnovější <i>„článek A“</i> detailněji popisuje termín použitý v <i>článcích B, C a D</i>, je automatické řešení odkazů obtížnější.</p>



<p>Když se odkazování ze starších článků neřeší, je zpravidla vidět značný nepoměr mezi počtem odkazů v nových a starých článcích, protože ve starých článcích v době jejich vydání nebylo ještě kam odkazovat.</p>



<h3 id="rucni">Ruční hledání starých článků</h3>

<p>Nejpracnější řešení, které ale dosáhne pravděpodobně nejlepších výsledků, je <b>ruční vyhledávání</b>.</p>

<p>Po publikování nového obsahu si autor článku vyhledá na webu klíčová slova, kterými se zabývá nová stránka. Z nalezených stránek potom vybere ty relevantní a na vhodná místa se doplní odkaz.</p>

<p>Znamená to po vytvoření nové stránky zapřemýšlet, odkud by se na ní dalo odkázat a <b>dát si práci s přidáním odkazů</b>.</p>

<p>Najít staré stránky, kam by šlo přidat odkaz, jde pomocí <b>interního hledání</b> v redakčním systému nebo s využitím <a href="/google">Googlu</a> nebo Seznamu při použití operátoru <code>site</code>:</p>

<pre><code>fytopuf site:jecas.cz</code></pre>



<p>U statických stránek by prohledání obsahu souborů měl nabízet <a href="/windows-programy#text">textový editor</a>.</p>

<p>Pro obsah uložený v DB slouží <a href="/sql">SQL</a> dotaz typu:</p>

<pre><code>SELECT * FROM clanky WHERE text LIKE '%fytopuf%'</code></pre>



<h3 id="neexistujici-odkazy">Odkazy na zatím neexistující stránky</h3>

<p>Tento způsob používá třeba <b>Wikipedie</b>. Pokud autor cítí, že by nějaké slovní spojení mělo mít samostatnou stránku, vytvoří na něj odkaz.</p>

<p><img src="/files/odkazy-starsi-stranky/wiki.png" alt="Odkazy na neexistující článek" class="border"></p>










<p>Redakční systém potom sám pozná, jestli odkazovaná stránka už existuje. Podle toho se do výsledného HTML (ne)přidá odkaz. Nemusí to být přímo jako na Wikipedii, kde jsou odkazy na neexistující stránky zobrazeny a odlišeny jinou barvou.</p>

<p>Výhoda tohoto postupu je v tom, že může existovat <b>přehled hesel</b>, pro která by se hodilo stránku vytvořit (vede na ně hodně odkazů).</p>




<h3 id="nahrazeni">Automatické nahrazení odkazem</h3>

<p>K článku se uvede klíčové slovo nebo slova, kterými se zabývá. Skript potom může projít staré texty a automaticky v nich výskyty slova nebo slovního spojení <b>nahradit odkazy na nové stránky</b>.</p>

<p>Problematické chování jde očekávat u homonym (stejně píšící se slova jiného významu). U češtiny je potom problém se skloňováním. Naštěstí ale není takový problém uvést pouze začátek slova a dát skriptu trochu volnosti.</p>

<p>Občas se stane, že bude odkazovat i slovo, kde to zrovna není žádoucí, protože se v daném kontextu týká něčeho jiného.</p>

<p>Ve WordPressu k tomu jde použít plugin <b>Internal Link Building</b>, který na zadaná klíčová slova dokáže automaticky doplnit požadované odkazy.</p>

<p><img src="/files/odkazy-starsi-stranky/internal-linkbuilding.png" alt="Odkazy na neexistující článek" class="border"></p>
















<h3 id="stitky">Štítky (tagy)</h3>

<p>Tagy umožňují asi nejlepší vyjádření vztahů mezi stránkami. Příbuzné stránky jde potom najít pod společným štítkem.</p>

<p>Použití tagů sice nezajistí přímo odkazy v textu starých článků na nové, ale jde někde bokem vypsat související stránky právě na základě shodných štítků.</p>




<h2 id="narocnost">Náročnost na výkon</h2>

<p>Automatická řešení pro doplňování odkazů na články nebo vypisování podobných článků bývá u hodně položek relativně hodně <b>náročné na výkon</b>.</p>


<p>Většinou je zbytečné třeba odkazy do textu doplňovat při každém načtení stránky, ale nabízí se finální obsah cacheovat.</p>

<p>Související články, je-li jejich výpis hodně náročný a není možné je cacheovat, se potom mohou třeba načítat asynchronně <a href="/ajax">AJAXem</a>, aby nezdržovaly zobrazení hlavního obsahu.</p>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Lukáš Havrlant: <a href="http://programio.havrlant.cz/jak-vytvarim-interni-odkazy/">Jak vytvářím interní odkazy</a></li>
</ul>