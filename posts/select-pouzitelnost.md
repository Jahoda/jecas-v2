---
title: "Proč nepoužívat selectbox"
headline: "Proč nepoužívat <code>&lt;select></code>"
description: "Proč se snažit vyhnout používání rozbalovací nabídky <code>&lt;select></code> za každou cenu."
date: "2015-05-03"
last_modification: "2015-05-04"
status: 1
tags: ["Formuláře", "Rady a nápady", "UX"]
---

Formulářový prvek **rozbalovací nabídky** (anglicky často označované jako *dropdown*) je na webových stránkách hodně populární. Jde snadno vytvořit kombinací značek `&lt;select>` a `&lt;option>`.

    Přijdu
    
      ráno
      v poledne
      večer

Programátoři tvořící formuláře mají tento prvek velmi rádi. Jde totiž **universálně** použít na všechny typy vstupů, kde se vybírá z **předem definovaných možností**.

Ta universálnost bohužel znamená, že formuláře používající `&lt;select>` budou typicky i **universálně špatně použitelné**.

Je možné, že existují situace, kdy dává použití dropdown nabídky smysl. Na webu je ale značně nadužívaná oproti lepším postupům. Při každém použití `&lt;select>`u je tak dobré se důkladně zamyslet, **jestli neexistuje lepší řešení**.

## Proč je selectbox problematický?

Má-li být **vyplňování formuláře** co nejpohodlnější (lépe řečeno *co nejméně nepohodlné*, protože vyplňovat formuláře je vždycky otrava), rozbalovací nabídka `&lt;select>` trpí několika nedostatky.

### Zbytečné klikání

Kliknutí, které by mohlo posloužit k výběru volby, teprve otevře nabídku. Navíc jsou možnosti mimo té výchozí **skryté**, takže i v případě, že by **výchozí volba vyhovovala**, bude uživatel zbytečně klikat, aby se podíval na ostatní možnosti.

Zbytečné kliknutí pro otevření nabídky bude nutné i v případě provádění následné opravy po špatném zadání.

### Nejasné zavření nabídky

Z pohledu použitelnosti je rozbalená nabídka problematická tím, že **není úplně jasné**, jak se jí uživatel zbaví.

Při kliknutí mimo nabídku pro její zavření se může stát, že se nechtíc aktivuje nějaký jiný prvek.

### Mobilní dotyková zařízení

Na mobilních zařízeních se po kliknutí do `&lt;select>`u zpravidla zobrazí **vlastní systémová nabídka** pro volbu z několika položek, což kromě zbytečných dotyků může i narušit přirozený nerušený průchod formulářem.

Po rozbalení selectu překryjí položky obsah stránky. V některých mobilních OS je problém s tím, že není vidět popis, ke kterému se položky vztahují.

Ve **Windows Phone 8** možnosti překrývají celou obrazovku.

V **iOS** je rolovací nabídka položek v dolní části obrazovky. Po výběru položky je nutné tapnout na *Done*.

V **Androidu** položky překrývají obsah stránky. Pozadí je ztemnělé.

### Komplikované stylování

Z pohledu webového tvůrce nabízí značka `&lt;select>` s jednotlivými `&lt;option>`y velmi omezené možnosti úprav vzhledu.

    - [Stylování selectu](/stylovani-selectu) – jak jde upravovat výchozí selectbox pomocí CSS

Dále se článek věnuje **konkrétním případům**, kdy jde dropdown select **nahradit lepším řešením**.

## Nízký počet položek

Vybírá-li se z malého množství položek, vyžaduje rozbalení *selectboxu* několik zbytečných kliknutí navíc.

Kromě nutnosti rozkliknutí nabídek je ukrytí položek otravné i tím, že ho návštěvník rozklikne i ze zvědavosti v případě, kdy mu **výchozí hodnota vyhovuje**.

  Pohlaví: mužžena

  Souhlasíte: anone

Úspora místa je přitom minimální oproti použití [`radio`](/input#type-radio) přepínačům.

  Pohlaví: muž žena

  Souhlasíte: ano ne

Pokud jde zachytit pouze možnost ano/ne, jde možná ještě lépe a srozumitelněji použít [`checkbox`](/input#type-checkbox).

   Jsem žena

   Souhlasím

Někdy jsou k vidění i extrémní případy, kdy je v `&lt;select>`u jen jedna možnost. To už zavání **provokováním návštěvníka**.

  Barva: — vyberte —červená

## Velké množství položek

Když se pro několik málo položek *select* nehodí, je dobré ho použít pro hodně bohatou nabídku?

Typickým příkladem může být třeba výběr [evropského státu](http://cs.wikipedia.org/wiki/Seznam_evropských_států).

  Z jaké jste země?

AlbánieAndoraArménieÁzerbajdžánBelgieBěloruskoBosna a HercegovinaBulharskoČerná HoraČeskoDánskoEstonskoFinskoFrancieGruzieChorvatskoIrskoIslandItálieKazachstánKyprLichtenštejnskoLitvaLotyšskoLucemburskoMaďarskoMakedonieMaltaMoldavskoMonakoNěmeckoNizozemskoNorskoPolskoPortugalskoRakouskoRumunskoRuskoŘeckoSan MarinoSlovenskoSlovinskoSpojené královstvíSrbskoŠpanělskoŠvédskoŠvýcarskoTureckoUkrajinaVatikán    

Pokud nejste z *Albánie*, výběr bude značně komplikovaný. Na počítačích s klávesnicí se sice jde přesunout na potřebnou položku napsáním počátečních písmen, ale **málo lidí to ví**. Na mobilních zařízeních potom nezbývá než nekonečně rolovat.

Dobrý postup je se snažit **nezavalit uživatele hromadou možností**, tedy nabídnout způsob filtrování. Často se dá problému vyhnout řešením z úplně opačného konce. Lokalitu jde s jistou úspěšností **detekovat automaticky**.

    - [Lokalisace podle IP](/geoip) – použití GeoIP v PHP

    - [HTTP_ACCEPT_LANGUAGE](/server#http-accept-language) – HTTP hlavička obsahující informaci o jazyku prohlížeče

Podobným příkladem je volba [kraje v Česku](http://cs.wikipedia.org/wiki/Kraje_v_Česku#P.C5.99ehled_kraj.C5.AF).

  Vyberte kraj ČR:

Hlavní město PrahaStředočeskýJihočeskýPlzeňskýKarlovarskýÚsteckýLibereckýKrálovéhradeckýPardubickýOlomouckýMoravskoslezskýJihomoravskýZlínskýKraj Vysočina    

Pro nepražáky bude pohodlnější **klikací mapa**.

**Dlouhým seznamům** je tak vhodné se vyhnout obloukem. Pokud neexistuje alternativní způsob pro výběr z hodně položek, nabízí se použít našeptávání na základě zadaných znaků. Od **IE 10** je k tomu přímo v HTML značka [`&lt;datalist>`](/datalist).

Jinak existují různé JavaScriptové řešení.

    - [Select2](https://select2.github.io/examples.html) – skript vylepšující `&lt;select>`y našeptáváním

### Nejprve nejčastěji používané

Po nahlédnutí do statistiky počtu výběru jednotlivých položek ze stran uživatelů je většinou vidět, že některé možnosti jsou nápadně častější než jiné.

Několik **nejčastěji vybíraných možností** tak může být ihned viditelných formou radio přepínačů a ty ostatní skryty za něčím jako je tlačítko *Více možností* a podobně.

## Výběr počtu

Rozbalovací nabídka pomocí `&lt;select>`u bývá často k vidění i pro stanovení počtu.

    Počet osob:
    
      1 osoba2 osoby3 osoby4 osoby

V tomto případě lépe poslouží krokovací tlačítka + a &minus; (anglicky označované slovem *stepper*).

Takové funkce jde docílit použitím [`&lt;input type=number>`](/input#type-number). Funguje v prohlížečích kromě **Internet Exploreru**. Hodnotu kroku jde zadat do atributu `step`.

    Počet osob:

Bohužel **ovládací prvky jsou tak malé**, že i bez ohledu na podporu v prohlížečích je lepší použít vlastní řešení v JavaScriptu.

    - [Zvyšování hodnoty inputů](/inkrementace-inputu) – implementace tlačítek + a &minus; v JavaScriptu

Výchozí šipky u políčka s typem `number` jde vypnout pomocí CSS vlastnosti `appearance`:

```
/* Webkit */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}
/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
```

Šlo by použít i obyčejný textový `&lt;input>` a omezit znaky [atributem `pattern`](/atribut-pattern), bohužel se ale potom nezobrazuje pouze číselná klávesnice v mobilním **Internet Exploreru 11** ve Windows Phone, což komplikuje **ruční zadání čísla**.

    Počet osob:

[Samostatná živá ukázka](http://kod.djpw.cz/uymb)

Pro **změnu hodnoty** tak není nutné rozevírat nabídku, ale jde přímo upravovat hodnotu po stanoveném kroku. Velkou změnu počtu jde zajistit přímo přepsáním hodnoty, která se z tohoto důvodu po vybrání označí, aby šla rovnou přepsat.

Při realisaci *stepperu* je si dobré dát pozor na:

  - dostatečnou velikost ovládacích prvků a jejich vzdálenost od sebe, aby se dobře **ovládaly prsty** na dotykových obrazovkách,
  
  - tlačítka + a &minus; je potom dobré umístit blízko sebe, aby se při *přejetí* dalo snadno vrátit zpět.

    - Luke Wroblewski (video): [How to Simplify Input with Steppers](https://www.youtube.com/watch?v=CW4qKTJqHPo)

## Zadávání kalendářního data

Co takhle zadávat datum pomocí dropdown menu?

    Datum:    
12345678910111213141516171819202122232425262728293031 LedÚnoBřeDubKvěČvnČvcSrpZářŘíjLisPro 2014201520162017    

Většinou jde docílit lepšího řešení pomocí jediného pole a kalendáře. Existuje k tomu typ políčka [`date`](/input#type-date).

    Datum: 

Zvláštní typ `&lt;input>`u funguje v **Opeře** a **Chrome**, pro ostatní prohlížeče je třeba použít řešení v JavaScriptu.

    - [Zadávání kalendářního data](/datepicker) – zobrazení kalendáře v různých prohlížečích

Na základě dat z reálného používání aplikace ale nejspíš půjde zadávání data ještě vylepšit. Pokud většina lidí volí dnešní nebo zítřejší den, nabízí se takové volby rovnou vypsat. A kalendář schovat pod volbu *Jindy…* nebo ikonku.

    Datum: 
    Dnes
    Zítra
    Pátek
    Jindy…

I pro volbu nejbližších dní jde úspěšně použít krokování. Takové řešení je k vidění třeba u jízdních řádků IDOS.

Krokování funguje dobře i pro volbu **času**. Šikovné je, když kromě krokování jde rovněž datum/čas **ručně vepsat** do textového pole – v některých případech je to jednodušší než **zdlouhavé listování kalendářem**.

## Závěr

Znáte formulář, kde by podle vás nešlo nahradit `&lt;select>` něčím lepším? Dejte mi, prosím, **vědět do komentářů**.

## Odkazy

  - Luke Wroblewski: [Dropdowns Should be the UI of Last Resort](http://www.lukew.com/ff/entry.asp?1950)

    [Quick[select]](http://eggboxio.github.io/quick-select/) – umožní nejčastější položky vybrat bez rozevírací nabídky:

.stepper input[type=number]::-webkit-inner-spin-button,
.stepper input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}
.stepper input[type=number] {
    -moz-appearance: textfield;
}
.stepper button {
    margin-right: .2em;
}

var Stepper = function() {
    var input;
    
    /* Round */
    function round(cislo) {
    	return (Math.round((cislo) * 10000) / 10000);	
    }

    /* Number validation */
    function val(value) {
        return value * 1;
    }

    /* Plus/minus value */
    function change(el, step)  {
        var value = round(val(el.value) + step);
        if (value >= el.getAttribute("min") && 
            value