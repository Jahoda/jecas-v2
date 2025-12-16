/**
 * Centrální slovník zkratek s vysvětlivkami.
 * Při renderování článku se automaticky obalí první výskyt každé zkratky do <abbr>.
 */

export interface Abbreviation {
	/** Zkratka (case-sensitive) */
	short: string;
	/** Vysvětlení zkratky */
	title: string;
}

/**
 * Slovník zkratek - přidej nové zkratky sem.
 * Seřazeno od nejdelších po nejkratší (zpracování probíhá v tomto pořadí).
 */
export const abbreviations: Abbreviation[] = [
	// Webové technologie
	{ short: 'HTML', title: 'HyperText Markup Language' },
	{ short: 'CSS', title: 'Cascading Style Sheets' },
	{ short: 'JS', title: 'JavaScript' },
	{ short: 'TS', title: 'TypeScript' },
	{ short: 'JSON', title: 'JavaScript Object Notation' },
	{ short: 'XML', title: 'eXtensible Markup Language' },
	{ short: 'SVG', title: 'Scalable Vector Graphics' },
	{ short: 'DOM', title: 'Document Object Model' },
	{ short: 'API', title: 'Application Programming Interface' },
	{ short: 'REST', title: 'Representational State Transfer' },
	{ short: 'URL', title: 'Uniform Resource Locator' },
	{ short: 'URI', title: 'Uniform Resource Identifier' },
	{ short: 'HTTP', title: 'HyperText Transfer Protocol' },
	{ short: 'HTTPS', title: 'HyperText Transfer Protocol Secure' },
	{ short: 'AJAX', title: 'Asynchronous JavaScript and XML' },
	{ short: 'SPA', title: 'Single Page Application' },
	{ short: 'SSR', title: 'Server-Side Rendering' },
	{ short: 'SSG', title: 'Static Site Generation' },
	{ short: 'PWA', title: 'Progressive Web App' },

	// Obrázky a média
	{ short: 'PNG', title: 'Portable Network Graphics' },
	{ short: 'JPEG', title: 'Joint Photographic Experts Group' },
	{ short: 'JPG', title: 'Joint Photographic Experts Group' },
	{ short: 'GIF', title: 'Graphics Interchange Format' },
	{ short: 'WebP', title: 'Web Picture format' },
	{ short: 'AVIF', title: 'AV1 Image File Format' },

	// SEO a marketing
	{ short: 'SEO', title: 'Search Engine Optimization' },
	{ short: 'SEM', title: 'Search Engine Marketing' },
	{ short: 'CTA', title: 'Call to Action' },
	{ short: 'CTR', title: 'Click-Through Rate' },

	// Obecné IT
	{ short: 'SQL', title: 'Structured Query Language' },
	{ short: 'PHP', title: 'PHP: Hypertext Preprocessor' },
	{ short: 'NPM', title: 'Node Package Manager' },
	{ short: 'CLI', title: 'Command Line Interface' },
	{ short: 'GUI', title: 'Graphical User Interface' },
	{ short: 'IDE', title: 'Integrated Development Environment' },
	{ short: 'FTP', title: 'File Transfer Protocol' },
	{ short: 'SSH', title: 'Secure Shell' },
	{ short: 'DNS', title: 'Domain Name System' },
	{ short: 'CDN', title: 'Content Delivery Network' },
	{ short: 'CMS', title: 'Content Management System' },
	{ short: 'CORS', title: 'Cross-Origin Resource Sharing' },
	{ short: 'CRUD', title: 'Create, Read, Update, Delete' },
	{ short: 'JWT', title: 'JSON Web Token' },
	{ short: 'OAuth', title: 'Open Authorization' },
	{ short: 'WCAG', title: 'Web Content Accessibility Guidelines' },
	{ short: 'W3C', title: 'World Wide Web Consortium' },
	{ short: 'RFC', title: 'Request for Comments' },
	{ short: 'UTF', title: 'Unicode Transformation Format' },
	{ short: 'ASCII', title: 'American Standard Code for Information Interchange' },
	{ short: 'RGB', title: 'Red, Green, Blue' },
	{ short: 'HEX', title: 'Hexadecimal' },
	{ short: 'HSL', title: 'Hue, Saturation, Lightness' },

	// Prohlížeče
	{ short: 'IE', title: 'Internet Explorer' }
];

// Seřadit od nejdelších po nejkratší, aby se "HTTPS" nahradilo dřív než "HTTP"
const sortedAbbreviations = [...abbreviations].sort((a, b) => b.short.length - a.short.length);

/**
 * Escapuje speciální znaky pro použití v regulárním výrazu.
 */
function escapeRegex(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Nahradí první výskyt každé zkratky v HTML obsahu tagem <abbr>.
 *
 * - Nahrazuje pouze první výskyt každé zkratky
 * - Přeskakuje zkratky uvnitř HTML tagů a atributů
 * - Přeskakuje zkratky již obalené v <abbr>
 * - Respektuje hranice slov
 */
export function processAbbreviations(html: string): string {
	let result = html;

	for (const abbr of sortedAbbreviations) {
		// Regex pro nalezení zkratky:
		// - (?<!<[^>]*) - není uvnitř HTML tagu
		// - (?<![a-zA-Z]) - není součástí delšího slova (před)
		// - (?![a-zA-Z]) - není součástí delšího slova (za)
		// - (?![^<]*<\/abbr>) - není už uvnitř <abbr> tagu
		const pattern = new RegExp(
			`(?<!<[^>]*)(?<![a-zA-Z])${escapeRegex(abbr.short)}(?![a-zA-Z])(?![^<]*<\\/abbr>)`,
			'm' // pouze první výskyt (bez 'g' flagu)
		);

		result = result.replace(pattern, `<abbr title="${abbr.title}">${abbr.short}</abbr>`);
	}

	return result;
}
