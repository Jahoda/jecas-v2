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
	{ short: 'JSONP', title: 'JSON with Padding' },
	{ short: 'AMP', title: 'Accelerated Mobile Pages' },
	{ short: 'ARIA', title: 'Accessible Rich Internet Applications' },
	{ short: 'WYSIWYG', title: 'What You See Is What You Get' },
	{ short: 'HMR', title: 'Hot Module Replacement' },
	{ short: 'FOUT', title: 'Flash of Unstyled Text' },
	{ short: 'FOIT', title: 'Flash of Invisible Text' },

	// CSS preprocesory
	{ short: 'SASS', title: 'Syntactically Awesome Style Sheets' },
	{ short: 'SCSS', title: 'Sassy CSS' },
	{ short: 'LESS', title: 'Leaner Style Sheets' },

	// Obrázky a média
	{ short: 'PNG', title: 'Portable Network Graphics' },
	{ short: 'JPEG', title: 'Joint Photographic Experts Group' },
	{ short: 'JPG', title: 'Joint Photographic Experts Group' },
	{ short: 'GIF', title: 'Graphics Interchange Format' },
	{ short: 'WebP', title: 'Web Picture format' },
	{ short: 'AVIF', title: 'AV1 Image File Format' },
	{ short: 'APNG', title: 'Animated PNG' },
	{ short: 'HEIC', title: 'High Efficiency Image Container' },
	{ short: 'EXIF', title: 'Exchangeable Image File Format' },
	{ short: 'RGBA', title: 'Red, Green, Blue, Alpha' },
	{ short: 'DPI', title: 'Dots Per Inch' },

	// Audio formáty
	{ short: 'MP3', title: 'MPEG-1 Audio Layer III' },
	{ short: 'AAC', title: 'Advanced Audio Coding' },
	{ short: 'OGG', title: 'Ogg Vorbis' },
	{ short: 'WAV', title: 'Waveform Audio File Format' },
	{ short: 'FLAC', title: 'Free Lossless Audio Codec' },

	// Video formáty
	{ short: 'MP4', title: 'MPEG-4 Part 14' },
	{ short: 'WebM', title: 'WebM Video Format' },
	{ short: 'AV1', title: 'AOMedia Video 1' },
	{ short: 'HEVC', title: 'High Efficiency Video Coding' },
	{ short: 'FPS', title: 'Frames Per Second' },
	{ short: 'WebGL', title: 'Web Graphics Library' },
	{ short: 'WebRTC', title: 'Web Real-Time Communication' },

	// Fonty
	{ short: 'WOFF', title: 'Web Open Font Format' },
	{ short: 'WOFF2', title: 'Web Open Font Format 2' },
	{ short: 'TTF', title: 'TrueType Font' },
	{ short: 'OTF', title: 'OpenType Font' },
	{ short: 'EOT', title: 'Embedded OpenType' },

	// SEO a marketing
	{ short: 'SEO', title: 'Search Engine Optimization' },
	{ short: 'SEM', title: 'Search Engine Marketing' },
	{ short: 'CTA', title: 'Call to Action' },
	{ short: 'CTR', title: 'Click-Through Rate' },

	// Obecné IT
	{ short: 'SQL', title: 'Structured Query Language' },
	{ short: 'PHP', title: 'PHP: Hypertext Preprocessor' },
	{ short: 'NPM', title: 'Node Package Manager' },
	{ short: 'NPX', title: 'Node Package eXecute' },
	{ short: 'CLI', title: 'Command Line Interface' },
	{ short: 'GUI', title: 'Graphical User Interface' },
	{ short: 'IDE', title: 'Integrated Development Environment' },
	{ short: 'FTP', title: 'File Transfer Protocol' },
	{ short: 'SFTP', title: 'SSH File Transfer Protocol' },
	{ short: 'SSH', title: 'Secure Shell' },
	{ short: 'DNS', title: 'Domain Name System' },
	{ short: 'TCP', title: 'Transmission Control Protocol' },
	{ short: 'UDP', title: 'User Datagram Protocol' },
	{ short: 'IP', title: 'Internet Protocol' },
	{ short: 'SMTP', title: 'Simple Mail Transfer Protocol' },
	{ short: 'IMAP', title: 'Internet Message Access Protocol' },
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
	{ short: 'IE', title: 'Internet Explorer' },

	// Bezpečnost
	{ short: 'XSS', title: 'Cross-Site Scripting' },
	{ short: 'CSRF', title: 'Cross-Site Request Forgery' },
	{ short: 'SSL', title: 'Secure Sockets Layer' },
	{ short: 'TLS', title: 'Transport Layer Security' },
	{ short: 'GDPR', title: 'General Data Protection Regulation' },
	{ short: 'RSA', title: 'Rivest–Shamir–Adleman' },
	{ short: 'SHA', title: 'Secure Hash Algorithm' },
	{ short: 'MD5', title: 'Message Digest 5' },
	{ short: 'CSP', title: 'Content Security Policy' },
	{ short: 'HSTS', title: 'HTTP Strict Transport Security' },

	// Programování
	{ short: 'OOP', title: 'Object-Oriented Programming' },
	{ short: 'DRY', title: "Don't Repeat Yourself" },
	{ short: 'KISS', title: 'Keep It Simple, Stupid' },
	{ short: 'CI', title: 'Continuous Integration' },
	{ short: 'CD', title: 'Continuous Deployment' },
	{ short: 'MD', title: 'Markdown' },
	{ short: 'RegEx', title: 'Regular Expression' },
	{ short: 'ES6', title: 'ECMAScript 2015' },
	{ short: 'ESM', title: 'ECMAScript Modules' },
	{ short: 'CJS', title: 'CommonJS Modules' },
	{ short: 'AMD', title: 'Asynchronous Module Definition' },
	{ short: 'UMD', title: 'Universal Module Definition' },

	// Databáze
	{ short: 'MySQL', title: 'Relační databázový systém' },
	{ short: 'SQLite', title: 'Lightweight SQL databáze' },
	{ short: 'NoSQL', title: 'Non-relational databases' },
	{ short: 'PDO', title: 'PHP Data Objects' },

	// Verzování
	{ short: 'Git', title: 'Distribuovaný verzovací systém' },
	{ short: 'SVN', title: 'Apache Subversion' },

	// Servery a hosting
	{ short: 'WAMP', title: 'Windows, Apache, MySQL, PHP' },
	{ short: 'LAMP', title: 'Linux, Apache, MySQL, PHP' },
	{ short: 'MAMP', title: 'macOS, Apache, MySQL, PHP' },
	{ short: 'IIS', title: 'Internet Information Services' },
	{ short: 'GZIP', title: 'GNU Zip' },

	// Kódování
	{ short: 'BOM', title: 'Byte Order Mark' },
	{ short: 'BASE64', title: 'Base64 encoding' },
	{ short: 'MIME', title: 'Multipurpose Internet Mail Extensions' },

	// Datové formáty
	{ short: 'CSV', title: 'Comma-Separated Values' },
	{ short: 'YAML', title: "YAML Ain't Markup Language" },
	{ short: 'TOML', title: "Tom's Obvious, Minimal Language" },
	{ short: 'PDF', title: 'Portable Document Format' },
	{ short: 'EPUB', title: 'Electronic Publication' },

	// Geolokace
	{ short: 'GPX', title: 'GPS Exchange Format' },
	{ short: 'KML', title: 'Keyhole Markup Language' },

	// Hardware a mobilní
	{ short: 'GPS', title: 'Global Positioning System' },
	{ short: 'NFC', title: 'Near Field Communication' },
	{ short: 'WiFi', title: 'Wireless Fidelity' },
	{ short: 'LTE', title: 'Long-Term Evolution' },

	// Ostatní
	{ short: 'QR', title: 'Quick Response' },
	{ short: 'OCR', title: 'Optical Character Recognition' },
	{ short: 'SMS', title: 'Short Message Service' },
	{ short: 'ISP', title: 'Internet Service Provider' }
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
