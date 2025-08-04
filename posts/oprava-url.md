---
title: "Oprava překlepů v URL"
headline: "Dohledání a opravení rozbité adresy"
description: "Zejména automatické převaděče URL na HTML odkazy, ale i lidé <i>dokáží</i> pokazit tvar odkazu na webovou stránku."
date: "2013-05-24"
last_modification: "2015-02-01"
status: 1
tags: ["SEO", "Rady a nápady"]
---

Pokud se někdo skrz **rozbitý odkaz** dostane na web, existují dvě
možnosti:

    - **Vypsat chybu 404**.

    Zkusit URL *zrestaurovat* a **přesměrovat** na správnou
    adresu (nebo správnou URL uživateli navrhnout).

Je k úvaze, zda se zobrazení chybové stránky „404 –
Nenalezeno“ nedá donutit autor odkazující stránky k nápravě. Nicméně v
případů porouchaných odkazů z diskusních fór apod. s nápravou nejspíš nelze
počítat.

## Nejčastější chyby

### Příliš dlouhá adresa

Značné množství redakčních systémů, diskusních fór a podobných aplikací má nastavenou
  nějakou **maximální délku slova**. Ta bohužel kontraproduktivně může ničit URL.
Vnikne potom odkaz typu:

&lt;a href='http://example.com/adresa-roz** **bita-mezerou'&gt;
  Odkaz
&lt;/a&gt;

Při kliknutí na odkaz prohlížeč mezeru zakóduje na `%20`,
  takže vznikne:

```
http://example.com/adresa-roz**%20**bita-mezerou
```

Řešení je prosté — `%20` vyhodit a zkusit adresu znovu.

Je pravda, že adresy by **takto dlouhé být vůbec neměly**, leč u starších systémů může být jejich změna nevýhodná z pohledu **vyhledávačů**.

### Interpunkce

Jelikož většina automatických rozpoznávačů adres není moc chytrá, běžně
*požírají* jako součást URL i tečky, čárky, středníky, vykřičníky,
  otazníky, dvojtečky nebo závorky **bezprostředně následující** onu adresu.

Pokud je webová aplikace běžně v adresách stránek nepoužívá, nic nebrání je z adresy automaticky odstraňovat.

### Lomítko

Je-li struktura adres `ve/více/úrovních` oddělených právě
lomítkem, může se stát, že uživatel kus adresy **ručně umaže**. Jelikož může a nemusí odmazat i lomeno na konci, nabízí se adresy s lomítkem přesměrovávat na adresy bez lomítka nebo
obráceně.

### Chyba v HTML

Zajímavé podoby URL lze nechtěně vytvořit třeba špatným obalením
atributu `href`:

&lt;ul&gt;
&lt;li&gt;&lt;a href=**'**http://jecas.cz/formulare&gt;Je čas&lt;/a&gt;
&lt;li&gt;&lt;a href=**'**http://djpw.cz/**'**&gt;DJPW&lt;/a&gt;
&lt;/ul&gt;

A odkaz „Je čas“ s textem „DJPW“ bude odkazovat na:

```
http://jecas.cz/formulare%3EJe%20čas%3C/a%3E%3Cli%3E%3Ca%20href=
```

Je čas -->

Oprava tohoto případu může spočívat ve dvou krocích:

    - Nežádoucí znaky vyhodit (mezery, interpunkce, …) a zkusit.

    U prvního nežádoucího znaku adresu rozdělit a použít jen první
    část.

U adres, kde nejsou používány nějaké výstřednosti, bude oprava o poznání
snazší.

### Překlepy

Tohle se bohužel automatisuje obtížněji. Adresa s překlepem vypadá na
první pohled OK, zbývá leda možnost zkusit najít nějakou podobnou
existující adresu. V PHP k tomu slouží funkce levenshtein
nebo similar_text.
V databásích by zase šlo použít fulltext nebo danou URL postupně zkracovat
a zkracovat a zkoušet `like %%`.

Například redakční systém [WordPress](/wordpress) dokáže cílovou adresu dohledat podle začátku. Následující URL:

```
example.com/k
```

Dokáže přesměrovat na:

```
example.com/k**ontakt**
```

## Konkrétní řešení

V případě, že v URL mohou být jen písmena, čísla, podtržítko a spojovník
(`A-z0-9_-`), kód pro opravení (mezer, interpunkce a HTML chyb)
  bude velice jednoduchý. Nejdříve se odstraní **zakódovaná mezera** (`%20`) a následně
se použije jen ta část, která odpovídá danému výrazu:

function opravUrl($url) {
  $url = str_replace("%20", "", $url);
  preg_match("~([A-z0-9_-]*)~", $url, $matches);
  return $matches[1];
}

## Další odkazy

    Funkce 
        levenshtein v MySQL,

        Použití fulltextu v MySQL