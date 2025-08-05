---
title: "Znázornění načítání pomocí kostry"
headline: "Znázornění načítání pomocí kostry"
description: "Jak znázorňovat načítání na webových stránkách, aby zlepšovalo dojem z rychlé odezvy."
date: "2014-03-30"
last_modification: "2014-03-30"
status: 0
tags: []
format: "html"
---

<p>Když se u <a href="/ajax">AJAXové</a> aplikace něco načítá, bývá častým zvykem, že se někde na stránce znázorní <a href="/nacitani-ajax">průběh načítání</a> pomocí <a href="/css-spinner">roztočeného kolečka</a>.</p>

<p>Je to lepší než nic, ale existuje lepší způsob – zobrazit na místě, kde se má objevit <b>načtený obsah</b>, jeho prázdnou kostru.</p>

<p>Například <a href="/facebook">Facebook</a> používá tuto <b>atrapu</b> místo příspěvků, které se ještě nenačetly.</p>

<p><img src="/files/fejkovani/facebook-prispevek.png" alt="Atrapa příspěvku na Facebooku" class="border"></p>

<div class="external-content">
  <ul>
    <li>
  <a href="http://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html">Facebook content placeholder deconstruction</a>
</li>
  </ul>
</div>

<p>U <i>single page application</i>, kde je rozhraní tvořené v JavaScriptu, nemusí být problém po kliknutí na odkaz pro přechod na jiný typ stránky zobrazit její <b>prázdnou kostru</b> ještě před stahování dat ze serveru, kam se později začne donačítat obsah.</p>

<p>Dojem z takového načítání bude lepší než z prostého točícího se kolečka.</p>