-- Supabase SQL pro vytvoření tabulky newsletter_subscribers
-- Spusťte tento SQL v Supabase SQL Editoru

-- Vytvoření tabulky
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexy pro rychlé vyhledávání
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at);

-- Row Level Security (RLS) - bezpečnost
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy pro vkládání (insert) - kdokoliv může vložit e-mail
CREATE POLICY "Anyone can subscribe to newsletter"
ON newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy pro čtení (select) - pouze autentizovaní uživatelé (admin)
CREATE POLICY "Only authenticated users can view subscribers"
ON newsletter_subscribers
FOR SELECT
TO authenticated
USING (true);

-- Policy pro update - pouze autentizovaní uživatelé
CREATE POLICY "Only authenticated users can update subscribers"
ON newsletter_subscribers
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Trigger pro automatickou aktualizaci updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_newsletter_subscribers_updated_at
    BEFORE UPDATE ON newsletter_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Komentáře k tabulce a sloupcům
COMMENT ON TABLE newsletter_subscribers IS 'E-mailové adresy přihlášené k odběru newsletteru';
COMMENT ON COLUMN newsletter_subscribers.email IS 'E-mailová adresa odběratele';
COMMENT ON COLUMN newsletter_subscribers.status IS 'Stav odběru: active nebo unsubscribed';
COMMENT ON COLUMN newsletter_subscribers.subscribed_at IS 'Datum a čas přihlášení';
COMMENT ON COLUMN newsletter_subscribers.unsubscribed_at IS 'Datum a čas odhlášení (pokud je odhlášen)';
