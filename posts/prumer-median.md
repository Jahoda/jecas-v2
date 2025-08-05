---
title: "Výpočet průměru a mediánu v PHP/JS"
headline: "Výpočet průměru a mediánu v PHP/JS"
description: "Jak v jazyce PHP nebo v JavaScriptu spočítat medián."
date: "2016-02-01"
last_modification: "2016-02-15"
status: 1
tags: ["hotova-reseni", "js", "php"]
format: "html"
---

<p>Při zjišťování nějaké hodnoty z velkého množství dat bývá obvyklé počítat průměr. Ten je ale bohužel hodně náchylný na ovlivnění extrémně malými nebo extrémně velkými hodnotami.</p>

<p>Jak průměr a medián spočítat v PHP?</p>



<h2 id="prumer">Průměr</h2>

<p>Spočítat průměrnou hodnotu pole je poměrně jednoduché. Stačí součet hodnot (funkce <code>array_sum</code>) vydělit jejich počtem:</p>

<pre><code>function prumer($pole) {
  return array_sum($pole) / count($pole);
}
echo prumer(
  array(1, 3, 5)
); // 3
</code></pre>








<h2 id="median">Medián</h2>

<p>Medián je zajímavější tím, že se rovná <b>prostřední hodnotě</b>, když se čísla seřadí podle velikosti.</p>

<p>Z pěti čísel <code>1, 2, <b>2</b>, 3, 9</code> tak bude medián odpovídat <code>2</code>, protože je uprostřed.</p>


<p>Pro výpočet stačí tedy nejprve pole seřadit funkcí <code>sort</code> a následně vypsat prostřední položku. Ta se zjistí vydělením počtu všech položek pole (spočítá je funkce <code>count</code>) číslem dvě a zaokrouhlením (funkce <code>round</code>). Protože jsou indexy pole číslovány od nuly, ještě se odečte jednička.</p>

<p>Výpočet mediánu v PHP potom může vypadat následovně:</p>

<pre><code>function median($pole) {
  sort($pole);
  return $pole[round(count($pole) / 2) - 1];
}
echo median(
  array(1, 2, 2, 3, 9)
); // 2</code></pre>










<p>Nudná matematická teorie ohledně mediánu je případně na následujících stránkách:</p>

<div class="external-content">
  <ul>
    <li>Matematika.cz: <a href="http://www.matematika.cz/median">Medián</a></li>
    <li>Wikipedie: <a href="https://cs.wikipedia.org/wiki/Medián">Medián</a></li>
  </ul>
</div>



<h2 id="js">Průměr a medián v JS</h2>



<h3 id="median-js">Medián v JS</h3>

<p>Výpočet mediánu jde poměrně snadno přepsat do JS:</p>

<pre><code>function median(pole) {
  pole = pole.sort();
  return pole[Math.round(pole.length / 2) - 1];
}
alert(median(
    [1, 2, 2, 3, 9]
));</code></pre>








<h3 id="prumer-js">Průměr v JS</h3>

<p>V JavaScriptu je počítání průměru pole trochu obtížnější, protože oproti PHP nemá zabudovanou funkci pro <b>součet hodnot pole</b>.</p>




<h4 id="js-soucet-pole">Součet pole v JS</h4>

<p>Jednoduchá implementace PHP funkce <code>array_sum</code> do JavaScriptu by mohla vypadat následovně:</p>

<pre><code>function array_sum(array) {
  return array.reduce(function(a, b) {
    return a + b;
  });
}</code></pre>







<p>S ní už je výpočet průměru v JS jednoduchý:</p>

<pre><code>function prumer(pole) {
  return array_sum(pole) / pole.length;
}</code></pre>


<p><a href="http://kod.djpw.cz/ybub">Živá ukázka</a></p>



<h2 id="kalkulacka">Kalkulačka mediánu a průměru</h2>

<div class="live">
  <script>
  function spocitat(value) {
      var bezCarek = value.trim().replace(/\,/g, "");
      var pole = bezCarek.split(" ");
      vysledek.innerHTML = "Medián je: " + median(pole);
      vysledek.innerHTML += "<br>Průměr je: " + prumer(pole);
  }

  function median(pole) {
    pole = pole.sort();
    console.log(pole);
    return pole[Math.round(pole.length / 2) - 1];
  }

  function array_sum(array) {
    return array.reduce(function(a, b) {
      return parseFloat(a) + parseFloat(b);
    });
  }

  function prumer(pole) {
    return array_sum(pole) / pole.length;
  }    
  </script>
  <textarea id="cislaArea" oninput="spocitat(this.value)" onpaste="spocitat(this.value)" onkeyup="spocitat(this.value)" cols="50" rows="5">1, 2, 2, 3, 9</textarea>
  <div id="vysledek"></div>
  <script>
    spocitat(cislaArea.value);
    // http://kod.djpw.cz/amub
  </script>
</div>