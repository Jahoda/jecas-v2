---
title: "CSS tab-size"
headline: "Šířka tabulátoru <code>tab-size</code>"
description: "Jak pomocí CSS změnit šířku tabulátoru ve zdrojovém kódu."
date: "2013-11-21"
last_modification: "2013-11-28"
status: 1
tags: ["CSS", "CSS vlastnosti"]
---

Vlastnost `tab-size` umožňuje čistě z CSS změnit šířku (**počet mezer**), kterou bude zabírat **tabulátor**.

Tato vlastnost má smysl zejména u **zdrojových kódů** (elementu `&lt;pre>` nebo nečeho s `white-space: pre`). Pro maximální funkčnost napříč prohlížeči je nutné používat [prefixy](/css-prefixy) pro **Operu** a **Firefox** (**Chrome** umí `tab-size` bez prefixu a **IE** (ani [IE 11](/ie11)) si *neškrtá*). [Samostatná ukázka](http://kod.djpw.cz/ips).

    .tab-size {tab-size: 4; -moz-tab-size: 4; -o-tab-size: 4}
  
```
if (podminka) {
	for () {
		// Cyklus
		if (podminka) {
			// Podmínka
		}
	}
}
```

  function zmenitTabSize(size) {
    var tabSizeCss = "tab-size: " + size + "; -moz-tab-size: " + size + "; -o-tab-size: " + size + "; -ms-tab-size: " + size;
    document.getElementById("tab-size").style.cssText = tabSizeCss;
  }

Změnit `tab-size`: 

Kromě **nedostatečné podpory v IE** má `tab-size` další vadu. Velká část kódů bývá odsazována **několika mezerami** místo **skutečného tabulátoru**. Na takový kód se pochopitelně přenastavení `tab-size` **neprojeví**.

Je otázka, zda úpravu **zdrojových kódů** neřešit přímo na straně serveru. U hotových **obarvovačů kódu** nebývá problém počet mezer nastavit.