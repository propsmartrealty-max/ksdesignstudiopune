export const onRequestPost: PagesFunction<{ DB: D1Database }> = async (context) => {
  try {
    const data = await context.request.json();
    const { email, phone, projectType, areaSqFt, luxuryTier, estimatedBracket } = data as any;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    const stmt = context.env.DB.prepare(`
      INSERT INTO leads (email, phone, project_type, area_sqft, luxury_tier, estimated_budget)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(email, phone || null, projectType || null, areaSqFt || null, luxuryTier || null, estimatedBracket || null);

    await stmt.run();

    return new Response(JSON.stringify({ success: true, message: "Lead captured successfully to D1" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const onRequestGet: PagesFunction<{ DB: D1Database }> = async (context) => {
  // We can lock this down later with Cloudflare Access headers (CF-Access-JWT-Assertion)
  try {
    const { results } = await context.env.DB.prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT 100").all();
    return new Response(JSON.stringify({ leads: results }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
