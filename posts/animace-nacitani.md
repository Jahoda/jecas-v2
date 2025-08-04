---
title: "Animace načítání"
headline: "CSS animace průběhu načítání"
description: "Jak využitím CSS <code>transition</code> a špetky JavaScriptu vytvořit animované znázornění průběhu načítání, jako je třeba na YouTube."
date: "2014-03-01"
last_modification: "2014-03-01"
status: 1
tags: ["CSS", "Hotová řešení", "Animace"]
---

V [AJAXových](/ajax) aplikacích se při vyvolání akce někdy hodí **znázorňovat průběh**. Pokud dokončení akce trvá déle, uživatel má **visuální potvrzení**, *že se něco děje*.

Od **IE 10** je možné animaci vytvořit přes CSS vlastnost [`transition`](/transition), která bude měnit šířku, což vytvoří kýžený efekt.

Také by šly použít přímo animace přes [`@animation`](/animation), ale v tomto případě celkem stačí i `tranisition` a kód nemusí být [zaprefixovaný](/css-prefixy).

.obal {background: #DA3F94; width: 200px; height: 10px; position: relative;}
.postup {height: 10px; background: #1081DD; width: 0; position: absolute; top: 0; left: 0;}

Animovat 0.5 s
Animovat 2 s

var prubeh = function(cas, obal) {
    var postup = obal.querySelector(".postup");

    var animovat = function() {
        postup.style.transition = "width " + cas + "s";
        postup.style.width = "100%";  
    };
    
    var vycistit = function() {
        postup.style.width = "0";
        postup.style.transition = "";
    };
    
    animovat();
    setTimeout(vycistit, cas * 1000);
};

[Samostatná ukázka](http://kod.djpw.cz/pdcb)

## Jak to funguje?

Postup je docela jednoduchý.

  - Nejprve se vytvoří taková atrapa [značky `&lt;progress>`](/progress), tj. *obal*ový `&lt;div>` a vnořený `&lt;div>` pro znázornění *postup*u.

  - Tento element se spolu s **dobou trvání přechodu** předá funkci `prubeh`.

  - Funkce potom jen do `postup.style.transition` nastaví příslušně dlouhou animaci, čímž animování započne.

  - A nakonec se [časovačem](/odpocitavani) (`setTimeout`) provede *vyčistění animace*.

## Progress-bar přes celou stránku

Chtěli-li bychom animaci znázorňovat nahoře přes celou šíři stránky, nejjednodušší je element `.postup` [fixně naposicovat](/position#fixed) nahoru (fixně posicovaný element totiž v podstatě není ovlivňován ničím jiným na stránce).

  .postupNacitani {height: 10px; background: #0D6AB7; width: 0; position: fixed; top: 0; left: 0;}

Animovat 0.5 s
Animovat 2 s

var prubehNacitani = function(cas, postup) {
    var animovat = function() {
        postup.style.transition = "width " + cas + "s";
        postup.style.width = "100%";  
    };
    
    var vycistit = function() {
        postup.style.width = "0";
        postup.style.transition = "";
    };
    
    animovat();
    setTimeout(vycistit, cas * 1000);
};

[Samostatná ukázka](http://kod.djpw.cz/qdcb)

## Skutečný stav načítání

Výše uvedené ukázky nijak neznázorňují skutečný průběh načtení stránky, ale jen spouští animaci na pevně stanovenou dobu.

Vytvořit skutečnost odrážející progressbar je poměrně komplikované, jelikož u typické webové stránky se zpravidla po **vyvolání akce** nejprve **neznámou a nejdelší dobu** čeká na odpověď serveru. Když dorazí, tak už se obsah většinou vykreslí bleskurychle.

Tudíž se není moc od čeho odrazit. Stahovat jednotlivé části stránky několika HTTP požadavky, aby reálně fungovalo zobrazování načítání, je většinou samoúčelné, jelikož to nejspíš **prodlouží dobu načítání**.

Zajímavé řešení může být vytvořit **nekončený stav průběhu**, kdy animace začne rychle, ale neustále se zpomaluje a zpomaluje.