var Obchod = function() {
	var elKosik;
	var suma = 0;
	var dokonceni = document.getElementById("dokonceni");
	var hlaska = document.getElementById("hlaska");
	var prazdny = document.getElementById("prazdny");

	var prepnoutDokoncit = function() {
		prepnoutAtribut(dokonceni, "data-zobrazit");
	};

	var prepnoutAtribut = function(el, nazevAtributu) {
		if (el.hasAttribute(nazevAtributu)) {
			el.removeAttribute(nazevAtributu);
		}
		else {
			el.setAttribute(nazevAtributu, "");
		}
	};	

	var prepnoutPolozku = function(el, nazevAtributu) {
		if (el.hasAttribute(nazevAtributu)) {
			el.removeAttribute(nazevAtributu);
			el.getElementsByTagName("button")[0].innerHTML = "Do košíku";
		}
		else {
			el.setAttribute(nazevAtributu, "");
			el.getElementsByTagName("button")[0].innerHTML = "Odebrat";
		}
	};

	var prepocetKosiku = function() {
		var celkem = document.getElementById('celkem');
		celkem.getElementsByTagName("span")[0].innerHTML = (suma == 0 ? "?" : suma) + " Kč";

		prazdny.style.display = (suma == 0) ? "block" : "none";
	};

	var odebratPolozku = function(polozka) {
		suma -= parseInt(polozka.getElementsByTagName("span")[0].innerHTML);
		prepocetKosiku();
		polozka.parentNode.removeChild(polozka);

		prepnoutPolozku(document.getElementById(polozka.getAttribute("data-id")).parentNode, "data-vybrano");
	}

	var doKosiku = function(produkt) {

		if (produkt.hasAttribute("data-vybrano")) {
			var polozka = document.getElementById("p-" + produkt.getElementsByTagName("h2")[0].id);
			odebratPolozku(polozka);
		}
		else {
			var polozka = document.createElement("div");
			var idPolozky = produkt.getElementsByTagName("h2")[0].id;
			polozka.setAttribute("data-id", idPolozky);
			polozka.id = "p-" + produkt.getElementsByTagName("h2")[0].id;
			
			var nazev = produkt.getElementsByTagName("h2")[0].innerHTML;
			var cena = produkt.getElementsByTagName("p")[0].innerHTML;

			polozka.className = "polozka";
			polozka.title = "Odebraz z košíku";
			polozka.innerHTML = " <b>×</b><span class='cena'>" + cena + "</span>" + nazev + "";

			polozka.onclick = function() {
				odebratPolozku(this);
			};

			suma += parseInt(cena);
			prepocetKosiku();

			elKosik.appendChild(polozka);
			prepnoutPolozku(produkt, "data-vybrano");
		}

	}

	var pripojitTlacitka = function(kde) {
		var tlacitka = kde.getElementsByTagName('button');

		for (var i = tlacitka.length - 1; i >= 0; i--) {
			tlacitka[i].onclick = function() {
				doKosiku(this.parentNode);
			}
		};
	};
  
  var prehrat = function(el) {
    el.src = el.src.replace(".png", ".gif");
  };
  
  var prehravaniUkazek = function(kde) {
		var ukazky = kde.querySelectorAll(".ukazka");

		for (var i = ukazky.length - 1; i >= 0; i--) {
      var tlacitkoPrehrat = document.createElement("a");
      tlacitkoPrehrat.className = "prehrat";
      tlacitkoPrehrat.innerHTML = " ►";
      ukazky[i].appendChild(tlacitkoPrehrat);
      
      ukazky[i].title = "Kliknutím přehrajete ukázku";
			ukazky[i].onclick = function() {
        var tlacitko = this.getElementsByTagName("a")[0];
        if (tlacitko) {
          this.removeChild(tlacitko);
        }        
				prehrat(this.getElementsByTagName("img")[0]);
			}
		};
	};

	var zpracovat = function(data) {
		if (data.stav) {
			window.location = "/odeslano";
		}
		else {
			hlaska.innerHTML = data.hlaska;
		}
	};

	var odeslat = function(formular) {
		if (formular.zprava.value == "" && formular.email.value == "") {
			hlaska.innerHTML = ("Zanechte na sebe kontakt, jinak spolupráce nemůže proběhnout.");
			hlaska.setAttribute("data-zobrazit", "");
			return false;
		}

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
		  if (xhr.readyState == 4) {
		  	zpracovat(eval('(' + xhr.responseText + ')'));
		  }
		}
		xhr.open('POST', "/odeslat/");
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("zprava=" + encodeURIComponent(formular.zprava.value) + "&email=" + encodeURIComponent(formular.email.value) + "&cena=" + suma + "&objednavka=" + encodeURIComponent(elKosik.innerHTML));

		hlaska.innerHTML = "Odesílá se…";
		return false;
	};

	var init = function(produkty, kosik) {
		elKosik = kosik;
		pripojitTlacitka(produkty);
    prehravaniUkazek(produkty);
	};

	return {
		init: init,
		prepnoutDokoncit : prepnoutDokoncit,
		odeslat : odeslat
	};
}();