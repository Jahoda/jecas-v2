---
title: "GIT"
headline: "GIT"
description: "Jak používat versovací systém GIT ve Windows i macOS."
date: "2014-02-22"
last_modification: "2014-02-22"
status: 0
tags: []
format: "html"
---

<p>Nejen pro práci ve více lidech, ale i pro větší komfort u projektů spravovaných jedním člověkem, je vhodné používat <b>versovací systém</b>. Nejpopulárnější je GIT.</p>

<p>Obsáhnout všechny  možnosti GITu není úplně jednoduché, pro běžnou práci ale stačí pár příkazů, které jsou vyjmenovány níže.</p>







<h2 id="gui-bash">Příkazová řádka, nebo GUI?</h2>

<p>GIT jde standardně ovládat dvěma způsoby – prostřednictvím příkazové řádky nebo nějakou aplikací s grafickým rozhraním.</p>

<p>Co je <b>lepší</b>?</p>

<p>Osobně se mi osvědčuje kombinace</p>


<h2 id="prikazova-radka">GIT v příkazové řádce</h2>

<p>Jedna možnost, jak GIT používat, je prostřednictvím příkazové řádky. Ve Windows např. přes PowerShell nebo Git BASH.</p>


<h2 id="aplikace">GIT v aplikaci</h2>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/desktop/desktop/issues/2885">Where to download native (older) GitHub Desktop?</a></li>
  </ul>
</div>




<h2 id="ssh">Clonování přes SSH, nebo HTTPS?</h2>

<p>K repositářím je možné se připojovat přes SSH nebo HTTPS. Obecně je většinou výhodnější používat SSH, protože díky použití certifikátu není nutné při každé operaci zadávat jméno a heslo.</p>

<p>U již existujícího repositáře jde připojení změnit v konfiguračním souboru <code>.git/config</code>.</p>

<p>Jak najít, kde je <code>.git/config</code> umístěn?</p>

<pre><code>git config --list --show-origin</code></pre>











<h3 id="zmena-ssh">Přechod na SSH</h3>

<p>Novou URL jde nastavit následujícím příkazem:</p>


<pre><code>git remote set-url origin git@github.com:Jahoda/email-hint.git</code></pre>






<p>Nebo v konfiguračním souboru pro daný repositář (<code>.git/config</code>) upravit adresu:</p>

<pre><code>[remote "origin"]
	<b>url</b> = git@github.com:Jahoda/email-hint.git
	fetch = +refs/heads/*:refs/remotes/origin/*</code></pre>











<h2 id="prace">Základní práce</h2>

<p>Používání GITu v příkazové řádce pro běžnou práci může vypadat nějak takto:</p>

<ol>
  <li>
    <p>Přepnutí na <code>master</code> větev:</p>
    <pre><code>git checkout master</code></pre>
  </li>
  
  
  
  
  <li>
    <p>Stažení aktuálního stavu:</p>
    
    <pre><code>git pull</code></pre>
  </li>
  
  
  
  
  
  
  
  
  <li>
    <p>Vytvoření <i lang="en">feature-branch</i> (větev odvozená od <code>masteru</code>), kde se budou provádět změny:</p>
    
    <pre><code>git branch -b nazev-nove-vetve</code></pre>
  </li>
  
  
  
  
  <li>
    <p>Samotná práce.</p>
  </li>
  
  
  <li>
    <p>Přidání souborů (v tomto případě všech díky <code>*</code>):</p>
    
    <pre><code>git add *</code></pre>
    
    <p>Soubory jde přidávat i jednotlivě:</p>
    
    
    <pre><code>git add slozka/* # přidá vše ze „slozka“
git add soubor.txt # přidá „soubor.txt“</code></pre>
  </li>
  
  
  
  
  
  
  
  
  <li>
    <p><i lang="en">Commit</i>nutí změněných souborů. <i lang="en">Commit message</i> by měla popisovat provedené úpravy.</p>  
    
    <pre><code>git commit -m 'Commit message'</code></pre>
  </li>
  
  
  <li>
    <p>Poslání commitu do repositáře:</p>
    
    <pre><code>git push</code></pre>
  </li>
</ol>








<h2 id="stash">Odložení změn (<code>stash</code>)</h2>

<p>Při některých operacích se může hodit odložit změněné soubory bokem. Třeba, když se je potřeba přepnout do jiné větve, provést operaci jako třeba <code>git rebase</code> apod.</p>

<p>Slouží k tomu <i>stashování</i>.</p>

<pre><code>git stash</code></pre>


<p>Poslední stashované úpravy se následně obnoví přes:</p>

<pre><code>git stash apply</code></pre>




<p>Pro získání starších <i>stashovaných</i> změn slouží příkaz:</p>

<pre><code>git stash list</code></pre>





<p>A následně jde aplikovat stashe podle identifikátoru. Např.:</p>

<pre><code>git stash apply stash@{2}</code></pre>

<div class="external-content">
  <ul>
    <li><a href="https://git-scm.com/book/en/v1/Git-Tools-Stashing">Git Tools – Stashing</a></li> – více informací o stashování v dokumentaci
  </ul>
</div>






















<h2 id="prejmenovani">Přejmenování větve</h2>

<p>Dojde-li při vytvoření feature-branch například k překlepu, jde ho snadno napravit přejmenováním:</p>

<pre><code>git branch -m novy-nazev-vetve</code></pre>

<p>Jde přejmenovat i jinou větev než aktuální:</p>


<pre><code>git branch -m <b>vetev-k-prejmenovani</b> novy-nazev-vetve</code></pre>












<h2 id="cista-vetev">Vyčištění větve</h2>

<p>V případě, že je cílem vycházet z aktuální podoby určité větve, a v souborech je nějaký <i>nepořádek</i>, následujícím způsobem se lze dostat do čisté podoby dané větve (v tomto případě <code>master</code>):</p>

<pre><code>git fetch --all</code></pre>

<pre><code>git reset --hard origin/<b>master</b></code></pre>















<h2 id="zruseni-zmen">Zrušení změn souborů</h2>

<p>Je-li potřeba zrušit změny v souborech od posledního commitu, řeší to následující příkaz (včetně tečky na konci):</p>

<pre><code>git checkout -- .</code></pre>




<p>Zrušit změny jde analogicky i v jednotlivých souborech nebo složkách:</p>

<pre><code>git checkout cesta/k/souborum/pro/zruseni/zmen</code></pre>













<h3 id="zruseni-jina-vetev">Přepsání souboru z jiné větve</h3>

<p>Při uvedení názvu větve se soubor přepíše právě z ní:</p>

<pre><code>git checkout master -- /cesta/k/souboru.css</code></pre>



<p>To se hodí hlavně při rebasování a mergeování.</p>








<h2 id="pull-fetch">Rozdíl mezi <code>pull</code> a <code>fetch</code></h2>

<p>Pro získání aktuálního obsahu aktuální větve se používají příkazy <code>git pull</code> nebo <code>git fetch</code>. Jaký je rozdíl?</p>

<p>Příkaz <code>git pull</code> provede <code>git fetch</code> + <code>git merge</code>.</p>

<p>V praxi to znamená, že <code>git pull</code> v situaci, kdy existují lokální změny a na projektu pracuje více lidí, může vytvořit nechtěnné <i>merge commity</i>.</p>

<p>Samotný <code>git fetch</code> tímto netrpí, takže je použitelný i během práce.</p>






<h2 id="ammend">Změna commitu</h2>

<p>V případě, že se <code>commit</code>nou nějaké změny a až potom člověk zjistí problém, který chce ještě opravit, bývá většinou výhodnější přepsat dříve provedný <code>commit</code>.</p>

<p>Slouží k tomu parametr <code>--amend</code>:</p>


<pre><code>git add *
git commit <b>--amend</b></code></pre>










<p>Pokud není potřeba měnit <i lang="en">commit message</i>, lze použít přepínač <code>--no-edit</code>:</p>

<pre><code>git config --global alias.<b>amend</b> "commit --amend --no-edit"</code></pre>

<p>Úpravy se tímto připojí k předchozímu <code>commit</code>u a už je stačí jen <code>push</code>nout. Při použití <code>push</code> do vzdáleného repositáře nejspíš dojde k chybě. Nepracuje-li na cílové větvi někdo jiný, řešení je použít <code>push</code> s <code>--force</code> parametrem nebo zkráceně:</p>

<pre><code>git push <b>-f</b></code></pre>





<h3 id="force">Pozor na <i>force</i> push</h3>

<p>Používat parametr <code>--force</code>/<code>-f</code> je dost nebezpečné v případě, že s danou větví pracuje více lidí současně. V tom případě dojde k tomu, že se případné předchozí změny nahradí aktuálním stavem člověka, který jako poslední napíše:</p>

<pre><code>git push -f</code></pre>


<p>Proto je lepší používat parametr <code>--force-with-lease</code>:</p>

<pre><code>git push --force-with-lease</code></pre>

<p>Je trochu škoda, že tohle není výchozí chování, protože je tento zápis hodně dlouhý. Jde to ale obejít aliasem přidaným následovně:</p>

<pre><code>git config --global alias.pushf "push --force-with-lease"</code></pre>

<p>Nyní jde pro <i>bezpečný</i> force push psát prosté:</p>

<pre><code>git pushf</code></pre>

<div class="external-content">
  <ul>
    <li>Atlassian Developers: <a href="https://developer.atlassian.com/blog/2015/04/force-with-lease/">--force considered harmful; understanding git's --force-with-lease</a></li>
  </ul>
</div>






















<h3 id="autor">Změna autora</h3>

<p>Změnit jde i autor <i>commitu</i>:</p>

<pre><code>git commit --amend --author="Bohumil Jahoda &lt;jahoda@jecas.cz>"</code></pre>

<h3 id="amend-vratit">Vrácení <code>--amend</code>u</h3>

<p>Pokud proběhl <i>ammend</i> omylem, je možné zachovat původní <i>commit</i> a nové věci dát do zvláštního <i>commitu</i> následujícím způsobem.</p>

<pre><code>git reset --soft HEAD@{1}
git commit -C HEAD@{1}</code></pre>


<h3 id="zmena-predchoziho">Změna určitého commitu</h3>

<p>Předchozí část se týkala úpravy posledního commitu. Co ale když je potřeba upravit třeba 5. commit od konce?</p>

<p>K tomu slouží tzv. <i>interaktivní rebase</i>. Pro úpravu commitu s hashem <code>3287d35</code> stačí spustit následující:</p>

<pre><code>git rebase -i 3287d35<b>^</b></code></pre>


<p>Nyní by se měla zobrazit výzva k úpravám (ve <b>Windows</b> se zpravidla otevře textový soubor, který je potřeba upravit, uložit a zavřít):</p>

<pre><code>pick 3287d35b upravovaný commit
pick 8f2f998f novější commit
pick 6c58f379 ještě novější commit</code></pre>












<p>U upravovaného commitu (ten nahoře) je třeba přespat <code>pick</code> na <code>edit</code>.</p>

<p>Potom je možné provádět úpravy. Když je hotovo:</p>

<ol>
  <li><code>git add *</code> — přidat upravené soubory (v tomto případě všechny),</li>
  <li><code>git commit --amend</code> – připojit úpravy ke commitu</li>
  <li><code>git rebase --continue</code> – pokračovat v rebaseování</li>
  <li><code>git push -f</code> – <i>force-push</i> změn (jelikož se změnila historie, je nutný force-push)</li>
</ol>




<h3 id="rebase-i">Úprava historie</h3>

<p>Díky interaktivnímu rebaseování je komplětně měnit historii commitů. Kromě změny <i lang="en">commit message</i> je možné i spojování, zahazování nebo přeházení commitů.</p>

<p>Stačí sledovat průvodce po napsání:</p>

<pre><code>git rebase -i</code></pre>










<h3 id="fixup">Oprava commitu (<code>fixup</code>)</h3>

<p>Pro opravy chyb v commitech má git <i lang="en">fixup</i>:</p>

<pre><code>git config --global alias.fix "commit --fixup=HEAD"</code></pre>

<p>Alias pro <i>autosquash</i>:</p>

<pre><code>git config --global alias.rbi "rebase -i --autosquash"</code></pre>


<h3 id="problem-spojovani">Problém při spojování</h3>

<p>Při zvolení možnosti <code>s</code>/<code>f</code> (<i lang="en">squash</i>/<i lang="en">fixup</i>) může dojít k následující chybě:</p>

<pre><code>error: cannot 'squash' without a previous commit
error: cannot 'fixup' without a previous commit</code></pre>






<p>Je-li cílem zkrátka jen všechny vybrané commity spojit do jednoho, řešením je pro poslední commit použít příkaz <code>reword</code> a následně mu přepsat text zprávy:</p>

<pre><code>r 01cc5a08 poslední commit
s 04c1cb13 předposlední
s c0d6008a první commit message</code></pre>



<h2 id="push-remote">Push do vzdáleného repositáře</h2>

<p>Je-li potřeba dostat <code>commit</code>y do vzdáleného repositáře (např. hostovaného na GitHubu), musí se nejprve <i>propojit</i> lokální větev se svým <i>remote</i> protějškem:</p>

<pre><code>git push -u origin nazev-vetve</code></pre>

<p>Případně stačí použít <code>HEAD</code>, pokud mají být názvy větví shodné:</p>

<pre><code>git push -u origin HEAD</code></pre>


<p>Přepínač <code>-u</code> je zkratka pro:</p>

<pre><code>git push origin nazev-vetve ; git branch --set-upstream nazev-vetve origin/nazev-vetve</code></pre>




<p>Nastavit <i>upstream</i> nemusí být vždy žádoucí. Docela běžné je, že při pushnutí do nějaké větve se provede deploy třeba na testovací prostředí.</p>

<p>V tom případě není potřeba měnit upstream, ale jen pushnout lokální větev do vzdálené větve s jiným názvem (s přepínačem <code>-f</code> pro ignorování konfliktů). Místo názvu aktuální větve jde použít <code>HEAD</code>:</p>

<pre><code>git push origin HEAD:test -f</code></pre>


<p>Zjistit, kam je <b>větev vzdáleně napojena</b> jde příkazem:</p>


<pre><code>git branch -vv</code></pre>


<h2 id="remote">Vzdálený repositář</h2>

<p>Odstranění posledního <i>commitu</i> z lokálního i remote repositáře:</p>

<pre><code>git reset HEAD^
git push origin +HEAD</code></pre>

<p>Pro odstranění pouze ze vzdáleného <i>repa</i> poslouží:</p>

<pre><code>git push origin +HEAD^:nazev-vzdalene-vetve</code></pre>

<p>Změny zůstanou pouze lokálně. </p>















<h2 id="branch">Práce s větvemi</h2>

<p>Zvlášť ve více lidech se pracuje s více větvemi najednou. Jednotlivé úpravy se potom provádí v separátních větvích, které se po dokončení spojí (<code>merge</code>) s tou hlavní (typicky <code>master</code>).</p>



<h3 id="feature-branch">Feature branch</h3>

<p>Vytvoření nové větve odvozené od <code>master</code> větve se provede následovně:</p>

<pre><code>git checkout master # přepnout na master větev
git pull # stáhnout aktuální stav
git checkout -b feature-branch # vytvoří se větev s názvem "feature-branch"</code></pre>













<h3 id="commit">Přidání změn a commit</h3>

<p>Následuje samotná <i>práce</i>, kdy se mění obsah souboru apod. Po dokončení je třeba nejprve přidat upravené soubory:</p>

<pre><code>git add *</code></pre>





<p>Výše uvedený příkaz přidá úplně všechno (díky hvězdičce). Přidávat jde ale i vybrané soubory:</p>



<pre><code>git add styl.css # přidá soubor "styl.css"</code></pre>







<p>Osah celé složky:</p>

<pre><code>git add slozka/*</code></pre>




<p>Nebo třeba všechny soubory s určitou koncovkou:</p>


<pre><code>git add *.css # přidá všechny CSS soubory</code></pre>









<p>Po přidání souboru jde provést <code>commit</code>. Bývá dobrým zvykem zapsat tzv. <i>commit message</i> (zprávu popisující, co daný <i>commit</i> dělá:</p>

<pre><code>git commit -m "Text commit zprávy"</code></pre>







<h3 id="message">Obsah commit message</h3>

<p>Jednotlivé <i>commity</i> je dobré vhodně pojmenovat.</p>

<div class="external-content">
  <ul>
    <li><a href="http://whatthecommit.com">Commit Message Generator</a> – generátor commitů, které by člověk raději neměl používat</li>
  </ul>
</div>

<a href="https://confluence.echit.cz/display/3MW/KN+team+git+commit+message+rules">https://confluence.echit.cz/display/3MW/KN+team+git+commit+message+rules</a>


<h2 id="stav">Co se děje?</h2>

<p>V pří:</p>

<pre><code>git status</code></pre>












<h2 id="reset">Reset</h2>

<p>S GITem jsou bohužel často nějaké problémy při slučování různých versí. 100% spolehlivé řešení je zkopírovat aktuální funkční podobu. Zjistit soubory, které se změnily:</p>

<p>Názvy souborů, které se při commitu změnily:</p>
<pre><code>git show <b>&lt;%identifikátor commitu%></b> --name-only
</code></pre>

<p>Resetovat stav do nejnovější podoby, nahrát a přepsat upravené soubory zpět a pokusit se znovu commitovat.</p>

<pre><code>git branch --set-upstream-to=origin/&lt;branch> &lt;local branch>
</code></pre>
















<h2 id="vratit">Vrácení commitu</h2>

<pre><code>git reset --soft HEAD~1</code></pre>
<pre><code>git reset --hard HEAD~1</code></pre>














<h2 id="revert">Revertování commitu</h2>

<p>Pokud je cílem mít v historii záznam o tom, že se commit vrátil. Například při nasazování dočasných úprav.</p>

<pre><code>git revert -m 1 &lt;hash commitu></code></pre>









<h2 id="smazani">Smazání větve</h2>

<pre><code>git branch -D nazev-vetve</code></pre>










<h2 id="konce">Konce řádků</h2>

<pre><code>git config --global core.autocrlf true</code></pre>

<div class="external-content">
  <ul>
    <li><a href="https://help.github.com/articles/dealing-with-line-endings/">Dealing with line endings</a></li>
  </ul>
</div>








<h2 id="reflog">Záchrana a oprava přehmatů <code>git reflog</code></h2>

<p>Pokud dojde k nějaké mylné operaci, pořád jde situaci zachránit:</p>

<pre><code>git reflog</code></pre>









<p>Tímto příkazem se zobrazí seznam provedených operací:</p>

<pre><code>c81507645a (HEAD -> nazev-vetve) HEAD@{0}: rebase -i (abort): updating HEAD
<b>4693a1e3de</b> HEAD@{1}: rebase: aborting
4693a1e3de HEAD@{2}: rebase -i (skip): updating HEAD</code></pre>







<p>Identifikátor stačí použít v příkazu <code>git checkout</code> a stav se vrátí do příslušného stavu:</p>

<pre><code>git checkout <b>4693a1e3de</b></code></pre>






















<h2 id="alias">Aliasy</h2>

<p>Vypsání všech aliasů:</p>

<pre><code>git config --get-regexp alias</code></pre>

<p>Umístění <code>.gitconfig</code> je <code>C:\Users\bjahoda1</code></p>


<pre><code>[alias]
	fix = commit --fixup=HEAD
	rbi = rebase -i --autosquash
	amend = commit --amend --no-edit
	undo = reset HEAD~1</code></pre>

<pre><code>$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status</code></pre>

<h2 id="prazdny-adresar">Jak založit prázdný adresář</h2>

<p>GIT standardně neversuje prázdné adresáře. Občas se ale hodí prázdný adresář mít, třeba pro případ, že se má do něj něco zapisovat a skript by neměl práva pro vytvoření.</p>

<p>Docílit toho jde vytvořením souboru <code>.gitignore</code> v prázdné složce s následujícím obsahem:</p>

<pre><code># Ignoruje se vše v této složce
*
# S výjimkou tohoto souboru
!.gitignore</code></pre>


<h2 id="bad-object">fatal: bad object refs/remotes/origin/HEAD</h2>

<pre><code>git remote set-head origin --auto</code></pre>