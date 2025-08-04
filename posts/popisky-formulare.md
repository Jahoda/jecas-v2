---
title: "Kam umístit popisky formuláře"
headline: "Kam umístit popisky formuláře"
description: "Jak umístit popisky formulářových prvků, aby bylo vyplňování formuláře co nejpohodlnější."
date: "2016-02-04"
last_modification: "2016-02-10"
status: 1
tags: ["Hotová řešení", "Formuláře", "Rady a nápady", "UX"]
---

Téměř každá webová stránka nebo aplikace obsahuje formuláře. Bývá zvykem, že formuláře sestávají z dvojic „popisek – políčko“. K velké úvaze potom je, kam popisek umístit.

Pro lepší pohodlí se popisky obalují do značky [`&lt;label>` s atributem `for`](/label-for), aby se šlo přes popisek prokliknout do [`&lt;input>`u](/input):

```
&lt;label for="policko">
  Popisek
&lt;/label>
&lt;input id="policko">
```

## Popisky vedle políček

  Jméno

Umístit popisky vedle příslušných prvků je výhodné hlavně kvůli místu. Formulář může být nižší.

Jinak má tento postup několik nevýhod.

Při více položkách je třeba řešit jejich zarovnání pod sebe. Jde to snadno třeba [tabulkou](/html-tabulky):

      Jméno a příjmení

      Město

      Telefon

Jak je na ukázce vidět, vlivem rozdílné délky popisků je *město* a *telefon* hodně daleko od příslušného políčka. Kvůli tomu bude muset člověk více přeskakovat očima, čímž se prodlouží doba vyplňování.

### Zarovnání vpravo

Zrychlit čtení takového formuláře jde zarovnáním popisků doprava k políčkům:

      Jméno a příjmení

      Město

## Popisky nad políčky

Popisky nad formulářovými prvky by měly být na vyplňování **nejrychlejší**. Očím vyplňujícího uživatele se stačí pohybovat jen směrem dolů. Není potřeba se přesouvat ještě zleva doprava jako v předchozím případě.

    Jméno

    Město

Nevýhoda je oproti předchozímu postupu ve větší prostorové náročnosti. Tento typ formuláře je přibližně 2× vyšší.

Hodně užitečná je ale na tomto postupu snadná přenositelnost formuláře na mobily při tvorbě [responsivního designu](/responsive), kam se dvousloupcový formulář nemusí vejít.

  - [Label Placement in Forms](http://www.uxmatters.com/mt/archives/2006/07/label-placement-in-forms.php) – test rychlosti vyplňování různých formulářů se snímáním pohybu zraku

## Popisky v políčku

Hlavní výhoda popisků v políčku je úspora místa.

### Mizející popisky

Docela populární, ale většinou velmi špatné řešení, je realisovat popisky prostřednictvím [`placeholder`u](/placeholder):

Problém je v tom, že takový *popisek* v některých prohlížečích zmizí ihned po kliknutí do něj. Případně zmizí nejpozději při zadání prvního znaku.

Uživatel si kvůli **mizejícímu popisku** musí zapamatovat, co má do políčka zadávat. Pokud na účel políčka zapomene, nedostane se k němu jinak, než že celé pole smaže. Kontrola již vyplněného formuláře je potom prakticky nemožná.

Mizející placeholder jako popisek není moc dobrý ani u krátkých formulářů. I u formuláře o pár políčkách může člověka něco vyrušit během vyplňování. Po návratu k přihlašovacímu formuláři může třeba zapomenout, jestli má zadat e-mail nebo uživatelské jméno.

### Přesun placeholderu

Trochu lepší a celkem rozšířené řešení je placeholder po vybrání pole zmenšit a přemístit.

.policko {
    position: relative;
}
.policko label {
    position: absolute;
    left: .2em;
    top: 0;
    transition: all .2s;
    line-height: 1;
}

.policko .focus + label {
    top: -1.2em;
    font-size: 70%;
    background: #fff;
    padding: .2em;
}

    E-mail

    URL

Je otázka, jestli přesouvání popisku není zbytečný efekt, který bude odvádět pozornost od vyplňování. Další možný problém je čitelnost popisku při zmenšení jeho písma.

Nakonec přetrvává ještě jedna nevýhoda. Bývá dobré, když velikost políčka odpovídá očekávané délce vstupu. Při popisku v políčku se ale velikost musí přizpůsobit délce popisku, takže následující příklad není s popiskem v políčku moc dobře řešitelný:

  Velikost bot

### Neustále viditelný popisek

Existuje ještě jedna varianta. Ve visuálním políčku utvořeném `&lt;label>`em nechat popisek stále viditelný:

    .viditelny label {
      background: #fff;
      display: inline-block;
      padding: .2em .5em;
      border: 1px solid #444;
      cursor: text;
    }
    .viditelny + .viditelny label {
      border-top: 0;
    }
    .viditelny span {
      display: block;
    }
    .viditelny input {
      border: 0
    }
  
  Jméno a příjmení
  Heslo

Pointa tohoto postupu je v tom, že takový formulář neobsahuje žádné rušivé prvky navíc. Popisek je přidružen k políčku.

Výhody tohoto postupu popisuje článek:

    - [Why Infield Top Aligned Form Labels are Quickest to Scan](http://uxmovement.com/forms/why-infield-top-aligned-form-labels-are-quickest-to-scan/)

Je potřeba si uvědomit, že i přes některé hezké výhody existují risika hovořící pro používání jiného řešení:

    Vzhled není úplně standardní a uživatelé mohou mít problém ho pochopit. Jeden z velkých problému formulářů bývá v tom, že formulář nevypadá jako formulář.

    Velikost políčka nemůže odpovídat délce očekávané hodnoty (odpovídá velikostí popisku).

    Je problém s umístěním chybových hlášek při vyplnění špatné hodnoty.

## Odkazy

  - [Why Users Fill Out Forms Faster with Top Aligned Labels](http://uxmovement.com/forms/faster-with-top-aligned-labels/)

  - Luke Wroblewski: [Web Application Form Design](http://www.lukew.com/ff/entry.asp?1502)

.no-border td, .no-border {
  border: 0;
  background: transparent;
}