---
title: "JS tooltip"
headline: "JS tooltip"
description: "JavaScriptový popisek po najetí myší na ikonu nebo text."
date: "2014-03-03"
last_modification: "2014-06-23"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>O možnosti vytvoření lepšího <a href="/atribut-title">atributu <code>title</code></a> čistě v CSS už jsem psal. Tento článek pojednává o <b>JavaScriptovém řešení</b>.</p>

<p>Zatímco u obyčejných <b>obsahových webů</b> doporučuji obyčejné <code>title</code> popisky spíš nepoužívat (text napsat do závorky). U webových aplikací, kde jsou k ovládání často dostupné jen ikony, je vysvětlující <i>tooltip</i> naopak vítaná záležitost.</p>

<p>Výchozí <code>title</code> trpí pro tuto potřebu zásadním nedostatkem – <b>neobjevuje se ihned</b>. Návštěvník tedy najede nechápavě na ikonu, nic se zdánlivě neděje, takže často odjede pryč, aniž by se mu popisek objevil.</p>

<p>Na první pohled by se <a href="/tooltip">CSS tooltip</a> mohl zdát jako dostatečný. Nicméně v případě pokročilejších funkcí v praxi dřív nebo později narazíme na <b>limity CSS</b>.</p>

<ol>
  <li>
    <p>CSS tooltip nastavuje elementům, které mají mít popisek, <a href="/position#relative">relativní posici</a>. Máme-li tedy element posicovaný absolutně, budeme muset řešit přebíjení těchto hodnot.</p>
  </li>
  
  <li>
    <p>Potřebujeme-li pro element <code>overflow: hidden</code>, je to konečná, protože se tím <b>ořízne i popisek</b>.</p>
  </li>
  
  <li>
    <p>JavaScriptem lze zajistit <b>inteligentní umístění</b> tam, kde je místo. U CSS řešení se umístění bude muset určovat ručně.</p>
  </li>
  
  <li>
    <p>Budeme-li chtít popiskem pohybovat při <b>pohybu nad elementem</b>, CSS na to bude krátké.</p>
  </li>
  
  <li>
    <p>U uživatelského rozhraní fungující ve <b>více vrstvách</b> bude v CSS dost obtížné zajistit, aby se vše překrývalo, jak má.</p>
  </li>
</ol>

<h2 id="hotove-reseni">Hotové řešení</h2>

<p>Hotové řešení jednoduchého popisku. Projde všechny <code>title</code> na stránce, nahradí je <a href="/vlastni-html-atributy">data-atributy</a> – to proto, aby původní popisky <i>neotravovaly</i>.</p>

<p>Jako potomek elementu <code>&lt;body></code> se vytvoří element pro zobrazování popisku. Ten se nakonec při najetí na značku s popiskem objeví na posici této značky.</p>

<p>Při odjetí myši se s menší časovou prodlevou popisek skryje.</p>

<div class="live">
<style>
*[data-title] {color: red}
.tooltip {position: fixed; background: #000; color: #fff; padding: .2em .5em; display: none}
</style>
  <p>Text s <span title="Popisek 1">prvním</span> a <span title="Delší popisek 2">druhým</span> popiskem.</p>
  <p>A ještě text s <span title="Popisek 3">třetím</span> a <span title="Delší popisek 4">čtvrtým</span> popiskem.</p>
<script>
var Tooltip = function() {
    var elements;
    var ttEl;
    var activeTt;
    var timer;
    
    var init = function() {
        elements = document.querySelectorAll("[title]");
        ttEl = document.createElement("div");
        ttEl.className = "tooltip";
        document.body.appendChild(ttEl);

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            el.setAttribute("data-title", el.title);
            el.removeAttribute("title");
            el.onmouseover = show;
            el.onmouseout = hide;
        }        
    };

    var show = function() {
        clearTimeout(timer);
        activeTt = this;
        ttEl.innerHTML = this.getAttribute("data-title");
        var coords = this.getBoundingClientRect();
        ttEl.style.display = "block";
        ttEl.style.left = coords.left + "px";
        ttEl.style.top = coords.top + this.offsetHeight + "px";
        
        ttEl.onmouseover = function() {
            clearTimeout(timer);
        };
        
        ttEl.onmouseout = function() {
            hide();
        };
    };
    
    var hide = function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            ttEl.style.display = "";    
        }, 500);
        
    };    
    
    return {
        init: init
    };
}();

Tooltip.init();
</script>
</div>

<p><a href="http://kod.djpw.cz/tbeb">Samostatná živá ukázka</a></p>