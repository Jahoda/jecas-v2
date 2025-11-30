---
title: "Co je egress a proč za něj platíte"
headline: "Egress: Odchozí datový provoz a jeho náklady"
description: "Kompletní průvodce pojmem egress. Zjistěte, co je egress traffic, jak funguje v cloudu, proč za něj platíte a jak optimalizovat náklady."
date: "2025-11-26"
last_modification: "2025-11-26"
status: 1
tags: ["zabezpeceni", "napady", "rychlost"]
format: "html"
---

<p><b>Egress</b> označuje <b>odchozí datový provoz</b> z nějaké sítě, systému nebo služby. Tento pojem se nejčastěji používá v kontextu cloud computingu, datacenter a síťové bezpečnosti.</p>

<p>V praxi to znamená <b>data, která opouštějí vaši infrastrukturu</b> – například když uživatelé stahují soubory z vašeho serveru, přistupují k API nebo prohlížejí obrázky na vašem webu.</p>

<h2 id="ingress-vs-egress">Ingress vs. Egress</h2>

<p>Pro pochopení egress je důležité znát i opačný pojem:</p>

<ul>
<li>
  <p><b>Ingress</b> – <b>příchozí data</b> vstupující do systému (upload, příchozí požadavky, data nahrávaná uživateli)</p>
</li>

<li>
  <p><b>Egress</b> – <b>odchozí data</b> opouštějící systém (download, odpovědi serveru, streamování videa)</p>
</li>
</ul>

<p>Příklad:</p>

<ul>
<li>Uživatel <b>nahraje fotku</b> na váš web – <code>ingress</code></li>
<li>Jiný uživatel si <b>stáhne tu samou fotku</b> – <code>egress</code></li>
</ul>

<h2 id="egress-cloud">Egress v cloudu</h2>

<p>V cloud computingu je egress jedním z <b>nejvýznamnějších nákladových faktorů</b>. Většina cloud poskytovatelů účtuje poplatky za odchozí data z jejich infrastruktury.</p>

<h3 id="proc-poplatky">Proč platíte za egress</h3>

<p>Cloud provideři mají následující nákladovou strukturu:</p>

<ul>
<li><b>Ingress je obvykle zdarma</b> – chtějí, abyste do cloudu nahrávali data</li>
<li><b>Egress je zpoplatněný</b> – každé GB dat, které opustí jejich síť, se účtuje</li>
<li><b>Přenos v rámci jejich sítě</b> může být levnější nebo zdarma (závisí na službě a zóně)</li>
</ul>

<p>Důvodem jsou především:</p>

<ul>
<li><b>Náklady na šířku pásma</b> – provideři platí ISP (Internet Service Provider) za připojení k internetu</li>
<li><b>Infrastruktura CDN</b> – distribuce obsahu do různých regionů</li>
<li><b>Obchodní strategie</b> – „vendor lock-in", aby bylo obtížnější přesunout data jinam</li>
</ul>

<h3 id="cenik-egress">Příklady cen egress</h3>

<p><b>AWS (Amazon Web Services):</b></p>

<ul>
<li>První 10 TB/měsíc: <b>$0.09 za GB</b> (region US/EU)</li>
<li>Další 40 TB/měsíc: <b>$0.085 za GB</b></li>
<li>Další 100 TB/měsíc: <b>$0.07 za GB</b></li>
<li>Nad 150 TB/měsíc: <b>$0.05 za GB</b></li>
</ul>

<p><b>Google Cloud:</b></p>

<ul>
<li>První 1 TB/měsíc: <b>zdarma</b> (Premium tier)</li>
<li>1-10 TB: <b>$0.12 za GB</b></li>
<li>10+ TB: klesající cena až na <b>$0.08 za GB</b></li>
</ul>

<p><b>Microsoft Azure:</b></p>

<ul>
<li>První 100 GB/měsíc: <b>zdarma</b></li>
<li>100 GB – 10 TB: <b>$0.087 za GB</b></li>
<li>10-50 TB: <b>$0.083 za GB</b></li>
</ul>

<p>Ceny se liší podle regionu a konkrétní služby. Uvedené ceny jsou orientační pro EU/US regiony.</p>

<h3 id="skryte-naklady">Skryté náklady egress</h3>

<p>Egress poplatky se můžou rychle vymknout kontrole:</p>

<ul>
<li><b>Streamování videa</b> – 1 hodina 1080p videa může mít 3-7 GB, což při tisících uživatelů znamená obrovské náklady</li>
<li><b>Velké soubory na stažení</b> – distribuce software, backupy</li>
<li><b>API s velkými odpověďmi</b> – vracení velkých JSON payloadů</li>
<li><b>Replikace dat mezi regiony</b> – synchronizace mezi datacentery</li>
</ul>

<p>Příklad:</p>

<blockquote>
<p>Pokud provozujete web, který <b>generuje 10 TB egress měsíčně</b> na AWS, zaplatíte přibližně <b>$900/měsíc</b> jen za přenos dat. To je <b>$10,800 ročně</b>.</p>
</blockquote>

<h2 id="egress-bezpecnost">Egress v bezpečnosti</h2>

<p>V kontextu bezpečnosti znamená egress <b>monitoring odchozího provozu</b> – klíčovou součást ochrany proti úniku dat a kybernetickým útokům.</p>

<h3 id="egress-firewall">Egress firewall</h3>

<p><b>Egress firewall</b> kontroluje a filtruje <b>odchozí síťový provoz</b>. Na rozdíl od klasických firewallů, které se zaměřují především na příchozí spojení, egress firewall monitoruje, kam a jaká data opouštějí vaši síť.</p>

<p>Použití:</p>

<ul>
<li><b>Prevence úniku dat</b> – blokování odchozích spojení na neautorizované servery</li>
<li><b>Ochrana před malwarem</b> – zabránění komunikaci s C&amp;C (command and control) servery</li>
<li><b>Compliance</b> – zajištění, že citlivá data neopouštějí síť bez autorizace</li>
</ul>

<h3 id="data-exfiltration">Data exfiltration</h3>

<p><b>Data exfiltration</b> je neoprávněný přenos dat z organizace ven. Útočníci používají různé techniky:</p>

<ul>
<li><b>DNS tunneling</b> – skrytí dat v DNS dotazech</li>
<li><b>HTTPS tunely</b> – šifrovaný přenos vypadá jako legitimní provoz</li>
<li><b>Cloudové služby</b> – upload na Dropbox, Google Drive apod.</li>
<li><b>E-mailové přílohy</b> – odesílání citlivých dat emailem</li>
</ul>

<p>Monitoring egress provozu pomáhá detekovat tyto útoky včas.</p>

<h3 id="zero-trust">Zero Trust a egress</h3>

<p>V <b>Zero Trust</b> architektuře se egress traffic striktně kontroluje:</p>

<ul>
<li>Každé odchozí spojení musí být <b>explicitně povoleno</b></li>
<li><b>Whitelist přístup</b> – pouze známé a důvěryhodné destinace</li>
<li><b>Průběžný monitoring</b> – analýza anomálií v odchozím provozu</li>
<li><b>Segmentace sítě</b> – různé úrovně přístupu pro různé části infrastruktury</li>
</ul>

<h2 id="optimalizace">Jak snížit náklady na egress</h2>

<h3 id="cdn">Použití CDN</h3>

<p><b>CDN</b> (<i lang="en">Content Delivery Network</i>) může výrazně snížit egress náklady:</p>

<ul>
<li><b>Cachování statického obsahu</b> – obrázky, CSS, JavaScript se doručují z edge serverů</li>
<li><b>Geografická blízkost</b> – uživatelé dostávají data z nejbližšího serveru</li>
<li><b>Levnější egress</b> – CDN často nabízejí nižší ceny než běžný cloud egress</li>
</ul>

<p>Populární CDN:</p>

<ul>
<li><a href="https://www.cloudflare.com/">Cloudflare</a> – často zdarma až neomezeně pro základní použití</li>
<li><a href="https://www.fastly.com/">Fastly</a></li>
<li><a href="https://aws.amazon.com/cloudfront/">AWS CloudFront</a></li>
<li><a href="https://bunny.net/">Bunny.net</a> – cenově výhodná alternativa</li>
</ul>

<h3 id="komprese">Komprese dat</h3>

<p>Efektivní komprese může snížit egress až o <b>70-90%</b>:</p>

<ul>
<li><b>Gzip/Brotli</b> – komprese textových souborů (HTML, CSS, JS)</li>
<li><b>WebP/AVIF</b> – moderní formáty obrázků s lepší kompresí než JPEG</li>
<li><b>Video optimalizace</b> – použití efektivních kodeků (H.265, AV1)</li>
<li><b>API response compression</b> – komprimování JSON/XML odpovědí</li>
</ul>

<h3 id="caching">Efektivní caching</h3>

<p>Snížení počtu požadavků na server:</p>

<ul>
<li><b>HTTP cache headers</b> – správné nastavení <code>Cache-Control</code>, <code>ETag</code></li>
<li><b>Browser caching</b> – dlouhodobé ukládání statických souborů</li>
<li><b>API caching</b> – cachování častých dotazů</li>
</ul>

<h3 id="architecture">Architektonická rozhodnutí</h3>

<ul>
<li><b>Regionální umístění</b> – hostujte data blízko uživatelů</li>
<li><b>Multi-cloud strategie</b> – využití více providerů pro redundanci a optimalizaci cen</li>
<li><b>Egress-free alternativy</b> – některé providery nabízejí služby bez egress poplatků (např. <a href="https://www.cloudflare.com/products/r2/">Cloudflare R2</a>)</li>
<li><b>Lazy loading</b> – načítání dat až když jsou skutečně potřeba</li>
</ul>

<h3 id="monitoring">Monitoring a alerting</h3>

<p>Sledujte egress traffic, abyste odhalili anomálie:</p>

<ul>
<li><b>Nastavte alerty</b> – upozornění při neočekávaném nárůstu</li>
<li><b>Analyzujte trendy</b> – identifikujte největší spotřebitele egress</li>
<li><b>Cost allocation tags</b> – přiřaďte náklady konkrétním projektům/týmům</li>
</ul>

<h2 id="egress-pricing-models">Různé modely účtování egress</h2>

<h3 id="traditional">Tradiční cloud (AWS, Azure, GCP)</h3>

<p>Platíte za <b>každé GB</b> odchozích dat s degresivní sazbou (čím více využíváte, tím nižší cena za GB).</p>

<h3 id="egress-free">Egress-free providery</h3>

<p>Někteří poskytovatelé nabízejí <b>nulové nebo velmi nízké</b> egress poplatky:</p>

<ul>
<li><b>Cloudflare R2</b> – object storage bez egress poplatků</li>
<li><b>Backblaze B2</b> – první 3x uložených dat zdarma egress měsíčně</li>
<li><b>Hetzner</b> – velkorysé egress limity zahrnuté v ceně</li>
</ul>

<h3 id="bandwidth-pools">Bandwidth Pools</h3>

<p>Některé služby nabízejí <b>pooled bandwidth</b> – sdílený limit pro všechny vaše resources:</p>

<ul>
<li>Například <b>DigitalOcean</b> – každý droplet má zahrnuté egress, které se sdílí mezi všemi droplets</li>
</ul>

<h2 id="priklady">Praktické příklady</h2>

<h3 id="priklad-video">Streamování videa</h3>

<p>Představte si, že provozujete platformu s video obsahem:</p>

<ul>
<li><b>1 hodina 1080p videa</b> = přibližně <b>5 GB</b></li>
<li><b>10,000 zhlédnutí měsíčně</b> = <b>50 TB egress</b></li>
<li>Náklady na AWS: <b>50 TB × $0.085</b> = <b>$4,250/měsíc</b></li>
</ul>

<p>Řešení:</p>

<ul>
<li>Použít <b>CDN</b> s lepšími cenami</li>
<li><b>Adaptivní streaming</b> – doručovat nižší kvalitu na pomalém připojení</li>
<li><b>Video komprese</b> – efektivnější kodeky</li>
</ul>

<h3 id="priklad-api">API s velkými daty</h3>

<p>REST API vracející velké JSON odpovědi:</p>

<ul>
<li><b>Průměrná response</b>: 500 KB</li>
<li><b>10 milionů requestů/měsíc</b> = <b>5 TB egress</b></li>
<li>Náklady: <b>$450/měsíc</b> (AWS)</li>
</ul>

<p>Optimalizace:</p>

<ul>
<li><b>GraphQL</b> – klienti dostanou pouze požadovaná pole</li>
<li><b>Pagination</b> – menší odpovědi, více requestů (ingress je zdarma)</li>
<li><b>Gzip compression</b> – může snížit velikost o 70-80%</li>
<li><b>Response caching</b> – méně požadavků na server</li>
</ul>

<h3 id="priklad-backup">Zálohy a disaster recovery</h3>

<p>Každodenní stahování záloh z cloudu:</p>

<ul>
<li><b>Denní backup</b>: 100 GB</li>
<li><b>30 dní</b> = <b>3 TB egress</b></li>
<li>Náklady: <b>$270/měsíc</b></li>
</ul>

<p>Řešení:</p>

<ul>
<li><b>Incremental backups</b> – stahovat pouze změny</li>
<li><b>Cross-region replication</b> v rámci cloudu (levnější než egress)</li>
<li><b>Hybrid cloud</b> – kombinace on-premise a cloud storage</li>
</ul>

<h2 id="zaver">Závěr</h2>

<ul>
<li>
  <p><b>Egress</b> je odchozí datový provoz z vaší infrastruktury – na rozdíl od ingress (příchozí data)</p>
</li>

<li>
  <p>V cloud computingu je egress <b>zpoplatněn</b> a může tvořit značnou část nákladů, zejména u služeb s vysokým objemem dat (video, velké soubory, API)</p>
</li>

<li>
  <p>Ceny se pohybují od <b>$0.05 do $0.12 za GB</b> podle providera a objemu, přičemž některé služby nabízejí prvních 100 GB až 1 TB zdarma</p>
</li>

<li>
  <p>V bezpečnosti je egress monitoring klíčový pro <b>prevenci úniků dat</b> a detekci malwaru komunikujícího s externími servery</p>
</li>

<li>
  <p>Náklady na egress lze snížit použitím <b>CDN</b>, <b>kompresí dat</b>, <b>efektivním cachingem</b> a volbou providerů s levnějším nebo nulovým egress</p>
</li>

<li>
  <p>Některé moderní služby jako <b>Cloudflare R2</b> nebo <b>Backblaze B2</b> nabízejí nulové nebo výrazně nižší egress poplatky</p>
</li>

<li>
  <p>Vždy <b>monitorujte egress traffic</b> – neočekávaný nárůst může signalizovat bezpečnostní incident nebo neefektivní implementaci</p>
</li>
</ul>

<p>Pochopení egress a jeho dopadu na náklady i bezpečnost je <b>zásadní pro každého, kdo provozuje služby v cloudu</b>. S rostoucím objemem dat a stále přísnějšími bezpečnostními požadavky se správa egress stává stále důležitější součástí infrastruktury.</p>

<h2 id="odkazy-jinam">Odkazy jinam</h2>

<ul>
  <li><a href="https://aws.amazon.com/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/">AWS: Overview of Data Transfer Costs</a> – oficiální přehled nákladů na přenos dat v AWS</li>
  <li><a href="https://cloud.google.com/vpc/network-pricing">Google Cloud Network Pricing</a> – ceník síťových služeb Google Cloud včetně egress</li>
  <li><a href="https://www.cloudflare.com/products/r2/">Cloudflare R2</a> – object storage bez egress poplatků</li>
</ul>
