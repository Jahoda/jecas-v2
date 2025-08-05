---
title: "Generování PDF"
headline: "Generování PDF"
description: "Vytváření PDF dokumentů v JavaScriptu a PHP."
date: "2013-08-29"
last_modification: "2015-11-14"
status: 1
tags: ["hotova-reseni", "js", "php"]
format: "html"
---

<div id="redner_me">
<p>V některých případech se může hodit obsah webové stránky <b>exportovat do PDF</b>. Jde to zajistit na:</p>

<ul>
  <li><b>straně klienta</b> (v prohlížeči pomocí JavaScriptu),</li>
  <li><b>serveru</b> (například v <a href="/php">PHP</a>)</li>
</ul>
</div>  


<h2 id="potreba">Je převod do PDF potřeba?</h2>

<p>Dost často je ale PDF používané <b>poměrně zbytečně</b>, takže je dobré se nejprve zamyslet, jestli export do PDF vůbec dává smysl.</p>

<p>V případě, že je cílem připravit dokument pro <a href="/tisk">tisk stránky</a>, jde k tomu použít přímo HTML, případně ho lehce upravit pomocí CSS.</p>

<p>Pro například <b>odesílání faktur e-mailem</b> jde zase použít odkaz vedoucí na webovou stránku, kde se vše potřebné zobrazí. Většina lidí stejně ke své práci potřebuje připojení k internetu, takže možnost offline zobrazení nemusí být zase tak významná.</p>

<p>K uložení obsahu pro <b>offline čtení</b> nakonec může posloužit i HTML soubor.</p>




<h2 id="js">Vytvoření PDF v JavaScriptu</h2>

<p>Převést HTML stránku do PDF v JavaScriptu umí nástroj jsPDF (vyžaduje <b>jQuery</b>):</p>

<div class="external-content">
  <ul>
    <li><a href="http://parall.ax/products/jspdf">jsPDF</a> – hotový nástroj pro generování PDF v JS (<a href="https://github.com/MrRio/jsPDF">GitHub</a>)</li>
  </ul>
</div>

<p>Ten umožňuje i export celého HTML elementu/stránky, bohužel to ale nefunguje s <b>českou diakritikou</b>.</p>

<p><img src="/files/generovani-pdf/jspdf.png" alt="" class="border"></p>
  
  

<div class="live" id="editor">
  <script src="/files/generovani-pdf/jquery-2.1.4.min.js"></script>
  <script src="/files/generovani-pdf/jspdf.min2.js"></script>
  <script>
    function generatePdf() {      
      var doc = new jsPDF();
      // We'll make our own renderer to skip this editor
      var specialElementHandlers = {
          '#editor': function(element, renderer){
              return true;
          }
      };      
      doc.fromHTML($('#redner_me').get(0), 15, 15, {
          'width': 170, 
          'elementHandlers': specialElementHandlers
      });
      doc.save('Generovani.pdf');
    }    
  </script>
  <p><button onclick="generatePdf()">Vygenerovat PDF z této stránky</button></p>
</div>
  


<h2 id="php">Generování PDF v PHP</h2>

<p>V PHP existuje řada hotových nástrojů:</p>

<div class="external-content"><ul>
  
  <li><a href="http://www.mpdf1.com/mpdf/">mPDF</a></li>
  
  <li><a href="https://github.com/dompdf/dompdf">dompdf</a> (<a href="http://dompdf.github.io/">web</a>)</li>
  
  <li><a href="http://www.tufat.com/s_html2ps_html2pdf.htm">HTML2PDF and HTML2PS</a></li>
  
  <li><a href="http://html2pdf.fr/en/example">html2pdf</a></li>
  
  <li><a href="http://www.tcpdf.org/">TCPDF</a></li>
  
</ul></div>

<p>Často je problém se zobrazování <b>české diakritiky</b>, za které může buď <b>písmo</b>, co češtinu neumí, nebo konkrétní nástroj. Zprovoznit češtinu se mi nakonec podařilo s nástrojem <a href="http://www.mpdf1.com/mpdf/">mPDF</a>.</p>

<div class="internal-content">
  <ul>
    <li><a href="/files/generovani-pdf/generovani-pdf.pdf">Tato stránka v PDF</a></li>
  </ul>
</div>


<p>Použití mPDF je poměrně jednoduché, stačí předat HTML kód, který se má převést do PDF:</p>

<pre><code>include("../mpdf.php");
$mpdf=new mPDF(); 
$mpdf->WriteHTML(<b>$html</b>);
$mpdf->Output();</code></pre>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>Sitepoint: <a href="https://www.sitepoint.com/custom-pdf-rendering/">Custom PDF Rendering in JavaScript with Mozilla’s PDF.Js</a></li>
  <li><a href="http://www.pdfunlock.com/">PDF Unlock!</a> – odstranění hesel a odemčení chráněných PDF souborů</li>
</ul>