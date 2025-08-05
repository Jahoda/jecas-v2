---
title: "Proč nepoužívat selectbox"
headline: "Proč nepoužívat <code>&lt;select></code>"
description: "Proč se snažit vyhnout používání rozbalovací nabídky <code>&lt;select></code> za každou cenu."
date: "2015-05-03"
last_modification: "2015-05-04"
status: 1
tags: ["formulare", "napady", "ux"]
format: "html"
---

<p>Formulářový prvek <b>rozbalovací nabídky</b> (anglicky často označované jako <i>dropdown</i>) je na webových stránkách hodně populární. Jde snadno vytvořit kombinací značek <code>&lt;select></code> a <code>&lt;option></code>.</p>

<div class="live">
  <p>
    <label for="select">Přijdu</label>
    <select name="select" id="select">
      <option value="rano">ráno</option>
      <option value="poledne">v poledne</option>
      <option value="vecer">večer</option>
    </select>
  </p>
</div>

<p>Programátoři tvořící formuláře mají tento prvek velmi rádi. Jde totiž <b>universálně</b> použít na všechny typy vstupů, kde se vybírá z <b>předem definovaných možností</b>.</p>

<p>Ta universálnost bohužel znamená, že formuláře používající <code>&lt;select></code> budou typicky i <b>universálně špatně použitelné</b>.</p>

<p>Je možné, že existují situace, kdy dává použití dropdown nabídky smysl. Na webu je ale značně nadužívaná oproti lepším postupům. Při každém použití <code>&lt;select></code>u je tak dobré se důkladně zamyslet, <b>jestli neexistuje lepší řešení</b>.</p>


<h2 id="problem">Proč je selectbox problematický?</h2>

<p>Má-li být <b>vyplňování formuláře</b> co nejpohodlnější (lépe řečeno <i>co nejméně nepohodlné</i>, protože vyplňovat formuláře je vždycky otrava), rozbalovací nabídka <code>&lt;select></code> trpí několika nedostatky.</p>


<h3 id="klik">Zbytečné klikání</h3>

<p>Kliknutí, které by mohlo posloužit k výběru volby, teprve otevře nabídku. Navíc jsou možnosti mimo té výchozí <b>skryté</b>, takže i v případě, že by <b>výchozí volba vyhovovala</b>, bude uživatel zbytečně klikat, aby se podíval na ostatní možnosti.</p>

<p>Zbytečné kliknutí pro otevření nabídky bude nutné i v případě provádění následné opravy po špatném zadání.</p>


<h3 id="zruseni">Nejasné zavření nabídky</h3>

<p>Z pohledu použitelnosti je rozbalená nabídka problematická tím, že <b>není úplně jasné</b>, jak se jí uživatel zbaví.</p>

<p>Při kliknutí mimo nabídku pro její zavření se může stát, že se nechtíc aktivuje nějaký jiný prvek.</p>


<h3 id="mobily">Mobilní dotyková zařízení</h3>

<p>Na mobilních zařízeních se po kliknutí do <code>&lt;select></code>u zpravidla zobrazí <b>vlastní systémová nabídka</b> pro volbu z několika položek, což kromě zbytečných dotyků může i narušit přirozený nerušený průchod formulářem.</p>

<p>Po rozbalení selectu překryjí položky obsah stránky. V některých mobilních OS je problém s tím, že není vidět popis, ke kterému se položky vztahují.</p>

<p>Ve <b>Windows Phone 8</b> možnosti překrývají celou obrazovku.</p>
<img src="/files/select-pouzitelnost/wp-select.png" alt="Zobrazení selectu ve Windows Phone 8" class="border">




























<p>V <b>iOS</b> je rolovací nabídka položek v dolní části obrazovky. Po výběru položky je nutné tapnout na <i>Done</i>.</p>

<img src="/files/select-pouzitelnost/ios7-select.png" alt="Zobrazení selectu ve Windows Phone 8" class="border">









































<p>V <b>Androidu</b> položky překrývají obsah stránky. Pozadí je ztemnělé.</p>

<img src="/files/select-pouzitelnost/android-select.png" alt="Zobrazení selectu ve Windows Phone 8" class="border">











































<h3 id="stylovani">Komplikované stylování</h3>

<p>Z pohledu webového tvůrce nabízí značka <code>&lt;select></code> s jednotlivými <code>&lt;option></code>y velmi omezené možnosti úprav vzhledu.</p>

<div class="internal-content">
  <ul>
    <li><a href="/stylovani-selectu">Stylování selectu</a> – jak jde upravovat výchozí selectbox pomocí CSS</li>
  </ul>
</div>

<p>Dále se článek věnuje <b>konkrétním případům</b>, kdy jde dropdown select <b>nahradit lepším řešením</b>.</p>


<h2 id="malo">Nízký počet položek</h2>

<p>Vybírá-li se z malého množství položek, vyžaduje rozbalení <i>selectboxu</i> několik zbytečných kliknutí navíc.</p>

<p>Kromě nutnosti rozkliknutí nabídek je ukrytí položek otravné i tím, že ho návštěvník rozklikne i ze zvědavosti v případě, kdy mu <b>výchozí hodnota vyhovuje</b>.</p>

<div class="live no-source">
  <p><label>Pohlaví: <select><option>muž</option><option>žena</option></select></label></p>
  
  <p><label>Souhlasíte: <select><option>ano</option><option>ne</option></select></label></p>
</div>




<p>Úspora místa je přitom minimální oproti použití <a href="/input#type-radio"><code>radio</code></a> přepínačům.</p>


<div class="live no-source">
  <p>Pohlaví: <label><input type="radio" name="pohlavi" checked>muž</label> <label><input type="radio" name="pohlavi">žena</label></p>
  
  <p>Souhlasíte: <label><input type="radio" name="souhlas" checked>ano</label> <label><input type="radio" name="souhlas">ne</label></p>
</div>

<p>Pokud jde zachytit pouze možnost ano/ne, jde možná ještě lépe a srozumitelněji použít <a href="/input#type-checkbox"><code>checkbox</code></a>.</p>

<div class="live no-source">
  <p><label><input type="checkbox"> Jsem žena</label></p>
  
  <p><label><input type="checkbox" checked> Souhlasím</label></p>
</div>



<p>Někdy jsou k vidění i extrémní případy, kdy je v <code>&lt;select></code>u jen jedna možnost. To už zavání <b>provokováním návštěvníka</b>.</p>

<div class="live no-source">
  <p><label>Barva: <select><option>— vyberte —</option><option>červená</option></select></label></p>
</div>




<h2 id="hodne">Velké množství položek</h2>

<p>Když se pro několik málo položek <i>select</i> nehodí, je dobré ho použít pro hodně bohatou nabídku?</p>

<p>Typickým příkladem může být třeba výběr <a href="http://cs.wikipedia.org/wiki/Seznam_evropských_států">evropského státu</a>.</p>

<div class="live">
  <p><label for="zeme">Z jaké jste země?</label><br>
  <select id="zeme">
<option>Albánie</option><option>Andora</option><option>Arménie</option><option>Ázerbajdžán</option><option>Belgie</option><option>Bělorusko</option><option>Bosna a Hercegovina</option><option>Bulharsko</option><option>Černá Hora</option><option>Česko</option><option>Dánsko</option><option>Estonsko</option><option>Finsko</option><option>Francie</option><option>Gruzie</option><option>Chorvatsko</option><option>Irsko</option><option>Island</option><option>Itálie</option><option>Kazachstán</option><option>Kypr</option><option>Lichtenštejnsko</option><option>Litva</option><option>Lotyšsko</option><option>Lucembursko</option><option>Maďarsko</option><option>Makedonie</option><option>Malta</option><option>Moldavsko</option><option>Monako</option><option>Německo</option><option>Nizozemsko</option><option>Norsko</option><option>Polsko</option><option>Portugalsko</option><option>Rakousko</option><option>Rumunsko</option><option>Rusko</option><option>Řecko</option><option>San Marino</option><option>Slovensko</option><option>Slovinsko</option><option>Spojené království</option><option>Srbsko</option><option>Španělsko</option><option>Švédsko</option><option>Švýcarsko</option><option>Turecko</option><option>Ukrajina</option><option>Vatikán</option>    
  </select>
  </p>
</div>

<p>Pokud nejste z <i>Albánie</i>, výběr bude značně komplikovaný. Na počítačích s klávesnicí se sice jde přesunout na potřebnou položku napsáním počátečních písmen, ale <b>málo lidí to ví</b>. Na mobilních zařízeních potom nezbývá než nekonečně rolovat.</p>

<p>Dobrý postup je se snažit <b>nezavalit uživatele hromadou možností</b>, tedy nabídnout způsob filtrování. Často se dá problému vyhnout řešením z úplně opačného konce. Lokalitu jde s jistou úspěšností <b>detekovat automaticky</b>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/geoip">Lokalisace podle IP</a> – použití GeoIP v PHP</li>
    <li><a href="/server#http-accept-language">HTTP_ACCEPT_LANGUAGE</a> – HTTP hlavička obsahující informaci o jazyku prohlížeče</li>
  </ul>
</div>

<p>Podobným příkladem je volba <a href="http://cs.wikipedia.org/wiki/Kraje_v_Česku#P.C5.99ehled_kraj.C5.AF">kraje v Česku</a>.</p>

<div class="live">
  <p><label for="kraj">Vyberte kraj ČR:</label><br>
  <select id="kraj">
<option>Hlavní město Praha</option><option>Středočeský</option><option>Jihočeský</option><option>Plzeňský</option><option>Karlovarský</option><option>Ústecký</option><option>Liberecký</option><option>Královéhradecký</option><option>Pardubický</option><option>Olomoucký</option><option>Moravskoslezský</option><option>Jihomoravský</option><option>Zlínský</option><option>Kraj Vysočina</option>    
  </select>
</div>

<p>Pro nepražáky bude pohodlnější <b>klikací mapa</b>.</p>

<p><b>Dlouhým seznamům</b> je tak vhodné se vyhnout obloukem. Pokud neexistuje alternativní způsob pro výběr z hodně položek, nabízí se použít našeptávání na základě zadaných znaků. Od <b>IE 10</b> je k tomu přímo v HTML značka <a href="/datalist"><code>&lt;datalist></code></a>.</p>

<p>Jinak existují různé JavaScriptové řešení.</p>

<div class="external-content">
  <ul>
    <li><a href="https://select2.github.io/examples.html">Select2</a> – skript vylepšující <code>&lt;select></code>y našeptáváním</li>
  </ul>
</div>


<h3 id="nejcastejsi">Nejprve nejčastěji používané</h3>

<p>Po nahlédnutí do statistiky počtu výběru jednotlivých položek ze stran uživatelů je většinou vidět, že některé možnosti jsou nápadně častější než jiné.</p>

<p>Několik <b>nejčastěji vybíraných možností</b> tak může být ihned viditelných formou radio přepínačů a ty ostatní skryty za něčím jako je tlačítko <i>Více možností</i> a podobně.</p>


<h2 id="pocet">Výběr počtu</h2>

<p>Rozbalovací nabídka pomocí <code>&lt;select></code>u bývá často k vidění i pro stanovení počtu.</p>

<div class="live">
  <p>
    <label for="osoby">Počet osob:</label>
    <select id="osoby">
      <option>1 osoba</option><option selected>2 osoby</option><option>3 osoby</option><option>4 osoby</option>
    </select>
  </p>
</div>

<p>V tomto případě lépe poslouží krokovací tlačítka <kbd>+</kbd> a <kbd>&minus;</kbd> (anglicky označované slovem <i>stepper</i>).</p>

<p>Takové funkce jde docílit použitím <a href="/input#type-number"><code>&lt;input type=number></code></a>. Funguje v prohlížečích kromě <b>Internet Exploreru</b>. Hodnotu kroku jde zadat do atributu <code>step</code>.</p>

<div class="live">
  <p>
    <label for="osoby">Počet osob:</label>
    <input type="number" value="2">
  </p>
</div>

<p>Bohužel <b>ovládací prvky jsou tak malé</b>, že i bez ohledu na podporu v prohlížečích je lepší použít vlastní řešení v JavaScriptu.</p>

<div class="internal-content">
  <ul>
    <li><a href="/inkrementace-inputu">Zvyšování hodnoty inputů</a> – implementace tlačítek <kbd>+</kbd> a <kbd>&minus;</kbd> v JavaScriptu</li>
  </ul>
</div>

<p>Výchozí šipky u políčka s typem <code>number</code> jde vypnout pomocí CSS vlastnosti <code>appearance</code>:</p>

<pre><code>/* Webkit */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}
/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}</code></pre>

<p>Šlo by použít i obyčejný textový <code>&lt;input></code> a omezit znaky <a href="/atribut-pattern">atributem <code>pattern</code></a>, bohužel se ale potom nezobrazuje pouze číselná klávesnice v mobilním <b>Internet Exploreru 11</b> ve Windows Phone, což komplikuje <b>ruční zadání čísla</b>.</p>

<div class="live no-source">
<p class="stepper">
    <label for="pocet-osob">Počet osob:</label>
    <input type="number" name="pocet-osob" size="2" value="2" step="1" min="1" max="5">
</p>
</div>

<p><a href="http://kod.djpw.cz/uymb">Samostatná živá ukázka</a></p>

<p>Pro <b>změnu hodnoty</b> tak není nutné rozevírat nabídku, ale jde přímo upravovat hodnotu po stanoveném kroku. Velkou změnu počtu jde zajistit přímo přepsáním hodnoty, která se z tohoto důvodu po vybrání označí, aby šla rovnou přepsat.</p>

<p>Při realisaci <i>stepperu</i> je si dobré dát pozor na:</p>

<ol>
  <li>dostatečnou velikost ovládacích prvků a jejich vzdálenost od sebe, aby se dobře <b>ovládaly prsty</b> na dotykových obrazovkách,</li>  
  <li>tlačítka <kbd>+</kbd> a <kbd>&minus;</kbd> je potom dobré umístit blízko sebe, aby se při <i>přejetí</i> dalo snadno vrátit zpět.</li>
</ol>

<div class="external-content">
  <ul>
    <li>Luke Wroblewski (video): <a href="https://www.youtube.com/watch?v=CW4qKTJqHPo">How to Simplify Input with Steppers</a></li>
  </ul>
</div>


<h2 id="datum">Zadávání kalendářního data</h2>

<p>Co takhle zadávat datum pomocí dropdown menu?</p>

<div class="live">
  <p>
    <label>Datum:</label>    
<select><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option selected="selected">28</option><option>29</option><option>30</option><option>31</option></select> <select><option>Led</option><option>Úno</option><option>Bře</option><option>Dub</option><option>Kvě</option><option selected="selected">Čvn</option><option>Čvc</option><option>Srp</option><option>Zář</option><option>Říj</option><option>Lis</option><option>Pro</option></select> <select><option>2014</option><option selected="selected">2015</option><option>2016</option><option>2017</option></select>    
  </p>
</div>

<p>Většinou jde docílit lepšího řešení pomocí jediného pole a kalendáře. Existuje k tomu typ políčka <a href="/input#type-date"><code>date</code></a>.</p>

<div class="live">
  <p>
    <label for="datum">Datum: </label>
    <input type="date" id="datum" value="2015-04-25">
  </p>
</div>

<p>Zvláštní typ <code>&lt;input></code>u funguje v <b>Opeře</b> a <b>Chrome</b>, pro ostatní prohlížeče je třeba použít řešení v JavaScriptu.</p>

<div class="internal-content">
  <ul>
    <li><a href="/datepicker">Zadávání kalendářního data</a> – zobrazení kalendáře v různých prohlížečích</li>
  </ul>
</div>

<p>Na základě dat z reálného používání aplikace ale nejspíš půjde zadávání data ještě vylepšit. Pokud většina lidí volí dnešní nebo zítřejší den, nabízí se takové volby rovnou vypsat. A kalendář schovat pod volbu <i>Jindy…</i> nebo ikonku.</p>

<div class="live">
  <p>
    <label for="datum">Datum: </label>
    <label><input type="radio" name="kdy" checked>Dnes</label>
    <label><input type="radio" name="kdy">Zítra</label>
    <label><input type="radio" name="kdy">Pátek</label>
    <label><input type="radio" name="kdy" onchange="vyberDatum.style.display = 'inline'; vyberDatum.focus()">Jindy…</label>
    <input type="date" id="vyberDatum" value="2015-04-25" style="display: none">
  </p>
</div>

<p>I pro volbu nejbližších dní jde úspěšně použít krokování. Takové řešení je k vidění třeba u jízdních řádků IDOS.</p>

<p><img src="/files/select-pouzitelnost/idos.gif" alt="Změna data a času na IDOSu" class="border"></p>

<p>Krokování funguje dobře i pro volbu <b>času</b>. Šikovné je, když kromě krokování jde rovněž datum/čas <b>ručně vepsat</b> do textového pole – v některých případech je to jednodušší než <b>zdlouhavé listování kalendářem</b>.</p>


<h2 id="zaver">Závěr</h2>

<p>Znáte formulář, kde by podle vás nešlo nahradit <code>&lt;select></code> něčím lepším? Dejte mi, prosím, <b>vědět do komentářů</b>.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li>Luke Wroblewski: <a href="http://www.lukew.com/ff/entry.asp?1950">Dropdowns Should be the UI of Last Resort</a></li>
  
  <li>
    <p><a href="http://eggboxio.github.io/quick-select/">Quick[select]</a> – umožní nejčastější položky vybrat bez rozevírací nabídky:</p>
    
    <p><img src="/files/select-pouzitelnost/select.gif" alt="Quick[select]" class="border"></p>
  </li>
</ul>

<!-- zdrojový kód -->
<style>
.stepper input[type=number]::-webkit-inner-spin-button,
.stepper input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}
.stepper input[type=number] {
    -moz-appearance: textfield;
}
.stepper button {
    margin-right: .2em;
}
</style>
<script>
var Stepper = function() {
    var input;
    
    /* Round */
    function round(cislo) {
    	return (Math.round((cislo) * 10000) / 10000);	
    }

    /* Number validation */
    function val(value) {
        return value * 1;
    }

    /* Plus/minus value */
    function change(el, step)  {
        var value = round(val(el.value) + step);
        if (value >= el.getAttribute("min") && 
            value <= el.getAttribute("max")) {
            el.value = value;   
        }
    }    
    
    var createButtons = function(el) {
        var plus = document.createElement("button");
        plus.innerHTML = "+";
        var minus = document.createElement("button");
        minus.innerHTML = "&minus;";
        
        plus.onclick = function() {
          return (function(element) {
              change(element, + element.getAttribute("step"));
          })(el);
        };
        minus.onclick = function() {
          return (function(element) {
              change(element, - element.getAttribute("step"));
          })(el);
        };        
        
        el.parentNode.appendChild(minus);
        el.parentNode.appendChild(plus);
    };
    
    var init = function(el) {
        input = el.querySelectorAll("input[type=number]");
        for (var i = input.length; i--; ) {
            //input[i].type = "text";
            //input[i].setAttribute("pattern", "\d*");
            createButtons(input[i]);
            input[i].onclick = function() {
                this.select();
            };
        }
    };
    
    return {
        init : init
    };
}();

Stepper.init(document.querySelector(".stepper"));
</script>  