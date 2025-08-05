---
title: "Max-width pro pozadí"
headline: "Maximální šířka pozadí"
description: "Jak obrázkovému pozadí nastavit maximální šířku. Tj. aby se přizpůsobovalo menší šířce okna."
date: "2015-03-29"
last_modification: "2015-03-29"
status: 1
tags: ["css", "hotova-reseni", "obrazky", "responsive"]
format: "html"
---

<p>Při tvorbě <a href="/responsive">responsivního designu</a> jde snadno zajistit, aby se obrázky vložené značkou <code>&lt;img></code> vešly na obrazovku pomocí:</p>

<pre><code>img {
  max-width: 100%;
  height: auto;
  box-sizing: border-box
}</code></pre>





<p>Pokud je na displeji více místa, než je šíře obrázku, obrázek se zobrazí v originálních rozměrech. Při zmenšování okna se potom bude zmenšovat, aby se vždy zobrazil celý.</p>

<p><img src="/files/max-width-pozadi/roztazeni.gif" alt="Zmenšování obrázku při změně velikosti okna" class="border"></p>




<p>Dosáhnout podobného chování je někdy potřebné i pro <b>obrázkové pozadí</b>. CSS vlastnost <a href="/obrazkove-pozadi"><code>background-size</code></a> ale nastavení maximální velikosti neumožňuje. Použití „<code>background-size: 100%</code>“ by způsobilo prosté roztažení pozadí i nad jeho skutečnou šířku.</p>

<p>Docílit chování jako u <code>&lt;img></code> s <code>max-width</code> jde ale menším trikem s využitím <a href="/mobilni-web#media-queries"><code>@media</code></a>. Díky tomu se „<code>background-size: 100%</code>“ aplikuje jen v případě, že je stránka užší než pozadí, takže 100% velikost pozadí zafunguje žádoucím způsobem.</p>

<pre><code>.image {
  background: url(i/400x40) no-repeat;
  height: 40px;
}
@media (max-width: 400px) {
  .image {
    background-size: 100%;
  }
}</code></pre>









<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/pwlb">Živá ukázka obou způsobů</a></li>
  </ul>
</div>

<p>Měl-li by element s obrázkovým pozadím navíc přizpůsobovat svou výšku aktuální šířce, jde využít triku s nulovou výškou a <code>padding</code>em v procentech dle poměru stran obrázku.</p>

<div class="internal-content">
  <ul>
    <li><a href="/vyska-podle-sirky">Výška podle šířky</a></li>
  </ul>
</div>