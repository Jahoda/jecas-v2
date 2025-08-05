---
title: "Jak (ne)přenášet referer"
headline: "Jak (ne)přenášet referer"
description: "Jak zablokovat přenášení informace o předchozí navštívené stránce."
date: "2015-11-18"
last_modification: "2016-02-09"
status: 1
tags: ["hotova-reseni", "html", "napady"]
format: "html"
---

<p>Referer (nebo referrer) je HTTP hlavička obsahující informaci o předchozí navštívené URL. Provozovatel webu se z ní může dozvědět, odkud k němu návštěvník přišel.</p>



<h2 id="jak-zjistit">Jak zjistit referer?</h2>


<h3 id="php">PHP</h3>

<p>V PHP je předchozí URL dostupná v poli <a href="/server"><code>$_SERVER</code></a>. Vypsat jde následovně:</p>

<pre><code>&lt;?php
echo $_SERVER["HTTP_REFERER"];</code></pre>



<h3 id="js">JavaScript</h3>

<p>V JS je informace o předchozí stránce dostupná v <code>document.referrer</code>:</p>

<div class="live">
  <p>
    <script>
      document.write("Předchozí stránka: " + document.referrer);
    </script>
  </p>
</div>

<h3 id="spolehlivost">Spolehlivost?</h3>

<p>Hodnotě hlavičky referer <b>není možné věřit</b>. Technicky zdatný uživatel může její hodnotu nastavit libovolně nebo referer vůbec neposílat.</p>

<p>Pokud se obsah refereru příchozích návštěvníků někde vypisuje, je třeba myslet na ochranu proti <a href="/xss">XSS</a> (vložení škodlivého skriptu kvůli interpretaci HTML).</p>


<p>Většina uživatelů ale chování refereru neupravuje, takže je to celkem spolehlivá informace.</p>




<h2 id="blokovani">Nepředávání refereru</h2>

<p>Předávání refereru není vždy úplně žádoucí. V URL se mohou nacházet <b>citlivé informace</b>, které by se neměly dostat jinam.</p>


<p>Stačí aby někdo třeba i v neveřejné části webu klikl na odkaz a referer se přenese na cílový web. V případě, že neveřejný systém používá adresy tvořené z titulku, může se člověk dozvědět, že ho někde pomlouvají nebo chválí.</p>

<pre><code>tlachtace.cz/projekty-5/<b>jecascz-nejlepsi-web-na-svete</b>-3996/</code></pre>



<p>Odkazující stránky jde potom zjišťovat ve statistikách. Ať už přímo v <i>access logu</i> (automaticky vytvářený soubor na serveru se všemi přístupy) nebo v měřicím nástroji typu <a href="/ga">Google Analytics</a>.</p>

<p>Ve <b>statistikách</b> se potom objevují adresy webových RSS čteček, e-mailových klientů, interních informačních systému, administrací a podobně.</p>

<p>Pokud se na nové URL chystá web, kam nevedou žádné odkazy a ani není zaindexován <a href="/seo">vyhledávači</a>, pomocí referrera se adresa může nechtěně prozradit.</p>





<h3 id="zablokovani-prohlizec">Zablokování refereru v prohlížeči</h3>

<p>Nejspolehlivější řešení je zakázat předávání refereru přímo v prohlížeči. Vyžaduje to ale součinnost všech uživatelů dané aplikace, a to je dost nereálné.</p>

<p>Globální zakázaní refereru navíc způsobí <b>částečnou nefunkčnost některých aplikací</b>, které kontrolu refereru používají jako ochranu před <a href="/bezpecnost#csrf">CSRF</a>.</p>

<p>Pro současné prohlížeče je k tomu asi nejlepší použít nějaký plugin.</p>






<h3 id="blokovani-html">Blokování HTML atributem</h3>

<p><a href="/microsoft-edge"><b>Edge</b></a>, <b>Chrome 21+</b>, <b>Opera 15+</b> a <b>Firefox 36+</b> podporují vypnutí předávání refereru pomocí <code>rel</code> atributu <a href="/noreferrer"><code>noreferrer</code></a>.</p>

<pre><code>&lt;a href="/noreferrer" <b>rel="noreferrer"</b>>
  Na cíl se nepředá referer
&lt;/a></code></pre>



<p>Aby nebylo nutné psát neustále <code>rel="noreferrer"</code> pro blokování více odkazů na stránce, dá se předávání refereru nastavit <code>&lt;meta></code> hlavičkou:</p>

<pre><code>&lt;meta name="referrer" content="origin"></code></pre>


<div class="external-content">
  <ul>
    <li>Can I use: <a href="http://caniuse.com/#feat=referrer-policy">Referrer Policy</a> – podpora v prohlížečích</li>
    <li>Mozilla Security Blog: <a href="https://blog.mozilla.org/security/2015/01/21/meta-referrer/">Tighter Control Over Your Referrers</a></li>
    <li>W3C: <a href="https://w3c.github.io/webappsec-referrer-policy/">Referrer Policy</a></li>
  </ul>
</div>



<h3 id="presmerovani">Přesměrování</h3>

<p>Pro starší prohlížeče je asi nejlepší možnost externí odkazy přesměrovat přes universální skript.</p>

<p>Ten sice pořád prozradí odkazující doménu, ale už ne konkrétní URL. Třeba Adminer – nástroj pro správu database – z tohoto důvodu odkazy přesměrovává přes <code>adminer.org</code>.</p>

<p>Bez nutnosti vytvářet vlastní skript pro <b>anonymní přesměrování</b>, jde využít hotové služby. Třeba:</p>

<div class="external-content">
  <ul>
    <li><a href="http://jdem.cz/anonymizer.html">JDEM.CZ - Anonymizér</a></li>
  </ul>
</div>


<p>Cílová stránka se potom dozví pouze adresu webu zajišťujícího přesměrování.</p>


<h3 id="https">HTTPS</h3>

<p>Teoreticky by mohlo jít využít toho, že na HTTP weby odkazované z <a href="/https#referer">HTTPS</a> se referer nepřenáší. U webu běžícího na HTTPS, který odkazuje na HTTP by tak nemělo být potřeba nic řešit.</p>



<h3 id="neklikaci">Neklikací odkazy</h3>

<p>Možné řešení je neuvádět <a href="/odkazy">odkazy</a> v klikatelné podobě se značkou <a href="/odkaz"><code>&lt;a></code></a>.</p>

<p>Zkrátka do kódu místo:</p>

<pre><code>&lt;a href="http://example.com">example.com&lt;/a></code></pre>


<p>Umístit samotné <code>example.com</code>.</p>

<p>Uživatel si potom musí URL překopírovat do adresního řádku, čímž se referer nepřenese. Zkopírování do schránky jde alespoň zpříjemnit <a href="/kopirovat">kopírovacím tlačítkem</a>. I tak je takový postup méně pohodlný než normální odkaz.</p>

<p>V tomto případě ale bohužel existují doplňky, které neklikací text vypadající jako URL učiní klikacím, čímž je celý tento postup lehce nespolehlivý.</p>





<h3 id="data-url">Data URL</h3>

<p>Ve starším <b>Firefoxu</b> a <b>Chrome</b> jde přenosu referera zabránit přesměrováním <code>&lt;meta></code> značkou <code>refresh</code>, která se vytvoří ve stránce zapsané do <a href="/data-uri">Data URI</a>:</p>

<pre><code>&lt;a href="http://jecas.cz/referer" 
onclick="this.href = 'data:text/html,&lt;meta http-equiv=refresh content=\'0;url=' + this.href + '\'>'"
>
  Je čas bez referera
&lt;/a></code></pre>

<p><a href="http://kod.djpw.cz/qhub">Živá ukázka</a> – nepřenášení referera pomocí data URI</p>









<h2 id="zaver">Závěr</h2>

<p>Optimální řešení nepředávání hlavičky referrer se zdá být v kombinaci <code>rel="noreferrer"</code> pro odkaz / <code>&lt;meta name="referrer" content="origin"></code> pro všechny odkazy. Plus přesměrování pro starší prohlížeče.</p>

<p>Detekovat podporu nastavení refereru (atributem <code>rel</code> i <code>&lt;meta></code> značkou) bohužel jednoduše nejde. Nezbývá tak než posílat přes přesměrovávací skript i prohlížeče, které vypnutí předávání refereru v HTML podporují. Nebo detekovat název a versi prohlížeče.</p>

<p>Teoreticky jde otestovat (ne)předávání refereru pomocí odkazu směřujícího do neviditelného <a href="/ramy#iframe"><code>&lt;iframe></code></a>, ale to testuje obecné předávání refereru, ne přímo podporu <code>rel="noreferrer"</code>:</p>

<div class="external-content">
  <ul>
    <li>StackOverflow: <a href="http://stackoverflow.com/a/10020992">How can I detect rel=“noreferrer” support?</a></li>
  </ul>
</div>






<h2 id="spam">Referral spam</h2>

<p>Ohledně informace o předchozí URL (hlavička referer) se lze setkat se spamováním.</p>

<p>Některé weby a redakční systémy obsahují funkci typu „Kdo sem odkazuje“. Pokud spammer čas od času nafinguje příchod ze svého webu, získá tak zpětné odkazy.</p>

<p>Jiná možnost je donutit k návštěvě vlastního webu webmastera sledující statistiky. Řada správců a majitelů webů sledují, odkud na web chodí návštěvníci. Jde tak zjistit, že se někde o webu píše.</p>

<p>Pokud se nafinguje dostatečný počet návštěv s refererem, je šance, že se majitel webu přijde na web spammera podívat. Tato technika je hodně rozšířená v Google Analytics:</p>

<div class="external-content">
  <ul>
    <li>Diskuse JPW: <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=17&amp;topic=165998"> Návštevy z divných stránek </a></li>
  </ul>
</div>