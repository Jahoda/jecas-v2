---
title: "Jak probíhá expirace .com domény"
headline: "Expirace <code>.com</code> domény"
description: "Jak dlouho trvá expirace domény s koncovkou .com. Čím se liší od .cz domény."
date: "2017-05-26"
last_modification: "2017-06-11"
status: 1
tags: ["domeny"]
format: "html"
---

<div class="internal-content">
  <ul>
    <li><a href="/expirace-domeny">Expirace CZ domény</a> – jak je to s expirací české domény</li>
  </ul>
</div>

<p>Doba průběhu jednotlivých úseků expirace domény závisí na konkrétním registrátorovi a nelze ji universálně stanovit.</p>

<p>Po expiraci doména zpravidla plnohodnotně funguje ještě cca <b>30 dní</b>, kdy je možné ji bez problému prodloužit (doba závisí na registrátorovi).</p>



<p>Po uplynutí této doby se doména dostane do stavu <code>redemptionPeriod</code>. V tomto období doména patří stále původnímu vlastníkovi, který ji může prodloužit.</p>

<p>Prodloužení už ale <b>není zdarma</b> – cena za obnovení se pohybuje v <b>řádech tisíců Kč</b> (cca 200 dolarů). Tato doba trvá <b>30 dní</b>.</p>


<p>Pokud v této době stále nedojde k prodloužení, nastává stav <code>pendingDelete</code> – ten trvá 5 dní (původní majitel již doménu nemůže prodloužit). Po uplynutí může být doména opět volná k registraci.</p>




<h2 id="uvolneni">Uvolnění domény</h2>


<p>Bohužel na uvolnění domény nejde spoléhat. Zvlášť v případě COM domén existuje hodně subjektů, které se snaží uvolněné domény odchytávat.</p>

<p>Zaniklá doména může mít nějakou návštěvnost, zpětné odkazy nebo hezký název, takže má i nějakou hodnotu – občas převyšující registrační poplatek.</p>

<p>Toto odchytávání probíhá pomocí skriptů automaticky, takže šance na získání domény ručně je prakticky nulová.</p>

<p>Spoléhat se na získání domény po uvolnění <b>jen za registrační poplatek</b> v řádu stokorun tak není úplně rozumné.</p>

<p>Získání domény potom může být ještě dražší než v <code>redemptionPeriod</code>.</p>






<h2 id="prubeh">Průběh expirace</h2>

<p>Přibližné časové údaje zachycuje následující tabulka:</p>

<table>
  <tr>
    <th>Stav</th>
    <th>Den</th>
    <th>Prodloužení</th>
  </tr>
  <tr>
    <td><code>Expiration Date</code></td><td>0.–30.</td><td>možné</td>
  </tr>
  <tr>
    <td><code>redemptionPeriod</code></td><td>30.–60.</td><td>možné s poplatkem</td>
  </tr>  
  <tr>
    <td><code>pendingDelete</code></td><td>60.–65.</td><td>nelze</td>
  </tr>
  <tr>
    <td>volná k registraci</td><td>66.</td><td>nová registrace (teoreticky)</td>
  </tr>      
</table>

<p>Prodlužovat COM domény je tak lepší spíš dříve než později (nejpozději ještě v <i>Expiration Date</i>).</p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>ICANN: <a href="https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en">EPP Status Codes | What Do They Mean, and Why Should I Know?</a> – popis stavů COM domén</li>
</ul>