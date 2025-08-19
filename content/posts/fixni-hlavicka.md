---
title: "Proč nepoužívat fixní hlavičku"
headline: "Proč nepoužívat fixní hlavičku"
description: "Proč se vyhnout fixování záhlaví/menu k hornímu okraji obrazovky."
date: "2015-08-22"
last_modification: "2025-08-18"
status: 1
tags: ["fixed", "responsive", "ux"]
format: "html"
---

<p>Některé weby při odrolování <b>zafixují navigaci</b> k hornímu okraji. Docílit toho jde pomocí CSS <code>position: fixed</code> nebo <code>position: sticky</code>:</p>

<div class="internal-content">
  <ul>
    <li><a href="/fixni-menu">Fixní menu při rolování</a> – jak při odrolování stránky zafixovat menu na horní hraně obrazovky</li>
  </ul>
</div>

<h2 id="prostor">Zmenšení prostoru</h2>

<p>Zásadní problém zafixované vodorovné navigace tkví v <b>omezení dostupného prostoru</b> pro obsah.</p>

<p>Mohlo by se zdát, že je to problém jen mobilních zařízení s <b>malou obrazovkou</b>, ale ani monitory a displeje desktopů nebo notebooků nemají výšku na rozdávání, protože je většina <b>širokoúhlých</b>.</p>

<p>Nejčastější rozlišení v roce 2025 jsou <b>1920 × 1080</b> (Full HD) a <b>2560 × 1440</b> (2K), ale stále významné procento uživatelů používá <b>1366 × 768</b> na noteboocích. Všechna tato rozlišení mají relativně malou výšku oproti šířce.</p>

<p>Navíc na desktopu ze svislého prostoru ubere místo:</p>

<ul>
  <li>Hlavní systémová lišta (cca <b>40 px</b>).</li>
  <li>Záhlaví prohlížeče (cca <b>60 px</b>).</li>
  <li>Lišta záložek, kterou někdo používá (cca <b>30 px</b>).</li>
  <li>Někteří uživatelé používají ještě další vlastní lišty nebo rozšíření.</li>
  <li>Na macOS může být ještě větší prostor zabrán systémovými prvky.</li>
</ul>

<p>Nakonec tak zbude pro samotný obsah webu často jen něco přes 600 pixelů na výšku, což není mnoho.</p>

<div class="live">
  <div class="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 shadow-sm">
    <h3 class="text-lg font-semibold mb-4 mt-0 dark:text-white">Kalkulátor dostupné výšky</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded">
          <h4 class="font-medium mb-2 mt-0 dark:text-white">Rozlišení obrazovky</h4>
          <div class="text-sm space-y-1 dark:text-gray-300">
            <div><strong>Celková výška:</strong> <span id="screen-height">-</span>px</div>
            <div><strong>Dostupná výška:</strong> <span id="available-height">-</span>px</div>
            <div><strong>UI prohlížeče:</strong> <span id="browser-ui">-</span>px</div>
          </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded">
          <h4 class="font-medium mb-2 mt-0 dark:text-white">Fixní hlavička</h4>
          <div class="space-y-2">
            <label class="block text-sm dark:text-gray-300">
              Výška hlavičky (px):
              <input 
                type="range" 
                min="0" 
                max="200" 
                value="60"
                id="header-height"
                class="w-full mt-1"
                oninput="updateCalculations()"
              />
              <span class="text-lg font-bold text-blue-600 dark:text-blue-400" id="header-display">60px</span>
            </label>
          </div>
        </div>
      </div>

      <div class="bg-green-50 dark:bg-green-900/30 p-4 rounded">
        <h4 class="font-medium mb-2 mt-0 dark:text-white">Výsledek</h4>
        <div class="space-y-3">
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400" id="content-height">-</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Dostupná výška pro obsah</div>
          </div>
          
          <div class="text-center">
            <div class="text-lg font-semibold text-green-600 dark:text-green-400" id="available-percent">-</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Procento dostupného prostoru</div>
          </div>

          <div class="text-center">
            <div class="text-lg font-semibold text-red-600 dark:text-red-400" id="header-percent">-</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Procento zabrané hlavičkou</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded border-l-4 border-yellow-400 dark:border-yellow-500">
      <div class="relative bg-gray-200 dark:bg-gray-600 rounded h-32 overflow-hidden">
        <div class="absolute top-0 left-0 right-0 bg-blue-400 text-white text-xs p-1 text-center" id="browser-ui-visual" style="height: 0px">
          UI prohlížeče
        </div>
        <div class="absolute top-0 left-0 right-0 bg-red-400 text-white text-xs p-1 text-center" id="header-visual" style="height: 0px">
          Fixní hlavička
        </div>
        <div class="absolute top-0 left-0 right-0 bg-green-400 text-white text-xs p-1 text-center" id="content-visual" style="top: 0px; height: 128px">
          Obsah
        </div>
      </div>
      <div class="flex gap-4 mt-3 text-xs flex-wrap dark:text-gray-300">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-blue-400 rounded"></div>
          <span>UI prohlížeče</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-red-400 rounded"></div>
          <span>Fixní hlavička</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-green-400 rounded"></div>
          <span>Dostupný obsah</span>
        </div>
      </div>
      <div class="text-xs text-gray-600 dark:text-gray-400 mt-2">
        Vizualizace je proporcionální k celkové výšce obrazovky
      </div>
    </div>
  </div>

  <script>
    function updateHeights() {
      const screenHeight = window.screen.height;
      const availableHeight = window.innerHeight;
      const browserUI = screenHeight - availableHeight;
      
      document.getElementById('screen-height').textContent = screenHeight;
      document.getElementById('available-height').textContent = availableHeight;
      document.getElementById('browser-ui').textContent = browserUI;
      
      updateCalculations();
    }
    
    function updateCalculations() {
      const screenHeight = window.screen.height;
      const availableHeight = window.innerHeight;
      const browserUI = screenHeight - availableHeight;
      const headerHeight = parseInt(document.getElementById('header-height').value);
      const contentHeight = availableHeight - headerHeight;
      
      document.getElementById('header-display').textContent = headerHeight + 'px';
      document.getElementById('content-height').textContent = contentHeight + 'px';
      document.getElementById('available-percent').textContent = Math.round((contentHeight / availableHeight) * 100) + '%';
      document.getElementById('header-percent').textContent = Math.round((headerHeight / availableHeight) * 100) + '%';
      
      const visualHeight = 128;
      const browserUIVisualHeight = Math.round((browserUI / screenHeight) * visualHeight);
      const headerVisualHeight = Math.round((headerHeight / screenHeight) * visualHeight);
      const contentVisualHeight = visualHeight - browserUIVisualHeight - headerVisualHeight;
      
      document.getElementById('browser-ui-visual').style.height = browserUIVisualHeight + 'px';
      document.getElementById('header-visual').style.height = headerVisualHeight + 'px';
      document.getElementById('header-visual').style.top = browserUIVisualHeight + 'px';
      document.getElementById('content-visual').style.top = (browserUIVisualHeight + headerVisualHeight) + 'px';
      document.getElementById('content-visual').style.height = contentVisualHeight + 'px';
    }
    
    window.addEventListener('resize', updateHeights);
    updateHeights();
  </script>
</div>

<p>Výška fixní hlavičky může mít třeba <b>50-80 pixelů</b> (moderní navigace jsou často vyšší kvůli touch-friendly designu), což znamená, že bude neustále <b>užírat 8-12 % dostupného místa</b>.</p>

<p>Asi nejextrémnější situace nastává u mobilních telefonů při zobrazení webu na šířku. V tomto případě fixní hlavička zabere klidně 1/5 prostoru.</p>

<h2 id="moderni-reseni">Moderní řešení</h2>

<p>Dnešní webové aplikace často používají sofistikovanější přístupy než jednoduché fixní hlavičky:</p>

<ul>
  <li><b>Sticky navigace</b> – hlavička se zafixuje až po určité vzdálenosti od vrcholu</li>
  <li><b>Chytré zobrazování/skrývání</b> – hlavička se skryje při scrollování dolů a zobrazí při scrollování nahoru</li>
  <li><b>Zjednodušená navigace</b> – hlavička se zmenší nebo zjednoduší při scrollování</li>
  <li><b>Hamburger menu</b> – navigace se skryje do ikony na mobilních zařízeních</li>
</ul>

<h2 id="fixni">Proč fixní</h2>

<p>Při aplikaci zafixované hlavičky (nebo jiného fixního obsahu) je vhodné mít <b>dobrý důvod</b>, proč to udělat.</p>

<blockquote>
  <p>Dobrým důvodem není, že to vypadá <i lang="en">cool</i> a mají to na nějakém jiném webu.</p>
</blockquote>

<p>Prostor, který je neustále viditelný a snižuje tak dostupné místo pro ostatní obsah, by <b>měl obsahovat něco hodně důležitého</b>. Je k úvaze, jestli je běžná navigace tak důležitá, aby se tím neustálý zábor místa ospravedlnil.</p>

<p>Další možný problém stále fixní navigace je <b>odvádění pozornosti od obsahu</b>.</p>

<p>Nabízí se také možnost odkazy na ostatní stránky přidávat přímo do obsahu, kde to dává smysl. Nebo mít na konci stránku zmíněné možnosti „<b>Kam dál</b>", odkaz pro <b>návrat na hlavní stranu</b> a podobně.</p>

<p>Hodit se může také <b>drobečková navigace</b> umístěná i pod obsahem na konci stránky.</p>

<p>Občas se používají plovoucí tlačítka pro návrat nahoru.</p>

<h2 id="doporučení">Kdy (ne)používat fixní hlavičku</h2>

<p>Fixní hlavička tedy není vhodná pro všechny typy webů. Zde jsou orientační doporučení:</p>

<h3 id="vhodné">Vhodné pro fixní hlavičku</h3>

<ul>
  <li><b>E-commerce weby</b> – košík a vyhledávání se hodí mít po ruce</li>
  <li><b>Aplikace s častou navigací</b> – dashboardy, admin rozhraní, nástroje</li>
  <li><b>Weby s rychle se měnícím obsahem</b> – novinky, sociální sítě</li>
</ul>

<h3 id="nevhodné">Nevhodné pro fixní hlavičku</h3>

<ul>
  <li><b>Čtenářské weby</b> – blogy, články, dokumentace</li>
  <li><b>Prezentační stránky</b> – landing pages, portfolia</li>
  <li><b>Weby s krátkým obsahem</b> – kontaktní stránky, jednoduché prezentace</li>
  <li><b>Weby zaměřené na obsah</b> – kde je důležitější čtení než navigace</li>
</ul>

<h2 id="rolovani-nahoru">Zobrazení při rolování vzhůru</h2>

<p>Některé weby problém s místem a odváděním pozornosti fixního obsahu řeší jeho zobrazováním <b>na základě směru rolování</b>.</p>

<p>Pokud člověk po příchodu na stránku začne rolovat směrem dolů, hlavička neustále viditelná (fixní) nebude. Zobrazí se až při rolování směrem nahoru.</p>

<p>Vychází se z předpokladu, že pohybem vzhůru dává návštěvník najevo, že se chce dostat na hlavičku, která je nahoře.</p>

<p>Bohužel uživatel může mít tendenci vyjet vzhůru i v případě, že se chce jen dostat k obsahu, který přejel. V takovém případě ho zobrazení fixního obsahu nejspíš naštve, protože mu překryje obsah, ke kterému se chce dostat.</p>

<p>Tuto situaci jde částečně řešit tak, že se při rolování vzhůru (navíc třeba ještě s nějakou tolerancí) fixní prvek umístí nad horní hranu – tím nepřekryje obsah, ale bude nutné se k němu ještě déle prorolovat.</p>

<h2 id="kratke">Krátké stránky</h2>

<p>Zajímavý způsob, jak se nutnosti fixní navigace (nebo jiného obsahu) vyhnout, je vytvářet stránky dostatečně krátké na to, aby potom nebyl problém odrolovat na začátek.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://www.nngroup.com/articles/mobile-navigation-patterns/">Mobile Navigation Patterns</a></li>
  <li><a href="http://exisweb.net/abtest-fixed-navbar">Fixed Headers on Mobile: A/B Tested</a></li>
  <li><a href="http://bradfrost.com/blog/mobile/fixed-position/">Fixed Positioning in Mobile Browsers</a></li>
</ul>