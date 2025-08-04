---
title: "Confirm"
headline: "Confirm"
description: "Confirm je JavaScriptová hláška pro potvrzení akce. Jak ji používat nebo nahradit vlastním dialogovým oknem."
date: "2014-02-23"
last_modification: "2014-03-15"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

Nejjednodušší použití je:

```
&lt;button onclick="**confirm**('Opravdu?')">
  Kliknout
&lt;/button>
```

  Kliknout

Kromě toho, že se tím zajistí zobrazení dialogového okna.

… nedělá ukázka prakticky nic.

## Zpracování `confirm`u

Zjištění, na které z tlačítek uživatel kliknul je prosté — při kliknutí na OK funkce `confirm` vrátí `true`, jinak `false`.

```
var potvrzeni = confirm("Opravdu");
if (potvrzeni) {
  // akce při potvrzení
}
else {
  // akce při stornování
}

```

## Potvrzení odkazu / odeslání formuláře

Velmi jednoduchý příklad, který ale už něco dělá, může být potvrzení prokliknutí odkazu nebo potvrzení odesální formuláře.

To se může hodit například u odhlašovacího tlačítka. Při potvrzení se tato stránka načte znovu, jinak se nestane nic.

  [Kliknout](/confirm)

### Potvrzení odeslání formuláře

V případě formuláře to bude vypadat následovně:

```
&lt;form action="./?" *onsubmit*="return **confirm**('Opravdu')">
  &lt;button type="submit">
    Odeslat
  &lt;/button>
&lt;/form>
```

Oba postupy využívají toho, že konstrukce `return false` zabrání provedení běžné akce. A právě `false` se za `return` dostane, když uživatel `confirm` stornuje (`confirm` vrátí `false`).

## Vlastní `confirm`

Podobně jako je možné si vytvořit [vlastní `alert`](/vlastni-alert), dá se o něco podobného pokusi i v případě **potvrzovací hlášky** `confirm`.

Stejně jako `alert` má i **originální** `confirm` zvláštní funkci — před odpovědí uživatele pozastaví běh skriptů. Tu vlastní *atrapa* pochopitelně nezajistí.

.confirm {
    position: fixed; width: 200px; height: 50px; padding: 1em; background: #0D6AB7; color: #fff; display: none; top: 0; left: 0; bottom: 0; right: 0; margin: auto;}

var potvrdit = function(text, el) {
    var cover = document.createElement("div");
    cover.className = "confirm";
    cover.style.display = "block";
    var content = document.createElement("div");
    content.innerHTML = text;
    var ok = document.createElement("button");
    ok.innerHTML = "Ano";
    var cancel = document.createElement("button");
    cancel.innerHTML = "Zrušit";
    cancel.onclick = function() {
        cover.style.display = "";
    };
    ok.onclick = function() {
        el.onclick = null;
        el.click();
    };
    cover.appendChild(content);
    cover.appendChild(ok);
    cover.appendChild(cancel);
    document.body.appendChild(cover);
    return false;
};

[Přejít na DJPW](http://djpw.cz)

[Samostatná ukázka](http://kod.djpw.cz/ikcb)