import { execFileSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';

for (const page of ['dist/en/index.html', 'dist/de/index.html']) {
  if (!existsSync(page)) throw new Error(`Missing built page: ${page}`);
}
const revision = process.env.GITHUB_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
writeFileSync('dist/health.json', `${JSON.stringify({ status: 'ok', revision })}\n`);
