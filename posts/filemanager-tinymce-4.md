---
title: "Filemaneger pro TinyMCE 4"
headline: "Souborový správce elFinder pro TinyMCE 4"
description: "Čtvrtá verse WYSIWYG editoru TinyMCE změnila API pro připojení správce souborů, co s tím?"
date: "2013-05-09"
last_modification: "2013-05-09"
status: 1
tags: ["tinymce", "wysiwyg"]
format: "html"
---

<p><img src="/files/filemanager-tinymce-4/elfinder-tinymce-4.png" alt="Elfinder v TinyMCE"></p>



















<p>Jelikož poslední TinyMCE vyšel nedávno a není k němu zatím dokumentace, jediné <a href="http://stackoverflow.com/questions/16016870/tinymce-4-with-elfinder">dohledatelné řešení</a> je implementace <a href="http://elfinder.org/">elFinderu</a>.</p>
<ol>
<li>Ve složce <code>tinymce/plugins</code> vytvořit složku <code>eldinder</code>,</li>
<li>do ní nahrát obsah staženého archivu elFinderu,</li>
<li>přidat plugin <code>elfinder</code> do inicialisace TinyMCE mezi ostatní pluginy: <code>tinymce.init({plugins: ["elfinder"]})</code>,</li>
<li>přejmenovat soubor <code>tinymce/plugins/elfinder/js/elfinder.min.js</code> na <code>plugin.min.js</code>,</li>
<li>přímo do adresáře pluginu umístit nový soubor <code>plugin.min.js</code> s obsahem:</li>
</ol>
<pre>tinymce.PluginManager.add("elfinder", function (editor, url) { 

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

}; }, ["elfinder/js"]);</pre>
<p>Nakonec už stačí jen připojit na stránce, kde se připojuje skript TinyMCE, potřebné skripty a styly pro elFinder.</p>
<p>To jsou jednak externí knihovny jQuery a jQuery UI (JS + CSS):</p>
<pre>&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" &gt;&lt;/script&gt; <br>&lt;script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js"&gt;&lt;/script&gt;<br>&lt;link rel="stylesheet" type="text/css" media="screen" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/themes/smoothness/jquery-ui.css"&gt;</pre>
<p>A potom skripty a styly elFinderu:</p>
<pre>&lt;script type="text/javascript" src="<strong>{$basePath}</strong>/tinymce/plugins/elfinder/js/plugin.min.js"&gt;&lt;/script&gt;<br>&lt;link rel="stylesheet" type="text/css" media="screen" href="<strong>{$basePath}</strong>/tinymce/plugins/elfinder/css/elfinder.min.css"&gt; <br>&lt;link rel="stylesheet" type="text/css" media="screen" href="<strong>{$basePath}</strong>/tinymce/plugins/elfinder/css/theme.css"&gt;</pre>