---
title: "Okamžitá validace po zadání znaku"
headline: "Validace po zadávání znaků"
description: "Jak okamžitě reagovat na zadávání znaků do pole během psaní."
date: "2015-03-02"
last_modification: "2015-03-03"
status: 1
tags: ["Formuláře", "Rady a nápady"]
---

Postupem času se vyvíjí způsob validování [formulářů](/formulare) s cílem **zkracovat dobu** mezi vyplněním pole a ověřením hodnoty. Zpravidla platí, že čím dříve dostane návštěvník zpětnou vazbu od vyplnění, tím lépe.

    **Zpracování na straně serveru** po odeslání formuláře je od vyplnění políčka úplně nejdál.

    **Validace v JS** při odeslání formuláře (`onsubmit`) na straně klienta se trochu přibližuje (nemusí se čekat na odpověď serveru).

    Zpracování pole při **přeskočení** na další (událost `onblur`) už následuje bezprostředně po vyplnění.

    Reagovat na každé **zadané písmeno** je nejspíš cestou k úplně nejrychlejší odezvě.

## Okamžitá validace

**Výhoda** okamžité validace na základě každého zadaného písmena tkví v tom, že uživatel aplikace získá zpětnou vazbu ještě v momentě, kdy **má ruce na klávesnici** a zrovna vyplňuje dané políčko, takže případné opravy nejsou tolik obtěžující.

Pohodlnější a přívětivější chování formulářů vede k **vyššímu počtu vyplnění** a **vyšší kvalitě získaných dat**.

**Nevýhoda**: Pokud je pro ověření dat nutná součinnost se serverem, způsobí odeslání obsahu po každém znaku **vyšší zátěž serveru**. Není-li server schopný **rychle** a pokud možno v **konstantní době** odbavovat požadavky, aplikace se bude chovat nepředvídatelně.

### Uživatelské jméno

Příklad na obrázku ukazuje validaci **uživatelského jména**, kde se po zadání každého znaku objeví, jestli má jméno dostatečnou délku a je obsazené nebo k disposici.

## Technické řešení

Pro okamžitou reakci na vstup do políček existuje událost [`oninput`](/oninput), jde použít na úrovni samotného [`&lt;input>`u](/input) či celého formuláře:

```
&lt;form **oninput="zpracuj(this)">**
```

Tato událost funguje od **IE 9** a zachytí i operace se schránkou (pomocí klávesových zkratek i přes kontextové menu) nebo drag &amp; drop přesunutí textu do políčka. Pro prohlížeče neznalé události `oninput` je odchytávání trochu komplikovanější. Konstrukce řešící většinu případů vypadá následovně.

```
&lt;input
  onpaste="var that = this; setTimeout(function(){akce(that.value)})"
  oncut="var that = this; setTimeout(function(){akce(that.value)})"
  onkeyup="akce(this.value)"
  onkeypress="akce(this.value)"
  onfocus="var that = this; setTimeout(function(){akce(that.value)})"
 >
```

Často se využívá [trik s časovačem](/onpaste#prodleva), protože bez něj by v momentě vyvolání události ještě nedošlo ke změně.

### AJAXové požadavky

Požadavky na server se potom odesílají [AJAXem](/ajax). Důležité je, aby se před novým požadavkem zrušil ten předcházející, jinak může dojít k [předběhnutí požadavků](/nacitani-ajax#pozdejsi), kdy dříve vytvořený požadavek doběhne později a přepíše tak novější výsledek.

K přerušení AJAX požadavku slouží metoda `abort`.

```
if (xhr) xhr.abort();
```

## Optimalisace zátěže

Aby **zátěž okamžité validace** nebyla tak velká, jde si pomoci několika triky.

### Validace bez serveru

Dobré je validovat co **nejvíce věcí v JS** na straně klienta. Pro testování počtu znaků nebo použití povolených znaků si lze vystačit s JS a na server nic neposílat.

### Kontrolovat změnu

V případě použití více událostí zachycujících změnu pole se mohou volání ověřovací funkce se stejnou hodnotou pole provádět zbytečně zároveň. Není-li pravděpodobné, že by se výsledek ověření **měnil rychle v čase**, není ani potřeba požadavek se stejnými vstupními daty odesílat opakovaně.

### Prodleva

Značné **úspory požadavků** jde docílit přidáním časové prodlevy, po které se validace provede. Validace se potom neprovádí po stisknutí každého znaku, ale až v momentě, kdy uživatel chvíli nic nenapíše.

Dělá se to tak, že se po každé změně **vytvoří nový časovač**, který má v plánu spustit validaci. Před tím se případně zruší ten předchozí.

Následující kód tak zavolá funkci `validaceNaServeru` až po 300 milisekundách nečinnosti. Když návštěvník napíše daný řetězec rychle, provede se jen jeden požadavek.

```
var prodleva;
functin akce(hodnota) {
  clearTimeout(prodleva);
  prodleva = setTimeout(function() {
    **validaceNaServeru**(hodnota)
  }, 300);
}
```

Zvyšování této prodlevy **zhoršuje dojem okamžité reakce**, ale někdy není s ohledem na výkon na výběr.