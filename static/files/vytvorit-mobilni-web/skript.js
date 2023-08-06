var vterina = 1000;
var minuta = vterina * 60;
var hodina = minuta * 60;
var den = hodina * 24;
var rok = den * 365.24219;

var slova = {
    roku: ["rok", "roky", "let"],
    dnu: ["den", "dny", "dnů"],
    hodin: ["hodina", "hodiny", "hodin"],
    minut: ["minuta", "minuty", "minut"],
    vterin: ["vteřina", "vteřiny", "vteřin"]
};

function sklonovani(pocet, co) {
    if (pocet == 1) return slova[co][0];
    if (pocet < 5 && pocet > 0) return slova[co][1];
    return slova[co][2];
}

function odpocet(el) {
    /*var konec = new Date(el.getAttribute("data-konec"));
    var ted = new Date();*/
    var ted = new Date(el.getAttribute("data-konec"));
    var konec = new Date();
    var rozdil = konec - ted;
    if (rozdil < vterina) {
        el.innerHTML = el.getAttribute("data-hlaska");
        return;
    }
    var zbyva = {
        //roku: Math.floor(rozdil / rok),
        dnu: Math.floor(rozdil % rok / den),
        hodin: Math.floor((rozdil % den) / hodina),
        minut: Math.floor((rozdil % hodina) / minuta),
        vterin: Math.floor((rozdil % minuta) / vterina)
    }

    var vypis = "<div class='popis'>" + el.getAttribute("data-zbyva") + "</div>";
    for (co in zbyva) {
        var pocet = zbyva[co];
        vypis += "<div class='hodnota'><div class='cislo'>" + pocet + "</div> <div class='jednotka'>" + sklonovani(pocet, co) + "</div></div>";

    }

    el.innerHTML = vypis;
    setTimeout(function() {
      odpocet(el); 
    }, vterina);
}

var Objednavka = function() {
	var hlaska = document.getElementById("hlaska");

	var zpracovat = function(data) {
		if (data.stav) {
			window.location = "/odeslano";
		}
		else {
			hlaska.innerHTML = data.hlaska;
		}
	};

	var odeslat = function(formular) {
		if (formular.zprava.value == "" && formular.email.value == "" && formular.url.value == "") {
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
		xhr.send("zprava=" + encodeURIComponent(formular.zprava.value) + "&email=" + encodeURIComponent(formular.email.value) + "&cena=mobilni-web" + "&objednavka=" + encodeURIComponent(formular.url.value));

		hlaska.innerHTML = "Odesílá se…";
		return false;
	};

	return {
		odeslat : odeslat
	};
}(); 