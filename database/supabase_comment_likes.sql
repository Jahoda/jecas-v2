-- Tabulka pro deduplikaci liků komentářů (jeden like per IP per komentář)
CREATE TABLE IF NOT EXISTS comment_likes (
    id BIGSERIAL PRIMARY KEY,
    comment_id BIGINT NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    ip VARCHAR(45) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(comment_id, ip)
);

CREATE INDEX IF NOT EXISTS idx_comment_likes_comment ON comment_likes(comment_id);

-- Row Level Security
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

-- Kdokoliv může přidat like
CREATE POLICY "Anyone can insert comment likes"
ON comment_likes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Kdokoliv může číst liky (pro počítání)
CREATE POLICY "Anyone can read comment likes"
ON comment_likes
FOR SELECT
TO anon, authenticated
USING (true);

-- Kdokoliv může smazat svůj like (toggle off)
CREATE POLICY "Anyone can delete comment likes"
ON comment_likes
FOR DELETE
TO anon, authenticated
USING (true);

COMMENT ON TABLE comment_likes IS 'Liky komentářů (deduplikace přes IP adresu)';
COMMENT ON COLUMN comment_likes.comment_id IS 'ID komentáře';
COMMENT ON COLUMN comment_likes.ip IS 'IP adresa uživatele';
