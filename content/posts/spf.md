---
title: "SPF (Sender Policy Framework) – ochrana e-mailů před spoofingem"
headline: "Co je SPF a jak chrání e-maily"
description: "SPF je mechanismus, který pomáhá zabránit podvrhování odesílatele e-mailů a zvyšuje důvěryhodnost vaší domény."
date: "2025-11-21"
last_modification: "2025-11-21"
status: 1
tags: ["zabezpeceni", "napady"]
format: "html"
---

<p><b>SPF</b> (<i lang="en">Sender Policy Framework</i>) je mechanismus, který pomáhá <b>chránit e-mailovou komunikaci před podvrhováním odesílatele</b> (tzv. <i lang="en">spoofing</i>).</p>

<p>Jedná se o <b>DNS záznam</b>, který určuje, které servery jsou <b>oprávněné odesílat e-maily</b> jménem vaší domény.</p>

<h2 id="problem">Problém podvrhování e-mailů</h2>

<p>Bez SPF může kdokoliv odeslat e-mail, který vypadá, že pochází z vaší domény. Útočník může například odeslat phishingový e-mail s adresou odesílatele <code>admin@vase-domena.cz</code>, i když s vaší doménou nemá nic společného.</p>

<p>To může poškodit:</p>
<ul>
  <li><b>Důvěryhodnost vaší domény</b> – příjemci můžou vaši doménu spojit s podvody</li>
  <li><b>Doručitelnost legitimních e-mailů</b> – e-mailové servery můžou začít vaše e-maily blokovat</li>
  <li><b>Reputaci vaší značky</b> – zákazníci můžou přijít o důvěru</li>
</ul>

<h2 id="jak-funguje">Jak SPF funguje</h2>

<p>Když e-mailový server přijme zprávu, provede následující kontrolu:</p>

<ol>
  <li>Zjistí <b>doménu odesílatele</b> z e-mailové adresy (část za <code>@</code>)</li>
  <li>Vyhledá <b>SPF záznam v DNS</b> dané domény</li>
  <li>Porovná <b>IP adresu skutečného odesílacího serveru</b> se seznamem povolených IP adres v SPF záznamu</li>
  <li>Na základě výsledku rozhodne, zda e-mail <b>přijmout, odmítnout nebo označit jako podezřelý</b></li>
</ol>

<h3 id="envelope-from">Co SPF skutečně ověřuje</h3>

<p>Důležité upozornění: SPF ověřuje <b>„envelope from"</b> (technicky MAIL FROM nebo Return-Path), nikoli hlavičku <code>From:</code>, kterou vidí uživatel v e-mailovém klientovi.</p>

<p>To znamená, že útočník může stále podvrhnout <b>viditelnou adresu odesílatele</b>, i když SPF kontrola projde. Proto je SPF <b>nutné kombinovat s DKIM a DMARC</b>, které zajišťují kompletnější ochranu včetně ověření hlavičky <code>From:</code>.</p>

<h2 id="vytvoreni">Vytvoření SPF záznamu</h2>

<p>SPF záznam se přidává jako <b>TXT záznam v DNS</b> vaší domény. Základní formát vypadá takto:</p>

<pre><code>v=spf1 [mechanismy] [modifikátor]</code></pre>

<h3 id="zakladni-priklad">Základní příklad</h3>

<p>Pokud posíláte e-maily pouze z vašeho hostingového serveru s IP adresou <code>192.0.2.1</code>:</p>

<pre><code>v=spf1 ip4:192.0.2.1 -all</code></pre>

<p>Tento záznam říká:</p>
<ul>
  <li><code>v=spf1</code> – používáme SPF verze 1</li>
  <li><code>ip4:192.0.2.1</code> – povolit odesílání z IPv4 adresy 192.0.2.1</li>
  <li><code>-all</code> – <b>odmítnout</b> všechny ostatní odesílatele</li>
</ul>

<h3 id="mechanismy">Důležité mechanismy</h3>

<p><code>ip4:&lt;IP&gt;</code> – povolit konkrétní IPv4 adresu nebo rozsah</p>
<pre><code>v=spf1 ip4:192.0.2.0/24 -all</code></pre>

<p><code>ip6:&lt;IP&gt;</code> – povolit konkrétní IPv6 adresu</p>
<pre><code>v=spf1 ip6:2001:db8::1 -all</code></pre>

<p><code>a</code> – povolit servery z A záznamu domény</p>
<pre><code>v=spf1 a -all</code></pre>

<p><code>mx</code> – povolit servery z MX záznamů domény</p>
<pre><code>v=spf1 mx -all</code></pre>

<p><code>include:</code> – zahrnout SPF pravidla jiné domény (užitečné pro služby jako Google Workspace, Mailchimp apod.)</p>
<pre><code>v=spf1 include:_spf.google.com -all</code></pre>

<h3 id="modifikatory">Modifikátory výsledku</h3>

<p>Na konci SPF záznamu se uvádí, co dělat s e-maily, které neodpovídají pravidlům:</p>

<ul>
  <li><code>-all</code> – <b>hard fail</b> – odmítnout (doporučeno)</li>
  <li><code>~all</code> – <b>soft fail</b> – označit jako podezřelé, ale doručit</li>
  <li><code>?all</code> – <b>neutral</b> – žádné tvrzení (používá se zřídka)</li>
  <li><code>+all</code> – <b>pass</b> – povolit vše (NIKDY nepoužívat! Zruší veškerou ochranu)</li>
</ul>

<h2 id="priklady">Příklady reálných SPF záznamů</h2>

<h3>Použití Google Workspace</h3>
<pre><code>v=spf1 include:_spf.google.com ~all</code></pre>

<h3>Vlastní server + Google Workspace</h3>
<pre><code>v=spf1 ip4:192.0.2.1 include:_spf.google.com -all</code></pre>

<h3>Více e-mailových služeb</h3>
<pre><code>v=spf1 include:_spf.google.com include:spf.protection.outlook.com include:servers.mcsv.net -all</code></pre>

<p>Tento příklad povoluje odesílání přes <b>Google Workspace</b>, <b>Microsoft 365</b> a <b>Mailchimp</b>.</p>

<h2 id="nastaveni">Jak nastavit SPF</h2>

<ol>
  <li>Přihlaste se do administrace vašeho <b>DNS poskytovatele</b> (často stejný jako registrátor domény)</li>
  <li>Najděte sekci pro správu <b>DNS záznamů</b></li>
  <li>Přidejte nový <b>TXT záznam</b>:
    <ul>
      <li><b>Název/Host:</b> <code>@</code> nebo <code>vase-domena.cz</code></li>
      <li><b>Typ:</b> <code>TXT</code></li>
      <li><b>Hodnota:</b> váš SPF záznam, např. <code>v=spf1 include:_spf.google.com -all</code></li>
      <li><b>TTL:</b> 3600 (nebo výchozí hodnota)</li>
    </ul>
  </li>
  <li>Uložte změny</li>
  <li>Počkejte na <b>propagaci DNS</b> (může trvat až 48 hodin, obvykle do 1 hodiny)</li>
</ol>

<h2 id="testovani">Testování SPF</h2>

<p>Po nastavení SPF záznamu je důležité ověřit, že funguje správně.</p>

<h3>Kontrola DNS záznamu</h3>

<p>Pomocí příkazu v terminálu:</p>
<pre><code>nslookup -type=TXT vase-domena.cz</code></pre>

<p>Nebo na Linuxu/macOS:</p>
<pre><code>dig TXT vase-domena.cz</code></pre>

<h3>Online nástroje</h3>

<p>Existuje řada online nástrojů pro testování SPF:</p>

<ul>
  <li><a href="https://mxtoolbox.com/spf.aspx">MXToolbox SPF Check</a></li>
  <li><a href="https://www.kitterman.com/spf/validate.html">Kitterman SPF Validator</a></li>
  <li><a href="https://dmarcian.com/spf-survey/">DMARCIAN SPF Surveyor</a></li>
</ul>

<h3>Test odesláním e-mailu</h3>

<p>Odešlete testovací e-mail a zkontrolujte <b>hlavičky zprávy</b> (raw headers). Měli byste vidět:</p>

<pre><code>Received-SPF: pass</code></pre>

<h2 id="chyby">Časté chyby a problémy</h2>

<h3>Příliš mnoho DNS dotazů</h3>

<p>SPF má limit <b>maximálně 10 mechanismů vyžadujících DNS lookup</b> během vyhodnocování jediného SPF záznamu. Tento limit zahrnuje:</p>

<ul>
  <li><code>include:</code> – započítává se včetně všech vnořených dotazů v odkazovaném SPF záznamu</li>
  <li><code>a</code> – dotaz na A/AAAA záznamy</li>
  <li><code>mx</code> – dotaz na MX záznamy (každý MX může vyžadovat další A dotaz)</li>
  <li><code>redirect=</code> – přesměrování na jiný SPF záznam</li>
  <li><code>exists:</code> – kontrola existence domény</li>
  <li><code>ptr:</code> – reverzní DNS lookup (nedoporučuje se)</li>
</ul>

<p><b>Důležité:</b> Mechanismy <code>ip4:</code>, <code>ip6:</code> a <code>all</code> <b>nevyžadují DNS dotazy</b>, takže se do limitu nepočítají.</p>

<p>Při překročení limitu 10 dotazů se celé SPF vyhodnocení <b>okamžitě ukončí</b> s výsledkem <code>PermError</code> a záznam se považuje za <b>neplatný</b>. To může vést k odmítnutí legitimních e-mailů.</p>

<p><b>Řešení:</b></p>
<ul>
  <li>Používejte raději <code>ip4:</code> a <code>ip6:</code> místo <code>include:</code>, kde je to možné</li>
  <li>Před nasazením otestujte SPF záznam pomocí online nástrojů, které počítají DNS dotazy</li>
  <li>Sledujte, kolik DNS dotazů vyžadují vaše <code>include:</code> – např. <code>include:_spf.google.com</code> může sám obsahovat další vnořené include</li>
</ul>

<h3>Více SPF záznamů</h3>

<p>Doména by měla mít <b>pouze jeden TXT záznam s SPF</b> začínající <code>v=spf1</code>. Pokud má více takových záznamů, <b>standardní SPF validátory to považují za chybu</b> a SPF kontrola selže.</p>

<p>Technicky DNS umožňuje mít více TXT záznamů, ale je to <b>správná praxe a doporučení standardu SPF</b>, aby byl pouze jeden explicitní <code>v=spf1</code> záznam pro každou doménu.</p>

<p><b>Řešení:</b> Spojte všechny mechanismy do jednoho záznamu.</p>

<h3>Zapomenutí na subdmény</h3>

<p>SPF se <b>nedědí</b> na subdomény. Pokud odesíláte e-maily z <code>newsletter@podpora.vase-domena.cz</code>, potřebujete SPF záznam i pro subdoménu <code>podpora</code>.</p>

<h3>Použití +all</h3>

<p>Nikdy nepoužívejte <code>+all</code> – tím SPF <b>zcela deaktivujete</b> a povolíte komukoliv odesílat jménem vaší domény.</p>

<h3>Problémy s přeposíláním e-mailů (forwarding)</h3>

<p>SPF může způsobit problémy při <b>automatickém přeposílání e-mailů</b> (email forwarding). Pokud uživatel nastaví přeposílání z <code>uzivatel@domena-a.cz</code> na <code>uzivatel@domena-b.cz</code>, nastane následující situace:</p>

<ol>
  <li>Původní odesílatel pošle e-mail z <code>odesilatel@puvodni.cz</code></li>
  <li>E-mail dorazí na <code>domena-a.cz</code> a SPF kontrola projde</li>
  <li><code>domena-a.cz</code> e-mail přepošle na <code>domena-b.cz</code></li>
  <li><code>domena-b.cz</code> provede SPF kontrolu a <b>zjistí, že e-mail přišel z IP adresy domena-a.cz</b>, nikoli z původní <code>puvodni.cz</code></li>
  <li>SPF kontrola <b>selže</b>, protože IP adresa <code>domena-a.cz</code> není v SPF záznamu domény <code>puvodni.cz</code></li>
</ol>

<p><b>Řešení:</b></p>
<ul>
  <li>Přeposílací server může použít <b>SRS</b> (<i lang="en">Sender Rewriting Scheme</i>), který přepíše envelope from na vlastní doménu</li>
  <li>Použít <code>~all</code> (soft fail) místo <code>-all</code> (hard fail), aby byly přeposílané e-maily pouze označeny, ne odmítnuty</li>
  <li>Moderní řešení: správně nakonfigurovaný <b>DMARC</b>, který toto zohledňuje</li>
</ul>

<h2 id="dmarc-dkim">SPF, DKIM a DMARC</h2>

<p>SPF je pouze <b>část komplexní e-mailové bezpečnosti</b>. Pro maximální ochranu byste měli používat všechny tři mechanismy:</p>

<ul>
  <li><b>SPF</b> – ověřuje, že e-mail pochází z povoleného serveru</li>
  <li><b>DKIM</b> (<i lang="en">DomainKeys Identified Mail</i>) – digitálně podepisuje e-maily kryptografickým klíčem</li>
  <li><b>DMARC</b> (<i lang="en">Domain-based Message Authentication, Reporting &amp; Conformance</i>) – definuje politiku pro e-maily, které neprojdou SPF nebo DKIM kontrolou</li>
</ul>

<p>Kombinace těchto tří mechanismů poskytuje <b>nejlepší ochranu</b> proti podvrhování e-mailů.</p>

<h2 id="zaver">Závěr</h2>

<ul>
  <li>
    <p><b>SPF je DNS záznam</b>, který definuje, které servery můžou odesílat e-maily jménem vaší domény.</p>
  </li>
  <li>
    <p>Chrání před <b>podvrhováním odesílatele</b> (e-mail spoofingem) a zvyšuje doručitelnost vašich e-mailů.</p>
  </li>
  <li>
    <p>Nastavení SPF je <b>poměrně jednoduché</b> – přidá se jako TXT záznam do DNS.</p>
  </li>
  <li>
    <p>Pro maximální bezpečnost používejte SPF <b>společně s DKIM a DMARC</b>.</p>
  </li>
  <li>
    <p>Vždy <b>testujte SPF záznam</b> po nastavení a ujistěte se, že nepřekračujete limit 10 DNS dotazů.</p>
  </li>
</ul>

<p>Správně nastavený SPF záznam je dnes <b>standard</b> pro každou seriózní doménu odesílající e-maily a významně přispívá k bezpečnosti a důvěryhodnosti vaší e-mailové komunikace.</p>
