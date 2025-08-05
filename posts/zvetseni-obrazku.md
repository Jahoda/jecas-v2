---
title: "Zvětšení obrázku"
headline: "Zvětšení obrázku"
description: "Jakými způsoby řešit zvětšení malého obrázku."
date: "2015-07-01"
last_modification: "2015-07-01"
status: 1
tags: ["obrazky", "responsive"]
format: "html"
---

<p>V době <a href="/responsive">responsivních webů</a> je nejistá velikost prostoru, kde se může běžný obrázek vložený značkou <code>&lt;img></code> zobrazovat.</p>

<p>Zpravidla se obrázkům nastavuje maximální šířka na 100 % a <i>automatická</i> výška, aby se prostoru přizpůsobily a byl zachován poměr stran.</p>

<pre><code>img {
  max-width: 100%;
  height: auto;
}</code></pre>


<div class="internal-content">
  <ul>
    <li><a href="/responsivni-obrazky">Responsivní obrázky</a> – různé způsoby přizpůsobení obrázků velikosti okna</li>
  </ul>
</div>



<h2 id="citelnost">Čitelnost obrázků</h2>

<p>Problém nastane, když obrázek <b>obsahuje nějaký text</b>, který by si chtěl návštěvník přečíst. Bude-li obrázek výrazně širší než dostupný prostor (což u mobilu s malým displejem může být třeba 320 pixelů), bude nutné, aby si ho návštěvník <b>zvětšil</b>.</p>


<p>To znamená, že nesmí být <a href="/meta-viewport"><code>&lt;meta></code> značkou <code>viewport</code></a> zakázané zoomování stránky.</p>


<p>Bohužel některé prohlížeče (například mobilní <b>IE</b>) mohou kvůli úsporám prostředků zmenšit obrázek takovým způsobem, že kvůli snížení kvality nebude čitelný ani po následném ručním zvětšení.</p>


<p>Na desktopu potom někteří uživatelé <b>nemusí vědět, jak obrázek zvětšit</b>. Případně bude nepohodlné, že se při použití zoomu bude zvětšovat úplně celá stránka.</p>

<p>Celou situaci jde řešit různými způsoby:</p>

<ol>
  <li>
    <p>Mít <b>různé obrázky pro různé velikosti</b> obrazovky. V závislosti na rozměru dostupné plochy se zobrazují různé obrázky, které jsou vytvořené tak, aby na nich pořád bylo to podstatné dobře viditelné.</p>
    <p>Tento způsob je <b>velmi pracný</b>, protože vyžaduje ruční vybírání požadovaného výřezu nejpodstatnější části.</p>
  </li>
  
  <li>
    <p>Použít <a href="/lightbox">lightbox</a> skript. To je dobře funkční na desktopu. Na mobilech je u responsivních webů problém, že obrázek typicky už <b>není kam zvětšit</b>, protože rovnou zabírá celou šířku.</p>
    
    <p>Někdy tak otevření obrázku do lightboxu na mobilu paradoxně obrázek zmenší o okraje a ovládací prvky lightbox skriptu.</p>

    
    <p>Řešením je <b>zvětšování obrázku pomocí gest</b>, které zajišťuje přímo skript lightboxu – dobře funkční je <b>PhotoSwipe</b>.</p>
    
    <div class="external-content">
      <ul>
        <li>
          <p><a href="http://photoswipe.com/">PhotoSwipe</a> – responsivní skript pro fotogalerii s podporou dotykových gest</p>
        </li>
      </ul>
    </div>
  </li>
  
  <li>
    <p><b>Prostý odkaz</b> na stejnou URL, jako je <code>src</code> obrázku, nabízí poměrně jednoduché řešení, jak obrázek otevřít přes celou stránku.</p>
    
    <pre><code>&lt;a href="obrazek.jpg">
  &lt;img src="obrazek.jpg" alt="Popis obrázku">
&lt;/a></code></pre>
    
    <p>Podle <a href="http://www.jakpsatweb.cz/"><b>Dušana Janovského</b></a> je ale takový postup pro řadu návštěvníků z mobilů a tabletů nešťastný tím, že <b>nemají zažitý způsob</b>, jak se z otevřeného obrázku dostat zpátky na předchozí stránku.</p>
  </li>
</ol>


<h2 id="odkaz">Automatické vytvoření odkazu</h2>

<p>Pořád je ale možnost otevřít URL obrázku po kliknutí asi lepším řešením než nic.</p>

<p>Pomocí pár řádků JavaScriptu jde zjistit, zda byl obrázek zmenšen – pomocí porovnání skutečné šířky (<a href="/skutecne-rozmery-obrazku"><code>naturalWidth</code></a>) s tou aktuální. A v takovém případě obrázek <b>obalit odkazem</b>.</p>

<pre><code>(function(images){
    var solveSize = function(el) {
        if (el.naturalWidth > el.width) {
            var link = document.createElement("a");
            link.href = el.src;
            link.target = "_blank";
            el.parentNode.insertBefore(link, el);
            link.appendChild(el);
        }
    };
    
    for (var i = images.length; i--; ) {
        solveSize(images[i]);
    }
})(document.querySelectorAll("img"));</code></pre>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/jznb">Živá ukázka</a></li>
  </ul>
</div>