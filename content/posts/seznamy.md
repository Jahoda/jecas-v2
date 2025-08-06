---
title: "HTML seznamy"
headline: "HTML seznamy"
description: "Přehled všech typů seznamů, které se v HTML používají."
date: "2015-07-10"
last_modification: "2015-07-23"
status: 1
tags: ["html", "html-tagy"]
format: "html"
---

<p>Seznamy jsou na webových stránkách užitečný nástroj, jak <b>zpřehlednit</b> obsah – zvlášť u delšího textu.</p>

<p><img src="/files/article-large/seznamy.png" alt="Přehled HTML seznamů" class="border"></p>
















<p>Řada návštěvníků nečte web písmeno po písmenku, řádek po řádku, ale hledá různé <b>visuálně odlišné prvky</b>, kterých se mohou očima <i>chytit</i>.</p>

<p>To může být:</p>

<ul>
  <li><b>tučný</b> text,</li>
  
  <li><a href="/nadpisy">nadpis</a>,</li>
  
  <li><a href="/citace">citace</a>,</li>
  
  <li>obrázek,</li>
  
  <li>tabulky</li>
</ul>

<p>A právě <b>seznamy</b>.</p>




<h2 id="li">Položka seznamu <code>&lt;li></code></h2>

<p>Základním prvkem seznamů je položka <code>&lt;li></code>.</p>

<p>Příklad zápisu:</p>

<pre><code>&lt;li>Položka seznamu&lt;/li></code></pre>




<p>Pro obalení jednotlivých položek seznamu se používá značka <code>&lt;li></code> – anglicky <i lang="en">list item</i> (položka seznamu).</p>

<p>Jedná se o značku s <a href="/html-znacky#koncova-volitelna">nepovinnou koncovou značkou</a>. Zápis tak může vypadat i následovně (položka se sama ukončí o další <code>&lt;li></code> nebo konec seznamu):</p>

<pre><code>&lt;li>Položka
&lt;li>Další položka</code></pre>




<p>Měla by být umístěna v obalu definujícím seznam – např. <code>&lt;ul></code> nebo <code>&lt;ol></code>, teoreticky ale funguje i bez toho.</p>

<div class="live">
    <li>Položka mimo seznam</li>
    
    <li>Jiná položka</li>  
</div>

<p>Značka <code>&lt;li></code> má v CSS stejnojmennou hodnotu vlastnosti <a href="/display"><code>display</code></a> – <code>display: list-item</code>.</p>


<h3 id="li-obsah">Obsah značky <code>&lt;li></code></h3>

<p>Do položky seznamu jde vložit v podstatě libovolnou jinou značku – odstavce, nadpisy nebo <b>další seznam</b>.</p>


<h3 id="li-atributy">Atributy značky <code>&lt;li></code></h3>

<p>Kromě <a href="/obecne-atributy">obecných atributů</a> jako je <code>class</code>, <code>id</code>, <code>title</code> a podobně, existují další dva:</p>

<dl>
  <dt id="value"><code>value</code></dt>
  <dd>
    <p>U číslovaného seznamu <code>&lt;ol></code> slouží k nastavení pořadí položky.</p>
    
    <pre><code>&lt;ol>
  &lt;li <b>value</b>="5">Položka s pořadovým číslem 5&lt;/li>
&lt;ol></code></pre>
    
    
    
    <p>Číslo se nastavuje i v případě, že je seznam nečíselného typu. Pořadí se potom převede třeba na písmena:</p>
    
    <div class="live"><ol type="a">
      <li value="5">Pátá položka</li>
      <li>Šestá položka</li>
      <li value="2">Druhá položka</li>
    </ol></div>
  </dd>
  
  
  
  
  <dt id="type"><code>type</code></dt>
  <dd>
    <p>Jde použít pro změnu stylu <i>číslování</i> pro konkrétní položku seznamu <code>&lt;ol></code>.</p>
    
    <div class="live"><ol>
      <li type="a">písmena</li>
      <li type="I">římské číslice</li>
      <li type="1">číslice</li>
    </ol></div>
    
    
    
    
    <p>Případně pro změnu stylu odrážek v <code>&lt;ul></code>.</p>
    
    <div class="live"><ul>
      <li type="disc">puntík</li>
      <li type="circle">kruh</li>
      <li type="square">čtvereček</li>
    </ul></div>
    
    
    
       
    <p>V HTML 5 je atribut <code>type</code> u položky <code>&lt;li></code> považován za <b>zastaralý a je <a href="/validita">nevalidní</a></b>.</p>
    
    <p><img src="/files/seznamy/li-type.png" alt="Nevalidní atribut type" class="border"></p>
  
    
     
    
    
    <p>Pro vyhovění specifikaci je nutné používat CSS vlastnost <a href="/list-style#type"><code>list-style-type</code></a>.</p>
    
    <p>Přímo u seznamu <code>&lt;ol></code> je atribut <code>type</code> validní i v HTML 5, na rozdíl od HTML 4.01 Strict.</p>
  </dd>
</dl>


<h2 id="ul">Nečíslovaný seznam <code>&lt;ul></code></h2>

<p>Asi nejčastěji je používán nečíslovaný seznam <code>&lt;ul></code>. Jednotlivé odrážky seznamu, které tvoří značka <code>&lt;li></code>, bývají typicky označeny puntíkem.</p>

<div class="live">
  <ul>
    <li>Položka</li>
    
    <li>Jiná položka</li>
  </ul>  
</div>



<p>Styl odrážek jde změnit atributem <code>type</code> nebo CSS vlastností <code>list-style-type</code>.</p>



<h2 id="ol">Číslovaný seznam <code>&lt;ol></code></h2>

<p>Význam zkratky <code>&lt;ol></code> je <i lang="en">ordered list</i> – číslovaný seznam.</p>


<p>Oproti seznamu <code>&lt;ul></code> má zvláštní schopnost – odrážky <b>číslují pořadí</b> bez přičinění tvůrce kódu. To je pohodlné, protože není potřeba číslování <b>ručně přepisovat</b>, když se změní pořadí odrážek.</p>


<pre><code>&lt;ol>
  &lt;li>První položka&lt;/li>
  &lt;li>Druhá položka&lt;/li>
&lt;/ol></code></pre>




<div class="internal-content">
  <ul>
    <li><a href="/counter">CSS <code>counter</code></a> – způsob, jak automaticky číslovat i jiné věci než <b>číslovaný seznam</b></li>
  </ul>
</div>

<h3 id="ol-atributy">Atributy <code>&lt;ol></code></h3>

<dl>
  <dt id="start"><code>start</code></dt>
  <dd>
    <p>Položky jsou standardně číslovány od 1 (případně od <i>a</i> nebo <i>I</i> v případě písmen nebo římských číslic).</p>
    
    <p>Změnit počátek číslování umí atribut <code>start</code>. Zapisuje se <b>vždy jako číslo</b> (i v případě použití římských číslic nebo písmen).</p>    
    
    <div class="live"><ol start="5">
  <li>První položka</li>
  <li>Druhá položka</li>
  <li value="18">Třetí položka</li>
      </ol></div>    
    
    <p>Upravená číslice pořadí atributem <code>start</code> jde <i>přebít</i> atributem <code>value</code> pro položku <code>&lt;li></code>.</p>
  </dd>
  
  <dt id="reversed"><code>reversed</code></dt>
  <dd>
    <p>Slouží pro otočení pořadí číslování. Čísluje se potom <b>od konce</b> seznamu:</p>
    
    <div class="live"><ol reversed>
  <li>První položka</li>
  <li>Druhá položka</li>
  <li>Třetí položka</li>
      </ol></div>
  </dd>
</dl>






<h2 id="stylovani">Stylování seznamů</h2>

<p>Pro změnu vzhledu seznamů, <b>obrázkové odrážky</b> a další se používá CSS vlastnost <code>list-style</code>, podrobněji se jí věnuje samostatný článek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/list-style">Styl odrážkového seznamu</a> – kompletní přehled CSS vlastnosti <code>list-style</code></li>
  </ul>
</div>




<h2 id="rucni">Ruční vytváření seznamů</h2>

<p>Obsah vypadající jako seznam jde vytvářet i bez značek <code>&lt;ul></code>, <code>&lt;ol></code> a <code>&lt;li></code>.</p>

<p>Číslovaný:</p>

<div class="live">
  <p>1. První položka<br>
2. Druhá položka</p>
</div>





<p>Nečíslovaný:</p>

<div class="live">
  <p>• Položka<br>
• Další položka</p>
</div>




<p>Sémanticky čistší a většinou <b>pohodlnější</b> je používání skutečných seznamů. V některých primitivnějších systémech pro psaní obsahu ale nemusí být jiná možnost.</p>





<h2 id="dl">Definiční seznam <code>&lt;dl></code></h2>

<p>Definiční seznam je něco mezi nečíslovaným seznamem a jednoduchou tabulkou o dvou sloupcích.</p>

<p>Hodí se pro případy, kde existují dvojice typu <i>termín</i> — <i>definice</i>.</p>


<pre><code>&lt;dl>
  &lt;dt>Je čas&lt;/dt>
  &lt;dd>Web o moderní tvorbě webových stránek&lt;/dd>
&lt;/dl></code></pre>




<p>Samotná značka <code>&lt;dl></code> (<i lang="en">definition list</i>) tedy slouží jako <b>obal</b> pro značky <code>&lt;dt></code> a <code>&lt;dd></code>  – podobně jako <code>&lt;ul></code> a <code>&lt;ol></code> je obal pro <code>&lt;li></code>.</p>

<dl>
  <dt id="dt"><code>&lt;dt></code> (<i lang="en">definition term</i>)</dt>
  <dd>
    <p>Označuje termín, který se bude definovat.</p>
  </dd>
  
  <dt id="dd"><code>&lt;dd></code> (<i lang="en">definition description</i>)</dt>
  <dd>
    <p>Obsahuje popis dříve definovaného termínu.</p>
  </dd>  
</dl>

<p>K jednomu termínu (<code>&lt;dt></code>) může být více definic (<code>&lt;dd></code>), stejně tak více termínů může mít jedinou definici nebo více termínů může mít více definic.</p>


<pre><code>&lt;dl>
  &lt;dt>Je čas&lt;/dt>
  &lt;dd>Web o moderní tvorbě webových stránek&lt;/dd>
  &lt;dd>Nějaký další význam&lt;/dd>
&lt;/dl></code></pre>




<p>Výchozí vzhled definičního seznamu odsazuje zleva popis (<code>&lt;dd></code>), definice a popis jsou potom na zvláštních řádcích – všechny tři značky definičního seznamu jsou blokové (<a href="/display#block"><code>display: block</code></a>).</p>

<p>Pomocí <a href="/float">obtékání</a> jde <code>&lt;dt></code> a <code>&lt;dd></code> umístit i vedle sebe.</p>


<h3 id="dl-znacky">HTML značky v definičních seznamech</h3>

<p>Do značek <code>&lt;dt></code> a <code>&lt;dd></code> jde umístit prakticky jakýkoliv další element nebo další <b>definiční seznam</b>.</p>


<h3 id="vyuziti">Využití</h3>

<p>Kromě vysvětlování pojmů bývají definiční seznamy někdy používány i pro:</p>

<dl>
  <dt id="formulare">Formuláře</dt>
  <dd>
    <div class="live">
      <dl>
        <dt><label for="policko">Políčko</label></dt>
        <dd><input type="text" id="policko"></dd>
      </dl>
    </div>
  </dd>
  
  <dt id="diskuse">Diskusní příspěvky / komentáře</dt>
  <dd>
    <div class="live">
      <dl>
        <dt>Autor</dt>
        <dd>Text příspěvku</dd>
      </dl>
    </div>
  </dd>
  
  <dt id="zdroje">Seznam zdrojů</dt>
  <dd>
    <div class="live">
      <dl>
        <dt><a href="/seznamy">HTML seznamy</a></dt>
        <dd>Kompletní přehled používání seznamů v HTML</dd>
      </dl>
    </div>
  </dd>    
</dl>


<h2 id="seo">Vliv seznamů na SEO</h2>

<p>Existují názory, že používání seznamů má <b>positivní vliv</b> na umístění stránky ve <b>výsledcích vyhledávání</b>. Jelikož používání seznamů zpravidla <b>přináší kladný efekt</b> pro návštěvníky, dává smysl, aby přítomnost seznamů přinášela SEO výhodu.</p>

<div class="external-content">
  <ul>
    <li>
      404m.com: <a href="http://404m.com/2015/06/08/seznamy-s-puntiky-a-cisly-vs-seo/">Seznamy s puntíky a čísly vs SEO</a>
    </li>
  </ul>
</div>


<h2 id="menu">Seznam <code>&lt;menu></code></h2>

<p>Značka <code>&lt;menu></code> se v praxi zobrazuje obdobně jako nečíslovaný seznam <code>&lt;ul></code>.</p>

<p>V HTML 4 byla zavržena (<i lang="en">deprecated</i>), v HTML 5.1 jí byl vymyšlen nový způsob užití – pro označení ovládacích prvků, kontextových a jiných nabídek.</p>

<p>Místo položek <code>&lt;li></code> se v této nové podobě <code>&lt;menu></code> používají značky <code>&lt;menuitem></code>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/menuitem">Kontextová nabídka <code>&lt;menuitem></code></a></li>
  </ul>
</div>



<h2 id="dir">Výpis souborů <code>&lt;dir></code></h2>

<p>V prohlížečích se chová obdobně jako <code>&lt;ul></code> a <code>&lt;menu></code>. Značka <code>&lt;dir></code> je dle HTML specifikace překonaná a měl by se místo ní používat seznam <code>&lt;ul></code>.</p>

<p>V minulosti sloužila pro označení <b>výpisu souborů ze složky</b>. Nabízí se analogie k příkazu <code>dir</code> z <b>příkazové řádky</b>.</p>





<h2 id="compact">Atribut <code>compact</code></h2>

<p>V dávné minulosti fungoval u seznamů atribut <code>compact</code> pro <b>zhuštění informací</b> v seznamu.</p>

<p>Při použití na definiční seznam se zobrazoval termín i jeho popis vedle sebe.</p>

<p>Funguje v <b>Internet Exploreru 7</b>, v novějších už ne. <a href="https://kod.djpw.cz/qdob">Ukázka</a>.</p>



<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="http://enrmarc.github.io/listify/">Listify</a> – převede prostý text na <code>&lt;ul></code> či <code>&lt;ol></code> seznam</li>
</ul>


<style>.live dt {
    list-style: none;
}</style>


<!-- Náhled: https://kod.djpw.cz/wlob -->