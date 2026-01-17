-- Ječas AI - Database Schema
-- Requires: Supabase Pro tier for pgvector extension

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================
-- ARTICLE EMBEDDINGS
-- ============================================

-- Table for storing article chunk embeddings
CREATE TABLE IF NOT EXISTS article_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug TEXT NOT NULL,
  article_title TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  chunk_text TEXT NOT NULL,
  embedding vector(1536), -- OpenAI text-embedding-ada-002 dimension
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint for slug + chunk index
  UNIQUE(article_slug, chunk_index)
);

-- Index for fast similarity search
CREATE INDEX IF NOT EXISTS idx_article_embeddings_embedding
ON article_embeddings
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Index for article lookup
CREATE INDEX IF NOT EXISTS idx_article_embeddings_slug
ON article_embeddings(article_slug);

-- Function for semantic search
CREATE OR REPLACE FUNCTION search_articles(
  query_embedding vector(1536),
  match_count INT DEFAULT 5,
  match_threshold FLOAT DEFAULT 0.7
)
RETURNS TABLE (
  article_slug TEXT,
  article_title TEXT,
  chunk_text TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ae.article_slug,
    ae.article_title,
    ae.chunk_text,
    1 - (ae.embedding <=> query_embedding) AS similarity
  FROM article_embeddings ae
  WHERE 1 - (ae.embedding <=> query_embedding) > match_threshold
  ORDER BY ae.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ============================================
-- CHAT SESSIONS & MESSAGES
-- ============================================

-- Chat sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT,
  user_id TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  sources JSONB DEFAULT '[]',
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for session lookup
CREATE INDEX IF NOT EXISTS idx_chat_messages_session
ON chat_messages(session_id);

-- ============================================
-- USAGE TRACKING & RATE LIMITING
-- ============================================

-- Daily usage tracking
CREATE TABLE IF NOT EXISTS chat_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier TEXT NOT NULL, -- email or anonymous ID
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  message_count INTEGER DEFAULT 0,
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_identifier, date)
);

-- Function to check and increment usage
CREATE OR REPLACE FUNCTION check_and_increment_usage(
  p_user_identifier TEXT,
  p_max_messages INTEGER DEFAULT 50
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  v_current_count INTEGER;
BEGIN
  -- Get or create today's usage record
  INSERT INTO chat_usage (user_identifier, date, message_count)
  VALUES (p_user_identifier, CURRENT_DATE, 0)
  ON CONFLICT (user_identifier, date) DO NOTHING;

  -- Get current count
  SELECT message_count INTO v_current_count
  FROM chat_usage
  WHERE user_identifier = p_user_identifier AND date = CURRENT_DATE;

  -- Check limit
  IF v_current_count >= p_max_messages THEN
    RETURN FALSE;
  END IF;

  -- Increment
  UPDATE chat_usage
  SET message_count = message_count + 1
  WHERE user_identifier = p_user_identifier AND date = CURRENT_DATE;

  RETURN TRUE;
END;
$$;

-- ============================================
-- SUBSCRIPTIONS (for premium features)
-- ============================================

CREATE TABLE IF NOT EXISTS ai_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL UNIQUE,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'basic', 'pro', 'unlimited')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  message_limit INTEGER DEFAULT 10, -- free tier limit
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tier limits
COMMENT ON TABLE ai_subscriptions IS 'Tier limits: free=10, basic=100, pro=500, unlimited=999999';

-- ============================================
-- ANALYTICS
-- ============================================

-- Popular questions tracking
CREATE TABLE IF NOT EXISTS chat_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query_hash TEXT NOT NULL, -- MD5 of normalized query
  query_sample TEXT NOT NULL, -- First occurrence
  count INTEGER DEFAULT 1,
  avg_satisfaction FLOAT,
  top_sources JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(query_hash)
);

-- Function to track query
CREATE OR REPLACE FUNCTION track_query(
  p_query TEXT,
  p_sources JSONB DEFAULT '[]'
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  v_hash TEXT;
  v_normalized TEXT;
BEGIN
  -- Normalize query (lowercase, trim, remove extra spaces)
  v_normalized := LOWER(TRIM(REGEXP_REPLACE(p_query, '\s+', ' ', 'g')));
  v_hash := MD5(v_normalized);

  -- Upsert analytics
  INSERT INTO chat_analytics (query_hash, query_sample, count, top_sources)
  VALUES (v_hash, p_query, 1, p_sources)
  ON CONFLICT (query_hash) DO UPDATE
  SET count = chat_analytics.count + 1,
      updated_at = NOW();
END;
$$;

-- ============================================
-- FEEDBACK
-- ============================================

CREATE TABLE IF NOT EXISTS chat_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES chat_messages(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RLS POLICIES (Row Level Security)
-- ============================================

-- Enable RLS
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_subscriptions ENABLE ROW LEVEL SECURITY;

-- Public read for embeddings (needed for search)
ALTER TABLE article_embeddings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read for embeddings" ON article_embeddings
  FOR SELECT USING (true);

-- Service role can do everything
CREATE POLICY "Service role full access" ON article_embeddings
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON chat_sessions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON chat_messages
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON chat_usage
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON ai_subscriptions
  FOR ALL USING (auth.role() = 'service_role');
