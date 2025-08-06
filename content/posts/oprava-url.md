---
title: "Oprava překlepů v URL"
headline: "Dohledání a opravení rozbité adresy"
description: "Zejména automatické převaděče URL na HTML odkazy, ale i lidé <i>dokáží</i> pokazit tvar odkazu na webovou stránku."
date: "2013-05-24"
last_modification: "2015-02-01"
status: 1
tags: ["napady", "seo"]
format: "html"
---

<p>Pokud se někdo skrz <b>rozbitý odkaz</b> dostane na web, existují dvě
možnosti:</p>

<ol>
    <li><b>Vypsat chybu 404</b>.</li>

    <li>Zkusit URL <i>zrestaurovat</i> a <b>přesměrovat</b> na správnou
    adresu (nebo správnou URL uživateli navrhnout).</li>
</ol>

<p class="note">Je k úvaze, zda se zobrazení chybové stránky „404 –
Nenalezeno“ nedá donutit autor odkazující stránky k nápravě. Nicméně v
případů porouchaných odkazů z diskusních fór apod. s nápravou nejspíš nelze
počítat.</p>

<h2 id="nejcastejsi">Nejčastější chyby</h2>

<h3 id="dlouha-adresa">Příliš dlouhá adresa</h3>

<p>Značné množství redakčních systémů, diskusních fór a podobných aplikací má nastavenou
  nějakou <b>maximální délku slova</b>. Ta bohužel kontraproduktivně může ničit URL.
Vnikne potom odkaz typu:</p>
<pre>
<code>&lt;a href='http://example.com/adresa-roz<b> </b>bita-mezerou'&gt;
  Odkaz
&lt;/a&gt;</code>
</pre>

<p>Při kliknutí na odkaz prohlížeč mezeru zakóduje na <code>%20</code>,
  takže vznikne:</p>

<pre><code>http://example.com/adresa-roz<b>%20</b>bita-mezerou</code></pre>

<p>Řešení je prosté — <code>%20</code> vyhodit a zkusit adresu znovu.</p>

<p class='note'>Je pravda, že adresy by <b>takto dlouhé být vůbec neměly</b>, leč u starších systémů může být jejich změna nevýhodná z pohledu <b>vyhledávačů</b>.</p>

<h3 id="interpunkce">Interpunkce</h3>

<p>Jelikož většina automatických rozpoznávačů adres není moc chytrá, běžně
<i>požírají</i> jako součást URL i tečky, čárky, středníky, vykřičníky,
  otazníky, dvojtečky nebo závorky <b>bezprostředně následující</b> onu adresu.</p>

<p>Pokud je webová aplikace běžně v adresách stránek nepoužívá, nic nebrání je z adresy automaticky odstraňovat.</p>

<h3 id="lomitko">Lomítko</h3>

<p>Je-li struktura adres <code>ve/více/úrovních</code> oddělených právě
lomítkem, může se stát, že uživatel kus adresy <b>ručně umaže</b>. Jelikož může a nemusí odmazat i lomeno na konci, nabízí se adresy s lomítkem přesměrovávat na adresy bez lomítka nebo
obráceně.</p>

<h3 id="html-chyba">Chyba v HTML</h3>

<p>Zajímavé podoby URL lze nechtěně vytvořit třeba špatným obalením
atributu <code>href</code>:</p>
<pre>
<code>&lt;ul&gt;
&lt;li&gt;&lt;a href=<b>'</b>http://jecas.cz/formulare&gt;Je čas&lt;/a&gt;
&lt;li&gt;&lt;a href=<b>'</b>http://djpw.cz/<b>'</b>&gt;DJPW&lt;/a&gt;
&lt;/ul&gt;</code>
</pre>

<p>A odkaz „Je čas“ s textem „DJPW“ bude odkazovat na:</p>

<pre><code>http://jecas.cz/formulare%3EJe%20čas%3C/a%3E%3Cli%3E%3Ca%20href=</code></pre>
<!-- <a href='http://jecas.cz/formulare target='_blank'>Je čas</a> -->

<p>Oprava tohoto případu může spočívat ve dvou krocích:</p>

<ol>
    <li>Nežádoucí znaky vyhodit (mezery, interpunkce, …) a zkusit.</li>

    <li>U prvního nežádoucího znaku adresu rozdělit a použít jen první
    část.</li>
</ol>

<p>U adres, kde nejsou používány nějaké výstřednosti, bude oprava o poznání
snazší.</p>

<h3 id="preklepy">Překlepy</h3>

<p>Tohle se bohužel automatisuje obtížněji. Adresa s překlepem vypadá na
první pohled OK, zbývá leda možnost zkusit najít nějakou podobnou
existující adresu. V PHP k tomu slouží funkce <code><a href=
'http://www.php.net/manual/en/function.levenshtein.php'>levenshtein</a></code>
nebo <code><a href=
'http://php.net/manual/fr/function.similar-text.php'>similar_text</a></code>.
V databásích by zase šlo použít fulltext nebo danou URL postupně zkracovat
a zkracovat a zkoušet <code>like %%</code>.</p>

<p>Například redakční systém <a href="/wordpress">WordPress</a> dokáže cílovou adresu dohledat podle začátku. Následující URL:</p>

<pre><code>example.com/k</code></pre>

<p>Dokáže přesměrovat na:</p>

<pre><code>example.com/k<b>ontakt</b></code></pre>

<h2 id="reseni">Konkrétní řešení</h2>

<p>V případě, že v URL mohou být jen písmena, čísla, podtržítko a spojovník
(<code>A-z0-9_-</code>), kód pro opravení (mezer, interpunkce a HTML chyb)
  bude velice jednoduchý. Nejdříve se odstraní <b>zakódovaná mezera</b> (<code>%20</code>) a následně
se použije jen ta část, která odpovídá danému výrazu:</p>
<pre>
<code>function opravUrl($url) {
  $url = str_replace("%20", "", $url);
  preg_match("~([A-z0-9_-]*)~", $url, $matches);
  return $matches[1];
}</code>
</pre>


<h2 id="odkazy">Další odkazy</h2>

<ul>
    <li>Funkce <a href=
    'http://stackoverflow.com/questions/9870913/php-mysql-select-where-similar-textx'>
        levenshtein v MySQL</a>,
    </li>

    <li>
        <a href=
        'http://stackoverflow.com/questions/3338889/how-to-find-similar-results-and-sort-by-similarity'>
        Použití fulltextu</a> v MySQL
    </li>
</ul>