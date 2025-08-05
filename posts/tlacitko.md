---
title: "Tlačítko na webu"
headline: "Tlačítko na webu"
description: "Jaké HTML značky používat pro tlačítka na webových stránkách a aplikacích."
date: "2015-11-09"
last_modification: "2015-11-29"
status: 1
tags: ["formulare", "napady", "odkazy"]
format: "html"
---

<p>Tlačítka jsou základním prvkem každé webové aplikace. Ať jde o jednoduchý kontaktní formulář nebo o JS aplikaci typu emailový klient (např. <a href="/outlook-com">Outlook.com</a> nebo Gmail). I běžný odkaz v menu jde svým způsobem považovat za tlačítko.</p>



<h2 id="znacky">Značky</h2>

<p>V HTML existuje pro tlačítko přímo značka <a href="/button"><code>&lt;button></code></a>. V podstatě stejnou podobu a funkčnost nabízí i značka <a href="/input"><code>&lt;input></code></a> – s typem <code>button</code>/<code>submit</code>.</p>



<p>Obě značky se obvykle používají uvnitř formulářů.</p>


<h2 id="typy">Různé podoby tlačítka</h2>

<p>Tlačítko jde ale vytvořit více způsoby.</p>

<ul>
  <li><code>&lt;button></code> (s <code>type=submit</code> nebo <code>type=button</code>)</li>
  
  <li><code>&lt;input></code> (s <code>type=submit</code> nebo <code>type=button</code>)</li>
  
  <li><code>&lt;input type="image"></code> – obrázkové tlačítko</li>
  
  <li><a href="/odkaz"><code>&lt;a></code></a> – běžný HTML odkaz</li>
  <li><code>&lt;div></code>/<code>&lt;span></code></li>
</ul>


<p>Je možné dlouze diskutovat, jestli je lepší <code>&lt;button></code>, <code>&lt;input type="button"></code>, odkaz a podobně. Záleží ale na okolnostech. Každý ze způsobu má výhody i nevýhody.</p>



<h3 id="systemovy">Systémový vzhled</h3>

<p>Pokud se člověk nechce zabývat vlastním <a href="/vzhled-formularu">stylem tlačítek</a> (to obnáší vytvořit styl pro 5 různých stavů), při použití <code>&lt;button></code>/<code>&lt;input type="button"></code> obstará styl prohlížeč v kombinaci s operačním systémem.</p>

<p>Tlačítko má potom bez práce vzhled pro všechny stavy, navíc je na něj uživatel zvyklý.</p>



<h3 id="button-input"><code>&lt;button></code> vs. <code>&lt;input type="button"></code></h3>

<p>Rozhodování mezi tlačítkem a input-tlačítkem je potom celkem jednoduché. Input-tlačítko v sobě <b>nemůže mít HTML obsah</b>.</p>

<p>Má-li mít tlačítko například ikonku, s <code>&lt;button></code>em jde použít následující:</p>

<pre><code>&lt;button>
  &lt;span class="ikona">&lt;/span>
  Popisek
&lt;/button>
</code></pre>




<p>V případě <code>&lt;input type="submit"></code>/<code>&lt;input type="button"></code> by se obrázková ikona musela řešit pozadím přímo pro <code>&lt;input></code>. Tento postup nemusí být tak pohodlný.</p>

<p>Stejně tak vzhledem k tomu, že <code>&lt;input></code> nemá obsah, nejde u něj použít pseudo-elementy <a href="/css-selektory#before-after"><code>:before</code>/<code>:after</code></a>.</p>

<p>V dřívějších dobách se častěji používal <code>&lt;input type"submit"></code>, protože se formulářové prvky tolik nestylovaly a <code>&lt;button></code> se ve starších <b>IE</b> choval odlišně:</p>

<ul>
  <li>
    <p>Do <b>IE 6</b> se odesílal obsah všech <code>&lt;button></code>ů ve formuláři (ne jen ten stisknutý).</p>
  </li>
  <li>
    <p>Do <b>IE 7</b> se místo atributu <code>value</code> tlačítka  odesílal jeho HTML obsah mezi <code>&lt;button></code> a <code>&lt;/button></code>.</p>
  </li>  
  <li>
    <p>Do <b>IE 8</b> se tlačítko neodeslalo při potvrzení formuláře klávesou <kbd>Enter</kbd> z jiného políčka. (Jeho <code>name</code> a <code>value</code> se nepřenesly na server.)</p>
  </li>
</ul>

<p>Dnes kvůli častějšímu stylování a potřebě mít HTML kód v tlačítku převládá spíš <code>&lt;button></code>. Problémy se staršími <b>IE</b> se buď ignorují, nebo jim lze předcházet návrhem serverového skriptu, který nedetekuje odeslání formuláře podle odesílacího tlačítka ale podle jiných prvků.</p>


<h3 id="image">Obrázkový <code>&lt;input type="image"></code></h3>

<p>Jako tlačítko jde použít běžný obrázek:</p>

<pre><code>&lt;input type="image" src="obrazek.png" alt="Odeslat"></code></pre>

<p>Tento postup se prakticky nepoužívá, protože styl tlačítka jde universálněji vykouzlit pomocí CSS. Pro tlačítka s různými popisy by se muselo generovat spoustu obrázků.</p>






<h2 id="odkaz">Odkaz</h2>

<p>Běžný <a href="/odkaz">HTML odkaz <code>&lt;a></code></a> se hodí pro tlačítka, která nemají odesílat obsah jiných formulářových prvků, byť i to by s JavaScriptem šlo.</p>

<p>Odkaz není problém <a href="/odkaz-tlacitko">nastylovat jako tlačítko</a> i je možné se na něj standardně dostat pouze z klávesnice klávesou <kbd>Tab</kbd>.</p>

<p>Hlavní rozdíl mezi mezi odkazem a formulářovým tlačítkem je v tom, že tlačítko jde aktivovat kromě <kbd>Enter</kbd>u i klávesou <kbd>Space</kbd> (mezerník).</p>

<p>Používat odkaz se obecně hodí u tlačítek, která <b>vedou na nějakou URL</b>. Návštěvník si tak cíl odkazu může pohodlně zkopírovat do schránky, standardním způsobem cíl otevřít do nové záložky a podobně.</p>


<p><img src="/files/tlacitko/kopirovat.png" alt="Kopírovat adresu odkazu" class="border"></p>















<p>V případě <code>&lt;button></code>u se zobrazí většinou standardní kontextová nabídka jako u kteréhokoliv jiného obyčejného elementu.</p>



<h2 id="div">Neutrální <code>&lt;div></code>/<code>&lt;span></code></h2>

<p>V rozhraní některých velkých JS aplikací se je možné setkat s tím, že tlačítka jsou jen obyčejné <code>&lt;div></code>y/<code>&lt;span></code>y.</p>

<p>Příklad z <a href="/google-plus">Google+</a>:</p>

<p><img src="/files/tlacitko/gplus-tlacitko.png" alt="Span jako tlačítko" class="border"></p>
























<p>Taktéž v <b>Gmailu</b> je tlačítkem neutrální značka:</p>

<p><img src="/files/tlacitko/gmail-tlacitko.png" alt="Div jako tlačítko" class="border"></p>




















<p>I pro obyčejný <code>&lt;div></code> není problém <b>doplnit chování</b> jako má běžné formulářové tlačítko:</p>

<ul>
  <li>
    <p>Atributem <a href="/tabindex"><code>tabindex</code></a> umožnit ovládání klávesnicí.</p>
  </li>
  <li>
    <p>Atributem <code>role="button"</code> sdělit hlasovým čtečkám, že se jedná o tlačítko.</p>
  </li>
  <li>
    <p>Vlastností <a href="/zakazat-oznaceni-textu#user-select"><code>user-select</code></a> zakázat označení obsahu.</p>
  </li>
  <li>
    <p>Pomocí JS událostí připojit příslušné akce.</p>
  </li>
</ul>

<p>Pokud aplikace stejně <a href="/bez-javascriptu">bez JavaScriptu</a> nefunguje a styl tlačítek má být vlastní, není příliš důvod se neutrálním značkám bránit.</p>

<p>Na jednu stranu je těmto <i>tlačítkům</i> nutné přidat některé vlastnosti, aby se chovala jako opravdová tlačítka, na stranu druhou odpadne nutnost při stylování <b>přebíjet výchozí styly prohlížečů</b>.</p>

<p>Někdy to není úplně snadné:</p>

<div class="internal-content">
  <ul>
    <li><a href="/stylovani-inputu">Stylování formulářových políček a tlačítek</a></li>
    <li><a href="/firefox-vyssi-tlacitko">Vyšší tlačítko ve Firefoxu</a></li>
  </ul>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://twitter.com/jdan/status/663835261948837888">Jordan Scales na Twitteru</a>: Jaké jsou výhody <code>&lt;div></code>u oproti <code>&lt;button></code>?</li>
  <li>CSS Tricks: <a href="https://css-tricks.com/use-button-element/">When To Use The Button Element</a></li>
</ul>