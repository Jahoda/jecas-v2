---
title: "Selektor elementů podle jejich počtu"
headline: "Styl elementů podle jejich počtu"
description: "Jak pomocí CSS odlišně stylovat položky v závislosti na jejich počtu."
date: "2015-03-06"
last_modification: "2015-03-06"
status: 1
tags: ["CSS", "CSS selektory", "Rady a nápady"]
---

Kromě přizpůsobování obsahu stránky šířce prohlížeče ([responsivní design](/responsive)) je jedním z oříšků při navrhování CSS vypořádání se s **proměnlivým počtem položek** – například ve vodorovné navigaci.

Pokud se nastavením velikostí písma, odsazením a podobně připraví horisontální [menu](/menu) pro čtyři položky, může nastat problém při přidávání dalších položek.

V případě, že na variabilní počet tvůrce webu **nemyslel**, stane se něco z následujících případů:

  - Jednotlivé odkazy na sebe budou nepěkně nalepeny.

  - Nabídka se rozuteče na více řádků, což nemusí zase tolik vadit. Položky budou pořád srozumitelně čitelné.

Tyto možnosti znázorňuje obrázek (optimální se zdá poslední způsob, kde se zmenší velikost písma):

Také se může stát, že se menu do prostoru zkrátka nevejde, takže buď vyleze ze svého rodičovského elementu, nebo bude oříznuté (`overflow: hidden`).

Nejsnazší je nejspíš počítat s přetečením do více řádků. K lepšímu výsledku ale povede stylování **na základě počtu položek**.

## CSS selektor pro počet

Jedna možnost je počet položek spočítat JavaScriptem a nastavit podle toho společnému rodiči třídu. Nebo přímo skriptem přeměřovat rozměry a podle toho velikost písma upravovat.

Existuje ale i způsob čistě v CSS pomocí [selektorů](/css-selektory) funkčních od **IE 9**.

## Jedna položka

Pro příklad se bude vycházet z HTML kódu následující podoby:

```
&lt;div class="polozky">
  &lt;div class="polozka">1&lt;/div>
  &lt;div class="polozka">2&lt;/div>
  …
&lt;/div>
```

Že je položka jen jedna, jde určit selektorem `only-child` nebo `only-of-type` (pro zohlednění jen totožných názvů HTML značek).

```
.polozka:only-child {
  /* jen jedna */
}
```

Na základě toho není problém v případě jediné položky zvětšit její rozměr. První položka je větší jen proto, že je v rodičovském elementu osamocená.

    .polozka {
        width: 5em;
    }    
    .polozka:only-of-type {
        width: 10.4em;
    }    

      jediná položka

      dvě
      položky

## Přesný počet položek

Pro sestavení selektoru pro přesně stanovený počet elementů poslouží selektor `nth-last-child`.

Ten zaměří *n* elementů od konce. Protože je cílem reagovat na přesný počet, použije se ještě `:first-child` (aby *n*-tá položka od konce byla zároveň první).

```
.polozka:nth-last-child(3):first-child {
  /* styly pro první položku ze 3 */
}
```

Nakonec stačí přes selektor [libovolného sourozence](/css-selektory#libovolny-sourozenec) zaměřit i ostatní položky:

```
.polozka:nth-last-child(3):first-child,
.polozka:nth-last-child(3):first-child **~** .polozka {
  /* styly pro položky, když jsou 3 */
}
```

Pro vyzkoušení zkuste pár položek přidat.

    + Přidat
    Odebrat

    Položka

Velikost písma položek by se měla dynamicky měnit podle toho, jestli je jen jedna, dvě, tři nebo čtyři.

## Více nebo méně než *n*

Nastavovat speciální styl pro každý přesný počet by nemuselo být úplně elegantní, naštěstí jde snadno selektor upravit, aby se vztahoval na počet položek od do.

### Počet položek *n* a více

```
.polozka:nth-last-child(**n** + 4):first-child,
.polozka:nth-last-child(**n** + 4):first-child **~** .polozka {
  /* styly pro položky, když jsou 4 a více */
}
```

### Položek *n* a méně

```
.polozka:nth-last-child(**-n** + 3):first-child,
.polozka:nth-last-child(**-n** + 3):first-child **~** .polozka {
  /* styly pro položky, když jsou 3 a více */
}
```

    - [Samostatná ukázka závislosti písma na počtu položek](http://kod.djpw.cz/melb)

## Odkazy jinam

  - A List Apart Article: [Quantity Queries for CSS](http://alistapart.com/article/quantity-queries-for-css)

  .polozky {
    overflow: hidden;
  }
  .polozka {
    text-align: center;
    line-height: 2em;
    background: #1081DD;
    color: #fff;
    float: left;
    margin: .2em;  
    font-size: 150%;    
  }

.polozka:only-of-type {
    width: 10.4em;
}

.polozka:nth-last-child(3):first-child,
.polozka:nth-last-child(3):first-child ~ .polozka {
    font-size: 120%;
}

.polozka:nth-last-child(4):first-child,
.polozka:nth-last-child(4):first-child ~ .polozka {
    font-size: 100%;
}

var polozky = document.getElementById('polozky');
var odebratBtn = document.getElementById("odebratBtn");

function pridat() {
    var klon = polozky.firstElementChild.cloneNode(true);
    polozky.appendChild(klon);
    if (polozky.childElementCount > 1) {
        odebratBtn.style.display = "";
    }    
}

function odebrat() {
    if (polozky.childElementCount > 1) {
        polozky.removeChild(polozky.firstElementChild);
    }
    if (polozky.childElementCount == 1) {
        odebratBtn.style.display = "none";
    }    
}