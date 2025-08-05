---
title: "Převod milisekund"
headline: "Převod milisekund"
description: "Převodník milisekund."
date: "2014-01-02"
last_modification: "2015-07-13"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Převodník mezi <b>milisekundami</b> a minutami, hodinami, dny, týdny, roky.</p>

<p>Jedna vteřina = <b>1000 milisekund</b>.</p>

<div class="live">
  <p>
    <label>Převést <input id="kolik" value="1000"></label>
    <select id="z">
      <option value="1" selected>milisekund</option>
      <option value="1000" >vteřin</option>
      <option value="60000">minut</option>
      <option value="216000000">hodin</option>
      <option value="5184000000">dní</option>
      <option value="1893488986060">let</option>
    </select>
    na
    <select id="na">
      <option value="1" >milisekundy</option>
      <option value="1000" selected>vteřiny</option>
      <option value="60000">minuty</option>
      <option value="216000000">hodiny</option>
      <option value="5184000000">dny</option>
      <option value="1893488986060">roky</option>
    </select>
  </p>
  <p id="vysledek"></p>
  
  <script>
    function getOptionByValue(select) {
      var option = select.getElementsByTagName("option");
      for (var i = 0; i < option.length; i++) {
        if (select.value == option[i].value) return (option[i].innerHTML);
      }
    }
    
    /* Zaokrouhlení */
    function zaokrouhlit(cislo) {
        return (Math.round((cislo) * 100) / 100);	
    }
        
    var kolik = document.getElementById("kolik");
    var z = document.getElementById("z");
    var na = document.getElementById("na");
    var vypsat = document.getElementById("vysledek");
    
    function prepocitat() {
      var hodnota = parseFloat(0 + kolik.value.replace(",", "."));
      var vysledek = hodnota * (parseFloat(z.value) / parseFloat(na.value));
      vypsat.innerHTML = hodnota + " " + getOptionByValue(z) + " na <b>" + getOptionByValue(na) + "</b> je " + vysledek + (vysledek == zaokrouhlit(vysledek) ? "" : "<br>To je cca " + zaokrouhlit(vysledek) + ".");
    }
    
    window.onload = kolik.onchange = kolik.onkeyup = kolik.onkeypress = z.onchange = na.onchange = prepocitat;
  </script>
</div>

<p><a href="http://kod.djpw.cz/yvab">Ukázka</a></p>
