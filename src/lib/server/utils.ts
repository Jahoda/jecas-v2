export function convertFormDataToData<T>(data: FormData): T {
	const entries = Object.fromEntries(data.entries());
	return entries as T;
}
