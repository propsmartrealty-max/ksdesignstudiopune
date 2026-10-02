export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);

  // 1. Force HTTPS
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  // 2. Trailing Slash Normalization removed to prevent infinite loop with Cloudflare Pages directory routing

  const response = await next();

  // 3. Clone response to mutate headers
  const modifiedResponse = new Response(response.body, response);

  // 4. Advanced Serverless Security Posture
  modifiedResponse.headers.set('X-XSS-Protection', '1; mode=block');
  modifiedResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  modifiedResponse.headers.set('X-Content-Type-Options', 'nosniff');
  modifiedResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // High-Performance Cache Control for immutable assets
  if (url.pathname.startsWith('/assets/')) {
    modifiedResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // 5. Cloudflare HTMLRewriter: Peak Detailing Edge Personalization
  // If this is an HTML request, we can inject edge data
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("text/html")) {
    const city = request.cf?.city || "Maharashtra";
    
    // Using Cloudflare's C++ based HTMLRewriter to inject the visitor's city into the DOM natively at the edge
    return new HTMLRewriter()
      .on('span#edge-visitor-city', {
        element(element) {
          element.setInnerContent(city as string);
        }
      })
      .transform(modifiedResponse);
  }

  return modifiedResponse;
};
