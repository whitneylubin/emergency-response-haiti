const fs = require('node:fs');

const budget = {
  html: 25,
  css: 5,
  js: 90,
};

try {
  const report = JSON.parse(fs.readFileSync('.next/analyze/client.json', 'utf-8'));
  const pages = report?.pageStats ?? {};
  let passed = true;
  for (const [page, stats] of Object.entries(pages)) {
    const htmlKb = Number((stats.sizeInBytes?.html ?? 0) / 1024);
    const cssKb = Number((stats.sizeInBytes?.css ?? 0) / 1024);
    const jsKb = Number((stats.sizeInBytes?.totalScripts ?? 0) / 1024);
    if (htmlKb > budget.html || cssKb > budget.css || jsKb > budget.js) {
      console.error(
        `Budget exceeded on ${page}: html ${htmlKb.toFixed(2)}kb css ${cssKb.toFixed(2)}kb js ${jsKb.toFixed(2)}kb`
      );
      passed = false;
    }
  }
  if (!passed) {
    process.exit(1);
  } else {
    console.log('Bundle budgets satisfied.');
  }
} catch (error) {
  console.error('Failed to read bundle report', error);
  process.exit(1);
}
