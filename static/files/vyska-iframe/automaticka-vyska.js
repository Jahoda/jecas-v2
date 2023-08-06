var ram = document.getElementById("ram");
ram.scrolling =  "no";
ram.onload = function() {
    var ramDokument = ram.contentDocument || ram.contentWindow.document;
    ram.style.height = ramDokument.documentElement.scrollHeight + "px";
};