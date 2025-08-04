---
title: "Úprava libovolného textu na stránce"
headline: "Úprava textu stránky pomocí <code>designMode</code>"
description: "Jednoduchý bookmarklet pro okamžité přepsání libovolného textu na stránce."
date: "2013-05-10"
last_modification: "2016-03-27"
status: 1
tags: ["JavaScript"]
---

javascript:void(document.designMode = 'on');

Zapne se tak vlastnost `designMode`, která umožní přepisovat text atd.

Mimochodem lze tímto způsobem [vytvářet WYSIWYG editory](/vlastni-wysiwyg).

      Upravit stránku

## Atribut `contenteditable`

Stejného efektu lze docílit atributem `contenteditable`.

Kromě editování již existující stránky, si lze v prohlížečích podporující [`data:*` protokol](/data-uri) ad hoc vytvořit stránku pro psaní. Stačí zkopírovat do adresního řádku:

```
data:text/html,&lt;html contenteditable>
```