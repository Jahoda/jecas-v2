export function schemaScript(thing: unknown) {
	if (!thing || typeof thing !== 'object') return '';
	return `<script type="application/ld+json">${JSON.stringify(thing)}</script>`;
}
