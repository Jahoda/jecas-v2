---
title: "Průběh načítání AJAXu"
headline: "Průběh načítání AJAXu"
description: "Při odesílání dat AJAXem je dobré dát uživateli vědět, že se něco děje."
date: "2014-03-10"
last_modification: "2014-12-23"
status: 1
tags: ["JavaScript", "Hotová řešení", "AJAX"]
---

Vytvořit obyčejnou stránku, která načítá obsah pomocí [AJAXu](/ajax), není příliš složité.

```
function nacist(url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      // vypsaní obsahu;
      document.getElementById("obsah").innerHTML = xhr.responseText;
    }
  }
  xhr.open('GET', url);
  xhr.send();
}
```

Udělat to **lépe** ale už dá trochu práce. Zásadní problémy uvedeného prostého řešení existují dva. Když funguje všechno jak má, tak se nemusí projevit.

  - Znázornění uživateli, **že se něco děje**. U standardního požadavku, kdy se načítá nová stránka to **řeší prohlížeč**.

  - **Vícenásobné provedení požadavku**, když uživatel klikne na daný odkaz **vícekrát**.

## Indikace načítání

Když uživatel klikne a **delší dobu se nic nestane**, **ztrácí důvěru v aplikaci** – vypadá to, že je něco rozbité, takže bude akci provádět znovu nebo stránku opustí, protože mu web *nefunguje*.

Řešení je po vykonání akce vytvořit signalisaci, že se něco děje. Při normálním běhu webu by obsloužení požadavku **mělo být tak rychlé** (desítky až nízké stovky milisekund), že se provedení obejde i bez **indikace načítání**.

Načítání tedy potřebujeme znázornit až po **určité době – např. po 0,5 vteřiny**. Jelikož se může stát, že se tato indikační animace **objeví jen na chvíli**, mělo by z ní být **co nejrychleji** patrné, že signalisuje načítání (tj. se vyhnout slovním popisům).

    - [CSS animace průběhu načítání](/animace-nacitani) – *progress bar* jako je na YouTube

    - [HTML značka `&lt;progress>`](/progress) – element znázorňující načítání (**IE 10**+), [ukázka](http://kod.djpw.cz/wxib)

    - [CSS spinner](/css-spinner) – točící se kolečko

Jednoduché řešení je i využít [kursoru `wait`](/cursor#wait), ale nebude fungovat na **dotykových zařízeních**, kde žádný kursor není.

Technické řešení animace potom bude fungovat tak, že se při **vyvolání akce** například [změnou třídy](/prepinani-trid) **zobrazí indikační prvek** a při dokončení akce se změnou třídy změní na původní zase **skryje**.

Pokud chceme při načítání stránku ovlivnit nějak komplexněji, hodí se třídu „`nacitam`“ přidat pro [`&lt;body>` nebo `&lt;html>`](/documentelement-body).

## Vícenásobné požadavky

Následkem **absence zobrazení načítání**, **netrpělivosti uživatele** (dvojitý klik místo jednoho) nebo vlastností **asynchronních požadavků** se může stát, že se na tutéž akci vytvoří více požadavků než jeden.

### První vyhrává

Výsledkem jsou potom dost komické situace, kdy se třeba při uložení dat nejprve zobrazí hláška, že bylo úspěšné, a následovat bude varovná hláška, že nebylo co měnit (změny provedl první požadavek).

Pokud jsou určité uživatelské akce **limitovány nějakým počtem změn**, netrpělivý uživatel si takto *vyplácá* pokusy.

Cílové chování je, aby první požadavek **zabránil do doby svého dokončení** v provádění dalších požadavků.

Řešení je zavedení proměnné znázorňující stav.

```
var odesilaSe = false;
```

V akci pro AJAX se potom v případě, že se nic neodesílá vyšle požadavek a `odesilaSe` se nastaví na `true`.

```
function nacist(url) {
  if (odesilaSe) return;
  odesilaSe = true;
  // poslání požadavku
}
```

Ve funkci, která dostane data, se kromě výpisu *odemkne* odesílání pro další akce:

```
odesilaSe = false;
```

### Pozdější vyhrává

Jiná situace nastane například při zobrazení obsahu z **našeptávače** reagující na každý stisk klávesy. Na první pohled by zde neměl být problém – je cílem, aby pozdější požadavek **přepsal dřívější**.

Bohužel zde máme jev **předběhnutí požadavků**. Ono se totiž může stát, že později zavolaný požadavek bude dokončen dříve než ten dřívější.

Výsledkem je potom zobrazení aktuálních dat z posledního požadavku, které následně nahradí data **neaktuální** z požadavku staršího, který se pozdržel.

Řešení je **zrušení ajaxového požadavku** před vytvořením nového.

```
if (xhr) xhr.abort();
```

K podobným případům může docházet i při volání akcí [časovačem `setInterval`](/odpocitavani). Kromě použití `abort()` jde místo `setInterval` použít `set**Timeout**` při každém úspěšném získání dat. Tedy nepoužívat časovou smyčku (`setInterval`), ale nový požadavek si opakovaně vytvářet jednorázově.

```
var casovac;
function nacist(url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      // vypsaní obsahu;
      document.getElementById("obsah").innerHTML = xhr.responseText;
      // zavolání dalšího požadavku
      casovac = setTimeout(function() {
        nacist(url);
      }, 10 * 1000);
    }
  }
  xhr.open('GET', url);
  xhr.send();
}
```

## Hotové řešení

[Živá ukázka](http://kod.djpw.cz/jwib) řešení, kdy je před novým požadavkem nutné čekat na ten předchozí.

Animace se spouští **s prodlevou 0,5 vteřiny**, aby v případě rychlého načtení neobtěžovala. Během načítání **nejde vytvořit nový požadavek**.

V plném rozsahu se ukázka projeví při **pomalé odezvě serveru nebo pomalém připojení**. Simulovat vysokou odezvu připojení je snadno možné ve [vývojářských nástrojích](/vyvojarske-nastroje) v **Chrome** při emulaci mobilních zařízení.

Nasimulovat si **dlouhou odezvu serveru** jde obvykle použitím funkce `sleep`.

## Vytuhnutí

Relativně problematické je řešení stavu, kdy **ajaxový požadavek** nebude hodně **dlouhou dobu reagovat**.

Zde můžeme při zavolání požadavku vytvořit další časovač, který po delší době zkontroluje, jestli se na požadavek **ještě čeká** (když požadavek skončí dřív, kontrolující časovač odstraní).

V případě neúspěchu se nabízí zkusit požadavek **odeslat znovu** nebo uživatele vyzvat ke **klasickému obnovení stránky** (zde je ovšem nutné předcházet [zapomenutí dat](/zalohovani-formularu)).