import fs from 'fs';
import path from 'path';

/**
 * KS Design Studio - Instant IndexNow Engine
 * Immediately pings Microsoft Bing, Yandex, Seznam, and Copilot AI Search
 * to crawl, index, and rank newly updated routes across Pune & Mumbai.
 */

const HOST = 'ksdesignstudio.in';
const KEY = 'b6a8d79f041e42e4854589d3d3c8c721';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ROUTES_PATH = path.join(process.cwd(), 'public', 'routes.json');
const BATCH_SIZE = 5000;

async function sendIndexNowBatch(urls, batchNum, totalBatches) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  console.log(`[IndexNow] Submitting Batch ${batchNum}/${totalBatches} (${urls.length} URLs)...`);

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`✅ [IndexNow] Batch ${batchNum} accepted successfully (HTTP ${response.status}).`);
      return true;
    } else {
      const text = await response.text();
      console.warn(`⚠️ [IndexNow] Batch ${batchNum} returned HTTP ${response.status}: ${text}`);
      return false;
    }
  } catch (err) {
    console.error(`❌ [IndexNow] Network error on batch ${batchNum}:`, err.message);
    return false;
  }
}

async function runIndexNow() {
  console.log('===========================================================');
  console.log('KS Design Studio - IndexNow Protocol Instant Multi-Engine Submission');
  console.log('Targets: Bing, Copilot AI, Yandex, DuckDuckGo, Seznam');
  console.log('===========================================================\n');

  if (!fs.existsSync(ROUTES_PATH)) {
    console.error(`Routes file not found at ${ROUTES_PATH}. Please run npm run build first.`);
    process.exit(1);
  }

  const routes = JSON.parse(fs.readFileSync(ROUTES_PATH, 'utf8'));
  const fullUrls = routes.map(r => `https://${HOST}${r === '/' ? '' : r}`);

  console.log(`Loaded ${fullUrls.length} total URLs to index across Pune & Mumbai.`);

  const batches = [];
  for (let i = 0; i < fullUrls.length; i += BATCH_SIZE) {
    batches.push(fullUrls.slice(i, i + BATCH_SIZE));
  }

  console.log(`Split into ${batches.length} batch(es) of max ${BATCH_SIZE} URLs each.\n`);

  let successCount = 0;
  for (let idx = 0; idx < batches.length; idx++) {
    const ok = await sendIndexNowBatch(batches[idx], idx + 1, batches.length);
    if (ok) successCount += batches[idx].length;
  }

  console.log(`\n🎉 IndexNow Pipeline Completed: ${successCount}/${fullUrls.length} URLs successfully submitted.`);
}

runIndexNow();
