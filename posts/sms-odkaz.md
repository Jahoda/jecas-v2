---
title: "Odkaz pro poslání SMS"
headline: "Odkaz pro předvyplnění SMS"
description: "Jak dát na stránku odkaz, který na mobilech předvyplní číslo a text SMS."
date: "2016-04-01"
last_modification: "2016-04-05"
status: 1
tags: ["hotova-reseni", "odkazy", "responsive"]
format: "html"
---

<p>Návštěvníkům přistupujícím na web z mobilu je možné usnadnit používání některých funkcí jejich telefonu. Třeba po kliknutí na odkaz spustit telefonní aplikaci s předvyplněným číslem:</p>







<pre><code>&lt;a href="tel:123456789">
  Zavolejte nám
&lt;a></code></pre>


<div class="live no-source">
  <a href="tel:123456789" class="button">
    Zavolejte nám
  </a>
</div>


<p>Kromě telefonního čísla jde připravit i <b>textovou zprávu</b> (SMS). Podpora je ale nižší.</p>

<p>Možností vytočit telefonní číslo prostřednictvím HTML odkazu popisuje podrobně následující článek:</p>

<div class="external-content">
  <ul><li>Vzhůru dolů: <a href="http://www.vzhurudolu.cz/blog/57-href-tel">Kompletní průvodce odkazy na telefonní čísla</a></li></ul>
</div>


<h2 id="odkaz">Odkaz pro SMS</h2>


<p>Samotné spuštění aplikace pro SMS a předvyplnění telefonního čísla funguje relativně slušně napříč prohlížeči. Problém je ale s předvyplněním textu zprávy, kde se situace značně liší.</p>



<h3 id="ios8">iOS</h3>


<p>U mobilních operačních systémů od Apple iOS 8 a 9 funguje zápis textu zprávy pomocí <code>&amp;body=</code> za telefonním číslem:</p>

<pre><code>&lt;a href="sms:+420123456789<b>&amp;amp;</b>body=Text zprávy">
  Poslat SMS
&lt;/a></code></pre>





<div class="live no-source">
  <a href="sms:+420123456789&amp;body=Text zprávy" class="button">
    Poslat SMS „text zprávy“ na 123456789
  </a>
</div>


<p>V iOS 7 není podle všeho možné text zprávy předvyplnit.</p>

<p>V iOS 5 a 6 by měl fungovat středník:</p>

<pre><code>&lt;a href="sms:+420123456789<b>;</b>body=Text zprávy">
  Poslat SMS
&lt;/a></code></pre>



<div class="live no-source">
  <a href="sms:+420123456789;body=Text zprávy" class="button">
    Poslat SMS „text zprávy“ na 123456789
  </a>
</div>




<h3 id="android">Android</h3>

<p>U <b>Androidu</b> funguje pro změnu zápis s otazníkem:</p>



<pre><code>&lt;a href="sms:+420123456789<b>?</b>body=Text zprávy">
  Poslat SMS
&lt;/a></code></pre>




<div class="live no-source">
  <a href="sms:+420123456789?body=Text zprávy" class="button">
    Poslat SMS „text zprávy“ na 123456789
  </a>
</div>



<p>V případě úspěchu by se mělo číslo i text zprávy řádně vyplnit:</p>

<p><img src="/files/sms-odkaz/predvyplneni.png" alt="Předvyplnění zprávy" class="border"></p>































<h3 id="windows">Mobilní Windows 10</h3>

<p>V mobilním <b>Windows 10</b> zřejmě nejde vůbec použít <code>sms:</code>. Tento pseudo-protokol systém nezná a po kliknutí na daný odkaz akorát nabídne hledání příslušné aplikace v obchodu.</p>




<h2 id="reseni">Řešení</h2>



<p>Vzhledem k odlišnému zápisu textu zprávy napříč operačními systémy je nejspíš nutné použít detekci zařízení a různým systémům naservírovat jiný obsah.</p>

<p>Zápis textu zprávy za otazníkem/ampersandem není kompatibilní – v systémech, které druhý způsob neznají, dojde k zadání neplatného kontaktu.</p>

<p>Pokus s <code>&amp;</code> skončí na <b>Androidu</b> takto:</p>

<p><img src="/files/sms-odkaz/android.png" alt="Neplatný příjemce u Androidu" class="border"></p>


















<p>U <b>iOS</b> zase zápis s otazníkem:</p>


<p><img src="/files/sms-odkaz/ios.png" alt="Neplatný příjemce v iOS" class="border"></p>










<h3 id="jen-cislo">Jen telefon</h3>

<p>Dobře podporovaná možnost je vyplnit pouze číslo bez textu zprávy. To funguje prakticky všude mimo mobilní <b>Windows</b>.</p>

<pre><code>&lt;a href="sms:+420123456789">
  Poslat SMS
&lt;/a></code></pre>




<div class="live no-source">
  <a href="sms:+420123456789" class="button">
    Poslat SMS na 123456789
  </a>
</div>





<h3 id="risiko">Risiko nefunkčnosti</h3>

<p>K úvaze je, jestli případná nefunkčnost byť u malého počtu návštěvníků mimo <b>iOS</b> a <b>Android</b> není dost dramatická.</p>

<p>Třeba v mobilních <b>Windows</b> se po kliknutí na odkaz zobrazí následující hláška, která může návštěvníka nenávratně odvést ze stránky pryč.</p>


<p><img src="/files/sms-odkaz/windows.png" alt="Odkaz na SMS ve Windows Mobile" class="border"></p>


















<p>Stejně tak u desktopových/tabletových prohlížečů nebude v drtivé většině případů odkaz na SMS fungovat – příklad z desktopového <b>Firefoxu</b>:</p>



<p><img src="/files/sms-odkaz/firefox.png" alt="Odkaz na SMS ve Firefoxu" class="border"></p>

















<p>Bezpečnější tak nejspíš bude odkaz pro předvyplnění SMS přidávat na stránku až na základě detekce pro konkrétní zařízení.</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="http://kod.djpw.cz/kxvb">Samostatná živá ukázka</a> – test různých způsobů</li>
</ul>