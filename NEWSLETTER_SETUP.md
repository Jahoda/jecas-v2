# Newsletter Setup

## Přehled

Implementace newsletteru umožňuje návštěvníkům webu přihlásit se k odběru novinek prostřednictvím e-mailu.

## Nastavení databáze

1. Spusťte SQL skript pro vytvoření tabulky:
```bash
mysql -u username -p database_name < database/newsletter_subscribers.sql
```

Nebo spusťte SQL příkaz přímo v databázi:
```sql
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'unsubscribed') DEFAULT 'active',
    unsubscribed_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_subscribed_at (subscribed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Nastavení prostředí

Ujistěte se, že máte v souboru `.env` nastavenou proměnnou `DATABASE_URL`:

```env
DATABASE_URL=mysql://username:password@localhost:3306/database_name
```

## Komponenty

### Newsletter.svelte (`src/lib/newsletter/Newsletter.svelte`)
- Formulář pro přihlášení k newsletteru
- Validace e-mailu
- Zobrazení úspěšných/chybových zpráv
- Automaticky integrován do patičky webu

### API Endpoint (`src/routes/api/newsletter/subscribe/+server.ts`)
- Zpracování POST požadavků pro přihlášení
- Validace e-mailové adresy
- Kontrola duplikátů
- Ukládání do databáze

### Databázová utilita (`src/lib/server/db.ts`)
- Správa připojení k MySQL databázi
- Singleton pattern pro efektivní využití připojení

## Použití

Newsletter formulář se automaticky zobrazuje v patičce webu na všech stránkách.

## Export přihlášených uživatelů

Pro export seznamu přihlášených e-mailů z databáze:

```sql
SELECT email, subscribed_at
FROM newsletter_subscribers
WHERE status = 'active'
ORDER BY subscribed_at DESC;
```

## Budoucí vylepšení

Možná rozšíření:
- Odesílání potvrzovacího e-mailu (double opt-in)
- Odhlášení z newsletteru
- Admin rozhraní pro správu přihlášených
- Export do CSV
- Integrace s e-mail marketingovými službami (Mailchimp, SendGrid, atd.)
