---
title: "Správce hesel"
headline: "Správce hesel"
description: "Správce hesel je program, který uchovává hesla ke více službám."
date: "2015-11-10"
last_modification: "2015-11-10"
status: 0
tags: []
format: "html"
---

<p>Ukládání hesel je složité téma, různí lidé preferují různé postupy.</p>


<h2 id="spravce-hesel">Správce hesel</h2>

<p>Na zařízeních, kde člověk není přihlášen do svého správce hesel, je velmi obtížné se přihlásit.</p>

<p>To je docela problém na mobilech, kde řada prohlížečů nepodporuje rozšíření, takže není možnost, jak by správce hesel mohl pohodlně hesla vyplňovat.</p>

<p>Taktéž u cizího počítače je komplikované se přihlásit, protože si člověk hesla vygenerované password managerem nepamatuje. Pro přihlášení se k dané službě je tak nutné se nejprve přihlásit do správce hesel.</p>





<h3 id="zapomenuti">Zapomenutí master hesla</h3>

<p>Vzhledem k tomu, že pro pohodlí si člověk nejspíš zapne automatické přihlašování (aby nemusel při každém spuštění prohlížeče zadávat heslo do password managera), může se snadno stát, že heslo zapomene.</p>

<p>Nepoužívání hesla typicky k zapomenutí vede.</p>

<p>Například <b>LastPass</b> účet není možné obnovit pomocí e-mailu.</p>





<h2 id="bezpecnostni-otazka">Bezpečnostní otázka</h2>

<p>Značný bezpečnostní problém představují tzv. <i>bezpečnostní otázky</i>.</p>


<h2 id="nejslabsi-clanek">Bezpečnost určuje nejslabší místo</h2>



<h2 id="treti-strana">Přihlašování přes Facebook</h2>

<p>Problém s pamatováním si hesel jde omezit používáním přihlašování přes služby jako je Facebook. Twitter, Google účet a podobně.</p>

<p>Při přihlašování přes služby třetích stran je nutné mít tyto účty chráněny silným unikátním heslem a vícefaktorovou autentisací, protože jejich získání nepovolanou osobou by jí zajistilo přístup do spousty dalších služeb.</p>

<p>Ve všech aplikacích, které se pro přihlašování běžně používají, je dobré mít vytvořen účet pro <b>zablokování vlastní e-mailové adresy</b>.</p>

<p>Špatně napsaná aplikace totiž může automaticky propojovat účty na základě e-mailu. Útočníkovi potom stačí, aby si cizí e-mail zaregistroval u služby poskytující přihlášení a špatně napsaná aplikace ho na základě e-mailu klidně spáruje.</p>


<h2 id="stejna-hesla">Stejné heslo pro více služeb</h2>

<p>Prakticky v každých bezpečnostních doporučeních se doporučuje <b>nepoužívat stejné heslo</b> pro více služeb.</p>

<p>Problém je totiž v tom, že provozovateli webové služby není rozumné věřit, že správně ukládá hesla. Je tak dobré počítat s tím, že heslo použité ve webové službě může být někým získáno v <b>čitelné podobě</b>.</p>

<h3 id="reseni">Řešení</h3>

<ol>
  <li>
    <p><b>Správce hesel</b> – dokáže náhodně generovat a uložit pro přihlášení heslo pro každou službu zvlášť.</p>
  </li>
  <li>
    <p><b>Smířit se s tím</b> – pro méně podstatné účty (například registrace v nějakém diskusním fóru) nemusí být problém, když k nim někdo heslo získá.</p>
  </li>
  <li>
    <p><b>Upravené heslo</b> – bez správce hesel je celkem kompromis používat klidně stejné základní heslo pro více služeb, které se se upraví podle nějakého daného klíče na základě domény, kam se člověk přihlašuje.</p>
    
    <p><b>Příklad</b>: Výchozí heslo bude <code>fytopuf</code>. Tajné pravidlo bude například takové, že po dvou znacích hesla se vloží první dva znaky z domény a zbytek se přidá na konec. Pro přihlášení se na <code>jecas.cz</code> tak vznikne heslo <code>fyjetopufcas</code>, při přihlášení na <code>twitter.com</code> potom <code>fytwopufitter</code>.</p>
    
    <p>Stačí si tak pamatovat jen jedno heslo a jedno pravidlo a není problém mít na desítkách služeb různá hesla, která dokáže člověk zadat z hlavy.</p>
  </li>
</ol>




<h2 id="e-mail">E-mail</h2>

<p>Typicky nejdůležitější místo je e-mail. U většiny účtů slouží e-mailová schránka pro zaslání odkazu pro <b>obnovení hesla</b>.</p>

<p>Z toho plyne, že heslo do e-mailu by mělo být hodně silné a unikátní.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Michal Altair Valášek: <a href="http://tech.ihned.cz/geekosfera/c1-64840580-kyberneticka-bezpecnost-amateri-vs-profesionalove">Moji hlavu nikdo nehackne. Jak se zabezpečují amatéři a jak profíci?</a></li>
</ul>
