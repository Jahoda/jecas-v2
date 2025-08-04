---
title: "Zrychlení Wi-Fi připojení"
headline: "Zlepšení signálu Wi-Fi připojení"
description: "Jak zlepšit signál, rychlost a stabilitu Wi-Fi připojení."
date: "2015-08-22"
last_modification: "2015-10-12"
status: 1
tags: ["Produktivita"]
---

Díky následujícím bodům jsem zrychlil své připojení **pětinásobně**.

## Směr a umístění antény

Ideální je router umístit tak, aby signálem pokrýval především prostor, kde se bude Wi-Fi nejvíce využívat.

Pokud není možné router přemístit, k vyšší rychlosti připojení může pomoci jiné **natočení antény** routeru.

Typický router má anténu všesměrovou. Při změnách jejího směru se mi podařilo zvýšit rychlost internetu z **10 Mbps na 40 Mbps**. Pokud rychlost připojení nedosahuje svého potenciálu, může jiné natočení pomoci.

Osvědčilo se mi zkoušet a **měřit rychlost**, jestli se nezlepší:

    - DSL: [Měření rychlosti připojení k internetu](http://www.dsl.cz/mereni-rychlosti)

    - [Speedtest.net](http://www.speedtest.net/)

## Mode / Režim

Existuje řada Wi-Fi standardů, které se označují jako *802.11* a nějaké písmenko.

Běžné routery nabízejí většinou režimy:

  - 802.11b (11 Mbps)

  - 802.11g (54 Mbps)

  - 802.11n (600 Mbps)

A potom kombinaci více režimů zároveň. Režimy se liší přenosovou rychlostí a novější zařízení, které se k Wi-Fi mají připojit, většinou zvládají **802.11n**.

Pokud není potřeba připojit zařízení, co nejnovější standard nepodporuje, nabízí se nastavit jen ten nejvyšší.

## Změna kanálu

V případě, že je v okolí více sítí **používající stejný kanál**, mohou se navzájem rušit.

Řešení je číslo kanálu v administraci změnit.

Řada routerů používá prý jako výchozí kanál 6. Z přibližně 40 sítí v mém okolí byly kromě **kanálu 6** ještě hojně používány **kanály 1 a 11**.

Takže buď se vyhnout těmto, nebo použít program pro monitorování Wi-Fi sítí a podívat se, **které kanály jsou volné**:

    - [Vistumbler](http://www.vistumbler.net/) – program pro monitorování sítí v okolí

Po spuštění stačí vpravo nahoře kliknout na spuštění monitorování a začnou se dostupné sítě zobrazovat včetně čísla kanálu, zabezpečení a kvality signálu.

### Channel Width / Šířka kanálu

V administraci routeru půjde nejspíš zvolit mezi třemi možnostmi:

  - 20 MHz

  - 40 MHz

  - Auto

Vyšší hodnota **40 MHz** umožňuje **vyšší přenosovou rychlost**, nižší hodnota prý znamená vyšší stabilitu.

Pokud je nabízená rychlost při 20 MHz (*Max Tx Rate*) vyšší než rychlost internetu a není tolik důležitá rychlost ve vnitřní síti, nabízí se zvolit právě těch 20 MHz.

## Nastavení routeru

Nastavení bývá na adrese typu `192.168.1.1` ale může se lišit pro různá zařízení.

Tuto adresu si jde přečíst v manuálu k routeru, přímo na routeru nebo nastavení routeru otevřít ze síťových připojení ve Windows – stačí do adresy v průzkumníkovi napsat **Síť**.

### Přihlašovací údaje k routeru

Opět bývají v manuálu, na routeru nebo je lze **vyhledat Googlem** pomocí fráze typu „`Název routeru **admin login**`“.

Nebo použít službu:

    - [RouterPasswords.com](http://www.routerpasswords.com/) – výchozí hesla ke všem množným Wi-Fi routerům.

Případně stačí rovnou zkoušet nejznámnější kombinace jmen a hesel jako:

  - admin, `admin` (D-LINK, TP-LINK, ASUS)

  - admin, `password`

  - administrator, `administrator`

  - admin, `1234`/`123` (Edimax, ZYXEL)

  - root, `admin`