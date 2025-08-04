---
title: "Bezpečnostní risika webu"
headline: "Bezpečnost webových stránek"
description: "Bezpečnostní risika na webových stránkách a jejich řešení a prevence."
date: "2013-10-25"
last_modification: "2013-10-29"
status: 1
tags: ["Rady a nápady", "Bezpečnost"]
---

Z hlediska bezpečnosti webových stránek čelí jejich autor mnoha hrozbám, často ale tvůrci bezpečnost vědomě či nevědomě zanedbávají.

## Slabá přihlašovací hesla

Možná to zní triviálně, ale i **bez** bezpečnostní díry v aplikaci hrozí nebezpečí, že se útočník dostane, kam nemá, **zcela standardní cestou**, protože přihlašovací údaje do administrace budou `admin` a `admin` nebo `admin` a nějaké krátké heslo, které lze **uhodnout hrubou silou v relativně krátkém čase**.

## Zavirování z FTP

Docela častý typ útoku je **zavirovat počítač oběti** a ze známých FTP klientů **vytáhnout uložené přístupy k FTP**. Tak útočník získá neomezený přístup ke zdrojovým souborům webu a používá-li webová aplikace databási, získá i přístup do ní.

Nejčastěji útočník vloží nějaký `&lt;iframe&gt;` s reklamou nebo třeba měřicí skript, aby si [zvýšil návštěvnost](/seo-navstevnost). To by *až tak nevadilo*, kdyby Google nebo provozovatel hostingu napadený web nepostihoval. Zda **Google našel škodlivý kód** je možné najít v Google Webmaster Tools na kartě **Malware**.

### Řešení

Neukládat údaje k FTP na potenciálně nakažených počítačích. Nebo ukládat hesla v pozměněné podobě — tj. ke skutečnému heslu **přidat určitý počet náhodných znaků**, které se při přihlášení jednoduše odmažou (takže to nebude moc zdržovat).

Pokud je už web napaden, je nutné co nejdříve **změnit v administraci hostingu FTP přístup**. K FTP se připojit z počítače, který není zavirován a začít s čištěním. To není úplně jednoduché, protože útočníci infikují weby promyšleně a **na více místech**. Nejde-li **přepsat celý web** ještě nezavirovanými soubory, není odstranění veškerého škodlivého kódu úplně jednoduché. Cizí kód bývá často třeba na **posledním řádku souboru a odsazen o tisíc prázdných znaků**, tudíž se docela lehko přehlédne. Stoprocentní řešení není ani hledat řetězce škodlivého kódu, které se objevují na finální stránce, protože se může používat **všelijaké zakódování a skládání řetězců**.

Cílem útočníka je škodlivý kód vložit pokud možno na stránky, kde **se vir nejčastěji projeví**, proto většinou bývá na stránkách jako `index.php`, `index.html` apod., často také naleze do známých JS knihoven jako např. jQuery nebo do všech JS souborů – ty se potom připojují na další stránky, takže škodlivý účinek je značný.

Samotné odstranění škodlivého kódu bez změny hesla u FTP účtu problém **trvale nevyřeší**, útočník se stále funkčním přístupem k souborům může **škodlivý kód obnovovat**.

## Ošetření dat jen u klienta JavaScriptem

Pokud uživatel zadává nějaká data **do formuláře**, kontrola zadaných dat JavaScriptem v prohlížeči návštěvníka je jistě hezká věc, ale nezajišťuje to bezpečnost. Návštěvník si vždycky může **vypnout JavaScript a celé ověřování je pryč**.

### Řešení

Kromě JS ověřování je vždy nutné data **ověřovat na serveru**. V případě propracovaného JS kontroly postačí i **zjednodušené** serverové ověření.

## Vložení škodlivého kódu (XSS – Cross-site scripting)

Chyba plynoucí z **nedostatečného ošetření vstupů od uživatele** (ošetřovat je dále nutné i obsah, který se může do HTML dostat z URL dané stránky). Vždy, když má nedůvěryhodný návštěvník možnost vkládat obsah na stránku, je nutno zajistit aby:

  - Nešlo vložit **škodlivý JavaScript**, a to jak přímo do značky `&lt;script>`, tak i do atributů `on**Něco**` (např. `onclick`). Skript může třeba přečíst a odeslat na web útočníka cookie administrátora, stránku přesměrovávat na škodlivý obsah nebo ji jinak (prakticky neomezeně) modifikovat.

  - V případě, že jsou **povoleny nějaké HTML tagy**, tak kromě předchozího bodu je vhodné zajistit řádné **uzavření otevřených značek a atributů**, jinak může být rozbit layout webu. Automatisovaně umí zajistit řádné uzavření značek [HTML Purifier nebo Texy](/vycisteni-kodu).

### Řešení

Ve vstupu od návštěvníka je nutno ošetřit (převést na entitu) znak `&lt;` (mohl by otevřít HTML značku). Pokud se uživatelský obsah může objevit v nějakém atributu, je třeba *rozbít* ještě **jednoduché a dvojité [uvozovky](/uvozovky)** — mohly by útočníkovi umožnit uzavřít původní atribut a vytvořit vlastní nebezpečný `onNěco`.

V PHP kromě použití hotového nástroje [HTML Purifier nebo Texy](/vycisteni-kodu) postačí:

```
$text = htmlspecialchars($text, ENT_QUOTES);
```

Ochrana funkcí `strip_tags` není dostatečná. Při vkládání takto „ošetřeného“ textu do atributů nebo v případě povolení jen některých značek, protože **obsah atributů nehlídá**.

## Narušení SQL dotazu (SQL injection)

Další nebezpečí je, když nám útočník **modifikuje SQL dotaz**. Může se to stát, když výsledný text SQL dotazu skládáme třeba v PHP a v datech od útočníka ponecháme uvozovku, která ukončí *naši* původní podmínku a umožní se tak útočníkovi psát další vlastní příkazy.

Pokud do **nebezpečného kódu** zajišťujícího přihlášení uživatele:

```
$dotaz = "SELECT * FROM uzivatele WHERE jmeno='{$_POST['jmeno']}' AND heslo='{$_POST['heslo']}'";
```

Pošleme jako `$_POST['heslo']` řetězec `' OR ''='`, vznikne následující dotaz, který útočníka přihlásí vždy, protože `''=''` bude vždy platné.

```
SELECT * FROM uzivatele WHERE jmeno='Jméno' AND heslo='**' OR ''='**'
```

### Řešení

Při skládání SQL dotazů stačí ošetřit všechna data funkcí `mysql_real_escape_string`. Další možnost je využít tzv. [prepared statements](http://php.net/manual/en/pdo.prepared-statements.php), kdy se místo proměnných do SQL dotazů píší jen otazníky a **bezpečné** nahrazení zajistí až **databásová vrstva** (např. [Dibi](http://dibiphp.com/)).

## Tajné vykonání požadavku (CSRF – Cross-site Request Forgery)

Docela rafinovaný způsob útoku hrozí u aplikací, kde není administrátorská akce dostatečně ochráněna. V čem spočívá? Útočník docílí toho, že přihlášeného administrátora dostane na URL, která provede nějakou akci (třeba smazání celého webu).

Toto nebezpečí hrozí zvlášť u systémů s **otevřeným zdrojovým kódem**, kde není problém získat konkrétní URL pro libovolné akce.

Dostat oprávněného uživatele na potřebnou adresu lze třeba přímým odkazem v komentářích, odkazem na vlastní web, který se na akci přesměruje, nebo využitím [XSS](#xss). Zvlášť zákeřné je potom **vložení obrázku s URL akce** jako cílem, protože si toho oběť nemusí vůbec všimnout.

```
&lt;img src="http://example.com/admin/smazatStranku.php?id=10"&gt;
```

Nebezpečné nejsou jen URL — tedy GET požadavky, stejně tak může být na stránce útočníka, kam se povede nahnat administrátora, škodlivý formulář odesílaný na pozadí metodou POST.

### Řešení

Jedna možnost je při všech akcích **kontrolovat [hlavičku `referer`](/referer)** (v PHP `$_SERVER['HTTP_REFERER']`), zda nepochází z cizí domény. Problém je, že uživatelé s běžně **vypnutým refererem** si jej pro funkčnost akcí na daném webu budou muset zapnout.

Druhá možnost je uživateli generovat pro provádění akce [ověřovací tokeny](http://php.vrana.cz/cross-site-request-forgery.php), které útočník nedokáže zjistit, takže jím vyvolané akce budou po návštěvě administrátora brány jako neplatné.

## PHP skripty ve veřejně přístupné složce

Pokud je celá aplikace a zvlášť potom **přístupové údaje do databáse** v adresáři, který webový server používá jako hlavní složku při přístupu na danou doménu, hrozí zde risiko, že v případě výpadku zpracovávání PHP skriptů půjde soubory `*.php` prohlížet jako běžný text. Nejedná se o teoretické strašení, ale opravdu **se to už stalo**.

### Řešení

Potlačit toto risiko může přesunutí citlivých dat o úroveň výše. U PHP souborů to není problém – `include` takových souborů by mělo normálně fungovat. Horší je to **s podporou u hostingů** – u řady z nich taková věc vůbec není možná.

## Nahrávání souborů

Necháme-li uživatele nahrávat na web soubory, je nutné zajistit, aby **nahrávacím formulářem nešlo přepisovat nebo nahrát nový PHP soubor**. Pokud by útočník dostal na náš web vlastní **spustitelný skript**, získá prakticky 100% kontrolu.

### Řešení

Je tedy nutno nechat uploadovat jen do vyhrazené složky, kde je zakázána interpretace PHP souborem `.htaccess`. Případně soubory `*.php` vůbec neumožnit nahrávat nebo jim měnit příponu na např. `.txt`.

## Aktualisace souborů

Při nahrávání nové verse aplikace na webhosting se může stát, že uživatel přistoupí na stránku v momentě, kdy **některé skripty jsou již nové a některé ne**. To může vyvolat nepříjemnost a případně i ztrátu dat nebo jiný problém.

### Řešení

Existuje hned několik možností.

  Celou novou versi aplikace nahrát vždy **do nového adresáře** a v jediném [veřejně přístupném](#verejna-slozka) souboru připojit *novou aplikaci*:
    ```
include "../aplikace**v2**/aplikace.php";
```

  - Aplikaci zmačkat do jednoho **jediného souboru**.

  - Po čas updatu **web vypnout**.

  - Nejprve všechny soubory nahrát pod **změněným názvem/příponou** a potom je hromadně přepsat a nahradit tak soubory staré. Tato možnost vychází z toho, že **přejmenování** na rozdíl od **nahrávání souborů** proběhne **prakticky okamžitě**. Existuje i [hotové řešení](http://phpfashion.com/ftp-deployment-nahravejte-pres-ftp-chytre).