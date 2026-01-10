import { getSinglePostBySlug } from '$lib/post/post';
import { getAllTagsByPageId, type Tag } from '$lib/tag/tags';
import type { RequestHandler } from './$types';
import { ImageResponse } from '@vercel/og';

export const prerender = false;

// Font cache
let fontCache: ArrayBuffer | null = null;

async function getInterBoldFont(baseUrl: string): Promise<ArrayBuffer> {
	if (fontCache) return fontCache;

	const response = await fetch(`${baseUrl}/fonts/Inter-Bold.ttf`);
	fontCache = await response.arrayBuffer();
	return fontCache;
}

function stripTags(str: string) {
	return str.replace(/(<([^>]+)>)/gi, '');
}

function decodeHtmlEntities(str: string) {
	return str
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}

function postGradient(tags: Tag[]) {
	const tagsColors = tags?.map((tag) => tag.background).filter((color) => color) || [];
	if (tagsColors.length === 0) {
		return 'linear-gradient(135deg, #3b82f6, #5b63b9)';
	}
	return `linear-gradient(135deg, ${tagsColors.join(', ')}, #5b63b9)`;
}

function formatDate(date: Date | string | null) {
	if (!date) return '';
	return new Date(date).toLocaleDateString('cs-CZ', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

function calcReadingTime(wordCount: number) {
	return Math.ceil(wordCount / 200);
}

function pluralize(count: number) {
	return count === 1 ? 'minuta' : count > 4 ? 'minut' : 'minuty';
}

export const GET: RequestHandler = async ({ url, request }) => {
	const baseUrl = new URL(request.url).origin;
	const slug = url.searchParams.get('slug');

	if (!slug) {
		return new Response('Missing slug', { status: 400 });
	}

	const post = await getSinglePostBySlug(slug);

	if (!post) {
		return new Response('Post not found', { status: 404 });
	}

	let tags: Tag[] = [];
	if (post.url_slug) {
		tags = await getAllTagsByPageId(post.url_slug);
	}

	const description = decodeHtmlEntities(stripTags(post.description || ''));
	const displayDate = formatDate(post.last_modification || post.date);
	const readingTime = post.word_count ? calcReadingTime(post.word_count) : null;
	const thumbnailUrl = `https://jecas.cz/files/article/${post.url_slug}.png`;

	try {
		const fontData = await getInterBoldFont(baseUrl);

		const element = {
			type: 'div',
			props: {
				style: {
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					height: '100%',
					padding: 48,
					fontFamily: 'Inter',
					backgroundImage: postGradient(tags)
				},
				children: [
					// Main card
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								flex: 1,
								backgroundColor: 'rgba(15, 23, 42, 0.7)',
								borderRadius: 24,
								padding: 40
							},
							children: [
								// Thumbnail
								{
									type: 'img',
									props: {
										src: thumbnailUrl,
										width: 200,
										height: 200,
										style: {
											borderRadius: 16
										}
									}
								},
								// Content
								{
									type: 'div',
									props: {
										style: {
											display: 'flex',
											flexDirection: 'column',
											flex: 1,
											marginLeft: 40,
											justifyContent: 'space-between'
										},
										children: [
											// Title + Description
											{
												type: 'div',
												props: {
													style: {
														display: 'flex',
														flexDirection: 'column',
														gap: 16
													},
													children: [
														{
															type: 'div',
															props: {
																style: {
																	fontSize: 48,
																	fontWeight: 700,
																	color: 'white',
																	lineHeight: 1.1
																},
																children: post.headline || post.title
															}
														},
														description
															? {
																	type: 'div',
																	props: {
																		style: {
																			fontSize: 24,
																			color: 'rgba(255, 255, 255, 0.85)',
																			lineHeight: 1.4
																		},
																		children:
																			description.length > 100
																				? description.slice(0, 100) + '...'
																				: description
																	}
																}
															: null
													].filter(Boolean)
												}
											},
											// Meta + Tags
											{
												type: 'div',
												props: {
													style: {
														display: 'flex',
														flexDirection: 'column',
														gap: 16
													},
													children: [
														// Date + Reading time (text only, no icons)
														{
															type: 'div',
															props: {
																style: {
																	display: 'flex',
																	alignItems: 'center',
																	gap: 24,
																	color: 'white',
																	fontSize: 20
																},
																children: [
																	displayDate ? displayDate : null,
																	readingTime
																		? `${readingTime} ${pluralize(readingTime)}`
																		: null
																].filter(Boolean)
															}
														},
														// Tags
														tags.length > 0
															? {
																	type: 'div',
																	props: {
																		style: {
																			display: 'flex',
																			gap: 12,
																			flexWrap: 'wrap'
																		},
																		children: tags.slice(0, 3).map((tag) => ({
																			type: 'div',
																			props: {
																				style: {
																					display: 'flex',
																					padding: '8px 16px',
																					borderRadius: 8,
																					fontSize: 18,
																					fontWeight: 600,
																					backgroundColor: tag.background || '#6366f1',
																					color: tag.color || 'white'
																				},
																				children: tag.name
																			}
																		}))
																	}
																}
															: null
													].filter(Boolean)
												}
											}
										]
									}
								}
							]
						}
					},
					// Logo (text instead of SVG)
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								justifyContent: 'center',
								marginTop: 20,
								fontSize: 24,
								fontWeight: 700,
								color: 'white',
								letterSpacing: 2
							},
							children: 'JECAS.CZ'
						}
					}
				]
			}
		};

		// @ts-expect-error - ImageResponse expects JSX but we use object syntax
		return new ImageResponse(element, {
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Inter',
					data: fontData,
					style: 'normal',
					weight: 700
				}
			]
		});
	} catch (error) {
		console.error('OG image generation error:', error);
		return new Response(`Failed to generate image: ${error}`, { status: 500 });
	}
};
