---
title: "Vypnutí Emoji ve WordPressu"
headline: "Vypnutí Emoji ve WordPressu"
description: "Jak ve WordPressu zakázat grafické symboly Emoji."
date: "2015-05-19"
last_modification: "2015-05-20"
status: 1
tags: ["Hotová řešení", "Rady a nápady", "WordPress", "Redakční systémy"]
---

[WordPress](/wordpress) 4.2 začal nahrazovat [Emoji znaky](/emoji) vlastními obrázky.

Vloží-li se do stránky například symbol šipky:

  ◀

WordPress ji pomocí JavaScriptu nahradí obrázkem.

    img.emoji {
      width: 1em;
      height: 1em;
      display: inline;
    }

To může vadit z několika důvodů:

  - Obrázek často bude **vypadat jinak** než symbol.

  - Pro nahrazení znaků se musí stáhnout JS soubor, který provede nahrazení, a následně konkrétní obrázky. To **zdržuje načítání stránky**.

Toto nahrazování probíhá v **celém obsahu** stránky (ne tedy jen u samotného obsahu, ale i u HTML šablon).

O **převod symbolů na obrázky** se stará se o to tento skript vložený do hlavičky stránky.

## Zrušení převodu na obrázky

Pro zrušení převodu je nutné zrušit filtr, který převodní skript připojuje. To jde docílit např. přidáním následujícího kódu do souboru `functions.php` u **aktivní šablony**.

```
function disable_emojis() {
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
}
add_action( 'init', 'disable_emojis' );
```

Jak už to tak u WordPressu bývá, jde téhož docílit i pluginem – jmenuje se **Disable Emojis** – odstraňuje i další filtry, které se snaží nahrazovat Emoji obrázky na jiných místech jako jsou RSS zdroje a podobně.

Pro kompletní **odstranění převodu Emoji** jde kromě pluginu přímo vložit do WordPressu obdobný kód.

    - [Disable Emojicons Introduced In WordPress 4.2](http://www.paulund.co.uk/disable-emojicons-introduced-in-wordpress-4-2) – obsahuje kód jako plugin pro odstranění převodu ze všech možných míst