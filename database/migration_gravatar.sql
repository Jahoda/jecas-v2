-- Migrace: Přidání podpory pro Gravatar
-- Spusťte tento SQL v Supabase SQL Editoru

-- Přidání sloupce gravatar_hash (MD5 hash e-mailu pro Gravatar)
ALTER TABLE comments ADD COLUMN IF NOT EXISTS gravatar_hash VARCHAR(32);

-- Index pro rychlé vyhledávání
CREATE INDEX IF NOT EXISTS idx_comments_gravatar ON comments(gravatar_hash);

-- Komentář
COMMENT ON COLUMN comments.gravatar_hash IS 'MD5 hash e-mailu pro Gravatar (privacy-safe)';
