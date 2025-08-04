---
title: "Jak lintovat JavaScript pomocí ESLintu"
headline: "Lintování JS pomocí ESLintu"
description: "Pro dosažení vyšší kvality a jednotnosti kódu je dobré používat nástroj k tzv. lintování."
date: "2019-02-19"
last_modification: "2019-02-19"
status: 0
tags: []
---

Při programování v JavaScriptu existuje řada způsobů, jak tutéž funkcionalitu zapsat kódem v různém stylu:

```
if (a) alert(1)

if ( a )
    alert( 1 )
    
if (a) {
    alert(1)
}

if (a)
{
    alert(1);
}
```

Díky nástroji [**ESLint**](https://eslint.org) jde potom automaticky odhalit a často i **automaticky opravit** odlišnosti oproti domluvené podobě kódu (anglicky *code style*).

Proč to dělat?

    **Pohodlí** – autor kódu nemusí řešit, jestli kód odsazovat taby nebo mezerami, jestli psát jednoduché nebo dvojité uvozovky, jestli psát na konce řádků středníky, jestli psát názvy proměnných ve stylu *lowerCamelCase* či *snake_case* apod.

    Kód se automaticky upraví, aby vyhovoval nastavenému code stylu.

    ESLint je hodně rozšířen a podporován v editorech, takže konfigurace je součástí projektu a při jeho otevření se může nastavení automaticky promítnout v editoru.

    **Kvalitnější kód** – ESLint není jen o odsazování a odstraňování středníků. Dokáže třeba i upozornit na nedefinované proměnné, zoptimalisovat importy, nahradit [`let`](/js-var-let) za `const` na místech, kde to dává smysl a další…

    **Jednotný styl** – bez automatického formátování je dost těžké udržet jednotný styl kódu, natož potom při práci ve více lidí.

    Jednotný styl napomáhá lepší čitelnosti / orientaci v kódu.

    **Přeformátování** – bez stanoveného a vyžadovaného code stylu se často stává, že různí lidé v různých editorech mají nastavené různé formátování, které automaticky aplikují.

    Ve versovacích systémech (Git) je potom nepořádek kvůli změnám řádků kvůli formátování.

## Jaký standard zvolit?

První pravidlo zní, že **jakýkoliv jednotný code style je lepší než nic**. 

Osobně preferuji [JavaScript Standard Style](https://standardjs.com).

Jediné, co mi na něm vadí, je zakázání místo vynucení čárky za posledním prvkem víceřádkového pole (pravidlo [`comma-dangle`](https://eslint.org/docs/rules/comma-dangle)):

```
let pole = [
  'první',
  'druhá',
  'třetí'**,**
]
```

Psát čárku za poslední položkou je výhodné kvůli versování v Gitu, protože při přidání nové položky do pole se nemění nesouvisející řádek.

Proto ho instaluji s podporou konfigurace.

## Instalace

Nainstalovat lintování ESLintem s konfigurací JavaScript Standard Style a možností nějaké nastavení změnit jde následovně:

```
npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node

```

Pro konfiguraci se potom vytvoří soubor `.eslintrc` ve stejné složce jako je `package.json` s následujícím obsahem:

```
{
  "extends": "standard",
  "env": {
    "browser": true
  },
  "rules": {
    "comma-dangle": [
      "error",
      "always-multiline"
    ]
  }
}
```

Pro pohodlné spuštění nad všemi `*.js` soubory ze složky `./src` (+ podsložek) se ještě přidá skript do `package.json`:

```
"scripts": {
  "eslint": "eslint \"src/**/*.js\"",
  "eslint-fix": "eslint \"src/**/*.js\" --fix"
},
```

Spustit kontrolu a kontrolu s opravou jde spustit přes `npm run eslint`, respektive `npm run eslint-fix`.

### React

Při lintování aplikace v **Reactu** se hodí ještě nainstalovat `eslint-plugin-react`:

```
npm install --save-dev eslint-plugin-react
```

A do konfigurace přidat následující:

```
{
  "extends": "standard",
  **"plugins": ["react"],**
  "env": {
    "browser": true
  },
  "rules": {
    **"react/jsx-uses-react": "error",**
    **"react/jsx-uses-vars": "error",**
    "comma-dangle": [
      "error",
      "always-multiline"
    ]
  }
}

```

## Automatická kontrola

Přidat do projektu lint je hezké, ale pokud se nijak nevynucuje, aby jeho pravidly kód prošel, může to být skoro zbytečné. Protože to nikdo nebude pouštět a dodržovat.

Existují následující možnosti, které správnost kontrolovat:

    **Editor/IDE** – lepší editory (třeba [Php/WebStorm](/phpstorm-vs-webstorm)) dokáží upozorňovat na prohřešky oproti ESLint konfiguraci. A například správnost zkontrolovat před commitnutím.

    **Git hooky** – jedná se o možnost, jak při různých akcích s Gitem pouštět skripty. Při commitnutí se tak může provést kontrola a třeba i automatické opravení kódu podle pravidel.

    **CI** (*Continuous Integration*) – pro pohodlný vývoj je fajn používat nějakou službu pro *průběžnou integraci* (např. GitHub nebo GitLab).

    Ta při pushnutí (`git push`) do vzdáleného repositáře může automaticky pustit kontrolu nad kódem (tj. `npm run eslint`) a vyžadovat bezchybný výsledek pro umožnění dostat kód do hlavní (`master`) větve.

Co z toho si vybrat? Nejneprůstřelnější je **vyžadovat správnost v CI** – to jediné zaručí, že se do hlavní větve projektu nedostane špatný kód. Ostatní řešení může vývojář obejít.

Upozorňování v editoru je dobré pro pohodlí, protože je okmažité.

Použít Git hooky se hodí, pokud není možné/chtěné používat CI.

## Jak začít s ESLintem

Nejrychlejší postup je následovný.

  - Nainstalovat a nakonfigurovat lint.

  - Automaticky opravit, co půjde (tj. pustit s parametrem `--fix`).

  - Vypnout všechna neprocházející pravidla, až lint lokálně projde v pořádku.

  - Dostat automaticky opravený kód a konfiguraci do hlavní větve projektu.

  - Upravit CI, aby vyžadovalo úspěšně lintem projít.

  - Následně odstraňovat vypnutá pravidla a opravovat kód.

Výsledek prvního spuštění nad nelintovaným projektem může vypadat nějak následovně:

```
640 problems (640 errors, 0 warnings)
```

Většina věcí by měla jít vyřešit automaticky:

```
64 problems (64 errors, 0 warnings)
```

Jednotlivé chyby se zobrazují nějak takto:

```
C:\messenger\src\components\messages\reducer.js
373:13  error  Identifier 'GA_Callback' is not in camel case  **camelcase**

```

Na konci řádku je typ pravidla, které neprošlo. Jde ho tedy vypnout v `.eslintrc` v sekci `rules`:

```
"rules": {
  "**camelcase**": "off"
}
```

## Lintování JS v HTML

Kontrolovat JS jde i v HTML souborech, pokud se tam nachází. Umí to následující plugin.

    - [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html) – plugin pro lintování JS v HTML souborech