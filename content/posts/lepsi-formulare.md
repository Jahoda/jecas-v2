---
title: "Jak na lepší formuláře"
headline: "Jak na lepší formuláře"
description: "Jak vytvořit lepší formulář, který se bude návštěvníkům dobře vyplňovat."
date: "2014-12-01"
last_modification: "2025-09-12"
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

<p><img src="/files/lepsi-formulare/ux-form-200.svg" alt="Ilustrační obrázek: formulář s moderními atributy" class="border" width="200" height="200" /></p>



<h2 id="typy">Speciální typy políček</h2>

<p>Zvlášť na mobilních zařízeních uživatelé ocení určení typu formulářového políčka <a href="/input"><code>&lt;input></code></a>. Prohlížeč dotykového zařízení díky tomu dokáže přizpůsobit klávesnici.</p>

<p>Například u políčka <code>type="email"</code> zobrazit na klávesnici zavináč, při <code>type="number"</code> zobrazit numerickou klávesnici a podobně.</p>

<p>Pro přesnější ovlivnění klávesnice a chování použijte i atributy <code>inputmode</code> (např. <code>numeric</code>, <code>decimal</code>, <code>tel</code>) a <code>enterkeyhint</code> (např. <code>send</code>, <code>search</code>). Pro lepší autofill nastavte správně <code>autocomplete</code> (např. <code>name</code>, <code>email</code>, <code>street-address</code>, <code>one-time-code</code>).</p>

<div class="external-content">
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types">MDN: Typy vstupů</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode">MDN: inputmode</a></li>
    <li><a href="https://web.dev/learn/forms/">web.dev: Learn Forms</a></li>
    <li><a href="https://baymard.com/blog/mobile-touch-keyboards">Baymard: Touch keyboards on mobile</a></li>
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

<p>Myslete na <b>minimalizaci údajů</b> – sbírejte jen to, co je nezbytné pro daný účel. Z hlediska GDPR je to nejen ohleduplné, ale i povinnost.</p>


<h2 id="autocomplete">Automatické vyplňování</h2>

<p>Při použití rozšířených názvů políček dokáže řada prohlížečů automaticky napovídat tyto zapamatované hodnoty.</p>

<p>Správně vyplněný atribut <code>autocomplete</code> výrazně zrychluje vyplňování a snižuje chybovost. Používejte konkrétní tokeny jako <code>name</code>, <code>given-name</code>, <code>family-name</code>, <code>email</code>, <code>tel</code>, <code>street-address</code>, <code>postal-code</code>, <code>country</code>, <code>cc-number</code>, <code>new-password</code>, <code>current-password</code>, <code>one-time-code</code>.</p>

<pre><code>&lt;input type="text" name="name" autocomplete="name">
&lt;input type="email" name="email" autocomplete="email" inputmode="email">
&lt;input type="text" name="otp" autocomplete="one-time-code" inputmode="numeric" enterkeyhint="done">
</code></pre>

<div class="external-content">
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete">MDN: autocomplete</a></li>
    <li><a href="https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill">WHATWG: Autofill detail</a></li>
  </ul>
</div>



<h2 id="zobrazeni-hesla">Zobrazení hesla</h2>

<p>Maskování hesla pomocí hvězdiček vytváří ilusi bezpečnosti a komplikuje zadávání hesla.</p>

<p>Je proto dobré umožnit přepnutí do viditelné podoby. Moderní prohlížeče a správci hesel toto běžně podporují; pokud přidáváte vlastní přepínač, dbejte na přístupnost a nezakazujte vkládání ze schránky. Použijte správné <code>autocomplete</code> tokeny <code>new-password</code> a <code>current-password</code>.</p>

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
  <li>email.cz</li>
  <li>centrum.cz</li>
  <li>outlook.com</li>
  <li>icloud.com</li>
  <li>post.cz</li>
  <li>volny.cz</li>
  <li>azet.sk</li>
  <li>centrum.sk</li>
</ul>

<h2 id="popisky">Popisky formulářových polí</h2>

<div class="external-content">
  <ul>
    <li><a href="https://codepen.io/chriscoyier/pen/CiflJ">Odjetí popisku mimo</a></li>
    
    <li><a href="https://codepen.io/oknoblich/pen/wFGIH">Jiné řešení</a></li>
  </ul>
</div>

<p>Nepoužívejte <b>placeholder</b> jako náhradu za <b>label</b>. Kvůli přístupnosti by měl mít každý prvek formuláře viditelný popisek propojený přes <code>&lt;label for></code>.</p>


<h2 id="validace-a-chyby">Validace a chyby</h2>

<ul>
  <li>Provádějte inline validaci s rozumem. Chyby zobrazujte po opuštění pole nebo při odeslání.</li>
  <li>Vytvořte přehled chyb nahoře na stránce s odkazy na konkrétní pole.</li>
  <li>Propojíte pole s chybou pomocí <code>aria-describedby</code> a oznamte změnu přes <code>aria-live</code>.</li>
</ul>

<div class="live no-source">
  <form id="demo-form" novalidate>
    <div role="alert" aria-live="polite" id="error-summary"></div>
    <p><label for="email-demo">E‑mail</label><br>
    <input id="email-demo" name="email" type="email" required aria-describedby="email-demo-error" autocomplete="email" inputmode="email"></p>
    <p id="email-demo-error" class="error" role="alert"></p>
    <p><button type="submit">Odeslat</button></p>
  </form>
</div>


<h2 id="pristupnost">Přístupnost</h2>

<ul>
  <li>Vždy viditelné <code>&lt;label></code>, ne <code>placeholder</code> místo popisku.</li>
  <li>Skupiny polí obalte do <code>&lt;fieldset></code> s <code>&lt;legend></code>.</li>
  <li>Zřetelné <code>:focus-visible</code> styly a dostatečný kontrast.</li>
  <li>Na mobilu cíl nejméně 44×44 px, logické pořadí Tab.</li>
</ul>

<h3 id="pristupnost-styly">Ukázka stylů focus a chyb</h3>
<pre><code>input:focus-visible,
select:focus-visible,
textarea:focus-visible,
button:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}

input[aria-invalid="true"],
select[aria-invalid="true"],
textarea[aria-invalid="true"] {
  border-color: #dc2626;
  background-color: #fef2f2;
}

.error {
  color: #dc2626;
}
</code></pre>


<h2 id="klavesnice-flow">Klávesnice a tok</h2>

<ul>
  <li>Smysluplné <code>enterkeyhint</code> podle kontextu.</li>
  <li>Po odeslání zamezit vícenásobnému kliknutí a zobrazit stav odesílání.</li>
  <li>Po chybě přesunout fokus na první chybné pole.</li>
</ul>

<pre><code>&lt;input type="search" name="q" enterkeyhint="search" autocomplete="off">
&lt;input type="email" name="email" autocomplete="email" inputmode="email" enterkeyhint="next">
</code></pre>


<h2 id="i18n-formaty">i18n a formáty</h2>

<ul>
  <li>Buďte tolerantní k formátům telefonu a PSČ (mezery, pomlčky).</li>
  <li>Jména a adresy nemají univerzální strukturu. Volte minimum povinných polí.</li>
  <li>U čísel a dat zvažte lokální formát a jasné příklady hodnot.</li>
</ul>


<h2 id="bezpecnost-prihlaseni">Bezpečnost a přihlášení</h2>

<ul>
  <li>Podporujte správce hesel a neblokujte vložení ze schránky.</li>
  <li>U OTP použijte <code>autocomplete="one-time-code"</code> a <code>inputmode="numeric"</code>.</li>
  <li>Uveďte jasné požadavky na heslo a průběžný indikátor síly.</li>
</ul>

<pre><code>&lt;input name="otp" autocomplete="one-time-code" inputmode="numeric" enterkeyhint="done" maxlength="6">
</code></pre>


<h2 id="vykon-pe">Výkon a progressive enhancement</h2>

<ul>
  <li>Preferujte vestavěné HTML validace a Constraint Validation API.</li>
  <li>Debouncujte náročné asynchronní kontroly (např. dostupnost uživatelského jména).</li>
  <li>Chyby zobrazujte bez poskakování layoutu.</li>
</ul>


<h2 id="nahravani-souboru">Nahrávání souborů</h2>

<ul>
  <li>Nastavte <code>accept</code> a limit velikosti, zobrazte náhledy.</li>
  <li>Podpořte drag&drop a vložení ze schránky.</li>
  <li>Na mobilu zvažte <code>capture</code> pro fotoaparát/mikrofon.</li>
</ul>

<pre><code>&lt;input type="file" accept="image/*" multiple capture="environment">
</code></pre>


<h2 id="antispam">Antispam</h2>

<ul>
  <li>Honeypot a minimální doba vyplnění.</li>
  <li>Lehké heuristiky místo těžkých CAPTCHA.</li>
  <li>Serverová validace vždy rozhoduje.</li>
</ul>

<h3 id="honeypot">Honeypot</h3>
<div class="live no-source">
  <form autocomplete="off">
    <div class="hp">
      <label for="company">Firma</label>
      <input id="company" name="company" type="text" tabindex="-1" autocomplete="off">
    </div>
    <p><label for="email-hp">E‑mail</label><br>
    <input id="email-hp" name="email" type="email" autocomplete="email"></p>
    <p><button type="submit">Odeslat</button></p>
  </form>
</div>

<pre><code>.hp {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</code></pre>


<h2 id="mikrocopy-duvera">Mikrocopy a důvěra</h2>

<ul>
  <li>Vysvětlete, proč pole potřebujete a jak bude údaj použit.</li>
  <li>Uveďte příklady hodnot, šetřete povinnými poli.</li>
  <li>Jasné odkazy na zásady zpracování údajů a souhlasy.</li>
</ul>


<h2 id="mereni">Měření</h2>

<ul>
  <li>Sledujte opuštění klíčových polí a kroků, optimalizujte na základě dat.</li>
  <li>Preferujte self‑hosted analytics a agregovaná data.</li>
  <li>Testujte A/B pořadí polí a nápovědy.</li>
</ul>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://web.dev/learn/forms/">web.dev: Learn Forms</a></li>
  
  <li><a href="https://developer.mozilla.org/en-US/docs/Learn/Forms">MDN: Učení – Formuláře</a></li>
  
  <li><a href="https://design-system.service.gov.uk/patterns/forms/">GOV.UK Design System: Forms</a></li>
  
  <li><a href="https://www.w3.org/WAI/tutorials/forms/">WAI: Témata přístupných formulářů</a></li>
</ul>











<script>
  function vypsat(el) {
    const casti = el.value.trim().split(/\s+/);
    const jmeno = casti.shift() || "";
    const prijmeniSurove = casti.join(" ");
    const prijmeni = prijmeniSurove.length ? prijmeniSurove : jmeno;
    const jmenoVysledek = prijmeniSurove.length ? jmeno : "";
    document.getElementById("jmenoPrijmeni").innerHTML = "<li>Jméno: " + jmenoVysledek + "<li>Příjmení: " + prijmeni;
  }
</script>