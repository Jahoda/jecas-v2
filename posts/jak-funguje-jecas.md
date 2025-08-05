---
title: "Jak funguje jecas.cz"
headline: "Jak funguje jecas.cz"
description: "Jak funguje zdejší frontend, backend a jak se to vše nahrává na server."
date: "2019-07-17"
last_modification: "2020-04-05"
status: 1
tags: ["napady", "produktivita"]
format: "html"
---

<h2 id="be">Backend</h2>

<p>Web používá <a href="https://nette.org">Nette Framewrok</a> 2.5 běžící v PHP 7.4. Používat novější verse <a href="/php">PHP</a> je dobré hlavně kvůli rychlosti.</p>

<p>Potřebné závislosti se stahují přes <a href="https://getcomposer.org">Composer</a>. Díky tomu nemusí být v repositáři zduplikován cizí kód a je jednodušší potřebné závislosti instalovat a aktualisovat.</p>

<p>Data článků a štítky jsou uloženy v MySQL.</p>

<p>Proč MySQL, PHP a Nette? Na jaře roku <b>2013</b>, kdy jecas.cz vzniknul, to byl dost populární způsob, jak vyrábět weby.</p>

<p>Kvůli nedostatečné rychlosti jsem tehdy zavrhl <a href="/wordpress">WordPress</a>.</p>

<p>Psaní obsahu probíhá přes jednoduchou administraci a <b>obsah tvořím přímo v HTML</b>, protože jsem nad ním chtěl 100% kontrolu (např. možnost mít ukázky přímo v textu). Vedle HTML je rovnou vidět živý výsledek:</p>


<p><img src="/files/jak-funguje-jecas/editor.png" alt="Úprava článku" class="border"></p>
























<p>Dnes bych podobý web nejspíš stavěl na statických generátorech stránek v <a href="/js">JS</a> jako je třeba <a href="https://gohugo.io">Hugo</a>, <a href="https://www.gatsbyjs.org">GatsbyJS</a>, <a href="https://vuepress.vuejs.org">VuePress</a> nebo <a href="https://nuxtjs.org">Nuxt.js</a>.</p>

<p>Nemusel bych nic programovat, měl rovnou hotové pohodlné vývojové prostředí s automatickým obnovováním změn, možnost používat JS frameworky jako <b>React</b> nebo <b>Vue.js</b>, připravené prostředí pro psaní testů, připravené CSS preprocesory apod.</p>

<p>Celý web by potom šel zdarma hostovat na <a href="https://www.netlify.com">Netlify</a>, kde by se nové změny projevily automaticky po publikování do Gitu.</p>

<p>Ale protože to tak není…</p>


<h2 id="fe">Frontend</h2>

<p>CSS je kompilováno pomocí <a href="/gulp-4">Gulpu</a> ze zdrojových SCSS souborů. JavaScript je pouze spojován.</p>

<p>Výsledné soubory jsou připojeny přes Nette rozšíření Webloader, které aktuálně řeší pouze invalidaci cache.</p>




<h3 id="autoprefixer">Autoprefixer</h3>

<p>Psát <a href="/css-prefixy">CSS prefixy</a> ručně je otrava. Proto je automaticky doplňuje <a href="https://github.com/postcss/autoprefixer">autoprefixer</a>.</p>





<h3 id="stylelint">Stylelint</h3>

<p>Pro jednotný vzhled SCSS je použit Stylelint.</p>


<h3 id="lazy">Lazy loading</h3>

<p><a href="/rychlost">Zrychlení webu</a> odloženým načítáním řeší knihovna <a href="https://github.com/verlok/lazyload">vanilla-lazyload</a>, která načítá obrázky a <code>&lt;iframe></code>, až když se k nim uživatel <a href="/scroll">proscrolluje</a>. </p>

<p>Knihovna je v čistém JS a využívá <a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">Intersection Observer API</a>.</p>




<h2 id="server">Server &amp; hosting</h2>

<p>Web je provozován na <a href="http://www.ebola.cz/r/15998">hostingu eBola.cz</a>. Důvody pro to jsou hlavně tyto:</p>

<ol>  
  <li>
    <p><a href="/https"><b>HTTPS</b></a> – na jedno kliknutí a zdarma.</p>
  </li>
  
  <li>
    <p><b>Různé verse PHP</b> – pro starší projekty jde zvolit třeba PHP 5.2, pro nové 7.4.</p>
  </li>
  
  <li>
    <p><b>Cena</b> – za 39 Kč měsíčně jde provozovat <b>5 různých domén</b>.</p>
  </li>
</ol>

<p>Předtím jsem spokojeně hostoval u <a href="https://www.wedos.cz/?ap=zy839S">Wedosu</a>, kde šlo ale za podobnou cenu <a href="/wedos-alias">mít jen 2 domény</a>. Aktuálně to vypadá, že už je možné mít celkem 4, ale pořád se připlácí za HTTPS.</p>


<h3 id="htaccess">Přesměrování v <code>.htaccess</code></h3>

<p>Přesměrování všech případných subdomén na hlavní doménu.</p>

<pre><code>RewriteCond %{HTTP_HOST} ^(.+)\.jecas\.cz$ [NC]
RewriteRule ^ https://jecas.cz/ [L,R]</code></pre>

<p>Přesměrování na HTTPS:</p>

<pre><code>RewriteCond %{HTTPS} !on
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]</code></pre>









<h2 id="deploy">Deployment</h2>

<p>Celý projekt je na GitHubu, kde je možné mít bezplatně i privátní repositáře. Nasazování řeší služba <a href="https://buddy.works">Buddy.works</a> (do <b>5 projektů je zdarma</b>). Díky té jde velmi rychle nastavit build celého projektu a jeho vystavení na server.</p>

<p><img src="/files/jak-funguje-jecas/buddy.png" alt="Buddy.works" class="border"></p>








































<p>Buddy totiž automaticky detekuje, co projekt používá, a navíc má připravené konfigurace pro nejrůznější jazyky a technologie.</p>

<p>Takže připravení <b>Docker kontejneru</b> pro PHP a nainstalování závislostí je otázka pár kliknutí.</p>


<p>Celé to v praxi vypadá tak, že při novém <code>push</code>nutí do master větve dojde k:</p>

<ol>
  <li>
    <p>Připravení prostředí (řeší Buddy automaticky).</p>
  </li>
  <li>
    <p>Nainstalování PHP závislostí přes Composer.</p>
    
    <pre><code>composer install</code></pre>
  </li>
  <li>
    <p>Nainstalování frontednových závislostí přes NPM a spuštění buildu (Gulp tasku).</p>
    
    <pre><code>npm install
npm run build</code></pre>
  </li>
  
  <li>
    <p>Upload na FTP.</p>
  </li>
</ol>




<p>Proč upload na FTP? Není to moc dobré řešení, protože není bezvýpadkové a návštěvník se může dostat na web v průběhu nahrávání, ale je to velmi jednoduché a jde takto fungovat na obyčejném hostingu za pár korun.</p>


<h3 id="github">GitHub aplikace</h3>

<p>GitHub má <a href="https://github.com/marketplace">obchod</a> s šikovnými aplikacemi. Používám tyto dvě:</p>

<h4 id="dependabot"><a href="https://github.com/marketplace/dependabot-preview">Dependabot Preview</a></h4>

<p>Hlídá nové verse použitých knihoven a automaticky připravuje pull requesty pro update, kam rovnou zapisuje seznam změn.</p>

<p><img src="/files/jak-funguje-jecas/dependabot.png" alt="Dependabot pull requesty" class="border"></p>

















<h4 id="imgbot"><a href="https://github.com/marketplace/imgbot">Imgbot</a></h4>

<p>Vytváří pull requesty s <a href="/optimalisace-obrazku">datově optimalisovanými obrázky</a>, pokud se do repositáře dostanou neoptimalisované.</p>


<h2 id="monitoring">Monitorování chyb</h2>

<p>O přehled o řádném běhu PHP i JavaScriptu se stará nástroj <a href="https://sentry.io/welcome/">Sentry</a>.</p>

<p>Když na webu něco rozbije, začnou mi kvůli tomu chodit e-maily s popisem.</p>

<p><img src="/files/jak-funguje-jecas/sentry.png" alt="Chyby v Sentry" class="border"></p>















