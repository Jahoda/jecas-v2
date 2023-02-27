import { connection } from '$lib/server/database';
import { sanizite } from '$lib/xml/xml';

export async function GET() {
	const [posts] = await connection.execute(`
		SELECT
			id,
			title,
			headline,
			url_slug,
			description,
			last_modification,
			(LENGTH(text_html) - LENGTH(REPLACE(text_html, ' ', '')) + 1) AS word_count
		FROM pages 
		WHERE status = 1
		ORDER BY last_modification DESC
	`);

	return new Response(
		`
	  <?xml version="1.0" encoding="UTF-8" ?>
	  <urlset
		xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:xhtml="https://www.w3.org/1999/xhtml"
		xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
		xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
		xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
		xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
	  >
		${posts
			.map(
				(post) => `
		  <url>
			<loc>https://jecas.cz/${post.url_slug}</loc>
			<lastmod>${post.last_modification.toISOString()}</lastmod>
			<changefreq>monthly</changefreq>
			<priority>1</priority>
			<news:news>
			  <news:publication>
				<news:name>Bohumil Jahoda</news:name>
				<news:language>cs</news:language>
			  </news:publication>
			  <news:publication_date>${post.last_modification.toISOString()}</news:publication_date>
			  <news:title>${sanizite(post.title)}</news:title>
			  <news:keywords>${sanizite(post.description)}</news:keywords>
			</news:news>
			<image:image>
			  <image:loc>https://jecas.cz/files/article/${post.url_slug}.png</image:loc>
			  <image:caption>${sanizite(post.desription)}</image:caption>
			  <image:title>${sanizite(post.title)}</image:title>
			</image:image>
		  </url>
		`
			)
			.join('')
			.trim()}


		  	)}
	  </urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
