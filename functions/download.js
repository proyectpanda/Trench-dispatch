export async function onRequestGet(context) {
  const { env, request } = context;

  if (!env.DB) {
    return new Response('Download counter is not configured yet.', { status: 503 });
  }

  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS download_stats (
      slug TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await env.DB.prepare(`
    INSERT INTO download_stats (slug, count, updated_at)
    VALUES ('trench-dispatch-1', 1, CURRENT_TIMESTAMP)
    ON CONFLICT(slug) DO UPDATE SET
      count = count + 1,
      updated_at = CURRENT_TIMESTAMP
  `).run();

  const pdfUrl = new URL('/Trench-Dispatch.pdf', request.url);
  return Response.redirect(pdfUrl.toString(), 302);
}
