---
title: "Proč nepoužívat hamburger menu"
headline: "Proč hamburger menu nefunguje"
description: "Hamburger menu je oblíbený postup řešení responsivní navigace. Proč se mu vyhnout."
date: "2015-01-04"
last_modification: "2015-12-27"
status: 1
tags: ["Rady a nápady", "Responsivní design", "Odkazy"]
---

Pod pojmem **hamburger menu** se v oblasti **uživatelských rozhraní** rozumí skrytá navigace, která se zobrazí až po stisknutí ikony/tlačítka.

Kvůli své typické visuální podobě se označuje jako *hamburger menu*.

Přibližně v roce **2014** se stalo značně populární a začalo se šířit napříč webovými i jinými aplikacemi. Hamburger menu je přítomné i v aplikacích [Windows 10](/windows-10) (z aplikace *Pošta* ve Windows 10 pochází předchozí obrázek).

## Proč se používá?

Schovat navigaci do jediného tlačítka je **obrovské usnadnění práce** návrhářů uživatelských rozhraní.

Díky tomu není nutné zvlášť optimalisovat navigaci pro různě velká zařízení. Když už se na displej položky navigace nevejdou, zkrátka se všechno **schová do malého tlačítka**, které se už vždycky někam vejde.

Další zajímavostí jsou různé **efektní visuální prvky** a animace, které otevírání a zavírání navigace může obsahovat:

Jiné postupy jsou popsány v samostatném článku:

    - [Responsivní navigace](/responsivni-menu)

## Symbol menu

Kromě nejrozšířenější podoby třech vodorovných pruhů:

    ≡

Který lze snadno zadat přímo jako textový symbol, existují různé [obdoby](https://twitter.com/lukew/status/591296890030915585):

  - svislé tečky jako *kebab menu* 
  
  - vodorovné tečky jako *meatballs menu* 

## Názornost hamburger ikony

První problém hamburger ikony je její **nízká srozumitelnost pro uživatele**. Přestože se tento symbol používá i na mnoha významných stránkách a ve spoustě aplikací, existuje značný podíl lidí, kteří mu **nerozumí**.

Zvlášť **méně zkušení uživatelé** budou mít problém **tři pruhy nebo puntíky** identifikovat jako navigaci.

Při navrhování uživatelského rozhraní je se dobré používat co nejsrozumitelnější prvky (*obvious always wins*), což hamburger ikona příliš nesplňuje.

Je možné, že většina lidí identifikuje hamburger ikonu jako tlačítko pro menu. Opravdu důležité tlačítko by ale měl poznat každý, ne jen většina.

### Popisek „Menu“

Pro zlepšení názornosti jde k *hamburgeru* přidat popisek *Menu*.

## Umístění ikony menu

Dalším častým problémem hamburger navigací je jejich **umístění na stránce** – zejména při prohlížení na **mobilních telefonech**.

Při držení smartphone pouze v jedné ruce (pravé) vypadá dosažitelnost plochy na displeji přibližně následovně:

Příklad z 5" displeje, kdy zelená barva značí snadnou dosažitelnost, oranžová barva obtížně dosažitelnou plochu a do červené oblasti už se při držení jednou rukou bez přehmatávání **nedostanu**.

Ikona pro menu v **levém horním rohu** rozbalující základní prvky webu je tedy pro **praváka velmi nepoužitelná**.

### Režim ovládání jednou rukou

Nemožnost dosáhnout při držení telefonu jednou rukou na navigační prvky v horní části displeje se snaží řešit tvůrci mobilních operačních systémů režimem pro jednu ruku.

V mobilních **Windows 10** se po delším podržení tlačítka *Start* přesune obsah obrazovky do dosažitelné části:

V **iOS** obdobně funguje dvojité poklepání na *Home* tlačítko.

Problém těchto gest je obecně v tom, že je většina lidí nezná.

    - [How We Hold Our Gadgets](http://alistapart.com/article/how-we-hold-our-gadgets) – přehled způsobů, jak lidé drží telefony a tablety

## Skrytí důležitého obsahu

Ten největší problém *hamburger navigace* / **navigace umístěné „pod tlačítkem“** je ale někde jinde:

  Ikona menu oproti konkrétním položkám **nenese lákavou informaci** o obsahu webu.

Popis *Menu* nebo tři pruhy či tečky symbolisující navigaci nejsou dostatečně lákavé, aby na ně návštěvník klikl.

Konkrétní **názvy položek** naopak lákavé být mohou a návštěvník je **může zaregistrovat očima** při rychlém skenování obsahu stránky.

Viditelné položky v navigaci navíc nabízí návštěvníkovi stručný přehled o obsahu webu.

Rozbalení navigace **vyžaduje akci uživatele** (kliknutí na tlačítko), aniž by věděl, co ho čeká. Pro nového návštěvníka webu je tedy otevření menu **cesta do neznáma**.

Skrytí položek do tlačítka proto snižuje pravděpodobnost, že se na ně návštěvník dostane, tudíž by v hamburger menu **nemělo být nic důležitého**.

  Problém hamburger menu není ani tak v názornosti ikony, ale ve skrytí důležitého obsahu.

## Náhrada hamburger menu

Nahrazení/doplnění hamburger ikonky „≡“ popisem „Menu“ tedy neřeší hlavní problém, který tkví ve skryté navigaci.

Co ale udělat s navigací na malé obrazovce mobilu?

### Vodorovné menu s ikonami

Řada služeb opustila koncept hamburger navigace a nahradila ho vodorovnou navigací s ikonami.

Textové nabídky doplněné ikonkami nabízí srozumitelnost i při použití relativně malého písma. Příklad navigace na [Twitteru](/twitter):

[Facebook](/facebook) zobrazuje pouze ikonky. Méně podstatné možnosti jsou ukryty pod hamburger tlačítkem vpravo nahoře:

Obdobný koncept používá i [YouTube](/youtube):

Navigace s textovými popisky bude srozumitelnější pro nové uživatele, zvlášť pokud se nepoužívají jen hodně zažité ikonky. Stálí uživatelé si vystačí už jen se samotnými ikonami.

Pro pohodlnější dosažitelnost prsty se navigace může nacházet v dolní části displeje.

### Skrytí méně podstatného

Pro běžné **obsahové weby** může být problematické znázornit všechny položky ikonkami. Nabízí se tak z navigace nechat viditelné alespoň něco nejdůležitějšího a do tlačítka hamburgeru/další schovat méně podstatné položky.

Toto řešení jde snadno použít pro vodorovnou navigaci. [JavaScriptem](/js) se přepočítá šířka jednotlivých položek a odkazy, které se už nevejdou, se přesunou do submenu rozbalitelného tlačítkem.

Případně se vodorovná navigace zkrátka ořízne podle dostupné šířky a vpravo bude překrytá tlačítkem pro zobrazení všeho. Tak to používá třeba web [The Guardian](http://www.theguardian.com/uk):

V případě, že se navigace nikdy celá nevejde, jde použít elegantní řešení, kdy se JavaScriptem pouze přepíná oříznutí navigace. Tak funguje třeba lišta na [Tiscali.cz](http://tiscali.cz)

    - CSS Tricks: [The Priority+ Navigation Pattern](https://css-tricks.com/the-priority-navigation-pattern/) – řešení menu, kdy se položky postupně skrývají

### Určení priorit

Pokud je v navigaci 20 položek, nabízí se položit otázku, jestli je opravdu všechno důležité a nešlo by počet zredukovat.

Tomuto problému jde předcházet navrhováním webů postupem [mobile-first](/mobile-first). Při návrhu nejprve pro desktop není nutné tolik přemýšlet nad tím, co je nejdůležitější, když je všude spoustu místa.

### Jiný způsob navigace

V případě klasické navigace ukryté do tlačítka může být na stránce **alternativní způsob navigace** bez nutnosti mít viditelné globální menu.

Dostane-li se návštěvník rychle a pohodlně k obsahu, který potřebuje, je jedno, jestli tak učinil prostřednictvím běžné navigace ukryté za hamburgerem nebo použije tlačítko/odkaz v textu stránky.

Třeba v případě, že bude člověk hledat na webu restaurace její adresu a otevírací dobu, není potřeba použít **klasickou navigaci**, když budou tyto informace dostupné na hlavní straně místo neužitečného textu typu „Vítáme vás na webu“.

Podobně třeba sportovní server nabízející výsledky rovnou na hlavní straně si klasickou navigaci může odpustit:

## Odkazy jinam

- [The Hamburger Menu Doesn't Work](http://deep.design/the-hamburger-menu/) – proč hamburger menu nefunguje

- [Why and How to Avoid Hamburger Menus](https://lmjabreu.com/post/why-and-how-to-avoid-hamburger-menus/) – proč a jak se vyhnout hamburger menu

- [Why We Banished the Hamburger Menu](https://redbooth.com/blog/hamburger-menu-iphone-app) – jak pomohlo odstranění menu skrytého do tlačítka

- [Apple on Hamburger Menus](http://blog.manbolo.com/2014/06/30/apple-on-hamburger-menus)

- Luke Wroblewski: [Obvious Always Wins](http://www.lukew.com/ff/entry.asp?1945) – statistiky po změně hamburger navigace

- Sitepoint: [Are Users Ready for the Desktop Hamburger Icon?](http://www.sitepoint.com/are-users-ready-for-the-desktop-hamburger-icon/)

- Zoltan Kollin: [Misused mobile UX patterns](https://medium.com/@kollinz/misused-mobile-ux-patterns-84d2b6930570) – nevhodné návrhové vzory na mobilech
  
  - Exisweb: [Don’t Be Afraid of the Hamburger: A/B Test](http://exisweb.net/hamburger-is-ok) – srovnání počtu kliknutí na „Menu“ a „≡“

### Efekty hamburger navigace

- [Animating CSS-Only Hamburger Menu Icons](http://speckyboy.com/2015/04/02/animating-css-only-hamburger-menu-icons/)
  
- [Animovaná hamurger ikona](http://codepen.io/winkerVSbecks/pen/mpjkd)

- [Gooey Menu](http://codepen.io/lbebber/pen/LELBEo/) – efekt rozbalení položek

- [Animace hamburger ikony do křížku](http://codepen.io/designcouch/pen/Atyop)
  - [SVG CSS3 Menu / Burger Button](http://codepen.io/kyleHenwood/pen/Alayb)

- [Best Practices for Sliding Hamburger Menus](http://webdesignledger.com/web-design-2/best-practices-for-hamburger-menus) – různé řešení navigace vysouvané ze strany

- [Trend Breakdown: New Ways to Use the Hamburger Icon](http://designmodo.com/hamburger-menu-icons/)