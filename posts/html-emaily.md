---
title: "HTML emaily"
headline: "HTML e-maily"
description: "Vytváření HTML e-mailů, které fungují ve všech emailových klientech."
date: "2014-05-20"
last_modification: "2014-05-20"
status: 0
tags: []
---

Při odesílání e-mailů existuí dvě základní možnosti:

  poslat zprávu v čistém textu,

  vytvořit HTML stránku e-mailu a tu odeslat

Oba přístupy mají své výhody i nevýhody.

## Proč psát e-maily v plain textu

S prostým textem je obecně méně problému. Na druhou stranu existují případy, kdy je potřeba odběratelům poslat poutavější obsah, než je prostý text. Jedná se typicky o obrázky a podobně.

## Možné problémy

Mezi e-mailovými klienty existují značné rozdíly ve schopnostech, co je možné zobrazit.

Vzhledem k rozdílnému chování různých e-mailových klientů je tvůrce HTML e-mailů tlačen k používání jen těch věcí, co fungují všude.

**Mobile first** –
Podobně jako většinou u webů je vhodné i e-mail vytvářet přístupem mobile first. Dle statistik používání mobilní e-mailové klienti vedou. Kvůli omezené funkčnosti @media pravidel se tak nabízí dokonce přístup „mobile only“, protože není všude možné vytvořit optimální e-mail pro mobil i desktop.

Media queries s !important, aby přebily inline styly.

  - :hover efekty,

- inline SVG,

- posicování (absolutní, fixní i relativní)

- background obrázky

- CSS gradient

- obrázky připojené přes Data URI (Gmail)

- nepoužívat margin

- padding používat jen u tabulek

    - Campaign Monitor: [The Ultimate Guide to CSS](https://www.campaignmonitor.com/css/) – přehledný nástroj pro zjištění, co v prohlížečích funguje

## Inline styly

Používání CSS je lépe podporované v atributech `style`. Z externího CSS nebo stylů v hlavičce je tak vhodné vše inlinovat. V PHP existují hotová řešení:

    - [CssToInlineStyles class](https://github.com/tijsverkoyen/CssToInlineStyles)

    - [Emogrifier](https://github.com/jjriv/emogrifier)

Případně JS řešení:

    - [Juice](https://github.com/Automattic/juice) – používá [web-resource-inliner](https://github.com/jrit/web-resource-inliner)

Pokud není potřeba inlinování stylů automatisovat, jde použít online nástroje:

    MailChimp: CSS Inliner Tool

## Hotová node.js řešení

    - [Dovetailer: HTML Email Generator](https://github.com/maxlapides/dovetailer) – předpřipravené řešení, které umí SASS, Markdown a Nunjucks šablony

    - [Styliner](https://github.com/SLaks/Styliner)

## Testování HTML e-mailů

### EML formát

Pro testování v desktopových e-mailových klientech se může hodit uložit e-mail do `*.eml` souboru. To je téměř obyčejný HTML soubor doplněný o pár hlaviček s informaci o e-mailu:

```
MIME-Version: 1.0
Date: Sat, 25 May 2019 18:18:46 +0200
From: Odesílatel &lt;email@example.com>
Subject: Přednět e-mailu
Thread-Topic: Přednět e-mailu
To: "Příjemce" &lt;email@example.com>
Content-Transfer-Encoding: quoted-printable
Content-Type: text/html; charset="utf-8"
```

Tento soubor jde upravovat a otevírat v e-mailových klientech bez nutnosti něco posílat.

    - [Premailer](http://premailer.dialect.ca) – odeslání HTML na e-mail

    - [PutsMail](https://putsmail.com) – inlinování CSS a odeslání HTML na vybrané e-mailové adresy

## Datová velikost

    - [Introducing Image Check: Never Send an Email with Broken Or Slow-Loading Images Again](https://litmus.com/blog/introducing-image-check-never-send-an-email-with-broken-or-slow-loading-images-again)

    - [How does email file size affect deliverability?](https://www.emailonacid.com/blog/article/email-development/how_does_email_file_size_affect_deliverability)

Jaká by měla být datová velikost HTML e-mailů a jaké jsou možné problémy při doručování:

## HTML e-maily na mobilech

Velká část e-mailů bývá otevírána na mobilech.

Velikost do 100 kB.

Počáteční textový obsah e-mailu se zobrazuje jako úryvek – je proto dobré na začátek umístit text s bohatou informační hodnotou.

      - Sitepoint.com: [5 Golden Rules For Mobile Email Design](http://www.sitepoint.com/golden-rules-mobile-email-design/)

### Změna velikosti písma

Na iOS se příliš malé písmo automaticky přizpůsobuje. Vypnout to jde přes:

```
* { -webkit-text-size-adjust: none; }
```

### Automatický převod telefonů

IOS se snaží v textu detekovat telefonní čísla a převádět je do klikací podoby. Vypnout tento převod jde přes:

```
&lt;meta name="format-detection" content="telephone=no">
```

Jiná možnost je rozbít telefony nebo URL neutrálními HTML značkami:

```
&lt;p>http&lt;span>://&lt;/span>mydomain&lt;span>.&lt;/span>com&lt;/p>
```

## Formuláře v e-mailech

Do HTML e-mailu je teoreticky možné vložit [formulář](/formulare). Podpora je ale nejistá a používat formulář v e-mailu není pro uživatele obvyklé, takže je lepší se formulářům uvnitř mailu vyhnout.

  - Sitepoint.com: [Forms in e-mail](http://www.sitepoint.com/forms-in-email/)

## Hotové šablony

Vytvářet HTML šablonu pro nový e-mail není nutné od píky, ale jde využít nějakou hotovou šablonu:

  - [Litmus šablony](https://litmus.com/community/templates) – připravené šablony pro různé příležitosti

## Odkazy

  - [The Coming Revolution in Email Design](http://alistapart.com/article/the-coming-revolution-in-email-design) – budoucnost HTML e-mailů

  - [Plain Text vs. HTML Emails: Which Is Better?](http://blog.hubspot.com/marketing/plain-text-vs-html-emails-data) – e-maily v plain-textu mají lepší výsledky (počet otevření a prokliků)

  - [Podporované CSS vlastnosti v e-mailových klientech](http://www.campaignmonitor.com/css/)

  **Testování:**
    
      - [Email on Acid](http://www.emailonacid.com)

      - [Litmus](http://litmus.com)

  - Sitepoint: [My Current HTML Email Development Workflow](http://www.sitepoint.com/my-current-html-email-development-workflow/)

Responsive transactional HTML email templates
  
  - [Responsivní e-maily](http://alistapart.com/article/can-email-be-responsive)

  - [Ideas Behind Responsive Emails](http://css-tricks.com/ideas-behind-responsive-emails/)

  - [Really Good Emails](http://reallygoodemails.com/) – příklady zajímavých emailů.

  - Sitepoint.com: [Rules for Best Practice Email Design: Coding Practices](http://www.sitepoint.com/rules-best-practice-email-design-coding-practices/)

  - Sitepoint.com: [A Box of Tricks for Building Responsive Email](http://www.sitepoint.com/tricks-building-responsive-email/)

  - Osvaldas.info: [Forcing Description Text In a Newsletter](http://osvaldas.info/forcing-description-text-in-a-newsletter)

  - [CSS Inliner Tool](http://templates.mailchimp.com/resources/inline-css/) – převod CSS na inline-styly

  - [Obecná doporučení aneb jak začít (Kódování html e-mailů a newsletterů) - Frontendisti. ](https://www.youtube.com/watch?v=mUBOX7-ohqw)

  - [15+ Awesome Free Email Templates to Download](http://webdesignledger.com/freebies/free-email-templates-to-download)

  - Scotch.io: [Building Responsive Email Templates with Ink](https://scotch.io/tutorials/building-responsive-email-templates-with-ink) – kompletní průvodce tvorbou HTML e-mailů

  - [30 Free Responsive Email and Newsletter Templates](http://speckyboy.com/2014/07/10/free-responsive-email-templates/)

  - [The Fab Four technique to create Responsive Emails without Media Queries](https://medium.freecodecamp.com/the-fab-four-technique-to-create-responsive-emails-without-media-queries-baf11fdfa848#.uzizw8cx7) – responsivní e-maily bez `@media` pravidla

  - [Plain Text vs. HTML Emails: Which Is Better? [New Data]](https://blog.hubspot.com/marketing/plain-text-vs-html-emails-data)