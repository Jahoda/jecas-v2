---
title: "Body a documentElement v JS"
headline: "Elementy <code>documentElement</code> a <code>body</code> v JavaScriptu"
description: "Co se skrývá pod <code>document.body</code> a <code>document.documentElement</code>. Jaká je podpora v prohlížečích."
date: "2014-02-10"
last_modification: "2014-02-20"
status: 1
tags: ["js", "napady"]
format: "html"
---

<p>Obě konstrukce jsou <i>zkratky</i> pro výběr elementu <code>&lt;body></code>, respektive <code>&lt;html></code>. Vrací totéž co příslušně použité <code>getElementsByTagName</code> metody.</p>

<h2 id="ie">Podpora v prohlížečích</h2>

<p>Na <a href="http://diskuse.jakpsatweb.cz/?action=vthread&forum=8&topic=154936">diskusi</a> se objevilo podezření, že <code>document.body</code> nefunguje správně v <b>Internet Exploreru</b>. Není tomu tak.</p>

<ul>
  <li><p>Výběr elmentu <code>&lt;body></code> funguje pomocí <code>document.body</code> ve všech běžných prohlížečích stejně jako <code>document.getElementsByTagName("body")[0]</code>.</p></li>
  <li><p>Obdobně pro výběr <code>&lt;html></code> funguje <code>document.documentElement</code> ve všech běžných prohlížečích stejně jako <code>document.getElementsByTagName("html")[0]</code>.</p></li>
</ul>

<p>Nezávisle na <a href="/doctype">vykreslovacích režimech</a>.</p>

<ul>
  <li><a href="http://kod.djpw.cz/bubb">Ukázka ve standardním režimu</a></li>
  <li><a href="http://kod.djpw.cz/aubb">Ukázka v QUIRKu</a></li>
</ul>

<h2 id="vyuzit">Využití</h2>

<p>Zápisy <code>document.body</code> a <code>document.documentElement</code> jsou kratší než <code>getElement*</code> metody. Jinak je celkem jedno, co se použije.</p>