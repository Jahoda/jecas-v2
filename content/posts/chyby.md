---
title: "Chyby při programování"
headline: "Jak zobrazit chybové hlášky"
description: "Při odstraňování problému v HTML/CSS/JS/PHP/SQL je nutný přístup k chybovým hláškám, jak se k nim dostat?"
date: "2015-01-27"
last_modification: "2015-01-29"
status: 1
tags: ["css", "html", "js", "napady", "php", "sql"]
format: "html"
---

<p>Když něco <b>nefunguje</b>, často takový stav doprovází <b>varovná nebo chybová hláška</b>. Problém je, že ne vždy člověk ví, jak si ji zobrazit.</p>


<h2 id="js">JavaScript</h2>

<p>Chyba v JavaScriptu probíhá zpravidla v tichosti – prohlížeče běžné návštěvníky neupozorňují, že k chybě na stránce došlo.</p>

<p>Nešťastný programátor má nefunkční web a vůbec netuší proč. Prohlížeče naštěstí disponují tzv. <b>chybovou konsolí</b>, kde se problémy vypisují. Tento nástroj se nachází ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> skoro všech prohlížečů (klávesová zkratka <kbd>F12</kbd> nebo <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>).</p>

<p><img src="/files/chyby/konsole.png" alt="Chybová konsole" class="border"></p>











<h2 id="html">Chyby v HTML</h2>

<p>HTML je k chybám hodně tolerantní, takže spoustu chyb nemusí vůbec ničemu vadit. Může ale dojít k tomu, že prohlížeč <b>pochopí chybné HTML jinak</b>, než zamýšlel jeho autor.</p>

<pre><code>&lt;p>
  Odstavec.
  &lt;ul>
    &lt;li>Seznam v odstavci&lt;/li>
  &lt;/ul>
&lt;/p></code></pre>







<p>Jelikož v HTML nemůže být seznam v odstavci, odstavec se před ním sám ukončí a zbytečnou koncovou značku <code>&lt;/p></code> bude prohlížeč ignorovat.</p>

<div class="internal-content">
  <ul>
    <li><a href="/html-znacky">Různé druhy HTML značek</a> – povinné a nepovinné počáteční či koncové značky</li>
  </ul>
</div>

<p>Další časté chyby, které vadí, jsou <b>zapomenutá ukončovací značka</b>, překlepy a další.</p>

<p><img src="/files/chyby/validator.png" alt="Zobrazení chyby v HTML validátoru" class="border"></p>




<p>Chyby tohoto druhu většinou umí odhalit <b>HTML validátor</b>.</p>

<div class="external-content">
  <ul>
    <li><a href="http://validator.webylon.info">Český validátor</a></li>
    <li>W3C: <a href="http://validator.w3.org/">Markup Validation Service</a> (oficiální validátor v angličtině)</li>
  </ul>
</div>




<h2 id="css">CSS chyby</h2>

<p>Když je v CSS chyba, podobně jako v HTML to <b>nezpůsobují fatální selhání</b> a stránka s chybami může žít dál svým životem. Někdy se chyby vytvářejí záměrně pro <a href="/hacky">hackování prohlížečů</a> – psaní různých pravidel pro odlišené prohlížeče.</p>

<p>Nejčastěji je problém:</p>

<ol>
  <li>
    <p>Překlep/chyba v <a href="/css-selektory">selektoru</a>, kdy se daná deklarace nemá na co aplikovat. Nabízí se pro takový selektor nastavit něco výrazného (např. <code>color: red</code>), aby se vůbec ověřilo, že to něco dělá.</p>
  </li>
  
  <li>
    <p><b>Špatný název vlastnosti</b> – ta se pro prohlížeč bude tvářit jako neexistující. Často na to umí upozornit editor odlišným barvením kódu.</p>
  </li>
  
  <li>
    <p><b>Chyba v hodnotě</b> CSS vlastnosti.</p>
  </li>
</ol>

<p><b>Kontrolní otázka</b>: Jak bude vypadat následující odstavec? (Za <code>color: red</code> chybí středník.)</p>

<pre><code>p {
  color: red
  background: yellow;
  font-weight: bold;
}</code></pre>

<script>
  function odpoveded(cislo) {
    var cekam = document.getElementById("cekam");
    var vysvetleni = document.getElementById("vysvetleni");
    cekam.style.display = (cislo == 4) ? 'none' : ''; 
    vysvetleni.style.display = (cislo == 4) ? 'block' : 'none'
  }
</script>

<form onsubmit="return false;">
<ul class="radio-list">
  <li><label style="color: red; background: yellow; font-weight: bold"><input onchange="odpoveded(1)" name="odpoved" type="radio">červený a tučný s žlutým pozadím</label> (prohlížeč si poradí)</li>  
  
  <li><label style="color: red; font-weight: bold"><input onchange="odpoveded(2)" name="odpoved" type="radio">červený a tučný</label></li>
  
  <li><label style="background: yellow; font-weight: bold"><input onchange="odpoveded(3)" name="odpoved" type="radio">tučný s žlutým pozadím</label></li>
  
  <li><label style="font-weight: bold"><input onchange="odpoveded(4)" name="odpoved" type="radio">jen tučný</label></li>
</ul>
</form>

<p id="cekam" class="question-error">Čekám na správnou odpověď…</p>

<div id="vysvetleni" class="question-correct">
  <p><b>Správně</b>.</p>
  
  <p>V CSS se jako hodnota vlastnosti chápe celý obsah mezi dvojtečkou a středníkem (<code>;</code>) nebo koncovou závorkou (<code>}</code>). Z kódu výše tedy vznikne:</p>
  
<pre><code>p {
  color: red background: yellow;
  font-weight: bold;
}</code></pre>  
  
  <p>A protože „<code>red background: yellow</code>“ není vyhovující barva, zbude jediná platná deklarace <code>font-weight: bold</code>.</p>
  
  <p><a href="http://kod.djpw.cz/qxjb">Živá ukázka</a></p>
  
  
  <p>Taková chyba se objeví u stylů při prozkoumávání elementů:</p>
  
  <p><img src="/files/chyby/invalid.png" alt="Chybná hodnota v CSS" class="border"></p>  
</div>
<script>vysvetleni.style.display = "none";</script>






<p>Jako u HTML jde použít i automatický validátor. Kromě chyb zobrazuje i platnou podobu CSS. Chybný kód občas umí <b>automaticky opravit</b>.</p>

<div class="external-content">
  <ul>
    <li>W3C: <a href="https://jigsaw.w3.org/css-validator/">CSS Validation Service</a> (oficiální validátor v angličtině)</li>
  </ul>
</div>



<h2 id="php">PHP</h2>

<p>Nejzáludnější situace je na <b>straně serveru</b>. V PHP často drobná chyba znefunkční celou stránku.</p>

<ul>
  <li>
    <p>Různé redakční systémy nebo frameworky v ostrém provozu <b>vypínají hlášení chyb</b>.</p>
  </li>
  
  <li>
    <p><b>Zobrazování chyb</b> jde typicky potlačit i v administraci webhostingu pod volbou „Nastavení PHP“, „Konfigurace PHP“ a podobně. Konkrétní nastavení se jmenuje <code>display_errors</code> (nachází se v <code>php.ini</code>).</p>
    
    <figure>
      <img src="/files/chyby/wedos.png" alt="zapnutí display_errors u Wedosu">
      <figcaption>Nastavení <code>display_errors</code> u Wedosu</figcaption>
    </figure>
    
    <figure>
      <img src="/files/chyby/ebola.png" alt="zapnutí display_errors u hostingu Ebola">
      <figcaption>Nastavení <code>display_errors</code> u webhostingu Ebola</figcaption>
    </figure>    
  </li>
</ul>

<p>Nezobrazovat návštěvníkům <b>výchozí chybové hlášky PHP</b> je obecně dobrý postup. Zároveň je ale vhodné je ukládat někam, kde je uvidí administrátor/programátor. Při vývoji je nejsnazší mít zobrazení chybových hlášek zapnuté.</p>


<h3 id="hlaseni-chyb">Hlášení chyb v PHP</h3>

<p>Pro regulování zobrazování chybových hlášek se v PHP používá funkce <a href="http://php.net/manual/en/function.error-reporting.php"><code>error_reporting</code></a>:</p>

<pre><code>// vypne výpis všech chyb
error_reporting(0);</code></pre>

<p>Pro ladění aplikace je vhodné nastavení:</p>

<pre><code>// všechny chyby bez poznámek
error_reporting(E_ALL &amp; ~E_NOTICE);</code></pre>

<p>Případně zobrazovat úplně vše, tedy i <i>poznámky</i>, které <b>nejsou kritické</b>, ale mohou upozornit na potenciální problém jako nedeklarované proměnné a podobně.</p>

<pre><code>// všechny chyby
error_reporting(E_ALL);</code></pre>







<h2 id="redakcni-systemy">Chybové hlášky v redakčních systémech</h2>


<h3 id="wordpress">WordPress</h3>

<p>Při chybě může nastat tzv. <i>bílá obrazovka smrti</i>, kdy se na adrese webu vůbec nic neobjeví.</p>

<p>Pro zjištění příčin pomocí <b>vypsání chybových hlášek</b> se zapíná <i>debugovací režim</i> v souboru <code>wp-config.php</code>:</p>

<pre><code>define('WP_DEBUG', <b>true</b>);</code></pre>


<h3 id="joomla">Joomla!</h3>

<p>Hlášení chyb se nastavuje v souboru <code>configuration.php</code> do proměnné <code>$error_reporting</code>. Vztah mezi PHP funkcí <code>error_reporting</code> a Joomlou je následující:</p>

<ul>
  <li><code>-1 =  0 </code> – žádné chyby se nezobrazí.</li>
  <li><code>30711 =  E_ALL &amp; ~(E_NOTICE|E_WARNING)</code> – všechny chyby bez varování a poznámek</li>
  <li><code>30711 =  E_ALL &amp; ~E_NOTICE</code> – všechny chyby bez poznámek</li>
  <li><code>30719 =  E_ALL</code> – všechny chyby</li>
</ul>

<p>Kromě souboru <code>configuration.php</code> se dá úroveň hlášení chyb měnit i v administraci: <i>Globální nastavení</i> → <i>Server</i> → <i>Hlášení chyb</i>.</p>

<p><img src="/files/chyby/joomla.png" alt="Nastavení zobrazování chyb v CMS Joomla!" class="border"></p>



























<h2 id="mysql">Výpis chyb v MySQL</h2>

<p>Pro ladění (zvlášť složitějších) dotazů je vhodné použít nástroj typu <a href="http://www.adminer.org/cs/">Adminer</a>, kde se kromě syntaktické správnosti dotazu dá snadno zjistit, jestli <a href="/sql">SQL</a> dotaz <b>vrací správná data</b>.</p>

<p><img src="/files/chyby/adminer.png" alt="Zobrazení chyby v Admineru" class="border"></p>








<p>Adminer vypisuje případné chyby v dotazu. Na jedno kliknutí nabízí i funkci <code>EXPLAIN</code>, která se hodí při rychlostní optimalisaci dotazů.</p>

<p>Před implementací komplikovanějšího dotazu je tedy dobré si ho napřed odladit v podobném nástroji.</p>




<h3 id="sql-chyba-php">SQL chyba v PHP</h3>

<p>V závislosti na použitém rozhraní pro práci s DB je i odlišný způsob zobrazování chyb.</p>

<dl>
  <dt id="mysql"><code>mysql_error</code></dt>
  <dd>
    <p>V již zavrženém rozhraní <code>mysql_*</code> se chyba vypíše použitím funkce <code>mysql_error()</code> po daném dotazu.</p>
    
    <pre><code>// dotaz;
echo mysql_error();</code></pre>
  </dd>
  
  <dt id="mysqli">MySQLI</dt>
  <dd>
    <p>U nástupce MySQL stačí zavolat <code>$mysqli->error</code>, kde <code>$mysqli</code> je instance třídy <code>mysqli</code>:</p>
    
    <pre><code><i>$mysqli</i> = new <b>mysqli</b>("localhost", "uživatel", "heslo", "databáze");
// dotaz
echo $mysqli->error;</code></pre>
    
    <p>Pro výpis chyby v připojení se používá <code>$mysqli->connect_error</code>.</p>
  </dd>
  
  
  
  <dt id="pdo">PDO</dt>
  <dd>
    <p>V <a href="/pdo">PDO</a> jde použít <code>$pdo->errorInfo()</code> nebo používat <code>try</code> – <code>catch</code> a <code>getMessage()</code>.</p>
    
    <pre><code>try {
  $sql = $pdo->prepare($dotaz);
  $sql->execute($data);
}
catch (PDOException $e) {
  $chyba = $e->getMessage();</code>
}</pre>
  </dd>
</dl>







<h2 id="kumulace">Kumulace chyb</h2>

<p>Jelikož webové aplikace často používají klidně <a href="/sql">MySQL</a>, <a href="/php">PHP</a>, <a href="/js">JavaScript</a>, <a href="/css">CSS</a> a <a href="/html">HTML</a> najednou, může se chyba vyskytnout na každém článku tohoto řetězce. A to i <b>současně</b>.</p>

<p>To se potom těžko hledá.</p>

<p>Předcházet kumulaci jde <b>skládáním výsledku po kouscích</b> a testováním jednotlivých částí samostatně.</p>




<h3 id="priklad">Příklad</h3>

<p>Na stránce bude seznam, kterému se má nastavit CSS získané JavaScriptem pomocí <a href="/ajax">AJAXu</a> přes PHP z databáse.</p>

<p>Může se stát, že…</p>

<ol>
  <li>SQL dotaz nevrátí potřebná data.</li>
  <li>PHP výsledek dotazu špatně zpracuje.</li>
  <li>JavaScript špatně použije AJAX nebo chybně nastaví CSS.</li>
  <li>V CSS bude chyba (třeba zapomenutý středník), takže bude dělat něco jiného.</li>
  <li>HTML seznam bude v odstavci, což nejde, takže domnělý CSS selektor <code>p ul {}</code> nic nechytí.</li>
</ol>




<h2 id="logicke">Logické chyby</h2>

<p>Zvláštní skupinou chyb jsou případy, kdy se žádná <b>chybová hláška</b> nikde neukazuje, nic nenasvědčuje problému, ale aplikace <i>nefunguje</i>.</p>

<p>Důvodem je, že programátor naprogramoval <b>něco jiného, než si myslí</b>.</p>

<p>Zde je řešením rozdrobit kód na malé celky a testovat je jednotlivě. Nebo se někoho <a href="http://djpw.cz">zeptat</a>…</p>