---
title: "Jak vytvořit WYSIWYG editor"
headline: "Vlastní jednoduchý WYSIWYG editor"
description: "Chceme-li na webu zadávat text a běžná <code>&lt;textarea></code> už nestačí, řešením je napsat si vlastní WYSIWYG editor."
date: "2013-06-05"
last_modification: "2013-06-08"
status: 1
tags: ["JavaScript", "WYSIWYG", "Hotová řešení", "Rady a nápady"]
---

Kromě toho, že lze použít již hotové komplexní editory jako.

TinyMCE (třeba i se souborovým managerem)
CKEditor

… je možné si vlastní základní editor s pár funkcemi nikterak obtížně vytvořit. V situaci, kdy chceme jen lehce vylepšit obyčejnou `&lt;textarea>`, to může dávat smysl.

## Jak na to

Základem může být `&lt;iframe>` se zapnutým `designMode`. Do kterého, kromě toho, že můžeme psát, lze přidávat různé příkazy pomocí `execCommand`. 

Seznam a kompatibilita jednotlivých akcí
Seznam jednotlivých akcí v Mozille-->
Seznam jednotlivých akcí v Exploreru-->

Poslední věc je synchronisace obsahu editoru se skutečným formulářovým polem. Obsah získáme pomocí vlastnosti [`innerHTML`](/innerhtml). Tuto hodnotu poté stačí při stisknutí odesílacího tlačítka vložit do skutečného formuláře a odeslat jej klasickou cestou. Anebo rovnou formulář odesílat [AJAXem](/ajax).

Takto získaný obsah je pochopitelně potenciálně risikový, takže je nezbytné provést vyčistění.

Budeme-li takový editor používat pro editaci, stačí k tomu určené HTML vypsat ve skriptu, který se připojí jako `src` do `&lt;iframe>`.

## Ukázka jednoduchého editoru

iframe {border: 1px solid #0D6AB7; background: #fff}

    Tučně
    Kurzíva
    Škrtnout
    Zobrazit HTML

var editor, iframe;
window.onload = function() {
    iframe = document.getElementById("editor");
    editor = iframe.contentWindow.document;
    editor.designMode = "on";
}

function format(akce) {
    iframe.contentWindow.focus();
    editor.execCommand(akce, false, null);
}

function getContent() {
    return editor.body.innerHTML;
}

### HTML kód

```
&lt;iframe id="editor" class="editor" frameborder="0">&lt;/iframe>
```

### JS kód

```
&lt;script>
var editor, iframe;
window.onload = function() {
    iframe = document.getElementById("editor");
    editor = iframe.contentWindow.document;
    editor.designMode = "on";
}

function format(akce) {
    iframe.contentWindow.focus();
    editor.execCommand(akce, false, null);
}
&lt;/script>
```

### Použití ovládacích tlačítek

```
&lt;button onclick="format('bold')">Tučně&lt;/button>
```