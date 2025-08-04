---
title: "GIT"
headline: "GIT"
description: "Jak používat versovací systém GIT ve Windows i macOS."
date: "2014-02-22"
last_modification: "2014-02-22"
status: 0
tags: []
---

Nejen pro práci ve více lidech, ale i pro větší komfort u projektů spravovaných jedním člověkem, je vhodné používat **versovací systém**. Nejpopulárnější je GIT.

Obsáhnout všechny  možnosti GITu není úplně jednoduché, pro běžnou práci ale stačí pár příkazů, které jsou vyjmenovány níže.

## Příkazová řádka, nebo GUI?

GIT jde standardně ovládat dvěma způsoby – prostřednictvím příkazové řádky nebo nějakou aplikací s grafickým rozhraním.

Co je **lepší**?

Osobně se mi osvědčuje kombinace

## GIT v příkazové řádce

Jedna možnost, jak GIT používat, je prostřednictvím příkazové řádky. Ve Windows např. přes PowerShell nebo Git BASH.

## GIT v aplikaci

    - [Where to download native (older) GitHub Desktop?](https://github.com/desktop/desktop/issues/2885)

## Clonování přes SSH, nebo HTTPS?

K repositářím je možné se připojovat přes SSH nebo HTTPS. Obecně je většinou výhodnější používat SSH, protože díky použití certifikátu není nutné při každé operaci zadávat jméno a heslo.

U již existujícího repositáře jde připojení změnit v konfiguračním souboru `.git/config`.

Jak najít, kde je `.git/config` umístěn?

```
git config --list --show-origin
```

### Přechod na SSH

Novou URL jde nastavit následujícím příkazem:

```
git remote set-url origin git@github.com:Jahoda/email-hint.git
```

Nebo v konfiguračním souboru pro daný repositář (`.git/config`) upravit adresu:

```
[remote "origin"]
	**url** = git@github.com:Jahoda/email-hint.git
	fetch = +refs/heads/*:refs/remotes/origin/*
```

## Základní práce

Používání GITu v příkazové řádce pro běžnou práci může vypadat nějak takto:

    Přepnutí na `master` větev:

    ```
git checkout master
```

    Stažení aktuálního stavu:

    ```
git pull
```

    Vytvoření *feature-branch* (větev odvozená od `masteru`), kde se budou provádět změny:

    ```
git branch -b nazev-nove-vetve
```

    Samotná práce.

    Přidání souborů (v tomto případě všech díky `*`):

    ```
git add *
```

    Soubory jde přidávat i jednotlivě:

    ```
git add slozka/* # přidá vše ze „slozka“
git add soubor.txt # přidá „soubor.txt“
```

    *Commit*nutí změněných souborů. *Commit message* by měla popisovat provedené úpravy.

    ```
git commit -m 'Commit message'
```

    Poslání commitu do repositáře:

    ```
git push
```

## Odložení změn (`stash`)

Při některých operacích se může hodit odložit změněné soubory bokem. Třeba, když se je potřeba přepnout do jiné větve, provést operaci jako třeba `git rebase` apod.

Slouží k tomu *stashování*.

```
git stash
```

Poslední stashované úpravy se následně obnoví přes:

```
git stash apply
```

Pro získání starších *stashovaných* změn slouží příkaz:

```
git stash list
```

A následně jde aplikovat stashe podle identifikátoru. Např.:

```
git stash apply stash@{2}
```

    - [Git Tools – Stashing](https://git-scm.com/book/en/v1/Git-Tools-Stashing)
 – více informací o stashování v dokumentaci

## Přejmenování větve

Dojde-li při vytvoření feature-branch například k překlepu, jde ho snadno napravit přejmenováním:

```
git branch -m novy-nazev-vetve
```

Jde přejmenovat i jinou větev než aktuální:

```
git branch -m **vetev-k-prejmenovani** novy-nazev-vetve
```

## Vyčištění větve

V případě, že je cílem vycházet z aktuální podoby určité větve, a v souborech je nějaký *nepořádek*, následujícím způsobem se lze dostat do čisté podoby dané větve (v tomto případě `master`):

```
git fetch --all
```

```
git reset --hard origin/**master**
```

## Zrušení změn souborů

Je-li potřeba zrušit změny v souborech od posledního commitu, řeší to následující příkaz (včetně tečky na konci):

```
git checkout -- .
```

Zrušit změny jde analogicky i v jednotlivých souborech nebo složkách:

```
git checkout cesta/k/souborum/pro/zruseni/zmen
```

### Přepsání souboru z jiné větve

Při uvedení názvu větve se soubor přepíše právě z ní:

```
git checkout master -- /cesta/k/souboru.css
```

To se hodí hlavně při rebasování a mergeování.

## Rozdíl mezi `pull` a `fetch`

Pro získání aktuálního obsahu aktuální větve se používají příkazy `git pull` nebo `git fetch`. Jaký je rozdíl?

Příkaz `git pull` provede `git fetch` + `git merge`.

V praxi to znamená, že `git pull` v situaci, kdy existují lokální změny a na projektu pracuje více lidí, může vytvořit nechtěnné *merge commity*.

Samotný `git fetch` tímto netrpí, takže je použitelný i během práce.

## Změna commitu

V případě, že se `commit`nou nějaké změny a až potom člověk zjistí problém, který chce ještě opravit, bývá většinou výhodnější přepsat dříve provedný `commit`.

Slouží k tomu parametr `--amend`:

```
git add *
git commit **--amend**
```

Pokud není potřeba měnit *commit message*, lze použít přepínač `--no-edit`:

```
git config --global alias.**amend** "commit --amend --no-edit"
```

Úpravy se tímto připojí k předchozímu `commit`u a už je stačí jen `push`nout. Při použití `push` do vzdáleného repositáře nejspíš dojde k chybě. Nepracuje-li na cílové větvi někdo jiný, řešení je použít `push` s `--force` parametrem nebo zkráceně:

```
git push **-f**
```

### Pozor na *force* push

Používat parametr `--force`/`-f` je dost nebezpečné v případě, že s danou větví pracuje více lidí současně. V tom případě dojde k tomu, že se případné předchozí změny nahradí aktuálním stavem člověka, který jako poslední napíše:

```
git push -f
```

Proto je lepší používat parametr `--force-with-lease`:

```
git push --force-with-lease
```

Je trochu škoda, že tohle není výchozí chování, protože je tento zápis hodně dlouhý. Jde to ale obejít aliasem přidaným následovně:

```
git config --global alias.pushf "push --force-with-lease"
```

Nyní jde pro *bezpečný* force push psát prosté:

```
git pushf
```

    - Atlassian Developers: [--force considered harmful; understanding git's --force-with-lease](https://developer.atlassian.com/blog/2015/04/force-with-lease/)

### Změna autora

Změnit jde i autor *commitu*:

```
git commit --amend --author="Bohumil Jahoda &lt;jahoda@jecas.cz>"
```

### Vrácení `--amend`u

Pokud proběhl *ammend* omylem, je možné zachovat původní *commit* a nové věci dát do zvláštního *commitu* následujícím způsobem.

```
git reset --soft HEAD@{1}
git commit -C HEAD@{1}
```

### Změna určitého commitu

Předchozí část se týkala úpravy posledního commitu. Co ale když je potřeba upravit třeba 5. commit od konce?

K tomu slouží tzv. *interaktivní rebase*. Pro úpravu commitu s hashem `3287d35` stačí spustit následující:

```
git rebase -i 3287d35**^**
```

Nyní by se měla zobrazit výzva k úpravám (ve **Windows** se zpravidla otevře textový soubor, který je potřeba upravit, uložit a zavřít):

```
pick 3287d35b upravovaný commit
pick 8f2f998f novější commit
pick 6c58f379 ještě novější commit
```

U upravovaného commitu (ten nahoře) je třeba přespat `pick` na `edit`.

Potom je možné provádět úpravy. Když je hotovo:

  - `git add *` — přidat upravené soubory (v tomto případě všechny),

  - `git commit --amend` – připojit úpravy ke commitu

  - `git rebase --continue` – pokračovat v rebaseování

  - `git push -f` – *force-push* změn (jelikož se změnila historie, je nutný force-push)

### Úprava historie

Díky interaktivnímu rebaseování je komplětně měnit historii commitů. Kromě změny *commit message* je možné i spojování, zahazování nebo přeházení commitů.

Stačí sledovat průvodce po napsání:

```
git rebase -i
```

### Oprava commitu (`fixup`)

Pro opravy chyb v commitech má git *fixup*:

```
git config --global alias.fix "commit --fixup=HEAD"
```

Alias pro *autosquash*:

```
git config --global alias.rbi "rebase -i --autosquash"
```

### Problém při spojování

Při zvolení možnosti `s`/`f` (*squash*/*fixup*) může dojít k následující chybě:

```
error: cannot 'squash' without a previous commit
error: cannot 'fixup' without a previous commit
```

Je-li cílem zkrátka jen všechny vybrané commity spojit do jednoho, řešením je pro poslední commit použít příkaz `reword` a následně mu přepsat text zprávy:

```
r 01cc5a08 poslední commit
s 04c1cb13 předposlední
s c0d6008a první commit message
```

## Push do vzdáleného repositáře

Je-li potřeba dostat `commit`y do vzdáleného repositáře (např. hostovaného na GitHubu), musí se nejprve *propojit* lokální větev se svým *remote* protějškem:

```
git push -u origin nazev-vetve
```

Případně stačí použít `HEAD`, pokud mají být názvy větví shodné:

```
git push -u origin HEAD
```

Přepínač `-u` je zkratka pro:

```
git push origin nazev-vetve ; git branch --set-upstream nazev-vetve origin/nazev-vetve
```

Nastavit *upstream* nemusí být vždy žádoucí. Docela běžné je, že při pushnutí do nějaké větve se provede deploy třeba na testovací prostředí.

V tom případě není potřeba měnit upstream, ale jen pushnout lokální větev do vzdálené větve s jiným názvem (s přepínačem `-f` pro ignorování konfliktů). Místo názvu aktuální větve jde použít `HEAD`:

```
git push origin HEAD:test -f
```

Zjistit, kam je **větev vzdáleně napojena** jde příkazem:

```
git branch -vv
```

## Vzdálený repositář

Odstranění posledního *commitu* z lokálního i remote repositáře:

```
git reset HEAD^
git push origin +HEAD
```

Pro odstranění pouze ze vzdáleného *repa* poslouží:

```
git push origin +HEAD^:nazev-vzdalene-vetve
```

Změny zůstanou pouze lokálně. 

## Práce s větvemi

Zvlášť ve více lidech se pracuje s více větvemi najednou. Jednotlivé úpravy se potom provádí v separátních větvích, které se po dokončení spojí (`merge`) s tou hlavní (typicky `master`).

### Feature branch

Vytvoření nové větve odvozené od `master` větve se provede následovně:

```
git checkout master # přepnout na master větev
git pull # stáhnout aktuální stav
git checkout -b feature-branch # vytvoří se větev s názvem "feature-branch"
```

### Přidání změn a commit

Následuje samotná *práce*, kdy se mění obsah souboru apod. Po dokončení je třeba nejprve přidat upravené soubory:

```
git add *
```

Výše uvedený příkaz přidá úplně všechno (díky hvězdičce). Přidávat jde ale i vybrané soubory:

```
git add styl.css # přidá soubor "styl.css"
```

Osah celé složky:

```
git add slozka/*
```

Nebo třeba všechny soubory s určitou koncovkou:

```
git add *.css # přidá všechny CSS soubory
```

Po přidání souboru jde provést `commit`. Bývá dobrým zvykem zapsat tzv. *commit message* (zprávu popisující, co daný *commit* dělá:

```
git commit -m "Text commit zprávy"
```

### Obsah commit message

Jednotlivé *commity* je dobré vhodně pojmenovat.

    - [Commit Message Generator](http://whatthecommit.com) – generátor commitů, které by člověk raději neměl používat

[https://confluence.echit.cz/display/3MW/KN+team+git+commit+message+rules](https://confluence.echit.cz/display/3MW/KN+team+git+commit+message+rules)

## Co se děje?

V pří:

```
git status
```

## Reset

S GITem jsou bohužel často nějaké problémy při slučování různých versí. 100% spolehlivé řešení je zkopírovat aktuální funkční podobu. Zjistit soubory, které se změnily:

Názvy souborů, které se při commitu změnily:

```
git show **&lt;%identifikátor commitu%>** --name-only

```

Resetovat stav do nejnovější podoby, nahrát a přepsat upravené soubory zpět a pokusit se znovu commitovat.

```
git branch --set-upstream-to=origin/&lt;branch> &lt;local branch>

```

## Vrácení commitu

```
git reset --soft HEAD~1
```

```
git reset --hard HEAD~1
```

## Revertování commitu

Pokud je cílem mít v historii záznam o tom, že se commit vrátil. Například při nasazování dočasných úprav.

```
git revert -m 1 &lt;hash commitu>
```

## Smazání větve

```
git branch -D nazev-vetve
```

## Konce řádků

```
git config --global core.autocrlf true
```

    - [Dealing with line endings](https://help.github.com/articles/dealing-with-line-endings/)

## Záchrana a oprava přehmatů `git reflog`

Pokud dojde k nějaké mylné operaci, pořád jde situaci zachránit:

```
git reflog
```

Tímto příkazem se zobrazí seznam provedených operací:

```
c81507645a (HEAD -> nazev-vetve) HEAD@{0}: rebase -i (abort): updating HEAD
**4693a1e3de** HEAD@{1}: rebase: aborting
4693a1e3de HEAD@{2}: rebase -i (skip): updating HEAD
```

Identifikátor stačí použít v příkazu `git checkout` a stav se vrátí do příslušného stavu:

```
git checkout **4693a1e3de**
```

## Aliasy

Vypsání všech aliasů:

```
git config --get-regexp alias
```

Umístění `.gitconfig` je `C:\Users\bjahoda1`

```
[alias]
	fix = commit --fixup=HEAD
	rbi = rebase -i --autosquash
	amend = commit --amend --no-edit
	undo = reset HEAD~1
```

```
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
```

## Jak založit prázdný adresář

GIT standardně neversuje prázdné adresáře. Občas se ale hodí prázdný adresář mít, třeba pro případ, že se má do něj něco zapisovat a skript by neměl práva pro vytvoření.

Docílit toho jde vytvořením souboru `.gitignore` v prázdné složce s následujícím obsahem:

```
# Ignoruje se vše v této složce
*
# S výjimkou tohoto souboru
!.gitignore
```

## fatal: bad object refs/remotes/origin/HEAD

```
git remote set-head origin --auto
```