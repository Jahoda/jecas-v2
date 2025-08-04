---
title: "Jak vložit YouTube video"
headline: "Vložení videa z YouTube"
description: "Jak přidat na svou stránku video ze serveru YouTube s HTML 5 přehrávačem."
date: "2015-07-14"
last_modification: "2015-07-15"
status: 1
tags: ["Rady a nápady", "YouTube", "Video"]
---

YouTube je nejpopulárnější web pro sdílení videí. Nabízí zároveň snadný způsob, jak na svou stránku **dostat video** bez nutnosti řešit případnou **nekompatibilitu mezi prohlížeči**.

## Vložení videa

Doporučený postup je použít značku `&lt;iframe>`. To má tu výhodu, že stránka na YouTube (která se pomocí rámu vkládá) se může **podle podpory HTML 5 videa** rozhodnout, jestli vytvořit přehrávač:

  - **HTML 5** značkou `&lt;video>`.
  
  - Použít **Flash**.

### Kód pro vložení videa z YouTube

Získat kód pro přidání videa na vlastní web jde na stránce pod videem. Stačí kliknout postupně na *Sdílet* a *Vložit*:

Pro **detailnější nastavení** existují další možnosti, které se zobrazí po kliknutí na *Zobrazit více* – například nastavení rozměrů a podobně.

Zdrojový HTML kód pro *embedování* videa z YT vypadá následovně:

```
&lt;iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/**6HT-yirOGoo**" 
  frameborder="0" 
  allowfullscreen
>
&lt;/iframe>
```

Jediná část, která je unikátní pro každé video je **identifikátor** za adresou „`https://www.youtube.com/embed/`“.

Tento identifikátor se shoduje identifikátorem videa v URL při přehrávání na YouTube.

Je možné si tedy pro **zjednodušení vkládání** připravit funkci, která na základě identifikátoru připraví kód pro vložení.

## Starší způsoby vložení

V dřívějších dobách byl prakticky jediný způsob, jak s dobrou podporou přehrávat video, **přehrávač využívající Flash**.

K tomu se používaly značky `&lt;embed>` nebo `&lt;object>`.

```
&lt;embed 
  width="560" 
  height="315" 
  src="https://www.youtube.com/v/6HT-yirOGoo"
>
```

Flashový přehrávač pro video jde získat z adresy:

```
https://www.youtube.com/v/**6HT-yirOGoo**
```

Kde za `„v/“` je opět tentýž identifikátor, co je v adresním řádku na stránce videa nebo se používá pro vložení do `&lt;iframe>`.

Zdá se ale být ale výhodnější vložit video značkou `&lt;iframe>`, protože bude mít díky možnosti rozhodování mezi Flashem a HTML 5 **lepší celkovou podporu**.

## Vložení přímo stránky z YouTube

Stránka s videem přímo z YouTube (příklad URL: `https://www.youtube.com/**watch?v=**6HT-yirOGoo`) nejde pomocí rámu vložit.

Je to kvůli zakázání vkládání do rámu HTTP hlavičkou: `x-frame-options: SAMEORIGIN`. Skončí to nějakou takovou **chybovou hláškou** (příklad z [IE 11](/ie11)).

## Automatické vložení YouTube přehrávače

Pro pohodlnější vytváření obsahu umí některé redakční systémy – třeba [WordPress](/wordpress) – po vložení běžné adresy videa **automaticky vložit přehrávač**.

Docílit toho svépomocí jde na základě nahrazování.

Nejprimitivnější regulární výraz pro získání identifikátoru videa by mohl vypadat následovně:

```
/https:\/\/www\.youtube\.com\/watch\?v=(**[A-z0-9_-]***)/
```

[Živá ukázka v JavaScriptu](http://kod.djpw.cz/hfob)