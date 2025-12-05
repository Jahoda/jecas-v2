---
title: "Co je egress a proč za něj platíte"
headline: "Egress: Odchozí datový provoz a jeho náklady"
description: "Co je to egress traffic, jak funguje v cloudu, proč za něj (ne)platíte a jak optimalizovat náklady."
date: "2025-12-05"
last_modification: "2025-12-05"
status: 1
tags: ["zabezpeceni", "napady", "rychlost"]
format: "html"
---

<p><b>Egress</b> označuje <b>odchozí datový provoz</b> z nějaké sítě, systému nebo služby. Tento pojem se nejčastěji používá v kontextu cloudů a datacenter. Do češtiny by se dalo přeložit asi jako <i>odtok</i>.</p>

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

<p>U <i>klasických</i> hostingů tomu většinou bývá jinak a platí se za dostupný prostor na disku. Posupem času se ale disky tak zlevnily, že nějaké běžné objemy dat nestojí prakticky nic, tak se to účtuje jinak.</p>

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

<p>Ceny se pohybují kolem <b>0,1 $</b> za GB dat. Často je třeba prvních 100 GB / 1 TB úplně zdarma.</p>

<p>S vyššími objemy se ceny snižují.</p>

<p>Ceny se liší podle regionu a konkrétní služby.</p>

<h3 id="skryte-naklady">Skryté náklady egress</h3>

<p>U běžných webů to neí problém, ale v určitých případech se egress poplatky můžou rychle vymknout kontrole:</p>

<ul>
<li><b>Streamování videa</b> – 1 hodina 1080p videa může mít 3-7 GB, což při tisících uživatelů znamená značné náklady</li>
<li><b>Velké soubory na stažení</b> – distribuce software, backupy</li>
<li><b>API s velkými odpověďmi</b> – vracení velkých <a href="/json">JSON</a> payloadů</li>
<li><b>Replikace dat mezi regiony</b> – synchronizace mezi datacentery</li>
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
<li><a href="https://www.cloudflare.com/">Cloudflare</a> – neomezený bandwidth zdarma (data musí být uložená jinde na origin serveru)</li>
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

<h2 id="egress-pricing-models">Různé modely účtování egress</h2>

<h3 id="traditional">Tradiční cloud (AWS, Azure, GCP)</h3>

<p>Platíte za <b>každé GB</b> odchozích dat s degresivní sazbou (čím více využíváte, tím nižší cena za GB).</p>

<h3 id="egress-free">Egress-free providery</h3>

<p>Někteří poskytovatelé nabízejí <b>nulové nebo velmi nízké</b> egress poplatky:</p>

<ul>
<li><b>Cloudflare R2</b> – object storage bez egress poplatků (platíte jen ~$0.015/GB/měsíc za storage a operace)</li>
<li><b>Backblaze B2</b> – první 3x uložených dat zdarma egress měsíčně</li>
<li><b>Hetzner</b> – velkorysé egress limity zahrnuté v ceně</li>
</ul>


<h2 id="priklady">Praktické příklady</h2>

<div class="overflow-x-auto">
<table>
  <thead>
    <tr>
      <th>Scénář</th>
      <th>Objem dat</th>
      <th>Egress / měsíc</th>
      <th>Náklady (AWS)</th>
      <th>Řešení</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Streamování videa</b></td>
      <td>1 hodina 1080p videa = 5 GB<br>10 000 zhlédnutí</td>
      <td>50 TB</td>
      <td>$4 250</td>
      <td>CDN, adaptivní streaming, video komprese</td>
    </tr>
    <tr>
      <td><b>API s velkými daty</b></td>
      <td>Průměrná response: 500 KB<br>10 mil. requestů</td>
      <td>5 TB</td>
      <td>$450</td>
      <td>GraphQL, paginace, Gzip komprese, caching</td>
    </tr>
    <tr>
      <td><b>Zálohy a recovery</b></td>
      <td>Denní backup: 100 GB<br>30 dní</td>
      <td>3 TB</td>
      <td>$270</td>
      <td>Inkrementální zálohy, replikace mezi regiony, hybrid cloud</td>
    </tr>
  </tbody>
</table>
</div>

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
