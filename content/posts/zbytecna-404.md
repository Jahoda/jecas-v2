---
title: "Proč není 404 stránka potřeba"
headline: "Proč není 404 stránka potřeba"
description: "Chybová stránka „404 Nenalezeno“ není na většině stránek potřeba. Proč?"
date: "2016-01-22"
last_modification: "2016-01-22"
status: 0
tags: []
format: "html"
---

<p>Řada pouček pro tvůrce webu obsahuje zmínku, že by web měl mít dobře nakonfigurovanou chybovou stránku pro případ, že se návštěvník dostane URL, pro kterou neexistuje obsah.</p>

<blockquote>
  <p>Osobně se domnívám, že stránka 404 je až poslední řešení…</p>
</blockquote>








<h2 id="pricina-nasledek">Řešení následku, nebo příčiny?</h2>

<p>Stručně řečeno, zobrazení chybové stránky je až následek situace, kdy se někdo dostane na neexistující obsah.</p>

<p>Nabízí se tedy řešit především příčinu. A případy, kdy web neví, kam návštěvníka poslat, eliminovat.</p>






<h2 id="kdy">Kdy se zobrazí 404</h2>

<p>Chybová stránka <i>Not Found</i> se může zobrazit v několika případech:</p>


<ol>
  <li>
    <p><b>Webmaster pokazí interní odkaz</b> – správce webu chce odkázat na jinou podstránku a odkaz špatně zadá.</p>
    
    <p>Řešení je provádět <a href="/odkaz#funkcnost">kontrolu funkčnosti odkazů</a>, případně odkazy nepsat ručně, ale vytvářet pomocí funkce redakčního systému – v takovém případě by odkaz na neexistující obsah neměl vzniknout.</p>
    
    <p><b>Řešení</b>: provádět ruční kontrolu nebo ji mít automatisovanou v redakčním systému.</p>
  </li>  
  <li>
    <p><b>Někdo jiný špatně odkáže</b> – lidé dělají chyby, takže se může stát, že se někdo splete a odkáže na neplatnou URL. Nebo URL rozbije redakční systém / diskusní fórum.</p>
    
    <p>To je na první pohled větší problém, protože odkaz z cizí stránky má pod kontrolou někdo jiný. Je možné mu tedy napsat a požádat ho o opravu. Nebo rozbité odkazy opravovat automaticky a přesměrovávat:</p>
    
    <div class="internal-content">
      <ul>
        <li><p><a href="/oprava-url">Dohledání a opravení rozbité adresy</a></p></li>
      </ul>
    </div>
  </li>
  <li>
    <p><b>Změna URL bez přesměrování</b> – provede se redesign webu včetně změny struktury URL, aniž by se staré tvary přesměrovaly na nové alternativy.</p>
    <p>Tohle by se nikdy nemělo stát. Staré adresy přesměrovat na nové nebo je raději vůbec neměnit. </p>
    
    <div class="external-content">
      <ul>
        <li>
          <p><b>Yuhů</b>: <a href="http://weblog.jakpsatweb.cz/d/1333060980-tri-zasady-pro-tvorbu-dobrych-seo-url.html">Tři zásady pro tvorbu dobrých SEO URL</a></p>
        </li>
      </ul>
    </div>
  </li>
  <li>
    <p><b>Smazání obsahu</b> – někoho může svádět starý, neaktuální nebo nežádoucí obsah nadobro odstranit a nenechat po něm ani památky.</p>
    
    
    <p>Internet ale zmizení obsahu moc nepřeje, takže snaha o vaporisaci se často mine účinkem. V řadě případů je snaha o smazání zaručeným receptem, jak nepohodlný obsah naopak rozšířit.</p>
    
        
    
    <p>Navíc i starý obsah může mít nějakou hodnotu. Například přes již neprodávaný produkt v e-shopu se na něj může dostat návštěvník z vyhledávání a nakonec si koupit něco podobného, když mu to web prozřetelně nabídne.</p>
  </li>
  
  <li>
    <p><b>Hádání adres</b> – někteří lidé mohou i části URL v rámci domény zadávat ručně do adresního řádku.</p>
    
    <p>Druhým případem jsou všelijací roboti, kteří hádají adresy známých pluginů redakčních systémů, které obsahují bezpečnostní díry, aby mohly web napadnout.</p>
    
    <p>Toto jde opět do jisté míry řešit opravováním adres (hledáním podobné URL).</p>
  </li>
</ol>

<p>Často jde tedy zobrazení <b>404 stránky</b> předejít a nabídnout uživateli lepší obsah.</p>


<h2 id="potreba">Kdy se 404 hodí</h2>

<p>I když by se na stránku „nenalezeno“ neměl návštěvník v ideálním případě dostat, ne vždy se povede tohoto stavu dosáhnout.</p>

<p>Potom by chybová stránka měla nabídnout alespoň odkaz na nějakou existující část webu. Je rovněž dobré, když je stejným jazykem jako web a ve stejném visuálním stylu. Výchozí hláška webového serveru tedy úplně vhodná není.</p>



<h3 id="seo">Význam pro vyhledávače</h3>

<p>Z pohledu vyhledávačů je důležité na chybové stránce posílat HTTP hlavičku <b>404</b>. Jinak ji vyhledávače mohou normálně indexovat.</p>

<p>Zkontrolovat hlavičku jde ve <a href="/vyvojarske-nastroje">vývojářských nástrojích</a>:</p>


<h2 id="sledovani">Sledování 404</h2>

<p>V každém případě je dobré každé zobrazení chybové stránky sledovat a na základě toho mu do budoucna zabraňovat. Jak 404 sledovat popisuje samostatný článek:</p>

<div class="internal-content">
  <ul>
    <li><a href="/sledovani-404">Sledování 404 chybových stránek</a></li>
  </ul>
</div>