---
title: "Ping atribut"
headline: "Atribut <code>ping</code>"
description: "HTML atribut <code>ping</code> umožňuje <i>pingnout</i> nějakou další stránku při prokliknutí odkazu."
date: "2014-04-22"
last_modification: "2014-05-21"
status: 1
tags: ["HTML", "HTML atributy"]
---

```
&lt;a 
  href="http://jecas.cz"
  **ping**="zaznamenat.php?url=homepage"
>
  Odkaz
&lt;/a>
```

## Využití

Atribut `ping` v zásadě nenabízí nic, co by nebylo řešitelné bez něj. Hlavní využití by mohl mít pro **sledování uživatelů** – konkrétně zjišťování **prokliknutých odkazů**.

U odkazu, který chceme sledovat, atribut `ping` zajistí, že před samotným přechodem na cíl (`href`) dostane informaci i náš **měřicí skript**.

## Podpora

Zatím `ping` funguje ve Webkitu (**Chrome**, nová **Opera**). Ve Firefoxu jde *pingování* povolit v nastavení, ale ve výchozí podobě je vypnuté.

Ping se posílá metodou `POST` s typem `text/ping`, jak je možné vyčíst z [vývojářských nástrojů](/vyvojarske-nastroje).

## JS náhrada

[Pingnout v JavaScriptu](/ajax#pingnout) jde velmi jednoduše vytvořením obrázku se `src` odkazujícím na měřicí skript.

```
var obrazek = new Image();
obrazek.src = "zaznamenat.php?url=homepage";
```