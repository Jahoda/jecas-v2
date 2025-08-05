---
title: "Bezpečnostní risika webu"
headline: "Bezpečnost webových stránek"
description: "Bezpečnostní risika na webových stránkách a jejich řešení a prevence."
date: "2013-10-25"
last_modification: "2013-10-29"
status: 1
tags: ["napady", "zabezpeceni"]
format: "html"
---

<p>Z hlediska bezpečnosti webových stránek čelí jejich autor mnoha hrozbám, často ale tvůrci bezpečnost vědomě či nevědomě zanedbávají.</p>

<h2 id="slabe-heslo">Slabá přihlašovací hesla</h2>
<p>Možná to zní triviálně, ale i <b>bez</b> bezpečnostní díry v aplikaci hrozí nebezpečí, že se útočník dostane, kam nemá, <b>zcela standardní cestou</b>, protože přihlašovací údaje do administrace budou <code>admin</code> a <code>admin</code> nebo <code>admin</code> a nějaké krátké heslo, které lze <b>uhodnout hrubou silou v relativně krátkém čase</b>.</p>

<h2 id="ftp">Zavirování z FTP</h2>
<p>Docela častý typ útoku je <b>zavirovat počítač oběti</b> a ze známých FTP klientů <b>vytáhnout uložené přístupy k FTP</b>. Tak útočník získá neomezený přístup ke zdrojovým souborům webu a používá-li webová aplikace databási, získá i přístup do ní.</p>

<p>Nejčastěji útočník vloží nějaký <code>&lt;iframe&gt;</code> s reklamou nebo třeba měřicí skript, aby si <a href="/seo-navstevnost">zvýšil návštěvnost</a>. To by <i>až tak nevadilo</i>, kdyby Google nebo provozovatel hostingu napadený web nepostihoval. Zda <b>Google našel škodlivý kód</b> je možné najít v Google Webmaster Tools na kartě <b>Malware</b>.</p>

<h3>Řešení</h3>
<p>Neukládat údaje k FTP na potenciálně nakažených počítačích. Nebo ukládat hesla v pozměněné podobě — tj. ke skutečnému heslu <b>přidat určitý počet náhodných znaků</b>, které se při přihlášení jednoduše odmažou (takže to nebude moc zdržovat).</p>

<p>Pokud je už web napaden, je nutné co nejdříve <b>změnit v administraci hostingu FTP přístup</b>. K FTP se připojit z počítače, který není zavirován a začít s čištěním. To není úplně jednoduché, protože útočníci infikují weby promyšleně a <b>na více místech</b>. Nejde-li <b>přepsat celý web</b> ještě nezavirovanými soubory, není odstranění veškerého škodlivého kódu úplně jednoduché. Cizí kód bývá často třeba na <b>posledním řádku souboru a odsazen o tisíc prázdných znaků</b>, tudíž se docela lehko přehlédne. Stoprocentní řešení není ani hledat řetězce škodlivého kódu, které se objevují na finální stránce, protože se může používat <b>všelijaké zakódování a skládání řetězců</b>.</p>

<p>Cílem útočníka je škodlivý kód vložit pokud možno na stránky, kde <b>se vir nejčastěji projeví</b>, proto většinou bývá na stránkách jako <code>index.php</code>, <code>index.html</code> apod., často také naleze do známých JS knihoven jako např. jQuery nebo do všech JS souborů – ty se potom připojují na další stránky, takže škodlivý účinek je značný.</p>

<p>Samotné odstranění škodlivého kódu bez změny hesla u FTP účtu problém <b>trvale nevyřeší</b>, útočník se stále funkčním přístupem k souborům může <b>škodlivý kód obnovovat</b>.</p>

<h2 id="js-osetreni">Ošetření dat jen u klienta JavaScriptem</h2>
<p>Pokud uživatel zadává nějaká data <b>do formuláře</b>, kontrola zadaných dat JavaScriptem v prohlížeči návštěvníka je jistě hezká věc, ale nezajišťuje to bezpečnost. Návštěvník si vždycky může <b>vypnout JavaScript a celé ověřování je pryč</b>.</p>
<h3>Řešení</h3>
<p>Kromě JS ověřování je vždy nutné data <b>ověřovat na serveru</b>. V případě propracovaného JS kontroly postačí i <b>zjednodušené</b> serverové ověření.</p>

<h2 id="xss">Vložení škodlivého kódu (XSS – Cross-site scripting)</h2>
<p>Chyba plynoucí z <b>nedostatečného ošetření vstupů od uživatele</b> (ošetřovat je dále nutné i obsah, který se může do HTML dostat z URL dané stránky). Vždy, když má nedůvěryhodný návštěvník možnost vkládat obsah na stránku, je nutno zajistit aby:</p>
<ol>
  <li>Nešlo vložit <b>škodlivý JavaScript</b>, a to jak přímo do značky <code>&lt;script></code>, tak i do atributů <code>on<b>Něco</b></code> (např. <code>onclick</code>). Skript může třeba přečíst a odeslat na web útočníka cookie administrátora, stránku přesměrovávat na škodlivý obsah nebo ji jinak (prakticky neomezeně) modifikovat.</li>
  <li>V případě, že jsou <b>povoleny nějaké HTML tagy</b>, tak kromě předchozího bodu je vhodné zajistit řádné <b>uzavření otevřených značek a atributů</b>, jinak může být rozbit layout webu. Automatisovaně umí zajistit řádné uzavření značek <a href="/vycisteni-kodu">HTML Purifier nebo Texy</a>.</li>
</ol>

<h3>Řešení</h3>
<p>Ve vstupu od návštěvníka je nutno ošetřit (převést na entitu) znak <code>&lt;</code> (mohl by otevřít HTML značku). Pokud se uživatelský obsah může objevit v nějakém atributu, je třeba <i>rozbít</i> ještě <b>jednoduché a dvojité <a href="/uvozovky">uvozovky</a></b> — mohly by útočníkovi umožnit uzavřít původní atribut a vytvořit vlastní nebezpečný <code>onNěco</code>.</p>
<p>V PHP kromě použití hotového nástroje <a href="/vycisteni-kodu">HTML Purifier nebo Texy</a> postačí:</p>
<pre><code>$text = htmlspecialchars($text, ENT_QUOTES);</code></pre>
<p>Ochrana funkcí <code>strip_tags</code> není dostatečná. Při vkládání takto „ošetřeného“ textu do atributů nebo v případě povolení jen některých značek, protože <b>obsah atributů nehlídá</b>.</p>

<h2 id="sql-injection">Narušení SQL dotazu (SQL injection)</h2>
<p>Další nebezpečí je, když nám útočník <b>modifikuje SQL dotaz</b>. Může se to stát, když výsledný text SQL dotazu skládáme třeba v PHP a v datech od útočníka ponecháme uvozovku, která ukončí <i>naši</i> původní podmínku a umožní se tak útočníkovi psát další vlastní příkazy.</p>
<p>Pokud do <b>nebezpečného kódu</b> zajišťujícího přihlášení uživatele:</p>
<pre><code>$dotaz = "SELECT * FROM uzivatele WHERE jmeno='{$_POST['jmeno']}' AND heslo='{$_POST['heslo']}'";</code></pre>
<p>Pošleme jako <code>$_POST['heslo']</code> řetězec <code>' OR ''='</code>, vznikne následující dotaz, který útočníka přihlásí vždy, protože <code>''=''</code> bude vždy platné.</p>
<pre><code>SELECT * FROM uzivatele WHERE jmeno='Jméno' AND heslo='<b>' OR ''='</b>'</code></pre>

<h3>Řešení</h3>
<p>Při skládání SQL dotazů stačí ošetřit všechna data funkcí <code>mysql_real_escape_string</code>. Další možnost je využít tzv. <a href="http://php.net/manual/en/pdo.prepared-statements.php">prepared statements</a>, kdy se místo proměnných do SQL dotazů píší jen otazníky a <b>bezpečné</b> nahrazení zajistí až <b>databásová vrstva</b> (např. <a href="http://dibiphp.com/">Dibi</a>).</p>

<h2 id="csrf">Tajné vykonání požadavku (CSRF – Cross-site Request Forgery)</h2>
<p>Docela rafinovaný způsob útoku hrozí u aplikací, kde není administrátorská akce dostatečně ochráněna. V čem spočívá? Útočník docílí toho, že přihlášeného administrátora dostane na URL, která provede nějakou akci (třeba smazání celého webu).</p>

<p>Toto nebezpečí hrozí zvlášť u systémů s <b>otevřeným zdrojovým kódem</b>, kde není problém získat konkrétní URL pro libovolné akce.</p>

<p>Dostat oprávněného uživatele na potřebnou adresu lze třeba přímým odkazem v komentářích, odkazem na vlastní web, který se na akci přesměruje, nebo využitím <a href="#xss">XSS</a>. Zvlášť zákeřné je potom <b>vložení obrázku s URL akce</b> jako cílem, protože si toho oběť nemusí vůbec všimnout.</p>
<pre><code>&lt;img src="http://example.com/admin/smazatStranku.php?id=10"&gt;</code></pre>

<p>Nebezpečné nejsou jen URL — tedy GET požadavky, stejně tak může být na stránce útočníka, kam se povede nahnat administrátora, škodlivý formulář odesílaný na pozadí metodou POST.</p>

<h3>Řešení</h3>
<p>Jedna možnost je při všech akcích <b>kontrolovat <a href="/referer">hlavičku <code>referer</code></a></b> (v PHP <code>$_SERVER['HTTP_REFERER']</code>), zda nepochází z cizí domény. Problém je, že uživatelé s běžně <b>vypnutým refererem</b> si jej pro funkčnost akcí na daném webu budou muset zapnout.</p>
<p>Druhá možnost je uživateli generovat pro provádění akce <a href="http://php.vrana.cz/cross-site-request-forgery.php">ověřovací tokeny</a>, které útočník nedokáže zjistit, takže jím vyvolané akce budou po návštěvě administrátora brány jako neplatné.</p>

<h2 id="verejna-slozka">PHP skripty ve veřejně přístupné složce</h2>
<p>Pokud je celá aplikace a zvlášť potom <b>přístupové údaje do databáse</b> v adresáři, který webový server používá jako hlavní složku při přístupu na danou doménu, hrozí zde risiko, že v případě výpadku zpracovávání PHP skriptů půjde soubory <code>*.php</code> prohlížet jako běžný text. Nejedná se o teoretické strašení, ale opravdu <b>se to už stalo</b>.</p>

<h3>Řešení</h3>
<p>Potlačit toto risiko může přesunutí citlivých dat o úroveň výše. U PHP souborů to není problém – <code>include</code> takových souborů by mělo normálně fungovat. Horší je to <b>s podporou u hostingů</b> – u řady z nich taková věc vůbec není možná.</p>

<h2 id="upload">Nahrávání souborů</h2>
<p>Necháme-li uživatele nahrávat na web soubory, je nutné zajistit, aby <b>nahrávacím formulářem nešlo přepisovat nebo nahrát nový PHP soubor</b>. Pokud by útočník dostal na náš web vlastní <b>spustitelný skript</b>, získá prakticky 100% kontrolu.</p>
<h3>Řešení</h3>
<p>Je tedy nutno nechat uploadovat jen do vyhrazené složky, kde je zakázána interpretace PHP souborem <code>.htaccess</code>. Případně soubory <code>*.php</code> vůbec neumožnit nahrávat nebo jim měnit příponu na např. <code>.txt</code>.</p>

<h2 id="update">Aktualisace souborů</h2>
<p>Při nahrávání nové verse aplikace na webhosting se může stát, že uživatel přistoupí na stránku v momentě, kdy <b>některé skripty jsou již nové a některé ne</b>. To může vyvolat nepříjemnost a případně i ztrátu dat nebo jiný problém.</p>

<h3>Řešení</h3>
<p>Existuje hned několik možností.</p>
<ol>
  <li>Celou novou versi aplikace nahrát vždy <b>do nového adresáře</b> a v jediném <a href="#verejna-slozka">veřejně přístupném</a> souboru připojit <i>novou aplikaci</i>:
    <pre><code>include "../aplikace<b>v2</b>/aplikace.php";</code></pre>
  </li>
  <li>Aplikaci zmačkat do jednoho <b>jediného souboru</b>.</li>
  <li>Po čas updatu <b>web vypnout</b>.</li>
  <li>Nejprve všechny soubory nahrát pod <b>změněným názvem/příponou</b> a potom je hromadně přepsat a nahradit tak soubory staré. Tato možnost vychází z toho, že <b>přejmenování</b> na rozdíl od <b>nahrávání souborů</b> proběhne <b>prakticky okamžitě</b>. Existuje i <a href="http://phpfashion.com/ftp-deployment-nahravejte-pres-ftp-chytre">hotové řešení</a>.</li>
</ol>