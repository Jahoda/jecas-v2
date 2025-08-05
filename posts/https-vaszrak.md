---
title: "Jak jsme přecházeli na HTTPS s www.vaszrak.cz"
headline: "Jak proběhl přechod vaszrak.cz na HTTPS"
description: "Příklad konkrétního webu, který přešel z nezabezpečeného HTTP na HTTPS."
date: "2015-01-27"
last_modification: "2015-10-08"
status: 1
tags: ["zabezpeceni"]
format: "html"
---

<div class="autor-profile">
  <p>Autorem článku je <b>Tomáš Smetka, DiS.</b> provozující web <a href="https://www.vaszrak.cz/">vaszrak.cz</a>.</p>
</div>
 
<div class="soft">
  <ul><li><a href="#aktualizace">Aktualizace ke dni 7. 10. 2015</a></li></ul>
</div>

<p>Minulý rok podpora vyhledávače Google vydala krátkou zprávu o zapojení tzv. SSL protokolu (web s <code>https://</code>) do fulltextového vyhledávání.     Na různých odborných diskusních fórech mnoho webmasterů řeší <b>vliv SSL na pozice klíčových slov</b> a problematiku přechodu na tento zabezpečený protokol.</p>

<div class="internal-content">
  <ul>
    <li><a href="/https">Přechod na HTTPS</a> – souhrn poznatků při uvažování o HTTPS</li>
  </ul>
</div>

<p>V tomto článku uvedeme své <b>praktické zkušenosti</b> s převodem domény a obsahu 
  <a href="https://www.vaszrak.cz">www.vaszrak.cz</a>, jež jsme realizovali na začátku listopadu 2014.
</p>
<p>Zmíněné webové stránky budujeme od poloviny roku 2011, obsahují kvalitní nezkopírované napsané texty a zpětné organické relevantní odkazy z autoritativních a menších tématicky zaměřených webů.    Od začátku jsme nikdy nepřistupovali na tzv. black hat SEO či jiné šedé praktiky, vždy jsme šli „čistou cestou“.
</p>     


<h2 id="problematika">Problematika přechodu</h2>

<p>Jak již bylo napsáno i na tomto webu, přechod na HTTPS není zcela jednoduchý a má svá úskalí. Je třeba vždy <b>zvážit pro a proti</b>.</p>

<p>Hlavním problémem při přechodu byl <b>vyhledávač <a href="/seznam">Seznam</a></b>, který podle dostupných informací registroval web s <code>https://</code> <b>jako nový</b> i v případě korektního přesměrování 1:1 se správnou hlavičkou.       S <b>přechodem u <a href="/google">Google</a></b> podle informací potíže nejsou, nový web na HTTPS se zobrazuje v organickém vyhledávání přibližně <b>3. den</b>.
</p>        




<h2 id="praxe">Přechod v praxi</h2>

<p>Převod na nový web probíhal v několika fázích.</p>      


<h3 id="certifikat">1. Nákup SSL a nasazení</h3>

<p>Pro naše účely nám nejvíce vyhovoval nákup <b>SSL certifikátu</b> na 
  <a href="https://www.ssls.cz">www.ssls.cz</a>, jelikož tento e-shop umožňuje možnost:</p>

<ul>
  <li>výběr <a href="http://cs.wikipedia.org/wiki/Server_Name_Indication">SNI</a> certifikátu (osazení SSL pro více domén s jednou dedikovanou IP adresou),</li>
  <li>rychlou <b>platbu online kartou</b>,</li>
  
  <li>poměrně svižně odbornou technickou podporu.</li>
</ul>

<p>Základní SSL stojí na tomto e-shopu <b>necelých 100 Kč</b> a pro naše testovací účely dostačující. Web hostujeme na hostingu 
  <a href="http://www.savana.cz" onmousedown="this.href='http://www.savana.cz?aid=d61de63b'">Savana</a>, který umožňuje instalaci přímo v administrativním rozhraní bez zásahu podpory. Postup nasazení SSL konkrétně na tomto hostingu rozepíšeme někdy příště.
</p>             


<h3 id="gwt">2. Registrace nového webu s <code>https://</code> v nástroji Google Webmaster Tools.</h3>

<p>V druhém kroku jsme zanesli do tohoto nástroje pro webmastery web s <code>https://</code> <b>jako nový a starý vymazali</b> (nelze spravovat domény s oběma protokoly současně). Bohužel, při registraci webu <b>dočasně ztratíte data</b> o vyhledávaných dotazech, pozice klíčových slov a jiných informací. <b>Nová data</b> se nám v nástroji začínala objevovat přibližně <b>po 14 dnech</b> od registrace. V souboru <a href="/sitemap"><code>sitemap.xml</code></a> jsme generovali doménu již s <code>https://</code>.
</p>            


<h3 id="zmena-odkazu">3. Změna odkazů na <code>https://</code></h3>

<p>V tomto kroku šlo o administrativu. Kontaktovali jsme naše partnery, kteří na web odkazovali a <b>zažádali o změnu odkazu</b> na HTTPS podobu. Pro ty, kteří přechod plánují, doporučuji <b>vést seznam partnerů</b>, popř. sledovat odkazy v Google Webmaster Tools.</p>

<p>U katalogů typu Firmy.cz, ZlateStranky.cz a pod. lze odkaz změnit v administraci. Je vhodné také pamatovat na sociální služby typu <a href="/facebook">Facebook</a>, <a href="/twitter">Twitter</a> apod.
</p>                   





<h3 id="spusteni">4.  Paralelní  spuštění domény s <code>http://</code> a <code>https://</code></h3>

<p>Jelikož jsme věděli o potížích při přechodu u vyhledávače Seznam, nenastavovali jsme záměrně přesměrování ihned, ale <b>nechali doménu paralelně</b> na <code>http://</code> a <code>https://</code> pro případ náhlého propadu návštěvnosti. Dále jsme také chtěli vědět, jak na tyto protokoly <b>zareaguje Seznam a Google</b>.</p>

<p>Fulltext Seznamu překvapivě zobrazoval na různá spojení web ve vyhledávání s <code>https://</code> i <code>http://</code>.       Vyhledávač Google <code>http://</code> ignoroval a téměř ihned zobrazil <code>https://</code>. S největší pravděpodobností <b>klade velký důraz na Google Webmaster Tools</b>. Tento stav jsme nechali spuštěný 30 dní.
</p>             



<h3>5. Nastavení přesměrování</h3>
<p>Po uplynutí 30 dní jsme stránky <b>přesměrovali</b> na <code>https://</code> v poměru 1:1 s hlavičkou <i>301 – Moved Permanently</i>. U Seznamu se toto přesměrování neprojevilo u všech stránek dodnes (<i>konec ledna 2015</i>), zobrazuje stále některé stránky s <code>http://</code>, některé s <code>https://</code>.
</p>            



<h2>Měření pozic ve vyhledávačích</h2>

<p>      Pro periodické – měsíční měření pozic ve vyhledávačích jsme použili nástroj 
  <a href="http://www.semor.cz">SEMOR</a>. Do textové části měřených podstránek nebylo nijak zasahováno, probíhaly pouze průběžné úpravy zdrojového kódu (minifikace JS, drobné změny) Výsledky jsou následující:
</p>
<table>
  <tr><th>Datum měření</th><th>1. 11. 14</th><th>1. 12. 14</th><th>1. 1. 15</th>
  </tr>
  <tr><th>Klíčové slovo</th> 
    <td colspan="3">Google.cz / Seznam.cz</td>
  </tr>
  <tr><td>krátkozrakost</td><td>28 / 9</td><td>28 / 10</td><td>22 / 7</td>
  </tr>
  <tr><td>dalekozrakost</td><td>34 / 8</td><td>34 / 12</td><td>31 / 2</td>
  </tr>
  <tr><td>astigmatismus</td><td>56 / 38</td><td>58 / 32</td><td>56 / 36</td>
  </tr>
  <tr><td>oční klinika plzeň</td><td>7 / 16</td><td>5 / 17</td><td>5 / 8</td>
  </tr>
  <tr><td>oční klinika praha</td><td>22 / 20</td><td>25 / 22</td><td>25 / 17</td>
  </tr>
  <tr><td>oční klinika brno</td><td>20 / 19</td><td>23 / 17</td><td>22 / 17</td>
  </tr>
  <tr><td>oční klinika ostrava</td><td>10 / 17</td><td>10 / 18</td><td>11 / 8</td>
  </tr>
  <tr><td>oční klinika zlín</td><td>9 / 10</td><td>8 / 11</td><td>7 / 10</td>
  </tr>
  <tr><td>operace očí praha</td><td>30 / 17</td><td>22 / 55</td><td>30 / 48</td>
  </tr>
  <tr><td>lasik</td><td>60+  / 40</td><td>60+  / 42</td><td>60+  / 40</td>
  </tr>
  <tr><td>femtolasik</td><td>6 / 1</td><td>7  / 1</td><td>8  / 1</td>
  </tr>
  <tr><td>relex smile</td><td>6 / 4</td><td>7  / 2</td><td>9  / 2</td>
  </tr>
  <tr><td>ocni klinika</td><td>46 / 20</td><td>40  / 21</td><td>36  / 23</td>
  </tr>
</table>
<p> 
  <em>Klíčová slova byla vybrána z konkurenčních důvodů pouze obecná.
  </em>
</p>


<p>   Z měřených hodnot lze vyvodit, že <b>přechod na HTTPS nijak závratně pozice a ve výsledku i návštěvnost nemění</b>. Níže přikládáme návštěvnost z Google i Seznam z testovaného období.
</p>


<p><img src="/files/https-vaszrak/vz-organic-search.png" alt="Vývoj návštěvnosti po přechodu na HTTPS" class="border"></p>













<p>Pro srovnání graf za stejné období předešlého roku.</p>

<p><img src="/files/https-vaszrak/2013.png" alt="Vývoj návštěvnosti předchozí rok" class="border"></p>













<h2 id="potize">Technické potíže</h2>

<p>Bohužel Seznam (resp. jeho <a href="/nahled-seznam">screenshotovací robot</a>) dodnes nezobrazuje <b>náhled webových stránek</b>. Tento problém budeme konzultovat s technickým oddělení Fulltextu.   Dalším problémem vyhledávacího robota je <b>pomalá indexace nového obsahu</b>. Doporučuji např. při vydání článku či update textu přidat odkaz ručně pomocí formuláře
  <a href="/pridat-url">přidat URL</a>.
</p>



<h2 id="aktualizace">Aktualizace ke dni 7. 10. 2015</h2>

<p>Seznam.cz vydal na svém <a href="http://fulltext.sblog.cz/2015/10/06/3254/">blogu</a> článek s doporučením nasadit https rotokol až na začátek roku 2016. Toto doporučení potvrzuji, na testovaných webových stránkách došlo k propadu návštěv z fulltextu Seznam.cz. Níže přikládám vývoj návštěvnost od nasazení Google Analytics k dnešnímu dni.<p>

<p><img src="/files/https-vaszrak/vz-organic-search-update-2015.png" alt="Vývoj návštěvnosti za celé období ke dni 7.10.2015" class="border"></p>

<p>Vývoj budu nadále sledovat, ke konci tohoto roku bude článek aktualizován o nový graf.</p>