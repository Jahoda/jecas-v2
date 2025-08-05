---
title: "Minlength"
headline: "Atribut <code>minlength</code>"
description: "HTML atribut <code>minlength</code> stanovuje minimální počet znaků, který musí být v políčku."
date: "2015-01-27"
last_modification: "2015-02-11"
status: 1
tags: ["formulare", "html", "html-atributy"]
format: "html"
---

<p>Atribut <code>minlength</code> je opakem <a href="/maxlength"><code>maxlength</code></a>, který naopak nastavuje maximální možnou délku. Dá se použít u značek <a href="/input"><code>&lt;input></code></a> a <a href="/textarea"><code>&lt;textarea></code></a>.</p>

<pre><code>&lt;input <b>minlength</b>="5"></code></pre>

<div class="live">
<form onsubmit="alert('Jakože úspěšně odesláno'); return false">
    <p>
        <label>Zadejte 5+ znaků: <input type="text" minlength="5"></label>
    </p>
    <p>
        <button>Odeslat</button>
    </p>
</form>  
</div>

<p><a href="http://kod.djpw.cz/fhkb">Samostatná živá ukázka</a></p>

<p>Políčko výše bude vyžadovat <b>5 a více znaků</b>. Trochu zajímavé chování nastane při nevyplnění políčka – v takovém případě <b>validace úspěšně projde</b> – proto se může hodit kombinace s <a href="/required"><code>required</code></a>.</p>

<pre><code>&lt;input <i>minlength</i>="5" <b>required</b>></code></pre>




<h2 id="podpora">Podpora v prohlížečích</h2>

<p>HTML atribut <code>minlength</code> funguje zatím pouze v prohlížečích používající jádro <b>Blink</b>. Minimální délku pole podporuje minimálně <b>Chrome 40</b> a <b>Opera 27</b>.</p>

<p><img src="/files/minlength/chrome.png" alt="Upozornění na nedostatečnou délku v Chrome 40" class="border"></p>










<p>Pro starší prohlížeče nezbývá než použít <b>JavaScript</b>:</p>

<pre><code>pole.value.length</code></pre>


<p>A v každém případě je nutné provést i <b>validaci na straně serveru</b>.</p>



<h2 id="odkazy">Odkazy jinam</h2>

<ul>
  <li>WHATWG: <a href="https://html.spec.whatwg.org/multipage/forms.html#attr-fe-minlength">The <code>minlength</code> attribute</a></li>
</ul>