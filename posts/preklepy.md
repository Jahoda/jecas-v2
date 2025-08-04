---
title: "Zjišťování a oprava překlepů"
headline: "Jak zjistit a opravit překlep"
description: "Jak zjišťovat, jestli uživatel neudělal překlep a sdělit mu, co chtěl napsat."
date: "2015-11-07"
last_modification: "2016-02-17"
status: 1
tags: ["Rady a nápady", "PHP"]
---

Pokud se do hledání v [Google](/google) zadá místo „css selektory“ řetězec „c**c**s selektory“, *umělá inteligence* pochopí, že se uživatel nejspíš přepsal a rovnou vyhledá variantu, kterou usoudí za správnou:

Pokud si program není tolik jistý, vyhledá skutečně zadaný výraz a možný překlep nabídne v „Měli jste na mysli“:

Jak překlepy odhalovat na svém webu?

## Podobnost řetězců

### `levenshtein`

V **PHP** jde použít funkci [`levenshtein`](http://php.net/manual/en/function.levenshtein.php), která vrací *vzdálenost* dvou řetězců (na pořadí nezáleží).

```
&lt;?php
echo levenshtein("fytopuf", "fy**r**opuf");
```

Její chování se dá složitě matematicky popsat nebo zkrátka jen vycházet z toho, že vrací číslo, které je rovno **počtu změněných znaků, aby se z jednoho řetězce stal druhý**.

Čím nižší číslo, tím jsou řetězce podobnější.

Z *fyropufu* se udělá *fytopuf* tak, že nahradí `r` za `t`, tedy se musí změnit jeden znak. Funkce `levenshtein` vrátí pro tyto řetězce `1`. Byli-li by oba dva řetězce stejné, výsledkem bude `0`. Pokud se ve slově prohodí dvě písmena, výsledná vzdálenost bude `2`.

Na první pohled toto chování vypadá báječně. Pokud se uživatelem zadaný řetězec v prohledávaných datech nevyskytuje, spočítá se pro každé slovo *levenshtein* a výsledek s nejnižší hodnotou bude oprava překlepu.

### Úskalí funkce levenshtein

Bohužel to má zásadní vady. Zvlášť u **krátkých řetězců** se na nízkou hodnotu dostanou na první pohled nesouvisející slova.

Následující příklad je z [Nette](/nette), které se v případě neexistující proměnné pokouší hledat nějakou nejpodobnější:

    Řetězec `$tags` je od `$this` *vzdálen* o hodnotu `2`.

    Stejně tak ale `$tags` od `$tasg`.

Zatímco druhý případ je překlep, první nikoliv. Výsledná vzdálenost je v obou případech stejná.

**David Grudl** se to následně pokusil [vyřešit](https://github.com/nette/utils/commit/421d1a65c0cfb1a318cd7885c7efbe4e65875ba3) změnou vah.

```
levenshtein($prvni, $druhy, 10, 11, 10);
```

Funkce `levenshtein` má totiž nepovinné parametry, kam jde nastavit, kolik *stojí* jednotlivé operace jako je **vložení**, **nahrazení** a **odstranění**.

Zvýšením hodnoty nahrazení je tedy prohození písmen bráno jako **podobnější** než použití úplně jiných znaků.

```
levenshtein("tags", "this", 10, 11, 10); // 22
levenshtein("tags", "tasg", 10, 11, 10); // 20
```

### Funkce `similar_text`

V PHP existuje ještě funkce [`similar_text`](http://php.net/manual/en/function.similar-text.php) – ta se chová podobně jako `levenshtein`.

Umí navíc vypsat podobnost v procentech:

```
similar_text("css", "ccs", $podobnost);
echo $podobnost; // 66.66
```

## Druhy překlepů

Překlepů existuje více druhů:

    **Prohození písmen** – místo `tags` člověk napíše `tasg`.

    **Špatná klávesa** – uživatel stiskne omylem sousední klávesu, například napíše `tafs` místo `tags`, protože G a F jsou vedle sebe.

    V extrémním případě potom posune celé slovo, protože položil ruce na klávesnici do špatné polohy. Místo `les` vnikne `kwa`:

    **QWERTZ vs. QWERTY** – [česká klávesnice](/ceska-klavesnice) má oproti anglické prohozené Z a Y, místo `fytopuf` tak vnikne `f**z**topuf`.

    **Vynechání písmene** – třeba místo `napíše` vznikne jen `napíe`.

    „**Přeřeknutí**“ – i při psaní může člověk splést první slovo, protože už myslí na druhé. V bodu dva jsem například místo „potom posune“ napsal omylem „postom posune“.

    **Neznalost** – uživatel neví, jak se slovo správně píše. Třeba místo `bizarní` napíše `bizar**d**ní`, místo `css` napíše `ccs` a podobně.

    Větší problém je toto v angličtině, kde se slova jinak píší a jinak vyslovují. K tomu má PHP dvě funkce [`metaphone`](http://php.net/manual/en/function.metaphone.php) a [`soundex`](http://php.net/manual/en/function.soundex.php), které řeší právě výslovnost.

## Řešení překlepů

Určovat čistě programově, co chtěl člověk napsat, je tedy značně obtížné.

Hodí se k tomu potřeba zpětná vazba návštěvníků. Třeba zrovna jako v případě Googlu, který se uživatelů ptá, jestli náhodou nechtěl hledat něco jiného.

V praxi to jde relativně snadno řešit tak, že se při nenalezení žádných výsledků pro hledané slovo funkcí `levenshtein` najde podobný výraz, pro který už nějaké výsledky existují.

## Využití

Kromě použití při **vyhledávání** se podobnost může hodit u opravování URL:

    - [Dohledání a opravení rozbité adresy](/oprava-url)

Teoreticky by podobnost šlo používat pro automatické **vytváření interních odkazů**. Kdy by se ze slova „odkazů“ udělal automaticky odkaz na stránku [odkazy](/odkazy). Dalšími postupy se zabývá článek na nejlepším českém blogu o programování:

    - Programio: [Jak vytvářím interní odkazy](http://programio.havrlant.cz/jak-vytvarim-interni-odkazy/)