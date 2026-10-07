export const onRequestPost: PagesFunction<{ GEMINI_API_KEY: string }> = async (context) => {
  try {
    const data = await context.request.json();
    const { message } = data as any;

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
    }

    if (!context.env.GEMINI_API_KEY) {
       return new Response(JSON.stringify({ reply: "I am the KS Design Studio Architect AI. My neural link is currently being established. Please contact our team directly at +91 70203 77693." }), { headers: { "Content-Type": "application/json" } });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${context.env.GEMINI_API_KEY}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `You are an elite, highly-professional architectural assistant for KS Design Studio Pune. You help clients with high-end turnkey interior design. Keep answers concise, persuasive, and luxurious. Client says: ${message}` }]
        }]
      })
    });

    const result: any = await response.json();
    const reply = result.candidates?.[0]?.content?.parts?.[0]?.text || "I am currently analyzing your design requirements. Our principal architect will reach out shortly.";

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
