---
title: "Změna barvy lišty v mobilních prohlížečích"
headline: "Barva horní lišty v mobilním prohlížeči"
description: "Jak obarvit záhlaví mobilního prohlížeče, aby ladilo se stránkou."
date: "2017-11-16"
last_modification: "2020-03-14"
status: 1
tags: ["napady", "responsive", "webove-prohlizece"]
format: "html"
---

<p><img src="/files/barva-mobilniho-prohlizece/app-theme.png" alt="Barva záhlaví mobilního Chrome" class="border"></p>



























<p>Mobilní OS a prohlížeče se snaží neustále stírat <b>rozdíly mezi webovou a nativní aplikací</b>. Jedna malá drobnost, jak se přiblížit stavu nativní aplikace, je přebarvení <b>záhlaví prohlížeče</b>.</p>

<p>Používají se k tomu <code>&lt;meta></code> značky umístěné v <a href="/html-kostra#head">hlavičce stránky</a> (sekce <code>&lt;head></code>).</p>


<h2 id="chrome">Chrome na Androidu</h2>

<p>Slouží k tomu <code>&lt;meta></code> značka „theme-color“:</p>

<pre><code>&lt;meta name="theme-color" content="<b>#1081DD</b>"></code></pre>


<p>Druhá možnost je nastavit tuto barvu v souboru <code>manifest.json</code>:</p>


<pre><code>"theme_color": "<b>#1081DD</b>"</code></pre>

<p>Zmíněná <code>&lt;meta></code> značka má ale přednost.</p>

<div class="external-content">
  <ul>
    <li>
      <a href="https://developers.google.com/web/updates/2015/08/using-manifest-to-set-sitewide-theme-color">Using the web app manifest to specify a site wide theme color</a>
    </li>
  </ul>
</div>



<p>Po jejím použití by měl prohlížeč vypadat obdobně jako na obrázku výše.</p>


<h2 id="ios">Apple iOS</h2>

<p>Pro změnu barvy lišty v <b>Safari</b> na iOS je možné dohledat následující značky:</p>

<pre><code>&lt;meta name="apple-mobile-web-app-capable" content="yes">
&lt;meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
</code></pre>


<p>Dle mých testů v <b>iOS 11</b> to ale na zobrazení nemá vliv.</p>

<div class="external-content">
  <ul>
    <li><a href="https://kod.djpw.cz/lelc">Živá ukázka</a> – pokus o změnu barvy záhlaví mobilních prohlížečů</li>
  </ul>
</div>

<h2 id="wp">Windows Phone 8.1</h2>

<p>Pro Windows Phone a jeho nativní prohlížeč <b>Edge</b> se někde uvádí <code>&lt;meta></code> značka:</p>


<pre><code>&lt;meta name="msapplication-navbutton-color" content="#1081DD">
</code></pre>


<p>Podle mých testů ale nic nedělá. Navíc  je tento prohlížeč už minimální zastoupení.</p>



<div class="soft">
  <p>Zdá se, že přebarvení je možné provést pouze na <b>Androidu</b>. Máte jiné zkušenosti? Budu moc rád, když mi dáte vědět v komentářích.</p>
</div>


<h2 id="odkazy">Odkazy jinam</h2>

<div class="external-content">
  <ul>
    <li>Web Google Developers: <a href="https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android">Support for theme-color in Chrome 39 for Android</a></li>
    <li>webhint: <a href="https://webhint.io/docs/user-guide/hints/hint-meta-theme-color/">Valid `Theme-Color`
</a></li>
  </ul>
</div>