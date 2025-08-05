---
title: "Serializace v PHP"
headline: "Serializace v PHP"
description: "Funkce <code>serialize</code> v PHP převádí datovou strukturu na řetězec uložitelný do souboru nebo database."
date: "2015-11-08"
last_modification: "2016-01-24"
status: 1
tags: ["napady", "php"]
format: "html"
---

<p>PHP funkce <a href="http://php.net/manual/en/function.serialize.php"><code>serialize</code></a> slouží k převedení PHP objektu nebo pole na textový řetězec – ten jde následně snadno uložit do DB nebo souboru a opětovně načíst pomocí funkce <a href="http://php.net/manual/en/function.unserialize.php"><code><b>un</b>serialize</code></a>.</p>

<p>Jde tak pohodlně ukládat datové struktury přímo v PHP.</p>



<h2 id="priklad">Příklad</h2>

<p>Bude-li existovat následující pole:</p>

<pre><code>$pole = array(
  "jedna",
  "dva",
  "fytopuf"
  );</code></pre>







<p>Pro jeho serializaci ho stačí předat funkci <code>serialize</code>.</p>

<pre><code>$serPole = serialize($pole);</code></pre>


<p>V proměnné <code>$serPole</code> nyní bude:</p>


<pre><code>a:3:{i:0;s:5:"jedna";i:1;s:3:"dva";i:2;s:7:"fytopuf";}</code></pre>



<p>Písmena před dvojtečkami značí datový typ (a – pole, i – integer, s – string), číslo za tím potom délku. V praxi to ale potřeba znát příliš není, protože serializovaný řetězec slouží jen k tomu, aby se převedl zpátky funkcí <code>unserialize</code>:</p>

<pre><code>$poSerPole = unserialize(
  'a:3:{i:0;s:5:"jedna";i:1;s:3:"dva";i:2;s:7:"fytopuf";}'
);</code></pre>



<p>Pole po serializaci (<code>$poSerPole</code>) a následné unserializaci nyní bude odpovídat poli původnímu (<code>$pole</code>).</p>

<p>Výraz <code>$pole === $poSerPole</code> proto vrátí <code>true</code>.</p>

<p>Ale jak to použít v praxi?</p>




<h2 id="session">Uložení a obnovení session</h2>

<p>V praxi se serializace hodí třeba k uložení hodnot z proměnné <code>$_SESSION</code> pro budoucí obnovení.</p>


<h3 id="ulozit">Uložení</h3>

<pre><code>file_put_contents("serialize.dat", serialize($_SESSION));</code></pre>



<h3 id="nacist">Načtení</h3>

<pre><code>$_SESSION = unserialize(file_get_contents("serialize.dat"));</code></pre>





<h2 id="db">Ukládání do DB</h2>


<p>Používat serializaci je velmi pohodlné při ukládání dat do database při ukládání nastavení nebo uživatelských dat, kde není jasné, jak by měla struktura DB vypadat.</p>


<p>Používají to některé <a href="/cms">redakční systémy</a> – třeba <a href="/wordpress">WordPress</a>. Mají tabulku se sloupci <i>klíč</i> a <i>hodnota</i>. Jako <i>hodnota</i> se potom uloží serializovaný řetězec s libovolným nastavením.</p>

<p><img src="/files/serialize/wp.png" alt="Ukládání serialisovaných dat ve WP" class="border"></p>



















<p>Někteří lidé považují jako <i>čistší</i> způsob řádně navrhnout strukturu <a href="/sql">SQL</a> tabulky se sloupci ve vhodných datových typech, ale použít serializaci je mnohem jednodušší a rychlejší na vytvoření.</p>

<p>Druhá věc je, zda je nějaká výhra mít pro každé nastavení samostatnou SQL tabulku s jediným řádkem.</p>




<h2 id="nastaveni">Ukládání nastavení do souboru</h2>

<p>Nepoužívá-li PHP aplikace databasi a není výhodné ukládat nastavení do jiného formátu (třeba více lidsky čitelného <a href="/json">JSONu</a>), je serializace jasná volba, má-li být možné provádět změny prostřednictvím webového rozhraní.</p>

<p>U konfigurace <b>ruční změnou souborů</b> je výhodnější třeba ten přehlednější JSON nebo PHP pole a konstanty.</p>

<p>Stejně tak se v PHP serializované nastavení nehodí pro sdílení s jinými programovacími jazyky, zde jde lepší universálnější JSON.</p>



<h2 id="cache">Cache</h2>

<p>Bylo-li hodně časově náročné datovou strukturu získat a získaná data jsou aktuální delší dobu, mohou se pomocí <code>serialize</code> a <code>unserialize</code> velmi elegantně cacheovat.</p>



<p>Hodí se to v případech, kdy není možné kešovat celý HTML kód třeba kvůli odlišnostem pro přihlášené uživatele nebo je potřeba často měnit HTML šablony a bylo by neefektivní kvůli tomu invalidovat tisíce stránek.</p>


<p>Například výstup tohoto článku (sestávající z titulku, nadpisu, obsahu a označení několika štítky), který se normálně získává z DB, by se mohl uložit do serializovaného pole.</p>

<p>Při jeho zobrazení by se potom nemusela potřebná data složitě získávat SQL dotazy, avšak postup sestavování stránky by zůstal stejný.</p>