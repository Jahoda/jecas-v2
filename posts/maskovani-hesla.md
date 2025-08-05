---
title: "Maskování a zobrazování hesla ve formuláři"
headline: "Maskování a zobrazování hesla ve formuláři"
description: "Je lepší heslo ve formuláři zobrazovat, nebo ho maskovat pomocí hvězdiček?"
date: "2015-03-30"
last_modification: "2015-10-12"
status: 1
tags: ["formulare", "napady", "zabezpeceni"]
format: "html"
---

<p>U formulářového prvku <a href="/input"><code>&lt;input></code></a> určeného pro zadávání hesla (typ <code>password</code>) bývá zvykem, že jsou znaky <b>maskované hvězdičkami</b> nebo puntíky:</p>







<div class="live">
  <input type="password" value="heslo">
</div>


<p>Uživatel vyplňující formulář tak <b>neví, co napsal</b>. Z toho důvodu je někdy pole pro heslo duplikováno, aby se <b>předešlo překlepu</b>.</p>


<p>Je ale důvod heslo maskovat?</p>

<blockquote>
  <p>Myslím si, že maskování hesla je obrovský zlořád, který by vůbec neměl existovat. Nicméně je to tak hluboce zakořeněný zlořád, že už se stal normou a jeho odstranění vyžaduje velkou odvahu a nikdo se k tomu moc nemá.
</p>
  <p class="autor">– Michal A. Valášek</p>
</blockquote>












<p>Jak už to tak bývá, v případě hesel se volí mezi <b>bezpečností a pohodlím</b>.</p>



<h2 id="bezpeci">Je maskování hesla bezpečnější?</h2>

<p>Osobně mi přijde, že <b>maskování hesla</b> puntíky přináší spíš <b>pocit bezpečí</b> než vyšší bezpečnost skutečnou.</p>

<blockquote>
  <p>Že se v políčku objevují hvězdičky, neznamená, že někdo nemůže vidět, co píšu.</p>
</blockquote>






<ol>
  <li><p>První možnost jsou <b>keyloggery</b> – škodlivé programy v systému, které monitorují, zaznamenávají a odesílají stisknuté klávesy. Proti těm je visuální skrývání bezzubé.</p></li>
  
  <li><p>Druhá možnost je <b>visuálně sledovat</b>, co člověk <b>mačká na klávesnici</b>. Zde opět skrytí hesla za puntíky nepomůže.</p></li>
  
  <li>
    <p><b>Michal Špaček</b> zmínil ještě jeden způsob, byť značně náročnější, a to zjištění hesla <b>posloucháním zvuků kláves</b> během jeho zadávání. Různé klávesy při stisku vydávají odlišné zvuky, zvlášť patrné je to třeba u mezerníku. Minimálně délka hesla jde takto určit celkem triviálně.</p>
  </li>
</ol>

<p>Pokud chce mít člověk jistotu, že jeho heslo nikdo nezjistí, měl by ho zadávat pouze <b>v soukromí a na prověřených zařízení</b>.</p>

<p>Ano, zahvězdčikování hesla znesnadní okoukání hesla z obrazovky, ale je otázka za jakou cenu.</p>

<p>Zvlášť na <b>mobilech s miniaturní dotykovou klávesnicí</b> je zadávání komplikovaného hesla značně <b>nepříjemný zážitek</b>. Člověk si kvůli obavě z překlepu, kterého si nevšimne, bude dávat záležet, aby se nepřeklep. Bude tak heslo psát pomaleji, to ho zdrží, že si třeba příště přihlašování rozmyslí.</p>

<p><b>Michal A. Valášek</b> zmiňuje, že nutnost psát heslo <i>poslepu</i> vede uživatele k používání jednodušších hesel, protože na slepý zápis silného hesla si nevěří.</p>



<p>Další věc je, že:</p>

<ol>
  <li>Na mobilu jde celkem snadno <b>zakrýt displej</b> druhou rukou.</li>
  
  <li>Desktop se často používá v soukromí, kde okoukání hesla nehrozí.</li>
</ol>




<h2 id="je-bezpecne">Je bezpečné odkrytí hesla ve formuláři?</h2>

<p>Na bezpečnost odkrytého hesla jsem se zeptal dvou bezpečnostních expertů – <a href="https://www.michalspacek.cz/">Michala Špačka</a> a <a href="http://www.rider.cz/cs/default.aspx">Michala Altaira Valáška</a>.</p>

<p><b>Michal Špaček</b> považuje odkrývání za risikové při používání aplikací na veřejných místech. <b>Michal A. Valášek</b> je potom proti maskování.</p>



<h3 id="michal-spacek">Michal Špaček</h3>


<blockquote>
  <p>Nemusí to nutně snižovat riziko, ale nedoporučil bych heslo odkrývat třeba
v aplikacích, u kterých je šance, že se k nim budou uživatelé přihlašovat z
    veřejných počítačů.</p>
  
  <p>Jedním takovým příkladem je třeba nahrávání a sdílení
fotek z dovolené. To lidé budou často dělat z počítačů na hotelových
recepcích a pak by se mohlo stát, že jejich heslo bude znát nejen někdo, kdo
na takový veřejný počítač nainstalovat keylogger, ale i ten, co uživateli
    zrovna náhodou koukal přes rameno.</p>
  <p>Oproti tomu, heslo do svého Wi-Fi routeru
asi budou uživatelé vždy zadávat doma, bez nějakého publika. V každém
případě by bylo dobré uživatele nějak varovat, aby heslo neodkrýval, když za
ním někdo v těsné blízkosti stojí, stačí se inspirovat třeba u bankomatů</p>
</blockquote>






















<h3 id="michal-valasek">Michal A. Valášek</h3>

<blockquote>
  <p>Zcela souhlasím s názorem, že maskování hesla dává iluzi bezpečnosti a nic víc. Proto ho považuji za špatné.</p>
  
  <p>Maskování hesla pomůže pouze při jediném scénáři, a to když mi útočník fyzicky kouká přes rameno. Ovšem to má řadu jiných možností. Z mého pohledu je tedy maskování hesla antipattern, který víc škodí, než pomáhá.
</p>
  
  <p>Na druhou stranu, je to antipattern, který je tak rozšířený, že vymanit se z něj žádá velkou odvahu. Uživatelé s ním počítají a když ho nevidí, znejistí je to. I když to nepředstavuje reálné riziko, budou to za něj považovat.</p>
  
  <p>Ale přiznám se, že kážu vodu a piju víno, protože jsem to zatím ještě na žádném webu nenašel odvahu zrealizovat :)
</p>
</blockquote>




















<h2 id="zobrazit-skryt">Volitelné zobrazení hesla</h2>

<p>Umožnit uživateli <b>zobrazit heslo v textové podobě</b> se tak může hodit. Některé operační systémy nebo prohlížeče možnost <i>zobrazit heslo</i> nabízejí nativně.</p>


<p>Existuje 5 stupňů (ne)zobrazování hesla v původní podobě:</p>

<ol>
  <li><p>Zobrazovat <b>pouze hvězdičky</b> (typické chování na desktopech).</p></li>
  
  <li><p><b>Poslední zadaný</b> znak na chvíli pro kontrolu ukázat (tak to dělá většina mobilů).</p>
    <p><img src="/files/maskovani-hesla/pismeno.png" alt="Zobrazení posledního písmena" class="border"></p>
  </li>
  
  <li><p>Zobrazení celého hesla po <b>přidržení tlačítka/ikony pro odkrytí</b>. Bohužel to stejně moc neumožňuje opravit překlep, protože se heslo po chvíli zase zamaskuje (dělá to tak třeba <a href="/windows-10"><b>Windows 10</b></a> při přihlašování).</p>
  <p><img src="/files/maskovani-hesla/odkryti.png" alt="Odkrytí hesla" class="border"></p> 
  </li>
  
  <li>
    <p>Přepínání <b>zobrazit/skrýt</b>, kdy se textová podoba na vyžádání plně odkryje, dokud ji uživatel zase neskryje. Ukázka z <b>Windows Phone 10</b> při přihlašování k Wi-Fi:</p>
  
    <p><img src="/files/maskovani-hesla/wp10.png" alt="Zobrazení hesla WP 10" class="border"></p>  
  </li>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <li><p>Zobrazovat <b>heslo pouze v textové podobě</b>.</p></li>
</ol>






<h2 id="reseni">Řešení v JS</h2>

<p>Řešit zobrazení/skrytí hesla jde pomocí obyčejného <code>checkbox</code>u, který bude měnit typ formulářového políčka z <code>text</code> na <code>password</code>.</p>

<div class="live">
  <form>
    <input type="password" name="password" value="heslo"><label><input type="checkbox" onchange="this.form.password.type = (this.checked ? 'text' : 'password'); ">Zobrazit</label>
  </form>
</div>

<p>K úvaze je, zda jako výchozí stav zvolit maskování hesla nebo ho naopak zobrazovat. <b>Výchozí zobrazování</b> v čitelné podobě může být pro návštěvníky šok.</p>

<div class="live">
  <form>
    <input type="text" name="password" value="heslo"><label><input type="checkbox" onchange="this.form.password.type = (!this.checked ? 'text' : 'password'); ">Skrýt heslo</label>
  </form>
</div>


<h3 id="male">Heslo malým písmem</h3>

<p>Docela zajímavé řešení je zobrazovat kromě hvězdiček vedle i originální podobu hesla <b>hodně malým písmem</b>, které člověk zadávající heslo sotva přečte. Hůře čitelné heslo sníží šanci odkoukání přes rameno.</p>

<div class="live">
  <form>
    <input type="password" name="password" value="heslo" onkeyup="originalPassword.innerHTML = this.value"><label><input type="checkbox" onchange="originalPassword.style.visibility = (this.checked ? '' : 'hidden')">Zobrazit</label>
    <small id="originalPassword" style="display: block; visibility: hidden; font-size: 60%">heslo</small>
  </form>
</div>

<h3 id="autocomplete">Nebezpečný <code>autocomplete</code></h3>

<p>Některé prohlížeče mají tendenci si <b>zapamatovávat vyplněná políčka</b>.</p>

<p>U <i>odkrytých</i> hesel to je potom <b>krajně nežádoucí</b>, protože si heslo prohlížeč zapamatuje, i když uživatel žádné zapamatování neschválí.</p>

<p>Heslo jde potom klasicky vyvolat z <i>autocomplete nabídky</i>. Proto je lepší tuto funkci vypnout:</p>

<pre><code>&lt;input type="text" name="password" <b>autocomplete="off"</b>></code></pre>

<div class="external-content">
  <ul>
    <li><a href="http://kod.djpw.cz/qcjc">Živá ukázka</a> – test různých variant s/bez vypnutého <code>autocomplete</code></li>
  </ul>
</div>


<h3 id="pouzitelnost">Použitelnost</h3>

<p>Pro <b>dobrou použitelnost</b> skrývacícho/odkrývacího přepínače je dobré navrátit po změně kursor na původní posici, aby mohl uživatel pokračovat v psaní.</p>

<div class="internal-content">
  <ul>
    <li><a href="/umisteni-kursoru">Umístění kursoru v poli</a> – zjištění posice kursoru v JavaScriptu</li>
  </ul>
</div>

<p>Typ <code>password</code> může v některých mobilních prohlížečích vyvolat jinou podobu softwarové klávesnice.</p>

<p><img src="/files/maskovani-hesla/klavesnice.png" alt="Různá podoba klávesnice" class="border"></p> 













<p>Rozdíly ale zase nejsou tak dramatické. Ovlivnit podobu klávesnice by šlo případně <a href="/atribut-pattern">atributem <code>pattern</code></a>.</p>

<p>Větší problém je <b>automatické zvětšování prvního písmene</b> – jde vypnout pomocí <code><a href="/autocapitalize">autocapitalize="none"</a></code>.</p>


<h2 id="spravce-hesel">Správce hesel</h2>

<p>Problém se zadáváním hesel dobře řeší <i>password managery</i> (nejznámější je asi <a href="https://lastpass.com/cs/">LastPass</a>). Správce hesel dokáže k různým službám generovat náhodná silná hesla, která se při přihlášení <b>vyplní automaticky</b>, takže uživatele způsob maskování vůbec nemusí zajímat.</p>

<p>Po registraci / přihlášení je uživatel dotázán, jestli chce přihlašovací údaje uložit – příklad z <b>Chrome</b>:</p>

    <p><img src="/files/maskovani-hesla/chrome.png" alt="Uložení přihlášení v Chrome" class="border"></p>









<p>Taktéž <b>LastPass</b> po odeslání přihlašovacího/registračního formuláře zobrazí obdobnou hlášku:</p>

<p><img src="/files/maskovani-hesla/lastpass.png" alt="Uložení do LastPass" class="border"></p>



<p>Při odkrytí hesla změnou <code>type</code> z <code>password</code> na <code>text</code> u políčka pro heslo vznikne problém, že <b>správci hesel nemusí rozpoznat přihlašování</b>.</p>

<div class="external-content">
  <ul>
    <li>LastPass support: <a href="https://lastpass.com/support.php?cmd=showfaq&amp;id=3385">Podoba přihlašovacího formuláře, aby ji LastPass pochopil</a></li>
  </ul>
</div>

<p>Následující políčko zkrátka <b>Chrome</b>/<b>LastPass</b> nepochopí jako heslo a možnost pro uložení se nezobrazí:</p>

<pre><code>&lt;input type="<b>text</b>" name="password"></code></pre>


<p>Řešení je políčko před odesláním formuláře změnit zpět na <code>password</code>:</p>

<pre><code>&lt;form <b>onsubmit</b>="this.password.type ='password'"> </code></pre>

<p>(Políčko s <code>name=password</code> dostane <code>type=password</code>.)</p>

<p>Případně se do maskované podoby může přepínat políčko už při ztrátě <code>focus</code>u (JS událost <code>onblur</code>).</p>

<div class="live">
  <form>
    <input type="password" name="password" value="heslo" onblur="this.type = 'password';" onfocus="if (this.form.zobrazit.checked) this.type = 'text'">
    <label><input type="checkbox" name="zobrazit" onchange="this.form.password.type = (this.checked ? 'text' : 'password'); ">Zobrazit</label>
  </form>
</div>

<h2 id="bez-hesla">Přihlašování bez hesla</h2>

<p>Řešení problému maskování hesel z jiné strany je i <b>vyhnutí se používání hesla</b>. Pro přihlášení nebo registraci jde:</p>

<ul>
  <li>
    <p>Použít <b>ověření prostřednictvím jiné rozšířené služby</b>. Například umožnit přihlášení přes <a href="/facebook">Facebook</a> nebo <a href="/twitter">Twitter</a>.</p>
  </li>
  
  <li>
    <p><b>Přihlašovat na základě odkazu</b>. Při žádosti o přihlášení dostane uživatel na registrační e-mail odkaz pro okamžité přihlášení. Po jeho prokliknutí je automaticky přihlášen. Odkaz by měl mít omezenou dobu platnosti, protože e-mail typicky není nejbezpečnější úložiště hesel.</p></li>
  
  <p><img src="/files/maskovani-hesla/slack.png" alt="Přihlášení přes odkaz" class="border"></p>

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

</ul>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Sitepoint: <a href="http://www.sitepoint.com/masking-passwords-help-or-hinderance/">Masking Passwords: Help or Hindrance?</a></li>
  
  <li>Luke Wroblewski: <a href="http://www.lukew.com/ff/entry.asp?1941">Showing Passwords on Log-In Screens</a></li>
  
  <li><a href="http://arstechnica.com/security/2013/04/why-your-password-cant-have-symbols-or-be-longer-than-16-characters/">Why your password can’t have symbols—or be longer than 16 characters</a></li>
</ul>


<!-- náhled: http://kod.djpw.cz/mwqb -->