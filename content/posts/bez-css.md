---
title: "Má web fungovat bez CSS?"
headline: "Má web fungovat bez CSS?"
description: "Má cenu řešit zobrazení stránky bez stylů? Případy, kdy taková situace nastane."
date: "2015-11-11"
last_modification: "2015-11-11"
status: 1
tags: ["css", "napady"]
format: "html"
---

<p>Článek lehce doplňuje problematiku fungování bez <b>JS</b>:</p>

<div class="internal-content">
  <ul>
    <li><a href="/bez-javascriptu">Má web fungovat bez JavaScriptu?</a></li>
  </ul>
</div>

<p>Situace ohledně fungování webu bez CSS je oproti JavaScriptu trochu odlišná.</p>


<h2 id="selhani">Selhání načtení CSS</h2>

<p>Jeden z argumentů pro web fungující bez JS – <b>případ selhání načtení</b> – u kaskádových stylů moc uplatňovat nejde.</p>

<p>Při běžném připojení CSS značkou <code>&lt;link></code> v hlavičce (<a href="/html-kostra#head"><code>&lt;head></code></a>) se totiž <b>čeká na stažení CSS</b>. Do té doby prohlížeč nic <a href="/vykreslovani">nevykreslí</a>. Dělá to zřejmě proto, aby po dotažení CSS (což za běžných okolností nastane brzy) nemusel všechno překreslovat.</p>

<p>Obecně tak platí, že v případě <b>selhání CSS</b> se nezobrazí vůbec nic.</p>

<p>Dnešní prohlížeče mají nejspíš větší trpělivost čekat na stažení CSS než uživatelé. Klidně budou vyčkávat třeba půl minuty.</p>

<ul>
  <li>
    <p>Zajímavě se chová <a href="/microsoft-edge"><b>Edge</b></a>, který po 5 vteřinách marného čekání na CSS přestane signalisovat průběh načítání, ale jinak stále čeká a v případě úspěchu stránku zobrazí.</p></li>
  <li>
    <p>Výjimkou je stará <b>Opera 12</b>, která po pěti vteřinách marného čekání zobrazí stránku bez stylů a CSS aplikuje, až když se případně stáhne.</p>
  </li>
</ul>




<h3 id="necekani-css">Nečekání na CSS</h3>

<p>I CSS je možné <a href="/nacitani-css">načítat asynchronně</a>, aby se na něj nemuselo čekat. V takovém případě se může stát, že se stránka bez stylů zobrazí.</p>

<p>Typicky se ale asynchronní načítání CSS nepoužívá pro <b>kritické části stylů</b> – ty se v takovém případě dávají do značky <code>&lt;style></code> přímo do hlavičky HTML kódu. Potom se stránka bez CSS načíst nemůže, protože styly jsou v kódu před obsahem.</p>





<h2 id="kdy">Kdy se web zobrazí bez CSS?</h2>

<p>Případ, kdy se stránka zobrazí bez CSS, je tedy hodně vzácný. Může nastat, když:</p>

<ol>
  <li>
    <p>CSS soubor <b>neexistuje</b> – jeho URL vrátí chybu 404 (či jinou). Prohlížeč potom ví, že se stylu nedočká a web vykreslí.</p>
  </li>
  <li>
    <p>Uživatel <b>ručně zastaví načítání</b> během čekání na CSS soubor. Prohlížeč vykreslí stránku.</p>
    
    <p><img src="/files/bez-css/prerusit.png" alt="Přerušit načítání stránky" class="border"></p>
  </li>
  <li>
    <p>V CSS je <b>syntaktická chyba</b> – přestože je CSS relativně tolerantní k chybám, jde skoro celé rozbít tím, že na začátku bude deklarace s chybějícím <kbd>}</kbd>. To vyřadí všechna následující pravidla (<a href="http://kod.djpw.cz/fbsb">ukázka</a>).</p>
    
    <pre><code>h1 {
    color: green;
    
/* a teď už je všechno neplatné */
h1 {color: red}</code></pre>
  </li>
  
  
  <li>
    <p>Návštěvník si <b>CSS vypne</b>. To drtivá většina lidí neumí. V nových prohlížečích je taková možnost zpravidla špatně přístupná / nedostupná.</p>
    
    <p>Pro testovací účely je nejsnazší nainstalovat doplněk typu <b>Web Developer Toolbar</b>, který nabízí možnost vypnutí/zapnutí CSS docela přístupně a pohodlně.</p>
    
    <div class="external-content">
      <ul>
        <li>
          <p><a href="https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm">Rozšíření Web Developer pro <b>Chrome</b></a></p>
          
          <p><img src="/files/bez-css/web-developer.png" alt="Web Developer rozšíření pro Chrome" class="border"></p>
        </li>
      </ul>
    </div>
    
    
    
    
    
    
    
    
    
    
  
    
    <p>Ruční deaktivace CSS u vlastního webu jde provést prostým zakomentováním připojování CSS.</p>
    
    <p>Deaktivovat styly na cizí stránce jde i následujícím kouskem JavaScriptu (je možné ho zadat do adresního řádku za <code>javascript:</code>).</p>
      
    <pre><code>(function(el) {
  for (var i = el.length; i--;) {
    el[i].parentNode.removeChild(el[i]); 
  }
})(document.querySelectorAll('style, link'));</code></pre>
  </li>
</ol>





<h2 id="seo">Vypnuté CSS a SEO</h2>

<p>Zobrazit si pouze <b>HTML strukturu bez stylů</b> se může hodit pro lepší představu o tom, jak stránku vidí vyhledávače nebo uživatelé hlasových čteček.</p>

<p>I když třeba <a href="/google">Google</a> se styly pracuje. Proto je potom problém, když mají vyhledávače zakázaný přístup do složek s <code>*.css</code> soubory v <code>robots.txt</code>.</p>

<p>Z pohledu čtenáře webu se vypnutí stylů hodí u <b>špatně čitelných stránek</b>. Některé prohlížeče pro takový případ mají zvláštní režim pro čtení (<i lang="en">reading view</i>).</p>








<h2 id="html">HTML formátování</h2>

<p>Teoreticky se je možné vrátit do minulého tisíciletí a layout i celý vzhled webu udělat bez stylů pomocí HTML presentačních atributů a tabulkového layoutu.</p>

<p>Potom může web vypadat bez stylů skoro tak dobře jako s nimi.</p>

<p>Dělá se to tak občas v případech <b>HTML e-mailů</b>, aby fungovaly ve starých poštovních programech.</p>

<p>Pro běžný web v tom ale nevidím smysl.</p>