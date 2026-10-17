export const onRequest: PagesFunction = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);

  // 1. Force HTTPS
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  // 2. Canonical Domain & URL Normalization
  if (url.hostname === 'www.ksdesignstudio.in') {
    url.hostname = 'ksdesignstudio.in';
    return Response.redirect(url.toString(), 301);
  }


  // 4. Lowercase URL Normalization (except query parameters)
  if (/[A-Z]/.test(url.pathname)) {
    url.pathname = url.pathname.toLowerCase();
    return Response.redirect(url.toString(), 301);
  }

  const response = await next();

  // 5. Intelligent 404 Recovery for Legacy & Misspelled URLs
  if (response.status === 404) {
    const isStaticAsset = /\.(js|css|webp|png|jpe?g|gif|svg|ico|woff2?|ttf|eot|otf|json|xml|txt|pdf|mp4|webm)$/i.test(url.pathname);
    if (!isStaticAsset) {
      const lower = url.pathname.toLowerCase();
      let redirectTarget = 'https://ksdesignstudio.in/';

      if (lower.includes('service') || lower.includes('kitchen') || lower.includes('wardrobe') || lower.includes('interior')) {
        redirectTarget = 'https://ksdesignstudio.in/services';
      } else if (lower.includes('portfolio') || lower.includes('project') || lower.includes('work') || lower.includes('gallery')) {
        redirectTarget = 'https://ksdesignstudio.in/portfolio';
      } else if (lower.includes('blog') || lower.includes('post') || lower.includes('news') || lower.includes('article') || lower.includes('knowledge') || lower.includes('magazine')) {
        redirectTarget = 'https://ksdesignstudio.in/knowledge';
      } else if (lower.includes('cost') || lower.includes('price') || lower.includes('pricing') || lower.includes('estimate') || lower.includes('calculator')) {
        redirectTarget = 'https://ksdesignstudio.in/pricing';
      } else if (lower.includes('contact') || lower.includes('enquiry') || lower.includes('quote') || lower.includes('reach')) {
        redirectTarget = 'https://ksdesignstudio.in/contact';
      } else if (lower.includes('about') || lower.includes('team') || lower.includes('founder') || lower.includes('architect') || lower.includes('story')) {
        redirectTarget = 'https://ksdesignstudio.in/about';
      } else if (lower.includes('design') || lower.includes('idea')) {
        redirectTarget = 'https://ksdesignstudio.in/design-ideas';
      }

      return Response.redirect(redirectTarget, 301);
    }
  }

  const modifiedResponse = new Response(response.body, response);

  // 6. Advanced Serverless Security Posture
  modifiedResponse.headers.set('X-XSS-Protection', '1; mode=block');
  modifiedResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  modifiedResponse.headers.set('X-Content-Type-Options', 'nosniff');
  modifiedResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
  modifiedResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // High-Performance Cache Control for immutable assets
  if (url.pathname.startsWith('/assets/')) {
    modifiedResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // 7. Cloudflare HTMLRewriter: Peak Detailing Edge Personalization & Wealth Indexing
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
