#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const REPLACEMENTS = {
	verz: 'vers',
	paraleliz: 'paralelis',
	univerzál: 'universál',
	riziko: 'risiko',
	analýz: 'analys',
	pozic: 'posic',
	rizik: 'risik',
	sanitiz: 'sanitis',
	optimaliz: 'optimalis',
	organiz: 'organis',
	vizuál: 'visuál',
	vizualiz: 'visualis',
	lokaliz: 'lokalis',
	realiz: 'realis',
	specializ: 'specialis',
	aktualiz: 'aktualis',
	serializ: 'serialis',
	automatiz: 'automatis',
	standardiz: 'standardis',
	synchroniz: 'synchronis',
	inicializ: 'inicialis',
	normaliz: 'normalis',
	minimaliz: 'minimalis',
	stabiliz: 'stabilis',
	centraliz: 'centralis',
	customiz: 'customis',
	symboliz: 'symbolis',
	konverz: 'konvers',
	databaz: 'databas',
	prezent: 'present',
	reverz: 'revers',
	konzist: 'konsist',
	izolovan: 'isolovan'
};

/**
 * Převede text podle mapy nahrazení, zachová velikost písmen ze zdroje
 */
function replacePreservingCase(text, from, to) {
	const regex = new RegExp(escapeRegex(from), 'gi');

	return text.replace(regex, (match) => {
		return matchCase(match, to);
	});
}

/**
 * Escapuje speciální regex znaky
 */
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Aplikuje velikost písmen ze source na target
 */
function matchCase(source, target) {
	let result = '';

	for (let i = 0; i < target.length; i++) {
		const sourceChar = source[i] ?? source[source.length - 1];
		const targetChar = target[i];

		if (sourceChar === sourceChar.toUpperCase() && sourceChar !== sourceChar.toLowerCase()) {
			result += targetChar.toUpperCase();
		} else {
			result += targetChar.toLowerCase();
		}
	}

	return result;
}

function processFile(filePath) {
	const absolutePath = resolve(filePath);

	if (!existsSync(absolutePath)) {
		console.error(`Soubor neexistuje: ${absolutePath}`);
		process.exit(1);
	}

	let content = readFileSync(absolutePath, 'utf-8');
	let changeCount = 0;

	for (const [from, to] of Object.entries(REPLACEMENTS)) {
		const regex = new RegExp(escapeRegex(from), 'gi');
		const matches = content.match(regex);

		if (matches) {
			changeCount += matches.length;
			content = replacePreservingCase(content, from, to);
		}
	}

	if (changeCount > 0) {
		writeFileSync(absolutePath, content, 'utf-8');
		console.log(`✓ Nahrazeno ${changeCount} výskytů v ${filePath}`);
	} else {
		console.log(`Žádné změny v ${filePath}`);
	}
}

// Main
const args = process.argv.slice(2);

if (args.length === 0) {
	console.log('Použití: node replace-words.js <cesta-k-článku>');
	console.log('Příklad: node replace-words.js content/posts/js-porovnani-retezcu-bezpecnost.md');
	process.exit(1);
}

processFile(args[0]);
