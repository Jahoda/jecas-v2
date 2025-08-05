---
title: "Zjišťování a oprava překlepů"
headline: "Jak zjistit a opravit překlep"
description: "Jak zjišťovat, jestli uživatel neudělal překlep a sdělit mu, co chtěl napsat."
date: "2015-11-07"
last_modification: "2016-02-17"
status: 1
tags: ["napady", "php"]
format: "html"
---

<p>Pokud se do hledání v <a href="/google">Google</a> zadá místo „css selektory“ řetězec „c<b>c</b>s selektory“, <i>umělá inteligence</i> pochopí, že se uživatel nejspíš přepsal a rovnou vyhledá variantu, kterou usoudí za správnou:</p>

<p><img src="/files/preklepy/google.png" alt="Oprava v hledání" class="border"></p>






















<p>Pokud si program není tolik jistý, vyhledá skutečně zadaný výraz a možný překlep nabídne v „Měli jste na mysli“:</p>

<p><img src="/files/preklepy/google-html.png" alt="Měli jste na mysli" class="border"></p>













<p>Jak překlepy odhalovat na svém webu?</p>



<h2 id="podobnost">Podobnost řetězců</h2>


<h3 id="levenshtein"><code>levenshtein</code></h3>

<p>V <b>PHP</b> jde použít funkci <a href="http://php.net/manual/en/function.levenshtein.php"><code>levenshtein</code></a>, která vrací <i>vzdálenost</i> dvou řetězců (na pořadí nezáleží).</p>

<pre><code>&lt;?php
echo levenshtein("fytopuf", "fy<b>r</b>opuf");</code></pre>



<p>Její chování se dá složitě matematicky popsat nebo zkrátka jen vycházet z toho, že vrací číslo, které je rovno <b>počtu změněných znaků, aby se z jednoho řetězce stal druhý</b>.</p>

<p>Čím nižší číslo, tím jsou řetězce podobnější.</p>

<p>Z <i>fyropufu</i> se udělá <i>fytopuf</i> tak, že nahradí <code>r</code> za <code>t</code>, tedy se musí změnit jeden znak. Funkce <code>levenshtein</code> vrátí pro tyto řetězce <code>1</code>. Byli-li by oba dva řetězce stejné, výsledkem bude <code>0</code>. Pokud se ve slově prohodí dvě písmena, výsledná vzdálenost bude <code>2</code>.</p>



<p>Na první pohled toto chování vypadá báječně. Pokud se uživatelem zadaný řetězec v prohledávaných datech nevyskytuje, spočítá se pro každé slovo <i>levenshtein</i> a výsledek s nejnižší hodnotou bude oprava překlepu.</p>



<h3 id="uskali">Úskalí funkce levenshtein</h3>

<p>Bohužel to má zásadní vady. Zvlášť u <b>krátkých řetězců</b> se na nízkou hodnotu dostanou na první pohled nesouvisející slova.</p>

<p>Následující příklad je z <a href="/nette">Nette</a>, které se v případě neexistující proměnné pokouší hledat nějakou nejpodobnější:</p>

<p><img src="/files/preklepy/podobnost.png" alt="Podobnost" class="border"></p>





<ol>
  <li>
    <p>Řetězec <code>$tags</code> je od <code>$this</code> <i>vzdálen</i> o hodnotu <code>2</code>.</p>
  </li>
  
  <li>
    <p>Stejně tak ale <code>$tags</code> od <code>$tasg</code>.</p>
  </li>  
</ol>

<p>Zatímco druhý případ je překlep, první nikoliv. Výsledná vzdálenost je v obou případech stejná.</p>

<p><b class="name">David Grudl</b> se to následně pokusil <a href="https://github.com/nette/utils/commit/421d1a65c0cfb1a318cd7885c7efbe4e65875ba3">vyřešit</a> změnou vah.</p>

<pre><code>levenshtein($prvni, $druhy, 10, 11, 10);</code></pre>

<p>Funkce <code>levenshtein</code> má totiž nepovinné parametry, kam jde nastavit, kolik <i>stojí</i> jednotlivé operace jako je <b>vložení</b>, <b>nahrazení</b> a <b>odstranění</b>.</p>

<p>Zvýšením hodnoty nahrazení je tedy prohození písmen bráno jako <b>podobnější</b> než použití úplně jiných znaků.</p>

<pre><code>levenshtein("tags", "this", 10, 11, 10); // 22
levenshtein("tags", "tasg", 10, 11, 10); // 20</code></pre>


<h3 id="similar_text">Funkce <code>similar_text</code></h3>

<p>V PHP existuje ještě funkce <a href="http://php.net/manual/en/function.similar-text.php"><code>similar_text</code></a> – ta se chová podobně jako <code>levenshtein</code>.</p>

<p>Umí navíc vypsat podobnost v procentech:</p>

<pre><code>similar_text("css", "ccs", $podobnost);
echo $podobnost; // 66.66</code></pre>





<h2 id="preklepy">Druhy překlepů</h2>

<p>Překlepů existuje více druhů:</p>

<ol>
  <li>
    <p><b>Prohození písmen</b> – místo <code>tags</code> člověk napíše <code>tasg</code>.</p>
  </li>
  <li>
    <p><b>Špatná klávesa</b> – uživatel stiskne omylem sousední klávesu, například napíše <code>tafs</code> místo <code>tags</code>, protože <kbd>G</kbd> a <kbd>F</kbd> jsou vedle sebe.</p>
    
    <p>V extrémním případě potom posune celé slovo, protože položil ruce na klávesnici do špatné polohy. Místo <code>les</code> vnikne <code>kwa</code>:</p>
    
    <p><img src="/files/preklepy/preklep.png" alt="Podobnost" class="border"></p>




  </li>
  
  
  <li>    
    <p><b>QWERTZ vs. QWERTY</b> – <a href="/ceska-klavesnice">česká klávesnice</a> má oproti anglické prohozené <kbd>Z</kbd> a <kbd>Y</kbd>, místo <code>fytopuf</code> tak vnikne <code>f<b>z</b>topuf</code>.</p>
  </li>  
  <li>
    <p><b>Vynechání písmene</b> – třeba místo <code>napíše</code> vznikne jen <code>napíe</code>.</p>
  </li>  
  <li>
    <p>„<b>Přeřeknutí</b>“ – i při psaní může člověk splést první slovo, protože už myslí na druhé. V bodu dva jsem například místo „potom posune“ napsal omylem „postom posune“.</p>
  </li>  
  <li>
    <p><b>Neznalost</b> – uživatel neví, jak se slovo správně píše. Třeba místo <code>bizarní</code> napíše <code>bizar<b>d</b>ní</code>, místo <code>css</code> napíše <code>ccs</code> a podobně.</p>
    
    <p>Větší problém je toto v angličtině, kde se slova jinak píší a jinak vyslovují. K tomu má PHP dvě funkce <a href="http://php.net/manual/en/function.metaphone.php"><code>metaphone</code></a> a <a href="http://php.net/manual/en/function.soundex.php"><code>soundex</code></a>, které řeší právě výslovnost.</p>
  </li>
</ol>


<h2 id="reseni">Řešení překlepů</h2>

<p>Určovat čistě programově, co chtěl člověk napsat, je tedy značně obtížné.</p>

<p>Hodí se k tomu potřeba zpětná vazba návštěvníků. Třeba zrovna jako v případě Googlu, který se uživatelů ptá, jestli náhodou nechtěl hledat něco jiného.</p>

<p>V praxi to jde relativně snadno řešit tak, že se při nenalezení žádných výsledků pro hledané slovo funkcí <code>levenshtein</code> najde podobný výraz, pro který už nějaké výsledky existují.</p>





<h2 id="vyuziti">Využití</h2>

<p>Kromě použití při <b>vyhledávání</b> se podobnost může hodit u opravování URL:</p>

<div class="internal-content">
  <ul>
    <li><a href="/oprava-url">Dohledání a opravení rozbité adresy</a></li>
  </ul>
</div>

<p>Teoreticky by podobnost šlo používat pro automatické <b>vytváření interních odkazů</b>. Kdy by se ze slova „odkazů“ udělal automaticky odkaz na stránku <a href="/odkazy">odkazy</a>. Dalšími postupy se zabývá článek na nejlepším českém blogu o programování:</p>

<div class="external-content">
  <ul>
    <li>Programio: <a href="http://programio.havrlant.cz/jak-vytvarim-interni-odkazy/">Jak vytvářím interní odkazy</a></li>
  </ul>
</div>