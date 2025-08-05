---
title: "Vypnutí Emoji ve WordPressu"
headline: "Vypnutí Emoji ve WordPressu"
description: "Jak ve WordPressu zakázat grafické symboly Emoji."
date: "2015-05-19"
last_modification: "2015-05-20"
status: 1
tags: ["cms", "hotova-reseni", "napady", "wordpress"]
format: "html"
---

<p><a href="/wordpress">WordPress</a> 4.2 začal nahrazovat <a href="/emoji">Emoji znaky</a> vlastními obrázky.</p>

<p>Vloží-li se do stránky například symbol šipky:</p>

<div class="live">
  ◀
</div>

<p>WordPress ji pomocí JavaScriptu nahradí obrázkem.</p>

<div class="live">
  <style>
    img.emoji {
      width: 1em;
      height: 1em;
      display: inline;
    }
  </style>
  <img class="emoji" draggable="false" alt="◀" src="http://s.w.org/images/core/emoji/72x72/25c0.png">
</div>


<p>To může vadit z několika důvodů:</p>

<ol>
  <li>Obrázek často bude <b>vypadat jinak</b> než symbol.</li>
  
  <li>Pro nahrazení znaků se musí stáhnout JS soubor, který provede nahrazení, a následně konkrétní obrázky. To <b>zdržuje načítání stránky</b>.</li>
</ol>


<p>Toto nahrazování probíhá v <b>celém obsahu</b> stránky (ne tedy jen u samotného obsahu, ale i u HTML šablon).</p>

<p>O <b>převod symbolů na obrázky</b> se stará se o to tento skript vložený do hlavičky stránky.</p>

<p><img src="/files/wordpress-emoji/wp-emoji-script.png" alt="Převod Emoji symbolů na obrázky" class="border"></p>













<h2 id="zrusit">Zrušení převodu na obrázky</h2>

<p>Pro zrušení převodu je nutné zrušit filtr, který převodní skript připojuje. To jde docílit např. přidáním následujícího kódu do souboru <code>functions.php</code> u <b>aktivní šablony</b>.</p>

<pre><code>function disable_emojis() {
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
}
add_action( 'init', 'disable_emojis' );</code></pre>

<p>Jak už to tak u WordPressu bývá, jde téhož docílit i pluginem – jmenuje se <b>Disable Emojis</b> – odstraňuje i další filtry, které se snaží nahrazovat Emoji obrázky na jiných místech jako jsou RSS zdroje a podobně.</p>

<p>Pro kompletní <b>odstranění převodu Emoji</b> jde kromě pluginu přímo vložit do WordPressu obdobný kód.</p>

<div class="external-content">
  <ul>
    <li><a href="http://www.paulund.co.uk/disable-emojicons-introduced-in-wordpress-4-2">Disable Emojicons Introduced In WordPress 4.2</a> – obsahuje kód jako plugin pro odstranění převodu ze všech možných míst</li>
  </ul>
</div>