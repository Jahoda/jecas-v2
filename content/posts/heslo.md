---
title: "Bezpečnost hesel a přihlašování"
headline: "Bezpečnost hesel a přihlašování"
description: "Pravidla pro tvorbu hesel a bezpečné přihlašování."
date: "2015-08-31"
last_modification: "2015-08-31"
status: 0
tags: []
format: "html"
---

<ul>
  <li>
    <p>Pravidla pro <b>minimální délku hesla</b>.</p>
    
    <p>Nároky by neměly být přehnané.</p>
  </li>
  
  <li>
    <p>Při změně e-mailu a dalších citlivých údajů vyžadaovat <b>zadání hesla</b>.</p>
  </li>
  
  <li>
    <p>Používání přihlašování třetích stran (Facebook, Twitter). Používat pro registrace více e-mailových adres. Vytvořit si účty u běžně používaných služeb pro zablokování e-mailu.</p>
  </li>
  
  <li>Nedostatečná ochrana obsahu, kam vede odkaz.</li>
</ul>


<h2 id="pozadavky">Požadavky na heslo</h2>

<p>Požadavky na minimální délku a sílu hesla jsou značně ošemetné.</p>

<p>Běžně se je možné setkat s tím, že heslo vyžaduje:</p>

<ul>
  <li>minimálně 8 znaků,</li>
  <li>maximálně 30 znaků,</li>
  <li>alespoň jedno velké písmeno,</li>
  <li>alespoň jedno číslo,</li>
  <li>alespoň jeden speciální znak</li>
</ul>


<p>Takže třeba <code>1Password_</code> projde.</p>

<p>Na jednu stranu</p>


<h3 id="priklad">Příklad, jak to nedělat</h3>

<p>Pro přihlašování z mobilu do jedné nejmenované banky je nutné vytvořit PIN.</p>

<p>Zadal jsem PIN <code>27775555</code>, načež mi aplikace vynadala, že PIN musí mít 4–6 znaků.</p>

<p>Zkrátil jsem na <code>277755</code>, načež aplikace zahlásila, že kód nesmí obsahovat opakující se číselné řady.</p>

<p>Zkusil jsem zadat <code>2727</code> a prošlo to.</p>







<h2 id="zmena-hesla">Změna hesla</h2>

<p>Některé systémy vyžadují změnu po určitém období. Heslo má omezenou platnost, po které musí být změněno.</p>

<p>Na první pohled se to může zdát rozumné – pokud by se útočník dostal ke starým heslům, byly by mu k ničemu, protože už by byla dávno změněná.</p>



<p>Bohužel nucená změna hesel v praxi způsobuje, že:</p>

<ol>
  <li>
    <p>Lidé volí <b>lépe zapamatovatelná</b> a tedy jednodušší hesla, když vidí, že jim na dlouho nevydrží.</p>
  </li>  
  <li>
    <p>Změnu hesla řeší tím, že na konec přidají <b>pořadové číslo nebo letopočet</b>.</p>    
    <p>Vznikne tak heslo: <code>1Password_1</code>, <code>1Password_2</code>, <code>1Password_2015</code> a podobně.</p>
  </li>
  <li>
    <p>Nové heslo si člověk pro jistotu <b>někam zapíše</b>. Třeba si ho <a href="http://praha.idnes.cz/blanka-a-kuriozity-z-provozu-djp-/praha-zpravy.aspx?c=A151019_112525_praha-zpravy_nub">nalepí na monitor</a>:</p>
    
    <p><img src="/files/heslo/heslo-monitor.jpg" alt="Heslo na monitoru" class="border"></p>
  </li>
</ol>























<ul>
  <li>Smashing Magazine: <a href="http://www.smashingmagazine.com/2015/12/passphrases-more-user-friendly-passwords/">Why Passphrases Are More User-Friendly Than Passwords</a></li>
</ul>