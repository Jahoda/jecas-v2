(function () {
	window.onload = function () {
		var ram = document.getElementsByClassName('modryram')[0];

		//ram.style.position = "relative";
		var obal = ram.getElementsByTagName('table')[0].getElementsByTagName('table')[0];
		if (obal) {
			var div = document.createElement('div');
			var span = document.createElement('span');
			span.style.cssText = 'position: fixed; right: 0; top: 0';

			var input = document.createElement('input');
			input.type = 'datetime';

			var pole = window.location.search.substr(1).split('&');
			var get = new Array();
			for (i = 0; i < pole.length; i++) {
				get[pole[i].split('=')[0]] = unescape(pole[i].split('=')[1]);
			}
			var jmenoCookie = get['cisloclanku'] + '-' + get['page'];

			var dnesniDatum = new Date().toISOString();

			// Funkce pro cookie z:
			// http://www.dfens-cz.com/image/freestyle/freestyle.js

			var cookieDatum = hasCookie(jmenoCookie) ? readCookie(jmenoCookie) : dnesniDatum;
			input.value = cookieDatum;

			if (hasCookie(jmenoCookie)) {
				eraseCookie(jmenoCookie);
			}

			createCookie(jmenoCookie, dnesniDatum, 1000);

			function parseDate(dateInText) {
				var parts = dateInText.match(/(\d+)/g);
				// new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
				return new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5]); // months are 0-based
			}

			var komentare = obal.getElementsByTagName('table');

			function nahled() {
				var nahled = document.createElement('div');
				nahled.id = 'nahled';
				nahled.style.cssText =
					'position: fixed; background: #fff; overflow-y: auto; overflow-x: hidden; height: 100%';
				//nahled.innerHTML = "<h4>Náhled</h4>";

				var nahledKomentare = document.createElement('div');
				nahledKomentare.style.cssText =
					'position: fixed; right: 120px; top: 0; background: #fff; max-width: 50%; border: 2px solid #000; padding: 1em; display: none';
				nahledKomentare.id = 'nahled-komentare';
				document.body.appendChild(nahledKomentare);

				for (var i = 1; i < komentare.length - 1; i++) {
					var odkaz = komentare[i].getElementsByTagName('a');
					var odsazeni = komentare[i].getElementsByTagName('td')[0].width;
					var cara = document.createElement('a');

					cara.href = '#' + odkaz[0].name;
					cara.style.cssText =
						'display: block; overflow: hidden; height: 3px; border: 1px solid #fff; width: 140px';
					cara.style.background = 'black';
					cara.style.marginLeft = 20 + odsazeni / 4 + 'px';
					cara.rel = i;

					// Náhled komentáře po kliknutí na miniaturu
					cara.onmouseover = function () {
						nahledKomentare.style.display = 'block';
						nahledKomentare.innerHTML = komentare[this.rel].innerHTML;

						if (
							nahledKomentare.offsetHeight + this.offsetTop - nahled.scrollTop >
							document.body.clientHeight
						) {
							nahledKomentare.style.top = '';
							nahledKomentare.style.bottom = '0';
						} else {
							nahledKomentare.style.top = this.offsetTop - nahled.scrollTop + 'px';
							nahledKomentare.style.bottom = '';
						}
					};
					cara.onmouseout = function () {
						nahledKomentare.style.display = 'none';
					};

					nahled.appendChild(cara);
				}
				var nahledObal = document.createElement('div');
				nahledObal.style.cssText =
					'position: absolute; right: 0; top: 0; width: 120px; overflow: hidden; ';
				nahledObal.appendChild(nahled);
				obal.appendChild(nahledObal);
			}

			new nahled();

			function setActive() {
				// Vybereme odkazy z prvního elementu menu
				// Odkazů na oddíly by mělo být stejně jako <div>ů
				var a = document.getElementById('nahled').getElementsByTagName('a');
				// Sjednocení napříč prohlížeči -- Pro Webkit je "document.body"
				var top = document.documentElement.scrollTop + document.body.scrollTop;
				var el;
				//alert( a.length);
				// Projdeme všechny <div>y
				//document.title = komentare[6].parentNode.offsetTop + " / " + top;
				for (var i = 2; i < komentare.length; i++) {
					// Všem odkazům se zruší případná třída
					if (a[i - 2]) {
						a[i - 2].style.outline = '';
						if (komentare[i].parentNode.offsetTop < top) {
							//alert(i);
							// Uložíme si do proměnné element ke zvýraznění
							el = a[i - 2];
						}
					}
				}
				if (el) {
					// Zvýraznění elementu
					el.style.outline = '1px solid blue';
				}
			}

			// Při události onscroll se bude zvýrazňovat
			window.onscroll = setActive;

			function zvyraznitNove() {
				var datum = new Date(input.value);
				var counter = 0;
				var nahledy = document.getElementById('nahled').getElementsByTagName('a');

				for (var i = 1; i < komentare.length - 1; i++) {
					var odkaz = komentare[i].getElementsByTagName('a');
					var datumPrispevku = parseDate(odkaz[1].innerText);
					var barva = 'black';
					var vyska = '1px';
					if (datum.getTime() < datumPrispevku.getTime()) {
						barva = 'red';
						vyska = '3px';
						counter++;
					} else {
						barva = 'black';
					}
					komentare[i].getElementsByTagName('div')[1].style.border = '1px solid ' + barva;
					nahledy[i - 1].style.background = barva;
					nahledy[i - 1].style.height = vyska;
					//nahledy[i-1].style.display = (komentare.length > 100 && barva == "black") ? "none" : "block";
				}
				span.innerHTML = counter + ' nových';
			}

			input.onchange = zvyraznitNove;

			div.appendChild(input);
			obal.appendChild(span);
			obal.insertBefore(div, obal.firstChild);

			new zvyraznitNove();
		}
	};
})();
