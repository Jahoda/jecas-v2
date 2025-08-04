---
title: "Poznámky k Nette"
headline: "Poznámky k Nette"
description: ""
date: "2013-06-06"
last_modification: "2013-06-06"
status: 0
tags: []
---

## Nechtěnn&aacute; interpretace Latte v JavaScriptech

Pokud vlož&iacute;me do &scaron;ablony `*.latte&nbsp;`JavaScript do značky&nbsp;`&lt;script&gt;`, typicky k&oacute;dy n&aacute;strojů služeb jako:

- TinyMCE,

- CKEditor,

- Google Analytics

Pravděpodobně se setk&aacute;me s nějakou takovou hl&aacute;&scaron;kou.

```
Nette\Latte\CompileException
Unknown macro {title} (in JavaScript or CSS, try to put a space after bracket.)
```

Ře&scaron;en&iacute; spoč&iacute;v&aacute; např&iacute;klad v přid&aacute;n&iacute; n-atributu `n:syntax="off"`.

```
&lt;script type="text/javascript" **n:syntax="off"**&gt;

## Výběr dat z více tabulek

http://forum.nette.org/cs/13581-vyfiltrovani-knizek-podle-tagu
http://doc.nette.org/cs/database
http://forum.nette.org/cs/10071-nette-database-chyba-v-pripade-vazebni-tabulky-s-dvou-sloupcovym-primarnim-klicem
http://stackoverflow.com/questions/4717093/mysql-find-related-articles

## Vlastní chybová stránka

} elseif ($exception instanceof **\**Nette\Application\BadRequestException) {
```

```
	nette:
		application:
			errorPresenter: "Front:Error"
```