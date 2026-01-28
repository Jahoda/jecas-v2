const STORAGE_KEY = 'user_settings';

export type ThemeMode = 'light' | 'dark' | 'system';
export type CodeTheme = 'github-dark' | 'github-light' | 'monokai' | 'one-dark-pro';
export type FontSize = 'small' | 'medium' | 'large';
export type FontFamily = 'sans' | 'serif' | 'mono';

export interface UserSettings {
	theme: ThemeMode;
	codeTheme: CodeTheme;
	fontSize: FontSize;
	fontFamily: FontFamily;
}

const defaults: UserSettings = {
	theme: 'system',
	codeTheme: 'github-dark',
	fontSize: 'medium',
	fontFamily: 'sans'
};

export function getSettings(): UserSettings {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return { ...defaults };
		return { ...defaults, ...JSON.parse(stored) };
	} catch {
		return { ...defaults };
	}
}

export function saveSettings(settings: Partial<UserSettings>): UserSettings {
	const current = getSettings();
	const updated = { ...current, ...settings };
	localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
	return updated;
}

export function resetSettings(): UserSettings {
	localStorage.removeItem(STORAGE_KEY);
	return { ...defaults };
}
