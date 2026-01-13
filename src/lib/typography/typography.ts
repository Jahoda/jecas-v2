/**
 * Typografické utility pro české texty
 */

/**
 * Zabraňuje "osiřelým" předložkám na konci řádku.
 * Nahrazuje mezeru za jednopísmennými a dvoupísmennými předložkami
 * nezlomitelnou mezerou (\u00A0).
 *
 * @param text - Vstupní text (může obsahovat HTML)
 * @returns Text s nezlomitelnými mezerami za předložkami
 */
export function preventWidows(text: string): string {
	if (!text) return text;

	// České předložky a spojky, které by neměly být na konci řádku
	// Jednopísmenné: a, i, k, o, s, u, v, z
	// Dvoupísmenné: do, ke, ku, na, od, po, ve, za, ze, se, si
	return text.replace(
		/(\s|^)(a|i|k|o|s|u|v|z|do|ke|ku|na|od|po|ve|za|ze|se|si) (?=\S)/gi,
		'$1$2\u00A0'
	);
}
