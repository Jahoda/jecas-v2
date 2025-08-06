---
title: "Textarea s automatickou výškou"
headline: "Automatická výška <code>&lt;textarea></code>"
description: "Jak zajistit, aby se výška textového pole přizpůsobovala délce textu."
date: "2014-07-18"
last_modification: "2016-05-29"
status: 1
tags: ["formulare", "hotova-reseni", "js"]
format: "html"
---

<p>Při použití pole pro psaní delšího textu (<a href="/textarea"><code>&lt;textarea></code></a>) čelíme dilematu, jak ho udělat vysoké. Nízká výška způsobí uživateli, co bude chtít zapsat <b>delší text</b>, značné nepohodlí. Naopak vysoká <code>&lt;textarea></code> bude zase zabírat možná zbytečně hodně místa.</p>

<p>Prohlížeče kromě <b>IE 11</b> a starších umožňují provést změnu velikosti <b>tažením myši</b>, slouží k tomu CSS vlastnost <a href="/resize"><code>resize</code></a>.</p>

<p>Co ale velikost uzpůsobovat automaticky v závislosti na <b>obsahu</b>?</p>



<h2 id="pocitani">Počítání znaků</h2>

<p>Asi první, co člověka napadne, je <a href="/pocet-znaku">počítat v <code>&lt;textarea></code> znaky</a> a <b>odřádkování</b> a nějak podle toho vypočítat výšku.</p>

<p>Přepočet výšky je nutný provádět při události <a href="/oninput"><code>oninput</code></a> (pro starší prohlížeče <code>onkeyup</code> + <code>onpaste</code> + <code>oncut</code> + <code>onfocus</code>).</p>

<p>Vzhledem k různým proporcím různých písmen je téměř nemožné dosáhnout přesného výsledku.</p>


<h2 id="vyska">Zjištění výšky <code>scrollHeight</code></h2>

<p>Asi nejlepší možnost je při změně obsahu nastavit výšku na <code>0</code> a z vlastnosti <code>scrollHeight</code> získat rozměry, které se následně nastaví jako výška.</p>

<p>V případě okrajového <a href="/box-model">box modelu</a> je ještě nutno připočíst <code>offsetHeight</code>.</p>

<p>Skript si při inicialisaci nastaví pro <code>&lt;textarea></code> do <code>data-*</code> atributu aktuální výšku, která se bude brát jako minimální. Výchozí minimální výšku tak jde zadat přes <code>height</code> nebo atributem <code>rows</code>.</p>

<div class="live"><style>
.pole {
    box-sizing: border-box;
}


</style>

<script>
var AutoHeightArea = function() {
    var originalArea;
    
    var addEvent = function(element, evnt, funct) {
        if (element.attachEvent)
            return element.attachEvent('on' + evnt, funct);
        else
            return element.addEventListener(evnt, funct, false);
    };
    
    var resize = function() {
        var minHeight = originalArea.getAttribute("data-original-height");
        originalArea.style.height = "0";
        var newHeight = originalArea.scrollHeight + originalArea.offsetHeight;
        if (minHeight > newHeight) {
            newHeight = minHeight;
        }
        originalArea.style.height = newHeight + "px";
    };

    var init = function(area) {
        originalArea = area;
        originalArea.setAttribute("data-original-height", area.offsetHeight);
        addEvent(originalArea, "paste", resize);
        addEvent(originalArea, "cut", resize);
        addEvent(originalArea, "input", resize);
        addEvent(originalArea, "keyup", resize);
    };
    return {
        init : init
    };
}();
</script>
<textarea name="pole" id="pole" cols="30" rows="3" class="pole"></textarea>

<script>
    AutoHeightArea.init(document.getElementById("pole"));
</script>
</div>

<p><a href="https://kod.djpw.cz/rhyb">Samostatná živá ukázka</a></p>


<h2 id="contenteditable">Využití <code>contenteditable</code></h2>

<p>Poslední možnost je použít <code>contenteditable</code> atrapu. Skutečná <code>&lt;textarea></code> se schová pomocí <code>display: none</code> a místo ní se vloží obyčejný <code>&lt;div></code>, který umožňuje zapisovat text. Při <b>odeslání formuláře</b> se potom obsah <code>&lt;div></code>u překopíruje do skutečného pole, které se tak řádně odešle na server.</p>


<p>Jde si tak vytvořit i primitivní <a href="/vlastni-wysiwyg">WYSIWYG editor</a>.</p>

<p>Jelikož se jedná o obyčejný <code>&lt;div></code>, automatické roztahování bude jeho běžná vlastnost.</p>

<div class="live">
  <style>
    .div-contenteditable {
      background: #fff;
      border: 1px solid #ccc;
      padding: .2em;
    }
  </style>
  <div contenteditable="true" class="div-contenteditable">Automatická výška „&lt;textarea>“</div>
</div>

<p><a href="https://kod.djpw.cz/wmeb-">Živá ukázka</a></p>

<p>Nevýhoda tohoto postupu tkví ve větší pracnosti s převedením obsahu do požadované formy. Z políčka vyleze míst <i>plain textu</i> HTML, které se navíc bude lišit napříč prohlížeči.</p>

<p>Například odřádkování někde vytváří nové odstavce (<code>&lt;p></code>), jinde <code>&lt;div></code> a někde pro změnu <code>&lt;br></code>.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://www.jacklmoore.com/autosize/">jQuery Autosize</a> – plugin do <b>jQuery</b> zajišťující automatickou výšku (může být i <b>plynule animovaná</b>).</li>
  
  <li><a href="http://leaverou.github.io/stretchy/">Stretchy</a> – automatická velikost elementů <code>&lt;textarea></code> i <a href="/input"><code>&lt;input></code></a></li>
</ul>

<!-- https://kod.djpw.cz/qagb -->