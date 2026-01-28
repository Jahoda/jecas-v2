-- Supabase SQL pro vytvoření tabulky komentářů
-- Spusťte tento SQL v Supabase SQL Editoru

-- Vytvoření tabulky komentářů
CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL,
    parent_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255),
    message TEXT NOT NULL,
    edit_token VARCHAR(64) NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexy
CREATE INDEX IF NOT EXISTS idx_comments_slug ON comments(slug);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(is_approved);
CREATE INDEX IF NOT EXISTS idx_comments_created ON comments(created_at);

-- Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Kdokoliv může vložit komentář
CREATE POLICY "Anyone can insert comments"
ON comments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Kdokoliv může číst schválené komentáře
CREATE POLICY "Anyone can read approved comments"
ON comments
FOR SELECT
TO anon, authenticated
USING (is_approved = true);

-- Authenticated (admin) může číst všechny komentáře
CREATE POLICY "Admin can read all comments"
ON comments
FOR SELECT
TO authenticated
USING (true);

-- Authenticated (admin) může upravovat komentáře
CREATE POLICY "Admin can update comments"
ON comments
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Authenticated (admin) může mazat komentáře
CREATE POLICY "Admin can delete comments"
ON comments
FOR DELETE
TO authenticated
USING (true);

-- Trigger pro automatickou aktualizaci updated_at
CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Komentáře k tabulce
COMMENT ON TABLE comments IS 'Komentáře k článkům';
COMMENT ON COLUMN comments.slug IS 'URL slug článku';
COMMENT ON COLUMN comments.parent_id IS 'ID nadřazeného komentáře (pro vlákna)';
COMMENT ON COLUMN comments.author_name IS 'Jméno autora komentáře';
COMMENT ON COLUMN comments.author_email IS 'E-mail autora (volitelný, pro gravatar)';
COMMENT ON COLUMN comments.message IS 'Text komentáře';
COMMENT ON COLUMN comments.edit_token IS 'Token pro editaci/mazání komentáře autorem';
COMMENT ON COLUMN comments.is_approved IS 'Zda byl komentář schválen moderátorem';
