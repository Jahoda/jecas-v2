---
title: "Analysování a kontrola stránky"
headline: "Nástroje pro kontrolu a analysování stránky"
description: "Užitečné nástroje pro analysování, kontrolování a prověřování webových stránek."
date: "2013-08-16"
last_modification: "2017-01-28"
status: 1
tags: ["Produktivita", "SEO", "Rady a nápady"]
---

Ať už se jedná o **vlastní** web, stránky **konkurence**, web, který bychom **chtěli koupit**, existuje řada užitečných nástrojů, které nám o něm zvýší přehled.

  **Adresa webu ke kontrole**   

    Po zadání adresy webu povedou níže uvedená tlačítka **přímo na výsledek pro danou URL** (je-li to možné).

## Unikátní obsah

  [Copyscape](http://www.copyscape.com/)
  [Siteliner](http://www.siteliner.com/)

Pro kontrolu, zda někdo **nezkopíroval daný web** nebo jestli jsou na něm nějaké **duplicitní stránky**.

## Zpětné odkazy

  [Ahrefs.com](https://ahrefs.com/)
  
  [Open Site Explorer](http://www.opensiteexplorer.org/)  
  
  [Majestic SEO](http://www.majesticseo.com/)    

Pro přehled, **odkud se na web odkazuje**, existují **placené** služby. Nějaký základní provoz bývá i zdarma.

## Rychlost a odezva stránky

[Bitcatcha.com](http://www.bitcatcha.com/)

Zobrazuje odezvu webu z **různých míst z celého světa**, má význam spíš pro stránky, které nemají ryze české návštěvníky.

[Google PageSpeed Insights](http://developers.google.com/speed/pagespeed/insights/)

Upozorní na **časté chyby** zbytečně zdržující načítání stránky. Analysuje web z pohledu **desktopového prohlížeče** i **mobilu**.

[Pingdom Website Speed Test](http://tools.pingdom.com/fpt/)

Detailní pohled na průběh načítání (podobný jako z [vývojářských nástrojů](/vyvojarske-nastroje#sit) v prohlížečích). Na webu **pingdom.com** jsou i nástroje pro kontrolu DNS a funkce **ping**.

[Webpagetest.org](http://www.webpagetest.org/)

Asi **nejdetailnější** nástroj pro prozkoumání načítání webu. Uvádí i **First Byte Time** / **Time to First Byte** (zkráceně TTFB), což je doba, za kterou dorazí do prohlížeče první data (*byte*) ze serveru.

To je dost důležitý údaj a je dobré ho mít **co možná nejnižší** (cca nízké stovky milisekund). Jedná se o dobu, kdy se z pohledu návštěvníka na stránce **nic neděje** a je zde tedy risiko, že takový návštěvník z webu **odejde dříve, než se něco stihne načíst**.

[DNSCheck](http://dnscheck.labs.nic.cz/)

Otestuje DNS-server a najdě chyby.

## Optimalisace pro mobily

[Google – Test použitelnosti v mobilech](https://www.google.com/webmasters/tools/mobile-friendly/)

Test stránky, jestli se bude dobře používat na mobilních zařízeních. [Google](/google) takové stránky označuje ve výsledcích hledání.

    - [Google označí stránky vhodné pro mobil](/google-mobile-friendly)

## Přístupnost

  [Tenon](https://tenon.io/)

„Validátor“ přístupnosti podle norem 508 i WCAG 2.0.

## Validátor

  [Český validátor](http://validator.webylon.info/)
  [Oficiální W3 validátor](http://validator.w3.org/)  

Mít [validní web](/validita) není nějak zvlášť důležité, ale validátor může pomoci odhalit i nějakou chybu, která by mohla vadit návštěvníkům.

## Použité technologie

[Builtwith.com](http://www.builtwith.com/)

Zjistí technologie, na kterých web běží.

## Celkový přehled

[WooRank.com](http://www.woorank.com/en/)

Kontrola spousta věcí na stránce.

## Google webmaster guidelines

Dodržuje stránka doporučení Google pro webmastery?

[Varvy.com](https://varvy.com/)

## Má stránka výpadek?

[DownForEveryoneOrJustMe.com](http://www.downforeveryoneorjustme.com/)

[IsUp.me](http://www.isup.me/)

Ověří, jestli se **nedostupnost webu** týká pouze vás nebo i dalších uživatelů.

## Sdílení na sociálních sítích

Pro představu o obsahu, který je **hodně sdílený uživateli**, existují služby pro monitorování *Like*, *Tweetů*, *G+* a podobně:

[BuzzSumo](https://app.buzzsumo.com/research/most-shared)

Placená služba, ale několik nejsdílenějších stránek daného webu zobrazí i zdarma.

[SharedCount](http://www.sharedcount.com/)

Zobrazí počet sdílení dané URL. Nezobrazuje přehled pro celý web, ale jen pro konkrétní URL.

## Další?

Znáte nějaké podobné užitečné nástroje? Dejte mi, prosím, vědět do komentářů.

  function zkontrolovat(el, url) {
    var web = document.getElementById("url").value;
    web = web.replace(/.*?:\/\//g, ""); // odstranit protokol
       
    if (web == "" || url == null) {
      url = el.href;
    }
    else {
      url = el.href + url + web;      
    }
    
    window.open(url, '_blank');
   }