---
title: "Microsoft Edge"
headline: "Microsoft Edge"
description: "Jaký je nový nástupce Internet Exploreru – Microsoft Edge."
date: "2015-01-04"
last_modification: "2015-07-27"
status: 1
tags: ["webove-prohlizece"]
format: "html"
---

<p>Microsoft tradičně spojuje vydání nového <b>operačního systému</b> s vydáním nového prohlížeče. Obdobně je to u prohlížeče <b>Edge</b>, který vychází spolu s <a href="/windows-10">Windows 10</a>.</p>

<p><img src="/files/microsoft-edge/edge.png" alt="Microsoft Edge" class="border"></p>
























<div class="autor-profile">
  <p>Článek vyšel na serveru Lupa.cz:</p>
  
  <ul>
    <li><a href="http://www.lupa.cz/clanky/microsoft-edge-pripravte-se-na-prohlizec-ktery-nahradi-internet-explorer/">Microsoft Edge: připravte se na prohlížeč, který nahradí Internet Explorer</a></li>
  </ul>
</div>


<!--

<h2 id="novy">Nový prohlížeč Edge</h2>

<p>Microsoft Edge byl dříve označován jako <b>Internet Explorer 12</b> nebo později jako <b>Project Spartan</b> či jen <b>Spartan</b>.</p>

<p>Změna názvu má nejspíš za cíl odstřihnout se od původního Internet Exploreru, který si v dlouhé době trvající <b>5 let</b> mezi versemi 6 (2001) a 7 (2006) značně <b>pokazil pověst</b> a stal se terčem mnoha vtipů a vzteku webových vývojářů.</p>





<h2 id="jadro">Vykreslovací jádro</h2>

<p>Pro webové tvůrce je na <b>MSE</b> (<i>Microsoft Edge</i>) nejzajímavější značně předělané <b>vykreslovací jádro</b>. Microsoft už nechtěl nést tíhu zpětných kompatibilit, takže jádro <i>EdgeHTML</i> je značně odlehčený <i>Trident</i> (vykreslovací jádro Internet Exploreru 11 a starších) doplněný o <b>nové funkce</b>.</p>

<p>Microsoft se snaží vytvořit jádro obdobně vybavené jako konkurence (<b>Chrome</b>, <b>Firefox</b>). Podle vyjádření tvůrců prohlížeče by si měl Edge bez problému poradit s weby, které fungují v ostatních prohlížečích.</p>

<p>Ze starého jádra prý bylo odstraněno přes <a href="http://blogs.windows.com/msedgedev/2015/05/06/a-break-from-the-past-part-2-saying-goodbye-to-activex-vbscript-attachevent/">220 tisíc řádků kódu</a>.</p>

<p><img src="/files/microsoft-edge/odstraneny-kod.png" alt="Odstraněný kód z Edge" class="border"></p>



















<h3 id="proc-nove">Proč nové jádro?</h3>

<p>Někdo by si mohl pomyslet, proč Microsoft tvoří v podstatě <b>nové vykreslovací jádro</b>, když by šel použít <b>Webkit</b> či jeho odnož <b>Blink</b> (používá <b>Chrome</b> a <b>Opera</b>).</p>

<p>Podle <a href="http://blogs.msdn.com/b/ie/archive/2015/02/26/a-break-from-the-past-the-birth-of-microsoft-s-new-web-rendering-engine.aspx">vyjádření</a> Microsoftu se myšlenka použít <b>Webkit</b> zvažovala, nakonec prý ze dvou (oficiálních) důvodů byla zavržena:</p>

<ul>
  <li>Snížilo by to <b>rozmanitost a konkurenci</b>, která by mohla vést k ustrnutí vývoje.</li>
  
  <li>V Microsoftu se domnívali, že jsou schopni vytvořit ze starého vlastního jádra Trident lepší výsledek než při použití Webkitu.</li>
</ul>


<h3 id="kompatibilita">Kompatibilita</h3>

<p>Starší Internet Explorery nabízely pro funkčnost rozbitých starších webů tzv. <b>režim kompatibility</b>.</p>

<p><a href="/ie11">Internet Explorer 11</a> tedy kvůli tomu obsahoval celkem <b>6 vykreslovacích jader</b>.</p>

<p><img src="/files/microsoft-edge/rezim-11.png" alt="Přepínání režimů v IE 11" class="border"></p>










<p>Mezi jednotlivými jádry mohl přepínat <b>uživatel prohlížeče</b> i <b>tvůrce webu</b>.</p>


<p>Pro tvůrce webu k tomu sloužila <code>&lt;meta></code> značka nebo hlavička <code>X-UA-Compatible</code>, kterou si šlo Internet Explorery přepnout do libovolné starší verse.</p>



<p>V hodnotě <code>X-UA-Compatible</code> byla shodou okolností už dříve k vidění hodnota <i>Edge</i> znamenající nejnovější (<i>krajní</i>) versi Internet Exploreru. Její uvádění se používalo pro <b>skrytí tlačítka</b> přepínajícího vykreslovací jádro do <b>kompatibilního režimu</b>:</p>

<pre><code>&lt;meta http-equiv="X-UA-Compatible" content="<b>IE=edge</b>"> </code></pre>

<p>Rozsáhlé vysvětlení přepínání režimů je na StackOverflow:</p>

<div class="external-content">
  <ul>
    <li>StackOverflow: <a href="http://stackoverflow.com/questions/6771258/whats-the-difference-if-meta-http-equiv-x-ua-compatible-content-ie-edge-e">What's the difference if X-UA-Compatible exists or not?</a></li>
  </ul>
</div>


<p>Vzhledem k tomu, že velké množství zpravidla <b>intranetových systémů</b> vyžaduje prastaré Internet Explorery, i ve <b>Windows 10</b> bude kvůli kompatibilitě zůstávat obdoba <b>IE 11</b> se starými jádry Trident.</p>

<p><b>Přepnutí do starého IE</b> půjde ale vynutit jen ze strany návštěvníka / administrátora vnitřní sítě. Přímo v nabídce prohlížeče <i>Edge</i> je volba „Otevřít v Internet Exploreru“.</p>

<p>Zároveň některé starší významnější weby, co by v Edge nefungovaly, mohou být automaticky přepnuty do režimu kompatibility.</p>

<p>„Optimalisovat“ z pohledu tvůrce webů pro <b>nový prohlížeč od Microsoftu</b> tím stylem, že se shodí do nižší verse, už tedy dál nepůjde.</p>






<h3 id="dva">Dva prohlížeče ve Windows 10</h3>

<p>Windows 10 pro desktop tedy budou obsahovat v dva samostatné prohlížeče:</p>

<ol>
  <li>Microsoft Edge – EdgeHTML (výchozí)</li>
  
  <li>Internet Explorer – MSHTML</li>
</ol>

<p><img src="/files/microsoft-edge/mse.png" alt="New a Legacy režimy" class="border"></p>























<p>Microsoft Edge a Internet Explorer jsou ve Windows 10 dvě samostatné oddělené aplikace.</p>


<p>V mobilním operačním systému <b>Windows Phone 10</b> bude pouze Edge s velmi podobným jádrem jako desktopová verse.</p>

<blockquote cite="https://twitter.com/MSEdgeDev/status/596204249089847297">
  <p>Microsoft Edge will be the only browser on Windows 10 phones - no Internet Explorer in that case.</p>
  <p class="autor">MSEdgeDev na <a href="https://twitter.com/MSEdgeDev/status/596204249089847297">Twitteru</a></p>  
</blockquote>



<h2 id="update">Budoucí aktualisace prohlížeče</h2>

<p>Absence přímé čísla verse nasvědčuje tomu, že <b>Microsoft Edge</b> by mohl mít bližší <b>tempo updatů</b> k prohlížečům <b>Chrome</b>, <b>Opera</b> nebo <b>Firefox</b>.</p>

<p>Na novinky by se tak už nemuselo čekat roky.</p>

<p>Obdobou testovacích versí (Chrome Canary a Firefox Nightly) by měl být program <a href="https://insider.windows.com/"><b>Windows Insider</b></a>, pomocí kterého budou dostupné novinky v prohlížeči dříve, než se dostanou do ostrého provozu.</p>

<p>Updaty pro <i>insidery</i> by mohly vycházet <a href="https://twitter.com/morris_charles/status/596395467476369408">2× za měsíc</a>.</p>

<p>Nějaký pevný plán updatů prý ale v Microsoftu nemají.</p>







<h2 id="podpora">Podpora webových standardů</h2>


<p>Microsoft zveřejňuje přehled všech <b>novinek s aktuálním stavem</b> (hotovo, ve vývoji, zvažováno, zavrženo a podobně), který se pořád mění. <b>Aktuální stav</b> je na následující adrese:</p>
<div class="external-content">
  <ul>
    <li>
      <a href="http://dev.modern.ie/platform/status/">Platform status</a> – přehled jednotlivých věcí a stav implementace v ME
      <p><img src="/files/microsoft-edge/podpora.png" alt="Podpora v Edge" class="border"></p>




















    </li>
  </ul>
</div>




<h3 id="zpetna-vazba">Názory uživatelů</h3>

<p>Vývojový tým Edge je otevřený i k nápadům uživatelů. O prvcích, které by se měly do prohlížeče přidat, je možné hlasovat.</p>

<p><b>Gesta myší</b> tedy v prohlížeči <a href="https://windows.uservoice.com/forums/285214-microsoft-edge/suggestions/7384336-please-add-support-for-native-mouse-gestures-simi">zatím nebudou</a>.</p>

<p><img src="/files/microsoft-edge/gesta.png" alt="Gesta myší jako v Opeře" class="border"></p>













<div class="external-content">
  <ul>
    <li><a href="https://windows.uservoice.com/forums/285214-microsoft-edge">Microsoft Edge – Suggestion Box</a></li>
  </ul>
</div>



<h2 id="testovani">Testování v Microsoft Edge</h2>

<p>Pro webové tvůrce je <b>MSE</b> další prohlížeč s očekávaným významným <b>tržním podílem</b> – bude tedy nutné pro něj weby ladit.</p>


<p>Microsoft Edge nativně funguje <b>pouze na Windows 10</b> – tedy <a href="http://dev.modern.ie/platform/faq/win81">nepůjde</a> nainstalovat do starších <b>Windows 7 nebo 8.1</b>, protože počítá s funkcemi Windows 10, jako je třeba <b>Cortana</b>, a je postaven na <i>Universal Windows Platform</i>, která je nekompatibilní se staršími Windows.</p>


<p>Rozšíření na <b>další platformy</b> jako je Linux, OS X a další není v plánu.</p>

<blockquote cite="https://twitter.com/MSEdgeDev/status/596203030644592640">
  <p>No other platforms currently planned - right now we're all working hard to ship it on Windows 10</p>
  <p class="autor">MSEdgeDev na <a href="https://twitter.com/MSEdgeDev/status/596203030644592640">Twitteru</a></p>
</blockquote>



<p>Vývoj podílu starého prohlížeče <b>Internet Explorer</b> a nového prohlížeče <b>Edge</b> bude zajímavé sledovat. <b>Bezplatný upgrade</b> z Windows 7 a Windows 8.1 na Windows 10 by mohl znamenat, že se Edge rychle stane nejpoužívanější prohlížečem od Microsoftu.</p>

<p>Testovat Edge mimo <b>Windows 10</b> by mohlo do budoucna jít přes cloudové řešení <b>Azure RemoteApp</b>, které fungovalo už pro <b>IE 11</b>:</p>

<div class="internal-content">
  <ul>
    <li><a href="/remote-ie">Samostatný Internet Explorer 11</a> – pomocí Azure RemoteApp</li>
  </ul>
</div>

<p>Rovněž jde pro testování použít například placenou službu <a href="https://www.browserstack.com/">BrowserStack</a>, která <b>Microsoft Edge</b> (mimo hromady dalších prohlížečů) nabízí.</p>

<p><img src="/files/microsoft-edge/browserstack.png" alt="Spouštění Edge v BrowserStack" class="border"></p>
























<h2 id="dev">Vývojářské nástroje</h2>

<p>Nástroje pro vývojáře jsou vzhledem hodně podobné <b>IE 11</b>. Obsahují ale řadu zlepšení:</p>

<div class="external-content">
  <ul>
    <li><a href="http://blogs.windows.com/msedgedev/2015/07/21/announcing-the-latest-improvements-for-the-f12-developer-tools-in-windows-10/">Announcing the latest improvements for the F12 developer tools in Windows 10</a></li>
  </ul>
</div>


<h2 id="user-agent">Hlavička <code>user-agent</code></h2>

<p>Identifikace prohlížeče v případě desktopu:</p>

<pre><code>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135  Safari/537.36 Edge/12.&lt;OS Build #></code></pre>


<p>Na mobilech potom:</p>

<pre><code>Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; DEVICE INFO) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Mobile Safari/537.36 Edge/12.&lt;OS Build #></code></pre>



<p>Protože řada webů používá/používala tuto hlavičku pro <b>servírování odlišných stylů nebo skriptů</b> pro různá koncová zařízení, je historicky zanesena spoustou balastu sloužící k <b>projití detekčními skripty</b>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/ua#podoba">Podoba hlavičky user agent</a> – vysvětlení podoby <i>user-agenta</i></li>
  </ul>
</div>


<h2 id="objekty">Flash, Silverlight a Java</h2>

<p>Prohlížeč <i>Edge</i> přestane podporovat objekty <b>Silverlight a Java</b>, kromě toho také <i>ActiveX</i>.</p>

<p>Podpora <b>Flashe</b> z důvodu jeho velkého rozšíření bude zachována. Microsoft chce dál úzce spolupracovat s Adobe a aktualisovat Flash přes <b>Windows Update</b>.</p>

<p>Zapnout nebo vypnout Flash jde jednoduše v nastavení. Výchozí stav je <i>zapnuto</i>.</p>

<p><img src="/files/microsoft-edge/zapnuti-flashe.png" alt="Nastavení Flashe" class="border"></p>












<h3 id="dnt">Nastavení „Do Not Track“</h3>

<p>V nastavení jde zapnout/vypnout i Do Not Track.</p>

<p>Myšlenka <b>Do Not Track</b> je taková, že prohlížeč pošle provozovateli webu hlavičku, že si <b>nepřeje být sledován</b> a ten ho <b>nebude sledovat</b>. V praxi se tím mnoho webů neřídí, protože by se tak připravily o zajímavá data ohledně chování návštěvníků.</p>

<p><img src="/files/microsoft-edge/dnt.png" alt="Nastavení Do Not Track" class="border"></p>








<p>Tato volba je v prohlížeči <i>Edge</i> ve výchozím nastavení <b>vypnuta</b>.</p>




<h2 id="rozsireni">Podpora rozšíření</h2>

<p>Jediná momentální rozšíření jsou <b>Flash</b> a plugin pro <b>zobrazování PDF</b>.</p>

<p>V nějakém budoucím updatu by Mirosoft Edge měl nabízet <b>JavaScriptová rozšíření</b> podobná ostatním prohlížečům.</p>




<h2 id="rozhrani">Uživatelské rozhraní</h2>

<p>Rozhraní je maximálně <b>minimalistické</b> a v plochém stylu – podobně jako další aktuální aplikace Microsoftu (např. <a href="/office-2016">Office 2016</a>).</p>

<p>Tento obrázek zachycuje v kompletní podobě rozhraní. Rozhraní je <b>responsivní</b>, takže jde i takto zúžit a pořád jsou na něm všechny ovládací prvky viditelné.</p>

<p><img src="/files/microsoft-edge/rozhrani.png" alt="Spouštění Edge v BrowserStack" class="border"></p>








<h3 id="stavovy-radek">Stavový řádek</h3>

<p>Trochu nestandardní je absence <b>stavového řádku</b> – po najetí myší na odkaz tak <b>není vidět, kam vede</b>. Jediná možnost je si ho zkopírovat a vložit někam jinam.</p>

<p>V dnešní době, kdy se čím dál víc odkazů <b>obsluhuje JavaScriptem</b> a stejně není záruka, že odkaz přejde na adresu ze stavového řádku, to asi není zase takový problém.</p>

<p>Naopak to eliminuje situaci, kdy se uživatel <b>dostane někam jinam</b>, než mu stavový řádek tvrdil.</p>





<h3 id="nabidka">Nabídka/menu</h3>

<p>Menu se zobrazuje po kliknutí na vodorovné <i>kebab menu</i> <img src="/files/microsoft-edge/kebab-menu.png" class="inline"> a neukrývá žádnou hromadu funkcí.</p>

<p><img src="/files/microsoft-edge/nabidka.png" alt="Nabídka" class="border"></p>

























<p>Netradiční jsou v zásadě jen dvě položky:</p>

<ol>
  <li><b>Share</b> – otevře boční panel s možnostmi sdílení</li>
  
  <li><b>Open with Internet Explorer</b> – zobrazí stránku ve starém „MSHTML režimu“ (tedy otevře samostatnou aplikaci Internet Explorer)</li>
</ol>

<p>Minimalismem se vyznačují i další nabídky, třeba po kliknutí pravým tlačítkem na odkaz se zobrazí jen 3 možnosti:</p>

<p><img src="/files/microsoft-edge/otevreni-odkazu.png" alt="Ask Cortana" class="border"></p>









<h2 id="funkce">Nové funkce Microsoft Edge</h2>

<h3 id="cortana">Cortana</h3>

<p>Po označení textu (např. <b>Microsoft</b>) a kliknutí <b>pravým tlačítkem</b> je k disposici příkaz <b>Ask Cortana</b>.</p>

<p><img src="/files/microsoft-edge/ask-cortana.png" alt="Ask Cortana" class="border"></p>











<p>Cortana je jakýsi <b>virtuální asistent</b>, který se snaží lidským způsobem odpovídat na dotazy.</p>


<p>Po volbě <i>Ask Cortana</i> se tak pokusí dohledat informace o <b>vybraném slově nebo spojení</b> v bočním panelu. To je o hodně pohodlnější než <b>zobrazování výsledků hledání slova v nové záložce</b>, protože nikam nezmizí původní stránka.</p>

<p>Když se to povede, Cortana rovnou zobrazí informace o hledaném spojení. Není se tedy potřeba proklikávat výsledky hledání.</p>

<p><img src="/files/microsoft-edge/hledani-ms.png" alt="Hledání Cortanou" class="border"></p>


















































<p>Cortana dokáže dohledat i <b>význam slova</b>. Příklad při hledání slova <i>porn</i>:</p>

<p><img src="/files/microsoft-edge/hledani-porna.png" alt="Hledání porna Cortanou" class="border"></p>





























<p>Jde dokonce i hledat Cortanu Cortanou:</p>

<p><img src="/files/microsoft-edge/cortana.png" alt="Hledání Cortany Cortanou" class="border"></p>


























<p>Když Cortana nedokáže obdobnou odpověď připravit, zobrazí se běžné <b>výsledky hledání z Bingu</b>.</p>


<h3 id="zvyrazneni">Zvýraznění na stránce</h3>

<p>Další inovativní funkce nabízí <b>zvýrazňování na webových stránkách</b>, která funguje podobně jako aplikace <i>Výstřižky</i> ve Windows. Tato funkce se označuje jako <i>Web Note</i>.</p>

<p>Aktivuje se ikonkou tužky <img src="/files/microsoft-edge/ikona-zvyrazneni.png" class="inline">, načež se zobrazí místo ovládacích prvků prohlížeče lišta se zvýrazňovači:</p>


<p><img src="/files/microsoft-edge/zvyrazneni.png" alt="Zvýrazňování na stránce" class="border"></p>

























<p>Výsledek jde následně uložit nebo sdílet.</p>


<h3 id="cteni">Režim nerušeného čtení</h3>

<p>Tuto funkci budou znát hlavně uživatelé <b>Window Phone</b> a vestavěného <b>mobilního Internet Exploreru 11</b>. Anglicky se jmenuje <i>Reading view</i>.</p>

<p>Hodí se u stránek, které jsou <b>špatně čitelné</b> (malé písmo, špatný kontrast, příliš dlouhé řádky a podobně).</p>

<p>Po zapnutí tohoto režimu ikonou knížky <img src="/files/microsoft-edge/reading-ikona.png" class="inline"> se obsah stránky překlopí do unifikovaného vzhledu:</p>

<p><img src="/files/microsoft-edge/rezim-cteni.png" alt="Režim čtení" class="border"></p>




























<p>Tento vzhled lze navíc lehce modifikovat v nastavení.</p>

<p><img src="/files/microsoft-edge/reading-view.png" alt="Nastavení reading view" class="border"></p>










<p>Využít režim pro čtení <b>není možné vždy</b>. Nezobrazuje se v případě, že prohlížeč o stránce usoudí, že je čitelná dobře, nebo <b>nevypadá jako článek</b> (třeba hlavní stránka blogu).</p>

<p>Podobnou funkci dokáží nezávisle na prohlížeči zajistit služby jako <a href="https://readability.com/">Readability</a> či <a href="https://getpocket.com">Pocket</a>.</p>



<h3 id="zalozky">Záložky a k přečtení</h3>

<p>Zajímavý je nápad rozdělit záložky na část pro <b>stránky k pozdějšímu přečtení</b> – <i>Reading list</i>.</p>

<p><img src="/files/microsoft-edge/fav-reading.png" alt="Přidání do záložek nebo seznamu k přečtení" class="border"></p>





















<p>Stránky k přečtení najdou užitečné uplatnění spolu se <b>synchronisací</b> mezi více zařízeními. Kdy by mělo jít si například stránku přidat na desktopu a mít ji dostupnou v prohlížeči ve <b>Windows Phone</b>.</p>


<p>U stránek k pozdějšímu přečtení se kromě názvu (titulku) ukládá i <b>náhledový obrázek</b>.</p>

<p><img src="/files/microsoft-edge/pridat-precteni.png" alt="Přidání stránky do seznamu k přečtení" class="border"></p>






























<p>Obrázek stránky neumí Microsoft Edge chytře <b>automaticky vytáhnout ze stránky</b>, ale potřebuje k tomu postrčit <i>Open Graph</i> <code>&lt;meta></code> značkou, která se běžně používá i pro Facebook a další sociální sítě.</p>

<pre><code>&lt;meta property="og:image" content="obrazek.png"></code></pre>



<h3 id="sdileni">Sdílení</h3>

<p>Uživatel s prohlížečem Microsoft Edge nepotřebuje, aby na stránce byla <a href="/sdileci-tlacitka">sdílecí tlačítka</a>. Po zvolení volby <i>Share</i> se objeví boční panel se seznamem nainstalovaných aplikací, které jde pro sdílení použít.</p>




<h2 id="odkazy">Odkazy a zdroje</h2>

<ul>
  <li><a href="http://blogs.windows.com/msedgedev/">Microsoft Edge Dev Blog</a> – oficiální blog tvůrců prohlížeče</li>
  
  <li><a href="http://dev.modern.ie/platform/faq/">Často kladené otázky</a> – nejčastější dotazy ohledně nového prohlížeče</li>
  
  <li><a href="https://twitter.com/hashtag/AskMSEdge?src=hash">Otázky na MS Edge na Twitteru</a> – tým MSE odpovídá na Twitteru</li>
  <!--    
    <li>Sitepoint: <a href="http://www.sitepoint.com/microsoft-edge-preview/">Microsoft Edge: A Hands-on Preview</a></li>
  
    <li>Martin Michálek: <a href="http://www.vzhurudolu.cz/blog/30-spartan-webari">Prohlížeč Spartan webaře rozhodně nenaštve</a></li>
    
    <li><a href="http://blogs.msdn.com/b/ie/archive/2015/01/22/project-spartan-and-the-windows-10-january-preview-build.aspx">Project Spartan and the Windows 10 January Preview Build</a></li>
    
    <li><a href="http://blogs.msdn.com/b/ie/archive/2014/04/02/stay-up-to-date-with-enterprise-mode-for-internet-explorer-11.aspx">Stay up to date with Enterprise Mode for Internet Explorer 11</a></li>
    
    <li><a href="http://www.quirksmode.org/blog/archives/2014/12/a_new_microsoft.html">A new Microsoft browser?</a></li>
    
    <li><a href="http://www.zdnet.com/article/microsoft-is-building-a-new-browser-as-part-of-its-windows-10-push/">Microsoft is building a new browser as part of its Windows 10 push</a></li>
    
    <li><a href="http://www.neowin.net/news/internet-explorer-12-big-changes-are-coming-to-trident">Internet Explorer 12: Big changes are coming to Trident</a></li>
    
    <li><a href="http://www.neowin.net/news/internet-explorer-12-ui-overhaul-is-a-blend-of-chrome-and-firefox-adds-extension-support">Internet Explorer 12 UI overhaul is a blend of Chrome and Firefox, adds extension support</a></li>
    
    <li><a href="http://www.independent.co.uk/life-style/gadgets-and-tech/news/microsoft-to-replace-internet-explorer-with-new-streamlined-browser-9949448.html">Microsoft to replace Internet Explorer with new, streamlined browser</a></li>
    
    <li><a href="http://blogs.msdn.com/b/ie/archive/2015/03/02/making-it-easier-for-enterprise-customers-to-upgrade-to-internet-explorer-11-and-windows-10.aspx">Making it easier for Enterprise customers to upgrade to Internet Explorer 11 — and Windows 10</a></li>
    
    <li><a href="http://blogs.msdn.com/b/ie/archive/2015/04/10/project-spartan-now-available-in-the-windows-10-technical-preview-for-phones.aspx">Project Spartan now available in the Windows 10 Technical Preview for phones</a></li>
  
  -->
<!--
</ul>
-->

<!--
<p>Následuje výběr některých <b>využitelnějších vlastností</b>, kde Microsoft dohnal konkurenci:</p>

<dl>
  <dt id="datum">Políčka <code>&lt;input></code> pro zadávání kalendářních dat</dt>
  
  <dd>
    <p>Pro výběr data, měsíce nebo týdnu už není potřeba kalendář v JavaScriptu.</p>
    
    <ul>
      <li><code>&lt;input type='date'></code></li>
      <li><code>&lt;input type='month'></code></li>
      <li><code>&lt;input type='week'></code></li>
    </ul>
  </dd>
  
  <dt id="srcset"><code>&lt;img srcset></code></dt>
  <dd>
    <p>Hodí se pro responsivní obrázky, kdy jde prohlížeči nabídnout více zdrojových souborů, aby se mohl vybrat ten nejvhodnější.</p>
  </dd>
  
  <dt id="gamepad">GamePad API</dt>
  <dd>
    <p>Podpora <b><a href="/gamepad">GamePad API</a></b> – umožňuje ovládání webu USB ovladačem.</p>
  </dd>
</dl>

-->