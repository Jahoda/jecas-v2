---
title: "Vložení videa z Facebooku"
headline: "Vložení videa z Facebooku na web"
description: "Jak na vlastní stránku vložit video z Facebooku."
date: "2014-11-21"
last_modification: "2014-11-21"
status: 1
tags: ["Lazy loading", "Hotová řešení", "Facebook", "Video"]
---

Pokud chceme na vlastní web vložit Facebook video, existuje k tomu [na stránce s videem](https://www.facebook.com/video.php?v=796588687069516) možnost *Embed post*.

To nám připraví HTML kód a JavaScript, který připojí Facebook SDK, které *oživí* video.

```
&lt;div id="fb-root">&lt;/div>
&lt;script>
(function(d, s, id) { 
  var js, fjs = d.getElementsByTagName(s)[0]; 
  if (d.getElementById(id)) return; 
  js = d.createElement(s); 
  js.id = id; 
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1"; 
  fjs.parentNode.insertBefore(js, fjs); 
}(document, 'script', 'facebook-jssdk'));
&lt;/script>
&lt;div class="fb-post" 
data-href="https://www.facebook.com/video.php?v=**796588687069516**" 
  data-width="466"
>
  &lt;div class="fb-xfbml-parse-ignore">
    &lt;a href="https://www.facebook.com/video.php?v=**796588687069516**">Post&lt;/a> by &lt;a href="https://www.facebook.com/jecas.cz">Je čas&lt;/a>.
  &lt;/div>
&lt;/div>

```

Po vložení na stránku to vypadá takto ([živá ukázka](http://kod.djpw.cz/yuhb)):

Nevýhoda tohoto postupu je, že výše uvedený kód vytvoří **34 HTTP požadavků** a **stáhne cca 0,5 MB dat**.

## Vložení jako `&lt;iframe>`

Na rozdíl od [YouTube](/youtube) není snadno k disposici možnost vložit video na vlastní web pomocí `&lt;iframe>`. Naštěstí se ale k universálnímu kódu pro `&lt;iframe>` dá dopátrat skrze *Graph API*.

```
&lt;iframe 
  src="https://www.facebook.com/video/embed?video_id=**796588687069516**"
  width="480" height="270" frameborder="0"
>
&lt;/iframe>
```

[Samostatná ukázka](http://kod.djpw.cz/avhb)

URL stránky vložitelné do *frame* je tedy: `https://www.facebook.com/video/embed?video_id=**796588687069516**`

Tento způsob je sice o trochu úspornější než předchozí – 22 požadavků a 0,43 MB, ale pořád to není žádná sláva.

Výhoda ale spočívá v tom, že s `&lt;iframe>`m půjde snáze provést [*lazy loading*](/lazy-loading).

## Lazy loading

Podobně jako u [videí z YouTube](/js-youtube-lazy-loading) můžeme vytvořit na stránce atrapu, která `&lt;iframe>` s videem načte až **na vyžádání**.

Bohužel v tomto případě půjde obtížněji získat **náhled videa**. Neexistuje nějaká universální adresa, kde by stačilo **změnit ID** a obrázek by byl na světě. URL obrázku jde získat jedině přes [Graph API](https://developers.facebook.com/tools/explorer/?method=GET&path=796588687069516&version=v2.2).

## Automatické přehrávání Facebook videa

Spustit video rovnou při načtení není normálně dosažitelné. Jde ale využít **mobilní verse**, kde to funkční je ([ukázka](http://kod.djpw.cz/bvhb)).

```
&lt;iframe 
  src="https://*m*.facebook.com/video/video.php?v=**796588687069516**" 
  frameborder="0" 
  allowfullscreen
>
&lt;/iframe>
```