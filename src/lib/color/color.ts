export function generateRandomHexColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// WCAG Color Contrast check for two colors
export function calcColorsContrast(foreground: string, background: string): number {
	const lumA = getLuminance(foreground);
	const lumB = getLuminance(background);
	const brightest = Math.max(lumA, lumB);
	const darkest = Math.min(lumA, lumB);
	const contrast = (brightest + 0.05) / (darkest + 0.05);
	return Number(contrast.toFixed(1));
}

function hexToRgb(hex: string) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
		: null;
}

function getLuminance(hex: string) {
	const rgb = hexToRgb(hex);
	const lum = [];

	if (!rgb) return 0;

	for (let i = 0; i < rgb.length; i++) {
		const chan = rgb[i] / 255;
		lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
	}
	return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
}
