type RGBColor = {
	r: number;
	g: number;
	b: number;
};

export function generateGradient(color1: string, color2: string, color3: string): string {
	// Convert hex colors to RGB values
	const rgbColor1: RGBColor = hexToRgb(color1);
	const rgbColor2: RGBColor = hexToRgb(color2);
	const rgbColor3: RGBColor = hexToRgb(color3);

	// Calculate the angles for the gradients
	const angle1: number = 45;

	// Determine which color is closest to a dark purple
	const purpleColors: RGBColor[] = [
		{ r: 48, g: 0, b: 48 },
		{ r: 72, g: 0, b: 72 },
		{ r: 96, g: 0, b: 96 }
	];
	const colorDistances: number[] = [
		distance(rgbColor1, purpleColors[0]),
		distance(rgbColor1, purpleColors[1]),
		distance(rgbColor1, purpleColors[2]),
		distance(rgbColor2, purpleColors[0]),
		distance(rgbColor2, purpleColors[1]),
		distance(rgbColor2, purpleColors[2]),
		distance(rgbColor3, purpleColors[0]),
		distance(rgbColor3, purpleColors[1]),
		distance(rgbColor3, purpleColors[2])
	];
	const closestIndex: number = colorDistances.indexOf(Math.min(...colorDistances));
	const closestColor: RGBColor = purpleColors[Math.floor(closestIndex / 3)];

	// Construct the CSS gradient
	const gradient: string = `linear-gradient(${angle1}deg, rgba(${closestColor.r}, ${closestColor.g}, ${closestColor.b}, 1) 0%, rgba(${rgbColor1.r}, ${rgbColor1.g}, ${rgbColor1.b}, 1) 33%, rgba(${rgbColor2.r}, ${rgbColor2.g}, ${rgbColor2.b}, 1) 66%, rgba(${rgbColor3.r}, ${rgbColor3.g}, ${rgbColor3.b}, 1) 100%)`;

	return gradient;
}

function distance(color1: RGBColor, color2: RGBColor): number {
	const rDiff: number = color1.r - color2.r;
	const gDiff: number = color1.g - color2.g;
	const bDiff: number = color1.b - color2.b;

	return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

// Helper function to convert hex colors to RGB values
function hexToRgb(hex: string): RGBColor {
	hex = hex.replace('#', '');

	const r: number = parseInt(hex.substring(0, 2), 16);
	const g: number = parseInt(hex.substring(2, 4), 16);
	const b: number = parseInt(hex.substring(4, 6), 16);

	if (isNaN(r) || isNaN(g) || isNaN(b)) {
		throw new Error(`Invalid hex color: ${hex}`);
	}

	return { r, g, b };
}
