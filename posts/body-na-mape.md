---
title: "CSS mapa s popisky"
headline: "Body s popisky na mapě"
description: "Statická obrázková mapa s vlastními body a <code>:hover</code> popisky."
date: "2013-05-12"
last_modification: "2013-05-12"
status: 1
tags: ["CSS", "Hotová řešení", "Mapy"]
---

.map {position: relative; width: 600px; height: 350px}
.map ul {list-style: none}
.map li {position: absolute; background: #107FDB; ; border: 1px solid transparent}
.map .about {display: none; margin: 0}
.map li > a {text-decoration: none; color: #fff; font-weight: bold; position: relative; padding: 0 20px 0 2px; background: #107FDB}
.map li > a span {position: absolute; top: 50%; margin-top: -5px; right: 2px; background: #fff; width: 10px; height: 10px; border: 1px solid #107FDB}
.map .right > a {padding: 0 2px 0 20px}
.map .right > a span {left: 2px;}
.map li:hover .about {display: block; padding: .3em; background: #fff; border: 1px solid #ccc}
.map li:hover > a {background: #107FDB}
.map li:hover {border-color: #fff}

        Vidlákov Navržená struktura organizace ve značné míře podmiňuje vytvoření forem působení.

        Prdelákov Tímto způsobem počátek každodenní práce na poli formování pozice.

        Psojedy (nejsou na mapě)

        Kolín Krátký popis

        Kotěhůlky Popis

## Hlavní vlastnosti

	Nezávislé na JS,
	rozumný HTML kód – jednotlivé body jsou seznam:
		```
&lt;ul>
	&lt;li>&lt;a href="">Název bodu&lt;span>&lt;/span>&lt;a> 
	&lt;p class='about'>Popis&lt;/p>
&lt;/ul>
```

      částečná použitelnost při **nedostupnosti obrázku**,
	jednoduchá modifikace nepřílišnou závislostí na obrázku (nemusí se body do mapy natvrdo překreslovat).
	funkční od IE 7 včetně.

## Řešení

  Relativně [posicovaný](/position) kontejner o rozměru obrázku,
	absolutně posicované položky seznamu (body na mapě),
      při `:hover`u na `&lt;li>` se objevuje odstavec s [popisem](/tooltip),
        samotný bod je prázdný `&lt;span>` s rozměry 10 × 10 px, zakulacení lze od IE 9 včetně řešit vlastností `[border-radius](/border-radius)` v šířce čtverečku,
	pomocí třídy `.right` lze přepnout umístění čtverečku zleva do prava.

## Zjištění souřadnic

Souřadnice lze zjistit pomocí atributu `ismap` (souřadnice by se měli zobrazovat ve stavovém řádku prohlížeče za otazníkem a mřížkou[*](#note1)).

A dle toho vhodně upravit umístění:
```
&lt;li style='left: 250px; top: 110px'>&lt;a href='#5'>Místo&lt;span> &lt;p class='about'>Popis&lt;/p>
```

	Pokud se neobjevuje stavový řádek, po kliknutí se souřadnice přenesou do řádku adresního.