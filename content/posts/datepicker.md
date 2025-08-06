---
title: "Jak zadávat datum?"
headline: "Zadávání kalendářního data"
description: "Pohodlné zadávání kalendářního data ve formulářích."
date: "2014-07-21"
last_modification: "2018-12-24"
status: 1
tags: ["datum", "formulare", "hotova-reseni", "js"]
format: "html"
---

<p>U webových aplikacích je často nutné nechat uživateli <b>vyplnit datum a čas</b>.</p>

<p><small>(Jazyková vsuvka: správně se píše datum bez data, nikoliv bez <b>datumu</b>.)</small></p>

<p>Jedna možnost je dát na stránku prostý <a href="/input"><code>&lt;input></code></a> a ten <i>nějak</i> předvyplnit, aby návštěvník odhadl formát (buď přímo <code>value</code>, nebo <a href="/placeholder"><code>placeholder</code></a>).</p>

<div class="live">
  <p><label>Zadejte datum: <input type="text" value="23. 7. 2014"></label></p>
</div>

<p>Případně příklad uvést jako popisek políčka.</p>

<div class="live">
  <table>
    <tr>
      <th>
        <label for="datum">Zadejte datum</label>
      </th>
      <td>
        <i>Například 23. 7. 2014</i><br>
        <input type="text" id="datum">
        </td>
    </tr>
  </table>
</div>

<p>Pohodlnější ale nejspíš bude umožnit <b>výběr z kalendáře</b>.</p>



<h2 id="vyber">Výběr z kalendáře</h2>

<p>Nabídnout kalendář po kliknutí do pole umí přímo prakticky všechny prohlížeče (včetně mobilních) pomocí <code>&lt;input type=date></code>.</p>

<div class="live">
  <p><label>Zadejte datum: <input type="date" value="2014-07-21"></label></p>
</div>

<p>Takto by to mělo vypadat v <b>Chrome</b>:</p>

<p><img src="/files/datepicker/vyber-chrome.png" alt="Výběr data v Chrome" class="border"></p>

<p>Na desktopu je to ale spíš nouzové řešení. Kvalitní pole s kalendářem by se mělo chovat <b>inteligentněji</b>.</p>

<ol>
  <li>
    <p>Umožnit kompletně <b>ruční zadání</b>. Pro výběr data hodně vzdáleného od aktuální posice kalendáře, bude snazší datum vyťukat. Pro dny blízké aktuálnímu se zase nabízí mít zrychlené volby jako <i>zítra</i>, <i>za X dní</i>, <i>za týden</i> a podobně.
    </p>
  </li>
  
  <li>
    <p><b>Kopírování data do pole</b> ze schránky je další věc, co je hezké, když funguje.</p>
  </li>
  
  <li>
    <p>S předchozími body souvisí <b>tolerance k různým zápisům</b>.</p>
    
    <p>To je sice občas problém a neřešitelný rébus.</p>
    
    <ul>
      <li>Je „14-2-13“ 14. únor 2013, nebo 13. únor 2014?</li>
      <li>Je „10/2/2014“ 10. únor 2014, nebo 2. říjen 2014?</li>
    </ul>
    
    <p>Akceptovat ale zápisy „5. 10. 2014“, „05.10.2014“ i <b>typograficky chybný</b> „5.10.2014“ by měla <a href="/chyby-formularu#netolerance-znaku">být povinnost</a>.</p>
  </li>
  
  <li>
    <p>Diskutabilní je <b>tvar data</b>, který si prohlížeč řídí po svém. To je na jednu stranu výhoda. Formát data se teoreticky může přizpůsobovat <b>prostředí uživatele</b>. Na druhou stranu není možné dosáhnout tvaru „D. M. YYYY“, který se obvykle používá v <b>českém prostředí</b>. Takovou hodnotu <code>value</code> prohlížeč nepřechroupe.</p>
    
    
    <p><img src="/files/datepicker/input-date-webkit.png" alt="Fixní tvar kalendářního data" class="border"></p>
  </li>
</ol>


<h3 id="mobily">Mobilní zařízení</h3>

<p>Výše uvedené platí hlavně pro <b>desktopové prohlížeče</b>. U mobilů zvláštní typ <code>&lt;input></code>u přináší značné benefity.</p>

<p>Nativní kalendář typicky bude lépe <b>ovladatelný prsty</b> a hlavně bude uživatelům důvěrně známý z operačního systému.</p>



<h2 id="hotove-reseni">Hotové řešení</h2>

<p>Seznam některých populárních a dobře funkčních <i>datepickerů</i>:</p>


<ul>
  <li>
    <p><a href="https://flatpickr.js.org">flatpickr</a> – asi nejlepší skript bez závislosti na <b>jQuery</b></p>

<p>Ten dokáže právě fungovat tak, že se na mobilech přepíná do nativního prvku. Podporuje prakticky všechno, co je potřeba.</p>
  </li>
  <li>
    <p>
      <a href="https://github.com/Pikaday/Pikaday">Pikaday</a> – relativně populární (nezávislý na jQuery)
    </p>
  </li>
  
  
  <li>
    <p>
      <a href="https://github.com/xylphid/vanilla.datepicker">Vanilla datepicker</a>
    </p>
  </li>
  <li>
    <p>
      <a href="https://github.com/bevacqua/rome">Rome</a> (<a href="http://bevacqua.github.io/rome/">demo</a>)
    </p>
    
    <p><img src="/files/datepicker/rome.png" alt="Výběr data prostřednictvím kalendáře" class="border"></p>

<p><a href="https://kod.djpw.cz/coeb">Samostatná zjednodušená ukázka</a></p>
  </li>
</ul>




<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://designmodo.com/javascript-calendars/">13 Free and Premium JavaScript / jQuery Calendars</a></li>
</ul>