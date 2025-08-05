---
title: "HTTPS – má smysl?"
headline: "Přechod na HTTPS"
description: "Jaké jsou výhody a nevýhody převedení webu na zabezpečené HTTPS. Proč web na HTTPS přesunout?"
date: "2014-12-21"
last_modification: "2015-10-07"
status: 1
tags: ["seo", "zabezpeceni", "zrychlovani"]
format: "html"
---

<p>HTTP – <i>Hypertext Transfer Protocol</i> – je <i>způsob</i>, kterým se přenášejí data na internetu. HTTP není chráněné před odposloucháváním/sledováním nebo modifikací obsahu. HTTPS tyto problémy řeší <b>šifrováním dat</b> mezi klientem a serverem.</p>



<h2 id="vlastnosti">Vlastnosti HTTPS</h2>


<h3 id="modifikace-obsahu">Modifikace obsahu</h3>

<p>Nezabezpečené HTTP spojení nezaručuje, že obsah, který se dostane do prohlížeče, je ten obsah, který vytvořila příslušná webová stránka.</p>

<p>Po cestě od webového serveru dané stránky k prohlížeči návštěvníka je možné <b>modifikovat výsledek</b>, aniž by si toho návštěvník všiml.</p>

<p>V dnešní době sice nebývá zvykem, aby například <b>poskytovatel připojení</b> modifikoval stránky svých zákazníků, ale problém mohou být <b>neznámé Wi-Fi sítě</b>, které teoreticky může provozovat člověk, co chce sledovat připojené uživatele.</p>

<p>Cílem modifikace obsahu stránky může být třeba:</p>

<ol>
  <li><b>Vložení reklamy</b> provozovatele Wi-Fi.</li>
  
  <li><b>Získání osobních údajů (hesel)</b>. Útočník může do stránky vložit skript, který obsah formulářů odešle kromě originální stránce i nějak jinam.</li>
</ol>







<h3 id="odposlouchavani">Odposlouchávání provozu</h3>

<p>Jelikož je HTTP nešifrované, může člověk s <b>přístupem do sítě</b> sledovat, co za weby si ostatní prohlížejí.</p>
  
<p>Nešifrovaně se přenášejí i případné identifikátory pro přihlášení jako jsou <b>cookie</b>. Odposloucháváním přenosu dat přes HTTP je tak možné získat cookie jiného uživatele a třeba <b>se za něj přihlásit</b> do webové aplikace.</p>

<p>Pro Facebook dokonce existovala mobilní aplikace, která poslouchala v síti, a na <b>jediné kliknutí</b> umožňovala přihlášení se za odposlechnuté uživatele, co <b>nezabezpečeně přes HTTP použili Facebook</b>.</p>

<p>Zjistit ale, co si člověk na webu čte, není <b>výrazný problém ani u HTTPS</b>. U webu s méně stránkami teoreticky půjde relativně spolehlivě určit prohlížené stránky jen na základě <b>zkoumání objemu dat</b>.</p>



<h3 id="referer">Přenášení refereru</h3>

<p>Jedna z vlastností HTTPS je, že při přechodu na HTTP stránku z HTTPS nejsou <b>přenášeny informace o předchozí stránce</b>. U HTTP se při příchodu na stránku může provozovatel webu standardně snadno dozvědět, odkud návštěvník přišel. Z praktického hlediska tento rozdíl ale nic moc neřeší.</p>
<ul>
  <li>
  	<p>Uživatel může <a href="/referer">referer</a> <b>nepředávat i u HTTP</b>. Není problém jeho odesílání blokovat v prohlížeči.</p>
  </li>  
  <li>
  	<p>Provozovatel webu může přesný referer rovněž <b>nepředávat i u HTTP</b>. Přesměrováním odkazu přes nějakou stránku.</p>
  </li>  
  <li>
    <p>Provozovatelé webu mohou i při přechodu z <b>HTTPS stránky na HTTP</b> stále sledovat pohyb uživatelů přidáváním identifikačních parametrů do URL. Vyžaduje to ale jejich <b>vzájemnou spolupráci</b>.</p>
    
    <p>Takto může Franta odkázat na Pepu, aby se Pepa dozvěděl, že k němu návštěvník přišel od Franty:</p>
    
    <pre><code>&lt;a href="http://pepa.cz/?odkud=franta">
  Pepa
&lt;/a></code></pre>
    
    <p>Do budoucna předání refereru při přechodu HTTPS → HTTP může zajistit <code>&lt;meta></code> značka:</p>
    
    <pre><code>&lt;meta name="referrer" content="always"></code></pre>
    
    <div class="external-content">
      <ul>
        <li><a href="http://smerity.com/articles/2013/where_did_all_the_http_referrers_go.html">Where did all the HTTP referrers go?</a></li>
      </ul>
    </div>
  </li>
</ul>


<h3 id="smiseny">Smíšený obsah</h3>

<p>Na HTTPS stránce <b>je problematické</b> mít vložený obsah z HTTP. To se týká rámů (<code>&lt;iframe></code>), stylů, skriptů a podobně. Obráceně v tom není problém.</p>

<p>Prohlížeče rozlišují <b>externí objekty</b> na:</p>

<ol>
  <li><b>pasivní</b> – obrázky, videa, zvuky</li>
  
  <li><b>aktivní</b> – rámy, skripty, styly, objekty typu Flashe</li>
</ol>

<p>Pasivní se zobrazí, ale stav stránky není „100% zelený“. Prohlížeč upozorňuje, že stránka obsahuje <b>nezabezpečené zdroje</b>.</p>

<p>Ty aktivní jsou potom ve výchozím nastavení prohlížečů <b>blokovány</b>. V <b>Internet Exploreru</b> se v případě smíšeného obsahu objevuje v dolní části prohlížeče varovná hláška:</p>

<p><img src="/files/https/smiseny-ie.png" alt="Smíšený obsah v IE" class="border"></p>




<p>Ve starších <b>IE</b> (IE 7 a IE 8) je informace o smíšeném obsahu výraznější a vyžaduje přímou akci uživatele.</p>

<p><img src="/files/https/smiseny-ie7.png" alt="Smíšený obsah v IE 7" class="border"></p>










<p><img src="/files/https/smiseny-ie8.png" alt="Smíšený obsah v IE 8" class="border"></p>













<p>V ostatních prohlížečích se zobrazí informace o smíšeném obsahu až při zkoumání zabezpečení stránky.</p>

<p><img src="/files/https/smiseny-ff.png" alt="Smíšený obsah ve Firefoxu" class="border"></p>











<p>Nemožnost vložit HTTP <code>&lt;iframe></code> nebo <b>externí JS</b> vadí například při <b>vkládání reklamy</b>, která nefunguje pod HTTPS. S příjmy z reklamy od reklamní služby <b>nenabízející HTTPS</b> se tak nezbývá než rozloučit.</p>

<p>Pokud je potřeba používat HTTP obsah na HTTPS stránce, nezbývá než použít <a href="/php-proxy">proxy</a> (stahovat si na serveru daný HTTP obsah).</p>


<div class="external-content">
  <ul>
    <li><a href="https://www.bennish.net/mixed-content.html">Testovací stránka smíšeného obsahu</a></li>
  </ul>
</div>



<h2 id="cena">Cena</h2>

<p>Někteří příznivci HTTPS prohlašují, že <b>není jediný důvod nepoužívat HTTPS</b>. Je to pochopitelně nesmysl. I když je <b>cena potřebných certifikátů</b> v řádů stokorun nebo dokonce zdarma, přechod na HTTPS bude často znamenat i <b>vyšší náklady na hosting</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://letsencrypt.org">Let's Encrypt</a> – certifikáty zdarma</li>
  </ul>
</div>

<p>Pro provoz webu na HTTPS je potřeba <b>vlastní IP adresa</b> nebo <b>používat SNI</b> (<a href="http://cs.wikipedia.org/wiki/Server_Name_Indication">Server Name Indication</a>).</p>

<p>Vlastní IP adresa znamená zpravidla náklady navíc. Třeba u <a href="http://hosting.wedos.com" onmousedown="this.href = 'http://hosting.wedos.com/d/117947'">Wedosu</a> stojí <b>100 Kč + DPH měsíčně</b>. I jinde jsou ceny podobné.</p>

<div class="external-content">
  <ul>
    <li>Wedos: <a href="http://kb.wedos.com/webhosting/https.html" onmousedown="this.href = 'http://kb.wedos.com/webhosting/https.html?affd=117947'">HTTPS u webhostingu</a></li>
  </ul>
</div>
  
<p>Použití SNI zase nebude ideální pro <b>uživatele starších prohlížečů</b> – <b>Internet Explorer 6,7</b> a <b>8</b> na <b>Windows XP</b>. Těm se místo stránky objeví chybová hláška, že je <b>problém s certifikátem</b>.</p>

<p><img src="/files/https/spatny-certifikat.png" alt="Upozornění na špatný certifikát" class="border"></p>












<p>I přesto půjde <b>stránku zobrazit</b>, když návštěvník klikne na nedoporučenou akci „Pokračovat na stránku“. Stránka potom bude doplněna červenou chybovou hláškou „Chyba certifikátu“. Moc dobré mínění o webu ale návštěvník nejspíš mít nebude.</p>

<p><img src="/files/https/chyba.png" alt="Stránka s špatným certifikátem v IE 8" class="border"></p>




<p>Pokud už má člověk pro webovou stránku vlastní IP adresu nebo chyba certifikátu v <b>Internet Exploreru</b> pod Windows XP nevadí, přímé náklady se zvýší jen o <b>cenu certifikátu</b>.</p>

<p>Kromě toho ještě něco stojí samotný jednorázový <b>přechod na HTTPS</b>, který se <b>sám neudělá</b>. I pokud si vše člověk vlastnoručně nastaví sám podle návodů na internetu, pořád existují <a href="http://cs.wikipedia.org/wiki/Náklady_obětované_příležitosti">náklady obětované příležitosti</a>, které je třeba brát v úvahu.</p>






<h2 id="vyhledavace">Vyhledávače</h2>

<p>Jelikož převod webu na HTTPS znamená <b>změnu všech URL celého webu</b>, mohou panovat jisté obavy, jak si s tím poradí internetové vyhledávače.</p>




<h3 id="google">Google</h3>
  
<p><b>Google</b> po přesměrováním stránek <b>hlavičkou 301</b> zpravidla aplikuje změnu velmi rychle a ani nezpůsobuje problémy jako významné výpadky posic ve výsledcích vyhledávání.</p>

<p>Algoritmus Google údajně má jako jedno z kritérií <b>zabezpečení webu</b> (jestli používá HTTPS nebo HTTP). Aplikace tohoto kritéria ale nezměnila ani <b>1 % všech výsledků</b>, takže o nějaké významné výhodě HTTPS nelze hovořit.</p>

<div class="external-content">
  <ul>
    <li>Google Online Security Blog: <a href="http://googleonlinesecurity.blogspot.cz/2014/08/https-as-ranking-signal_6.html">HTTPS as a ranking signal</a></li>
  </ul>
</div>


<h3 id="seznam">Seznam</h3>

<p>U <b>Seznamu</b> typicky <b>přesun webu</b> (změna URL stránek) přináší problémy – změna nějakou dobu trvá a hrozí <b>krátkodobý pokles umístění ve vyhledávání</b> a z toho plynoucí ztráty návštěvnosti.</p>

<p>Z pohledu Seznamu jsou níže <b>dvě různé URL</b>:</p>

<pre><code>http://example.com
http<b>s</b>://example.com</code></pre>

<p>Může se na nich nacházet odlišný obsah. Není tedy možné vzít všechny URL s <code>http:</code> a nahradit je za <code>https:</code>.</p>

<blockquote cite="https://twitter.com/janovsky/status/506819036861435904">
  <p>Množí se dotazy, jestli je dobrý nápad přesouvat weby na https: protokol. Že prý Google to chce. Já říkám, že měnit zbůhdarma URL je blbost.</p>
  
  <p>…</p>
  
  <p>Seznam trable s https indexací nemá. Má trable s provozovateli webů, kteří nechápou, že výměna protokolu je změna URL. :-)</p>
  
  <p class="autor"><b>Dušan Janovský</b>, konzultant vyhledávání v Seznam.cz, <a href="https://twitter.com/janovsky/status/506819036861435904">Twitter</a></p>
</blockquote>

<p>Podle zkušeností některých tvůrců webů není přechod na HTTPS u Seznamu <b>rozhodně bezproblémový</b>.</p>

<div class="external-content">
  <ul>
    <li>Webtrh: <a href="https://webtrh.cz/282348-presmerovani-https-platnym-ssl-vliv">Přesměrování na https s platným SSL a vliv na Seznam.cz</a></li>
  </ul>
</div>

<p>Přesměrování na HTTPS u webu hodně závislého na <b>návštěvnosti ze Seznamu</b> je tedy poněkud risiková záležitost. A celou akci si je dobré dvakrát rozmyslet (přinese významná positiva?) a pro jistotu přesun provést v období, kdy propad návštěvnosti způsobí <b>co možná nejmenší ztráty</b>.</p>







<p>Dne <b>6. 10. 2015</b> se na blogu fulltextového týmu objevil článek, že s přechodem na HTTPS je v případě <b>Seznamu</b> dobré ještě počkat do roku <b>2016</b>:</p>

<div class="external-content">
  <ul>
    <li>Blog fulltextového týmu: <a href="http://fulltext.sblog.cz/2015/10/06/3254/">Přechod webů na HTTPS doporučujeme odložit na začátek příštího roku</a></li>
  </ul>
</div>


<p>Nové weby nebo stránky, kde krátkodobé zhoršení posic ve vyhledávání nevadí, jde ale bez problému stavět na HTTPS. Hodnocení HTTP a HTTPS webů je rovnocenné.</p>

<p>Celý problém tkví v indexaci přesměrovaných stránek, nejde o problém primárně s HTTPS.</p>


<h2 id="rychlost">Rychlost</h2>

<p>Použití HTTPS je sice značně komplikovanější než HTTP, znatelně <b>zvýšit rychlost</b> načítání webu díky <b>spojování požadavků</b> na jednotlivé soubory může použití <b>SPDY protokolu</b>. Pokud stránka načítá velké množství objektů (typicky obrázky, které není možné <a href="/css-sprite">spojit do jednoho</a>) u HTTP trvá značnou dobu <b>samotná režie s vytvořením požadavku</b>. SPDY si požadavky na soubory dokáže seskupovat.</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.httpvshttps.com/">HTTP vs HTTPS Test</a> – porovnání rychlosti HTTP a HTTPS při načítání hodně objektů</li>
    
    <li>Souki.cz: <a href="https://www.souki.cz/optimalizujeme-pro-rychlost-https">Optimalizujeme pro rychlost: HTTPS</a></li>
    
    <li>Can I use: <a href="http://caniuse.com/#search=spdy">HTTP/2 protocol / SPDY</a> – podpora SPDY v prohlížečích</li>
  </ul>
</div>


<h3 id="presmerovani">Nutné přesměrování</h3>

<p>Menší zdržení může přechod na HTTPS způsobit kvůli tomu, že prohlížeče berou jako výchozí protokol <code>http://</code>. Pokud tedy člověk zadá do adresního řádku <code>example.com</code>, prohlížeč navšíví stránku <code>http://example.com</code>, kde bude následně přesměrován na <code>http<b>s</b>://example.com</code>.</p>


<h2 id="prihlasovani">HTTPS má smysl jen pro přihlašování uživatelů</h2>

<p>Někteří lidé zastávají názory, že HTTPS má smysl jen u webových stránek, kdy se <b>přihlašují uživatelé</b> nebo tam mají <b>citlivé údaje</b>.</p>

<p>Zde je zásadní otázka, co jsou to <b>citlivá data</b>. Je to značně <b>individuální</b> a universální odpověď neexistuje.</p>

<ul>
  <li>
    <p>Pro někoho nejsou citlivá skoro žádná jeho data. Pokud je člověk <b>aktivní na internetu</b>, řada informací o něm zkrátka půjde zjistit. Takže ho například (ne)bezpečnost přenosu jeho adresy v e-shopu nemusí trápit, protože ji má stejně na webu.</p>
  </li>  
  <li>
    <p>Pro další skupinu je citlivý obsah <b>dostupný až po přihlášení</b>.</p>
  </li>  
  <li>
    <p>Někdo považuje za citlivá data už jen informaci, co si prohlíží.</p>
  </li>
</ul>


<h2 id="kdo-oceni">Kdo HTTPS ocení?</h2>

<p>Je poměrně složité najít početnější skupinu lidí, která HTTPS vědomě ocení.</p>

<ol>
  <li>
    <p>Zvlášť <b>opatrní uživatelé</b> se nebudou k citlivým službám přihlašovat <b>mimo důvěryhodná připojení / z neznámých zařízení</b>. U cizího počítače hrozí, že bude obsahovat program, který bude tajně zaznamenávat znaky napsané na klávesnici nebo výsledný obsah v prohlížeči.</p>
  </li>  
  <li>
    <p>Uživatele vědomě resignující na bezpečnost po internetu kolujících dat použití HTTPS nezachrání.</p>
  </li>  
  <li>
    <p>Uživatelé, co neví, co je to HTTP nebo HTTPS , potom nemají co ocenit.</p>
  </li>
</ol>

<p>Někdo se domnívá, že <b>důvěryhodné označení</b>, které prohlížeče zobrazují u přes HTTPS zabezpečených webů, zabrání útokům, kdy někdo například zkopíruje design banky na vlastní stránku a následně si <b>ukládá hesla klientů</b>. Či jinak podvodným webům.</p>

<p>Zde by mohl zafungovat <i>Peltzmanův efekt</i> a <b>HTTPS u podvodné stránky</b> by mohlo ještě snížit (už tak nízkou) <b>ostražitost běžných uživatelů</b>.</p>

<p>Čistě z technického hlediska ale zabezpečení webu pomocí HTTPS zvýší celkovou bezpečnost.</p>


<h2 id="rozbije">Něco se pokazí</h2>

<p>Prakticky každá zkušenost s přechodem na HTTPS, co je možné na internetu najít, obsahuje zmínku, že se v něčem <b>udělala chyba</b>, něco špatně zafungovalo, byly s něčím <b>problémy</b> a podobně.</p>

<p>Převod webu na HTTPS je poměrně <b>značný zásah</b> do něčeho, <b>co funguje</b>, který s velkou šancí skončí tím, že něco <b>fungovat nebude</b>. Při úvahách o přesunu webu je to dobré dát do úvahy.</p>

<div class="internal-content">
  <ul>
    <li>Zkušenost: <a href="/https-vaszrak">Jak proběhl přechod vaszrak.cz na HTTPS</a></li>
  </ul>
</div>


<h2 id="prejit">HTTP, nebo HTTPS?</h2>

<p>Rozhodnout, jestli přesunout stránku na HTTPS nebo ne, tedy není úplně snadné.</p>


<h3 id="pro">Proč přejít na HTTPS</h3>

<ol>
  <li><b>Rychlost</b> – načítání větších počtů objektu pomocí SPDY.</li>
  
  <li><b>Ochrana uživatelů</b> před odposloucháváním / podstrčením obsahu. U méně významných webů spíš teoretická hrozba.</li>
</ol>


<h3 id="proti">Proč nepřejít na HTTPS</h3>

<ol>
  <li><b>Cena</b> – certifikát, platba za vlastní IP adresu, náklady realisace přesunu.</li>  
  <li><b>Seznam</b> – ztráta návštěvnosti z vyhledávání kvůli změně všech URL.</li>  
  <li><b>Externí skripty a rámy</b> načítané z HTTP – budou v prohlížečích blokovány.</li>
  <li><b>Něco se rozbije</b>.</li>
</ol>

<p>Při přesunu osobního <i>webíku</i>, kam chodí 5 lidí denně z nových prohlížečů, je jediným důvodem proti <b>náklad jednorázového přesunu</b>.</p>

<p>U jiných webů se těch důvodů ale může sejít více, což učiní přesun značně nerozumným, pokud nepřinese adekvátní výhodu.</p>


<h3 id="novy">Nový web</h3>

<p>V případě budování nového webu hovoří proti <b>použití HTTPS</b> v podstatě pouze <b>cena</b>. Nehrozí risika spojená s přesměrováním/přesunem a problémem ve vyhledávačích.</p>



<h2 id="podekovani">Poděkování</h2>

<p>Děkuji <a href="https://www.michalspacek.cz/">Michalu Špačkovi</a> za připomínky, které pomohly v článku odstranit některé chyby, nepřesnosti a nejasnosti.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Chris Palmer: <a href="https://docs.google.com/document/d/1oRXJUIttqQxuxmjj2tgYjj096IKw4Zcw6eAoIKWZ2oQ/preview?sle=true#">How To Migrate To HTTPS</a></li>
  
  <li><a href="https://community.qualys.com/blogs/securitylabs/2014/03/19/https-mixed-content-still-the-easiest-way-to-break-ssl">HTTPS Mixed Content: Still the Easiest Way to Break SSL</a></li>
  
  <li>HTG: <a href="http://www.howtogeek.com/181911/htg-explains-what-exactly-is-a-mixed-content-warning/">What Exactly is a Mixed Content Warning?</a></li>
  
  <li>Paul Irish: <a href="http://www.paulirish.com/2010/the-protocol-relative-url/">The Protocol-relative URL</a></li>
  
  <li>IEBlog: <a href="http://blogs.msdn.com/b/ie/archive/2011/06/23/internet-explorer-9-security-part-4-protecting-consumers-from-malicious-mixed-content.aspx">Internet Explorer 9 Security Part 4: Protecting Consumers from Malicious Mixed Content</a></li>
</ul>