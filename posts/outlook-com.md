---
title: "Online Outlook.com"
headline: "Webový Outlook.com"
description: "Proč na e-maily používám webový Outlook.com."
date: "2015-01-21"
last_modification: "2015-09-12"
status: 1
tags: ["Produktivita"]
---

Přestože se pro komunikací dají používat nejrůznější služby, **e-mail** je stále hojně rozšířený.

Pro používání e-mailu je nutné mít:

  - **poskytovatele** (Seznam, Gmail, Hotmail, e-mail na vlastní doméně),

  - **poštovního klienta** (webové aplikace, desktopové programy)

Povětšinou známí poskytovatelé nabízejí zároveň webovou aplikaci:

Jednou z takových je [Outlook.com](http://outlook.com) od Microsoftu.

Zdarma nabízí rychlé, přehledné a dobře použitelné rozhraní.

Má i mobilní versi:

Díky tomu, že dokáže **rovnou zobrazovat všechny složky** (s oblibou používám řadu vlastních složek), ji používám na mobilu raději než vestavěnou poštovní aplikaci ve **Windows Phone**.

## Webová, nebo desktopová aplikace?

 Webová e-mailová aplikace je prakticky nezbytná, pokud chce člověk používat e-mail na více (třeba i cizích) zařízeních a mít stále stejné uživatelské rozhraní.

### Dostupnost offline

**Nedostupnost e-mailů offline** už v dnešní době často nebývá takový problém, protože bez připojení stejně nepůjde řada úkolů z e-mailů vyřizovat.

Je to ale zásadní nevýhoda čistě online aplikace, která někomu může vadit.

Stejně tak člověk nemá e-maily fysicky „u sebe“, ale jsou pouze někde v *cloudu*.

### Rychlost

**Rychlost** webové a desktopové aplikace je diskutabilní. Webový e-mail se dokáže typicky spustit bleskurychle. Oproti tomu desktopová aplikace se bude načítat déle a po spuštění začne teprve stahovat e-maily.

Zde záleží na způsobu používání e-mailů: jestli člověk chce poštu několikrát denně otevřít, zkontrolovat a zavřít, aby ho nové zprávy nerušily, nebo mít poštovní aplikaci neustále otevřenou.

Zobrazování již stažených e-mailů bude potom u desktopové aplikace rychlejší, protože se nemusí provádět další požadavky na server.

### Web jako aplikace

Od **Windows 7** jde stránka z **Internet Exploreru** připnout na hlavní panel **Start**.

Spouštění webového Outlooku se potom nijak neliší od jeho desktopové verse.

Díky JS metodám `window.external.msSiteMode*` jde s připnutým webem k panelu *Start* dělat standardní věci jako s aplikací, takže nejsou problém ani **notifikace** prostřednictvím překryvné ikony.

Příklad zobrazení notifikace u [Facebooku](/facebook), který rovněž jako webový Outlook s připnutím k *Startu* počítá:

Menší nevýhodou je nepřipravenost webové aplikace pro **práci ve více oknech**, kdy otevření zprávy do nového okna znamená zduplikování celé aplikace. Někdy potom může být složitější najít to správné okno.

### Stabilita

Webový Outlook.com občas vyžaduje provést obnovení stránky. Nebo se někdy znovu přihlásit:

  Přihlaste se znovu. Za účelem ochrany vašich osobních informací vás pravidelně odhlašujeme.

Na druhou stranu je to otázka pár vteřin. Nároky na hardware jsou potom u webové aplikace nižší.

### Cena

Webový Outlook je zdarma. Klasický je součástí placeného balíku [Office](/office-2016).

## E-mail na vlastní doméně

I s webovým Outlookem není problém používat **e-mail na vlastní doméně**. Existují například tyto dvě možnosti:

  - Nastavit si ve webovém rozhraní přímo **stahování pošty z webhostingu**.

  - Z webhostingu si všechnu poštu přeposílat na email `*@hotmail.com` a ve webovém Outlooku si nastavit pouze **odchozí poštu.**

V druhém případě mi přijde, že se nové e-maily **zobrazují dříve**.

### Nastavení

Nastavení přijímání a odesílání pošty ze schránky na vlastní doméně:

V nabídce *Možnosti* stačí zvolit *Vaše e-mailové účty*:

Nyní si lze vybrat, jestli přidat účet pouze pro odesílání nebo i přijímání pošty:

## Konkurenční webové e-maily

Ačkoliv webový Outlook není zdaleka dokonalý, jiné webmaily jsou na tom z mého pohledu ještě hůř.

    **Gmail** se pomalu načítá a má chaotické uživatelské rozhraní. Má zobrazení pouze ve dvou sloupcích, takže se člověk musí z otevřené zprávy vracet zpět. Oproti Outlooku se komplikovaně vytváří pravidla pro třídění e-mailů.

    **Seznam Email** vůbec nemá kontextové nabídky po kliknutí pravým tlačítkem, což značně zpomaluje používání.

    Webmaily jako [**Roundcube**](https://roundcube.net/), které s oblibou používají pro své zákazníky [webhostingy](/hosting), jsou potom značně technologicky zastaralé.