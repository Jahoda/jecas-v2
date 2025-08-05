---
title: "Ověřování inputu pro zadávání URL webu"
headline: "Jak udělat <code>&lt;input></code> pro zadávání adresy webu"
description: "Jak vytvořit políčko pro URL webové stránky a správně ho validovat."
date: "2015-02-13"
last_modification: "2020-03-09"
status: 1
tags: ["formulare", "napady"]
format: "html"
---

<p>Na webových formulářích je poměrně běžné, že uživatel bude zadávat <b>adresu webu / URL</b> do formulářového políčka. I takovou drobnost jde vytvořit špatně, dobře nebo výborně:</p>



<h2 id="tolerance">Tolerance různých tvarů</h2>

<p>Základem dobrých formulářů je <b>tolerance k různým stylům zápisu</b>. Vždy není důvod uživatele nutit do přesného formátu, když si s tím může poradit stroj.</p>

<p>Jak může vypadat taková adresa?</p>

<ul>
  <li><code>https://www.jecas.cz</code></li>
  
  <li><code>http://www.jecas.cz</code></li>
  
  <li><code>www.jecas.cz</code></li>
  
  <li><code>jecas.cz</code></li>
  
  <li><code>kod.djpw.cz</code></li>
</ul>



<p>Koncovek (<a href="/tld">Top level domén</a>) je takové množství a průběžně přibývají nové, že je nemá moc smysl kontrolovat. Šlo by sice seznam periodicky stahovat a oproti němu validovat, může ale dojít k nějakému výpadku apod., který by znemožnil zadat validní URL.</p>

<p>Základní <b>platná adresa stránky</b> by měla obsahovat:</p>

<ul>
  <li>alespoň jeden znak,</li>
  <li>tečku,</li>
  <li>dva a více znaků</li>
</ul>

<p>V doméně může být i diakritika.</p>





<h3 id="regularni-vyraz">Regulární výraz pro kontrolu domény</h3>

<p>Pro nejměkčí kontrolu by doména měla obsahovat dvě „slova“ oddělená tečkou a odpovídat regulárnímu výrazu:</p>

<pre><code>\w+\.\w+</code></pre>

<p>Vzhledem k tomu, že existují subdomény, měly by se zohlednit:</p>

<pre><code>(\w+\.)*\w+\.\w+</code></pre>

<p>Tímto regulárním výrazem se vytáhne doména z libovolného vstupu, pokud v něm něco připomínající doménu existuje.</p>

<p>Tolerantní přístup se hodí třeba v případě, že člověk něco odněkud kopíruje a omylem označí i znaky navíc (třeba mezeru nebo konec řádku).</p>

<p>Pro důslednou kontrolu by šlo použít něco jako:</p>

<pre><code>^(https?://)?(\w+\.)*\w+\.\w+/?$</code></pre>




















<h3 id="type-url">Pole <code>&lt;input type="url"></code></h3>

<p>V HTML existuje přímo typ <a href="/input#type-url">&lt;input>u pro URL</a>. Z praktického pohledu má ale příliš striktní pravidla (co se týče validace). Hodí se ale hlavně zobrazení <a href="/chyby-formularu#type">správné softwarové klávesnice</a> na dotykových zařízeních bez klávesnice hardwarové.</p>




<h2 id="overeni">Ověření existence</h2>

<p>Pokud je prostor si se zadáváním adresy vyhrát, může se zkusit ověřit její existence.</p>

<p>Třeba serverovým skriptem, který na zadanou URL pošle požadavek a na základě HTTP hlavičky rozhodne (např. v PHP k tomu jde použít funkci <code>get_headers</code> nebo CURL).</p>

<p>Tato kontrola by ale <b>neměla být nezbytná</b>, aby nezablokovala pokračování ve formuláři v případě, že má stránka zrovna výpadek. Pokud tedy není URL naprosto klíčová položka.</p>





<h3 id="favicon">Zobrazení favicony</h3>

<p>Relativně snadný způsob, jak zkusit uživateli dát najevo, že doménu zadal správně, je načtení její <a href="/favicon">favicony</a>. Ta se typicky nachází v umístění:</p>

<pre><code>example.com/<b>favicon.ico</b></code></pre>




<p>Takže v momentě, kdy obsah políčka vypadá, že by mohl obsahovat doménu, stačí <code>favicon.ico</code> vložit jako obrázek.</p>

<p><a href="http://kod.djpw.cz/djkb">Živá ukázka</a></p>

<p>Tento způsob není úplně spolehlivý, protože favicona může být i na jiném umístění. Pro positivní potvrzení se to ale může hodit.</p>




















