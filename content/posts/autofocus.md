---
title: "Automatický focus políčka"
headline: "Automatické vybrání políčka po načtení"
description: "Jak a kdy přesunout kursor do textového pole automaticky po načtení stránky."
date: "2015-09-21"
last_modification: "2015-09-24"
status: 1
tags: ["html", "html-atributy", "js"]
format: "html"
---

<p>Pokud je pravděpodobné, že člověk na stránce <b>bude chtít něco psát do textového políčka</b>, jde mu pomoci tím, že se do něj přesune kursor (pole tzv. <i>dostane focus</i>).</p>

<p>V JavaScriptu to vypadá následovně:</p>


<pre><code>&lt;script>
var policko = document.getElementBy("id-pole");
policko.<b>focus()</b>;
&lt;/script></code></pre>





<p>Od <b>IE 9</b> funguje ke stejnému účelu přímo HTML atribut <a href="/input#autofocus"><code>autofocus</code></a>:</p>

<pre><code>&lt;input <b>autofocus</b>></code></pre>




<h2 id="problemy">Možné problémy</h2>


<h3 id="prodleva">Prodleva</h3>

<p>V případě JS řešení by měl být skript přidávající <code>focus</code> <b>co nejblíže políčku</b>.</p>

<p>Bude-li tento kód v <b>externím JS souboru</b> připojeném na konci stránky a třeba ještě obalený do funkce čekající na načtení stránky, může mít nastavení <i>focusu</i> <b>značnou prodlevu</b>.</p>

<p>V nejhorším případě přijde ve chvíli, kdy ho návštěvník už nepotřebuje a naruší mu procházení stránky.</p>

<p>Tím je výhodný HTML atribut <code>autofocus</code>, protože se provede ihned (poznámka: v případě více <code>autofocus</code>ů vyhrává ten poslední).</p>





<h3 id="zasah">Zásah do ovládání</h3>

<p>Přesouvat kursor do nějakého políčka je docela výrazný zásah uživateli do ovládání webu.</p>

<p>Přidání <code>focus</code>u pro nějaký <a href="/input"><code>&lt;input></code></a> typicky <b>zmaří pokus o použití klávesových zkratek</b>, což je docela otravné.</p>

<p>Klávesové zkratky typu <kbd>Ctrl</kbd> + <i>něco</i> typicky fungují i s kursorem v políčku, ale třeba rolování po stránce směrovými klávesami <kbd>↓</kbd> a <kbd>↑</kbd> už nejspíš fungovat nebude.</p>

<p>Před přidáním <code>autofocus</code>/<code>focus()</code> je tak dobré pořádně zvážit, jestli je políčko tolik významné a nehrozí moc falešných poplachů, kdy bude přesun kursoru nežádoucí.</p>

<p>Při dobře použitých atributech <a href="/tabindex"><code>tabindex</code></a> je skok do políčka otázkou jednoho <kbd>Tab</kbd>u, což není zase tolik náročné.</p>






<h2 id="priklady">Příklady správného použití</h2>

<ol>
  <li>
    <p><b>Přihlašovací/registrační formulář</b> na samostatné stránce.</p>
    
    <p><img src="/files/autofocus/facebook.png" alt="Přihlašovací formulář" class="border"></p>
  </li>
  
  
  
  
  <li>
    <p><b>Stránka pro vyhledávání</b>. V případě <a href="/seznam">Seznamu</a> je situace trochu sporná, protože se jedná zároveň i o portál, kam nemusí každý chodit primárně hledat.</p>
    
    <p><img src="/files/autofocus/seznam.png" alt="Vyhledávací formulář" class="border"></p>
  </li>
  
  
  
  
  
  
  
  
  <li>
    <p><b>Ověřovací heslo/kód</b> je příkladem úplně typickým. V případě jediného políčka na stránce je přidání automatického focusu logický krok.</p>
    
    <p><img src="/files/autofocus/heslo.png" alt="Heslo" class="border"></p>
  </li>
</ol>






<h2 id="mobily">Zobrazení SW klávesnice na mobilech</h2>

<p>Na mobilní telefonech a tabletech s dotykovou klávesnicí na obrazovce se po nastavení <i>focusu</i> se tato  klávesnice <b>automaticky nevysune</b>.</p>

<p>Neexistuje žádná možnost, jak toho docílit bez výslovné akce uživatele. Načtení stránky se za akci uživatele nepovažuje.</p>

<p>Uživatel tak stejně musí <i>tapnout</i> do políčka, aby se mu klávesnice zobrazila a mohl začít psát.</p>

<p>Na mobilech tak <b>automatický focus</b> nevypadá jako moc šťastné řešení, protože nic <b>neusnadňuje</b> a navíc situace s kursorem v políčku bez vysunuté klávesnice <b>může vypadat jako chyba</b>.</p>





<h3 id="prompt">Prompt</h3>

<p>Jediný způsob, jak v některých mobilních prohlížečích zobrazit klávesnici, je použití <code>prompt</code> dotazu. Obrázek z <a href="/edge-mobile">mobilního Edge</a> ve Windows Phone:</p>

<p><img src="/files/autofocus/prompt.png" alt="Heslo do promptu" class="border"></p>





















































<p>Prompt je ale tak uživatelsky nepřívětivý, že to moc rozumné není.</p>