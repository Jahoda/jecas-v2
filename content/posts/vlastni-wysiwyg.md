---
title: "Jak vytvořit WYSIWYG editor"
headline: "Vlastní jednoduchý WYSIWYG editor"
description: "Chceme-li na webu zadávat text a běžná <code>&lt;textarea></code> už nestačí, řešením je napsat si vlastní WYSIWYG editor."
date: "2013-06-05"
last_modification: "2013-06-08"
status: 1
tags: ["hotova-reseni", "js", "napady", "wysiwyg"]
format: "html"
---

<p>Kromě toho, že lze použít již hotové komplexní editory jako.
<ul>
<li><a href='http://www.tinymce.com/'>TinyMCE</a> (třeba i se <a href='/filemanager-tinymce-4'>souborovým managerem</a>)
<li><a href='http://ckeditor.com/'>CKEditor</a>
</ul>

<p>… je možné si vlastní základní editor s pár funkcemi nikterak obtížně vytvořit. V situaci, kdy chceme jen lehce vylepšit obyčejnou <code>&lt;textarea></code>, to může dávat smysl.

<h2 id=jak>Jak na to</h2>
<p>Základem může být <code>&lt;iframe></code> se <a href='/uprava-stranky-designmode'>zapnutým <code>designMode</code></a>. Do kterého, kromě toho, že můžeme psát, lze přidávat různé příkazy pomocí <code>execCommand</code>. 
<ul>
<li><a href='http://www.quirksmode.org/dom/execCommand.html'>Seznam a kompatibilita jednotlivých akcí</a>
<!--<li><a href='http://www-archive.mozilla.org/editor/midas-spec.html'>Seznam jednotlivých akcí v Mozille</a>-->
<!--<li><a href='http://msdn.microsoft.com/en-us/library/ms533049.aspx'>Seznam jednotlivých akcí v Exploreru</a>-->
</ul>

<p>Poslední věc je synchronisace obsahu editoru se skutečným formulářovým polem. Obsah získáme pomocí vlastnosti <a href="/innerhtml"><code>innerHTML</code></a>. Tuto hodnotu poté stačí při stisknutí odesílacího tlačítka vložit do skutečného formuláře a odeslat jej klasickou cestou. Anebo rovnou formulář odesílat <a href="/ajax">AJAXem</a>.

<p>Takto získaný obsah je pochopitelně potenciálně risikový, takže je nezbytné <a href='/vycisteni-kodu'>provést vyčistění</a>.

<p>Budeme-li takový editor používat pro editaci, stačí k tomu určené HTML vypsat ve skriptu, který se připojí jako <code>src</code> do <code>&lt;iframe></code>.

<h2 id=priklad>Ukázka jednoduchého editoru</h2>

<!-- Živá ukázka -->
<div class=live>
<style>
iframe {border: 1px solid #0D6AB7; background: #fff}
</style>

<p>
    <button onclick="format('bold')">Tučně</button>
    <button onclick="format('italic')">Kurzíva</button>
    <button onclick="format('StrikeThrough')">Škrtnout</button>
    <button onclick="alert(getContent())">Zobrazit HTML</button>
</p>

<iframe id="editor" class="editor" frameborder="0"></iframe>

<script>
var editor, iframe;
window.onload = function() {
    iframe = document.getElementById("editor");
    editor = iframe.contentWindow.document;
    editor.designMode = "on";
}

function format(akce) {
    iframe.contentWindow.focus();
    editor.execCommand(akce, false, null);
}

function getContent() {
    return editor.body.innerHTML;
}
</script>
</div>
<!-- / konec ukázky -->


<h3>HTML kód</h3>
<pre><code>&lt;iframe id="editor" class="editor" frameborder="0">&lt;/iframe></code></pre>
<h3>JS kód</h3>
<pre><code>&lt;script>
var editor, iframe;
window.onload = function() {
    iframe = document.getElementById("editor");
    editor = iframe.contentWindow.document;
    editor.designMode = "on";
}

function format(akce) {
    iframe.contentWindow.focus();
    editor.execCommand(akce, false, null);
}
&lt;/script></code></pre>

<h3>Použití ovládacích tlačítek</h3>
<pre><code>&lt;button onclick="format('bold')">Tučně&lt;/button></code></pre>