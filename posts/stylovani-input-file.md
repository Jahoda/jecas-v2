---
title: "Stylování uploadu souborů"
headline: "Stylování uploadu souborů"
description: "Jak zajistit vlastní styl pro formulářový prvek pro nahrávání souborů <code>&lt;input type=file></code>."
date: "2018-10-29"
last_modification: "2018-10-29"
status: 0
tags: []
---

Políčko pro upload má výchozí styl, který se liší napříč prohlížeči:

## Zobrazení názvu souboru

```
(function () {
	var inputs = document.querySelectorAll('.js-input-file-wrap');
	Array.prototype.forEach.call(inputs, function (inputWrap) {
		var input = inputWrap.querySelector('.js-input-file');
		var fileNameEl = inputWrap.querySelector('.js-input-file-name');
 		input.addEventListener('change', function (event) {
			fileNameEl.innerText = event.target.value.split('\\').pop();
		});
	});
})();
```

[Živá ukázka](http://kod.djpw.cz/cwoc)

[Živá ukázka](http://kod.djpw.cz/dwoc) – zobrazení názvu souboru bez JS (pouze **Chrome**)