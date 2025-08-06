---
title: "WordPress spam registrace"
headline: "WordPress spam registrace"
description: "Jak zabránit falešným spam registrací robotů ve WordPress."
date: "2014-04-22"
last_modification: "2014-04-25"
status: 1
tags: ["cms", "napady", "spam-ochrana", "wordpress"]
format: "html"
---

<p>Jakožto nejpopulárnější redakční systém čelí WordPress a weby na něm postavené <b>masivnímu útoku spammerů</b> (zpravidla robotů).</p>

<p>Před <a href="/spam">spamem</a> je dobré se bránit. V případě samotných <b>registrací</b> by roboti na první pohled nemusely vadit. Horší je, že registrace je spojená s <b>odesláním potvrzovacího e-mailu</b>, což může provozovatel webhostingu vyhodnotit jako spamování.</p>

<p>Na jednom webu u <a href="http://hosting.wedos.com" onmousedown="this.href = 'http://hosting.wedos.com/d/117947'">hostingu Wedos</a> mně kvůli tomu byla zablokována PHP funkce <code>mail</code>, která rozesílání mailů obstarává.</p>

<h2 id="reseni">Řešení proti spamu</h2>

<p>První a nejjednodušší řešení je <b>registrace vůbec neumožnit</b>. Možnost zaregistrovat ovlivňuje položka <i>Členství</i> v nabídce <i>Nastavení</i>:</p>

<p><img src="/files/wordpress-spam-registrace/clenstvi.png" alt="Zapnutí/vypnutí registrací ve WordPressu" class="border"></p>

<p>Chceme-li ale registrace povolit, nezbývá než najít řešení jiné.</p>

<h2 id="plugin">Plugin proti spamu</h2>

<p>Jak už to tak u Wordpressu bývá, na všechno <b>existuje plugin</b>.</p>

<p>Funkčním se ukázal být <b>Stop Registration Spam</b>, který zavádí ochranu prostřednictvím <a href="/spam#otazka-bez-vyplneni">kontrolní otázky</a>. To je sice pro <i>živého škůdce</i> slabá metoda, ale na roboty relativně slušně funguje.</p>

<p>Po instalaci a aktivaci pluginu přibude v menu položka <i>Stop Registration Spam Settings</i>, kde je rovněž možné nastavit vlastní (českou) otázku.</p>

<p><img src="/files/wordpress-spam-registrace/stop-registration-spam.png" alt="Nastavení kontrolní otázky ve WordPresss" class="border"></p>

<p>Při špatné odpovědi se zobrazí chyba a <b>e-mail na adresu spammera</b> se neodešle. Výsledná podoba na stránce registrace (<code>example.com/wp-login.php?action=register</code>) bude následovná:</p>

<p><img src="/files/wordpress-spam-registrace/kontrolni-otazka.png" alt="Kontrolní otázka u WordPress registrace" class="border"></p>