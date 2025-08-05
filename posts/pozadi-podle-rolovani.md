---
title: "Barva podle odrolování na stránce"
headline: "Barva podle odrolování na stránce"
description: "Jak pouze v CSS měnit pozadí elementu v závislosti na odscrollování na stránce."
date: "2020-03-13"
last_modification: "2020-03-15"
status: 1
tags: ["css", "hotova-reseni", "scroll"]
format: "html"
---

<p>Poměrně zajímavý efekt mají zprávy ve <a href="/facebook">Facebook</a> Messengeru:</p>

<p><img src="/files/pozadi-podle-rolovani/fb-messenger-gradient.jpg" alt="Gradient na pozadí ve FB Messengeru" class="border"></p>
















































































<p>V závislosti na umístění ve <i>viewportu</i> mají různou barvu. Tentýž element je dole červený a nahoře modrý. <b>Během rolování mění svoji barvu</b>.</p>

<div class="live">
  <div style="background-attachment: fixed; background-image: linear-gradient(#0D6AB7, #DA3F94); height: 1em;"></div>
</div>

<p>Je až skoro překvapivé, jak jednoduché je takový efekt vyrobit. Stačí k tomu pouhé 2 vlastnosti:</p>

<ol>
  <li>obrázkové pozadí s barevným přechodem – lze vytvořit přímo v CSS pomocí <a href="/gradient">gradientu</a>: <code>background-image: linear-gradient(#0D6AB7, #DA3F94)</code></li>
  <li>fixní obrázkové pozadí – obrázkový gradient se zafixuje pomocí <code>background-attachment: fixed</code></li>
</ol>

<p>Jako obrázek samozřejmě nemusí posloužit pouze CSS gradient, ale může jít o <b>obrázek libovolný</b>.</p>

<p><a href="http://kod.djpw.cz/pevc">Samostatná živá ukázka</a></p>



<h2>Využití</h2>

<p>Kromě již zmíněných zpráv na Facebooku se podobný efekt může hodit pro zvýraznění čehokoliv během scrollování.</p>

<p><a href="http://kod.djpw.cz/qevc">Ukázka zvýraznění nadpisů</a> při <i>příjezdu</i> elementu do viewportu.</p>







<h2>Řešení v JavaScriptu</h2>

<p>V JS jde zjistit počet pixelů, o které <a href="/odrolovani#odrolovano">je odrolováno</a>, a podle toho s barvou libovolně manipulovat.</p>

<p>CSS řešení je ale podstatně jednodušší.</p>





<h2>Výkon</h2>

<p>V dávných dobách bývaly s v CSS fixovaným pozadím přes <code>background-attachment: fixed</code> značné výkonnostní problémy:</p>

<blockquote>
  <p>Na pomalejších počítačích (CPU pod 400, záleží hlavně na grafické kartě) způsobuje hodnota fixed pomalejší rolování, protože se to musí přepočítávat.</p>
  <p class="autor">
    <b>Yuhů</b>, <a href="https://www.jakpsatweb.cz/css/background-attachment.html">Background-attachment</a> na JPW
  </p>
</blockquote>

<p>Dnes už to takový problém není. Nicméně fakt, že se plocha s obrázkovým fixním pozadím musí neustále přepočítávat (<a href="/vykreslovani">překreslovat</a>), platí stále. Je dobré si to při používání podobných efektů uvědomit.</p>