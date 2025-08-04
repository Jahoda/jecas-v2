---
title: "Nette z pohledu kodéra"
headline: "Nette z pohledu kodéra"
description: "Jak kódovat šablony pro weby používající Nette."
date: "2015-08-17"
last_modification: "2015-08-17"
status: 0
tags: []
---

[Nette Framework](http://nette.org/) je poměrně rozšířený webový framework, na kterém běží řada českých webů.

Weby postavené na Nette zpravidla používají **šablonovací systém Latte**. Soubory Latte šablon mají příponu `*.latte` a jedná o *trochu vylepšené HTML*.

V Latte šablonách jde totiž **programovat v PHP**.

## Jak se vyznat v Nette

Typické rutinní úkoly se s Nette řeší skoro samy, takže člověk ani nemusí umět moc programovat, **horší je se vyznat v adresářové struktuře**.

### PHP vs. Nette

Pokud je cílem v čistém PHP **vypsat článek** z database, může to vypadat v nejjednodušší formě nějak takto (s využitím [PDO](/pdo)):

```
&lt;?php
$dotaz = $pdo->prepare(
  "SELECT nadpis, text FROM clanky WHERE id = ?"
);
$dotaz->execute(array($idClanku));
$clanek = $dotaz->fetch();
?>
&lt;h1>&lt;?=$clanek["nadpis"]?>&lt;/h1>
&lt;?=$clanek["text"]?>

```

V kódu je promíchán PHP kód, SQL příkaz i HTML kód.

Toto omílané míchání kódu je u složitějších aplikací trochu nešikovné, takže se to Nette **snaží oddělit**.

Proto se ve složce `app` nacházejí různé adresáře jako `models`, `presenters`, `templates` a podobně.

Vypsání téhož článku v Nette se tedy zpravidla dělá následovně:

    **Příkazy do DB** se ukládají do tzv. *modelu*, ten se může nacházet ve složce `models` a u jednodušších webů může existovat jediný model v souboru `Model.php`.

    Tento model nejprve obsahuje **připojení k databasi**, které se definuje v konfiguračním souboru typicky umístěném v `config/config.neon`.

    Jednotlivé **příkazy do DB** jsou potom uložené v samostatných metodách, například:

    ```
public function getPage($id) {
  return $this->database->query(
    "SELECT nadpis, text FROM stranky WHERE id = ?", 
    $id
  );
} 
```

    Kromě psaní SQL jde použí i jiný způsob, kdy se člověk nemusí obtěžovat se skládáním SQL:

    ```
public function getPage($id) {
  return $this->database->table('stranky')->where("id", $id)->fetch();
} 
```

    Nyní je potřeba **připravit získaná data pro šablonu** – to dělají tzv. *presentery*. Typický presenter hlavní stránky se nachází v `presenters/HomepagePresenter.php`

    Nejjednodušší použití je takové, že se přiřazení dat do šablony vloží do metody `renderDefault`:

    ```
public function renderDefault($id) {
  $this->template->clanek = $this->model->getPage($id);
}
```

    Nakonec je tak v šabloně `templates/Homepage/default.latte` možné provést **elegantní vypsání** článku:

    ```
&lt;h1>{$clanek->nadpis}&lt;/h1>
{$clanek->text}

```

## Přesměrování

Například po odeslání formuláře je dobré provést přesměrování, aby formulář člověk náhodou neodeslal dvakrát.

  - Přesměrování na tutéž stránku: `$this-redirect('this')`

  - Přesměrování na presenter: `$this->redirect('Article:edit', 5);`

## ID vloženého řádku

Získat ID vloženého záznamu do database jde přes:

```
$newArticle = $this->model->insertArticle($values);
$id = $newArticle->id;
```

## Latte filtry

    - [Jak napsat vlastní Latte filtr v Nette?](https://petrjirasek.cz/blog/jak-napsat-vlastni-latte-filtr-v-nette)

## Detekce mobilu

Nette přímo umí **detekovat na straně serveru mobilní prohlížeč**. Slouží k tomu konstrukce:

```
$mobile = Nette\Environment::getContext()->browser->isMobile();
```

Nemá-li se nějaký obsah na mobilu zobrazovat (například reklamy), je lepší ho vůbec do prohlížeče návštěvníka neposílat než ho jen skrýt pomocí `@media` pravidla.

Hodí se to hlavně obsahu, jehož stažení nejde zabránit (obrázky, skripty).