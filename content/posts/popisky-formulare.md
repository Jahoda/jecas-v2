---
title: "Kam umístit popisky formuláře"
headline: "Kam umístit popisky formuláře"
description: "Jak umístit popisky formulářových prvků, aby bylo vyplňování formuláře co nejpohodlnější."
date: "2016-02-04"
last_modification: "2016-02-10"
status: 1
tags: ["formulare", "hotova-reseni", "napady", "ux"]
format: "html"
---

<p>Téměř každá webová stránka nebo aplikace obsahuje formuláře. Bývá zvykem, že formuláře sestávají z dvojic „popisek – políčko“. K velké úvaze potom je, kam popisek umístit.</p>

<p>Pro lepší pohodlí se popisky obalují do značky <a href="/label-for"><code>&lt;label></code> s atributem <code>for</code></a>, aby se šlo přes popisek prokliknout do <a href="/input"><code>&lt;input></code>u</a>:</p>

<pre><code>&lt;label for="policko">
  Popisek
&lt;/label>
&lt;input id="policko"></code></pre>


<h2 id="vedle">Popisky vedle políček</h2>

<div class="live">
  <p><label for="policko1">Jméno</label>
    <input id="policko1">  
  </p>
</div>

<p>Umístit popisky vedle příslušných prvků je výhodné hlavně kvůli místu. Formulář může být nižší.</p>

<p>Jinak má tento postup několik nevýhod.</p>


<p>Při více položkách je třeba řešit jejich zarovnání pod sebe. Jde to snadno třeba <a href="/html-tabulky">tabulkou</a>:</p>
<div class="live">
  <table class="no-border">
    <tr>
      <td><label for="p2">Jméno a příjmení</label></td>
      <td><input type="text" id="p1"></td>
    </tr>
    <tr>
      <td><label for="p2">Město</label></td>
      <td><input type="text" id="p2"></td>
    </tr>
    <tr>
      <td><label for="p3">Telefon</label></td>
      <td><input type="text" id="p3"></td>
    </tr>    
  </table>
</div>

<p>Jak je na ukázce vidět, vlivem rozdílné délky popisků je <i>město</i> a <i>telefon</i> hodně daleko od příslušného políčka. Kvůli tomu bude muset člověk více přeskakovat očima, čímž se prodlouží doba vyplňování.</p>


<h3 id="vpravo">Zarovnání vpravo</h3>

<p>Zrychlit čtení takového formuláře jde zarovnáním popisků doprava k políčkům:</p>

<div class="live">
  <table class="no-border">
    <tr>
      <td style="text-align: right"><label for="p12">Jméno a příjmení</label></td>
      <td><input type="text" id="p12"></td>
    </tr>
    <tr>
      <td style="text-align: right"><label for="p13">Město</label></td>
      <td><input type="text" id="p13"></td>
    </tr>
  </table>
</div>

<h2 id="nad">Popisky nad políčky</h2>

<p>Popisky nad formulářovými prvky by měly být na vyplňování <b>nejrychlejší</b>. Očím vyplňujícího uživatele se stačí pohybovat jen směrem dolů. Není potřeba se přesouvat ještě zleva doprava jako v předchozím případě.</p>

<div class="live">
  <p>
    <label for="policko2">Jméno</label><br>
    <td><input id="policko2"></td>
  </p>
  <p>
    <label for="policko3">Město</label><br>
    <td><input id="policko3"></td>
  </p>  
</div>

<p>Nevýhoda je oproti předchozímu postupu ve větší prostorové náročnosti. Tento typ formuláře je přibližně 2× vyšší.</p>

<p>Hodně užitečná je ale na tomto postupu snadná přenositelnost formuláře na mobily při tvorbě <a href="/responsive">responsivního designu</a>, kam se dvousloupcový formulář nemusí vejít.</p>

<div class="external-content">
  <ul><li><a href="http://www.uxmatters.com/mt/archives/2006/07/label-placement-in-forms.php">Label Placement in Forms</a> – test rychlosti vyplňování různých formulářů se snímáním pohybu zraku</li>
  </ul>
</div>

<h2 id="v">Popisky v políčku</h2>

<p>Hlavní výhoda popisků v políčku je úspora místa.</p>


<h3 id="placeholder">Mizející popisky</h3>

<p>Docela populární, ale většinou velmi špatné řešení, je realisovat popisky prostřednictvím <a href="/placeholder"><code>placeholder</code>u</a>:</p>

<div class="live">
  <p><input type="text" placeholder="Jméno"></p>
</div>

<p>Problém je v tom, že takový <i>popisek</i> v některých prohlížečích zmizí ihned po kliknutí do něj. Případně zmizí nejpozději při zadání prvního znaku.</p>

<p>Uživatel si kvůli <b>mizejícímu popisku</b> musí zapamatovat, co má do políčka zadávat. Pokud na účel políčka zapomene, nedostane se k němu jinak, než že celé pole smaže. Kontrola již vyplněného formuláře je potom prakticky nemožná.</p>

<p>Mizející placeholder jako popisek není moc dobrý ani u krátkých formulářů. I u formuláře o pár políčkách může člověka něco vyrušit během vyplňování. Po návratu k přihlašovacímu formuláři může třeba zapomenout, jestli má zadat e-mail nebo uživatelské jméno.</p>

<h3 id="presun">Přesun placeholderu</h3>

<p>Trochu lepší a celkem rozšířené řešení je placeholder po vybrání pole zmenšit a přemístit.</p>


<div class="live">
<style>
.policko {
    position: relative;
}
.policko label {
    position: absolute;
    left: .2em;
    top: 0;
    transition: all .2s;
    line-height: 1;
}

.policko .focus + label {
    top: -1.2em;
    font-size: 70%;
    background: #fff;
    padding: .2em;
}
</style>
<p>
  <span class="policko">
    <input id="email3" type="email" onfocus="this.className = 'focus'">
    <label for="email3">E-mail</label>
  </span>
</p>
<p>
  <span class="policko">
    <input id="url" type="url" onfocus="this.className = 'focus'">
    <label for="url">URL</label>
  </span>
</p>    
</div>

<p>Je otázka, jestli přesouvání popisku není zbytečný efekt, který bude odvádět pozornost od vyplňování. Další možný problém je čitelnost popisku při zmenšení jeho písma.</p>

<p>Nakonec přetrvává ještě jedna nevýhoda. Bývá dobré, když velikost políčka odpovídá očekávané délce vstupu. Při popisku v políčku se ale velikost musí přizpůsobit délce popisku, takže následující příklad není s popiskem v políčku moc dobře řešitelný:</p>

<div class="live">
  <p><label>Velikost bot<br><input size="2" value="45"></label></p>
</div>

<h3 id="viditelne">Neustále viditelný popisek</h3>

<p>Existuje ještě jedna varianta. Ve visuálním políčku utvořeném <code>&lt;label></code>em nechat popisek stále viditelný:</p>

<div class="live">
  <style>
    .viditelny label {
      background: #fff;
      display: inline-block;
      padding: .2em .5em;
      border: 1px solid #444;
      cursor: text;
    }
    .viditelny + .viditelny label {
      border-top: 0;
    }
    .viditelny span {
      display: block;
    }
    .viditelny input {
      border: 0
    }
  </style>
  <div class="viditelny"><label><span>Jméno a příjmení</span><input></label></div>
  <div class="viditelny"><label><span>Heslo</span><input></label></div>
</div>

<p>Pointa tohoto postupu je v tom, že takový formulář neobsahuje žádné rušivé prvky navíc. Popisek je přidružen k políčku.</p>

<p>Výhody tohoto postupu popisuje článek:</p>

<div class="external-content">
  <ul>
    <li><a href="http://uxmovement.com/forms/why-infield-top-aligned-form-labels-are-quickest-to-scan/">Why Infield Top Aligned Form Labels are Quickest to Scan</a></li>
  </ul>
</div>

<p>Je potřeba si uvědomit, že i přes některé hezké výhody existují risika hovořící pro používání jiného řešení:</p>

<ol>
  <li>
    <p>Vzhled není úplně standardní a uživatelé mohou mít problém ho pochopit. Jeden z velkých problému formulářů bývá v tom, že formulář nevypadá jako formulář.</p>
  </li>
  <li>
    <p>Velikost políčka nemůže odpovídat délce očekávané hodnoty (odpovídá velikostí popisku).</p>
  </li>
  <li>
    <p>Je problém s umístěním chybových hlášek při vyplnění špatné hodnoty.</p>
  </li>
</ol>


<h2 id="odkazy">Odkazy</h2>

<ul>   
  <li><a href="http://uxmovement.com/forms/faster-with-top-aligned-labels/">Why Users Fill Out Forms Faster with Top Aligned Labels</a></li>
  
  <li>Luke Wroblewski: <a href="http://www.lukew.com/ff/entry.asp?1502">Web Application Form Design</a></li>
</ul>

<style>
.no-border td, .no-border {
  border: 0;
  background: transparent;
}</style>

<!-- https://kod.djpw.cz/ygub -->