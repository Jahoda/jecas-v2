---
title: "CSS barvy"
headline: "CSS barvy"
description: "CSS barvy"
date: "2015-01-15"
last_modification: "2015-01-15"
status: 0
tags: []
format: "html"
---

<div class="external-content">
  <ul>
    <li><a href="http://razorltd.github.io/sasscolourfunctioncalculator/">Sass Colour Function Calculator</a> – vrátí rozdíl mezi dvěma barvami ve funkci</li>
  </ul>
</div>

<h2 id="kontrast">Automatický konstrast</h2>

<p>Při programovém generování barev se může hodit následující SASS mixin, který pro tmavá pozadí vrátí bílou barvu a naopak pro světlá pozadí barvu černou.</p>

<pre><code>@mixin text-contrast($n) {
  $color-brightness: round((red($n) * 299) + (green($n) * 587) + (blue($n) * 114) / 1000);
  $light-color: round((red(#ffffff) * 299) + (green(#ffffff) * 587) + (blue(#ffffff) * 114) / 1000);
  
  @if abs($color-brightness) < ($light-color/2){
    color: white;
  }

  @else {
    color: black;
  }
}</code></pre>

<div class="external-content">
  <ul>
    <li><a href="https://codepen.io/davidhalford/pen/wlDxL">SASS mixin for accessible color contrast</a></li>
  </ul>
</div>

http://sixrevisions.com/css/css-colors/

<li><a href="https://blog.bufferapp.com/the-science-of-colors-in-marketing-why-is-facebook-blue">Why Facebook Is Blue: The Science of Colors in Marketing</a> – jak vyznívají jednotlivé barvy</li>

<li><a href="http://llllll.li/randomColor/">randomColor</a> – generátor barev v JavaScriptu</li>

<li><a href="http://htmlcolorcodes.com/">HTML Color Codes</a></li>

<li><a href="http://colllor.com/1081DD">colllor</a> – generátor odstínů barvy</li>

<li><a href="https://color.adobe.com/">Adobe Color</a> – generátor barevných schemat</li>

<li><a href="http://leaverou.github.io/contrast-ratio/">contrast
ratio</a> – zjištění kontrastu mezi dvěma barvami (jestli je dostatečný)</li>