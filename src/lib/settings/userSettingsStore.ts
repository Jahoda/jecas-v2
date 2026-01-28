import { writable } from 'svelte/store';
import {
	getSettings,
	saveSettings,
	resetSettings,
	type UserSettings,
	type ThemeMode,
	type CodeTheme,
	type FontSize,
	type FontFamily
} from './userSettings';

function createUserSettingsStore() {
	const { subscribe, set, update } = writable<UserSettings>({
		theme: 'system',
		codeTheme: 'github-dark',
		fontSize: 'medium',
		fontFamily: 'sans'
	});

	return {
		subscribe,
		init() {
			set(getSettings());
		},
		setTheme(theme: ThemeMode) {
			update((s) => {
				const updated = saveSettings({ ...s, theme });
				applyTheme(updated.theme);
				return updated;
			});
		},
		setCodeTheme(codeTheme: CodeTheme) {
			update((s) => saveSettings({ ...s, codeTheme }));
		},
		setFontSize(fontSize: FontSize) {
			update((s) => {
				const updated = saveSettings({ ...s, fontSize });
				applyFontSize(updated.fontSize);
				return updated;
			});
		},
		setFontFamily(fontFamily: FontFamily) {
			update((s) => {
				const updated = saveSettings({ ...s, fontFamily });
				applyFontFamily(updated.fontFamily);
				return updated;
			});
		},
		reset() {
			const defaults = resetSettings();
			set(defaults);
			applyTheme(defaults.theme);
			applyFontSize(defaults.fontSize);
			applyFontFamily(defaults.fontFamily);
		}
	};
}

function applyTheme(theme: ThemeMode) {
	const root = document.documentElement;
	if (theme === 'dark') {
		root.classList.add('dark');
	} else if (theme === 'light') {
		root.classList.remove('dark');
	} else {
		// system
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}
}

function applyFontSize(fontSize: FontSize) {
	const root = document.documentElement;
	root.dataset.fontSize = fontSize;
}

function applyFontFamily(fontFamily: FontFamily) {
	const root = document.documentElement;
	root.dataset.fontFamily = fontFamily;
}

export const userSettings = createUserSettingsStore();
