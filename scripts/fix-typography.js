#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, basename } from 'path';
import { execSync } from 'child_process';

/**
 * Typografické opravy pro českou typografii:
 * - Nedělitelné mezery před jednopísmennými předložkami/spojkami
 * - Správné české uvozovky „“
 * - Trojtečka … místo ...
 * - Pomlčka – v rozsazích
 * - Nedělitelná mezera před % a jednotkami
 */

const TYPOGRAPHY_RULES = [
	// Trojteřka ... → …
	{
		name: 'trojtečka',
		find: /\.{3}/g,
		replace: '…'
	},

	// Nedělitelná mezera před jednopísmennými předložkami/spojkami
	// Zachytí: " a ", " i ", " k ", " o ", " s ", " u ", " v ", " z "
	{
		name: 'nedělitelná mezera (a)',
		find: /(\s)([aA])\s+(?=[^\s])/g,
		replace: '$1$2\u00A0'
	},
	{
		name: 'nedělitelná mezera (i)',
		find: /(\s)([iI])\s+(?=[^\s])/g,
		replace: '$1$2\u00A0'
	},
	{
		name: 'nedělitelná mezera (k)',
		find: /(\s)([kK])\s+(?=[^\s])/g,
		replace: '$1$2\u00A0'
	},
	{
		name: 'nedělitelná mezera (o)',
		find: /(\s)([oO])\s+(?=[^\s])/g,
		replace: '$1$2\u00A0'
	},
	{
		name: 'nedělitelná mezera (s)',
		find: /(\s)([sS])\s+(?=[^\s])/g,
		replace: '$1$2\u00A0'
	},
	{
		name: 'nedělitelná mezera (u)',
		find: /(\s)([uU])\s+(?=[^\s])/g,
		replace: '$1$2\u00A0'
	},
	{
		name: 'nedělitelná mezera (v)',
		find: /(\s)([vV])\s+(?=[^\s])/g,
		replace: '$1$2\u00A0'
	},
	{
		name: 'nedělitelná mezera (z)',
		find: /(\s)([zZ])\s+(?=[^\s])/g,
		replace: '$1$2\u00A0'
	},

	// Pomlčka v rozsazích čísel: 10-20 → 10–20
	{
		name: 'pomlčka v rozsahu',
		find: /(\d)\s*-\s*(\d)/g,
		replace: '$1–$2'
	},

	// Nedělitelná mezera před %
	{
		name: 'nedělitelná mezera před %',
		find: /(\d)\s+%/g,
		replace: '$1\u00A0%'
	},

	// Nedělitelná mezera před jednotkami (px, rem, em, ms, s, kg, m, cm, mm, km, GB, MB, KB, TB)
	{
		name: 'nedělitelná mezera před jednotkou',
		find: /(\d)\s+(px|rem|em|ms|s|kg|m|cm|mm|km|GB|MB|KB|TB|kB)\b/g,
		replace: '$1\u00A0$2'
	},

	// České uvozovky: oprava špatně použitých uvozovek
	// Opravuje: „text„ (obě dolní) → „text"
	{
		name: 'oprava špatně použitých českých uvozovek (obě dolní)',
		find: /\u201E([^\u201E\u201C\u201D<>=]+)\u201E/g,
		replace: '\u201E$1\u201D'
	},

	// Opravuje: "text" (obě horní) → „text"
	{
		name: 'oprava špatně použitých českých uvozovek (obě horní)',
		find: /\u201C([^\u201E\u201C\u201D<>=]+)\u201C/g,
		replace: '\u201E$1\u201D'
	},

	// Opravuje: „text" (dolní + ASCII) → „text"
	{
		name: 'oprava špatně použitých českých uvozovek (dolní + ASCII)',
		find: /\u201E([^\u201E\u201C\u201D"<>=]+)"/g,
		replace: '\u201E$1\u201D'
	},

	// České uvozovky: "text" → „text"
	// Pouze v prose textu - NE v HTML atributech (po =)
	// Matchuje uvozovky po: > (konec tagu), whitespace, ( nebo na začátku řádku
	// České uvozovky: „ (U+201E) otevírací, " (U+201D) zavírací
	{
		name: 'české uvozovky',
		find: /(^|>|\s|\()"([^"<>=]+)"/gm,
		replace: '$1\u201E$2\u201D'
	}
];

/**
 * Extrahuje bloky kódu a další chráněné oblasti, nahradí je placeholdery
 */
function extractProtectedBlocks(content) {
	const protectedBlocks = [];
	let result = content;

	// YAML frontmatter (---...---)
	result = result.replace(/^---[\s\S]*?---/m, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// <script>...</script> bloky
	result = result.replace(/<script[\s\S]*?<\/script>/gi, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// <style>...</style> bloky
	result = result.replace(/<style[\s\S]*?<\/style>/gi, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// <pre>...</pre> bloky (včetně <pre><code>)
	result = result.replace(/<pre[\s\S]*?<\/pre>/gi, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// <code>...</code> inline
	result = result.replace(/<code>[\s\S]*?<\/code>/gi, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// Markdown code blocks ```...```
	result = result.replace(/```[\s\S]*?```/g, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// Inline backticks `...`
	result = result.replace(/`[^`]+`/g, (match) => {
		protectedBlocks.push(match);
		return `__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	// HTML atributy s jednoduchými uvozovkami: attr='...'
	// (obsah může obsahovat dvojité uvozovky, které nechceme měnit)
	result = result.replace(/=('[^']*')/g, (match, p1) => {
		protectedBlocks.push(p1);
		return `=__PROTECTED_BLOCK_${protectedBlocks.length - 1}__`;
	});

	return { content: result, protectedBlocks };
}

/**
 * Vrátí chráněné bloky zpět na jejich místa
 */
function restoreProtectedBlocks(content, protectedBlocks) {
	let result = content;
	for (let i = 0; i < protectedBlocks.length; i++) {
		result = result.replace(`__PROTECTED_BLOCK_${i}__`, protectedBlocks[i]);
	}
	return result;
}

function applyTypographyFixes(content) {
	// Extrahuj chráněné bloky (frontmatter, script, style, code)
	const { content: withoutProtected, protectedBlocks } = extractProtectedBlocks(content);

	let result = withoutProtected;
	const changes = [];

	for (const rule of TYPOGRAPHY_RULES) {
		const matches = result.match(rule.find);
		if (matches) {
			changes.push({ rule: rule.name, count: matches.length });
			result = result.replace(rule.find, rule.replace);
		}
	}

	// Vrať chráněné bloky zpět
	result = restoreProtectedBlocks(result, protectedBlocks);

	return { content: result, changes };
}

function processFile(filePath, shouldCommit) {
	const absolutePath = resolve(filePath);

	if (!existsSync(absolutePath)) {
		console.error(`Soubor neexistuje: ${absolutePath}`);
		process.exit(1);
	}

	const originalContent = readFileSync(absolutePath, 'utf-8');
	const { content: fixedContent, changes } = applyTypographyFixes(originalContent);

	if (changes.length === 0) {
		console.log(`Žádné typografické změny v ${filePath}`);
		return false;
	}

	writeFileSync(absolutePath, fixedContent, 'utf-8');

	console.log(`✓ Typografické opravy v ${filePath}:`);
	for (const change of changes) {
		console.log(`  - ${change.rule}: ${change.count}×`);
	}

	if (shouldCommit) {
		const fileName = basename(filePath, '.md');
		try {
			execSync(`git add "${absolutePath}"`, { stdio: 'pipe' });
			execSync(`git commit -m "fix: typografie v ${fileName}"`, { stdio: 'pipe' });
			console.log(`✓ Změny commitnuty`);
		} catch (error) {
			console.error(`Chyba při commitu: ${error.message}`);
			process.exit(1);
		}
	}

	return true;
}

// Main
const args = process.argv.slice(2);

if (args.length === 0) {
	console.log('Použití: node fix-typography.js [--no-commit] <cesta-k-článku>');
	console.log('');
	console.log('Možnosti:');
	console.log('  --no-commit    Pouze opraví soubor bez commitu');
	console.log('');
	console.log('Příklad: node fix-typography.js content/posts/muj-clanek.md');
	console.log('');
	console.log('Opravuje:');
	console.log('  - Nedělitelné mezery před a, i, k, o, s, u, v, z');
	console.log('  - Trojtečku ... → …');
	console.log('  - Pomlčku v rozsazích 10-20 → 10–20');
	console.log('  - České uvozovky "text" → „text" (pouze v prose, ne v HTML atributech)');
	console.log('  - Nedělitelné mezery před % a jednotkami');
	console.log('');
	console.log('Přeskakuje: frontmatter, <script>, <style>, <pre>, <code>, backticks');
	process.exit(1);
}

const noCommit = args.includes('--no-commit');
const filePath = args.filter((arg) => !arg.startsWith('--'))[0];

if (!filePath) {
	console.error('Chybí cesta k souboru');
	process.exit(1);
}

processFile(filePath, !noCommit);
