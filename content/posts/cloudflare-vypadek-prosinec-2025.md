---
title: "Výpadek Cloudflare v prosinci 2025: Oprava zranitelnosti shodila internet"
headline: "Cloudflare opět vypadl: Oprava bezpečnostní díry shodila 28 % internetu"
description: "5. prosince 2025 způsobila oprava zranitelnosti React Server Components 25minutový výpadek Cloudflare. Druhý incident během tří týdnů."
date: "2025-12-05"
last_modification: "2025-12-05"
status: 1
tags: ["zabezpeceni", "cloud"]
format: "html"
---

<p>V pátek 5. prosince 2025 ráno postihla službu <a href="https://www.cloudflare.com/">Cloudflare</a> další rozsáhlá porucha. Tentokrát trval výpadek přibližně <b>25 minut</b> a postihl asi <b>28 % veškerého HTTP provozu</b>, který Cloudflare zpracovává.</p>

<p>Jde o druhý velký výpadek během pouhých tří týdnů – předchozí incident 18. listopadu trval přes 4 hodiny.</p>

<h2 id="co-se-stalo">Co se stalo</h2>

<p>Výpadek začal <b>5. prosince 2025 kolem 8:47 UTC</b> (9:47 našeho času).</p>

<p>Během několika minut se staly nedostupnými desítky známých služeb:</p>

<ul>
  <li>Zoom</li>
  <li>LinkedIn</li>
  <li>X (dříve Twitter)</li>
  <li>Discord</li>
  <li>Canva</li>
  <li>Notion</li>
  <li>Spotify</li>
  <li>ChatGPT / Perplexity</li>
  <li>Fortnite a Valorant</li>
  <li>Coinbase</li>
  <li>Shopify obchody</li>
  <li>Deliveroo, JustEat, Etsy, Wayfair, Vinted</li>
  <li>a mnoho dalších včetně Downdetectoru</li>
</ul>

<p>Ironicky vypadl i samotný <b>Downdetector</b> – služba, kam lidé chodí zjišťovat, jestli jsou jiné služby v poruše.</p>

<h2 id="casova-osa">Časová osa</h2>

<ul>
  <li><b>08:47 UTC</b> – začátek problémů</li>
  <li><b>08:56 UTC</b> – Cloudflare začíná vyšetřovat problémy s API a dashboardem</li>
  <li><b>09:09 UTC</b> – pokračuje vyšetřování</li>
  <li><b>09:12 UTC</b> – nasazena oprava, stav změněn na „monitorování"</li>
  <li><b>09:19–09:20 UTC</b> – incident označen jako vyřešený</li>
</ul>

<p>Celý výpadek trval přibližně <b>25 minut</b>.</p>

<h2 id="pricina">Co způsobilo výpadek</h2>

<p>Cloudflare potvrdil, že <b>nešlo o kybernetický útok</b>.</p>

<p>Příčinou byla změna ve <b>Web Application Firewallu (WAF)</b>. Inženýři Cloudflare nasadili opravu, která měla chránit před nově odhalenou zranitelností <b>React Server Components</b> (označovanou jako „React2Shell").</p>

<p>Tato zranitelnost postihuje široce používaný framework React – konkrétně jeho serverovou část. Cloudflare se snažil své zákazníky ochránit rychlou aktualisací pravidel firewallu.</p>

<p>Bohužel tato „oprava" způsobila pád části sítě Cloudflare, včetně jejich vlastního dashboardu.</p>

<h3 id="zjednodusene">Zjednodušeně řečeno</h3>

<p>Cloudflare chtěl své zákazníky ochránit před novou bezpečnostní dírou. Oprava však nebyla dostatečně otestovaná a místo ochrany způsobila výpadek.</p>

<p>Je to trochu jako když hasič při hašení požáru náhodou vytopí sousední byty – úmysl byl dobrý, ale provedení mělo mezery.</p>

<h2 id="reakce-cloudflare">Reakce Cloudflare</h2>

<p>Cloudflare se veřejně omluvil a uznal, že dva výpadky během tří týdnů jsou nepřijatelné:</p>

<blockquote>
<p>„Tyto druhy incidentů a to, jak blízko za sebou následují, nejsou přijatelné pro síť jako je ta naše. Jménem týmu Cloudflare se chceme omluvit za dopad a bolest, kterou to opět způsobilo našim zákazníkům a internetu jako celku."</p>
</blockquote>

<p>Společnost zveřejnila <a href="https://blog.cloudflare.com/5-december-2025-outage/">podrobnou post-mortem analýzu</a> na svém blogu.</p>

<h2 id="srovnani-s-listopadem">Srovnání s listopadovým výpadkem</h2>

<table>
  <thead>
    <tr>
      <th>Aspekt</th>
      <th>Listopad 2025</th>
      <th>Prosinec 2025</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Délka</td>
      <td>4 hodiny 10 minut</td>
      <td>25 minut</td>
    </tr>
    <tr>
      <td>Příčina</td>
      <td>Změna oprávnění v databasi</td>
      <td>Oprava zranitelnosti WAF</td>
    </tr>
    <tr>
      <td>Typ chyby</td>
      <td>Neočekávaný vedlejší efekt</td>
      <td>Nedostatečné testování</td>
    </tr>
  </tbody>
</table>

<p>Prosincový výpadek byl kratší, ale přišel příliš brzy po tom listopadovém. Pro uživatele a zákazníky to vyvolává otázky o spolehlivosti služby.</p>

<h2 id="co-se-muzeme-naucit">Co se z toho můžeme naučit</h2>

<h3 id="rychle-opravy">Rychlé opravy mohou být riskantní</h3>

<p>Když se objeví bezpečnostní zranitelnost, je přirozené chtít ji opravit co nejrychleji. Ale příliš rychlé nasazení bez důkladného testování může způsobit více škody než samotná zranitelnost.</p>

<p>V tomto případě by možná bylo lepší:</p>

<ul>
  <li>Postupné nasazení (rolling deployment) na část serverů</li>
  <li>Důkladnější testování v staging prostředí</li>
  <li>Monitorování prvních minut po nasazení</li>
</ul>

<h3 id="dva-vypadky">Dva výpadky za tři týdny</h3>

<p>Jeden výpadek se může stát každému. Dva výpadky během tří týdnů ale naznačují systémové problémy v procesech nasazování a testování.</p>

<p>Cloudflare bude muset přehodnotit své postupy, aby si udržel důvěru zákazníků.</p>

<h3 id="zavislost-na-jedne-sluzbe">Závislost na jedné službě</h3>

<p>Oba nedávné výpadky ukázaly, jak velká část internetu závisí na Cloudflare. Když vypadne, vypadne s ním významná část webů a služeb.</p>

<p>Pro kritické aplikace stojí za zvážení:</p>

<ul>
  <li>Multí-CDN strategie (využití více poskytovatelů)</li>
  <li>Fallback mechanismy pro případ výpadku</li>
  <li>Monitoring dostupnosti třetích stran</li>
</ul>

<h2 id="zaver">Závěr</h2>

<p>Prosincový výpadek Cloudflare ukázal, že i dobře míněná bezpečnostní oprava může způsobit problémy, pokud není řádně otestovaná.</p>

<p>Pro Cloudflare je to další rána do reputace – dva velké výpadky během tří týdnů nejsou dobrá vizitka pro službu, na které závisí značná část internetu.</p>

<p>Pozitivní je, že Cloudflare reaguje transparentně, veřejně se omlouvá a zveřejňuje detailní analýzy incidentů. To je lepší přístup než mlčení a zametání problémů pod koberec.</p>

<p>Pro uživatele a vývojáře je to připomínka: ani ty největší a nejspolehlivější služby nejsou imunní vůči výpadkům. Vždy je dobré mít plán B.</p>
