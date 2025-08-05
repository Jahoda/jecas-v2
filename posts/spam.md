---
title: "Ochrana proti spamu"
headline: "Obrana proti spamu"
description: "Jak se na webu bránit spammerům z řad robotů i návštěvníků."
date: "2013-12-22"
last_modification: "2013-12-22"
status: 1
tags: ["hotova-reseni", "napady", "spam-ochrana"]
format: "html"
---

<p>Umožníme-li na stránku návštěvníkům přidávat obsah, dříve nebo později se <b>setkáme se spamem</b>.</p>

<h2 id="roboti">Spamovací roboti</h2>
<p>První a méně nebezpečná skupina <i>škůdců</i> jsou <b>automatické nástroje</b>, které prochází stránky, hledají formuláře a vkládají do nich odkazy na <i>své</i> stránky.</p>

<p>Způsobů obrany existuje víc. Často stačí využít toho, že robot <b>neinterpretuje JavaScript a CSS</b>.</p>

<h3 id="kontrolni-otazka">Kontrolní otázka</h3>
<p>Jako ochrana se vytvoří formulářové pole, kam se má odpovědět na otázku, která je u něj. Aby ochrana neotravovala běžné návštěvníky, správnou odpověď automaticky vyplní JavaScript a celý rodič <code>&lt;input></code>u s <i>otázkou</i> se skryje.</p>

<pre><code>&lt;p>
  Ochrana proti spamu. Napište prosím číslo dvacet-čtyři: 
  &lt;input type="text" name="robot" id="protirobotum">
&lt;/p>
&lt;script>
  var protiRobotum = document.getElementById("protirobotum");
  protiRobotum.value = "24";
  protiRobotum.parentNode.style.display = "none";
&lt;/script></code></pre>

<p>Na straně serveru se potom před uložením kontroluje hodnota políčka <code>robot</code>. Relativně dobře toho řešení funguje na <a href="http://diskuse.jakpsatweb.cz">Diskusi JPW</a>.</p>

<h3 id="prazdne-pole">Prázdné pole</h3>
<p>Další možnost, kterou lze navíc kombinovat s předchozí, je využívat toho, že <b>spambot vyplní všechna možná pole</b>. Při vytváření formuláře tedy připravíme návnadu s popiskem „Nevyplňujte“, kterou přes CSS skryjeme:</p>

<pre><code>&lt;label style="display: none">Nevyplňujte &lt;input type="text" name="url">&lt;/label></code></pre>

<h3 id="zname-systemy">Spam ve známých diskusních fórech a redakčních systémech</h3>
<p>Ačkoliv výše uvedená řešení jsou hodně účinná. V případě používání <b>populárních redakčních systémů</b> třetích stran (Wordpress, phpBB apod.) je taková ochrana <b>neúčinná</b>.</p>

<p>Není problém robota uzpůsobit těmto ochranám. A u masově používaných systémů se to <b>tvůrci spambota vyplatí</b>. Proto je nutné použít další praktiky, ovšem vždy je dobré myslet na to, <b>aby ochrana neobtěžovala návštěvníky</b>. Nebo jim dokonce zabránila přispívat.</p>

<h3 id="otazka-bez-vyplneni">Otázka bez vyplnění JavaScriptem</h3>
<p>Proti spamovacím robotům je i u známých systémů účinná otázka, která se ale <b>nepředvyplní</b> skriptem, <b>nebude tedy možné získat odpověď</b> ze zdrojového kódu stránky.</p>

<p><b>Příklad</b>: <i>Kolik je pět krát pět?</i></p>

<p>Odpověď se potom opět kontroluje na straně serveru. Je vhodné volit takovou otázku, aby na ní teoreticky nemohl robot odpovědět vrácením <b>prvního výsledku z Googlu</b>.</p>

<p>Otázek může být několik a náhodně se střídat. V takovém případě se do formuláře přidá skryté pole s identifikátorem otázky/odpovědi, podle kterého se provede kontrola. Vhodné je provést <b>zjednodušení</b> odpovědi, tj. převést na malá písmena, odstranit diakritiku a mezery nebo tečku na konci. <a href="https://github.com/Jahoda/otazka-proti-spamu">Hotové řešení</a>.</p>

<h3 id="opsani-kodu">Opsání kódu z obrázku</h3>
<p>Často je k vidění ochrana, kterou obstarává <b>obrázková CAPTCHA</b>. Osobně toto řešení nemám moc rád, protože je značně obtěžující a skutečný člověk má často větší <b>problém s rozluštěním</b> něž robot.</p>

<p>Zvlášť iritující je, když špatné opsání obrázku způsobí <b>zahození obsahu formuláře</b> a nezbývá než vyplňovat znovu.</p>

<h3 id="captcha">Alternativa k opisování textu</h3>

<p>Jelikož opisování textu z obrázku bývá často obtížnější pro živého člověka než pro robota, existují varianty, které fungují jinak.</p>

<div class="internal-content">
  <ul>
    <li><a href="/recaptcha">Google reCAPTCHA</a> – sleduje chování uživatele během vyplňování formuláře</li>
  </ul>
</div>
<div class="external-content">
  <ul>
    <li><a href="http://rocaptcha.com">RoCaptcha</a> – pro úspěšné splnění je třeba otočit obrázek do přímé polohy</li>
  </ul>
</div>

<h3 id="kontrola-ip">Kontrola IP adresy</h3>
<p>U českého webu se většina spamu objevuje z nečeských IP adres. Toto můžeme detekovat (<a href="https://github.com/maxmind/GeoIP2-php">řešení v PHP</a>) a v takovém případě registraci / přidání komentáře požadovat trochu otravnější kontrolu. Třeba výše zmíněnou <b>kontrolní otázku</b> (bez JS vyplnění) nebo <b>obrázkovou CAPTCHU</b>.</p>

<h2 id="lide">Spamující lidé</h2>
<p>Úplně nová situace nastává v okamžiku, kdy začnou spamovat skuteční lidé. Ty těžko výše uvedené kontroly zastaví.</p>

<p>Ani <b>zabanování IP adresy</b> není vše spásné řešení, protože spammer může přijít přes <a href="/php-proxy">proxy</a>.</p>

<h3 id="cizojazycny-spam">Cizojazyční spammeři</h3>
<p>Občas masivně ručně spamují cizinci. V takovém případě je někdy řešení <b>odříznou celý rozsah IP adres</b>. Nebo v případě českého webu vymyslet nějaký test, kterým <b>cizinec neprojde</b>. To je při dnešních schopnostech <b>online překladačů</b> a <b>vyhledávačů textu i obrázků</b> dost obtížné.</p>

<p>Nicméně obrázek Karla Gotta proti <a href="http://blog.havrlant.cz/post/50675743993/jak-jsme-bojovali-proti-spamujicim-bangladesanum">spamujícím Bangladéšanům</a> snad zatím stačí.</p>

<h3 id="domaci-spam">Domácí spammeři</h3>
<p>U českých spammerů je situace úplně nejtěžší a v podstatě rozumně neřešitelná. Lze ale škůdcům házet klacky pod nohy, bohužel většinou i slušným návštěvníkům.</p>

<ol>
  <li><b>Zablokování IP adresy</b> — lze obejít přes proxy, může postihnout i slušného návštěvníka se stejnou IP.</li>
  <li><b>Blokování slov / URL</b> — když spammerovi zablokujeme vložení slov, která se nacházejí v odkazech na jeho weby, ztratí pro něj spamování smysl. Bohužel může využít v podstatě nekonečnou zásobu <b>zkracovačů adres</b>. Teoreticky by šlo dohledat případné HTTP přesměrování, ale při přesměrování JavaScriptem nebo <code>&lt;meta refresh></code> značkou už to bude značně obtížné.</li>
  <li><b>Registrace/přihlášení přes Facebook, Twitter, Google</b> — budeme-li vyžadovat pro vkládání obsahu registraci účtem třetích stran, dost to spammerovi znesnadníme. Pro nový účet bude potřebovat identitu z některé výše uvedené služby, což je relativně pracné. Problém je, že takto odřízneme i neškodící uživatele, které zmíněné služby nechtějí používat.</li>
  <li><b>Ověření dopisem</b> — ještě extrémnější varianta předchozího. Zašle se zájemci o registraci na zadanou adresu dopis s aktivačním kódem. Odradí značné množství slušných návštěvníků. Navíc to něco to stojí.</li>
  <li><b>Ověření SMS zprávou</b> — není tolik otravné jako dopis a někdy ani tolik jako registrace na sociálních sítích. Získávat stále nová čísla je pro spammera docela pracné.</li>
  <li><b>Registrace na doporučení / ruční schvalování</b> — nový člověk se může registrovat, jen když ho někdo ze stávajících uživatelů pozve/doporučí/schválí.</li>
  <li><b>Moderování diskuse/komentářů</b> — ideální je, když častí účastníci diskuse mají oprávnění k likvidaci spamu. Pokud moderátoři konají rychle, spammera to zpravidla přestane bavit. Je vhodné, aby bylo snazší <b>spam vymazat</b> než <b>nový spam vytvořit</b>.</li>
  <li><b>Uživatelské úrovně</b> — první příspěvek musí někdo ručně schválit, tím se uživatel stane důvěryhodným a další příspěvky se zobrazují rovnou. Schvalování může být případně jen u příspěvků obsahující odkazy.</li>
  <li><b>Časový limit pro nové příspěvky</b> — v závislosti na počtu příspěvků, které člověk zaslal, má určitou minimální prodlevu mezi příspěvky. Tedy zpočátku musí po vložení komentáře čekat několik desítek minut nebo několik hodin, aby mohl přispět znovu. Není tak možné stránku hromadně zaspamovat, ale celkem to brání vstupu nových lidí do diskuse, protože je prodleva po první zprávě odradí.</li>
</ol>