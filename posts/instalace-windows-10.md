---
title: "Jak přeinstalovat Windows 10"
headline: "Reinstalace Windows 10"
description: "Jak přeinstalovat Windows 10 a zlepšit tak výkon PC. Detailní postup krok za krokem."
date: "2015-11-17"
last_modification: "2015-11-25"
status: 1
tags: ["Produktivita", "Windows"]
---

Při přechodu na [**Windows 10**](/windows-10) ze **Windows 7/8** je možné provést upgrade se zachováním všech dat a nainstalovaných programů prostřednictvím Windows Update.

Upgrade na **W10** při ponechání původních dat na první pohled celkem funguje. Pro maximální výkon a stabilitu je ale lepší **provést čistou instalaci**.

Je to výhodné i z pohledu místa na disku, protože se tím odstraní řada aplikací, které už člověk nepoužívá.

Jak na to?

## Stažení Windows 10

Stáhnout Windows 10 jde na následující stránce:

    - [Download Windows 10](https://www.microsoft.com/cs-cz/software-download/windows10) – velikost je do 3 GB

Místo tlačítka **Upgradovat** stačí kliknout na **Stáhnout nástroj**:

Tím se stáhne malý program, který slouží pro vytvoření instalačního média **Windows 10**.

Po stažení se spustí krátký průvodce:

### Krok 1 – instalační médium

Vytvoření instalačního média místo upgradu počítače:

### Krok 2 – typ systému

Nyní je třeba zvolit typ operačního systému. Průvodce dokáže nastavení detekovat na základě aktuální instalace.

Připravit si instalaci jde i pro jiné PC. V takovém případě je potřeba odškrtnout *doporučené možnosti* a zvolit si jazyk, edici a architekturu systému dle libosti (lépe řečeno s ohledem na dostupnou licenci a HW cílového počítače).

### Krok 3 – vytvoření DVD / flash disku

Následně je instalaci možné připravit na **USB flash disk** nebo vytvořit **ISO image** pro pozdější vypálení na DVD.

V dnešní době, kdy některá PC už nemají DVD mechaniku, velké flash disky se rozdávají jako reklamní předměty, se nabízí vytvořit instalaci na flash disk.

Stačí o kapacitě **3 GB**. Dosavadní data na flash disku se smažou. Po instalaci Windows stačí flashku zformátovat a půjde normálně používat dál.

U některých starších PC ale může být problém s nabootováním instalace přes USB, takže vypálit DVD s instalací Windows 10 je jistější.

### Krok 4 – stažení dat

Nyní se začnou stahovat data systému a kopírovat na flashku. V případě použití DVD se bude připravovat ISO image, který se po dokončení vypálí na DVD.

Celý proces by měl při rychlém připojení zabrat řádově desítky minut.

Na konci, až bude disk připravený, by se mělo objevit následující:

Při volbě *vytvoření ISO image* tento průvodce přímo nabídne možnost vypálení na DVD, kterou jen stačí potvrdit.

## Aktivace Windows 10

Windows 10 se při upgradu ze staršího operačního systému od Microsoftu **aktivují na základě hardwaru**.

Při přeinstalování Windows 10 čistou instalací Windows 10 se potom vše aktivuje samo, protože servery Microsoftu už vědí, že na daném HW je systém aktivovaný.

Není tedy potřeba hledat a opisovat *Product Key*, vše se provede automaticky po připojení k internetu.

## Zálohování

Během doby stahování a připravování instalace je vhodný čas řešit otázku zálohování.

Zálohovat soubory kvůli přeinstalování **není úplně nutné**.

Pokud se před instalací nebude **rušit/formátovat systémový oddíl**, původní data mohou být zachována.

### Složka `Windows.old`

Instalační program umí veškerý obsah systémového oddílu/disku přesunout do složky `Windows.old`.

Následně se provede čistá instalace, po které budou všechna původní data právě ve složce `C:\Windows.old`.

Byla-li na systémovém disku nějaká data, které je třeba zachovat (dokumenty, obrázky, hudba apod.), stačí je tak jen z `Windows.old` přesunout do nového umístění a následně složku `Windows.old` **vymazat**.

Přesunutí souborů v rámci jednoho oddílu bude bleskurychlé, takže obnovení původních souborů nebude trvat spoustu času, jak kdyby se vše kopírovalo na jiný disk a zase zpátky.

**Je to bezpečné?**

  Dělal jsem to od doby **Windows Vista** asi 10× a nikdy s tímto postupem nebyl žádný problém.

### Formátování disku

V případě, že je potřeba měnit rozdělení diskových oddílů nebo na datech ze systémového disku nezáleží, je možné před instalací **zformátovat disk**.

Formátování u systémového disku nejde provést ve Windows, jak by se mohlo zdát:

Při pokusu se zobrazí informace, že to opravdu nejde:

Formátování tedy proběhne až po spuštění instalace z flash disku / DVD po restartu počítače v instalačním programu Windows.

### Jak zazálohovat?

V době rychlého internetu je nejprve dobré rozdělit data na:

  - **unikátní**,

  - **znovu sehnatelná**

Nezbytná (unikátní) data jsou například fotografie (stejnou fotku už zkrátka vyfotit nejspíš nepůjde). Znovu sehnatelný je potom třeba populární film nebo hudba – oboje půjde snadno znovu stáhnout.

Při tomto rozdělení stačí řešit zálohování jen toho nenahraditelného.

### Kam zálohovat?

  - **cloud** (online)

  - **vlastní média**

Podle toho, jak je člověk paranoidní vs. pohodlný, volí mezi lokální zálohu na vlastní média nebo do cizího (pronajatého) prostoru v cloudu. Nebo nějakou kombinaci, kdy se citlivá data zálohují pouze lokálně a zbytek do cloudu.

Pro zálohování menšího objemu dat (řádově gigabyty) na vlastní média je asi nejsnazší si koupit několik flashdisků, kam se budou data duplikovat.

V případě cloudových řešení jde využít [**OneDrive**](https://onedrive.live.com/?invref=1171ead590015c51&invsrc=90) od Microsoftu nebo [**Dropbox**](https://db.tt/OntVzvKu), byť se jedná primárně o služby k synchronisaci a ne k zálohování.

  Dropbox nabízí zdarma 2 GB dat.

    OneDrive disponuje zdarma prostorem 5 GB.

Dostupná data zdarma jde ale lehce navýšit:

U starších účtů může být kapacita vyšší. Případně lze sbírat různé bonusy, které úložiště ještě navýší. Například registrace přes výše uvedené odkazy navýší kapacitu u Dropboxu i OneDrive o 0,5 GB.

Navýšení prostoru přes zmíněné odkazy dostane jak nově registrovaný účet, tak autor tohoto článku.

Po synchronisaci potřebných dat na Dropbox/OneDrive se po následném zformátování disku a přeinstalování operačního systému všechna data automaticky obnoví z cloudu. Stačí jen nainstalovat příslušný program a přihlásit se do něj.

#### Záloha hodně dat

Pro krátkodobé zálohování velkého množství dat (stovky GB) jde využít měsíční trial versi programu [**CrashPlan**](https://store.code42.com/store/). Nahrávání a stahování dat ale trvá hodně dlouho, nicméně za měsíc by se z vlastní zkušenosti stovky GB měly stihnout.

Datově neomezené úložiště na měsíc zdarma nabízí i [**Dropbox Business**](https://www.dropbox.com/business/free-dropbox-trial) (nezkoušel jsem).

### Co zálohovat?

Kromě dat jako jsou dokumenty nebo fotky se typicky hodí zálohovat i nastavení některých programů. Pokud si člověk s jejich konfigurací vyhrál, bylo by zbytečné to po reinstalaci Windows dělat znovu.

Nastavení programů je typicky ve složce:

```
C:\Users\**Jméno**\AppData\Roaming
```

Například FTP přístupy a nastavení **Total Commanderu** jsou ve složce:

    ```
C:\Users\**Jméno**\AppData\Roaming\GHISLER
```

Hodí se taktéž projít systémem vytvořené složky jako *Dokumenty*, *Obrázky*, *Hudba*, *Plocha*, *Stažené soubory* a podobně, může tam být něco důležitého.

## Spuštění instalace

Po připravení instalačního média a případném zazálohováním nezbytných dat je čas na **samotnou instalaci**.

Pro začátek je nutné **restartovat počítač** a nabootovat z instalačního média.

### Bootování instalace

V závislosti na stavení BIOSu může být aktivní jen bootování z pevného disku. Je zbytečné jen pro účely instalace systému měnit nastavení priority bootování. Stačí vyvolat tzv. bootovací menu (*Boot menu*).

Způsob vyvolání boot menu se liší. Krátce po startu PC se obvykle na chvíli zobrazí možné klávesové zkratky pro vstup do BIOSu, do bootovací nabídky nebo pro obnovení počítače.

Tento výpis si lze zastavit klávesou Pause (na klávesnici bývá vpravo nahoře před numerickým blokem).

Docela často je bootovací nabídka pod klávesou F12, ale je možné se setkat i s jinými klávesami. Někdy není vyhráno i v případě, že člověk potřebnou klávesu zná – je potřeba ji zmáčknout ve správný okamžik (ne příliš brzo ani pozdě), nejjistější je tak ji mačkat opakovaně.

V případě problémů u některých **notebooků** může pomoci přimáčknout ještě klávesy Alt nebo Fn. Typicky by klávesová zkratka pro bootovací menu i postup, kdy ji zmáčknout, měly být na webu výrobce.

Po úspěšném vyvolání nabídky bootování by se mělo zobrazit něco takového, kde je potřeba vybrat příslušnou volbu v závislosti na instalaci z DVD / flash disku:

## Instalace Windows 10

Po nabootování instalace Windows 10 je postup instalace celkem prostý.

Samotný průběh jde rozdělit do několika kroků.

### Krok 1 – výběr jazyku

Na první obrazovce se určuje jazyk, formát času a rozložení klávesnice. Není zde důvod něco měnit a stačí kliknout na *Další*.

Na další obrazovce stačí vybrat *Nainstalovat*:

Tím se spustí instalační program.

### Krok 2 – aktivace

Protože aktivace proběhne automaticky po připojení k internetu na základě hardware, je potřeba vybrat možnost *Nemám Product Key*.

### Krok 3 – licenční podmínky

Nezbývá než souhlasit:

### Krok 4 – typ instalace

Zde je pro čistou instalaci nutné zvolit pokročilou volbu *Vlastní*.

### Krok 5 – výběr oddílů

Pokud aktuální rozdělení oddílů vyhovuje a na systémovém oddílu je dostatek místa, stačí ho vybrat a pokračovat v instalaci kliknutím na *Další*. V takovém případě se dosavadní obsah systémového oddílu přesune do složky `Windows.old`.

Pro úpravy oddílů je nejprve nutné provést jejich odstranění – tím dojde **ke smazání všech dat**. Vznikne tak *nepřidělené místo*, z kterého jde vytvořit nový oddíl požadované velikosti vybráním nabídky *Nový*.

Windows si navíc automaticky vytvoří ještě vlastní oddíl velký cca 500 MB. Nejspíš tam jsou soubory pro spuštění obnovení, bootování a podobně. V přehledu *Tento počítač* by reservovaný oddíl neměl po dokončení instalace strašit.

### Krok 6 – instalování

Následuje časově nejdelší část, kdy se kopírují soubory a stačí jen čekat.

## Nastavení PC

Po dokončení instalace je nezbytné provést pár nastavení:

### Krok 1 – vlastník počítače

Při domácím použití nejspíš zvolit *Vlastníkem jsem já*.

### Krok 2 – uživatelský účet

Pro přihlašování do Windows jde použít účet Microsoftu. To je docela praktické, protože se přes něj může synchronisovat nastavení a v případě používání MS služeb není nutné pro ně neustále vyťukávat heslo pro přihlášení.

Účet jde případně vytvořit nový nebo toto nastavení přeskočit – uživatelský účet může být i čistě lokální a účet od Microsoftu jde případě připojit i později.

Volba *Přeskočit tento krok* se hodí i v případě, že záleží na tvaru složky uživatele:

```
C:\Users\Jméno
```

Při použití MS účtu se pro pojmenování vezme prvních 5 znaků z loginu, což nemusí vypadat hezky.

### Krok 3 – nastavení PINu

Urychlit si přihlašování k počítači jde pomocí PINu. Zadávat po každém zamčení PC běžné heslo k MS účtu by nebylo moc pohodlné.

Pro přihlášení PINem si stačí pamatovat čtyři číslice, které se napíší rychle. Bezpečnost tohoto způsobu přihlašování je zajištěna omezeným počtem chybných pokusů, po kterých je nutné zadat klasické heslo.

PIN slouží pouze pro přihlášení na daném zařízení, takže není ani případně takový problém ho někomu sdělit a následně změnit.

  Doporučuji PIN používat.

### Hotovo

Tímto by měla být instalace **Windows 10** dokončená a po krátké přípravě je systém připraven k používání.

Nyní se hodí nainstalovat nějaké aplikace:

    - [50 nejlepších programů pro Windows](/windows-programy)