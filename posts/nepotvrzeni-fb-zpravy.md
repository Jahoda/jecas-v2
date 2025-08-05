---
title: "(Ne)potvrzení přečtení zprávy na Facebooku"
headline: "Nepotvrzení přečtení zprávy na Facebooku"
description: "Jak zabránit, aby se příchozí zpráva na Facebooku označila jako přečtená."
date: "2015-08-22"
last_modification: "2015-09-08"
status: 1
tags: ["facebook", "napady"]
format: "html"
---

<p>Facebook se u zpráv snaží znázorňovat, kdy si uživatel danou <b>zprávu přečetl</b>. Typicky hláškou <i>Zobrazeno</i>.</p>


<p><img src="/files/nepotvrzeni-fb-zpravy/zobrazeno.png" alt="Potvrzení zobrazení zprávy na Facebooku" class="border"></p>















<p>Ve skupinových konversacích jsou potom lidé, kteří zprávu viděli, jednotlivě vyjmenováni.</p>




<h2 id="kdy">Kdy se zpráva označí jako přečtená</h2>

<p>Na Facebooku se správa jako přečtená označí, když:</p>

<ul>
  <li>
    <p><b>Otevřu okno chatu</b> s člověkem, co mi zaslal zprávu.</p>
  </li>
  
  <li>
    <p>Mám otevřeno okno chatu, <b>kursor je v poli pro psaní zprávy</b>, a daný kontakt mi napíše.</p>
    
    <p>Pokud je okno chatu otevřené, ale kursor v něm není, zprávy se člověku automaticky nepotvrzují. Jde to poznat tak, že okno horní pruh okna bliká.</p>
    
    <p><img src="/files/nepotvrzeni-fb-zpravy/blikani.gif" alt="Blikání nové zprávy" class="border"></p>

    
    
    
    
    
    
    


  </li>
  
  <li>
    <p>V horní nabídce u zprávy zvolím <b>označit jako přečtené</b>:</p>
  
  <p><img src="/files/nepotvrzeni-fb-zpravy/prectene.png" alt="Označení jako přečtené" class="border"></p>


  </li>

</ul>




<h2 id="precteni">Přečtení zprávy, aniž by to bylo vidět</h2>

<p>Jak tedy zprávu přečíst, aniž by se jejímu autorovi <b>zobrazilo potvrzení</b>?</p>

<p>Text zprávy se typicky zobrazuje v notifikaci při používání <b>mobilní aplikace</b>. Totéž platí u výpisu, který se zobrazí po kliknutí na ikonu zpráv v horní liště:</p>

  <p><img src="/files/nepotvrzeni-fb-zpravy/kliknuti.png" alt="Upozornění na nepřečtenou zprávu" class="border"></p>







<p>Samotné kliknutí na ikonku zpráv zmíněné potvrzení „<i>Zobrazeno</i>“ druhé straně nepošle – zprávy budou stále označeny jako nepřečtené.</p>

<p>V této části (podobně jako u notifikací) se ale zobrazuje jen <b>úryvek zprávy</b>.</p>

  <p><img src="/files/nepotvrzeni-fb-zpravy/uryvek.png" alt="Zobrazení zprávy bez potvrzení" class="border"></p>










<h3 id="neprectene">Označit jako nepřečtené</h3>

<p>Zprávu je možné po přečtení zpátky <b>označit jako nepřečtenou</b>:</p>

  <p><img src="/files/nepotvrzeni-fb-zpravy/neprectene.png" alt="Označení jako nepřečtené" class="border"></p>







<p>Skutečně to funguje a autorovi zprávy se neukáže, že byla zpráva <i>zobrazena</i>. Problém je, že se mu to už mohlo na chvíli ukázat ihned po otevření zprávy, pokud okno chatu sledoval.</p>




<h3 id="otevrene-okno">Otevřené okno chatu</h3>

<p>Způsob, jak si číst celé zprávy bez odesílání potvrzení, je mít <b>okno s chatem otevřené</b>, ale nemít v něm kursor. Potom je možné normálně Facebook používat, ale nesmí se do okna kliknout.</p>


<h3 id="rozsireni">Rozšíření do prohlížeče</h3>

<p>Zabránit zasílání informace o přečtení zprávy jde pomocí rozšíření do prohlížeče. Následující rozšíření blokuje zasílání zprávy o přečtení v prohlížeči <b>Chrome</b>:</p>

<div class="external-content">
  <ul>
    <li><a href="https://chrome.google.com/webstore/detail/facebook-unseen/iicapmagmhahddefgokbabbgieiogjop">Facebook Unseen</a></li>
  </ul>
</div>



<h3 id="blokovani">Blokování zasílání potvrzení přečtení</h3>

<p>Potvrzení přečtení zprávy funguje tak, že se po kliknutí do okna chatu a podobně pošle potvrzovací požadavek na URL:</p>

<pre><code>https://www.facebook.com/ajax/mercury/change_read_status.php</code></pre>

<p>Pokud se nějakým způsobem zablokuje, rovněž se potvrzení nebudou posílat.</p>