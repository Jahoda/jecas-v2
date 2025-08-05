---
title: "Atribut autocapitalize"
headline: "Atribut <code>autocapitalize</code>"
description: "HTML atribut <code>autocapitalize</code> slouží k nastavení automatického přepnutí na velká písmena u dotykových klávesnic."
date: "2015-06-09"
last_modification: "2015-10-03"
status: 1
tags: ["formulare", "html", "html-atributy"]
format: "html"
---

<p><b>Softwarové dotykové klávesnice</b> na obrazovce se snaží přizpůsobit kontextu:</p>

<p>U políčka <code>&lt;input></code> tomu může napomoci atribut <a href="/input#type"><code>type</code></a> – například hodnota <code>email</code> přidá na klávesnici zavináč, typ <code>number</code> nebo <code>tel</code> zajistí číselnou klávesnici a podobně.</p>


<div class="internal-content">
  <ul>
    <li>Nejčastější chyby formulářů: <a href="/chyby-formularu#type">Zbytečně obecné atributy type</a></li>
  </ul>
</div>

<p>Klávesnice dotykových zařízení se zpravidla <b>automaticky snaží chytře přepínat na velká písmena</b>.</p>

<p>HTML atribut <code>autocapitalize</code> potom dovoluje mít chování tohoto přepínání plně pod kontrolou.</p>


<h2 id="vyuziti">Využití</h2>

<p>Pokud chce návštěvník například zadat své jméno, <b>automatické přepnutí na velká písmena</b> pro první znak ocení.</p>

<p><img src="/files/autocapitalize/velka.png" alt="Přepnutí na velká písmena" class="border"></p>





















<p>Stejně tak při odřádkování v <a href="/textarea"><code>&lt;textarea></code></a> se zvětšení písmen hodí. Protože nový odstavec nejspíš bude začínat velkým písmenem.</p>

<p>V některých případech, jako je třeba <b>zadávání hesla</b>, je ale automatická změna velikosti nežádoucí. Proto je dobré v závislosti na účelu políčka určit optimální chování.</p>





<h2 id="zapis">Zápis</h2>

<p>Atribut <code>autocapitalize</code> jde použít u 3 HTML značek:</p>

<ul>
  <li><code>&lt;form></code> – nastavení zdědí všechny níže uvedené prvky formuláře,</li>
  <li><code>&lt;input></code>,</li>
  <li><code>&lt;textarea></code></li>
</ul>


<p>Výchozí stav nastane bez uvedení atributu <code>autocapitalize</code> – tedy prohlížeč zvětšuje klávesnici dle svého uvážení. To se projevuje zvětšováním prvního písmena ve větě nebo v odstavci u značky <code>&lt;textarea></code>.</p>

<p>Ukázka bez nastaveného <code>autocapitalize</code>:</p>

<div class="live nosource">
  <p>        <label>Input:
    <input>
    </label>      </p>
  <p>        <label>Textarea:
    <textarea></textarea>
    </label>      </p>
</div>




<p>Možné hodnoty atributu:</p>


<dl>  
  <dt id="none"><code>none</code> – vypnutí zvětšení písmen</dt>
  
  <dd>
    <p>Zrušení automatické změny velikosti je asi nejčastěji používané:</p>
       
    <div class="live ">
      <p>        <label>Input:
          <input autocapitalize="none">
        </label>      </p>
      <p>        <label>Textarea:
          <textarea autocapitalize="none"></textarea>
        </label>      </p>
    </div>
    
    <p>Někdy se lze setkat se starší podobou pro vypnutí – hodnotou <code>off</code>. Ta je označená jako <i lang="en">deprecated</i> a neměla by se používat. V prohlížečích funguje.</p>
  </dd>  
  
  <dt id="sentences"><code>sentences</code></dt>
  <dd>
    <p>Klávesnice bude <b>automaticky zvětšena po ukončení věty</b>. Tečkou. Vykřičníkem! Otazníkem? Hodnota <code>sentences</code> odpovídá výchozímu chování (tj. neuvedení <code>autocapitalize</code>).</p>
    <div class="live ">
      <p>        <label>Input:
          <input autocapitalize="sentences">
        </label>      </p>
      <p>        <label>Textarea:
          <textarea autocapitalize="sentences"></textarea>
        </label>      </p>
    </div>    
  </dd>
  
  
  <dt id="words"><code>words</code></dt>
  <dd>
    <p>Zvětšení <b>Po Konci Slova</b>. Hodí se třeba pro políčko <i>Jméno a příjmení</i>, kde se po mezeře automaticky přepne na velká písmena.</p>
    
    <p>Větší uplatnění najde <code>autocapitalize="words"</code> v angličtině, kde se první velká písmena běžně používají u všech slov nadpisů a názvů.</p>
    <div class="live ">
      <p>        <label>Input:
          <input autocapitalize="words">
        </label>      </p>
      <p>        <label>Textarea:
          <textarea autocapitalize="words"></textarea>
        </label>      </p>
    </div>    
  </dd>  
  
  
  <dt id="characters"><code>characters</code></dt>
  <dd>
    <p>Při použití <code>autocapitalize="characters"</code> bude výsledkem KŘIČÍCÍ TEXT, jako by uživatel použil klávesu <kbd>CapsLock</kbd>.</p>
    
    <p>Využití? Možná při <b>zadávání bezpečnostních kódů</b>, které jsou celé velkými písmeny. Jinak je většinou UKŘIČENÝ TEXT nežádoucí.</p>
    <div class="live ">
      <p>        <label>Input:
          <input autocapitalize="characters">
        </label>      </p>
      <p>        <label>Textarea:
          <textarea autocapitalize="characters"></textarea>
        </label>      </p>
    </div>    
  </dd>    
</dl>



<h3 id="on-off">Hodnoty <code>on</code>/<code>off</code></h3>


<p>Starší návrhy počítaly u <code>autocapitalize</code> s dvěma hodnotami:</p>

<ol>
  <li><code>on</code> (výchozí) – automatické zvětšení zapnuté</li>
  <li><code>off</code> – vypnuté</li>
</ol>


<p>Novější implementace potom vůbec nepočítá s hodnotou <code>on</code>, kterou nedává smysl používat, když jde o výchozí chování.</p>

<p>Hodnota <code>off</code> je potom nahrazena za <code>none</code>.</p>

<dl>
  <dt id="off"><code>off</code> – vypnutí zvětšení písmen</dt>
  
  <dd>     
    
    <div class="live ">
      <p>        <label>Input:
          <input autocapitalize="off">
        </label>      </p>
      <p>        <label>Textarea:
          <textarea autocapitalize="off"></textarea>
        </label>      </p>
    </div>
  </dd>
      

  
  <dt id="on"><code>on</code> – zapnutí zvětšení písmen</dt>
  
  <dd>
    
    <p>Chová se stejně jako bez <code>autocapitalize</code> nebo při uvedení <code>autocapitalize="sentences"</code>.</p>  
    
    <div class="live ">
      <p>        <label>Input:
          <input autocapitalize="on">
        </label>      </p>
      <p>        <label>Textarea:
          <textarea autocapitalize="on"></textarea>
        </label>      </p>
    </div>
  </dd>    
</dl>





<h2 id="podpora">Podpora</h2>


<ul>
  <li><b>Chrome 43+</b> na <b>Androidu</b></li>
  
  <li><b>Safari</b> na <b>iOS 5+</b></li>
  
  <li><a href="/edge-mobile"><b>Edge Mobile</b></a> ve <b>Windows Phone</b> nepodporuje <code>autocapitalize</code> vůbec</li>
  
</ul>

<p>Podpora v mobilních prohlížečích není úplně 100%, ale to příliš nevadí, protože chytré automatické měnění velikosti nabízených kláves není klíčová vlastnost, ale spíš příjemné vylepšení.</p>

<p>A nakonec se s nepodporou nedá v podstatě nic dělat.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<div class="external-content">
<ul>
  <li>Chrome Platform Status: <a href="https://www.chromestatus.com/features/4529989986811904">autocapitalize</a></li>
  
  <li>Safari HTML Reference: <a href="https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/Attributes.html#//apple_ref/doc/uid/TP40008058-autocapitalize">autocapitalize</a></li>
</ul>  
</div>