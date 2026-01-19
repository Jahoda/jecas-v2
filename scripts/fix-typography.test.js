#!/usr/bin/env node

/**
 * Testy pro fix-typography.js
 *
 * Spuštění: node scripts/fix-typography.test.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Importujeme pomocí dynamic import, protože fix-typography.js má side effects
// Místo toho extrahujeme logiku přímo zde pro testování

const TYPOGRAPHY_RULES = [
	{ name: 'trojtečka', find: /\.{3}/g, replace: '…' },
	{ name: 'nedělitelná mezera (a)', find: /(\s)([aA])\s+(?=[^\s])/g, replace: '$1$2\u00A0' },
	{ name: 'nedělitelná mezera (v)', find: /(\s)([vV])\s+(?=[^\s])/g, replace: '$1$2\u00A0' },
	{ name: 'pomlčka v rozsahu', find: /(\d)\s*-\s*(\d)/g, replace: '$1–$2' },
	{ name: 'nedělitelná mezera před %', find: /(\d)\s+%/g, replace: '$1\u00A0%' },
	{
		name: 'české uvozovky',
		find: /(^|>|\s|\()"([^"<>=]+)"/gm,
		replace: '$1\u201E$2\u201C'
	}
];

function extractProtectedBlocks(content) {
	const protectedBlocks = [];
	let result = content;

	// YAML frontmatter
	result = result.replace(/^---[\s\S]*?---/m, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// <script>
	result = result.replace(/<script[\s\S]*?<\/script>/gi, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// <style>
	result = result.replace(/<style[\s\S]*?<\/style>/gi, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// <pre>
	result = result.replace(/<pre[\s\S]*?<\/pre>/gi, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// <code>
	result = result.replace(/<code>[\s\S]*?<\/code>/gi, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// ```...```
	result = result.replace(/```[\s\S]*?```/g, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// `...`
	result = result.replace(/`[^`]+`/g, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// HTML atributy s jednoduchými uvozovkami
	result = result.replace(/=('[^']*')/g, (match, p1) => {
		protectedBlocks.push(p1);
		return `=__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	return { content: result, protectedBlocks };
}

function restoreProtectedBlocks(content, protectedBlocks) {
	let result = content;
	for (let i = 0; i < protectedBlocks.length; i++) {
		result = result.replace(`__PROTECTED_BLOCK_${i}__`, protectedBlocks[i]);
	}
	return result;
}

function applyTypographyFixes(content) {
	const { content: withoutProtected, protectedBlocks } = extractProtectedBlocks(content);
	let result = withoutProtected;

	for (const rule of TYPOGRAPHY_RULES) {
		result = result.replace(rule.find, rule.replace);
	}

	return restoreProtectedBlocks(result, protectedBlocks);
}

// === TESTY ===

// České uvozovky: „ (U+201E) otevírací, " (U+201C) zavírací
const CZ_OPEN = '\u201E'; // „
const CZ_CLOSE = '\u201C'; // "
const NBSP = '\u00A0'; // nedělitelná mezera

const tests = [
	// České uvozovky - prose text
	// Pozor: aplikují se i pravidla pro nedělitelné mezery před "v"
	{
		name: 'České uvozovky v prose textu',
		input: '<p>Toto je "testovací text" v odstavci.</p>',
		expected: `<p>Toto je ${CZ_OPEN}testovací text${CZ_CLOSE} v${NBSP}odstavci.</p>`
	},
	{
		name: 'České uvozovky po tagu',
		input: '<b>"důležité"</b>',
		expected: `<b>${CZ_OPEN}důležité${CZ_CLOSE}</b>`
	},

	// HTML atributy - NESMÍ se měnit
	{
		name: 'HTML atribut class="" zůstává',
		input: '<div class="special">text</div>',
		expected: '<div class="special">text</div>'
	},
	{
		name: 'HTML atribut id="" zůstává',
		input: '<h2 id="sekce">Nadpis</h2>',
		expected: '<h2 id="sekce">Nadpis</h2>'
	},
	{
		name: 'HTML atribut href="" zůstává',
		input: '<a href="https://example.com">odkaz</a>',
		expected: '<a href="https://example.com">odkaz</a>'
	},
	{
		name: 'HTML atribut onclick="" zůstává',
		input: '<button onclick="doSomething()">Klik</button>',
		expected: '<button onclick="doSomething()">Klik</button>'
	},

	// Single-quoted atributy s dvojitými uvozovkami uvnitř
	{
		name: 'Single-quoted placeholder s JSON zůstává',
		input: `<textarea placeholder='{"key": "value"}'></textarea>`,
		expected: `<textarea placeholder='{"key": "value"}'></textarea>`
	},
	{
		name: 'Single-quoted atribut s textem zůstává',
		input: `<input placeholder='"Vložte text"'>`,
		expected: `<input placeholder='"Vložte text"'>`
	},

	// Frontmatter - NESMÍ se měnit
	{
		name: 'YAML frontmatter zůstává',
		input: '---\ntitle: "Článek"\n---\n\n<p>"text"</p>',
		expected: `---\ntitle: "Článek"\n---\n\n<p>${CZ_OPEN}text${CZ_CLOSE}</p>`
	},

	// Script bloky - NESMÍ se měnit
	{
		name: 'JavaScript v <script> zůstává',
		input: '<script>\nconst x = "string";\n</script>\n<p>"text"</p>',
		expected: `<script>\nconst x = "string";\n</script>\n<p>${CZ_OPEN}text${CZ_CLOSE}</p>`
	},

	// Code bloky - NESMÍ se měnit
	{
		name: 'Obsah v <code> zůstává',
		input: '<code>"string"</code> a "prose"',
		expected: `<code>"string"</code> a${NBSP}${CZ_OPEN}prose${CZ_CLOSE}`
	},
	{
		name: 'Obsah v <pre> zůstává',
		input: '<pre>const x = "test";</pre>\n<p>"text"</p>',
		expected: `<pre>const x = "test";</pre>\n<p>${CZ_OPEN}text${CZ_CLOSE}</p>`
	},
	{
		name: 'Inline backticks zůstávají',
		input: 'Text `"code"` a "prose"',
		expected: `Text \`"code"\` a${NBSP}${CZ_OPEN}prose${CZ_CLOSE}`
	},

	// Ostatní typografické opravy
	{
		name: 'Trojtečka ... → …',
		input: '<p>Něco... a další...</p>',
		expected: `<p>Něco… a${NBSP}další…</p>`
	},
	{
		name: 'Pomlčka v rozsahu 10-20 → 10–20',
		input: '<p>Rozsah 10-20 kusů</p>',
		expected: '<p>Rozsah 10–20 kusů</p>'
	},
	{
		name: 'Nedělitelná mezera před %',
		input: '<p>Sleva 50 %</p>',
		expected: '<p>Sleva 50\u00A0%</p>'
	},

	// Kombinované testy
	{
		name: 'Komplexní HTML s atributy i prose',
		input: '<a href="url" title="tip">Odkaz s "textem"</a>',
		expected: `<a href="url" title="tip">Odkaz s ${CZ_OPEN}textem${CZ_CLOSE}</a>`
	}
];

// Spuštění testů
let passed = 0;
let failed = 0;

console.log('Spouštím testy pro fix-typography.js\n');
console.log('='.repeat(60));

for (const test of tests) {
	const result = applyTypographyFixes(test.input);
	const success = result === test.expected;

	if (success) {
		console.log(`✓ ${test.name}`);
		passed++;
	} else {
		console.log(`✗ ${test.name}`);
		console.log(`  Input:    ${JSON.stringify(test.input)}`);
		console.log(`  Expected: ${JSON.stringify(test.expected)}`);
		console.log(`  Got:      ${JSON.stringify(result)}`);
		failed++;
	}
}

console.log('='.repeat(60));
console.log(`\nVýsledek: ${passed} prošlo, ${failed} selhalo`);

process.exit(failed > 0 ? 1 : 0);
