---
title: "WYSIWYG editory"
headline: "Webové WYSIWYG editory"
description: "V JavaScriptu napsané WYSIWYG editory pro rychlé nasazení na webu."
date: "2013-10-21"
last_modification: "2013-10-21"
status: 0
tags: []
---

## Trix

[Web](http://trix-editor.org/)

Zajímavý editor, který vůbec nepoužívá `execCommand` pro vykonávání jednotlivých příkazů, ale všechny změny se ukládají do zvláštního modelu editoru a následně se vše překreslí do HTML.

To na jednu stranu zajišťuje 100% konsistentní HTML kód (chování `execCommandu`, který tento editor nepoužívá, se liší napříč prohlížeči); na stranu druhou neustále překreslování dělá trochu problémy s ohledem na **kontrolu pravopisu**.

## Hallo.js

[Web](http://hallojs.org/)

Editor založený na **jQuery**. Nabízí přímou editaci textu. Při samotném psaní neruší nástrojové lišty — ty se objeví jen, když jsou potřeba, tj. při označení textu. **Klávesové zkratky** jsou samozřejmostí.

## Sir Trevor JS

[Web](http://madebymany.github.io/sir-trevor-js/) [Příklad](http://madebymany.github.io/sir-trevor-js/example.html)

Ani tento editor nepoužívá klasické neustále viditelné rozhraní. Zajímavým prvkem je **dělení obsahu na jednotlivé bloky**, které lze následně mazat nebo myší přesouvat.

## Quill

[Web](http://quilljs.com)

http://hackerwins.github.io/summernote/

## StackEdit.io

Něco mezi WYSIWYG editorem a plain-textem. Slouží k zápisu **Markdownu**.

[Web](https://stackedit.io)

## ProseMirror

[Web](http://prosemirror.net/)

## Odkazy jinam

  - [Draft.js](https://facebook.github.io/draft-js/) (od Facebooku)

  - [ZenPen](https://github.com/tholman/zenpen)

  - [Medium.com WYSIWYG editor clone](https://github.com/yabwe/medium-editor)

  - [10 Best jQuery and HTML5 WYSIWYG Plugins](http://www.sitepoint.com/10-best-html-wysiwyg-plugins/)

  - [Froala](https://froala.com) – placený editor