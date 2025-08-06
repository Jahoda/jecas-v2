---
title: "Analysování a kontrola stránky"
headline: "Nástroje pro kontrolu a analysování stránky"
description: "Užitečné nástroje pro analysování, kontrolování a prověřování webových stránek."
date: "2013-08-16"
last_modification: "2017-01-28"
status: 1
tags: ["napady", "produktivita", "seo"]
format: "html"
---

<p>Ať už se jedná o <b>vlastní</b> web, stránky <b>konkurence</b>, web, který bychom <b>chtěli koupit</b>, existuje řada užitečných nástrojů, které nám o něm zvýší přehled.</p>

<div class="js form" style="background: #0D6AB7; color: #fff; padding: .5em">
  <p><label><b>Adresa webu ke kontrole</b>   <input type="text" id="url" placeholder="example.com"></label><br>
  <small>
    Po zadání adresy webu povedou níže uvedená tlačítka <b>přímo na výsledek pro danou URL</b> (je-li to možné).</small>
  </p>
</div>


<h2 id="copyscape">Unikátní obsah</h2>

<p>
  <a href="http://www.copyscape.com/" class="button" onclick="zkontrolovat(this, '?q='); return false;">Copyscape</a>
  <a href="http://www.siteliner.com/" class="button" onclick="zkontrolovat(this, ''); return false;">Siteliner</a>
</p>

<p>Pro kontrolu, zda někdo <b>nezkopíroval daný web</b> nebo jestli jsou na něm nějaké <b>duplicitní stránky</b>.</p>



<h2 id="zpetne-odkazy">Zpětné odkazy</h2>
<p>
  <a href="https://ahrefs.com/" class="button" onclick="zkontrolovat(this, 'site-explorer/overview/subdomains/?target='); return false;">Ahrefs.com</a>
  
  <a href="http://www.opensiteexplorer.org/" class="button" onclick="zkontrolovat(this, 'links?=Search&site='); return false;">Open Site Explorer</a>  
  
  <a href="http://www.majesticseo.com/" class="button" onclick="zkontrolovat(this, 'reports/site-explorer?folder=&IndexDataSource=F&q='); return false;">Majestic SEO</a>    
</p>

<p>Pro přehled, <b>odkud se na web odkazuje</b>, existují <b>placené</b> služby. Nějaký základní provoz bývá i zdarma.</p>



<h2 id="rychlost">Rychlost a odezva stránky</h2>

<!--<p><a href="http://www.200please.com/" class="button" onclick="zkontrolovat(this, '?url=http://'); return false;">200Please.com</a></p>-->
<p><a href="http://www.bitcatcha.com/" class="button" onclick="zkontrolovat(this, null); return false;">Bitcatcha.com</a></p>

<p>Zobrazuje odezvu webu z <b>různých míst z celého světa</b>, má význam spíš pro stránky, které nemají ryze české návštěvníky.</p>

<p><a href="http://developers.google.com/speed/pagespeed/insights/" class="button" onclick="zkontrolovat(this, '?url='); return false">Google PageSpeed Insights</a></p>

<p>Upozorní na <b>časté chyby</b> zbytečně zdržující načítání stránky. Analysuje web z pohledu <b>desktopového prohlížeče</b> i <b>mobilu</b>.</p>

<p><a href="http://tools.pingdom.com/fpt/" class="button" onclick="zkontrolovat(this, '?testurl='); return false">Pingdom Website Speed Test</a></p>

<p>Detailní pohled na průběh načítání (podobný jako z <a href="/vyvojarske-nastroje#sit">vývojářských nástrojů</a> v prohlížečích). Na webu <b>pingdom.com</b> jsou i nástroje pro kontrolu DNS a funkce <b>ping</b>.</p>

<p><a href="http://www.webpagetest.org/" class="button" onclick="zkontrolovat(this, '?url='); return false">Webpagetest.org</a></p>

<p>Asi <b>nejdetailnější</b> nástroj pro prozkoumání načítání webu. Uvádí i <b>First Byte Time</b> / <b>Time to First Byte</b> (zkráceně TTFB), což je doba, za kterou dorazí do prohlížeče první data (<i>byte</i>) ze serveru.</p>

<p>To je dost důležitý údaj a je dobré ho mít <b>co možná nejnižší</b> (cca nízké stovky milisekund). Jedná se o dobu, kdy se z pohledu návštěvníka na stránce <b>nic neděje</b> a je zde tedy risiko, že takový návštěvník z webu <b>odejde dříve, než se něco stihne načíst</b>.</p>

<p><a href="http://dnscheck.labs.nic.cz/" class="button" onclick="zkontrolovat(this, null); return false;">DNSCheck</a></p>
<p>Otestuje DNS-server a najdě chyby.</p>



<h2 id="mobil">Optimalisace pro mobily</h2>

<p><a href="https://www.google.com/webmasters/tools/mobile-friendly/" class="button" onclick="zkontrolovat(this, '?url='); return false">Google – Test použitelnosti v mobilech</a></p>

<p>Test stránky, jestli se bude dobře používat na mobilních zařízeních. <a href="/google">Google</a> takové stránky označuje ve výsledcích hledání.</p>

<div class="internal-content">
  <ul>
    <li><a href="/google-mobile-friendly">Google označí stránky vhodné pro mobil</a></li>
  </ul>
</div>



<h2 id="pristupnost">Přístupnost</h2>

<p>
  <a href="https://tenon.io/" class="button" onclick="zkontrolovat(this, 'testNow.php?url='); return false;">Tenon</a>
</p>

<p>„Validátor“ přístupnosti podle norem 508 i WCAG 2.0.</p>

<h2 id="validita">Validátor</h2>
<p>
  <a href="http://validator.webylon.info/" class="button" onclick="zkontrolovat(this, 'check?uri='); return false;">Český validátor</a>
  <a href="http://validator.w3.org/" class="button" onclick="zkontrolovat(this, 'check?uri='); return false;">Oficiální W3 validátor</a>  
</p>
<p>Mít <a href="/validita">validní web</a> není nějak zvlášť důležité, ale validátor může pomoci odhalit i nějakou chybu, která by mohla vadit návštěvníkům.</p>



<h2 id="pouzite-technologie">Použité technologie</h2>

<p><a href="http://www.builtwith.com/" class="button" onclick="zkontrolovat(this, ''); return false;">Builtwith.com</a></p>

<p>Zjistí technologie, na kterých web běží.</p>



<h2 id="celkovy-prehled">Celkový přehled</h2>

<p><a href="http://www.woorank.com/en/" class="button" onclick="zkontrolovat(this, 'www/'); return false;">WooRank.com</a></p>

<p>Kontrola spousta věcí na stránce.</p>


<h2 id="google-guidelines">Google webmaster guidelines</h2>

<p>Dodržuje stránka doporučení Google pro webmastery?</p>

<p><a href="https://varvy.com/" class="button" onclick="zkontrolovat(this, null); return false;">Varvy.com</a></p>



<h2 id="vypadek">Má stránka výpadek?</h2>

<p><a href="http://www.downforeveryoneorjustme.com/" class="button" onclick="zkontrolovat(this, ''); return false;">DownForEveryoneOrJustMe.com</a></p>

<p><a href="http://www.isup.me/" class="button" onclick="zkontrolovat(this, ''); return false;">IsUp.me</a></p>

<p>Ověří, jestli se <b>nedostupnost webu</b> týká pouze vás nebo i dalších uživatelů.</p>


<h2 id="socialni">Sdílení na sociálních sítích</h2>

<p>Pro představu o obsahu, který je <b>hodně sdílený uživateli</b>, existují služby pro monitorování <i>Like</i>, <i>Tweetů</i>, <i>G+</i> a podobně:</p>

<p><a href="https://app.buzzsumo.com/research/most-shared" class="button" onclick="zkontrolovat(this, null); return false">BuzzSumo</a></p>

<p>Placená služba, ale několik nejsdílenějších stránek daného webu zobrazí i zdarma.</p>


<p><a href="http://www.sharedcount.com/" class="button" onclick="zkontrolovat(this, '#url='); return false">SharedCount</a></p>

<p>Zobrazí počet sdílení dané URL. Nezobrazuje přehled pro celý web, ale jen pro konkrétní URL.</p>


<h2 id="dalsi">Další?</h2>

<p>Znáte nějaké podobné užitečné nástroje? Dejte mi, prosím, vědět do komentářů.</p>


<script>
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
</script>