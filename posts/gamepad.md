---
title: "Gamepad API"
headline: "Gamepad API"
description: "Jak webovou stránku ovládat gamepadem."
date: "2014-05-11"
last_modification: "2014-05-15"
status: 1
tags: ["JavaScript", "Rady a nápady"]
---

## Podpora

V prohlížečích **Chrome**, **Firefox**, **nová Opera** je možné kromě standardních událostí klávesnice a myši reagovat i na povely zaslané z **gamepadu** (a nejspíš i z jiného libovolného herního zařízení).

Hlavní smysl to má pro HTML/CSS/JS hry běžící **přímo v prohlížeči**, ale není problém gamepadem ovládat i běžný web.

V případě, že máte gamepad, to můžete zkusit na této stránce. Předem zapnutý ovladač se připojí do stránky po stisku nějakého tlačítka. Zdejší ukázku jsem testoval s **XBox 360 ovladačem** a spočívá v otáčení a přibližování této stránky pomocí analogových páček (s využitím *CSS transformací*).

## Ukázka

.buttons, .axes {
  padding: 1em;
}

.button {
  padding: 1em;
  border-radius: 20px;
  border: 1px solid black;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAAxJREFUCNdjYPjPAAACAgEAqiqeJwAAAABJRU5ErkJggg==);
  background-size: 0% 0%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.pressed {
  border: 1px solid red;
}

Po stisknutí tlačítka ovladače se začnou dít věci.

/*
 * Gamepad API Test
 * Written in 2013 by Ted Mielczarek 
 *
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see .
 */
var haveEvents = 'GamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

function connecthandler(e) {
  addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad; var d = document.createElement("div");
  d.setAttribute("id", "controller" + gamepad.index);
  var t = document.createElement("h1");
  t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
  d.appendChild(t);
  var b = document.createElement("div");
  b.className = "buttons";
  for (var i=0; i

[Živá ukázka](http://kod.djpw.cz/bfdb)

## Odkazy

  - Smashing Magazine: [Using The Gamepad API In Web Games](http://www.smashingmagazine.com/2015/11/gamepad-api-in-web-games/)

  - HTML5 Rocks: [Jumping the Hurdles with the Gamepad API](http://www.html5rocks.com/en/tutorials/doodles/gamepad/)

  - [Živá ukázka](http://www.html5rocks.com/en/tutorials/doodles/gamepad/gamepad-tester/tester.html)

  - MDN: [Using the Gamepad API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/Gamepad)

  - [Živá ukázka](http://luser.github.io/gamepadtest/)