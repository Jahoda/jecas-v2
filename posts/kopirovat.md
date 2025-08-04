---
title: "Kopírování do schránky"
headline: "Kopírování do schránky"
description: "Jak s použitím JS zkopírovat uživateli nějaký text do schránky."
date: "2014-04-27"
last_modification: "2015-04-25"
status: 1
tags: ["JavaScript", "Hotová řešení", "Schránka"]
---

Občas se hodní návštěvníkovi usnadnit/ovlivnit **kopírování obsahu do schránky**. Jaké existují možnosti?

## Zpříjemnění kopírování

Jelikož všechny prohlížeče nenabízejí nějakou **standardní metodu**, jak požadovaný text přímo zkopírovat do schránky, můžeme uživateli **obsah ke zkopírování** připravit, aby se mu co nejpohodlněji zkopíroval standardním způsobem klávesovou zkratkou (například) Ctrl + C (nemusel nic složitě v textu označovat a podobně).

### Obsah v elementu `&lt;input>`/`&lt;textarea>`

U těchto **formulářových polí** jde využít toho, že se dají snadno celá [označit JavaScriptem při kliknutí](/oznaceni-textu).

    Zkopírujte si adresu: 

### Okno `prompt`

Další možnost je využít vyskakovacího okna, které běžně slouží (či spíš v minulosti sloužilo) k zadání vstupu od uživatele. S tím, že do pole pro vstup umístíme obsah ke zkopírování:

    function kopirovat(text) {
      prompt("Zkopírujte si URL:", text); 
    }

    Zkopírovat adresu

## Nastavení kopírovaného textu

Sice nelze ve všech prohlížečích standardně přímo něco nastavit uživateli do schránky, lze však ovlivnit obsah, který si zkopíruje (když kopírování sám vyvolá – Ctrl + C a podobně).

[Ukázka](http://kod.djpw.cz/qwcb) funkční v **Chrome**, **Firefoxu** a **Opeře** (nefunkční v **IE**).

Napříč prohlížeči funkční je podstrčit uživateli jiný obsah, než se zdá, a který si potom **sám zkopíruje**. To se dělá tak, že při kopírovací události (`oncopy`) vyvolané uživatelem se vytvoří neviditelný HTML element s požadovaným obsahem – ten se standardní cestou zkopíruje – a potom už stačí jen „zahladit stopy“ (element pro kopírování odstranit, vrátit původní výběr textu a podobně).

Tento postup se používá například při [přidávání *zdroje*](http://diskuse.jakpsatweb.cz/?action=vthread&forum=8&topic=118171) do kopírovaného obsahu.

## Přímé zkopírování tlačítkem

Přece jenom existuje způsob, jak **přímo zkopírovat obsah do schránky** ve všech prohlížečích. Přesněji řečeno pro různé prohlížeče existují různé funkční postupy.

### Kopírování pomocí `execCommand`

**Chrome 43+**, **Opera 29+**, **Firefox 41+** a **IE 10+** i [**Edge**](/microsoft-edge) dokáží zkopírovat do schránky text pomocí příkazu `execCommand`, který se používá hlavně u [WYSIWYG editorů](/vlastni-wysiwyg).

Před zavoláním `copy` je nutné nejprve označit obsah elementu, jehož obsah se bude kopírovat. Celý kód může vypadat následovně.

```
var element = document.querySelector('.zkopirovat');  
var range = document.createRange();  
range.selectNode(element);  
window.getSelection().addRange(range);  
document.execCommand('copy');
window.getSelection().removeAllRanges(); 
```

    - [Živá ukázka](http://kod.djpw.cz/homb) – kopírování do schránky pomocí *range*

Desktopový **Internet Explorer** vyžaduje povolení k přístupu do schránky.

V **Chrome**, **Opeře** nebo mobilním **IE** se obsah zkopíruje bez dalších dotazů.

### Přímé kopírování v IE

V **Internet Exploreru** existuje ještě jiná možnost rovnou kopírovat do schránky – přes `clipboardData`. Opět je vyžadováno udělení přístupu.

```
if (window.clipboardData) {
  clipboardData.setData("text", "Obsah ke zkopírování");    
}
```

## Flash řešení ZeroClipboard

Napříč prohlížeči s nainstalovaným **Flashem** dobře funguje nástroj ZeroClipboard. Ten nad tlačítko vloží neviditelný flashový objekt, který odchytne kliknutí a dokáže zapsat obsah do schránky bez dotazování uživatele.

Jelikož podíl zařízení s nainstalovaným/povoleným Flashem klesá, klesá i podpora **kopírování do schránky** pomocí flashového objektu.

Nejznámnější řešení je [ZeroClipboard](http://zeroclipboard.org/) ([instrukce](https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/instructions.md)). Použití je jednoduché.

    Vytvoří se tlačítko, tomu se do atributu `data-clipboard-**target**` nastaví element, ze kterého se má brát obsah ke zkopírování (např. `&lt;input>`). Případě se obsah může přímo nastavit do atributu `data-clipboard-**text**` (atribut `*-target` má přednost).

    ```
&lt;input type="text" id="**policko**" value="http://jecas.cz/">
&lt;button 
    id="*copy-button*" 
    data-clipboard-target="**policko**" 
    data-clipboard-text="http://jecas.cz/kopirovat">
    Zkopírovat do schránky
&lt;/button>
```

    Tlačítko se potom předá funkci `ZeroClipboard`, která zajistí kopírování a umožní i nastavení akce po **úspěšném zkopírování**.

    ```
var client = new ZeroClipboard(
  document.getElementById("*copy-button*")
);
client.on("ready", function( readyEvent) {
  client.on("aftercopy", function(event) {
    // v event.target je kopírovací tlačítko
    event.target.innerHTML = "Zkopírováno";
  });
});
```

  - Potřebný JavaScript a Flash jde kromě lokálního umístění taktéž [načíst z CDN](http://cdnjs.com/libraries/zeroclipboard/) ([co je to CDN?](/cdn)).

[Samostatná ukázka](http://kod.djpw.cz/rwcb).

Pro příznivce **jQuery** existuje nadstavba nad ZeroClipboard právě v tomto frameworku. Jmenuje se [zClip](http://www.steamdev.com/zclip/).

### Jak ZeroClipboard funguje?

ZeroClipboard funguje tak, že všechna propojená tlačítka překryje průhledným Flashem, který zachytne kliknutí, které způsobí uložení do schránky. Zkopírovat něco do schránky automaticky bez akce uživatele **není možné**.

Stavy při najetí (`:focus`) nebo kliknutí (`:active`) je nutné simulovat přes speciální třídy, které ZeroClipboard přidává.

```
.tlacitko.zeroclipboard-is-hover { background-color: #eee; }
.tlacitko.zeroclipboard-is-active { background-color: #aaa; }
```

### Dynamické přidávání ZeroClipboard

Pokud při načtení stránky nevíme, které elementy má být možno kopírovat (například **ještě na stránce nejsou**, protože budou přidány až po nějakém [AJAXovém](/ajax) požadavku), postup bude následující.

    Vytvoří se instance *ZeroClipboard* se společnou funkcí pro tlačítka ke kopírování (tato funkce po zkopírování do tlačítka napíše změnou [`innerHTML`](/innerhtml) „Zkopírováno“):

    ```
var client = new ZeroClipboard();
client.on("ready", function(readyEvent) {
  client.on("aftercopy", function(event) {
    event.target.innerHTML = "✔ Zkopírováno";
  });
});	
```

    Jednotlivá tlačítka se přidají funkcí `clip`.

    ```
client.clip(
  document.getElementById("tlacitko")
);
```

    Text **ke zkopírování** se vezme z atributu `data-clipboard-text` daného tlačítka.

    [Živá ukázka](http://kod.djpw.cz/cehb)

    Kromě předávání jednotlivých tlačítek to může být i kolekce elementů. Dobře se k tomu hodí [`querySelector`](/queryselector) (od **IE 8**).

    ```
client.clip(
  document.querySelectorAll("button[data-clipboard-text]")
);
```

    [Živá ukázka](http://kod.djpw.cz/dehb)

## Co použít pro kopírování

Ze všech postupů jde poskládat relativně dobře fungující řešení pro pohodlné zkopírování jedním kliknutím napříč prohlížeči.

V novějším **Chrome** a **Opeře** je jasná volba použití `execCommand`. V **IE** je situace dost nerozhodná – použití flashového objektu bude fungovat bez nutnosti kopírování potvrdit, ale zase znamená stažení desítek kB kódu.

Ve **Firefoxu 40** a starších potom nezbývá jiné řešení než Flash.

V případě, že nechceme používat řešení s Flashem, dá se řešení využívající `execCommand` alespoň zkombinovat s `prompt`em pro nepodporující prohlížeče ([ukázka](http://kod.djpw.cz/etmb)).

## Odkazy jinam

  - HTML5 Rocks: [Cut and Copy Commands](http://updates.html5rocks.com/2015/04/cut-and-copy-commands)

  - Mozilla Hacks: [Flash-Free Clipboard for the Web](https://hacks.mozilla.org/2015/09/flash-free-clipboard-for-the-web/)

  - [clipboard.js](http://zenorocha.github.io/clipboard.js/) – 2kB knihovna pro kopírování bez Flashe