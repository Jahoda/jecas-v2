---
title: "Výpadek Cloudflare v listopadu 2025: Co se stalo"
headline: "Výpadek Cloudflare: Databasová chyba vyřadila tisíce webů"
description: "18. listopadu 2025 postihla Cloudflare čtyřhodinová porucha způsobená změnou oprávnění v databasi. Jednoduchý přehled, co se stalo a proč."
date: "2025-11-19"
last_modification: "2025-11-19"
status: 1
tags: ["zabezpeceni", "cloud"]
format: "html"
---

<p>V pondělí 18. listopadu 2025 v poledne postihla službu <a href="https://www.cloudflare.com/">Cloudflare</a> rozsáhlá porucha, která vyřadila tisíce webů a aplikací po celém světě. Výpadek trval přibližně <b>4 hodiny a 10 minut</b>.</p>

<h2 id="co-je-cloudflare">Co je Cloudflare</h2>

<p>Cloudflare poskytuje infrastrukturu pro zrychlení a zabezpečení webů. Přes jejich síť prochází obrovské množství internetového provozu – chrání weby před DDoS útoky, zrychluje načítání stránek a poskytuje další služby.</p>

<p>Pokud Cloudflare vypadne, znamená to, že <b>tisíce webů</b>, které na něj spoléhají, se stanou nedostupnými.</p>

<h2 id="co-se-stalo">Co se stalo</h2>

<p>Výpadek začal <b>18. listopadu 2025 v 11:20 UTC</b> (12:20 našeho času).</p>

<p>Během několika minut se staly nedostupnými desítky známých služeb:</p>

<ul>
  <li>X (dříve Twitter)</li>
  <li>OpenAI / ChatGPT</li>
  <li>Discord</li>
  <li>Canva</li>
  <li>Figma</li>
  <li>1Password</li>
  <li>Trello</li>
  <li>Medium</li>
  <li>Vercel</li>
  <li>DigitalOcean</li>
  <li>Spotify (částečně)</li>
  <li>a mnoho dalších</li>
</ul>

<p>Uživatelé po celém světě najednou nemohli přistupovat ke svým oblíbeným službám. Na sociálních sítích se okamžitě začalo mluvit o rozsáhlém výpadku internetu.</p>

<p><img src="/files/cloudflare-vypadek-listopad-2025/image-3-.png" class="border" alt="Internet postavený na Cloudflare" /></p>

<h2 id="pricina">Co způsobilo výpadek</h2>

<p>Cloudflare vydal <a href="https://blog.cloudflare.com/18-november-2025-outage/">oficiální vysvětlení</a> příčiny výpadku. Šlo o <b>technickou chybu</b>, ne o kybernetický útok.</p>

<h3 id="technicke-detaily">Technický průběh</h3>

<p><b>V 11:05 UTC</b> inženýři Cloudflare provedli změnu oprávnění v databasovém systému <b>ClickHouse</b>. Cílem bylo vylepšit způsob, jakým fungují distribuované dotazy v databasi.</p>

<p>Tato změna však měla nečekaný vedlejší efekt:</p>

<ol>
  <li>Databasový dotaz začal vracet <b>duplicitní řádky</b></li>
  <li>Tyto duplicitní data se dostaly do souboru nazývaného <b>„feature file“</b>, který používá systém Bot Management</li>
  <li>Soubor se <b>zdvojnásobil na velikost</b></li>
  <li>Překročil <b>hardcodovaný limit 200 features</b></li>
  <li>To způsobilo <b>Rust panic</b> (pád programu) v systému, který distribuuje provoz po síti</li>
</ol>

<p>Protože se tento soubor generoval <b>každých 5 minut</b> a rychle se distribuoval na všechny servery Cloudflare po celém světě, problém se během několika minut rozšířil po celé síti.</p>

<h3 id="zjednodusene">Zjednodušeně řečeno</h3>

<p>Představte si to jako domino efekt:</p>

<ul>
  <li>Změna v nastavení database → duplicitní data</li>
  <li>Duplicitní data → příliš velký konfigurační soubor</li>
  <li>Příliš velký soubor → překročení limitu</li>
  <li>Překročení limitu → pád klíčového systému</li>
  <li>Pád systému → nedostupnost služeb</li>
</ul>

<p>Problém byl v tom, že tento soubor se propagoval na <b>všechny servery</b> v síti Cloudflare. Protože jejich hlavní proxy systém (nazývaný „Frontline“) zpracovává téměř každý požadavek, selhání se okamžitě projevilo globálně.</p>

<h2 id="co-to-nebylo">Co to nebylo</h2>

<p>Důležité je zmínit, co výpadek <b>nezpůsobilo</b>:</p>

<ul>
  <li><b>Nebyl to kybernetický útok</b> – Cloudflare potvrdil, že nešlo o útok hackerů</li>
  <li><b>Nebyl to DDoS útok</b> – i když se zpočátku spekulovalo o „nárůstu provozu“</li>
  <li><b>Nebyl to BGP problém</b> – předchozí větší výpadky Cloudflare byly způsobeny chybou v BGP routingu, tentokrát šlo o jinou příčinu („Border Gateway Protocol“ je směrovací protokol, kterým si jednotlivé sítě na internetu oznamují, kudy se má provoz směrovat)</li>
</ul>

<h2 id="jak-to-vyresili">Jak to vyřešili</h2>

<p>Cloudflare identifikoval problém a:</p>

<ol>
  <li>Vrátil změnu v databasových oprávněních</li>
  <li>Zastavil generování chybných konfiguračních souborů</li>
  <li>Distribuoval správnou versi souboru na všechny servery</li>
  <li>Postupně obnovoval služby</li>
</ol>

<p>Celý výpadek trval přibližně <b>4 hodiny a 10 minut</b>. Postupné obnovování služeb trvalo další desítky minut, protože opravené soubory se musely distribuovat po celé globální síti.</p>

<h2 id="co-se-muzeme-naucit">Co se z toho můžeme naučit</h2>

<h3 id="riziko-centralisace">Risiko centralisace</h3>

<p>Výpadek ukázal, jak <b>křehký může být internet</b>, když velká část infrastruktury závisí na jedné společnosti.</p>

<p>Cloudflare je obrovská služba, ale když vypadne, ovlivní to tisíce dalších služeb najednou. Je to tzv. <b>„single point of failure“</b> (jediný bod selhání).</p>

<h3 id="hardcodovane-limity">Hardcodované limity</h3>

<p>Problém částečně vznikl kvůli <b>hardcodovanému limitu 200 features</b> v systému. Když byl překročen, místo řádného ošetření chyby došlo k pádu programu.</p>

<p>V kritických systémech by měly být limity:</p>

<ul>
  <li>Dobře zdokumentované</li>
  <li>Monitorované</li>
  <li>S včasným varováním před dosažením</li>
  <li>S řádným ošetřením chyb místo pádu</li>
</ul>

<h3 id="testovani-zmen">Testování změn</h3>

<p>Změna v databasových oprávněních vypadala jako rutinní úprava, ale měla nečekané důsledky. To ukazuje důležitost:</p>

<ul>
  <li><b>Postupného nasazování</b> (rolling deployment) – změny nejdřív na části systému</li>
  <li><b>Důkladného testování</b> – i zdánlivě malých změn</li>
  <li><b>Monitoringu</b> – rychlá detekce anomálií</li>
  <li><b>Možnosti rychlého rollbacku</b> – vrácení změn při problémech</li>
</ul>

<h2 id="reakce-cloudflare">Reakce Cloudflare</h2>

<p>Matthew Prince, CEO Cloudflare, se veřejně omluvil a společnost zveřejnila podrobnou post-mortem analýzu.</p>

<p>Cloudflare přislíbil:</p>

<ul>
  <li>Lepší testování změn v databasových systémech</li>
  <li>Zlepšení mechanismů pro detekci a prevenci podobných problémů</li>
  <li>Revisi hardcodovaných limitů v kritických systémech</li>
  <li>Lepší postupy pro rollout změn</li>
</ul>

<p>Otevřenost a rychlost, s jakou Cloudflare přiznal chybu a zveřejnil detaily, je příkladná. Mnoho společností by podobný incident utajovalo nebo minimalisovalo.</p>

<h2 id="zaver">Závěr</h2>

<p>Výpadek Cloudflare 18. listopadu 2025 byl připomínkou, že:</p>

<ul>
  <li>I malé změny mohou mít <b>velké důsledky</b> v komplexních systémech</li>
  <li><b>Centralisace</b> internetové infrastruktury přináší risika</li>
  <li>Důležité je mít <b>dobré postupy</b> pro testování a nasazování změn</li>
  <li><b>Hardcodované limity</b> v kritických systémech vyžadují zvláštní pozornost</li>
  <li><b>Transparentnost</b> při řešení problémů buduje důvěru</li>
</ul>

<p>Pro běžné uživatele to znamená: i ty nejspolehlivější služby mohou občas vypadnout. Proto je dobré mít <b>zálohy</b> a <b>alternativní řešení</b> pro kritické úkoly.</p>

<p>Pro vývojáře, co na Cloudflare spoléhají a provozují tam svoje weby a aplikace, je to relativně příjemné. Nemusí a často ani nemohou nic řešit, když stejně nefunguje půlka internetu.</p>
