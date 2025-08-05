---
title: "Odpočítávání času v JavaScriptu"
headline: "Odpočítávání času v HTML"
description: "Jak udělat na webu odpočítávání času. V JavaScriptu i v čistém CSS."
date: "2013-12-10"
last_modification: "2013-12-19"
status: 1
tags: ["css", "hotova-reseni", "js", "webove-animace"]
format: "html"
---

<p>V případě, že na stránce potřebujeme <b>odpočítávat čas</b>, existují následující řešení <b>na straně klienta</b>.</p>

<h2 id="js">JavaScript</h2>
<p>Pro odpočítávání v JS jde použít dvě funkce:</p>

<ul>
  <li><code>setInterval</code></li>
  <li><code>setTimeout</code></li>
</ul>

<p>První (<code>setInterval</code>) vytvoří nekonečné opakování v zadaném intervalu. Druhá <code>setTimeout</code> se vykoná jen jednou, když uplyne <b>nastavený čas</b> — nic ale nebrání po uplynutí času a provedení akce zavolat další <code>setTimeout</code>, takže i tak se dá vytvořit <b>nekonečné opakování</b>.</p>

<pre><code>var <b>casovac</b> = setInterval(function() {
  // nějaká akce
}, <i>1000</i>)</code></pre>

<p>Zápis pro <code>setTimeout</code> bude obdobný. Přiřadit časovač do <b>proměnné</b> <code>casovac</code> je vhodné k tomu, aby šel zrušit zadáním:</p>
<pre><code>clearInterval(<b>casovac</b>);</code></pre>

<p>Druhý argument s hodnotou <code>1000</code> je čas opakování (respektive spuštění pro <code>set<b>Timeout</b></code>) a zadává se v jednotkách profíků — <b>milisekundách</b>. Tisíc milisekund je jedna vteřina, <code>500</code> milisekund je půl vteřiny a cca 30 milionů milisekund je <b>jeden rok</b>. Větší hodnoty je pro přehlednost vhodné psát jako násobky:</p>

<table>
  <tr>
    <td><code>1000 * 5</code></td>
    <td>5 vteřin</td>
  </tr>
  <tr>
    <td><code>1000 * 60</code></td>
    <td>1 minuta</td>
  </tr> 
  <tr>
    <td><code>1000 * 60 * 5</code></td>
    <td>5 minut</td>
  </tr>   
  <tr>
    <td><code>1000 * 60 * 60 * 3</code></td>
    <td>3 hodiny</td>
  </tr>
  <tr>
    <td><code>1000 * 60 * 60 * 24 * 100</code></td>
    <td>100 dní</td>
  </tr>  
  <tr>
    <td><code>1000 * 60 * 60 * 24 * 365 * 2</code></td>
    <td>2 roky (přibližně)</td>
  </tr>    
</table>

<ul>
  <li><a href="http://kod.djpw.cz/wow">Ukázka</a> časovače (<code>setInterval</code>), který každou vteřinu vypíše do stránky „Ahoj“. 
  </li>
  <li>Použití <code>set<b>Timeout</b></code> by <a href="http://kod.djpw.cz/bpw">vypadalo podobně</a>.</li>
  <li>A vytvoření opakovaného <code>set<b>Timeout</b></code>u <a href="http://kod.djpw.cz/cpw">takto</a>.
  </li>
</ul>

<h2 id="odpocitavani-do">Datum a odpočítávání</h2>
<p>Využitím výše uvedených funkcí se dá vytvořit i odpočítávání do určitého dne.</p>

<p>Existuje spoustu různých <b>countdown skriptů</b>, mně se osvědčil tento, který umí i <b>české skloňování</b> (na ukázce odpočítává do 24. 12. 2063).</p>

<div class="live">
<script>
var vterina = 1000;
var minuta = vterina * 60;
var hodina = minuta * 60;
var den = hodina * 24;
var rok = den * 365.24219;

var slova = {
    roku: ["rok", "roky", "let"],
    dnu: ["den", "dny", "dnů"],
    hodin: ["hodina", "hodiny", "hodin"],
    minut: ["minuta", "minuty", "minut"],
    vterin: ["vteřina", "vteřiny", "vteřin"]
};

function sklonovani(pocet, co) {
    if (pocet == 1) return slova[co][0];
    if (pocet < 5 && pocet > 0) return slova[co][1];
    return slova[co][2];
}

function odpocet(el) {
    var konec = new Date(el.getAttribute("data-konec"));
    var ted = new Date();
    var rozdil = konec - ted;
    if (rozdil < vterina) {
        el.innerHTML = el.getAttribute("data-hlaska");
        return;
    }
    var zbyva = {
        roku: Math.floor(rozdil / rok),
        dnu: Math.floor(rozdil % rok / den),
        hodin: Math.floor((rozdil % den) / hodina),
        minut: Math.floor((rozdil % hodina) / minuta),
        vterin: Math.floor((rozdil % minuta) / vterina)
    }

    var vypis = el.getAttribute("data-zbyva");
    for (co in zbyva) {
        var pocet = zbyva[co];
        if (pocet > 0) vypis += " " + pocet + " " + sklonovani(pocet, co);

    }

    el.innerHTML = vypis;
    setTimeout(function() {
      odpocet(el); 
    }, vterina);
}
</script>
  
<p id="odpocet" data-konec="12/24/2063 15:18:40" data-hlaska="Čas vypršel!" data-zbyva="Do odpočtu zbývá:"></p>
<script>
  odpocet(document.getElementById('odpocet'));
</script>  
</div>

<p><a href="http://kod.djpw.cz/xby">Samostatná ukázka</a></p>


<h2 id="css">CSS odpočítávání</h2>
<p>S příchodem <a href="/animation">CSS animací</a> (funkční od <b>IE 10</b>) se nabízí nové možnosti, jak jednoduché odpočítávání realisovat čistě v CSS (<a href="http://kod.djpw.cz/gfc">samostatná ukázka</a>).</p>

<div class="live">
  <style>
  @keyframes odpocitat {
    0%   {top: 0; background: #0D6AB7}
    100% {background: #DA3F94; top: -250px;}
  }
  @-webkit-keyframes odpocitat {
    0%   {top: 0; background: #0D6AB7}
    100% {background: #DA3F94; top: -250px;}
  }
  .odpocet span {
    display: block; background: blue; width: 50px; height: 50px;
    line-height: 50px;
    text-align: center; color: white;
    position: relative;
    animation: odpocitat 5s linear infinite;
    -webkit-animation: odpocitat 5s linear;
  }
  .odpocet {height: 50px; overflow: hidden}
  </style>
  <div class="odpocet">
    <span>5</span>
    <span>4</span>
    <span>3</span>
    <span>2</span>
    <span>1</span>
    <span>0</span>
  </div>
</div>

<p>Řešení spočívá ve vytvoření si pásu čteverčků s jednotlivými čísly, které se potom posouvají, čímž se vytvoří efekt odpočítávání.</p>

<p>Díky časovaným animacím je možné vytvořit i visuálně zajímavější „odpočítávání“. Třeba <i>hodiny</i>. (<a href="http://kod.djpw.cz/sow">Samostatná ukázka</a>)</p>

<div class="live">
  <style>
  @keyframes rucicka {
    to {transform: rotate(360deg)}
  }
  @-webkit-keyframes rucicka {
    to {-webkit-transform: rotate(360deg)}
  }
  
  .hodiny {border-radius: 50%; border: 4px solid #0D6AB7; width: 100px; height: 100px; position: relative}
  .rucicka {background: #DA3F94; width: 40px; height: 4px; position: absolute; top: 50%; left: 50%; margin-top: -2px; margin-left: -40px; -webkit-animation: rucicka 10s infinite linear; animation: rucicka 10s infinite linear; -webkit-transform-origin: right center; transform-origin: right center;}
  
  .rucicka:before {content: ""; position: absolute; background: #1081DD; border-radius: 50%; width: 8px; height: 8px; right: -2px; top: -2px}
  .rucicka:after {content: ""; border: 4px solid transparent; border-right-color: #DA3F94; position: absolute; left: -8px; top: -2px; width: 10; height: 0;}
</style>
  <div class="hodiny">
    <div class="rucicka"></div>
  </div>
</div>

<ul>
  <li>Šipička na konci ručičky je <a href="/css-kresleni#trojuhelniky">nakreslená v CSS</a>.</li>
  <li>Puntík uprostřed a kruhový <i>obal</i> je vytvořen <a href="/border-radius">kulatými rohy</a>.</li>
  <li>Pohyb ručičky zajišťuje animací řízena <a href="/rotace">rotace</a>.</li>
</ul>

<p>Přidáním dalších ručiček a nastavením odpovídajícího času animace by šlo vytvořit plnohodnotné hodiny.</p>