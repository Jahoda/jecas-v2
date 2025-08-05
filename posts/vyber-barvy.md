---
title: "Výběr barvy (color picker)"
headline: "Výběr barvy"
description: "Jak umožnit uživateli vybrat barvu z palety (pomocí JavaScriptu i bez JS)."
date: "2013-11-18"
last_modification: "2013-11-20"
status: 1
tags: ["hotova-reseni", "html", "js"]
format: "html"
---

<p>Má-li návštěvník na webu <b>zadávat barvu</b>, můžeme mu vybírání zpříjemnit zobrazením <b>barevné palety</b>.</p>

<h2 id="input-color">Element <code>&lt;input type=color></code></h2>
<p>HTML 5 přišlo s novým typem <code>&lt;input></code> pro <b>výběr barvy</b>. Momentálně funguje jen v <b>Opeře</b> a <b>Chromu</b>. Ve Firefoxu ani v <a href="/ie11">IE 11</a> nikoliv.</p>
<pre><code>&lt;input type="<b>color</b>" value="#fff"></code></pre>
<p>Do atributu <code>value</code> je možné uvést výchozí hodnotu, jinak se barva nastaví automaticky na černou (<code>#000000</code>).</p>

<div class="live">
  <label>Vybrat barvu: 
    <input type="color" onchange="this.parentNode.parentNode.style.background = this.value"> 
  </label>
  <button onclick="alert(this.parentNode.getElementsByTagName('input')[0].value)">Jaká je barva?</button>
</div>

<p>Hezké na tomto řešení je, že se zobrazuje standardní okno pro <b>míchání barev</b>, které by mohlo být návštěvníkům webu <b>povědomé</b>.</p>

<h2 id="css-paleta">CSS paleta</h2>
<p>Teoreticky si lze sestavit paletu z <code>radio</code> <code>&lt;input></code>ů a využít <a href="/stylovani-checked">selektoru <code>:checked</code></a> (od <b>IE 9</b>).</p>

<div class="live">
  <style>
    .paleta label {float: left; width: 20px; height: 20px; border: 2px solid transparent}
    .paleta [for=cervena] {background: red}
    .paleta [for=modra] {background: blue}
    .paleta [for=zelena] {background: green}
    .paleta [for=zluta] {background: yellow}
    .paleta [for=cerna] {background: black}    
    .paleta :checked+label {border-color: purple;}
    .paleta input {display: none}
  </style>
  <div class="paleta">
    <p>
      Vybrat barvu:<br>
      <input name="barva" value="red" type="radio" id="cervena" checked><label for="cervena"></label>
      <input name="barva" value="blue" type="radio" id="modra"><label for="modra"></label>
      <input name="barva" value="green" type="radio" id="zelena"><label for="zelena"></label>
      <input name="barva" value="yellow" type="radio" id="zluta"><label for="zluta"></label>
      <input name="barva" value="black" type="radio" id="cerna"><label for="cerna"></label>    
      <br clear="all"><button onclick="alert(this.parentNode.querySelector(':checked').value)">Jaká je barva?</button>
    </p>
  </div>
</div>


<h2 id="js-paleta">JavaScriptová paleta barev</h2>
<p>Jelikož má <code>&lt;input type=color></code> i <a href="/css-selektory#checked">selektor <code>:checked</code></a> ne úplně nejlepší podporu, je třeba zvolit nějaké <b>JS řešení</b>.</p>

<h3 id="jscolor">JSColor</h3>
<p>Jednoduché <b>míchátko</b> pro <b>výběr barvy</b>. Stačí připojit jeden JS soubor, nahrát 4 obrázky a <code>&lt;input></code> <i>aktivovat</i>:</p>
<pre><code>&lt;input <b>class="color"</b>></code></pre>

<p><a href="http://jscolor.com/" class="button">Web</a></p>

<h3 id="color-mixer">Color mixer aneb míchátko</h3>
<p>Ještě datově menší <i>color picker</i>. Lze rovněž <a href="http://www.dgx.cz/tools/colormixer/stripe.php">použít</a> pro <code>&lt;input></code>, jen možná trochu nelogicky vyžaduje stisk tlačítka <i>OK</i> (nebo dvojklik) po <b>namíchání barvy</b>.</p>
<p><a href="http://phpfashion.com/color-mixer-aneb-michatko" class="button">Web</a></p>

<h3 id="jquery-minicolors">jQuery MiniColors</h3>
<p>Asi nejlepší nástroj <b>založený na jQuery</b>, podporuje různé styly míchání.</p>

<p><a href="http://labs.abeautifulsite.net/jquery-minicolors/" class="button">Web</a> <a href="http://labs.abeautifulsite.net/jquery-minicolors/without-bootstrap.html" class="button">Demo bez Bootstrapu</a></p>

<h2 id="jak-funguje">Jak JS color picker funguje?</h2>
<p>Jak se dá takové okno pro výběr barvy <b>naprogramovat</b>? Zjednodušeně řečeno se může vycházet z HSL modelu (odstín, saturace (intensita/sytost barvy), světlost) a z něj barvu převádět do RGB (<code>rgb(255, 0, 0)</code>) nebo šestnáctkového zápisu (<code>#ff0000</code>).</p>

<div class="live">
  <style>
    .barva {width: 100px; height: 50px; background: hsl(180, 50%, 50%)}
  </style>
  <script>
    function prebarvit() {
      var h = document.getElementById("h").value;
      var s = document.getElementById("s").value;
      var l = document.getElementById("l").value;
      document.getElementById("barva").style.background = "hsl(" + h + ", " + s + "%, " + l + "%)";
    }
  </script>
  <label>Odstín: <input type="range" id="h" onchange="prebarvit()" value=180 min=0 max=360></label>
  <label>Sytost: <input type="range" id="s" onchange="prebarvit()" value=50 min=0 max=100></label>
  <label>Světelnost: <input type="range" id="l" onchange="prebarvit()" value=50 min=0 max=100></label>
  <div class="barva" id="barva"></div>
</div>

<p>Finální podoba color pickeru už je jen na fantasii tvůrce. Kvůli podpoře starších prohlížečů (HSL zápis umí až <b>IE 9</b>) se může vše rovnou přepočítávat do RGB/hexa a s HSL ve skutečnosti <b>vůbec nepracovat</b>, ale jen využívat tento <b>princip míchání barev</b>.</p>

<h2 id="odkazy">Odkazy jinam</h2>
<ul>
  <li><a href="http://clrs.cc/">Paleta s <i>pojmenovanými</i> barvami</a></li>
</ul>