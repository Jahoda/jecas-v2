---
title: "Záznam obrazovky do GIFu"
headline: "Video-záznam obrazovky do GIFu"
description: "Jak nahrát video obrazovky a uložit ho jako pohyblivý obrázek (GIF)."
date: "2014-06-15"
last_modification: "2014-09-26"
status: 1
tags: ["hotova-reseni", "napady", "video"]
format: "html"
---

<p>Pro tvorbu <b>návodů</b> nebo <b>ukázek</b> na webových stránkách se kromě prostého textu a <b>obrázků</b> může hodit i něco pohyblivého.</p>

<p>Jelikož <b>vložení videa</b> funkčního napříč prohlížeči není úplně bezproblémové. A u služeb třetích stran, jako je například <a href="/youtube">YouTube</a>, nemáme nad obsahem plnou kontrolu, může být použití GIFu rozumný kompromis.</p>


<h2 id="jak">Jak vytvořit GIF</h2>

<p>Osvědčil se mi nástroj <b>ScreenToGif</b> (pro <b>Windows</b>), s kterým je tvorba „video-GIFu“ celkem snadná.</p>

<p><img src="/files/video-gif/screen-to-gif.png" alt="ScreenToGif" class="border"></p>













<p><a href="http://screentogif.codeplex.com/" class="button">Stránka programu</a></p>



<p>K disposici po nahrání výřezu obrazovky je možné procházet jednotlivé snímky (počet zaznamenaných snímků závisí na nastavení <b>FPS</b>) a nepotřebné vymazat, přidat vlastní text a podobně.</p>

<p>Program nicméně není úplně spolehlivý a <b>občas padá</b>. Rovněž nepotěší nemožnost zkusit si vyexportovat záznam s různými nastaveními pro optimální poměr kvalita/velikost. Nezbývá než si <i>video</i> natočit znovu.</p>



<h2 id="vlozeni">Vložení na stránku</h2>

<p>Pohyblivý obrázek se vloží běžnou značkou <code>&lt;img></code>:</p>

<pre><code>&lt;img src="video.gif"></code></pre>





<h2 id="prehravani">Přehrávání</h2>

<p>Výsledný pohyblivý obrázek není možné po vložení na web nějak <b>standardně přehrávat</b>, ale existují jisté možnosti.</p>

<ol>
  <li>
    <p>GIF vytvořit s <b>nekonečnou smyčkou</b>. Obrázek/video se tedy bude donekonečna opakovat. U krátké sekvence to většinou nevadí. U delšího <i>videa</i> může být pro uživatele <b>nepohodlné čekat</b> na druhé opakování, když mu uteče začátek.</p>
    
    <p>Obvykle prohlížeče začínají GIF přehrávat, když se dostane do <i>viewportu</i>.</p>
  </li>
  
  <li>
    <p>Obrázek „spustit“ na vyžádání. Ve skutečnosti tedy JavaScriptem přidat do stránky obrázek s adresou GIFu, co se má přehrát. Tím se video načte a spustí.</p>
    
    <p><b>Pozastavení</b> řešit nejspíš nelze. <b>Opakované přehrávání</b> jde teoreticky simulovat tak, že se GIFu nastaví <i>přehrát pouze jednou</i> a obrázek se přehraje opětovným nastavením téhož <code>src</code> obrázku.</p>    
  </li>
</ol>


<h3 id="ukazka">Ukázka přehrání GIFu na požádání</h3>

<p>Hezké může být z prvního snímku <i>videa</i> udělat <b>statický obrázek</b>, který se GIFem nahradí až po kliknutí na tlačítko. Na témže principu jde vytvořit i zastavení.</p>

<div class="live">
<p>
    <button onclick="prehrat('/files/video-gif/video.gif')">▶ Přehrát</button>
    <button onclick="prehrat('/files/video-gif/video-static.gif')">◼ Stop</button>
</p>

  <img src="/files/video-gif/video-static.gif" alt="" id="video">
<script>
function prehrat(url) {
    document.getElementById("video").src = url;
}
</script>

</div>
    
<p><a href="http://kod.djpw.cz/dqfb">Samostatná živá ukázka</a></p>



<h2 id="datova-velikost">Pozor na datovou velikost</h2>

<p>Při nahrávání velké často se měnící plochy s obrázkem po dlouho dobu a s vysokým počtem snímků za vteřinu snadno vznikne <b>datově obrovský soubor</b>. Nízké desítky vteřin záznamu můžou vytvořit několika-megabytový GIF soubor.</p>



<h2 id="x-gif">Projekt &lt;x-gif></h2>

<p>Ve <b>Firefoxu</b> a <b>Chrome</b> je možné použít skript.</p>

<p><a href="http://geelen.github.io/x-gif/" class="button">Web &lt;x-gif></a></p>

<p>Ten AJAXem načte GIF, rozseká ho na jednotlivé snímky a ty potom standardní JS animací přehraje. Dá se díky tomu měnit <b>rychlost</b>, volit <b>počet opakování</b>, přehrávat odkonce a podobně.</p>

