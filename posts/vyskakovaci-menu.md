---
title: "Vyskakovací menu v CSS"
headline: "Vyjížděcí menu v CSS"
description: "Jak vytvořit v čistém CSS vyskakovací menu."
date: "2013-06-05"
last_modification: "2013-06-21"
status: 1
tags: ["CSS", "Hotová řešení", "Menu v CSS"]
---

V kaskádových stylech lze využít pseudo třídy `:hover` a docílit tak toho, že při **najetí myší** na nějakou položku se jiná objeví. 

  Normálně je element skrytý (`[display](/display): none`),
při `:hover`u se přepne na `block`/`inline`.

.demo span {display: none}
.demo:hover span {display: inline}

Ahoj… Světe!

Funguje to od **Internet Exploreru 7**, starší umí `:hover` jen na odkazech.

## Menu jako na Alza.cz

Pokud se k výše uvedenému principu přidá špetka dalšího CSS, může to vypadat takto…

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

	Vyskakovací
		
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz

	Menu
		
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz

	Pomocí
		
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz

	CSS
		
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz
			Odkaz

U vyskakovacího menu bývá dobrá nějaká tolerance nepřesnosti pohybu, zabývá se tím samostatný článek:

      [Tolerance myši u vysouvacího menu](/tolerance-menu)