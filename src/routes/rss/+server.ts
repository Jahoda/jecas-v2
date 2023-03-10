import { getAllPosts } from '$lib/post/post';
import { sanizite } from '$lib/xml/xml';

export async function GET() {
	const posts = await getAllPosts();

	const baseUrl = 'https://jecas.cz';

	return new Response(
		`
		<rss version="2.0"
		xmlns:atom="http://www.w3.org/2005/Atom">
			<channel>
				<title>Je čas.cz</title>
				<link>${baseUrl}</link>
				<atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
				<description>Poznámky k webdesignu.</description>
				<language>cs</language>
		${posts
			.map(
				(post) => `
				<item>
					<title>${sanizite(post.title)}</title>
					<link>https://jecas.cz/${post.url_slug}</link>
					<guid>https://jecas.cz/${post.url_slug}</guid>
					<description>${sanizite(post.description)}</description>
				</item>
		`
			)
			.join('')
			.trim()}	  
			</channel>
		</rss>
	`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
