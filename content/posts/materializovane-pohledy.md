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

<p>Materializované pohledy jsou jedním ze základních stavebních kamenů datových skladů (Data Warehouse).</p>

<h4>Co je Data Warehouse?</h4>

<p><b>Data Warehouse</b> (datový sklad) je centrální úložiště dat z různých zdrojů, optimalizované pro analytické dotazy a reportování.</p>

<p>Hlavní rozdíly oproti běžné databázi:</p>

<ul>
  <li><b>OLTP</b> = <i lang="en">Online Transaction Processing</i> (online zpracování transakcí) - běžné databáze pro aplikace</li>
  <li><b>OLAP</b> = <i lang="en">Online Analytical Processing</i> (online analytické zpracování) - databáze pro analýzu a reporty</li>
</ul>

<table>
  <thead>
    <tr>
      <th>Vlastnost</th>
      <th>Běžná databáze (OLTP)</th>
      <th>Data Warehouse (OLAP)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Účel</td>
      <td>Transakce (vkládání, updaty)</td>
      <td>Analýza (agregace, reporty)</td>
    </tr>
    <tr>
      <td>Optimalizace</td>
      <td>Rychlé zápisy</td>
      <td>Rychlé čtení</td>
    </tr>
    <tr>
      <td>Struktura</td>
      <td>Normalizovaná (3NF)</td>
      <td>Denormalizovaná (star schema)</td>
    </tr>
    <tr>
      <td>Data</td>
      <td>Aktuální</td>
      <td>Historická + aktuální</td>
    </tr>
    <tr>
      <td>Velikost dotazů</td>
      <td>Malé (jednotlivé záznamy)</td>
      <td>Velké (miliony řádků)</td>
    </tr>
  </tbody>
</table>

<h4>Praktické příklady:</h4>

<ul>
  <li><b>OLTP příklad:</b> E-shop databáze - vkládání objednávek, aktualizace skladu, registrace uživatelů</li>
  <li><b>OLAP příklad:</b> Analýza prodejů za poslední 3 roky, segmentace zákazníků, predikce trendů</li>
</ul>

<p><b>Materializované pohledy jsou most mezi OLTP a OLAP</b> - berou transakční data (OLTP) a připravují je pro analytické dotazy (OLAP).</p>

<h4>Co je ETL?</h4>

<p><b>ETL</b> je proces, kterým se data dostávají do Data Warehouse. Zkratka znamená:</p>

<ul>
  <li><b>Extract</b> (Extrakce) - získání dat ze zdrojů</li>
  <li><b>Transform</b> (Transformace) - čištění a úprava dat</li>
  <li><b>Load</b> (Načtení) - uložení do datového skladu</li>
</ul>

<h4>Jak materializované pohledy zapadají do ETL?</h4>

<p>Materializované pohledy se používají ve fázi <b>Transform</b> a jako výstup <b>Load</b> fáze:</p>

<pre><code>-- EXTRACT: Data z různých zdrojů jsou v surových tabulkách
-- orders (z e-shopu)
-- crm_contacts (z CRM systému)
-- support_tickets (z help desk systému)

-- TRANSFORM & LOAD: Vytvoření materializovaného pohledu
-- který spojuje data ze všech zdrojů
CREATE MATERIALIZED VIEW customer_analytics AS
SELECT
    -- Zákaznická data
    c.customer_id,
    c.email,
    c.registration_date,

    -- Data z objednávek
    COUNT(DISTINCT o.order_id) as total_orders,
    SUM(o.total_amount) as lifetime_value,
    MAX(o.order_date) as last_order_date,

    -- Data z CRM
    crm.segment,
    crm.lead_source,

    -- Data z supportu
    COUNT(DISTINCT t.ticket_id) as support_tickets,
    AVG(t.satisfaction_score) as avg_satisfaction,

    -- Vypočítané metriky
    CASE
        WHEN MAX(o.order_date) > CURRENT_DATE - INTERVAL '30 days' THEN 'Active'
        WHEN MAX(o.order_date) > CURRENT_DATE - INTERVAL '90 days' THEN 'At Risk'
        ELSE 'Churned'
    END as customer_status
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN crm_contacts crm ON c.email = crm.email
LEFT JOIN support_tickets t ON c.customer_id = t.customer_id
GROUP BY c.customer_id, c.email, c.registration_date,
         crm.segment, crm.lead_source;

-- Indexy pro rychlé dotazy
CREATE INDEX idx_customer_analytics_status
ON customer_analytics(customer_status);
CREATE INDEX idx_customer_analytics_segment
ON customer_analytics(segment, customer_status);</code></pre>

<h4>Typická architektura Data Warehouse s materializovanými pohledy</h4>

<pre><code>┌─────────────────────────────────────────────────────────────┐
│                      ZDROJOVÉ SYSTÉMY                       │
├─────────────────────────────────────────────────────────────┤
│   E-shop    │   CRM    │  Marketing  │  Support  │  Účetní │
└──────┬──────┴────┬─────┴──────┬──────┴─────┬─────┴────┬────┘
       │           │            │            │          │
       ▼           ▼            ▼            ▼          ▼
┌─────────────────────────────────────────────────────────────┐
│                    ETL PROCES (nočně)                       │
│              Extract → Transform → Load                     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              STAGING AREA (dočasné tabulky)                 │
│           raw_orders, raw_customers, raw_crm...             │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│           DATA WAREHOUSE (fact & dimension tabulky)         │
│     fact_sales, dim_customers, dim_products, dim_time...    │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│        MATERIALIZOVANÉ POHLEDY (předpočítané metriky)       │
│  ✓ sales_by_month_mv     ✓ customer_segments_mv            │
│  ✓ product_performance_mv ✓ regional_metrics_mv            │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              BI NÁSTROJE & DASHBOARDY                       │
│         Tableau, PowerBI, Metabase, Grafana...              │
└─────────────────────────────────────────────────────────────┘</code></pre>

<h4>Příklad ETL procesu s refresh materializovaných pohledů</h4>

<pre><code>-- 1. EXTRACT: Načtení nových dat ze zdrojů (např. každou noc ve 2:00)
INSERT INTO staging.raw_orders
SELECT * FROM production.orders
WHERE order_date >= CURRENT_DATE - INTERVAL '1 day';

-- 2. TRANSFORM: Očištění a validace dat
DELETE FROM staging.raw_orders
WHERE total_amount < 0 OR customer_id IS NULL;

-- 3. LOAD: Načtení do fact tabulky
INSERT INTO warehouse.fact_sales
SELECT
    order_id,
    customer_id,
    product_id,
    order_date,
    total_amount
FROM staging.raw_orders;

-- 4. REFRESH materializovaných pohledů
REFRESH MATERIALIZED VIEW CONCURRENTLY warehouse.sales_summary;
REFRESH MATERIALIZED VIEW CONCURRENTLY warehouse.customer_metrics;
REFRESH MATERIALIZED VIEW CONCURRENTLY warehouse.product_analytics;

-- 5. Cleanup
TRUNCATE staging.raw_orders;</code></pre>

<h4>Výhody materializovaných pohledů v Data Warehouse</h4>

<ul>
  <li><b>Rychlé dashboardy:</b> BI nástroje čtou předpočítaná data místo join přes celý warehouse</li>
  <li><b>Konzistentní metriky:</b> Všichni vidí stejná čísla, vypočítaná stejným způsobem</li>
  <li><b>Oddělení zátěže:</b> Těžké výpočty běží v noci, během dne jen rychlé čtení</li>
  <li><b>Historická data:</b> Můžete materializovat i historické snapshoty</li>
</ul>

<h4>Příklad: Materializace denních snapshotů</h4>

<pre><code>-- Denní snapshot zákaznických metrik
CREATE MATERIALIZED VIEW customer_metrics_2024_01_15 AS
SELECT
    CURRENT_DATE as snapshot_date,
    customer_id,
    total_orders,
    lifetime_value,
    customer_status
FROM customer_analytics;

-- Každý den se vytvoří nový snapshot
-- Později můžete porovnávat vývoj v čase:
SELECT
    a.customer_id,
    a.lifetime_value as value_jan,
    b.lifetime_value as value_feb,
    b.lifetime_value - a.lifetime_value as growth
FROM customer_metrics_2024_01_15 a
JOIN customer_metrics_2024_02_15 b USING (customer_id);</code></pre>

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

<p>Materializované pohledy jsou fyzicky uložené tabulky, takže můžete na ně vytvořit indexy pro ještě rychlejší dotazy.</p>

<h4>Proč přidávat indexy?</h4>

<p><b>Materializovaný pohled už data předpočítal, ale stále je potřeba je vyhledat!</b></p>

<p>Představte si tento scénář:</p>

<pre><code>-- Materializovaný pohled s milionem zákazníků
CREATE MATERIALIZED VIEW orders_summary AS
SELECT
    customer_id,
    COUNT(*) as order_count,
    SUM(total_amount) as total_spent
FROM orders
GROUP BY customer_id;</code></pre>

<p>Když teď chcete najít konkrétního zákazníka:</p>

<pre><code>-- BEZ indexu: musí projít všech milion řádků!
SELECT * FROM orders_summary WHERE customer_id = 12345;
-- Trvá: 500ms (full table scan)</code></pre>

<p>S indexem je to okamžité:</p>

<pre><code>-- Vytvoříme index
CREATE INDEX idx_mv_customer ON orders_summary(customer_id);

-- S indexem: najde řádek přímo
SELECT * FROM orders_summary WHERE customer_id = 12345;
-- Trvá: 2ms (index seek)</code></pre>

<h4>Kdy vytvořit indexy?</h4>

<ul>
  <li><b>WHERE podmínky:</b> Indexujte sloupce, které používáte ve WHERE</li>
  <li><b>JOIN operace:</b> Indexujte sloupce pro joinování</li>
  <li><b>ORDER BY:</b> Index může urychlit řazení</li>
  <li><b>GROUP BY:</b> V některých případech pomůže i s grupováním</li>
</ul>

<h4>Příklady užitečných indexů:</h4>

<pre><code>-- 1. Index pro vyhledávání podle zákazníka
CREATE INDEX idx_mv_customer ON orders_summary(customer_id);

-- 2. Index pro časové dotazy
CREATE INDEX idx_mv_date ON sales_analytics(month);

-- 3. Kompozitní index pro složitější dotazy
CREATE INDEX idx_mv_date_region ON sales_analytics(month, region);

-- 4. Index pro řazení (DESC = sestupně)
CREATE INDEX idx_mv_revenue ON top_products(total_revenue DESC);

-- 5. Částečný index (jen aktivní zákazníci)
CREATE INDEX idx_mv_active ON orders_summary(customer_id)
WHERE order_count > 0;</code></pre>

<h4>Kdy NEVYTVÁŘET indexy?</h4>

<ul>
  <li>Pokud je materializovaný pohled malý (< 1000 řádků) - full scan je rychlejší</li>
  <li>Pokud nikdy nefiltrujete data - čtete vždy všechno</li>
  <li>Index zabírá místo a zpomaluje refresh - nepřehánějte to</li>
</ul>

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
