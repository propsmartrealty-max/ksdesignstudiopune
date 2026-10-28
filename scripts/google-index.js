import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

/**
 * KS Design Studio - Enterprise Google Indexing API Engine
 * Automates daily 200-URL quota batching to accelerate discovery and achieve 20,000 daily impressions.
 * Requires: service-account.json in the project root.
 */

const BASE_URL = 'https://ksdesignstudio.in';
const HISTORY_FILE = path.join(process.cwd(), 'indexing-history.json');
const KEY_FILE = path.join(process.cwd(), 'service-account.json');
const ROUTES_FILE = path.join(process.cwd(), 'public', 'routes.json');
const DAILY_QUOTA_LIMIT = 200;

// High-Priority Keyword & Micro-Market Tiers
const TIER_1_LOCATIONS = [
  'wakad', 'baner', 'hinjewadi', 'balewadi', 'kharadi',
  'koregaon-park', 'aundh', 'kothrud', 'viman-nagar', 'magarpatta',
  'bavdhan', 'ravet', 'punawale', 'tathawade', 'pimple-saudagar'
];

const TIER_1_SERVICES = [
  'luxury-interior-designers',
  'turnkey-interiors',
  'modular-kitchen-designers',
  '2-bhk-interior-designers',
  '3-bhk-interior-designers',
  'villa-interior-designers',
  'interior-designers-near-me',
  'interior-design-cost-calculator',
  'modern-interior-design',
  'commercial-interior-designers'
];

function loadRoutes() {
  if (!fs.existsSync(ROUTES_FILE)) {
    console.error(`Routes file not found at ${ROUTES_FILE}. Please run npm run build first.`);
    return [];
  }
  return JSON.parse(fs.readFileSync(ROUTES_FILE, 'utf8'));
}

function loadHistory() {
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function saveHistory(history) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8');
}

function getPriorityScore(route) {
  // Score from 100 (highest priority) to 10
  if (route === '' || route === '/') return 100;
  if (['/portfolio', '/services', '/pricing', '/contact', '/about', '/laboratory'].includes(route)) return 95;
  
  if (route.startsWith('/cost-guide/')) {
    const loc = route.replace('/cost-guide/', '');
    return TIER_1_LOCATIONS.includes(loc) ? 90 : 80;
  }

  if (route.startsWith('/interiors-in/')) {
    const loc = route.replace('/interiors-in/', '');
    return TIER_1_LOCATIONS.includes(loc) ? 88 : 75;
  }

  if (route.startsWith('/builder/')) return 82;
  if (route.startsWith('/interiors-at/')) return 80;

  if (route.startsWith('/services/')) {
    const srv = route.replace('/services/', '');
    return TIER_1_SERVICES.includes(srv) ? 85 : 70;
  }

  return 50; // default cross combinations
}

function selectBatch(allRoutes, history, batchSize = DAILY_QUOTA_LIMIT) {
  const fullUrls = allRoutes.map(r => ({
    route: r,
    url: `${BASE_URL}${r === '/' ? '' : r}`,
    priority: getPriorityScore(r),
    lastSubmitted: history[`${BASE_URL}${r === '/' ? '' : r}`]?.lastSubmitted || 0
  }));

  // Sort: Never submitted first, then by priority descending, then oldest submitted
  fullUrls.sort((a, b) => {
    if (a.lastSubmitted === 0 && b.lastSubmitted !== 0) return -1;
    if (a.lastSubmitted !== 0 && b.lastSubmitted === 0) return 1;
    if (a.lastSubmitted === 0 && b.lastSubmitted === 0) return b.priority - a.priority;
    if (a.priority !== b.priority) return b.priority - a.priority;
    return a.lastSubmitted - b.lastSubmitted;
  });

  return fullUrls.slice(0, batchSize);
}

async function runIndexer() {
  console.log('===========================================================');
  console.log('KS Design Studio - Google Indexing Automation Pipeline');
  console.log('Target: 20,000 Impressions/Day via Rapid Indexing Acceleration');
  console.log('===========================================================\n');

  const allRoutes = loadRoutes();
  if (allRoutes.length === 0) return;

  const history = loadHistory();
  const batch = selectBatch(allRoutes, history, DAILY_QUOTA_LIMIT);
  const previouslyIndexedCount = Object.keys(history).length;

  console.log(`Total Programmatic Routes: ${allRoutes.length}`);
  console.log(`Previously Processed URLs: ${previouslyIndexedCount}`);
  console.log(`Next Batch Size: ${batch.length} URLs (Max 200/day quota)\n`);

  if (!fs.existsSync(KEY_FILE)) {
    console.warn('⚠️  service-account.json NOT FOUND.');
    console.log('Running in DRY-RUN mode. Showing next 15 prioritized URLs queued for indexing:\n');
    batch.slice(0, 15).forEach((item, idx) => {
      console.log(`  ${idx + 1}. [Score: ${item.priority}] ${item.url}`);
    });

    console.log('\n--- HOW TO ACTIVATE AUTOMATED LIVE SUBMISSION ---');
    console.log('1. Go to https://console.cloud.google.com/ and create a project.');
    console.log('2. Enable the "Web Search Indexing API".');
    console.log('3. In "IAM & Admin" > "Service Accounts", create a service account.');
    console.log('4. Create a JSON key and download it as "service-account.json".');
    console.log('5. Place "service-account.json" in this directory:');
    console.log(`   ${KEY_FILE}`);
    console.log('6. In Google Search Console (https://search.google.com/search-console):');
    console.log('   Add the service account email (e.g. your-bot@your-project.iam.gserviceaccount.com)');
    console.log('   as a user with "Owner" permission on https://ksdesignstudio.in');
    console.log('7. Re-run: npm run seo:index');
    return;
  }

  // Live Submission
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing('v3');
    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    let successCount = 0;
    let failCount = 0;

    for (const item of batch) {
      try {
        const res = await indexing.urlNotifications.publish({
          requestBody: {
            url: item.url,
            type: 'URL_UPDATED',
          },
        });

        history[item.url] = {
          lastSubmitted: Date.now(),
          status: res.status
        };

        successCount++;
        process.stdout.write(`✅ [${res.status}] ${item.url}\n`);
      } catch (err) {
        failCount++;
        console.error(`❌ [Failed] ${item.url}:`, err.message);
        if (err.message && err.message.includes('Quota exceeded')) {
          console.warn('\n⚠️ Google Indexing API daily quota (200 requests) reached. Stopping for today.');
          break;
        }
      }
    }

    saveHistory(history);
    console.log(`\nBatch Completed: ${successCount} successfully submitted, ${failCount} failed.`);
    console.log(`Total URLs in Indexing History: ${Object.keys(history).length} / ${allRoutes.length}`);
  } catch (error) {
    console.error('Fatal Indexing API Error:', error.message);
  }
}

runIndexer();
