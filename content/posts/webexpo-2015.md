---
title: "WebExpo 2015"
headline: "WebExpo 2015"
description: "O víkendu proběhl již 8. ročník webové konference WebExpo. Co jsem se tam dozvěděl?"
date: "2015-09-17"
last_modification: "2015-09-21"
status: 1
tags: ["konference"]
format: "html"
---

<p>Článek vyšel na serveru Zdroják.cz:</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.zdrojak.cz/clanky/probehlo-webexpo-2015/">O víkendu proběhlo WebExpo 2015</a></li>
  </ul>
</div>

<!--<p>Letošní WebExpo se konalo opět v centru Prahy – jednotlivé přednáškové místnosti a prostory k odpočinku a občerstvení byly rozprostřeny v a poblíž paláce Lucerna, kousek od Václavského náměstí.</p>

<p>Přednášky se odehrávaly souběžně na čtyřech místech:</p>

<ul>
  <li>Kino Licerna</li>
  <li>Lucerna Music bar</li>
  <li>Divadlo ABC</li>
  <li>Kino Světozor</li>
</ul>



<p>Jednotlivá vystoupení potom byla rozdělena do kategorií: <b>Development</b>, <b>Business</b>, <b>Design</b> a ostatní. Tématické rozdělení nesouviselo s umístěním přednášky, takže pokud člověk preferoval jeden z typů přednášek, musel se přesouvat.</p>

<p>Na přesun bylo většinou dost času a vzdálenost minimální, takže s tím nebyl problém.</p>

<p>Vzhledem k tomu, že se za sobotu a neděli konalo 80 přednášek na čtyřech místech zároveň, výsledný dojem se může snadno lišit v závislosti na zvoleném programu.</p>

<p>Nyní k samotnému obsahu:</p>







<h2>Building Your Own Recommender Engine with Machine Learning</h2>

<p>Na úvod <b>Seth Juarez</b> (<a href="https://twitter.com/sethjuarez">@sethjuarez</a>) z Microsoftu přednesl úvod do strojového učení.</p>


<p><a href="http://webexpo.cz/praha2015/prednaska/building-your-own-recommender-engine-with-machine-learning/">Detail přednášky</a></p>




<h2>Continuous Integration &amp; Delivery v Avastu</h2>

<p><b>Michal Augustýn</b> (<a href="https://twitter.com/AugiCZ">@AugiCZ</a>) popisoval způsob nasazování kódu s novými funkcemi v Avastu.</p>

<p>Průběžná integrace spočívá ve velmi rychlém nasazování nových funkcí na testovací a později produkční servery.</p>

<p>Podmínkou je rozdělení práce na jednotlivých úkolech na krátké úseky, kdy se v ideálním případě mohou nové vlastnosti aplikovat několikrát denně.</p>

<p>Dále je nutné mít automatisované testy a dokázat nasadit novou versi <i>stisknutím jednoho tlačítka</i>.</p>

<p>Nová aplikace se v ideálním případě může nejprve spustit pro omezenou skupinu lidí pro otestování náročnosti na hardware.</p>

<p><a href="http://webexpo.cz/praha2015/prednaska/continuous-integration-delivery-v-avastu/">Detail přednášky</a></p>





<h2>Automatické nástroje pro kvalitní CSS</h2>

<p><b>Robin Pokorný</b> (<a href="https://twitter.com/robinpokorny">@robinpokorny</a>) zmínil techniky, jaké nástroje pro psaní CSS používat, pro snížení šance vytvořit chyby.</p>

<p>Od prostého zvýrazňování syntaxe, které snadno odhalí překlep v názvu vlastnosti, po nástroje znázorňující změny na screenshotech před a po změně. Tento postup je problematický, protože vždy musí někdo určit, že <i>teď je to správně</i>. Navíc se výsledek mění při změně HTML.</p>

<p>Dále zmíněný postup používající porovnání na základě výsledné hodnoty stylu pomocí JS metody <code>getComputedStyle</code> zase naráží na to, že značně duplikuje původní CSS.</p>


<p>Na závěr byl představen návrh <a href="http://robinpokorny.github.io/at-should/">CSS pravidla <code>@should</code></a>, které by mohlo sloužit pro automatické testování, zda struktura HTML odpovídá CSS:</p>

<pre><code>.foo {
  @should match ".boo";
  color: green;
}</code></pre>


<p><a href="http://webexpo.cz/praha2015/prednaska/automaticke-nastroje-pro-kvalitni-css/">Detail přednášky</a></p>








<h2>From callbacks to promises</h2>

<p>Italský řečník <b>Vincenzo Chianese</b> (<a href="https://twitter.com/D3DVincent">@D3DVincent</a>) představil programování v JavaScriptu pomocí tzv. <i>promises</i>. Což je způsob, jak tvořit elegantnější kód bez callbacků.</p>

<p>O <i>příslibech</i> napsal před rokem výborný článek v češtině <b>Lukáš Havrlant</b>: <a href="http://programio.havrlant.cz/prisliby-v-javascriptu/">Přísliby v JavaScriptu</a></p>

<p><a href="http://webexpo.cz/praha2015/prednaska/automaticke-nastroje-pro-kvalitni-css/">Detail přednášky</a></p>




<h2>Nová syntaxe v JavaScriptu ES6 a ES7</h2>

<p><b>Tomáš Holas</b> (<a href="https://twitter.com/tomaash">@tomaash</a>) popsal novinky v JavaScriptu – třeba používání tříd, dekorátorů.</p>

<p>Ačkoliv doba, kdy novinky z ES6/7 budou prohlížeče dobře podporovat, nastane za mnoho a mnoho let, díky nástrojům pro převod do <i>kompatibilního JavaScriptu</i> lze hezčí zápisy používat už dnes.</p>

<p><a href="http://webexpo.cz/praha2015/prednaska/nova-syntaxe-v-javascriptu-es6-a-es7/">Detail přednášky</a></p>




<h2>The Principles of Responsive Web Design</h2>

<p>Přednáška od <b>Paula Roberta Lloyda</b> (<a href="https://twitter.com/paulrobertlloyd">@paulrobertlloyd</a>) byla z mého pohledu nejslabší.</p>

<p>Podle počtu lidí, co ze sálu v průběhu odešlo nebo se věnovali svým mobilům a tabletů, jsem na tom nebyl sám.</p>

<p>Přednáška byla z mého pohledu hodně teoretická a ne moc poutavá.</p>

<p><a href="http://webexpo.cz/praha2015/prednaska/the-principles-of-responsive-web-design/">Detail přednášky</a></p>




<h2>Flexibility and rigidity in frontend architecture</h2>

<p><b>Johnny Rodgers</b> (<a href="https://twitter.com/johnnyrodgersis">@johnnyrodgersis</a>) je spoluzakladatel služby <a href="https://slack.com/">Slack</a>, která slouží pro týmovou komunikaci.</p>

<p>Přednáška popisovala rozdíly v pracovním procesu při několikačlenném týmu, kdy každý člen věděl o aplikaci všechno. Po současný stav, kdy na projektu pracuje kolem 20 lidí, a nikdo už všechno znát nemůže.</p>

<p>Slack používá celkem standardní věci jako PHP, jQuery a Smarty/<a href="http://handlebarsjs.com/">Handlebars</a> šablony.</p>


<p>Trochu netradiční byl Johnnyho názor na používání frameworků a cizích knihoven, které ve Slacku postupně nahrazují vlastním řešením.</p>

<p>Frameworky se podle jeho názoru hodí hlavně v začátcích pro vytváření <i>proof of concept</i>, ale později je složité frameworky ohýbat pro aktuální potřeby.</p>

<p><a href="http://webexpo.cz/praha2015/prednaska/flexibility-and-rigidity-in-frontend-architecture/">Detail přednášky</a></p>





<h2>Architecting resilient front-ends</h2>

<p>Návrh odolného frontendu od <b>Andyho Huma</b> (<a href="https://twitter.com/andyhume">@andyhume</a>) se zabýval tím, jak zajistit zobrazení webu na mobilu do 1 vteřiny.</p>

<p>Andy dělí stahovaný obsah na 3 části:</p>

<ol>
  <li><b>Základní obsah</b> po jehož načtení už může návštěvník alespoň něco číst – tedy HTML kód a kritické CSS.</li>
  
  <li><b>Vylepšení</b> – typicky různé JavaScripty, obrázky a další prvky zpříjemňující uživatelský dojem.</li>
  
  <li><b>Zbytky</b> (<i lang="en">leftovers</i>) – reklamní a měřicí skripty, o které návštěvník nestojí.</li>
</ol>

<p>Jako hlavní překážky zdržující načítání byly zmíněny přesměrovávání, blokující CSS a JavaScripty a nakonec blokující webová písma.</p>

<p><a href="http://webexpo.cz/praha2015/prednaska/architecting-resilient-front-ends/">Detail přednášky</a></p>


<h2>Universal web apps for the best developer experience</h2>

<p><b>Daniel Steigerwald</b> (<a href="https://twitter.com/steida">@steida</a>) přejmenoval <i>isomorfní</i> aplikace na <i>universální</i>. Spolu s ním vystoupil <b>Mike Grabowski</b> (<a href="https://twitter.com/grabbou">@grabbou</a>), který se spolu s Danielem významně podílí na tvorbě vývojářského balíku <a href="https://github.com/este/este">Este.js</a>.</p>

<p>V přednášce byly zmíněny hlavní výhody jako:</p>

<ul>
  <li>Projevení změn v aplikaci po uložení souboru bez nutností obnovit stránku včetně zachování původního stavu.</li>
  
  <li>Možnost ukládání stavu pro následné jeho načtení a debugování.</li>
  
  <li>Možnost tvorby nativních mobilních aplikací pro iOS a Android v JavaScriptu.</li>
  
  <li>Upgrade JS kódu programu bez nutnosti schválení AppStore.</li>
</ul>


<p><a href="http://webexpo.cz/praha2015/prednaska/universal-web-apps-for-the-best-developer-experience/">Detail přednášky</a></p>


<h2>Design for change</h2>

<p><b>Vojta Roček</b> (<a href="https://twitter.com/VojtaRocek">@VojtaRocek</a>) popisoval svou činnost business intelligence directora jako člověka, který lidem <i>vytahuje hlavy z prdelí</i> a snaží se nastartovat změny v jejich chování.</p>

<ul>  
<li>Řada zaběhlých firem neví, proč jsou dobří a bojí se změn.</li>
<li>Správný datový analytik vždy dokáže najít nějaký rostoucí graf.</li>
<li>Řada firem má spousty dat, ale nedokáže z nich dostat nic zajímavého.</li>
</ul>

<p><a href="http://webexpo.cz/praha2015/prednaska/design-for-change/">Detail přednášky</a></p>


<h2>Designování webů v prohlížeči</h2>

<p><b>Martin Michálek</b> (<a href="https://twitter.com/machal">@machal</a>) popsal postup, kterým navrhuje a vytváří uživatelské rozhraní webů – nejprve tužkou na papír a potom přímo v prohlížeči bez používání Photoshopu nebo jiného grafického programu.</p>

<p>Tento postup vyžaduje zkušené/rychlé kodéry, pro které není problém prvky rozhraní rychle prototypovat a zkoušet.</p>

<p>Díky tvorbě HTML/CSS prototypů si jde stránku rychle osahat na různých zařízení a přijít na záludnosti už v počátcích výrobního procesu.</p>

<p>Tento postup ilustroval na redesignu webu VašeČočky.cz.</p>

<p>Martin používá přístup mobile-first, o kterém jsme před časem spolu trochu polemizovali:</p>

<ul>
  <li><a href="http://jecas.cz/mobile-first">Proč (ne)používat mobile first</a></li>
  <li><a href="http://www.vzhurudolu.cz/prirucka/mobile-first">Co je to „Mobile First“? Ale doopravdy</a></li>
</ul>

<p><a href="http://webexpo.cz/praha2015/prednaska/designovani-webu-v-prohlizeci/">Detail přednášky</a></p>




<h2>Základy webové bezpečnosti pro PR a markeťáky</h2>

<p><b>Michal Špaček</b> (<a href="https://twitter.com/spazef0rze">@spazef0rze</a>) připravil návod, jak (ne)odpovídat na dotazy ohledně zabezpečení ilustrovaný řadou konkrétních příkladů z Twitteru.</p>

<p>Stručně:</p>

<ul>
  <li>Heslo je soukromý údaj, takže by mělo putovat pouze po HTTPS.</li>
  
  <li>Pravidelné nucení ke změně hesla snižuje bezpečnost. Uživatel si zvolí slabší heslo, protože ví, že si co nevidět bude muset zapamatovat něco jiného. Dále to vede k heslům typu: <code>Heslo2014</code>, <code>Heslo2015</code> a podobně.</li>
  
  <li>Blokování správce hesel nezvyšuje bezpečnost. Uživatel si kvůli tomu zvolí jednoduší a předvídatelné heslo, aby si ho zapamatoval, místo náhodně vygenerovaného, které by uložil do password manageru.</li>
  
  <li>Není důvod omezovat maximální délku hesla nebo zakázat znaky s diakritikou. Zbytečně to snižuje sílu hesla.</li>
  
  <li>Bezpečnostní otázky typu „Jméno matky za svobodna“ snižují bezpečnost, protože jsou často snadno dohledatelné/zjistitelné. Pokud je stránka vyžaduje, doporučuje v nich Michal lhát.</li>
</ul>

<p><a href="http://webexpo.cz/praha2015/prednaska/zaklady-webove-bezpecnosti-pro-pr-a-marketaky/">Detail přednášky</a></p>





<h2>Banka v cloudu</h2>

<p><b>Ondrej Gálik</b> (<a href="https://twitter.com/ondrejgalik">@ondrejgalik</a>) popsal, jak Česká spořitelna začíná používat cloud a novější webové technologie.</p>

<p>Pro komunikaci v České spořitelně se tak začaly používat cloudové služby Googlu jako Google Docs, Google Plus a podobně.</p>

<ul>
<li>S využitím API si jde napsat vlastní internetové bankovnictví.</li>

<li>S použitím cloudu má banka jisté legislativní problémy, protože na ně zákony nejsou stavěny.</li>
  </ul>

<p><a href="http://webexpo.cz/praha2015/prednaska/banka-v-cloudu/">Detail přednášky</a></p>

<h2>Service Worker: nejdůležitější webová inovace od dob hyperlinku</h2>


<p><b>Filip Hráček</b> (<a href="https://twitter.com/filiphracek">@filiphracek</a>) živě demonstroval zaslání a zobrazení notifikace z mobilní webové aplikace na telefonu s vypnutým prohlížečem.</p>

<p>Service Worker je technologie umožňující vytvořit mobilní webovou aplikaci, která se chová více jako nativní. Service Worker je prostředník mezi prohlížečem a operačním systémem, který může zajistit notifikace, offline fungování webové aplikace a podobně.</p>


<p>Podpora je přibližně 50 % (prakticky všechna zařízení s Androidem a aktuálním prohlížečem).</p>

<p>Filip na úvod zmínil, že ačkoliv studie ukazují, že přes 80 % času tráví uživatelé v aplikacích oproti prohlížeči, neznamená to, že webová aplikace nemá smysl.</p>


<p>Značná část z aplikací je hraní her. Dále potom přes 80 % času strávených v aplikacích patří 5 nejrozšířenějším aplikacím jako Facebook, Twitter, Mapy a podobně.</p>

<p>Uživatelé tak nemusí být ochotni nativní aplikaci stahovat nebo ji nějakou významnější dobu používat.</p>

<p><a href="http://webexpo.cz/praha2015/prednaska/service-worker-nejdulezitejsi-webova-inovace-od-dob-hyperlinku/">Detail přednášky</a></p>





<h2>Enhance!</h2>

<p>Poslední přednášku WebExpa měl na svědomí <b>Jeremy Keith</b> (<a href="https://twitter.com/adactio">@adactio</a>) a velmi poutavě zmiňoval specifika HTML a CSS ve své toleranci k chybám. Kdy si s neznámou značkou, CSS selektorem nebo vlastností prohlížeč poradí.</p>

<p>Tolerance k chybám naopak neplatí u JavaScriptu, kdy selhání může znefunkčnit celý web. Z tohoto důvodu je rozumné dělat weby funkční bez JS. Ne pro lidi, kteří ho mají vypnutý, ale pro případ, že náhodou selže.</p>

<p>Jako analogii k tomu uvedl výtah vs. jezdící schody při výpadku elektřiny. Zatímco výtah je při výpadku nepoužitelný, jezdící schody jsou alespoň schody.</p>

<p>Jeremy dále zmínil <b>výhodu mobilních webových aplikací</b> oproti nativním aplikacím – nativní aplikace sice může být na daném zařízení lepší, mobilní web je universální a (nějak) funkční na širokém spektru zařízení.</p>


<p>HTML má tak stabilní základy, že i 20 stará stránka dnes normálně funguje. Stejně tak rozumně navržená stránka funguje i v 20 let starém prohlížeči.</p>

<p>Taktéž je HTML <a href="http://jecas.cz/responsivni-web#html">samo o sobě responsivní</a>, takže jde o to výsledek webu při <i>rozšiřování</i> nepokazit.</p>

<p>Závěrečná myšlenka byla, že web nemusí vypadat stejně ve všech prohlížečích, ale měl by být nějak dostupný.</p>


<p><a href="http://webexpo.cz/praha2015/prednaska/enhance/">Detail přednášky</a></p>

<h2>Organisace</h2>

<p>Ohledně organisace jsem zaznamenal drobný problém při příchodu, kde se u stolků s visačkami utvořila fronta, takže někteří účastníci nejspíš nestihli úvodní sobotní přednášky.</p>

<ul>
  <li>Kino Světozor (356 míst)</li>
  <li>Divadlo ABC (500 míst)</li>
  <li>Kino Lucerna (453 míst)</li>
  <li>Lucerna Music bar</li>
</ul>

<h2 id="odkazy">Předchozí ročníky</h2>

<ul>
  <li><a href="https://www.zdrojak.cz/clanky/jake-webexpo-2014/">Jaké bylo WebExpo 2014</a></li>
  
  <li><a href="https://www.zdrojak.cz/clanky/webexpo-2013-byl-zatim-nejlepsi-rocnik/">WebExpo 2013 byl zatím nejlepší ročník</a></li>
</ul>

-->