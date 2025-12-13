# Supabase Newsletter Setup 🚀

Newsletter funkcionalita je připravena pro Supabase - **100% ZDARMA** hosting databáze!

## 🎯 Proč Supabase?

- ✅ **500 MB databáze zdarma** (stačí na tisíce odběratelů)
- ✅ **Automatické API** - nemusíte psát backend
- ✅ **Row Level Security** - bezpečnost zabudovaná
- ✅ **Real-time updates** - pokud budete chtít
- ✅ **Automatické zálohy**
- ✅ **PostgreSQL** - moderní, výkonná databáze

## 📋 Krok za krokem setup (5 minut)

### 1. Vytvořte Supabase projekt

1. Jděte na [supabase.com](https://supabase.com)
2. Klikněte na "Start your project"
3. Přihlaste se přes GitHub
4. Klikněte "New Project"
5. Vyplňte:
   - **Name:** `jecas-newsletter` (nebo jak chcete)
   - **Database Password:** vygenerujte silné heslo (uložte si ho)
   - **Region:** `Central EU (Frankfurt)` (nejblíž k ČR)
6. Klikněte "Create new project"
7. Počkejte ~2 minuty, než se projekt vytvoří

### 2. Spusťte SQL skript

1. V Supabase dashboardu vlevo klikněte na **SQL Editor**
2. Klikněte "New query"
3. Zkopírujte celý obsah souboru `database/supabase_newsletter.sql`
4. Vložte do editoru
5. Klikněte "Run" (nebo stiskněte Cmd/Ctrl + Enter)
6. ✅ Hotovo! Tabulka je vytvořena

### 3. Získejte API klíče

1. V Supabase dashboardu vlevo klikněte na **Project Settings** (ikonka ozubeného kola)
2. V menu vlevo klikněte na **API**
3. Najděte sekci **Project API keys**
4. Zkopírujte:
   - **Project URL** (např. `https://xxxxx.supabase.co`)
   - **service_role key** (secret key - **NIKDY nesdílejte veřejně!**)

### 4. Nastavte environment proměnné

Vytvořte/upravte soubor `.env` v root projektu:

```env
# Supabase konfigurace
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin autentizace (pokud ještě nemáte)
ADMIN_PASSWORD=vase-silne-heslo
```

⚠️ **DŮLEŽITÉ:** `.env` soubor je v `.gitignore` - **nikdy** ho necommitujte!

### 5. Testování

1. Spusťte dev server:

```bash
pnpm dev
```

2. Otevřete web v prohlížeči
3. Přejděte do patičky a zkuste přihlásit e-mail
4. V Supabase dashboardu jděte na **Table Editor** → `newsletter_subscribers`
5. ✅ Měli byste vidět váš testovací e-mail!

### 6. Admin rozhraní

- Přejděte na `/admin/newsletter` (po přihlášení do adminu)
- Uvidíte všechny přihlášené e-maily
- Můžete je kopírovat nebo stáhnout jako CSV

## 🔒 Bezpečnost

SQL skript automaticky nastavuje **Row Level Security (RLS)**:

- ✅ Kdokoliv může přihlásit e-mail (veřejný formulář)
- ✅ Pouze autentizovaní admin mohou číst/upravovat data
- ✅ Automatická ochrana před SQL injection
- ✅ HTTPS šifrování všech požadavků

## 📊 Monitorování

V Supabase dashboardu máte přístup k:

- **Table Editor** - procházení dat jako v Excel
- **SQL Editor** - spouštění vlastních dotazů
- **Database** → **Roles** - správa oprávnění
- **Logs** - sledování chyb a requestů

## 💾 Export dat

### V Supabase dashboardu:

1. Jděte na **Table Editor**
2. Vyberte tabulku `newsletter_subscribers`
3. Klikněte na tlačítko export (ikona stažení)
4. Stáhněte jako CSV

### Přes admin rozhraní:

1. Jděte na `/admin/newsletter`
2. Klikněte "Stáhnout CSV"

### Přes SQL:

```sql
-- Získat všechny aktivní odběratele
SELECT email, subscribed_at
FROM newsletter_subscribers
WHERE status = 'active'
ORDER BY subscribed_at DESC;

-- Počet odběratelů
SELECT COUNT(*) as total_subscribers
FROM newsletter_subscribers
WHERE status = 'active';

-- Statistiky podle měsíců
SELECT
  DATE_TRUNC('month', subscribed_at) as month,
  COUNT(*) as new_subscribers
FROM newsletter_subscribers
GROUP BY month
ORDER BY month DESC;
```

## 🚀 Deployment (Vercel)

Při nasazení na Vercel:

1. Jděte do Vercel Dashboard → váš projekt
2. **Settings** → **Environment Variables**
3. Přidejte:
   - `SUPABASE_URL` → hodnota
   - `SUPABASE_SERVICE_KEY` → hodnota (označte jako "Sensitive")
4. Redeploy projekt

## 🆓 Free Tier limity

Supabase free tier zahrnuje:

- ✅ **500 MB** databáze (cca 50,000+ e-mailů)
- ✅ **2 GB** file storage
- ✅ **50 MB** file upload limit
- ✅ **500,000** monthly API requests
- ✅ **1 GB** bandwidth
- ✅ **Unlimited** API requests (bez rate limitu v dev)

Pro běžný blog je to **více než dost!**

## 📈 Budoucí rozšíření

S Supabase můžete snadno přidat:

- 📧 **E-mail odesílání** přes Resend/SendGrid
- 🔔 **Real-time notifikace** při nových přihláškách
- 📊 **Dashboard s grafy** pomocí Supabase Analytics
- 🔗 **Unsubscribe link** - odhlášení z newsletteru
- 🏷️ **Tagy** - kategorizace odběratelů
- 📅 **Scheduling** - plánované odesílání

## 🆘 Troubleshooting

### Chyba: "SUPABASE_URL is not defined"

➡️ Zkontrolujte, že máte `.env` soubor s správnými hodnotami

### Chyba: "Row Level Security policy violation"

➡️ Zkontrolujte, že jste spustili celý SQL skript (včetně RLS policies)

### Nefunguje přihlašování

➡️ Otevřete konzoli prohlížeče (F12) a zkontrolujte chyby
➡️ V Supabase dashboardu zkontrolujte Logs

### Nevidím data v admin rozhraní

➡️ Zkontrolujte, že používáte `service_role` key (ne `anon` key)
➡️ Restartujte dev server po změně `.env`

## 📚 Další zdroje

- [Supabase dokumentace](https://supabase.com/docs)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL dokumentace](https://www.postgresql.org/docs/)

---

**Máte problémy?** Zkontrolujte Supabase Logs nebo konzoli prohlížeče! 🐛
