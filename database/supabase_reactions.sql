-- Supabase SQL pro vytvoření tabulky reakcí na články
-- Spusťte tento SQL v Supabase SQL Editoru

CREATE TABLE IF NOT EXISTS article_reactions (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL,
    reaction VARCHAR(20) NOT NULL CHECK (reaction IN ('nice', 'didnt_know', 'use_it')),
    ip_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jeden hlas na reakci na článek per IP
CREATE UNIQUE INDEX IF NOT EXISTS idx_reactions_unique ON article_reactions(slug, reaction, ip_hash);
CREATE INDEX IF NOT EXISTS idx_reactions_slug ON article_reactions(slug);

-- Row Level Security
ALTER TABLE article_reactions ENABLE ROW LEVEL SECURITY;

-- Kdokoliv může číst agregované reakce
CREATE POLICY "Anyone can read reactions"
ON article_reactions
FOR SELECT
TO anon, authenticated
USING (true);

-- Kdokoliv může vložit reakci
CREATE POLICY "Anyone can insert reactions"
ON article_reactions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
