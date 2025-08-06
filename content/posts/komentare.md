---
title: "Jak přidat komentáře na web"
headline: "Komentáře na webu"
description: "Jak jednoduše provozovat komentáře pod články na svých stránkách."
date: "2014-08-06"
last_modification: "2015-05-09"
status: 1
tags: ["napady", "produktivita"]
format: "html"
---

<p>Může nastat, že je žádoucí, aby na stránce mohli návštěvníci <b>zanechat komentář</b>. Před umožněním komentování je dobré počítat s několika věcmi.</p>

<ol>
  <li>
    <p><b>Moderování komentářů</b> – web může přitahovat diskutující, kteří nebudou svým projevem vyhovovat představám provozovatele. Nežádoucí komentáře bude nutné mazat. Některé systémy z opatrnosti před spamem mohou vyžadovat <b>schvalování komentářů</b>, což zabere čas.</p>
  </li>  
  
  <li>
    <p><b>Ochrana proti spamu</b> – dřív nebo později se v komentářích pravděpodobně objeví nevyžádané příspěvky a bude nutné se <a href="/spam">bránit proti spamu</a>.</p></li>
  
  <li>
    <p><b>Ztráta ilusí</b> – diskutující na webu mohou obsah <b>ostře kritisovat</b>. Někdy je častější, že návštěvníci více kritisují / upozorňují na chyby, než že chválí autora, což někoho může demotivovat od dalšího psaní.</p>
  </li>
</ol>


<h2 id="vlastni-cizi">Vlastní, nebo cizí komentáře?</h2>

<p>Buď jde komentáře provozovat na vlastním serveru, nebo využít nějakou externí službu třetí strany.</p>


<h3 id="vlastni">Vlastní komentáře</h3>

<p>Používá-li web nějaký redakční systém typu <a href="/wordpress">WordPress</a>, je v něm systém pro komentáře přítomný. U kompletně vlastního řešení ale vyžaduje možnost <b>přidávat komentáře</b> jisté znalosti programování a databasí (+ podporu těchto věcí na webovém serveru).</p>

<figure>
  <img src="/files/komentare/wp.png" alt="Formulář pro zaslání komentáře ve WordPressu" class="border">
  <figcaption>Příklad formuláře pro komentování ve WordPressu</figcaption>
</figure>






















<p>Výhoda vlastního řešení spočívá hlavně v tom, že je nad obsahem komentářů <b>plná kontrola</b>. Komentáře mohou přinášet hodnotný obsah (například s ohledem na <a href="/seo">SEO</a>). Při používání externí služby je tento <b>obsah na cizích serverech</b> a například při zániku služby bude nutné řešit migraci dat (v lepším případě, kdy bude ukončení známé dopředu).</p>


<p>Jelikož cizí komentáře zpravidla fungují <b>na základě JavaScriptu</b>, který se připojí do stránky a zobrazí komentáře, může být problém vůbec se samotným <b>indexováním komentářů vyhledávači</b>. S vlastními komentáři problém s dohledatelností ve vyhledávačích nehrozí.</p>

<p>Nakonec v případě vlastního řešení půjde upravit <b>výpis komentářů</b> prakticky libovolným způsobem.</p>






<h3 id="cizi">Externí komentářová služba</h3>

<p>Hlavní výhodou cizí služby je, že se člověk <b>nemusí o moc věcí starat</b>. Zaregistruje se u poskytovatele komentářů a přidá na svou stránku několik řádek kódu (připojení JS souboru, co načte a zobrazí komentáře).</p>

<p>Vzhledem k tomu, že o ukládání dat komentářů se stará <i>někdo jiný</i>, komentáře jde tímto způsobem přidat i do <b>statické HTML stránky</b>. To může snížit náklady na <a href="/hosting">hosting</a>, protože nebude nutná žádná podpora <b>PHP</b>, <b>MySQL</b> a podobně.</p>

<p>Plně JavaScriptová povaha komentářů výrazně <b>sníží počet spamů</b> ze strany robotů, kteří umějí odesílat HTML formuláře, ale s JS si úplně dobře neporadí.</p>

<p>Další zásadní výhodou je u rozšířených komentářových služeb <b>sdílený účet napříč weby</b> používajícími daný systém. Návštěvník, co už systém použil, je tak rovnou přihlášený, což zvýší jeho <b>ochotu komentovat</b> – nemusí nic vyplňovat, jen napsat komentář.</p>

<p>Tato vlastnost má jednu nevýhodu pro <i>opatrné uživatele</i>. Provozovatel externí služby získá pro každého návštěvníka <b>přehled o všech navštívených webech</b>, které jeho službu používají.</p>

<p>Jisté risiko existuje i pro tvůrce webu – skript vkládající komentování na stránku získá prakticky <b>plnou kontrolu nad webem</b>. Je nutné věřit, že toho provozovatel nezneužije a nebude napaden útočníkem, který by toto zneužil.</p>











<h2 id="sluzby">Komentářové služby</h2>

<p>Nejpopulárnější z externích služeb umožňujících snadné přidání komentářů na stránky jsou uvedené níže. Všechny umožňují <b>diskuse ve vláknech</b> nebo různé způsoby řazení příspěvků, moderování a podobně.</p>


<h3 id="facebook">Facebook komentáře</h3>

<p>Pro komentování jde použít <b>účet na Facebooku</b>. To je na jednu stranu výhoda (profil na <a href="/facebook">Facebooku</a> má hodně lidí), na stranu druhou jsou návštěvníci bez Facebook účtu vyloučeni z diskuse.</p>

<div class="external-content">
<ul>
  <li><a href="https://developers.facebook.com/docs/plugins/comments">Facebook Comments Plugin</a> – stránka pro získání kódu přidávajícího komentáře na web</li>
  
  
  <li><a href="https://kod.djpw.cz/mbnb">Ukázka Facebook komentářů</a></li>
</ul>  
</div>

<p>Velkou výhodou Facebook komentářů je <b>sdílení přímo na Facebooku</b>.</p>

<p><img src="/files/komentare/sdilet-fb.png" alt="Zveřejnění komentáře na Facebooku" class="border"></p>






<p>Když tuto volbu komentující člověk zaškrtne, odkaz na stránku s komentářem se zobrazí jeho přátelům / lidem, kteří ho sledují. Může to tedy být způsob, jak získat další <b>návštěvnost</b>.</p>

<p>V nové versi Facebook komentářů Graph API v2.3 (nahrazuje starou podobu 23. června 2015) už políčko pro zveřejnění rovnou zaškrtnuté není.</p>

<p>Nebo je? Napište, prosím.</p>

<div class="live no-source">
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/cs_CZ/sdk.js#xfbml=1&version=v2.3&appId=257803581070077";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>  
<div class="fb-comments" data-colorscheme="light" data-numposts="5" data-href="http://jecas.cz/komentare"></div>   
</div>



<h3 id="disqus">Disqus</h3>

<p>Relativně rozšířenou službou pro komentáře je i <b>Disqus</b>. Příjemné na něm je, že automaticky přebírá barvy webu, takže do stránky hezky zapadne bez nějakého konfigurování.</p>

<div class="external-content">
<ul>
  <li><a href="https://disqus.com">Hlavní stránka Disqus</a> – jde tam získat kód pro vložení diskusí na stránky</li>
  <li><a href="https://kod.djpw.cz/nbnb">Živá ukázka Disqus komentářů</a></li>
</ul>
</div>

<p>Pro uživatele nabízí spoustu způsobů (Facebook, Twitter, Google Plus), kterými komentář podepsat – jde použít i obyčejný <b>e-mail a jméno</b> v režimu <i>Napsat komentář jako host</i>.</p>

<p><img src="/files/komentare/disqus.png" alt="Přihlášení do Disqus" class="border"></p>












<p>Do komentářů jde <b>přidávat obrázky</b> i text příspěvků <b>formátovat HTML značkami</b>.</p>

<p>Disqus posílá v případě okomentování <b>e-mailové notifikace</b>, takže se o komentářích správce webu / diskutující snadno dozví.</p>

<p>Se <b>spamem</b> se vypořádává velmi dobře – za roky používání na tomto webu bylo případů spamu naprosté minimum.</p>




<h3 id="intense">IntenseDebate</h3>

<p>Možná méně známá a rozšířená, ale rovněž kvalitní komentářová služba je <b>IntenseDebate</b>.</p>

<p><img src="/files/komentare/intense.png" alt="Ukázka IntenseDebate komentářů" class="border"></p>























<p>Má ale lehce komplikované rozhraní.</p>

<div class="external-content">
<ul>
  <li><a href="https://intensedebate.com/">Hlavní stránka IntenseDebate</a></li>
  <li><a href="https://kod.djpw.cz/obnb">Ukázka komentování pomocí IntenseDebate</a></li>
</ul>
</div>



<h2 id="vlastni">Programování vlastních komentářů</h2>

<p>Při vytváření kompletně vlastního komentářového systému je dobré pamatovat na následující.</p>

<ol>
  <li>
    <p>Dát si <b>pozor na bezpečnost</b>, hlavně na <a href="/bezpecnost#xss">risiko XSS díry</a>. Kdokoliv může díky komentářům vložit na stránku obsah. Je proto bezpodmínečně nutné tento vstup ošetřit, aby nešlo <b>vložit škodlivý JavaScript</b>.</p>
    
    <p>Je nutné ošetřit všechna pole, ne jen samotný text příspěvku.</p>
    
    <p>Možnost komentovat zvyšuje šanci využít případnou <a href="/bezpecnost#csrf">CSRF díru</a> – pokud jde nějakou administrátorskou akci provést prostým otevřením odkazu, stačí když útočník přidá URL do příspěvku a nic netušící administrátor odkaz otevře.</p>
  </li>  
  <li>
    <p><b>Bránit se proti spamu a tapetování</b>. Nemělo by jednomu uživateli jít zaslat hromadu příspěvků za pár minut.</p>
  </li>  
  <li>
    <p>Umožnit <b>sledovat nové příspěvky</b>. Měla by existovat možnost, jak se diskutující dozví, že na něj někdo reagoval.</p>
  </li>
  <li>
    <p>Užitečný je <b>náhled</b> anebo <b>možnost provádět úpravy</b> po odeslání. Možnost editovat stačí jen na nejbližší dobu od odeslání. Historii editací je užitečné ukládat.</p>
  </li>
  
  <li>
    <p><b>Zvýraznění nepřečtených komentářů</b> je prakticky nutností u diskusí, kde je vyšší počet příspěvků.</p>
  </li>
</ol>