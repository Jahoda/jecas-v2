---
title: "Odstranění nepoužívaných překladů ve Vue.js"
headline: "Odstranění nepoužívaných překladů ve Vue.js"
description: "Jak ve Vue.js automaticky udržovat překlady očištěné o nepoužívané klíče."
date: "2021-08-23"
last_modification: "2021-08-23"
status: 1
tags: ["JavaScript", "Vue.js", "Lokalisace"]
---

Pro vytváření vícejazyčného webu ve Vue.js je běžným postupem používat plugin [Vue I18n](https://kazupon.github.io/vue-i18n/) (I18n je zkratka slova **i**nternationalizatio**n**, kde se **18** písmen uprostřed nahrazuje číslem).

Překlady se obvykle používají tak, že existuje soubor ve formátu [JSON](/json), kde jsou jednotlivé klíče a přeložené hodnoty.

```
{
  "button": {
    "send": "Odeslat"
  }
}
```

V šabloně je potom na potřebném místě překlad vyvolán přes `$t('button.send')`.

Při používání překladů se lze setkat s několika hlavními nešvary:

    nepoužívané překlady,

    neexistující překlady,

    nepřeložené texty

Důvody, proč to řešit, jsou očividné.

Nepoužívané překlady se **zbytečně stahují** návštěvníkům a zbytečně zaměstnávají překladatele.

Neexistující překlady komplikují používání, protože místo chybějícího překladu se zobrazí buď klíč, takže místo *Odeslat* bude na stránce *button.send*, nebo vůbec nic.

**Nepřeložené texty** často vzniknou během vývoje, kdy se v rámci zjednodušení zapíše text natvrdo do šablony. Takový text potom není možné přeložit do dalších jazyků.

## ESLint plugin

Zmíněné neduhy a ještě další věci dokáže hlídat ESLint plugin [eslint-plugin-vue-i18n](https://github.com/intlify/eslint-plugin-vue-i18n).

Stačí ho nainstalovat:

```
npm install --save-dev eslint @intlify/eslint-plugin-vue-i18n
```

A nakonfigurovat v `.eslintrc.js`:

```
module.export = {
  extends: [
    'plugin:@intlify/vue-i18n/recommended'
  ],
  rules: {
    '@intlify/vue-i18n/no-dynamic-keys': 'error',
    '@intlify/vue-i18n/no-missing-keys': 'error',
    '@intlify/vue-i18n/no-unused-keys': [
      'error',
      {
        extensions: ['.js', '.vue']
      }
    ]
  },
  settings: {
    'vue-i18n': {
      // cesta k překladům
      localeDir: './src/localization/cs/*.json',
      // verse vue-i18n
      messageSyntaxVersion: '^9.0.0'
    }
  }
}
```

Výhoda použití ESLint pluginu je v tom, že pokud se bude správně vyžadovat před deployem aplikace, je prakticky zajištěno, že se výše uvedené problémy nedostanou do produkčního prostředí.

## Dynamické překlady

Asi největší problém při snaze o lintování překladů bude nejspíš s dynamickými překlady.

O co jde?

O klíče překladů složené dynamicky pomocí proměnných:

```
$t(`services.overview.${service.name}.title`)
```

Na první pohled do ohromně šetří psaní a zkracuje kód. Na druhou stranu to bohužel **znemožňuje mít 100% kontrolu** na překlady.

Pokud je cílem mít neprůstřelné překlady, jde dynamické skládání klíčů považovat za **anti-pattern** a je potřeba se tomu vyvarovat i za cenu psaní více kódu.

## Extrahování překladů

Další užitečný nástroj je [vue-i18n-extract](https://github.com/pixari/vue-i18n-extract), který dokáže hned několik věcí:

Najít chybějící, nepoužité a dynamické klíče.

Případně je rovnou odstranit nebo naopak přidat do JSON souborů s překlady.

Vývojář může během tvorby psát do kódu pouze zástupné klíče, které se jedním příkazem následně přidají do JSONu s překlady.

## Jednorázové odstranění

Pro jednorázové odstranění nepoužívaných překladů jde dobře použít i nástroj [i18n-unused](https://github.com/mxmvshnvsk/i18n-unused).

Stačí nainstalovat:

```
npm install --save-dev i18n-unused
```

Přidat konfiguraci do souboru `i18n-unused.config.js`:

```
module.exports = {
  localesPath: 'src/localization/default',
  srcPath: 'src',
  excludeKey: [
    'apiErrors',
    'enums',
    'faq.topics',
    'footer.items',
  ],
}
```

A pustit:

```
i18n-unused remove-unused
```

Šikovné je, že jde do `excludeKey` zadat klíče, které se nemají odstranit, což se hodí hlavně pro dynamické klíče, jsou-li v projektu.