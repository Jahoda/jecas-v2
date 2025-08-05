---
title: "Ukládání hesel"
headline: "Ukládání hesel"
description: "Jakým způsobem bezpečně ukládat hesla uživatelů."
date: "2015-01-16"
last_modification: "2015-01-16"
status: 0
tags: []
format: "html"
---

<p>Pokud mají mít uživatelé možnost se na webové stránce <b>přihlašovat</b> a nepoužije se přihlašování prostřednictvím třetích stran (<b>Facebook</b>, <b>Twitter</b> nebo <b>Google</b> účtem), musí se řešit <b>ukládání hesel</b>. Většinou do database.</p>


<h2 id="jak">Jak ukládat hesla</h2>

<p>Poučky o bezpečném ukládání hesel obsahují většinou následeující doporučení:</p>

<ol>
  <li>
    <p>Heslo <b>neukládat v původní podobě</b>, jak ho uživatel zadá (tzv. v <i>plaintextu</i>), ale zahashovat ho. Existují funkce, které dokaží převést textový řetězec na jiný řetězec – hash.</p>
    
    <p>Hashovací operace je <b>jednosměrná</b>. Z  hashe není možné zpětně získat <b>původní řetězec</b>. Jediný způsob, jak <i>hash</i> prolomit je zjistit hashe pro všechny kombinace znaků a výsledek zpětně porovnat.</p>
    
    <p>MD5 hash hesla „heslo“ bude vypadat následovně:</p>
    
    <pre><code>md5(heslo) = 955db0b81ef1989b4a4dfeae8061a9a6</code></pre>
  </li>
  
  <li>
    <p>Jelikož pro <b>známé hashovací funkce</b> existují tabulky (tzv. <i lang="en">rainbow tables</i>), kde jsou pro řadu řetězců hashe už spočítané, používá se tzv. <b>sůl</b>. Bez použití soli jdou MD5 hashe jednoduchých hesel rozlousknout vložením do Googlu:</p>
    
    <p><img src="/files/ukladani-hesel/heslo.png" alt="Vyhledání hashe hesla" class="border"></p>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <p>Pojmem <i>sůl</i> se rozumí nějaký řetězec, který se před zahashováním přidá k uživatelem zadanému heslu.</p>
    
    <p>Pokud se k heslu „heslo“ přidá sůl „fytopuf“, vznikne zcela rozdílný hash:</p>
    
    <pre><code>md5(heslo<b>fytopuf</b>) = 2d77830ef0400a8dc818ad92786495d3</code></pre>
    
    <p>To by <i>Google testem</i> už prošlo, pokud by neexistovala tato stránka:</p>
    
    <p><img src="/files/ukladani-hesel/heslofytopuf.png" alt="Vyhledání hashe hesla" class="border"></p>
    
    
        
  </li>
  
  <li>
    <p>Aby se ztížilo používání metody hrubé síly, kdy se pro nejrůznější řetězce počítají odpovídající hashe, používá se pro hashování <b>pomalý algoritmus</b>.</p>
    
    
    <p>Když útočník získá osolené hashe, zjistí jaká je sůl a hashovací postup, mohl by v případě použití rychlého algoritmu (jako je MD5) začít počítat hashe pro různé kombinace znaků a hledat shodu.</p>
    
    <p>Použití pomalého algoritmu útočníka při počítání hashů <b>značně zdrží</b>.</p>
    
    
    <p>Ověření při přihlášení potom sice trvá třeba vteřinu, což návštěvník skoro ani nepostřehne, ale pro útok hrubou je to značná překážka.</p>
  </li>

</ol>

<p>Při dodržení těcho podmínek je velká šance, že ani člověk s <b>přístupem do databáse</b> nedokáže zjistit <b>skutečná hesla</b> registrovaných uživatelů.</p>



<h2 id="proc-ne">Proč nehashovat hesla</h2>

<p>Z pohledu provozovatele má <b>ukládání hesla v původní podobě</b> (nebo primitivně zahashované funkcí typu <code>md5</code>, což se dá rozlousknout váše zmíněným zadáním do Google) několik výhod. Některé jsou možná trochu za hranou.</p>



<h3 id="zapomenute">Ověření uživatele</h3>

<p>Při ověřování uživatele například po telefonu, je snazší, když provozovatel webu heslo vidí v originální podobě, než aby ho zadával.</p>



<h3 id="trest">Trestání uživatele</h3>

<p>Pokud nějaký uživatel dělá na stránce neplechu a používá <b>stejné heslo pro více služeb</b>, může se povést se jeho dalších služeb zmocnit.</p>



<h3 id="smirovani">Šmírování</h3>

<p>Při použití jednoho hesla pro více služeb vznikne přiležitost se uživateli podívat do jiných profilů a zjistit o něm více informací.</p>




<h2 id="proc">Proč hashovat hesla?</h2>

<p>Z pohledu provozovatele většiny běžných webových aplikací existuje v zásadě jediný důvod:</p>

<blockquote>
  <p><b>Vyhnout se ostudě</b>, když se někdo s nekalými úmysly dostane k databási.</p>
</blockquote>

<p>V DB se obvykle nacházejí mnohem cennější data než <i>nějaká</i> uživatelská hesla – <b>e-maily</b>, <b>telefonní čísla</b> nebo <b>ekonomické výsledky</b> a podobně.</p>






<h2 id="spravce">Správce hesel</h2>

<p>Protože většina lidí používající internet navštěvuje a přihlašuje se na spoustě webových stránek, má tak dvě možnosti:</p>

<ol>
  <li>Používat stejná hesla pro více služeb.</li>
  
  <li>Použít správce hesel.</li>
</ol>

<p>Mít <b>stejné heslo</b> pro více služeb je risikové v tom, že stačí jediná špatně zabezpečená webová služba, která bude kompromitována, a útočník může nabourat všechny další účty používající totéž heslo.</p>

<p>V případě používání téhož hesla pro více služeb je alespoň dobré mít <b>odlišné unikátní heslo pro e-mailovou schránku</b>, kterou jde typicky použít pro resetování hesel ostatních služeb.</p>




<h2 id="dvoufasove-overeni">Dvoufasové ověřování</h2>

<p>Protože navrhnout jediný způsob ověření uživatele, aby byl obtížně prolomitelný, je dost obtížné, používá se kombinace několika způsobů dohromady – to se nazývá jako <b>vícefasové/vícefaktorové ověření</b>.</p>

<p>V praxi webových aplikací se jde typicky setkat s ověřováním pomocí SMS zpráv.</p>

  
<h2 id="email">Posílání hesla na e-mail</h2>
<p>Hesla <b>neposílat e-mailem</b>.</p>

<p>Pokud se heslo nehashuje na straně klienta v JavaScriptu, na server <b>dorazí v plaintextu</b>, jak ho uživatel zadal. Aplikace tak může uživateli po registraci poslat e-mail, kde bude <b>jméno i heslo čitelné</b>.</p>

<p>To je potenciálně risikové, protože e-mailová schránka většiny lidí není žádný bezpečný tresor.</p>


<h2 id="soukrome-informace">Hesla jsou soukromé informace</h2>








<h2 id="hashovani-js">Hashování na straně klienta</h2>

<p>Na první pohled se může zdát rozumné heslo hashovat místo na serveru už v <b>prohlížeči uživatele</b> pomocí JavaScriptu. V takovém případě by se v čitelné podobě heslo <b>na server vůbec nepřenášelo</b>.</p>

<p>Na serveru by se pouze porovnal hash spočítaný v prohlížeči s hashem z DB.</p>

<p>Toto řešení by ale mělo problém v tom, že by se člověk s přístupem do database mohl <b>přihlásit za kohokoliv</b> použitím jeho hashe.</p>

<p>Hashování na straně klienta by tedy mělo být maximálně doplněk k hashování na serveru. Přenos hesla na server je lepší zabezpečit pomocí <a href="/https">HTTPS</a>. Navíc se bez hashování v prohlížeči půjde přihlásit i bez JavaScriptu.</p>



<h2 id="problemy">Problémy hesel</h2>

<p>Základní problémy hesel jsou následující:</p>

<ol>
  <li>Pro člověka je <b>obtížné si heslo zapamatovat</b>, ale pro stroj je relativně snadné ho rozlousknout.</li>
  
  <li><b>Správa hesel pro stovky různých služeb</b> je značně komplikovaná. Programy pro správu hesel jsou potom spíš nouzové řešení.</li>
</ol>


<h3 id="reseni">Řešení</h3>

<p>Obejít tyto problémy jde přihlašováním přes centrální službu jako je přihlašování přes <a href="/facebook">Facebook</a> nebo <a href="/twitter">Twitter</a>.</p>

<p>Jiná možnost je pro přihlašování nepoužívat hesla, ale zasílat jednorázové přihlašovací odkazy na e-mail. Zde může být problém v případě, že e-mail dojde pozdě.</p>

<div class="external-content">
  <ul>
    <li>Sitepoint: <a href="http://www.sitepoint.com/passwordless-authentication-works/">Why Passwordless Authentication Works</a></li>
  </ul>
</div>

<p>Hudbou budoucnosti by mohly být authentikační aplikace, které by při pokusu o přihlášení zobrazily pro uživatele dotaz, zda se chce do konkrétní služby opravdu přihlásit:</p>

<div class="external-content">
  <ul>
    <li><a href="https://danielmiessler.com/blog/replace-passwords-out-of-band-challenges/">Replacing Passwords with Out-of-band Challenges</a></li>
  </ul>
</div>