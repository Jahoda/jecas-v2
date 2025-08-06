---
title: "CSS blend"
headline: "CSS blend"
description: "CSS vlastnost <code>background-blend-mode</code> slouží ke smíchání barvy s obrázkem."
date: "2014-03-01"
last_modification: "2014-10-17"
status: 1
tags: ["css", "css-vlastnosti", "obrazky"]
format: "html"
---

<p>V případě, že nastavíme nějakému elementu obrázek na pozadí a zároveň barvu, <code>background-blend-mode</code> umožní tyto dvě složky <i>smíchat</i> (anglicky blend). Obrázek tedy <b>nemusí být průhledný</b>, aby se za ním barva projevila.</p>

<p>Míchání popdporuje <b>Chrome 35</b>, <b>Firefox 30</b>, <b>Safari 7.1</b> i <b>Opera 22</b>. <b>IE</b> zatím nikoliv.</p>

<p>Symbolický zápis vypadá následovně.</p>

<pre><code>element {
  background-image: url(url obrázku);
  background-color: barva pozadí;
  <b>background-blend-mode</b>: typ;
}</code></pre>

<p>Za <code>typ</code> se potom zadává něco z mnoha hodnot: <code>normal</code>, <code>multiply</code>, <code>screen</code>, <code>overlay</code>, <code>darken</code>, <code>lighten</code>, <code>color-dodge</code>, <code>color-burn</code>, <code>hard-light</code>, <code>soft-light</code>, <code>difference</code>, <code>exclusion</code>, <code>hue</code>, <code>saturation</code>, <code>color</code>, <code>luminosit</code>.</p>



<p>Nejlepší bude si to vyzkoušet (typů je možné zadávat i několik zároveň – při zápisu CSS se oddělí čárkou).</p>

<div class="live" style="margin-left: 0">
<style>
.blend {
    background-image: url(http://jecas.cz/files/blend/1.jpg);
    width: 100%;
    height: 0;
    padding-top: 50%;
    background-color: #0D6AB7;
    background-size: cover;
}

.blend-obal ul {list-style: none; padding: 0;}
.blend-obal li {display: inline}
.blend-obal label {white-space: nowrap;}
</style>

<p><label>Obrázek
    <select onchange="blendTest.style.backgroundImage = 'url(http://jecas.cz/files/blend/' + this.value + '.jpg)'">
        <option value="1">krajina</option>
        <option value="2">káva</option>
        <option value="3">moře</option>
        <option value="4">koncert</option>
        <option value="5">louka</option>
    </select>
</label></p>
<p><label>Barva na pozadí <input type="color" value="#0D6AB7" onchange="blendTest.style.backgroundColor = this.value"></label></p>

<p>Typ <code>background-blend-mode</code>:</p>
<div class="blend-obal" id="blend-obal">
<ul>
<li id="normal"><label><input type="checkbox" name="normal"> <code>normal</code></label></li>
<li id="multiply"><label><input type="checkbox" name="multiply"> <code>multiply</code></label></li>
<li id="screen"><label><input type="checkbox" name="screen"> <code>screen</code></label></li>
<li id="overlay"><label><input type="checkbox" name="overlay"> <code>overlay</code></label></li>
<li id="darken"><label><input type="checkbox" name="darken"> <code>darken</code></label></li>
<li id="lighten"><label><input type="checkbox" name="lighten"> <code>lighten</code></label></li>
<li id="color-dodge"><label><input type="checkbox" name="color-dodge"> <code>color-dodge</code></label></li>
<li id="color-burn"><label><input type="checkbox" name="color-burn"> <code>color-burn</code></label></li>
<li id="hard-light"><label><input type="checkbox" name="hard-light"> <code>hard-light</code></label></li>
<li id="soft-light"><label><input type="checkbox" name="soft-light"> <code>soft-light</code></label></li>
<li id="difference"><label><input type="checkbox" name="difference"> <code>difference</code></label></li>
<li id="exclusion"><label><input type="checkbox" name="exclusion"> <code>exclusion</code></label></li>
<li id="hue"><label><input type="checkbox" name="hue"> <code>hue</code></label></li>
<li id="saturation"><label><input type="checkbox" name="saturation"> <code>saturation</code></label></li>
<li id="color"><label><input type="checkbox" name="color"> <code>color</code></label></li>
<li id="luminosity"><label><input type="checkbox" name="luminosity"> <code>luminosity</code></label></li>
</ul>
</div>

<div class="blend" id="blend-test">
</div>
<script>
var blendTest = document.getElementById('blend-test');
(function() {
var policka = document.getElementById('blend-obal').getElementsByTagName("input");

for (var i = policka.length; i--; ) {
    policka[i].onchange = namichat;
}

function namichat() {
    var blendMode = [];
    for (var i = policka.length; i--; ) {
        if (policka[i].checked) {
            blendMode.push(policka[i].name);
        }
    }
    blendTest.style.backgroundBlendMode = blendMode.join(",");
}
    
})();
</script>  
</div>

<p><a href="https://kod.djpw.cz/bogb-">Test na samostatné stránce</a></p>


<h2 id="mix-blend-mode">Vlastnost <code>mix-blend-mode</code></h2>

<p>Pro míchání <b>libovolných elementů</b> (ne jen obrázku a barevného pozadí) existuje vlastnost <code>mix-blend-mode</code>. Podpora v prohlížečí je ale zatím nedostatečná. V <b>Chrome</b> a <b>Opeře</b> se musí zapnout v <code>chrome://flags</code>, resp. <code>opera://flags</code>.</p>





<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Dev.Opera: <a href="https://dev.opera.com/articles/getting-to-know-css-blend-modes/">Getting to Know CSS Blend Modes</a></li>
  
  <li>Adobe Web Platform: <a href="http://webplatform.adobe.com/blend-modes/">CSS Blend Modes</a></li>
  
  <li>Bennett Feely: <a href="https://medium.com/@bennettfeely/css-blend-modes-could-be-the-next-big-thing-in-web-design-6b51bf53743a">CSS Blend Modes could be the next big thing in Web Design</a></li>
  
  <li>DevDocs: <a href="http://devdocs.io/css/background-blend-mode">background-blend-mode</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode">background-blend-mode</a></li>
  
  <li>CSS-Tricks: <a href="http://css-tricks.com/basics-css-blend-modes/">Basics of CSS Blend Modes</a></li>
  
  <li>Demosthenes.info: <a href="http://demosthenes.info/blog/1056/Better-Diagrams-with-SVG-and-Blend-Modes">Better Diagrams with SVG and Blend Modes
CSS / BLEND MODES
</a></li>
</ul>