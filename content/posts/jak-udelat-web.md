---
title: "Jak udělat web v roce 2020"
headline: "Jak udělat web v roce 2020"
description: "Existuje mnoho způsobů, jak vytvořit webovou stránku. Klikací online služby, CMS, generátory statických stránek a další."
date: "2020-02-12"
last_modification: "2020-02-12"
status: 0
tags: []
format: "html"
---

<p>Když jsem cca před 20 lety zkoušel vytvořit webovou stránku a dostat ji na internet, existovaly asi 2 běžné zůsoby:</p>

<ul>
  <li>
    <p>Napsat stránku v <b>obyčejném HTML</b> v textovém editoru.</p>
  </li>
  <li>
    <p>Použít <a href="/wysiwyg">WYSIWYG editor</a> <b>Microsoft FrontPage</b> a web tam <i>naklikat</i> jako ve <b>Wordu</b>.</p>
  </li>
</ul>

<p>Protože psaní v čistém HTML znamenalo u větších webů nutnost neustále rozkopírovávat společné části (hlavička, menu, apod.) napříč všemi soubory nebo používat nepraktické <a href="/ramy">rámy</a>, zpopularisovalo se spousta řešení, jak si práci ulehčit s ohledem na potřeby i technické dovednosti.</p>


<h2 id="wysiwyg">WYSIWYG programy</h2>

<p>Microsoft FrontPage, Macromedia (nyní Adobe) Dreamweaver, Nvu, Microsoft Expression Web – dnes už, snad s výjimkou Dreamweaveru, mrtvé programy, které umožňovaly <i>naklikání</i> celé visuální podoby webu i pohodlné psaní obsahu ve WYSIWYG prostředí.</p>

<p>Pro vývojáře znalé HTML a CSS nabízely i lepší či horší editory pro psaní přímo ve zdrojovém kódu.</p>

<p>A nakonec díky vlastním šablonám, dokázaly řešit aktualisace společných částí stránky a výsledný <b>statický HTML výstup</b> nahrát přes FTP na web.</p>









<h2 id="php">Skládání stránek v PHP</h2>

<p>S rozšířením <a href="/php">PHP</a> se potom situace dost změnila. Najednou bylo možné přejmenovat <code>index.html</code> na <code>index.php</code> a při zachování funkcionality mít k disposici běžné konstrukce programovacích jazyků.</p>

<p>Zejména velmi populární funkci <code>include</code> pro vkládání společných kousků stránek.</p>

<div class="internal-content">
  <ul>
    <li><a href="/include">Jednoduchý web v PHP</a></li>
  </ul>
</div>




<p>Pořád je tento postup jeden z nejjednodušších a nejvýkonnějších.</p>


<h2 id="php-frameworky">PHP frameworky</h2>

<p><a href="/nette">Nette</a>, Symfony, Laravel – PHP frameworky umožnující pohodlnější psaní v PHP. Jedná se o osvědčený způsob, jak vytvářet stránky <i>na míru</i>.</p>

<p>Ačkoliv PHP původně vzniklo jako šablonovací systém, součástí frameworků bývají pokročilejší šablonovací systémy, které vypadají míň jako programování a nabízejí úspornější a čitelnější zápis.</p>

<p>Příklad z šablonovacího systému Latte:</p>

<pre><code>&lt;ul n:if="$items">
{foreach $items as $item}
  &lt;li id="item-{$iterator->counter}">{$item|capitalize}&lt;/li>
{/foreach}
&lt;/ul></code></pre>









<p>Výhodné na používání PHP frameworků je fakt, že fungují na obyčejném hostingu za pár korun.</p>

<p>Tím, že PHP beží na straně serveru, jsou stránky dobře přístupné vyhledávačům (<a href="/seznam">český Seznam</a> si narozdíl od <a href="/google">Googlu</a> s JavaScriptem pořád moc neporadí).</p>

<p>Kromě toho jsou podobně jako statické stránky nenáročné na hardware návštěvníka, protože veškeré výpočty a logika probíhá na straně serveru.</p>




<h2 id="js">JS frameworky React, Vue.js atd.</h2>

<p>Poslední léta se hodně rozšiřuje JavaScript. Zvlášť v oblasti frontendu bývá dnes zvykem vytvářet web v nějakém JS frameworku.</p>

<p>Po zlatých časech knihovny jQuery se jedná většinou o React nebo Vue.js.</p>

<p>Vznikají v nich <a href="/spa">SPA</a> (<i lang="en">single page aplikace</i>), které komunikují s nějakým API pro čtení a ukládání dat. To API potom může být napsatné třeba v PHP, node.js nebo u výkonově náročných věcí v Golangu.</p>

<p>Výhoda těchto aplikací (udělají-li se dobře) je ve lepší interaktivitě. Logika aplikace (kromě zdroje dat – API) se stáhne k návštěvníkovi do prohlížeče. Pro každou uživatelskou akci, která by změnila podobu rozhraní, tak není nutné komunikovat se serverem.</p>

<p>Například Vue.js má podobně jako PHP frameworky docela dobrý šablonovací systém (byť ne tak dobrý jako Latte):</p>

<pre><code>&lt;ul v-if="items">
  &lt;li :id="`item-&amp;{i}`" v-for="(item, i) in items" :key="i">
    {{ item | capitalize }}
  &lt;/li>
&lt;/ul></code></pre>












<p>Oproti Reactu je výhoda, že validní HTML kód je zároveň validní Vue.js šablona.</p>

<h2 id="amp">AMP</h2>

<h2 id="cms">Redakční systémy / CMS</h2>

<p>S PHP se i hojně rozšířily redakční systémy, anglickou zkratkou CMS (<i lang="en">content management system</i>, tedy systém pro správu obsahu). A ať se přizná vývojář, který žádný ne(na)psal…</p>

<p>Asi nejznámnější je <a href="/wordpress">WordPress</a>. Ať už se jedná o blog, magasin, obsahovou stránku, wiki nebo e-shop, na pár kliknutí jde nainstalovat na obyčejný levný PHP hosting, vybrat si (zdarma nebo placenou) šablonu a na pár kliknutí ji nainstalovat v administraci.</p>

<p>Obsah se potom tvoří přes relativně povedený visuální editor obdobný Wordu.</p>

<p>Jedná se o asi nejjednodušší způsob, jak bez technickcých znalostí rozjet web s pohodlně spravovatelným a editovatelným obsahem a mít nad tím kontrolu (= běží to na hostingu, který mám pod kontrolou).</p>









<h2 id="online">Klikací online nástroje</h2>

<p>Protože všechno jde zjednodušit a usnadnit, existují služby, které rovnou hostují vlastní CMS (nebo třeba klidně ten WordPress).</p>

<p>Člověk se tak nemusí starat o hosting, kde bude systém provozovat, a v případě problémů hledat a platit někoho, kdo je dokáže vyřešit.</p>

<p>Tyto služby většinou fungují za nějaký měsíční/roční poplatek, často je lze provozovat i zdarma výměnou za reklamu, která se na tak vytvořeném webu zobrazuje.</p>

<p>Web je pořád možné provozovat na vlastní doméně, takže v případě výpadku / zrušení / změny podmínek dané služby není člověk úplně ztracen.</p>

<p>Pokud má stránku zálohovanou, může ji obnovit jinde.</p>

<p>Vybrat toto řešení je vhodné zejména pro lidi, co neumí nebo nechtějí řešit nic navíc než vytvoření hezkého obsahu.</p>








<h2 id="social">Obsah na sociálních sítích</h2>

<p>Velkým rozšířemí sociálních sítí hodně lidem odpadla potřeba vlastního webu. Proč si vytvářet vlastní blog, když jde příspěvek napsat na Medium, <a href="/facebook">Facebook</a> nebo <a href="/twitter">Twitter</a>.</p>

<p>K čemu dělat webovou stránku např. restaurace, když stejně potřebuje mít svoji stránku na Facebooku. Fotky se dají na Instagram a videa na <a href="/youtube">YouTube</a>.</p>

<p>Proč nabízet své služby na vlastním webu, když existuje LinkedIn.</p>

<p>Zakládat a provozovat vlastní diskusní fórum, když existuje celosvětový Reddit nebo Stack Exchange (součástí je i vývojáři oblíbené Stack Overflow)?</p>

<p>Člověk na těchto sítí získá pravděpodobně snáz publikum, než když si vytvoří web na vlastní doméně díky základně dalších uživatelů, kterým se může doporučovat jeho obsah.</p>

<p>Má to ale svůj háček. Provozovatel dané služby má <b>plnou kontrolu nad publikovaným obsahem</b>. Může se tedy stát, že některý obsah bude blokovat, mazat, nedoporučovat dalším uživatelům a v extrémním případě třeba zablokuje celý profil.</p>

<p>Využít cizí webové služby / sociální sítě je nejspíš vůbec nejsnazší způsob, jak na internetu publikovat obsah. Má ale risiko ve ztrátě kontroly nad ním.</p>