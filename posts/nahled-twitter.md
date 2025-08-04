---
title: "Náhled webu na Twitteru"
headline: "Náhled odkazu na Twitteru"
description: "Jak u odkazu na Twitteru zobrazit jeho náhled?"
date: "2013-05-09"
last_modification: "2013-05-17"
status: 1
tags: ["Twitter"]
---

Lze použít tzv. [Twitter Cards](https://dev.twitter.com/docs/cards), tedy:

- přidat pár `&lt;meta&gt;` značek s informacemi pro Twitter,

- [vyzkoušet si](https://dev.twitter.com/docs/cards/validation/validator), zda to správně funguje,

- vyplnit pár údajů a požádat o schválení,

**počkat několik dní, možná týden** (tento web čekal 8 dní).

Pokud se už na webu používají `og:*` značky pro sdílení na Facebooku, použijí se, není tedy nutno je duplikovat.

Meta značky funkční napříč těmito sociálními sítěmi mohou být:

```
&lt;meta name="twitter:card" content="summary"&gt; 
&lt;meta name="twitter:site" content="@Jahoda"&gt;
&lt;meta name="twitter:creator" content="@Jahoda"&gt;
&lt;meta property="og:url" content="{link //this}"&gt; 
&lt;meta property="og:title" content="{include #title}"&gt; 
&lt;meta property="og:description" content="{$description}" n:ifset="$description"&gt;
&lt;meta property="og:image" content="{$image}" n:ifset="$image"&gt;
```

(Ukázka je z šablony Latte z Nette Frameworku.)

### Co umí Twitter oproti Facebooku navíc?

Podporuje více formátů náhledů. 

- Popis,

- produkt,

- fotografie,

- popis se velkým obrázkem,

- videopřehrávač,

- galerie obrázků.