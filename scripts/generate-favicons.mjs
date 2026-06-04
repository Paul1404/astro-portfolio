// Generates the PNG favicon set from public/favicon.svg using sharp.
// Run with: npm run favicons
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const source = join(publicDir, 'favicon.svg');

const targets = [
	{ file: 'favicon-16.png', size: 16 },
	{ file: 'favicon-32.png', size: 32 },
	{ file: 'apple-touch-icon.png', size: 180 },
	{ file: 'icon-192.png', size: 192 },
	{ file: 'icon-512.png', size: 512 },
];

const svg = await readFile(source);

for (const { file, size } of targets) {
	await sharp(svg, { density: 384 })
		.resize(size, size)
		.png()
		.toFile(join(publicDir, file));
	console.log(`generated ${file} (${size}x${size})`);
}

const manifest = {
	name: 'Paul Dresch',
	short_name: 'Paul Dresch',
	icons: [
		{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
		{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
	],
	theme_color: '#1f7ae0',
	background_color: '#080b12',
	display: 'standalone',
};

await writeFile(
	join(publicDir, 'manifest.webmanifest'),
	JSON.stringify(manifest, null, 2)
);
console.log('generated manifest.webmanifest');
