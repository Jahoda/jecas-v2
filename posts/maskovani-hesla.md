---
title: "Maskování a zobrazování hesla ve formuláři"
headline: "Maskování a zobrazování hesla ve formuláři"
description: "Je lepší heslo ve formuláři zobrazovat, nebo ho maskovat pomocí hvězdiček?"
date: "2015-03-30"
last_modification: "2015-10-12"
status: 1
tags: ["Formuláře", "Rady a nápady", "Bezpečnost"]
---

U formulářového prvku [`&lt;input>`](/input) určeného pro zadávání hesla (typ `password`) bývá zvykem, že jsou znaky **maskované hvězdičkami** nebo puntíky:

Uživatel vyplňující formulář tak **neví, co napsal**. Z toho důvodu je někdy pole pro heslo duplikováno, aby se **předešlo překlepu**.

Je ale důvod heslo maskovat?

  Myslím si, že maskování hesla je obrovský zlořád, který by vůbec neměl existovat. Nicméně je to tak hluboce zakořeněný zlořád, že už se stal normou a jeho odstranění vyžaduje velkou odvahu a nikdo se k tomu moc nemá.

  – Michal A. Valášek

Jak už to tak bývá, v případě hesel se volí mezi **bezpečností a pohodlím**.

## Je maskování hesla bezpečnější?

Osobně mi přijde, že **maskování hesla** puntíky přináší spíš **pocit bezpečí** než vyšší bezpečnost skutečnou.

  Že se v políčku objevují hvězdičky, neznamená, že někdo nemůže vidět, co píšu.

  První možnost jsou **keyloggery** – škodlivé programy v systému, které monitorují, zaznamenávají a odesílají stisknuté klávesy. Proti těm je visuální skrývání bezzubé.

  Druhá možnost je **visuálně sledovat**, co člověk **mačká na klávesnici**. Zde opět skrytí hesla za puntíky nepomůže.

    **Michal Špaček** zmínil ještě jeden způsob, byť značně náročnější, a to zjištění hesla **posloucháním zvuků kláves** během jeho zadávání. Různé klávesy při stisku vydávají odlišné zvuky, zvlášť patrné je to třeba u mezerníku. Minimálně délka hesla jde takto určit celkem triviálně.

Pokud chce mít člověk jistotu, že jeho heslo nikdo nezjistí, měl by ho zadávat pouze **v soukromí a na prověřených zařízení**.

Ano, zahvězdčikování hesla znesnadní okoukání hesla z obrazovky, ale je otázka za jakou cenu.

Zvlášť na **mobilech s miniaturní dotykovou klávesnicí** je zadávání komplikovaného hesla značně **nepříjemný zážitek**. Člověk si kvůli obavě z překlepu, kterého si nevšimne, bude dávat záležet, aby se nepřeklep. Bude tak heslo psát pomaleji, to ho zdrží, že si třeba příště přihlašování rozmyslí.

**Michal A. Valášek** zmiňuje, že nutnost psát heslo *poslepu* vede uživatele k používání jednodušších hesel, protože na slepý zápis silného hesla si nevěří.

Další věc je, že:

  - Na mobilu jde celkem snadno **zakrýt displej** druhou rukou.

  - Desktop se často používá v soukromí, kde okoukání hesla nehrozí.

## Je bezpečné odkrytí hesla ve formuláři?

Na bezpečnost odkrytého hesla jsem se zeptal dvou bezpečnostních expertů – [Michala Špačka](https://www.michalspacek.cz/) a [Michala Altaira Valáška](http://www.rider.cz/cs/default.aspx).

**Michal Špaček** považuje odkrývání za risikové při používání aplikací na veřejných místech. **Michal A. Valášek** je potom proti maskování.

### Michal Špaček

  Nemusí to nutně snižovat riziko, ale nedoporučil bych heslo odkrývat třeba
v aplikacích, u kterých je šance, že se k nim budou uživatelé přihlašovat z
    veřejných počítačů.
  
  Jedním takovým příkladem je třeba nahrávání a sdílení
fotek z dovolené. To lidé budou často dělat z počítačů na hotelových
recepcích a pak by se mohlo stát, že jejich heslo bude znát nejen někdo, kdo
na takový veřejný počítač nainstalovat keylogger, ale i ten, co uživateli
    zrovna náhodou koukal přes rameno.
  Oproti tomu, heslo do svého Wi-Fi routeru
asi budou uživatelé vždy zadávat doma, bez nějakého publika. V každém
případě by bylo dobré uživatele nějak varovat, aby heslo neodkrýval, když za
ním někdo v těsné blízkosti stojí, stačí se inspirovat třeba u bankomatů

### Michal A. Valášek

  Zcela souhlasím s názorem, že maskování hesla dává iluzi bezpečnosti a nic víc. Proto ho považuji za špatné.

  Maskování hesla pomůže pouze při jediném scénáři, a to když mi útočník fyzicky kouká přes rameno. Ovšem to má řadu jiných možností. Z mého pohledu je tedy maskování hesla antipattern, který víc škodí, než pomáhá.

  Na druhou stranu, je to antipattern, který je tak rozšířený, že vymanit se z něj žádá velkou odvahu. Uživatelé s ním počítají a když ho nevidí, znejistí je to. I když to nepředstavuje reálné riziko, budou to za něj považovat.

  Ale přiznám se, že kážu vodu a piju víno, protože jsem to zatím ještě na žádném webu nenašel odvahu zrealizovat :)

## Volitelné zobrazení hesla

Umožnit uživateli **zobrazit heslo v textové podobě** se tak může hodit. Některé operační systémy nebo prohlížeče možnost *zobrazit heslo* nabízejí nativně.

Existuje 5 stupňů (ne)zobrazování hesla v původní podobě:

  Zobrazovat **pouze hvězdičky** (typické chování na desktopech).

  **Poslední zadaný** znak na chvíli pro kontrolu ukázat (tak to dělá většina mobilů).

  Zobrazení celého hesla po **přidržení tlačítka/ikony pro odkrytí**. Bohužel to stejně moc neumožňuje opravit překlep, protože se heslo po chvíli zase zamaskuje (dělá to tak třeba [**Windows 10**](/windows-10) při přihlašování).

    Přepínání **zobrazit/skrýt**, kdy se textová podoba na vyžádání plně odkryje, dokud ji uživatel zase neskryje. Ukázka z **Windows Phone 10** při přihlašování k Wi-Fi:

  Zobrazovat **heslo pouze v textové podobě**.

## Řešení v JS

Řešit zobrazení/skrytí hesla jde pomocí obyčejného `checkbox`u, který bude měnit typ formulářového políčka z `text` na `password`.

    Zobrazit

K úvaze je, zda jako výchozí stav zvolit maskování hesla nebo ho naopak zobrazovat. **Výchozí zobrazování** v čitelné podobě může být pro návštěvníky šok.

    Skrýt heslo

### Heslo malým písmem

Docela zajímavé řešení je zobrazovat kromě hvězdiček vedle i originální podobu hesla **hodně malým písmem**, které člověk zadávající heslo sotva přečte. Hůře čitelné heslo sníží šanci odkoukání přes rameno.

    Zobrazit
    heslo

### Nebezpečný `autocomplete`

Některé prohlížeče mají tendenci si **zapamatovávat vyplněná políčka**.

U *odkrytých* hesel to je potom **krajně nežádoucí**, protože si heslo prohlížeč zapamatuje, i když uživatel žádné zapamatování neschválí.

Heslo jde potom klasicky vyvolat z *autocomplete nabídky*. Proto je lepší tuto funkci vypnout:

```
&lt;input type="text" name="password" **autocomplete="off"**>
```

    - [Živá ukázka](http://kod.djpw.cz/qcjc) – test různých variant s/bez vypnutého `autocomplete`

### Použitelnost

Pro **dobrou použitelnost** skrývacícho/odkrývacího přepínače je dobré navrátit po změně kursor na původní posici, aby mohl uživatel pokračovat v psaní.

    - [Umístění kursoru v poli](/umisteni-kursoru) – zjištění posice kursoru v JavaScriptu

Typ `password` může v některých mobilních prohlížečích vyvolat jinou podobu softwarové klávesnice.

Rozdíly ale zase nejsou tak dramatické. Ovlivnit podobu klávesnice by šlo případně [atributem `pattern`](/atribut-pattern).

Větší problém je **automatické zvětšování prvního písmene** – jde vypnout pomocí `[autocapitalize="none"](/autocapitalize)`.

## Správce hesel

Problém se zadáváním hesel dobře řeší *password managery* (nejznámější je asi [LastPass](https://lastpass.com/cs/)). Správce hesel dokáže k různým službám generovat náhodná silná hesla, která se při přihlášení **vyplní automaticky**, takže uživatele způsob maskování vůbec nemusí zajímat.

Po registraci / přihlášení je uživatel dotázán, jestli chce přihlašovací údaje uložit – příklad z **Chrome**:

Taktéž **LastPass** po odeslání přihlašovacího/registračního formuláře zobrazí obdobnou hlášku:

Při odkrytí hesla změnou `type` z `password` na `text` u políčka pro heslo vznikne problém, že **správci hesel nemusí rozpoznat přihlašování**.

    - LastPass support: [Podoba přihlašovacího formuláře, aby ji LastPass pochopil](https://lastpass.com/support.php?cmd=showfaq&amp;id=3385)

Následující políčko zkrátka **Chrome**/**LastPass** nepochopí jako heslo a možnost pro uložení se nezobrazí:

```
&lt;input type="**text**" name="password">
```

Řešení je políčko před odesláním formuláře změnit zpět na `password`:

```
&lt;form **onsubmit**="this.password.type ='password'"> 
```

(Políčko s `name=password` dostane `type=password`.)

Případně se do maskované podoby může přepínat políčko už při ztrátě `focus`u (JS událost `onblur`).

    Zobrazit

## Přihlašování bez hesla

Řešení problému maskování hesel z jiné strany je i **vyhnutí se používání hesla**. Pro přihlášení nebo registraci jde:

    Použít **ověření prostřednictvím jiné rozšířené služby**. Například umožnit přihlášení přes [Facebook](/facebook) nebo [Twitter](/twitter).

    **Přihlašovat na základě odkazu**. Při žádosti o přihlášení dostane uživatel na registrační e-mail odkaz pro okamžité přihlášení. Po jeho prokliknutí je automaticky přihlášen. Odkaz by měl mít omezenou dobu platnosti, protože e-mail typicky není nejbezpečnější úložiště hesel.

## Odkazy jinam

  - Sitepoint: [Masking Passwords: Help or Hindrance?](http://www.sitepoint.com/masking-passwords-help-or-hinderance/)

  - Luke Wroblewski: [Showing Passwords on Log-In Screens](http://www.lukew.com/ff/entry.asp?1941)

  - [Why your password can’t have symbols—or be longer than 16 characters](http://arstechnica.com/security/2013/04/why-your-password-cant-have-symbols-or-be-longer-than-16-characters/)