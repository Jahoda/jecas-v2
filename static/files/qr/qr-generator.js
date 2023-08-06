var controls = document.querySelectorAll('.qr-generator .controls button');
var items = document.querySelector('.qr-generator .items');

var f = document.forms["generator"];

var types = {
    text : function() {
        return f.text.value;
    },
    url : function() {
        return http(f.url.value);
    },
    tel : function() {
        return "tel:" + (f.tel.value);
    },   
    sms : function() {
        return "SMSTO:" + f["sms-tel"].value + ":" + f["sms"].value;
    },        
    email : function() {
        if (f["email-subject"].value.length > 0) {
            return "MATMSG:TO:" + f.email.value + ";SUB:" + f["email-subject"].value + ";BODY:" + f["email-text"].value + ";;";            
        }
        else {
            return f.email.value;
        }

    },
    event : function() {
        return "BEGIN:VEVENT" + "\n" +
            "SUMMARY:" + f["event-name"].value + "\n" +
            "DTSTART:" + convertDate(f["event-start"].value) + "\n" +
            "DTEND:" + convertDate(f["event-end"].value) + "\n" +
            "END:VEVENT";
    },      
    btc : function() {
        return "bitcoin:" + (f.btc.value) + "?amount=" + (f["btc-ammount"].value);
    },    
    wifi : function() {
        return "WIFI:T:" + radioValue(f["wifi-encrypt"]) + ";S:" + f["wifi-name"].value + ";P:" + f["wifi-password"].value + ";;";
    },
    geo : function() {
        return "geo:" + f["geo-cords"].value;
    },
    vcard : function() {
        var name = splitName(f["vcard-name"].value);
        var address = splitAddress(f["vcard-address"].value);

        return "BEGIN:VCARD" + "\n" +
        "VERSION:2.1" + "\n" +
        "FN:" + f["vcard-name"].value + "\n" +
        "N:" + name.rest + ";" + name.first + "\n" +
        // "TITLE:Funkce" + "\n" +
        ((f["vcard-tel"].value.length) ? "TEL;CELL:" + f["vcard-tel"].value + "\n" : "") +
        // "TEL;WORK;VOICE:333333333" + "\n" +
        // "TEL;HOME;VOICE:" + f["vcard-tel"].value + "" + "\n" +
        ((f["vcard-email"].value.length) ? "EMAIL;PREF;INTERNET:" + f["vcard-email"].value + "" + "\n" : "") +
        // "EMAIL;WORK;INTERNET:pracovni@example.com" + "\n" +
        ((f["vcard-url"].value.length) ? "URL:" + http(f["vcard-url"].value) + "\n" : "") +
        ((address.street.length) ? "ADR:;;" + address.street + ";" + address.city + ";;" + address.code + ";Česká republika" + "\n" : "") +
        // "ORG:Organisace" + "\n" +
        "END:VCARD";
    },  
};

function splitName(name) {
    var parts = name.split(" ");
    var firstname = parts[0];
    // remove firstname
    parts.splice(0, 1);

    return {
        first : firstname,
        rest : parts.join(" ")
    }
}

function splitAddress(address) {
    var parts = address.split("\n");
    return {
        street : parts[0] || "",
        city : parts[1] || "",
        code : parts[2] || ""
    }
}

function http(url) {
     if (url.match(/https?:\/\//)) {
         return url;
     }
     else {
         return "http://" + url;
     }
 }

 function convertDate(date) {
    return date.replace(":", "").replace(/-/g, "");
 }

 function radioValue(radioCollection) {
    for (var i = radioCollection.length - 1; i >= 0; i--) {
        if (radioCollection[i].checked) {
            return radioCollection[i].value;
        }
    };
 }

 function extractType(name) {
    return name.match(/([a-z]*)\-?/)[1];
 }

var active = {
    control: controls[0], 
    content: items.querySelector("div[data-type=" + controls[0].getAttribute("data-type") + "]")
};

for (var i = 0; i < controls.length; i++) {
    controls[i].onclick = function() {
        if (active.control) {
            active.control.className = "";
            active.content.className = "";
        }
        active.control = this;  
        active.content = items.querySelector("div[data-type=" + this.getAttribute("data-type") + "]");
        active.control.className = "active";
        active.content.className = "active";
        return false;
    };
    
}

var qrObal = document.getElementById("qr-code");

function zobrazitQrKod(text) {
    smazatQrKod(qrObal);
    qrObal.appendChild(
        QRCode.generateHTML(text)
        );
}

function smazatQrKod(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function createQrText(el) {
    var text = types[
            extractType(el.name)
        ]()
    generateQrCode(text);
    rawData(text);
}


function generateQrCode(text) {
    var img;
        img = document.createElement('img');
        img.src = QRCode.generatePNG(text);
        smazatQrKod(qrObal);
        qrObal.appendChild(img);
    try {
    }
    catch (e) {
        console.log('no canvas support');
    }
}

function createQr(e, el) {
    e = e || window.event;
    var activeEl = (e.target || e.srcElement);
    createQrText(activeEl);
}

function rawData(data) {
    document.getElementById('raw').innerHTML = data;
}