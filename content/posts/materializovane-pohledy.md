---
title: "Co jsou materializované pohledy (materialized views)"
headline: "Co jsou materializované pohledy a jak zvýší výkon database"
description: "Materializované pohledy jsou mocný nástroj pro optimalisaci databasových dotazů."
date: "2025-11-21"
last_modification: "2025-11-21"
status: 1
tags: ["sql"]
format: "html"
---

<p>Materializované pohledy (<i lang="en">materialized views</i>) jsou jedním z nejefektivnějších nástrojů pro optimalisaci výkonu databasových dotazů. Zatímco běžné pohledy (views) jsou pouze uložené dotazy, materializované pohledy fysicky ukládají výsledky do database.</p>

<h2 id="co-je-to">Co je to materializovaný pohled?</h2>

<p>Materializovaný pohled je databasový objekt, který obsahuje <b>fysicky uložené výsledky dotazu</b>. Na rozdíl od běžného pohledu, který se pokaždé znovu vyhodnocuje při každém přístupu, materializovaný pohled ukládá data na disk.</p>

<p>Představte si to jako <b>cache pro databasové dotazy</b>.</p>

<h3 id="rozdil-views">Rozdíl mezi view a materialized view</h3>

<table>
  <thead>
    <tr>
      <th>Vlastnost</th>
      <th>View (Pohled)</th>
      <th>Materialized view</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ukládání dat</td>
      <td>Neukládá, jen definice dotazu</td>
      <td>Fysicky ukládá výsledky</td>
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
  <li><b>Refresh:</b> Data je potřeba pravidelně aktualisovat, aby odpovídala zdrojovým tabulkám</li>
</ol>

<h2 id="vytvoreni">Vytvoření materializovaného pohledu</h2>

<p>Syntaxe se liší podle databasového systému. Zde jsou příklady pro nejpoužívanější database:</p>

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

-- Pravidelná aktualisace pomocí EVENT
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

<h2 id="refresh">Aktualisace dat (Refresh)</h2>

<p>Klíčovou otázkou u materializovaných pohledů je, <b>kdy a jak aktualisovat data</b>.</p>

<h3 id="strategie-refresh">Strategie aktualisace</h3>

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

<p><b>MySQL:</b> Použijte EVENT scheduler (viz výše).</p>

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
WHERE order_date >= DATE_TRUNC('year', CURRENT_DATE – INTERVAL '2 years')
GROUP BY DATE_TRUNC('month', order_date), product_category, region;</code></pre>

<h3 id="joiny">2. Časté <code>JOIN</code>y přes více tabulek</h3>

<p>Pokud máte dotaz, který <code>JOIN</code>uje 5+ tabulek a spouští se často:</p>

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

<p>Materializované pohledy jsou jedním ze základních stavebních kamenů datových skladů.</p>

<p><b>Data Warehouse</b> (datový sklad) je centrální úložiště dat z různých zdrojů, optimalisované pro analytické dotazy a reportování.</p>


<p><b>ETL</b> je proces, kterým se data dostávají do Data Warehouse. Zkratka znamená:</p>

<ul>
  <li><b>Extract</b> (Extrakce) – získání dat ze zdrojů</li>
  <li><b>Transform</b> (Transformace) – čištění a úprava dat</li>
  <li><b>Load</b> (Načtení) – uložení do datového skladu</li>
</ul>


<p>Materializované pohledy se používají ve fázi <b>Transform</b> a jako výstup <b>Load</b> fáze:</p>


<h2 id="vyhody-nevyhody">Výhody a nevýhody</h2>

<h3 id="vyhody">Výhody</h3>

<ul>
  <li><b>Dramatické zrychlení dotazů</b> – i 100× a více pro složité agregace</li>
  <li><b>Snížení zátěže database</b> – méně výpočtů při každém dotazu</li>
  <li><b>Možnost indexování</b> – na materializovaný pohled lze vytvořit indexy</li>
  <li><b>Prediktabilní výkon</b> – dotazy mají konzistentní rychlost</li>
</ul>

<h3 id="nevyhody">Nevýhody</h3>

<ul>
  <li><b>Zastaralá data</b> – data nemusí být aktuální</li>
  <li><b>Diskový prostor</b> – zabírají místo na disku</li>
  <li><b>Režie při aktualisaci</b> – refresh může být náročný</li>
  <li><b>Komplexita údržby</b> – je třeba řídit aktualisaci</li>
</ul>

<h2 id="best-practices">Best Practices</h2>

<h3 id="indexy">1. Vytvářejte indexy</h3>

<p>Materializované pohledy jsou fysicky uložené tabulky, takže můžete na ně vytvořit indexy pro ještě rychlejší dotazy.</p>

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
  <li>Pokud je materializovaný pohled malý (< 1000 řádků) – full scan je rychlejší</li>
  <li>Pokud nikdy nefiltrujete data – čtete vždy všechno</li>
  <li>Index zabírá místo a zpomaluje refresh – nepřehánějte to</li>
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
  <li><b>Real-time data:</b> Materializované pohledy nejsou vhodné – použijte běžné views nebo cache</li>
  <li><b>Near real-time:</b> Refresh každých 5-15 minut</li>
  <li><b>Reporty:</b> Refresh jednou denně (v noci)</li>
  <li><b>Historická data:</b> Refresh týdně nebo měsíčně</li>
</ul>

<h3 id="concurrently">4. Použijte CONCURRENTLY refresh (PostgreSQL)</h3>

<p>Běžný refresh zamkne materializovaný pohled. S <code>CONCURRENTLY</code> zůstává pohled dostupný:</p>

<pre><code>REFRESH MATERIALIZED VIEW CONCURRENTLY orders_summary;</code></pre>

<p><b>Podmínky pro <code>CONCURRENTLY</code>:</b></p>

<ul>
  <li>Vyžaduje <b>unique index</b> na materializovaném pohledu</li>
  <li>Index musí pokrývat všechny řádky (nesmí být partial)</li>
  <li>Bez unique indexu refresh selže s chybou</li>
</ul>

<pre><code>-- NEJPRVE vytvořte unique index
CREATE UNIQUE INDEX idx_orders_summary_customer_unique
ON orders_summary(customer_id);

-- TEĎ můžete použít CONCURRENTLY
REFRESH MATERIALIZED VIEW CONCURRENTLY orders_summary;</code></pre>

<p><b>Kompromis:</b> CONCURRENTLY refresh je pomalejší než běžný refresh, ale pohled zůstává dostupný během aktualisace.</p>

<h3 id="partial">5. Zvažte částečné materializované pohledy</h3>

<p>Nemusíte materializovat všechna data, jen ta nejpoužívanější:</p>

<pre><code>-- Pouze data za poslední rok
CREATE MATERIALIZED VIEW recent_orders_summary AS
SELECT
    customer_id,
    COUNT(*) as order_count,
    SUM(total_amount) as total_spent
FROM orders
WHERE order_date >= CURRENT_DATE – INTERVAL '1 year'
GROUP BY customer_id;</code></pre>

<h2 id="ukazka">Praktická ukázka: Zrychlení reportu</h2>

<p>Představme si e-shop s reportem zobrazujícím top produkty za poslední měsíc.</p>

<h3 id="pred">Před – běžný pohled</h3>

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
WHERE o.order_date >= CURRENT_DATE – INTERVAL '30 days'
GROUP BY p.product_id, p.product_name, p.category
ORDER BY total_revenue DESC
LIMIT 100;

-- Dotaz trvá: 2.3 sekundy</code></pre>

<h3 id="po">Po – materializovaný pohled</h3>

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
WHERE o.order_date >= CURRENT_DATE – INTERVAL '30 days'
GROUP BY p.product_id, p.product_name, p.category
ORDER BY total_revenue DESC
LIMIT 100;

CREATE INDEX idx_top_products_revenue ON top_products(total_revenue DESC);

-- Refresh každou hodinu
-- (konfigurace závisí na databasi)

-- Dotaz trvá: 0.02 sekundy (100× rychleji!)</code></pre>

<p><b>Upozornění:</b> Toto je ideální scénář. Ve skutečnosti:</p>

<ul>
  <li>Zrychlení závisí na velikosti dat, složitosti dotazu a hardwaru</li>
  <li>Realističtější je očekávat 10-50× zrychlení</li>
  <li>Musíte počítat s náklady na refresh (může trvat minuty až hodiny)</li>
  <li>Musíte řešit zastaralá data mezi refresh cykly</li>
</ul>

<h2 id="moderni-alternativy">Moderní databasové alternativy</h2>

<p>Kromě PostgreSQL a MySQL existují moderní database s pokročilou podporou pro materializované pohledy:</p>

<h3 id="alloydb">AlloyDB (Google Cloud)</h3>

<p><b>AlloyDB</b> je plně spravovaná PostgreSQL-kompatibilní database od Google. Oproti standardnímu PostgreSQL nabízí:</p>

<ul>
  <li><b>Až 4× rychlejší transakce</b> oproti standardnímu PostgreSQL</li>
  <li><b>Až 100× rychlejší analytické dotazy</b> díky column-store enginu</li>
  <li><b>Nativní integrace</b> s Google Cloud ekosystémem</li>
  <li><b>Automatické škálování</b> a vysoká dostupnost</li>
  <li><b>Kompatibilita</b> s PostgreSQL – včetně materializovaných pohledů</li>
</ul>

<p>Materializované pohledy v AlloyDB fungují stejně jako v PostgreSQL, ale s lepším výkonem díky optimalisovanému storage.</p>

<h3 id="clickhouse">ClickHouse</h3>

<p><b>ClickHouse</b> je open-source column-oriented database optimalisovaná pro analytické dotazy (OLAP – <i lang="en">Online Analytical Processing</i>).</p>

<ul>
  <li><b>Incremental materialized views</b> – automatická aktualisace při vložení dat</li>
  <li><b>Extrémně rychlé</b> – zpracování miliard řádků za sekundy</li>
  <li><b>Agregující enginy</b> – vestavěná podpora pro agregace</li>
</ul>

<pre><code>-- ClickHouse: Materialized view s automatickou aktualisací
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

-- Data se aktualisují AUTOMATICKY při INSERT do orders!</code></pre>

<p><b>Výhoda:</b> Nepotřebujete refresh – view se aktualisuje inkrementálně při vkládání dat.</p>

<h3 id="timescaledb">TimescaleDB</h3>

<p><b>TimescaleDB</b> je rozšíření PostgreSQL pro time-series data (časové řady).</p>

<ul>
  <li><b>Continuous Aggregates</b> – chytřejší materializované pohledy</li>
  <li><b>Automatická aktualisace</b> na pozadí</li>
  <li><b>Refresh policy</b> – nastavitelná strategie aktualisace</li>
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

<p><b>Výhoda:</b> Optimalisováno pro časové řady, automatické inkrementální aktualisace.</p>

<h3 id="cockroachdb">CockroachDB</h3>

<p><b>CockroachDB</b> je distribuovaná SQL database kompatibilní s PostgreSQL.</p>

<ul>
  <li><b>Podpora materializovaných pohledů</b> (od verse 23.1)</li>
  <li><b>Distribuované zpracování</b> – view může být rozložen přes více nodů</li>
  <li><b>Vysoká dostupnost</b> – automatické replikace</li>
</ul>

<h3 id="srovnani-databazi">Srovnání databasí</h3>

<table>
  <thead>
    <tr>
      <th>Database</th>
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
      <td>Optimalisace pro čas</td>
    </tr>
    <tr>
      <td>CockroachDB</td>
      <td>OLTP</td>
      <td>Manuální</td>
      <td>Distribuovaná</td>
    </tr>
  </tbody>
</table>

<p><b>OLTP</b> = <i lang="en">Online Transaction Processing</i> (online zpracování transakcí) – běžné database pro aplikace.</p>

<h3 id="kdy-pouzit-moderni">Kdy použít moderní alternativy?</h3>

<ul>
  <li><b>AlloyDB:</b> Pokud používáte Google Cloud a potřebujete lepší výkon než PostgreSQL</li>
  <li><b>ClickHouse:</b> Pro analytické aplikace s obrovskými objemy dat (miliardy řádků)</li>
  <li><b>TimescaleDB:</b> Pro IoT, monitoring, metriky a jiná time-series data</li>
  <li><b>CockroachDB:</b> Když potřebujete globální distribuci a vysokou dostupnost</li>
</ul>

<h2 id="uskali">Úskalí a časté problémy</h2>

<p>Materializované pohledy nejsou všespásné řešení. Zde jsou reálné problémy, se kterými se můžete setkat:</p>

<h3 id="vykonne-naroky">1. Výkonové nároky nejsou vždy tak velké</h3>

<p>Články často uvádějí „100× rychlejší dotazy“. Realita je složitější:</p>

<ul>
  <li><b>10–50× zrychlení</b> je realistické pro složité agregace přes miliony řádků</li>
  <li><b>2–5× zrychlení</b> u dotazů se správnými indexy</li>
  <li><b>Žádné zrychlení</b> pokud database má dobrý query planner a správné indexy na zdrojových tabulkách</li>
  <li><b>Zpomalení</b> pokud refresh trvá příliš dlouho a blokuje jiné operace</li>
</ul>

<p><b>Zlaté pravidlo:</b> Měřte a testujte na reálných datech. Co funguje na 1000 řádcích, nemusí fungovat na 100 milionech.</p>

<h3 id="refresh-overhead">2. Refresh může být velmi náročný</h3>

<p>Refresh není zadarmo:</p>

<pre><code>-- Refresh velkého materializovaného pohledu může trvat hodiny
REFRESH MATERIALIZED VIEW huge_analytics; -- Trvá: 4 hodiny!</code></pre>

<p><b>Problémy v praxi:</b></p>

<ul>
  <li><b>Dead tuples:</b> PostgreSQL vytváří při obnovování (refresh) mrtvé řádky, které zabírají místo dokud neproběhne VACUUM</li>
  <li><b>Blokování:</b> Běžný refresh zamkne view pro čtení (použijte CONCURRENTLY, ale je pomalejší)</li>
  <li><b>Kaskádové refreshe:</b> Pokud máte materializovaný pohled z materializovaného pohledu, musíte refreshovat oba</li>
  <li><b>Časové okno:</b> Refresh musí doběhnout před dalším použitím – co když trvá déle než plánovaný interval?</li>
</ul>

<h3 id="zastarala-data">3. Zastaralá data mohou způsobit problémy</h3>

<p>Materializovaný pohled ukazuje data z času posledního refreshe:</p>

<pre><code>-- Refresh v 2:00 ráno
REFRESH MATERIALIZED VIEW daily_sales;

-- Uživatel v 15:00 vidí data ze 2:00
-- Všechny objednávky od 2:00 do 15:00 CHYBÍ!
SELECT * FROM daily_sales WHERE date = CURRENT_DATE;
-- Výsledek je neúplný a může vést k špatným rozhodnutím</code></pre>

<p><b>Reálné příklady problémů:</b></p>

<ul>
  <li>Dashboard ukazuje nižší prodeje, než je realita</li>
  <li>Zákazník je označen jako „neaktivní“, i když právě nakoupil</li>
  <li>Reporty pro management obsahují zastaralá čísla</li>
</ul>

<h3 id="spravna-strategie">4. Refresh strategie nejsou universální</h3>

<ul>
  <li><b>Závisí na objemu změn:</b> 1000 změn/den vs. 1 milion změn/den je obrovský rozdíl</li>
  <li><b>Závisí na velikosti view:</b> Malý view můžete refreshovat každou minutu, obří view jednou týdně</li>
  <li><b>Závisí na SLA:</b> Kolik minut zastaralých dat je přijatelných?</li>
  <li><b>Závisí na databasovém systému:</b> PostgreSQL, MySQL a ClickHouse se chovají zcela jinak</li>
</ul>


<h3 id="diskovy-prostor">5. Diskový prostor může být problém</h3>

<pre><code>-- Zdrojová tabulka: 500 GB
SELECT pg_size_pretty(pg_total_relation_size('orders'));
-- 500 GB

-- Materializovaný pohled: dalších 200 GB!
SELECT pg_size_pretty(pg_total_relation_size('orders_analytics_mv'));
-- 200 GB

-- Indexy na MV: dalších 50 GB
-- Celkem: 750 GB místo původních 500 GB</code></pre>

<p>Materializované pohledy duplikují data. To znamená:</p>

<ul>
  <li><b>Vyšší náklady na storage</b> (zejména v cloudu)</li>
  <li><b>Pomalejší backupy</b> (je třeba zálohovat i MV)</li>
  <li><b>Delší časy pro restore</b></li>
</ul>

<h3 id="udrzba-komplexita">6. Údržba může být složitá</h3>

<p>Čím více materializovaných pohledů máte, tím složitější je údržba:</p>

<ul>
  <li>Musíte monitorovat časy refresh (co když začnou trvat déle?)</li>
  <li>Musíte řešit selhání refresh (co když refresh selže v noci?)</li>
  <li>Musíte koordinovat refresh více pohledů (v jakém pořadí?)</li>
  <li>Změna schématu zdrojové tabulky vyžaduje změnu MV</li>
  <li>Musíte dokumentovat, které metriky jsou v jakém MV</li>
</ul>

<h2 id="kdy-nepouzit">Kdy materializované pohledy NEPOUŽÍVAT</h2>

<ul>
  <li><b>Real-time data:</b> Pokud potřebujete aktuální data (trading, monitoring, alerting)</li>
  <li><b>Málo používané dotazy:</b> Pokud dotaz spouštíte jednou měsíčně, refresh každý den je zbytečný</li>
  <li><b>Rychle se měnící data:</b> Pokud se data mění každou vteřinu, refresh nestíháte</li>
  <li><b>Malé tabulky:</b> Pro tisíce řádků je MV overhead, ne optimalisace</li>
  <li><b>Jednoduché dotazy:</b> Pokud stačí správný index, je to lepší řešení</li>
</ul>

<h2 id="alternativy">Alternativy k materializovaným pohledům</h2>

<p>V některých situacích mohou být lepší jiná řešení:</p>

<ul>
  <li><b>Indexy:</b> Pro jednoduché dotazy může stačit správný index</li>
  <li><b>Partitioning:</b> Rozdělení velkých tabulek na menší části</li>
  <li><b>Query cache:</b> Aplikační cache (Redis, Memcached)</li>
  <li><b>Denormalizace:</b> Přidání redundantních sloupců do tabulek</li>
  <li><b>Incremental views:</b> Některé database podporují inkrementální aktualisaci</li>
</ul>

<h2 id="zaver">Závěr</h2>

<p>Materializované pohledy jsou mocný nástroj pro optimalisaci výkonu database:</p>

<ul>
  <li>Výrazně zrychlují složité a opakující se dotazy</li>
  <li>Snižují zátěž databasového serveru</li>
  <li>Ideální pro analytické dotazy, reporty a dashboardy</li>
  <li>Je třeba vyvážit rychlost čtení vs. aktuálnost dat</li>
  <li>Vyžadují správnou strategii aktualisace a údržby</li>
</ul>

<p>Pokud máte v aplikaci pomalé dotazy, které se často opakují, ale data se mění pomaleji, materializované pohledy mohou být přesně to, co hledáte.</p>
