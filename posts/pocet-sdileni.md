---
title: "Jak zjistit počet sdílení na FB a Twitteru"
headline: "Počet sdílení na Facebooku a Twitteru"
description: "Jak pomocí API získat ve JSONu počet sdílení stránky na Facebooku a Twitteru."
date: "2015-03-31"
last_modification: "2015-12-23"
status: 1
tags: ["Twitter", "Facebook", "Google+"]
---

Pro snadné sdílení adresy stránky ze strany návštěvníků na sociálních sítích jde použít přímo dostupná [tlačítka pro sdílení](/sdileci-tlacitka). Tato tlačítka dokáží ukazovat počet lidí, co stránku sdíleli.

  Výsledek použití nativních prvků sociálních sítí

Bohužel tyto prvky znamenají značnou **zátěž na rychlost načítání**, navíc provozovatelé zmíněných služeb mohou vloženými skripty šmírovat své přihlášené návštěvníky.

Pokud jsou počty sdílení pro návštěvníky zajímavé, nabízí se je získat jinou – méně obtěžující – cestou.

## Facebook

Facebooku dokáže připravit [JSON](/json) s potřebnými daty na adrese:

```
https://graph.facebook.com/?id=**http://example.com**
```

Výsledek je potom ve vlastnosti `shares`:

```
{
  "id": "http://example.com",
  "shares": **527617**
}
```

Pro použití přímo v JavaScriptu jde předat *callback* s názvem vlastní funkce, připojit adresu jako `&lt;script>`, což zavolá vlastní funkci s předanými daty. Tento postup se označuje jako [JSONP](/ajax#jsonp) (*JS objekt notace s „vycpávkou“*).

```
https://graph.facebook.com/?**callback**=*nazevFunkce*&amp;id=http://example.com
```

Kromě počtu sdílení umí Facebook ukazovat i případný počet komentářů. Výsledek:

```
/**/ *nazevFunkce*({
  "id": "http://example.com",
  "shares": 527617,
  "comments": 11354
});
```

## Twitter

  U Twitteru byl postup obdobný. Zobrazení počtu sdílení bylo ale následně **skryto** a není možné se k němu dostat.

U Twitteru je postup obdobný. Jen je logicky jiná adresa.

```
http://urls.api.twitter.com/1/urls/count.json?url=**http://example.com**
```

Počet *sdílení* na Twitteru je ve vlastnosti `count`:

```
{"count":12066,"url":"http:\/\/example.com\/"}
```

Použití JS callbacku je totožené jako u Facebooku.

## Google Plus

Google veřejně dostupné JSON API pro získání počtu „+1“ nenabízí. Jedna možnost nejspíš bude si nechat vytvořit API klíč a použít standardní metody. Bez získávání klíče jde počet sdílení získat parsováním obsahu stránky s rychlým tlačítkem pro sdílení:

```
https://plusone.google.com/u/0/_/+1/fastbutton?url=**http://example.com**
```

**Počet sdílení** z kódu jde vytáhnout regulárním výrazem „`window\.__SSR = \{c: (\d*).0 ,`“.

## Zobrazení počtu sdílení

Pro maximální rychlost načítání je vhodné údaje o počtu sdílení periodicky **získávat CRONem** a ukládat do DB.

  - Uživatel nebude muset čekat, až se pomocí API získá počet sdílení.

  - Z uložených dat půjde případně i snadno vykreslit graf sdílenosti stránky v čase.

## Odkazy jinam

  - [Monitor social endorsement using Node.JS](http://www.nodejs-news.com/fun-with-nodejs/monitor-social-endorsement/) – počítání sdílení ve spoustě sociálních sítích

  - [Google+ API](https://developers.google.com/+/api/) – dokumentace HTTP API