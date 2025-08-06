---
title: "AJAX"
headline: "AJAX"
description: "Asynchronní načítání částí stránek a odesílání formulářů bez obnovení celé stránky."
date: "2013-11-15"
last_modification: "2013-11-16"
status: 1
tags: ["hotova-reseni", "js", "js-ajax", "napady"]
format: "html"
---

<p>Od <b>IE 7</b> je napříč prohlížeči nejednodušší funkční řešení následující:</p>
<pre><code>var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) alert(<b>xhr.responseText</b>);
}
xhr.open('GET', "<i>url-stranky</i>");
xhr.send();</code></pre>







<p>Pro případnou podporu <b>IE 6</b> a starších je třeba použít <code>ActiveXObject</code>.</p>

<pre><code>var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();</code></pre>




<h2 id="json">JSON</h2>

<p>Zkratka <a href="/json">JSON</a> znamená <i>JavaScript Object Notation</i>, tj. jedná se o textový obsah, který je ve formátu jako se v JS vytváří objekty. Obsah je typu <code>{klic: "hodnota"}</code> a v <b>PHP</b> jde elegantně vytvořit z běžného pole funkcí <a href="http://php.net/json_encode"><code>json_encode</code></a>.</p>

<p>V <code>xhr.responseText</code> bude po vykonání <b>požadavku na URL</b> obsah dané stránky (co se stahuje si lze snadno ověřit zadáním stejné URL do prohlížeče). Neřeší se, zda se jedná o <b>HTML</b>, <b>JSON</b> nebo cokoliv jiného. Tvůrce si tedy může vybrat, který formát bude preferovat a používat.</p>

<p>Pokud není příliš obtížné / je možné stránku na straně serveru upravit tak, aby v určitých situacích (např. speciální parametr v URL) <b>vracela JSON</b> pouze s potřebnými daty, bude se s výsledkem z <code>xhr.responseText</code> lépe pracovat.</p>

<p>Vyzobávat potřebná data je možné i z původního HTML souboru včetně <code>&lt;!doctype></code>, hlavičky a podobně, a to buď <b>regulárními výrazy</b> nebo standardními funkcemi <b>DOM</b>u. Je potom ale otázka, zda <b>asynchronní načítání</b> vůbec používat. V takovém případě to  vyjde stejně jako <b>běžný přechod</b> na cílovou URL (stáhne se stejné množství dat).</p>

<h2 id="ajax-json">Řešení AJAXu s JSONem</h2>
<p>Hotová funkce pro <b>zpracovávání JSONu získaného AJAXem</b> může vypadat následovně:</p>
<pre><code>function ajax(url, callback) {
  var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) callback(eval('(' + xhr.responseText + ')'));
  };
  xhr.open('GET', url);
  xhr.send();
}</code></pre>

<p><b>Použití</b> pro JSON obsah <code>{url: "http://jecas.cz", nazev: "Je čas"}</code> (<a href="https://kod.djpw.cz/cir">živá ukázka</a>):</p>
<pre><code>ajax("url-stranky", function(data) {
  alert(data.url); // vypíše „http://jecas.cz“
  alert(data.nazev); // vypíše „Je čas“
});</code></pre>

<p>Pro zpracovávání <b>prostého textu nebo HTML</b> stačí z funkce <code>ajax</code> odstranit <code>eval</code> a pracovat s textovým řetězcem (<a href="https://kod.djpw.cz/eir">ukázka</a>).</p>

<h2 id="jina-domena">AJAX na jinou doménu</h2>
<p>Kvůli bezpečnosti je možné používat AJAX jen v rámci <b>stejné domény</b>. Tedy z domény <code>example.com</code> se dostaneme na stránku <code>example.com/stranka</code>. Ale už ne na <code><i>jiny.</i>example.com</code>, <code><i>www.</i>example.com</code> (AJAX nefunguje ani na <b>subdoménách</b>) nebo <code><i>jiny-</i>example.com</code>.</p>

<h3>Řešení je</h3>
<ol>
  <li>Zajistit, aby potřebný obsah byl dostupný na <b>URL z téže domény</b>.</li>
  <li>Vytvořit na stejné doméně skript, který z cizí domény <a href="/stazeni-stranky">stránku stáhne</a>. K takovému obsahu už se AJAX dostane.</li>
  <li>Obsah z cizí domény <b>připojovat jako externí skript</b> (tzv. JSON<b>P</b>).</li>
</ol>

<h2 id="jsonp">JSONP</h2>
<p>JSONP je <i>JavaScriptový objekt s „vycpávkou“</i>. Funguje to tak, že se běžný JSON umístí do argumentu nějaké funkce (to je ta <i>vycpávka</i>) a celé se to připojí jako <b>externí JavaScript</b> (připojovat skripty je možné i z <b>jiné domény</b>).</p>
<p>Takový JSONP soubor / externí JS (ve skutečnosti třeba v PHP dynamicky generovaný <i>soubor</i> na straně serveru) může vypadat následovně:</p>
<pre><code>vlastniFunkce({url: "http://jecas.cz", nazev: "Je čas"})</code></pre>

<p>V momentě, kdy tento skript připojíme (a on se stáhne a vykoná), se zavolá funkce <code>vlastniFunkce</code> (kterou si na cílovém webu nadeklarujeme) a budou jí tak předána data, která může dále libovolně zpracovávat.</p>

<p>Kromě zpracovávání JSONu ale nic nebrání tuto techniku připojování externího skriptu využít s jiným typem dat, tj. třeba vůbec nepoužívat JSON a data rovnou nastavit jako <b>parametry funkce</b>:</p>
<pre><code>vlastniFunkce("http://jecas.cz", "Je čas")</code></pre>

<p><b>Potenciální risiko</b> JSONP řešení je v tom, že si do stránky připojíme cizí skript, který v případě napadení může vytvořit <a href="/bezpecnost#xss">neřešitelný XSS</a>. Proto je tuto techniku vhodné používat jen u <b>důvěryhodných stránek</b>.</p>

<h3 id="pripojeni-skriptu">Dynamické připojení skriptu</h3>
<p>Připojování skriptu může zajišťovat funkce ve stylu.</p>
<pre><code>function pripojitJs(url) {
  var s = document.createElement("script");
  s.src = url;
  document.getElementsByTagName("head")[0].appendChild(s);
}
</code></pre>
<p><a href="https://kod.djpw.cz/elr">Živá ukázka</a> JSONP řešení.</p>

<h2 id="indikace">Indikace průběhu</h2>
<p>Po vyvolání akce, která začne AJAXem stahovat nějaká data, zvlášť v případě, že to bude <b>trvat déle</b>, je vhodné dát uživateli najevo, <i>že se něco děje</i>; to může znázorňovat.</p>

<ol>
  <li style="background: url(/files/ajax/ajax-loading.gif) left center no-repeat; padding-left: 20px"><b>Animovaný obrázek</b>, který se objeví po kliknutí a bude skryt <code>callback</code> funkcí.</li>
  <li style="cursor: wait">Změna kursoru na <code>wait</code> (opět je nutné zajistit <i>vrácení</i> kursoru po <b>dokončení akce</b>). Toto řešení není moc použitelné u dotykem ovládaných zařízení.</li>
  <li>Nástroj <a href="http://github.hubspot.com/pace/docs/welcome/">PACE</a> nabízí hotové řešení <b>průběhu načítání</b>.</li>
</ol>

<h2 id="formulare">Odesílání formulářů AJAXem</h2>
<p>AJAXové <b>odesílání formulářů</b> se dá řešit dvěma způsoby. Buď projít všechna formulářová pole JavaScriptem a sestavit z nich řetězec ve stylu <code>prvniPole=hodnota&amp;druhePole=hodnota</code> (<a href="http://php.vrana.cz/odeslani-formulare-pres-ajax.php">hotová funkce</a>).</p>

<p>Nebo formulář odesílat do skrytého rámu, který podobně jako JSONP řešení zavolá funkci z původní stránky s předanými daty.</p>

<p>Skript, na který se <b>formulář odešle</b> vytvoří výstup:</p>
<pre><code>&lt;script>
window.top.window.vlastniFunkce({url: "http://jecas.cz", nazev: "Je čas"});
&lt;/script></code></pre>

<p>Tím se obsah (JSON) předá funkci v nadřazené stránce <b>skrytému rámu</b>. Výhoda tohoto řešení je v tom, že o <a href="#indikace">indikaci</a> se postará prohlížeč standardní cestou.</p>

<p>Pro <a href="/upload-bez-refreshe">AJAXový upload</a> je to jediná možnost funkční napříč prohlížeči. Tento způsob se dá bez problému <b>použít i pro běžný formulář</b>.</p>

<h2 id="pseudo-ajax">Pseudo AJAX</h2>
<p>Pro situace, kde není potřeba <b>zpětná vazba</b>, si je možné vystačit bez <code>XMLHttpRequest</code>u, JSONP řešení nebo odesílání do skrytého rámu. Chceme-li pouze odeslat nějaká data <b>bez obnovování stránky</b>, existují další možnosti.</p>

<p>Před použitím tohoto způsobu je nutné pečlivě zvážit, zda <b>absence odezvy</b> nebude pro návštěvníka matoucí.</p>

<h3 id="hlavicka-204">HTTP hlavička 204</h3>
<p>HTTP hlavička 204 (No Response / No Content) znamená, že byl požadavek úspěšně zpracován, ale výsledkem není žádný výstup k navrácení klientovi. Za následek to má, že prohlížeč na takovou stránku <b>nepřejde</b>, ale skript běžící na dané URL se <b>normálně vykoná</b>.</p>

<pre><code>&lt;?php
header('HTTP/1.0 204 No Content', true, 204);
// Nějaká akce
exit;</code></pre>

<h3 id="pingnout">Pingnutí obrázkem</h3>
<p>Této techniky často využívají různé <b>měřicí skripty</b>. Do <b>HTML kódu</b> umístíme obrázek s cílem skriptu, který po vykonání své činnosti vrátí průhledný 1px obrázek (aby na stránce nerušil):</p>
<pre><code>&lt;img src="akce.php"></code></pre>
<p>Případně je možné  pingnutí <i>obrázkem</i> provést v JavaScriptu (s generováním prázdného obrázku se nemusíme obtěžovat):</p>
<pre><code>var obrazek = new Image();
obrazek.src = "akce.php";</code></pre>