---
title: "Responsivní web"
headline: "Jak na mobilní (responsivní) web"
description: "Jak a proč vytvářet mobilní versi webu – responsive web."
date: "2013-07-21"
last_modification: "2013-07-21"
status: 1
tags: ["hotova-reseni", "napady", "responsive"]
format: "html"
---

<p>Jelikož různí návštěvníci používají různá zařízení, jedna jediná varianta často není <b>universálně použitelná</b>.</p>

<h2>Proč mobilní web?</h2>
<h3>Rozlišení a uhlopříčka</h3>
<p>Pokud si srovnáme typický <b>chytrý telefon</b> s uhlopříčkou kolem 4 palců s <b>FullHD monitorem</b> o uhlopříčce například 24 palců (nebo třeba FullHD televisí s uhlopříčkou ještě násobnou), je vidět značný nepoměr. (I při zohlednění běžné vzdálenost, ze které člověk dané zařízení očima čte/prohlíží.)</p>

<h3>Datová náročnost</h3>
<p>Ještě pořád jsou mobilní připojení typicky pomalejší a uživatelé často limitováni datovým přenosem (FUP). Mobilní web může být proto prospěšný.</p>

<h3>Jiné potřeby</h3>
<p>Nakonec může člověk po webu při prohlížení z mobilního telefonu  chtít o trochu něco jiného než z běžného počítače.</p>
<h4>Příklady</h4>
<ol>
  <li>Web nabízející obsah ke stažení, který na mobilu nebude moc platný (např. <a href="http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=17&amp;topic=150308#6">titulky k seriálům</a>).</li>
  <li>Webová stránka restaurace: Na PC si typicky budu v prvé řadě chtít prohlédnout, jak to tam vypadá, na mobilu mě bude hlavně zajímat, jak se tam dostanu a mají-li otevřeno.</li>
</ol>

<h2 id="moznosti">Způsoby řešení</h2>
<p>V zásadě existují dva způsoby:</p>
<ol>
  <li>Jeden web pro <b>desktop</b>, jeden web pro <b>mobily</b>.</li>
  <li>Jen jeden web s <b>detekcí</b> desktopu/mobilu a drobnými úpravami.</li>
  <li>Kombinace.</li>
</ol>

<h2>Dva různé weby</h2>
<p>K běžnému (desktopovému) webu se vytvoří další web pro mobily. Obvykle běží na <code>m.example.com</code> subdoméně nebo se provádí detekce prohlížeče a podle toho se nabídne příslušný obsah.</p>
<h3 id="detekce">Detekce</h3>
<p>Detekovat mobilní prohlížeč lze hledáním řetězce <code>mobile</code> v HTTP hlavičce <code>user-agent</code>, v PHP to může vypadat následovně.</p>
<pre><code>if (stripos($_SERVER["HTTP_USER_AGENT"], "mobile") !== false) {
  $isMobile = true;  
  // mobilní prohlížeč
}
else {
  $isMobile = false;
  // běžný prohlížeč
}</code></pre>
<p>Po <b>detekci mobilu</b> se může rovnou přesměrovat na <code>m.example.com</code>, rovnou zobrazit na stejné URL mobilní versi — nebo mobilní versi jen nabídnout.</p>

<h2 id="media-queries">Jeden web a „Media Queries“</h2>
<p>Pro jednodušší úpravu čistě pomocí CSS si lze vystačit s tzv. <a href="/media">Media Queries</a>. Oč jde? K běžnému CSS pro desktop se přidají speciální podmínky, které zajistí, že se další pravidla zlepšující zobrazení u mobilních zařízení aplikují jen za určitých podmínek – typicky šířky okna prohlížeče (viewportu).</p>

<p>Šířku, při které se web <b>přeskládá</b> (tzv. <i>breakpointy</i>), není příliš vhodné volit ve stylu <i>„tohle je pro mobil/tablet/PC“</i>. Lepší je si web pomalu zmenšovat a <b>nový breakpoint</b> vytvořit vždy, když se stránka přestane ideálně zobrazovat.</p>
<pre><code>@media screen and (max-width: <b>480px</b>) {
  /* pravidla se aplikují jen při šířce do 480 px */
}</code></pre>
<p>Nevýhoda tohoto řešení je, že nefunguje u Explorerů starších než 9 (lze řešit <a href="https://github.com/scottjehl/Respond">doskriptováním v JS</a>).</p>
<p>Kromě Media Queries je nutné správně nastavit <a href="/meta-viewport"><code>&lt;meta&gt;</code> značku <code>viewport</code></a> v hlavičce stránky.</p>
<pre><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code></pre>

<h3 id="mobile-first">Mobile first</h3>
<p>Opačným postupem je vytvořit nejprve základní mobilní vzhled a pomocí Media Queries jej rozšířit pro větší zařízení.</p>
<p>Výhodné na tom je, že i velmi starý prohlížeč může dostat alespoň základní jednoduché CSS, což může být lepší, než když dostane komplikovaný plný layout, který se potom v něm rozpadne.</p>

<h2 id="kombinace">Kombinace postupů</h2>
<p>Jelikož samotné CSS není všemocné a dva různé weby komplikují správu, je možné obě řešení zkombinovat.</p>
<ul>
  <li>Pokud se nějaké <b>větší části</b> nemají na mobilu zobrazovat, ušetříme datový přenost náhradou <code>obsah {display: none}</code> za obalení daného bloku podmínkou „<code>$isMobile</code>“ na straně serveru.</li>
  <li>Podobně různé reklamy nebo třeba <a href='/magnific-popup'>lightbox skripty</a> a další na mobilech zbytečná data.</li>
  <li><b>Obrázky</b> ve vysokém rozlišení nemá smysl zobrazovat, rozumnější nejspíš bude místo nich zobrazit zmenšeninu.</li>
</ul>

<h2 id="ladeni">Testování a ladění</h2>
<p>Prohlížeče v mobilních zařízeních se hodně blíží „velkým“ prohlížečům, proto běžně stačí si na desktopu zmenšit okno (Media Queries fungují od IE 9). Více informací <a href="/prohlizece#mobily">je zde</a>.</p>

<h2 id="problemy">Úskalí a risika responsivních webů</h2>
<p>Jako hlavní risiko vidím vytvoření jisté nekonsistence. Návštěvník si zvykne na desktopovou versi dané stránky a po připojení z mobilu je na jednou skoro <i>na jiném webu</i>.</p>
<p>Vždy je proto dobré se zamyslet, zda přeskládáním stránky pro jiné zařízení návštěvníka příliš nezmateme. Lépe řečeno, zda lepší přeskládání převáží nad neohrabaném – ale povědomém – zobrazení.</p>
<p>Více o tom na <a href='http://diskuse.jakpsatweb.cz/?action=vthread&amp;forum=7&amp;topic=135062'>diskusi</a>.</p>