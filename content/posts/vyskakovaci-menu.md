---
title: "Vyskakovací menu v CSS"
headline: "Vyjížděcí menu v CSS"
description: "Jak vytvořit v čistém CSS vyskakovací menu."
date: "2013-06-05"
last_modification: "2013-06-21"
status: 1
tags: ["css", "hotova-reseni", "menu"]
format: "html"
---

<p>V kaskádových stylech lze využít pseudo třídy <code>:hover</code> a docílit tak toho, že při <b>najetí myší</b> na nějakou položku se jiná objeví. 
<ol>
  <li>Normálně je element skrytý (<code><a href="/display">display</a>: none</code>),
<li>při <code>:hover</code>u se přepne na <code>block</code>/<code>inline</code>.
</ol>
<div class='live'>
<style>
.demo span {display: none}
.demo:hover span {display: inline}
</style>
<p class="demo">Ahoj… <span>Světe!</span></p>
</div>

<p>Funguje to od <b>Internet Exploreru 7</b>, starší umí <code>:hover</code> jen na odkazech.

<h2>Menu jako na Alza.cz</h2>
<p>Pokud se k výše uvedenému principu přidá špetka dalšího CSS, může to vypadat takto…</p>

<div class="live" style="background: transparent">
<style>
.navigace a {border: 0}
.navigace a:hover {background: #81C1F5; color: #0D6AB7}

.navigace {width: 280px}
.navigace, ul {list-style: none; padding: 0; margin: 0}

.navigace li {display: block;}
.navigace li a {display: block; padding: .5em 10px; color: navy}
.navigace > li {position: relative; margin-bottom: .2em;  border: 1px solid transparent; height: 3em; background: #81C1F5}
.navigace > li:hover {border: 1px solid #0D6AB7; z-index: 1}
.navigace > li > a {position: absolute; top: 0; left: 0; width: 260px; line-height: 2em; background: #81C1F5}
.navigace > li:hover > a {z-index: 11}
.navigace li ul {display: none; position: absolute; left: 260px; top: -1px; width: 620px; padding-left: 20px; background: #81C1F5; border: 1px solid #0D6AB7; border-bottom-width: 3px; z-index: 10}
.navigace li:hover ul {display: block;}

.navigace ul li {display: block; float: left;}
.navigace ul a {float: left; width: 184px; text-align: center;}
.navigace ul a:hover {text-decoration: none; background: #0D6AB7; color: #fff}
</style>

<menu class=navigace>
	<li><a href='#'>Vyskakovací</a>
		<ul>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
		</ul>
	<li><a href='#'>Menu</a>
		<ul>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
		</ul>
	<li><a href='#'>Pomocí</a>
		<ul>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
		</ul>
	<li><a href='#'>CSS</a>
		<ul>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
			<li><a href='#'>Odkaz</a>
		</ul>
</menu>
</div>

<p>U vyskakovacího menu bývá dobrá nějaká tolerance nepřesnosti pohybu, zabývá se tím samostatný článek:</p>

<div class="internal-content">
  <ul>
    <li>
      <p><a href="/tolerance-menu">Tolerance myši u vysouvacího menu</a></p>
    </li>
  </ul>
</div>