---
title: "Proč končím s PHP"
headline: "Proč končím s PHP"
description: "Je PHP mrtvé? Proč jsem ho přestal používat."
date: "2020-03-29"
last_modification: "2020-03-29"
status: 0
tags: []
format: "html"
---

<p>K PHP jsem se dostal někdy v roce <b>2005</b>, tehdy to byla asi nejsnazší cesta, <b>jak psát web</b>.</p>

<p>Člověk mohl relativně bez znalosti programování smysluplně <a href="/include">skládat stránky dohromady</a>, zdarma to hostovat na <a href="https://www.webzdarma.cz">Webu zdarma</a>.</p>

<p><img src="/files/php-konec/webzdarma-cz-v-roce-2004.png" alt="Webzdarma.cz v roce 2004" class="border"></p>
































<p>Případně celkem levně na nějakém z mnoha sdílených <a href="/hosting">hostingů</a>.</p>

<p>V PHP existovala (a někdy i dodnes existuje) řada hotových aplikací, redakčních systému nebo tehdy populárních diskusních fór.</p>

<ul>
  <li>
    <a href="/wordpress">WordPress</a>
  </li>
  <li>
    <a href="https://www.phpbb.com">phpBB</a>
  </li>
</ul>

<p>Původně byl v PHP napsán i <a href="/facebook">Facebook</a>.</p>



<h2 id="co">Co zabilo PHP</h2>

<p>Při pohledu na <a href="https://octoverse.github.com/2022/top-programming-languages">statistiky GitHubu</a> s používanými programovacími jazyky, je u <b>PHP</b> vidět meziročně sestupný trend.</p>

<p><img src="/files/php-konec/trend-php.png" alt="Trend PHP" class="border"></p>

















<p>Čím to?</p>

<p>Podle mě za to může rozšíření <a href="/ajax">AJAXu</a>, kdy se změnil způsob, jak uživatel se stránkou komunikuje.</p>



<p>Zatímco dřív každé kliknutí znamenalo <b>sestavení nového HTML kódu</b> na straně serveru, poslání ho ke klientovi a znovunačtení celé stránky, JavaScript umožnil reagovat na uživatele okamžitě přímo v prohlížeči.</p>

<p>Případně ze serveru stahovat jen potřebné části dat.</p>


<p>Z toho plyne, že <b>v PHP není možné vytvořit tak dobrý uživatelský zážitek jako v JS</b>.</p>


<p>Nástup <b>reaktivních frameworků</b> jako je <b>React</b>, <b>Angular</b>, <b>Vue.js</b>, <b>Svelte</b> a podobně následně začal nabízet i celkem rozumný způsob vývoje.</p>

<p>Rozšíření History API umožnilo <a href="/zmena-url">plnohodnotně měnit URL bez znovunačtení stránky</a>.</p>

<p>Vynález <a href="https://www.typescriptlang.org">TypeScriptu</a> a různých dalších kompilátorů potom aspoň trochu polidštil programování v JavaScriptu.</p>


<p>Skončila tím doba slepování HTML řetězců v <b>jQuery</b> v jednom obrovském souboru <code>main.js</code>.</p>





<h2 id="fe-be">Frontend vs. backend</h2>

<p>V dřívějších dobách se to nerozlišovalo. Zažil jsem i doby, kdy <i>dělat frontend</i> znamenalo připravit HTML/CSS šablony, které potom backendista implementoval do PHP aplikace a šablonovacího systému.</p>

<p>Pokročilejší frontendista je potom dokázal implementovat i sám, ale samotný návrh aplikace, routování a podobné věci byl pořád na backendu v PHP.</p>

<p>Dnes se frontendem zpravidla rozumí všechno, co běží v prohlížeči.</p>

<p>Takže React je dnes nové PHP.</p>









<h2 id="jednoduchost">PHP nestačí</h2>


<h2 id="ne-vse-spa">Ne vše musí být webová aplikace</h2>


<h2 id="ssr">Server side rendering</h2>