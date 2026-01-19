---
title: "USB-C kabel kompatibilita"
headline: "Proč některé USB-C kabely nefungují se všemi zařízeními"
description: "USB-C je universální konektor, ale ne všechny kabely jsou stejné. Vysvětlení rozdílů mezi USB-C kabely a proč některé nepodporují nabíjení nebo přenos dat."
date: "2026-01-19"
status: 1
tags: ["produktivita"]
format: "html"
---

<p>USB-C mělo být <b>universální řešení</b> – jeden konektor pro nabíjení, data i video. Realita je složitější. Kabel, který nabíjí telefon, nemusí nabít notebook. Kabel od nabíječky nemusí přenášet data. A kabel, který fungoval včera, dnes nefunguje s novým zařízením.</p>

<h2 id="usb-c-neni-standard">USB-C není standard, je to jen tvar</h2>

<p><b>USB-C</b> (oficiálně USB Type-C) označuje pouze <b>fyzický tvar konektoru</b> – ten malý oválný konektor, který jde zasunout oběma směry. Neříká nic o tom, co kabel umí.</p>

<p>Pod stejným konektorem se skrývají <b>úplně rozdílné technologie</b>:</p>

<ul>
<li><b>USB 2.0</b> – přenos dat 480 Mb/s</li>
<li><b>USB 3.0 / 3.1 / 3.2</b> – přenos dat 5–20 Gb/s</li>
<li><b>USB4</b> – přenos dat až 40 Gb/s</li>
<li><b>Thunderbolt 3/4</b> – přenos dat 40 Gb/s + video + PCIe</li>
<li><b>USB Power Delivery</b> – nabíjení až 240 W</li>
<li><b>DisplayPort Alt Mode</b> – přenos videa</li>
</ul>

<p>Kabel s USB-C konektorem může podporovat <b>všechny tyto technologie</b>, jen některé, nebo <b>pouze nabíjení</b>.</p>

<h2 id="typy-kabelu">Typy USB-C kabelů</h2>

<h3 id="nabijeci-kabel">Pouze nabíjecí kabel</h3>

<p>Nejlevnější varianta. Obsahuje <b>pouze napájecí vodiče</b> (VBUS a GND). Telefon nabije, ale data nepřenese. Často přibalený k powerbankám nebo levným nabíječkám.</p>

<p><b>Pozná se tak</b>, že po připojení k počítači se zařízení nenajde.</p>

<h3 id="usb-20-kabel">USB 2.0 kabel</h3>

<p>Obsahuje napájecí vodiče + <b>jeden pár datových vodičů</b> (D+ a D−). Nabíjí a přenáší data rychlostí <b>480 Mb/s</b>. Stačí pro telefony, klávesnice, myši.</p>

<p>Většina tenkých, ohebných kabelů je USB 2.0.</p>

<h3 id="usb-3x-kabel">USB 3.x kabel</h3>

<p>Kromě USB 2.0 vodičů obsahuje <b>další dva páry</b> pro vysokorychlostní přenos (SuperSpeed). Pozná se podle <b>tloušťky</b> – musí být silnější, aby pojal více vodičů.</p>

<table>
<thead>
<tr>
<th>Standard</th>
<th>Rychlost</th>
<th>Označení na kabelu</th>
</tr>
</thead>
<tbody>
<tr>
<td>USB 3.0 / 3.1 Gen 1 / 3.2 Gen 1</td>
<td>5 Gb/s</td>
<td>SS (SuperSpeed)</td>
</tr>
<tr>
<td>USB 3.1 Gen 2 / 3.2 Gen 2</td>
<td>10 Gb/s</td>
<td>SS 10</td>
</tr>
<tr>
<td>USB 3.2 Gen 2x2</td>
<td>20 Gb/s</td>
<td>SS 20</td>
</tr>
</tbody>
</table>

<p>Ano, pojmenování je <b>zmatek</b>. USB-IF (organisace spravující USB) ho několikrát přejmenovávala.</p>

<h3 id="thunderbolt-kabel">Thunderbolt 3/4 kabel</h3>

<p>Nejvybavenější varianta. Podporuje <b>40 Gb/s</b>, přenos videa, připojení externích GPU a dalších PCIe zařízení. Obsahuje aktivní elektroniku a je <b>nejdražší</b>.</p>

<p>Pozná se podle <b>ikony blesku</b> na konektoru.</p>

<h2 id="problem-s-nabijenim">Proč kabel nenabíjí notebook</h2>

<p>Zde je jádro problému. USB-C podporuje několik úrovní napájení:</p>

<table>
<thead>
<tr>
<th>Režim</th>
<th>Napětí</th>
<th>Proud</th>
<th>Výkon</th>
</tr>
</thead>
<tbody>
<tr>
<td>Základní USB</td>
<td>5 V</td>
<td>0,5–0,9 A</td>
<td>2,5–4,5 W</td>
</tr>
<tr>
<td>USB Type-C 1.5A</td>
<td>5 V</td>
<td>1,5 A</td>
<td>7,5 W</td>
</tr>
<tr>
<td>USB Type-C 3A</td>
<td>5 V</td>
<td>3 A</td>
<td>15 W</td>
</tr>
<tr>
<td>USB PD (Power Delivery)</td>
<td>5–48 V</td>
<td>až 5 A</td>
<td>až 240 W</td>
</tr>
</tbody>
</table>

<h3 id="e-marker">E-Marker čip</h3>

<p>Pro přenos <b>více než 60 W</b> (3 A při 20 V) musí mít kabel vestavěný <b>e-marker čip</b>. Tento čip komunikuje s nabíječkou a zařízením a potvrzuje, že kabel zvládne vyšší proud.</p>

<p><b>Bez e-markeru</b> nabíječka i zařízení odmítnou vyšší výkon použít – z bezpečnostních důvodů. Proto notebook s 65W nebo 100W nabíječkou a obyčejným kabelem říká „připojeno, nenabíjí se" nebo nabíjí velmi pomalu.</p>

<h3 id="ppe-vs-pps">USB PD verse</h3>

<p>Starší USB PD 2.0 podporovalo <b>5/9/15/20 V</b> v pevných krocích až do 100 W. Novější USB PD 3.0 s PPS (Programmable Power Supply) umožňuje <b>plynulé nastavení napětí</b> – důležité pro rychlé nabíjení telefonů.</p>

<p>USB PD 3.1 (EPR – Extended Power Range) zvýšilo maximum na <b>240 W</b> s napětím až 48 V. Pro tyto výkony je potřeba kabel s odpovídajícím e-markerem.</p>

<h2 id="jak-poznat-kabel">Jak poznat, co kabel umí</h2>

<h3>Visuální znaky</h3>

<ul>
<li><b>Tenký, ohebný</b> – pravděpodobně USB 2.0, max 3 A</li>
<li><b>Silnější, tužší</b> – pravděpodobně USB 3.x</li>
<li><b>Ikona blesku</b> – Thunderbolt</li>
<li><b>Označení „5A" nebo „100W"</b> – obsahuje e-marker</li>
<li><b>Označení „SS"</b> – SuperSpeed (USB 3.x)</li>
</ul>

<h3>USB-IF certifikace</h3>

<p>Spolehlivé kabely mají <b>certifikační logo USB-IF</b>. Nové standardisované ikony:</p>

<ul>
<li><b>Číslo v logu</b> – rychlost v Gb/s (5, 10, 20, 40)</li>
<li><b>Číslo s W</b> – podporovaný výkon (60W, 240W)</li>
</ul>

<h2 id="realita">Realita: v šuplíku máš chaos</h2>

<p>Teorie je hezká, ale praxe vypadá jinak. Otevřeš šuplík a vidíš <b>deset USB-C kabelů</b>. Většina nemá žádné označení. Některé jsou od zařízení, některé koupené, některé „odněkud". Nevíš, který je USB 2.0, který 3.0, který má e-marker.</p>

<p>A právě to je <b>hlavní problém USB-C</b> – konektor je universální, ale ekosystém je chaos.</p>

<h3>Co potřebuješ vědět o kabelu</h3>
<ul>
<li>Podporuje 60W nebo 100W nabíjení?</li>
<li>Je to USB 2.0 nebo 3.x?</li>
<li>Podporuje přenos videa?</li>
<li>Má všechny vodiče, nebo jen některé?</li>
</ul>

<h3>Co ti kabel řekne</h3>
<p>Většinou <b>nic</b>. Žádné označení, žádné logo, jen černý kabel s USB-C na obou koncích.</p>

<h3>Praktické řešení</h3>

<p><b>1. Pořiď si jeden „universální" kabel</b></p>
<p>Kup Thunderbolt 4 nebo USB4 kabel od známého výrobce (Anker, Belkin, Apple, CalDigit). Stojí 500–800 Kč, ale <b>umí všechno</b> – 100W nabíjení, 40 Gb/s data, video. Když něco nefunguje, vytáhneš tenhle a víš, že problém není v kabelu.</p>

<p><b>2. Originální kabely nech u zařízení</b></p>
<p>Kabel od notebooku nech u notebooku, kabel od telefonu u telefonu. Výrobci přibalují kabely, které odpovídají zařízení.</p>

<p><b>3. Zbytek označ nebo vyhoď</b></p>
<p>Neoznačené kabely z čínského e-shopu jsou loterie. Buď je otestuj a označ štítkem (např. „USB 2.0", „100W"), nebo je vyhoď. Jeden kvalitní kabel je lepší než pět nespolehlivých.</p>

<h2 id="konkretni-problemy">Konkrétní problémy a řešení</h2>

<h3>Notebook se nenabíjí</h3>
<p><b>Příčina</b>: Kabel nemá e-marker nebo nepodporuje USB PD.<br>
<b>Řešení</b>: Použít kabel označený pro 60W/100W nebo originální kabel od notebooku.</p>

<h3>Externí disk je pomalý nebo nefunguje</h3>
<p><b>Příčina</b>: Kabel je USB 2.0, disk potřebuje USB 3.x.<br>
<b>Řešení</b>: Použít silnější kabel s označením SS/SuperSpeed.</p>

<h3>Monitor přes USB-C nefunguje</h3>
<p><b>Příčina</b>: Kabel nepodporuje DisplayPort Alt Mode nebo nemá všechny vodiče.<br>
<b>Řešení</b>: Použít kabel s podporou videa (full-featured USB-C nebo Thunderbolt).</p>

<h3>Dokovací stanice funguje jen částečně</h3>
<p><b>Příčina</b>: Kabel nepodporuje všechny funkce (data + video + napájení současně).<br>
<b>Řešení</b>: Použít „full-featured" USB-C kabel nebo Thunderbolt kabel.</p>

<h2 id="budoucnost">Zlepší se to?</h2>

<p>USB-IF se snaží situaci zlepšit <b>novými povinnými logy</b>, které jasně ukazují rychlost a výkon. Od roku 2022 musí certifikované kabely nést srozumitelné označení.</p>

<p>Evropská unie navíc od 2024 vyžaduje <b>USB-C jako povinný konektor</b> pro mobilní zařízení, což tlačí na sjednocení. Bohužel to neřeší různorodost schopností kabelů – jen zaručuje, že konektor bude stejný.</p>

<p>Do té doby platí: <b>USB-C je universální konektor, ale ne universální kabel</b>.</p>
