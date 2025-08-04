---
title: "Jak udělat web v roce 2020"
headline: "Jak udělat web v roce 2020"
description: "Existuje mnoho způsobů, jak vytvořit webovou stránku. Klikací online služby, CMS, generátory statických stránek a další."
date: "2020-02-12"
last_modification: "2020-02-12"
status: 0
tags: []
---

Když jsem cca před 20 lety zkoušel vytvořit webovou stránku a dostat ji na internet, existovaly asi 2 běžné zůsoby:

    Napsat stránku v **obyčejném HTML** v textovém editoru.

    Použít [WYSIWYG editor](/wysiwyg) **Microsoft FrontPage** a web tam *naklikat* jako ve **Wordu**.

Protože psaní v čistém HTML znamenalo u větších webů nutnost neustále rozkopírovávat společné části (hlavička, menu, apod.) napříč všemi soubory nebo používat nepraktické [rámy](/ramy), zpopularisovalo se spousta řešení, jak si práci ulehčit s ohledem na potřeby i technické dovednosti.

## WYSIWYG programy

Microsoft FrontPage, Macromedia (nyní Adobe) Dreamweaver, Nvu, Microsoft Expression Web – dnes už, snad s výjimkou Dreamweaveru, mrtvé programy, které umožňovaly *naklikání* celé visuální podoby webu i pohodlné psaní obsahu ve WYSIWYG prostředí.

Pro vývojáře znalé HTML a CSS nabízely i lepší či horší editory pro psaní přímo ve zdrojovém kódu.

A nakonec díky vlastním šablonám, dokázaly řešit aktualisace společných částí stránky a výsledný **statický HTML výstup** nahrát přes FTP na web.

## Skládání stránek v PHP

S rozšířením [PHP](/php) se potom situace dost změnila. Najednou bylo možné přejmenovat `index.html` na `index.php` a při zachování funkcionality mít k disposici běžné konstrukce programovacích jazyků.

Zejména velmi populární funkci `include` pro vkládání společných kousků stránek.

    - [Jednoduchý web v PHP](/include)

Pořád je tento postup jeden z nejjednodušších a nejvýkonnějších.

## PHP frameworky

[Nette](/nette), Symfony, Laravel – PHP frameworky umožnující pohodlnější psaní v PHP. Jedná se o osvědčený způsob, jak vytvářet stránky *na míru*.

Ačkoliv PHP původně vzniklo jako šablonovací systém, součástí frameworků bývají pokročilejší šablonovací systémy, které vypadají míň jako programování a nabízejí úspornější a čitelnější zápis.

Příklad z šablonovacího systému Latte:

```
&lt;ul n:if="$items">
{foreach $items as $item}
  &lt;li id="item-{$iterator->counter}">{$item|capitalize}&lt;/li>
{/foreach}
&lt;/ul>
```

Výhodné na používání PHP frameworků je fakt, že fungují na obyčejném hostingu za pár korun.

Tím, že PHP beží na straně serveru, jsou stránky dobře přístupné vyhledávačům ([český Seznam](/seznam) si narozdíl od [Googlu](/google) s JavaScriptem pořád moc neporadí).

Kromě toho jsou podobně jako statické stránky nenáročné na hardware návštěvníka, protože veškeré výpočty a logika probíhá na straně serveru.

## JS frameworky React, Vue.js atd.

Poslední léta se hodně rozšiřuje JavaScript. Zvlášť v oblasti frontendu bývá dnes zvykem vytvářet web v nějakém JS frameworku.

Po zlatých časech knihovny jQuery se jedná většinou o React nebo Vue.js.

Vznikají v nich [SPA](/spa) (*single page aplikace*), které komunikují s nějakým API pro čtení a ukládání dat. To API potom může být napsatné třeba v PHP, node.js nebo u výkonově náročných věcí v Golangu.

Výhoda těchto aplikací (udělají-li se dobře) je ve lepší interaktivitě. Logika aplikace (kromě zdroje dat – API) se stáhne k návštěvníkovi do prohlížeče. Pro každou uživatelskou akci, která by změnila podobu rozhraní, tak není nutné komunikovat se serverem.

Například Vue.js má podobně jako PHP frameworky docela dobrý šablonovací systém (byť ne tak dobrý jako Latte):

```
&lt;ul v-if="items">
  &lt;li :id="`item-&amp;{i}`" v-for="(item, i) in items" :key="i">
    {{ item | capitalize }}
  &lt;/li>
&lt;/ul>
```

Oproti Reactu je výhoda, že validní HTML kód je zároveň validní Vue.js šablona.

## AMP

## Redakční systémy / CMS

S PHP se i hojně rozšířily redakční systémy, anglickou zkratkou CMS (*content management system*, tedy systém pro správu obsahu). A ať se přizná vývojář, který žádný ne(na)psal…

Asi nejznámnější je [WordPress](/wordpress). Ať už se jedná o blog, magasin, obsahovou stránku, wiki nebo e-shop, na pár kliknutí jde nainstalovat na obyčejný levný PHP hosting, vybrat si (zdarma nebo placenou) šablonu a na pár kliknutí ji nainstalovat v administraci.

Obsah se potom tvoří přes relativně povedený visuální editor obdobný Wordu.

Jedná se o asi nejjednodušší způsob, jak bez technickcých znalostí rozjet web s pohodlně spravovatelným a editovatelným obsahem a mít nad tím kontrolu (= běží to na hostingu, který mám pod kontrolou).

## Klikací online nástroje

Protože všechno jde zjednodušit a usnadnit, existují služby, které rovnou hostují vlastní CMS (nebo třeba klidně ten WordPress).

Člověk se tak nemusí starat o hosting, kde bude systém provozovat, a v případě problémů hledat a platit někoho, kdo je dokáže vyřešit.

Tyto služby většinou fungují za nějaký měsíční/roční poplatek, často je lze provozovat i zdarma výměnou za reklamu, která se na tak vytvořeném webu zobrazuje.

Web je pořád možné provozovat na vlastní doméně, takže v případě výpadku / zrušení / změny podmínek dané služby není člověk úplně ztracen.

Pokud má stránku zálohovanou, může ji obnovit jinde.

Vybrat toto řešení je vhodné zejména pro lidi, co neumí nebo nechtějí řešit nic navíc než vytvoření hezkého obsahu.

## Obsah na sociálních sítích

Velkým rozšířemí sociálních sítí hodně lidem odpadla potřeba vlastního webu. Proč si vytvářet vlastní blog, když jde příspěvek napsat na Medium, [Facebook](/facebook) nebo [Twitter](/twitter).

K čemu dělat webovou stránku např. restaurace, když stejně potřebuje mít svoji stránku na Facebooku. Fotky se dají na Instagram a videa na [YouTube](/youtube).

Proč nabízet své služby na vlastním webu, když existuje LinkedIn.

Zakládat a provozovat vlastní diskusní fórum, když existuje celosvětový Reddit nebo Stack Exchange (součástí je i vývojáři oblíbené Stack Overflow)?

Člověk na těchto sítí získá pravděpodobně snáz publikum, než když si vytvoří web na vlastní doméně díky základně dalších uživatelů, kterým se může doporučovat jeho obsah.

Má to ale svůj háček. Provozovatel dané služby má **plnou kontrolu nad publikovaným obsahem**. Může se tedy stát, že některý obsah bude blokovat, mazat, nedoporučovat dalším uživatelům a v extrémním případě třeba zablokuje celý profil.

Využít cizí webové služby / sociální sítě je nejspíš vůbec nejsnazší způsob, jak na internetu publikovat obsah. Má ale risiko ve ztrátě kontroly nad ním.