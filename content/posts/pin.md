---
title: "Přihlašování pomocí PINu"
headline: "Přihlašování pomocí PINu"
description: "Kdy a proč používat ve webových aplikacích přihlašování pomocí PIN kódu."
date: "2015-09-01"
last_modification: "2016-12-21"
status: 1
tags: ["formulare", "hesla", "zabezpeceni"]
format: "html"
---

<p>PIN je zkratka anglického <i lang="en">personal identification number</i> – tedy <b>osobní identifikační číslo</b>.</p>

<p>Nejčastěji se používá u <b>platebních karet</b> nebo <b>SIM karet mobilních telefonů</b>. Většinou sestává ze čtyř číslic, takže je relativně <b>snadný na zapsání</b>, a to je asi hlavní výhoda.</p>

<p>Při přihlašování pomocí PINu stačí vyťukat 4 číslice – to je velké zjednodušení oproti klasickým heslům, které často musí obsahovat 8 a více znaků, velká i malá písmena, číslici nebo nějaký speciální znak.</p>

<p>Umožnit přihlášení číslem (PINem) se tak hodí hlavně v situacích, kdy se <b>uživatel velmi často ohlašuje/přihlašuje</b>.</p>





<h2 id="bezpecnost">Bezpečnost</h2>

<p>Na první pohled se může zdát, že čtyřmístné číselné heslo není dostatečně bezpečné – existuje pouze 10 000 kombinací (10<sup>4</sup>).</p>

<p>Tento problém je řešen <b>omezeným počtem pokusů</b>. Například po 3 neúspěšných pokusech je nutné minutu počkat. Tento čas se s přibývajícími neplatnými pokusy může prodlužovat a <b>vést k zablokování přihlašování</b>.</p>

<p>Odblokování se potom provede zadáním <i>plného hesla</i> nebo zasláním odkazu pro zadání nového PINu na e-mail.</p>





<h2 id="implementace">Implementace</h2>

<p>Na straně serveru je nutné zajistit, aby byl omezený počet špatných pokusů. Na straně klienta je asi nejdůležitější použít vhodný typ formulářového políčka.</p>

<p>Zatímco pro zařízení s fysickou klávesnicí stačí použít <a href="/input#type-password"><code>&lt;input type="password"></code></a>, pro dotyková zařízení je řešení složitější:</p>

<p>Pro zadávání čísla je vhodné přepnout na numerickou klávesnici. To ale není úplně jednoduché:</p>


<h2 id="number">Klávesnice pro zadávání čísel</h2>

<p>Universální spolehlivý postup, jak připravit políčko pro pohodlné dotykové zadávání číslic, funkční na <b>Androidu</b>, <b>iOS</b> i <b>Windows Phone</b> je použít <code>&lt;input type="number"></code> + <a href="/atribut-pattern">atribut <code>pattern</code></a>:</p>

<pre><code>&lt;input type="number" pattern="[0-9]*"></code></pre>



<p>Bez <code>pattern</code>u se na iOS zobrazuje klávesnice i s dalšími speciálními znaky:</p>

<p><img src="/files/pin/ios-type-number.png" alt="Klávesnice type=number na iOS" class="border"></p>

















<p>Po jeho použití už je klávesnice jen s číslicemi:</p>

<p><img src="/files/pin/ios-type-number-pattern.png" alt="Klávesnice type=number a pattern na iOS" class="border"></p>















<p>Na <b>Androidu</b> a <b>WP</b> se jde bez atributu <code>pattern</code> obejít.</p>


<p>Docílit numerické klávesnice jde i s <code>&lt;input type="tel"></code> určeným pro zadávání telefonních čísel – na iOS to nastaví velmi podobnou klávesnici jako typ <code>number</code> s atributem <code>pattern</code> omezeným na čísla.</p>

<p><img src="/files/pin/ios-type-tel.png" alt="Klávesnice type=number a pattern na iOS" class="border"></p>












<p>Na Androidu se typy <code>number</code> a <code>tel</code> liší následovně:</p>



<ol>
  <li>
    <p>Number</p>
    <p><img src="/files/pin/android-type-number.png" alt="Klávesnice type=number na Androidu" class="border"></p>
  </li>
  
  
  
  
  
  
  
  
  
  
  
  
  
    <li>
    <p>Tel</p>
    
<p><img src="/files/pin/android-type-tel.png" alt="Klávesnice type=tel na Androidu" class="border"></p>
  </li>
</ol>
















<h3 id="inputmode">Atribut <code>inputmode</code></h3>

<p>Specifikace HTML 5.2 <a href="http://w3c.github.io/html/single-page.html#input-modalities-the-inputmode-attribute">popisuje</a> atribut <code>inputmode</code>, který by měl sloužit k nastavení typu vstupu nezávisle na typu políčka.</p>

<p>Šel by tak použít i pro typ <code>password</code>:</p>

<pre><code>&lt;input type="password" <b>inputmode="numeric"</b>></code></pre>








<p>Bohužel ale tento způsob není prohlížeči podporován.</p>



<h3 id="odeslani">Odeslání <code>&lt;input type="number"></code></h3>

<p>V některých prohlížečích (např. stará <b>Opera 12</b>) se u políčka typu <code>number</code> neodesílají na server počáteční nuly. Ze vstupu <code>007</code> se tak na server může odeslat jen <code>7</code>.</p>

<p>Není-li stanoven <b>pevný počet míst PINu</b>, může s tím být problém.</p>





<h3 id="maskovani">Maskování hesla</h3>

<p>Ačkoliv je <a href="/maskovani-hesla">maskování hesel</a> u běžných hesel spíš otravné (risiko překlepu), u krátkého PINu to takový problém být nemusí.</p>

<p>Problém ale je, že pro maskování hesla je nutný <code>type=password</code> a pro zobrazení správné klávesnice zase <code>type=number</code>. Existují následující možnosti:</p>


<ol>
  <li>
    <p>Vlastnost <code>text-security</code> – Webkit podporuje s <a href="/css-prefixy">prefixem</a> CSS vlastnost pro maskování:</p>
    
    <pre><code>input[type=number].jako-password {
     -webkit-text-security: disc;
}</code></pre>
    
    
    
    
    
    <p id="testTextSecurity">Ta jde mimochodem aplikovat i na běžný text, takže není problém cokoliv <button onclick="toggle(testTextSecurity, 'zapuntikovat')">zapuntíkovat</button> nebo <button onclick="toggle(testTextSecurity, 'zactvereckovat')">začtverečkovat</button>.</p>
  </li>
  
  <li>
    <p>Heslo/PIN nemaskovat.</p>
  </li>
  
  <li>
    <p>Teoreticky by šlo použít skrytý <code>type="number"</code> pro nastavení správné klávesnice a kopírovat jeho obsah do viditelného <code>type="password"</code>.</p>
    
    <p>Bude ale problém se zobrazováním kursoru – <a href="http://kod.djpw.cz/xldc">ukázka</a>.</p>
  </li>
  
  <li>
    <p>Použít speciální font přes <a href="/font-face"><code>@font-face</code></a> pro <code>&lt;input></code>, kde bude jakýkoliv znak vypadat jako puntík.</p>
    
    <div class="live">
<style>
@font-face {
  font-family: 'password';
  src: url('/files/pin/password-webfont.woff2') format('woff2'),
       url('/files/pin/password-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
.number-password input {
  font-family: 'password';
  height: 1em;
}
</style>
<div class="number-password">
  <input type="number" pattern="[0-9]*">
</div>
    </div>
  </li>
</ol>



<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="http://kod.djpw.cz/wldc">Živá ukázka</a> – test různých <code>&lt;input></code>ů pro zadávání PINu</li>
</ul>

<style>
.zapuntikovat {
  -webkit-text-security: disc;
}
.zactvereckovat {
  -webkit-text-security: square;
}
  
#testTextSecurity button {
  -webkit-text-security: none;
}
</style>