---
title: "Má web fungovat bez CSS?"
headline: "Má web fungovat bez CSS?"
description: "Má cenu řešit zobrazení stránky bez stylů? Případy, kdy taková situace nastane."
date: "2015-11-11"
last_modification: "2015-11-11"
status: 1
tags: ["CSS", "Rady a nápady"]
---

Článek lehce doplňuje problematiku fungování bez **JS**:

    - [Má web fungovat bez JavaScriptu?](/bez-javascriptu)

Situace ohledně fungování webu bez CSS je oproti JavaScriptu trochu odlišná.

## Selhání načtení CSS

Jeden z argumentů pro web fungující bez JS – **případ selhání načtení** – u kaskádových stylů moc uplatňovat nejde.

Při běžném připojení CSS značkou `&lt;link>` v hlavičce ([`&lt;head>`](/html-kostra#head)) se totiž **čeká na stažení CSS**. Do té doby prohlížeč nic [nevykreslí](/vykreslovani). Dělá to zřejmě proto, aby po dotažení CSS (což za běžných okolností nastane brzy) nemusel všechno překreslovat.

Obecně tak platí, že v případě **selhání CSS** se nezobrazí vůbec nic.

Dnešní prohlížeče mají nejspíš větší trpělivost čekat na stažení CSS než uživatelé. Klidně budou vyčkávat třeba půl minuty.

    Zajímavě se chová [**Edge**](/microsoft-edge), který po 5 vteřinách marného čekání na CSS přestane signalisovat průběh načítání, ale jinak stále čeká a v případě úspěchu stránku zobrazí.

    Výjimkou je stará **Opera 12**, která po pěti vteřinách marného čekání zobrazí stránku bez stylů a CSS aplikuje, až když se případně stáhne.

### Nečekání na CSS

I CSS je možné [načítat asynchronně](/nacitani-css), aby se na něj nemuselo čekat. V takovém případě se může stát, že se stránka bez stylů zobrazí.

Typicky se ale asynchronní načítání CSS nepoužívá pro **kritické části stylů** – ty se v takovém případě dávají do značky `&lt;style>` přímo do hlavičky HTML kódu. Potom se stránka bez CSS načíst nemůže, protože styly jsou v kódu před obsahem.

## Kdy se web zobrazí bez CSS?

Případ, kdy se stránka zobrazí bez CSS, je tedy hodně vzácný. Může nastat, když:

    CSS soubor **neexistuje** – jeho URL vrátí chybu 404 (či jinou). Prohlížeč potom ví, že se stylu nedočká a web vykreslí.

    Uživatel **ručně zastaví načítání** během čekání na CSS soubor. Prohlížeč vykreslí stránku.

    V CSS je **syntaktická chyba** – přestože je CSS relativně tolerantní k chybám, jde skoro celé rozbít tím, že na začátku bude deklarace s chybějícím }. To vyřadí všechna následující pravidla ([ukázka](http://kod.djpw.cz/fbsb)).

    ```
h1 {
    color: green;
    
/* a teď už je všechno neplatné */
h1 {color: red}
```

    Návštěvník si **CSS vypne**. To drtivá většina lidí neumí. V nových prohlížečích je taková možnost zpravidla špatně přístupná / nedostupná.

    Pro testovací účely je nejsnazší nainstalovat doplněk typu **Web Developer Toolbar**, který nabízí možnost vypnutí/zapnutí CSS docela přístupně a pohodlně.

          [Rozšíření Web Developer pro **Chrome**](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm)

    Ruční deaktivace CSS u vlastního webu jde provést prostým zakomentováním připojování CSS.

    Deaktivovat styly na cizí stránce jde i následujícím kouskem JavaScriptu (je možné ho zadat do adresního řádku za `javascript:`).

    ```
(function(el) {
  for (var i = el.length; i--;) {
    el[i].parentNode.removeChild(el[i]); 
  }
})(document.querySelectorAll('style, link'));
```

## Vypnuté CSS a SEO

Zobrazit si pouze **HTML strukturu bez stylů** se může hodit pro lepší představu o tom, jak stránku vidí vyhledávače nebo uživatelé hlasových čteček.

I když třeba [Google](/google) se styly pracuje. Proto je potom problém, když mají vyhledávače zakázaný přístup do složek s `*.css` soubory v `robots.txt`.

Z pohledu čtenáře webu se vypnutí stylů hodí u **špatně čitelných stránek**. Některé prohlížeče pro takový případ mají zvláštní režim pro čtení (*reading view*).

## HTML formátování

Teoreticky se je možné vrátit do minulého tisíciletí a layout i celý vzhled webu udělat bez stylů pomocí HTML presentačních atributů a tabulkového layoutu.

Potom může web vypadat bez stylů skoro tak dobře jako s nimi.

Dělá se to tak občas v případech **HTML e-mailů**, aby fungovaly ve starých poštovních programech.

Pro běžný web v tom ale nevidím smysl.