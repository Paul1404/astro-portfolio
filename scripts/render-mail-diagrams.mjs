import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

// Generated SVGs are committed. The normal static build needs no browser or Mermaid runtime.
const source = 'docs/diagrams/pdcd-mail';
const temporary = mkdtempSync(path.join(tmpdir(), 'pdcd-mermaid-'));
try {
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH ||
    (process.platform === 'darwin' && existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined);
  const browserConfig = path.join(temporary, 'puppeteer.json');
  writeFileSync(browserConfig, JSON.stringify(executablePath ? { executablePath } : {}));
  for (const file of readdirSync(source).filter(name => name.endsWith('.mmd')).sort()) {
    execFileSync('npx', ['--yes', '--package=@mermaid-js/mermaid-cli@12.0.0', 'mmdc',
      '--input', path.join(source, file), '--output', `public/diagrams/pdcd-mail/${file.replace('.mmd', '.svg')}`,
      '--configFile', path.join(source, 'config.json'), '--puppeteerConfigFile', browserConfig,
      '--backgroundColor', '#f8fafc', '--size', '1600', '--no-font-embed',
      '--svgId', `mail-${file.replace('.mmd', '')}`], { stdio: 'inherit' });
    const output = `public/diagrams/pdcd-mail/${file.replace('.mmd', '.svg')}`;
    // Preserve inter-word spacing across adjacent SVG tspans in image renderers.
    writeFileSync(output, readFileSync(output, 'utf8').replace('<svg ', '<svg xml:space="preserve" '));
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
