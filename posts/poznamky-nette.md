---
title: "Poznámky k Nette"
headline: "Poznámky k Nette"
description: ""
date: "2013-06-06"
last_modification: "2013-06-06"
status: 0
tags: []
format: "html"
---

<h2>Nechtěnn&aacute; interpretace Latte v JavaScriptech</h2>
<p>Pokud vlož&iacute;me do &scaron;ablony <code>*.latte&nbsp;</code>JavaScript do značky&nbsp;<code>&lt;script&gt;</code>, typicky k&oacute;dy n&aacute;strojů služeb jako:</p>
<ul>
<li>TinyMCE,</li>
<li>CKEditor,</li>
<li>Google Analytics</li>
</ul>
<p>Pravděpodobně se setk&aacute;me s nějakou takovou hl&aacute;&scaron;kou.</p>
<pre><code>Nette\Latte\CompileException
Unknown macro {title} (in JavaScript or CSS, try to put a space after bracket.)</code></pre>
<p>Ře&scaron;en&iacute; spoč&iacute;v&aacute; např&iacute;klad v přid&aacute;n&iacute; n-atributu <code>n:syntax="off"</code>.</p>
<pre><code>&lt;script type="text/javascript" <strong>n:syntax="off"</strong>&gt;</code>
</pre>

<h2 id=related>Výběr dat z více tabulek</h2>
http://forum.nette.org/cs/13581-vyfiltrovani-knizek-podle-tagu
http://doc.nette.org/cs/database
http://forum.nette.org/cs/10071-nette-database-chyba-v-pripade-vazebni-tabulky-s-dvou-sloupcovym-primarnim-klicem
http://stackoverflow.com/questions/4717093/mysql-find-related-articles

<h2 id=chyba-404>Vlastní chybová stránka</h2>
<pre><code>} elseif ($exception instanceof <b>\</b>Nette\Application\BadRequestException) {</code></pre>

<pre><code>	nette:
		application:
			errorPresenter: "Front:Error"</code></pre>