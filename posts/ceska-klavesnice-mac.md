---
title: "Jak zapsat v macOS na české klávesnici?"
headline: "Zvláštní znaky na české klávesnici v macOS"
description: "Jak v macOS na běžné české klávesnici pohodlně programovat a zapisovat všelijaké speciální znaky?"
date: "2023-04-11"
last_modification: "2025-01-29"
status: 1
tags: ["Produktivita", "Rady a nápady"]
---

Na počítačích s macOS máte pro psaní speciálních znaků v zásadě podobné možnosti jako ve [Windows](/ceska-klavesnice), 
ale s několika rozdíly v&nbsp;rozložení kláves a&nbsp;v tom, jak se speciální znaky vyvolávají. 
Obecně se nabízejí tři cesty:

  **Používat anglickou klávesnici** a&nbsp;přepínat se mezi ní a&nbsp;českou 
      (kliknutím na vlajku v&nbsp;menu baru nebo klávesovou zkratkou – obvykle 
      Ctrl+Mezerník či jinou, podle vašeho nastavení). Je ale potřeba mít kam přepínat. Klávesnice jde spravovat v nastavení *Klávesnice*.
  
  **Používat vlastní (programátorskou) klávesnici** nebo rozložení, 
      které vám psaní speciálních znaků i&nbsp;písmen s&nbsp;háčky a&nbsp;čárkami usnadní.
  
  **Naučit se, jak speciální znaky zadávat na „obyčejném“ českém rozložení** 
      pomocí klávesy Option (někdy značeno i&nbsp;Alt).

První možnost je sice rychlá, ale nutí vás neustále přepínat tam a&nbsp;zpět. Druhá možnost zase nemusí 
být dostupná na cizích počítačích. Zbývá tedy třetí varianta – využít naplno to, co již macOS nabízí 
v&nbsp;rámci české klávesnice.

## „Kouzelná“ klávesa Option (⌥)

Na Macu plní roli „pravého Alt“ (známého z&nbsp;Windows) klávesa Option (popř. ⌥ Alt). 
Když ji podržíte a&nbsp;stisknete nějakou další klávesu, objeví se vám místo běžného písmene či symbolu jiný, 
„speciální“ znak.

### Jak zjistit, co se pod klávesou Option skrývá?

  Otevřete **Nastavení systému** → **Klávesnice** → 
      **Vstupní zdroje** → Upravit.
  
  Vyberte požadovanou klávesnici:

  Když nyní podržíte Option (nebo Option+Shift), 
      uvidíte, které symboly jsou k&nbsp;dispozici na jednotlivých klávesách.

Níže je (pro nejčastěji používané znaky) **orientační** tabulka, jak je lze napsat na 
**české** klávesnici v&nbsp;macOS. Rozložení se může mírně lišit podle verze systému a&nbsp;podle toho, 
zda máte „QWERTZ“, „QWERTY“ či jinou variantu české klávesnice. 

      Požadovaný znak
      Zkratka s&nbsp;Option / Option+Shift
      Význam

      `&lt;` a `&gt;`
      Option+, a Option+.
      Špičaté závorky

      `{` a `}`
      Option+í a Option+é
      Složené závorky

      `[` a `]`
      Option+ú a Option+)
      Hranaté závorky

      `$`
      Option+ě (může se lišit)
      Znak dolaru

      `#`
      Option+š (může se lišit)
      Mřížka / hash

      `&amp;`
      Obvykle Shift+ý
      Ampersand (and)

      `@`
      Často Option+ě
      Zavináč

      `|`
      Shift+\
      Svislá čára

      `\`
      Přímo na klávesnici vlevo vedle Y
      Zpětné lomítko

      `~`
      Option+Shift+§
      Vlnovka (tilda)

      `^`
      Option+'
      Stříška

      `°`
      Option+=
      Stupeň

      `÷`
      Option+Shift+á
      Děleno

      `×`
      Většinou přes **Emoji &amp; Symboly** (viz níže) nebo vlastní rozložení
      Krát

      `–` a `—`
      Option+- a Option+Shift+-
      Krátká/dlouhá pomlčka

      `€`
      Option+r
      Euro

      `™`
      Option+Shift+t
      Ochranná známka

      `„` a `“`
      Option+Shift+n a Option+Shift+h
      České uvozovky 

      `‚` a `‘`
      Option+n a Option+h
      České jednoduché uvozovky 

      ` `
      Option+Shift+Mezerník
      Nedělitelná mezera

## Další speciální znaky a „kódy“

Na Windows existuje metoda „levý Alt + číselný kód“. Na Macu se to dělá jinak:

  Buď otevřete **Emoji &amp; Symboly** (zpravidla Ctrl+Command+Mezerník) 
      a&nbsp;najdete požadovaný symbol ručně nebo přes vyhledávání.

    Po kliknutí na symbol šipky vpravo dole se jde dostat do rozšířeného okna (ikonka úplně vpravo) s možností si některé symboly přidat do oblíbených.

    Tím se otevře **Prohlížeč znaků**:

    Jde tam najít i např. i **mezeru s nulouvou šířkou** a přidat si ji do oblíbených:

    Potřebujete-li používat speciální znaky hodně často, jde si přístup k nim umožnit i přes klávesu fn (symbol zeměkoule).

  Nebo si **přidáte** klávesnici „Hexadecimální vstup Unicode“ (opět v&nbsp;Nastavení → Klávesnice → 
      Vstupní zdroje). Jakmile ji máte aktivní, lze držet Option a&nbsp;napsat čtyřmístný 
      **hexadecimální** kód znaku. Po dopsání kódu se objeví daný symbol.

    Pokud si potřebné kódy pamatujete, může to být dobré řešení.

Příklady užitečných znaků (v&nbsp;HTML se často zapisují „entitami“):

      Požadovaný znak
      Unicode (hex)
      HTML entita
      Význam

      Nulová mezera

      `200B`
      `&amp;ZeroWidthSpace;` / `&amp;#8203;`
      Mezera s nulovou šířkou

      … (tři tečky)
      `2026`
      `&amp;hellip;`
      Výpustka

      − (minus)
      `2212`
      `&amp;minus;`
      Znaménko minus

      ¼, ½, ¾
      `00BC`, `00BD`, `00BE`
      `&amp;frac14;`, `&amp;frac12;`, `&amp;frac34;`
      Čtvrt, půl, tři čtvrtiny

      ², ³
      `00B2`, `00B3`
      `&amp;sup2;`, `&amp;sup3;`
      Druhá a&nbsp;třetí mocnina

Pro zápis dalších znaků je možné využít buď klávesnici 
**Unicode Hex Input**, nebo je najít v&nbsp;**Emoji &amp; Symbolech** 
(nabídka Úpravy → Emoji a symboly, či Ctrl+Command+Mezerník).

### Mocniny a zlomky

Pro zápis *něco na druhou* či *na třetí* lze použít buď HTML tagy pro horní index 
`&lt;sup&gt;`, anebo přímo znaky ² (`&amp;sup2;`) a&nbsp;³ (`&amp;sup3;`).

V&nbsp;Unicode (a&nbsp;tedy i&nbsp;v&nbsp;Emoji &amp; Symbolech) existují i&nbsp;běžné zlomky: 
¼ (`&amp;frac14;`), ½ (`&amp;frac12;`) a&nbsp;¾ (`&amp;frac34;`).

Pro další zlomky je obvykle vhodnější zapsat je formou `1/3`, `2/5` apod., 
nebo použít složitější matematické zápisy (např. LaTeX, MathML).

## Prohlížeč klávesnic

Pro naučení se psaní speciálních znaků se může hodit prohlížeč klávesnice:

Po jeho otevření a stisknutí nějaké modifikační klávesy je ihned vidět, co je možné napsat:

## Stručné shrnutí

  **Klávesa Option** na Macu zastupuje v&nbsp;mnoha případech 
      „pravý Alt“ z&nbsp;Windows: podržením Option (a&nbsp;případně i&nbsp;Shift) 
      můžete psát značnou část speciálních znaků rovnou na české klávesnici.
  
  **Kódy znaků** se na Macu zadávají zpravidla přes „Unicode Hex Input“ nebo 
      **Emoji &amp; Symboly**.
  
  **Prohlížeč klávesnice** (Keyboard Viewer) vám okamžitě ukáže, 
      co která klávesa v&nbsp;kombinaci s&nbsp;Option či Shift dělá.

Nejvýhodnější se mi zdá se naučit potřebné znaky s klávesou Option (popř. Option+Shift).

Znaky, co přímo zapsat nejde, si přidat mezi oblíbené symboly mezi *Emotikony a symboly* – zkratka control+command+mezerník.

Případně si klávesnici namapovat jinak přes program [Karabiner-Elements](https://karabiner-elements.pqrs.org).

Díky tomu všemu není nutné při psaní kódu, HTML entit nebo nejrůznějších speciálních symbolů 
neustále přepínat mezi rozloženími klávesnice a&nbsp;můžete si vystačit 
s&nbsp;běžnou českou klávesnicí v&nbsp;macOS.

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