---
title: "Zpřehlednění stromových diskusí"
headline: "Řešení nepřehledných stromových diskusí"
description: "Je-li na webu stromová diskuse s hodně příspěvky, může být pro diskutující obtížné udržet přehled, co četli a co ne."
date: "2013-05-26"
last_modification: "2013-06-18"
status: 1
tags: ["hotova-reseni", "napady"]
format: "html"
---

<!--<p class='right'><img class='border' src='/files/nahled-diskuse/nahled.png'>-->
<p>První možnost řešení je si při načtení uložit (ať už k uživatelskému účtu nebo do cookie) čas a při načtení příštím příspěvky s časem novějším visuálně odlišit. Plus ještě uživatele informovat, kolik příspěvků je nových.
<p>To je sice lepší než nic, ale rolovat stovkami příspěvků a hledat ty označené jako nové pořád není nic moc. 

<h2 id=nahled>Náhled</h2>
<p>Osvědčilo se mi vedle běžné dlouhé diskuse vygenerovat ještě jednu tu samou <i>diskusi</i>, kde jednotlivé příspěvky representují vodorovné čáry se znázorněním zanoření (pomocí odsazení), na kterých je rovněž provedeno standardní obarvení nových příspěvků.
<p>Pokud si potom člověk chce projít nové příspěvky, relativně pohodlně si je prokliká z tohoto náhledu.

<p>Náhled může nabízet ještě vylepšení:
<ol>
<li>umožnit přecházení mezi novými příspěvky klávesami (např. <kbd>←</kbd> a <kbd>→</kbd>),
<li>znázorňovat, které komentáře jsou zrovna ve <a href='/zvyrazneni-odrolovani'>viditelné části obrazovky</a>,
<li>při najetí na čáru representující komentář jej zobrazit
</ol>

<p>Kromě automatického zvýraznění dle času posledního načtení, je vhodné přidat i kalendář, kde lze datum a čas ručně zadat. <ul><li>V <b>Opeře</b> k tomu stačí jeden <code>&lt;input type=datetime></code>, 
<li>ve <b>Firefoxu a Chromu</b> jeden <code>&lt;input type=date></code> a jeden <code>&lt;input type=time></code>,
<li>v <b>Explorerech</b> (včetně verse 10) jedině nějaký <a href='https://www.google.cz/search?q=js+date+picker'>JS kalendář</a>.
</ul>

<!--<p class=live><input type=datetime>-->

<h2 id=ukazka>Ukázka v diskusích na <a href='http://www.dfens-cz.com/'>D-FENS</a></h2>
<p>K výše uvedenému jsem dospěl ve snaze zpřehlednit si diskuse na výše uvedeném webu. Takhle to vypadá:</p>

<a href="https://www.youtube.com/watch?v=m_t4_6eHFdk" class="yt">Vylepšení stromových diskusí</a>

<p>Jelikož byl skript vytvářen jako uživatelský JS pro <a href='/opera'>Operu</a>, nefunguje nejspíš úplně ideálně napříč prohlížeči. Živá ukázka v HTML je tedy <i>na vlastní nebezpečí</i>.
<p><a href='https://kod.djpw.cz/uuhb-' rel=nofollow class=button>Ukázka</a> <a href="http://jecas.cz/files/df/df.js" class="button">Samotný user JS</a> <a href="http://jecas.cz/files/df/df-opera.js" class="button">User JS pro Operu</a>