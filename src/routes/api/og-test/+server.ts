import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const { ImageResponse } = await import('@ethercorps/sveltekit-og');

		const html = `
			<div tw="flex h-full w-full items-center justify-center bg-blue-500">
				<h1 tw="text-6xl font-bold text-white">Hello World</h1>
			</div>
		`;

		return await new ImageResponse(
			html,
			{
				width: 1200,
				height: 630
			}
		);
	} catch (error) {
		console.error('Test OG error:', error);
		return new Response(`Error: ${error instanceof Error ? error.message : String(error)}`, {
			status: 500,
			headers: { 'Content-Type': 'text/plain' }
		});
	}
};
