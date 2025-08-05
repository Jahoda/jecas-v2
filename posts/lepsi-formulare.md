---
title: "Jak na lepší formuláře"
headline: "Jak na lepší formuláře"
description: "Jak vytvořit lepší formulář, který se bude návštěvníkům dobře vyplňovat."
date: "2014-12-01"
last_modification: "2014-12-01"
status: 0
tags: []
format: "html"
---

<p>Samotné vyplňování formulářů je <b>nepříjemná záležitost</b>, proto je dobré tuto nepříjemnou činnost návštěvníkům webových stránek ještě více <b>neznepříjemňovat</b>.</p>

<p>O věcech, kterým se vyvarovat, pojednává článek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/chyby-formularu">20 největších chyb formulářů na webu</a></li>
  </ul>
</div>


<p>Tento článek se věnuje zlepšování uživatelského zážitku:</p>



<h2 id="typy">Speciální typy políček</h2>

<p>Zvlášť na mobilních zařízeních uživatelé ocení určení typu formulářového políčka <a href="/input"><code>&lt;input></code></a>. Prohlížeč dotykového zařízení díky tomu dokáže přizpůsobit klávesnici.</p>

<p>Například u políčka <code>type="email"</code> zobrazit na klávesnici zavináč, při <code>type="number"</code> zobrazit numerickou klávesnici a podobně.</p>

<div class="external-content">
  <ul>
    <li><a href="http://inputtypes.com/">INPUT TYPE SANDBOX</a> – nástroj pro snadné vyzkoušení si různých typů</li>
    <li><a href="http://baymard.com/blog/mobile-touch-keyboards">'Touch Keyboard' Implementations Have Improved Just 9% Since 2013 (60% Still Get it Wrong)</a> – tipy na lepší nastavení klávesnice u dotykových zařízení</li>
  </ul>
</div>



<h2 id="program">Ať to řeší program</h2>

<p>Zásadní myšlenkou je věci, co může řešit <b>program</b>, nenutit řešit <b>uživatele</b>.</p>

<ul>
  <li>
    <p>Nesmí být na začátku nebo konci políčka mezera? Snadno se do políčka dostane třeba při kopírování a jde ji odstranit jedním řádkem kódu funkcí <code>trim</code>.</p>
  </li>
  
  <li>
    <p>Je nutné telefonní číslo zadat striktně v určitém formátu?</p>
    
    <ul>
      <li>+420 123 456 789</li>
      <li>123 456 789</li>
      <li>123-456-789</li>
      <li>123456789</li>
    </ul>
    
    <p>Různí uživatelé mohou preferovat různý formát. Případně mohou číslo odněkud zkopírovat. Není přece tak těžké tyto formáty sjednotit.</p>
  </li>
</ul>





<h2 id="mene-policek">Co nejméně políček</h2>

<p>Před dokončením nového formuláře se je dobré zamyslet, jestli je skutečně <b>každé políčko nezbytné</b>. Zda by se nedalo více políček sloučit do jednoho a podobně.</p>

<p>Proč je <b>hodně políček problém</b>?</p>

<p>Psaní do každého políčka představuje minimálně režii pro <b>přesun do dalšího pole</b>. Ne každý zná klávesu <kbd>Tab</kbd>, bez které je mezi vyplňováním dvou polí nutné sahat na myš pro <b>přesun kursoru</b>.</p>

<p>Na <b>mobilním zařízení</b> to potom může být ještě horší.</p>

<ol>
  <li>kliknutí do políčka,</li>
  
  <li>vysune se klávesnice</li>
  
  <li>vyplnění políčka,</li>
  
  <li>potvrzení,</li>
 
  <li>zmizí klávesnice,</li>
  
  <li>odrolování na další políčko,</li>
  
  <li>kliknutí do políčka…</li>
</ol>

<p>Menší počet políček znamená <b>rychlejší</b> vyplnění formuláře.</p>






<h3 id="jmeno-prijmeni">Jedno pole pro jméno a příjmení</h3>

<p>Otázka jediného políčka pro <b>jméno a příjmení</b> je lehce kontroversní. Zastánci rozdělení argumentují většinou následovně:</p>

<ol>
  <li><p>Co když budu chtít <b>seřadit uživatele podle příjmení</b>?</p></li>
  
  <li><p>Co když budu chtít uživateli <b>popřát k svátku</b>? Má uživatel Václav Havel svátek na Havla, nebo na Václava?</p></li>
  
  <li><p>Jak uživatele <b>oslovím v e-mailu</b> jeho vyskloňovaným jménem/příjmením?</p></li>
  
  <li><p>Co když budu chtít jméno vypsat ve tvaru „Jan NOVÁK“ nebo „Novák, Jan“?</p></li>
</ol>

<p>Domnívám se, že nic nebrání programátorovi, aby pro takový případ interně <b>jméno a příjmení</b> rozdělil podle mezery.</p>


<div class="live no-source">
  <p><label>Jméno a příjmení: <input oninput="vypsat(this)"></label></p>
  <div id="jmenoPrijmeni"></div>
</div>

<p>Může se stát, že část uživatelů příjmení a jméno <b>prohodí</b>, ale to už <b>je jejich boj</b>. Význam správného pořadí bude v drtivé většině případů zcela <b>zanedbatelný</b> oproti komplikaci při vyplňování formuláře.</p>

<p>Další věc, co jediné pole řeší, jsou situace, kdy:</p>

<ol>
  <li>člověk má <b>jen jedno jméno</b> (co má zadat do dvou povinných políček?),</li>
  <li>člověk má <b>více než dvě jména</b></li>
</ol>



<h3 id="skryvani">Skrývání nepodstatných částí</h3>

<p>Kromě slučování polí je často možné některá pole nebo <b>celé části formuláře</b> skrýt. Ideální je zobrazovat pouze <b>relevantní pole</b> – pokud například v <b>internetovém obchodu</b> zákazník vybere způsob doručení jako <b>osobní odběr</b>, je nejspíš zbytečné po něm požadovat jeho domácí <b>adresu</b>.</p>




<h2 id="minimum">Nežádat nic navíc</h2>

<p>Jistě by bylo zajímavé o uživateli vědět úplně všechno.</p>


<h2 id="autocomplete">Automatické vyplňování</h2>

<p>Při použití rozšířených názvů políček dokáže řada prohlížečů automaticky napovídat tyto zapamatované hodnoty.</p>



<h2 id="zobrazeni-hesla">Zobrazení hesla</h2>

<p>Maskování hesla pomocí hvězdiček vytváří ilusi bezpečnosti a komplikuje zadávání hesla.</p>

<p>Je proto dobré, když jde heslo přepnout do viditelné podoby. Většina prohlížečů to zatím řešit neumí, takže je jim nutné pomoci JavaScriptem.</p>

<p>Více o maskování hesel v samostatném článku:</p>

<div class="internal-content">
  <ul>
    <li><a href="/maskovani-hesla">Maskování a zobrazování hesla ve formuláři</a></li>
  </ul>
</div>






<h2 id="ukladani">Průběžné ukládání</h2>

<p>Není nic horšího, než když se pracně vyplněná data ztratí. Díky <a href="/localstorage">lokálnímu úložišti</a> není problém <b>ukládat úplně každou změnu</b>, kterou uživatel provedl, a to ihned v okamžiku jejího provedení (napsání znaku, výběru položky).</p>




<h2 id="akce">Jasná akce</h2>

<p>Mělo by být na první pohled jasné, kterým tlačítkem se formulář odešle.</p>



<h2 id="opravovani-emailu">Opravování e-mailů</h2>

<p>Užitečná funkce může být snaha <b>opravit e-mailové adresy</b> známých poskytovatelů.</p>

<p>Pokud člověk zadá e-mail ve tvaru <code>pepa@se<b>y</b>nam.cz</code>, je na 99 % pravděpodobné, že chtěl napsat <code>pepa@seznam.cz</code>, ale spletl si QWERTZ a QWRTY rozložení <a href="/ceska-klavesnice">klávesnice</a>.</p>

<p>Příklady <b>překlepů</b>.</p>

<ul>
  <li><code>seynam.cz</code></li>
  <li><code>seznm.cz</code></li>
  <li><code>sezna.cz</code></li>
  <li><code>seznam.com</code></li>
  <li><code>sznam.cz</code></li>
  <li><code>senam.cz</code></li>
  <li><code>szenam.cz</code></li>
  <li><code>saznam.cz</code></li>
</ul>

<p>Podívat se na překlepy uživatelů ve vlastním systému je možné <b>SQL dotazem</b> typu:</p>

<pre><code>SELECT * FROM uzivatele
WHERE `email` NOT LIKE '%seznam.cz%'
AND `email` LIKE '%<b>znam.</b>%'</code></pre>

<p>Kromě překlepů v názvu domény se vyskytují i <b>chybné koncovky</b>.</p>

<ol>
  <li>
    <p>Jednak <b>překlepy</b>:</p>
    <ul>
      <li><code>domena.cu</code></li>
      <li><code>domena.ct</code></li>
      <li><code>domena.cy</code></li>
    </ul>
  </li>
  
  <li>
    <p><b>Změna koncovky</b> – prohození <code>cz</code> za <code>com</code> a obráceně.</p>
    
    <ul>
      <li><code>seznam.com</code></li>
      <li><code>google.cz</code></li>
      <li><code>hotmail.cz</code></li>
    </ul>
  </li>
</ol>

<p>V takových případech je proto dobré uživateli <b>zobrazit hlášku</b>, jestli nechtěl náhodou napsat <b>jiný tvar</b>, která po kliknutí provede změnu.</p>

<p>Kromě lepšího komfortu pro uživatele má tato kontrola další positivum – při rozesílání hromadných mailů se podaří obeslat <b>více lidí</b> a hrozí menší risiko penalisace za odesílání zpráv <b>na neexistující adresy</b>.</p>


<div class="external-content">
  <ul>
    <li><a href="https://github.com/mailcheck/mailcheck">
mailcheck.js</a></li>
  </ul>
</div>

<h3 id="nejcastejsi">Nejčastější provozovatelé e-mailu</h3>

<p>V České republice má nejvíce uživatelů e-mail na adresách:</p>

<ul>
  <li>seznam.cz</li>
  <li>gmail.com</li>
  <li>centrum.cz</li>
  <li>email.cz</li>
  <li>volny.cz</li>
  <li>azet.sk</li>
  <li>centrum.sk</li>
  <li>atlas.cz</li>
  <li>tiscali.cz</li>
  <li>post.cz</li>
</ul>

<h2 id="popisky">Popisky formulářových polí</h2>

<div class="external-content">
  <ul>
    <li><a href="http://codepen.io/chriscoyier/pen/CiflJ">Odjetí popisku mimo</a></li>
    
    <li><a href="http://codepen.io/oknoblich/pen/wFGIH">Jiné řešení</a></li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://www.youtube.com/watch?v=nmKMz3Fg76M">Luke Wroblewski Part 2 - Conversions@Google 2014</a></li>
  
  <li><a href="http://speckyboy.com/2015/03/30/10-methods-for-optimizing-your-forms-for-mobile-devices/">10 Methods for Optimizing Your Forms for Mobile Devices</a></li>
  
  <li><a href="http://www.slideshare.net/AaronGustafson/falling-in-love-with-forms-microsoft-edge-web-summit-2015">Falling in Love with Forms [Microsoft Edge Web Summit 2015]</a> – presentace obsahující tipy, jak zlepšit formuláře</li>
  
  <li>Sitepoint.com: <a href="http://www.sitepoint.com/ux-design-passwords-registration-forms/">UX Design for Passwords and Registration Forms</a></li>
</ul>











<script>
  function vypsat(el) {
    var rozdelit = el.value.trim().split(" ");
    var jmeno = rozdelit[0];
    rozdelit.splice(0, 1);
    var prijmeni = rozdelit.join(" ");
    if (prijmeni.length == 0) {
      prijmeni = jmeno;
      jmeno = "";
    }
    jmenoPrijmeni.innerHTML = "<li>Jméno: " + jmeno + "<li>Příjmení: " + prijmeni;
  }
</script>