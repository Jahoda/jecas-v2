---
title: "Záznam obrazovky do GIFu"
headline: "Video-záznam obrazovky do GIFu"
description: "Jak nahrát video obrazovky a uložit ho jako pohyblivý obrázek (GIF)."
date: "2014-06-15"
last_modification: "2014-09-26"
status: 1
tags: ["Hotová řešení", "Rady a nápady", "Video"]
---

Pro tvorbu **návodů** nebo **ukázek** na webových stránkách se kromě prostého textu a **obrázků** může hodit i něco pohyblivého.

Jelikož **vložení videa** funkčního napříč prohlížeči není úplně bezproblémové. A u služeb třetích stran, jako je například [YouTube](/youtube), nemáme nad obsahem plnou kontrolu, může být použití GIFu rozumný kompromis.

## Jak vytvořit GIF

Osvědčil se mi nástroj **ScreenToGif** (pro **Windows**), s kterým je tvorba „video-GIFu“ celkem snadná.

[Stránka programu](http://screentogif.codeplex.com/)

K disposici po nahrání výřezu obrazovky je možné procházet jednotlivé snímky (počet zaznamenaných snímků závisí na nastavení **FPS**) a nepotřebné vymazat, přidat vlastní text a podobně.

Program nicméně není úplně spolehlivý a **občas padá**. Rovněž nepotěší nemožnost zkusit si vyexportovat záznam s různými nastaveními pro optimální poměr kvalita/velikost. Nezbývá než si *video* natočit znovu.

## Vložení na stránku

Pohyblivý obrázek se vloží běžnou značkou `&lt;img>`:

```
&lt;img src="video.gif">
```

## Přehrávání

Výsledný pohyblivý obrázek není možné po vložení na web nějak **standardně přehrávat**, ale existují jisté možnosti.

    GIF vytvořit s **nekonečnou smyčkou**. Obrázek/video se tedy bude donekonečna opakovat. U krátké sekvence to většinou nevadí. U delšího *videa* může být pro uživatele **nepohodlné čekat** na druhé opakování, když mu uteče začátek.

    Obvykle prohlížeče začínají GIF přehrávat, když se dostane do *viewportu*.

    Obrázek „spustit“ na vyžádání. Ve skutečnosti tedy JavaScriptem přidat do stránky obrázek s adresou GIFu, co se má přehrát. Tím se video načte a spustí.

    **Pozastavení** řešit nejspíš nelze. **Opakované přehrávání** jde teoreticky simulovat tak, že se GIFu nastaví *přehrát pouze jednou* a obrázek se přehraje opětovným nastavením téhož `src` obrázku.

### Ukázka přehrání GIFu na požádání

Hezké může být z prvního snímku *videa* udělat **statický obrázek**, který se GIFem nahradí až po kliknutí na tlačítko. Na témže principu jde vytvořit i zastavení.

    ▶ Přehrát
    ◼ Stop

function prehrat(url) {
    document.getElementById("video").src = url;
}

[Samostatná živá ukázka](http://kod.djpw.cz/dqfb)

## Pozor na datovou velikost

Při nahrávání velké často se měnící plochy s obrázkem po dlouho dobu a s vysokým počtem snímků za vteřinu snadno vznikne **datově obrovský soubor**. Nízké desítky vteřin záznamu můžou vytvořit několika-megabytový GIF soubor.

## Projekt &lt;x-gif>

Ve **Firefoxu** a **Chrome** je možné použít skript.

[Web &lt;x-gif>](http://geelen.github.io/x-gif/)

Ten AJAXem načte GIF, rozseká ho na jednotlivé snímky a ty potom standardní JS animací přehraje. Dá se díky tomu měnit **rychlost**, volit **počet opakování**, přehrávat odkonce a podobně.