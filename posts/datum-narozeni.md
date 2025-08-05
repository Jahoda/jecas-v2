---
title: "UX políčka pro datum narození"
headline: "UX políčka pro datum narození"
description: "Jak usnadnit uživatelům zadávání data narození."
date: "2022-05-02"
last_modification: "2023-01-07"
status: 1
tags: ["formulare", "ux"]
format: "html"
---

<p>U <a href="/formulare">webových formulářů</a> existuje spoustu možností, jak uživatelům <b>znepříjemnit jejich používání</b>.</p>

<div class="internal-content">
  <ul>
    <li>
      <a href="/chyby-formularu">20 největších chyb formulářů na webu</a>
    </li>
  </ul>
</div>

<p>Výzvou k řešení je způsob pro <b>zadání data narození</b>. Existuje několik způsobů, jak ho nechat uživatele zadávat.</p>



<h2 id="text">Textové pole</h2>

<p>Jedno z nejjednodušších řešení je obyčejný textový <a href="/input"><code>&lt;input></code></a>.</p>

<div class="live">
  <label>
    Datum narození
    <br>
    <small>Např. 30. 1. 1970</small>
    <br>
    <input type="text">
  </label>
</div>


<p>Má to několik problémů:</p>

<ol>    
  <li>
    <p>Textové pole na dotykových zařízeních se SW klávesnicí nezobrazuje optimální <b>rozložení klávesnice</b> s preferováním čísel.</p>
    
    <p>Pro textové pole se zobrazí alfanumerická klávesnice, kde nejde přímo zadávat čísla:</p>
    
    <p><img src="/files/datum-narozeni/ios-klavesnice.png" alt="iOS klávesnice" class="border"></p>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  </li>
  
  <li>
    <p>Uživatel <b>nezná formát</b>, ve kterém má datum zadat.</p>
    
    <pre><code>30.1.1970
30. 1. 1970
30.01.1970
30/1/1970
1/30/1970
1970-01-30</code></pre>
    
    <p>Kvůli tomu může být obtížná <b>validace</b>, aby si poradila s různými možnostmi.</p>
    
    <p>Zvlášť problém je v tom, že napříč zeměmi je zvykem mít různé pořadí dnů a měsíců.</p>
    
    
    <p>Například u data <code>4/12/1970</code> není možné se 100% jistotou rozhodnout, zda se jedná o 12. duben nebo 4. prosinec.</p>
  </li>
  
  
  

</ol>





<h2 id="date">Systémový datepicker</h2>

<p>Většinou se pro datum dobře hodí tzv. <a href="/datepicke">datepicker</a>. Typicky se jedná o políčko, které po kliknutí zobrazí kalendář.</p>

<p>Dosáhnout toho jde snadno přes <code>&lt;input type="date"></code>:</p>

<div class="live">
  <label>
    Datum narození
    <br>
    <input type="date">
  </label>
</div>

<p>Nevýhoda je v tom, že si toto políčko různé prohlížeče implementují různě.</p>

<p>Třeba <b>Safari</b> v <b>macOS</b> zobrazí následující věc.</p>

<p><img src="/files/datum-narozeni/safari-input-pro-datum.png" alt="Safari input pro datum" class="border"></p>













<p>V mobilním <b>iOS</b> v <b>iPhone</b> potom:</p>

<p><img src="/files/datum-narozeni/input-pro-datum-v-iphone.png" alt="Input pro datum v iPhone" class="border"></p>



































<p>V desktopovém <b>Chromu</b>:</p>

<p><img src="/files/datum-narozeni/chrome-input-pro-datum.png" alt="Chrome input pro datum" class="border"></p>





















<p>Je celkem zřejmé, že zadávat datum narození těmito způsoby je zvlášť pro dříve narozené celkem problematické. Musí se probrat množstvím položek, aby našli svůj rok.</p>

<p>Na mobilu je problém, že <b>datum nelze zadat ručně</b>. Datum ani není možné odněkud zkopírovat do políčka.</p>



<h2 id="select">Výběr přes <code>&lt;select></code></h2>

<p>Tento formulářový prvek je většinou <a href="/select-pouzitelnost">nejlepší nepoužívat</a>.</p>


<p>Ani zadávání data narození není výjimka:</p>

<div class="live">
  <label>
    Datum narození
    <br>
    <select>
      <option value="">1</option>
      <option value="">2</option>
      <option value="">3</option>
      <option value="">4</option>
      <option value="">5</option>
      <option value="">6</option>
      <option value="">7</option>
      <option value="">8</option>
      <option value="">9</option>
      <option value="">10</option>
      <option value="">11</option>
      <option value="">12</option>
      <option value="">13</option>
      <option value="">14</option>
      <option value="">15</option>
      <option value="">16</option>
      <option value="">17</option>
      <option value="">18</option>
      <option value="">19</option>
      <option value="">20</option>
      <option value="">21</option>
      <option value="">22</option>
      <option value="">23</option>
      <option value="">24</option>
      <option value="">25</option>
      <option value="">26</option>
      <option value="">27</option>
      <option value="">28</option>
      <option value="">29</option>
      <option value="">30</option>
      <option value="">31</option>
    </select>
    <select>
      <option value="">1</option>
      <option value="">2</option>
      <option value="">3</option>
      <option value="">4</option>
      <option value="">5</option>
      <option value="">6</option>
      <option value="">7</option>
      <option value="">8</option>
      <option value="">9</option>
      <option value="">10</option>
      <option value="">11</option>
      <option value="">12</option>
    </select> 
    <select>
      <option value="">1970</option>
      <option value="">1971</option>
      <option value="">1972</option>
      <option value="">1973</option>
      <option value="">1974</option>
      <option value="">1975</option>
      <option value="">1976</option>
      <option value="">1977</option>
      <option value="">1978</option>
      <option value="">1979</option>
      <option value="">1980</option>
      <option value="">1981</option>
      <option value="">1982</option>
      <option value="">1983</option>
      <option value="">1984</option>
      <option value="">1985</option>
      <option value="">1986</option>
      <option value="">1987</option>
      <option value="">1988</option>
      <option value="">1989</option>
      <option value="">1990</option>
      <option value="">1991</option>
      <option value="">1992</option>
      <option value="">1993</option>
      <option value="">1994</option>
      <option value="">1995</option>
      <option value="">1996</option>
      <option value="">1997</option>
      <option value="">1998</option>
      <option value="">1999</option>
    </select>    
  </label>
</div>


<p>V tomto případě nenabízí nic moc navíc oproti <code>&lt;input type="date"></code>. Navíc trpí nemožností ručního zadání data i na desktopu.</p>


<h3 id="vice">Více textových polí</h3>

<p>Relativně rozumný může být přístup rozdělení dnů, měsíců a roků na samostatná políčka:</p>

<div class="live">
  <legend>
    Datum narození
  </legend>
  
  <div style="display: flex; gap: 1em">
    <label>
      Den
      <br>
      <input type="text" pattern="[0-9]*" min="1" max="31" size="2">
    </label>
    <label>
      Měsíc
      <br>
      <input type="text" pattern="[0-9]*" min="1" max="12" size="2">
    </label>    
    <label>
      Rok
      <br>
      <input type="text" pattern="[0-9]*" min="1900" max="2022" size="4">
    </label>        
  </div>
</div>

<p>Uživatel v tomto případě <b>jasně ví, co má kam zadat</b>. Validace je jednoduchá – stačí obsah pole převést na číslo (ignorovat jiné znaky něž číslice).</p>

<p>Díky atributu <code>pattern="[0-9]*"</code> se na dotykových zařízení zobrazí číselná klávesnice:</p>

<p><img src="/files/datum-narozeni/ciselna-klavesnice-iphone.png" alt="Číselná klávesnice iPhone" class="border"></p>

<p>Má to ale i nevýhody:</p>

<ol>
  <li>
    <p>Více políček komplikuje vyplnění formuláře (další klikání navíc).</p>
  </li>
  <li>
    <p>Není možné celé datum narození zkopírovat a vložit.</p>
  </li>
  <li>
    <p>Automatické vyplňování formulářů bude mít pravděpodobně problém rozpadnout datum narození do 3 polí.</p>
  </li>
</ol>












<h2 id="datepicker">Vlastní datepicker</h2>

<p>Velmi dobré řešení může být vlastní datepicker uzpůsobený pro datum z dávné minulosti.</p>

<p>Tj. postupně nechat zadávat rok, měsíc a nakonec den. A umožnit přepínání pro případ chyby.</p>

<p><img src="/files/datum-narozeni/vyber-roku.png" alt="Výběr roku" class="border"></p>
























<p>Je ale relativně pracné něco takového napsat, takže se nabízí hledat takové hotové řešení, které splňuje podmínky pro pohodlné zadávání.</p>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>
    GOV.UK Design System: <a href="https://design-system.service.gov.uk/patterns/dates/">Dates</a>
  </li>
  <li>
    Smashing Magazine: <a href="https://www.smashingmagazine.com/2021/05/frustrating-design-patterns-birthday-picker/">Frustrating Design Patterns That Need Fixing: Birthday Picker</a>
  </li>
</ul>