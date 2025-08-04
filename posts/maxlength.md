---
title: "Maximální délka pole"
headline: "Maximální počet znaků"
description: "HTML atribut <code>maxlength</code> omezuje počet znaků ve formulářovém poli."
date: "2015-01-25"
last_modification: "2015-01-26"
status: 1
tags: ["HTML", "Formuláře", "HTML atributy"]
---

Pro formulářové prvky [`&lt;input>`](/input) a [`&lt;textarea>`](/textarea) existuje HTML atribut `maxlength`. Ten umožňuje nastavit maximální možný počet znaků, které lze do pole zadat.

```
&lt;input **maxlength="3"**>
```

Do takového políčka půjde zadat maximálně 3 znaky.

## Limit v `&lt;textarea>`

Atribut `maxlength` u `&lt;textarea>` podporuje až **IE 10**, **Firefox 4** a **Opera 15**.

## Proč `maxlength` nepoužívat

Osobně se domnívám, že v podstatě **neexistuje případ**, kdy je vhodné `maxlength` použít.

Ohlídat počet znaků je vždy nutné **na straně serveru** a tento limit může při práci s formulářem spíš **vytvářet problémy**.

### Kopírování

Kromě běžného psaní uživatelé někdy formuláře vyplňují **kopírováním ze schránky**. Při kopírování se snadno stane, že návštěvník omylem označí například mezeru před kopírovaným řetězcem. To způsobí, že se mu ve finále konec obsahu usekne, protože mezera se bude počítat do limitu.

Někdy se zase mohou **lišit zdrojové a cílové formáty**. Při kopírování delšího tvaru do pole, které je určeno pro kratší, se přebytečný obsah usekne a uživatel **nemá možnost nápravy**.

Bez `maxlength` je následně možné délku upravit.

### Přeformulování

V případě, že návštěvník narazí na limit – např. pro nadpis článku – pokusí se obsah **přepsat do stručnější podoby**. Zde nejspíš bude **pevný limit** opět vadit, protože nebude přesně jasné o kolik znaků je nutné text **zkrátit** / kolik znaků ještě zbývá.

## Počet napsaných znaků

Optimální postup je u polí zobrazovat [počet znaků](/pocet-znaku), které zbývají. A při příliš dlouhém popisku **pouze blokovat odeslání formuláře**.

Hezké řešení používá [Twitter](/twitter), kde se navíc ještě počítadlo barví podle procent zbývajících znaků, takže má uživatel **odezvu**, že už by měl končit.

Ve zjednodušené podobě to vypadá přibližně takto:

.vyplneno-100 {color: red}
.vyplneno-90, 
.vyplneno-80,
.vyplneno-70 {color: #8C0000}

input+span {
    color: gray;
    padding-left: .2em;
}

var omezen = document.querySelectorAll("input[data-maxlength]");
for (var i = omezen.length; i--; ) {
    omezen[i].onkeyup = omezen[i].onpaste = omezen[i].onkeypress = omezen[i].oninput = prepocitat;
    zobrazitLimit(omezen[i]);
}
function prepocitat() {
    zobrazitLimit(this);
}
function zobrazitLimit(el) {
    var delka = el.value.replace(/^\s+|\s+$/g, '').length;
    var maximalniDelka = el.getAttribute("data-maxlength");
    var pocitadlo = el.nextSibling;
    pocitadlo.innerHTML = maximalniDelka - delka;
    pocitadlo.className = "vyplneno-" + (Math.min(Math.round(delka / maximalniDelka * 10) / 10, 1) * 100);
}

[Samostatná živá ukázka](http://kod.djpw.cz/fwjb)

U jednořádkových polí by šlo použít něco jako [progress](/progress) bar.

[Živá ukázka](http://kod.djpw.cz/gwjb)