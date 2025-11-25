---
title: "SPF (Sender Policy Framework) – ochrana e-mailů před spoofingem"
headline: "Co je SPF a jak chrání e-maily"
description: "Kompletní průvodce e-mailovou autentisací: SPF, DKIM, DMARC a BIMI. Naučte se chránit svou doménu před spoofingem a zlepšit doručitelnost e-mailů."
date: "2025-11-25"
last_modification: "2025-11-25"
status: 1
tags: ["zabezpeceni", "napady"]
format: "html"
---

<p><b>SPF</b> (<i lang="en">Sender Policy Framework</i>) je mechanismus, který pomáhá <b>chránit e-mailovou komunikaci před podvrhováním odesílatele</b> (tzv. <i lang="en">spoofing</i>).</p>

<p>Jedná se o <b>DNS záznam</b>, který určuje, které servery jsou <b>oprávněné odesílat e-maily</b> jménem vaší domény.</p>

<h2 id="problem">Problém podvrhování e-mailů</h2>

<p>Každý den se po celém světě odešlou <b>stovky miliard e-mailů</b>. V tomto obrovském množství zpráv je pro e-mailové servery kriticky důležité rozlišit legitimní e-maily od spamu a phishingových útoků.</p>

<p>Bez SPF může kdokoliv odeslat e-mail, který vypadá, že pochází z vaší domény. Útočník může například odeslat phishingový e-mail s adresou odesílatele <code>admin@vase-domena.cz</code>, i když s vaší doménou nemá nic společného.</p>

<p>To může poškodit:</p>
<ul>
  <li><b>Důvěryhodnost vaší domény</b> – příjemci můžou vaši doménu spojit s podvody</li>
  <li><b>Doručitelnost legitimních e-mailů</b> – e-mailové servery můžou začít vaše e-maily blokovat</li>
  <li><b>Reputaci vaší značky</b> – zákazníci můžou přijít o důvěru</li>
</ul>

<h2 id="jak-funguje">Jak SPF funguje</h2>

<p>SPF slouží jako <b>první rychlá kontrola příchozích e-mailů</b>, zda vůbec stojí za to e-mail dále zpracovávat. SPF odfiltruje e-maily ze serverů, které nemají povolení odesílat jménem dané domény.</p>

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
  <li><code>v=spf1</code> – používáme SPF verse 1</li>
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
  <li><code>+all</code> – <b>pass</b> – povolit vše (zruší veškerou ochranu)</li>
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
  <li><code>ptr:</code> – reverzní DNS lookup</li>
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

<h3 id="spf-role">SPF – První kontrola</h3>

<p><b>SPF</b> ověřuje, že e-mail pochází z povoleného serveru. Je to <b>první kontrola</b>, která rychle odfiltruje neoprávněné odesílatele.</p>

<h3 id="dkim-role">DKIM – Digitální podpis</h3>

<p><a href="https://dkim.org"><b>DKIM</b></a> (<i lang="en">DomainKeys Identified Mail</i>) zajišťuje <b>kryptografické ověření legitimity</b> e-mailu pomocí digitálního podpisu.</p>

<p>DKIM funguje na principu <b>páru veřejného a soukromého klíče</b>:</p>

<ol>
  <li><b>Veřejný klíč</b> uložíte do DNS jako TXT nebo CNAME záznam</li>
  <li><b>Soukromý klíč</b> je uložen na vašem e-mailovém serveru</li>
  <li>Každý odeslaný e-mail je podepsán soukromým klíčem – vytvoří se <b>DKIM podpis</b> v hlavičce e-mailu</li>
  <li>Příjemce porovná podpis s veřejným klíčem z DNS a ověří, že e-mail skutečně pochází od vás</li>
</ol>

<p>DKIM poskytuje ochranu, kterou SPF nemůže – ověřuje, že <b>obsah e-mailu nebyl po cestě změněn</b> a potvrzuje identitu skutečného odesílatele.</p>

<p>Je běžné mít <b>více DKIM záznamů</b>, typicky jeden pro každého poskytovatele e-mailových služeb, kterého používáte (Google Workspace, SendGrid, Mailchimp apod.).</p>

<h3 id="dmarc-role">DMARC – Politika a reporting</h3>

<p><a href="https://dmarc.org"><b>DMARC</b></a> (<i lang="en">Domain-based Message Authentication, Reporting &amp; Conformance</i>) definuje, <b>co se má stát s e-maily, které neprošly SPF nebo DKIM kontrolou</b>.</p>

<p>DMARC záznam je TXT záznam s následující strukturou:</p>

<pre><code>v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc@vase-domena.cz</code></pre>

<p>Vysvětlení parametrů:</p>

<ul>
  <li><code>v=DMARC1</code> – verse DMARC protokolu</li>
  <li><code>p=</code> – <b>politika</b>, co dělat s e-maily, které selžou:
    <ul>
      <li><code>none</code> – <b>pouze sledovat</b>, ale nedělat nic (vhodné pro testování)</li>
      <li><code>quarantine</code> – <b>přesunout do spamu/karantény</b> (doporučeno)</li>
      <li><code>reject</code> – <b>odmítnout doručení</b> (nejpřísnější)</li>
    </ul>
  </li>
  <li><code>pct=100</code> – procento e-mailů, na které se má politika vztahovat (100 = všechny)</li>
  <li><code>rua=mailto:...</code> – e-mailová adresa pro <b>agregované reporty</b> o DMARC kontrolách</li>
</ul>

<h4>Příklady DMARC záznamů</h4>

<p><b>Pro testování</b> (pouze monitoring bez dopadu):</p>
<pre><code>v=DMARC1; p=none; rua=mailto:dmarc-reports@vase-domena.cz</code></pre>

<p><b>Produkční nastavení</b> (karanténa podezřelých):</p>
<pre><code>v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-reports@vase-domena.cz</code></pre>

<p><b>Maximální ochrana</b> (odmítnutí nelegitimních e-mailů):</p>
<pre><code>v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-reports@vase-domena.cz; ruf=mailto:dmarc-forensic@vase-domena.cz</code></pre>

<h3 id="reputace-domeny">Vliv na reputaci domény</h3>

<p>Správná implementace DMARC s politikou <code>quarantine</code> nebo <code>reject</code> <b>výrazně zlepšuje reputaci vaší domény</b> u poskytovatelů e-mailových služeb (Gmail, Outlook, atd.).</p>

<p>Poskytovatelé vidí, že:</p>
<ul>
  <li>Aktivně bojujete proti zneužití vaší domény</li>
  <li>Máte kontrolu nad tím, kdo vaším jménem posílá e-maily</li>
  <li>Zaručujete, že podezřelé zprávy nebudou doručeny vašim jménem</li>
</ul>

<p>To vede k <b>lepší doručitelnosti legitimních e-mailů</b> do hlavní složky příjemců.</p>

<h3 id="doporuceny-postup">Doporučený postup implementace</h3>

<ol>
  <li><b>Začněte s SPF</b> – nastavte základní SPF záznam</li>
  <li><b>Přidejte DKIM</b> – implementujte digitální podpisy</li>
  <li><b>DMARC v režimu monitoringu</b> – nastavte <code>p=none</code> a sledujte reporty</li>
  <li><b>Analyzujte reporty</b> – zjistěte, které servery odesílají vaším jménem</li>
  <li><b>Zvyšte úroveň ochrany</b> – postupně přejděte na <code>p=quarantine</code> a nakonec <code>p=reject</code></li>
</ol>

<p>Kombinace SPF + DKIM + DMARC poskytuje <b>nejlepší dostupnou ochranu</b> proti podvrhování e-mailů.</p>

<h2 id="bimi">BIMI – Visuální identita v inboxu</h2>

<p><a href="https://bimigroup.org"><b>BIMI</b></a> (<i lang="en">Brand Indicators for Message Identification</i>) je nadstavba nad SPF, DKIM a DMARC, která umožňuje <b>zobrazit logo vaší značky přímo v inboxu</b> příjemce.</p>

<p>BIMI výjimečný způsob, jak <b>vyniknout a zvýšit důvěryhodnost</b> vašich zpráv. Některé e-mailové klienty dokonce zobrazují u BIMI ověřených odesílatelů <b>zaškrtnutí</b>, podobně jako u sociálních sítí (třeba Gmail).</p>

<h3 id="bimi-pozadavky">Požadavky pro BIMI</h3>

<p>Získání BIMI je náročný proces, který zajišťuje, že ho získají pouze skutečně legitimní značky:</p>

<ol>
  <li><b>Funkční DMARC na úrovni quarantine nebo reject</b> – politika musí být nastavena na 100% e-mailů (<code>pct=100</code>)</li>
  <li><b>Registrovaná ochranná známka (trademark)</b> – logo musí být oficiálně chráněno</li>
  <li><b>VMC certifikát</b> (<i lang="en">Verified Mark Certificate</i>) – ověřuje vaši identitu, vlastnictví domény a ochranné známky</li>
  <li><b>Logo ve formátu SVG</b> – s přísnými požadavky na formát (Tiny SVG)</li>
</ol>

<h3 id="bimi-struktura">Struktura BIMI záznamu</h3>

<p>BIMI se nastavuje jako TXT záznam v DNS:</p>

<pre><code>v=BIMI1; l=https://vase-domena.cz/logo.svg; a=https://vmc.digicert.com/vase-certifikat.pem;</code></pre>

<p>Parametry:</p>

<ul>
  <li><code>v=BIMI1</code> – verse BIMI protokolu</li>
  <li><code>l=</code> – URL adresa SVG loga (musí být veřejně dostupné přes HTTPS)</li>
  <li><code>a=</code> – URL adresa VMC certifikátu (musí být veřejně dostupné přes HTTPS)</li>
</ul>

<h3 id="bimi-vyhody">Výhody BIMI</h3>

<ul>
  <li><b>Visuální rozpoznatelnost</b> – vaše logo se zobrazí u každého e-mailu v inboxu</li>
  <li><b>Zvýšená důvěra</b> – příjemci okamžitě poznají, že e-mail je legitimní</li>
  <li><b>Ochrana značky</b> – ztěžuje útočníkům vydávání se za vaši firmu</li>
  <li><b>Lepší open rate</b> – uživatelé častěji otevírají e-maily s poznanou značkou</li>
  <li><b>Profesionální image</b> – signalisuje, že berete bezpečnost vážně</li>
</ul>

<h3 id="bimi-podpora">Podpora e-mailových klientů</h3>

<p>BIMI podporují zejména:</p>
<ul>
  <li><b>Gmail</b> (webová verse i mobilní aplikace)</li>
  <li><b>Yahoo Mail</b></li>
  <li><b>Apple Mail</b> (od iOS 16)</li>
  <li>Další poskytovatelé postupně přidávají podporu</li>
</ul>

<p><b>Poznámka:</b> Implementace BIMI není nutná pro základní e-mailovou bezpečnost, ale je to výborný způsob, jak pozvednout důvěryhodnost vaší značky u příjemců.</p>

<h2 id="zaver">Závěr</h2>

<ul>
  <li>
    <p><b>SPF je DNS záznam</b>, který definuje, které servery můžou odesílat e-maily jménem vaší domény. Slouží jako  první kontrola příchozích zpráv.</p>
  </li>
  <li>
    <p>SPF ověřuje <b>envelope from</b> (Return-Path), ne viditelnou hlavičku From:, což je důvod pro kombinaci s dalšími mechanismy.</p>
  </li>
  <li>
    <p>Pro skutečnou ochranu je <b>nezbytná trojice SPF + DKIM + DMARC</b>:
      <ul>
        <li><b>SPF</b> – kontroluje IP adresu odesílacího serveru</li>
        <li><b>DKIM</b> – kryptograficky podepisuje e-maily</li>
        <li><b>DMARC</b> – definuje politiku pro neověřené zprávy a poskytuje reporting</li>
      </ul>
    </p>
  </li>
  <li>
    <p>Správně implementovaný DMARC s politikou <code>quarantine</code> nebo <code>reject</code> <b>výrazně zlepšuje reputaci domény</b> a doručitelnost e-mailů.</p>
  </li>
  <li>
    <p><b>BIMI</b> je bonusová úroveň, která zobrazuje vaše logo v inboxu, ale vyžaduje splnění přísných podmínek včetně ochranné známky.</p>
  </li>
  <li>
    <p>Vždy <b>testujte SPF záznam</b> po nastavení a ujistěte se, že nepřekračujete limit 10 DNS dotazů.</p>
  </li>
  <li>
    <p>Doporučený postup: začněte SPF, přidejte DKIM, implementujte DMARC v režimu monitoringu (<code>p=none</code>) a postupně zvyšujte úroveň ochrany.</p>
  </li>
</ul>

<p>V prostředí <b>stovek miliard e-mailů denně</b> (<a href="https://www.statista.com/statistics/456500/daily-number-of-e-mails-worldwide/">Statista: Number of sent and received e-mails per day worldwide</a>) je správně nastavená e-mailová autentisace klíčová pro to, aby vaše zprávy byly doručeny příjemcům a neztratily se ve spamu. Bez těchto protokolů e-mailoví poskytovatelé nemohou odlišit vaše legitimní zprávy od spammerů.</p>

<p>Správně nastavená kombinace SPF, DKIM a DMARC je dnes <b>standard</b> pro každou seriosní doménu a významně přispívá k bezpečnosti a důvěryhodnosti vaší e-mailové komunikace.</p>

<h2 id="odkazy-jinam">Odkazy jinam</h2>

<ul>
  <li><a href="https://gmail.com/postmaster/">Gmail Postmaster Tools</a> – oficiální nástroje od Googlu pro analýzu doručitelnosti a reputace u Gmailu.</li>
  <li><a href="https://resend.com/blog/email-authentication-a-developers-guide">Email Authentication: A Developer's Guide</a> – přehledný vývojářský průvodce SPF, DKIM, DMARC a BIMI od Resend.</li>
</ul>

