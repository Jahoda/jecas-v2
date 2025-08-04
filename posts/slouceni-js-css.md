---
title: "Spojení CSS a JS souborů"
headline: "Spojení CSS a JS souborů do jednoho"
description: "Zrychlit načítání webu pomůže sloučení CSS a JavaScriptu do jednoho souboru. Hotové řešení v PHP."
date: "2013-12-16"
last_modification: "2013-12-18"
status: 1
tags: ["JavaScript", "CSS", "PHP", "Zrychlování webu"]
---

Při zrychlování webové stránky se může uspořit trochu času snížením **počtu HTTP spojení** složením **všech CSS** do jednoho souboru. Stejně tak u JavaScriptu. Kromě toho se můžou z CSS/JS odstranit bílé znaky (což trochu srazí i **datovou velikost** a může odradit pár [kopírovačů](/kopirovani)).

*Zmačkání* souborů do jednoho je vhodné nějak **zautomatisovat**.

  - Sloučení stylů umí zajistit **CSS preprocesory**.

  - Spojování a minifikování skriptů a stylů umožňuje v **Nette Frameworku** zajistit rozšíření [Webloader](http://addons.nette.org/cs/webloader).

  - Další možnost je ruční spojení nebo jednoduchý **PHP skript**…

## Hotové spojování v PHP

Jako primitivní řešení se mi osvědčil následující skript, který přežvýká CSS připojené přes `&lt;link>` i obsah `&lt;style>`. A stejně tak spojí interní a externí `&lt;script>`y.

[Stáhnout Zmačkátor](/files/slouceni-js-css/zmackator.rar)

### Použití

Před daným obsahem se vloží *Zmačkátor* a zavolá funkce `zmackat`, které se předá obsah:

```
&lt;?php include 'zmackator.php';
zmackat(&lt;&lt;&lt;EOT
```

Potom následuje připojení stylů a skriptů následované:

```
EOT
)?>
```

Funkce `zmackat` si stáhne obsah externích CSS/JS, **smíchá** ho s interními styly/scripty v **původním pořadí** a  vytvoří dva soubory, které se jednoduchým skriptem trochu zmenší (odstraní se **komentáře** a některé nadbytečné **mezery**):

```
cache/style.css
cache/script.js

```

Nakonec je tato funkce při`&lt;link href>`uje a při`&lt;script src>`uje místo původního obsahu.

Funkci `zmackat` jde ovlivňovat **dalším parametrem** (kromě HTML kódu připojující CSS a JS).

  - `vypnout` — Nic se spojovat nebude, HTML kód připojující soubory se nezmění.

  - `hotovo` — Zadáním nějaké jiné **neprázdné hodnoty** (třeba `hotovo`) se jen připojí hotové, již vytvořené, **sloučené soubory**. Hodí se k použití v ostrém provozu, kdy se nemusí soubory znovu generovat.

  - S **prázdným** nebo **nezadaným** druhým parametrem se při každém načtení CSS a JS přegenerují, přepíší a připojí do stránky.