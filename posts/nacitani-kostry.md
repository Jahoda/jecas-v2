---
title: "Znázornění načítání pomocí kostry"
headline: "Znázornění načítání pomocí kostry"
description: "Jak znázorňovat načítání na webových stránkách, aby zlepšovalo dojem z rychlé odezvy."
date: "2014-03-30"
last_modification: "2014-03-30"
status: 0
tags: []
---

Když se u [AJAXové](/ajax) aplikace něco načítá, bývá častým zvykem, že se někde na stránce znázorní [průběh načítání](/nacitani-ajax) pomocí [roztočeného kolečka](/css-spinner).

Je to lepší než nic, ale existuje lepší způsob – zobrazit na místě, kde se má objevit **načtený obsah**, jeho prázdnou kostru.

Například [Facebook](/facebook) používá tuto **atrapu** místo příspěvků, které se ještě nenačetly.

  [Facebook content placeholder deconstruction](http://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html)

U *single page application*, kde je rozhraní tvořené v JavaScriptu, nemusí být problém po kliknutí na odkaz pro přechod na jiný typ stránky zobrazit její **prázdnou kostru** ještě před stahování dat ze serveru, kam se později začne donačítat obsah.

Dojem z takového načítání bude lepší než z prostého točícího se kolečka.