---
title: "Úprava libovolného textu na stránce"
headline: "Úprava textu stránky pomocí <code>designMode</code>"
description: "Jednoduchý bookmarklet pro okamžité přepsání libovolného textu na stránce."
date: "2013-05-10"
last_modification: "2016-03-27"
status: 1
tags: ["js"]
format: "html"
---

<p><img class="border" src="/files/uprava-stranky-designmode/designmode.png" alt="Zapnutí design mode"></p>








<pre>javascript:void(document.designMode = 'on');</pre>

<p>Zapne se tak vlastnost <code>designMode</code>, která umožní přepisovat text atd.</p>

<p>Mimochodem lze tímto způsobem <a href="/vlastni-wysiwyg">vytvářet WYSIWYG editory</a>.</p>

<div class="live">
  <p>
    <a class="button" href="javascript:void(document.designMode = 'on')">
      Upravit stránku
    </a>
  </p>
</div>



<h2 id="contenteditable">Atribut <code>contenteditable</code></h2>

<p>Stejného efektu lze docílit atributem <code>contenteditable</code>.</p>

<p>Kromě editování již existující stránky, si lze v prohlížečích podporující <a href="/data-uri"><code>data:*</code> protokol</a> ad hoc vytvořit stránku pro psaní. Stačí zkopírovat do adresního řádku:</p>

<pre><code>data:text/html,&lt;html contenteditable></code></pre>