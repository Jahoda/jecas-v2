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
	jsx: [
		{ type: 'comment', pattern: /\/\/.*$/gm },
		{ type: 'comment', pattern: /\/\*[\s\S]*?\*\//g },
		{ type: 'comment', pattern: /\{\/\*[\s\S]*?\*\/\}/g },
		{ type: 'string', pattern: /`[\s\S]*?`/g },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'string', pattern: /'(?:[^'\\]|\\.)*'/g },
		{ type: 'tag', pattern: /<\/?[A-Z][a-zA-Z0-9]*(?=[\s\/>])/g },
		{ type: 'tag', pattern: /<\/?(?:div|span|p|a|ul|ol|li|table|tr|td|th|form|input|button|img|h[1-6]|section|article|nav|header|footer|main|aside|label|textarea|select|option)(?=[\s\/>])/g },
		{ type: 'attr', pattern: /\s[a-zA-Z][a-zA-Z0-9]*(?=\s*=)/g },
		{ type: 'keyword', pattern: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|this|super|null|undefined|true|false|void|delete|yield)\b/g },
		{ type: 'number', pattern: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g },
		{ type: 'function', pattern: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g },
		{ type: 'operator', pattern: /[+\-*/%=<>!&|^~?:]+/g },
		{ type: 'punctuation', pattern: /[{}[\]();,.<>\/]/g },
	],
	tsx: [
		{ type: 'comment', pattern: /\/\/.*$/gm },
		{ type: 'comment', pattern: /\/\*[\s\S]*?\*\//g },
		{ type: 'comment', pattern: /\{\/\*[\s\S]*?\*\/\}/g },
		{ type: 'string', pattern: /`[\s\S]*?`/g },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'string', pattern: /'(?:[^'\\]|\\.)*'/g },
		{ type: 'tag', pattern: /<\/?[A-Z][a-zA-Z0-9]*(?=[\s\/>])/g },
		{ type: 'tag', pattern: /<\/?(?:div|span|p|a|ul|ol|li|table|tr|td|th|form|input|button|img|h[1-6]|section|article|nav|header|footer|main|aside|label|textarea|select|option)(?=[\s\/>])/g },
		{ type: 'attr', pattern: /\s[a-zA-Z][a-zA-Z0-9]*(?=\s*=)/g },
		{ type: 'keyword', pattern: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|this|super|null|undefined|true|false|void|delete|yield|type|interface|enum|namespace|module|declare|readonly|public|private|protected|static|abstract|implements|as|is|keyof|infer|never|unknown|any)\b/g },
		{ type: 'number', pattern: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g },
		{ type: 'function', pattern: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g },
		{ type: 'operator', pattern: /[+\-*/%=<>!&|^~?:]+/g },
		{ type: 'punctuation', pattern: /[{}[\]();,.<>\/]/g },
	],
	typescript: [
		{ type: 'comment', pattern: /\/\/.*$/gm },
		{ type: 'comment', pattern: /\/\*[\s\S]*?\*\//g },
		{ type: 'string', pattern: /`[\s\S]*?`/g },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'string', pattern: /'(?:[^'\\]|\\.)*'/g },
		{ type: 'keyword', pattern: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|this|super|null|undefined|true|false|void|delete|yield|type|interface|enum|namespace|module|declare|readonly|public|private|protected|static|abstract|implements|as|is|keyof|infer)\b/g },
		{ type: 'tag', pattern: /\b(string|number|boolean|object|symbol|bigint|any|unknown|never|void|null|undefined)\b/g },
		{ type: 'property', pattern: /\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\??:)/g },
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
	svelte: [
		{ type: 'comment', pattern: /<!--[\s\S]*?-->/g },
		{ type: 'comment', pattern: /\/\/.*$/gm },
		{ type: 'comment', pattern: /\/\*[\s\S]*?\*\//g },
		{ type: 'variable', pattern: /\$(?:state|props|derived|effect|bindable|inspect|host)\b/g },
		{ type: 'tag', pattern: /\{[@#/:][a-zA-Z]+/g },
		{ type: 'tag', pattern: /<\/?(?:script|style)(?=[\s>])/g },
		{ type: 'tag', pattern: /<\/?[A-Z][a-zA-Z0-9]*(?=[\s\/>])/g },
		{ type: 'tag', pattern: /<\/?(?:div|span|p|a|ul|ol|li|table|tr|td|th|form|input|button|img|h[1-6]|section|article|nav|header|footer|main|aside|label|textarea|select|option|slot|svelte:[\w-]+)(?=[\s\/>])/g },
		{ type: 'attr', pattern: /\s(?:on:\w+|bind:\w+|class:\w+|use:\w+|in:\w+|out:\w+|transition:\w+|animate:\w+)(?=[\s=\/>])/g },
		{ type: 'attr', pattern: /\s[a-zA-Z][a-zA-Z0-9-]*(?=\s*=)/g },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'string', pattern: /'(?:[^'\\]|\\.)*'/g },
		{ type: 'keyword', pattern: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|this|null|undefined|true|false)\b/g },
		{ type: 'number', pattern: /\b\d+\.?\d*([eE][+-]?\d+)?\b/g },
		{ type: 'function', pattern: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g },
		{ type: 'operator', pattern: /[+\-*/%=<>!&|^~?:]+/g },
		{ type: 'punctuation', pattern: /[{}[\]();,.<>\/]/g },
	],
	css: [
		{ type: 'comment', pattern: /\/\*[\s\S]*?\*\//g },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'string', pattern: /'(?:[^'\\]|\\.)*'/g },
		{ type: 'keyword', pattern: /@[a-zA-Z][a-zA-Z0-9-]*/g },
		{ type: 'tag', pattern: /(?:^|\s|,)[a-zA-Z][a-zA-Z0-9-]*(?=\s*[{,:])/gm },
		{ type: 'function', pattern: /\.[a-zA-Z][a-zA-Z0-9_-]*/g },
		{ type: 'variable', pattern: /#[a-zA-Z][a-zA-Z0-9_-]*(?=\s*[{,])/g },
		{ type: 'variable', pattern: /--[a-zA-Z][a-zA-Z0-9-]*/g },
		{ type: 'property', pattern: /[a-zA-Z-]+(?=\s*:)/g },
		{ type: 'value', pattern: /#[a-fA-F0-9]{3,8}\b/g },
		{ type: 'value', pattern: /:\s*[a-zA-Z-]+(?=[;\s}])/g },
		{ type: 'number', pattern: /\b\d+\.?\d*/g },
		{ type: 'attr', pattern: /(?:px|em|rem|%|vh|vw|vmin|vmax|ch|ex|deg|rad|turn|s|ms|fr)\b/g },
		{ type: 'function', pattern: /[a-zA-Z-]+(?=\()/g },
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
		{ type: 'comment', pattern: /\/\/.*$/gm },
		{ type: 'comment', pattern: /\/\*[\s\S]*?\*\//g },
		{ type: 'property', pattern: /"[^"]*"(?=\s*:)/g },
		{ type: 'string', pattern: /"[^"]*"/g },
		{ type: 'number', pattern: /-?\b\d+\.?\d*([eE][+-]?\d+)?\b/g },
		{ type: 'keyword', pattern: /\b(true|false|null)\b/g },
		{ type: 'punctuation', pattern: /[{}[\]:,]/g },
	],
	yaml: [
		{ type: 'comment', pattern: /#.*$/gm },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'string', pattern: /'(?:[^'\\]|\\.)*'/g },
		{ type: 'property', pattern: /^[\s-]*[a-zA-Z_][a-zA-Z0-9_-]*(?=\s*:)/gm },
		{ type: 'keyword', pattern: /\b(true|false|null|yes|no|on|off)\b/gi },
		{ type: 'number', pattern: /\b\d+\.?\d*\b/g },
		{ type: 'variable', pattern: /\$\{\{[^}]+\}\}/g },
		{ type: 'attr', pattern: /(?<=:\s*)[a-zA-Z][a-zA-Z0-9_.-]*(?=\s*$)/gm },
		{ type: 'punctuation', pattern: /[[\]:,|>-]/g },
	],
	bash: [
		{ type: 'comment', pattern: /#.*$/gm },
		{ type: 'string', pattern: /"(?:[^"\\]|\\.)*"/g },
		{ type: 'string', pattern: /'[^']*'/g },
		{ type: 'variable', pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g },
		{ type: 'variable', pattern: /\$\{[^}]+\}/g },
		{ type: 'keyword', pattern: /\b(if|then|else|elif|fi|for|while|do|done|case|esac|in|function|return|exit|break|continue|export|source|alias|unalias|local|declare|readonly|unset|shift|eval|exec|trap|sudo)\b/g },
		{ type: 'function', pattern: /\b(npm|yarn|pnpm|npx|node|deno|bun|git|docker|kubectl|curl|wget|pip|python|ruby|go|cargo|make|apt|brew|pacman|dnf|yum|cd|pwd|echo|printf|read|test|ls|cat|grep|awk|sed|chmod|mkdir|rm|cp|mv|touch|find|tar|zip|unzip|ssh|scp|rsync|docker-compose|podman)\b/g },
		{ type: 'attr', pattern: /\b(install|uninstall|add|remove|run|start|stop|build|init|create|clone|push|pull|commit|checkout|merge|rebase|status|log|logs|diff|fetch|reset|stash|branch|tag|login|logout|publish|update|upgrade|config|set|get|list|show|info|help|version|exec|dev|test|lint|format|clean|deploy|serve|watch|images|ps|rm|rmi|network|volume|compose|up|down|restart|pause|unpause|kill|inspect|prune|attach|cp|top|stats|events|history|save|load|import|export|search|port)\b/g },
		{ type: 'property', pattern: /[\w.-]+\/[\w.-]+(?::[\w.-]+)?/g },
		{ type: 'property', pattern: /[\w.-]+@[\w.-]+/g },
		{ type: 'number', pattern: /\b\d+:\d+\b/g },
		{ type: 'string', pattern: /[~.]?\/[\w./-]+:[\w./-]+/g },
		{ type: 'operator', pattern: /--?[\w-]+/g },
		{ type: 'operator', pattern: /[|&;<>]+|&&|\|\||\\$/gm },
		{ type: 'punctuation', pattern: /[{}[\]();]/g },
	],
	diagram: [
		{ type: 'punctuation', pattern: /[┌┐└┘├┤┬┴┼─│╔╗╚╝╠╣╦╩╬═║╭╮╯╰]+/g },
		{ type: 'operator', pattern: /[▶◀▲▼→←↑↓►◄⟶⟵⟷>]+/g },
		{ type: 'keyword', pattern: /\b[A-Z][A-Za-z0-9]*(?:\s+[A-Z][A-Za-z0-9]*)*\b/g },
	],
	tree: [
		{ type: 'comment', pattern: /#.*$/gm },
		{ type: 'punctuation', pattern: /[├└│─┬┴┼]+/g },
		{ type: 'function', pattern: /[~.]?\/[\w./-]*/g },
		{ type: 'keyword', pattern: /[\w.-]+\//g },
		{ type: 'string', pattern: /[\w.-]+\.\w+/g },
	],
	shell: [], // alias for bash, filled below
	sh: [], // alias for bash, filled below
	xml: [], // alias for html, filled below
	scss: [], // alias for css, filled below
	less: [], // alias for css, filled below
	ascii: [], // alias for diagram
	yml: [], // alias for yaml
	plaintext: [],
	text: [],
};

// Set up aliases
languages.shell = languages.bash;
languages.sh = languages.bash;
languages.xml = languages.html;
languages.scss = languages.css;
languages.less = languages.css;
languages.js = languages.javascript;
languages.ts = languages.typescript;
languages.ascii = languages.diagram;
languages.yml = languages.yaml;

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

	// Tree structure detection - tree characters with file/folder names
	if (/[├└│─]/.test(code) && /[\w.-]+(?:\/|\.\w+)/.test(code) && !/[┌┐╔╗]/.test(code)) {
		return 'tree';
	}

	// ASCII art / diagram detection - box-drawing characters (boxes)
	if (/[┌┐└┘├┤┬┴┼─│╔╗╚╝╠╣╦╩╬═║╭╮╯╰]/.test(code)) {
		return 'diagram';
	}

	// Svelte detection - runes, directives, script tags with code inside
	if (
		/\$(?:state|props|derived|effect|bindable)\b/.test(code) ||
		/\{[@#/:]\w+/.test(code) ||
		/\b(?:on|bind|class|use|transition|animate):\w+/.test(code) ||
		// Script tag with actual code inside (not just src attribute)
		(/<script[\s>]/.test(code) && /<\/script>/.test(code) && /\b(?:let|const|function|import)\b/.test(code) && /<[a-z][\w-]*[\s>]/i.test(code))
	) {
		return 'svelte';
	}

	// JSX/TSX detection - React components, JSX comments (before TS/JS)
	const hasJsxComponents = /<[A-Z][a-zA-Z0-9]*[\s\/>]/.test(code) || /\{\/\*[\s\S]*?\*\/\}/.test(code);
	const hasJsxReturn = /return\s*\(\s*</.test(code) || /=>\s*\(\s*</.test(code) || /=>\s*<[A-Z]/.test(code);
	if (hasJsxComponents || hasJsxReturn) {
		// Check if it's TSX (has TypeScript syntax)
		if (/\b(?:interface|type)\s+\w+/.test(code) || /:\s*(?:string|number|boolean|void|any|unknown|never|React\.)\b/.test(code)) {
			return 'tsx';
		}
		return 'jsx';
	}

	// TypeScript detection - type annotations, interface, type keyword (before JS)
	if (/\b(?:interface|type|enum|namespace|readonly|public|private|protected)\s+\w+/.test(code) || /:\s*(?:string|number|boolean|void|any|unknown|never)\b/.test(code)) {
		return 'typescript';
	}

	// JavaScript detection - must be before HTML (template literals can contain HTML)
	// Strong JS indicators: DOM methods, arrow functions, async/await, variable declarations
	if (
		/\b(?:document|window|console)\.\w+/.test(code) ||
		/\b(?:querySelector|getElementById|addEventListener|createElement|appendChild|innerHTML|fetch)\b/.test(code) ||
		/\b(?:async|await)\s+/.test(code) ||
		/=>\s*[{(]/.test(code) ||
		/\b(?:const|let|var)\s+\w+\s*=/.test(code) ||
		/\bfunction\s+\w+\s*\(/.test(code) ||
		/\bfunction\s*\(\w+/.test(code) ||
		/\bnew\s+(?:Promise|Map|Set|Array|Object|Date|RegExp)\b/.test(code) ||
		/\.\s*(?:style|value|length|className|classList|dataset|textContent|innerText)\b/.test(code) ||
		/\.\s*(?:push|pop|shift|unshift|map|filter|reduce|forEach|find|some|every|includes|indexOf|slice|splice|join|split|replace|match|test)\s*\(/.test(code) ||
		/\bimport\s+.*\s+from\s+['"]/.test(code) ||
		/\bexport\s+(?:default|const|let|var|function|class|async)\b/.test(code) ||
		/\bmodule\.exports\b/.test(code) ||
		/\brequire\s*\(['"]/.test(code) ||
		/\btypeof\s+(?:module|exports|define)\b/.test(code)
	) {
		return 'javascript';
	}

	// HTML detection - starts with < tag (not in string context)
	if (/^<[!a-zA-Z]/.test(trimmed) || /^\s*<\/?(?:div|span|p|a|ul|ol|li|table|tr|td|th|form|input|button|img|head|body|html|script|style|link|meta|h[1-6]|section|article|nav|header|footer|main|aside)\b/im.test(code)) {
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

	// JSON/JSONC detection - starts with { or [ (or comment then {/[) and has key-value pairs
	const codeWithoutComments = code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
	if (/^[\[{]/.test(codeWithoutComments) && /"[^"]*"\s*:/.test(code) && !(/\bfunction\b/.test(code))) {
		return 'json';
	}

	// YAML detection - key: value pairs, list items with -, no braces required
	if (
		(/^[a-zA-Z_][a-zA-Z0-9_-]*:\s*$/m.test(code) || /^[a-zA-Z_][a-zA-Z0-9_-]*:\s+\S/m.test(code)) &&
		(/^\s*-\s+/m.test(code) || /^\s+[a-zA-Z_][a-zA-Z0-9_-]*:/m.test(code)) &&
		!/[{};]/.test(code)
	) {
		return 'yaml';
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
