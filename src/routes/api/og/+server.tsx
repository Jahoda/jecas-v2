import { ImageResponse } from '@vercel/og';
import { getSinglePostBySlug } from '$lib/post/post';
import { getAllTagsByPageId } from '$lib/tag/tags';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get('slug');

	if (!slug) return new Response('Missing slug', { status: 404 });

	let tags = [];
	const post = await getSinglePostBySlug(slug);
	if (post?.url_slug) {
		tags = await getAllTagsByPageId(post.url_slug);
	}

	if (!post) return new Response('Not found', { status: 404 });

	try {
		// Create gradient from tags
		const tagsColors = tags?.map((tag) => tag.background).filter((color) => color) || [];
		const gradient = tagsColors.length > 0
			? `linear-gradient(to right top, ${tagsColors.join(', ')}, #5b63b9)`
			: 'linear-gradient(to right top, #3b82f6, #5b63b9)';

		// Clean description
		const cleanDescription = post.description
			.replace(/(<([^>]+)>)/gi, '')
			.replace(/&lt;/g, '')
			.replace(/&gt;/g, '');

		const imageUrl = `https://jecas.cz/files/article/${post.url_slug}.png`;

		return new ImageResponse(
			(
				<div
					style={{
						display: 'flex',
						height: '100%',
						width: '100%',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '32px',
						background: gradient
					}}
				>
					<div
						style={{
							display: 'flex',
							marginBottom: '32px',
							width: '100%',
							maxWidth: '1280px',
							flexDirection: 'column',
							alignItems: 'center',
							borderRadius: '24px',
							padding: '48px',
							textAlign: 'center',
							backgroundColor: 'rgba(15, 23, 42, 0.5)'
						}}
					>
						<div
							style={{
								display: 'flex',
								height: '200px',
								width: '200px',
								overflow: 'hidden',
								borderRadius: '16px',
								backgroundColor: '#1f2937'
							}}
						>
							<img
								alt=""
								width="200"
								height="200"
								src={imageUrl}
								style={{ objectFit: 'cover' }}
							/>
						</div>

						<div
							style={{
								display: 'flex',
								width: '100%',
								flexDirection: 'column',
								textAlign: 'center'
							}}
						>
							<h2
								style={{
									marginLeft: 'auto',
									marginRight: 'auto',
									marginTop: '32px',
									fontSize: '48px',
									fontWeight: 'bold',
									color: 'white',
									lineHeight: 1.2,
									paddingLeft: '16px',
									paddingRight: '16px',
									maxWidth: '1000px'
								}}
							>
								{post.title}
							</h2>

							<p
								style={{
									marginLeft: 'auto',
									marginRight: 'auto',
									marginTop: '24px',
									fontSize: '24px',
									color: '#e5e7eb',
									paddingLeft: '32px',
									paddingRight: '32px',
									lineHeight: 1.4,
									maxWidth: '900px'
								}}
							>
								{cleanDescription}
							</p>
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: '16px',
							fontSize: '32px',
							fontWeight: 'bold',
							color: 'white'
						}}
					>
						Je čas.cz
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630
			}
		);
	} catch (error) {
		console.error('OG image generation error:', error);
		return new Response(`Failed to generate image: ${error instanceof Error ? error.message : String(error)}`, { status: 500 });
	}
};
