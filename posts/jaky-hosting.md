---
title: "Jaký vybrat hosting"
headline: "Jaký vybrat hosting"
description: "Podle čeho vybrat, kde hostovat svůj web."
date: "2015-12-27"
last_modification: "2015-12-27"
status: 0
tags: []
---

## Počet domén

Výběr hostingu dokáže značně ovlivnit počet domén, které je potřeba hostovat.

V případě hostování jediné domény je nejvýhodnější hosting u Wedosu. Pro větší počty domén se ale můžou vyplatit i jiní poskytovatelé hostingových služeb.

Některé společnosti nabízí nejlevnější tarif pro 5–10 domén. V případě, že se tento počet podaří vytížit, cena v přepočtu na doménu vyjde nižší než u Wedosu.

## Rychlost

Zvolený hosting významně ovlivňuje rychlost načítání webu dvěma faktory:

    **Rychlost provedení skriptu / DB** – u webových aplikací rychlost serveru ovlivňuje dobu, za kterou se povede připravit odpověď pro klienta (prohlížeč návštěvníka).

    **Odezva** – doba za kterou server odpoví po zaslání požadavku. To může být problém u zahraničních hostingů, které jsou umístěny daleko.

    I když se povede požadovanou akci rychle zpracovat díky výkonnému serveru, přenos na velkou vzdálenost může (ale nemusí) znamenat velkou prodlevu, než data dorazí.

    V případě, že je cílová skupina návštěvníků ze specifického koutu světa, je dobré to při výběru zohlednit. Ideální je změřit nějaký web, který daný hosting používá.

    Pozor: Měření hlavní strany hostingové společnosti nemusí být vypovídající. Lepší je si vybrat nějaký konkrétní web.

          [Rychlost a odezva stránky](/kontrola-stranky#rychlost): [Bitcatcha.com](http://www.bitcatcha.com/)

## Podpora

Ve srovnáních různých hostingů se často objevuje hodnocení zákaznické podpory. Osobně mi to nepřijde zase tolik zajímavé, protože v ideálním případě by zákaznická podpora neměla být potřeba.

Potřeba podpory zpravidla pramení z špatně navržené a nejasné administrace či špatně vysvětlených funkcí a služeb, které hostingová společnost nabízí.

## Dostupnost

Jeden z nejdůležitějších faktorů pro volbu hostingu je jeho dostupnost. Nikdo nechce, aby jeho web měl výpadky.

Hostingové společnosti typicky uvádějí čísla typu *dostupnost 99,99 %*.

Zjistit dostupnost českých a slovenských hostingů jde v následujícím nezávislém měření:

    - [Měření dostupnosti webhostingů](http://mereni.kyblsoft.cz/)

Dostupnost 99,99 % odpovídá přibližně třičtvrtěhodině za rok, kdy web nefunguje. Zpravidla je tento čas rozložen během roku do několika kratších výpadků.

Bohužel jde těžko **předvídat, kdy dojde k většímu výpadku**. Prakticky každá větší hostingová společnost v ČR zažila nějaký delší výpadek v řádu hodin až dní.

V případě, že je velký problém, aby web třeba 1 den nefungoval, je nutné mít kopii na více nezávislých serverech. A doménu mít jinde než u primárního hostingu, aby šla po výpadku přesměrovat jinam.

## Free hosting

Někteří provozovatelé nabízejí hosting zdarma.

  Na subdoméně provozovatele freehostingu, např. `example.neco.cz`.

  Na **vlastní doméně** – za doménu je obvykle nutné platit. CZ doména stojí kolem 150 Kč.

Co z toho mají? Zpravidla freehostingy nutí své uživatele, aby na svém webu měly reklamní banner provozovatele. Buď tím inserují své vlastní placené služby, nebo mají na webech klasickou reklamu, kterou potom financují provoz.

V některých případech je zdarma velmi omezená nabídka služeb, které nejspíš přestanou časem stačit, takže provozovatel doufá, že zákazník přejde na placený tarif.

## Sdílený hosting

Pro nenáročné weby obvykle stačí sdílený hosting. Jedná se o server, který používá více zákazníků. Konfiguraci serveru stanoví provozovatel hostingu, takže může být problém s nastavením něčeho speciálního.

Některá nastavení je možné provést prostřednictvím administrace.

## Vlastní server

V případě hostování velkého množství webů nebo zvláštních potřeb na konfiguraci webového serveru je nutné zvolit vlastní server.

Vlastní servery se dělí na:

  - virtuální,

  - dedikované

Správa vlastního serveru vyžaduje více znalostí pro jeho konfiguraci. Často je nutné si vlastnoručně nainstalovat operační systém a další aplikace jako třeba PHP.

Pro zákazníky, kteří se nechtějí zaobírat správou a konfigurováním serveru, existují tzv. **Managed servery** – jedná se o virtuální nebo dedikované servery, které lze spravovat bez speciálních znalostí prostřednictvím administrace nebo se o ně stará pracovník hostingu.

### Virtuální server

Weby několika zákazníků běží na společném fysickém serveru, jehož systémové prostředky jsou vyhrazeny jednotlivým zákazníkům.

Navenek se virtualisovaný server tváří stejně jako dedikovaný.

### Dedikovaný server

Jedná se o skutečný server, který slouží pouze jedinému zákazníkovi. Dedikované servery hostingové společnosti obvykle pronajímají za měsíční poplatek.

Bývají dražší než virtuální servery.

## Parametry a funkce

Pro běžné potřeby typického webu běžícího v PHP s MySQL (třeba [redakční systém](/cms) [WordPress](/wordpress)) vyhovují prakticky všechny hostingy.

Na některé parametry je ale dobré si dát pozor.

### Velikost prostoru

Vzhledem k tomu, že pevné disky jsou celkem levné, provozovatelé hostingu se nebojí rozhazovat gigabyty. Někteří dokonce nabízí neomezený prostor.

Běžný web by si měl bohatě vystačit s **1 GB**. Redakční systém, grafika a texty jsou datově malé. Hodně místa zabírají videa a [neoptimalisované obrázky](/optimalisace-obrazku).

Je-li nutné mít na webu hodně videí, které není možné hostovat třeba na [YouTube](/youtube), bude potřeba prostor řešit, jinak moc ne.

Problém s místem také může nastat v případě používání e-mailu a přijímání a nemazání velkých příloh.

Chyták je někdy v tom, že velký prostor se týká pouze běžných souborů, ale pro e-maily nebo databasi jsou limity jiné.

Následující prostor už extra velký není.

  1 GB pro databáze (maximálně 20 databází do velikosti 50 MB)

### Soubor `.htaccess`

Pro [hezké adresy](/tvar-url) je nutné aby server podporovat použití souboru `.htaccess` a `mod_rewrite`.

To umí skoro všechny hostingy, ale někde to bývá nutné zapnout v administraci.

### Instalace open-source CMS

Řada společností nabízí instalaci populárních redakčních systémů jako **WordPress**, **Drupal** nebo **Joomla!** na jedno kliknutí.

Bez toho je nutné redakční systém stáhnout, nahrát na FTP a nainstalovat ručně.

### Subdomény

Je-li plánováno provozovat na hostingu více webů v rámci jedné domény, budou se hodit subdomény.

```
neco.example.com
neco-jineho.example.com
```

Rozdíly bývají v tom, jak vytvoření subdomény probíhá.

Na některých hostinzích k tomu stačí vytvořit složku v hlavním adresáři, jinde je speciální adresář pro umístění subdomén. Někde je subdoménu nutné vytvořit v administraci.

### CRON

CRON je nástroj pro automatické spouštění skriptů. Používá se pro časově náročné úkony, které by při provedení během návštěvy výrazně zdržovaly načítání stránky.

Napříč hostingy se liší četnost, se kterou jde skripty spouštět.

### Statistiky

Na základě logu přístupů, který většina webserverů automaticky vede, jde vytvářet statistiky návštěvnosti.

Většina hostingů k tomu používá [AWStats](http://www.awstats.org/). Výhoda těchto statistik je v tom, že třeba na rozdíl od [Google Analytics](/ga) nijak nezdržují načítání stránky měřicím skriptem.

Na druhou stranu nedokáží zjistit některé věci, co Google Analytics pomocí měřicího JavaScriptu.

### Zálohování

Zálohování se hodí hlavně pro případ, že si člověk něco omylem smaže nebo rozbije.

Bývá dobré si web stejně zálohovat nezávisle na zálohování webhostera, takže absence tolik nevadí.

### Nastavení PHP

Často jde přepínat různé verse PHP. Při používání aktuální redakčních systémů to není třeba řešit.

U hodně starých systémů může být s novou versí PHP problém. Jinak bývá dobré mít PHP co 
nejnovější, zpravidla je rychlejší.

Důležité vlastnosti PHP:

  `allow_url_fopen` – možnost [stahovat obsah cizích URL](/stazeni-stranky) funkcí `file_get_contents`

  GD knihovna, ImageMagick – knihovna pro práci s obrázky (změna velikosti, oříznutí apod.), většinou se hodí

  Doba běhu skriptu – standardně je v PHP omezena doba běhu skriptu (`max_execution_time`) na 30 vteřin. Většinou ji nejde měnit.

  Limit uploadu – `upload_max_filesize`, bývá většinou 128 MB. Je-li potřeba, aby návštěvníci nahrávali hodně velké soubory, může to být problém.

### HTTPS (SSL certfikát)

Má-li web běžet na zabezpečeném protokolu [HTTPS](/https) je potřeba vlastnit SSL certifikát. Ty jde získat už zdarma a některé hostingové společnosti to nabízí.

Jde tak mít zabezpečený web zdarma na jedno kliknutí.

### GIT deploy

GIT je technologie pro versování souborů. Hodí se hlavně programátorům pro úpravu redakčního systému běžícího na webhostingu.

Případně jde využít u webů ve statických souborech. U open-source redakčních systémů používající databasi se GIT deploy prakticky nevyužije.

Při použití GITu není nutné nahrávat změny přes FTP. 

## Seznam českých hostingů

### Wedos

Jeden z nejpopulárnějších hostingů v ČR.

[Wedos.cz](http://hosting.wedos.com/cs/)

Pro hostování jednoho webu nabízí asi nejlepší poměr cena/výkon.

Běžná cena je cca 30 Kč za měsíc, kterou lze skoro pořád snížit na polovinu nějakým slevovým kódem nebo akcí.

Na jednom hostingu jde teoreticky [provozovat dvě domény](/wedos-alias), ale není to moc pohodlné.

Wedos se hodí spíš pro méně náročné věci. Chybí i třeba celkem základní věci jako **automatické zálohování** nebo HTTP logy přístupů.

### Ebola

Nejlevnější tarif za 50 Kč měsíčně umožňuje provozovat až 5 domén.

[Ebola.cz](http://ebola.cz/)

### Hosting BlueBoard

Základní cena kolem 100 Kč za měsíc je pro jeden web poněkud vyšší.

[hosting.blueboard.cz](https://hosting.blueboard.cz/)

U BlueBoardu je ale možné mít až 10 domén, čímž se při plném využití jde dostat na hodně zajímavou cenu.

Za zmínku stojí možnost získat SSL certifikát zdarma pro zabezpečení webu prostřednictvím [HTTPS](/https) nebo nasazování webu pomocí **GITu**.

### Savana

[Savana.cz](http://www.savana.cz/)