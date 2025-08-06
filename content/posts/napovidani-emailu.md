---
title: "Napovídání e-mailu"
headline: "Napovídání poskytovatele e-mailu"
description: "Jak usnadnit vyplňování e-mailové adresy automatickým napovídáním poskytovatele."
date: "2016-02-22"
last_modification: "2016-02-26"
status: 1
tags: ["formulare", "hotova-reseni", "napady"]
format: "html"
---

<p>Vyplňování formulářů je nedílnou součástí řady webů a vždy je prostor vymyslet zlepšení, které lidem usnadní práci a zrychlí proces zadávání dat do formuláře.</p>

<p><img src="/files/napovidani-emailu/napoveda-email.gif" alt="Napovídání e-mailu" class="border"></p>














<p>Jedno z možných zlepšení je <b>našeptávání poskytovatele e-mailu</b>. Velké procento lidí v ČR používá e-mailové adresy končící na <code>seznam.cz</code>, <code>gmail.com</code>, <code>hotmail.com</code>, <code>centrum.cz</code>, <code>email.cz</code> a podobně.</p>

<p>Na jedné nejmenované <a href="http://djpw.cz">Diskusi JPW</a> z cca 20 tisíc účtů používá jednoho z Top 10 poskytovatelů přibližně <b>70 % lidí</b>.</p>

<p>Vyloudil jsem data ještě od pár lidí z webů s řádově desítkami až stovkami tisíc e-mailů a podíl lidí s e-mailem u Top 10 poskytovatelů se pohyboval mezi <b>44</b> a <b>98 %</b> v závislosti na projektu (např. u B2B není tak pravděpodobné, že někdo použije adresu typu <code>pepicek.pytlicek@seznam.cz</code>).</p>

<p><small>Poděkování zaslouží <a href="http://hatak.cz/">Zdeněk Haták</a>, <a href="https://twitter.com/medvidek88">Tomáš Janda</a>, <a href="http://gransy.com/">Jan Horák</a> a <a href="http://www.jiricisar.cz/">Jiří Císař</a>.</small></p>



<h2 id="reseni">Řešení</h2>

<p>Nejméně invasivní se zdá být napovídání pomocí <a href="/position#absolute">absolutně posicovaného</a> elementu přes běžné formulářové políčko.</p>

<p>Po zadání zavináče a prvního písmena se zobrazí případná nápověda, aniž by se tím původní <a href="/input"><code>&lt;input></code></a> nějak ovlivnil. Po kliknutí na nápovědu se její obsah nastaví do <code>value</code> formuláře.</p>

<p>Statická ukázka pro představu – hodnota políčka je „<code>email@s</code>“ a obsah „eznam.cz“ je v posicovaném <code>&lt;span></code>u.</p>

<div class="live no-source">
<span class="naseptavac-email">
    <input type="text" value="email@s">
    <span class="naseptavac-napoveda">eznam.cz</span>
</span>  
</div>

<p>Na stránce je tedy z pohledu uživatele úplně obyčejný <code>&lt;input></code>, jen se u něj objevuje nápověda. Její obsah se do políčka doplní po kliknutí, při opuštění políčka / přeskočení jinam (<code>onblur</code>) nebo třeba při odeslání formuláře.</p>


<h3 id="js">Našeptávání v JS</h3>

<p>Pro zvolení nápovědy v závislosti na obsahu políčka je potřeba použít JavaScript.</p>

<p>Získání obsahu za zavináčem a najití možné nápovědy je cvičení na základní práci s řetězci:</p>

<ul>
  <li><code>indexOf</code> – zjistí posici daného znaku</li>
  <li><code>substr</code> – získá požadovanou část řetězce</li>
</ul>

<p>Trochu oříšek je umístění posicované nápovědy na správné místo:</p>


<p>Teoreticky by mohlo jít použít <font style="font-family: courier">neproporcionální font</font>, kde jsou všechny znaky stejně široké, a umístění nápovědy zajistit výpočtem typu <i>počet znaků * šířka</i>.</p>

<p>Spolehlivější a universálnější ale bude zjistit umístění pomocí zkopírování obsahu <code>&lt;input></code>u do nového <code>&lt;span></code>u se stejným stylem, který poslouží k přeměření rozměru.</p>

<div class="external-content">
  <ul>
    <li><p><a href="https://kod.djpw.cz/iwub">Živá ukázka</a> (hotové řešení na <a href="https://github.com/Jahoda/email-hint">GitHubu</a>)</p></li>
  </ul>
</div>


<h2 id="extremni">Extrémnější varianta</h2>

<p>Může se nabízet myšlenka ten <code>@seznam.cz</code> jako nejčastější nabízet rovnou na konci e-mailu.</p>

<p>Mimo přihlašování na homepage <a href="/seznam">Seznamu</a> to ale bude pro značnou část lidí neužitečné a nejspíš až matoucí.</p>

<p><img src="/files/napovidani-emailu/prihlaseni-seznam.png" alt="Přihlášení na Seznamu" class="border"></p>














<p>V ČR, kde e-mailové adresy <code>neco@seznam.cz</code> dominují, by se možná dalo v některých případech uvažovat o nabídnutí ihned po zadání zavináče.</p>



<h2 id="sql">Zjištění nejčastějších domén</h2>

<p>Nejpoužívanější domény e-mailů se budou lišit projekt od projektu, takže se hodí si seznam vytvořit dle konkrétní situace.</p>

<p>Seznam nejčetnější poskytovatelů pro konkrétní web jde získat následujícím SQL dotazem:</p>

<pre><code>SELECT 
  COUNT(<b>email</b>) Pocet, 
  SUBSTRING_INDEX(
    SUBSTRING_INDEX(<b>email</b>, '@', 2), '@', -1
  ) Domain 
FROM <i>uzivatele</i>
GROUP BY Domain 
ORDER BY Pocet DESC 
LIMIT 10</code></pre>












<p>Budu rád, když se o data podělíte.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>
    <p>Litle Big Details: <a href="http://littlebigdetails.com/post/139151387912/giltcom-when-entering-your-email-address-in-the">Gilt.com – When entering your email address in the sign up form, the input field auto completes common domains.</a></p>
    <p><img src="/files/napovidani-emailu/email-autocomplete.png" alt="Automatické doplňování e-mailu" class="border"></p>



  </li>
</ul>



<style>
.naseptavac-email {
    position: relative;
    display: block;
}
.naseptavac-email input, 
.naseptavac-napoveda {
    font-family: sans-serif;
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    padding: 6px;
    border: 1px solid gray;
    display: block;
    margin: 0;
}
.naseptavac-napoveda {
    color: gray;
    position: absolute;
    top: 0;
    left: 63px;
    border-color: transparent;
}
</style>