# AI Web Scraper – Quick-start Cheat Sheet

_Short, no-frills reminder of every command you need._

---

## 0. One-time setup

```bash
# Clone & enter the repo
git clone https://github.com/pgflow-dev/ai-web-scraper.git
cd ai-web-scraper

# Copy the environment file example and add your OpenAI key (required by the tasks)
cp supabase/functions/.env.example supabase/functions/.env
# Edit the .env file and add your OpenAI API key
# OPENAI_API_KEY=sk-...
```

---

## 1. Boot the local Supabase stack

```bash
npx supabase@2.22.12 start
```

---

## 2. Compile the pgflow workflow to SQL

```bash
# Generates supabase/migrations/<timestamp>_analyze_website.sql
npx pgflow@latest compile supabase/functions/_flows/analyze_website.ts
```

---

## 3. Run all database migrations (table + flow)

```bash
npx supabase@2.22.12 migrations up --local
```

---

## 4. Serve the Edge Functions (keep this terminal open)

```bash
npx supabase@2.22.12 functions serve
```

---

## 5. Start the worker (new terminal)

```bash
curl -X POST http://127.0.0.1:54321/functions/v1/analyze_website_worker
```

The first `curl` boots the worker; it stays alive and polls for jobs.

---

## 6. Trigger a job (SQL editor or psql)

```sql
select * from pgflow.start_flow(
  flow_slug => 'analyze_website',
  input     => '{"url":"https://supabase.com"}'
);
```

---

## 7. Check results

```sql
select * from websites;                 -- scraped data
select * from pgflow.runs;              -- run history
```

That’s it – scrape, summarize, tag, store!
