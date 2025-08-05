---
title: "Build PHP v Sublime Text"
headline: "Spuštění PHP v Sublime Text"
description: "Při programování v PHP se občas hodí testovat (spouštět) skript přímo v editoru."
date: "2014-04-26"
last_modification: "2014-04-26"
status: 1
tags: ["produktivita", "st"]
format: "html"
---

<p>V editoru <a href="/sublime-text">Sublime Text</a> to jde poměrně snadno zařídit. Přes položku <i>New Build System…</i> nacházející se v hlavním menu pod <i>Tools</i> → <i>Build System</i>.</p>

<p><img src="/files/sublime-text-php-build/php-build.png" alt="Přidání nového Build Systému v Sublime Text" class="border"></p>

<p>Po kliknutí na <i>New Build System…</i> by mělo stačit <b>nahradit obsah</b> nově otevřeného souboru následujícím obsahem.</p>

<pre><code>{
	"cmd": ["php", "$file"],
	"file_regex": "php$",
	"selector": "source.php"
}</code></pre>

<p>A soubor uložit do <b>předvybraného adresáře</b> <code>User</code> pod názvem <code><b>php.sublime-build</b></code> (celá cesta na Windows je <code>C:\Users\Uživatel\AppData\Roaming\Sublime Text 2\Packages\User</code>).</p>

<p>Nyní stačí nově vytvořený build v PHP zaškrtnout ve stejné nabídce, kde se vytvářel. A po stisknutí <kbd>Ctrl</kbd> + <kbd>B</kbd> v otevřeném PHP souboru by to mělo fungovat. Výsledek <i>buildu</i> se zobrazuje v dolní části editoru.</p>

<h2 id="cely-projekt">Build celého projektu</h2>

<p>Teoreticky je možné si místo buildování právě otevřeného souboru (<code>$file</code>) nastavit <code>index.php</code> celého projektu.</p>

<h3 id="php-projekt-build"><code>php-projekt.sublime-build</code></h3>

<pre><code>{
	"cmd": ["php", "<b>$project_path</b>/index.php"],
	"file_regex": "php$",
	"selector": "source.php"
}</code></pre>

<p>Ale u většiny webových stránek je to stejně v podstatě k ničemu, protože se zpravidla jednotlivé stránky stejně skládají na základě všelijakých <b>parametrů v URL</b>.</p>