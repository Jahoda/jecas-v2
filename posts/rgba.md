---
title: "Průhledné pozadí rgba()"
headline: "Zápis průhledné barvy <code>rgba()</code>"
description: "Zadávání barev v CSS pomocí <code>rgba()</code> umožňuje vytvořit průhledné jednobarevné pozadí."
date: "2014-02-15"
last_modification: "2014-05-23"
status: 1
tags: ["CSS", "CSS funkce"]
---

```
element {
  background: rgba(255, 255, 255, 0.5);
}

```

První tři parametry (v rozsahu `0–255`) jsou intensity červené (`r`), zelené (`g`) a modré (`b`) barvy. Čtvrtý parametr je *alpha* — průhlednost. Průhlednost se zadává v rozmezí `0–1`, nulu před desetinnou tečkou je možné vypustit, tj. „`0.5`“ je totéž co „`.5`“.

Tento způsob nastavování barvy funguje od **IE 9**, pro starší prohlížeče existuje jednoduchý *fallback*, kdy se podobná barva, ale **bez průhlednosti**, zadá před tu průhlednou.

```
element {
  background: gray; /* pro IE 8 a starší */
  background: rgba(255, 255, 255, 0.5);
}

```

## Proč průhledné barvy?

Kromě vytváření [průhledného obsahu](/opacity) existuje ještě jeden důvod. Vhodným kombinováním:

  - **průhledné černé** – `rgba(0, 0, 0, .5)`

  - a **průhledné bílé** – `rgba(255, 255, 255, .5)`

Je možné vytvořit barvy typu „o trochu tmavší/světlejší“. Celá stránka potom jde *přebarvit* na jednom místě – na pozadí. Ostatní elementy se relativně přizpůsobí.

    .obal {background: red; padding: .5em}
    .obal div {padding: .1em .5em; color: #fff;}   
    .svetly {background: rgba(255, 255, 255, .5)}
    .tmavy {background: rgba(0, 0, 0, .5)}
    .stredni {background: rgba(0, 0, 0, .2)}

    function styl(barva) {
        document.getElementById("obal").style.background = barva;
    }

        Červená Modrá Zelená

        Světlý obsah

        Tmavy obsah

        Něco mezi

[Samostatná ukázka](http://kod.djpw.cz/xybb).

## IE 8 a starší

Pro podporu v **IE 8** a starších je možné použít například [gradient filtr](/gradient) (se stejnou počáteční i koncovou barvou), kterému se dá nastavit **průhlednost** (určují ji první dva znaky barvy).

### Zesvětlení

```
filter: progid:DXImageTransform.Microsoft.gradient(
  GradientType=0,
  startColorstr='#**4c**ffffff', 
  endColorstr='#**4c**ffffff'
)
```

### Ztmavení

```
filter: progid:DXImageTransform.Microsoft.gradient(
  GradientType=0,
  startColorstr='#**4c**000000', 
  endColorstr='#**4c**000000'
)
```

[Ukázka pro IE 8](http://kod.djpw.cz/yldb)

Nesmí se zapomenout, že **IE 9** podporuje filtry i `rgba`, takže by se efekt při současném použití zdvojil. Nabízí se tedy **průhledný filtr** připojit s využitím [podmíněných komentářů](/podminene-komentare) jen pro **IE 8**.