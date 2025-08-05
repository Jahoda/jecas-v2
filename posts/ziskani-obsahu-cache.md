---
title: "Cacheování obsahu z cizí stránky"
headline: "Cacheování obsahu cizí stránky"
description: "Jak cacheovat výsledky obsahu staženého z cizí stránky."
date: "2014-05-17"
last_modification: "2014-05-20"
status: 1
tags: ["hotova-reseni", "php", "ziskavani-obsahu"]
format: "html"
---

<p>Když potřebujeme <a href="/stazeni-stranky">stáhnout obsah z cizí URL</a> (mimo náš web), jedná se většinou o <b>časově náročnější operaci</b>. Je sice možné <a href="/ziskani-obsahu-timeout">nastavit časový limit</a>, ale stejně je lepší výsledek <i>cacheovat</i>, je-li to možné a nepotřebujeme skutečně co nejnovější data.</p>

<p><img src="/files/ziskani-obsahu-cache/graf.png" alt="Požadavek na získání cizí stránky" class="border"></p>

<p>Cílem je časově náročnou <i>cizí stránku</i> odbourat a použít místo toho <b>cache na vlastním webu</b>.</p>

<h2 id="postup">Postup</h2>

<p>Jak na to? Obsah se bude stále získávat funkcí <code>file_<b>get</b>_contents</code>, ale zároveň se bude funkcí <code>file_<b>put</b>_contents</code> ukládat k nám na web.</p>

<p>Ukládání ale proběhne jen v případě, že:</p>

<ul>
  <li>kopie na našem webu <b>ještě není vytvořená</b> (funkce <code>file_exist</code>),</li>
  
  <li>kopie (soubor cache) už je moc <b>starý</b> (porovná se stáří souboru – funkce <code>filemtime</code>)</li>
</ul>

<p>V takovém případě (soubor na našem serveru neexistuje nebo je starý) se stáhne a uloží aktuální obsah, jinak se pouze zobrazí výsledek z <i>cache</i>, což <b>bude rychlé</b>.</p>

<h2 id="reseni">Řešení</h2>

<pre><code>function ziskatSouborCache($url) {
  $platnost = 60 * 60; // 60 s * 60 min = 1 hodina
  $soubor = "<b>cache/</b>" . urlencode($url);

  if (
      file_exists($soubor) &amp;&amp; 
      (filemtime($soubor) > time() - $platnost)
     ) {
    // vrátíme obsah z keše
    return file_get_contents($soubor);
  }
  else {
    // obsah se musí stáhnout z cizí URL
    $obsah = file_get_contents($url);
    if ($obsah) {
      // uložení obsahu do cache
      file_put_contents($soubor, $obsah);
    }
    return $obsah;
  }
}</code></pre>

<p>Použití je potom prosté:</p>

<pre><code>echo ziskatSouborCache(
  "http://jecas.cz/ziskani-obsahu-cache"
);</code></pre>

<p>A funkce <code>ziskatSouborCache</code> zařídí, jestli se soubor načte z <b>cizí URL</b> nebo z našeho serveru.</p>

<p>Pro funkčnost výše uvedeného skriptu je nutné vytvořit adresář <code>cache</code>, jinak pokus o uložení souboru <b>skončí chybou</b>.</p>