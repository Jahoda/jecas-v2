---
title: "20 nejhorších chyb HTML formulářů"
headline: "20 největších chyb formulářů na webu"
description: "Jakým chybám se vyvarovat při tvorbě formulářů na webu."
date: "2014-06-23"
last_modification: "2014-06-24"
status: 1
tags: ["formulare", "napady", "ux"]
format: "html"
---

<p>Pro komunikaci ve směru <b>návštěvník → server</b> jsou formuláře jedním z nejdůležitějších prvků webu. Přesto aby člověk dobře udělaný formulář pohledal.</p>

<div>
<style>
  .tldr > p, .tldr ul, .tldr ol, .tldr pre, .tldr blockquote {display: none}
  .tldr {counter-reset: seznam;}
  .tldr h2:before {
    counter-increment: seznam;
    content: counter(seznam) ". ";
  }
</style>

<button onclick="toggle(this.parentNode, 'tldr')">TLDR přepínač</button>

<h2 id="label">Políčka bez <code>&lt;label></code>ů</h2>

<div class="live">
  <input type="checkbox"> Souhlasím s podmínkami
</div>

<p>Co je na výše uvedeném příkladu špatně? Při kliknutí na <i>Souhlasím s podmínkami</i> se <a href="/input#checkbox"><code>checkbox</code></a> nezaškrtne. Nezbývá než se trefovat do miniaturního zaškrtávacího políčka.</p>

<p>Přitom stačí jen použít značku <a href="/label-for"><code>&lt;label></code></a>.</p>

<p>Kromě <code>checkbox</code>u se tento problém týká i <code>&lt;input type=radio></code>. U obyčejných <b>textových políček</b> to tak strašné není, ale pořád je vhodné popisek k políčku připojit, je-li to možné.</p>



<h2 id="select">Nesmyslné použití <code>&lt;select></code>u</h2>

<p>Dává následující příklad smysl?</p>

<div class="live">
  <label>Souhlasíte?
  <select name="">
    <option value="">Ano</option>
    <option value="">Ne</option>
  </select>
  </label>
</div>

<p>Často je k vidění obdobné řešení. Značka <a href="/select"><code>&lt;select></code></a> se přitom nejen <a href="/stylovani-selectu">špatně styluje</a>, ale pro výběr z malého množství položek je zbytečně otravná, musí se rozkliknout nabídku a až potom vybrat konkrétní položku.</p>

<p>Použít <code>&lt;select></code> u výběru <b>z hodně položek</b> je rozumné – umožní v nabídce přeskakovat napsáním začátku nějaké položky (od <b>IE 10</b> to jde zajistit i u běžného políčka značkou <a href="/datalist"><code>datalist</code>em</a>).</p>

<p>Pro málo možností ale postačí <code>checkbox</code> nebo <code>radio</code>.</p>



<h2 id="placeholder">Popisky jako hodnota políčka</h2>

<p>Umístit popisek tlačítka do <a href="/placeholder">atributu <code>placeholder</code></a> se na první pohled může zdát u formulářů, kde <b>není moc místa</b>, jako dobrý nápad. Proč tomu tak není?</p>

<div class="live">
  <input type="text" placeholder="Jméno">
  <input type="password" placeholder="Heslo">
  <button>Přihlásit</button>
</div>

<p>V případě, že návštěvník klikne do políčka nebo do něj něco napíše, popisek zmizí. A už není možné se k němu dostat bez smazání obsahu.</p>

<p>Pokud skutečně není prostor ani pro miniaturní popisek, může posloužit ikona a třeba <a href="/js-tooltip">popisek po najetí</a>.</p>

<p>Jak řešit popisky políček detailněji rozebírá samostatný článek:</p>
  
  <div class="internal-content">
    <ul>
      <li><a href="/popis-pole">Popisek formulářového pole</a></li>
    </ul>
  </div>


<h2 id="mazani">Mazání políček</h2>
<p>Ještě horší situace nastává u hloupých řešení, které při kliknutí odstraňují předvyplněnou hodnotu zadanou jako <code>value</code>. Typicky způsobem <code>onclick="this.value = ''"</code>. V případě, že se bude člověk chtít vrátit k již vyplněnému políčku, tak si ho <b>vymaže</b>.</p>

<div class="live">
  <input type="text" value="Jméno" onclick="this.value = ''">
  <input type="text" value="Email" onclick="this.value = ''">
  <button>Odeslat</button>
</div>

<p>Lepší možnost je obsah políčka <a href="/placeholder#oznaceni">označit</a>.</p>


<h2 id="kreativita">Přílišná kreativita</h2>

<p>Při tvorbě formuláře je dobré dbát na to, aby výsledek <b>stále vypadal jako formulář</b>. Čím víc se vzhled a chování bude lišit od <i>standardu</i>, tím je větší šance, že návštěvník pořádně nepochopí, co má dělat.</p>


<h2 id="atrapy">Polofunkční JavaScriptové atrapy</h2>

<p>Jelikož <a href="/vzhled-formularu">stylování formulářů</a> není úplně jednoduché, nabízí se používat JavaScriptové atrapy, které prvek poskládají z hromady <code>&lt;div></code>ů. Na tom by nebylo přímo nic špatného, kdyby ale velká část těchto náhražek nepřinášela <b>značně nestandardní chování</b>.</p>


<h2 id="klavesnice">Nepohodlné ovládání klávesnicí</h2>

<p>Zvlášť <b>pokročilejší uživatelé</b> mají ve zvyku procházet formulářová políčka klávesou <kbd>Tab</kbd> pro přesun na další prvek (případně <kbd>Shift</kbd> + <kbd>Tab</kbd> pro návrat zpět).</p>

<p>Správný formulář by tedy měl při <kbd>Tab</kbd>ování přecházet mezi políčky v <b>rozumném pořadí</b>. Zároveň by měl počítat s tím, že ho uživatel může <b>vyplňovat ve vlastním pořadí</b>.</p>

<p>Výchozí chování pořadí jednotlivých políček respektuje umístění v HTML kódu a změnit jde atributem <code>tabindex</code>.</p>



<h2 id="odeslani-enterem">Nemožnost odeslání <kbd>Enter</kbd>em</h2>

<p>Některé formuláře odesílané bez znovunačtení stránky <a href="/ajax">AJAXem</a> mají jejich tvůrci tendenci posílat při <a href="/udalosti-mysi#onclick">události <code>onclick</code></a> na nějakém tlačítku.</p>

<div class="live">
  <form action="" onsubmit='alert("Odesláno submitem"); return false'>
    <input type="text">
    <button type="button" onclick='alert("Odesláno onclickem"); return false'>Odeslat</button>
  </form>
</div>

<p>To nemusí zafungovat, když návštěvník bude chtít poslat formulář klávesou <kbd>Enter</kbd>, když bude mít kursor v posledním políčku. Některé prohlížeče se ale snaží chovat chytře a na odesílacím tlačítku <code>onclick</code> vyvolat i při <kbd>Enter</kbd>u.</p>



<p>Řešení je používat událost <code>onsubmit</code> značky <code>&lt;form></code>.</p>

<h2 id="type">Zbytečně obecné atributy <code>type</code></h2>

<p>Zvlášť uživatelé mobilních zařízení ocení speciální typy formulářových polí jako <a href="/input#type-email"><code>email</code></a>, <a href="/input#type-tel"><code>tel</code></a> a podobně. Při kliknutí do políčka tak může prohlížeč nabídnout vhodnější podobu klávesnice. V případě typu <a href="/input#type-date"><code>date</code></a> potom třeba <b>kalendář pro zadání data</b>.</p>
  
<p><img src="/files/chyby-formularu/rozdil-text-email.png" alt="Rozdíl v klávesnici na mobilním zařízení" class="border"></p>



<h2 id="nejasna-odezva">Nejasná odezva</h2>

<p>Člověk odešle formulář, něco se provede, a není mu pořádně jasné, co se vlastně stalo. Jestli odeslání <b>proběhlo úspěšně</b> či <b>skončilo chybou</b>.</p>

<p>Proto je vhodné po provedení akce dát <b>viditelnou zpětnou vazbu</b>.</p>

<ol>
  <li>
    <p>U <b>kontaktního formuláře</b> to může znamenat přesměrovat na stránku s hláškou „Děkujeme za zprávu“.</p>
  </li>
  
  <li>
    <p>Při <b>odeslání příspěvku/komentáře</b> na něj odrolovat a <b>zvýraznit</b> ho.</p>
  </li>
</ol>


<h2 id="nejasne-hlasky">Nejasné chybové hlášky</h2>

<blockquote>
  <p>E-mail má špatný formát.</p>
</blockquote>

<p>Je dobrým zvykem místo <b>oznamování chyby</b> napsat, co má uživatel udělat, aby <b>chybu odstranil</b>. Tj. raději:</p>

<blockquote>
  <p>Zadejte e-mail ve tvaru „jmeno@domena.cz“</p>
</blockquote>



<h2 id="hlasky-po-jedne">Vypisování hlášek po jedné</h2>

<p>Kdo by to neznal. Po odeslání formuláře se objeví jediná hláška s chybou, člověk ji opraví, načež se mu po odeslání <b>objeví jiná</b> a tak dále. Zvlášť <b>nepříjemné</b> je toto chování spolu se <b>zapomínáním hodnot</b> jednotlivých políček.</p>

<p>Pro uživatele je přitom lepší všechny problémy vypsat najednou. Pro programátora by to nemělo být nijak obtížné.</p>

<p>Místo konstrukce typu:</p>

<pre><code>if (empty($jmeno)) {
  $chyba = "Zadejte jméno.";
}
elseif (strlen($jmeno) &lt; 5) {
  $chyba = "Zadejte jméno o délce alespoň 5 znaků."
}</code></pre>

<p>Stačí použít jednotlivé <code>if</code> konstrukce a chyby <b>přidávat do pole</b>. A jeho obsah potom najednou vypsat.</p>

<pre><code>echo implode("&lt;br>", $chyby);</code></pre>



<h2 id="netolerance-znaku">Netolerance alternativního zápisu</h2>

<p>Často programátoři formulářů důsledně lpí na <b>přesném tvaru</b> řetězce, co se do pole může zadat.</p>

<p>Asi základní věc je <b>oříznout bílé znaky</b> (v PHP funkce <code>trim</code>). Ty mohou snadno vzniknout při <b>kopírování obsahu</b> do formuláře.</p>

<p>Co třeba <b>zadávání URL</b>? Je nutné vyžadovat <code>http://</code> na začátku? Nemůže si to skript snadno <i>domyslet</i>?</p>

<p>Má smysl otravovat návštěvníky přesným tvarem <b>telefonního čísla</b>? Vyzobat z políčka jen čísla přece není nikterak obtížné.</p>



<h2 id="hodne-policek">Příliš mnoho políček</h2>

<p>Někdo se asi domnívá, že <b>více je lépe</b>. U formulářů a počtu jejich políček to ale moc <b>neplatí</b>. Dlouhý formulář může <b>odrazovat od vyplnění</b>.</p>

<p>Je proto dobré se zamyslet, zda by něco nešlo spojit.</p>

<ol>
  <li>Potřebujeme rozlišovat jméno uživatele na <b>jméno a příjmení</b>? Nestačilo by jedno políčko?</li>
  
  <li>Potřebujeme mít adresu rozdělenou na <b>ulici, číslo, město, zemi a PSČ</b>? Nestačila by na to jedna <code>&lt;textarea></code>?</li>
  
  <li>Potřebujeme u <b>registračního formuláře</b> zadávat pohlaví, bydliště a <i>číslo bot</i>? Nestačil by e-mail a heslo?</li>
</ol>



<h2 id="zapominani">Zapomínání hodnot</h2>

<p>Jedna z nejotravnějších věcí vůbec je, když formulář po neúspěšném odeslání <b>zapomene svůj obsah</b>. Stačí přitom jen otestovat, jestli se formulář odeslal, a v takovém případě vypsat hodnoty typu <code>$_POST["jmenoPole"]</code>. Ideálně s použitím funkce <code>htmlspecialchars($text, ENT_QUOTES)</code>, aby specifický text (třeba obsahující apostrof) nemohl narušit <b>řádné zobrazení formuláře</b>.</p>

<p>Pro delší formuláře se může hodit i ukládání do <a href="/zalohovani-formularu">lokálního úložiště</a>.</p>



<h2 id="captcha">Nečitelná CAPTCHA</h2>

<p><img src="/files/chyby-formularu/captcha.png" alt="Obrázková CAPTCHA" class="border"></p>  
  
<p>Mezi větší zla patří i nešetrná <a href="/spam">ochrana proti spamu</a>. Přepisovat některé zdeformované texty je opravdu zážitek.</p>

<p>Je dobré zvážit, zda by nestačila nějaká <b>méně otravná ochrana</b> – třeba kontrolní otázka automaticky vyplňovaná JavaScriptem.</p>
  
<p>Obrázková CAPTCHA beztak není úplná výhra. Některé podoby umí vyluštit stroj lépe než člověk. Navíc je možné k řešení <a href="http://www.root.cz/clanky/potrebujete-obejit-captcha-zaplatte-si-armadu-indu/">zaplatit armádu Indů</a>. To v případě hádanky z českého prostředí tolik nehrozí.</p>



<h2 id="nezname-formatovani">Nejasné formátování textu</h2>

<p>Na webu, kde může návštěvník <b>napsat komentář</b> nebo <b>přispět do diskuse</b>, je vhodné:</p>

<ol>
  <li>Stručně popsat, jaké formátování je možné použít.</li>
  <li>Nabídnout <b>funkci náhled</b> nebo možnost editace.</li>
</ol>

<p>Osobně se přikládám k tomu <b>náhledu</b>. Popsat <b>formátování</b>, zmínit, co se stane, když se do formuláře zapíše <b>HTML značka</b> (zmizí / převede se na entity), nebo napsat, jestli systém zvládne třeba „<a href="/uvozovky#ceske">české uvozovky</a>“ by zabralo hodně prostoru.</p>
  
<p><img src="/files/chyby-formularu/povolene-html.png" alt="Příklad výčtu povolených HTML značek" class="border"></p>



<h2 id="spravce-hesel">Nekompatibilita se správcem hesel</h2>

<p>Řada lidí používá pro ukládání přístupových údajů <b>správce hesel</b> (např. <a href="https://lastpass.com/">LastPass</a>), je proto dobré, aby náš formulář takový správce dobře pochopil a byl tedy schopný registrační údaje uložit a potom je <b>použít pro přihlášení</b>.</p>
  
<p><img src="/files/chyby-formularu/last-pass.png" alt="Použití LastPass" class="border"></p>

<p>Z tohoto důvodu je i vhodné, aby se přihlašovací formulář odesílal na <b>stejnou doménu</b>. Tímto problémem trpí například <a href="http://seznam.cz">Seznam.cz</a>, takže vyvolává v LastPassu <b>bezpečnostní upozornění</b>.</p>
  
<p><img src="/files/chyby-formularu/seznam-login.png" alt="Problém s přihlášením na Seznamu" class="border"></p>



<h2 id="ziva-validace">Živá validace se „zelenou fajfkou“</h2>

<p>Čím dál populárnění je tzv. <b>živá validace</b> formulářových políček AJAXem. To je na jednu stranu hezké, že formulář ihned napíše, že <i>zadané jméno je již obsazené</i> a podobně, na druhou stranu je ale potřeba zvážit, zda <i>zelená fajfka</i> nedá uživateli <b>falešný pocit</b>, že políčko vyplnil správně.</p>

<p>Skriptem odsouhlasený formát e-mailu totiž <b>nezajišťuje</b>, že se uživatel nepřeklepl, proto mi přijde lepší raději <b>jen upozorňovat na chyby</b>.</p>



<h2 id="vicenasobne-odeslani">Vícenásobné odeslání</h2>

<p>To je většinou problém spíš majitele serveru, ale ani např. <b>autora komentáře</b> nemusí těšit, že se jeho příspěvek na stránce objeví vícekrát.</p>

<p>Řešení je přitom snadné. Po uložení příspěvku přesměrovat hlavičkou <code>Header</code>:</p>

<pre><code>&lt;?php
header("Location: stranka.php");</code></pre>
  
</div>