---
title: "Co je Row Level Security (RLS)"
headline: "Row Level Security: Zabezpečení na úrovni řádků v databázi"
description: "Co je Row Level Security (RLS), jak funguje v PostgreSQL a dalších databázích, praktické příklady použití a výhody oproti aplikační logice."
date: "2025-12-15"
last_modification: "2025-12-15"
status: 1
tags: ["sql", "zabezpeceni"]
format: "html"
---

<p><b>Row Level Security (RLS)</b> je bezpečnostní funkce databází, která umožňuje <b>omezit přístup k jednotlivým řádkům v tabulce</b> na základě definovaných pravidel. Místo aby aplikace kontrolovala, která data může uživatel vidět, tuto kontrolu provádí přímo databáze.</p>

<p><img src="/files/rls/rls-thumbnail.png" alt="Row Level Security - schéma zabezpečení na úrovni řádků" /></p>

<h2 id="princip-fungovani">Jak RLS funguje</h2>

<p>Představte si tabulku s tisíci záznamy, kde každý uživatel má vidět jen své vlastní data. Bez RLS musí aplikace do každého SQL dotazu přidat podmínku:</p>

<pre><code>SELECT * FROM documents WHERE user_id = current_user_id</code></pre>

<p>S RLS tuto kontrolu dělá databáze automaticky. Stačí definovat <b>politiku</b> (policy) jednou a všechny dotazy se jí budou řídit:</p>

<pre><code>SELECT * FROM documents  -- databáze automaticky vrátí jen data aktuálního uživatele</code></pre>

<h2 id="vyhody">Proč používat RLS</h2>

<ul>
<li>
  <p><b>Bezpečnost na úrovni databáze</b> – nelze obejít chybou v aplikačním kódu</p>
</li>

<li>
  <p><b>Jednodušší kód</b> – nemusíte do každého dotazu přidávat WHERE podmínky</p>
</li>

<li>
  <p><b>Centralizovaná pravidla</b> – oprávnění jsou definovaná na jednom místě</p>
</li>

<li>
  <p><b>Multi-tenant aplikace</b> – snadné oddělení dat různých zákazníků</p>
</li>

<li>
  <p><b>Omezení dopadu SQL injection</b> – i při úspěšném útoku útočník neuvidí cizí data (ale RLS nenahrazuje ochranu proti injection!)</p>
</li>
</ul>

<h2 id="pristup-z-frontendu">Přímý přístup z frontendu</h2>

<p>Jednou z <b>nejzajímavějších výhod RLS</b> je možnost <b>volat databázi přímo z JavaScriptu</b> na frontendu, bez nutnosti psát backend API. Platformy jako <b>Supabase jsou přímo navržené pro tento přístup</b> – není to hack ani kompromis, ale doporučený způsob práce.</p>

<h3 id="tradicni-pristup">Tradiční přístup bez RLS</h3>

<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" style="max-width: 700px; width: 100%; height: auto;">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
    <marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8"/>
    </marker>
  </defs>
  <rect width="700" height="200" rx="12" fill="url(#bg1)"/>
  <rect x="30" y="55" width="130" height="70" rx="10" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-width="2"/>
  <text x="95" y="85" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#60a5fa">Frontend</text>
  <text x="95" y="105" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">JavaScript</text>
  <rect x="230" y="45" width="160" height="90" rx="10" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="2"/>
  <text x="310" y="75" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#fbbf24">Backend API</text>
  <text x="310" y="95" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">kontrola oprávnění</text>
  <text x="310" y="115" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" fill="#fbbf24">WHERE user_id = ?</text>
  <rect x="460" y="55" width="130" height="70" rx="10" fill="#22c55e" fill-opacity="0.15" stroke="#22c55e" stroke-width="2"/>
  <text x="525" y="85" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#4ade80">Databáze</text>
  <text x="525" y="105" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">PostgreSQL</text>
  <line x1="160" y1="90" x2="220" y2="90" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow1)"/>
  <line x1="390" y1="90" x2="450" y2="90" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow1)"/>
  <text x="190" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#64748b">request</text>
  <text x="420" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#64748b">SQL</text>
  <text x="350" y="175" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#64748b">⚠️ Backend musí ručně přidávat WHERE podmínky do každého dotazu</text>
</svg>

<p>Tento přístup vyžaduje psát a udržovat backend kód pro každou operaci.</p>

<h3 id="pristup-s-rls">Přístup s RLS</h3>

<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" style="max-width: 700px; width: 100%; height: auto;">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
    <linearGradient id="shieldGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6"/>
      <stop offset="100%" style="stop-color:#1d4ed8"/>
    </linearGradient>
    <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#22c55e"/>
    </marker>
  </defs>
  <rect width="700" height="200" rx="12" fill="url(#bg2)"/>
  <rect x="50" y="55" width="130" height="70" rx="10" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-width="2"/>
  <text x="115" y="85" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#60a5fa">Frontend</text>
  <text x="115" y="105" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">JavaScript</text>
  <rect x="350" y="35" width="220" height="120" rx="12" fill="#22c55e" fill-opacity="0.1" stroke="#22c55e" stroke-width="2"/>
  <text x="460" y="60" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#4ade80">Databáze + RLS</text>
  <text x="460" y="80" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#94a3b8">PostgreSQL / Supabase</text>
  <rect x="370" y="95" width="180" height="45" rx="6" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="460" y="115" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#60a5fa">🛡️ RLS Policy</text>
  <text x="460" y="130" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" fill="#94a3b8">user_id = auth.uid()</text>
  <line x1="180" y1="90" x2="340" y2="90" stroke="#22c55e" stroke-width="2" stroke-dasharray="8,4" marker-end="url(#arrow2)"/>
  <text x="260" y="82" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#4ade80">přímý přístup</text>
  <text x="350" y="180" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#64748b">✅ Databáze automaticky filtruje data – není potřeba backend</text>
</svg>

<p>Výhody tohoto přístupu:</p>

<ul>
<li><b>Méně kódu</b> a <b>rychlejší vývoj</b> – není potřeba psát REST/GraphQL API pro CRUD operace</li>
<li><b>Bezpečnost zaručená DB</b> – nelze obejít, i když frontend kód je kompromitován</li>
<li><b>Real-time aktualizace</b> – snadná integrace s WebSockets/subscriptions</li>
</ul>

<h3 id="proc-to-funguje">Proč je to bezpečné (a kdy ne)</h3>

<p><b>Frontend se nepřipojuje k PostgreSQL přímo!</b> Mezi frontendem a databází je API vrstva (PostgREST u Supabase), která zajišťuje bezpečnost:</p>

<pre><code>Frontend → Supabase API (PostgREST) → PostgreSQL + RLS
               ↑
          rate limiting
          validace požadavků
          connection pooling
          timeouty
          žádné surové SQL</code></pre>

<p><b>Přímé připojení k PostgreSQL z frontendu je bezpečnostní katastrofa:</b></p>

<ul>
<li>Connection string (včetně hesla) je viditelný v DevTools</li>
<li>Útočník může spouštět libovolné SQL (<code>DROP TABLE</code>, <code>DELETE FROM</code>)</li>
<li>RLS nepomůže – útočník má plné credentials vlastníka</li>
<li>Žádný rate limiting ani ochrana proti DoS</li>
</ul>

<p><b>Pravidlo:</b> PostgreSQL connection string <b>nikdy</b> nepatří do frontend kódu. Supabase používá veřejný <code>anon key</code> + JWT tokeny – to je zásadní rozdíl.</p>

<h3 id="alternativy">Alternativy k Supabase</h3>

<p>Supabase není jediná platforma umožňující bezpečný přístup z frontendu. Podobný přístup nabízí:</p>

<ul>
<li><b><a href="https://hasura.io/">Hasura</a></b> – GraphQL engine pro PostgreSQL s propracovaným systémem permissions. Lze nasadit self-hosted nebo jako cloud službu.</li>
<li><b><a href="https://nhost.io/">Nhost</a></b> – open-source alternativa k Supabase, postavená na PostgreSQL + Hasura GraphQL. Nabízí auth, storage i serverless functions.</li>
<li><b><a href="https://firebase.google.com/">Firebase</a></b> – Google platforma s NoSQL databází (Firestore) a Security Rules. Jiný přístup než RLS, ale stejný princip – bezpečnost na úrovni databáze.</li>
<li><b><a href="https://pocketbase.io/">PocketBase</a></b> – jednoduchý self-hosted backend v jednom Go binárce. SQLite databáze s pravidly přístupu definovanými v administraci.</li>
<li><b><a href="https://appwrite.io/">Appwrite</a></b> – open-source BaaS s vlastní databází, auth a permissions systémem. Self-hosted nebo cloud.</li>
</ul>

<p>Všechny tyto platformy sdílejí klíčový princip: <b>frontend komunikuje přes bezpečné API</b>, ne přímo s databází, a oprávnění jsou vynucována na serverové straně.</p>

<h3 id="priklad-supabase">Praktický příklad (Supabase)</h3>

<pre><code>// Nastavení RLS v databázi (jednou)
CREATE POLICY "Users can read own posts" ON posts
  FOR SELECT USING (auth.uid() = user_id);

// Frontend kód - přímý přístup k DB
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, anonKey)

// Přihlášení uživatele
await supabase.auth.signInWithPassword({ email, password })

// Čtení dat - RLS automaticky vrátí jen data aktuálního uživatele
const { data } = await supabase
  .from('posts')
  .select('*')  // Žádné WHERE user_id! RLS to dělá automaticky

// Vkládání dat
const { data } = await supabase
  .from('posts')
  .insert({ title: 'Nový příspěvek', content: '...' })</code></pre>

<p>Díky RLS je zaručeno, že uživatel vidí a mění jen svá data, i když volá databázi přímo z prohlížeče. <b>Toto je standardní a doporučený způsob práce se Supabase</b> – tisíce produkčních aplikací takto fungují.</p>

<h3 id="kdyz-potrebujete-backend">Kdy přidat backend (Edge Functions)</h3>

<p><b>Většina aplikací může fungovat pouze s přímým přístupem z frontendu.</b> Supabase má vestavěné ochrany (rate limiting, query timeout, connection pooling), takže pro běžné CRUD operace nepotřebujete nic dalšího.</p>

<p>Backend (nebo Supabase Edge Functions) přidejte pouze pro:</p>

<ul>
<li><b>Platby</b> – komunikace s platební bránou (Stripe, PayPal)</li>
<li><b>Integrace s 3rd party API</b> – kde potřebujete skrýt API klíče</li>
<li><b>Složitou business logiku</b> – validace napříč více tabulkami, výpočty</li>
<li><b>Odesílání emailů</b> – triggery po akcích uživatele</li>
</ul>

<p>Pro většinu aplikací platí: <b>začněte s přímým přístupem</b> a backend přidávejte jen když narazíte na konkrétní potřebu.</p>

<h3 id="bezpecnostni-aspekty">Bezpečnostní aspekty a úskalí</h3>

<h4 id="defense-in-depth">RLS + aplikační validace (Defense in Depth)</h4>

<p><b>Ano, kombinace RLS s ověřováním v aplikaci je doporučená praxe!</b> Jde o princip "obrany do hloubky":</p>

<ul>
<li><b>Frontend validace</b> – kontrola formátu, UX feedback, rychlá odezva</li>
<li><b>Backend validace</b> (pokud existuje) – business pravidla, složitější kontroly</li>
<li><b>RLS v databázi</b> – poslední a nejdůležitější obrana, kterou nelze obejít</li>
</ul>

<pre><code>// Frontend validace - rychlá odezva pro uživatele
if (!title || title.length < 3) {
  return { error: 'Název musí mít alespoň 3 znaky' }
}

// Volání DB s RLS - i kdyby frontend validace selhala,
// RLS zajistí, že uživatel může upravit jen své záznamy
await supabase
  .from('posts')
  .update({ title })
  .eq('id', postId)  // RLS automaticky ověří vlastnictví</code></pre>

<p><b>Nikdy nespoléhejte jen na frontend validaci</b> – ta může být obejita otevřením DevTools. RLS je vaše poslední pojistka.</p>

<h4 id="uskali-pristupu">Úskalí přímého přístupu z frontendu</h4>

<p><b>1. Bezpečnost credentials</b></p>

<ul>
<li>Frontend používá <b>anonymní klíč</b> (anon key), který je veřejný a všichni ho vidí</li>
<li>Databázové heslo <b>NIKDY</b> nesmí být ve frontend kódu</li>
<li>Supabase používá JWT tokeny – databáze rozlišuje uživatele podle <code>auth.uid()</code> z tokenu</li>
<li>Service role klíč (s admin právy) patří <b>jen na backend</b></li>
</ul>

<p><b>2. Validace dat</b></p>

<pre><code>-- Špatně: Frontend může poslat cokoliv
CREATE TABLE posts (
  title TEXT,
  content TEXT
);

-- Lépe: DB constraints jako další vrstva ochrany
CREATE TABLE posts (
  title TEXT NOT NULL CHECK (length(title) >= 3 AND length(title) <= 200),
  content TEXT NOT NULL CHECK (length(content) <= 50000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);</code></pre>

<p><b>3. Rate limiting a DoS útoky</b></p>

<ul>
<li>Frontend může posílat neomezené množství dotazů</li>
<li>Řešení: Supabase má vestavěný rate limiting, nebo použít Edge Functions</li>
<li>Pro kritické operace použít backend API s vlastním rate limitingem</li>
</ul>

<p><b>4. Náročné dotazy a DoS útoky</b></p>

<p><b>Ano, útočník může záměrně posílat výkonnostně náročné dotazy!</b> To je jeden z hlavních bezpečnostních problémů přímého přístupu.</p>

<pre><code>// Útočník může poslat náročný dotaz z DevTools:
await supabase
  .from('posts')
  .select('*, comments(*, author(*)), likes(*, user(*))')
  .limit(10000)  // Načte tisíce záznamů s vnořenými JOINy</code></pre>

<p><b>Jak to řeší Supabase:</b></p>

<ul>
<li><b>Query timeout</b> – dotazy delší než X sekund (typicky 8-30s) jsou automaticky zabity</li>
<li><b>Max rows limit</b> – omezení maximálního počtu vrácených řádků (default 1000)</li>
<li><b>Connection pooling</b> – omezený počet souběžných spojení na projekt</li>
<li><b>Rate limiting na API</b> – limit požadavků za minutu podle tier (60/min na free, 500+/min na Pro)</li>
<li><b>Statement timeout</b> – PostgreSQL konfigurace <code>statement_timeout</code></li>
<li><b>Resource limits</b> – paměť a CPU jsou omezené podle tarifu</li>
</ul>

<p><b>Dodatečná ochrana, kterou můžete implementovat:</b></p>

<pre><code>-- Vytvořit VIEW s předem optimalizovaným dotazem
CREATE VIEW posts_with_stats AS
SELECT
  p.*,
  COUNT(DISTINCT c.id) as comment_count,
  COUNT(DISTINCT l.id) as like_count
FROM posts p
LEFT JOIN comments c ON c.post_id = p.id
LEFT JOIN likes l ON l.post_id = p.id
GROUP BY p.id;

-- RLS platí i na VIEW
ALTER VIEW posts_with_stats SET (security_barrier = true);

-- Frontend pak volá VIEW místo složitého dotazu
const { data } = await supabase
  .from('posts_with_stats')
  .select('*')
  .limit(20)  // Přiměřený limit</code></pre>

<p><b>Alternativně použít PostgreSQL funkci s limity:</b></p>

<pre><code>-- Funkce s vestavěným limitem
CREATE FUNCTION get_user_posts(user_id UUID, max_limit INT DEFAULT 100)
RETURNS SETOF posts AS $$
BEGIN
  IF max_limit > 100 THEN
    RAISE EXCEPTION 'Limit cannot exceed 100';
  END IF;

  RETURN QUERY
  SELECT * FROM posts
  WHERE author_id = user_id
  LIMIT max_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;</code></pre>

<p><b>Best practices pro ochranu:</b></p>

<ul>
<li><b>Vždy používejte LIMIT</b> – nikdy nenačítejte neomezené množství dat</li>
<li><b>Views pro složité dotazy</b> – kontrolujete, co lze dělat</li>
<li><b>Index na sloupce v RLS</b> – jinak každý dotaz dělá full table scan</li>
<li><b>Monitoring</b> – sledujte pomalé dotazy v Supabase dashboardu</li>
<li><b>Expensive operations přes backend</b> – agregace, reporty, statistiky</li>
<li><b>Edge Functions pro business logiku</b> – middleware mezi frontendem a DB</li>
</ul>

<p><b>5. N+1 problém</b></p>

<pre><code>// ❌ Špatně: N+1 dotazů z frontendu
const posts = await supabase.from('posts').select('*')
for (const post of posts.data) {
  const author = await supabase.from('users').select('*').eq('id', post.user_id)
  // N dotazů!
}

// ✅ Lépe: JOIN v jednom dotazu
const posts = await supabase
  .from('posts')
  .select('*, author:users(*)')  // Supabase automaticky udělá JOIN</code></pre>

<p><b>6. Citlivá data v odpovědích</b></p>

<ul>
<li>I s RLS může databáze vrátit více dat, než byste chtěli zobrazit</li>
<li>Používejte <code>.select()</code> k výběru jen potřebných sloupců</li>
<li>Citlivá pole (hesla, tokeny) nastavte jako <b>SECURITY DEFINER</b> funkce nebo views</li>
</ul>

<pre><code>-- Vždy vybírejte jen potřebné sloupce
await supabase
  .from('users')
  .select('id, name, avatar_url')  // NE select('*')</code></pre>

<p><b>7. Error messages a info leaks</b></p>

<ul>
<li>Chybové hlášky z DB můžou prozradit strukturu tabulek</li>
<li>V produkci logujte detailní chyby, ale uživateli ukažte obecnou hlášku</li>
</ul>

<p><b>8. Zapomenuté RLS nastavení – kritické bezpečnostní riziko!</b></p>

<p><b>Toto je jeden z nejnebezpečnějších problémů RLS!</b> Pokud vytvoříte tabulku během vývoje a zapomenete nastavit RLS, aplikace funguje normálně – a právě to je problém.</p>

<pre><code>-- ❌ NEBEZPEČNÉ: Tabulka bez RLS
CREATE TABLE private_documents (
  id SERIAL PRIMARY KEY,
  user_id UUID,
  secret_data TEXT
);

-- Aplikace funguje! Frontend může číst všechno.
-- Během vývoje to nikoho nebolí.
-- V produkci je to OBROVSKÁ bezpečnostní díra!</code></pre>

<p><b>Výchozí chování PostgreSQL:</b></p>

<ul>
<li><b>Bez RLS</b> – tabulka je OTEVŘENÁ, všichni vidí všechna data</li>
<li><b>S RLS ale bez politik</b> – tabulka je UZAMČENÁ, nikdo nic nevidí (kromě superusers)</li>
<li><b>S RLS a s politikami</b> – funguje podle pravidel</li>
</ul>

<pre><code>-- Tabulka bez RLS
CREATE TABLE posts (...);
-- ✗ Všichni uživatelé vidí všechna data!

-- Tabulka s RLS ale bez politik
CREATE TABLE posts (...);
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
-- ✓ Nikdo nevidí nic (bezpečné, ale nefunkční)
-- ✗ V dev módu se zdá, že "nefunguje", tak se RLS vypne

-- Správně: RLS s politikami
CREATE TABLE posts (...);
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_posts ON posts USING (user_id = auth.uid());
-- ✓ Funguje a je bezpečné</code></pre>

<p><b>Rizikový scénář:</b></p>

<ol>
<li>Vývojář vytvoří tabulku během vývoje bez RLS</li>
<li>Aplikace funguje (všichni vidí všechno, ale v dev to nevadí)</li>
<li>Vývojář si řekne "RLS dodělám později"</li>
<li>Funkce se nasadí do produkce</li>
<li><b>BEZPEČNOSTNÍ DÍRA</b> – všichni uživatelé vidí data všech ostatních!</li>
</ol>

<p><b>Jak se bránit:</b></p>

<pre><code>-- 1. RLS VŽDY jako první, ještě před vložením dat
CREATE TABLE sensitive_data (...);
ALTER TABLE sensitive_data ENABLE ROW LEVEL SECURITY;
-- Tabulka je teď uzamčená - bezpečné

-- 2. Pak vytvořit politiky
CREATE POLICY ... ON sensitive_data ...;

-- 3. Nebo použít FORCE ROW LEVEL SECURITY pro extra ochranu
ALTER TABLE sensitive_data FORCE ROW LEVEL SECURITY;
-- Platí i pro vlastníka tabulky a adminy!</code></pre>

<p><b>Automatická kontrola v migraci:</b></p>

<pre><code>-- Přidat do každé migrace kontrolu, že RLS je zapnuté
DO $$
DECLARE
  tbl record;
BEGIN
  FOR tbl IN
    SELECT schemaname, tablename
    FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename NOT IN ('migrations', 'schema_migrations')
  LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = tbl.schemaname
      AND c.relname = tbl.tablename
      AND c.relrowsecurity = true
    ) THEN
      RAISE EXCEPTION 'Tabulka %.% nemá zapnuté RLS!',
        tbl.schemaname, tbl.tablename;
    END IF;
  END LOOP;
END $$;</code></pre>

<p><b>CI/CD kontroly:</b></p>

<pre><code>-- SQL skript pro CI/CD pipeline
-- Selže, pokud nějaká tabulka nemá RLS
SELECT
  schemaname,
  tablename,
  'CHYBÍ RLS!' as problem
FROM pg_tables
WHERE schemaname = 'public'
AND tablename NOT IN ('migrations')
AND NOT EXISTS (
  SELECT 1 FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = schemaname
  AND c.relname = tablename
  AND c.relrowsecurity = true
);</code></pre>

<p><b>Supabase strategie:</b></p>

<ul>
<li>Supabase Dashboard zobrazuje WARNING pro tabulky bez RLS</li>
<li>Lze nastavit výchozí politiku "deny all" pro nové tabulky</li>
<li>Policy editor v dashboardu znemožní nasazení bez politik</li>
</ul>

<p><b>Best practice: "Secure by default"</b></p>

<pre><code>-- Šablona pro KAŽDOU novou tabulku:

-- 1. Vytvořit tabulku
CREATE TABLE new_table (...);

-- 2. OKAMŽITĚ zapnout RLS
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;

-- 3. OKAMŽITĚ vytvořit základní politiky
CREATE POLICY select_own ON new_table
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY insert_own ON new_table
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- 4. Teprve pak testovat a vyvíjet</code></pre>

<h4 id="best-practices-pristup">Best practices pro přímý přístup</h4>

<ul>
<li><b>Vždy používejte RLS</b> – nikdy nepovolejte přístup k tabulce bez RLS politik</li>
<li><b>Kombinujte s DB constraints</b> – NOT NULL, CHECK, UNIQUE jako další vrstva validace</li>
<li><b>Používejte Views pro složité dotazy</b> – místo složitých JOINů z frontendu</li>
<li><b>Auditujte přístupy</b> – logujte všechny operace pro analýzu bezpečnosti</li>
<li><b>Testujte RLS politiky důkladně</b> – zkuste obejít vlastní zabezpečení</li>
<li><b>Citlivé operace přes backend</b> – platby, změna emailu, admin operace</li>
</ul>

<h2 id="postgresql">RLS v PostgreSQL</h2>

<p>PostgreSQL podporuje RLS od verze 9.5 a je to nejpoužívanější implementace.</p>

<h3 id="zakladni-pouziti">Základní použití</h3>

<p>Vytvoříme tabulku s dokumenty, kde každý uživatel vidí jen své záznamy:</p>

<pre><code>-- Vytvoření tabulky
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  user_id TEXT NOT NULL
);

-- Povolení RLS pro tabulku
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Vytvoření politiky - uživatel vidí jen své řádky
CREATE POLICY user_documents ON documents
  FOR SELECT
  USING (user_id = current_user);

-- Politika pro vkládání - může vložit pouze se svým user_id
CREATE POLICY user_insert_documents ON documents
  FOR INSERT
  WITH CHECK (user_id = current_user);</code></pre>

<p>Od teď každý uživatel automaticky vidí jen své dokumenty, bez nutnosti měnit aplikační dotazy.</p>

<h3 id="typy-politik">Typy politik</h3>

<p>RLS politiky lze definovat pro různé operace:</p>

<ul>
<li><code>FOR SELECT</code> – omezuje čtení dat</li>
<li><code>FOR INSERT</code> – kontroluje vkládání nových řádků</li>
<li><code>FOR UPDATE</code> – omezuje úpravu existujících řádků</li>
<li><code>FOR DELETE</code> – kontroluje mazání řádků</li>
<li><code>FOR ALL</code> – platí pro všechny operace</li>
</ul>

<h3 id="using-vs-check">USING vs WITH CHECK</h3>

<ul>
<li><b><code>USING</code></b> – definuje, které <i>existující</i> řádky jsou viditelné</li>
<li><b><code>WITH CHECK</code></b> – kontroluje, zda <i>nové/upravené</i> řádky splňují podmínku</li>
</ul>

<pre><code>-- Pro SELECT stačí USING
CREATE POLICY view_own_posts ON posts
  FOR SELECT
  USING (author_id = current_user);

-- Pro INSERT je důležité WITH CHECK
CREATE POLICY insert_own_posts ON posts
  FOR INSERT
  WITH CHECK (author_id = current_user);

-- Pro UPDATE často potřebujeme obojí
CREATE POLICY update_own_posts ON posts
  FOR UPDATE
  USING (author_id = current_user)      -- můžu upravit jen vlastní
  WITH CHECK (author_id = current_user); -- a nemůžu změnit autora</code></pre>

<h2 id="prakticke-priklady">Praktické příklady</h2>

<h3 id="multi-tenant">Multi-tenant aplikace</h3>

<p>Aplikace, kde má každá firma své oddělené data:</p>

<pre><code>-- Tabulka s ID organizace
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT,
  organization_id UUID NOT NULL
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Použití session proměnné pro aktuální organizaci
CREATE POLICY org_isolation ON tasks
  USING (organization_id::text = current_setting('app.current_org_id'));

-- V aplikaci nastavíte před dotazy:
SET app.current_org_id = '123e4567-e89b-12d3-a456-426614174000';
SELECT * FROM tasks; -- vrátí jen úkoly této organizace</code></pre>

<h3 id="admin-pristup">Administrátorský přístup</h3>

<p>Admini vidí všechno, běžní uživatelé jen své data:</p>

<pre><code>CREATE POLICY user_or_admin_access ON documents
  FOR SELECT
  USING (
    user_id = current_user
    OR current_user IN (SELECT username FROM admin_users)
  );</code></pre>

<h3 id="verejne-soukrome">Veřejné vs. soukromé záznamy</h3>

<pre><code>CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  author_id TEXT,
  is_public BOOLEAN DEFAULT false
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Každý vidí veřejné příspěvky, vlastní vidí všechny
CREATE POLICY view_posts ON posts
  FOR SELECT
  USING (is_public = true OR author_id = current_user);</code></pre>

<h3 id="casove-omezeni">Časové omezení</h3>

<pre><code>CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Uživatel vidí jen aktuální a budoucí události
CREATE POLICY current_events ON events
  FOR SELECT
  USING (end_date &gt; NOW());</code></pre>

<h2 id="supabase">RLS v Supabase</h2>

<p><a href="https://supabase.com/">Supabase</a> staví na PostgreSQL a RLS je jeho <b>základní bezpečnostní mechanismus</b>. Každá tabulka by měla mít definované RLS politiky.</p>

<h3 id="jwt-autentizace">Integrace s JWT</h3>

<p>Supabase automaticky nastavuje PostgreSQL proměnné z JWT tokenu:</p>

<pre><code>-- Přístup k user ID z JWT
CREATE POLICY user_data ON profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Přístup k dalším JWT claims
CREATE POLICY premium_content ON articles
  FOR SELECT
  USING (
    is_public = true
    OR (auth.jwt() -&gt;&gt; 'subscription')::text = 'premium'
  );</code></pre>

<h3 id="supabase-dashboard">Supabase Dashboard</h3>

<p>Supabase má GUI pro správu RLS politik přímo v dashboardu, což zjednodušuje jejich vytváření a testování.</p>

<h2 id="jine-databaze">RLS v dalších databázích</h2>

<h3 id="oracle">Oracle Database</h3>

<p>Oracle nazývá RLS jako <b>Virtual Private Database (VPD)</b> a podporuje ho již od verze 8i:</p>

<pre><code>BEGIN
  DBMS_RLS.ADD_POLICY(
    object_schema   =&gt; 'hr',
    object_name     =&gt; 'employees',
    policy_name     =&gt; 'emp_policy',
    function_schema =&gt; 'hr',
    policy_function =&gt; 'employee_security',
    statement_types =&gt; 'SELECT, UPDATE, DELETE'
  );
END;</code></pre>

<h3 id="sql-server">Microsoft SQL Server</h3>

<p>SQL Server 2016+ podporuje RLS pomocí inline table-valued funkcí:</p>

<pre><code>-- Bezpečnostní funkce
CREATE FUNCTION dbo.fn_securitypredicate(@UserId int)
RETURNS TABLE
WITH SCHEMABINDING
AS
RETURN SELECT 1 AS fn_securitypredicate_result
WHERE @UserId = CAST(SESSION_CONTEXT(N'UserId') AS int);

-- Aplikace politiky
CREATE SECURITY POLICY dbo.UserPolicy
ADD FILTER PREDICATE dbo.fn_securitypredicate(UserId) ON dbo.Documents
WITH (STATE = ON);</code></pre>

<h3 id="mysql">MySQL</h3>

<p>MySQL <b>nepodporuje nativní RLS</b>. Alternativy:</p>

<ul>
<li>Použití VIEW s WHERE podmínkami pro jednotlivé role</li>
<li>Aplikační logika v kódu</li>
<li>Migrace na PostgreSQL nebo jinou databázi s nativní podporou RLS</li>
</ul>

<h2 id="vykonne-aspekty">Výkonnostní aspekty</h2>

<h3 id="indexy">Indexy jsou klíčové</h3>

<p>RLS přidává WHERE podmínky do každého dotazu. Bez správných indexů může být RLS pomalé:</p>

<pre><code>-- Pokud máte politiku na user_id, vytvořte index
CREATE INDEX idx_documents_user_id ON documents(user_id);

-- Pro složitější politiky může být potřeba composite index
CREATE INDEX idx_posts_author_public ON posts(author_id, is_public);</code></pre>

<h3 id="bypass-rls">Bypass RLS pro systémové účty</h3>

<p>Některé procesy (migrace, admin skripty) potřebují vidět všechna data:</p>

<pre><code>-- PostgreSQL: SUPERUSER nebo vlastník tabulky RLS obchází
-- Pro aplikační účty můžete použít:
ALTER TABLE documents FORCE ROW LEVEL SECURITY; -- platí i pro vlastníka

-- Nebo explicitly povolit bypass pro specifickou roli
ALTER ROLE admin_role BYPASSRLS;</code></pre>

<h2 id="caste-chyby">Časté chyby a problémy</h2>

<h3 id="zapomenute-povoleni">Zapomenuté povolení RLS</h3>

<pre><code>-- ❌ Zapomněli jste ENABLE ROW LEVEL SECURITY
CREATE POLICY user_policy ON users USING (id = current_user);
-- Politika existuje, ale nefunguje!

-- ✅ Správně:
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_policy ON users USING (id = current_user);</code></pre>

<h3 id="chybejici-politiky">Chybějící politiky pro operace</h3>

<pre><code>-- Máte politiku jen pro SELECT, ale ne INSERT
-- Uživatel nemůže vložit žádná data!

-- Řešení: přidat politiky pro všechny potřebné operace
CREATE POLICY user_select ON docs FOR SELECT USING (...);
CREATE POLICY user_insert ON docs FOR INSERT WITH CHECK (...);
CREATE POLICY user_update ON docs FOR UPDATE USING (...) WITH CHECK (...);</code></pre>

<h3 id="session-promenne">Nenastavené session proměnné</h3>

<pre><code>-- Politika používá current_setting()
CREATE POLICY org_policy ON data
  USING (org_id = current_setting('app.org_id'));

-- ❌ Pokud není proměnná nastavená, dotaz selže
-- ✅ Použijte default hodnotu:
USING (org_id = current_setting('app.org_id', true)::uuid)</code></pre>

<h2 id="best-practices">Osvědčené postupy</h2>

<ul>
<li>
  <p><b>Vždy používejte RLS pro multi-tenant data</b> – je to nejspolehlivější ochrana proti data leakům</p>
</li>

<li>
  <p><b>Testujte politiky důkladně</b> – zkuste se přihlásit jako různí uživatelé a ověřte, co vidí</p>
</li>

<li>
  <p><b>Kombinujte s application-level kontrolami</b> – RLS je poslední obrana, ne jediná</p>
</li>

<li>
  <p><b>Dokumentujte politiky</b> – používejte komentáře k vysvětlení složitých pravidel</p>
</li>

<li>
  <p><b>Monitorujte výkon</b> – sledujte pomalé dotazy a přidávejte indexy podle potřeby</p>
</li>

<li>
  <p><b>Používejte FORCE ROW LEVEL SECURITY</b> pro citlivá data – aby RLS platilo i pro admin účty</p>
</li>
</ul>

<h2 id="zaver">Závěr</h2>

<ul>
<li>
  <p><b>Row Level Security (RLS)</b> omezuje přístup k jednotlivým řádkům tabulky přímo na úrovni databáze, místo aby to řešila aplikace</p>
</li>

<li>
  <p>Hlavní výhody jsou <b>vyšší bezpečnost</b> (nelze obejít chybou v kódu), <b>jednodušší aplikační logika</b> a <b>centralizovaná správa oprávnění</b></p>
</li>

<li>
  <p>PostgreSQL má nejlepší podporu RLS a je základ pro platformy jako <b>Supabase</b>, které dělají RLS ještě dostupnější</p>
</li>

<li>
  <p>RLS je <b>ideální pro multi-tenant aplikace</b>, kde každý zákazník má svá oddělená data a nesmí vidět data ostatních</p>
</li>

<li>
  <p>Pro dobrý výkon je nutné mít <b>správné indexy</b> na sloupce použité v RLS politikách</p>
</li>

<li>
  <p>Časté chyby zahrnují zapomenutí povolit RLS (<code>ENABLE ROW LEVEL SECURITY</code>), chybějící politiky pro INSERT/UPDATE/DELETE nebo nenastavené session proměnné</p>
</li>
</ul>

<h2 id="odkazy-jinam">Odkazy jinam</h2>

<ul>
  <li><a href="https://www.postgresql.org/docs/current/ddl-rowsecurity.html">PostgreSQL: Row Security Policies</a> – oficiální dokumentace PostgreSQL k RLS</li>
  <li><a href="https://supabase.com/docs/guides/auth/row-level-security">Supabase: Row Level Security</a> – průvodce používáním RLS v Supabase</li>
  <li><a href="https://learn.microsoft.com/en-us/sql/relational-databases/security/row-level-security">Microsoft SQL Server: Row-Level Security</a> – dokumentace RLS pro SQL Server</li>
  <li><a href="https://docs.oracle.com/en/database/oracle/oracle-database/19/dbseg/using-oracle-vpd-to-control-data-access.html">Oracle: Virtual Private Database</a> – Oracle implementace RLS</li>
</ul>
