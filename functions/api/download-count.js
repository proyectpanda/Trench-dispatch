export async function onRequestGet(context) {
  const { env } = context;

  if (!env.DB) {
    return Response.json(
      { error: 'Download counter is not configured yet.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS download_stats (
      slug TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  const row = await env.DB.prepare(`
    SELECT count, updated_at
    FROM download_stats
    WHERE slug = 'trench-dispatch-1'
  `).first();

  return Response.json(
    {
      file: 'Trench-Dispatch.pdf',
      edition: 1,
      downloads: row?.count ?? 0,
      updated_at: row?.updated_at ?? null
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
