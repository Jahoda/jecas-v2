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
	{ short: 'XHTML', title: 'eXtensible HyperText Markup Language' },
	{ short: 'SGML', title: 'Standard Generalized Markup Language' },
	{ short: 'DTD', title: 'Document Type Definition' },
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
	{ short: 'XHR', title: 'XMLHttpRequest' },
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

	// CSS preprocesory a metodologie
	{ short: 'SASS', title: 'Syntactically Awesome Style Sheets' },
	{ short: 'SCSS', title: 'Sassy CSS' },
	{ short: 'LESS', title: 'Leaner Style Sheets' },
	{ short: 'BEM', title: 'Block, Element, Modifier' },

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
	{ short: 'VP9', title: 'VP9 Video Codec' },
	{ short: 'HEVC', title: 'High Efficiency Video Coding' },
	{ short: 'HLS', title: 'HTTP Live Streaming' },
	{ short: 'HDR', title: 'High Dynamic Range' },
	{ short: 'FPS', title: 'Frames Per Second' },
	{ short: 'FLV', title: 'Flash Video' },
	{ short: 'SWF', title: 'Shockwave Flash' },
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
	{ short: 'SERP', title: 'Search Engine Results Page' },
	{ short: 'CTA', title: 'Call to Action' },
	{ short: 'CTR', title: 'Click-Through Rate' },
	{ short: 'GA', title: 'Google Analytics' },
	{ short: 'UTM', title: 'Urchin Tracking Module' },
	{ short: 'OG', title: 'Open Graph' },

	// UX/UI
	{ short: 'UX', title: 'User Experience' },
	{ short: 'UI', title: 'User Interface' },
	{ short: 'MVP', title: 'Minimum Viable Product' },
	{ short: 'DX', title: 'Developer Experience' },

	// Obecné IT
	{ short: 'SQL', title: 'Structured Query Language' },
	{ short: 'PHP', title: 'PHP: Hypertext Preprocessor' },
	{ short: 'NPM', title: 'Node Package Manager' },
	{ short: 'NPX', title: 'Node Package eXecute' },
	{ short: 'NVM', title: 'Node Version Manager' },
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
	{ short: 'POP3', title: 'Post Office Protocol 3' },
	{ short: 'SPF', title: 'Sender Policy Framework' },
	{ short: 'DKIM', title: 'DomainKeys Identified Mail' },
	{ short: 'DMARC', title: 'Domain-based Message Authentication' },
	{ short: 'CDN', title: 'Content Delivery Network' },
	{ short: 'CMS', title: 'Content Management System' },
	{ short: 'CORS', title: 'Cross-Origin Resource Sharing' },
	{ short: 'CRUD', title: 'Create, Read, Update, Delete' },
	{ short: 'JWT', title: 'JSON Web Token' },
	{ short: 'OAuth', title: 'Open Authorization' },
	{ short: 'WCAG', title: 'Web Content Accessibility Guidelines' },
	{ short: 'WAI', title: 'Web Accessibility Initiative' },
	{ short: 'W3C', title: 'World Wide Web Consortium' },
	{ short: 'WHATWG', title: 'Web Hypertext Application Technology Working Group' },
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
	{ short: 'TDD', title: 'Test Driven Development' },
	{ short: 'QA', title: 'Quality Assurance' },
	{ short: 'MD', title: 'Markdown' },
	{ short: 'RegEx', title: 'Regular Expression' },
	{ short: 'AST', title: 'Abstract Syntax Tree' },
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
	{ short: 'PR', title: 'Pull Request' },
	{ short: 'MR', title: 'Merge Request' },

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
	{ short: 'ZIP', title: 'Zone Information Protocol archive' },
	{ short: 'ISO', title: 'International Organization for Standardization image' },

	// Geolokace
	{ short: 'GPX', title: 'GPS Exchange Format' },
	{ short: 'KML', title: 'Keyhole Markup Language' },

	// Hardware a mobilní
	{ short: 'CPU', title: 'Central Processing Unit' },
	{ short: 'GPU', title: 'Graphics Processing Unit' },
	{ short: 'RAM', title: 'Random Access Memory' },
	{ short: 'SSD', title: 'Solid State Drive' },
	{ short: 'HDD', title: 'Hard Disk Drive' },
	{ short: 'USB', title: 'Universal Serial Bus' },
	{ short: 'HDMI', title: 'High-Definition Multimedia Interface' },
	{ short: 'UEFI', title: 'Unified Extensible Firmware Interface' },
	{ short: 'GPS', title: 'Global Positioning System' },
	{ short: 'NFC', title: 'Near Field Communication' },
	{ short: 'WiFi', title: 'Wireless Fidelity' },
	{ short: 'LTE', title: 'Long-Term Evolution' },

	// Cloud
	{ short: 'AWS', title: 'Amazon Web Services' },
	{ short: 'GCP', title: 'Google Cloud Platform' },
	{ short: 'VPS', title: 'Virtual Private Server' },

	// Business
	{ short: 'B2B', title: 'Business to Business' },
	{ short: 'B2C', title: 'Business to Consumer' },
	{ short: 'CRM', title: 'Customer Relationship Management' },
	{ short: 'ERP', title: 'Enterprise Resource Planning' },
	{ short: 'SLA', title: 'Service Level Agreement' },
	{ short: 'ROI', title: 'Return on Investment' },
	{ short: 'KPI', title: 'Key Performance Indicator' },

	// Zabezpečení formulářů
	{ short: 'CAPTCHA', title: 'Completely Automated Public Turing test' },
	{ short: 'OTP', title: 'One-Time Password' },
	{ short: 'PIN', title: 'Personal Identification Number' },

	// Ostatní
	{ short: 'QR', title: 'Quick Response' },
	{ short: 'OCR', title: 'Optical Character Recognition' },
	{ short: 'SMS', title: 'Short Message Service' },
	{ short: 'ISP', title: 'Internet Service Provider' },
	{ short: 'RSS', title: 'Really Simple Syndication' },
	{ short: 'TLD', title: 'Top Level Domain' },
	{ short: 'AI', title: 'Artificial Intelligence' },
	{ short: 'SOAP', title: 'Simple Object Access Protocol' },
	{ short: 'LDAP', title: 'Lightweight Directory Access Protocol' },
	{ short: 'SDK', title: 'Software Development Kit' },
	{ short: 'FAQ', title: 'Frequently Asked Questions' },
	{ short: 'WIP', title: 'Work in Progress' },
	{ short: 'EOL', title: 'End of Life' },
	{ short: 'LTS', title: 'Long Term Support' },

	// České zkratky
	{ short: 'IČO', title: 'Identifikační číslo osoby' },
	{ short: 'DIČ', title: 'Daňové identifikační číslo' },
	{ short: 'DPH', title: 'Daň z přidané hodnoty' },
	{ short: 'ARES', title: 'Administrativní registr ekonomických subjektů' },
	{ short: 'IBAN', title: 'International Bank Account Number' }
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
 * - Přeskakuje zkratky uvnitř <script>, <style>, <pre>, <code>, <samp>, <kbd> tagů
 * - Přeskakuje zkratky uvnitř HTML atributů
 * - Přeskakuje zkratky již obalené v <abbr>
 * - Respektuje hranice slov
 */
export function processAbbreviations(html: string): string {
	// Tagy, ve kterých se nemá nahrazovat
	const protectedTags = ['script', 'style', 'pre', 'code', 'samp', 'kbd', 'abbr'];

	// Placeholder prefix pro ochranné tokeny
	const placeholder = '\x00PROTECTED_';
	const protectedChunks: string[] = [];

	let result = html;

	// 1. Ochránit obsah speciálních tagů
	for (const tag of protectedTags) {
		const tagPattern = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi');
		result = result.replace(tagPattern, (match) => {
			const index = protectedChunks.length;
			protectedChunks.push(match);
			return `${placeholder}${index}\x00`;
		});
	}

	// 2. Ochránit obsah HTML atributů (="..." nebo ='...')
	result = result.replace(/(?<==)(["'])([\s\S]*?)\1/g, (match) => {
		const index = protectedChunks.length;
		protectedChunks.push(match);
		return `${placeholder}${index}\x00`;
	});

	// 3. Ochránit samotné HTML tagy (otevírací i uzavírací)
	result = result.replace(/<[^>]+>/g, (match) => {
		const index = protectedChunks.length;
		protectedChunks.push(match);
		return `${placeholder}${index}\x00`;
	});

	// 4. Aplikovat náhrady zkratek
	for (const abbr of sortedAbbreviations) {
		// Respektovat hranice slov (nesmí být součástí delšího slova)
		const pattern = new RegExp(`(?<![a-zA-Z0-9])${escapeRegex(abbr.short)}(?![a-zA-Z0-9])`, 'm');
		result = result.replace(pattern, `<abbr title="${abbr.title}">${abbr.short}</abbr>`);
	}

	// 5. Obnovit chráněný obsah
	for (let i = protectedChunks.length - 1; i >= 0; i--) {
		result = result.replace(`${placeholder}${i}\x00`, protectedChunks[i]);
	}

	return result;
}
