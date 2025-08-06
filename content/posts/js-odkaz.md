---
title: "JS akce u odkazu"
headline: "JS akce po kliknutí na odkaz"
description: "Na co si dát pozor při obsluhování odkazu JavaScriptem."
date: "2015-01-13"
last_modification: "2015-01-13"
status: 1
tags: ["hotova-reseni", "js", "js-udalosti", "odkazy"]
format: "html"
---

<p>Při vytváření webové aplikace, která funguje i <b>bez podpory JavaScriptu</b>, se často setkáme s tím, že odkaz má normální cíl, ale v případě zapnutého JS bude obsloužen skriptem.</p>

<div class="internal-content">
  <ul>
    <li><a href="/vypnuty-js">Detekce zapnutého JavaScriptu</a></li>
  </ul>
</div>

<p>Pro <b>odkaz</b>, který bude umět načítat obsah <a href="/ajax">AJAXem</a> to může vypadat následovně:</p>

<pre><code>&lt;a href="url-stranky" <b>onclick="nacistAjaxem(this.href)"</b>>
  Odkaz
&lt;/a></code></pre>




<p>Při použití <b>obrázkové galerie</b>:</p>

<pre><code>&lt;a href="velky-obrazek.jpg" <b>onclick="otevritGalerii(this.href)"</b>>
  &lt;img src="maly-obrazek.jpg">
&lt;/a></code></pre>




<p>Funkce v <code><a href="/udalosti-mysi#kliknuti">onclick</a></code> potom provede JS akci a stornuje <b>standardní funkci odkazu</b>, třeba pomocí „<code>return false</code>“.</p>


<h2 id="zpusob-otevreni">Způsob otevření odkazu</h2>

<p>Celé to ale není tak jednoduché, odkaz jde totiž typicky otevřít <b>více způsoby</b>:</p>

<ol>
  <li>kliknutím <b>levého tlačítka</b>,</li>
  
  <li>otevřením <b>prostředním tlačítkem</b> (kolečkem), což typicky otevírá obsah na pozadí,</li>
  
  <li>otevřením přes <a href="/kontextova-nabidka">kontextové menu</a> vyvolané <b>pravým tlačítkem</b>,</li>
  
  <li>kliknutím levého tlačítka při stisknuté klávese <kbd>Ctrl</kbd> (otevře na pozadí) nebo <kbd>Shift</kbd> (otevře do nového okna)</li>
</ol>

<p>Kromě otevření přes kontextové menu vyvolají všechny případy <code>onclick</code>, ač by bylo <b>očekávávané chování</b> pro kolečko nebo použití <kbd>Shift</kbd>/<kbd>Ctrl</kbd> <b>otevření odkazu v nové záložce</b> (na popředí/pozadí).</p>


<p>Kliknutí na následující odkaz je obslouženo JavaScriptem, i když to není zrovna ideální.</p>

<div class="live">
<p>
  <a href="http://jecas.cz/js-odkaz" onclick="alert('Akce odkazu s cílem: ' + this.href); return false">
    Kliknout
  </a>
</p>    
</div>


<h2 id="reseni">Řešení</h2>

<p>Zajistit v určitých případech standardní chování jde pomocí využití <b>objektu</b> <code>event</code>, z kterého jde zjistit číslo stisknutého tlačítka (<code>event.which</code> – levé tlačítko má číslo <code>1</code>) nebo stisknuté klávesy (<code>event.shiftKey || event.metaKey || event.ctrlKey</code>).</p>

<div class="live">
<script>
function kliknuti(e, el) {
    e = e || window.event;
    // je stisknutá klávesa
    if (e.shiftKey || e.metaKey || e.ctrlKey) {
        return;
    }    
    // levé tlačítko
    if (e.which !== 1) {
        return;
    }    
    // akce
    alert("Akce odkazu s cílem: " + el.href);
    return false;
}  
</script>  
<p>
  <a href="http://jecas.cz/js-odkaz" onclick="return kliknuti(event, this)">
    JS akce se vyvolá pouze při levém tlačítku
  </a>
</p>  
</div>


<p><a href="https://kod.djpw.cz/oljb">Samostatná živá ukázka</a></p>


<h2 id="bez-url">Akce bez URL</h2>

<p>Problém nastane u JS akcí, které nemají URL. Při touze otevřít odkaz na pozadí zkrátka <b>neexistuje URL</b>, kterou by prohlížeč mohl nalistovat.</p>

<p>Pokud akce nemá URL, asi nejmenší zlo se mi zdá použít obyčejný <code>onclick</code> a jako cíl odkazu uvést alespoň nějakou URL, což bude lepší než <b>prázdná stránka</b> „<code>about:blank</code>“, která se otevře u odkazů typu:</p>

<pre><code>&lt;a href="<b>javascript</b>:akce()">
  Odkaz
&lt;/a></code></pre>

<p>Případně přidat do JS aplikace <i>fiktivní</i> URL není s využitím <a href="/zmena-url"><code>pushState</code></a> zase takový problém.</p>