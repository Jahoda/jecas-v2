---
title: "Max-width pro pozadí"
headline: "Maximální šířka pozadí"
description: "Jak obrázkovému pozadí nastavit maximální šířku. Tj. aby se přizpůsobovalo menší šířce okna."
date: "2015-03-29"
last_modification: "2015-03-29"
status: 1
tags: ["CSS", "Hotová řešení", "Responsivní design", "Obrázky"]
---

Při tvorbě [responsivního designu](/responsive) jde snadno zajistit, aby se obrázky vložené značkou `&lt;img>` vešly na obrazovku pomocí:

```
img {
  max-width: 100%;
  height: auto;
  box-sizing: border-box
}
```

Pokud je na displeji více místa, než je šíře obrázku, obrázek se zobrazí v originálních rozměrech. Při zmenšování okna se potom bude zmenšovat, aby se vždy zobrazil celý.

Dosáhnout podobného chování je někdy potřebné i pro **obrázkové pozadí**. CSS vlastnost [`background-size`](/obrazkove-pozadi) ale nastavení maximální velikosti neumožňuje. Použití „`background-size: 100%`“ by způsobilo prosté roztažení pozadí i nad jeho skutečnou šířku.

Docílit chování jako u `&lt;img>` s `max-width` jde ale menším trikem s využitím [`@media`](/mobilni-web#media-queries). Díky tomu se „`background-size: 100%`“ aplikuje jen v případě, že je stránka užší než pozadí, takže 100% velikost pozadí zafunguje žádoucím způsobem.

```
.image {
  background: url(i/400x40) no-repeat;
  height: 40px;
}
@media (max-width: 400px) {
  .image {
    background-size: 100%;
  }
}
```

    - [Živá ukázka obou způsobů](http://kod.djpw.cz/pwlb)

Měl-li by element s obrázkovým pozadím navíc přizpůsobovat svou výšku aktuální šířce, jde využít triku s nulovou výškou a `padding`em v procentech dle poměru stran obrázku.

    - [Výška podle šířky](/vyska-podle-sirky)