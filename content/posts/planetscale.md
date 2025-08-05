---
title: "Provozování MySQL na PlanetScale"
headline: "Provozování MySQL na PlanetScale"
description: "Jak zdarma hostovat v cloudu MySQL."
date: "2023-02-13"
last_modification: "2023-02-13"
status: 0
tags: []
format: "html"
---

<p><a href="https://planetscale.com">PlanetScale</a> je online platforma pro provozování MySQL database.</p>

<p>Používá <a href="https://vitess.io">Vitess</a>.</p>

<p>Pokud webová aplikace potřebuje někam ukládat strukturovaná data a hodí se k tomu SQL, <b>PlanetScale</b> dokáže používání MySQL výrazně zpříjemnit.</p>

<p>Nabízí relativně štědrý bezplatný tarif, takže jde na ní menší projekty provozovat úplně bezplatně.</p>

<p>Připojení k DB:</p>

<pre><code>pscale shell jecas dev</code></pre>

<p>Import z SQL dumpu:</p>

<pre><code>source sql/dump.sql</code></pre>

<h2 id="omezeni">Nevýhody a omezení</h2>

<h3 id="cizi-klice">Cizí klíče</h3>

<p>Vitess, který PlanetScale používá, nebyl primárně navržen tak, aby podporoval cizí klíče.</p>

<p>Vzhledem k tomu, že cizí klíče vyžadují transakční garanci konsistence mezi více tabulkami, jejich implementace by mohla ovlivnit výkon a škálovatelnost řešení.</p>

<p>Některé vlastnosti cizích klíčů jde ale implementovat manuálně přímo v aplikaci.</p>

<p>PlanetScale nepodporuje cizí klíče:</p>

<div class="external-content">
  <ul>
    <li><a href="https://vitess.io/blog/2021-06-15-online-ddl-why-no-fk/">Online DDL: why FOREIGN KEYs are not supported</a></li>
    <li>
      <a href="https://planetscale.com/docs/learn/operating-without-foreign-key-constraints">Operating without foreign key constraints</a>
    </li>
  </ul>
</div>

https://www.prisma.io/docs/guides/database/using-prisma-with-planetscale