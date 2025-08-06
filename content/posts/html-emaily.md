---
title: "HTML emaily"
headline: "HTML e-maily"
description: "Vytváření HTML e-mailů, které fungují ve všech emailových klientech."
date: "2014-05-20"
last_modification: "2014-05-20"
status: 0
tags: []
format: "html"
---

<p>Při odesílání e-mailů existuí dvě základní možnosti:</p>

<ol>
  <li><p>poslat zprávu v čistém textu,</p></li>
  <li><p>vytvořit HTML stránku e-mailu a tu odeslat</p></li>
</ol>

<p>Oba přístupy mají své výhody i nevýhody.</p>


<h2 id="plaint">Proč psát e-maily v plain textu</h2>


<p>S prostým textem je obecně méně problému. Na druhou stranu existují případy, kdy je potřeba odběratelům poslat poutavější obsah, než je prostý text. Jedná se typicky o obrázky a podobně.</p>


<h2 id="problemy">Možné problémy</h2>

<p>Mezi e-mailovými klienty existují značné rozdíly ve schopnostech, co je možné zobrazit.</p>

<p>Vzhledem k rozdílnému chování různých e-mailových klientů je tvůrce HTML e-mailů tlačen k používání jen těch věcí, co fungují všude.</p>

<p><b>Mobile first</b> –
Podobně jako většinou u webů je vhodné i e-mail vytvářet přístupem mobile first. Dle statistik používání mobilní e-mailové klienti vedou. Kvůli omezené funkčnosti @media pravidel se tak nabízí dokonce přístup „mobile only“, protože není všude možné vytvořit optimální e-mail pro mobil i desktop.</p>

<p>

Media queries s !important, aby přebily inline styly.</p>


<ul>
  <li>:hover efekty,</li>
<li>inline SVG,</li>
<li>posicování (absolutní, fixní i relativní)</li>
<li>background obrázky</li>
<li>CSS gradient</li>
<li>obrázky připojené přes Data URI (Gmail)</li>
<li>nepoužívat margin</li>
<li>padding používat jen u tabulek</li>
</ul>

<div class="external-content">
  <ul>
    <li>Campaign Monitor: <a href="https://www.campaignmonitor.com/css/">The Ultimate Guide to CSS</a> – přehledný nástroj pro zjištění, co v prohlížečích funguje</li>
  </ul>
</div>

<h2 id="inline-css">Inline styly</h2>

<p>Používání CSS je lépe podporované v atributech <code>style</code>. Z externího CSS nebo stylů v hlavičce je tak vhodné vše inlinovat. V PHP existují hotová řešení:</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/tijsverkoyen/CssToInlineStyles">CssToInlineStyles class</a></li>
    
    <li><a href="https://github.com/jjriv/emogrifier">Emogrifier</a></li>
  </ul>
</div>

<p>Případně JS řešení:</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/Automattic/juice">Juice</a> – používá <a href="https://github.com/jrit/web-resource-inliner">web-resource-inliner</a></li>
  </ul>
</div>



<p>Pokud není potřeba inlinování stylů automatisovat, jde použít online nástroje:</p>

<div class="external-content">
  <ul>
    <li>MailChimp: <a href="http://templates.mailchimp.com/resources/inline-css/">CSS Inliner Tool
</a></li>
  </ul>
</div>


<h2 id="hotove">Hotová node.js řešení</h2>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/maxlapides/dovetailer">Dovetailer: HTML Email Generator</a> – předpřipravené řešení, které umí SASS, Markdown a Nunjucks šablony</li>
    
    <li><a href="https://github.com/SLaks/Styliner">Styliner</a></li>
  </ul>
</div>









<h2 id="testovani">Testování HTML e-mailů</h2>

<h3 id="eml">EML formát</h3>

<p>Pro testování v desktopových e-mailových klientech se může hodit uložit e-mail do <code>*.eml</code> souboru. To je téměř obyčejný HTML soubor doplněný o pár hlaviček s informaci o e-mailu:</p>

<pre><code>MIME-Version: 1.0
Date: Sat, 25 May 2019 18:18:46 +0200
From: Odesílatel &lt;email@example.com>
Subject: Přednět e-mailu
Thread-Topic: Přednět e-mailu
To: "Příjemce" &lt;email@example.com>
Content-Transfer-Encoding: quoted-printable
Content-Type: text/html; charset="utf-8"</code></pre>















<p>Tento soubor jde upravovat a otevírat v e-mailových klientech bez nutnosti něco posílat.</p>


<div class="external-content">
  <ul>
    <li><a href="http://premailer.dialect.ca">Premailer</a> – odeslání HTML na e-mail</li>
    
    <li><a href="https://putsmail.com">PutsMail</a> – inlinování CSS a odeslání HTML na vybrané e-mailové adresy</li>
  </ul>
</div>




<h2 id="velikost">Datová velikost</h2>

<div class="external-content">
  <ul>
    <li><a href="https://litmus.com/blog/introducing-image-check-never-send-an-email-with-broken-or-slow-loading-images-again">Introducing Image Check: Never Send an Email with Broken Or Slow-Loading Images Again</a></li>
    
    <li><a href="https://www.emailonacid.com/blog/article/email-development/how_does_email_file_size_affect_deliverability">How does email file size affect deliverability?</a></li>
  </ul>
</div>

<p>Jaká by měla být datová velikost HTML e-mailů a jaké jsou možné problémy při doručování:</p>


<h2 id="mobil">HTML e-maily na mobilech</h2>

<p>Velká část e-mailů bývá otevírána na mobilech.</p>

<p>Velikost do 100 kB.</p>

<p>Počáteční textový obsah e-mailu se zobrazuje jako úryvek – je proto dobré na začátek umístit text s bohatou informační hodnotou.</p>

<div class="external-content">
  <ul>
      <li>Sitepoint.com: <a href="http://www.sitepoint.com/golden-rules-mobile-email-design/">5 Golden Rules For Mobile Email Design</a></li>
  </ul>
</div>


<h3 id="velikost-pisma">Změna velikosti písma</h3>

<p>Na iOS se příliš malé písmo automaticky přizpůsobuje. Vypnout to jde přes:</p>

<pre><code>* { -webkit-text-size-adjust: none; }</code></pre>


<h3 id="telefon">Automatický převod telefonů</h3>

<p>IOS se snaží v textu detekovat telefonní čísla a převádět je do klikací podoby. Vypnout tento převod jde přes:</p>

<pre><code>&lt;meta name="format-detection" content="telephone=no"></code></pre>

<p>Jiná možnost je rozbít telefony nebo URL neutrálními HTML značkami:</p>

<pre><code>&lt;p>http&lt;span>://&lt;/span>mydomain&lt;span>.&lt;/span>com&lt;/p></code></pre>

<h2 id="formulare">Formuláře v e-mailech</h2>

<p>Do HTML e-mailu je teoreticky možné vložit <a href="/formulare">formulář</a>. Podpora je ale nejistá a používat formulář v e-mailu není pro uživatele obvyklé, takže je lepší se formulářům uvnitř mailu vyhnout.</p>

<div class="external-content">
  <ul><li>Sitepoint.com: <a href="http://www.sitepoint.com/forms-in-email/">Forms in e-mail</a></li></ul>
</div>





<h2 id="sablony">Hotové šablony</h2>

<p>Vytvářet HTML šablonu pro nový e-mail není nutné od píky, ale jde využít nějakou hotovou šablonu:</p>

<ul>
  <li><a href="https://litmus.com/community/templates">Litmus šablony</a> – připravené šablony pro různé příležitosti</li>
</ul>


<h2 id="odkazy">Odkazy</h2>
<ul>
  <li><a href="http://alistapart.com/article/the-coming-revolution-in-email-design">The Coming Revolution in Email Design</a> – budoucnost HTML e-mailů</li>
  
  <li><a href="http://blog.hubspot.com/marketing/plain-text-vs-html-emails-data">Plain Text vs. HTML Emails: Which Is Better?</a> – e-maily v plain-textu mají lepší výsledky (počet otevření a prokliků)</li>
  
  <li><a href="http://www.campaignmonitor.com/css/">Podporované CSS vlastnosti v e-mailových klientech</a></li>
  
  <li><b>Testování:</b>
    <ul>
      <li><a href="http://www.emailonacid.com">Email on Acid</a></li>
      <li><a href="http://litmus.com">Litmus</a></li>
    </ul>
  </li>
  
  <li>Sitepoint: <a href="http://www.sitepoint.com/my-current-html-email-development-workflow/">My Current HTML Email Development Workflow</a></li>
  
  <li><a href="https://github.com/mailgun/transactional-email-templates">
Responsive transactional HTML email templates</a></li>
  
  <li><a href="http://alistapart.com/article/can-email-be-responsive">Responsivní e-maily</a></li>
  <li><a href="http://css-tricks.com/ideas-behind-responsive-emails/">Ideas Behind Responsive Emails</a></li>
  
  <li><a href="http://reallygoodemails.com/">Really Good Emails</a> – příklady zajímavých emailů.</li>
  
  <li>Sitepoint.com: <a href="http://www.sitepoint.com/rules-best-practice-email-design-coding-practices/">Rules for Best Practice Email Design: Coding Practices</a></li>
  
  <li>Sitepoint.com: <a href="http://www.sitepoint.com/tricks-building-responsive-email/">A Box of Tricks for Building Responsive Email</a></li>
  

  
  
  
  <li>Osvaldas.info: <a href="http://osvaldas.info/forcing-description-text-in-a-newsletter">Forcing Description Text In a Newsletter</a></li>
  
  <li><a href="http://templates.mailchimp.com/resources/inline-css/">CSS Inliner Tool</a> – převod CSS na inline-styly</li>
  
  <li><a href="https://www.youtube.com/watch?v=mUBOX7-ohqw">Obecná doporučení aneb jak začít (Kódování html e-mailů a newsletterů) - Frontendisti. </a></li>
  
  <li><a href="http://webdesignledger.com/freebies/free-email-templates-to-download">15+ Awesome Free Email Templates to Download</a></li>
  
  <li>Scotch.io: <a href="https://scotch.io/tutorials/building-responsive-email-templates-with-ink">Building Responsive Email Templates with Ink</a> – kompletní průvodce tvorbou HTML e-mailů</li>
  
  <li><a href="http://speckyboy.com/2014/07/10/free-responsive-email-templates/">30 Free Responsive Email and Newsletter Templates</a></li>
  
  <li><a href="https://medium.freecodecamp.com/the-fab-four-technique-to-create-responsive-emails-without-media-queries-baf11fdfa848#.uzizw8cx7">The Fab Four technique to create Responsive Emails without Media Queries</a> – responsivní e-maily bez <code>@media</code> pravidla</li>
  
  <li><a href="https://blog.hubspot.com/marketing/plain-text-vs-html-emails-data">Plain Text vs. HTML Emails: Which Is Better? [New Data]</a></li>
</ul>