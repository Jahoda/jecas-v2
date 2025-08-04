---
title: "Generování PDF"
headline: "Generování PDF"
description: "Vytváření PDF dokumentů v JavaScriptu a PHP."
date: "2013-08-29"
last_modification: "2015-11-14"
status: 1
tags: ["JavaScript", "Hotová řešení", "PHP"]
---

V některých případech se může hodit obsah webové stránky **exportovat do PDF**. Jde to zajistit na:

  - **straně klienta** (v prohlížeči pomocí JavaScriptu),

  - **serveru** (například v [PHP](/php))

## Je převod do PDF potřeba?

Dost často je ale PDF používané **poměrně zbytečně**, takže je dobré se nejprve zamyslet, jestli export do PDF vůbec dává smysl.

V případě, že je cílem připravit dokument pro [tisk stránky](/tisk), jde k tomu použít přímo HTML, případně ho lehce upravit pomocí CSS.

Pro například **odesílání faktur e-mailem** jde zase použít odkaz vedoucí na webovou stránku, kde se vše potřebné zobrazí. Většina lidí stejně ke své práci potřebuje připojení k internetu, takže možnost offline zobrazení nemusí být zase tak významná.

K uložení obsahu pro **offline čtení** nakonec může posloužit i HTML soubor.

## Vytvoření PDF v JavaScriptu

Převést HTML stránku do PDF v JavaScriptu umí nástroj jsPDF (vyžaduje **jQuery**):

    - [jsPDF](http://parall.ax/products/jspdf) – hotový nástroj pro generování PDF v JS ([GitHub](https://github.com/MrRio/jsPDF))

Ten umožňuje i export celého HTML elementu/stránky, bohužel to ale nefunguje s **českou diakritikou**.

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
  
  Vygenerovat PDF z této stránky

## Generování PDF v PHP

V PHP existuje řada hotových nástrojů:

  - [mPDF](http://www.mpdf1.com/mpdf/)

  - [dompdf](https://github.com/dompdf/dompdf) ([web](http://dompdf.github.io/))

  - [HTML2PDF and HTML2PS](http://www.tufat.com/s_html2ps_html2pdf.htm)

  - [html2pdf](http://html2pdf.fr/en/example)

  - [TCPDF](http://www.tcpdf.org/)

Často je problém se zobrazování **české diakritiky**, za které může buď **písmo**, co češtinu neumí, nebo konkrétní nástroj. Zprovoznit češtinu se mi nakonec podařilo s nástrojem [mPDF](http://www.mpdf1.com/mpdf/).

    - [Tato stránka v PDF](/files/generovani-pdf/generovani-pdf.pdf)

Použití mPDF je poměrně jednoduché, stačí předat HTML kód, který se má převést do PDF:

```
include("../mpdf.php");
$mpdf=new mPDF(); 
$mpdf->WriteHTML(**$html**);
$mpdf->Output();
```

## Odkazy jinam

  - Sitepoint: [Custom PDF Rendering in JavaScript with Mozilla’s PDF.Js](https://www.sitepoint.com/custom-pdf-rendering/)

  - [PDF Unlock!](http://www.pdfunlock.com/) – odstranění hesel a odemčení chráněných PDF souborů