---
title: "CSS barvy"
headline: "CSS barvy"
description: "CSS barvy"
date: "2015-01-15"
last_modification: "2015-01-15"
status: 0
tags: []
---

- [Sass Colour Function Calculator](http://razorltd.github.io/sasscolourfunctioncalculator/) – vrátí rozdíl mezi dvěma barvami ve funkci

## Automatický konstrast

Při programovém generování barev se může hodit následující SASS mixin, který pro tmavá pozadí vrátí bílou barvu a naopak pro světlá pozadí barvu černou.

```
@mixin text-contrast($n) {
  $color-brightness: round((red($n) * 299) + (green($n) * 587) + (blue($n) * 114) / 1000);
  $light-color: round((red(#ffffff) * 299) + (green(#ffffff) * 587) + (blue(#ffffff) * 114) / 1000);
  
  @if abs($color-brightness) 
  
    - [SASS mixin for accessible color contrast](https://codepen.io/davidhalford/pen/wlDxL)

http://sixrevisions.com/css/css-colors/

- [Why Facebook Is Blue: The Science of Colors in Marketing](https://blog.bufferapp.com/the-science-of-colors-in-marketing-why-is-facebook-blue) – jak vyznívají jednotlivé barvy

- [randomColor](http://llllll.li/randomColor/) – generátor barev v JavaScriptu

- [HTML Color Codes](http://htmlcolorcodes.com/)

- [colllor](http://colllor.com/1081DD) – generátor odstínů barvy

- [Adobe Color](https://color.adobe.com/) – generátor barevných schemat

contrast
ratio – zjištění kontrastu mezi dvěma barvami (jestli je dostatečný)