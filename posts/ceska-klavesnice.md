---
title: "Jak zapsat na české klávesnici?"
headline: "Zvláštní znaky na české klávesnici"
description: "Jak na běžné české klávesnici pohodlně programovat a zapisovat všelijaké speciální znaky?"
date: "2013-05-19"
last_modification: "2015-01-18"
status: 1
tags: ["Produktivita"]
---

Pro psaní speciálních znaků existují v zásadě tři možnosti.

používat **anglickou klávesnici** a neustále se mezi ní a českou přepínat klávesami Alt + Shift,
používat nějakou **programátorskou** / vlastnoručně upravenou klávesnici, která umožňuje psaní speciálních i českých znaků,
naučit se, jak speciální znaky zadávat na **obyčejném české rozložení** kláves.

První možnost trpí nutností neustálého přepínání tam a zpět, druhá možnost zavádí značnou nekompatibilitu s cizími počítači, takže zbývá možnost třetí…

## Kouzelná klávesa pravý Alt

Při podržení této klapky získají běžné klávesy novou funkci, díky které se dají **pohodlně napsat** různé **speciální znaky**.
  
### Jak napsat…

požadovaný znak
zkratka pravý Alt + …
význam

`&lt;` a `>`
, a .
špičaté závorky

`{` a `}`
B a N
složené závorky

`[` a `]`
F a G
hranaté závorky

`$`
ů
znak dolaru

`#`
X
  mřížka / dvojitý křížek	

`&amp;`
C
ampersand (and)

`@`
V
zavináč

`|`
W
svislá čára

`\`
Q
zpětné lomítko

`~`
1/+
vlnovka (tilda)

`^`
3/š
stříška*

`°`
5/ř

  nebo Shift + ;
stupně*

`×` a `÷`
) a ú
krát a děleno	

*) Je třeba stisknout dvakrát nebo po jednom stisku potvrdit mezerníkem.

## Kódy kláves

Některé (neprogramátorské) užitečné znaky lze bez štelování klávesnice zapsat pomocí **levého** Altu a číselného kódu.
### Jak napsat…

požadovaný znak
levý Alt + kód
HTML entita
význam

`0160`
`&amp;nbsp;` a `&amp;#160;`
  nedělitelná/pevná mezera

`„` a `“`
`0132` a `0147`
`&amp;bdquo;` a `&amp;ldquo;`
české dvojité uvozovky

`‚` a `‘`
`0130` a `0145`
`&amp;sbquo;` a `&amp;lsquo;`
české jednoduché uvozovky

`–` a `—`
`0150` a `0151`
`&amp;ndash;` a `&amp;mdash;`
krátká a dlouhá pomlčka

`…`
`0133`
`&amp;hellip;`
tři tečky

`−`
``
`&amp;minus;`
minus

`™`
``
`&amp;trade;`
trade mark

  `&#8203;`    
  
  `&amp;#8203;`
  mezera s nulovou šířkou

  `&#8209;`    
  
  `&amp;#8209;`
  nezalomitelná pomlčka

  `&pm;`    
  
  `&amp;pm;`
  plus minus

### Mocniny a zlomky

Pro zápis *něco na druhou* se dá použít buď **horní index** (značka `&lt;sup>`) nebo přímo znak „²“ — druhá mocnina² (HTML entita`&amp;sup2;`), třetí mocnina³ (`&amp;sup3;`). Čtvrtá **mocnina** už neexistuje.

Ze **zlomků** je k disposici čtvrtina ¼ (`&amp;frac14;`) polovina ½	(`&amp;frac12;`)	a tři čtvrtiny ¾ (`&amp;frac34;`).

function zkopirovat(text) {  
  var range = document.createRange();  
  var node = document.createTextNode(text);
  document.body.appendChild(node);
  range.selectNode(node);  
  window.getSelection().addRange(range);  
  try {  
    var zkopirovano = document.execCommand('copy');  
    if (zkopirovano) alert("Zkopírováno");
    else alert("Nepodařilo se zkopírovat");
  } catch(err) {  
    alert("Prohlížeč neumí kopírovat");
  }  
  window.getSelection().removeAllRanges();  
  document.body.removeChild(node);
}