---
title: "Jak používat git rebase"
headline: "Jak používat <code>git rebase</code>"
description: "Proč a jak používat git rebase pro přehlednou historii v Gitu."
date: "2020-06-05"
last_modification: "2020-06-05"
status: 0
tags: []
format: "html"
---

<p>Při práci ve více lidech s versovacím nástrojem Git je prakticky nevyhnutelný stav, kdy vývoj probíhá paraelně ve více větvích. V extrémním případě potom ve větvích různě od sebe odvozených.</p>

<p>Např. první <i>feature branch</i> odvozená z hlavní <code>master</code> větve, ze které vychází další <i>feature branch</i>. </p>

<p>Příkaz <code>git rebase</code> (popř. <code>git merge</code>) se potom hodí pro synchronisaci větví mezi sebou, aby pořád vycházely z aktuálního <i>masteru</i>.</p>




<h2 id="merge">Merge vs. rebase</h2>

<p>Obecně celkem platí, že <code>git merge</code> používají dvě skupiny lidí:</p>

<ol>
  <li>lidé, co moc nerozumí Gitu,</li>
  <li>lidé, co neřeší hezkou historii commitů</li>
</ol>

<p>Hezká historiie souvisí i s vytvářením smysluplných commitů.</p>


<h2 id="onto">Rebase <code>onto</code></h2>