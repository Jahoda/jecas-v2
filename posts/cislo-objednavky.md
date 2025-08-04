---
title: "Zabezpečení čísla objednávky"
headline: "Jak zabezpečit číslo objednávky v e-shopu"
description: "Jakým způsobem bezpečně sestavit číslo objednávky zboží v e-shopu."
date: "2015-08-31"
last_modification: "2015-09-10"
status: 1
tags: ["Hotová řešení", "Rady a nápady", "PHP", "Bezpečnost"]
---

U internetového obchodu bývá zvykem, že objednané zboží dostane nějaký identifikátor – **číslo objednávky** – podle kterého ho jde sledovat a podobně.

Číslo objednávky se může dostat i do URL vedoucí na přehled objednaného zboží, který zákazník dostane e-mailem:

```
example.com/objednavka/**123**
```

## Soukromí a bezpečnost

Tvar identifikátoru sestávající z pořadového čísla jako ukázka výše trpí zásadním problémem – ruční změnou URL si jde **prohlížet všechny objednávky** obsahující citlivé údaje jako kontakty na zákazníky.

Nic v takovém případě nebrání, aby si kdokoliv jednoduchým skriptem **stáhl všechny provedené objednávky**.

Kromě využitelnosti těchto informací pro konkurenci nebo vyzrazení osobních údajů návštěvníků (jméno, e-mail, telefon, adresa apod.) hrozí i kompromitování nakupujících v případě obchodu prodávajícího choulostivý sortiment zboží.

I v případě, že vyzrazení není kritické, si jde nezabezpečením minimálně uříznout ostudu u veřejnosti.

## Řešení

První možnost je stránku s objednávkou **zobrazovat až po přihlášení**. Tento postup může být trochu obtěžující – uživatel by se **musel registrovat** a navíc objednávka nepůjde rovnou **sdílet předáním odkazu**.

### Nepredikovatelný identifikátor

Pro vytvoření bezpečného odkazu pro zobrazení objednávky je potřeba **vygenerovat identifikátor**, který případný útočník **nedokáže předvídat**.

K tomu je nutné generovat [náhodná čísla](/nahodne-cislo). To jde v [PHP](/php) jednoduše takto:

```
$identifikator = md5(uniqid(mt_rand(), true));
```

Takto získané ID nebude 100% unikátní. Funkce `mt_rand` navíc není 100% neodhadnutelná. Pro běžné použití by to ale mělo stačit. Více informací: [How to generate a random, unique, alphanumeric string?](http://stackoverflow.com/questions/1846202/php-how-to-generate-a-random-unique-alphanumeric-string/13733588#13733588)

Výsledný identifikátor bude vypadat třeba takto: `41fd4f4b03a249c661b2dfb174e53ea6`

To je značně nepraktické například při **telefonním kontaktu se zákazníkem**, když by měl sdělovat číslo své objednávky.

### Složený identifikátor

Docela rozumné řešení je zkombinovat číslo objednávky s náhodnými daty. Například:

```
pořadové číslo + náhodných 5 písmen
```

Jelikož má anglická abeceda 26 znaků, zajistí těchto 5 písmen celkem skoro **12 milionů kombinací** (265) podob adres, na kterých může být daná objednávka dostupná.

Vygenerovat takový řetězec půjde následovně (znaky s ASCII kódy 65 až 90 jsou velká písmena):

```
&lt;?php
function nahodnyRetezec($delka = 5) {
  $id = "";
  for ($i = 1; $i &lt;= $delka; $i++) { 
    $id .= chr(mt_rand(65, 90));
  }
  return $id;
}
```

Tento náhodný identifikátor se následně uloží do DB k objednávce.

URL objednávky tak bude například:

```
example.com/objednavka/123PGHCY
```

Pro rozluštění adresy objednávky `122` by potom útočník potřeboval v průměru skoro 6 milionů pokusů.

Při zobrazení stránky s objednávkou stačí z adresy **čísla a písmena oddělit**. To jde několika způsoby:

  Pro čísla použít `intval` a písmena získat jako posledních 5 znaků funkcí `substr`:

  ```
$id = intval($adresa);
$key = substr($adresa, -5);
```

    Získat číselné ID funkcí `intval` a toto číslo následně odstranit funkcí `str_replace`:

    ```
$id = intval($adresa);
$key = str_replace($id, "", $adresa);
```

    Toto řešení není závislé na přesném počtu písmen v identifikátoru.

    Použít **regulární výrazy**:

    ```
preg_match_all('/^(\d+)(\w+)$/', $adresa, $matches);
$id = $matches[1][0];
$key = $matches[2][0];
```

Nyní stačí vyhledat objednávku, kde se číselný i písmenový identifikátor shodují (příklad SQL dotazu při použití [PDO](/pdo)):

```
SELECT * 
FROM objednavky 
WHERE `id` = ? AND `key` = ?
```