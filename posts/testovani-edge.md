---
title: "Testování v MS Edge a IE"
headline: "Testování v MS Edge a IE"
description: "Jak testovat stránky v různých versích Internet Exploreru a Edge ve Windows, Mac OS nebo v Linuxu."
date: "2015-08-18"
last_modification: "2015-08-18"
status: 1
tags: ["Produktivita", "Prohlížeče", "Testování webů"]
---

Jelikož v případě **prohlížečů od Microsoftu** nebývá zvykem, že uživatelé rychle updatují na nejnovější versi (jako u **Firefoxu**, **Chrome** a podobně), drží se na významnějších tržních podílech souběžně několik prohlížečů najednou:

  - **Internet Explorer 8** (nejnovější Explorer, co jde dostat do Windows XP)

  - **Internet Explorer 9, 10**

  - [**Internet Explorer 11**](/ie11) (nejnovější Explorer, co jde dostat do Windows 7 a 8)

  - [**Microsoft Edge******](/microsoft-edge) (dostupný pouze ve [Windows 10](/windows-10))

Globální podíly jednotlivých IE v roce 2015 v ČR podle StatCounteru:

## Více IE/Edge ve Windows

V případě platformy Windows je nejsnazší upgradovat na **Windows 10**, kde je dostupný nejnovější **Microsfot Edge** i **IE 11**, který obsahuje kompatibilní režimy až po **IE 5**.

Ve Windows 10 jsou Edge a IE samostatné nezávislé programy.

Po spuštění Internet Exploreru je ve [vývojářských nástrojích](/vyvojarske-nastroje) (klávesa F12) možnost *Emulace* starších vykreslovacích jader:

## Virtuální stroje pro Windows, Mac, Linux

Prohlížeče od Microsoftu nejsou určeny pro jiné operační systémy než Windows.

Pro **Mac** a **Linux** je tedy řešení **virtualisace operačního systému Windows**, kde je požadovaný Internet Explorer nebo Micrsoft Edge dostupný.

    - [Download virtual machines](http://dev.modern.ie/tools/vms/windows/) – stažení virtuálních strojů s IE 6 až IE 11 i Edge

Na stránce výše si stačí vybrat vlastní operační systém, požadovaný prohlížeč a virtualisační platformu.

## Vzdálené spouštění prohlížečů

Pro vývojáře, kteří si **nechtějí instalovat virtuální stroj** s různými operačními systémy, existují nástroje, kteří k těmto instalacím nabízejí **vzdálený přístup**.

Z prostředí vlastního prohlížeče si potom jde spustit prakticky libovolný prohlížeč v libovolném operačním systému.

Tyto služby obvykle fungují za úplatu, ale pro vyzkoušení jsou **trial verse zdarma**.

    - [BrowserStack](https://www.browserstack.com/)

    - [Cross Browser Testing](http://crossbrowsertesting.com/)

## Odkazy jinam

    - [Testování webů napříč prohlížeči](/prohlizece) – další možnosti testování v různých prohlížečích než jen od Micrsoftu