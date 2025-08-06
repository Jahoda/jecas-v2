---
title: "Confirm"
headline: "Confirm"
description: "Confirm je JavaScriptová hláška pro potvrzení akce. Jak ji používat nebo nahradit vlastním dialogovým oknem."
date: "2014-02-23"
last_modification: "2014-03-15"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Nejjednodušší použití je:</p>

<pre><code>&lt;button onclick="<b>confirm</b>('Opravdu?')">
  Kliknout
&lt;/button></code></pre>

<div class="live">
  <button onclick="confirm('Opravdu?')">Kliknout</button>
</div>

<p>Kromě toho, že se tím zajistí zobrazení dialogového okna.</p>

<p><img src="/files/confirm/confirm.png" alt="Potvrzení confirmu" class="border"></p>

<p>… nedělá ukázka prakticky nic.</p>

<h2 id="zpracovani">Zpracování <code>confirm</code>u</h2>
<p>Zjištění, na které z tlačítek uživatel kliknul je prosté — při kliknutí na OK funkce <code>confirm</code> vrátí <code>true</code>, jinak <code>false</code>.</p>

<pre><code>var potvrzeni = confirm("Opravdu");
if (potvrzeni) {
  // akce při potvrzení
}
else {
  // akce při stornování
}
</code></pre>

<h2 id="potvrzeni">Potvrzení odkazu / odeslání formuláře</h2>
<p>Velmi jednoduchý příklad, který ale už něco dělá, může být potvrzení prokliknutí odkazu nebo potvrzení odesální formuláře.</p>

<p>To se může hodit například u odhlašovacího tlačítka. Při potvrzení se tato stránka načte znovu, jinak se nestane nic.</p>

<div class="live">
  <a href="/confirm" onclick="return confirm('Opravdu?')">Kliknout</a>
</div>

<h3 id="formular">Potvrzení odeslání formuláře</h3>

<p>V případě formuláře to bude vypadat následovně:</p>

<pre><code>&lt;form action="./?" <i>onsubmit</i>="return <b>confirm</b>('Opravdu')">
  &lt;button type="submit">
    Odeslat
  &lt;/button>
&lt;/form></code></pre>

<p>Oba postupy využívají toho, že konstrukce <code>return false</code> zabrání provedení běžné akce. A právě <code>false</code> se za <code>return</code> dostane, když uživatel <code>confirm</code> stornuje (<code>confirm</code> vrátí <code>false</code>).</p>

<h2 id="vlastni">Vlastní <code>confirm</code></h2>
<p>Podobně jako je možné si vytvořit <a href="/vlastni-alert">vlastní <code>alert</code></a>, dá se o něco podobného pokusi i v případě <b>potvrzovací hlášky</b> <code>confirm</code>.</p>

<p>Stejně jako <code>alert</code> má i <b>originální</b> <code>confirm</code> zvláštní funkci — před odpovědí uživatele pozastaví běh skriptů. Tu vlastní <i>atrapa</i> pochopitelně nezajistí.</p>

<div class="live">
<style>
.confirm {
    position: fixed; width: 200px; height: 50px; padding: 1em; background: #0D6AB7; color: #fff; display: none; top: 0; left: 0; bottom: 0; right: 0; margin: auto;}

</style>
<script>
var potvrdit = function(text, el) {
    var cover = document.createElement("div");
    cover.className = "confirm";
    cover.style.display = "block";
    var content = document.createElement("div");
    content.innerHTML = text;
    var ok = document.createElement("button");
    ok.innerHTML = "Ano";
    var cancel = document.createElement("button");
    cancel.innerHTML = "Zrušit";
    cancel.onclick = function() {
        cover.style.display = "";
    };
    ok.onclick = function() {
        el.onclick = null;
        el.click();
    };
    cover.appendChild(content);
    cover.appendChild(ok);
    cover.appendChild(cancel);
    document.body.appendChild(cover);
    return false;
};
</script>
<a href="http://djpw.cz" onclick="return potvrdit('Opravdu?', this)">Přejít na DJPW</a>
</div>

<p><a href="https://kod.djpw.cz/ikcb">Samostatná ukázka</a></p>