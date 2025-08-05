---
title: "Gamepad API"
headline: "Gamepad API"
description: "Jak webovou stránku ovládat gamepadem."
date: "2014-05-11"
last_modification: "2014-05-15"
status: 1
tags: ["js", "napady"]
format: "html"
---

<h2 id="podpora">Podpora</h2>

<p>V prohlížečích <b>Chrome</b>, <b>Firefox</b>, <b>nová Opera</b> je možné kromě standardních událostí klávesnice a myši reagovat i na povely zaslané z <b>gamepadu</b> (a nejspíš i z jiného libovolného herního zařízení).</p>

<p>Hlavní smysl to má pro HTML/CSS/JS hry běžící <b>přímo v prohlížeči</b>, ale není problém gamepadem ovládat i běžný web.</p>

<p>V případě, že máte gamepad, to můžete zkusit na této stránce. Předem zapnutý ovladač se připojí do stránky po stisku nějakého tlačítka. Zdejší ukázku jsem testoval s <b>XBox 360 ovladačem</b> a spočívá v otáčení a přibližování této stránky pomocí analogových páček (s využitím <i>CSS transformací</i>).</p>

<p><img src="/files/gamepad/transformace.png" alt="" class="border"></p>

<h2 id="ukazka">Ukázka</h2>

<div class="live">
<style>
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

</style>
<p id="start">Po stisknutí tlačítka ovladače se začnou dít věci.</p>
<script>
/*
 * Gamepad API Test
 * Written in 2013 by Ted Mielczarek <ted@mielczarek.org>
 *
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
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
  for (var i=0; i<gamepad.buttons.length; i++) {
    var e = document.createElement("span");
    e.className = "button";
    //e.id = "b" + i;
    e.innerHTML = i;
    b.appendChild(e);
  }
  d.appendChild(b);
  var a = document.createElement("div");
  a.className = "axes";
  for (var i=0; i<gamepad.axes.length; i++) {
    var e = document.createElement("progress");
    e.className = "axis";
    //e.id = "a" + i;
    e.setAttribute("max", "2");
    e.setAttribute("value", "1");
    e.innerHTML = i;
    a.appendChild(e);
  }
  d.appendChild(a);
  document.getElementById("start").style.display = "none";
  document.getElementById("start").parentNode.appendChild(d);
  rAF(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  var d = document.getElementById("controller" + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  if (!haveEvents) {
    scangamepads();
  }
  for (j in controllers) {
    var controller = controllers[j];
    var d = document.getElementById("controller" + j);
    var buttons = d.getElementsByClassName("button");
    for (var i=0; i<controller.buttons.length; i++) {
      var b = buttons[i];
      var val = controller.buttons[i];
      var pressed = val == 1.0;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        val = val.value;
      }
      var pct = Math.round(val * 100) + "%"
      b.style.backgroundSize = pct + " " + pct;
      if (pressed) {
        b.className = "button pressed";
      } else {
        b.className = "button";
      }
    }

    var axes = d.getElementsByClassName("axis");
    for (var i=0; i<controller.axes.length; i++) {
      var a = axes[i];
      a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
      a.setAttribute("value", controller.axes[i] + 1);
    }
    
    var rotace = (controller.axes[0] * 80);
    var rotaceY = (controller.axes[2] * 80);
    var rotaceX = (controller.axes[3] * 80);
    var zoom = (controller.axes[1] * -1) + 1;
    var transformace = "rotate(" + rotace + "deg) scale(" + zoom + ") " + "rotateY(" + rotaceY + "deg) rotateX(" + rotaceX + "deg)";
    
    document.body.style.webkitTransform = document.body.style.transform = document.body.style.mozTransform = transformace;
    
  }
  rAF(updateStatus);
}

function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (!(gamepads[i].index in controllers)) {
        addgamepad(gamepads[i]);
      } else {
        controllers[gamepads[i].index] = gamepads[i];
      }
    }
  }
}

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);
if (!haveEvents) {
  setInterval(scangamepads, 500);
}
</script>
</div>

<p><a href="http://kod.djpw.cz/bfdb">Živá ukázka</a></p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>Smashing Magazine: <a href="http://www.smashingmagazine.com/2015/11/gamepad-api-in-web-games/">Using The Gamepad API In Web Games</a></li>
  
  <li>HTML5 Rocks: <a href="http://www.html5rocks.com/en/tutorials/doodles/gamepad/">Jumping the Hurdles with the Gamepad API</a></li>
  
  <li><a href="http://www.html5rocks.com/en/tutorials/doodles/gamepad/gamepad-tester/tester.html">Živá ukázka</a></li>
  
  <li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/API/Gamepad">Using the Gamepad API</a></li>
  
  <li><a href="http://luser.github.io/gamepadtest/">Živá ukázka</a></li>
</ul>