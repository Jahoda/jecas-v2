---
title: "Prohlížeč Blisk a testování responsivních webů"
headline: "Blisk – testování responsivních webů"
description: "Blisk prohlížeč vypadá jako Chrome, ale má šikovné nástroje pro testování responsivních webů."
date: "2016-05-23"
last_modification: "2016-05-23"
status: 1
tags: ["Produktivita", "Prohlížeče", "Responsivní design"]
---

Při testování responsivních webů je zpravidla neustále nutné měnit velikost stránky (viewportu). To jde na desktopu buď přímo změnou rozměrů okna prohlížeče, nebo ve [vývojářských nástrojích](/vyvojarske-nastroje) (většinou klávesa F12) pomocí režimu pro různá zařízení.

    - [Ladění responsivních webů](/testovani-mobily) – Jak testovat zobrazení responsivního webu na mobilních zařízeních

Prohlížeč **Blisk** dokáže celý proces testování zjednodušit.

## Stažení Blisku

Blisk jde zdarma stáhnout.

    - [Stáhnout Blisk](https://blisk.io/) (nevyžaduje registraci)

## Funkce

    Disponuje rozdělením stránky **do dvou oken**, kde vlevo jde zvolit nějaké z běžných mobilních zařízení a vpravo je klasické desktopové zobrazení. Tedy za situace, že je prohlížeč v dostatečně velkém okně.

    V okně pro mobilní zařízení je potom **emulace mobilního prohlížeče** včetně dotykových gest a mobilní [hlavičky `user-agent`](/ua).

    **Blisk** dokáže synchronisovat rolování, čímž jde docela rychle získat celkový přehled o stránce na mobilu i desktopu.

Trochu je škoda, že stránka otevřená do dvou zařízení není synchronisovaná. Změny ve vývojářských nástrojích v jednom okně se tedy automaticky **nepromítnou** do okna druhého. To by byla hodně užitečná vlastnost.

## Auto refresh

Kromě zmíněných funkcí umí i automaticky obnovit stránku po změně lokálních souborů.

Stačí si v nastavení přidat pro určitou doménu lokální složku, ve které změna jakéhokoliv souboru způsobí obnovení stránky.

Tato funkce je použitelná i v případě, že se vyvíjí na vzdáleném serveru, kam se kopírují soubory z lokálního umístění (třeba přes [FTP plugin v Sublime Text](/st-ftp)).

Není tedy potřeba používat [program LiveReload](/livereload).

## Závěr

**Blisk** vypadá jako šikovný prohlížeč pro testování responsivních webů. Pro uživatele zvyklé na vývojářské nástroje v **Chrome** se zdá být hodně zajímavou volbou (DevTools jsou prakticky stejné), jak mobilní weby testovat rychleji a pohodlněji.