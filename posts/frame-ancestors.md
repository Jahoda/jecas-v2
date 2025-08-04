---
title: "Jak umožnit načítání stránky v rámu pomocí frame-ancestors"
headline: "Zobrazování stránek v rámech s <code>frame-ancestors</code>"
description: "Pomocí CSP hlavičky <code>frame-ancestors</code> jde umožnit načtení stránky do <code>&lt;iframe></code>."
date: "2023-07-01"
last_modification: "2023-07-04"
status: 1
tags: ["Prohlížeče", "Bezpečnost"]
---

HTML značka [`&lt;iframe>`](/ramy#iframe) má dost zajímavou historii.

V dávných dobách se používala pro načítání společných částí stránek jako je třeba menu nebo patička (než se víc prosadilo např. [skládání obsahu v PHP](/include)).

Největší využití má ale nejspíš pro zobrazení cizích webů.

Dříve se touto značkou hojně řešilo vkládání dynamického obsahu. Jako třeba různých anket, chatů, komentářů a podobně.

Takové věci se dnes obvykle řeší spíš JavaScriptem, který do stránky přímo přidává potřebné HTML elementy.

Asi nejrozšířenější je používání `&lt;iframe>` pro [reklamu](/reklama), protože JS je hodně mocný kvůli tomu, že má prakticky neomezenou kontrolu nad stránkou.

A u reklamy, která se ve finále často načítá bůhvíodkud, je spíš žádoucí, aby se stránkou nemohla manipulovat.

## Clickjacking

Další hodně populární využití rámů byl tzv. [clickjacking](/clickjacking).

To spočívalo v tom, že se na stránku umístil nějaký lákavý prvek, na který má návštěvník kliknout. Přes ten se [absolutně naposicovala](/position#absolute) nějaká stránka v `&lt;iframe>`.

Díky zprůhlednění rámu této stránky CSS vlastností [`opacity`](/opacity) tak mohl návštěvník nevědomky kliknout na nějakou akci.

## Zákaz načtení do `&lt;iframe>`

Jako prevence clickjackingu je dost běžné, že dnes skoro žádný web nejde do rámu načíst.

Dříve se to řešilo hlavičkou `X-Frame-Options`:

```
X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN
```

## Povolení vybraných domén

Právě `frame-ancestors` je nástupcem `X-Frame-Options` sloužící k povolení konkrétních webů, které mohou danou stránku načíst do rámu.

Tyto domény je nutné vyjmenovat. Takže provozovatel webu musí ručně *udělit souhlas* s načítáním do rámu. Jinak to prohlížeče zablokují.

Používá se přes hlavičku `Content-Security-Policy`:

```
Content-Security-Policy: frame-ancestors 'self' https://jecas.cz https://*.example.com;
```

Tento zápis znamená, že stránka, která tuto hlavičku posílá, může být vložena do rámu na:

    `'self'` – na stejné doméně

    `https://jecas.cz` – na stránce `https://jecas.cz`

    `https://*.example.com` – na libovolné subdoméně `example.com` s [HTTPS protokolem](/https)

Klíčovým slovem `'none'` se celkově zablokuje načtení do rámu.

      MDN: [CSP: frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors)

## Jak nastavit HTTP hlavičku

Nastavení `Content-Security-Policy` hlavičky závisí na použité technologii.

V každém případě musí hlavička přijít přímo ze serveru. Nastavit ji například klientským JS tak není možné.

### Apache `.htaccess`

```
Header set Content-Security-Policy "frame-ancestors 'self' https://example.com"
```

### Nginx

```
add_header Content-Security-Policy "frame-ancestors 'self' https://example.com";

```

### PHP

```
header("Content-Security-Policy: frame-ancestors 'self' https://example.com");

```