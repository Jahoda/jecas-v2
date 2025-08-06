---
title: "Kopírování do schránky"
headline: "Kopírování do schránky"
description: "Jak s použitím JS zkopírovat uživateli nějaký text do schránky."
date: "2014-04-27"
last_modification: "2015-04-25"
status: 1
tags: ["hotova-reseni", "js", "schranka"]
format: "html"
---

<p>Občas se hodní návštěvníkovi usnadnit/ovlivnit <b>kopírování obsahu do schránky</b>. Jaké existují možnosti?</p>

<h2 id="zprijemneni">Zpříjemnění kopírování</h2>

<p>Jelikož všechny prohlížeče nenabízejí nějakou <b>standardní metodu</b>, jak požadovaný text přímo zkopírovat do schránky, můžeme uživateli <b>obsah ke zkopírování</b> připravit, aby se mu co nejpohodlněji zkopíroval standardním způsobem klávesovou zkratkou (například) <kbd>Ctrl</kbd> + <kbd>C</kbd> (nemusel nic složitě v textu označovat a podobně).</p>

<h3 id="input-textarea">Obsah v elementu <code>&lt;input></code>/<code>&lt;textarea></code></h3>

<p>U těchto <b>formulářových polí</b> jde využít toho, že se dají snadno celá <a href="/oznaceni-textu">označit JavaScriptem při kliknutí</a>.</p>

<div class="live">
  <label>
    Zkopírujte si adresu: 
    <input onclick="this.select()" value="http://jecas.cz">
  </label>
</div>

<h3 id="prompt">Okno <code>prompt</code></h3>

<p>Další možnost je využít vyskakovacího okna, které běžně slouží (či spíš v minulosti sloužilo) k zadání vstupu od uživatele. S tím, že do pole pro vstup umístíme obsah ke zkopírování:</p>

<div class="live">
  <script>
    function kopirovat(text) {
      prompt("Zkopírujte si URL:", text); 
    }
  </script>
  <button 
    onclick="kopirovat('http://jecas.cz')">
    Zkopírovat adresu
  </button>  
</div>

<h2 id="zmena-textu">Nastavení kopírovaného textu</h2>

<p>Sice nelze ve všech prohlížečích standardně přímo něco nastavit uživateli do schránky, lze však ovlivnit obsah, který si zkopíruje (když kopírování sám vyvolá – <kbd>Ctrl</kbd> + <kbd>C</kbd> a podobně).</p>

<p><a href="https://kod.djpw.cz/qwcb">Ukázka</a> funkční v <b>Chrome</b>, <b>Firefoxu</b> a <b>Opeře</b> (nefunkční v <b>IE</b>).</p>

<p>Napříč prohlížeči funkční je podstrčit uživateli jiný obsah, než se zdá, a který si potom <b>sám zkopíruje</b>. To se dělá tak, že při kopírovací události (<code>oncopy</code>) vyvolané uživatelem se vytvoří neviditelný HTML element s požadovaným obsahem – ten se standardní cestou zkopíruje – a potom už stačí jen „zahladit stopy“ (element pro kopírování odstranit, vrátit původní výběr textu a podobně).</p>

<p>Tento postup se používá například při <a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=8&topic=118171">přidávání <i>zdroje</i></a> do kopírovaného obsahu.</p>




<h2 id="tlacitko">Přímé zkopírování tlačítkem</h2>

<p>Přece jenom existuje způsob, jak <b>přímo zkopírovat obsah do schránky</b> ve všech prohlížečích. Přesněji řečeno pro různé prohlížeče existují různé funkční postupy.</p>




<h3 id="execcommand">Kopírování pomocí <code>execCommand</code></h3>

<p><b>Chrome 43+</b>, <b>Opera 29+</b>, <b>Firefox 41+</b> a <b>IE 10+</b> i <a href="/microsoft-edge"><b>Edge</b></a> dokáží zkopírovat do schránky text pomocí příkazu <code>execCommand</code>, který se používá hlavně u <a href="/vlastni-wysiwyg">WYSIWYG editorů</a>.</p>


<p>Před zavoláním <code>copy</code> je nutné nejprve označit obsah elementu, jehož obsah se bude kopírovat. Celý kód může vypadat následovně.</p>

<pre><code>var element = document.querySelector('.zkopirovat');  
var range = document.createRange();  
range.selectNode(element);  
window.getSelection().addRange(range);  
document.execCommand('copy');
window.getSelection().removeAllRanges(); </code></pre>








<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/homb">Živá ukázka</a> – kopírování do schránky pomocí <i>range</i></li>
  </ul>
</div>

<p>Desktopový <b>Internet Explorer</b> vyžaduje povolení k přístupu do schránky.</p>

<p><img src="/files/kopirovat/kopirovani-ie.png" alt="Povolení přístupu do schránky v IE" class="border"></p>










<p>V <b>Chrome</b>, <b>Opeře</b> nebo mobilním <b>IE</b> se obsah zkopíruje bez dalších dotazů.</p>



<h3 id="ie">Přímé kopírování v IE</h3>



<p>V <b>Internet Exploreru</b> existuje ještě jiná možnost rovnou kopírovat do schránky – přes <code>clipboardData</code>. Opět je vyžadováno udělení přístupu.</p>

<pre><code>if (window.clipboardData) {
  clipboardData.setData("text", "Obsah ke zkopírování");    
}</code></pre>



<h2 id="zeroclipboard">Flash řešení ZeroClipboard</h2>

<p>Napříč prohlížeči s nainstalovaným <b>Flashem</b> dobře funguje nástroj ZeroClipboard. Ten nad tlačítko vloží neviditelný flashový objekt, který odchytne kliknutí a dokáže zapsat obsah do schránky bez dotazování uživatele.</p>

<p>Jelikož podíl zařízení s nainstalovaným/povoleným Flashem klesá, klesá i podpora <b>kopírování do schránky</b> pomocí flashového objektu.</p>

<p>Nejznámnější řešení je <a href="http://zeroclipboard.org/">ZeroClipboard</a> (<a href="https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/instructions.md">instrukce</a>). Použití je jednoduché.</p>

<ol>
  
  <li>
    <p>Vytvoří se tlačítko, tomu se do atributu <code>data-clipboard-<b>target</b></code> nastaví element, ze kterého se má brát obsah ke zkopírování (např. <code>&lt;input></code>). Případě se obsah může přímo nastavit do atributu <code>data-clipboard-<b>text</b></code> (atribut <code>*-target</code> má přednost).</p>
    
    <pre><code>&lt;input type="text" id="<b>policko</b>" value="http://jecas.cz/">
&lt;button 
    id="<i>copy-button</i>" 
    data-clipboard-target="<b>policko</b>" 
    data-clipboard-text="http://jecas.cz/kopirovat">
    Zkopírovat do schránky
&lt;/button></code></pre>
    
  </li>
  
  
  
  
  
  
  <li>    
    <p>Tlačítko se potom předá funkci <code>ZeroClipboard</code>, která zajistí kopírování a umožní i nastavení akce po <b>úspěšném zkopírování</b>.</p>
    
    <pre><code>var client = new ZeroClipboard(
  document.getElementById("<i>copy-button</i>")
);
client.on("ready", function( readyEvent) {
  client.on("aftercopy", function(event) {
    // v event.target je kopírovací tlačítko
    event.target.innerHTML = "Zkopírováno";
  });
});</code></pre>
  </li>
  
  
  
  
  
  
  
  
  <li>Potřebný JavaScript a Flash jde kromě lokálního umístění taktéž <a href="http://cdnjs.com/libraries/zeroclipboard/">načíst z CDN</a> (<a href="/cdn">co je to CDN?</a>).</li>
</ol>

<p><a href="https://kod.djpw.cz/rwcb">Samostatná ukázka</a>.</p>

<p>Pro příznivce <b>jQuery</b> existuje nadstavba nad ZeroClipboard právě v tomto frameworku. Jmenuje se <a href="http://www.steamdev.com/zclip/">zClip</a>.</p>



<h3 id="jak">Jak ZeroClipboard funguje?</h3>

<p>ZeroClipboard funguje tak, že všechna propojená tlačítka překryje průhledným Flashem, který zachytne kliknutí, které způsobí uložení do schránky. Zkopírovat něco do schránky automaticky bez akce uživatele <b>není možné</b>.</p>

<p>Stavy při najetí (<code>:focus</code>) nebo kliknutí (<code>:active</code>) je nutné simulovat přes speciální třídy, které ZeroClipboard přidává.</p>

<pre><code>.tlacitko.zeroclipboard-is-hover { background-color: #eee; }
.tlacitko.zeroclipboard-is-active { background-color: #aaa; }</code></pre>





<h3 id="dynamicke">Dynamické přidávání ZeroClipboard</h3>

<p>Pokud při načtení stránky nevíme, které elementy má být možno kopírovat (například <b>ještě na stránce nejsou</b>, protože budou přidány až po nějakém <a href="/ajax">AJAXovém</a> požadavku), postup bude následující.</p>

<ol>
  <li>
    <p>Vytvoří se instance <i>ZeroClipboard</i> se společnou funkcí pro tlačítka ke kopírování (tato funkce po zkopírování do tlačítka napíše změnou <a href="/innerhtml"><code>innerHTML</code></a> „Zkopírováno“):</p>
    
    <pre><code>var client = new ZeroClipboard();
client.on("ready", function(readyEvent) {
  client.on("aftercopy", function(event) {
    event.target.innerHTML = "✔ Zkopírováno";
  });
});	</code></pre>
  </li>
  
  
  
  
  <li>
    <p>Jednotlivá tlačítka se přidají funkcí <code>clip</code>.</p>
    
    <pre><code>client.clip(
  document.getElementById("tlacitko")
);</code></pre>
    
    <p>Text <b>ke zkopírování</b> se vezme z atributu <code>data-clipboard-text</code> daného tlačítka.</p>
    
    
    <p><a href="https://kod.djpw.cz/cehb">Živá ukázka</a></p>
    
    <p>Kromě předávání jednotlivých tlačítek to může být i kolekce elementů. Dobře se k tomu hodí <a href="/queryselector"><code>querySelector</code></a> (od <b>IE 8</b>).</p>
    
    <pre><code>client.clip(
  document.querySelectorAll("button[data-clipboard-text]")
);</code></pre>
    
    <p><a href="https://kod.djpw.cz/dehb">Živá ukázka</a></p>
  </li>
</ol>







<h2 id="pouzit">Co použít pro kopírování</h2>

<p>Ze všech postupů jde poskládat relativně dobře fungující řešení pro pohodlné zkopírování jedním kliknutím napříč prohlížeči.</p>

<p>V novějším <b>Chrome</b> a <b>Opeře</b> je jasná volba použití <code>execCommand</code>. V <b>IE</b> je situace dost nerozhodná – použití flashového objektu bude fungovat bez nutnosti kopírování potvrdit, ale zase znamená stažení desítek kB kódu.</p>

<p>Ve <b>Firefoxu 40</b> a starších potom nezbývá jiné řešení než Flash.</p>

<p>V případě, že nechceme používat řešení s Flashem, dá se řešení využívající <code>execCommand</code> alespoň zkombinovat s <code>prompt</code>em pro nepodporující prohlížeče (<a href="https://kod.djpw.cz/etmb">ukázka</a>).</p>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>HTML5 Rocks: <a href="http://updates.html5rocks.com/2015/04/cut-and-copy-commands">Cut and Copy Commands</a></li>
  
  <li>Mozilla Hacks: <a href="https://hacks.mozilla.org/2015/09/flash-free-clipboard-for-the-web/">Flash-Free Clipboard for the Web</a></li>
  
  <li><a href="http://zenorocha.github.io/clipboard.js/">clipboard.js</a> – 2kB knihovna pro kopírování bez Flashe</li>
</ul>