---
title: "Zpožděně načítáné YouTube video"
headline: "Lazy loading YouTube videí"
description: "Jak načítat embedované video z YouTube, až když je potřeba."
date: "2013-06-19"
last_modification: "2013-06-19"
status: 1
tags: ["Lazy loading", "YouTube", "Video"]
---

Máme-li na stránce více videí vložených například pomocí `&lt;iframe>` z YouTube, značně to načítání zpomalí. Jeden takový `&lt;iframe>` je cca 7 HTTP požadavků a 0,5 MB dat, což může načítání webu na mnoho tisíců milisekund otrávit.

## Řešení

Co takhle místo `&lt;iframe>` zobrazit obrázek videa, přidat nějaké atrapy ovládacích prvků skutečného přehrávače – a ten zobrazit až po najetí myší (`onmouseover`)?

## Náhledy

Obrázek (náhled) videa lze získat překvapivě snadno. Různé varianty obrázku videa se nacházejí na jednotných URL, kam stačí zadat jenom kód videa (to je část za `wathc?v=`: `youtube.com/watch?v=**m_t4_6eHFdk**`).

document.write("Zobrazit/skrýt ukázky");

miniaturní náhledy
```
http://img.youtube.com/vi/**m_t4_6eHFdk**/*1*.jpg
```

Generují se tři (začátek, prostředek a konec), tj čísla na konci 1–3. O rozměrech 120 × 90 pixelů.

náhledy v různých velikostech
320 × 180```
http://img.youtube.com/vi/**m_t4_6eHFdk**/*mqdefault*.jpg
```

480 × 360```
http://img.youtube.com/vi/**m_t4_6eHFdk**/*hqdefault*.jpg
```

**640 × 480**```
http://img.youtube.com/vi/**m_t4_6eHFdk**/*sddefault*.jpg
```

Rozměry podle maximálního rozlišení videa```
http://img.youtube.com/vi/**m_t4_6eHFdk**/*maxresdefault*.jpg
```

### Náhledy pomocí API

Alternativní možnost k těmto adresám je získání URL obrázků pomocí YouTube API. Těžko ale soudit, co bude trvanlivější… Nicméně obrázky jsou zatím alespoň jednodušší na realisaci.

## Živá ukázka a řešení

V HTML a kaskádových stylech se vytvoří atrapa. JavaScript ji potom prohodí za skutečný přehrávač videa.

.yt, .yt a {width: 640px; height: 385px; display: block}
.yt a {background: transparent url("/files/yt/yt-control.png") left bottom no-repeat; position: relative; text-decoration: none; color: #fff;}
.yt a span {display: block; width: 96%; position: absolute; top: 0; left: 0; background: #000; color: #fff; font: .8em Arial; color: #fff; padding: 1.2% 2%; opacity: .75;}
.yt a:hover {background-color: transparent}
.yt iframe {border: 0;}

function yt(video) {
	var ifr = document.createElement("iframe");
	ifr.width = 640;
	ifr.height = 385;
	ifr.src = video.href.replace("watch?v=", "embed/");
	video.parentNode.appendChild(ifr);
	video.parentNode.removeChild(video);
}

	Vylepšení stromových diskusí

HTML by mohlo vypadat takto:
```
&lt;div class='yt' style='background: #000 url("http://img.youtube.com/vi/**m_t4_6eHFdk**/sddefault.jpg") center 65%'>
	&lt;a onmouseover='yt(this)' href='http://www.youtube.com/watch?v=**m_t4_6eHFdk**'>&lt;span>Název videa&lt;/span>&lt;/a>
&lt;/div>
```

V CSS se potom vytvoří atrapa ovládacího prvku (pomocí obrázku).

Naposicuje se dolů a název videa ve `&lt;span>`u v odkazu zase nahoru.

Nakonec JavaScript zajistí, aby se v `div.yt` vytvořil `&lt;iframe>` s videem a atrapa v podobě odkazu zmizela.

```
function yt(video) {
	var ifr = document.createElement("iframe");
	ifr.width = 640;
	ifr.height = 385;
	ifr.src = video.href.replace("watch?v=", "embed/");
	video.parentNode.appendChild(ifr);
	video.parentNode.removeChild(video);
}
```

## Automatisace

Asi by se nikomu nechtělo vkládat ručně výše uvedené HTML, proto jsou dvě možnosti:

Na straně serveru při vložení URL na YouTube ji nahradit upravenou HTML skořápkou. (Nahrazení by **nemělo být** v žádném případě trvalé.)
  Vkládat YT videa jako běžné odkazy, [JavaScriptem je najít](/js-youtube-lazy-loading), doplnit jim skořápku a navěsit funkci `yt`.

      [Hotové řešení](/js-youtube-lazy-loading)

Kromě toho by serverový skript mohl zajišťovat stažení náhledového obrázku z YT na vlastní server.