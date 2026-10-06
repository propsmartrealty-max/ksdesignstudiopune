export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);

  // 1. Force HTTPS
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  const response = await next();
  const modifiedResponse = new Response(response.body, response);

  // 2. Advanced Serverless Security Posture
  modifiedResponse.headers.set('X-XSS-Protection', '1; mode=block');
  modifiedResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  modifiedResponse.headers.set('X-Content-Type-Options', 'nosniff');
  modifiedResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // High-Performance Cache Control for immutable assets
  if (url.pathname.startsWith('/assets/')) {
    modifiedResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // 3. Cloudflare HTMLRewriter: Peak Detailing Edge Personalization & Wealth Indexing
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("text/html")) {
    const city = (request.cf?.city || "Pune") as string;
    
    // Hyper-Personalized Wealth-Index Logic
    const ultraLuxuryMarkets = ["Koregaon Park", "Kalyani Nagar", "Viman Nagar", "Baner", "Aundh", "Magarpatta", "Boat Club Road"];
    const premiumMarkets = ["Wakad", "Hinjewadi", "Kharadi", "Pimple Saudagar", "Balewadi", "Kothrud", "Bavdhan"];
    
    let wealthIntentString = "bespoke, A-grade home narratives";
    let subIntentString = "We turn architectural volumes into personal sanctuaries for the elite.";
    
    if (ultraLuxuryMarkets.includes(city)) {
        wealthIntentString = "ultra-luxury penthouses & imported Italian marble aesthetics";
        subIntentString = "Exclusive architectural masterpieces crafted for high-net-worth patrons.";
    } else if (premiumMarkets.includes(city)) {
        wealthIntentString = "premium 2BHK/3BHK turnkey solutions & smart modular kitchens";
        subIntentString = "Optimized spatial layouts with uncompromising premium finishings.";
    }
    
    return new HTMLRewriter()
      .on('span#edge-visitor-city', {
        element(element) {
          element.setInnerContent(city);
        }
      })
      .on('span#edge-wealth-intent', {
        element(element) {
          element.setInnerContent(wealthIntentString);
        }
      })
      .on('span#edge-sub-intent', {
        element(element) {
          element.setInnerContent(subIntentString);
        }
      })
      .transform(modifiedResponse);
  }

  return modifiedResponse;
};
