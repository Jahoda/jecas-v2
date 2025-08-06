---
title: "Má redakční systém vliv na SEO?"
headline: "Vliv redakčního systému na SEO"
description: "Může mít použitý redakční systém a jeho šablona vliv na umístění stránky ve vyhledávání?"
date: "2015-12-03"
last_modification: "2015-12-07"
status: 1
tags: ["cms", "seo"]
format: "html"
---

<p>Použít redakční systém (CMS – <i lang="en">Content Management System</i>) je dnes běžný způsob, jak vytvářet webové stránky. Přináší to dvě hlavní výhody:</p>

<ol>
  <li><p>Automatické <a href="/include">skládání společných částí</a> stránek dohromady (hlavička, menu, patička apod.).</p></li>
  <li><p>Pohodlnější vytváření obsahu. Psaní textů bez nutnosti používat HTML ve <a href="/wysiwyg">WYSIWYG editoru</a>, snazší nahrávání obrázků a podobně.</p></li>
</ol>


<p>Jaký může mít redakční systém vliv na SEO?</p>




<h2 id="rychlost">Rychlost</h2>

<p>Doba načítání stránky může mít vliv na její SEO (ne)úspěchy. Více o tom v samostatném článku:</p>

<div class="internal-content">
  <ul>
    <li><a href="/seo-rychlost">Má rychlost načítání vliv na SEO?</a></li>
  </ul>
</div>

<p>Generování výsledného HTML v redakčním systému bude prakticky vždy pomalejší, než by bylo bez něj.</p>

<p>Redakční systémy se snaží být universální, takže obsahují i funkcionalitu, kterou každý nevyužije. Tyto zbytečné funkce potom prodlužují dobu běhu skriptu.</p>

<p>Zvlášť problematické jsou často <b>pluginy</b> třetích stran. Proto bývá dobré zapnutí každého pluginu zvažovat a testovat.</p>


<h3 id="cache">Použít cache</h3>

<p>Nejlepší řešení pomalosti redakčních systémů je <b>kešovat výsledné HTML</b>.</p>

<p>U webů, které se moc často nemění, jde bez problémů kešovat úplně celé stránky a mít tak celý web ve statické podobě. Potom je rychlost webu vytvořeného redakčním systému srovnatelná s použitím prostého HTML.</p>

<div class="external-content">
  <ul>
    <li><a href="https://zencache.com/">ZenCache</a> – kešování stránek ve WordPressu</li>
  </ul>
</div>

<p>Existují dokonce redakční systémy, které mají výstup pouze v statickém HTML a dynamicky stránky vůbec generovat neumí.</p>

<div class="external-content">
  <ul>
    <li><a href="http://programio.havrlant.cz/hexoio/">Hexo.io</a> – skutečný next-gen blogovací systém</li>
  </ul>
</div>


<h3 id="dynamicke">Dynamické servírování stránek</h3>

<p>Běžné redakční systémy fungují tak, že při požadavku na <code>example.com/stranka</code> udělají následující:</p>

<ol>
  <li>
    <p>Připojí se do SQL database.</p>
  </li>
  <li>
    <p>Zjistí, který obsah přísluší dané URL.</p>
  </li>
  <li>
    <p>Vyberou z DB potřebný obsah (článek, položky menu, poslední komentáře, související články apod.).</p>
  </li>
  <li>
    <p>Serverový skript tato data nastrká do šablony a výsledné HTML pošle prohlížeči.</p>
  </li>
</ol>

<p>Problém je, že do této doby návštěvník <b>zírá na prázdnou stránku</b>, protože mu ještě žádný obsah nedorazil.</p>

<p>Tato doba se nazývá TTFB (<i lang="en">time to first byte</i> – čas do stažení prvního bytu). </p>

<p><img src="/files/seo-cms/ttfb.png" alt="TTFB" class="border"></p>











<p>Je extrémně důležité držet tuto hodnotu co nejníže, protože do této doby nevidí návštěvník žádnou odezvu.</p>


<h3 id="doba-odezvy">Doba vygenerování stránky</h3>

<p>Následující tabulka obsahuje orientační přehled doby do prvního bytu při sestavení jednoduché stránky.</p>

<table>
  <tr><th>Typ</th>
    <th>Čas</th></tr>
  <tr><td>Statické HTML</td>
    <td>20 ms</td></tr>  
  <tr><td>Jednoduché PHP</td>
    <td>40 ms</td></tr>
  <tr><td><a href="/nette">Nette Framework</a></td>
    <td>70 ms</td></tr>
  <tr><td><a href="/wordpress">WordPress</a></td>
    <td>200 ms</td></tr>
  <tr><td>Joomla</td>
    <td>400 ms</td></tr>  
</table>


<p>Je-li cílem dosáhnout dojmu prakticky okamžité reakce – hranice 100 milisekund – je použití nejpopulárnějších redakčních systémů bez úpravy téměř nemožné.</p>


<h3 id="sablona">Doba stažení šablony</h3>

<p>Použitá šablona webu potom může negativně nebo positivně ovlivnit další průběh načítání (po stažení HTML kódu).</p>

<p>Zvlášť v případě, že šablona používá hodně CSS, JavaScriptu, <a href="/ceska-pisma">webových fontů</a> nebo velkých obrázků, bývá vykreslování obsahu značně pomalé.</p>

<p>Při nepoužívání protokolu HTTP/2 je problematické i velké množství HTTP spojení, které dobu načtení značně prodlužují. Základní postup řešení je:</p>

<ol>
  <li><p>Spojit všechny grafické prvky šablony do jednoho <a href="/css-sprite">spritu</a>.</p></li>
  
  <li><p>Nejnutnější část CSS pro vykreslení obsahu <i>nad ohybem</i> (obsah viditelný bez rolování) vložit přímo do <a href="/html-kostra#head">hlavičky</a> do značky <code>&lt;style></code>, ostatní CSS spojit do jednoho souboru a <a href="/nacitani-css">načíst asynchronně</a>.</p></li>
  
  <li><p>JS soubory se skripty <a href="/slouceni-js-css">spojit do jediného souboru</a> a připojit na konci stránky nebo asynchronně pomocí atributu <code>async</code>/<code>defer</code>.</p></li>
</ol>





<h2 id="omezeni">Omezení</h2>

<p>Problematické na používání CMS je omezení v přidávání nových funkcí. Některé redakční systémy mohou být obtížně rozšiřitelné.</p>

<p>Na druhou stranu hodně věcí je řešitelných pluginy, takže rozšiřování funkcí populárních redakčních systémů je často snazší než programování vlastního řešení.</p>


<p>Z pohledu SEO je po technické stránce obsahu důležité:</p>


<ol>
  <li>
    <p><b>Unikátní titulek</b> – značka <code>&lt;title></code> je <a href="/seo-rychle#titulek-popis">zázračný SEO tag</a>. Redakční systém by měl umožnit každé stránce nastavit unikátní titulek.</p>
    
    <p>Kvůli větší variabilitě se hodí i <b>odlišný hlavní nadpis od titulku</b>.</p>
    
    <p>Drtivá většina redakčních systémů používá pro <code>&lt;title></code> i <code>&lt;h1></code> stejný obsah.</p>
    
    <p>Ve WordPressu jde odlišný titulek od názvu článku nastavit pomocí pluginu:</p>
    
    <div class="external-content">
      <ul>
        <li>
          <p><a href="https://wordpress.org/plugins/seo-ultimate/">SEO Ultimate</a></p>
        </li>
      </ul>
    </div>
    
    <p><img src="/files/seo-cms/seo-wp.png" alt="TTFB" class="border"></p>




    
    
    
    
    
    
    
    

    

    
  </li>
  
  <li>
    <p><b>Popisek <code>&lt;meta name=description></code></b> – popisek stránky se občas zobrazuje ve výsledcích hledání. Dobrý popisek může vést k vyšší míře prokliku.</p>
    
    <p>Hodí se proto, když ho umí RS nastavit.</p>
    
    <p><img src="/files/seo-rychle/serp-google.png" alt="Titulek a popisek ve výsledích vyhledávání" class="border"></p>
  </li>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <li>
    <p><b>Tvar URL</b> – řada systémů generuje identifikátory článků bez možnosti zásahu.</p>
    
    <pre><code>example.com/?id=18
example.com/nazev-clanku-tupe-prevedeny-na-mala-pismena</code></pre>
    
    <p>Pokud je v silách tvůrců obsahu vymýšlet smysluplné URL, je dobré, když jdou v systému ručně nastavit. Automatický převod názvu stránky na malá písmena nemusí být ideální.</p>
    
    <p>URL stránky se rovněž zobrazuje ve výsledcích hledání a na dalších místech, takže se hodí v ní mít klíčová slova vystihující obsah.</p>
    
    <div class="internal-content">
      <ul>
        <li>
          <p><a href="/tvar-url">10 rad pro vytvoření nejlepší URL</a></p>
        </li>
      </ul>
    </div>
  </li>
</ol>




<h2 id="bezpecnost">Bezpečnost</h2>

<p>Ačkoliv vlastní na koleně psané systémy nejsou v průměru o nic bezpečnější než populární redakční systémy typu <b>WordPressu</b>, rozšířené systémy jsou častějším terčem útoků, protože je útok na ně zajímavější – jde najednou napadnout minimálně tisíce instalací.</p>




<p>Pro snížení risika napadení se nabízí systém často updatovat. Bohužel v případě pluginů třetích stran je to složitější, protože může nastat případ, kdy rozšířený plugin převezme/koupí člověk s nekalými úmysly, aby do něj implementoval škodlivý kód.</p>


<p>Napadené weby jsou vyhledávači negativně hodnoceny.</p>




<h2 id="lokalisace">Překlad do češtiny</h2>

<p>U anglických redakčních systémů a jejich šablon může být problém s překladem do češtiny.</p>

<p><img src="/files/seo-cms/wp-en.png" alt="WordPress v angličtině" class="border"></p>














<p>V lepším případě jde texty ručně přeložit. Řada systémů ale nepočítá například s <a href="/sklonovani">českým skloňováním</a>, takže optimálního výsledku je často obtížné dosáhnout.</p>

<p>Někdy bývá problém s formátem kalendářního data.</p>


<p>Nečeský obsah stránek je ze SEO pohledu nevýhodný, protože česky hledající člověk mu nemusí rozumět.</p>

<p>S češtinou může být další problém v případě, že šablona používá <a href="/font-face">webfonty</a>, které neznají českou diakritiku. České znaky se potom zobrazují jiným fontem – takové chování zhoršuje čitelnost a celkový dojem ze stránky.</p>

<p>
  <img src="/files/font-face/ie.png" alt="Špatné zobrazení diakritiky" class="border">
</p>














<h2 id="duveryhodnost">Důvěryhodnost webu</h2>

<p>U nejrozšířenějších redakčních systémů jsou výchozí šablony značně profláknuté.</p>


<p>Stránka s tuctovým vzhledem na výchozí šabloně <b>nepůsobí na návštěvníky důvěryhodně</b>. U stránky s vlastním vzhledem je na první pohled vidět, že si autor dal s webem nějakou práci – ne jen nainstaloval redakční systém, takže je vyšší šance, že si dal i práci s obsahem.</p>


<p>
  <img src="/files/seo-cms/wp-default.png" alt="Defaultní vzhled WordPressu" class="border">
</p>






























<p>Výchozí vzhled některé návštěvníky odradí v případě, že mají negativní zkušenosti s jinými weby používajícími tutéž šablonu. To ovlivní míru okamžitého opuštění stránky.</p>


<p>Vzhledem k tomu, že vyhledávače používají <b>strojové učení</b>, může robot vyhledávače dojít k tomu, že weby postavené na výchozí šabloně jsou v průměru méně hodnotné a přenést toto negativní hodnocení i na web se skvělým obsahem – ale běžícím na výchozí šabloně.</p>



<p>Někteří lidé se z těchto důvodu snaží použitý RS maskovat.</p>