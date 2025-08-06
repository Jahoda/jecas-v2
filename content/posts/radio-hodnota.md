---
title: "Hodnota vybraného radio inputu"
headline: "Hodnota zaškrtnutého <code>radio</code> <code>&lt;input></code>u"
description: "Jak v JavaScriptu zjistit hodnotu označeného radio políčka."
date: "2015-03-04"
last_modification: "2015-03-04"
status: 1
tags: ["formulare", "hotova-reseni", "js"]
format: "html"
---

<p>Při vytváření <a href="/formulare">formulářů</a> se v případě, že má návštěvník volit <b>jednu z několika možností</b>, hodí použít <a href="/input#type-radio"><code>&lt;input type="radio"></code></a>.</p>

<p>Vytvoření skupiny políček, aby šlo vždy vybrat <b>pouze jedno</b>, se docílí použitím stejného názvu (<code>name</code>). Hodnota políčka se potom uvádí do atributu <code>value</code>.</p>

<div class="live">
  <script>
    function radioValue(radioCollection) {
      for (var i = radioCollection.length - 1; i >= 0; i--) {
        if (radioCollection[i].checked) {
          return radioCollection[i].value;
        }
      }
      return false;
    }    
  </script>
  <label>
    <input type="radio" name="radio" value="nevim"> 
    Nevím
  </label>
  <label>
    <input type="radio" name="radio" value="netusim">
    Netuším
  </label>
  <label>
    <input type="radio" name="radio" value="mozna">
    Možná
  </label>    
  <p>
    <button onclick="alert(radioValue(document.getElementsByName('radio')))">
      Co je vybráno?
    </button>
  </p>
</div>

<p>Častou chybou při používání radio přepínačů je absence <a href="/label-for">značky <code>&lt;label></code></a>, kterou jde umožnit vybrání možnosti i kliknutím na popisek.</p>

<div class="internal-content">
  <ul>
    <li><a href="/chyby-formularu">20 nejhorších chyb formulářů</a> – přehled nedostatků, kterým se vyvarovat při tvorbě formuláře</li>
  </ul>
</div>


<h2 id="zjisteni">Zjištění hodnoty JavaScriptem</h2>

<p>Zjistit hodnotu vybrané položky není úplně snadné jako u obyčejné textové položky, kde je text políčka ve vlastnosti <code>value</code>.</p>

<p>Nezbývá než všechna radia projít <a href="/js-cykly">cyklem</a>, který vrátí hodnotu prvního a jediného vybraného přepínače (že je <code>&lt;input></code> zaškrtnutý se pozná z vlastnosti <code>checked</code>):</p>

<pre><code>function radioValue(radioCollection) {
  for (var i = radioCollection.length - 1; i >= 0; i--) {
    if (radioCollection[i].checked) {
      return radioCollection[i].value;
    }
  }
  return false;
}</code></pre>

<p>Této funkci stačí předat kolekci radio prvků.</p>

<pre><code>var hodnota = radioValue(
  document.jmenoFormulare.nazevRadioPolicek
);</code></pre>

<div class="internal-content">
  <ul>
    <li><a href="/js-prvky-formulare">Přístup k prvkům formuláře</a> – různé způsoby, jak zaměřit elementy formuláře</li>
  </ul>
</div>


<h3 id="queryselector">Použití <code>querySelectoru</code></h3>

<p>Metoda <a href="/queryselector">querySelector<code></code></a> nabízí jinou možnost bez použití cyklu, jak z vybraného přepínače získat jeho hodnotu. Selektor <a href="/css-selektory#checked"><code>:checked</code></a> limituje funkčnost na <b>IE 9</b> a novější.</p>

<pre><code>document.querySelector(
  'input[name="<b>nazevRadioPolicek</b>"]:checked'
).value;</code></pre>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/duub">Samostatná ukázka získání <code>value</code> pomocí cyklu</a></li>
    <li><a href="https://kod.djpw.cz/euub">Samostatná ukázka získání hodnoty querySelectorem</a></li>
  </ul>
</div>



<h3 id="jquery">Hodnota vybraného radia v jQuery</h3>

<p>V <b>jQuery</b> se dá použít obdobný postup jako s <code>querySelector</code>em i ve starších <b>IE</b>.</p>

<pre><code>$(
  'input[name=<b>nazevRadioPolicek</b>]:checked'
).val();</code></pre>