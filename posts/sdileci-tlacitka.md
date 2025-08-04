---
title: "Facebook Like, Google Plus a Twitter tlačítka"
headline: "Tlačítka pro sdílení na sociálních sítích"
description: "Různé možnosti, jak mít na webu tlačítka pro sdílení na sociálních sítích."
date: "2013-05-25"
last_modification: "2013-05-25"
status: 1
tags: ["Lazy loading", "Twitter", "Facebook", "Google+"]
---

## Prosté vložení

### Facebook

Na příslušné stránce se získá kód pro vložení Facebook JavaScript SDK.
A následně pro kód daného tlačítka.
```
&lt;div id="fb-root">&lt;/div>
&lt;script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/cs_CZ/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));&lt;/script>
&lt;div class="fb-like" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false">&lt;/div>
```

### Twitter

Na stránce tlačítek dostaneme tento kód:
```
&lt;a href="https://twitter.com/share" class="twitter-share-button">Tweet&lt;/a>
&lt;script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');&lt;/script>
```

### Google Plus

U Google +1 tlačítka je situace obdobná:
```
&lt;div class="g-plusone" data-annotation="inline" data-width="300">&lt;/div>
&lt;script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
&lt;/script>
```

Je to celkem jednoduché, ale jak je to s rychlostí a počtem požadavků na externí JavaScripty, obrázky a podobně?

Síť Počet HTTP požadavků Přibližná doba načtení

Facebook 7 0,7 s

Twitter 7  0,5 s

Google Plus 7  0,3 s

**Celkem****21****1,5 s**

To nejsou zrovna čísla, se kterými by se vyhrávala soutěž o nejrychlejší web.

## Použít odkazy

… a případně je nějak hezky nastylovat:

pohrát si s CSS,
použít nějakou z milionu dostupných obrázkových sad,
použít [font-ikony](/font-ikony), například Font Awesome

Adresy pro sdílení jsou následující.

SíťOdkaz
Facebook`http://www.facebook.com/sharer.php?u=**http://example.com**`
Twitter`http://twitter.com/share?text=**Text**&url=**http://example.com**`
Google Plus`https://plus.google.com/share?url=**http://example.com**`

Stránka pro sdílení se může klidně zobrazovat v nějakém vyskakovacím okně (použití lightboxu a zobrazení v `&lt;iframe>` je bohužel zakázáno).

## Načtení po vyžádání

Protože takové odkazy nejsou úplně plnohodnotné, zajímavý kompromis může být zobrazovat místo skutečných tlačítek jen jejich obrázkové *makety*. Tedy dát výše zmíněným odkazů pomocí obrázků styl originálních tlačítek, ta se načtou až při nějaké události (například `onmouseover` elementu s tlačítky). A nejspíš bude vhodné je do daného prostoru absolutně naposicovat / nastavit šířku a `overflow: hidden`, aby se zamezilo poskakování.

    function facebook()
    {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/cs_CZ/all.js#xfbml=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    }
    
    function twitter()
    {
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
    }
    
    function gplus()
    {
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    }

    .share a {display: inline-block; width: 100px; text-align: center; padding: .5em; color: #fff; 
      text-decoration: none;}
    .share .fb-like {background: #4B67A1}
    .share .twitter-share-button {background: #00ACEE;}
    .share .g-plusone {background: #DD4B39}

    Facebook
    [Tweet](http://twitter.com/share?text=Odkaz&url=http://jecas.cz/sdileci-tlacitka)
    Google +

Je otázka, zda si s něčím takovým vyhrát, když lze očekávat, že v rámci ochrany před sledováním (skript pro tlačítko může monitorovat všechny návštěvníky, co na web přijdou) budou tato tlačítka prohlížeči blokována. A funkce těchto tlačítek budou možná přímo v prohlížečích.

## Související

Lazy Load Social Media Buttons
  
  - [TIP#202: Jaké sdílecí prvky umístit na web? Proč musí být web sociální?](https://365tipu.wordpress.com/2015/07/21/tip202-jake-sdileci-prvky-umistit-na-web-proc-musi-byt-web-socialni/)