---
title: "WYSIWYG editory"
headline: "Webové WYSIWYG editory"
description: "V JavaScriptu napsané WYSIWYG editory pro rychlé nasazení na webu."
date: "2013-10-21"
last_modification: "2013-10-21"
status: 0
tags: []
format: "html"
---

<h2 id="trix">Trix</h2>


<p><a href="http://trix-editor.org/" class="button">Web</a></p>

<p><img src="/files/wysiwyg-editory/trix.png" alt="Trix WYSIWYG editor" class="border"></p>



















<p>Zajímavý editor, který vůbec nepoužívá <code>execCommand</code> pro vykonávání jednotlivých příkazů, ale všechny změny se ukládají do zvláštního modelu editoru a následně se vše překreslí do HTML.</p>

<p>To na jednu stranu zajišťuje 100% konsistentní HTML kód (chování <code>execCommandu</code>, který tento editor nepoužívá, se liší napříč prohlížeči); na stranu druhou neustále překreslování dělá trochu problémy s ohledem na <b href="/kontrola-pravopisu">kontrolu pravopisu</b>.</p>




<h2 id="hallojs">Hallo.js</h2>

<p><a href="http://hallojs.org/" class="button">Web</a></p>

<p>Editor založený na <b>jQuery</b>. Nabízí přímou editaci textu. Při samotném psaní neruší nástrojové lišty — ty se objeví jen, když jsou potřeba, tj. při označení textu. <b>Klávesové zkratky</b> jsou samozřejmostí.</p>
<p><img src="/files/wysiwyg-editory/hallo.png" alt="Hallo.js WYSIWYG editor" class="border"></p>

<h2 id="sir-trevor-js">Sir Trevor JS</h2>
<p><a href="http://madebymany.github.io/sir-trevor-js/" class="button">Web</a> <a href="http://madebymany.github.io/sir-trevor-js/example.html" class="button">Příklad</a></p>
<p><img src="/files/wysiwyg-editory/sir-trevor.png" alt="Sir Trevor JS WYSIWYG editor" class="border"></p>
<p>Ani tento editor nepoužívá klasické neustále viditelné rozhraní. Zajímavým prvkem je <b>dělení obsahu na jednotlivé bloky</b>, které lze následně mazat nebo myší přesouvat.</p>

<h2 id="quill">Quill</h2>
<p><a href="http://quilljs.com" class="button">Web</a></p>

http://hackerwins.github.io/summernote/

<h2 id="stackedit">StackEdit.io</h2>

<p>Něco mezi WYSIWYG editorem a plain-textem. Slouží k zápisu <b>Markdownu</b>.</p>

<p><a href="https://stackedit.io" class="button">Web</a></p>

<h2 id="prosemirror" class="net">ProseMirror</h2>

<p><a href="http://prosemirror.net/" class="button">Web</a></p>

<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li><a href="https://facebook.github.io/draft-js/">Draft.js</a> (od Facebooku)</li>
  <li><a href="https://github.com/tholman/zenpen">ZenPen</a></li>
  <li><a href="https://github.com/yabwe/medium-editor">Medium.com WYSIWYG editor clone</a></li>
  
  <li><a href="http://www.sitepoint.com/10-best-html-wysiwyg-plugins/">10 Best jQuery and HTML5 WYSIWYG Plugins</a></li>
  
  <li><a href="https://froala.com">Froala</a> – placený editor</li>
</ul>