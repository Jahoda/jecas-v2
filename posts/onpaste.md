---
title: "Onpaste – vložení ze schránky"
headline: "Vložení ze schránky <code>onpaste</code>"
description: "JavaScriptová událost <code>onpaste</code> slouží k odchycení vložení obsahu ze schránky."
date: "2015-02-18"
last_modification: "2015-02-19"
status: 1
tags: ["JavaScript", "Hotová řešení", "Schránka"]
---

U [formulářových](/formulare) polí [`&lt;input>`](/input)/[`&lt;textarea>`](/textarea), kde je reálné očekávat, že bude člověk vkládat ze schránky, se hodí toto vložení **odchytit**. Uživatelé některé údaje kopírují, takže vložení lze současně chápat jako **pokyn k validaci**.

```
&lt;input **onpaste**="vlozeno()">
```

V novějších prohlížečích (**IE 9**+) jde místo `onpaste` použít universálnější událost [`oninput`](/oninput), která se při vložení ze schránky (Ctrl + V) rovněž vyvolá, ale není z ní přímo patrné, že se jedná o vložení.

## Prodleva `onpaste`

Trošku záludné je chování `onpaste` v tom, že se událost provede **předtím**, než se obsah vloží do políčka. Následující kód tedy zobrazí po vložení předchozí hodnotu, což je většinou nežádoucí.

```
&lt;input onpaste="alert(this.value)">
```

Řešení je práci s hodnotou pole obalit do [časovače](/odpocitavani).

```
&lt;input onpaste="
  var that = this;
  setTimeout(function(){
    alert(that.value)
  }, 0)
">
```

Výsledek:

  Něco vložte:

Vzhledem ke složitějšímu **programování uvnitř atributu** se nabízí obsluhu pro vložení vytvořit jako samostatnou funkci a v atributu ji pouze zavolat – `onpaste="vlozit(this)"`. Pozměněná ukázka se stejnou funkčností:

  function vlozit(el) {
    setTimeout(function(){
        alert(el.value)
    }, 0)  
  }    

    Něco vložte: