export const onRequestPost: PagesFunction = async (context) => {
  const { request } = context;
  
  try {
    const body = await request.json();
    const { name, email, projectType, message } = body as any;

    // Secure server-side validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    // Forward the request securely from the Edge Server to FormSubmit.co
    // Using the /ajax/ endpoint forces a JSON response instead of a redirect
    const response = await fetch("https://formsubmit.co/ajax/ksdesignstudiopune@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        _subject: `New Design Enquiry: ${projectType} - ${name}`,
        "Project Type": projectType,
        "Message": message,
        _template: "table" // Formats the email nicely
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
