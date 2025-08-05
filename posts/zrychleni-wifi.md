---
title: "Zrychlení Wi-Fi připojení"
headline: "Zlepšení signálu Wi-Fi připojení"
description: "Jak zlepšit signál, rychlost a stabilitu Wi-Fi připojení."
date: "2015-08-22"
last_modification: "2015-10-12"
status: 1
tags: ["produktivita"]
format: "html"
---

<div class="soft">
  <p>Díky následujícím bodům jsem zrychlil své připojení <b>pětinásobně</b>.</p>
</div>




<h2 id="smer">Směr a umístění antény</h2>

<p>Ideální je router umístit tak, aby signálem pokrýval především prostor, kde se bude Wi-Fi nejvíce využívat.</p>

<p>Pokud není možné router přemístit, k vyšší rychlosti připojení může pomoci jiné <b>natočení antény</b> routeru.</p>

<p>Typický router má anténu všesměrovou. Při změnách jejího směru se mi podařilo zvýšit rychlost internetu z <b>10 Mbps na 40 Mbps</b>. Pokud rychlost připojení nedosahuje svého potenciálu, může jiné natočení pomoci.</p>

<p><img src="/files/zrychleni-wifi/dsl.png" alt="Měření rychlosti připojení" class="border"></p>


















<p>Osvědčilo se mi zkoušet a <b>měřit rychlost</b>, jestli se nezlepší:</p>

<div class="external-content">
  <ul>
    <li>DSL: <a href="http://www.dsl.cz/mereni-rychlosti">Měření rychlosti připojení k internetu</a></li>
    <li><a href="http://www.speedtest.net/">Speedtest.net</a></li>
  </ul>
</div>



<h2 id="mode">Mode / Režim</h2>

<p>Existuje řada Wi-Fi standardů, které se označují jako <i>802.11</i> a nějaké písmenko.</p>


<p>Běžné routery nabízejí většinou režimy:</p>

<ul>
  <li>802.11b (11 Mbps)</li>
  <li>802.11g (54 Mbps)</li>
  <li>802.11n (600 Mbps)</li>
</ul>



<p>A potom kombinaci více režimů zároveň. Režimy se liší přenosovou rychlostí a novější zařízení, které se k Wi-Fi mají připojit, většinou zvládají <b>802.11n</b>.</p>

<p><img src="/files/zrychleni-wifi/mode.png" alt="Režimy Wi-Fi" class="border"></p>








<p>Pokud není potřeba připojit zařízení, co nejnovější standard nepodporuje, nabízí se nastavit jen ten nejvyšší.</p>




<h2 id="kanal">Změna kanálu</h2>

<p>V případě, že je v okolí více sítí <b>používající stejný kanál</b>, mohou se navzájem rušit.</p>

<p>Řešení je číslo kanálu v administraci změnit.</p>

<p><img src="/files/zrychleni-wifi/channel.png" alt="Změna kanálu Wi-Fi sítě" class="border"></p>

























<p>Řada routerů používá prý jako výchozí kanál 6. Z přibližně 40 sítí v mém okolí byly kromě <b>kanálu 6</b> ještě hojně používány <b>kanály 1 a 11</b>.</p>

<p>Takže buď se vyhnout těmto, nebo použít program pro monitorování Wi-Fi sítí a podívat se, <b>které kanály jsou volné</b>:</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.vistumbler.net/">Vistumbler</a> – program pro monitorování sítí v okolí</li>
  </ul>  
</div>

<p>Po spuštění stačí vpravo nahoře kliknout na spuštění monitorování a začnou se dostupné sítě zobrazovat včetně čísla kanálu, zabezpečení a kvality signálu.</p>

<p><img src="/files/zrychleni-wifi/vistumbler.png" alt="Změna kanálu Wi-Fi sítě" class="border"></p>






























<h3 id="channel-width">Channel Width / Šířka kanálu</h3>

<p>V administraci routeru půjde nejspíš zvolit mezi třemi možnostmi:</p>

<ul>
  <li>20 MHz</li>
  <li>40 MHz</li>
  <li>Auto</li>
</ul>

<p>Vyšší hodnota <b>40 MHz</b> umožňuje <b>vyšší přenosovou rychlost</b>, nižší hodnota prý znamená vyšší stabilitu.</p>

<p>Pokud je nabízená rychlost při 20 MHz (<i>Max Tx Rate</i>) vyšší než rychlost internetu a není tolik důležitá rychlost ve vnitřní síti, nabízí se zvolit právě těch 20 MHz.</p>






<h2 id="nastaveni">Nastavení routeru</h2>

<p>Nastavení bývá na adrese typu <code>192.168.1.1</code> ale může se lišit pro různá zařízení.</p>

<p>Tuto adresu si jde přečíst v manuálu k routeru, přímo na routeru nebo nastavení routeru otevřít ze síťových připojení ve Windows – stačí do adresy v průzkumníkovi napsat <b>Síť</b>.</p>


<p><img src="/files/zrychleni-wifi/sit.png" alt="Zobrazení Wi-Fi routeru" class="border"></p>










<h3 id="prihlaseni">Přihlašovací údaje k routeru</h3>

<p>Opět bývají v manuálu, na routeru nebo je lze <b>vyhledat Googlem</b> pomocí fráze typu „<code>Název routeru <b>admin login</b></code>“.</p>

<p>Nebo použít službu:</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.routerpasswords.com/">RouterPasswords.com</a> – výchozí hesla ke všem množným Wi-Fi routerům.</li>
  </ul>
</div>

<p>Případně stačí rovnou zkoušet nejznámnější kombinace jmen a hesel jako:</p>

<ul>
  <li>admin, <code>admin</code> (D-LINK, TP-LINK, ASUS)</li>
  <li>admin, <code>password</code></li>
  <li>administrator, <code>administrator</code></li>
  <li>admin, <code>1234</code>/<code>123</code> (Edimax, ZYXEL)</li>
  <li>root, <code>admin</code></li>
</ul>



