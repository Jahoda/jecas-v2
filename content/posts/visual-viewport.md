---
title: "VisualViewport API"
headline: "VisualViewport API"
description: "VisualViewport API umožňuje v JS lépe reagovat na velikost viewportu a jeho změny."
date: "2021-03-08"
last_modification: "2021-03-08"
status: 1
tags: ["js", "rozliseni"]
format: "html"
---

<p>V některých situacích si pro požadované chování nejde už vystačit s CSS a je potřeba JavaScriptem zjišťovat rozměry viewportu a něco podle nich nastavovat.</p>

<p>Ve světě před mobilními zařízeními šlo celkem snadno zjišťovat <a href="/zjisteni-rozmeru">rozměry stránky</a> nebo viewportu.</p>




<dl>
  <dt><code>window.innerWidth</code></dt>
  <dd>
    <p>Starší šířka viewportu: <tt class="live" data-eval="window.innerWidth"></tt></p>
  </dd>
  
  <dt><code>window.innerHeight</code></dt>
  <dd>
    <p>Starší výška viewportu: <tt class="live" data-eval="window.innerHeight"></tt></p>
  </dd>  
</dl>

<p>Bohužel pro mobilní prohlížeče to úplně použitelné není kvůli různým virtuálním lištám a klávesnicím. Zvlášť u <b>Safari</b> v <b>iOS</b> se výše uvedené rozměry často liší od reality.</p>

<p>Věčný problém u iPhone bývalo spočítat <b>výšku SW klávesnice</b> – přesněji řečeno zbývající plochu kolem klávesnice. Teď to jde snadno:</p>


<dl>
  <dt><code>window.visualViewport.height</code></dt>
  <dd>
    <p>Šířka viewportu: <tt class="live" data-eval="window.visualViewport.width"></tt></p>
  </dd>
  
  <dt><code>window.visualViewport.width</code></dt>
  <dd>
    <p>Výška viewportu: <tt class="live" data-eval="window.visualViewport.height"></tt></p>
  </dd>  
</dl>

<p>Zkuste si pro vyzkoušení kliknout do pole, aby se klávesnice zobrazila:</p>

<div class="live">
  <input type="text" value="testovací pole">
</div>

<p>Jak je vidět na obrázku – v iOS na iPhone jde konečně zjistit dostupný prostor kromě klávesnice a lišt.</p>

<p>A je to universálně funkční nezávisle na použité SW klávesnici.</p>

<p><img src="/files/visual-viewport/visualviewport-api-v-iphone.png" alt="VisualViewport API v iPhone" class="border"></p>












































































<p>Více o VisualViewport API v angličtině na MDN:</p>

<div class="external-content">
  <ul>
    <li>
      MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API">Visual Viewport API</a>
    </li>
  </ul>
</div>


<h2 id="pouziti">Použití</h2>

<p>Vše je dostupné v objektu <code>window.visualViewport</code>.</p>

<p>Pro pohodlnější práci se může hodit použít proměnnou.</p>

<pre><code>var viewport = window.visualViewport</code></pre>


<dl>
  <dt><code>window.visualViewport.offsetLeft</code></dt>
  <dd>
    <p>Offset zleva: <tt class="live" data-eval="window.visualViewport.offsetLeft"></tt></p>
  </dd>
  
  <dt><code>window.visualViewport.offsetTop</code></dt>
  <dd>
    <p>Offset shora: <tt class="live" data-eval="window.visualViewport.offsetTop"></tt></p>
  </dd> 
  <dt><code>window.visualViewport.pageLeft</code></dt>
  <dd>
    <p><tt class="live" data-eval="window.visualViewport.pageLeft"></tt></p>
  </dd>
  
  <dt><code>window.visualViewport.pageTop</code></dt>
  <dd>
    <p><tt class="live" data-eval="window.visualViewport.pageTop"></tt></p>
  </dd> 
  
  <dt><code>window.visualViewport.scale</code></dt>
  <dd>
    <p>Poměr zazoomování: <tt class="live" data-eval="window.visualViewport.scale"></tt></p>
  </dd>   
</dl>

<p>Nejlepší je si zkusit zoomovat a posouvat stránkou pro pochopení.</p>


<h3 id="udalosti">Události</h3>

<p>Existují dvě – <code>scroll</code> a <code>resize</code>. Pouští se buď při scrollování, nebo při změně velikosti (sem patří i přiblížení/oddálení):</p>

<pre><code>window.visualViewport.addEventListener('scroll', funkcePoScrollu)
window.visualViewport.addEventListener('resize', funkcePoResizeNeboZoomu)</code></pre>



<h2 id="podpora">Podpora</h2>

<p>Nefunguje ve starém <b>IE 11</b> a ve <b>Firefoxu</b> – to nejsou zase tolik obvyklé mobilní prohlížeče, takže tam si jde vystačit s konstrukcemi typu <code>widnow.innerWidth</code> apod.</p>

<p>Zvlášť užitečné se zdá být v <b>Safari</b> v <b>iOS</b> (podpora od verse 13), kde byl dříve značný problém zjistit skutečnou dostupnou plochu.</p>

<p>Jedná se zatím o experimentální API, takže je možné, že se časem změní.</p>

<p>Kvůli nepodpoře v některých prohlížečích je vhodné detekovat podporu:</p>

<pre><code>if (window.visualViewport) {
  // kód pracující s VisualViewport API
}</code></pre>

<script>
  function reCount() {
    var items = document.getElementsByTagName("tt");
    for (var i = 0; i < items.length; i++) {
      try {                               
        items[i].innerHTML = eval(items[i].getAttribute("data-eval"));
      } catch {}
    }
  }
  
  window.onload = window.onresize = reCount;
              
                                     
if (window.visualViewport) {                                               window.visualViewport.addEventListener('resize', reCount);                                             window.visualViewport.addEventListener('scroll', reCount);
}
</script>