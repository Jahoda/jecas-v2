---
title: "Cacheování obsahu z cizí stránky"
headline: "Cacheování obsahu cizí stránky"
description: "Jak cacheovat výsledky obsahu staženého z cizí stránky."
date: "2014-05-17"
last_modification: "2014-05-20"
status: 1
tags: ["Hotová řešení", "PHP", "Získávání obsahu"]
---

Když potřebujeme [stáhnout obsah z cizí URL](/stazeni-stranky) (mimo náš web), jedná se většinou o **časově náročnější operaci**. Je sice možné [nastavit časový limit](/ziskani-obsahu-timeout), ale stejně je lepší výsledek *cacheovat*, je-li to možné a nepotřebujeme skutečně co nejnovější data.

Cílem je časově náročnou *cizí stránku* odbourat a použít místo toho **cache na vlastním webu**.

## Postup

Jak na to? Obsah se bude stále získávat funkcí `file_**get**_contents`, ale zároveň se bude funkcí `file_**put**_contents` ukládat k nám na web.

Ukládání ale proběhne jen v případě, že:

  - kopie na našem webu **ještě není vytvořená** (funkce `file_exist`),

  - kopie (soubor cache) už je moc **starý** (porovná se stáří souboru – funkce `filemtime`)

V takovém případě (soubor na našem serveru neexistuje nebo je starý) se stáhne a uloží aktuální obsah, jinak se pouze zobrazí výsledek z *cache*, což **bude rychlé**.

## Řešení

```
function ziskatSouborCache($url) {
  $platnost = 60 * 60; // 60 s * 60 min = 1 hodina
  $soubor = "**cache/**" . urlencode($url);

  if (
      file_exists($soubor) &amp;&amp; 
      (filemtime($soubor) > time() - $platnost)
     ) {
    // vrátíme obsah z keše
    return file_get_contents($soubor);
  }
  else {
    // obsah se musí stáhnout z cizí URL
    $obsah = file_get_contents($url);
    if ($obsah) {
      // uložení obsahu do cache
      file_put_contents($soubor, $obsah);
    }
    return $obsah;
  }
}
```

Použití je potom prosté:

```
echo ziskatSouborCache(
  "http://jecas.cz/ziskani-obsahu-cache"
);
```

A funkce `ziskatSouborCache` zařídí, jestli se soubor načte z **cizí URL** nebo z našeho serveru.

Pro funkčnost výše uvedeného skriptu je nutné vytvořit adresář `cache`, jinak pokus o uložení souboru **skončí chybou**.