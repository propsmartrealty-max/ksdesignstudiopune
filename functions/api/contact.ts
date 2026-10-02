export const onRequestPost: PagesFunction = async (context) => {
  const { request, env } = context;
  
  try {
    const body = await request.json();
    const { name, email, projectType, message } = body as any;

    // Secure server-side validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    // Access the Web3Forms key securely via Cloudflare Environment Variables
    // The key is injected at runtime and never exposed to the browser
    const web3FormsKey = (env as any).WEB3FORMS_ACCESS_KEY;
    
    if (!web3FormsKey) {
      return new Response(JSON.stringify({ error: "Server Configuration Error" }), { status: 500 });
    }

    // Forward the request securely from the Edge Server to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3FormsKey,
        name,
        email,
        subject: `Design Enquiry: ${projectType} - ${name}`,
        projectType,
        message,
        from_name: "KS Design Studio Portal"
      }),
    });

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Edge Server Error" }), { status: 500 });
  }
};
