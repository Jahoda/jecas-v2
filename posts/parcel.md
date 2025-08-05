---
title: "Parcel"
headline: "Parcel"
description: "Build JS pomocí nástroje Parcel."
date: "2019-04-08"
last_modification: "2019-04-08"
status: 0
tags: []
format: "html"
---

<h2 id="safe-write">Safe Write</h2>

<pre><code>Cannot read property 'type' of undefined</code></pre>

<ul>
  <li><a href="https://parceljs.org/hmr.html#safe-write">Safe Write</a></li>
</ul>


<h2 id="funkce">Globální funkce</h2>

<h3><code>fytopuf.js</code></h3>
<pre><code>var fytopuf = function () {
	alert(1)
}

export default (() => {
	window.fytopuf = fytopuf
})()

</code></pre>

<h3><code>index.js</code></h3>
<pre><code>import fytopuf  from './fytopuf'
window.fytopuf = fytopuf</code></pre>


<h2 id="jquery">jQuery</h2>

<p>Soubor <code>import-jquery.js</code>:</p>

<pre><code>import jquery from "jquery"
window.$ = window.jQuery = jquery</code></pre>

<p>A v <code>index.js</code> připojit:</p>

<pre><code>import './import-jquery'</code></pre>


<h2 id="esbuild">Esbuild</h2>

<ul>
  <li><a href="https://github.com/evanw/esbuild/">esbuild</a></li>
</ul>