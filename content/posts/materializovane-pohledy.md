---
title: "Co jsou materializované pohledy (Materialized Views)"
headline: "Co jsou materializované pohledy a jak zvýší výkon databáze"
description: "Materializované pohledy jsou mocný nástroj pro optimalizaci databázových dotazů. Zjistěte, jak fungují a kdy je použít."
date: "2025-11-21"
last_modification: "2025-11-21"
status: 1
tags: ["sql", "databaze", "zrychleni", "optimalizace"]
format: "html"
---

<p>Materializované pohledy (<i lang="en">Materialized Views</i>) jsou jedním z nejefektivnějších nástrojů pro optimalizaci výkonu databázových dotazů. Zatímco běžné pohledy (views) jsou pouze uložené dotazy, materializované pohledy fyzicky ukládají výsledky do databáze.</p>

<h2 id="co-je-to">Co je to materializovaný pohled?</h2>

<p>Materializovaný pohled je databázový objekt, který obsahuje <b>fyzicky uložené výsledky dotazu</b>. Na rozdíl od běžného pohledu, který se pokaždé znovu vyhodnocuje při každém přístupu, materializovaný pohled ukládá data na disk.</p>

<p>Představte si to jako <b>cache pro databázové dotazy</b>.</p>

<h3 id="rozdil-views">Rozdíl mezi View a Materialized View</h3>

<table>
  <thead>
    <tr>
      <th>Vlastnost</th>
      <th>View (Pohled)</th>
      <th>Materialized View</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ukládání dat</td>
      <td>Neukládá, jen definice dotazu</td>
      <td>Fyzicky ukládá výsledky</td>
    </tr>
    <tr>
      <td>Výkon čtení</td>
      <td>Pomalý (spouští dotaz vždy)</td>
      <td>Rychlý (čte uložená data)</td>
    </tr>
    <tr>
      <td>Aktuálnost dat</td>
      <td>Vždy aktuální</td>
      <td>Může být zastaralé</td>
    </tr>
    <tr>
      <td>Diskový prostor</td>
      <td>Minimální</td>
      <td>Může být značný</td>
    </tr>
  </tbody>
</table>

<h2 id="jak-funguje">Jak funguje materializovaný pohled?</h2>

<p>Princip je následující:</p>

<ol>
  <li><b>Vytvoření:</b> Při vytvoření se spustí definovaný dotaz a výsledky se uloží</li>
  <li><b>Čtení:</b> Dotazy na materializovaný pohled čtou přímo uložená data (velmi rychle)</li>
  <li><b>Refresh:</b> Data je potřeba pravidelně aktualizovat, aby odpovídala zdrojovým tabulkám</li>
</ol>

<h2 id="vytvoreni">Vytvoření materializovaného pohledu</h2>

<p>Syntaxe se liší podle databázového systému. Zde jsou příklady pro nejpoužívanější databáze:</p>

<h3 id="postgresql">PostgreSQL</h3>

<pre><code>CREATE MATERIALIZED VIEW orders_summary AS
SELECT
    customer_id,
    COUNT(*) as order_count,
    SUM(total_amount) as total_spent,
    MAX(order_date) as last_order_date
FROM orders
GROUP BY customer_id;

-- Vytvoření indexu pro rychlejší dotazy
CREATE INDEX idx_orders_summary_customer
ON orders_summary(customer_id);</code></pre>

<h3 id="mysql">MySQL</h3>

<p>MySQL nemá nativní podporu pro materializované pohledy, ale lze je simulovat pomocí <b>tabulek a triggerů</b> nebo <b>pravidelných úloh</b>:</p>

<pre><code>-- Vytvoření tabulky jako materializovaného pohledu
CREATE TABLE orders_summary AS
SELECT
    customer_id,
    COUNT(*) as order_count,
    SUM(total_amount) as total_spent,
    MAX(order_date) as last_order_date
FROM orders
GROUP BY customer_id;

-- Pravidelná aktualizace pomocí EVENT
CREATE EVENT refresh_orders_summary
ON SCHEDULE EVERY 1 HOUR
DO
  REPLACE INTO orders_summary
  SELECT
      customer_id,
      COUNT(*) as order_count,
      SUM(total_amount) as total_spent,
      MAX(order_date) as last_order_date
  FROM orders
  GROUP BY customer_id;</code></pre>

<h2 id="refresh">Aktualizace dat (Refresh)</h2>

<p>Klíčovou otázkou u materializovaných pohledů je, <b>kdy a jak aktualizovat data</b>.</p>

<h3 id="strategie-refresh">Strategie aktualizace</h3>

<h4>1. Manuální refresh</h4>

<pre><code>-- PostgreSQL
REFRESH MATERIALIZED VIEW orders_summary;</code></pre>

<h4>2. Automatický refresh pomocí cron nebo scheduleru</h4>

<p>PostgreSQL nemá vestavěný scheduler, ale můžete použít:</p>

<pre><code>-- PostgreSQL: Pomocí pg_cron rozšíření
SELECT cron.schedule('refresh-orders-summary', '0 2 * * *',
  'REFRESH MATERIALIZED VIEW orders_summary');

-- Nebo klasický cron na serveru
# crontab -e
0 2 * * * psql -d mydb -c "REFRESH MATERIALIZED VIEW orders_summary;"</code></pre>

<p><b>MySQL:</b> Použijte EVENT scheduler (ukázka výše v sekci MySQL).</p>

<h2 id="kdy-pouzit">Kdy použít materializované pohledy?</h2>

<p>Materializované pohledy jsou ideální v následujících situacích:</p>

<h3 id="analyticke-dotazy">1. Analytické a reportovací dotazy</h3>

<p>Složité agregace přes miliony záznamů:</p>

<pre><code>CREATE MATERIALIZED VIEW sales_analytics AS
SELECT
    DATE_TRUNC('month', order_date) as month,
    product_category,
    region,
    COUNT(*) as order_count,
    SUM(amount) as total_revenue,
    AVG(amount) as avg_order_value,
    COUNT(DISTINCT customer_id) as unique_customers
FROM orders
JOIN products ON orders.product_id = products.id
JOIN customers ON orders.customer_id = customers.id
WHERE order_date >= DATE_TRUNC('year', CURRENT_DATE - INTERVAL '2 years')
GROUP BY DATE_TRUNC('month', order_date), product_category, region;</code></pre>

<h3 id="joiny">2. Časté joiny přes více tabulek</h3>

<p>Pokud máte dotaz, který joinuje 5+ tabulek a spouští se často:</p>

<pre><code>CREATE MATERIALIZED VIEW customer_360_view AS
SELECT
    c.customer_id,
    c.name,
    c.email,
    a.address,
    COUNT(DISTINCT o.order_id) as lifetime_orders,
    SUM(o.total) as lifetime_value,
    MAX(o.order_date) as last_order,
    AVG(r.rating) as avg_rating,
    s.subscription_status
FROM customers c
LEFT JOIN addresses a ON c.customer_id = a.customer_id
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN reviews r ON c.customer_id = r.customer_id
LEFT JOIN subscriptions s ON c.customer_id = s.customer_id
GROUP BY c.customer_id, c.name, c.email, a.address, s.subscription_status;</code></pre>

<h3 id="dashboardy">3. Dashboardy a metriky</h3>

<p>Pro dashboardy, které se načítají často, ale data se mění pomaleji:</p>

<pre><code>CREATE MATERIALIZED VIEW dashboard_metrics AS
SELECT
    'today' as period,
    COUNT(*) as orders,
    SUM(total) as revenue,
    COUNT(DISTINCT customer_id) as customers
FROM orders
WHERE order_date >= CURRENT_DATE

UNION ALL

SELECT
    'this_month' as period,
    COUNT(*) as orders,
    SUM(total) as revenue,
    COUNT(DISTINCT customer_id) as customers
FROM orders
WHERE order_date >= DATE_TRUNC('month', CURRENT_DATE)

UNION ALL

SELECT
    'this_year' as period,
    COUNT(*) as orders,
    SUM(total) as revenue,
    COUNT(DISTINCT customer_id) as customers
FROM orders
WHERE order_date >= DATE_TRUNC('year', CURRENT_DATE);</code></pre>

<h3 id="data-warehouse">4. Data Warehouse a ETL procesy</h3>

<p>Pro předpočítané agregace v datových skladech.</p>

<h2 id="vyhody-nevyhody">Výhody a nevýhody</h2>

<h3 id="vyhody">Výhody</h3>

<ul>
  <li><b>Dramatické zrychlení dotazů</b> - i 100× a více pro složité agregace</li>
  <li><b>Snížení zátěže databáze</b> - méně výpočtů při každém dotazu</li>
  <li><b>Možnost indexování</b> - na materializovaný pohled lze vytvořit indexy</li>
  <li><b>Prediktabilní výkon</b> - dotazy mají konzistentní rychlost</li>
</ul>

<h3 id="nevyhody">Nevýhody</h3>

<ul>
  <li><b>Zastaralá data</b> - data nemusí být aktuální</li>
  <li><b>Diskový prostor</b> - zabírají místo na disku</li>
  <li><b>Režie při aktualizaci</b> - refresh může být náročný</li>
  <li><b>Komplexita údržby</b> - je třeba řídit aktualizaci</li>
</ul>

<h2 id="best-practices">Best Practices</h2>

<h3 id="indexy">1. Vytvářejte indexy</h3>

<p>Materializované pohledy podporují indexy stejně jako běžné tabulky:</p>

<pre><code>CREATE INDEX idx_mv_customer ON orders_summary(customer_id);
CREATE INDEX idx_mv_date ON sales_analytics(month, region);</code></pre>

<h3 id="monitoring">2. Monitorujte velikost a výkon</h3>

<pre><code>-- PostgreSQL: velikost materializovaného pohledu
SELECT
    schemaname,
    matviewname,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||matviewname)) as size
FROM pg_matviews
ORDER BY pg_total_relation_size(schemaname||'.'||matviewname) DESC;</code></pre>

<h3 id="refresh-strategie">3. Volte správnou refresh strategii</h3>

<ul>
  <li><b>Real-time data:</b> Materializované pohledy nejsou vhodné - použijte běžné views nebo cache</li>
  <li><b>Near real-time:</b> Refresh každých 5-15 minut</li>
  <li><b>Reporty:</b> Refresh jednou denně (v noci)</li>
  <li><b>Historická data:</b> Refresh týdně nebo měsíčně</li>
</ul>

<h3 id="concurrently">4. Použijte CONCURRENTLY refresh (PostgreSQL)</h3>

<p>Běžný refresh zamkne materializovaný pohled. S <code>CONCURRENTLY</code> zůstává pohled dostupný:</p>

<pre><code>REFRESH MATERIALIZED VIEW CONCURRENTLY orders_summary;</code></pre>

<p><b>Poznámka:</b> Vyžaduje unique index na pohledu.</p>

<h3 id="partial">5. Zvažte částečné materializované pohledy</h3>

<p>Nemusíte materializovat všechna data, jen ta nejpoužívanější:</p>

<pre><code>-- Pouze data za poslední rok
CREATE MATERIALIZED VIEW recent_orders_summary AS
SELECT
    customer_id,
    COUNT(*) as order_count,
    SUM(total_amount) as total_spent
FROM orders
WHERE order_date >= CURRENT_DATE - INTERVAL '1 year'
GROUP BY customer_id;</code></pre>

<h2 id="ukazka">Praktická ukázka: Zrychlení reportu</h2>

<p>Představme si e-shop s reportem zobrazujícím top produkty za poslední měsíc.</p>

<h3 id="pred">Před - běžný pohled</h3>

<pre><code>CREATE VIEW top_products AS
SELECT
    p.product_name,
    p.category,
    COUNT(oi.order_item_id) as items_sold,
    SUM(oi.quantity) as total_quantity,
    SUM(oi.price * oi.quantity) as total_revenue
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY p.product_id, p.product_name, p.category
ORDER BY total_revenue DESC
LIMIT 100;

-- Dotaz trvá: 2.3 sekundy</code></pre>

<h3 id="po">Po - materializovaný pohled</h3>

<pre><code>CREATE MATERIALIZED VIEW top_products AS
SELECT
    p.product_name,
    p.category,
    COUNT(oi.order_item_id) as items_sold,
    SUM(oi.quantity) as total_quantity,
    SUM(oi.price * oi.quantity) as total_revenue
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY p.product_id, p.product_name, p.category
ORDER BY total_revenue DESC
LIMIT 100;

CREATE INDEX idx_top_products_revenue ON top_products(total_revenue DESC);

-- Refresh každou hodinu
-- (konfigurace závisí na databázi)

-- Dotaz trvá: 0.02 sekundy (100× rychleji!)</code></pre>

<h2 id="moderni-alternativy">Moderní databázové alternativy</h2>

<p>Kromě PostgreSQL a MySQL existují moderní databáze s pokročilou podporou pro materializované pohledy:</p>

<h3 id="alloydb">AlloyDB (Google Cloud)</h3>

<p><b>AlloyDB</b> je plně spravovaná PostgreSQL-kompatibilní databáze od Google. Oproti standardnímu PostgreSQL nabízí:</p>

<ul>
  <li><b>Až 4× rychlejší transakce</b> oproti standardnímu PostgreSQL</li>
  <li><b>Až 100× rychlejší analytické dotazy</b> díky column-store enginu</li>
  <li><b>Nativní integrace</b> s Google Cloud ekosystémem</li>
  <li><b>Automatické škálování</b> a vysoká dostupnost</li>
  <li><b>Kompatibilita</b> s PostgreSQL - včetně materializovaných pohledů</li>
</ul>

<p>Materializované pohledy v AlloyDB fungují stejně jako v PostgreSQL, ale s lepším výkonem díky optimalizovanému storage.</p>

<h3 id="clickhouse">ClickHouse</h3>

<p><b>ClickHouse</b> je open-source column-oriented databáze optimalizovaná pro analytické dotazy (OLAP).</p>

<ul>
  <li><b>Incremental materialized views</b> - automatická aktualizace při vložení dat</li>
  <li><b>Extrémně rychlé</b> - zpracování miliard řádků za sekundy</li>
  <li><b>Agregující enginy</b> - vestavěná podpora pro agregace</li>
</ul>

<pre><code>-- ClickHouse: Materialized view s automatickou aktualizací
CREATE MATERIALIZED VIEW orders_summary_mv
ENGINE = SummingMergeTree()
ORDER BY customer_id
AS SELECT
    customer_id,
    count() as order_count,
    sum(total_amount) as total_spent,
    max(order_date) as last_order_date
FROM orders
GROUP BY customer_id;

-- Data se aktualizují AUTOMATICKY při INSERT do orders!</code></pre>

<p><b>Výhoda:</b> Nepotřebujete refresh - view se aktualizuje inkrementálně při vkládání dat.</p>

<h3 id="timescaledb">TimescaleDB</h3>

<p><b>TimescaleDB</b> je rozšíření PostgreSQL pro time-series data (časové řady).</p>

<ul>
  <li><b>Continuous Aggregates</b> - chytřejší materializované pohledy</li>
  <li><b>Automatická aktualizace</b> na pozadí</li>
  <li><b>Refresh policy</b> - nastavitelná strategie aktualizace</li>
</ul>

<pre><code>-- TimescaleDB: Continuous aggregate
CREATE MATERIALIZED VIEW orders_daily
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 day', order_date) as day,
    customer_id,
    COUNT(*) as order_count,
    SUM(total_amount) as daily_total
FROM orders
GROUP BY day, customer_id;

-- Automatická refresh policy
SELECT add_continuous_aggregate_policy('orders_daily',
    start_offset => INTERVAL '1 month',
    end_offset => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour');</code></pre>

<p><b>Výhoda:</b> Optimalizováno pro časové řady, automatické inkrementální aktualizace.</p>

<h3 id="cockroachdb">CockroachDB</h3>

<p><b>CockroachDB</b> je distribuovaná SQL databáze kompatibilní s PostgreSQL.</p>

<ul>
  <li><b>Podpora materializovaných pohledů</b> (od verze 23.1)</li>
  <li><b>Distribuované zpracování</b> - view může být rozložen přes více nodů</li>
  <li><b>Vysoká dostupnost</b> - automatické replikace</li>
</ul>

<h3 id="srovnani-databazi">Srovnání databází</h3>

<table>
  <thead>
    <tr>
      <th>Databáze</th>
      <th>Typ</th>
      <th>Refresh</th>
      <th>Výhoda</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PostgreSQL</td>
      <td>OLTP</td>
      <td>Manuální/Cron</td>
      <td>Všestranná, stabilní</td>
    </tr>
    <tr>
      <td>MySQL</td>
      <td>OLTP</td>
      <td>Simulace tabulkou</td>
      <td>Široce podporovaná</td>
    </tr>
    <tr>
      <td>AlloyDB</td>
      <td>OLTP/OLAP</td>
      <td>Manuální/Cron</td>
      <td>Managed, rychlejší PG</td>
    </tr>
    <tr>
      <td>ClickHouse</td>
      <td>OLAP</td>
      <td>Automatický</td>
      <td>Extrémní rychlost</td>
    </tr>
    <tr>
      <td>TimescaleDB</td>
      <td>Time-series</td>
      <td>Automatický</td>
      <td>Optimalizace pro čas</td>
    </tr>
    <tr>
      <td>CockroachDB</td>
      <td>OLTP</td>
      <td>Manuální</td>
      <td>Distribuovaná</td>
    </tr>
  </tbody>
</table>

<h3 id="kdy-pouzit-moderni">Kdy použít moderní alternativy?</h3>

<ul>
  <li><b>AlloyDB:</b> Pokud používáte Google Cloud a potřebujete lepší výkon než PostgreSQL</li>
  <li><b>ClickHouse:</b> Pro analytické aplikace s obrovskými objemy dat (miliardy řádků)</li>
  <li><b>TimescaleDB:</b> Pro IoT, monitoring, metriky a jiná time-series data</li>
  <li><b>CockroachDB:</b> Když potřebujete globální distribuci a vysokou dostupnost</li>
</ul>

<h2 id="alternativy">Alternativy k materializovaným pohledům</h2>

<p>V některých situacích mohou být lepší jiná řešení:</p>

<ul>
  <li><b>Indexy:</b> Pro jednoduché dotazy může stačit správný index</li>
  <li><b>Partitioning:</b> Rozdělení velkých tabulek na menší části</li>
  <li><b>Query cache:</b> Aplikační cache (Redis, Memcached)</li>
  <li><b>Denormalizace:</b> Přidání redundantních sloupců do tabulek</li>
  <li><b>Incremental views:</b> Některé databáze podporují inkrementální aktualizaci</li>
</ul>

<h2 id="zaver">Závěr</h2>

<p>Materializované pohledy jsou mocný nástroj pro optimalizaci výkonu databáze:</p>

<ul>
  <li>Výrazně zrychlují složité a opakující se dotazy</li>
  <li>Snižují zátěž databázového serveru</li>
  <li>Ideální pro analytické dotazy, reporty a dashboardy</li>
  <li>Je třeba vyvážit rychlost čtení vs. aktuálnost dat</li>
  <li>Vyžadují správnou strategii aktualizace a údržby</li>
</ul>

<p>Pokud máte v aplikaci pomalé dotazy, které se často opakují, ale data se mění pomaleji, materializované pohledy mohou být přesně to, co hledáte.</p>
