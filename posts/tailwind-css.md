---
title: "Tailwind CSS"
headline: "Tailwind CSS"
description: "CSS framework pro stylování webů přes utility třídy."
date: "2021-11-20"
last_modification: "2021-11-24"
status: 1
tags: ["css", "knihovny", "produktivita"]
format: "html"
---

<p>Tailwind je CSS framework, který umožňuje kompletně nakódovat web bez toho, aby bylo potřeba psát jakékoliv CSS.</p>

<p>Zatímco například jiný populární framework <a href="/bootstrap-rychlokurs">Bootstrap</a> přináší základní nastavení typografie a předpřipravené komponenty, Tailwind na to jde jinou cestou a <i>jen</i> nabízí obecné utility třídy pro kompletní vlastní stylování.</p>


<div class="external-content">
  <ul>
    <li>
      <a href="https://tailwindcss.com">Tailwind CSS</a>
    </li>
  </ul>
</div>


<h2 id="utility">Utility třídy</h2>

<p>Celá myšlenka je postavena na tom, že jsou v CSS předpřipravené jednoduché universální CSS třídy pro prakticky každou kombinaci vlastnost: hodnota.</p>

<p>CSS se potom nepíše k jednotlivým selektorům ve stylu:</p>

<pre><code>.komponenta {
  text-align: center;
  padding: 1rem;
  color: red;
}</code></pre>











<p>Místo toho se na HTML prvek rovnou aplikují příslušné třídy a do CSS se vůbec nezasahuje. Takže ekvivalentní zápis vypadá zhruba následovně:</p>

<pre><code>&lt;div class="text-center p-4 text-red-500"></code></pre>


<p><a href="https://play.tailwindcss.com/zCjotCfMRB">Živá ukázka</a></p>



<p>Před lety se tento přístup nazýval jako <a href="/expressive-css">expresivní CSS</a>.</p>


<h2 id="inline">Inline styly</h2>

<p>Na první pohled to dost připomíná používání inline stylů přes HTML atribut <code>style</code>:</p>


<pre><code>&lt;div class="text-align: center; padding: 1rem; color: red"></code></pre>


<p>Má to ale oproti tomu značné výhody:</p>

<ol>
  <li>
    <p>Člověk je <b>omezen</b> na několik předpřipravených velikostí/rozměrů/barev apod. Takže je výsledek relativně <b>visuálně konsistentní</b>.</p>

    <p>Není možné si dělat úplně cokoliv (alespoň ve výchozí konfiguraci).</p>
    <p><img src="/files/tailwind-css/pripravene-fixni-vysky.png" alt="Připravené fixní výšky" class="border"></p>
  </li>











  <li>
    <p>Styly těchto předpřipravených tříd lze snadno hromadně změnit úpravou konfigurace.</p>
  </li>

  <li>
    <p><b>Responsivita</b> – Tailwind třídy jsou <a href="/responsive">responsivní</a> a používají <a href="/mobile-first">mobile first</a> přístup.</p>

    <p>Bleskurychle tak lze vytvářet responsivní komponenty.</p>

    <p>Následující kód zarovná text na střed a od <code>sm</code> (výchozí šířka 640 px) vlevo díky <a href="/media"><code>@media</code> pravidlům</a>.</p>

    <pre><code>&lt;div class="text-center sm:text-left"></code></pre>
  </li>

  <li>
    <p><b>Uživatelské stavy</b> jako <code>:hover</code>, <code>:focus</code> a podobně. Zapisují se jednoduše s názvem stavu a dvojtečkou před vlastnost.</p>

    <pre><code>&lt;button class="bg-red-500 <b>hover:</b>bg-red-700"></code></pre>
  </li>

  <li>
    <p><b><a href="/dark-theme">Tmavý režim</a></b> – stačí před třídu přidat <code>dark:</code>, je možné kombinovat i se stavy nebo responsivními breakpointy.</p>

    <p>Takže třída <code>lg:hover:dark:bg-red-700</code> se aplikuje na velkých obrazovkách ve tmavém režimu po najetí myší.</p>
  </li>

</ol>


<h2 id="uzitecne">Další užitečné vlastnosti</h2>

<p>Tailwind nabízí další zajímavé vlastnosti usnadňující stylování, namátkou:</p>

<ol>
  <li>
    <p><b>Odsazení</b> přes <a href="/margin"><code>margin</code></a> (<code>m-*</code>) a <code>padding</code> (<code>p-*</code>).</p>
  </li>
  <li>
    <p>Třídy pro layout pomocí <a href="/float"><code>float</code>u</a> <a href="/flexbox">flexu</a> nebo gridu.</p>
  </li>
    <li>
    <p><b><a href="/animace">Animace</a>, transformace</b> a <a href="/transition"><code>transition</code></a> – jsou připravené základní animace jako otáčení (<code>animate-spin</code>), pulsování (<code>animate-pulse</code>) a další.</p>

    <p><a href="/rotace">Rotace</a> objektu je otázka přidání třídy <code>rotate-*</code>.</p>

    <p>Díky <code>transition</code> mohou být přechody plynulé.</p>

    <p><a href="https://play.tailwindcss.com/SGIjrB67I6">Živá ukázka</a></p>
  </li>
  <li>
    <p><a href="/box-shadow">Stíny</a> a <a href="/filter">filtry</a>.</p>
  </li>
</ol>

<p>Kompletní přehled je v <a href="https://tailwindcss.com/docs">dokumentaci</a>.</p>


<h2 id="velikost">Velikost CSS</h2>

<p>Velikost minifikovaného spojeného Tailwind CSS souboru je někde kolem <b>3 MB</b> (gzipovaného cca 300 kB). To je na jednu stranu hrozně moc, na stranu druhou je doporučené používat knihovnu <a href="https://purgecss.com">PurgeCSS</a>, která je již zabudovaná.</p>

<p>Díky tomu se projde HTML kód a ponechají se pouze ty CSS třídy, které se používají.</p>

<p>Výsledkem je (v závislosti na projektu) obvykle <b>velmi malé výsledné CSS</b> v řádech jednotek či nízkých desítek kB.</p>

<p>Obvykle je výsledek datově lepší, než při psaní veškerého CSS do vlastních selektorů.</p>

<p>Odstraňovat nepoužité CSS umí Tailwind i tzv. <i>just in time</i> během vývoje, slouží k tomu JIT mode.</p>

<pre><code>// tailwind.config.js
module.exports = {
 <b>mode: 'jit'</b>,
  purge: [
    // ...
  ],
  theme: {
    // ...
  }
  // ...
}</code></pre>






<p>Nehrozí tak zpomalení a zanesení <a href="/vyvojarske-nastroje">DevTools</a> hromadou zbytečných nepoužitých tříd.</p>



<h2 id="opakovani-html">Opakování tříd v HTML</h2>

<p>Používání vlastních CSS selektorů je dobré k tomu, že jde styly snadno znovupoužívat v HTML kódu.</p>


<p>Do kódu se píše něco jako:</p>

<pre><code>&lt;div class="nadpis"></code></pre>








<p>Místo neustálého opakování:</p>

<pre><code>&lt;div class="text-center p-4 text-red-500"></code></pre>


<p>Opakovat více stejných utility tříd v žádném případě <b>není dobré dělat</b> a Tailwind nabízí 2 možná řešení, jak se tomu vyhnout:</p>


<ol>
  <li>
    <p>Konstrukce <code>@apply</code> – třídy z HTML stačí přesunout do běžného CSS selektoru za klíčové slovo <code>@apply</code> a v kódu používat vlastní selektor místo utilit tříd:</p>
    
    <pre><code>.nadpis {
  @apply text-center p-4 text-red-500
}</code></pre>
    
    
    <p>Případně lze vlastní selektory se styly zapsat přímo do <a href="https://tailwindcss.com/docs/extracting-components#writing-a-component-plugin">konfigurace</a>.</p>
  </li>
  
  <li>
    <p><b>Šablonovací/komponentový systém</b> – při použití dobrého šablonovacího nástroje není <code>@apply</code> příliš potřeba používat.</p>
    
    <p>V JS frameworcích typu Reactu, Vue nebo Svelte se přímo z <code>&lt;div class="text-center p-4 text-red-500"></code> může udělat komponenta <code>&lt;Nadpis></code> a opakovaně ji používat, kde je potřeba.</p>
    
    <p>Případně si třídy uložit někam do JS konstanty a naimportovat, kde je potřeba:</p>
    
    <pre><code>const nadpis = 'text-center p-4 text-red-400'</code></pre>
  </li>
</ol>





<h2 id="omezene">(Ne)omezené možnosti</h2>

<p>V Tailwindu jde nakódovat asi 99 % myslitelných věcí.</p>

<p>Díky hranatým závorkám jde ve specifických případech zapisovat i libovolné vlastní hodnoty.</p>

<p>Třeba posunout něco o 13 pixelů:</p>

<pre><code>&lt;div class="relative top-[13px]"></code></pre>








<p>Nebo si nastavit vlastní barvu:</p>

<pre><code>&lt;div class="md:hover:text-[#ff0000]"></code></pre>





<p>Navíc to všechno funguje se stavy, <code>@media</code> pravidly atd. Tailwind automaticky pro tyto konstrukce vygeneruje příslušné třídy.</p>

<p>Vlastní věci jde případně přidávat jako <a href="https://tailwindcss.com/docs/plugins">pluginy do konfigurace</a>.</p>

<p>A koneckonců pořád nic člověku nebrání použít přímo <code>style</code> atribut nebo vlastní selektor.</p>





<h2 id="wysiwyg">WYSIWYG editory a uživatelský obsah</h2>

<p>Zadává-li se obsah do stránky prostřednictvím nějakého <a href="/wysiwyg">WYSIWYG editoru</a> nebo je zdrojem třeba text v <a href="/markdown">Markdownu</a>, nejsou běžné utility třídy moc použitelné.</p>

<p>Musely by se nějak naroubovat na strukturovaný obsah.</p>

<p>Tento problém řeší <a href="https://github.com/tailwindlabs/tailwindcss-typography">typography plugin</a>. Díky tomu stačí takový obsah obalit do rodiče s třídou <code>prose</code>:</p>

<pre><code>&lt;div class="prose">
  Uživatelský obsah
&lt;/div></code></pre>

<p>A prvky uvnitř jako <a href="/nadpisy">nadpisy</a>, odstavce, <a href="/seznamy">seznamy</a> atd. dostanou hezčí styl. <a href="https://play.tailwindcss.com/cDEjmn2pcV">Ukázka</a></p>

<p><img src="/files/tailwind-css/stylovani-uzivatelskeho-obsahu.png" alt="Stylování uživatelského obsahu" class="border"></p>






























<p>Pokud výchozí styl nevyhovuje, jde ho snadno změnit v konfiguraci, opět bez žádného psaní vlastního CSS.</p>




<h2 id="podpora">Podpora v editorech</h2>

<p>Tailwind CSS má i dobrou podporu v editorech. Existují rozšíření do VS Code i JetBrains editorů jako je <a href="/phpstorm-vs-webstorm">PhpStorm/WebStorm</a>.</p>


<p><img src="/files/tailwind-css/tailwind-code.png" alt="Tailwind Code" class="border"></p>




















<p>Editor tak bude spolehlivě napovídat Tailwind utility třídy.</p>

<p>Dokonce i rovnou u nich zobrazovat výsledné CSS:</p>


<p><img src="/files/tailwind-css/napovidani-trid.png" alt="Napovídání tříd" class="border"></p>










<h2 id="zaver">Závěr</h2>

<p>Pokud je možné v projektu používat vlastní komponenty (popř. sdílené části šablon) a odstraňovat při buildu nepoužívaný kód, neexistuje moc důvodů proč Tailwind nepoužít.</p>


<p>Prakticky všechny dřívější nevýhody utility tříd jsou vyřešeny.</p>

<p>I kdyby byl člověku nesympatický zápis stylů do HTML atributu <code>class</code> (popř. <code>className</code> v Reactu), může se Tailwind hodit alespoň na nějaké drobnosti jako grid, odsazení apod.</p>







<p>Díky PurgeCSS zůstane jen to použité a nenafoukne se tak datová velikost výsledného CSS.</p>




<p>Kromě výhody v rychlejší práci pro vývojáře bude nejspíš styl webu postavený v Tailwindu i lepší pro návštěvníka díky <a href="/zrychlovani">rychlejšímu</a> načtení stránky.</p>


<h3 id="nepouzivat">Proč Tailwind nepoužívat</h3>

<p>Moc důvodů nevidím.</p>

<p>Možná jde jen o módní vlnu.</p>

<p>Ze začátku je trochu <b>nezvyk</b> psát specifické zkratky HTML tříd místo klasického CSS.</p>

<p>U starého projektu může být komplikovanější mít automatické promazávání nepoužívaných stylů nebo mít dobře znovupoužitelné JS komponenty s HTML třídami.</p>






<p>Pokud projekt <b>nepotřebuje vlastní stylování</b>, ale používá nějakou hotovou UI knihovnu – např. <a href="https://vuetifyjs.com/en/">Vuetify</a> – asi není potřeba ještě připojovat Tailwind.</p>





<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>
    Vzhůru dolů: <a href="www.vzhurudolu.cz/prirucka/tailwind-css">Tailwind CSS: další evoluční krok pro CSS frameworky</a>
  </li>
</ul>