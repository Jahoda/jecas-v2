---
title: "Storybook"
headline: "Storybook"
description: "Storybook je nástroj pro snadné generování přehledu UI komponent."
date: "2021-11-10"
last_modification: "2021-11-18"
status: 1
tags: ["napady", "produktivita", "style-guide"]
format: "html"
---

<p>Při kódování zvlášť větších webů vzniká problém – nikdo už si <b>nepamatuje</b>, jaké věci jsou již vytvořené.</p>

<p>Když je potom potřeba přidat novou funkcionalitu, buď se musí celá nakódovat, nebo složitě procházet web a hledat, jestli by nešlo použít už něco hotového.</p>

<p>Tyto problémy snižuje existence tzv. <i>styleguidu</i>. A <b>Storybook</b> je jedním z takových nástrojů, který styleguide dokáže snadno vytvořit.</p>

<div class="external-content">
  <ul>
    <li>
      <a href="https://storybook.js.org">Storybook – Build component driven UIs faster</a>
    </li>
  </ul>
</div>

<p><img src="/files/storybook/storybook.png" alt="Storybook" class="border"></p>




























<p>V praxi je to samostatná aplikace, kde je přehled použitých komponent na webu.</p>

<p>Jde ji následně i zbuildit do statických souborů a vystavit někde veřejně.</p>

<p>To ale není vše, má to další užitečné vlastnosti:</p>

<ol>
  <li>
    <p><b>Snadnější testování a vývoj</b> – ve Storybooku jdou znázornit všechny myslitelné stavy komponent a snadno mezi nimi přepínat.</p>
    <p>Není tak nutné složitě simulovat požadovaný stav přímo v aplikaci.</p>
    
    <p><img src="/files/storybook/prepinani-stavu-komponenty.png" alt="Přepínání stavů komponenty" class="border"></p>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  </li>
  
  <li>
    <p><b>Spolupráce více lidí</b> – frontend vývojář si může bokem připravit jednotlivé komponenty bez nějakých závislostí na backendu.</p>
    
    <p>Práce jde díky tomu i lépe rozdělit mezi více lidí. Jeden člověk může kódovat komponenty ve Storybooku a jiný je potom implementovat do systému.</p>
  </li>
  
  <li>
    <p><b>Dokumentace</b> – styleguide slouží zároveň jako dokumentace. Kromě zobrazení všech stavů je možné přidat i vlastní textové poznámky k použití.</p>
  </li>
  
  <li>
    <p><b>Sdílení stylů napříč projekty</b> – je-li potřeba nějaké společné styly používat na různých projektech, styleguide může hodně pomoci.</p>
    
    <p>Vytvoří se nový repositář se Storybookem, kde se společné hotové styly odpresentují, a celé se to potom připojí jako závislost.</p>
  </li>
  
  <li>
    <p><b>Podpora různých frameworků/knihoven</b> – není nutné používat jenom např. React, ale podporována je prakticky libovolná populární JS knihovna, web komponenty, čisté HTML, čisté CSS nebo různé CSS preprocesory.</p>
    
    <ul>
      <li>React</li>
      <li>Vue</li>
      <li>Angular</li>
      <li>Web Components</li>
      <li>Ember</li>
      <li>HTML</li>
      <li>Mithril</li>
      <li>Marko</li>
      <li>Svelte</li>
      <li>Riot</li>
      <li>Preact</li>
      <li>Rax</li>
    </ul>
  </li>
</ol>






<h2 id="instalace">Instalace</h2>

<p>Nejjednodušší je nainstalovat do projektu přes <code>npx</code>:</p>

<pre><code>npx sb init</code></pre>







<p>Pokud <code>npx</code> neexistuje, stačí doinstalovat přes <code>npm install -g npx</code>.</p>

<p>Instalace Storybooku je tak chytrá, že automaticky rozpozná použitý JS framework, vše podle toho nainstaluje a připraví v daném stylu ukázku.</p>

<p><b>Spouští</b> se přes:</p>

<pre><code>npm run storybook</code></pre>




<p>Zobrazit by se měla nová stránka s příkladem pár komponent:</p>

<p><img src="/files/storybook/storybook-prehled.png" alt="Storybook přehled" class="border"></p>




























<h2 id="dokumentace">Dokumentace komponenty</h2>

<p>Ve výchozím nastavení se komponenty, které mají být zdokumentované ve Storybooku, dávají do složky <code>stories</code>.</p>

<p>Hned vedle komponenty ke zdokumentování se vytvoří další komponenty se <code>stories</code> před příponou, která popisuje, jak se má komponenta používat.</p>

<p>Příklad ve <b>Svelte</b>:</p>

<p><img src="/files/storybook/stories-ve-svelte.png" alt="Stories ve Svelte" class="border"></p>



















<p>U komponenty mohou být i CSS styly, které se do ní potom importují, záleží na preferovaném způsobu stylování.</p>

<p>Tento postup není nijak vnucený, samotné komponenty i <i>stories</i> mohou být v libovolných umístěních.</p>

<p>Samostatná složka se vůbec nemusí používat, klidně stačí založit vedle komponenty soubor <code>neco.stories.js</code> a Storybook si to sám najde.</p>

<p>(Dokonce i ty soubory mohou mít místo <code>stories</code> v názvu třeba <code>fytopuf</code> a může to při požadovaném nastavení v <code>.storybook/main.js</code> fungovat.)</p>

<p><img src="/files/storybook/stories-u-komponenty.png" alt="Stories u komponenty" class="border"></p>














<p>To je hezká vlastnost Storybooku, že jde snadno <b>začlenit i do již existujícího projektu</b> a začít postupně dopisovat dokumentaci.</p>



<h2 id="vite">Storybook a Vite</h2>

<p>Kromě různých JS frameworků Storybook podporuje i jiné nástroje pro build.</p>

<p><img src="/files/storybook/storybook-a-vite.png" alt="Storybook a Vite" class="border"></p>



























<p>Jde použít i <a href="/vite">Vite</a> a výrazně si zrychlit celý build a následný hot reload.</p>

<p>Stačí nainstalovat s parametrem pro Vite builder:</p>

<pre><code>npx sb init --builder storybook-builder-vite</code></pre>




<h2 id="zaver">Závěr</h2>

<p>Osobně nevidím moc důvod nástroj typu Storybook nepoužívat. Není to jen pro nové projekty – jde ho prakticky okamžitě přidat i do něčeho staršího.</p>

<p>Snad s výjimkou nějakého prototypování, kdy může psaní dokumentace zdržovat, ale u dlouhodobého projektu se to vyplatí.</p>