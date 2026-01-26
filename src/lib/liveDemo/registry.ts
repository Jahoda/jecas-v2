/**
 * Centrální registry pro správu lifecycle interaktivních komponent.
 *
 * Poskytuje spolehlivý způsob registrace a spouštění cleanup funkcí
 * při navigaci mezi stránkami.
 *
 * Použití v článcích:
 * ```html
 * <script>
 *   const animId = requestAnimationFrame(animate);
 *
 *   window.registerCleanup(() => {
 *     cancelAnimationFrame(animId);
 *     renderer.dispose();
 *   });
 * </script>
 * ```
 */

type CleanupFn = () => void;

interface Registry {
	cleanups: Map<string, CleanupFn>;
	counter: number;
}

const registry: Registry = {
	cleanups: new Map(),
	counter: 0
};

/**
 * Registruje cleanup funkci. Vrací ID pro případné ruční odebrání.
 */
export function registerCleanup(fn: CleanupFn): string {
	const id = `cleanup-${++registry.counter}`;
	registry.cleanups.set(id, fn);
	return id;
}

/**
 * Odebere konkrétní cleanup funkci podle ID.
 */
export function unregisterCleanup(id: string): void {
	registry.cleanups.delete(id);
}

/**
 * Spustí všechny registrované cleanup funkce a vymaže registry.
 * Volá se při navigaci.
 */
export function cleanupAll(): void {
	registry.cleanups.forEach((fn, id) => {
		try {
			fn();
		} catch (error) {
			console.error(`Cleanup error [${id}]:`, error);
		}
	});
	registry.cleanups.clear();
}

/**
 * Vrací počet registrovaných cleanup funkcí (pro debugging).
 */
export function getCleanupCount(): number {
	return registry.cleanups.size;
}

// Globální API pro použití v článcích
if (typeof window !== 'undefined') {
	window.registerCleanup = registerCleanup;
}

// TypeScript deklarace pro window
declare global {
	interface Window {
		registerCleanup: typeof registerCleanup;
	}
}
