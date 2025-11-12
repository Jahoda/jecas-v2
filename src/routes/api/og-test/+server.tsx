import { ImageResponse } from '@vercel/og';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		return new ImageResponse(
			(
				<div
					style={{
						display: 'flex',
						height: '100%',
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
						background: '#3b82f6'
					}}
				>
					<h1
						style={{
							fontSize: '72px',
							fontWeight: 'bold',
							color: 'white'
						}}
					>
						Hello World
					</h1>
				</div>
			),
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
