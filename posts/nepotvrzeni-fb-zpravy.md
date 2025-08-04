---
title: "(Ne)potvrzení přečtení zprávy na Facebooku"
headline: "Nepotvrzení přečtení zprávy na Facebooku"
description: "Jak zabránit, aby se příchozí zpráva na Facebooku označila jako přečtená."
date: "2015-08-22"
last_modification: "2015-09-08"
status: 1
tags: ["Rady a nápady", "Facebook"]
---

Facebook se u zpráv snaží znázorňovat, kdy si uživatel danou **zprávu přečetl**. Typicky hláškou *Zobrazeno*.

Ve skupinových konversacích jsou potom lidé, kteří zprávu viděli, jednotlivě vyjmenováni.

## Kdy se zpráva označí jako přečtená

Na Facebooku se správa jako přečtená označí, když:

    **Otevřu okno chatu** s člověkem, co mi zaslal zprávu.

    Mám otevřeno okno chatu, **kursor je v poli pro psaní zprávy**, a daný kontakt mi napíše.

    Pokud je okno chatu otevřené, ale kursor v něm není, zprávy se člověku automaticky nepotvrzují. Jde to poznat tak, že okno horní pruh okna bliká.

    V horní nabídce u zprávy zvolím **označit jako přečtené**:

## Přečtení zprávy, aniž by to bylo vidět

Jak tedy zprávu přečíst, aniž by se jejímu autorovi **zobrazilo potvrzení**?

Text zprávy se typicky zobrazuje v notifikaci při používání **mobilní aplikace**. Totéž platí u výpisu, který se zobrazí po kliknutí na ikonu zpráv v horní liště:

Samotné kliknutí na ikonku zpráv zmíněné potvrzení „*Zobrazeno*“ druhé straně nepošle – zprávy budou stále označeny jako nepřečtené.

V této části (podobně jako u notifikací) se ale zobrazuje jen **úryvek zprávy**.

### Označit jako nepřečtené

Zprávu je možné po přečtení zpátky **označit jako nepřečtenou**:

Skutečně to funguje a autorovi zprávy se neukáže, že byla zpráva *zobrazena*. Problém je, že se mu to už mohlo na chvíli ukázat ihned po otevření zprávy, pokud okno chatu sledoval.

### Otevřené okno chatu

Způsob, jak si číst celé zprávy bez odesílání potvrzení, je mít **okno s chatem otevřené**, ale nemít v něm kursor. Potom je možné normálně Facebook používat, ale nesmí se do okna kliknout.

### Rozšíření do prohlížeče

Zabránit zasílání informace o přečtení zprávy jde pomocí rozšíření do prohlížeče. Následující rozšíření blokuje zasílání zprávy o přečtení v prohlížeči **Chrome**:

    - [Facebook Unseen](https://chrome.google.com/webstore/detail/facebook-unseen/iicapmagmhahddefgokbabbgieiogjop)

### Blokování zasílání potvrzení přečtení

Potvrzení přečtení zprávy funguje tak, že se po kliknutí do okna chatu a podobně pošle potvrzovací požadavek na URL:

```
https://www.facebook.com/ajax/mercury/change_read_status.php
```

Pokud se nějakým způsobem zablokuje, rovněž se potvrzení nebudou posílat.