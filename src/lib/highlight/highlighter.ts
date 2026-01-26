/**
 * Lightweight syntax highlighter without external dependencies
 * Supports: JavaScript, TypeScript, HTML, CSS, PHP, SQL, JSON, Bash
 */

type TokenType = 'keyword' | 'string' | 'comment' | 'number' | 'function' | 'operator' | 'tag' | 'attr' | 'value' | 'punctuation' | 'variable' | 'property';

interface Token {
	type: TokenType;
	pattern: RegExp;
}

// Escape HTML special characters
function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

// Language definitions
const languages: Record<string, Token[]> = {
	javascript: [
		{ type: 'comment', pattern: /\/\/.*$/gm },
		{ type: 'comment', pattern: /\/\*[\s\S]*?\*\//g },
		{ type: 'string', pattern: /`[\s\S]*?`/g },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'string', pattern: /'(?:[^'\\]|\\.)*'/g },
		{ type: 'keyword', pattern: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|this|super|null|undefined|true|false|void|delete|yield)\b/g },
		{ type: 'number', pattern: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g },
		{ type: 'function', pattern: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g },
		{ type: 'operator', pattern: /[+\-*/%=<>!&|^~?:]+/g },
		{ type: 'punctuation', pattern: /[{}[\]();,.]/g },
	],
	typescript: [
		{ type: 'comment', pattern: /\/\/.*$/gm },
		{ type: 'comment', pattern: /\/\*[\s\S]*?\*\//g },
		{ type: 'string', pattern: /`[\s\S]*?`/g },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'string', pattern: /'(?:[^'\\]|\\.)*'/g },
		{ type: 'keyword', pattern: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|this|super|null|undefined|true|false|void|delete|yield|type|interface|enum|namespace|module|declare|readonly|public|private|protected|static|abstract|implements|as|is|keyof|infer|never|unknown|any)\b/g },
		{ type: 'number', pattern: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g },
		{ type: 'function', pattern: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g },
		{ type: 'operator', pattern: /[+\-*/%=<>!&|^~?:]+/g },
		{ type: 'punctuation', pattern: /[{}[\]();,.]/g },
	],
	html: [
		{ type: 'comment', pattern: /<!--[\s\S]*?-->/g },
		{ type: 'tag', pattern: /<\/?[a-zA-Z][a-zA-Z0-9-]*(?=[\s>])/g },
		{ type: 'attr', pattern: /\s[a-zA-Z][a-zA-Z0-9-]*(?=\s*=)/g },
		{ type: 'string', pattern: /=\s*"[^"]*"/g },
		{ type: 'string', pattern: /=\s*'[^']*'/g },
		{ type: 'punctuation', pattern: /[<>\/=]/g },
	],
	css: [
		{ type: 'comment', pattern: /\/\*[\s\S]*?\*\//g },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'string', pattern: /'(?:[^'\\]|\\.)*'/g },
		{ type: 'keyword', pattern: /@[a-zA-Z][a-zA-Z0-9-]*/g },
		{ type: 'property', pattern: /[a-zA-Z-]+(?=\s*:)/g },
		{ type: 'number', pattern: /\b\d+\.?\d*(px|em|rem|%|vh|vw|deg|s|ms)?\b/g },
		{ type: 'function', pattern: /[a-zA-Z-]+(?=\()/g },
		{ type: 'variable', pattern: /--[a-zA-Z][a-zA-Z0-9-]*/g },
		{ type: 'punctuation', pattern: /[{}();:,]/g },
	],
	php: [
		{ type: 'comment', pattern: /\/\/.*$/gm },
		{ type: 'comment', pattern: /#.*$/gm },
		{ type: 'comment', pattern: /\/\*[\s\S]*?\*\//g },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'string', pattern: /'(?:[^'\\]|\\.)*'/g },
		{ type: 'variable', pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g },
		{ type: 'keyword', pattern: /\b(function|return|if|else|elseif|for|foreach|while|do|switch|case|break|continue|new|class|extends|implements|interface|trait|namespace|use|public|private|protected|static|final|abstract|const|echo|print|require|include|require_once|include_once|true|false|null|array|isset|unset|empty|die|exit|throw|try|catch|finally|as|match)\b/g },
		{ type: 'number', pattern: /\b\d+\.?\d*\b/g },
		{ type: 'function', pattern: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g },
		{ type: 'operator', pattern: /[+\-*/%=<>!&|^~?:.]+|=>/g },
		{ type: 'punctuation', pattern: /[{}[\]();,]/g },
	],
	sql: [
		{ type: 'comment', pattern: /--.*$/gm },
		{ type: 'comment', pattern: /\/\*[\s\S]*?\*\//g },
		{ type: 'string', pattern: /'(?:[^'\\]|\\.)*'/g },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'keyword', pattern: /\b(SELECT|FROM|WHERE|AND|OR|NOT|IN|IS|NULL|AS|ON|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|CROSS|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|VIEW|DROP|ALTER|ADD|COLUMN|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|DEFAULT|CHECK|CONSTRAINT|TRUNCATE|UNION|ALL|DISTINCT|BETWEEN|LIKE|EXISTS|CASE|WHEN|THEN|ELSE|END|COUNT|SUM|AVG|MIN|MAX|COALESCE|NULLIF|CAST|CONVERT|DATABASE|SCHEMA|GRANT|REVOKE|COMMIT|ROLLBACK|TRANSACTION|BEGIN|DECLARE|CURSOR|FETCH|OPEN|CLOSE|DEALLOCATE|ASC|DESC)\b/gi },
		{ type: 'number', pattern: /\b\d+\.?\d*\b/g },
		{ type: 'function', pattern: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g },
		{ type: 'operator', pattern: /[+\-*/%=<>!]+/g },
		{ type: 'punctuation', pattern: /[{}[\]();,.*]/g },
	],
	json: [
		{ type: 'property', pattern: /"[^"]*"(?=\s*:)/g },
		{ type: 'string', pattern: /"[^"]*"/g },
		{ type: 'number', pattern: /-?\b\d+\.?\d*([eE][+-]?\d+)?\b/g },
		{ type: 'keyword', pattern: /\b(true|false|null)\b/g },
		{ type: 'punctuation', pattern: /[{}[\]:,]/g },
	],
	bash: [
		{ type: 'comment', pattern: /#.*$/gm },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'string', pattern: /'[^']*'/g },
		{ type: 'variable', pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g },
		{ type: 'variable', pattern: /\$\{[^}]+\}/g },
		{ type: 'keyword', pattern: /\b(if|then|else|elif|fi|for|while|do|done|case|esac|in|function|return|exit|break|continue|export|source|alias|unalias|local|declare|readonly|unset|shift|eval|exec|trap|sudo)\b/g },
		{ type: 'function', pattern: /\b(npm|yarn|pnpm|npx|node|deno|bun|git|docker|kubectl|curl|wget|pip|python|ruby|go|cargo|make|apt|brew|pacman|dnf|yum|cd|pwd|echo|printf|read|test|ls|cat|grep|awk|sed|chmod|mkdir|rm|cp|mv|touch|find|tar|zip|unzip|ssh|scp|rsync)\b/g },
		{ type: 'operator', pattern: /[|&;<>]+|&&|\|\||--?[\w-]+/g },
		{ type: 'punctuation', pattern: /[{}[\]();@]/g },
	],
	shell: [], // alias for bash, filled below
	sh: [], // alias for bash, filled below
	xml: [], // alias for html, filled below
	jsx: [], // alias for javascript, filled below
	tsx: [], // alias for typescript, filled below
	scss: [], // alias for css, filled below
	less: [], // alias for css, filled below
	plaintext: [],
	text: [],
};

// Set up aliases
languages.shell = languages.bash;
languages.sh = languages.bash;
languages.xml = languages.html;
languages.jsx = languages.javascript;
languages.tsx = languages.typescript;
languages.scss = languages.css;
languages.less = languages.css;
languages.js = languages.javascript;
languages.ts = languages.typescript;

/**
 * Highlight code string with the specified language
 */
export function highlight(code: string, lang: string): string {
	const language = lang.toLowerCase();
	const tokens = languages[language];

	// If language is not supported, just escape and return
	if (!tokens || tokens.length === 0) {
		return escapeHtml(code);
	}

	// Create array of character positions and their highlights
	interface Highlight {
		start: number;
		end: number;
		type: TokenType;
		text: string;
	}

	const highlights: Highlight[] = [];

	// Find all matches for all token types
	for (const token of tokens) {
		const regex = new RegExp(token.pattern.source, token.pattern.flags);
		let match;

		while ((match = regex.exec(code)) !== null) {
			highlights.push({
				start: match.index,
				end: match.index + match[0].length,
				type: token.type,
				text: match[0]
			});
		}
	}

	// Sort by start position, longer matches first for same start
	highlights.sort((a, b) => {
		if (a.start !== b.start) return a.start - b.start;
		return b.end - a.end;
	});

	// Remove overlapping highlights (keep first/longer one)
	const filtered: Highlight[] = [];
	let lastEnd = 0;

	for (const h of highlights) {
		if (h.start >= lastEnd) {
			filtered.push(h);
			lastEnd = h.end;
		}
	}

	// Build result string
	let result = '';
	let pos = 0;

	for (const h of filtered) {
		// Add unhighlighted text before this highlight
		if (h.start > pos) {
			result += escapeHtml(code.slice(pos, h.start));
		}
		// Add highlighted text
		result += `<span class="hl-${h.type}">${escapeHtml(h.text)}</span>`;
		pos = h.end;
	}

	// Add remaining unhighlighted text
	if (pos < code.length) {
		result += escapeHtml(code.slice(pos));
	}

	return result;
}

/**
 * Detect language from class attribute (e.g., "language-javascript" or "lang-js")
 */
export function detectLanguageFromClass(className: string | null): string {
	if (!className) return '';

	const match = className.match(/(?:language|lang)-(\w+)/);
	return match ? match[1].toLowerCase() : '';
}

/**
 * Guess language from code content based on characteristic patterns
 */
export function guessLanguageFromContent(code: string): string {
	const trimmed = code.trim();

	// HTML detection - starts with < or contains HTML tags
	if (/^<[!a-zA-Z]/.test(trimmed) || /<\/?(?:div|span|p|a|ul|ol|li|table|tr|td|th|form|input|button|img|head|body|html|script|style|link|meta|h[1-6]|section|article|nav|header|footer|main|aside)\b/i.test(code)) {
		return 'html';
	}

	// PHP detection - <?php or $variable with PHP functions
	if (/^<\?php\b/.test(trimmed) || /<\?(?:php|=)/.test(code) || (/\$[a-zA-Z_]/.test(code) && /\b(?:echo|print|function|class|namespace|use|foreach|array|isset|empty)\b/.test(code))) {
		return 'php';
	}

	// SQL detection - SQL keywords at start or common patterns
	if (/^\s*(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|FROM|WHERE|JOIN|UNION)\b/i.test(trimmed) || /\b(?:SELECT\s+\*?\s+FROM|INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM|CREATE\s+TABLE|ALTER\s+TABLE)\b/i.test(code)) {
		return 'sql';
	}

	// JSON detection - starts with { or [ and has key-value pairs
	if (/^\s*[\[{]/.test(trimmed) && /"[^"]*"\s*:/.test(code) && !(/\bfunction\b/.test(code))) {
		return 'json';
	}

	// Bash/Shell detection - must be before CSS (# comments vs #id selectors)
	// Shebang, common CLI commands, shell syntax
	if (
		/^#!\/(?:usr\/)?bin\/(?:ba)?sh/.test(trimmed) ||
		/^\s*(?:if\s+\[|for\s+\w+\s+in|while\s+\[|case\s+\$)/.test(trimmed) ||
		(/\$\{?\w+\}?/.test(code) && /\b(?:echo|export|cd|ls|grep|awk|sed|cat|chmod|mkdir|rm|cp|mv)\b/.test(code)) ||
		// Common CLI tools at line start
		/(?:^|\n)\s*(?:npm|yarn|pnpm|npx|node|deno|bun|git|docker|kubectl|curl|wget|pip|python|ruby|go|cargo|make|sudo|apt|brew|pacman|dnf|yum)\s+\w+/.test(code) ||
		// Shell comments (# followed by space or word, not #selector{)
		(/(?:^|\n)\s*#\s+\w/.test(code) && !/\{/.test(code))
	) {
		return 'bash';
	}

	// CSS detection - selectors with braces or @rules
	if (/^(?:\.|#[a-zA-Z][\w-]*\s*\{|@|[a-zA-Z][\w-]*\s*\{)/.test(trimmed) || /(?:^|\n)\s*(?:\.|#[a-zA-Z]|@media|@keyframes|@import|@font-face)[^{]*\{/.test(code) || /\b(?:color|background|margin|padding|display|position|width|height|font-size|border)\s*:/.test(code)) {
		return 'css';
	}

	// TypeScript detection - type annotations, interface, type keyword
	if (/\b(?:interface|type|enum|namespace|readonly|public|private|protected)\s+\w+/.test(code) || /:\s*(?:string|number|boolean|void|any|unknown|never)\b/.test(code) || /<[A-Z]\w*>/.test(code)) {
		return 'typescript';
	}

	// JavaScript detection - common JS patterns
	if (/\b(?:const|let|var|function|return|if|else|for|while|class|import|export|async|await|=>)\b/.test(code) || /(?:document|window|console)\.\w+/.test(code) || /\bfunction\s*\w*\s*\(/.test(code)) {
		return 'javascript';
	}

	// Default - return empty (will still try to highlight with basic patterns)
	return '';
}

/**
 * Detect language - first try class, then guess from content
 */
export function detectLanguage(className: string | null, code: string): string {
	const fromClass = detectLanguageFromClass(className);
	if (fromClass) return fromClass;

	return guessLanguageFromContent(code);
}

/**
 * Highlight all code blocks in a container element
 */
export function highlightAllCodeBlocks(container: HTMLElement): void {
	const codeBlocks = container.querySelectorAll<HTMLElement>('pre code');

	for (const codeBlock of codeBlocks) {
		// Skip already highlighted blocks
		if (codeBlock.dataset.highlighted === 'true') continue;

		// Get original text content
		const code = codeBlock.textContent || '';

		// Detect language from class or content
		const lang = detectLanguage(codeBlock.className, code);
		if (!lang) continue;

		// Highlight and replace
		codeBlock.innerHTML = highlight(code, lang);
		codeBlock.dataset.highlighted = 'true';

		// Add language indicator class to pre element
		const pre = codeBlock.parentElement;
		if (pre && pre.tagName === 'PRE') {
			pre.classList.add('hl-pre');
			pre.dataset.language = lang;
		}
	}
}
