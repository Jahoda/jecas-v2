---
title: "Jak přeinstalovat Windows 10"
headline: "Reinstalace Windows 10"
description: "Jak přeinstalovat Windows 10 a zlepšit tak výkon PC. Detailní postup krok za krokem."
date: "2015-11-17"
last_modification: "2015-11-25"
status: 1
tags: ["produktivita", "windows"]
format: "html"
---

<p>Při přechodu na <a href="/windows-10"><b>Windows 10</b></a> ze <b>Windows 7/8</b> je možné provést upgrade se zachováním všech dat a nainstalovaných programů prostřednictvím Windows Update.</p>

<p>Upgrade na <b>W10</b> při ponechání původních dat na první pohled celkem funguje. Pro maximální výkon a stabilitu je ale lepší <b>provést čistou instalaci</b>.</p>

<p>Je to výhodné i z pohledu místa na disku, protože se tím odstraní řada aplikací, které už člověk nepoužívá.</p>

<p>Jak na to?</p>





<h2 id="stazeni">Stažení Windows 10</h2>

<p>Stáhnout Windows 10 jde na následující stránce:</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.microsoft.com/cs-cz/software-download/windows10">Download Windows 10</a> – velikost je do 3 GB</li>
  </ul>
</div>

<p>Místo tlačítka <b>Upgradovat</b> stačí kliknout na <b>Stáhnout nástroj</b>:</p>

<p><img src="/files/instalace-windows-10/stahnout-nastroj.png" alt="Stažení nástroje" class="border"></p>


















<p>Tím se stáhne malý program, který slouží pro vytvoření instalačního média <b>Windows 10</b>.</p>

<p>Po stažení se spustí krátký průvodce:</p>



<h3 id="krok-1">Krok 1 – instalační médium</h3>

<p>Vytvoření instalačního média místo upgradu počítače:</p>

<p><img src="/files/instalace-windows-10/jiny-pocitac.png" alt="Vytvoření média" class="border"></p>




































<h3 id="krok-2">Krok 2 – typ systému</h3>

<p>Nyní je třeba zvolit typ operačního systému. Průvodce dokáže nastavení detekovat na základě aktuální instalace.</p>

<p>Připravit si instalaci jde i pro jiné PC. V takovém případě je potřeba odškrtnout <i>doporučené možnosti</i> a zvolit si jazyk, edici a architekturu systému dle libosti (lépe řečeno s ohledem na dostupnou licenci a HW cílového počítače).</p>

<p><img src="/files/instalace-windows-10/vyber.png" alt="Výběr systému" class="border"></p>






































<h3 id="krok-3">Krok 3 – vytvoření DVD / flash disku</h3>

<p>Následně je instalaci možné připravit na <b>USB flash disk</b> nebo vytvořit <b>ISO image</b> pro pozdější vypálení na DVD.</p>

<p>V dnešní době, kdy některá PC už nemají DVD mechaniku, velké flash disky se rozdávají jako reklamní předměty, se nabízí vytvořit instalaci na flash disk.</p>

<p>Stačí o kapacitě <b>3 GB</b>. Dosavadní data na flash disku se smažou. Po instalaci Windows stačí flashku zformátovat a půjde normálně používat dál.</p>



<p>U některých starších PC ale může být problém s nabootováním instalace přes USB, takže vypálit DVD s instalací Windows 10 je jistější.</p>



<p><img src="/files/instalace-windows-10/usb.png" alt="Vytvoření média" class="border"></p>





































<h3 id="krok-4">Krok 4 – stažení dat</h3>

<p>Nyní se začnou stahovat data systému a kopírovat na flashku. V případě použití DVD se bude připravovat ISO image, který se po dokončení vypálí na DVD.</p>

<p>Celý proces by měl při rychlém připojení zabrat řádově desítky minut.</p>

<p>Na konci, až bude disk připravený, by se mělo objevit následující:</p>

<p><img src="/files/instalace-windows-10/pripraveny.png" alt="Vytvoření média" class="border"></p>





































<p>Při volbě <i>vytvoření ISO image</i> tento průvodce přímo nabídne možnost vypálení na DVD, kterou jen stačí potvrdit.</p>


<h2 id="aktivace">Aktivace Windows 10</h2>

<p>Windows 10 se při upgradu ze staršího operačního systému od Microsoftu <b>aktivují na základě hardwaru</b>.</p>

<p>Při přeinstalování Windows 10 čistou instalací Windows 10 se potom vše aktivuje samo, protože servery Microsoftu už vědí, že na daném HW je systém aktivovaný.</p>

<p>Není tedy potřeba hledat a opisovat <i>Product Key</i>, vše se provede automaticky po připojení k internetu.</p>





<h2 id="zaloha">Zálohování</h2>

<p>Během doby stahování a připravování instalace je vhodný čas řešit otázku zálohování.</p>

<p>Zálohovat soubory kvůli přeinstalování <b>není úplně nutné</b>.</p>

<p>Pokud se před instalací nebude <b>rušit/formátovat systémový oddíl</b>, původní data mohou být zachována.</p>



<h3 id="windows-old">Složka <code>Windows.old</code></h3>

<p>Instalační program umí veškerý obsah systémového oddílu/disku přesunout do složky <code>Windows.old</code>.</p>


<p>Následně se provede čistá instalace, po které budou všechna původní data právě ve složce <code>C:\Windows.old</code>.</p>

<p>Byla-li na systémovém disku nějaká data, které je třeba zachovat (dokumenty, obrázky, hudba apod.), stačí je tak jen z <code>Windows.old</code> přesunout do nového umístění a následně složku <code>Windows.old</code> <b>vymazat</b>.</p>

<p>Přesunutí souborů v rámci jednoho oddílu bude bleskurychlé, takže obnovení původních souborů nebude trvat spoustu času, jak kdyby se vše kopírovalo na jiný disk a zase zpátky.</p>



<p><b>Je to bezpečné?</b></p>

<blockquote>
  <p>Dělal jsem to od doby <b>Windows Vista</b> asi 10× a nikdy s tímto postupem nebyl žádný problém.</p>
</blockquote>




<h3 id="formatovani">Formátování disku</h3>

<p>V případě, že je potřeba měnit rozdělení diskových oddílů nebo na datech ze systémového disku nezáleží, je možné před instalací <b>zformátovat disk</b>.</p>

<p>Formátování u systémového disku nejde provést ve Windows, jak by se mohlo zdát:</p>


<p><img src="/files/instalace-windows-10/formatovat.png" alt="Pokus o formátování" class="border"></p>












<p>Při pokusu se zobrazí informace, že to opravdu nejde:</p>

<p><img src="/files/instalace-windows-10/nelze.png" alt="Pokus o formátování" class="border"></p>
















<p>Formátování tedy proběhne až po spuštění instalace z flash disku / DVD po restartu počítače v instalačním programu Windows.</p>



<h3 id="jak-zalohovat">Jak zazálohovat?</h3>

<p>V době rychlého internetu je nejprve dobré rozdělit data na:</p>

<ol>
  <li><b>unikátní</b>,</li>
  <li><b>znovu sehnatelná</b></li>
</ol>

<p>Nezbytná (unikátní) data jsou například fotografie (stejnou fotku už zkrátka vyfotit nejspíš nepůjde). Znovu sehnatelný je potom třeba populární film nebo hudba – oboje půjde snadno znovu stáhnout.</p>


<p>Při tomto rozdělení stačí řešit zálohování jen toho nenahraditelného.</p>


<h3 id="kam-zalohovat">Kam zálohovat?</h3>

<ol>
  <li><b>cloud</b> (online)</li>
  <li><b>vlastní média</b></li>
</ol>


<p>Podle toho, jak je člověk paranoidní vs. pohodlný, volí mezi lokální zálohu na vlastní média nebo do cizího (pronajatého) prostoru v cloudu. Nebo nějakou kombinaci, kdy se citlivá data zálohují pouze lokálně a zbytek do cloudu.</p>

<p>Pro zálohování menšího objemu dat (řádově gigabyty) na vlastní média je asi nejsnazší si koupit několik flashdisků, kam se budou data duplikovat.</p>



<p>V případě cloudových řešení jde využít <a href="https://onedrive.live.com/?invref=1171ead590015c51&invsrc=90"><b>OneDrive</b></a> od Microsoftu nebo <a href="https://db.tt/OntVzvKu"><b>Dropbox</b></a>, byť se jedná primárně o služby k synchronisaci a ne k zálohování.</p>

<ul>
  <li><p>Dropbox nabízí zdarma 2 GB dat.</p></li>
  <li>
    <p>OneDrive disponuje zdarma prostorem 5 GB.</p>
  </li>
</ul>

<p>Dostupná data zdarma jde ale lehce navýšit:</p>

<p><img src="/files/instalace-windows-10/onedrive.png" alt="Kapacita na OneDrive" class="border"></p>






























<p>U starších účtů může být kapacita vyšší. Případně lze sbírat různé bonusy, které úložiště ještě navýší. Například registrace přes výše uvedené odkazy navýší kapacitu u Dropboxu i OneDrive o 0,5 GB.</p>

<p>Navýšení prostoru přes zmíněné odkazy dostane jak nově registrovaný účet, tak autor tohoto článku.</p>

<p>Po synchronisaci potřebných dat na Dropbox/OneDrive se po následném zformátování disku a přeinstalování operačního systému všechna data automaticky obnoví z cloudu. Stačí jen nainstalovat příslušný program a přihlásit se do něj.</p>



<h4 id="hodne-dat">Záloha hodně dat</h4>

<p>Pro krátkodobé zálohování velkého množství dat (stovky GB) jde využít měsíční trial versi programu <a href="https://store.code42.com/store/"><b>CrashPlan</b></a>. Nahrávání a stahování dat ale trvá hodně dlouho, nicméně za měsíc by se z vlastní zkušenosti stovky GB měly stihnout.</p>

<p>Datově neomezené úložiště na měsíc zdarma nabízí i <a href="https://www.dropbox.com/business/free-dropbox-trial"><b>Dropbox Business</b></a> (nezkoušel jsem).</p>



<h3 id="co-zalohovat">Co zálohovat?</h3>

<p>Kromě dat jako jsou dokumenty nebo fotky se typicky hodí zálohovat i nastavení některých programů. Pokud si člověk s jejich konfigurací vyhrál, bylo by zbytečné to po reinstalaci Windows dělat znovu.</p>

<p>Nastavení programů je typicky ve složce:</p>

<pre><code>C:\Users\<b>Jméno</b>\AppData\Roaming</code></pre>

<p>Například FTP přístupy a nastavení <b>Total Commanderu</b> jsou ve složce:</p>
    <pre><code>C:\Users\<b>Jméno</b>\AppData\Roaming\GHISLER</code></pre>





<p>Hodí se taktéž projít systémem vytvořené složky jako <i>Dokumenty</i>, <i>Obrázky</i>, <i>Hudba</i>, <i>Plocha</i>, <i>Stažené soubory</i> a podobně, může tam být něco důležitého.</p>





<h2 id="spusteni">Spuštění instalace</h2>

<p>Po připravení instalačního média a případném zazálohováním nezbytných dat je čas na <b>samotnou instalaci</b>.</p>

<p>Pro začátek je nutné <b>restartovat počítač</b> a nabootovat z instalačního média.</p>



<h3 id="bootovani">Bootování instalace</h3>

<p>V závislosti na stavení BIOSu může být aktivní jen bootování z pevného disku. Je zbytečné jen pro účely instalace systému měnit nastavení priority bootování. Stačí vyvolat tzv. bootovací menu (<i lang="en">Boot menu</i>).</p>

<p>Způsob vyvolání boot menu se liší. Krátce po startu PC se obvykle na chvíli zobrazí možné klávesové zkratky pro vstup do BIOSu, do bootovací nabídky nebo pro obnovení počítače.</p>


<p>Tento výpis si lze zastavit klávesou <kbd>Pause</kbd> (na klávesnici bývá vpravo nahoře před numerickým blokem).</p>


<p>Docela často je bootovací nabídka pod klávesou <kbd>F12</kbd>, ale je možné se setkat i s jinými klávesami. Někdy není vyhráno i v případě, že člověk potřebnou klávesu zná – je potřeba ji zmáčknout ve správný okamžik (ne příliš brzo ani pozdě), nejjistější je tak ji mačkat opakovaně.</p>



<p>V případě problémů u některých <b>notebooků</b> může pomoci přimáčknout ještě klávesy <kbd>Alt</kbd> nebo <kbd>Fn</kbd>. Typicky by klávesová zkratka pro bootovací menu i postup, kdy ji zmáčknout, měly být na webu výrobce.</p>

<p>Po úspěšném vyvolání nabídky bootování by se mělo zobrazit něco takového, kde je potřeba vybrat příslušnou volbu v závislosti na instalaci z DVD / flash disku:</p>

<p><img src="/files/instalace-windows-10/boot-menu.jpg" alt="Bootovací nabídka" class="border"></p>


































<h2 id="instalace-windows">Instalace Windows 10</h2>

<p>Po nabootování instalace Windows 10 je postup instalace celkem prostý.</p>

<p>Samotný průběh jde rozdělit do několika kroků.</p>




<h3 id="jazyk">Krok 1 – výběr jazyku</h3>

<p>Na první obrazovce se určuje jazyk, formát času a rozložení klávesnice. Není zde důvod něco měnit a stačí kliknout na <i>Další</i>.</p>

<p><img src="/files/instalace-windows-10/jazyk.jpg" alt="Výběr jazyku" class="border"></p>



























<p>Na další obrazovce stačí vybrat <i>Nainstalovat</i>:</p>

<p><img src="/files/instalace-windows-10/nainstalovat.jpg" alt="Nainstalovat" class="border"></p>
























<p>Tím se spustí instalační program.</p>

<p><img src="/files/instalace-windows-10/spousteni.jpg" alt="Spouštění instalace" class="border"></p>























<h3 id="aktivace">Krok 2 – aktivace</h3>

<p>Protože aktivace proběhne automaticky po připojení k internetu na základě hardware, je potřeba vybrat možnost <i>Nemám Product Key</i>.</p>

<p><img src="/files/instalace-windows-10/aktivace.jpg" alt="Aktivace Windows 10" class="border"></p>






























<h3 id="licence">Krok 3 – licenční podmínky</h3>

<p>Nezbývá než souhlasit:</p>

<p><img src="/files/instalace-windows-10/licence.jpg" alt="Licenční podmínky Windows 10" class="border"></p>




























<h3 id="typ">Krok 4 – typ instalace</h3>

<p>Zde je pro čistou instalaci nutné zvolit pokročilou volbu <i>Vlastní</i>.</p>

<p><img src="/files/instalace-windows-10/typ.jpg" alt="Typ instalace Windows 10" class="border"></p>





























<h3 id="oddily">Krok 5 – výběr oddílů</h3>

<p>Pokud aktuální rozdělení oddílů vyhovuje a na systémovém oddílu je dostatek místa, stačí ho vybrat a pokračovat v instalaci kliknutím na <i>Další</i>. V takovém případě se dosavadní obsah systémového oddílu přesune do složky <code>Windows.old</code>.</p>

<p><img src="/files/instalace-windows-10/vyber-oddilu.jpg" alt="Aktivace Windows 10" class="border"></p>



























<p>Pro úpravy oddílů je nejprve nutné provést jejich odstranění – tím dojde <b>ke smazání všech dat</b>. Vznikne tak <i>nepřidělené místo</i>, z kterého jde vytvořit nový oddíl požadované velikosti vybráním nabídky <i>Nový</i>.</p>

<p><img src="/files/instalace-windows-10/novy.jpg" alt="Aktivace Windows 10" class="border"></p>


































<p>Windows si navíc automaticky vytvoří ještě vlastní oddíl velký cca 500 MB. Nejspíš tam jsou soubory pro spuštění obnovení, bootování a podobně. V přehledu <i>Tento počítač</i> by reservovaný oddíl neměl po dokončení instalace strašit.</p>



<h3 id="instalovani">Krok 6 – instalování</h3>

<p>Následuje časově nejdelší část, kdy se kopírují soubory a stačí jen čekat.</p>

<p><img src="/files/instalace-windows-10/instalovani.jpg" alt="Instaluje se Windows 10" class="border"></p>


























<h2 id="nastaveni">Nastavení PC</h2>

<p>Po dokončení instalace je nezbytné provést pár nastavení:</p>


<h3 id="krok-1">Krok 1 – vlastník počítače</h3>

<p>Při domácím použití nejspíš zvolit <i>Vlastníkem jsem já</i>.</p>

<p><img src="/files/instalace-windows-10/vlastnik.jpg" alt="Vlastník Windows 10" class="border"></p>
















<h3 id="krok-2">Krok 2 – uživatelský účet</h3>


<p>Pro přihlašování do Windows jde použít účet Microsoftu. To je docela praktické, protože se přes něj může synchronisovat nastavení a v případě používání MS služeb není nutné pro ně neustále vyťukávat heslo pro přihlášení.</p>

<p>Účet jde případně vytvořit nový nebo toto nastavení přeskočit – uživatelský účet může být i čistě lokální a účet od Microsoftu jde případě připojit i později.</p>

<p><img src="/files/instalace-windows-10/ucet.jpg" alt="Microsoft účet ve Windows 10" class="border"></p>



























<p>Volba <i>Přeskočit tento krok</i> se hodí i v případě, že záleží na tvaru složky uživatele:</p>

<pre><code>C:\Users\Jméno</code></pre>


<p>Při použití MS účtu se pro pojmenování vezme prvních 5 znaků z loginu, což nemusí vypadat hezky.</p>



<h3 id="krok-3">Krok 3 – nastavení PINu</h3>

<p>Urychlit si přihlašování k počítači jde pomocí PINu. Zadávat po každém zamčení PC běžné heslo k MS účtu by nebylo moc pohodlné.</p>

<p>Pro přihlášení PINem si stačí pamatovat čtyři číslice, které se napíší rychle. Bezpečnost tohoto způsobu přihlašování je zajištěna omezeným počtem chybných pokusů, po kterých je nutné zadat klasické heslo.</p>

<p>PIN slouží pouze pro přihlášení na daném zařízení, takže není ani případně takový problém ho někomu sdělit a následně změnit.</p>

<blockquote>
  <p>Doporučuji PIN používat.</p>
</blockquote>




<h3 id="hotovo">Hotovo</h3>

<p>Tímto by měla být instalace <b>Windows 10</b> dokončená a po krátké přípravě je systém připraven k používání.</p>

<p>Nyní se hodí nainstalovat nějaké aplikace:</p>

<div class="internal-content">
  <ul>
    <li><a href="/windows-programy">50 nejlepších programů pro Windows</a></li>
  </ul>
</div>