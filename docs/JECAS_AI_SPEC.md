# Ječas AI - Specifikace produktu

> AI asistent pro webdesign a frontend development, trénovaný na 1082 článcích z Ječas.cz

---

## Přehled produktu

### Value proposition
**"Zeptej se na cokoliv o CSS, HTML, JS - dostaneš odpověď v češtině s odkazy na relevantní články."**

### Klíčové výhody oproti ChatGPT/Claude
| Aspekt | ChatGPT/Claude | Ječas AI |
|--------|----------------|----------|
| Jazyk | Primárně anglicky | Nativní čeština |
| Kontext | Obecný | Specializovaný na webdesign |
| Zdroje | Neznámé | Cituje konkrétní články |
| Aktuálnost | Knowledge cutoff | Živá databáze článků |
| Cena | $20/měsíc | 149 Kč/měsíc |

---

## Technická architektura

### Stack
```
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│            SvelteKit + Tailwind CSS                 │
│         (integrováno do stávajícího webu)           │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│                   API Layer                          │
│              /api/chat endpoint                      │
│            Rate limiting + Auth                      │
└─────────────────────────────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
┌──────────────────┐         ┌──────────────────────┐
│   Vector Store    │         │      LLM API         │
│   (Supabase +     │         │   (Anthropic/OpenAI) │
│    pgvector)      │         │                      │
└──────────────────┘         └──────────────────────┘
          │
          ▼
┌──────────────────┐
│  Article Corpus  │
│  1082 markdown   │
│     files        │
└──────────────────┘
```

### Komponenty

#### 1. Vector Database (Supabase + pgvector)
```sql
-- Rozšíření pro vektorové vyhledávání
CREATE EXTENSION IF NOT EXISTS vector;

-- Tabulka pro embeddings článků
CREATE TABLE article_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug TEXT NOT NULL UNIQUE,
  article_title TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  chunk_text TEXT NOT NULL,
  embedding vector(1536), -- OpenAI ada-002 dimension
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pro rychlé vyhledávání
CREATE INDEX ON article_embeddings
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Funkce pro semantic search
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
```

#### 2. Embedding Pipeline
```typescript
// src/lib/ai/embeddings.ts
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { glob } from 'glob';
import matter from 'gray-matter';
import { marked } from 'marked';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

interface ArticleChunk {
  slug: string;
  title: string;
  chunkIndex: number;
  text: string;
}

// Rozdělit článek na chunky (~500 tokenů)
function chunkArticle(content: string, slug: string, title: string): ArticleChunk[] {
  const chunks: ArticleChunk[] = [];
  const paragraphs = content.split('\n\n').filter(p => p.trim());

  let currentChunk = '';
  let chunkIndex = 0;

  for (const para of paragraphs) {
    if ((currentChunk + para).length > 1500) {
      if (currentChunk) {
        chunks.push({
          slug,
          title,
          chunkIndex: chunkIndex++,
          text: currentChunk.trim()
        });
      }
      currentChunk = para;
    } else {
      currentChunk += '\n\n' + para;
    }
  }

  if (currentChunk.trim()) {
    chunks.push({
      slug,
      title,
      chunkIndex: chunkIndex++,
      text: currentChunk.trim()
    });
  }

  return chunks;
}

// Generovat embedding pro text
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text
  });
  return response.data[0].embedding;
}

// Zpracovat všechny články
export async function indexAllArticles() {
  const files = await glob('content/posts/*.md');

  for (const file of files) {
    const content = await Bun.file(file).text();
    const { data: frontmatter, content: body } = matter(content);

    if (frontmatter.draft) continue;

    const slug = file.replace('content/posts/', '').replace('.md', '');
    const plainText = marked.parse(body, { async: false }) as string;
    const textOnly = plainText.replace(/<[^>]*>/g, '');

    const chunks = chunkArticle(textOnly, slug, frontmatter.title);

    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk.text);

      await supabase.from('article_embeddings').upsert({
        article_slug: chunk.slug,
        article_title: chunk.title,
        chunk_index: chunk.chunkIndex,
        chunk_text: chunk.text,
        embedding: embedding,
        metadata: {
          tags: frontmatter.tags,
          date: frontmatter.date
        }
      }, {
        onConflict: 'article_slug,chunk_index'
      });

      console.log(`Indexed: ${chunk.slug} [${chunk.chunkIndex}]`);
    }
  }
}
```

#### 3. Chat API Endpoint
```typescript
// src/routes/api/chat/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

async function getRelevantContext(query: string): Promise<string> {
  // Generovat embedding pro dotaz
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: query
  });
  const queryEmbedding = embeddingResponse.data[0].embedding;

  // Najít relevantní články
  const { data: matches } = await supabase.rpc('search_articles', {
    query_embedding: queryEmbedding,
    match_count: 5,
    match_threshold: 0.7
  });

  if (!matches?.length) return '';

  // Sestavit kontext
  return matches.map((m: any) =>
    `### ${m.article_title}\n${m.chunk_text}\n[Celý článek: /${m.article_slug}]`
  ).join('\n\n---\n\n');
}

export const POST: RequestHandler = async ({ request, locals }) => {
  // Ověřit uživatele (premium check)
  const user = locals.user;
  if (!user?.isPremium) {
    return json({ error: 'Premium subscription required' }, { status: 403 });
  }

  const { messages, query } = await request.json();

  // Rate limiting
  const rateLimitKey = `chat:${user.id}`;
  const requests = await getRequestCount(rateLimitKey);
  if (requests > 50) { // 50 zpráv/den
    return json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  // Získat relevantní kontext
  const context = await getRelevantContext(query);

  // System prompt
  const systemPrompt = `Jsi Ječas AI, odborný asistent pro webdesign a frontend development.

PRAVIDLA:
1. Odpovídej VŽDY česky
2. Odpovědi zakládej na poskytnutém kontextu z článků
3. Pokud kontext obsahuje relevantní informace, cituj zdroj: [Název článku](/slug)
4. Pokud nevíš nebo kontext nestačí, řekni to upřímně
5. Buď stručný ale kompletní
6. Používej code snippety kde je to vhodné

KONTEXT Z ČLÁNKŮ:
${context || 'Žádný relevantní kontext nebyl nalezen.'}`;

  // Volání Anthropic API
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages.map((m: Message) => ({
      role: m.role,
      content: m.content
    }))
  });

  const assistantMessage = response.content[0].type === 'text'
    ? response.content[0].text
    : '';

  // Logování pro analytics
  await supabase.from('chat_logs').insert({
    user_id: user.id,
    query,
    response: assistantMessage,
    context_articles: context ? context.match(/\[Celý článek: \/([^\]]+)\]/g) : []
  });

  return json({
    message: assistantMessage,
    sources: context ? extractSources(context) : []
  });
};

function extractSources(context: string): { title: string; slug: string }[] {
  const matches = context.matchAll(/### (.+)\n[\s\S]+?\[Celý článek: \/([^\]]+)\]/g);
  return [...matches].map(m => ({ title: m[1], slug: m[2] }));
}
```

#### 4. Frontend komponenta
```svelte
<!-- src/lib/ai/ChatWidget.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  interface Message {
    role: 'user' | 'assistant';
    content: string;
    sources?: { title: string; slug: string }[];
  }

  let messages = $state<Message[]>([]);
  let input = $state('');
  let isLoading = $state(false);
  let isOpen = $state(false);

  async function sendMessage() {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    input = '';

    messages = [...messages, { role: 'user', content: userMessage }];
    isLoading = true;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages,
          query: userMessage
        })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      messages = [...messages, {
        role: 'assistant',
        content: data.message,
        sources: data.sources
      }];
    } catch (error) {
      messages = [...messages, {
        role: 'assistant',
        content: 'Omlouvám se, něco se pokazilo. Zkuste to prosím znovu.'
      }];
    } finally {
      isLoading = false;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
</script>

<!-- Floating button -->
<button
  onclick={() => isOpen = !isOpen}
  class="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
  aria-label="Otevřít chat"
>
  {#if isOpen}
    <svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  {:else}
    <svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  {/if}
</button>

<!-- Chat panel -->
{#if isOpen}
  <div class="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
    <!-- Header -->
    <div class="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
      <h3 class="font-bold text-white">Ječas AI</h3>
      <p class="text-blue-100 text-sm">Zeptej se na cokoliv o webdesignu</p>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      {#if messages.length === 0}
        <div class="text-center text-gray-500 mt-8">
          <p class="mb-4">Ahoj! Jsem Ječas AI.</p>
          <p class="text-sm">Můžeš se mě zeptat třeba:</p>
          <div class="mt-2 space-y-2">
            <button
              onclick={() => { input = 'Jak funguje CSS Grid?'; sendMessage(); }}
              class="block w-full text-left px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
            >
              "Jak funguje CSS Grid?"
            </button>
            <button
              onclick={() => { input = 'Vysvětli mi flexbox'; sendMessage(); }}
              class="block w-full text-left px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
            >
              "Vysvětli mi flexbox"
            </button>
          </div>
        </div>
      {/if}

      {#each messages as message}
        <div class={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
          <div class={`max-w-[80%] rounded-2xl px-4 py-2 ${
            message.role === 'user'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}>
            <p class="whitespace-pre-wrap">{message.content}</p>

            {#if message.sources?.length}
              <div class="mt-2 pt-2 border-t border-gray-200">
                <p class="text-xs font-medium mb-1">Zdroje:</p>
                {#each message.sources as source}
                  <a
                    href="/{source.slug}"
                    class="text-xs text-blue-600 hover:underline block"
                  >
                    {source.title}
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {/each}

      {#if isLoading}
        <div class="flex justify-start">
          <div class="bg-gray-100 rounded-2xl px-4 py-2">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Input -->
    <div class="p-4 border-t">
      <div class="flex gap-2">
        <input
          bind:value={input}
          onkeydown={handleKeydown}
          placeholder="Napiš svůj dotaz..."
          class="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          onclick={sendMessage}
          disabled={isLoading || !input.trim()}
          class="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  </div>
{/if}
```

---

## Cenový model

### Náklady (odhad)
| Položka | Měsíční náklady |
|---------|-----------------|
| Anthropic API (~10k zpráv) | ~$50 (1 200 Kč) |
| OpenAI Embeddings | ~$5 (120 Kč) |
| Supabase Pro | $25 (600 Kč) |
| **Celkem** | **~2 000 Kč** |

### Pricing
| Tier | Cena | Limity |
|------|------|--------|
| **Free trial** | 0 Kč | 10 zpráv celkem |
| **Basic** | 99 Kč/měsíc | 100 zpráv/měsíc |
| **Pro** | 149 Kč/měsíc | 500 zpráv/měsíc |
| **Unlimited** | 299 Kč/měsíc | Neomezeno |

### Break-even analýza
- Fixní náklady: ~2 000 Kč/měsíc
- Průměrná cena: 149 Kč
- Break-even: **14 platících uživatelů**

---

## Implementační plán

### Fáze 1: MVP (1-2 týdny)
- [ ] Nastavit pgvector v Supabase
- [ ] Vytvořit embedding pipeline
- [ ] Zaindexovat všechny články
- [ ] Základní chat API endpoint
- [ ] Jednoduchý chat widget

### Fáze 2: Platby (1 týden)
- [ ] Stripe integrace
- [ ] Subscription management
- [ ] Rate limiting
- [ ] User dashboard

### Fáze 3: Polish (1 týden)
- [ ] Vylepšený UI/UX
- [ ] Conversation history
- [ ] Analytics dashboard
- [ ] Marketing page

### Fáze 4: Launch
- [ ] Soft launch pro newsletter subscribers
- [ ] Feedback collection
- [ ] Iterate based on feedback
- [ ] Public launch

---

## Potřebné env proměnné

```env
# AI APIs
ANTHROPIC_API_KEY=sk-ant-xxx
OPENAI_API_KEY=sk-xxx

# Supabase (už existuje)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=xxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

---

## Možná rozšíření

### V1.1
- **Code playground** - Spustit CSS/JS přímo v chatu
- **Image support** - "Jak udělat tento design?"
- **Voice input** - Hlasové dotazy

### V1.2
- **Personalizace** - Pamatuje si preference uživatele
- **Learning paths** - "Nauč mě CSS Grid za 7 dní"
- **Quiz mode** - Testování znalostí

### V2.0
- **VS Code extension** - Chat přímo v editoru
- **Chrome extension** - Chat na libovolné stránce
- **Slack bot** - Pro firemní týmy

---

## Marketingová strategie

### Launch messaging
> "ChatGPT zná anglicky. Ječas AI zná česky - a hlavně zná CSS."

### Differentiators
1. **Čeština first** - Není to překlad, je to nativní
2. **Citace zdrojů** - Transparentní, ověřitelné
3. **Specializace** - Hloubka místo šířky
4. **Lokální kontext** - České specifika (GDPR, fakturace, hosting)

### Channels
- Newsletter announcement (500+ subscribers)
- Twitter/X launch thread
- LinkedIn post
- Product Hunt launch
- Czech dev community (FB skupiny, Discord)

---

## Rizika a mitigace

| Riziko | Pravděpodobnost | Mitigace |
|--------|-----------------|----------|
| Nízká adoption | Střední | Free trial, marketing |
| Vysoké API náklady | Nízká | Rate limiting, caching |
| Kvalita odpovědí | Střední | Prompt engineering, feedback loop |
| Konkurence | Nízká | Specializace, lokální trh |

---

## Další kroky

1. **Rozhodnutí:** Jít do toho? Potvrď a můžu začít implementovat.
2. **Supabase:** Ověřit, že máš Pro tier pro pgvector
3. **API klíče:** Získat Anthropic + OpenAI API keys
4. **Stripe:** Nastavit účet pro ČR
