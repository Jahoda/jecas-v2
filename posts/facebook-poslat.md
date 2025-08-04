---
title: "Odeslání příspěvku přes Facebook API"
headline: "Odeslání příspěvku na stránku přes FB API"
description: "Jak v PHP odesílat příspěvky na Facebook stránku (Page) pomocí Facebook API."
date: "2014-06-27"
last_modification: "2014-09-24"
status: 1
tags: ["Hotová řešení", "Facebook"]
---

Máme-li vlastní **FB stránku** a chceme například dát vědět jejím fanouškům o novém příspěvku na webu, hodí se možnost odeslat zprávu na Facebook přímo z **redakčního systému**.

Jak toho docílit?

## Vytvoření aplikace

    Kliknout na stránce [developers.facebook.com](https://developers.facebook.com/) na *Apps → Create a New App*.

    Zadat název aplikace a určit kategorii. V případě, že chceme využít API k posílání příspěvků na svou FB stránku je vhodné zvolit *Apps for Pages*.

    Po opsání ověřovacího kódu by se aplikace měla vytvořit.

    Na stránce [developers.facebook.com/tools/explorer/](https://developers.facebook.com/tools/explorer/) si potom aplikaci vybereme a zvolíme *Get Access Token*.

    V objevivším se okně zvolíme oprávnění, která budeme potřebovat. Pro přispívání na vlastní Facebookovou stránku se budou hodit položky *manage_pages* a *publish_actions* z karty *Extended Permissions*.

    Nyní je třeba aplikaci udělit oprávnění ze svého účtu na Facebooku.

    Nejprve povolit aplikaci přístup do svého účtu a potom do svých *FB Pages*.

    Nyní je vše připravené k **využívání API**.

## Publikování příspěvků

Pro psaní na stránku „jako stránka“ potřebujeme zjistit:

    **ID stránky**. To získáme v nastavení stránky v nabídce *Page Info* úplně dole jako *Facebook Page ID*.

    **Access token** stránky. Ten lze získat například využitím [Graph API Exploreru](https://developers.facebook.com/tools/explorer/).

    Po vybrání příslušné aplikace stačí poslat **GET požadavek** na:

    ```
&lt;id-stránky>/?fields=access_token
```

    Tj. například:

  -->

    **App ID** a **App Secret**

 ACCESS_TOKEN,
   'message' => 'Příspěvek zaslaný přes FB API',
);

 $ch = curl_init();
 curl_setopt($ch, CURLOPT_URL, $url);
 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
 curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
 curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 curl_setopt($ch, CURLOPT_POST, true);
 curl_setopt($ch, CURLOPT_POSTFIELDS, $attachment);
 $result = curl_exec($ch);
 header('Content-type:text/html');
 curl_close($ch);

 echo $result;
```

-->

Celý proces odeslání příspěvku potom funguje následovně:

    V prohlížeči, kde jsme **přihlášeni k účtu**, který má oprávnění spravovat stránku, spustíme vlastní PHP skript pro odeslání (`example.com/odeslat.php`).

    Tento skript hlavičkou `header` přesměruje na stránku Facebooku (předá ji ID aplikace a URL sebe sama). V případě, že je člověk přihlášen ke svému profilu, Facebook **přesměruje zpátky** na určenou adresu a v parametru URL (tzv. *query string* – QS) pošle kód.

    S tímto *kódem* můžeme získat *access token* k dané **aplikaci**.

    S *access tokenem* **aplikace** následně získáme *access token* stránky (*Page*).

    S *access tokenem* **stránky** konečně můžeme učinit konečný požadavek, kterým **publikujeme příspěvek**.

[Hotový skript na GitHubu](https://github.com/Jahoda/send-facebook-page/blob/master/index.php) (našel jsem ho někde na internetu, šel by napsat lépe, ale **funguje**)

## Odkazy a zdroje

  - Developers.facebook.com: [Publikování](https://developers.facebook.com/docs/graph-api/using-graph-api/v2.0#publishing)