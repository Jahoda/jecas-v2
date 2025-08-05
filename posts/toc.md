---
title: "Automatické generování obsahu"
headline: "Automatické generování obsahu stránky"
description: "Automatické generování obsahu HTML stránky v JavaScriptu i PHP."
date: "2014-03-18"
last_modification: "2014-03-30"
status: 1
tags: ["hotova-reseni", "js", "php"]
format: "html"
---

<p>Obsah stránky (anglicky: <i>table of contents</i>, zkráceně <b>TOC</b>) může zpřehlednit čtení delšího článku na <b>obsahovém webu</b>.</p>

<p>Takový obsah například běžně používá Wikipedie, kdy se na začátku stránky zobrazuje seznam obsahující odkazy na jednotlivé části dané stránky.</p>

<h2 id="jak">Jak na to</h2>

<p>Prvním předpokladem pro automatickou tvorbu <i>Obsahu</i> je důsledné používání kotev/záložek u nadpisů. Tj. u každého nadpisu <b>mít identifikátor</b>.</p>

<pre><code>&lt;h1 <b>id="nadpis"</b>>
  Text nadpisu
&lt;/h1></code></pre>

<p>Chybí-li identifikátory, není nic ztraceno. I identifikátor je možné automaticky vygenerovat. Stačí projít nadpisy a v jejich textu převést <b>mezery na spojovníky</b> a <b>odstranit diakritiku</b> (více v článku <a href="http://php.vrana.cz/vytvoreni-pratelskeho-url.php">Vytvoření přátelského URL</a>).</p>

<p>TOC (table of contents) umí generovat i nástroje typu <a href="http://texy.info">Texy!</a>.</p>

<h3 id="generovani">Generování obsahu stránky</h3>

<p>Z nadpisů (nebo obecně z elementů, které mají atirbut <code>id</code>) je potom celkem jednoduché sestavit výsledný seznam.</p>

<h3 id="sestavovani">Sestavování obsahu</h3>

<p>V zásadě existují dvě možnosti, jak výsledný obsah sestavit.</p>

<ol>
  <li>Použít HTML seznam (<code>&lt;ul></code>/<code>&lt;ol></code>) a různé úrovně nadpisů do sebe zanořovat.</li>
  <li>Zanoření znázornit <b>jen CSS styly</b>.</li>
</ol>

<p>Druhů způsob vypsání obsahů značně <b>zjednodušuje</b>. Stačí v podsatě ke každé položce s <a href="/id-class"><code>id</code></a> přiřadit CSS třídu odpovídajícího názvu. A zbytek zařídit <b>kaskádovými styly</b>.</p>

<pre><code>&lt;ul>
  &lt;li class="uroven-h1">&lt;/li>
  &lt;li class="uroven-h2">&lt;/li>
&lt;/ul></code></pre>

<h2 id="js">JavaScript</h2>

<p>Na straně klienta v JS je to asi nejsnazší. Zvlášť za pomoci <a href="/queryselector"><code>querySelector</code>u</a> (od <b>IE 8</b>) je vybrání potřebných elementů hodně <b>elegantní</b>.</p>

<pre><code>var polozky = document.querySelectorAll("[id]");</code></pre>

<p>Tyto položky <a href="/js-cykly">projedeme cyklem</a>:</p>

<pre><code>var obsah = "&lt;h2>Obsah&lt;/h2>&lt;ul>";
for (var i = 0; i &lt; polozky.length; i++) {
  var uroven = polozky[i].tagName.toLowerCase();
  obsah += "&lt;li class='level-" + 
            uroven + 
            "'>&lt;a href='#" + 
            polozky[i].id + "'>" + 
            polozky[i].innerHTML + "&lt;/a>";    
}
obsah += "&lt;/ul>";
</code></pre>

<p>Nyní stačí obsah proměnné vypsat do nějakého <code>&lt;div></code>u.</p>

<pre><code>&lt;div class="obsah">&lt;/div>
&lt;script>
  document.querySelector(".obsah").innerHTML = obsah;
&lt;/script></code></pre>

<p>V případě, že se na stránce používají <a href="/id-class">identifikátory</a> i pro stylování, je vhodné některé značky buď přeskočit (<code>&lt;div></code> a <code>&lt;span></code>), nebo napak vytvářet odkazy jen pro nadpisy (<code>&lt;h1></code>, <code>&lt;h2></code>, …). Stačí k tomu kontrolovat vlastnost <code>tagName</code> (v ukázce hodnotu proměnné <code>uroven</code>).</p>

<pre><code>if (uroven == "div" || uroven == "span") continue;</code></pre>

<h2 id="php">PHP</h2>

<p>Podobný seznam může <i>vyzobat</i> z HTML i PHP.</p>

<pre><code>function tableOfContents($html) {
  $pattern = '/&lt;h([2-5]) id=["\'](.*?)["\'].*?>(.*?)&lt;\/h\1>/';
  preg_match_all($pattern, $html, $matches, PREG_SET_ORDER);

  $output = "";
  foreach ($matches as $item) {
    $output .= '
      &lt;li class="level-' . $item[1] . '">
        &lt;a href="#' . $item[2] . '">' . $item[3] . '&lt;/a>
      &lt;/li>';
  }
  
  return (!empty($output)) ? 
    "&lt;ul class='summary'>" . $output . "&lt;/ul>" : 
    "";
}</code></pre>

<p>Funkční ukázka na <a href="https://github.com/Jahoda/toc">GitHubu</a>.</p>

<h2 id="zvyrazneni">Zvýraznění aktuální části</h2>

<p>Zajímavé vylepšení může být <a href="/zvyrazneni-odrolovani">zvýraznění aktivní části</a>, pokud je na ní odrolováno. Pochopitelně v případě, že je prostor pro <a href="/position-fixed">fixní umístění</a> seznamu nadpisů.</p>