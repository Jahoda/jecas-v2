---
title: "Filemaneger pro TinyMCE 4"
headline: "Souborový správce elFinder pro TinyMCE 4"
description: "Čtvrtá verse WYSIWYG editoru TinyMCE změnila API pro připojení správce souborů, co s tím?"
date: "2013-05-09"
last_modification: "2013-05-09"
status: 1
tags: ["WYSIWYG", "TinyMCE"]
---

Jelikož poslední TinyMCE vyšel nedávno a není k němu zatím dokumentace, jediné [dohledatelné řešení](http://stackoverflow.com/questions/16016870/tinymce-4-with-elfinder) je implementace [elFinderu](http://elfinder.org/).

- Ve složce `tinymce/plugins` vytvořit složku `eldinder`,

- do ní nahrát obsah staženého archivu elFinderu,

- přidat plugin `elfinder` do inicialisace TinyMCE mezi ostatní pluginy: `tinymce.init({plugins: ["elfinder"]})`,

- přejmenovat soubor `tinymce/plugins/elfinder/js/elfinder.min.js` na `plugin.min.js`,

- přímo do adresáře pluginu umístit nový soubor `plugin.min.js` s obsahem:

tinymce.PluginManager.add("elfinder", function (editor, url) { 

editor.settings.file_browser_callback = function (id, value, type, win) {
  $('&lt;div /&gt;').dialogelfinder({
     url: url + '/php/connector.php',
     commandsOptions: {
        getfile: {
           oncomplete: 'destroy'
        }
     },
     getFileCallback: function (url)
     {
        console.log(url);
        var fieldElm = win.document.getElementById(id);
        fieldElm.value = editor.convertURL(url, null, true);
        if ("fireEvent"in fieldElm) {
           fieldElm.fireEvent("onchange")
        } else {
           var evt = document.createEvent("HTMLEvents");
           evt.initEvent("change", false, true);
           fieldElm.dispatchEvent(evt)
        }
     }
  });   

}; }, ["elfinder/js"]);
Nakonec už stačí jen připojit na stránce, kde se připojuje skript TinyMCE, potřebné skripty a styly pro elFinder.

To jsou jednak externí knihovny jQuery a jQuery UI (JS + CSS):

&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" &gt;&lt;/script&gt; 
&lt;script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js"&gt;&lt;/script&gt;
&lt;link rel="stylesheet" type="text/css" media="screen" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/themes/smoothness/jquery-ui.css"&gt;
A potom skripty a styly elFinderu:

&lt;script type="text/javascript" src="**{$basePath}**/tinymce/plugins/elfinder/js/plugin.min.js"&gt;&lt;/script&gt;
&lt;link rel="stylesheet" type="text/css" media="screen" href="**{$basePath}**/tinymce/plugins/elfinder/css/elfinder.min.css"&gt; 
&lt;link rel="stylesheet" type="text/css" media="screen" href="**{$basePath}**/tinymce/plugins/elfinder/css/theme.css"&gt;