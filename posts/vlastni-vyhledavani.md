---
title: "Vyhledávání na vlastním webu"
headline: "Vyhledávání na vlastním webu"
description: "Jak umožnit návštěvníků vyhledávat na vlastním webu."
date: "2015-10-07"
last_modification: "2015-10-07"
status: 0
tags: []
---

U rozsáhleší obsahové stránky už přestává stačit **navigace pomocí odkazů** a je pro uživatele snazší požadovaný obsah na stránce **vyhledat**.

Hranice, kdy uvažovat o přidání funkce *Hledat*, může být někde u vyšších desítek stránek.

Kromě toho, že možnost hledání usnadní návštěvníků najít požadovaný obsah, existuje ještě jedna výhoda – z **hledaných spojení** lze vydedukovat, jaký obsah by návštěvníky zajímal. Proto je dobré **hledané výrazy** zaznamenávat:

    - Google Analytics: [Měření interního vyhledávání](/ga-mereni#vyhledavani)

## Použít Google

Asi nejsnazší je pro prohledávání webu použít [Google](/google). Dobře udělaný a populárnější web Google indexuje velmi rychle, takže není problém pomocí něho veškerý obsah dohledat.

### Výhody

  - Snadná implementace (nemusí se nic programovat).

  - Nenáročnost na vlastní server.

  - Řazení podle relevance.

Hledání pomocí Google lze implementovat minimálně **3 způsoby**:

### Odkaz na vyhledávání

Pro **prohledání určité domény** jde ve vyhledávání použít operátor „`site:`“.

Následující dotaz najde „css“ na tomto webu:

```
css site:jecas.cz
```

Stačí tak na základě **hodnoty z vyhledávacího pole** připravit adresu pro **výsledky hledání**:

```
https://www.google.cz/search?q=**css**%20*site:jecas.cz*
```

Případně sestavit **parazitní formulář**:

Ten se odešle na adresu `https://www.google.cz/search` a předá se mu:

  - Hledaný výraz z políčka nazvaného `q`.

  Adresa stránky skrytým políčkem `sitesearch`:
    ```
&lt;input name="sitesearch" value="jecas.cz" type="hidden">
```

Ukázka (hledání se otevře do nového okna):

    Hledat: 
    
    Hledat na Google

### Google Custom Search

Personalisovaných výsledků hledání jde docílit pomocí **Google Custom Search**:

    - Google: [Vlastní vyhledávač](https://cse.google.cz/cse/)

Tuto službu jde použít dvěma způsoby:

    Vložit JS kód od Google na vlastní stránku.

  (function() {
    var cx = '005154510265796145973:3qn0hgidqzu';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();

    Z vyhledávacícho formuláře posílat návštěvníky na zvláštní stránku:

    ```
https://cse.google.com/cse?**cx**=005154510265796145973:3qn0hgidqzu&amp;q=css
```

    Podstatný je parametr `cx`, který identifikuje vlastní vyhledávání.

    Hledat: 
    
    Custom Search

Vzhled výsledků vyhledávání lze **personalisovat**. K disposici jsou i statistiky vyhledávání a podobně.

### Google Search API

Pro vlastní integraci Google vyhledávání jde použít API.

Získat JSONP s daty jde následovně:

```
http://ajax.googleapis.com/ajax/services/search/web?v=1.0&amp;q=**css%20site%3Ajecas.cz**&amp;hl=cs&amp;rsz=large&amp;callback=**vlastniFunkce**&amp;context=req1
```

Pro hodně hledání denně (uvádí se 100) bude nejspíš nutné použít placenou versi, u které se bude používat API klíč:

    - Google Custom Search: [Custom Search JSON/Atom API](https://developers.google.com/custom-search/json-api/v1/overview)

## Vlastní vyhledávání

Vyhledávání vytvořené vlastnoručně nebo jako součást redakčního systému má také své výhody:

    **Hledávní v reálném čase**. Nemusí se čekat ani chvilku, až se obsah zaindexuje.

    Prohledávání **soukromých dat**. Aby Google stránky zaindexoval, musí být veřejně přístupné. Hledávní v některých oblastech stránky může být nuté vázat na oprávnění hledajícího.

    **Rychlejší odezva** v případě vlastního vyhledávání umožní hledat již v průběhu, co návštěvník zadává hledané slovo.

    **Pokročilé filtrování** – jde nastavit přesná kriteria, co se má najít. V případě diskusního fóra jde například **omezit hledání** dle data příspěvku, jeho autora a kategorie.

    **Výsledky vyhledávání** mohou obsahovat více informací (obrázky, výzvy k akci atd.) než jen úryvek se zvýrazněným hledaným slovem jako v případě Google.

## Odkazy

  - Web Design Ledger: [30 Examples of Website Search Interface Design](http://webdesignledger.com/search-interface-design)