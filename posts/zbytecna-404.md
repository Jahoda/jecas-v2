---
title: "Proč není 404 stránka potřeba"
headline: "Proč není 404 stránka potřeba"
description: "Chybová stránka „404 Nenalezeno“ není na většině stránek potřeba. Proč?"
date: "2016-01-22"
last_modification: "2016-01-22"
status: 0
tags: []
---

Řada pouček pro tvůrce webu obsahuje zmínku, že by web měl mít dobře nakonfigurovanou chybovou stránku pro případ, že se návštěvník dostane URL, pro kterou neexistuje obsah.

  Osobně se domnívám, že stránka 404 je až poslední řešení…

## Řešení následku, nebo příčiny?

Stručně řečeno, zobrazení chybové stránky je až následek situace, kdy se někdo dostane na neexistující obsah.

Nabízí se tedy řešit především příčinu. A případy, kdy web neví, kam návštěvníka poslat, eliminovat.

## Kdy se zobrazí 404

Chybová stránka *Not Found* se může zobrazit v několika případech:

    **Webmaster pokazí interní odkaz** – správce webu chce odkázat na jinou podstránku a odkaz špatně zadá.

    Řešení je provádět [kontrolu funkčnosti odkazů](/odkaz#funkcnost), případně odkazy nepsat ručně, ale vytvářet pomocí funkce redakčního systému – v takovém případě by odkaz na neexistující obsah neměl vzniknout.

    **Řešení**: provádět ruční kontrolu nebo ji mít automatisovanou v redakčním systému.

    **Někdo jiný špatně odkáže** – lidé dělají chyby, takže se může stát, že se někdo splete a odkáže na neplatnou URL. Nebo URL rozbije redakční systém / diskusní fórum.

    To je na první pohled větší problém, protože odkaz z cizí stránky má pod kontrolou někdo jiný. Je možné mu tedy napsat a požádat ho o opravu. Nebo rozbité odkazy opravovat automaticky a přesměrovávat:

        [Dohledání a opravení rozbité adresy](/oprava-url)

    **Změna URL bez přesměrování** – provede se redesign webu včetně změny struktury URL, aniž by se staré tvary přesměrovaly na nové alternativy.

    Tohle by se nikdy nemělo stát. Staré adresy přesměrovat na nové nebo je raději vůbec neměnit. 

          **Yuhů**: [Tři zásady pro tvorbu dobrých SEO URL](http://weblog.jakpsatweb.cz/d/1333060980-tri-zasady-pro-tvorbu-dobrych-seo-url.html)

    **Smazání obsahu** – někoho může svádět starý, neaktuální nebo nežádoucí obsah nadobro odstranit a nenechat po něm ani památky.

    Internet ale zmizení obsahu moc nepřeje, takže snaha o vaporisaci se často mine účinkem. V řadě případů je snaha o smazání zaručeným receptem, jak nepohodlný obsah naopak rozšířit.

    Navíc i starý obsah může mít nějakou hodnotu. Například přes již neprodávaný produkt v e-shopu se na něj může dostat návštěvník z vyhledávání a nakonec si koupit něco podobného, když mu to web prozřetelně nabídne.

    **Hádání adres** – někteří lidé mohou i části URL v rámci domény zadávat ručně do adresního řádku.

    Druhým případem jsou všelijací roboti, kteří hádají adresy známých pluginů redakčních systémů, které obsahují bezpečnostní díry, aby mohly web napadnout.

    Toto jde opět do jisté míry řešit opravováním adres (hledáním podobné URL).

Často jde tedy zobrazení **404 stránky** předejít a nabídnout uživateli lepší obsah.

## Kdy se 404 hodí

I když by se na stránku „nenalezeno“ neměl návštěvník v ideálním případě dostat, ne vždy se povede tohoto stavu dosáhnout.

Potom by chybová stránka měla nabídnout alespoň odkaz na nějakou existující část webu. Je rovněž dobré, když je stejným jazykem jako web a ve stejném visuálním stylu. Výchozí hláška webového serveru tedy úplně vhodná není.

### Význam pro vyhledávače

Z pohledu vyhledávačů je důležité na chybové stránce posílat HTTP hlavičku **404**. Jinak ji vyhledávače mohou normálně indexovat.

Zkontrolovat hlavičku jde ve [vývojářských nástrojích](/vyvojarske-nastroje):

## Sledování 404

V každém případě je dobré každé zobrazení chybové stránky sledovat a na základě toho mu do budoucna zabraňovat. Jak 404 sledovat popisuje samostatný článek:

    - [Sledování 404 chybových stránek](/sledovani-404)