---
title: "Position: fixed"
headline: "Position: fixed"
description: "Různé způsoby využití fixované posice v CSS."
date: "2014-03-02"
last_modification: "2014-03-02"
status: 1
tags: ["css", "fixed"]
format: "html"
---

<p>Kromě <a href="/position#fixed">zafixování elementu</a> na stránce:</p>

<pre><code>div.fixovany {
  position: fixed;
}</code></pre>

<p>Má <code>position: fixed</code> ještě jedno zajímavé využití.</p>

<p>Pro <b>fixně umístěný</b> element není možné vytvořit vlastní <i>rámec</i>, jako to jde při posicování absolutním. Rodiči absolutně umístěného prvku se přidá <code>position: relative</code>, čímž se <i>vynulují</i> souřadnice pro následné absolutní posicování. Tohle pro <code>fixed</code> nefunguje.</p>

<p>Fixní element má nulový bod souřadnic vždy v <b>levém horním okraji stránky</b> a nejde změnit. Mimochodem, tento <i>bod</i> není určen ani elementem <code>&lt;body></code> a ani elementem <code>&lt;html></code>, nemá na něj vliv žádný <code>margin</code> nebo <code>padding</code>, zkrátka nic.</p>

<p><a href="http://kod.djpw.cz/udcb">Ukázka</a></p>

<p>Popsané chování někdy může vadit, ale také je v určitých případech <b>velmi výhodné</b>. Zvlášť u vytváření universálních JavaScriptů typu lightboxů nám <code>position: fixed</code> hezky zaručí, že se náš skript nerozbije při <a href="/stylovani-body">stylování značky <code>&lt;body></code></a> a podobně.</p>

<p>Vytvořit element přesně <b>překrývající celou stránku</b> je potom otázkou prostého:</p>

<pre><code>.presCelouStranku {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}</code></pre>