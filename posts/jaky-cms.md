---
title: "Jaký CMS použít pro svůj web"
headline: "Jak vybrat CMS pro svůj web"
description: "Jaký redakční systém zvolit pro správu obsahu na webu."
date: "2022-01-19"
last_modification: "2022-01-19"
status: 0
tags: []
format: "html"
---

<p>Chce-li člověk vytvářet obsah na webových stránkách existuje několik možností:</p>

<ol>
  <li>Všechno si programovat sám a nějak nahrávat na <a href="/hosting">webhosting</a>.</li>
  
  <li>Zvolit nějaké hotové řešení pro správu obsahu (tzv. CMS – <i lang="en">content management system</i>). Ať už hostované ve vlastní nebo cizí režii.</li>
</ol>

<p>Pokud se člověk nechce zaobírat vývojem vlastního technického řešení pro správu obsahu, ale <b>víc se zaměřit na obsah samotný</b>, je celkem logické použít něco hotového.</p>


<h2 id="hosting">Kde hostovat?</h2>

<p>Důležité kritérium pro správný výběr RS (redakčního systému) je otázka hostování webu.</p>

<p>Pokud je web vážně myšlený a hodně důležitý, je vhodné mít <b>připraven záložní plán</b> pro případ:</p>

<ul>
  <li>dlouhého výpadku,</li>
  <li>ukončení služby,</li>
  <li>nepřijatelného zdražení</li>
</ul>

<p>To je obvykle snazší u vlastního hostingu (<i en="lang">self hosted</i>), kde stačí potřebná data nahrát někam jinam.</p>


<p>Nabízí-li někdo přímo hostování konkrétního redakčního systému, je dobré mít migrační plán pro případ, že by nastal problém. Některé služby takový export nemusí nabízet.</p>










<h2 id="domena">Doména</h2>

<p>Doménu určitě doporučuji vlastní. CZ doména stojí cca 175 Kč za rok.</p>

<div class="internal-content">
  <ul>
    <li>
      <a href="/domena">Jak vybrat vhodnou doménu?</a>
    </li>
  </ul>
</div>

<p>Pokud by byl web na jiné než vlastní doméně, hrozí další risiko ztráty kontroly nad touto doménou.</p>



<h2 id="typy">Typy CMS</h2>

<p>S příchodem rozšíření <a href="/js">JavaScriptu</a> a tzv. <b>JAMStacku</b> (<b>J</b>avaScript, <b>A</b>PI a <b>M</b>arkup) vzniklo hodně nástrojů, které umožňují doslova naklikat potřebnou datovou strukturu, ze které je automaticky vytvořeno API.</p>

<p>Na toto API se potom připojí frontendová aplikace v JS (typicky v reaktivním JavaScriptu, takže Reactu, Vue nebo Svelte).</p>

<p>Výsledkem potom může být vygenerování statických souborů, které se následně nahrají na hosting.</p>

<p>Tyto CMS se v angličtině nazývají jako <i>headless CMS</i>.</p>

<div class="external-content">
  <ul>
    <li>
      <a href="https://jamstack.org/headless-cms/">Headless CMS</a> – rozsáhlý přehled CMS
    </li>
  </ul>
</div>



<h3 id="strapi"><a href="https://strapi.io">Strapi.io</a></h3>

<p>Elegantní rozhraní pro naklikání si potřebné struktury během chvíle. Automaticky se k tomu generuje API.</p>

<p>Administraci je možné si hostovat u sebe nebo to nechat na Strapi.</p>

<p><img src="/files/jaky-cms/strapi.png" alt="Strapi" class="border"></p>

<p>Podobné nástroje:</p>

<ul>
  <li><a href="https://www.datocms.com">DatoCMS</a></li>
  <li><a href="https://www.contentful.com">Contentful</a></li>
</ul>

<h3 id="forestry"><a href="https://forestry.io">Forestry.io</a></h3>

<p><img src="/files/jaky-cms/forestry.png" alt="Forestry" class="border"></p>


































<p>Změny commituje do repositáře.</p>


<h3 id="ghost"><a href="https://ghost.org">Ghost</a></h3>

<p>Uživatelsky přívětivé.</p>

<p><img src="/files/jaky-cms/ghost.png" alt="Ghost" class="border"></p>


























<h3 id="webflow"><a href="https://webflow.com/">Webflow</a></h3>

<p>Umožňuje si web doslova nakreslit bez znalosti programování.</p>

<p><img src="/files/jaky-cms/webflow.png" alt="Webflow" class="border"></p>























<h2 id="zdarma">Zdarma, nebo placené?</h2>







