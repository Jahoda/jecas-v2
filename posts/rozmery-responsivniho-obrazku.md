---
title: "Nastavení rozměrů responsivního obrázku"
headline: "Nastavení výšky responsivního obrázku"
description: "Jak zabránit poskakování responsivních obrázků během načítání stránky."
date: "2015-07-25"
last_modification: "2015-08-19"
status: 1
tags: ["Hotová řešení", "Responsivní design", "Obrázky"]
---

Nejsnazší řešení [responsivních obrázků](/responsivni-obrazky) je nastavení maximální šířky `&lt;img>` na 100 % a nastavení výšky na `auto`, aby se **dopočítala podle šířky**.

```
img {
  max-width: 100%; 
  height: auto;
}
```

Obrázky se potom sice hezky přizpůsobují velikosti okna, ale trpí zásadním nedostatkem – **prohlížeč nezná výšku, dokud obrázek nestáhne**. To způsobuje nepěkné **poskakování stránky během načítání**, které navíc zdržuje vykreslování.

Prohlížeč zkrátka neví, kolik místa má pro obrázek vyhradit.

Naštěstí existuje následující řešení:

    - [Výška závislá na šířce](/vyska-podle-sirky) – způsob, jak nastavit výšku jako procento z šířky

Využívá se toho, že `padding` se počítá z šířky elementu a v případě výchozího „obsahového“ [box modelu](/box-sizing) (`box-sizing: border-box`) se do rozměrů sčítá `padding` s výškou. Pokud tedy bude `height` nulová, bude celkovou výšku určovat hodnota `padding`u.

## Řešení

Pro nastavení výšky obrázku v závislosti na proměnlivé šířce je tak nutné **nastavit poměr stran** jako `padding`.

Dopočítat potřebný poměr jde snadno **vydělením výšky obrázku jeho šířkou** a převedením na procenta (vynásobit stem).  Níže v článku je přímo generátor kódu, který po zadání URL obrázku připraví potřebné CSS.

### Realisace v CSS

V CSS je postup takový, že se pro obrázek vytvoří kontejner (obal), který vymezí prostor na šířku a na výšku, což zabrání poskakování, a do tohoto obalu se vloží samotná značka `&lt;img>`.

HTML kód:

```
&lt;div class="img-cover">
  &lt;img src="">
&lt;/div>
```

Element `.img-cover` bude mít nastaven požadovaný poměr stran (v tomto případě 75 %):

```
.img-cover {
    height: 0;
    padding-bottom: 75%;
}
```

Obrázek se potom pouze roztáhne podle tohoto obalu:

```
.img-cover img {
  width: 100%;
}
```

V případě, že bude dostupná šířka pro `.img-cover` větší než skutečná šířka obrázku, bude obrázek **roztažen nad své rozměry**.

Je-li to nežádoucí, je potřeba všechno obalit do dalšího `&lt;div>`u:

```
&lt;div class="img">
  &lt;div class="img-cover">
    &lt;img src="">
  &lt;/div>
&lt;/div>
```

Tento obal `.img` bude mít nastavenou maximální šířku (`max-widht`). Odsazení (`padding`) elementu `.img-cover`, které ve finále stanovuje výšku, se totiž počítá z šířky svého rodiče.

  **Generátor CSS kódu pro přepočet rozměrů v px na procenta:**

  Načíst obrázek z URL: 

    Šířka: 

    Výška: 

     Nastavit maximální šířku

  ```
.img-cover {height: 0; padding-bottom: 75%}
.img-cover img {width: 100%; height: auto}
```

## Obrázky s různými rozměry

Problém nastane, když je na stránce hromada obrázků s **různými rozměry**. Potom by ruční počítání poměru výšky a šířky každého z nich bylo značně pracné.

### Řešení na straně serveru

V případě, že na straně serveru existuje nějaký mechanismus, který obrázkům dokáže nastavovat rozměry, může rovnou dopočítat i poměr s maximální šířkou a přidat tato pravidla do `style` atributu.

```
&lt;div class="img" *style="max-width: 200px"*>
  &lt;div class="img-cover" **style="padding-bottom: 75%"**>
    &lt;img width="200" height="150">
  &lt;/div>
&lt;/div>
```

Výše uvedený kód počítá s CSS pravidly:

```
.img-cover {height: 0}
.img-cover img {width: 100%; height: auto}
```

V budoucnu je možné, že by rozměr z atributů mohl jít získat přes `attr` a dopočítat [funkcí `calc`](/calc). Momentálně ale `attr` funguje pouze u vlastnosti [`content`](/content-attr).

    - [Živá ukázka](http://kod.djpw.cz/tbpb) vygenerovaného kódu kolem obrázků

### Řešení v JavaScriptu

Použít k nastavení rozměrů JS je spíš nouzové řešení, protože některé obrázky se mohou **začít načítat dříve**, než se stihne spustit skript nastavující rozměry.

Dále řešení v JavaScriptu přichází pouze v úvahu, když obrázky už mají nastaveny rozměry v HTML atributech `width` a `height`. JS sice umí [zjistit skutečné rozměry obrázku](/skutecne-rozmery-obrazku), potřebuje ho ale k tomu **nejprve načíst**, což je v tomto případě problém.

JS tedy projde obrázky na stránce (`document.images`) a obalí je do elementů **zabírající prostor o rozměrech obrázku**.

Aby bylo poskakování co nejmenší, měl by se tento kód spustit na stránce co nejdříve.

    - [Živá ukázka](http://kod.djpw.cz/sbpb) – vytvoření placeholderů pro responsivní obrázky

## Netrpí poskakováním můj web?

Nejlepší způsob, jak zjistit, jestli tímto problémem web netrpí, je vypnutí/zakázání obrázků.

V **Chrome** je toto nastavení pod `chrome://settings/content`.

Všimnout si poskakování stránky jde i při nastavení velmi pomalého připojení ve [vývojářských nástrojích](/vyvojarske-nastroje).

Bez **vypínání obrázků** v prohlížeči si jde pomoci krátkým JavaScriptem, který všechny obrázky na stránce nahradí 1px bílým GIFem.

Po spuštění tohoto kódu by dobře udělaná stránka **neměla nijak poskočit**.

```
(function(img) {
    for (var i = img.length; i--; ) {
        img[i].src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAAHAP8ALAAAAAABAAEAAAICRAEAOw==";
    }
})(document.images);
```

Spustit tento kód přímo na stránce jde třeba vložením po napsání `javascript:` do adresního řádku (kopírovat „`javascript:`“ z bezpečnostních důvodů jít nemusí).

## Odkazy jinam

  - [Intrinsic Placeholders with the Picture Element](http://daverupert.com/2015/12/intrinsic-placeholders-with-picture/) – využití značky `&lt;picture>` pro placeholdery

  var imgCode = document.getElementById("img-code");
  
  function generateCode(f) {
    var ratio = Math.round(parseInt(f.height.value) / parseInt(f.width.value) * 100 * 100) / 100;
    var code = (f.maxwidth.checked) ? ".img {max-width: " + parseInt(f.width.value) + "px}\n" : "";
    code += ".img-cover {height: 0; padding-bottom: " + ratio + "%}" + "\n" +
      ".img-cover img {width: 100%; height: auto}";
    imgCode.innerHTML = code;
  }
  generateCode(document.getElementById("ratio-generator"));
  
  var imgArea = document.getElementById("img-area");
  
  function loadImage(el) {
    var img = new Image();
    img.src = el.value;
    
    imgArea.innerHTML = "";
    imgArea.appendChild(img);
    img.onload = function() {
      el.form.width.value = img.naturalWidth;
      el.form.height.value = img.naturalHeight;
      generateCode(el.form);
    }    
  }